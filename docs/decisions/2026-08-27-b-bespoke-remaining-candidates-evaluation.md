# StaRt Wedding Edit B案 — bespoke全画面takeover残り候補の評価(TASK5)

Status: RECORD(評価のみ、実装は未着手)
Scope: `CHOREOGRAPHED_PHRASE_IDS`(現在6件: P004/P012/P013/P014/P027/P028)以外の
24 phraseから、bespoke化(全画面takeover級の専用演出)する価値が高い候補を選ぶ。

## 前提

全30 phraseは既に何らかのanimation family(character-build/whisper-reveal等)
による専用描画を持っている(「24 phrase未実装」ではない)。ここで評価するのは
「現状のanimation familyのままで十分か、それとも
`ChoreographedMomentRenderer`級の全画面takeoverへ格上げする価値があるか」。

## 採用基準(厳格に適用)

bespoke化は以下を**すべて**満たす場合だけ検討する。

1. 今のanimationより明確に良くなる
2. 実写真を主役にできる(現状はplaceholderのため、この判定は実素材投入後が本番)
3. テンプレ感/effect過剰を減らす方向である
4. 曲のsection変化に意味がある瞬間である

**候補選定の観点**: 各sectionの先頭(verse/prechorus/chorus切り替わり、
Rhythm Hierarchyでいう「section change = 大きな編集判断点」)、および
サビ着地(hero impact)の中から、既にbespoke化済みでない7箇所を評価した。

## 評価表

| phraseId | 現在のanimation | section文脈 | bespoke化の改善余地 | 実素材必要か | Timing依存 | Human判断必要 | AI側で今作れるか | 推奨 |
|---|---|---|---|---|---|---|---|---|
| P001 | baseline-travel | verse-1a冒頭(曲全体の出だし) | 低。現状のtwo-word travelでdocumentary tone維持と整合。過剰演出はStyle Bibleの「まず静か」方針と衝突しうる | 低(判断材料に有用ではあるが必須ではない) | なし | Yes(過剰演出化のリスク判断) | 低優先度なので保留 | **見送り** |
| P005 | character-build | verse-1b冒頭 | 低。並列section(verse-1a→1b)の切り替わりだが、既存の淡々とした文字積み上げで十分機能 | 低 | なし | Yes | 低優先度なので保留 | **見送り** |
| P009 | whisper-reveal | prechorus-1冒頭(chorus-1の3-hitへ向かう「溜め」) | 中〜高。P012(3-hit)直前の「予感」を作る専用moment(カメラのゆっくりしたpush-in等)は、Rhythm Hierarchyの「Medium: camera/typography accent」に自然に合致する | 高(実際どの写真で「溜め」を作るかは実素材次第) | なし | Yes | 設計だけなら可能。実装は実素材投入後が望ましい | **候補(実素材投入後に検討)** |
| P015/P030 | impact-word(既にhero分岐あり) | chorus-1着地(P015)/chorus-2着地=曲全体の最終climax(P030) | 高、特にP030。曲全体で最も重要な1行であり、現状のImpactWordHold(scale+glow)は既に強めだが、ArmorCreation/SoloUnion級の全画面写真takeoverにする価値がある | 高(Hero写真そのものの質がこの一発で決まる) | なし | Yes(Wedding OPとして最も重要な創作判断) | 構造だけなら準備可能。本実装は実Hero写真が来てから | **最優先候補(実素材待ち)** |
| P016 | whisper-reveal | verse-2a冒頭(chorus-1直後の「静寂ビート」) | **低〜負**。storyboard.tsのnoteJa「P016静寂ビート(1名negative space)」の通り、これは意図的な静けさの瞬間。ここへeffectを足すのはRhythm Hierarchyの「静かにする判断」に反する | - | - | - | - | **見送り(積極的に手を出さない)** |
| P020 | character-build | verse-2b冒頭 | 低。P005と同様、並列section切り替わりで現状のまま機能している | 低 | なし | Yes | 低優先度なので保留 | **見送り** |
| P024 | whisper-reveal | prechorus-2冒頭(chorus-2の3-hitへ向かう「溜め」) | 中〜高。P009と対になる2回目の「溜め」。P009と揃えることで曲構造の対称性(1番/2番)を強調できる | 高 | なし | Yes | 設計だけなら可能。実装は実素材投入後 | **候補(P009と対で検討、実素材投入後)** |

## 結論

- 即座にbespoke実装すべき箇所は**0件**(実素材が無い状態でbespoke化しても
  「実写真を主役にできる」基準を満たせないため)。
- 優先度付き候補は3箇所: **P030(最優先) > P009/P024(対で検討)**。
- P016は逆に「今のままが正解」の例として明記し、今後も手を出さない。
- P001/P005/P020は見送り。将来実素材を見て明確な必要性が出た場合のみ再検討する。

## 次のアクション

実Wedding写真・動画が投入され、Real Media Preflightが`MEDIA_READY`相当に
近づいた段階で、まずP030(曲全体のHero着地)から実写真を使ったbespoke案を
1つだけ試作し、既存のP014(SoloUnionMoment)等と同様の全画面takeover
パターンをReuse Before Buildで検討する。
