# モーション図鑑 Future Update Backlog

Status: ACTIVE / MUTABLE / DISCUSSION-BACKLOG  
Date: 2026-08-25  
Scope: `wedding-project` Movie only  
Parent authorities:
- `docs/contracts/human-readable-editable-movie-contract.md`
- `docs/contracts/visual-scene-composer-design-rules.md`
- `docs/decisions/2026-08-25-motion-zukan-product-principles.md`

## Purpose

この文書は、現在実装中のモーション図鑑を止めたり作り直したりするためのものではない。

現在のVertical Slice / SceneInstance / Structured Timeline / Palmier / DaVinci handoff実装をそのまま進めながら、ユーザーとの壁打ちで合意した次のアップデート候補を忘れず、順番を整理して蓄積するためのBacklogである。

最重要前提:

> **新しい動画編集ソフトを作るのではなく、既に存在する演出を、人が見て選び、意味を理解し、必要な部分だけ直せるようにする。**

> **編集可能であるだけでは足りない。普段の操作量そのものを減らし、「選ぶだけ」で済む状態を増やす。**

> **Preset First, Precision When Needed.**

このBacklogに入っている項目は原則として「採用方向」で合意済みだが、既存Vertical Sliceを壊して一括実装しない。小さく証明しながら順次入れる。

---

# 0. Current implementation snapshot

2026-08-25時点の実装はすでに構想段階ではない。

現在のmainでは少なくとも以下が存在する。

- ユーザー向け名称「モーション図鑑」
- Mask Reveal Vertical Slice
- HUMAN_MASTER editable source of truth
- DEFAULT / AI_SUGGESTED / HUMAN_SELECTED / LOCKED
- かんたん / 詳細 / DaVinci UI
- Scene Duration / Layer Delay / Motion Delay / Motion Duration / Hold / Stagger Delay
- Position Preset / X / Y / Offset
- Direction / Distance / Scale
- Crop / Focus / Intensity
- SceneInstance採用
- Recipe provenance
- property-local editing
- Target Duration / Computed Duration / delta
- Opening / Profile共通Composer
- Structured Timeline
- SceneEdge / HARD_CUT
- localStorage persistence
- Prompt / Human Brief / Palmier / DaVinci / JSON projection
- Preview provenance separation
- Concept vs Actual DaVinci truth boundary

現在進行の次段ではSceneInstanceをPalmier / DaVinci handoff正本へつなぐ。

このBacklogはそれを止めない。

---

# 1. Product direction: Human Editable + Human Easy

Human-Editable契約だけで終わらせない。

目標は次の4条件を同時に満たすこと。

```text
理解できる
+
部分修正できる
+
普段は選ぶだけで済む
+
一度決めたものを再利用できる
```

例えば内部では:

```text
X = 78%
Y = 78%
Layer Delay = 0.8 sec
Distance = 3%
Scale = 100% → 104%
```

を正確に保持してよい。

しかし通常UIではまず:

```text
位置: 右下
文字を出す: 写真を少し見せてから
動き: 下から少しだけ
強さ: 弱
```

で操作できるべき。

数値はDetailで必要な時だけ開く。

---

# 2. P1 — Preset-first controls

## 2.1 Delay preset

Layer Delayを毎回数値入力させない。

Easy候補:

```text
すぐ
少し待つ
写真を見せてから
ゆっくり待つ
```

内部例:

```text
すぐ = 0.0 sec
少し待つ = 0.4 sec
写真を見せてから = 0.8 sec
ゆっくり待つ = 1.2 sec
```

数値は固定ルールではなく、Opening / Profile / Scene roleでdefaultを変えられるeditable presetとする。

Human Selectedの数値をpreset更新で上書きしない。

## 2.2 Motion Duration preset

```text
速い
普通
ゆっくり
```

を先に見せ、詳細で秒数へ降りる。

## 2.3 Motion Distance preset

```text
小
中
大
```

内部%へ解決する。

例:

