# AI画像・AI動画プロンプトパック

Created: 2026-08-07

## 目的

結婚式オープニングムービー用に、画像生成 → 動画化 → Palmierラフ編集 → CapCut仕上げまで迷わず進めるためのプロンプト正本。

## 共通ルール

- 人物、犬、家族、友人はAI生成しない。
- AIで作るのは背景、つなぎ、世界観補強だけ。
- 文字、数字、ロゴ、看板、ウォーターマークは出さない。
- 名前、日付、会場名、カウントダウン数字はmotion-studioまたはCapCutで後乗せする。
- 静止画で構図確認してから、採用候補だけ動画化する。

共通negative:

```text
no people, no animals, no text, no letters, no numbers, no logo, no watermark, no signage, no brand marks
```

日本語メモ:

```text
人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし
```

## 画像生成プロンプト 12枚

### 01. 空港の光

用途: 冒頭0〜6秒、出発前の空気。

```text
上品な空港ラウンジのような空間。早朝の柔らかい光が大きな窓から差し込み、床に淡く反射している。人はいない。文字、看板、ロゴはない。結婚式オープニングの始まりにふさわしい高級感。ネイビー、ゴールド、白を基調。映画的、清潔感、静かな期待感。後からテロップを置ける余白。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a cinematic 5-second slow push-in. Subtle motion only. Elegant wedding opening movie style. No people, no animals, no text, no logo, no signage. Keep clean space for captions.
```

### 02. 搭乗ゲート前の抽象背景

用途: タイトル背景、搭乗券演出の裏。

```text
搭乗ゲートを連想させる上品な空間。実在の空港ではなく、抽象的で洗練されたデザイン。奥行きのある廊下、柔らかい照明、中央に文字を置ける余白。人なし、ロゴなし、看板なし、文字なし。結婚式ムービー用。ネイビー、ゴールド、白。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a 5-second slow cinematic camera drift forward. Keep the scene abstract and elegant. No text, no logo, no people, no signage.
```

### 03. 飛行機の窓と雲

用途: 旅の始まり、Scene 04。

```text
飛行機の窓から見える明るい雲海。窓枠は上品で清潔感があり、外には柔らかな朝の光。旅の始まりを感じる。人物なし、文字なし、ロゴなし。結婚式オープニング用のシネマティック背景。中央や右側にテロップを置ける余白。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a 5-second gentle camera move from inside the airplane window toward the clouds. Subtle cloud motion, soft morning light, elegant wedding film tone. No people, no text, no logos.
```

### 04. 横浜の海辺の夜景

用途: 横浜から始まり、横浜に戻る演出。

```text
横浜を連想させる上品な海辺の夜景。実在の建物を正確に描きすぎず、都市の光と海の反射で横浜らしさを表現する。高級感、落ち着き、結婚式前夜のような期待感。人物なし、文字なし、ロゴなし。ネイビーとゴールドの光。後からテロップを置ける余白。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a 5-second slow cinematic pan over the waterfront night lights. Subtle water reflection motion. Elegant, calm, romantic. No people, no text, no logo, no signage.
```

### 05. 紙の旅行地図

用途: motion-studio航路演出の背景。

```text
上質な紙に描かれた旅行地図の背景。横浜からハワイへ向かう旅を連想させるが、文字や地名は描かない。中央に航路線や飛行機アイコンを後から重ねられる余白。温かい紙質、上品、結婚式ムービー向け。人物なし、文字なし、ロゴなし。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Do not animate with AI unless needed. Prefer motion-studio route animation over this image. If animated, use only a subtle paper texture drift and keep the map clean with no generated text.
```

### 06. ハワイ夕暮れビーチ

用途: ハワイ思い出、Scene 06。

```text
夕暮れのハワイを感じる穏やかなビーチ。柔らかい金色の光、静かな波、遠くの空に淡い雲。観光写真ではなく映画のワンシーンのような上品な雰囲気。人物なし、文字なし、ロゴなし。結婚式の思い出映像に合う。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a 5-second elegant beach shot with gentle wave motion and soft sunset light. Slow smooth camera movement. No people, no text, no logos, no signage.
```

### 07. 雨上がりのビーチ

用途: ハワイ回想、少し感情を出す素材。

```text
雨上がりのビーチ。濡れた砂浜に柔らかい空の光が反射している。雲は少し残っているが、明るさと希望を感じる。ロマンチックで自然。人物なし、文字なし、ロゴなし。結婚式ムービーのハワイ回想用。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a 5-second subtle cinematic shot with gentle water reflection and slow camera drift. Romantic but not dramatic. No people, no animals, no text, no logo.
```

### 08. タンタラスの丘風の夜景

用途: プロポーズ/特別な瞬間の余韻。

