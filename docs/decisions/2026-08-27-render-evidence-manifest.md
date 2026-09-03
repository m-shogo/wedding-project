# Render Evidence Manifest — StaRt Wedding Edit B案

Status: MACHINE_VERIFIED(著作権音源本体・renderファイル自体はGit管理外。metadataのみ記録)

## P0-8: B-clean / B-guide full render(初回、scale=0.5研究用)

```json
{
  "masterId": "start-wedding-edit-master",
  "masterRevision": 14,
  "audioSha256": "2e40115b86e1...(local/audio/StaRt.m4a、Git管理外)",
  "fps": 30,
  "sampleRate": 48000,
  "videoResolution": "960x540(--scale=0.5研究用低解像度。本番は1080pでの再render推奨)",
  "duration": "145.642667s",
  "bCleanRenderSha256": "618a144c47b6f058bb035b29d8339a8d35b4a6d0a0c31db1c024cc0862e28362",
  "bGuideRenderSha256": "0b99e1b20d9cb0b941adc1509a16b81cf56ba9b65930510e040524e07c2b2705",
  "criticalCueCount": 21,
  "post60FullAuditCount": 35,
  "verifiedPhraseCount": 0,
  "verifiedVocalCueCount": 0,
  "maxCanonicalGeneratedDeltaMs": 0.0
}
```

## P0-8完了版: B-clean / B-guide full render(1080p本番解像度、Safety Gate P0-A〜D完了後)

出力先: `motion-studio/out/start-wedding-edit-b-final-v2/`(Git管理外)

```json
{
  "masterId": "start-wedding-edit-master",
  "masterRevision": 15,
  "fps": 30,
  "sampleRate": 48000,
  "videoResolution": "1920x1080(--scale=1、本番解像度)",
  "frameCount": 4368,
  "videoDuration": "145.600000s",
  "audioDuration": "145.642667s(AAC priming分。renderPipelineOffsetMs候補42.7msと整合)",
  "bCleanRenderSha256": "fc5b872d2c683df2ee1ced35758e219a8fd75db084b326c1127bb923561ebe4c",
  "bGuideRenderSha256": "1d0ba8d1bade00fc72ee1b3d789c032fb0b70e7711c658bb3c71a3ceb4d0a4be",
  "fullSongIdentityMaxDeltaMs": 0.0,
  "fullSongIdentityCheckedPhrases": "30/30",
  "fullSongIdentityCheckedCues": "43/43",
  "minimumUsableDurationErrors": 0,
  "minimumUsableDurationWarnings": 4,
  "generatedIdempotency": "PASS(2回のsync結果が完全一致)",
  "verifiedPhraseCount": 0,
  "verifiedVocalCueCount": 0,
  "goldenAnchorCount": 0
}
```

(renderファイル本体・音源本体はGit管理外。上記metadataのみ記録)

## Final MP4 Machine QA(1080p本番解像度版)

### B-Clean

| 項目 | 値 |
|---|---|
| video codec | h264 |
| video resolution | 1920x1080 |
| video fps | 30/1 |
| video frame count | 4368 |
| video duration | 145.600000s |
| audio codec | aac |
| audio sample rate | 48000 |
| audio channels | 2 |
| audio duration | 145.642667s |
| blackdetect(d=0.4, pic_th=0.98) | 検出0件 |
| freezedetect(n=-45dB, d=3.0) | 検出0件(想定外freezeなし) |

### B-Guide

同一duration/codec/解像度/frame count(4368)。debug overlay付きのため
別途black/freeze検査は省略(B-Cleanが本番相当のため、B-Cleanの結果を正とする)。

## Audio PCM Hash比較(Timing修正による音声自体の意図しない改変が無いことの証拠)

Root cause修正の前後、およびP0-A〜D(Safety Gate完了)適用後の1080p final renderの
4時点でB-Cleanをdecodeし、PCM(48kHz/2ch/s16le WAV変換)のSHA-256を比較した。

| render時点 | PCM SHA-256 |
|---|---|
| root cause修正前(初回B-clean) | `13d62793bf9641028f905e64047c5a64f3a763fc04034c8bb0b05fde5ea8b563` |
| root cause修正直後(phrase.startMs統合) | `13d62793bf9641028f905e64047c5a64f3a763fc04034c8bb0b05fde5ea8b563` |
| P0-1〜P0-7適用後(scale=0.5研究用render) | `13d62793bf9641028f905e64047c5a64f3a763fc04034c8bb0b05fde5ea8b563` |
| P0-A〜D(Safety Gate完了)適用後、1080p final render | `13d62793bf9641028f905e64047c5a64f3a763fc04034c8bb0b05fde5ea8b563` |

**4回とも完全に同一のPCM hash。** これは、今回の一連のTiming修正(phrase.startMs統合、
clamp、hold/exit修正、cueId伝播、Visual Impact Peak、full-song identity gate、
minimum-usable-duration対応の負local frame clamp、generated idempotency確認)が、
**音声そのものには一切変更を加えていない**(視覚要素の表示タイミングだけを調整した)
ことの直接的な証拠になる。音声のshift/trim/resampleが意図せず発生していないことを確認した。

## Synthetic AV Anchor(P0-C、既存AVSyncTestで実施済み)

`local/analysis/start-wedding/av-sync-test-result.local.json`(2b9da55bで実装・実行済み)。

- 曲全体(2.0s〜144.0s)に分散した11地点(ANCHOR-INTRO〜ANCHOR-ENDING)
- 全地点で `avDeltaMs = -42.7ms`、分散ゼロ
- `driftRegression.slopeMsPerSec ≈ -0.0`(progressive driftなし)
- 分類: **CONSTANT**(pipeline由来の固定offset。timing dataのbugではない)
- `renderPipelineOffsetMs`候補値42.7msとして`av-sync-test-result.local.json`から
  `apply-av-sync-test-result.mts`経由でTimingMasterへ反映可能な状態(まだ未適用、
  `renderPipelineOffsetVerified=false`のまま。人間の試聴確認まで自動適用しない)。

## 結論

Machine QAの範囲では、今回の一連の修正がregressionを起こしていないことを確認した。
ただし、これは「plumbingが壊れていない」ことの証拠であり、「音楽的に正しく同期している」
ことの証拠ではない。最終判断は人間の通し視聴による。
