# オープニングムービー 構成案1

> **初期構想メモ（初版のまま保存）。** コンセプトは採用済みで、現在の展開先は
> `02_opening-movie/`（秒割り・素材管理）と `motion-studio/`（Remotion素材）。
> 素材の採否はこのファイルではなく `02_opening-movie/asset-status.md` が正。
> 特に `op_01` / `op_11` は人物入りが判明し不採用（人物なしで再生成対象）。

## MEMORY FLIGHT 1024

**コンセプト:** 旅行をテーマに、ふたりの思い出を巡るフライト。成田空港から出発し、沖縄・韓国・ハワイを“着陸しない思い出の経由地”として巡り、最後だけ横浜の挙式へ着陸する。

**ルート:**

```text
成田空港 → 沖縄 → 韓国 → ハワイ → 横浜の挙式
```

**便名案:**

```text
MEMORY FLIGHT 1024
Flight: SS1024
Departure: Narita Airport
Destination: Yokohama Wedding Ceremony
```

10月24日挙式のため、便名は `1024`。`SS` は Shogo / Shiori の頭文字。

---

## 企画の狙い

オープニングムービーはプロフィール紹介ではなく、披露宴・挙式入場前の期待感を作る映像にする。

ゲストを「搭乗者」として巻き込み、旅行コンセプトを映像全体のUIにする。

重要なルール:

- 出発地は成田空港に固定する
- 沖縄・韓国・ハワイでは着陸しない
- 各地は機窓・フライトマップ・パスポートスタンプ・写真フラッシュバックで表現する
- 最後だけ横浜の挙式へ着陸する
- 文字・便名・カウントダウン・地名はCapCutで後乗せする
- 生成AI画像・動画には文字を入れない
- 人物の顔は生成AIで作らない
- 最終的に実写真へ差し替える前提で、まずAI仮素材で完成形を作る

---

## 感情の流れ

| 経由地 | 役割 | 温度感 |
|---|---|---|
| 成田空港 | 旅の始まり、搭乗、離陸前のワクワク | 上品・高揚感 |
| 沖縄 | 旅の始まり、海、爽やかさ | 明るい・開放感 |
| 韓国 | 食べる、歩く、笑う、日常の楽しさ | ポップ・楽しい |
| ハワイ | プロポーズ、特別な思い出 | 感動・ロマンチック |
| 横浜の挙式 | 今日の到着地 | 高揚感・カウントダウン |

---

## 100秒版タイムライン

| 秒数 | 内容 | 素材 |
|---:|---|---|
| 0-4 | 成田空港ロビー | AI動画 |
| 4-8 | 成田空港 搭乗ゲート | AI動画 |
| 8-12 | 搭乗券 | AI画像 or AI動画 |
| 12-17 | 成田空港 滑走路・離陸前 | AI動画 |
| 17-22 | 飛行機の窓と雲 | AI動画 |
| 22-26 | フライトマップ 沖縄へ | AI動画 + CapCut線 |
| 26-35 | 沖縄 | AI動画 + 実写真 |
| 35-39 | フライトマップ 韓国へ | AI動画再利用 |
| 39-50 | 韓国 | AI動画 + 実写真 |
| 50-54 | 雲の上の移動 | AI動画 |
| 54-70 | ハワイ | AI動画 + 実写真 |
| 70-76 | 横浜へ向かう空 | AI動画 |
| 76-86 | 横浜・挙式到着 | 式場写真 or AI動画 |
| 86-100 | カウントダウン | チャペル扉AI動画 + CapCut数字 |

---

## 本編テロップ台本

