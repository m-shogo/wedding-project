#!/usr/bin/env python3
"""StaRt 129秒ショーケース用の無料ダミー素材を、role単位でPexels公式APIから取得する。

docs/free-sample-sources.md の方針を継承する:
- スクレイピングしない。公式API(要PEXELS_API_KEY)だけを使う。
- 取得しただけでは採用完了にしない。目視で人物過多・ロゴ・看板・低品質を確認する。
- Coverr等、AI利用を禁じる素材サイトは対象にしない(ここではPexelsのみ)。

使い方:
  export PEXELS_API_KEY='...'

  # 候補を見るだけ(ダウンロードしない)
  python3 scripts/fetch-start-129-demo-assets.py --role HERO_WIDE --count 3

  # 実際に取得する(1roleにつき最大 --count 枚)
  python3 scripts/fetch-start-129-demo-assets.py --role HERO_WIDE --count 3 --write

  # 全role一括(時間がかかるため候補確認を先に推奨)
  python3 scripts/fetch-start-129-demo-assets.py --all --write

取得先: motion-studio/public/demo/start-129/<ROLE>/ (Git管理外)
出所・ライセンスは同ディレクトリの _provenance.csv へ追記する。

このスクリプトは検索・取得までしか行わない。
取得後は必ず目視確認し、pnpm sync:start-129-demo-assets を実行してから
Remotion側(StartDemoBackdrop)へ反映する。
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

STUDIO_ROOT = Path(__file__).resolve().parent.parent
DEMO_ROOT = STUDIO_ROOT / "public" / "demo" / "start-129"

ROLES: dict[str, str] = {
    "HERO_WIDE": "couple silhouette back view travel wide",
    "HERO_CLOSE": "hands holding travel detail",
    "DEPARTURE": "airport window suitcase walking",
    "OKINAWA_WIDE": "okinawa ocean horizon blue sky",
    "SEOUL_STREET": "seoul street night city movement",
    "HAWAII_WARM": "hawaii sunset beach warm backlight",
    "DETAIL_HAND": "ticket map camera detail travel",
    "MOVEMENT_LEFT_TO_RIGHT": "walking left to right platform",
    "MOVEMENT_RIGHT_TO_LEFT": "walking right to left street",
    "VERTICAL_PORTRAIT": "travel vertical portrait scenery",
    "NEGATIVE_SPACE": "empty sky negative space minimal",
    "ARRIVAL_YOKOHAMA": "yokohama port city night wide",
    "END_BREATH": "calm horizon still evening",
    "BROLL_WALK": "walking feet path short clip",
    "BROLL_TEXTURE": "water surface light texture short clip",
}
VIDEO_ROLES = {"MOVEMENT_LEFT_TO_RIGHT", "MOVEMENT_RIGHT_TO_LEFT", "BROLL_WALK", "BROLL_TEXTURE"}

# Pexels orientation filter(landscape/portrait/square)。role の aspectHint と対応させる。
# 参照: https://www.pexels.com/api/documentation/ (2026-08-25 WebFetchで確認)
ROLE_ORIENTATION: dict[str, str] = {
    "HERO_WIDE": "landscape",
    "DEPARTURE": "landscape",
    "OKINAWA_WIDE": "landscape",
    "SEOUL_STREET": "landscape",
    "HAWAII_WARM": "landscape",
    "MOVEMENT_LEFT_TO_RIGHT": "landscape",
    "MOVEMENT_RIGHT_TO_LEFT": "landscape",
    "NEGATIVE_SPACE": "landscape",
    "ARRIVAL_YOKOHAMA": "landscape",
    "END_BREATH": "landscape",
    "BROLL_WALK": "landscape",
    "BROLL_TEXTURE": "landscape",
    "VERTICAL_PORTRAIT": "portrait",
    # HERO_CLOSE / DETAIL_HAND は4:5(縦長寄り正方形)のためPexelsの3値filterに
    # 厳密対応しない。orientation指定なしで取得し、目視選定時にaspectを確認する。
}


def pexels_search(query: str, count: int, media: str, api_key: str, orientation: str | None) -> list[dict]:
    # Pexels公式: 写真/動画とも /v1/ 配下が正式パス(2026-08-25 公式ドキュメントで確認)。
    base = "https://api.pexels.com/v1/videos/search" if media == "video" else "https://api.pexels.com/v1/search"
    params = {"query": query, "per_page": str(count)}
    if orientation:
        params["orientation"] = orientation
    if media == "video":
        params["size"] = "medium"  # Full HD相当。large=4K/8Kは不要に大きい
    url = f"{base}?{urllib.parse.urlencode(params)}"
    # Cloudflare WAF (error 1010) blocks the default Python-urllib user-agent; use a normal one.
    req = urllib.request.Request(
        url,
        headers={"Authorization": api_key, "User-Agent": "Mozilla/5.0 (wedding-project start-129 fetch script)"},
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data.get("videos" if media == "video" else "photos", [])


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (wedding-project start-129 fetch script)"})
    with urllib.request.urlopen(req, timeout=30) as resp, dest.open("wb") as f:
        f.write(resp.read())


def record_provenance(role: str, row: dict) -> None:
    provenance_path = DEMO_ROOT / "_provenance.csv"
    is_new = not provenance_path.exists()
    provenance_path.parent.mkdir(parents=True, exist_ok=True)
    with provenance_path.open("a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["role", "id", "source_url", "photographer", "license_url", "fetched_at"])
        if is_new:
            writer.writeheader()
        writer.writerow(row)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--role", choices=list(ROLES.keys()))
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--count", type=int, default=3)
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()

    if not args.role and not args.all:
        parser.error("--role <ROLE> または --all を指定してください")

    api_key = os.environ.get("PEXELS_API_KEY")
    if not api_key:
        print("PEXELS_API_KEY が未設定です。https://www.pexels.com/api/ で取得してください。", file=sys.stderr)
        sys.exit(1)

    roles = list(ROLES.keys()) if args.all else [args.role]
    failures: list[dict] = []

    for role in roles:
        query = ROLES[role]
        media = "video" if role in VIDEO_ROLES else "photo"
        orientation = ROLE_ORIENTATION.get(role)
        print(f"\n=== {role} ({media}) query='{query}' orientation={orientation or '(未指定)'} ===")
        try:
            items = pexels_search(query, args.count, media, api_key, orientation)
        except Exception as e:  # noqa: BLE001
            print(f"  検索失敗: {e}", file=sys.stderr)
            failures.append({"role": role, "query": query, "media": media, "reason": str(e)})
            continue

        if not items:
            print("  候補0件")
            failures.append({"role": role, "query": query, "media": media, "reason": "0 results"})
            continue

        for item in items:
            if media == "photo":
                src = item["src"]["large2x"]
                item_id = item["id"]
                photographer = item.get("photographer", "unknown")
                page_url = item.get("url", "")
                ext = ".jpg"
            else:
                # orientation指定通りのfileを優先(APIの検索結果自体は動画単位なので、
                # video_files内の複数解像度から役割に合う向きを選び直す)。
                files = item.get("video_files", [])
                if orientation == "landscape":
                    landscape_files = [f for f in files if f.get("width", 0) >= f.get("height", 0)]
                    files = landscape_files or files
                elif orientation == "portrait":
                    portrait_files = [f for f in files if f.get("height", 0) > f.get("width", 0)]
                    files = portrait_files or files
                files = sorted(files, key=lambda f: f.get("width", 0), reverse=True)
                src = files[0]["link"] if files else None
                item_id = item["id"]
                photographer = item.get("user", {}).get("name", "unknown")
                page_url = item.get("url", "")
                ext = ".mp4"
            if not src:
                failures.append({"role": role, "query": query, "media": media, "reason": f"id {item.get('id')}: no matching video_files for orientation={orientation}"})
                continue

            dest = DEMO_ROOT / role / f"pexels-{item_id}{ext}"
            print(f"  候補: {src} (by {photographer}) → {dest.relative_to(STUDIO_ROOT)}")

            if args.write:
                download(src, dest)
                record_provenance(
                    role,
                    {
                        "role": role,
                        "id": str(item_id),
                        "source_url": page_url,
                        "photographer": photographer,
                        "license_url": "https://www.pexels.com/license/",
                        "fetched_at": time.strftime("%Y-%m-%d"),
                    },
                )
                print(f"  ✅ 取得: {dest}")
                time.sleep(0.5)

    if args.write:
        print("\n取得後は必ず目視確認し、`pnpm sync:start-129-demo-assets` を実行してください。")
    else:
        print("\n(候補表示のみ。実際に取得するには --write を付けてください)")

    # 取得失敗・0件・orientation不一致をJSONへ保存(Dashboardの「未取得・代替待ち」表示用)。
    report_path = DEMO_ROOT / "_fetch_failures.json"
    DEMO_ROOT.mkdir(parents=True, exist_ok=True)
    if failures:
        report_path.write_text(json.dumps({"generatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"), "failures": failures}, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"\n⚠️  取得失敗/代替待ち {len(failures)}件 → {report_path.relative_to(STUDIO_ROOT)}")
    elif report_path.exists():
        report_path.write_text(json.dumps({"generatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"), "failures": []}, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
