#!/usr/bin/env python3
"""AVSyncTest.mp4を再解析し、設計時刻(designTimeSec)に対して
実際のaudio click位置とvideo flash位置がどれだけズレているかを測定する。

これは「TimingMasterの音楽的正確さ」ではなく、「Remotion render→ffmpeg encode
→MP4 muxのpipeline自体が指定時刻を維持できるか」を検証する(P0指摘対応)。

実行:
  source local/analysis/venv/bin/activate
  python3 scripts/analyze_av_sync_test.py
"""
import json
import subprocess
from pathlib import Path

import numpy as np

STUDIO_ROOT = Path(__file__).resolve().parent.parent
MP4_PATH = STUDIO_ROOT / "local/analysis/start-wedding/av-sync-test/av-sync-test.mp4"
OUT_JSON = STUDIO_ROOT / "local/analysis/start-wedding/av-sync-test-result.local.json"

DESIGN_POINTS = [
    ("ANCHOR-INTRO", 2.0),
    ("ANCHOR-VERSE1", 16.0),
    ("ANCHOR-PRECHORUS1", 30.0),
    ("ANCHOR-CHORUS1", 45.0),
    ("ANCHOR-VERSE2", 60.0),
    ("ANCHOR-MIDDLE", 75.0),
    ("ANCHOR-PRECHORUS2", 90.0),
    ("ANCHOR-CHORUS2A", 105.0),
    ("ANCHOR-CHORUS2B", 120.0),
    ("ANCHOR-INTERLUDE", 135.0),
    ("ANCHOR-ENDING", 144.0),
]
FPS = 30
SR = 44100
WINDOW_SEC = 1.0  # 各design pointの前後1秒だけ切り出して解析


def decode_audio_window(t: float) -> np.ndarray:
    cmd = [
        "ffmpeg", "-v", "error",
        "-ss", str(max(0, t - WINDOW_SEC / 2)), "-t", str(WINDOW_SEC),
        "-i", str(MP4_PATH),
        "-ac", "1", "-ar", str(SR), "-f", "f32le", "-",
    ]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def find_click_offset_ms(t: float) -> float | None:
    """window内で振幅が急激に立ち上がるsampleを探し、window開始からのms、
    design timeからのdelta msを返す。"""
    audio = decode_audio_window(t)
    if len(audio) == 0:
        return None
    energy = np.abs(audio)
    threshold = max(0.05, energy.max() * 0.3)
    idx = np.argmax(energy > threshold)
    if energy[idx] <= threshold:
        return None
    window_start = max(0, t - WINDOW_SEC / 2)
    detected_sec = window_start + idx / SR
    return round((detected_sec - t) * 1000, 2)


def find_flash_frame_delta(t: float) -> float | None:
    """design time近傍のframeを1枚ずつ抽出し、白く(明るく)なった最初のframeを
    探し、design frameからの差分(frame単位)をmsへ変換して返す。"""
    design_frame = round(t * FPS)
    for offset in range(-3, 6):
        frame = design_frame + offset
        ts = frame / FPS
        cmd = [
            "ffmpeg", "-v", "error", "-ss", str(ts), "-i", str(MP4_PATH),
            "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "gray", "-s", "16x16", "-",
        ]
        raw = subprocess.run(cmd, capture_output=True, check=True).stdout
        if len(raw) == 0:
            continue
        mean_brightness = np.frombuffer(raw, dtype=np.uint8).astype(float).mean()
        if mean_brightness > 200:  # ほぼ白
            return round(offset * (1000 / FPS), 2)
    return None


def main() -> None:
    if not MP4_PATH.exists():
        raise SystemExit(f"❌ {MP4_PATH} が無い。先にAVSyncTestをrenderしてください。")

    results = []
    for cue_id, t in DESIGN_POINTS:
        audio_delta_ms = find_click_offset_ms(t)
        video_delta_ms = find_flash_frame_delta(t)
        results.append({
            "cueId": cue_id,
            "designTimeSec": t,
            "audioClickDeltaMs": audio_delta_ms,
            "videoFlashDeltaFrameMs": video_delta_ms,
            "avDeltaMs": (
                round(video_delta_ms - audio_delta_ms, 2)
                if audio_delta_ms is not None and video_delta_ms is not None
                else None
            ),
        })
        print(f"{cue_id:22s} design={t:6.2f}s  audio_delta={audio_delta_ms}ms  video_delta={video_delta_ms}ms")

    audio_deltas = [r["audioClickDeltaMs"] for r in results if r["audioClickDeltaMs"] is not None]
    video_deltas = [r["videoFlashDeltaFrameMs"] for r in results if r["videoFlashDeltaFrameMs"] is not None]

    summary = {
        "mp4Path": str(MP4_PATH),
        "points": results,
        "audioDeltaMeanMs": round(float(np.mean(audio_deltas)), 2) if audio_deltas else None,
        "audioDeltaMaxAbsMs": round(float(np.max(np.abs(audio_deltas))), 2) if audio_deltas else None,
        "videoDeltaMeanMs": round(float(np.mean(video_deltas)), 2) if video_deltas else None,
        "videoDeltaMaxAbsMs": round(float(np.max(np.abs(video_deltas))), 2) if video_deltas else None,
        # constant offset vs drift: design timeとaudio_deltaの線形回帰
        "driftRegression": None,
    }
    if len(audio_deltas) >= 3:
        ts = np.array([t for _, t in DESIGN_POINTS if True][: len(audio_deltas)])
        # 対応するdesign timeだけ(Noneを除いた分)を再構築
        ts = np.array([r["designTimeSec"] for r in results if r["audioClickDeltaMs"] is not None])
        ys = np.array(audio_deltas)
        slope, intercept = np.polyfit(ts, ys, 1)
        summary["driftRegression"] = {
            "interceptMs": round(float(intercept), 3),
            "slopeMsPerSec": round(float(slope), 5),
            "regressionPredictedAt145_6sMs": round(float(intercept + slope * 145.6), 2),
            "interpretation": (
                "slopeがほぼ0ならconstant offset(全体で同じズレ)。"
                "slopeが有意ならprogressive drift(時間経過で誤差が拡大)。"
                "v2ではANCHOR-ENDING(144.0s)を実測しているため、regressionPredictedAt145_6sMsは"
                "参考値(外挿)であり、実測値はpoints配列のANCHOR-ENDING行を直接見ること。"
            ),
        }

    print("\n=== summary ===")
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    OUT_JSON.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\n書き込み完了: {OUT_JSON}")


if __name__ == "__main__":
    main()
