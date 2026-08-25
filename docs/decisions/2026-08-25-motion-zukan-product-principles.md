# モーション図鑑 Product Principles

Status: ACTIVE / MUTABLE  
Scope: `wedding-project` Movie only  
Parent contracts:
- `docs/contracts/human-readable-editable-movie-contract.md`
- `docs/contracts/visual-scene-composer-design-rules.md`

## Naming

ユーザー向けの正本名称は **「モーション図鑑」** とする。

`Visual Motion Library` は既存コード・ファイル名・内部識別子・過去資料での技術名/legacy nameとして残してよいが、UI、会話、ユーザー向け説明では原則「モーション図鑑」を使う。

この名称変更のためだけに既存コード・URL・データIDを一括renameしない。今後触る箇所から安全に適用する。

## Product thesis

このプロジェクトが作るものは新しい動画編集ソフトではない。

最重要の考え方は次の2点。

> **既に大量に存在する動画演出・テンプレート・DaVinci機能を、人間が見て選び、意味を理解し、必要な部分だけ修正できる構造へ整理する。**

> **AIが作ったものを人が頑張って直すのではなく、人が直せる構造をAIが組み立てる。**

動画編集はゼロからすべて発明しない。既存の定番演出、Template、Motion、Transition、Title、Fusion、`.drfx`、`.setting`、Reactor、外部Asset、repo既存資産を先に調べて再利用する。

## Figma analogy

動画制作の使いやすさは、Figmaの `Component / Variant / Props / Editable Structure` に近い考え方で整理する。

対応イメージ:

| Figma | Movie |
| --- | --- |
| Component | Scene Recipe |
| Variant | Motion Variant |
| Props | Image / Text / Delay / Duration / Position |
| Frame | Scene |
| Image replacement | Photo / Video replacement |
| Editable Text | Editable Text |
| Human edit | HUMAN_SELECTED |
| Fixed value | LOCKED |

ただし動画にはFigmaに無い「時間」「音楽」「前後Scene」があるため、Start / Delay / Duration / Hold / Exit / Stagger / Beat / Transitionを追加の第一級要素として扱う。

## モーション図鑑の役割

モーション図鑑は文章の辞書ではなく、**動画Previewを見て選ぶ図鑑**。

専門用語を知らない人でも、例えば次のような自然語から探せるようにする。

- 文字が下からシュッ
- 文字がドン
- 1文字ずつ出る
- 写真を少しズーム
- 写真をパンパンパン
- 映画っぽい
- 写真1枚を主役にしたい
- 文字を目立たせたい
- 写真をたくさん見せたい

選択した項目では、少なくとも次を理解できるようにする。

- 日本語名
- 正式/技術名称
- Preview
- 用途
- 対象Layer
- Opening / Profile suitability
- DaVinciでの実装方法
- Palmier対応範囲
- 変更可能なhuman-readable値
- Preview provenance

## Do not invent before organizing

演出を増やすこと自体を成果にしない。

Typographyだけでも Fade / Mask Reveal / Slide / Scale Punch / Character Stagger / Word Stagger / Tracking / Typewriter 等があり、Photoにも Static / Slow Push / Pull Out / Pan / Drift / Parallax / Photo Stack / Split Screen / Contact Sheet 等がある。Transitionにも Hard Cut / Fade / Dissolve / Wipe / Slide / Zoom / Match Cut 等がある。

したがって優先順位は、

1. 既存演出を発見する
2. 重複を整理する
3. 名前と自然語Vocabularyを付ける
4. Previewを用意する
5. 実装方法を紐付ける
6. human-editable Propsを定義する
7. Scene Recipeへ組み合わせる
8. 足りないものだけCustomする

とする。

## Motion Pattern and Scene Recipe

### Motion Pattern

1つの意味的な動き。

例:
- Mask Reveal
- Subtle Push
- Scale Punch
- Fade

### Scene Recipe

複数のMotion PatternとLayer構成を組み合わせた再利用可能な開始点。

例:

```text
Travel Location Reveal
Photo
+ Subtle Push
+ HAWAII
+ Mask Reveal
```

Recipeは完成品ではなくeditable defaults。採用後はSceneInstanceとして独立し、Recipe更新でHuman Selected値を上書きしない。

## Scene Composer

Scene Composerは制作の中心。

ユーザーが、

```text
Photo: hawaii.jpg
Scene Target: 4 sec
Image Motion: Gentle Push
Text: HAWAII
Text Motion: Mask Reveal
Text Delay: 0.6 sec
Position: Bottom Right
```

のように意味の分かる値を設定し、Actual Scene Previewを確認して `採用` する。

採用したSceneInstanceをStructured Timelineへ積み上げる。

## Human-editable source of truth

AI専用の不透明なscoreをProduction authorityにしない。

Canonical valuesは、人間が読んで意味が分かり、個別に直せる値とする。

例:

```text
Visible Duration: 5 sec
Layer Delay: 0.8 sec
Motion Duration: 0.6 sec
Hold: 3 sec
Position: bottom-right
Position Offset: X +2%, Y -3%
Scale: 100% → 104%
Motion: Mask Reveal
Intensity: weak
```

