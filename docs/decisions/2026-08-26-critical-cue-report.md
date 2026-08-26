# Critical Cue Report — StaRt Wedding Edit

Status: MACHINE_GENERATED / 自動生成(再生成: `node --no-warnings scripts/generate-critical-cue-report.mts`)
masterId: start-wedding-edit-master / revision: 10 / contentHash: 57840623cba4cddd...
生成日時からの再現性: このrevisionのmasterから決定的に再生成される(手動編集しない)。

## 対象

- syllable-hit(3連打アクセント、12件)
- letterCue(冒頭S→StaRt文字組み立て、5件)
- confidenceScore≤0.2のphrase-onset(実onset裏付けが無い最優先確認候補、4件)

phrase-onset行の「text」列は、既存方針(歌詞本文をGitへ保存しない)に従い
歌詞全文を掲載せず、cueIdのphraseId接頭辞で参照する形にしている。

計21件。**verified=YES: 0/21**(2026-08-26時点、人間の聴取確認はまだ0件)。

## 列の意味

- **expected(ms)**: cue.timeMs(cueOffsetMs適用前の設計値、絶対ms)
- **rendered(ms)**: `resolveEffectiveCueTimeMs()`適用後、実際にgenerated.ts/renderへ渡る値
  (global/phrase/cue offsetを二重適用せず合成した最終値)
- **detected(ms)**: timingSource='audio-analysis'の場合、htdemucs+librosa onset検出で
  実際に検出された生の時刻(nullの場合は実onset裏付けなし)
- **Δexpected-detected(ms)**: expected - detected。0に近いほど、検出値をそのまま採用している
- **agreementSpread(ms)**: `docs/decisions/2026-08-26-forced-alignment-method-benchmark.md`で
  実施した5手法間の合意度(値がある行のみ。ベンチマーク対象8件中のもの)
- **verified**: 人間が実際に聴いて確認したか(`apply-listening-verification.mts`経由でのみtrueになる)

## 表

| cueId | text | kind | expected(ms) | rendered(ms) | detected(ms) | Δexpected-detected(ms) | method | confidenceScore | agreementSpread(ms) | timingSource | verified |
|---|---|---|---:|---:|---:|---:|---|---:|---:|---|---|
| INTRO-START-S | S | letter-cue | 9300.0 | 9300.0 | — | — | — | — | — | beat-snap | no |
| INTRO-START-T1 | t | letter-cue | 10240.0 | 10240.0 | — | — | — | — | — | beat-snap | no |
| INTRO-START-A | a | letter-cue | 10880.0 | 10880.0 | — | — | — | — | — | beat-snap | no |
| INTRO-START-R | R | letter-cue | 11820.0 | 11820.0 | — | — | — | — | — | beat-snap | no |
| INTRO-START-T2 | t | letter-cue | 12440.0 | 12440.0 | — | — | — | — | — | beat-snap | no |
| P008-ONSET | [歌詞本文は非掲載。cueId接頭辞のphraseIdで参照] | phrase-onset | 28120.0 | 28120.0 | — | — | — | 0.150 | 366.1 | audio-analysis | no |
| P012-H01 | パッパッ | syllable-hit | 32949.1 | 32949.1 | 32949.1 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.942 | 61.6 | audio-analysis | no |
| P012-H02 | パッパッ | syllable-hit | 33204.5 | 33204.5 | 33204.5 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.929 | 92.9 | audio-analysis | no |
| P012-H03 | パッパッ | syllable-hit | 33540.0 | 33540.0 | — | — | — | 0.400 | 102.2 | beat-snap | no |
| P013-H01 | チャプチャプ | syllable-hit | 40704.6 | 40704.6 | 40704.6 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.591 | 129.3 | audio-analysis | no |
| P013-H02 | チャプチャプ | syllable-hit | 40704.6 | 40704.6 | 40704.6 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.769 | — | audio-analysis | no |
| P013-H03 | チャプチャプ | syllable-hit | 41169.0 | 41169.0 | 41169.0 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.938 | — | audio-analysis | no |
| P015-ONSET | [歌詞本文は非掲載。cueId接頭辞のphraseIdで参照] | phrase-onset | 58910.0 | 58910.0 | — | — | — | 0.150 | 510.8 | audio-analysis | no |
| P022-ONSET | [歌詞本文は非掲載。cueId接頭辞のphraseIdで参照] | phrase-onset | 76220.0 | 76220.0 | — | — | — | 0.150 | 379.0 | audio-analysis | no |
| P027-H01 | パッパッ | syllable-hit | 82245.1 | 82245.1 | 82245.1 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.990 | — | audio-analysis | no |
| P027-H02 | パッパッ | syllable-hit | 82825.6 | 82825.6 | 82825.6 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.931 | — | audio-analysis | no |
| P027-H03 | パッパッ | syllable-hit | 83429.3 | 83429.3 | 83429.3 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.859 | — | audio-analysis | no |
| P028-H01 | チャプチャプ | syllable-hit | 89791.6 | 89791.6 | 89791.6 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.943 | — | audio-analysis | no |
| P028-H02 | チャプチャプ | syllable-hit | 90186.3 | 90186.3 | 90186.3 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.867 | — | audio-analysis | no |
| P028-H03 | チャプチャプ | syllable-hit | 90464.9 | 90464.9 | 90464.9 | 0.0 | vocal-stem-onset-detection(htdemucs+librosa) | 0.990 | — | audio-analysis | no |
| P030-ONSET | [歌詞本文は非掲載。cueId接頭辞のphraseIdで参照] | phrase-onset | 109830.0 | 109830.0 | — | — | — | 0.150 | 189.0 | audio-analysis | no |

## 注意

このレポートはmasterの現在値をそのまま並べたものであり、正解を保証しない。
verified=noの行は、`pnpm render:cue-listening-clips` → `listening-review.local.html`で
人間が実際に聴いて確認するまで、confidenceScoreがどれだけ高くても最終値として扱わない。
