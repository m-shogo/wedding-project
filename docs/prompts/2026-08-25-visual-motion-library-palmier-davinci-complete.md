# wedding-project 引き継ぎ — Visual Motion Library / Palmier × DaVinci / Opening・Profile共通制作基盤 完全版

> Status: ACTIVE / MUTABLE
> Created: 2026-08-25
> Scope: Movie only. Do not mix with Rurubu / Passport / Paper Item work.
> Update policy: This prompt is a versioned working authority, not an immutable specification. When the user changes the requirements, update this file in a small dedicated change and record the reason.

@GitHub

repo:
m-shogo/wedding-project

あなたは m-shogo/wedding-project の

Wedding Visual Motion Library / Palmier Integration / DaVinci Resolve Integration / Opening Movie / Profile Movie

担当AIです。

---

## 0. 最終目的

2026年10月24日の結婚式で上映する

1. オープニングムービー
2. プロフィールムービー

を高品質に完成させる。

今回作るものは動画編集ソフトではない。

ゴールは、

「こういう動きにしたいけど名前が分からない」
        ↓
実際に動く動画を見て探す
        ↓
「これ！」を選ぶ
        ↓
正式名称・意味も分かる
        ↓
必要な写真 / 動画 / 文字を入れる
        ↓
Claude / Palmier向け指示を生成
        ↓
PalmierでRough Edit
        ↓
DaVinci Resolveへ移行
        ↓
DaVinci標準機能 / Fusion / 既存TemplateでFinal

という制作環境を作ること。

---

## 1. 最重要原則

このプロジェクトは、

文章の演出辞典ではなく「動く演出図鑑」を作る。

説明文だけで、

Mask Revealとは〜

と説明して完成扱いしない。

ユーザーは専門用語を知らなくても、

文字が下からシュッと出るやつ

文字がバンッと来るやつ

一文字ずつ出てくるやつ

写真を1枚ドンと見せるやつ

パンパンパンと3回動くやつ

といった自然な日本語から、

実際のMotion Previewを見て選べる

ことを最優先する。

---

## 2. 主役となるツール

### Palmier

AIによるRough Edit。

主用途：

* 写真・動画選択
* trim
* split
* order
* rough timing
* rough typography placement
* variant作成
* Claude等による編集
* DaVinciへのtimeline handoff

### DaVinci Resolve

Final Edit。

主用途：

* Edit
* Text / Text+
* Fusion
* Fusion Titles
* Fusion Effects
* Fusion Transitions
* Color
* Fairlight
* Deliver

---

## 3. Remotionの位置付け

Remotionを中核にしない。

既存実装は監査して、

* Preview生成に便利
* 比較生成に便利
* DaVinciに存在しないOverlayを作れる

場合のみ補助として残す。

ユーザーがRemotionを理解する必要はない。

ユーザーから見える主役は、

Visual Motion Library
+
Palmier
+
DaVinci

とする。

---

## 4. 車輪の再発明を禁止する

必ず、

Reuse Before Build

を行う。

何か作る前に、

1. DaVinci Resolve標準
2. Fusion標準
3. Blackmagic公式Template
4. .drfx
5. .setting
6. Reactor
7. ライセンス確認済み無料Resolve asset
8. ユーザー購入済みasset
9. repo既存実装
10. 既存の一般的技法

を探す。

全部なければ初めてCustom implementationを検討する。

---

## 5. 新規演出を勝手に作らない

新しいMotion Patternを追加する前に、

searchedExistingPatterns
searchedDaVinciBuiltins
searchedExternalSources
whyExistingOptionsFail
whyNewPatternIsNeeded

を記録する。

単に、

似たようなのを作りました

は禁止。

---

## 6. 既存Git資産について

現在repoには少なくとも、

* Profile Movie Coach
* 逆引きDaVinci辞典
* 基礎アニメーション図鑑（36）
* 演出レシピ図鑑（97）
* StaRt全体見本
* StaRt Selection
* StaRt制作ワークスペース
* Movie Review
* Before / After
* Reference Breakdown
* Palmier Handoff
* 素材ライブラリ
* 写真計画
* プロンプト管理

等がある。

ただし、

「作ってあるから残す」は禁止。

監査して、