```text
NOW BOARDING
MEMORY FLIGHT 1024

SHOGO & SHIORI
2026.10.24


Passenger：Dear Guests
Departure：Narita Airport
Destination：Yokohama Wedding Ceremony
Gate：1024
Flight：SS1024

本日はご搭乗いただき
誠にありがとうございます


これから向かうのは
ふたりの思い出を巡る旅

Please fasten your seatbelts.


Memory 01
Okinawa

青い海と
ゆっくり流れる時間

ふたりで過ごす心地よさを
何度も感じた場所


Memory 02
Korea

よく食べて
よく歩いて
たくさん笑った旅


Memory 03
Hawaii

予定通りにはいかなかった
雨の日のプロポーズ

それでも
ふたりにとって
忘れられない一日になりました


そして今日
ふたりの旅は
新しい目的地へ

Final destination
Yokohama Wedding Ceremony


まもなく
最終目的地に到着いたします

Arrival
Yokohama Wedding Ceremony


Doors opening in...

10
9
8
7
6
5
4
3
2
1

Please welcome
SHOGO & SHIORI
```

---

## 必要画像リスト

### 優先度S: 最初に作る10枚

| No | ファイル名 | 内容 | 用途 |
|---:|---|---|---|
| 01 | op_01_narita_boarding_gate_ai.png | 成田空港の搭乗ゲート風 | 冒頭・NOW BOARDING背景 |
| 02 | op_02_boarding_pass_bg_ai.png | 搭乗券背景 | ゲスト搭乗演出 |
| 03 | op_03_airplane_window_clouds_ai.png | 飛行機の窓と雲 | フライト開始 |
| 04 | op_04_flight_map_bg_ai.png | フライトマップ背景 | 経由地移動 |
| 05 | op_05_okinawa_sea_ai.png | 沖縄の海 | Memory 01 |
| 06 | op_06_korea_street_ai.png | 韓国の街並み | Memory 02 |
| 07 | op_07_hawaii_beach_ai.png | ハワイの海 | Memory 03 |
| 08 | op_08_hawaii_rain_beach_ai.png | 雨のハワイビーチ | プロポーズ回想 |
| 09 | op_09_yokohama_sky_ai.png | 横浜へ向かう空 | 最終目的地へ |
| 10 | op_10_chapel_door_ai.png | チャペル扉 | カウントダウン直前 |

### 追加で作ると映える画像

| No | ファイル名 | 内容 | 用途 |
|---:|---|---|---|
| 11 | op_11_narita_airport_lobby_ai.png | 成田空港の出発ロビー風 | 旅の始まり |
| 12 | op_12_narita_runway_takeoff_ai.png | 成田空港の滑走路・離陸前風 | 離陸前の高揚感 |
| 13 | op_13_passport_stamp_bg_ai.png | パスポートページ背景 | 各地切替 |
| 14 | op_14_okinawa_sunset_ai.png | 沖縄夕方の海 | 沖縄パート余韻 |
| 15 | op_15_korea_cafe_food_ai.png | 韓国カフェ・グルメ | 楽しい旅行感 |
| 16 | op_16_cloud_transition_ai.png | 雲の上の移動 | 経由地トランジション |
| 17 | op_17_hawaii_night_view_ai.png | ハワイ夜景 | プロポーズ感動パート |
| 18 | op_18_ring_closeup_ai.png | 指輪クローズアップ | 感動カット |
| 19 | op_19_yokohama_city_ai.png | 横浜の海と街 | 到着前 |
| 20 | op_20_countdown_light_ai.png | 光の背景 | カウントダウン |

---

## ChatGPT画像生成プロンプト

共通方針:

- 16:9
- 文字なし
- ロゴなし
- 人物の顔なし
- 後から文字を載せる余白あり
- 上品・映画的・結婚式OP向け
- 空港ロビー・搭乗ゲート・滑走路は成田空港をイメージする
- ただし実在の看板・航空会社ロゴ・判読できる案内表示は入れない

### 01. 成田空港 搭乗ゲート

```text
結婚式オープニングムービー用の背景画像。成田空港を思わせる上品な国際線の搭乗ゲート。大きな窓、整然と並ぶ待合席、滑走路や飛行機が遠くに見える雰囲気。これから特別な旅が始まるワクワク感。画面中央に後からテキストを載せやすい余白を残す。人物の顔は出さない。実在の航空会社ロゴ、空港ロゴ、判読できる文字や看板は入れない。シネマティック、清潔感、ロマンチック。16:9。
```

### 02. 搭乗券背景