重要設定では必要に応じて、

- DEFAULT
- AI_SUGGESTED
- HUMAN_SELECTED
- LOCKED

を分離する。

AI提案には可能ならReasonを残す。

```text
AI Suggested: left-bottom
Reason: subject occupies the right side
Human Selected: right-bottom
Locked: true
```

HUMAN_SELECTED / LOCKEDはClaude / Codex / Palmier / 自動処理が黙って変更しない。

## Time model

Image / Video / Text / Graphicは独立Layerとして時間を持つ。

少なくとも区別する:

- Layer Start / Layer Delay
- Motion Delay
- Motion Duration
- Visible Duration
- Hold
- Enter / Hold / Exit
- Stagger Delay

Sceneのcomputed durationは、一番遅く終わるLayerで決める。

`computedSceneDuration = max(layerStartOffset + layerVisibleDuration)`

ユーザーの「4秒くらい」はTarget/Budgetとして保持し、Computedと違う場合は勝手に縮めず差分を見せる。

## Position model

内部はX/Y percentageで扱ってよいが、初心者UIでは9-grid presetを先に見せる。

- 左上 / 上 / 右上
- 左 / 中央 / 右
- 左下 / 下 / 右下

必要なときだけ `X +2% / Y -3%` のように微調整する。

PositionとMotion Directionは別値。

## UI levels

UIは原則3段階。

### かんたん

- 位置: 右下
- 写真の動き: ゆっくり寄る
- 文字の登場: 下からスッと
- 強さ: 弱

### 詳細

- X / Y
- Position Offset
- Layer Delay
- Motion Delay
- Duration
- Hold
- Scale
- Distance
- Enter / Hold / Exit
- Crop / Focus

### DaVinci

- Text+
- Fusion
- Keyframe
- Spline
- Mask
- implementation-specific details

Scene ComposerをDaVinci Inspectorのコピーにしない。

## Preview truth

Previewは文章より重要。

Provenanceを必ず区別する。

- ACTUAL_DAVINCI_RENDER
- ACTUAL_PALMIER_RENDER
- REPO_GENERATED
- OFFICIAL_EXTERNAL_REFERENCE
- CONCEPT_ONLY
- MISSING

Concept PreviewをDaVinci実装済みの証拠として扱わない。

Neutral Motion PreviewとActual Scene Previewも分ける。

## DaVinci as effect engine

repo側はMotionの意味、human-readable Props、Preset、Recipe、Preview evidence、実装参照を持つ。

実際のEffect Engineは可能な限りDaVinci / Fusionを使う。

例:

```text
Mask Reveal
→ Text+
→ Rectangle Mask
→ Keyframe
→ Spline
```

新しいEffectを作る前に次の順でReuse Before Buildを実施する。

1. DaVinci built-in
2. Fusion built-in
3. Blackmagic official
4. `.drfx`
5. `.setting`
6. Reactor
7. license確認済みexternal/free asset
8. purchased asset when justified
9. repo existing implementation
10. custom implementation

## Palmier role

PalmierはRough Edit担当。

- 素材配置
- Cut / Trim / Split
- 順番
- Rough Timing
- Rough Text placement
- 対応可能なrough motion
- Scene組み立て

高度なFusion、精密Timing、Typography、Color、Fairlight、easing、final crop等はDaVinci Finalへ渡す。

## Structured Timeline authority

90秒全体の巨大Promptを正本にしない。

正本はSceneInstanceの配列とScene間関係。

```text
Scene01
Scene02
Scene03
...
```

各SceneはMedia / Text / Duration / Delay / Motion / Position / Hold / Intent / State / Lock等を持つ。

そこから同じ構造を基に、

- Human Brief
- Claude Prompt / Creative Instruction
- Palmier Instruction
- DaVinci Handoff / Finish Manifest
- JSON
- NLE XML + Motion Handoff Manifest

を生成する。

## Opening and Profile

OpeningとProfileは同じ基盤を使う。

Opening defaults:
- shorter
- shorter delay/hold
- slightly stronger accent
- tempo priority

Profile defaults:
- longer
- longer hold
- weaker/restrained motion
- photo recognition and text readability priority

別アプリへforkしない。

## Incremental adoption

この考え方を適用するためだけに36 Motion Kit / 97 Director Recipes / StaRt / Profile / Remotion / legacy Sceneを一括作り直さない。

今後触るものから、KEEP / MERGE / SPLIT / RENAME / DEPRECATE / REFERENCE_ONLYを判断しながら小さく適用する。

## Core product definition

> **モーション図鑑で既存演出を見て選び、Scene Recipeで組み合わせを知り、Scene Composerで自分の写真・文字・時間へ差し替え、Structured Timelineへ積み上げ、その同じ構造をPalmier RoughとDaVinci Finalへ渡す。**

AIはDirectorの代わりではなく、既存知識の探索、候補整理、提案理由、構造の組み立て、変換、handoffを担当する。
