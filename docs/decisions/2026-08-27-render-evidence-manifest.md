# Render Evidence Manifest — StaRt Wedding Edit B案

Status: MACHINE_VERIFIED(著作権音源本体・renderファイル自体はGit管理外。metadataのみ記録)

## P0-8: B-clean / B-guide full render

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

(renderファイル本体・音源本体はGit管理外。上記metadataのみ記録)

## Final MP4 Machine QA

### B-Clean

| 項目 | 値 |
|---|---|
| video codec | h264 |
| video resolution | 960x540 |
| video fps | 30/1 |
| audio codec | aac |
| audio sample rate | 48000 |
| audio channels | 2 |
| duration | 145.642667s |
| blackdetect(d=0.4, pic_th=0.98) | 検出0件 |
| freezedetect(n=-45dB, d=3.0) | 検出0件(想定外freezeなし) |

### B-Guide

同一duration/codec/解像度。debug overlay付きのため別途black/freeze検査は省略
(B-Cleanが本番相当のため、B-Cleanの結果を正とする)。

## Audio PCM Hash比較(Timing修正による音声自体の意図しない改変が無いことの証拠)

Root cause修正の前後、および今回のfinal renderの3時点でB-Cleanをdecodeし、
PCM(48kHz/2ch/s16le WAV変換)のSHA-256を比較した。

| render時点 | PCM SHA-256 |
|---|---|
| root cause修正前(初回B-clean) | `13d62793bf9641028f905e64047c5a64f3a763fc04034c8bb0b05fde5ea8b563` |
| root cause修正直後(phrase.startMs統合) | `13d62793bf9641028f905e64047c5a64f3a763fc04034c8bb0b05fde5ea8b563` |
| 今回のfinal render(P0-1〜P0-7適用後) | `13d62793bf9641028f905e64047c5a64f3a763fc04034c8bb0b05fde5ea8b563` |

**3回とも完全に同一のPCM hash。** これは、今回の一連のTiming修正(phrase.startMs統合、
clamp、hold/exit修正、cueId伝播、Visual Impact Peak)が、**音声そのものには一切変更を
加えていない**(視覚要素の表示タイミングだけを調整した)ことの直接的な証拠になる。
音声のshift/trim/resampleが意図せず発生していないことを確認した。

## 結論

Machine QAの範囲では、今回の一連の修正がregressionを起こしていないことを確認した。
ただし、これは「plumbingが壊れていない」ことの証拠であり、「音楽的に正しく同期している」
ことの証拠ではない。最終判断は人間の通し視聴による。