KEEP
MERGE
SPLIT
RENAME
DEPRECATE
REFERENCE_ONLY

へ分類する。

36 / 97という数字を維持すること自体を目的にしない。

---

## 7. 辞典は4層へ分離

混ぜると破綻するため、以下を分ける。

### Layer A — Vocabulary

技術用語。

例：

* Anchor Point
* Tween
* Easing
* Mask
* Matte
* Alpha Channel
* Typography
* Tracking
* Kerning
* Motion Blur
* 2.5D
* Z-Depth

目的：

名前を知らないため検索できない問題を解決する。

School of Motion Motion Design Dictionary等の既存知識を参考にする。

### Layer B — Motion Pattern

一つの基本的な「動き」。

例：

* Mask Reveal
* Character Stagger
* Word Stagger
* Scale Punch
* Tracking Burst
* Subtle Push In
* Slow Pan
* Hero Still
* Split Panel
* Match Cut
* Triple Hit

これがVisual Motion Libraryの中心。

### Layer C — Recipe

複数Patternを組み合わせた編集演出。

例：

Wedding Chorus Hero
Hero Still
+
Subtle Scale Punch
+
Mask Reveal
+
Short Typography

### Layer D — Implementation

Palmier / DaVinciでどう実現するか。

例：

Pattern:
Mask Reveal
Palmier:
rough placement only
DaVinci:
Text+ + Mask
Alternative:
installed DRFX

---

## 8. 「見た目が正本」

Motion Patternでは、

文章よりPreview動画を優先する。

ユーザーはまずPreviewを見る。

その後、

* 日本語名
* 正式名称
* 説明
* DaVinci技法

を見る。

---

## 9. 全Motion Patternに動画Previewを持たせる

原則として、

動画PreviewがないMotion Patternはproduction-ready扱いしない。

Preview推奨：

3〜8秒
720p程度
30fps
muted
loop
MP4 / WebM
poster image

GIFを主形式にしない。

---

## 10. Previewには種類を持たせる

Previewを全部同列に扱わない。

最低限：

ACTUAL_DAVINCI_RENDER
ACTUAL_PALMIER_RENDER
REPO_GENERATED
OFFICIAL_EXTERNAL_REFERENCE
CONCEPT_ONLY
MISSING

を区別する。

---

## 11. Concept Previewを本物として見せない

非常に重要。

例えば、

DaVinci TemplateのPreviewがまだ取得できていない状態で、

Remotion等で似たMotionを作って、

DaVinciではこう動きます

と表示することは禁止。

Conceptの場合は必ず、

「Concept Preview / 実装確認前」

と表示する。

---

## 12. DaVinci実装が存在する場合

可能な限り、

DaVinciで実際にrenderしたPreviewを正本

とする。

流れ：

DaVinci implementation
↓
共通sample素材を入れる
↓
3〜8秒render
↓
Preview登録
↓
implementationVerified

---

## 13. Palmier実装が存在する場合

Palmierで実際に再現できるPatternの場合、

Palmier sample timeline
↓
render
↓
Preview登録

とする。

---

## 14. 外部Templateの場合

Marketplace等からPreview動画を無断コピーしない。

登録するのは、

* provider
* product
* URL
* license
* version
* Resolve compatibility
* official preview URL

まで。

導入後に、

自分たちの共通sample素材を使ってPreviewをrender

する。

---

## 15. Preview比較用の共通Sample Asset Set

Motionごとに違う写真を使うと比較できない。

カテゴリごとに共通素材を用意する。

### Typography Sample

例：

WELCOME
SHOGO & SHIORI
OUR JOURNEY

### Hero Photo Sample

横構図写真1枚。

条件：

* 主役が明確
* 文字余白あり
* 16:9に耐えられる

### Multi Photo Sample

4〜6枚。

### Profile Sample

例：

CHILDHOOD
SCHOOL DAYS
FRIENDS
OUR STORY

年齢の違うsample写真。

---

## 16. 同じPatternは同じSampleで比較

例えば、

Mask Reveal
Character Stagger
Tracking Burst
Scale Punch

は同じ文字、

WELCOME

を使用。

演出差だけを理解できるようにする。

---

## 17. Before / After

可能なPatternでは、

Before

演出なし。

After

演出あり。

を表示する。

特に初心者には非常に有効。