```text
高台から見下ろす美しい夜景。ハワイのタンタラスの丘を連想させるが、実在の場所を正確に再現しすぎない。街の光が宝石のように広がり、空は深いネイビー。ロマンチック、静か、特別な瞬間の余韻。人物なし、文字なし、ロゴなし。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a 5-second slow cinematic night-view shot, gentle atmospheric motion, tiny city light shimmer, elegant romantic tone. No people, no text, no logos.
```

### 09. チャペル扉の光

用途: 入場直前、Scene 09。

```text
上品な結婚式場のチャペルの大きな扉。扉の向こうから柔らかく明るい光が差し込んでいる。まもなく新郎新婦が登場する期待感。高級感、清潔感、ロマンチック。白い花や装飾は控えめ。人物なし、文字なし、ロゴなし。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a 5-second slow push toward the chapel doors. The light should gently bloom from behind the doors. No people appear. No text, no logo, no signage.
```

### 10. カウントダウン用の光背景

用途: 5,4,3,2,1 の後ろ。

```text
暗めで上品な背景に、柔らかい光の粒とレンズフレア。中央に大きな数字を後から重ねやすい余白。結婚式オープニングのカウントダウン用。高級感、ワクワク感、派手すぎない。人物なし、文字なし、ロゴなし。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Prefer motion-studio or CapCut for numbers. If animated, create a 5-second subtle glowing particle background with no generated numbers or text. Keep center clean for countdown overlay.
```

### 11. 搭乗券風背景

用途: motion-studio搭乗券素材の背景。

```text
高級感のある搭乗券を連想させるグラフィック背景。紙の質感、ネイビーとゴールドのアクセント、白い余白。後から名前、日付、会場名を重ねる前提。実在航空会社のロゴなし、文字なし、QRコードなし。結婚式オープニング用。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし、QRコードなし。
```

動画化メモ:

```text
Do not ask AI to generate readable ticket text. Use this as a static design background or rebuild in motion-studio. Text must be added in Remotion or CapCut.
```

### 12. エンディング直前タイトル背景

用途: THE JOURNEY BEGINS。

```text
結婚式オープニングの最後に使う上品なシネマティック背景。暗めのネイビー空間に柔らかな金色の光が広がり、中央にタイトルを置ける余白。旅の始まり、入場前の高揚感、感動。人物なし、文字なし、ロゴなし。16:9。

Negative: 人物なし、動物なし、文字なし、数字なし、ロゴなし、透かしなし、看板なし、ブランド表記なし。
```

動画化メモ:

```text
Use the provided image as the first frame. Create a 5-second subtle cinematic light movement, elegant navy and gold atmosphere, clean center area for title overlay. No people, no text, no logo.
```

## Seedance / Kling 共通動画化テンプレート

```text
Use the provided image as the first frame.
Create a cinematic 5-second slow camera movement.
Subtle motion only.
Elegant wedding opening movie style.
Keep the original composition stable.
Keep clean space for captions.
No people, no animals, no text, no letters, no numbers, no logo, no watermark, no signage.
```

日本語管理版:

```text
添付画像を開始フレームとして使う。
5秒のシネマティックな動画にする。
動きは控えめで、ゆっくりしたカメラ移動のみ。
結婚式オープニングらしい上品な雰囲気。
元の構図を崩さない。
後からテロップを重ねられる余白を保つ。
人物、動物、文字、数字、ロゴ、透かし、看板は出さない。
```

## 動画化優先順位

| 優先 | ID | 理由 |
|---:|---|---|
| 1 | `img-airplane-window-clouds` | 雲と窓で動きが自然。旅の始まりに強い。 |
| 2 | `img-hawaii-sunset` | 波と夕陽で映像映えしやすい。 |
| 3 | `img-chapel-door-light` | 入場直前のピークに使える。 |
| 4 | `img-yokohama-night` | 冒頭と帰着の両方に使える。 |
| 5 | `img-countdown-light` | カウントダウン背景として使い回せる。 |
| 6 | `img-after-rain-beach` | 感情の緩急に使える。 |

## 採用QA

採用前に必ず確認する。

- [ ] 人物がいない
- [ ] 動物がいない
- [ ] 文字・数字がない
- [ ] ロゴ・透かしがない
- [ ] 看板・ブランド表記がない
- [ ] テロップ余白がある
- [ ] 3〜5秒で使える
- [ ] ループまたは前後カットに繋ぎやすい
- [ ] AIっぽい歪みが主役になっていない
- [ ] 結婚式の上品さを壊していない

## 3回失敗した時のルール

同じ素材で3回失敗した場合は、プロンプトを長くする前に以下を見直す。

1. 静止画の構図
2. 参照画像の質
3. 動画化モデル
4. カメラ移動の有無
5. 動かす必要が本当にあるか

特に搭乗券、地図、カウントダウン数字はAI動画で粘らず、motion-studio / CapCutへ戻す。