```text
Small = 3%
Medium = 8%
Large = 15%
```

ただし値はPattern別Visual QAで決める。全Motionへ同じ数値を機械適用しない。

## 2.4 Scale preset

```text
ほんの少し寄る
少し寄る
しっかり寄る
```

例:

```text
102%
104%
108%
```

詳細ではFrom / Toを直接編集できる。

## 2.5 Position preset

現在の9-gridを維持し、Offsetだけ必要時に出す。

```text
左上 / 上 / 右上
左 / 中央 / 右
左下 / 下 / 右下
```

内部%とHuman labelは両方保持する。

---

# 3. P1 — My Scene Preset / お気に入りScene

Scene Recipeとは別に、ユーザーが実際に気に入ったSceneInstanceから自分のPresetを保存できるようにする。

役割を分ける。

```text
Scene Recipe
= 共通/公式の演出文法

My Scene Preset
= ユーザーが実際に調整して気に入った自分の型
```

例:

```text
Wedding Hero 01
Image: 1
Scene: 5 sec
Image Motion: Gentle Push
Scale: 100 → 104%
Text Position: Bottom Right
Text Delay: 0.8 sec
Text Enter: Mask Reveal
```

再利用時:

```text
写真だけ変更
文字だけ変更
```

で成立することを目標にする。

## Provenance

My Scene Presetには:

- source SceneInstance ID
- source Recipe ID
- saved revision
- editable defaults
- user label
- Opening / Profile usage
- createdAt / updatedAt

を持てるようにする。

元SceneやRecipe更新でPresetを黙って書き換えない。

---

# 4. P1 — Intent-first search / やりたいことから探す

モーション図鑑の検索は正式名称検索だけでは不十分。

AIの主要な価値はMotion生成ではなく、曖昧な人間語を既存Motion / Recipeへマッピングすること。

## Search dimensions

### 正式名称

```text
Mask Reveal
Gentle Push
Character Stagger
```

### 日本語

```text
マスクで出す
ゆっくり寄る
一文字ずつ出す
```

### 擬音

```text
シュッ
ドン
バン
パンパンパン
ふわっ
```

### Intent

```text
写真を主役にしたい
文字を目立たせたい
写真をたくさん見せたい
子供時代を優しく見せたい
旅行先の名前を印象づけたい
盛り上がる直前
余韻を作りたい
```

### Impression / style

```text
映画っぽい
CMっぽい
雑誌っぽい
ドキュメンタリーっぽい
テンポが良い
静か
```

## Expected flow

```text
「ハワイの写真を4秒、最初写真見せてからHAWAIIを右下。派手じゃなく」
↓
候補Recipe 3件
↓
Preview比較
↓
採用
```

AIは新しいMotionを勝手に発明する前に既存Registryを検索する。

---

# 5. P1 — Compare Mode

モーション図鑑の価値を最も直接高める候補。

同じサンプル / 同じ文字 / 同じ尺で複数Motionを比較する。

例:

```text
Mask Reveal
Fade Up
Character Stagger
Scale Punch
Tracking Reveal
```

比較条件を揃える。

- same sample asset
- same text
- same duration
- same background
- same position where meaningful
- same playback speed

Controls:

- 同時/同期再生
- 0.5x / 1x
- loop
- A/B選択
- Weak / Normal / Strong比較
- Before / After when useful

目的:

> 名前や説明を読むより先に「AとBどっちが好き？」で選べる。

Compare結果自体をHuman preference evidenceとして保存できる余地を残す。

---

# 6. P1 — Neutral Preview + Actual Scene Preview

Previewを2種類に明確に分ける。

## Neutral Motion Preview

共通sampleでMotionそのものを比較する。

目的:

> 動き自体を選ぶ。

## Actual Scene Preview

ユーザーの現在SceneInstanceのMedia / Text / Position / Timing / Intensityを使う。

目的:

> 自分のSceneとして成立するかを見る。

両方にprovenanceを表示する。

