#!/usr/bin/env python3
"""ComfyUI API経由でWan2.2 TI2V 5B fp16のImage-to-Video生成を実行する

成功済みワークフロー(op_11 narita lobby test01)と同じノード構成を使う。
画像をComfyUIにアップロード→キュー投入→完了までポーリング→出力パスを表示。

usage:
  python3 scripts/comfy_i2v.py \
    --image 02_opening-movie/sample_image/op_07_hawaii_beach_ai.png \
    --prompt "..." --prefix op_07_hawaii_beach_test01 \
    [--width 480 --height 272 --length 49 --steps 8 --seed 42 --fps 16]
"""

import argparse
import json
import mimetypes
import time
import urllib.request
import uuid
from pathlib import Path

API = "http://127.0.0.1:8188"

NEGATIVE = (
    "text, subtitles, readable letters, logos, brand marks, distorted "
    "objects, warped architecture, extra people, visible faces, flickering, "
    "unstable camera, fast camera movement, low quality, blurry, noisy, "
    "deformed objects, unrealistic motion, animals, signage, watermark, "
    "overexposed, blown highlights, washed out colors, white wash"
)


def upload_image(path):
    boundary = uuid.uuid4().hex
    name = Path(path).name
    ctype = mimetypes.guess_type(name)[0] or "application/octet-stream"
    body = b"".join([
        f"--{boundary}\r\n".encode(),
        f'Content-Disposition: form-data; name="image"; '
        f'filename="{name}"\r\n'.encode(),
        f"Content-Type: {ctype}\r\n\r\n".encode(),
        Path(path).read_bytes(),
        f"\r\n--{boundary}--\r\n".encode(),
    ])
    req = urllib.request.Request(
        f"{API}/upload/image", data=body, method="POST",
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)["name"]


def build_workflow(image_name, positive, args):
    return {
        "1": {"class_type": "UNETLoader", "inputs": {
            "unet_name": "wan2.2_ti2v_5B_fp16.safetensors",
            "weight_dtype": "default"}},
        "2": {"class_type": "ModelSamplingSD3", "inputs": {
            "model": ["1", 0], "shift": 8.0}},
        "3": {"class_type": "CLIPLoader", "inputs": {
            "clip_name": "umt5_xxl_fp16.safetensors", "type": "wan"}},
        "4": {"class_type": "VAELoader", "inputs": {
            "vae_name": "wan2.2_vae.safetensors"}},
        "5": {"class_type": "LoadImage", "inputs": {"image": image_name}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {
            "clip": ["3", 0], "text": positive}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {
            "clip": ["3", 0], "text": NEGATIVE}},
        "8": {"class_type": "WanImageToVideo", "inputs": {
            "positive": ["6", 0], "negative": ["7", 0], "vae": ["4", 0],
            "start_image": ["5", 0], "width": args.width,
            "height": args.height, "length": args.length, "batch_size": 1}},
        "9": {"class_type": "KSampler", "inputs": {
            "model": ["2", 0], "positive": ["8", 0], "negative": ["8", 1],
            "latent_image": ["8", 2], "seed": args.seed, "steps": args.steps,
            "cfg": args.cfg, "sampler_name": "euler", "scheduler": "simple",
            "denoise": 1.0}},
        "10": {"class_type": "VAEDecode", "inputs": {
            "samples": ["9", 0], "vae": ["4", 0]}},
        "11": {"class_type": "CreateVideo", "inputs": {
            "images": ["10", 0], "fps": float(args.fps)}},
        "12": {"class_type": "SaveVideo", "inputs": {
            "video": ["11", 0], "filename_prefix": f"video/{args.prefix}",
            "format": "mp4", "codec": "h264"}},
    }


def post_json(path, payload):
    req = urllib.request.Request(
        f"{API}{path}", data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--image", required=True)
    p.add_argument("--prompt", required=True)
    p.add_argument("--prefix", required=True)
    p.add_argument("--width", type=int, default=480)
    p.add_argument("--height", type=int, default=272)
    p.add_argument("--length", type=int, default=49)
    p.add_argument("--steps", type=int, default=8)
    p.add_argument("--cfg", type=float, default=5.0)
    p.add_argument("--seed", type=int, default=42)
    p.add_argument("--fps", type=int, default=16)
    args = p.parse_args()

    image_name = upload_image(args.image)
    wf = build_workflow(image_name, args.prompt, args)
    prompt_id = post_json("/prompt", {"prompt": wf})["prompt_id"]
    print(f"queued: {prompt_id} "
          f"({args.width}x{args.height}, {args.length}f, "
          f"{args.steps}steps, seed={args.seed})", flush=True)

    t0 = time.time()
    while True:
        time.sleep(15)
        with urllib.request.urlopen(
                f"{API}/history/{prompt_id}", timeout=30) as r:
            hist = json.load(r)
        elapsed = int(time.time() - t0)
        if prompt_id not in hist:
            print(f"  running... {elapsed}s", flush=True)
            continue
        entry = hist[prompt_id]
        status = entry["status"]["status_str"]
        if status != "success":
            msgs = entry["status"].get("messages", [])
            raise SystemExit(f"failed: {status}\n{json.dumps(msgs)[:2000]}")
        for out in entry["outputs"].values():
            for img in out.get("images", []):
                path = (Path.home() / "ComfyUI-Shared" / "output" /
                        img["subfolder"] / img["filename"])
                print(f"done in {elapsed}s: {path}", flush=True)
        return


if __name__ == "__main__":
    main()
