#!/usr/bin/env python3
"""既存OSS手法だけを使った、代表8 cueに対するforced-alignment手法ベンチマーク。

ユーザー指示: 「独自forced alignerを先に自作しない。既存OSS手法を
5〜10 phraseで比較してから改善方針を決める」に対応する。新規の重い依存
(whisper等)はこの環境に未インストールで、追加インストール(モデル
ダウンロードを伴う)はユーザー許可が要る操作のため、今回は既にインストール
済みのlibrosa/demucsだけで構成できる複数手法を比較する。

比較する手法(すべて既存OSSライブラリの標準機能。独自アルゴリズムは書かない):
  A. vocal-stem-onset(現行採用手法): htdemucsで分離したvocal stem上で
     librosa.onset.onset_detect(backtrack=True, デフォルトonset envelope)
  B. vocal-stem-onset-no-backtrack: 同stem上でbacktrack=False
     (立ち上がり検出frameそのもの。backtrackは「直前の谷」まで遡る処理)
  C. vocal-stem-onset-median-agg: 同stemで、onset envelopeの集約関数を
     mean(デフォルト)からmedianへ変更(ノイズに強いが感度が下がる)
  D. original-mix-hpss-onset: 分離前の元mix音源にlibrosa.effects.hpss()で
     harmonic/percussive分離をかけ、percussive成分上でonset_detect
     (vocal分離を経由しない別系統のアプローチ)
  E. beat-grid-nearest: 既存beat-map.local.jsonのbeatsMsから最近傍
     (音楽的グリッドへの整合。ボーカルの実際のタイミングとは別の情報源)

これは「どれが正解か」を機械的に決めるものではない(正解は人間の耳のみが
判定できる)。ここで見るのは、各手法が実際にどれだけ近い/離れた時刻を
出すか(agreement spread)。spreadが小さいcueは手法に依らず時刻がほぼ
一致しており、確信度の高い箇所であることを示す。spreadが大きいcueは、
どの手法にも頼らず人間が優先的に聴取確認すべき箇所であることを示す。

実行:
  source local/analysis/venv/bin/activate
  python3 scripts/benchmark_alignment_methods.py
"""
import json
import subprocess
from pathlib import Path

import librosa
import numpy as np

STUDIO_ROOT = Path(__file__).resolve().parent.parent
MASTER_PATH = STUDIO_ROOT / "local/start-wedding-timing-master.local.json"
VOCALS_PATH = STUDIO_ROOT / "local/analysis/start-wedding/demucs-out/htdemucs/StaRt/vocals.wav"
ORIGINAL_AUDIO_PATH_TEMPLATE = STUDIO_ROOT / "local/audio"
BEATMAP_PATH = STUDIO_ROOT / "local/beat-map.local.json"
OUT_JSON = STUDIO_ROOT / "local/analysis/start-wedding/alignment-benchmark-result.local.json"

# 代表8 cue: confidenceScore=0.15(自己申告のみ、実onset裏付け無し)の
# phrase-onset 4件 + P012/P013の3-hit syllable(critical cue) 4件。
# 意図的に「怪しい/重要」なcueを選ぶ(全件を一律に見るのではなく優先度で選ぶ)。
TARGET_CUE_IDS = ["P008-ONSET", "P015-ONSET", "P022-ONSET", "P030-ONSET", "P012-H01", "P012-H02", "P012-H03", "P013-H01"]

WINDOW_SEC = 3.0  # 現在のtimeMs周辺±1.5秒だけを解析対象にする(曲全体を毎回解析しない)
SEARCH_RADIUS_SEC = 1.5


def load_master():
    return json.loads(MASTER_PATH.read_text(encoding="utf-8"))


def find_targets(master):
    found = {}
    for p in master["phrases"]:
        for c in p["cues"]:
            if c["cueId"] in TARGET_CUE_IDS:
                found[c["cueId"]] = {"cue": c, "phraseId": p["phraseId"]}
    return found