```text
結婚式オープニングムービー用の背景画像。上品な搭乗券のような紙チケット背景。クリーム色の紙、ミニマル、旅行感、高級感。後から文字を載せるための余白がある。バーコードや文字は入れない。結婚式らしい柔らかい雰囲気。16:9。
```

### 03. 飛行機の窓と雲

```text
結婚式オープニングムービー用の背景画像。飛行機の窓から見える雲の上の空。白い雲、青空、柔らかい光、旅の始まりを感じる爽やかな雰囲気。ロマンチックでシネマティック。文字なし。人物なし。16:9。
```

### 04. フライトマップ背景

```text
結婚式オープニングムービー用の背景画像。おしゃれなフライトマップ風の背景。薄いベージュの地図、飛行機の航路を後から重ねやすいデザイン。高級な旅行パンフレットのような雰囲気。国名や都市名などの文字は入れない。線や装飾は控えめ。16:9。
```

### 05. 沖縄の海

```text
結婚式オープニングムービー用の背景画像。沖縄を感じる美しい青い海と白い砂浜。晴れた空、透明感のある海、爽やかで開放的な雰囲気。ふたりの思い出を振り返る旅行ムービーに合う。人物なし。文字なし。16:9。
```

### 06. 韓国の街並み

```text
結婚式オープニングムービー用の背景画像。韓国旅行を感じるおしゃれな街並み。カフェ、ショップ、夜に近い柔らかな照明、楽しい街歩きの雰囲気。人物は遠景のシルエット程度で顔は見えない。看板の文字は読めない抽象的な表現にする。16:9。
```

### 07. ハワイの海

```text
結婚式オープニングムービー用の背景画像。ハワイを感じる美しい海、ヤシの木、青空、リゾート感。明るくロマンチックで、特別な思い出の場所として見える雰囲気。人物なし。文字なし。16:9。
```

### 08. 雨のハワイビーチ

```text
結婚式オープニングムービー用の背景画像。ハワイのビーチに小雨が降っているロマンチックな風景。曇り空、濡れた砂浜、遠くに波、少し切なく温かい雰囲気。プロポーズの思い出を感じる映画的なカット。人物なし。文字なし。16:9。
```

### 09. 横浜へ向かう空

```text
結婚式オープニングムービー用の背景画像。雲の上から横浜の街へ近づいていくような空撮風イメージ。旅の終着地に向かう高揚感、明るい光、ロマンチックで映画的。文字なし。人物なし。16:9。
```

### 10. チャペル扉

```text
結婚式オープニングムービー用の背景画像。上品な結婚式場のチャペルの大きな扉。扉の向こうから柔らかい光が差し込む。まもなく新郎新婦が登場する期待感。高級感、清潔感、ロマンチック。人物なし。文字なし。16:9。
```

### 11. 成田空港 出発ロビー

```text
結婚式オープニングムービー用の背景画像。成田空港を思わせる上品で映画的な国際線出発ロビー。大きな窓、自然光、滑らかな床、整然とした空港空間、旅行前のワクワク感。人物は小さなシルエット程度で顔は見えない。高級感、清潔感、ロマンチック、シネマティック。実在の空港ロゴ、航空会社ロゴ、判読できる看板や文字は入れない。16:9。
```

### 12. 成田空港 滑走路・離陸前

```text
結婚式オープニングムービー用の背景画像。成田空港を出発する国際線フライトの雰囲気。飛行機の窓から見える広い滑走路、まもなく離陸する高揚感。朝または夕方の柔らかい光、旅立ち、映画的な構図。実在の航空会社ロゴ、空港ロゴ、判読できる文字は入れない。人物なし。16:9。
```

### 13. パスポートスタンプ背景

```text
結婚式オープニングムービー用の背景画像。パスポートのページのような紙の質感。旅の記録を感じる上品な背景。後からスタンプ風テキストを載せやすい余白を残す。実在の国名、文字、数字、ロゴは入れない。ナチュラルで温かい雰囲気。16:9。
```

### 14. 沖縄夕方の海

```text
結婚式オープニングムービー用の背景画像。沖縄の夕方の海、柔らかい夕日、穏やかな波、ロマンチックで落ち着いた雰囲気。思い出を振り返るようなシネマティックな構図。人物なし。文字なし。16:9。
```

