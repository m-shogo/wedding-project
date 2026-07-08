#!/usr/bin/env python3
"""オープニングムービー素材の整合性チェック

突き合わせるもの:
- 02_opening-movie/ai-prompts.md の採点済み素材(MATERIALSに反映)
- 02_opening-movie/sample_image/ の静止画（Git管理外・ローカル管理）
- scripts/build_opening_movie.py が参照する画像
- ~/ComfyUI-Shared/output/video/ の生成済みI2V動画
- 02_opening-movie/i2v-generation-log.csv の採点状態

検出するもの:
- 静止画が無くI2Vに進めない素材
- プロンプトはあるが動画未生成の素材
- 生成済みだが未採点の動画
- どの素材にも紐付かない静止画・動画
- _dup_ 重複ファイル
- Style Bible違反で不採用になった素材

usage:
  python3 scripts/check_assets.py            # 標準出力にレポート
  python3 scripts/check_assets.py --write    # 02_opening-movie/asset-status.md に保存
"""

import argparse
import csv
import datetime
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
IMG_DIR = REPO / "02_opening-movie" / "sample_image"
VIDEO_DIR = Path.home() / "ComfyUI-Shared" / "output" / "video"
GEN_LOG = REPO / "02_opening-movie" / "i2v-generation-log.csv"
SCORECARD = REPO / "docs" / "templates" / "ai-video-scorecard.csv"
BUILD_SCRIPT = REPO / "scripts" / "build_opening_movie.py"
REPORT = REPO / "02_opening-movie" / "asset-status.md"

# ai-prompts.md の素材一覧。image=Noneは対応静止画が存在しない。
# video_prefix は ~/ComfyUI-Shared/output/video/ のファイル名先頭で照合。
MATERIALS = [
    ("3", "雲海（上から）", 89, "op_16_cloud_transition_ai.png", "op_16"),
    ("1-B", "薄い光の抽象背景", 88, "op_02_boarding_pass_bg_ai.png", "op_02"),
    ("2-A", "飛行機窓・地上の遠景", 87, None, None),
    ("2-B", "飛行機窓・青空と雲", 86,
     "op_03_airplane_window_clouds_ai.png", "op_03"),
    ("1-A-1", "空港ロビーの光（朝）", 85,
     "op_11_narita_airport_lobby_ai.png", "op_11"),
    ("4-A-1", "ハワイの海・ゴールドの光", 85,
     "op_07_hawaii_beach_ai.png", "op_07"),
    ("5-B", "光が差す扉", 84, "op_10_chapel_door_ai.png", "op_10"),
    ("1-A-2", "空港ロビーの光（夜）", 82,
     "op_01_narita_boarding_gate_ai.png", "op_01"),
    ("4-A-2", "ハワイの海・夕暮れ", 81, None, None),
]

# Style Bible違反が目視確認済みの素材。
# これらはファイルがローカルに存在しても採用候補に戻さない。
REJECTED_IMAGES = {
    "op_01_narita_boarding_gate_ai.png": "人物入り（カウンター係員と搭乗客の後ろ姿）",
    "op_11_narita_airport_lobby_ai.png": "人物入り（複数人物）",
}

# 生成結果として不採用が判明しているI2V。
REJECTED_VIDEO_PREFIXES = {
    "op_10": "I2V版は光が出ず暗い。Remotion版 `扉-光` と比較、AI版は再生成対象。",
}


def read_scored_prefixes():
    """scorecardと生成ログから採点済みprefixを集める。"""
    scored_prefixes = set()
    if SCORECARD.exists():
        with SCORECARD.open() as f:
            for r in csv.DictReader(f):
                if r.get("decision") and r.get("notes"):
                    scored_prefixes.add(r["asset_name"][:5])
    return scored_prefixes


def read_generation_log():
    if not GEN_LOG.exists():
        return []
    with GEN_LOG.open() as f:
        return list(csv.DictReader(f))