def decode_window(path: Path, center_sec: float, sr: int) -> tuple[np.ndarray, float]:
    start = max(0.0, center_sec - WINDOW_SEC / 2)
    cmd = ["ffmpeg", "-v", "error", "-ss", str(start), "-t", str(WINDOW_SEC), "-i", str(path), "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    y = np.frombuffer(raw, dtype=np.float32)
    return y, start


def nearest_onset_ms(y: np.ndarray, sr: int, window_start_sec: float, target_sec: float, backtrack: bool, agg) -> float | None:
    if len(y) < sr // 2:
        return None
    envelope = librosa.onset.onset_strength(y=y, sr=sr, aggregate=agg)
    onset_frames = librosa.onset.onset_detect(onset_envelope=envelope, sr=sr, backtrack=backtrack, units="time")
    if len(onset_frames) == 0:
        return None
    abs_times = window_start_sec + onset_frames
    diffs = np.abs(abs_times - target_sec)
    within = diffs <= SEARCH_RADIUS_SEC
    if not within.any():
        return None
    idx = np.argmin(diffs)
    return round(float(abs_times[idx]) * 1000, 1)


def nearest_beat_ms(beats_ms: list[float], target_ms: float) -> float | None:
    if not beats_ms:
        return None
    arr = np.array(beats_ms)
    idx = int(np.argmin(np.abs(arr - target_ms)))
    return round(float(arr[idx]), 1)


def main() -> None:
    if not VOCALS_PATH.exists():
        raise SystemExit(f"❌ {VOCALS_PATH} が無い。先にanalyze_start_wedding_vocals.pyでvocal分離を実行してください。")
    master = load_master()
    audio_path = ORIGINAL_AUDIO_PATH_TEMPLATE / master["audio"]["fileName"]
    if not audio_path.exists():
        raise SystemExit(f"❌ 元音源が無い: {audio_path}")
    beats_ms = []
    if BEATMAP_PATH.exists():
        bm = json.loads(BEATMAP_PATH.read_text(encoding="utf-8"))
        # beat-map.local.jsonの unit フィールドで秒/msを判定する(このファイルは
        # 秒単位、'beats': [0.16, 0.48, ...])。誤ったunit前提で全cueが同じ
        # 誤った値へ張り付くバグを避けるため、明示的にunitを見る。
        unit = bm.get("unit", "sec")
        raw_beats = bm.get("beatsMs", bm.get("beats", []))
        is_seconds = "sec" in unit or unit in ("s",)
        beats_ms = [b * 1000 for b in raw_beats] if is_seconds else list(raw_beats)

    targets = find_targets(master)
    missing = set(TARGET_CUE_IDS) - set(targets.keys())
    if missing:
        print(f"⚠️  master内に見つからないcueId: {missing}")

    sr = 22050
    results = []
    for cue_id in TARGET_CUE_IDS:
        entry = targets.get(cue_id)
        if not entry:
            continue
        cue = entry["cue"]
        current_ms = cue["timeMs"]
        current_sec = current_ms / 1000

        vocal_y, vocal_start = decode_window(VOCALS_PATH, current_sec, sr)
        method_a = nearest_onset_ms(vocal_y, sr, vocal_start, current_sec, backtrack=True, agg=np.mean)
        method_b = nearest_onset_ms(vocal_y, sr, vocal_start, current_sec, backtrack=False, agg=np.mean)
        method_c = nearest_onset_ms(vocal_y, sr, vocal_start, current_sec, backtrack=True, agg=np.median)

        mix_y, mix_start = decode_window(audio_path, current_sec, sr)
        _, percussive = librosa.effects.hpss(mix_y)
        method_d = nearest_onset_ms(percussive, sr, mix_start, current_sec, backtrack=True, agg=np.mean)

        method_e = nearest_beat_ms(beats_ms, current_ms)

        values = [v for v in [method_a, method_b, method_c, method_d, method_e] if v is not None]
        spread_ms = round(max(values) - min(values), 1) if len(values) >= 2 else None

        result = {
            "cueId": cue_id,
            "text": cue["text"],
            "kind": cue["kind"],
            "currentTimeMs": current_ms,
            "currentConfidenceScore": cue["confidenceScore"],
            "methods": {
                "A_vocal-stem-onset(current)": method_a,
                "B_vocal-stem-onset-no-backtrack": method_b,
                "C_vocal-stem-onset-median-agg": method_c,
                "D_original-mix-hpss-percussive-onset": method_d,
                "E_beat-grid-nearest": method_e,
            },
            "agreementSpreadMs": spread_ms,
            "methodsAgreeing": len(values),
        }
        results.append(result)
        print(f"{cue_id:14s} current={current_ms:9.1f}ms  spread={spread_ms}ms  methods={result['methods']}")

    spreads = [r["agreementSpreadMs"] for r in results if r["agreementSpreadMs"] is not None]
    summary = {
        "targetCueIds": TARGET_CUE_IDS,
        "results": results,
        "meanAgreementSpreadMs": round(float(np.mean(spreads)), 1) if spreads else None,
        "maxAgreementSpreadMs": round(float(np.max(spreads)), 1) if spreads else None,
        "interpretation": (
            "agreementSpreadMsが小さいcueは、手法に依らず時刻がほぼ一致しており相対的に確信度が高い。"
            "大きいcueは手法間で意見が割れており、人間の聴取確認が特に必要。"
            "これは正解の自動判定ではなく、優先順位付けのための追加evidence。"
        ),
    }
    print("\n=== summary ===")
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    OUT_JSON.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\n書き込み完了: {OUT_JSON}")


if __name__ == "__main__":
    main()
