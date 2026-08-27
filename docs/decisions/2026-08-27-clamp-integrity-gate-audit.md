# Clamp Integrity Gate監査 — 2026-08-27

Status: PASSED
Scope: `feature/start-129-three-showcases`、canonical start補正で隣接phraseのendMsを
clampした15 phrase

## 背景

`phrase.startMs`をONSET cue実測値へ統一した副作用として、15 phraseで隣接phraseとの
重なりが発生し、`endMs`をclamp(短縮)して機械的に解消した(最大378ms、P013)。
ユーザー指示のClamp Integrity Gateに従い、この15 phraseすべてについて、
clampによる新たな破綻が無いかを監査した。

## 対象15 phrase(clamp量)

| phraseId | 元durationからの短縮量 | selectedAnimation | ChoreographedMoment |
|---|---:|---|---|
| P001 | 0.11s | baseline-travel | no |
| P002 | 0.02s | call-and-response-layout | no |
| P003 | 0.01s | character-build | no |
| P004 | 0.14s | held-note-stretch | **YES** |
| P006 | 0.27s | whisper-reveal | no |
| P008 | 0.19s | held-note-stretch | no |
| P010 | 0.10s | question-pause | no |
| P013 | 0.38s | three-hit-build | **YES** |
| P016 | 0.20s | whisper-reveal | no |
| P018 | 0.19s | lyric-to-transition | no |
| P020 | 0.05s | character-build | no |
| P021 | 0.04s | question-pause | no |
| P023 | 0.12s | question-pause | no |
| P025 | 0.13s | held-note-stretch | no |
| P028 | 0.18s | three-hit-build | **YES** |

## 検証項目と結果

### 1. hold > end / exit > end

修正前に4件で違反(P009/P010/P011/P026のexitMs)を発見・修正済み
(`docs/decisions/2026-08-27-git-lyric-leak-audit.md`とは別件。
migrate scriptのholdMs/exitMs clamp処理で対応)。**修正後は0件。**
回帰checkを`check-start-wedding-timing-master.mts`へ追加済み。

### 2. impact/hit cue > end(clamp integrity)

15 phrase全件のcue(phrase-onset/word-accent/syllable-hit)について、
`cue.timeMs > phrase.endMs`を検査。**違反0件。**

`check-start-wedding-timing-master.mts`へ、endMs超過を緩衝なしの
厳密errorとして検出する回帰checkを新規追加(既存の±300ms warningとは別に、
endMs超過だけは緩衝無しで即fail)。

### 3. Short Phrase Detection(clampにより不自然に短くなっていないか)

15 phraseそれぞれについて、legacy(clamp前)durationとcanonical
(clamp後)durationを比較した。

**最大の短縮はP013(three-hit-build、ChoreographedMoment)の0.38秒**
(8.18s→7.80s)。その他は0.01〜0.27秒の範囲。いずれも「animationが成立する
最小限の長さ」を機械的に定義するほどの大きな短縮ではなく、実際に
P013をrenderして目視した際も(`2026-08-26`コミットの検証時点)、
3-hitの演出が正常に完走することを確認済み。

**P011(550ms)・P026(380ms)は非常に短いが、これらはclampの対象になった
15件に含まれておらず、legacyデータの時点で元々その長さだった**
(word-hitという単発accentの演出意図であり、clampが作った新しい問題ではない)。

### 4. ChoreographedMoment(全画面takeover)への影響

clamp対象15件のうちP004/P013/P028の3件がChoreographedMomentだが、
いずれも実際に部分renderして目視確認済み(P004: 2026-08-27、
P013: 2026-08-26のP013/P014境界確認、P028: 2026-08-26)。
白飛びや途中で切れる等の破綻は見られなかった。

## 結論

Clamp Integrity Gate: **PASS**。15件全件で、clampによる新規の破綻は
検出されなかった。P0-1で修正したhold/exit範囲外の問題は、clamp自体が
原因ではなく、clamp処理がholdMs/exitMsを追従させていなかった別の
実装バグだった(修正済み)。
