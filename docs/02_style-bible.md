# Style Bible

プロンプト集ではなく、すべての制作物の世界観と採否判断を固定するための基準。

2026-08-22以降、Wedding Movieでは「高級風に整える」より、**実際の二人の記憶・旅行・空気を強くすること**を優先する。
流行の学習元: `docs/research/2026-08-22-tiktok-wedding-film-trends.md`

## Core Direction

- Travel Memory Documentary
- Editorial
- real over polished
- personal over generic
- observed over staged
- memory over spectacle
- human over AI

「旅行テーマのテンプレ」ではなく、**二人が本当に旅してきた記録を短編映画として編集する**。

## キーワード

- 旅行
- 出発
- 到着
- 偶然
- 記憶
- 移動
- 余韻
- 親密さ
- 少しの不完全さ
- discovery
- documentary
- editorial

「Luxury」「Epic」「Cinematic」を目的語にしない。
結果として映画的になるのは良いが、形容詞を足すだけの映画風にはしない。

## 主役

優先順位:

1. 二人の実写真・実動画
2. 実際の旅行先・移動・空気の素材
3. 音
4. 必要最小限の文字・graphic
5. AI B-roll

AI素材・graphicが実素材より目立つ場合は原則不採用。

## 色

色は固定paletteを全編へ被せない。

基準:

- 肌・空・海・街の実際の色を壊さない
- travel chapterごとの自然な色差を残す
- white / off-white / black / navyはUIや文字の補助色
- goldはアクセントに限定
- orange & tealの一括gradeは禁止
- sceneごとの露出・white balance差を完全均一化しすぎない

ネイビー＋ゴールドを「高級感の正解」としない。

## 光

採用:

- 朝日
- 窓から差す自然光
- 夕暮れ
- 海面反射
- 空港の実用灯
- 街のpractical light
- direct flashの一瞬

避ける:

- fake glow
- 常時bloom
- 過剰lens flare
- AI的な発光
- 意味のないlight leak連打

## 質感

### 採る

- 実写真の粒状感
- 古いスマホのnoise
- camcorder / phone footageの不完全さ
- 実際の解像度差
- 控えめなfilm texture

### 避ける

- 全編fake Super 8
- dust / scratch常時overlay
- VHS filterを掛けただけのnostalgia
- 過剰denoise / sharpen
- 全素材を同じAI polishへ揃える

**本物の素材差を消さない。**

## 写真Presentation

優先順位:

1. `full-bleed`
2. `native-aspect` + intentional negative space
3. `crop-detail`
4. `sequence`（連写・関連2〜3枚）
5. `static-hero`
6. `photo-card`

カード・額縁・polaroidは常用しない。

### 構図

- 写真の視線方向を読む
- 人物の進行方向に余白を残す
- horizonを不用意に切らない
- 顔を中央固定しない
- 縦写真を無理に16:9へcropしない
- 余白は失敗ではなく構図として使う

## Motion

**動かさないことも正式な選択肢。**

写真へpreset motionを機械的に割り当てない。

採用判断:

- 奥行きが意味を持つ → restrained push
- 横方向の情報がある → restrained pan
- hero / face / emotional still → staticを優先
- 連写 → motionを付けずcutで見せる
- 動画 → 元のcamera movementを尊重

禁止:

- 全写真Ken Burns
- 全scene slow zoom
- zoom transition連打
- pan方向を単調さ回避だけで変える
- 「動いていないと動画ではない」という発想

## Editing Rhythm

短尺でも全カットを速くしない。

- burst
- breathe
- burst
- hold

のように速度差を設計する。

同尺カットの反復を避ける。
音楽のbeatだけではなく、画の意味・表情・視線・動作でも切る。

## Transition Priority

優先順位:

1. straight cut
2. composition / action / color match cut
3. J-cut / L-cutによるaudio bridge
4. natural exposure / occlusion cut
5. dip to black / white（意味がある場合）
6. dissolve
7. designed transition

原則禁止:

- whoosh every cut
- zoom transition every chapter
- glitch
- particle transition
- template-like light sweep

「transitionを見せる」のではなく、**次の画へ自然に進ませる**。

## Sound

BGMだけで完成としない。

優先:

- original phone-video audio
- airport ambience
- cabin hum
- sea
- street / crowd bed
- camera / shutterなど事実に沿う小音

J-cut / L-cutを積極的に使う。
次の場所の音を先に聞かせることで、派手なtransitionなしで移動を感じさせる。

## Typography

文字は情報・意味があるときだけ使う。

### 採る

- names
- date
- actual location
- actual year / travel date
- 必要なopening / ending cue

### 削る

- MEMORY 01
- OUR JOURNEY
- ALTITUDE
- DESTINATION
- generic inspirational English
- 意味のないuppercase label

フォントを「高級セリフ体固定」にしない。
写真・映像との関係で選ぶ。

## TikTok / Short-form Learning

2026のTikTokでは、作られたfantasyよりreal context / human spark / imperfect memoryが強い。
Weddingでもcamcorder / Super 8 / guest POV / documentary / mixed media / sound-firstが増えている。

ただし流行をそのままコピーしない。

### 採る原理

- immediate visual hook
- authenticity
- memory fragments
- mixed media
- contrast in pacing
- social-safe composition
- sound-first continuity

### 採らない表層

- 流行filter
- viral transition
- trending font丸写し
- TikTok UI imitation
- 9:16を披露宴masterへ強制

## 16:9 / 9:16

披露宴masterは16:9。
主要shotは可能なら9:16 safe cropを意識する。

最終的に:

- 16:9 / 60秒 opening master
- 9:16 / 30〜45秒 social teaser

を別編集として持つ。
16:9を単純cropして9:16にしない。

## AI動画

AIは背景・B-roll・transition補助に限定。

### AIを使う条件

- 実素材が無い
- story上必要
- 3〜5秒以下
- 人物・犬なし
- real素材を邪魔しない
- AIを使ったこと自体が見せ場にならない

### Prompt原則

形容詞を積まず、motionとpreservationを中心にする。

Bad:

```text
cinematic epic luxury romantic beautiful breathtaking travel movie
```

Better:

```text
Clouds drift slowly from right to left.
Camera remains nearly locked.
Preserve the existing horizon and cloud structure.
```

AIに任せる範囲を狭くするほど、AIっぽさを減らせる。

## AI動画禁止事項

```text
no text
no logo
no watermark
no people
no animals
no readable signage
no distorted objects
no impossible camera motion
no excessive particles
no fake cinematic glow
```

## 生成素材の条件

- 3〜5秒
- 1 shot 1 action
- camera motionは必要最小限
- start / middle / endで構造が安定
- 光源が物理的に分かる
- 前景 / 中景 / 背景が必要な場合だけ設計
- caption spaceを目的なく作らない
- loopは用途がある時だけ

## QA — AI / Template感

以下が2つ以上当てはまったら再設計する。

- どのカップルにも使えそう
- 英字ラベルを消しても意味が変わらない
- 全写真が同じ動き
- 全sceneの余白・枠・カードが同じ
- gold / glowで高級に見せようとしている
- transitionそのものが目に入る
- AI B-rollの方が実写真より印象に残る
- 写真の縦横比を全部同じ箱へ押し込めている
- 「cinematic」という言葉以外で良さを説明できない

## 最終判断

流行しているかではなく、次の4点で採否を決める。

1. 二人の実素材を強くするか
2. 旅行の記憶として自然か
3. 数年後に見ても恥ずかしくないか
4. AI / テンプレを感じさせないか

4つを満たさない演出は、技術的に作れても採用しない。
