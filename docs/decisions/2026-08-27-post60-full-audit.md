# Post-60s Full Audit — StaRt Wedding Edit

Status: MACHINE_GENERATED(再生成: `node --no-warnings scripts/generate-post60-full-audit.mts`)
masterId: start-wedding-edit-master / revision: 14 / contentHash: f2156061936024ec...

## 対象

phraseの一部でも60秒以降にかかる全phraseの、cue自体が60秒以降にあるもの全件
(phrase-onset/word-accent/syllable-hit)。代表anchorへの間引きはしていない。

計35件。canonical→generated delta の絶対値: 最大=0.0ms、P95=0.0ms。
UNVERIFIED以外のflagが立った行: 2件。

## 列の意味

- **audioDetected(ms)**: htdemucs+librosa onset検出で実際に検出された生の時刻(裏付け無しはnull)
- **canonical(ms)**: `resolveEffectiveCueTimeMs()`適用後の正本値
- **generated(ms)**: generated.ts側のcueId一致entryから逆算した絶対ms(見つからなければnull)
- **delta(ms)**: generated - canonical。±33.3ms(1frame)超で CANONICAL_GENERATED_MISMATCH
- **flags**: DUPLICATE_ONSET / NON_MONOTONIC / LOW_CONFIDENCE / NO_AUDIO_EVIDENCE /
  HIGH_METHOD_DISAGREEMENT / CANONICAL_GENERATED_MISMATCH / UNVERIFIED

## 表

