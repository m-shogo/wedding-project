# StaRt Wedding Edit B-clean — 全30 phrase Visual QA(full sweep)

Status: RECORD(完了)
Scope: `motion-studio/out/start-wedding-edit-b-final-v2/start_wedding_edit_b_clean.mp4`(1080p final render)
Supersedes: `2026-08-27-b-clean-full-visual-qa-sweep.md`(11 phraseのsampling結果)の「30/30完了」表現を、実際の30/30 full sweep結果へ置き換える。

## 方法

全30 phraseについて、entry(phrase開始+0.15s) / mid(中間点) / exit(phrase終了-0.15s)の
計90 frameを実際の1080p final renderから抽出し、目視確認した。
scratch(local一時ファイル)のみ使用し、画像自体はGitへ保存していない。

## 確認項目(各phrase共通)

blank frame / missing text / clip破綻 / unexpected crop / negative local frame由来の消失 /
animation途中切断 / text overflow / extreme opacity bug / unwanted white flash /
unintended freeze / visual impactがSequence外へ出ていないか / placeholder asset破綻 /
致命的なaspect ratio崩れ / animation familyの最低限の成立。

## 結果

```text
Visual QA checked: 30/30
Functional FAIL: 0
Visual notes: 2 (P017, P021。いずれも既知・対応方針あり)
```

| phraseId | family | 結果 |
|---|---|---|
| P001 | baseline-travel | PASS |
| P002 | call-and-response-layout | PASS |
| P003 | character-build | PASS |
| P004 | held-note-stretch(bespoke ArmorCreationMoment) | PASS |
| P005 | character-build | PASS |
| P006 | whisper-reveal(BouncyLaLa) | PASS |
| P007 | whisper-reveal | PASS |
| P008 | held-note-stretch | PASS |
| P009 | whisper-reveal | PASS |
| P010 | question-pause | PASS |
| P011 | word-hit | PASS |
| P012 | three-hit-build(bespoke SunburstThreeHitMoment) | PASS |
| P013 | three-hit-build(bespoke RippleThreeHitMoment) | PASS |
| P014 | foreground-reveal(bespoke SoloUnionMoment) | PASS |
| P015 | impact-word | PASS |
| P016 | whisper-reveal | PASS |
| P017 | repetition-echo | PASS_WITH_NOTE(下記) |
| P018 | lyric-to-transition | PASS |
| P019 | split-conflict | PASS(下記の調査経緯あり) |
| P020 | character-build | PASS |
| P021 | question-pause | PASS_WITH_NOTE(下記) |
| P022 | character-build | PASS |
| P023 | question-pause | PASS |
| P024 | whisper-reveal | PASS |
| P025 | held-note-stretch | PASS |
| P026 | word-hit(StartMotifCallback) | PASS |
| P027 | three-hit-build(bespoke SunburstThreeHitMoment再利用) | PASS |
| P028 | three-hit-build(bespoke RippleThreeHitMoment再利用) | PASS |
| P029 | type-mask(TypeMaskText、プロジェクト全体のフラグシップMask Reveal相当) | PASS |
| P030 | impact-word(hero) | PASS |

## Note詳細

### P017(repetition-echo)

RepetitionEcho(反復語echo)とCharacterBuild(残り文字列)が半透明caption card内で
視覚的に重なって見える。margin調整(44→78px)を試したが、実render比較で有意な
改善が確認できず、変更は破棄済み(コミットしていない)。原因はcard自体が
半透明で、同一card内にある限りecho要素が透けて見える構造にある。
→ TASK 2でA/B/C(/D)の比較案を用意し、人間の視覚判断へ委ねる。

### P019(split-conflict)— 調査済み、バグではないと判明

entry frame(70.62s付近)で画面右側約28%に無地の彩度が高いcoral色
(`#E5615B`)のブロックが見えたため詳細調査した。結果、
`src/data/startWeddingEdit/storyboard.ts`の`verse-2a`セクション4番目shot
(`HERO_CLOSE`)に明示的に定義された`entry: colorBlock(6, '#E5615B')`という
**意図的なentry transition効果**(6frameの色フラッシュから写真への遷移)
であることを確認した。同種の`colorBlock(...)`entry効果は`P014`
(`#5B7FDE`)や`verse-2b`/`chorus-2`(`#F4C95D`)等、storyboard全体で
複数箇所に使われている既存の演出パターンであり、P019固有のバグではない。
サンプリングした瞬間がこの6frameの遷移の途中だっただけ。

### P021(question-pause)— 既知、placeholder資産由来

画面右端に非対称の黒帯が見えるフレームがある。`StartDemoBackdrop`の
`objectFit:cover`実装自体は正しく機能しており(CSSレイアウトの不具合ではない)、
黒帯は現在使用中のplaceholder動画ソース自体に焼き込まれたピクセルである
ことを確認済み(2026-08-27の前回調査で既述)。実Wedding素材投入後に
自然に解消される見込みが高いため、Timingバグとしては扱わない。
実素材投入後に再確認する。

## 結論

30/30 phraseについて実際にVisual QAを行った結果、**機能的なFAILは0件**。
「代表11件をsamplingした」という前回の暫定確認から、今回で正式に
30/30 full sweepへ格上げした。残る2件のnote(P017/P021)はどちらも
バグ確定ではなく、設計判断待ち(P017)またはplaceholder資産起因(P021)として
扱う。
