#!/usr/bin/env python3
"""ComfyUI API経由でオープニング用AI素材をまとめてImage-to-Video生成する

02_opening-movie/ai-prompts.md の採点済みプロンプトを、対応する
sample_image/ の静止画とペアにして順番に生成する。
設定は docs/decisions/2026-06-10-wan5b-i2v-settings.md の標準設定
(480x272 / 49f / 14steps / cfg5.0)。1本あたり約15分かかる。

明るい屋外シーンは白飛び対策として
"balanced natural exposure, soft light only" をプロンプトに足してある。

結果は 02_opening-movie/i2v-generation-log.csv に追記する。
生成動画は ~/ComfyUI-Shared/output/video/ に出る。Gitには入れない。

usage:
  python3 scripts/comfy_i2v_batch.py            # 全ジョブ実行
  python3 scripts/comfy_i2v_batch.py --list     # ジョブ一覧だけ表示
  python3 scripts/comfy_i2v_batch.py --only op_16_cloud_sea_test01
"""

import argparse
import csv
import datetime
import json
import sys
import time
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comfy_i2v import API, build_workflow, post_json, upload_image  # noqa: E402

REPO = Path(__file__).resolve().parent.parent
IMG = REPO / "02_opening-movie" / "sample_image"
LOG = REPO / "02_opening-movie" / "i2v-generation-log.csv"
OUT_VIDEO = Path.home() / "ComfyUI-Shared" / "output"

EXPOSURE_SAFE = " Balanced natural exposure, soft light only, no overexposure."

# (prefix, material_id, image, positive)
# プロンプトは 02_opening-movie/ai-prompts.md と同一。明るい屋外のみ露出指定を追加。
JOBS = [
    (
        "op_16_cloud_sea_test01", "素材3 雲海(89点)",
        "op_16_cloud_transition_ai.png",
        "A cinematic 5-second looping background shot of a vast cloudscape "
        "seen from above, dense white and pale golden clouds stretching to "
        "the horizon like an ocean of mist, warm morning sunlight casting "
        "long soft shadows across the cloud tops, deep navy sky above fading "
        "to pale blue at the horizon, travel wedding film style, navy gold "
        "white color palette, subtle film grain, elegant and emotional, slow "
        "smooth horizontal pan revealing the endless cloudscape, clean "
        "composition with horizon in upper third, space for captions at "
        "bottom, no text, no logo, no watermark, no people, no animals, "
        "no signage." + EXPOSURE_SAFE,
    ),
    (
        "op_02_abstract_light_test01", "素材1-B 抽象背景(88点)",
        "op_02_boarding_pass_bg_ai.png",
        "A cinematic looping abstract background of soft bokeh light "
        "particles and gentle lens flare drifting slowly across a deep navy "
        "background, warm golden and white light orbs, atmospheric haze, "
        "subtle shimmer, travel wedding film style, navy gold white color "
        "palette, elegant and emotional, very slow drifting motion, minimal "
        "and clean composition, generous space for text overlay in the "
        "center, subtle film grain, no text, no logo, no watermark, "
        "no people, no animals, no signage, no distorted objects.",
    ),
    (
        "op_03_airplane_window_sky_test01", "素材2-B 飛行機窓・青空(86点)",
        "op_03_airplane_window_clouds_ai.png",
        "A cinematic 5-second looping background shot looking out of an "
        "airplane window during ascent, soft blue sky filling the upper "
        "frame, white fluffy clouds drifting slowly past below, pale golden "
        "sunlight on the clouds, clean and serene, travel wedding film "
        "style, navy gold white color palette, subtle film grain, elegant "
        "and emotional, slow smooth upward drift as if clouds are passing "
        "by, window frame as foreground, clean composition, space for "
        "captions at lower third, no text, no logo, no watermark, no people, "
        "no animals, no signage." + EXPOSURE_SAFE,
    ),
    # 素材1-A-1(op_11)と1-A-2(op_01)は静止画に人物が写っているため除外
    # (failure-patterns: 人物が出たら即不採用)。人物なしの静止画を
    # 作り直してからジョブを追加する。2026-06-11 v001レビューで判明。
]

SETTINGS = argparse.Namespace(
    width=480, height=272, length=49, steps=14, cfg=5.0, seed=42, fps=16)


def append_log(row):
    new = not LOG.exists()
    with LOG.open("a", newline="") as f:
        w = csv.writer(f)
        if new:
            w.writerow(["date", "prefix", "material", "image", "settings",
                        "status", "elapsed_min", "output", "notes"])
        w.writerow(row)


def run_job(prefix, material, image_name_local, positive):
    img_path = IMG / image_name_local
    image_name = upload_image(img_path)
    SETTINGS.prefix = prefix
    wf = build_workflow(image_name, positive, SETTINGS)
    prompt_id = post_json("/prompt", {"prompt": wf})["prompt_id"]
    print(f"[{prefix}] queued {prompt_id}", flush=True)

    t0 = time.time()
    while True:
        time.sleep(20)
        with urllib.request.urlopen(f"{API}/history/{prompt_id}",
                                    timeout=30) as r:
            hist = json.load(r)
        elapsed = int(time.time() - t0)
        if prompt_id not in hist:
            if elapsed % 300 < 20:
                print(f"[{prefix}] running... {elapsed // 60}min", flush=True)
            continue
        entry = hist[prompt_id]
        status = entry["status"]["status_str"]
        today = datetime.date.today().isoformat()
        settings = (f"{SETTINGS.width}x{SETTINGS.height}/"
                    f"{SETTINGS.length}f/{SETTINGS.steps}steps/"
                    f"cfg{SETTINGS.cfg}/seed{SETTINGS.seed}")
        if status != "success":
            msgs = json.dumps(entry["status"].get("messages", []))[:500]
            append_log([today, prefix, material, image_name_local,
                        settings, "failed", round(elapsed / 60, 1), "", msgs])
            print(f"[{prefix}] FAILED: {msgs}", flush=True)
            return False
        outputs = []
        for out in entry["outputs"].values():
            for img in out.get("images", []):
                outputs.append(str(OUT_VIDEO / img["subfolder"]
                                   / img["filename"]))
        append_log([today, prefix, material, image_name_local, settings,
                    "success", round(elapsed / 60, 1),
                    ";".join(outputs), "未採点"])
        print(f"[{prefix}] done in {elapsed // 60}min: "
              f"{';'.join(outputs)}", flush=True)
        return True


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--list", action="store_true")
    p.add_argument("--only", help="prefix指定で1本だけ実行")
    args = p.parse_args()

    jobs = JOBS
    if args.only:
        jobs = [j for j in JOBS if j[0] == args.only]
        if not jobs:
            raise SystemExit(f"unknown prefix: {args.only}")
    if args.list:
        for prefix, material, image, _ in jobs:
            print(f"{prefix}  {material}  {image}")
        return

    ok = fail = 0
    for prefix, material, image, positive in jobs:
        if run_job(prefix, material, image, positive):
            ok += 1
        else:
            fail += 1
    print(f"batch finished: {ok} success / {fail} failed", flush=True)
    if fail:
        sys.exit(1)


if __name__ == "__main__":
    main()