---

## 18. Preview再生UI

最低限：

* Play / Pause
* Replay
* Loop
* 1x
* 0.5x

可能なら：

* scrub
* frame step

を追加。

---

## 19. Slow Preview

0.5xは単なるおまけではなく、

DaVinci Learning機能

として扱う。

通常速度では分からない、

* acceleration
* deceleration
* overshoot
* settle
* mask timing

を理解するために使う。

---

## 20. Motion Card

カード上に最低限：

▶ Preview
日本語名
一般名称
短い自然文説明
Mood tags
Opening ◎
Profile ○
Palmier ○
DaVinci ◎
Source
Favorite

を表示。

---

## 21. 日本語名を最優先

例：

大きく：

1文字ずつ順番に出る

小さく：

Character Stagger

とする。

英語用語を覚えることをユーザーへ要求しない。

---

## 22. 自然言語Alias

Patternごとに、

文字 バン
文字 ドン
一文字ずつ
下からシュッ
奥からくる
写真 少しズーム
写真 ドン
写真 3枚
パンパンパン
映画っぽい
CMっぽい
旅行っぽい
感動
静か

等をaliasesとして持つ。

---

## 23. 逆引き検索

「名前」ではなく、

何をしたい？

から探せる。

例：

* 文字を目立たせたい
* 写真1枚を主役にしたい
* 写真をたくさん見せたい
* サビを盛り上げたい
* 場面転換したい
* 旅感を出したい
* 感動的にしたい
* 子供時代を見せたい
* 時系列を見せたい

---

## 24. Category

最低限：

TYPOGRAPHY
PHOTO
CAMERA
LAYOUT
TRANSITION
RHYTHM
GRAPHIC
EDITORIAL
TRAVEL
EMOTIONAL

必要に応じて整理。

カテゴリを増やしすぎない。

---

## 25. 各Patternには入力Schemaを持たせる

ユーザーがPatternを選んだ時に、

何を用意すれば使えるか

を自動表示する。

---

## 26. Text Slot

例：

TEXT 1
WELCOME
1〜12文字推奨
1行

定義候補：

required
minChars
maxChars
maxLines
recommendedLanguage
semanticRole

---

## 27. Media Slot

例：

IMAGE 1
Hero Photo
横写真推奨
人物1〜2人
文字余白あり

持つ：

mediaType
minCount
maxCount
orientation
aspectPreference
subjectCount
textSafeArea
cropTolerance
heroSuitability

---

## 28. 演出ごとに必要枚数を変える

例：

Hero Still
1枚
Split Panel
2〜4枚
Contact Sheet
4〜12枚
Before / After
2枚
Triple Hit
1枚
Photo Stack
3〜8枚

固定しない。

---

## 29. 動画Slot

Profile Movie等では動画も扱う。

例：

VIDEO 1
推奨：
2〜5秒
人物が見える
横動画

---

## 30. Timing Slot

必要に応じて、

beat
downbeat
phrase-start
chorus-head
lyric-start
manual-marker
none

を指定。

---

## 31. Intensity

ユーザー用には、

弱
中
強

でよい。

内部：

S
M
L

Patternごとに具体的な意味を持つ。

例：

Scale Punch：

S = 100 → 103
M = 100 → 106
L = 100 → 110

など。

固定値は実装確認して決める。

---

## 32. Pattern詳細画面

最低限、

Preview

日本語名

一般名

「こんな動き」

どう見える？

何に向く？

何に向かない？

必要素材

Opening適性

Profile適性

Palmier

DaVinci

Related Vocabulary

Reference

AI指示を作る

を持つ。

---

## 33. 「この演出を使う」

Pattern詳細から、

写真を選ぶ

動画を選ぶ

テキスト入力

使用Section

強さ

尺

を設定。

↓

AI指示を生成

する。

---

## 34. Prompt Generator

同じ選択内容から複数形式を生成。

### Output A — Human Brief

例：

1番サビ頭。
HawaiiのHero写真を1枚使用。
写真は最初に約2秒しっかり見せる。
サビ頭で小さくScale Punch。
「SHOGO & SHIORI」は短いMask Reveal。
写真を主役にする。
禁止：
強すぎるzoom
shake
glow
毎拍transition

---

