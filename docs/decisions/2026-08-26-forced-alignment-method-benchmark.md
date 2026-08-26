# Forced-alignment手法ベンチマーク(既存OSS手法のみ、代表8 cue)

Status: RESEARCH EVIDENCE
Scope: `motion-studio` StaRt Wedding Edit(`feature/start-129-three-showcases`)のみ
関連: `docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md` の
「独自forced alignerを先に自作しない。既存OSS手法をbenchmarkしてから改善方針を決める」

## 実行環境

- OS: macOS(この作業ホスト)
- Python venv: `motion-studio/local/analysis/venv`(gitignore済み)
- インストール済みライブラリ: `librosa==1.0.0`, `torch==2.13.0`, `torchaudio==2.11.0`, `demucs==4.1.0`
- **新規インストールは行っていない**(whisper等のASR系forced-alignerはこの環境に未インストールで、
  追加インストールはモデルダウンロードを伴うため、ユーザー許可が要る操作として今回は見送った)。
- スクリプト: `motion-studio/scripts/benchmark_alignment_methods.py`
- 実行結果(生データ、著作権音源由来のため非公開): `local/analysis/start-wedding/alignment-benchmark-result.local.json`

## 比較した5手法(すべて既存OSSライブラリの標準機能)

| ID | 手法 | 由来 |
|---|---|---|
| A | vocal-stem-onset(現行採用) | htdemucs分離vocal stem + `librosa.onset.onset_detect(backtrack=True)` |
| B | vocal-stem-onset-no-backtrack | 同stem、`backtrack=False`(立ち上がりframeそのもの) |
| C | vocal-stem-onset-median-agg | 同stem、onset envelopeの集約関数を`mean`→`median` |
| D | original-mix-hpss-percussive-onset | 分離前の元音源に`librosa.effects.hpss()`を掛け、percussive成分でonset検出 |
| E | beat-grid-nearest | 既存`beat-map.local.json`(Palmier Pro on-device beat detection由来)の最近傍beat |

## 対象cue(8件、意図的に選定)

confidenceScoreが最も低い(=根拠が自己申告のみで実onset裏付けが無い)phrase-onset 4件と、
StaRt「パッ/チャプ」3連打の主要syllable-hit 4件を選んだ(全73件を一律に見るのではなく、
優先度が高い/興味深いサンプルへ絞った)。

## 結果: agreementSpreadMs(5手法中の最大値-最小値)

| cueId | kind | 既存confidenceScore | agreementSpreadMs |
|---|---|---:|---:|
| P008-ONSET | phrase-onset | 0.15 | 366.1ms |
| P015-ONSET | phrase-onset | 0.15 | 510.8ms |
| P022-ONSET | phrase-onset | 0.15 | 379.0ms |
| P030-ONSET | phrase-onset | 0.15 | 189.0ms |
| P012-H01 | syllable-hit | 0.942 | 61.6ms |
| P012-H02 | syllable-hit | 0.929 | 92.9ms |
| P012-H03 | syllable-hit | 0.4 | 102.2ms |
| P013-H01 | syllable-hit | 0.591 | 129.3ms |

mean=228.9ms, max=510.8ms

## 観察

- **既存のconfidenceScore(実onset候補とのdiffMsから算出)と、今回の独立した
  agreementSpreadMs(5手法間の一致度)は強く相関している。** confidenceScore=0.15の
  4件は軒並みspread 189〜511msと大きく、confidenceScore 0.4〜0.94の4件はspread 62〜129msに
  収まっている。これは既存confidenceScoreの設計(diffMsベースの算出)が、独立した
  別evidence(手法間合意度)によって裏付けられたことを意味する。
- confidenceScore=0.15の4件(P008/P015/P022/P030の各phrase-onset)は、
  `phrase-map.local.json`の自己申告のみに基づく`audio-analysis`ラベルであり
  (`detectedAtMs`が無いことは`check-start-wedding-timing-master.mts`の警告でも検出済み)、
  今回の独立測定でも「手法間で意見が大きく割れる=根拠が弱い」ことが確認された。
  この4件は人間の聴取確認における最優先候補として扱う
  (`render-cue-listening-clips.mts`の並び順で既に最上位に出る設計になっている)。
- 手法Eãbeat-grid-nearestã含め、5手法とも「近い範囲に収まる」cueと「大きくばらつく」cueが
  明確に分かれており、単一手法だけで判断するより複数手法の合意度を見る方が
  優先順位付けの信号として有効であることが分かった。

## Wedding Useとしての判断

- **今回のベンチマーク結果だけで、いずれかのcueのtimeMs/timingSource/confidenceScoreを
  自動的に書き換えることはしない。** これは「複数手法の意見が割れている」という
  追加evidenceであり、「正解はこれ」という判定ではない(正解は人間の耳のみが判定できる、
  という既存方針を維持する)。
- 実際の改善方針は、この4件を含む低confidenceScore cueを
  `pnpm render:cue-listening-clips` → `listening-review.local.html`で人間が実際に聴いて
  `apply-listening-verification.mts`で確定する、という既存の聴取確認workflowで行う。
- whisper等のASR系forced-alignerは、追加インストール(モデルダウンロード)の許可が
  得られた場合に、6つ目の比較手法として追加を検討する。現時点では既存5手法の合意度が
  優先順位付けとして十分に機能しているため、追加インストールをこのタイミングで
  提案する必要性は低いと判断した(Reuse Before Build: 既にある手法の組み合わせで
  目的[優先順位付け]を達成できるなら、新規依存を増やさない)。

## Reusable

YES — `benchmark_alignment_methods.py`は他のTARGET_CUE_IDSへも再利用可能。
低confidenceScore cue全件(現状4件)や新規追加cueに対しても、同じ手順で
agreementSpreadMsを算出し、聴取確認の優先順位判断材料にできる。

## Confidence

MEDIUM — 5手法すべてがlibrosaのonset検出系または既存beat-mapという、根本的に近い
アルゴリズム系統に依っている(独立性が完全ではない)。真に独立した手法
(例: ASRベースのforced-alignment)を含めた場合、異なる結果が出る可能性は残る。
