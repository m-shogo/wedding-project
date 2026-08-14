#!/usr/bin/env python3
"""無料ストック動画を公式API経由で取得し、素材プールへ入れる。

スクレイピングはしない。Pexels の robots.txt は検索・download・api パスを
Disallow しているため、**公式APIだけを使う**。APIは無料だがキー登録が必要。

  Pexels : https://www.pexels.com/api/  (環境変数 PEXELS_API_KEY)
  Pixabay: https://pixabay.com/api/docs/ (環境変数 PIXABAY_API_KEY)

使い方:
  # 候補を見るだけ(ダウンロードしない)。ファイル名・入手元・サイズを表示する
  python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3

  # 実際に取得する
  python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3 --write

取得先: 10_references/media/pool/ (Git管理外)
出所・ライセンスは 10_references/media/pool/_provenance.csv へ自動記録する。

注意:
- 人物・動物・文字・ロゴ・看板が写っていないかは**目視確認が必須**。APIでは判定できない。
- Pixabay は「リクエストを24時間キャッシュすること」を求めているため、検索結果をキャッシュする。
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
POOL_DIR = REPO_ROOT / "10_references" / "media" / "pool"
CACHE_DIR = REPO_ROOT / "10_references" / "media" / ".cache"
PROVENANCE = POOL_DIR / "_provenance.csv"

CACHE_TTL_SEC = 24 * 60 * 60  # Pixabayの要求に合わせて24時間
TARGET_W, TARGET_H = 1920, 1080
USER_AGENT = "wedding-project/1.0 (personal wedding video project)"

PROVIDERS = {
    "pexels": {
        "env": "PEXELS_API_KEY",
        "signup": "https://www.pexels.com/api/",
        "license": "Pexels License",
        "attribution": "不要",
    },
    "pixabay": {
        "env": "PIXABAY_API_KEY",
        "signup": "https://pixabay.com/api/docs/",
        "license": "Pixabay Content License",
        "attribution": "不要",
    },
}


def die(msg: str) -> None:
    print(f"エラー: {msg}", file=sys.stderr)
    sys.exit(1)


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


# Style Bible が禁じる被写体を示唆する語。説明文に出たら警告する。
# 自動判定ではなく「目視確認せよ」の合図。判断は人間が行う。
RISK_WORDS = {
    "人物": ["people", "person", "man", "woman", "men", "women", "girl", "boy",
             "couple", "crowd", "child", "kid", "family", "hand", "face",
             "tourist", "passenger", "walking", "running", "sitting", "portrait"],
    "動物": ["dog", "cat", "bird", "animal", "horse", "pet"],
    "文字・ロゴ": ["sign", "signage", "text", "logo", "banner", "billboard",
                  "poster", "label", "brand"],
    # 機体外観は塗装(livery)に航空会社のロゴが入る。実測: "airplane wing" は
    # AVIANCA、"airline plane taxiing" は American のロゴが写っていた。
    # 機内からの窓越し("airplane window" 等)は該当しないので語を分けている。
    "機体ロゴ": ["airline", "airways", "aircraft", "wing", "taxiing", "livery",
                "fuselage", "tail"],
}


def desc_from_pexels_url(url: str) -> str:
    """Pexelsのページ URL から説明文を復元する。

    動画APIは alt も tags も返さないが、URLのスラッグが説明になっている。
    例: https://www.pexels.com/video/aerial-view-of-clouds-30808497/
        → "aerial view of clouds"
    """
    if not url:
        return ""
    slug = urllib.parse.urlparse(url).path.rstrip("/").split("/")[-1]
    slug = re.sub(r"-\d+$", "", slug)  # 末尾のID
    return slug.replace("-", " ").strip()


def risk_flags(desc: str) -> list[str]:
    """説明文から、Style Bible違反の可能性がある要素を拾う。"""
    low = (desc or "").lower()
    hits = []
    for category, words in RISK_WORDS.items():
        found = [w for w in words if re.search(rf"\b{w}", low)]
        if found:
            hits.append(f"{category}({', '.join(found[:3])})")
    return hits


def slugify(text: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "_", text.strip().lower())
    return s.strip("_")[:40] or "clip"


def human_size(n: int | None) -> str:
    if not n:
        return "サイズ不明"
    mb = n / 1024 / 1024
    return f"{mb:.1f}MB"


def get_key(provider: str) -> str:
    env = PROVIDERS[provider]["env"]
    key = os.environ.get(env, "").strip()
    if not key:
        die(
            f"{env} が設定されていません。\n"
            f"  1. {PROVIDERS[provider]['signup']} で無料APIキーを取得\n"
            f"  2. export {env}='取得したキー'\n"
            f"  3. もう一度実行\n"
            "  ※ キーは秘密情報。リポジトリにcommitしないこと。"
        )
    return key


def http_json(url: str, headers: dict[str, str]) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, **headers})
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            return json.loads(res.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", "replace")[:300]
        if exc.code in (401, 403):
            die(f"認証エラー({exc.code})。APIキーを確認してください。\n  {body}")
        if exc.code == 429:
            die(f"レート制限({exc.code})。しばらく待って再実行してください。")
        die(f"HTTPエラー {exc.code}: {body}")
    except urllib.error.URLError as exc:
        die(f"接続できません: {exc.reason}")
    return {}


def cached_search(provider: str, url: str, headers: dict[str, str]) -> dict:
    """検索結果を24時間キャッシュする(Pixabayの利用条件に合わせる)。"""
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    key = hashlib.sha256(f"{provider}:{url}".encode()).hexdigest()[:16]
    cache_file = CACHE_DIR / f"{provider}_{key}.json"
    if cache_file.exists() and (time.time() - cache_file.stat().st_mtime) < CACHE_TTL_SEC:
        print(f"(キャッシュを使用: {rel(cache_file)})")
        return json.loads(cache_file.read_text(encoding="utf-8"))
    data = http_json(url, headers)
    cache_file.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    return data


def head_size(url: str) -> int | None:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=20) as res:
            length = res.headers.get("Content-Length")
            return int(length) if length else None
    except Exception:
        return None


def search_pexels(query: str, count: int, key: str) -> list[dict]:
    params = urllib.parse.urlencode(
        {"query": query, "orientation": "landscape", "size": "medium",
         "per_page": min(max(count * 3, count), 80)}
    )
    url = f"https://api.pexels.com/v1/videos/search?{params}"
    data = cached_search("pexels", url, {"Authorization": key})

    out = []
    for v in data.get("videos", []):
        files = [
            f for f in v.get("video_files", [])
            if f.get("file_type") == "video/mp4" and f.get("width") and f.get("height")
        ]
        if not files:
            continue
        # 1920x1080に一番近いものを選ぶ
        best = min(files, key=lambda f: abs(f["width"] - TARGET_W) + abs(f["height"] - TARGET_H))
        out.append(
            {
                "id": str(v.get("id")),
                "width": best["width"],
                "height": best["height"],
                "fps": best.get("fps"),
                "duration": v.get("duration"),
                "link": best["link"],
                "page": v.get("url", ""),
                "author": v.get("user", {}).get("name", ""),
                # 動画APIは alt / tags を返さないので、ページURLのスラッグから説明を取る。
                # 例: .../video/two-people-running-on-beach-9871924/ → "two people running on beach"
                "desc": desc_from_pexels_url(v.get("url", "")),
            }
        )
    return out


def search_pixabay(query: str, count: int, key: str) -> list[dict]:
    params = urllib.parse.urlencode(
        {"key": key, "q": query, "video_type": "film",
         "per_page": min(max(count * 3, 3), 200), "safesearch": "true"}
    )
    url = f"https://pixabay.com/api/videos/?{params}"
    data = cached_search("pixabay", url, {})

    out = []
    for v in data.get("hits", []):
        streams = v.get("videos", {})
        cands = [
            (name, s) for name, s in streams.items()
            if s.get("url") and s.get("width") and s.get("height")
        ]
        if not cands:
            continue
        name, best = min(
            cands, key=lambda kv: abs(kv[1]["width"] - TARGET_W) + abs(kv[1]["height"] - TARGET_H)
        )
        # 横向きだけに絞る(縦動画はこの用途に合わない)
        if best["width"] < best["height"]:
            continue
        out.append(
            {
                "id": str(v.get("id")),
                "width": best["width"],
                "height": best["height"],
                "fps": None,
                "duration": v.get("duration"),
                "link": best["url"],
                "page": v.get("pageURL", ""),
                "author": v.get("user", ""),
                "size": best.get("size"),
                "desc": v.get("tags", ""),
            }
        )
    return out


def record_provenance(rows: list[dict], provider: str, query: str) -> None:
    """出所・ライセンスを残す。後で権利確認できるようにするため。"""
    header = [
        "file_name", "provider", "source_id", "page_url", "author",
        "license", "attribution", "query", "fetched_at",
    ]
    existing: list[list[str]] = []
    if PROVENANCE.exists():
        with PROVENANCE.open(encoding="utf-8") as f:
            reader = list(csv.reader(f))
            existing = reader[1:] if reader else []

    known = {r[0] for r in existing if r}
    meta = PROVIDERS[provider]
    stamp = time.strftime("%Y-%m-%d")
    for r in rows:
        if r["file_name"] in known:
            continue
        existing.append(
            [
                r["file_name"], provider, r["id"], r.get("page", ""), r.get("author", ""),
                meta["license"], meta["attribution"], query, stamp,
            ]
        )

    with PROVENANCE.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(existing)


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--provider", choices=sorted(PROVIDERS), required=True)
    parser.add_argument("--query", required=True, help="検索語(英語推奨)")
    parser.add_argument("--count", type=int, default=3, help="取得本数(既定3, 最大10)")
    parser.add_argument("--write", action="store_true", help="実際にダウンロードする")
    args = parser.parse_args()

    count = max(1, min(args.count, 10))
    key = get_key(args.provider)

    print(f"検索: {args.provider} / \"{args.query}\" / 最大{count}本")
    finder = search_pexels if args.provider == "pexels" else search_pixabay
    results = finder(args.query, count, key)
    if not results:
        die("該当する動画が見つかりませんでした。検索語を変えてください。")

    query_slug = slugify(args.query)
    plan = []
    for r in results:
        if len(plan) >= count:
            break
        # 説明文からファイル名を作る。同じ動画は別クエリでも同名になり、二重取得を防ぐ。
        name_slug = slugify(r.get("desc") or "") or query_slug
        name = f"{args.provider}_{r['id']}_{name_slug}.mp4"
        if (POOL_DIR / name).exists():
            print(f"(取得済みのためスキップ: {name})")
            continue
        size = r.get("size") or head_size(r["link"])
        plan.append({**r, "file_name": name, "bytes": size, "risks": risk_flags(r.get("desc", ""))})

    if not plan:
        print("\n新しく取得するものはありません(すべて取得済み)。")
        return

    total = sum(p["bytes"] or 0 for p in plan)
    print(f"\n取得候補 {len(plan)} 本 (合計 約{human_size(total)}):\n")
    flagged = 0
    for p in plan:
        dur = f"{p['duration']}秒" if p.get("duration") else "尺不明"
        fps = f" / {p['fps']:.0f}fps" if p.get("fps") else ""
        print(f"  {p['file_name']}")
        print(f"      {p['width']}x{p['height']}{fps} / {dur} / {human_size(p['bytes'])}")
        if p.get("desc"):
            print(f"      説明: {p['desc']}")
        print(f"      出所: {p.get('page') or p['link'][:70]}")
        if p.get("author"):
            print(f"      作者: {p['author']}")
        if p["risks"]:
            flagged += 1
            print(f"      ⚠ 要確認: {' / '.join(p['risks'])}")
    meta = PROVIDERS[args.provider]
    print(f"\nライセンス: {meta['license']} / クレジット表記: {meta['attribution']}")
    if flagged:
        print(
            f"⚠ {flagged}本に Style Bible 違反の可能性あり。説明文からの推定なので、"
            "取得するなら必ず目視確認する。"
        )

    if not args.write:
        print("\n[dry-run] 実際に取得するには --write を付けてください。")
        return

    POOL_DIR.mkdir(parents=True, exist_ok=True)
    print()
    saved = []
    for p in plan:
        dest = POOL_DIR / p["file_name"]
        if dest.exists():
            print(f"スキップ(既にある): {p['file_name']}")
            saved.append(p)
            continue
        print(f"取得中: {p['file_name']} ({human_size(p['bytes'])})")
        req = urllib.request.Request(p["link"], headers={"User-Agent": USER_AGENT})
        try:
            with urllib.request.urlopen(req, timeout=120) as res, dest.open("wb") as f:
                while chunk := res.read(1 << 16):
                    f.write(chunk)
        except Exception as exc:
            print(f"  失敗: {exc}", file=sys.stderr)
            dest.unlink(missing_ok=True)
            continue
        saved.append(p)

    if not saved:
        die("1本も取得できませんでした。")

    record_provenance(saved, args.provider, args.query)
    print(f"\n完了: {len(saved)} 本を {rel(POOL_DIR)} に保存しました。")
    print(f"出所を記録: {rel(PROVENANCE)}")
    print("\n次にやること:")
    print("  1. 各動画を目視確認する(人物・動物・文字・ロゴ・看板が無いか)")
    print("  2. python3 scripts/slice_clips.py reel --write")
    print("  3. 使いたい区間を docs/templates/sample-clips.csv に記録")
    print("  4. python3 scripts/slice_clips.py slice --write")


if __name__ == "__main__":
    main()