### 15. 韓国カフェ・グルメ

```text
結婚式オープニングムービー用の背景画像。韓国のおしゃれなカフェ風のテーブル。スイーツ、コーヒー、韓国料理、旅行中の楽しい休憩を感じる雰囲気。上品でポップ、温かい光。文字やロゴは入れない。人物なし。16:9。
```

### 16. 雲の上の移動

```text
結婚式オープニングムービー用の背景画像。雲の上を進む飛行機から見える空。柔らかい雲、光、次の思い出へ向かうような希望のある雰囲気。文字なし。人物なし。ロゴなし。16:9。
```

### 17. ハワイ夜景

```text
結婚式オープニングムービー用の背景画像。ハワイの高台から見下ろす夜景。雨上がりの空気、街の光、ロマンチックで静かな雰囲気。プロポーズ前後の特別な記憶を感じるシネマティックな構図。人物なし。文字なし。16:9。
```

### 18. 指輪クローズアップ

```text
結婚式オープニングムービー用の背景画像。婚約指輪のクローズアップ。柔らかい光、上品なテーブル、ロマンチックで映画的。ハワイ旅行のプロポーズ回想に合う雰囲気。文字なし。人物なし。16:9。
```

### 19. 横浜の海と街

```text
結婚式オープニングムービー用の背景画像。横浜を感じる海辺の街並み。上品で都会的、夕方の柔らかい光、結婚式当日の到着地としてふさわしい高揚感。実在の建物を正確に描きすぎず、横浜らしい雰囲気。文字なし。人物なし。16:9。
```

### 20. 光のカウントダウン背景

```text
結婚式オープニングムービー用の背景画像。暗めの上品な背景に、柔らかい光の粒とレンズフレア。カウントダウンの数字を後から重ねやすい余白がある。高級感、ワクワク感、結婚式らしい華やかさ。文字なし。人物なし。16:9。
```

---

## 生成AI動画プロンプト

共通プロンプト:

```text
Use the provided image as the first frame. Keep the original composition. Create a smooth cinematic motion suitable for an elegant wedding opening movie. No text, no readable signs, no logos, no faces, no extra people in the foreground. Warm, romantic, clean, high-quality, 16:9.
```

共通ネガティブ:

```text
text, subtitles, readable letters, logos, brand marks, distorted objects, warped architecture, extra people, visible faces, creepy faces, flickering, unstable camera, fast camera movement, low quality, blurry, noisy, deformed airplane, unrealistic motion
```

### 動画AI 16本構成

| No | シーン | 秒数 | 用途 |
|---:|---|---:|---|
| 01 | 成田空港ロビー | 4秒 | 旅の始まり |
| 02 | 成田空港 搭乗ゲート | 4秒 | NOW BOARDING背景 |
| 03 | 搭乗券背景 | 3秒 | ゲスト搭乗演出 |
| 04 | 成田空港 滑走路・離陸前 | 5秒 | ワクワクを上げる |
| 05 | 飛行機の窓と雲 | 5秒 | フライト開始 |
| 06 | フライトマップ背景 | 4秒 | 沖縄へ移動 |
| 07 | 沖縄の海 | 5秒 | Memory 01 |
| 08 | 沖縄夕方の海 | 4秒 | 思い出感 |
| 09 | 韓国の街並み | 5秒 | Memory 02 |
| 10 | 韓国カフェ・グルメ | 4秒 | 楽しい旅感 |
| 11 | 雲の上の移動 | 4秒 | ハワイへ |
| 12 | ハワイの海 | 5秒 | Memory 03 |
| 13 | 雨のハワイビーチ | 5秒 | プロポーズ回想 |
| 14 | ハワイ夜景 | 5秒 | 感動の山 |
| 15 | 横浜へ向かう空 | 5秒 | 最終目的地へ |
| 16 | チャペル扉・光 | 6秒 | 入場カウントダウン直前 |

---

## 動画AI個別プロンプト

### 01. 成田空港ロビー / 4秒

