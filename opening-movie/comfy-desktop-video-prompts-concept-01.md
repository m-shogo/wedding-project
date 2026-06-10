# Comfy Desktop 動画化プロンプト

## 構成案1: MEMORY FLIGHT 1024

対象画像: `01_profile-movie/sample_image/` にある20枚想定。

使い方:

1. Comfy Desktopで画像を1枚入れる
2. 対応するPromptを貼る
3. 秒数を指定する
4. 16:9で生成する
5. 出力名に合わせて保存する

基本方針:

- 画像内に文字を追加しない
- ロゴを追加しない
- 顔を追加しない
- 建物や飛行機を歪ませない
- カメラ移動はゆっくり
- 完成動画ではなく、CapCutに入れる短尺素材として作る

---

## 共通ネガティブ相当

Comfy Desktopにネガティブプロンプト欄がある場合は、以下をNegativeに入れる。
欄がない場合は、各Prompt内にすでに `Do not...` として入れているので、そのままでOK。

```text
text, subtitles, readable letters, logos, brand marks, distorted objects, warped architecture, extra people, visible faces, creepy faces, flickering, unstable camera, fast camera movement, low quality, blurry, noisy, deformed airplane, unrealistic motion
```

---

# 01. 成田空港 搭乗ゲート

- Input image: `op_01_narita_boarding_gate_ai.png`
- Output video: `op_01_narita_boarding_gate_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a gentle forward camera movement toward an elegant international boarding gate inspired by Narita Airport in Japan. The atmosphere should feel like a special journey is about to begin. Warm lighting, cinematic, clean, romantic, premium wedding opening movie style. Keep important architecture stable. Do not add text, subtitles, readable signs, airport logos, airline logos, close-up faces, extra people in the foreground, distorted objects, warped architecture, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 4 seconds.
```

Motion note: ゆっくり前進。NOW BOARDINGのテロップを後乗せする冒頭背景。

---

# 02. 搭乗券背景

- Input image: `op_02_boarding_pass_bg_ai.png`
- Output video: `op_02_boarding_pass_bg_video.mp4`
- Duration: 3 seconds

```text
Use the provided image as the first frame. Keep the original composition. Animate a minimal elegant boarding pass paper with a very subtle camera push-in and soft light movement. Premium wedding travel style, clean cream paper texture, romantic and elegant. Keep the ticket blank. Do not add text, subtitles, readable letters, barcode, numbers, logos, symbols, hands, faces, extra objects, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 3 seconds.
```

Motion note: ほぼ静止で軽いズーム。搭乗券情報はCapCutで後乗せ。

---

# 03. 飛行機の窓と雲

- Input image: `op_03_airplane_window_clouds_ai.png`
- Output video: `op_03_airplane_window_clouds_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a smooth airplane window shot above white clouds. Gentle cloud movement outside the window, soft sunlight, peaceful romantic travel feeling. The camera remains stable with a subtle cinematic feel. Keep the airplane window frame stable. Do not add text, subtitles, readable signs, logos, people, faces, distorted airplane parts, warped window frame, flickering, unstable camera movement, blurry details, or unrealistic airplane motion. 16:9, 5 seconds.
```

Motion note: 雲がゆっくり流れる。フライト開始の雰囲気。

---

# 04. フライトマップ背景

- Input image: `op_04_flight_map_bg_ai.png`
- Output video: `op_04_flight_map_bg_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a subtle cinematic movement over an elegant blank travel map background. Slight paper texture, soft shadows, premium wedding invitation style. Slow gentle pan across the paper surface. Do not add city names, country names, route lines, airplane icons, numbers, letters, subtitles, logos, symbols, hands, faces, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 4 seconds.
```

Motion note: 紙地図の上をゆっくりパン。航路線・地名はCapCutで後乗せ。

---

# 05. 沖縄の海・昼

- Input image: `op_05_okinawa_sea_ai.png`
- Output video: `op_05_okinawa_sea_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a gentle cinematic shot of a beautiful Okinawa-like blue ocean and white sandy beach. Soft waves moving naturally, bright sky, refreshing tropical atmosphere, elegant wedding memory travel movie style. Subtle camera drift only. Do not add text, subtitles, readable signs, logos, people, faces, boats in the foreground, distorted waves, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 5 seconds.
```

Motion note: 波だけ自然に動かす。Memory 01 Okinawa。

---

# 06. 韓国の街並み