| phraseId | cueId | kind | audioDetected(ms) | canonical(ms) | generated(ms) | delta(ms) | confidenceScore | agreementSpread(ms) | timingSource | verified | flags |
|---|---|---|---:|---:|---:|---:|---:|---:|---|---|---|
| P016 | P016-ONSET | phrase-onset | 63181.5 | 63181.5 | 63181.5 | 0.0 | 0.637 | — | audio-analysis | no | UNVERIFIED |
| P016 | P016-W01 | word-accent | 63320.8 | 63320.8 | 63320.8 | 0.0 | 0.918 | — | audio-analysis | no | UNVERIFIED |
| P017 | P017-ONSET | phrase-onset | 64574.7 | 64574.7 | 64574.7 | 0.0 | 0.969 | — | audio-analysis | no | UNVERIFIED |
| P017 | P017-W01 | word-accent | 65201.6 | 65201.6 | 65201.6 | 0.0 | 0.997 | — | audio-analysis | no | UNVERIFIED |
| P018 | P018-ONSET | phrase-onset | 67709.4 | 67709.4 | 67709.4 | 0.0 | 0.681 | — | audio-analysis | no | UNVERIFIED |
| P018 | P018-W01 | word-accent | 67709.4 | 67709.4 | 67709.4 | 0.0 | 0.901 | — | audio-analysis | no | UNVERIFIED |
| P019 | P019-W01 | word-accent | 70240.4 | 70240.4 | 70240.4 | 0.0 | 0.961 | — | audio-analysis | no | UNVERIFIED |
| P019 | P019-ONSET | phrase-onset | 70472.6 | 70472.6 | 70472.6 | 0.0 | 0.945 | — | audio-analysis | no | UNVERIFIED |
| P019 | P019-W02 | word-accent | 70844.1 | 70844.1 | 70844.1 | 0.0 | 0.928 | — | audio-analysis | no | UNVERIFIED |
| P019 | P019-W03 | word-accent | 71471.0 | 71471.0 | 71471.0 | 0.0 | 0.902 | — | audio-analysis | no | UNVERIFIED |
| P019 | P019-W04 | word-accent | 72283.7 | 72283.7 | 72283.7 | 0.0 | 0.713 | — | audio-analysis | no | UNVERIFIED |
| P020 | P020-ONSET | phrase-onset | 73096.4 | 73096.4 | 73096.4 | 0.0 | 0.807 | — | audio-analysis | no | UNVERIFIED |
| P021 | P021-ONSET | phrase-onset | 74303.9 | 74303.9 | 74303.9 | 0.0 | 0.912 | — | audio-analysis | no | UNVERIFIED |
| P021 | P021-W01 | word-accent | 75232.7 | 75232.7 | 75232.7 | 0.0 | 0.865 | — | audio-analysis | no | UNVERIFIED |
| P022 | P022-ONSET | phrase-onset | — | 76220.0 | 76220.0 | 0.0 | 0.150 | 379.0 | audio-analysis | no | LOW_CONFIDENCE,NO_AUDIO_EVIDENCE,UNVERIFIED,HIGH_METHOD_DISAGREEMENT |
| P022 | P022-W01 | word-accent | 76509.8 | 76509.8 | 76509.8 | 0.0 | 0.900 | — | audio-analysis | no | UNVERIFIED |
| P023 | P023-ONSET | phrase-onset | 78297.7 | 78297.7 | 78297.7 | 0.0 | 0.765 | — | audio-analysis | no | UNVERIFIED |
| P023 | P023-W01 | word-accent | 79714.1 | 79714.1 | 79714.1 | 0.0 | 0.892 | — | audio-analysis | no | UNVERIFIED |
| P024 | P024-W01 | word-accent | 79714.1 | 79714.1 | 79714.1 | 0.0 | 0.988 | — | audio-analysis | no | UNVERIFIED |
| P024 | P024-ONSET | phrase-onset | 79992.7 | 79992.7 | 79992.7 | 0.0 | 0.985 | — | audio-analysis | no | UNVERIFIED |
| P025 | P025-ONSET | phrase-onset | 80944.8 | 80944.8 | 80944.8 | 0.0 | 0.830 | — | audio-analysis | no | UNVERIFIED |
| P026 | P026-ONSET | phrase-onset | 81571.7 | 81571.7 | 81571.7 | 0.0 | 0.903 | — | audio-analysis | no | UNVERIFIED |
| P026 | P026-W01 | word-accent | 81571.7 | 81571.7 | 81571.7 | 0.0 | 0.943 | — | audio-analysis | no | UNVERIFIED |
| P027 | P027-ONSET | phrase-onset | 82059.3 | 82059.3 | 82059.3 | 0.0 | 0.881 | — | audio-analysis | no | UNVERIFIED |
| P027 | P027-H01 | syllable-hit | 82245.1 | 82245.1 | 82245.1 | 0.0 | 0.990 | — | audio-analysis | no | UNVERIFIED |
| P027 | P027-H02 | syllable-hit | 82825.6 | 82825.6 | 82825.6 | 0.0 | 0.931 | — | audio-analysis | no | UNVERIFIED |
| P027 | P027-H03 | syllable-hit | 83429.3 | 83429.3 | 83429.3 | 0.0 | 0.859 | — | audio-analysis | no | UNVERIFIED |
| P028 | P028-ONSET | phrase-onset | 89791.6 | 89791.6 | 89791.6 | 0.0 | 0.717 | — | audio-analysis | no | UNVERIFIED |
| P028 | P028-H01 | syllable-hit | 89791.6 | 89791.6 | 89791.6 | 0.0 | 0.943 | — | audio-analysis | no | UNVERIFIED |
| P028 | P028-H02 | syllable-hit | 90186.3 | 90186.3 | 90186.3 | 0.0 | 0.867 | — | audio-analysis | no | UNVERIFIED |
| P028 | P028-H03 | syllable-hit | 90464.9 | 90464.9 | 90464.9 | 0.0 | 0.990 | — | audio-analysis | no | UNVERIFIED |
| P029 | P029-ONSET | phrase-onset | 97965.0 | 97965.0 | 97965.0 | 0.0 | 0.930 | — | audio-analysis | no | UNVERIFIED |
| P029 | P029-W01 | word-accent | — | 106560.0 | 106560.0 | 0.0 | 0.400 | — | beat-snap | no | UNVERIFIED |
| P030 | P030-ONSET | phrase-onset | — | 109830.0 | 109830.0 | 0.0 | 0.150 | 189.0 | audio-analysis | no | LOW_CONFIDENCE,NO_AUDIO_EVIDENCE,UNVERIFIED,HIGH_METHOD_DISAGREEMENT |
| P030 | P030-W01 | word-accent | — | 110300.0 | 110300.0 | 0.0 | 0.400 | — | beat-snap | no | UNVERIFIED |

## 注意

これはplumbing(データ伝播)の機械検証結果。UNVERIFIEDは全件に付くのが現状の正しい状態
(人間の聴取確認がまだ0件のため)。UNVERIFIED以外のflagが0件でも「音楽的に正しい」ことは
意味しない — 最終的な正しさはHuman Listening Verificationでのみ確定する。
