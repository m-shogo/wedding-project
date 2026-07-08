#!/usr/bin/env python3
"""オープニングムービー ドラフト自動ビルド

02_opening-movie/storyboard.md (105秒構成) に沿って、
02_opening-movie/sample_image/ のAI静止画から
Ken Burns (ゆっくりズーム/パン) + テロップ + クロスフェードで
ドラフトMP4を組み立てる。

注意:
- sample_image はGit管理外・ローカル管理。
- 人物入りが確認されたAI素材は、ファイルが存在しても使用禁止。
- v002ドラフト用の旧スクリプトなので、レビュー前は asset-status.md と照合してから使う。

- このMacのffmpegはdrawtext無しビルドのため、テロップは
  scripts/render_caption.swift で透過PNGに描き、overlayで合成する
- 実写真章 (4-B, 5-A) はAIサンプル画像でプレースホルダ代用
- BGMは権利確認前のため未挿入 (無音)
- 出力: 90_exports/opening-movie_v002_draft.mp4 (Git管理外)

usage: python3 scripts/build_opening_movie.py
"""

import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
IMG = REPO / "02_opening-movie" / "sample_image"
OUT_DIR = REPO / "90_exports"
OUT_FILE = OUT_DIR / "opening-movie_v002_draft.mp4"
SWIFT_SRC = REPO / "scripts" / "render_caption.swift"

FPS = 30
W, H = 1920, 1080
SRC_W, SRC_H = 3840, 2160  # zoompanのジッタ低減用に2倍で前処理

FONT_SERIF = "Times New Roman"
FONT_SANS = "Helvetica"

RENDER_BIN = None  # main()でコンパイルする

# Style Bible違反が目視確認済みのため、旧ドラフトでも使用禁止。
REJECTED_SOURCES = {
    "op_01_narita_boarding_gate_ai.png": "人物入り（カウンター係員と搭乗客の後ろ姿）",
    "op_11_narita_airport_lobby_ai.png": "人物入り（複数人物）",
}


def caption(lines, t_in, fade_in, t_out, fade_out,
            size=52, font=FONT_SERIF, y_base=0.80, shadow="normal"):
    """テロップ定義 (t_inからフェードイン、t_outで完全に消える)

    y_base既定0.80: 2行テロップの下端が画面下5%セーフエリアに
    かからない位置 (v001レビュー指摘)。
    shadow="strong": 白っぽい背景でも読めるよう影を濃くする。
    """
    return {
        "lines": lines, "t_in": t_in, "fade_in": fade_in,
        "t_out": t_out, "fade_out": fade_out,
        "size": size, "font": font, "y_base": y_base, "shadow": shadow,
    }


def render_caption_png(cap, out_png):
    cmd = [str(RENDER_BIN), "--out", str(out_png),
           "--font", cap["font"], "--size", str(cap["size"]),
           "--ybase", str(cap["y_base"]),
           "--shadow", cap.get("shadow", "normal")]
    for line in cap["lines"]:
        cmd += ["--line", line]
    subprocess.run(cmd, check=True)


def fade_filters(cap):
    """overlay前にPNGストリームへかけるアルファフェード"""
    return (f"format=rgba,"
            f"fade=t=in:st={cap['t_in']}:d={cap['fade_in']}:alpha=1,"
            f"fade=t=out:st={cap['t_out'] - cap['fade_out']}:"
            f"d={cap['fade_out']}:alpha=1")


def kenburns(motion, frames):
    """zoompanフィルタ(ゆっくりズーム/パン)"""
    d = frames - 1
    cx = "(iw-iw/zoom)/2"
    cy = "(ih-ih/zoom)/2"
    if motion == "zoom_in":
        z, x, y = f"1+0.07*on/{d}", cx, cy
    elif motion == "zoom_in_slow":
        z, x, y = f"1+0.04*on/{d}", cx, cy
    elif motion == "zoom_out":
        z, x, y = f"1.07-0.07*on/{d}", cx, cy
    elif motion == "pan_lr":
        z, x, y = "1.10", f"(iw-iw/zoom)*on/{d}", cy
    elif motion == "pan_rl":
        z, x, y = "1.10", f"(iw-iw/zoom)*(1-on/{d})", cy
    else:
        raise ValueError(motion)
    return (f"zoompan=z='{z}':x='{x}':y='{y}':d={frames}:"
            f"s={W}x{H}:fps={FPS}")


def encode(cmd_inputs, filter_complex, last_label, frames, out_path):
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error", *cmd_inputs,
        "-filter_complex", ";".join(filter_complex),
        "-map", f"[{last_label}]",
        "-frames:v", str(frames), "-r", str(FPS),
        "-c:v", "libx264", "-preset", "fast", "-crf", "18",
        str(out_path),
    ]
    subprocess.run(cmd, check=True)