Actual Scene Previewがrepo-generated approximationの場合、Actual DaVinciとして表示しない。

---

# 7. P1 — Safe Area visualization

Safe Areaはcontract上存在するだけでなく、Composer Preview上で視覚化する。

候補:

- title safe
- action safe
- venue-safe custom margin

通常は薄く表示し、toggle可能にする。

文字を自由Positionにしても端へ寄りすぎないよう、警告はするがHuman Selectedを勝手に移動しない。

例:

```text
⚠ 文字がTitle Safe Areaの外側です
[そのまま]
[安全位置を提案]
```

---

# 8. P2 — Motion Compatibility / 相性グラフ

Motion単体だけでなく「何と組み合わせやすいか」をKnowledgeとして持つ。

例:

```text
Mask Reveal

相性◎
- Gentle Push
- Static Hero
- Slow Pan

相性△
- Scale Punch
- Character Stagger

注意
- 強いZoom Transition直後だと忙しくなりやすい
```

Hard禁止ルールにしない。

AI Suggested Reasonへ使う。

例:

```text
Text Motion Suggestion: Fade Up
Reason: Image側ですでに強いScale Punchを使っているため。
```

---

# 9. P2 — Motion role / Motion Budget

Scene内のMotionを役割で分ける。

```text
PRIMARY
SECONDARY
ACCENT
ENTER
HOLD
EXIT
BASE
```

Default principle:

- strong Primary: 1
- subtle Secondary: optional 1
- Accent: 必要時のみ

UIではopaque scoreではなく:

```text
落ち着いている
バランス良い
少し忙しい
```

程度のDerived indicatorを出す。

数値scoreをSource of Truthにしない。

---

# 10. P2 — Scene Context Review

動画はScene単体ではなく前後関係で評価する。

例:

```text
Scene01 Scale Punch
Scene02 Scale Punch
Scene03 Scale Punch
```

単体では良くても連続すると単調になる。

Timeline側でnon-blocking feedbackを出す。

例:

```text
⚠ Scale Punchが3 Scene連続しています
```

他にも:

- 強Motionの連続
- Transitionの連続
- Center titleの連続
- Holdが短いSceneの連続
- Profileで読み時間不足が連続
- 同じRecipeの連続

AIは代替候補を提案してよいが自動変更しない。

---

# 11. P2 — Timeline rhythm visualization

NLEのtrack editorを再実装せず、全体リズムだけ把握しやすくする。

例:

```text
01 PHOTO HERO       4.0s   CALM
02 LOCATION         3.5s   BALANCED
03 PHOTO BURST      5.0s   BUSY
04 PROFILE INTRO    6.0s   CALM
```

または:

```text
静 ─ 静 ─ 中 ─ 強 ─ 静 ─ 強
```

この表示はSceneのhuman-readable構造からderiveする。

編集authorityにはしない。

---

# 12. P2 — Usage Evidence / 使った実績

実際に採用・修正・却下した結果を、将来の提案Evidenceとして蓄積する。

Motion単位で例:

```text
Mask Reveal
Used: 4 scenes
Accepted: 3
Rejected: 1

Accepted Delay range:
0.6–0.9 sec
```

ただし少数Evidenceからhard ruleを作らない。

最低限保持候補:

- patternId
- recipeId
- project type
- section role
- accepted/rejected
- final Human Selected values
- comparison choice
- optional reason
- evidence count

目的は個人の好みや制作傾向を「提案」に反映すること。

---

# 13. P2 — Motion Storyboard / Start-Mid-End frames

動画Previewとは別にMotionの構造を静止フレームでも理解できるようにする。

例:

```text
START 0.0s
MID   0.3s
END   0.6s
```

Mask Revealなら、どこから見え始めてどこでsettleするかを一目で確認できる。

用途:

- Motion理解
- 0.5x確認の補助
- DaVinci学習
- Compare Mode
- accessibility / low-power preview fallback

---

# 14. P2 — Why it works / 演出意図

