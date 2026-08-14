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

    slug = slugify(args.query)
    plan = []
    for r in results[:count]:
        name = f"{args.provider}_{r['id']}_{slug}.mp4"
        size = r.get("size") or head_size(r["link"])
        plan.append({**r, "file_name": name, "bytes": size})

    total = sum(p["bytes"] or 0 for p in plan)
    print(f"\n取得候補 {len(plan)} 本 (合計 約{human_size(total)}):\n")
    for p in plan:
        dur = f"{p['duration']}秒" if p.get("duration") else "尺不明"
        fps = f" / {p['fps']:.0f}fps" if p.get("fps") else ""
        print(f"  {p['file_name']}")
        print(f"      {p['width']}x{p['height']}{fps} / {dur} / {human_size(p['bytes'])}")
        print(f"      出所: {p.get('page') or p['link'][:70]}")
        if p.get("author"):
            print(f"      作者: {p['author']}")
    meta = PROVIDERS[args.provider]
    print(f"\nライセンス: {meta['license']} / クレジット表記: {meta['attribution']}")

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
