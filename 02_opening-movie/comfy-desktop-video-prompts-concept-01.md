# Comfy Desktop 動画化プロンプト

## 構成案1: MEMORY FLIGHT 1024

対象画像: `02_opening-movie/sample_image/` にある20枚想定（Git管理外・ローカル管理）。

## 注意: op_01 / op_11 は不採用

`op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は
目視確認で人物入りと判明し、Style Bibleの `no people` 違反のため不採用。
最新の採否は `02_opening-movie/asset-status.md` を必ず確認する。
以下の01・11節のプロンプトは、人物なし版を再生成した後の参考としてのみ扱い、
現行の不採用画像に対してこのままI2V生成しない。

## 使い方

1. Comfy Desktopで画像を1枚入れる
2. 対応するPromptを貼る
3. 秒数を指定する
4. 16:9で生成する
5. 出力名に合わせて保存する

## 共通ルール

- 文字・ロゴ・判読できる看板は追加しない
- 顔が大きく出る人物は追加しない
- 建物・飛行機・窓枠・指輪を歪ませない
- カメラ移動はゆっくり
- CapCutに入れる短尺素材として作る

## 共通Negative

Negative欄がある場合だけ入れる。欄がない場合は各PromptだけでOK。

```text
text, subtitles, readable letters, logos, brand marks, distorted objects, warped architecture, extra people, visible faces, flickering, unstable camera, fast camera movement, low quality, blurry, noisy, deformed airplane, unrealistic motion
```

---

## 01. 成田空港 搭乗ゲート（不採用・要再生成）

**不採用**: `op_01_narita_boarding_gate_ai.png` はカウンター係員と搭乗客の後ろ姿が写っており使用不可。
人物なし版を再生成してから、このプロンプトを参考に流用する。

- Input: `op_01_narita_boarding_gate_ai.png`
- Output: `op_01_narita_boarding_gate_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a gentle forward camera movement toward an elegant international boarding gate inspired by Narita Airport in Japan. A special journey is about to begin. Warm lighting, cinematic, clean, romantic, premium wedding opening movie style. Keep architecture stable. No text, no logos, no readable signs, no close-up faces. 16:9, 4 seconds.
```

## 02. 搭乗券背景

- Input: `op_02_boarding_pass_bg_ai.png`
- Output: `op_02_boarding_pass_bg_video.mp4`
- Duration: 3 seconds

```text
Use the provided image as the first frame. Keep the original composition. Animate a minimal elegant boarding pass paper with a very subtle camera push-in and soft light movement. Premium wedding travel style, clean cream paper texture, romantic and elegant. Keep the ticket blank. No text, no barcode, no logos. 16:9, 3 seconds.
```

## 03. 飛行機の窓と雲

- Input: `op_03_airplane_window_clouds_ai.png`
- Output: `op_03_airplane_window_clouds_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a smooth airplane window shot above white clouds. Gentle cloud movement outside the window, soft sunlight, peaceful romantic travel feeling. Keep the airplane window frame stable. No text, no logos, no people. 16:9, 5 seconds.
```

## 04. フライトマップ背景

- Input: `op_04_flight_map_bg_ai.png`
- Output: `op_04_flight_map_bg_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a subtle cinematic movement over an elegant blank travel map background. Slight paper texture, soft shadows, premium wedding invitation style. Slow gentle pan across the paper surface. Do not add city names, route lines, airplane icons, numbers, letters, or logos. 16:9, 4 seconds.
```

## 05. 沖縄の海・昼

- Input: `op_05_okinawa_sea_ai.png`
- Output: `op_05_okinawa_sea_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a gentle cinematic shot of a beautiful Okinawa-like blue ocean and white sandy beach. Soft waves moving naturally, bright sky, refreshing tropical atmosphere, elegant wedding memory travel movie style. Subtle camera drift only. No text, no logos, no people. 16:9, 5 seconds.
```

## 06. 韓国の街並み

- Input: `op_06_korea_street_ai.png`
- Output: `op_06_korea_street_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a smooth cinematic street-walking shot in a stylish Korea-inspired city area. Warm evening lights, cafes and shops, lively but elegant travel mood. Camera moves slowly forward as if walking through the memory. Signs should remain abstract and unreadable. No text, no logos, no close-up faces. 16:9, 5 seconds.
```

## 07. ハワイの海・昼

- Input: `op_07_hawaii_beach_ai.png`
- Output: `op_07_hawaii_beach_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a bright cinematic Hawaii-inspired beach scene with palm trees, blue ocean, and warm sunlight. Gentle waves, soft breeze, subtle palm movement, romantic travel memory atmosphere. Keep the camera stable with a slight slow push-in. No text, no logos, no people. 16:9, 5 seconds.
```

## 08. 雨のハワイビーチ

- Input: `op_08_hawaii_rain_beach_ai.png`
- Output: `op_08_hawaii_rain_beach_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a romantic rainy beach scene inspired by Hawaii. Light rain falling gently, wet sand reflecting soft gray sky, calm ocean waves, warm emotional atmosphere. It should feel like a meaningful proposal memory, tender and unforgettable. Slow cinematic camera drift. No text, no logos, no people. 16:9, 5 seconds.
```

## 09. 横浜へ向かう空

- Input: `op_09_yokohama_sky_ai.png`
- Output: `op_09_yokohama_sky_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic aerial approach through clouds toward a Yokohama-inspired seaside city. Bright elegant light, sense of arrival, romantic wedding day atmosphere. Smooth forward motion, as if approaching the final destination. No exact readable landmarks, no text, no logos, no people. 16:9, 5 seconds.
```

## 10. チャペル扉

- Input: `op_10_chapel_door_ai.png`
- Output: `op_10_chapel_door_video.mp4`
- Duration: 6 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic wedding chapel door scene. The large elegant doors slowly glow with soft light from the other side, as if they are about to open. Romantic, emotional, premium wedding atmosphere. Keep the camera slowly pushing in. Do not fully open the doors. Do not reveal any people. No text, no logos. 16:9, 6 seconds.
```