## 35. Output B — Claude Creative Instruction

Claudeが勝手に別演出へ変えないよう、

選択済みPatternを明示する。

Use exactly these registered motion patterns:
- photo-hero-still
- camera-subtle-push
- type-mask-reveal
Do not replace them with another visual effect without explicitly explaining why.

---

## 36. Output C — Palmier Instruction

Palmierで出来る範囲だけを書く。

例：

Use hawaii_hero_03.jpg from 00:38.2.
Hold clearly for approximately 2 seconds.
Create a subtle push at the chorus hit.
Place title:
SHOGO & SHIORI
If exact Mask Reveal cannot be reproduced in Palmier,
leave timing/placement ready for DaVinci finishing.

---

## 37. Output D — DaVinci Finish Manifest

例：

00:38.240
Pattern:
type-mask-reveal
Text:
SHOGO & SHIORI
Duration:
0.8 sec
Implementation:
Fusion Text+
Preset:
MaskReveal01
Intensity:
S
Avoid:
bounce
glow

---

## 38. Output E — Machine JSON

構造化形式も生成する。

これをAI・将来のAutomationの正本とする。

---

## 39. Palmierで無理なものを無理に作らない

Patternごとに、

PALMIER_NATIVE
PALMIER_APPROX
PALMIER_TIMING_ONLY
DAVINCI_REQUIRED
UNVERIFIED

を持つ。

---

## 40. Palmier → DaVinciは2本立て

NLE XMLだけに依存しない。

必ず、

NLE XML
+
Motion Handoff Manifest

とする。

TimelineはXML。

Fusion等の演出意図はManifest。

---

## 41. DaVinci Implementation Registry

Patternごとに、

DAVINCI_BUILTIN
DAVINCI_EDIT
DAVINCI_TEXT_PLUS
DAVINCI_FUSION
DAVINCI_DRFX
DAVINCI_SETTING
REACTOR
EXTERNAL_TEMPLATE
MANUAL

を紐付ける。

---

## 42. Import可能Artifact

存在する場合は、

artifactType
artifactPath
installed
tested
resolveVersion

を持つ。

例：

artifactType: DRFX
installed: true
tested: true

---

## 43. Claude/CodexでDaVinci assetを作る場合

AIが .setting / .drfx 等を生成可能な場合でも、

生成しただけでproduction-readyにしない。

必ず、

generated
installed
opened-in-davinci
render-tested
visual-QA

まで確認。

---

## 44. PreviewとImplementationを結び付ける

重要。

Preview動画だけ存在して、

本番Implementationがない状態を防ぐ。

必ず：

Pattern
↓
Preview
↓
Implementation
↓
Verified Artifact / Method

へ繋げる。

---

## 45. Preview Provenance

Previewごとに、

sourceType
sourceId
generatedBy
generatedAt
implementationId
sampleAssetSetId
resolveVersion
verified

等を持つ。

---

## 46. Previewの鮮度

DaVinci VersionやTemplate更新で変わる可能性がある。

必要に応じて、

CURRENT
NEEDS_RECHECK
OUTDATED

を管理。

---

## 47. 外部Asset Registry

最低限：

provider
productName
url
license
price
installed
localPath
resolveCompatibility
version
previewUrl
notes

---

## 48. 購入済みAssetはGitへ入れない

Gitにはmetadataだけ。

原本はlocal-only。

---

## 49. Blackmagic公式資料

最優先source。

特に：

* Resolve Training
* Beginner Guide
* Fusion Training
* Resolve Manual

を利用。

公式PDFは学習authorityとして使う。

---

## 50. School of Motion等

Motion terminologyを理解するsourceとして利用。

ただし外部サイトの内容をそのままコピーした辞典にしない。

学んだ内容を、

Wedding Movie制作に必要な日本語説明

へ変換する。

---

## 51. 書籍

ユーザーが合法的に所有する書籍/PDF/電子資料は、

ローカルreferenceとして利用可能。

Gitへ原本を入れない。

Gitには、

* source
* topic
* page
* learned principle
* applied pattern

のみ記録。

---

## 52. Preview ReferenceとTraining Referenceを分ける

例えば、

Preview Reference

「こう見える」

Training Reference

「どう作る」

を別管理。

---

## 53. Opening Movie適性

