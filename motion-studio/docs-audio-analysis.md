# StaRt Wedding Edit 音声解析パイプライン

## 目的

旧`lyrics-wedding-edit.local.json`のstartSecをそのまま`timingSource: "audio-analysis"`と
表記していた問題(実際には音声解析していない)を修正するため、実際にStaRt.m4aへ
ボーカル分離+onset検出を実行し、その結果だけを"audio-analysis"と呼ぶようにした。

## 何をしているか(現状)

```
StaRt.m4a
  ↓ demucs (htdemucs model)
vocals.wav + no_vocals.wav (ボーカル分離)
  ↓ librosa.onset.onset_detect
vocal onset候補(発声開始候補、418件検出)
  ↓ 既存cueの近似時刻(旧JSON/beat-snap由来)と±250ms以内で照合
timingSource='audio-analysis'へ格上げ(64/73件、2026-08-26実行分)
```

**これは強制アラインメント(音素レベルの音響モデル照合)ではない。**
既知の正しい歌詞をゼロから音声認識で当てているわけではなく、既存の近似値を
「実際にボーカルだけを分離した音源上の、実際に検出された発声開始候補」で
検証・補正しているに過ぎない。真の強制アラインメント(Montreal Forced Aligner等)
は未導入。

## セットアップ

```sh
cd motion-studio
python3 -m venv local/analysis/venv
source local/analysis/venv/bin/activate
pip install -r scripts/analysis-requirements.txt
```

## 実行

```sh
# 1. ボーカル分離(初回はhtdemucsモデルをHugging Face Hubから取得。要ネットワーク)
python3 -m demucs --two-stems=vocals -o local/analysis/start-wedding/demucs-out local/audio/StaRt.m4a

# 2. onset検出 + stem alignment offset計測
python3 scripts/analyze_start_wedding_vocals.py

# 3. TimingMasterへ統合(既存manual/verified値は上書きしない)
node --no-warnings scripts/migrate-start-wedding-timing-master.mts --apply
node --no-warnings scripts/sync-start-wedding-timing-master.mts
```

## 出力(すべてGit管理外、local/analysis/配下)

```
local/analysis/venv/                                  Python仮想環境
local/analysis/start-wedding/demucs-out/htdemucs/StaRt/vocals.wav      分離済みボーカル
local/analysis/start-wedding/demucs-out/htdemucs/StaRt/no_vocals.wav   伴奏
local/analysis/start-wedding/alignment-candidates.local.json          onset候補+stem offset
```

## 既知の限界(2026-08-26時点)

- **真の強制アラインメント未実装**: 日本語の音素分解・音響モデル照合
  (Montreal Forced Aligner等)は未導入。近似値の検証・補正のみ。
- **stemAlignmentOffsetMs=0ms**(実測): htdemucsは原曲に対して時間ずれを
  起こしていないことを相互相関で確認済み。ただしこの値自体は
  `stemAlignmentVerified: false`のまま(人間による最終確認はしていない)。
- **A/V同期の最終MP4検証は未実施**: TimingMaster上の時刻とRemotion render後の
  実際のMP4上の時刻が一致するかの、audio click + visual flashによる機械測定は
  未実施。
- **AAC encoder delay**: StaRt.m4aのcontainer/stream start_timeは0.047891s
  (start_pts=2112 samples @44.1kHz)。この値がtimingMaster.audio.sourceStartMsの
  計算へ影響しうるかは未検証。現状は無視して計算している(sourceStartMs=0前提)。
- 64/73 cueがaudio-analysisへ格上げされたが、残り9件(反復語の一部、
  低信頼区間)はbeat-snap/estimatedのまま。

## 次にやるべきこと

1. `local/analysis/start-wedding/alignment-candidates.local.json`の
   vocalOnsetCandidatesMsを、Dashboardの波形UIで人間が目視・試聴確認する
   (現状はJSONでしか確認できない)。
2. AAC encoder delayがrender結果へ実際に影響するか、audio click + visual flash
   によるA/V同期QA compositionで検証する。
3. 真の強制アラインメントが必要と判断した場合、Montreal Forced Aligner等の
   日本語モデル導入を再検討する(現時点では未導入、ライセンス・モデル入手性を
   別途確認する必要がある)。