## 11. 成田空港ロビー（不採用・要再生成）

**不採用**: `op_11_narita_airport_lobby_ai.png` は複数人物が写っており使用不可。
人物なし版を再生成してから、このプロンプトを参考に流用する。

- Input: `op_11_narita_airport_lobby_ai.png`
- Output: `op_11_narita_airport_lobby_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a slow cinematic push-in through an elegant international departure lobby inspired by Narita Airport in Japan. Large windows, polished floor reflections, calm travel excitement, premium wedding opening atmosphere. Keep the scene clean and romantic. No text, no logos, no readable signs, no close-up faces. 16:9, 4 seconds.
```

## 12. 成田空港 滑走路・離陸前

- Input: `op_12_narita_runway_takeoff_ai.png`
- Output: `op_12_narita_runway_takeoff_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic airplane window view of a wide runway inspired by Narita Airport just before takeoff. The plane begins to move slowly forward, runway lights and morning or golden-hour atmosphere visible outside. Smooth realistic motion, anticipation, elegant international travel mood. No text, no logos, no people, keep airplane parts stable. 16:9, 5 seconds.
```

## 13. パスポートスタンプ背景

- Input: `op_13_passport_stamp_bg_ai.png`
- Output: `op_13_passport_stamp_bg_video.mp4`
- Duration: 3 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a subtle cinematic motion over a blank passport page texture. Soft paper shadows, warm travel memory feeling, premium wedding stationery style. Keep the page blank for stamp text to be added later in editing. Do not add text, numbers, stamps, country names, logos, or hands. 16:9, 3 seconds.
```

## 14. 沖縄の夕方の海

- Input: `op_14_okinawa_sunset_ai.png`
- Output: `op_14_okinawa_sunset_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a calm cinematic sunset beach scene inspired by Okinawa. Gentle waves, warm golden light, peaceful romantic atmosphere, slow camera pan. Keep it elegant and natural, like a quiet memory. No text, no logos, no people. 16:9, 4 seconds.
```

## 15. 韓国カフェ・グルメ

- Input: `op_15_korea_cafe_food_ai.png`
- Output: `op_15_korea_cafe_food_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cozy cinematic Korean cafe and food table scene. Subtle steam, warm light, gentle camera push-in, fun travel memory atmosphere. Keep the table elegant and appetizing. No text, no logos, no hands, no faces. 16:9, 4 seconds.
```

## 16. 雲の上の移動

- Input: `op_16_cloud_transition_ai.png`
- Output: `op_16_cloud_transition_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic transition shot above soft clouds, as if the flight is continuing to the next memory. Gentle forward movement, sunlight breaking through clouds, romantic and hopeful feeling. Keep any airplane wing stable if visible. No text, no logos, no people. 16:9, 4 seconds.
```

## 17. ハワイ夜景・タンタラス風

- Input: `op_17_hawaii_night_view_ai.png`
- Output: `op_17_hawaii_night_view_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic high viewpoint night scene inspired by Hawaii, overlooking a warm city skyline after rain. Soft glowing lights, quiet romantic atmosphere, gentle camera push-in. The mood should feel intimate and memorable, suitable for a proposal memory. No text, no logos, no people. 16:9, 5 seconds.
```

## 18. 指輪クローズアップ

- Input: `op_18_ring_closeup_ai.png`
- Output: `op_18_ring_closeup_video.mp4`
- Duration: 4 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a romantic cinematic close-up of an engagement ring with soft light and shallow depth of field. Very slow push-in, gentle sparkle, premium wedding memory atmosphere. Keep the ring shape stable and elegant. No text, no logos, no hands, no faces. 16:9, 4 seconds.
```

## 19. 横浜の海と街

- Input: `op_19_yokohama_city_ai.png`
- Output: `op_19_yokohama_city_video.mp4`
- Duration: 5 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create a cinematic Yokohama-inspired seaside city scene at golden hour. Gentle camera movement, elegant urban waterfront, romantic wedding day arrival mood. No exact readable landmarks, no text, no logos, no people. 16:9, 5 seconds.
```

## 20. カウントダウン用 光背景

- Input: `op_20_countdown_light_ai.png`
- Output: `op_20_countdown_light_video.mp4`
- Duration: 6 seconds

```text
Use the provided image as the first frame. Keep the original composition. Create an elegant dark cinematic background with soft glowing particles and lens flare movement. Premium wedding opening countdown atmosphere, exciting but classy. Keep the center clean for countdown numbers to be added later. Do not add text, subtitles, numbers, logos, people, faces, or harsh flashes. 16:9, 6 seconds.
```

---

## 最初に試す3本

いきなり20本作らず、まず以下を試す。

1. `op_11_narita_airport_lobby_ai.png` / 4秒
2. `op_03_airplane_window_clouds_ai.png` / 5秒
3. `op_10_chapel_door_ai.png` / 6秒

この3本で破綻しにくければ、残り17本も同じ設定で進める。