def build_image_clip(img, dur, motion, caps, out_path, tmp, idx,
                     end_fade=None):
    frames = int(dur * FPS)
    inputs = ["-i", str(img)]
    fc = [f"[0:v]scale={SRC_W}:{SRC_H}:force_original_aspect_ratio=increase,"
          f"crop={SRC_W}:{SRC_H},{kenburns(motion, frames)}[v0]"]
    prev = "v0"
    for j, cap in enumerate(caps):
        png = tmp / f"cap_{idx:02d}_{j}.png"
        render_caption_png(cap, png)
        inputs += ["-loop", "1", "-framerate", str(FPS),
                   "-t", str(dur), "-i", str(png)]
        fc.append(f"[{j + 1}:v]{fade_filters(cap)}[c{j}]")
        fc.append(f"[{prev}][c{j}]overlay=0:0[v{j + 1}]")
        prev = f"v{j + 1}"
    tail = ""
    if end_fade:  # 最終クリップの黒フェードアウト
        st, fd = end_fade
        tail = f"fade=t=out:st={st}:d={fd},"
    fc.append(f"[{prev}]{tail}format=yuv420p[vout]")
    encode(inputs, fc, "vout", frames, out_path)


def build_countdown_clip(dur, out_path, tmp):
    """Chapter 0: 暗い光背景(op_20) + 5→1カウントダウン (2秒目から各1秒)

    v001は黒一色だった。v002からop_20(カウントダウン用光背景)を
    ゆっくりズームで敷き、冒頭2秒で黒からフェードインさせる。
    """
    frames = int(dur * FPS)
    img = IMG / "op_20_countdown_light_ai.png"
    inputs = ["-i", str(img)]
    fc = [f"[0:v]scale={SRC_W}:{SRC_H}:force_original_aspect_ratio=increase,"
          f"crop={SRC_W}:{SRC_H},{kenburns('zoom_in_slow', frames)},"
          f"fade=t=in:st=0:d=2.0[bg]"]
    prev = "bg"
    for i, n in enumerate(["5", "4", "3", "2", "1"]):
        t0 = 2 + i
        cap = caption([n], t0, 0.3, t0 + 1, 0.2,
                      size=180, font=FONT_SANS, y_base=0.42)
        png = tmp / f"count_{n}.png"
        render_caption_png(cap, png)
        inputs += ["-loop", "1", "-framerate", str(FPS),
                   "-t", str(dur), "-i", str(png)]
        fc.append(f"[{i + 1}:v]{fade_filters(cap)}[c{i}]")
        fc.append(f"[{prev}][c{i}]overlay=0:0[v{i}]")
        prev = f"v{i}"
    fc.append(f"[{prev}]format=yuv420p[vout]")
    encode(inputs, fc, "vout", frames, out_path)