- Input image: `op_06_korea_street_ai.png`
- Output video: `op_06_korea_street_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a smooth cinematic street-walking shot in a stylish Korea-inspired city area. Warm evening lights, cafes and shops, lively but elegant travel mood. Camera moves slowly forward as if walking through the memory. Any signs should remain abstract and unreadable. People may appear only as distant silhouettes with no visible faces. Do not add text, subtitles, readable letters, logos, close-up faces, extra foreground people, warped buildings, distorted shop fronts, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 5 seconds.
```

Motion note: 街歩き風にゆっくり前進。韓国パートの楽しいテンポ。

---

# 07. ハワイの海・昼

- Input image: `op_07_hawaii_beach_ai.png`
- Output video: `op_07_hawaii_beach_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a bright cinematic Hawaii-inspired beach scene with palm trees, blue ocean, and warm sunlight. Gentle waves, soft breeze, subtle palm movement, romantic travel memory atmosphere. Keep the camera stable with a slight slow push-in. Do not add text, subtitles, readable signs, logos, people, faces, distorted palm trees, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 5 seconds.
```

Motion note: 波とヤシを少し動かす。ハワイパート導入。

---

# 08. 雨のハワイビーチ

- Input image: `op_08_hawaii_rain_beach_ai.png`
- Output video: `op_08_hawaii_rain_beach_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a romantic rainy beach scene inspired by Hawaii. Light rain falling gently, wet sand reflecting soft gray sky, calm ocean waves, warm emotional atmosphere. It should feel like a meaningful proposal memory, not sad, but tender and unforgettable. Slow cinematic camera drift. Do not add text, subtitles, readable signs, logos, people, faces, umbrellas in the foreground, distorted rain, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 5 seconds.
```

Motion note: 小雨・波・濡れた砂浜の反射。プロポーズ回想の核。

---

# 09. 横浜へ向かう空

- Input image: `op_09_yokohama_sky_ai.png`
- Output video: `op_09_yokohama_sky_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic aerial approach through clouds toward a Yokohama-inspired seaside city. Bright elegant light, sense of arrival, romantic wedding day atmosphere. Smooth forward motion, as if approaching the final destination. Do not show exact readable landmarks, text, subtitles, logos, people, faces, distorted buildings, warped skyline, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 5 seconds.
```

Motion note: 雲を抜けて横浜方面へ近づく。Final destinationへの転換。

---

# 10. チャペル扉

- Input image: `op_10_chapel_door_ai.png`
- Output video: `op_10_chapel_door_video.mp4`
- Duration: 6 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic wedding chapel door scene. The large elegant doors slowly glow with soft light from the other side, as if they are about to open. Romantic, emotional, premium wedding atmosphere. Keep the camera slowly pushing in. Do not fully open the doors. Do not reveal any people. Do not add text, subtitles, logos, faces, distorted architecture, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 6 seconds.
```

Motion note: 扉は完全には開けない。カウントダウン直前〜数字重ね用。

---

# 11. 成田空港ロビー

- Input image: `op_11_narita_airport_lobby_ai.png`
- Output video: `op_11_narita_airport_lobby_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a slow cinematic push-in through an elegant international departure lobby inspired by Narita Airport in Japan. Large windows, polished floor reflections, calm travel excitement, premium wedding opening atmosphere. Keep the scene clean and romantic. Do not add text, subtitles, readable signs, airport logos, airline logos, close-up faces, extra people in the foreground, warped architecture, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 4 seconds.
```

Motion note: 最初の旅立ち感。必要ならop_01より前に置く。

---

# 12. 成田空港 滑走路・離陸前

- Input image: `op_12_narita_runway_takeoff_ai.png`
- Output video: `op_12_narita_runway_takeoff_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic airplane window view of a wide runway inspired by Narita Airport just before takeoff. The plane begins to move slowly forward, runway lights and morning or golden-hour atmosphere visible outside. Smooth realistic motion, anticipation, elegant international travel mood. Do not add text, subtitles, readable signs, airport logos, airline logos, people, faces, distorted airplane parts, warped window frame, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 5 seconds.
```

Motion note: 離陸直前。BGMの立ち上がりに合わせる。

---

# 13. パスポートスタンプ背景

- Input image: `op_13_passport_stamp_bg_ai.png`
- Output video: `op_13_passport_stamp_bg_video.mp4`
- Duration: 3 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a subtle cinematic motion over a blank passport page texture. Soft paper shadows, warm travel memory feeling, premium wedding stationery style. Keep the page blank for stamp text to be added later in editing. Do not add text, numbers, stamps, country names, logos, hands, faces, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 3 seconds.
```