Patternには、

INTRO
BUILD
VERSE
PRE_CHORUS
CHORUS
PEAK
RELEASE
ENDING

との相性を持たせる。

---

## 54. Profile Movie適性

最低限：

PROFILE_INTRO
GROOM_INTRO
GROOM_CHILDHOOD
GROOM_FRIENDS
BRIDE_INTRO
BRIDE_CHILDHOOD
BRIDE_FRIENDS
COUPLE_MEETING
COUPLE_STORY
TRAVEL
FAMILY
MESSAGE
ENDING

---

## 55. OP専用Patternを増やしすぎない

共通Patternは、

type-mask-reveal
photo-hero-still
camera-subtle-push

等。

StaRt側：

chorus-1
→ photo-hero-still

Profile側：

couple-story
→ photo-hero-still

としてMapping。

---

## 56. Profileでは写真を読む時間を優先

OPのルールをそのままProfileへ使わない。

Profileでは、

Photo readability
Emotion
Story
Text readability

が優先。

エフェクト密度を下げる。

---

## 57. Profileで特に必要なPattern

例：

* Gentle Push
* Gentle Pan
* Photo Stack
* Timeline
* Quiet Caption
* Editorial Split
* Contact Sheet
* Location Label
* Date Label
* Gentle Match Cut
* Soft Mask Reveal

を検討。

---

## 58. Openingで特に必要なPattern

例：

* Hero Still
* Scale Punch
* Mask Reveal
* Triple Hit
* Split Panel
* Route Transition
* Hard Cut
* Impact Frame

---

## 59. Motion Pattern数を競わない

100個作ることがゴールではない。

まず、

本当に使える20〜30個

を深く整える。

---

## 60. MVP候補

Typography

* Fade
* Mask Reveal
* Character Stagger
* Word Stagger
* Scale Punch
* Tracking Burst
* Slide In

Photo

* Hero Still
* Subtle Push
* Slow Pull
* Gentle Pan
* Split Panel
* Contact Sheet
* Photo Stack

Transition

* Hard Cut
* Directional Wipe
* Motion Blur Swipe
* Match Cut
* Route Transition

Rhythm

* Triple Hit
* Impact Frame

外部調査後に増減する。

---

## 61. 最初から全PatternのPreviewを作らない

まずVertical Slice。

候補：

1. Mask Reveal
2. Character Stagger
3. Hero Still
4. Subtle Push
5. Split Panel
6. Triple Hit

程度。

---

## 62. Vertical Sliceの完成条件

1つのPatternについて、

検索できる
↓
動画で見られる
↓
意味が分かる
↓
素材を入れられる
↓
Prompt生成
↓
Palmier Rough
↓
NLE XML
↓
DaVinci import
↓
DaVinciで本物の演出適用
↓
Preview MP4

まで通す。

---

## 63. Vertical Sliceが通るまで機能拡張しない

「一覧が100件になった」

より、

1件が本当に最後まで通った

ことを優先。

---

## 64. AIっぽさ防止

共通禁止候補：

every-beat-cut
every-shot-zoom
excessive-glow
excessive-shake
excessive-motion-blur
transition-chain
unnecessary-particles
constant-speed-ramping
template-look
effect-for-effect

---

## 65. 演出より写真を優先

優先順位：

Story
Photo
Emotion
Readability
Music
Typography
Motion
Effect

---

## 66. PreviewそのものもAIっぽくしない

Previewを派手に作りすぎて、

「本番では使えないがデモだけ派手」

になるのを避ける。

MVP Previewはニュートラルに作る。

---

## 67. Comparison Mode

重要。

同じ素材に対して、

Mask Reveal
VS
Character Stagger
VS
Tracking Burst

を並べて比較できるとよい。

---

## 68. A/B Comparison

ユーザーが、

Favorite
Maybe
Reject

できるようにする。

AIが勝手に採用しない。

---

## 69. Human DecisionとImplementationを分離

例：

implementationStatus:
VERIFIED
humanDecision:
REJECT

はあり得る。

---

## 70. Status設計

Implementation

DISCOVERED
AVAILABLE
INSTALLED
TESTED
PRODUCTION_READY

Preview

MISSING
REFERENCE_ONLY
CONCEPT
ACTUAL
VERIFIED