def is_scored(vprefix, scored_prefixes, log_rows):
    if not vprefix:
        return False
    if vprefix in scored_prefixes:
        return True
    return bool([
        r for r in log_rows
        if r.get("prefix", "").startswith(vprefix)
        and r.get("notes") not in ("", "未採点")
    ])


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--write", action="store_true")
    args = p.parse_args()

    images = sorted(f.name for f in IMG_DIR.glob("*.png"))
    videos = sorted(f.name for f in VIDEO_DIR.glob("*.mp4")) \
        if VIDEO_DIR.exists() else []
    build_src = BUILD_SCRIPT.read_text() if BUILD_SCRIPT.exists() else ""
    build_refs = set(re.findall(r"op_\d+\w*\.png", build_src))

    log_rows = read_generation_log()
    scored_prefixes = read_scored_prefixes()

    lines = [
        "# オープニング素材ステータス",
        "",
        f"最終更新: {datetime.date.today().isoformat()}"
        "（`python3 scripts/check_assets.py --write` で再生成）",
        "",
        "## 前提",
        "",
        "- `02_opening-movie/sample_image/**` はGit管理外。GitHub上に画像が無いこと自体は欠落ではない。",
        "- この表は、ローカル素材・I2V生成ログ・scorecard・目視確認結果を合わせて読む。",
        "- 人物、動物、文字、ロゴ、看板が入ったAI素材は、点数が高くても不採用または再生成対象。",
        "- AIが勝手に採用確定しない。`candidate` 以上への昇格は人間確認が必須。",
        "",
        "## 素材別ステータス",
        "",
        "| 素材ID | 名前 | 点 | 静止画 | I2V動画 | 状態 |",
        "|--------|------|----|--------|---------|------|",
    ]
    problems = []
    rejected_rows = []

    for mid, name, score, image, vprefix in MATERIALS:
        img_ok = image in images if image else False
        vids = [v for v in videos if vprefix and v.startswith(vprefix)]
        scored = is_scored(vprefix, scored_prefixes, log_rows)

        if image in REJECTED_IMAGES:
            status = "不採用（人物入り・再生成対象）"
            rejected_rows.append((image, REJECTED_IMAGES[image], "人物なしで再生成"))
            problems.append(f"素材{mid} {name}: {image} は{REJECTED_IMAGES[image]}のため再生成する。")
        elif vprefix in REJECTED_VIDEO_PREFIXES:
            status = "I2V版は不採用。Remotion版と比較"
            rejected_rows.append((f"{vprefix} I2V", REJECTED_VIDEO_PREFIXES[vprefix], "Remotion版と比較。AI版は再生成"))
            problems.append(f"素材{mid} {name}: {REJECTED_VIDEO_PREFIXES[vprefix]}")
        elif image is None:
            status = "静止画なし（I2V不可）"
            problems.append(f"素材{mid} {name}: 対応する静止画がない。"
                            "先に静止画を生成するか流用元を決める。")
        elif not img_ok:
            status = "静止画が見つからない（ローカル管理確認）"
            problems.append(f"素材{mid} {name}: {image} がローカルに存在するか確認する。")
        elif not vids:
            status = "動画未生成"
        elif not scored:
            status = "生成済み・未採点"
            problems.append(f"素材{mid} {name}: 動画 {len(vids)}本が未採点。"
                            "scorecardで採点して採否を決める。")
        else:
            status = "採点済み・採用候補"
        lines.append(f"| {mid} | {name} | {score} | "
                     f"{image or '—'} | {len(vids)}本 | {status} |")

    if rejected_rows:
        lines += ["", "## 不採用・再生成対象", "",
                  "| 素材 | 理由 | 次の対応 |",
                  "|---|---|---|"]
        lines += [f"| {asset} | {reason} | {next_action} |"
                  for asset, reason, next_action in rejected_rows]

    # どの素材にも紐付かない静止画
    mat_images = {m[3] for m in MATERIALS if m[3]}
    orphan_imgs = [i for i in images
                   if i not in mat_images and i not in build_refs]
    dups = [i for i in images if i.startswith("_dup_")]

    # どの素材にも紐付かない動画
    prefixes = [m[4] for m in MATERIALS if m[4]]
    orphan_vids = [v for v in videos
                   if not any(v.startswith(px) for px in prefixes)]

    lines += ["", "## ドラフトビルドが参照する画像", "",
              f"build_opening_movie.py 参照: {len(build_refs)}枚 / "
              f"sample_image: {len(images)}枚",
              "",
              "`build_opening_movie.py` はv002ドラフト用の旧ビルドスクリプト。",
              "人物入り不採用素材を参照する場合は、本番候補扱いせず代替素材へ差し替える。"]

    if orphan_imgs:
        lines += ["", "## 未使用の静止画（素材表・ビルド両方で未参照）", ""]
        lines += [f"- {i}" for i in orphan_imgs]
    if dups:
        lines += ["", "## 重複ファイル（削除候補）", ""]
        lines += [f"- {d}" for d in dups]
    if orphan_vids:
        lines += ["", "## 素材表に紐付かない生成動画（採否未整理）", ""]
        lines += [f"- {v}" for v in orphan_vids]

    lines += ["", "## 要対応", ""]
    if problems:
        lines += [f"- {p}" for p in problems]
    else:
        lines += ["- なし"]

    report = "\n".join(lines) + "\n"
    print(report)
    if args.write:
        REPORT.write_text(report)
        print(f"saved: {REPORT}")


if __name__ == "__main__":
    main()