Motion note: 各Memory切替用。スタンプ文字はCapCutで後乗せ。

---

# 14. 沖縄の夕方の海

- Input image: `op_14_okinawa_sunset_ai.png`
- Output video: `op_14_okinawa_sunset_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a calm cinematic sunset beach scene inspired by Okinawa. Gentle waves, warm golden light, peaceful romantic atmosphere, slow camera pan. Keep it elegant and natural, like a quiet memory. Do not add text, subtitles, readable signs, logos, people, faces, distorted waves, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 4 seconds.
```

Motion note: 沖縄パートの余韻。昼海の後に使う。

---

# 15. 韓国カフェ・グルメ

- Input image: `op_15_korea_cafe_food_ai.png`
- Output video: `op_15_korea_cafe_food_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cozy cinematic Korean cafe and food table scene. Subtle steam, warm light, gentle camera push-in, fun travel memory atmosphere. Keep the table elegant and appetizing. Do not add text, subtitles, readable labels, logos, hands, faces, extra people, distorted food, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 4 seconds.
```

Motion note: 湯気・光だけ軽く動かす。韓国の楽しい記憶。

---

# 16. 雲の上の移動

- Input image: `op_16_cloud_transition_ai.png`
- Output video: `op_16_cloud_transition_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic transition shot above soft clouds, as if the flight is continuing to the next memory. Gentle forward movement, sunlight breaking through clouds, romantic and hopeful feeling. Keep any airplane wing stable if visible. Do not add text, subtitles, logos, people, faces, distorted airplane parts, warped clouds, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 4 seconds.
```

Motion note: 経由地間の汎用トランジション。

---

# 17. ハワイ夜景・タンタラス風

- Input image: `op_17_hawaii_night_view_ai.png`
- Output video: `op_17_hawaii_night_view_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic high viewpoint night scene inspired by Hawaii, overlooking a warm city skyline after rain. Soft glowing lights, quiet romantic atmosphere, gentle camera push-in. The mood should feel intimate and memorable, suitable for a proposal memory. Do not add text, subtitles, readable signs, logos, people, faces, distorted city lights, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 5 seconds.
```

Motion note: ハワイ感動パート。雨プロポーズ後の余韻。

---

# 18. 指輪クローズアップ

- Input image: `op_18_ring_closeup_ai.png`
- Output video: `op_18_ring_closeup_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a romantic cinematic close-up of an engagement ring with soft light and shallow depth of field. Very slow push-in, gentle sparkle, premium wedding memory atmosphere. Do not add text, subtitles, logos, hands, faces, extra objects, distorted ring shape, unrealistic sparkle, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 4 seconds.
```

Motion note: 指輪にゆっくり寄る。ハワイプロポーズの象徴カット。

---

# 19. 横浜の海と街

- Input image: `op_19_yokohama_city_ai.png`
- Output video: `op_19_yokohama_city_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic Yokohama-inspired seaside city scene at golden hour. Gentle camera movement, elegant urban waterfront, romantic wedding day arrival mood. Do not show exact readable landmarks, text, subtitles, logos, people, faces, distorted buildings, warped skyline, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 5 seconds.
```

Motion note: 横浜到着の補強。op_09の後に使うと良い。

---

# 20. カウントダウン用 光背景

- Input image: `op_20_countdown_light_ai.png`
- Output video: `op_20_countdown_light_video.mp4`
- Duration: 6 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create an elegant dark cinematic background with soft glowing particles and lens flare movement. Premium wedding opening countdown atmosphere, exciting but classy. Keep the center clean for countdown numbers to be added later. Do not add text, subtitles, numbers, logos, people, faces, harsh flashes, flickering, unstable camera movement, blurry details, or unrealistic motion. 16:9, 6 seconds.
```

Motion note: カウントダウン数字をCapCutで重ねる背景。

---

## 最初に試す3本

いきなり20本作らず、まず以下を試す。

1. `op_11_narita_airport_lobby_ai.png` / 4秒
2. `op_03_airplane_window_clouds_ai.png` / 5秒
3. `op_10_chapel_door_ai.png` / 6秒

この3本で破綻しにくければ、残り17本も同じ設定で進める。