Human

NONE
FAVORITE
MAYBE
REJECT

Usage

NEVER
ROUGH
FINAL

---

## 71. 「自分の写真で試す」

最終的には有効。

ただし最初からリアルタイム動画合成エンジンを作らない。

MVP：

写真を選ぶ
↓
Prompt / Handoff生成

から開始。

---

## 72. 将来のTry With My Media

価値が確認できたら、

写真を選択
↓
テキスト入力
↓
簡易Preview

を追加。

DaVinci本番Previewと混同しない。

---

## 73. Dashboard UX

トップは内部architectureを見せすぎない。

例：

何をしたい？

* 🎞 動きを見て探す
* 🔍 言葉で探す
* ✨ やりたいことから探す
* 🤖 AIへの指示を作る
* 🎬 Openingで使う
* 📖 Profileで使う
* 🎛 DaVinci素材を見る

---

## 74. 「動きを見て探す」が最重要入口

ユーザーはまず、

動画を見る。

言葉は後。

---

## 75. Promptだけのライブラリにしない

今回のゴールは、

Prompt Libraryではない。

正しくは、

Visual Motion Library
        ↓
Prompt Generator
        ↓
Production Handoff

---

## 76. DaVinci Tutorialだけのアプリにしない

DaVinciを勉強するための辞典ではなく、

Wedding Movieを作る過程でDaVinciが分かる

仕組みにする。

---

## 77. Just-in-time Learning

Patternを使った時だけ、

この演出で学べること：
Mask
Keyframe
Ease
Text+

を表示。

---

## 78. 用語へのリンク

Pattern：

Mask Reveal

↓

Vocabulary：

* Mask
* Keyframe
* Easing

と繋げる。

---

## 79. Recipeへのリンク

Pattern：

Mask Reveal

↓

Recipe：

* Wedding Intro Title
* Profile Chapter Intro
* Travel Location Reveal

など。

---

## 80. Projectへのリンク

Recipe：

Wedding Chorus Hero

↓

StaRt：

chorus-1

等。

---

## 81. 正しい階層

最終的に、

Vocabulary
     ↓
Motion Pattern
     ↓
Recipe
     ↓
Project Mapping
     ↓
Palmier / DaVinci Implementation

とする。

---

## 82. 既存36 / 97について

例えば現在の97 Recipeが、

本当にRecipeなら残せる。

単純MotionなのにRecipeへ入っているならPatternへ分離。

同じ動きが複数あればMerge。

---

## 83. 既存Previewについて

既存Remotion Previewがある場合、

捨てずに、

REPO_GENERATED

として登録可能。

ただしDaVinci Previewと混同しない。

---

## 84. Source of Truth

概念的には、

Vocabulary Registry
Motion Pattern Registry
Recipe Registry
Implementation Registry
Reference Registry
Project Mapping

へ分ける。

---

## 85. Git管理しないもの

* copyrighted music
* full lyrics
* real photo originals
* purchased PDF
* DRM content
* paid templates
* downloaded marketplace preview
* licensed third-party binary assets

---

## 86. Local Asset Registry

Git外のassetも、

metadataだけ追跡できるようにする。

---

## 87. StaRt音源

正規ローカル音源が入ったら、

waveform / marker / section timingを正確に決定。

Web推測timingをFinalに使わない。

---

## 88. 歌詞

Git：

LYRIC_001
LYRIC_002

local：

実歌詞。

歌詞全文をGitへ入れない。

---

## 89. Promptに歌詞全文を残さない

Persistent dataでは必要なphrase ID / semantic roleだけ残す。

---

## 90. Git運用

毎回：

latest main
↓
clean branch
↓
small scope
↓
tests
↓
Visual QA
↓
PR
↓
squash merge
↓
latest main

---

## 91. Paper Itemと混ぜない

Movie変更を、

* Rurubu
* Passport
* Paper Item

へ混ぜない。

---

## 92. 最初に行うCurrent Audit

次チャット開始後、

1. 最新main
2. open PR
3. Profile Movie Coach
4. DaVinci辞典
5. Motion Kit 36
6. Director Recipes 97
7. StaRt Showcase
8. Palmier Handoff
9. Movie Review
10. Assets / Prompt
11. Remotion dependency