```text
Use the provided image as the first frame. Create a slow cinematic push-in through an elegant international departure lobby inspired by Narita Airport in Japan. Large windows, polished floor reflections, calm travel excitement, premium wedding opening atmosphere. Keep the scene clean and romantic. No text, no readable signs, no airport logos, no airline logos, no close-up faces. Smooth camera motion, 4 seconds, 16:9.
```

### 02. 成田空港 搭乗ゲート / 4秒

```text
Use the provided image as the first frame. Create a gentle forward camera movement toward an elegant international boarding gate inspired by Narita Airport in Japan. The atmosphere should feel like a special journey is about to begin. Warm lighting, cinematic, clean, romantic. Leave empty space in the center for text to be added later. No text, no airport logos, no airline logos, no readable signs, no faces. 4 seconds, 16:9.
```

### 03. 搭乗券背景 / 3秒

```text
Use the provided image as the first frame. Animate a minimal elegant boarding pass paper with a very subtle camera push-in and soft light movement. Keep the ticket blank with no text, no barcode, no logos, no symbols. Premium wedding travel style, clean cream paper texture, romantic and elegant. 3 seconds, 16:9.
```

### 04. 成田空港 滑走路・離陸前 / 5秒

```text
Use the provided image as the first frame. Create a cinematic airplane window view of a wide runway inspired by Narita Airport just before takeoff. The plane begins to move slowly forward, runway lights and morning or golden-hour atmosphere visible outside. Smooth realistic motion, anticipation, elegant international travel mood. No text, no airport logos, no airline logos, no people, no distorted airplane parts. 5 seconds, 16:9.
```

### 05. 飛行機の窓と雲 / 5秒

```text
Use the provided image as the first frame. Create a smooth airplane window shot above white clouds. Gentle cloud movement outside the window, soft sunlight, peaceful romantic travel feeling. The camera remains stable with a subtle handheld cinematic feel. No text, no logos, no people, no unrealistic airplane motion. 5 seconds, 16:9.
```

### 06. フライトマップ背景 / 4秒

```text
Use the provided image as the first frame. Create a subtle cinematic movement over an elegant blank travel map background. Slight paper texture, soft shadows, premium wedding invitation style. Do not add any city names, country names, route lines, numbers, letters, logos, or symbols. Leave clean space for route animation to be added later. 4 seconds, 16:9.
```

### 07. 沖縄の海 / 5秒

```text
Use the provided image as the first frame. Create a gentle cinematic shot of a beautiful Okinawa-like blue ocean and white sandy beach. Soft waves moving naturally, bright sky, refreshing tropical atmosphere. Romantic but not too dramatic, suitable for a wedding memory travel movie. No people, no text, no logos. 5 seconds, 16:9.
```

### 08. 沖縄夕方の海 / 4秒

```text
Use the provided image as the first frame. Create a calm cinematic sunset beach scene inspired by Okinawa. Gentle waves, warm golden light, peaceful romantic atmosphere, slow camera pan. No people, no text, no logos. Keep it elegant and natural. 4 seconds, 16:9.
```

### 09. 韓国の街並み / 5秒

```text
Use the provided image as the first frame. Create a smooth cinematic street-walking shot in a stylish Korea-inspired city area. Warm evening lights, cafes and shops, lively but elegant travel mood. Any signs should be abstract and unreadable. People may appear only as distant silhouettes with no visible faces. No text, no logos, no readable letters. 5 seconds, 16:9.
```

### 10. 韓国カフェ・グルメ / 4秒

```text
Use the provided image as the first frame. Create a cozy cinematic Korean cafe and food table scene. Subtle steam, warm light, gentle camera push-in, fun travel memory atmosphere. No hands, no faces, no logos, no readable text. Keep the food elegant and appetizing, suitable for a wedding opening movie. 4 seconds, 16:9.
```

### 11. 雲の上の移動 / 4秒

```text
Use the provided image as the first frame. Create a cinematic transition shot above soft clouds, as if the flight is continuing to the next memory. Gentle forward movement, sunlight breaking through clouds, romantic and hopeful feeling. No text, no logos, no people, no airplane deformation. 4 seconds, 16:9.
```