各Motionは技術説明だけでなく「なぜ使うのか」を持つ。

表示順候補:

```text
見た目
↓
演出意図
↓
向いている用途
↓
変更可能値
↓
DaVinciの仕組み
```

例:

```text
Mask Reveal

演出意図:
写真を先に認識させ、その後に文字情報を入れやすい。
写真主役のSceneでも文字が邪魔になりにくい。
```

これは学習と選択の両方に使う。

---

# 15. P2 — Anti-pattern / やりすぎ例

良いPreviewだけでなく、失敗しやすい例もBefore/Afterで見せる。

例:

```text
NG: Motionが強すぎる
NG: Delayなしで写真と文字が同時に来る
NG: Scale 100→120で寄りすぎ
NG: ImageもTextも強Motionで競合
```

改善例を並べる。

これは固定ルールではなく学習Evidence。

---

# 16. P2 — Just-in-time DaVinci Learning

モーション図鑑からDaVinci学習へ自然につなぐ。

通常UI:

```text
文字が下からスッと
```

`仕組みを見る`:

```text
Mask Reveal
文字そのものを動かすのではなくMaskを動かして表示範囲を変える。
```

`DaVinciで見る`:

```text
Text+
+
Rectangle Mask
+
Keyframe
+
Spline
```

`自分で作る`:

実装手順へリンク。

制作と学習を別アプリにしない。

---

# 17. P2 — Production maturity model

Preview provenanceとImplementation statusを組み合わせ、本番利用可否を分かりやすくする。

候補段階:

```text
REFERENCE
↓
CONCEPT
↓
IMPLEMENTED
↓
RENDER_VERIFIED
↓
PRODUCTION_READY
```

ただし既存のsourceType / status / evidence schemaと二重正本を作らない。

UI向け表示レイヤーとしてderiveするのが望ましい。

例:

```text
Mask Reveal
Preview ✓
DaVinci implementation ✓
Actual render ✓
Human QA ✓
PRODUCTION READY
```

---

# 18. P2 — External DaVinci Asset Registry

Reuse Before Buildを本当に使いやすくするため、外部assetの知識もRegistry化する。

対象:

- Blackmagic official
- `.drfx`
- `.setting`
- Reactor
- free templates
- purchased templates

最低限確認:

- name
- source
- license
- commercial/wedding use
- DaVinci version
- dependency
- install method
- editable props
- preview provenance
- performance note
- production status

「見つかった = 採用」にしない。

安全・権利・互換性を確認してからProduction Readyへ。

---

# 19. P2 — Scene Recipe fork / 自分版

Scene Recipeを固定Templateにしない。

ユーザーがRecipeを採用し、自分向けに調整したものから:

```text
自分版として保存
```

できるようにする。

例:

```text
Travel Location Reveal
↓ fork
Shogo Travel Location
```

差分だけ保持できると理想。

```text
Base Recipe: Travel Location Reveal v2
Override:
Position = Bottom Right
Delay = 0.8
Intensity = Weak
```

ただしBase更新を自動mergeしてHuman Selectedを壊さない。

---

# 20. P3 — Recommendation explanation

AI提案は「おすすめ」だけでなく理由を短く表示する。

例:

```text
おすすめ: Left Bottom
Reason: 人物が右側にいるため
```

```text
おすすめ: Text Delay 0.8秒
Reason: 写真を先に認識させてから場所名を出すため
```

さらに、Evidence由来か一般defaultかを区別できる余地を持つ。

---

# 21. P3 — Motion Variant browser

PatternとVariantを区別する。

例:

```text
Mask Reveal
├ Up / Small / Weak
├ Up / Medium / Normal
├ Left / Small / Weak
└ Fast Editorial
```

VariantはPatternをコピーした別Motionにしない。

MotionInstanceに入るPreset集合として扱う。

---

# 22. P3 — Project mode defaults

Opening / Profileは同じComposerだがPreset傾向を変える。

Opening例:

```text
Scene 3–5 sec
Text Delay 0.3–0.8 sec
Hold shorter
Accent slightly stronger
```

Profile例:

```text
Scene 5–8 sec
Text Delay 0.8–1.5 sec
Hold longer
Motion weaker
Readability first
```

これらはhard constraintsではなくeditable defaults。

---

# 23. P3 — Scene primary subject chooser

Composer開始時に:

> このSceneの主役は？

候補:

- 写真
- 文字
- 複数写真
- 場面転換
- 盛り上がり

これを利用してMotion候補をfilter/recommendする。

例:

```text
Primary: IMAGE
Secondary: TEXT
Accent: GRAPHIC
```

「全部を強く動かす」をUXで防ぐ。

---

# 24. P3 — Review feedback shortcuts

Actual Scene Preview / DaVinci renderを見た後の修正を自然語で入力できるようにする。

例:

```text
文字位置が違う
Delayが早い
Motionが強い
Sceneが短い
Holdを長く
Cropで顔が切れる
```

AIはこれをproperty-local editへ変換する。

例:

```text
「もう少し遅く」
→ Text Layer Delay候補 +0.2 sec
```

変更前に対象propertyを明示する。

無関係な値を再生成しない。

---

# 25. Implementation priority after current vertical slice

現在のMask Reveal → SceneInstance → Palmier/DaVinci handoffを先に完了する。

その後の推奨順は以下。

## Phase A — すぐ楽になる

1. Preset-first controls
2. My Scene Preset
3. Actual Scene Preview
4. Safe Area visualization
5. Intent-first search
6. Compare Mode

## Phase B — 図鑑として強くなる

7. Why it works
8. Motion Storyboard
9. Motion Compatibility
10. Anti-pattern / Before-After
11. Production maturity display
12. Just-in-time DaVinci Learning

## Phase C — 使うほど賢くなる

13. Usage Evidence
14. Recommendation reason
15. Scene Context Review
16. Timeline rhythm visualization
17. Recipe fork

## Phase D — 資産が増えても壊れない

18. External Asset Registry
19. Motion Variant browser
20. 既存36 Motion / 97 Recipeを必要なものから段階整理

---

# 26. What not to do

このBacklogを理由に次をしない。

- PR #311等の現在Vertical Sliceを止める
- 新しいMotionを大量登録してMask Reveal Actual proofを後回しにする
- 36 Motion / 97 Recipesを一括migrationする
- Scene ComposerをNLE化する
- DaVinci Inspectorを複製する
- AI scoreを正本にする
- Preview provenanceを曖昧にする
- Human Selected / LockedをPreset更新で上書きする
- 使用実績を少数サンプルからhard rule化する
- 外部assetをlicense確認なしでProduction Readyにする

---

# 27. Core update principles

今後のアップデート判断は以下で行う。

1. **既に存在するものを探したか？**
2. **Previewを見て選べるか？**
3. **普段はPresetだけで済むか？**
4. **必要なら精密値まで降りられるか？**
5. **人間が選んだ値をAIが勝手に変えないか？**
6. **一度作ったSceneを再利用できるか？**
7. **Motionの意味と実装技術を分離できているか？**
8. **DaVinciそのものを再実装していないか？**
9. **Scene単体だけでなく前後Contextを必要時に見られるか？**
10. **使うほどEvidenceが増えるが、Evidenceを絶対ルール化していないか？**

## Final product direction

> **モーション図鑑はMotion一覧ではなく、「やりたいこと → Preview → Motion → Scene Recipe → Scene Composer → SceneInstance → Structured Timeline → Palmier Rough → DaVinci Final」までをつなぐ、動画演出の知識と制作の橋渡しである。**

> **AIの主役は新規演出の大量生成ではなく、既存演出の探索・整理・比較・提案・構造化・handoffである。**

> **人間は専門用語を覚えてから選ぶ必要はない。見て選び、必要になった時だけ仕組みを学べる。**