を確認する。

---

## 93. External Research

最新Webで、

Blackmagic公式

* Resolve最新版
* built-in titles
* Fusion Titles
* Fusion Effects
* Fusion Transitions
* Text+
* Custom Templates
* .setting
* .drfx
* scripting
* XML import/export
* Training / PDF

Palmier

* current MCP
* timeline operations
* supported assets
* export
* NLE XML
* DaVinci handoff

Reactor

Resolve Template ecosystems

School of Motion terminology

を調査。

---

## 94. Research Evidence

外部調査は、

単なるリンク集にしない。

記録：

Source
Observed Capability
Wedding Use
Reusable?
License
Version
Confidence

---

## 95. Architecture決定

このPrompt自体を絶対仕様にしない。

Current AuditとResearchから、

必要最小限のarchitecture

へ確定する。

---

## 96. 最初のVertical Slice

おすすめ：

Mask Reveal

理由：

* 日本語で直感的
* Typography
* Opening / Profile両方使える
* PalmierとDaVinciの役割差を確認できる
* DaVinci Fusion/Text+学習につながる

---

## 97. Mask Reveal Vertical Slice

実際に、

Motion Card
↓
Preview
↓
日本語説明
↓
WELCOME入力
↓
写真1枚選択
↓
Opening Intro選択
↓
Palmier Prompt
↓
Claude Brief
↓
DaVinci Manifest
↓
Palmier Rough
↓
XML
↓
DaVinci
↓
Actual DaVinci Preview

を通す。

---

## 98. 次にHero Still

写真主体のWorkflowを検証。

---

## 99. 次にProfile向けPattern

Gentle Push等で、

OP専用architectureではない

ことを確認。

---

## 100. MVP成功条件

MVPは、

「UIが出来た」

では完成ではない。

最低限：

* 実際に動く
* 日本語で分かる
* 名前を知らなくても探せる
* 必要素材が分かる
* 入力できる
* Prompt生成
* Palmier handoff
* DaVinci handoff
* Actual Preview
* Openingで使用可能
* Profileでも再利用可能

を満たす。

---

## 101. 最終UX

理想：

「サビで写真1枚を
ドンと見せたい」

と入力。

↓

候補動画：

Hero Still
Scale Punch
Impact Frame

↓

動画を比較。

↓

Hero Stillを選ぶ。

↓

写真アップ。

↓

SHOGO & SHIORI入力。

↓

強さ「中」。

↓

「AI指示を作る」。

↓

PalmierでRough。

↓

DaVinciへ。

↓

Dictionaryが、

この部分はDaVinciで
Hero Still + Subtle Punch
を適用してください

と案内。

↓

Final。

---

## 102. このプロジェクトの価値

ユーザーに専門語を覚えさせることではない。

専門語を知らなくても、

見て選べる。

選んだ後に、

名前が分かる。

さらに、

どう作るかまで分かる。

状態を作る。

---

## 103. 最終原則

動画で見せる。

言葉だけで説明しない。

Previewと本番Implementationを一致させる。

ConceptをActualとして見せない。

DaVinciで出来ることはDaVinciへ任せる。

PalmierはRough。

DaVinciはFinal。

Remotionは必要な場合だけ。

外部資産をまず探す。

AIに演出を勝手に発明させない。

Promptだけ作って満足しない。

数より質。

Openingだけに最適化しない。

Profileでも使う。

演出より写真。

基盤よりWedding Movie完成。

---

## 104. 作業姿勢

確認・提案だけで止まらない。

安全に可能な範囲で、

Audit
↓
Research
↓
Architecture
↓
Vertical Slice
↓
Actual Preview
↓
Palmier
↓
DaVinci
↓
Visual QA
↓
Opening実戦
↓
Profile実戦

まで進める。

ただし、

大規模基盤を先に完成させようとしない。

1つ本当に使える演出を完成させる。

それを横展開する。

---

## 105. 最終成功条件

このプロジェクトが成功したかは、

Motion Pattern数でも、

コード量でも、

ページ数でも判断しない。

成功条件は、

2026年10月24日のOpening MovieとProfile Movieが高品質に完成し、ユーザー自身が「この動きにしたい」を動画から選んでAIとDaVinciへ正確に伝えられるようになっていること。
