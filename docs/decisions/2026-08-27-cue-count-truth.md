# StaRt Wedding Edit — cue count正本の整理(73 vs 78)

Status: RECORD
Scope: `feature/start-129-three-showcases` の TimingMaster / listening tooling

## 背景

進捗報告に「0/73 cues」と、過去のPR本文/コミットメッセージにある「全78 cue
listening clips」が混在して見え、不整合に見えるという指摘があった。実データを
確認し、単なる古い記述の食い違いではなく、2種類の異なるcue集合を指している
ことを確認したので、正本を1つに定める。

## 実測(2026-08-27、revision=15時点)

```text
TimingMaster.phrases[].cues (vocal cue)      = 73件
  内訳: phrase-onset 30 + word-accent (可変) + syllable-hit (可変)
TimingMaster.editorialBlocks[].letterCues    = 5件
  (冒頭のStaRt文字組み立て: INTRO-START-S/T1/A/R/T2)
--------------------------------------------------------------
listening clip 総数(render-cue-listening-clips.mts出力)   = 73 + 5 = 78件
```

`verification.totalVocalCues` / `verification.verifiedVocalCues`
(TIMING_MASTER_VERIFIED昇格条件に使われるカウンタ)は**vocal cueのみ**を
数えており、letterCueを含まない。これが「0/73」の出どころ。

一方、`render-cue-listening-clips.mts` はvocal cue(73件)とletterCue(5件)の
**両方**をブラウザで聴取確認できるクリップとして書き出すため、生成される
クリップ数は78件になる。過去のPR本文にあった「78 cue」はこちらを指していた。

## 正本

- **人間の聴取確認・Golden Anchor昇格の対象母数(schema上のverification正本)は
  「vocal cue 73件」。** `TIMING_MASTER_VERIFIED`昇格条件はこの73件基準。
- **実際に聴取できるクリップの総数は78件**(vocal cue 73 + letterCue 5)。
  letterCueも人間が実際に聴いて確認すべき対象ではあるが、現在の
  `verification`スキーマにはletterCue用のカウンタが無い(TimingMaster設計時に
  vocal cueのみを想定していたため)。
- どちらも古い記述の誤りではなく、対象範囲が異なる正しい数値。今後この2つの
  数値を混同しないよう、報告時は必ず「vocal cue N/73」「listening clip
  総数M/78(vocal+letterCue)」のように内訳を明示する。

## 対応

- letterCue用の`verifiedLetterCues`/`totalLetterCues`カウンタをschemaへ
  追加するかは、現時点では見送る(letterCueは5件のみで固定、かつ
  `apply-listening-verification.mts`は既にletterCueのdecisionも
  `verifiedByListening`へ反映できる実装になっている。schema拡張は
  「今すぐ必要な穴」ではなく「念のため」に該当するため、無限にテストや
  schemaを増やさない方針に従い見送る)。
- 本ドキュメントをcue count正本の参照先として残す。
