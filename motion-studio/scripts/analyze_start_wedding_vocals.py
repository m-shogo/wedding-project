#!/usr/bin/env python3
"""StaRt.m4a の実音声解析(ボーカル分離後onset検出 + stem alignment offset計測)。

処理:
  1. 原曲PCMとvocal stem(Demucs htdemucs出力)を同一sample rateでdecode
  2. 相互相関でstemAlignmentOffsetMs(分離処理由来の時間ずれ)を計測
  3. vocal stem上でonset(発声開始候補)を検出する(librosa.onset.onset_detect)
  4. 結果をlocal/analysis/start-wedding/alignment-candidates.local.json へ保存
     (Git管理外。歌詞本文・音源そのものは含まない、時刻とconfidenceのみ)

実行:
  source local/analysis/venv/bin/activate
  python3 scripts/analyze_start_wedding_vocals.py

依存: numpy, scipy, soundfile, librosa (すべてlocal/analysis/venvへ導入済み)
"""

import hashlib
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
import librosa

STUDIO_ROOT = Path(__file__).resolve().parent.parent
ORIGINAL_AUDIO = STUDIO_ROOT / "local/audio/StaRt.m4a"
DEMUCS_VOCALS = STUDIO_ROOT / "local/analysis/start-wedding/demucs-out/htdemucs/StaRt/vocals.wav"
OUT_DIR = STUDIO_ROOT / "local/analysis/start-wedding"
OUT_JSON = OUT_DIR / "alignment-candidates.local.json"

SR = 22050  # onset検出用の解析sample rate(速度優先。相互相関も同じrateで行う)


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    h.update(path.read_bytes())
    return h.hexdigest()


def decode_to_mono(path: Path, sr: int) -> np.ndarray:
    """ffmpegでPCM decodeしてmono float32配列にする(m4a/wav両対応)。"""
    cmd = [
        "ffmpeg", "-v", "error", "-i", str(path),
        "-ac", "1", "-ar", str(sr), "-f", "f32le", "-",
    ]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def main() -> None:
    if not ORIGINAL_AUDIO.exists():
        print(f"❌ 原曲が見つからない: {ORIGINAL_AUDIO}", file=sys.stderr)
        sys.exit(1)
    if not DEMUCS_VOCALS.exists():
        print(f"❌ vocal stemが見つからない: {DEMUCS_VOCALS}", file=sys.stderr)
        print("   先に: python3 -m demucs --two-stems=vocals -o local/analysis/start-wedding/demucs-out local/audio/StaRt.m4a", file=sys.stderr)
        sys.exit(1)

    audio_sha256 = sha256_of(ORIGINAL_AUDIO)
    print(f"[analyze] 原曲sha256={audio_sha256[:16]}...")

    original = decode_to_mono(ORIGINAL_AUDIO, SR)
    vocals = decode_to_mono(DEMUCS_VOCALS, SR)
    print(f"[analyze] original: {len(original)/SR:.3f}s  vocals: {len(vocals)/SR:.3f}s")

    # --- 1. stem alignment offset(原曲とvocal stemの相互相関) -----------------
    # 曲全体は長すぎるので、曲前半60秒(伴奏が薄い/歌い出し付近を含む)で相互相関を取る。
    window_sec = min(60.0, len(original) / SR, len(vocals) / SR)
    n = int(window_sec * SR)
    a = original[:n]
    b = vocals[:n]
    # 正規化してから相関(音量差の影響を減らす)
    a = (a - a.mean()) / (np.std(a) + 1e-9)
    b = (b - b.mean()) / (np.std(b) + 1e-9)
    corr = np.correlate(a, b, mode="full")
    lag = np.argmax(corr) - (len(b) - 1)
    stem_alignment_offset_ms = round((lag / SR) * 1000, 2)
    peak_corr = float(np.max(corr) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-9))
    print(f"[analyze] stemAlignmentOffsetMs={stem_alignment_offset_ms}ms (peak normalized corr={peak_corr:.4f}, window={window_sec:.1f}s)")

    # --- 2. vocal stem上でonset検出 ------------------------------------------
    onset_frames = librosa.onset.onset_detect(y=vocals, sr=SR, backtrack=True, units="time")
    onset_strength = librosa.onset.onset_strength(y=vocals, sr=SR)
    print(f"[analyze] vocal onset候補: {len(onset_frames)}件")

    result = {
        "runId": f"vocal-onset-{audio_sha256[:8]}",
        "audioSha256": audio_sha256,
        "tool": "demucs+librosa",
        "toolVersion": {
            "demucs": "4.1.0",
            "librosa": librosa.__version__,
            "torch_backend": "cpu-or-mps",
        },
        "model": "htdemucs",
        "generatedAt": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat(),
        "stemAlignmentOffsetMs": stem_alignment_offset_ms,
        "stemAlignmentPeakCorrelation": round(peak_corr, 4),
        "stemAlignmentMethod": "waveform-cross-correlation",
        "stemAlignmentVerified": False,
        "stemDurationMs": round(len(vocals) / SR * 1000, 1),
        "originalDurationMs": round(len(original) / SR * 1000, 1),
        "vocalOnsetCandidatesMs": [round(t * 1000, 1) for t in onset_frames.tolist()],
        "notesJa": (
            "vocal onsetはlibrosa.onset.onset_detect(伴奏分離後のhtdemucs vocal stem上)による"
            "エネルギー変化検出。既知の正しい歌詞へ強制アラインメント(音素レベルの音響モデル照合)"
            "したものではなく、あくまで「歌声区間の開始候補」の集合。stemAlignmentOffsetMsは、"
            "分離処理がstemを原曲に対して時間的にずらしていないかの検査値(相互相関ピーク位置)。"
            "この値をphrase/word cueのeffectiveTimeMs計算へ加算する前に、まず人間が実際に音を聴いて"
            "この値の妥当性を確認すること(stemAlignmentVerified=falseのまま)。"
        ),
    }
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"[analyze] 書き込み完了: {OUT_JSON}")


if __name__ == "__main__":
    main()