# (素材, 基本秒数, モーション, テロップ, 次クリップへのトランジション, オーバーラップ秒)
# トランジション: fade=クロスフェード / fadeblack / fadewhite
CLIPS = [
    # Ch0 カウントダウン
    ("COUNTDOWN", 8, None, [], "fadeblack", 0.8),
    # Ch1-A 空港・出発の気配
    # NOTE: op_11/op_01は人物入り確認済みのため、main()で停止する。
    # 人物なし代替素材に差し替えてから旧ドラフトを再ビルドする。
    ("op_11_narita_airport_lobby_ai.png", 5, "zoom_in", [], "fade", 0.8),
    ("op_01_narita_boarding_gate_ai.png", 5, "zoom_in", [], "fade", 1.0),
    # Ch1-B 出発宣言テロップ
    ("op_02_boarding_pass_bg_ai.png", 9, "zoom_in_slow",
     [caption(["Ladies and gentlemen,", "our journey is about to begin."],
              1.5, 1.0, 8.5, 1.5)],
     "fade", 0.8),
    # Ch2-A 搭乗・機内
    ("op_12_narita_runway_takeoff_ai.png", 9, "zoom_in",
     [caption(["2026.10.24", "JPN → HNL"], 1.0, 0.8, 8.0, 0.8,
              font=FONT_SANS, size=46)],
     "fade", 0.8),
    # Ch2-B 飛行機窓・上昇 → 白フェード(M-04 45秒の山)
    ("op_03_airplane_window_clouds_ai.png", 9, "zoom_in", [],
     "fadewhite", 1.5),
    # Ch3 雲海
    ("op_16_cloud_transition_ai.png", 10, "pan_rl",
     [caption(["Hawaii"], 2.0, 2.0, 7.5, 1.5, size=84, y_base=0.45)],
     "fade", 1.0),
    # Ch4-A ハワイ・着陸の光
    ("op_07_hawaii_beach_ai.png", 10, "pan_lr", [], "fade", 0.8),
    # Ch4-B 写真解禁 (実写真プレースホルダ)
    ("op_13_diamond_head_ai.png", 4, "zoom_in",
     [caption(["Oahu, 2023"], 0.6, 0.5, 3.6, 0.4, size=44)], "fade", 0.6),
    ("op_05_okinawa_sea_ai.png", 3, "zoom_out", [], "fade", 0.6),
    # v002: 雨ビーチ(op_08)は一番明るい章に暗すぎたため夕暮れ(op_14)へ差し替え
    ("op_14_okinawa_sunset_ai.png", 4, "pan_lr",
     [caption(["Cookie & Melon"], 0.6, 0.5, 3.6, 0.4, size=44)],
     "fade", 0.6),
    ("op_15_korea_cafe_food_ai.png", 3, "zoom_in", [], "fade", 0.6),
    ("op_06_korea_street_ai.png", 3, "zoom_in", [], "fade", 0.8),
    # Ch5-A 到着・現在 (実写真プレースホルダ)
    ("op_18_ring_closeup_ai.png", 6, "zoom_in_slow", [], "fade", 0.8),
    ("op_19_yokohama_city_ai.png", 5, "zoom_out",
     [caption(["2026.10.24", "Yokohama"], 1.0, 0.8, 4.6, 0.6)],
     "fadeblack", 1.2),
    # Ch5-B 余韻・入場へ
    # v002: 白い床に白文字で読めなかったため影をstrongに (v001レビュー指摘)
    ("op_10_chapel_door_ai.png", 12, "zoom_in_slow",
     [caption(["Cabin crew,", "prepare for arrival."],
              1.5, 1.5, 10.0, 2.0, shadow="strong")],
     None, 0),
]


def validate_clip_sources():
    rejected = []
    for src, *_ in CLIPS:
        if src in REJECTED_SOURCES:
            rejected.append((src, REJECTED_SOURCES[src]))
    if rejected:
        detail = "\n".join(f"- {src}: {reason}" for src, reason in rejected)
        sys.exit(
            "Style Bible違反の不採用素材を参照しています。\n"
            "人物なし素材に差し替えてから実行してください。\n"
            f"{detail}"
        )


def main():
    global RENDER_BIN
    validate_clip_sources()
    OUT_DIR.mkdir(exist_ok=True)
    tmp = Path(tempfile.mkdtemp(prefix="opening_build_"))

    RENDER_BIN = tmp / "render_caption"
    print("テロップ描画ツールをコンパイル中...")
    subprocess.run(["swiftc", "-O", str(SWIFT_SRC), "-o", str(RENDER_BIN)],
                   check=True)

    total = sum(c[1] for c in CLIPS)
    print(f"クリップ {len(CLIPS)}本 / 合計 {total}秒 をビルド中...")

    clip_files = []
    for i, (src, dur, motion, caps, trans, overlap) in enumerate(CLIPS):
        out = tmp / f"clip_{i:02d}.mp4"
        # クロスフェードで食われる分を各クリップ末尾に足す
        build_dur = dur + (overlap if trans else 0)
        if src == "COUNTDOWN":
            build_countdown_clip(build_dur, out, tmp)
        else:
            img = IMG / src
            if not img.exists():
                sys.exit(f"画像が見つかりません: {img}")
            end_fade = (dur - 2.0, 2.0) if trans is None else None
            build_image_clip(img, build_dur, motion, caps, out, tmp, i,
                             end_fade)
        clip_files.append(out)
        print(f"  [{i + 1}/{len(CLIPS)}] {src} ({build_dur}s)")

    # xfadeチェーンで一括結合 (offsetは基本秒数の累積)
    inputs = []
    for f in clip_files:
        inputs += ["-i", str(f)]
    fc = []
    prev = "[0:v]"
    offset = 0.0
    for i, (_, dur, _, _, trans, overlap) in enumerate(CLIPS[:-1]):
        offset += dur
        label = f"[v{i + 1}]"
        fc.append(
            f"{prev}[{i + 1}:v]xfade=transition={trans}:"
            f"duration={overlap}:offset={offset}{label}"
        )
        prev = label
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error", *inputs,
        "-filter_complex", ";".join(fc),
        "-map", prev,
        "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p", "-r", str(FPS),
        str(OUT_FILE),
    ]
    print("結合中...")
    subprocess.run(cmd, check=True)
    print(f"完了: {OUT_FILE}")


if __name__ == "__main__":
    main()