### 12. ハワイの海 / 5秒

```text
Use the provided image as the first frame. Create a bright cinematic Hawaii-inspired beach scene with palm trees, blue ocean, and warm sunlight. Gentle waves, soft breeze, romantic travel memory atmosphere. No people, no text, no logos, no readable signs. 5 seconds, 16:9.
```

### 13. 雨のハワイビーチ / 5秒

```text
Use the provided image as the first frame. Create a romantic rainy beach scene inspired by Hawaii. Light rain falling gently, wet sand reflecting soft gray sky, calm ocean waves, warm emotional atmosphere. It should feel like a meaningful proposal memory, not sad, but tender and unforgettable. No people, no text, no logos. 5 seconds, 16:9.
```

### 14. ハワイ夜景 / 5秒

```text
Use the provided image as the first frame. Create a cinematic high viewpoint night scene inspired by Hawaii, overlooking a warm city skyline after rain. Soft glowing lights, quiet romantic atmosphere, gentle camera push-in. The mood should feel intimate and memorable, suitable for a proposal memory. No text, no logos, no people, no readable signs. 5 seconds, 16:9.
```

### 15. 横浜へ向かう空 / 5秒

```text
Use the provided image as the first frame. Create a cinematic aerial approach through clouds toward a Yokohama-inspired seaside city. Bright elegant light, sense of arrival, romantic wedding day atmosphere. Do not show exact readable landmarks or logos. No text, no people, no distorted buildings. Smooth forward motion, 5 seconds, 16:9.
```

### 16. チャペル扉・光 / 6秒

```text
Use the provided image as the first frame. Create a cinematic wedding chapel door scene. The large elegant doors slowly glow with soft light from the other side, as if they are about to open. Romantic, emotional, premium wedding atmosphere. Keep the camera slowly pushing in. No people, no text, no logos. Do not fully reveal anyone. 6 seconds, 16:9.
```

---

## CapCutで作るもの

動画AIに任せず、CapCutで後乗せする。

- NOW BOARDING
- MEMORY FLIGHT 1024
- Flight SS1024
- Departure: Narita Airport
- Passenger / Destination / Gate
- フライトマップの航路線
- Narita / Okinawa / Korea / Hawaii / Yokohama の地名
- パスポートスタンプ風テロップ
- Doors opening in...
- 10秒カウントダウン
- Please welcome SHOGO & SHIORI
- 空港アナウンスSE
- 飛行機離陸SE
- スタンプSE
- カウントダウンSE

---

## 実写真で後から差し替えるもの

### 成田空港

- 成田空港の出発ロビー写真があれば差し替え候補
- 成田空港の搭乗ゲート写真があれば差し替え候補
- 実写真がなければAI生成背景のままでOK

### 沖縄

- 海で撮ったふたり写真
- 風景写真
- 食事写真
- 移動中の写真
- 笑っている写真

### 韓国

- 街歩き写真
- ご飯写真
- カフェ写真
- 夜景写真
- ふたりの写真

### ハワイ

- 海
- タンタラス
- ビーチ
- Wolfgang
- 指輪
- プロポーズ前後の写真
- 雨っぽさがわかる写真

### 横浜・挙式

- 式場外観
- チャペル
- 扉
- バージンロード
- 装花
- 指輪
- 当日使う小物

---

## 制作順

1. ChatGPTで静止画10枚を作る
2. 生成AI動画へ投げて3〜6秒の素材にする
3. CapCutに並べて100秒版の仮OPを作る
4. テロップ・カウントダウン・SE・BGMを入れる
5. 沖縄・韓国・ハワイ・式場の実写真に差し替える
6. 最後にBGMの盛り上がりに合わせて尺を調整する

---

## 判断メモ

この案は、結婚式のコンセプト「旅行」と相性が良い。

単なる旅行Vlogにせず、ゲストを搭乗者にすることでOPとして機能する。

成田空港から出発することで、日本から旅が始まる実感が出る。沖縄・韓国・ハワイを思い出として経由し、最後に横浜の挙式へ着陸する構成が最も強い。
