# るるぶWEDDING — Image Generation Queue

Updated: 2026-07-30
Current authority: GitHub `main`

## Workflow
1. 1素材 = 1画像で生成/制作
2. 明らかに採用可能かQA
3. AI生成で透過が必要な素材は green screen -> Python chroma key -> alpha QA。ベクター向き素材は SVG native -> transparent PNG export -> alpha QA を優先
4. Google Driveへ実ファイル保存
5. Drive上で存在確認
6. このリストを更新
7. Gitへ記録
8. 次の素材へ

装飾のないタイトル・本文・見出し・ラベルは画像化せずFigma native textで作る。

## Hard generation gate
- 画像生成直前に必ずこの `main` のキューを再取得し、最初の `[ ]` だけを `NEXT ASSET` とする。
- `[x]` の素材は、ユーザーが「別案」「作り直し」を明示しない限り再生成禁止。
- 生成結果が `NEXT ASSET` と一致しない場合は即 `REJECTED`。Drive保存・Git更新・`[x]`化をしない。
- 文字指定がある素材は、指定文字以外の主要文字が出たら `REJECTED`。
- 文字なし素材は、意味のある文字・単語・日付・既存バッジ文言が1つでも出たら `REJECTED`。
- 異なる素材へ進むときは、直前素材を編集・変形・流用する発想を禁止し、完全な新規単体素材として生成する。
- `進めて` は「前素材の後処理を完了し、次の未完了素材へ進む」の意味。既完了素材の再生成ではない。
- 同じ誤素材が2回連続で出た場合、その素材の生成を止め、次回生成前にこのHard generation gateとNEXT ASSET固有仕様を再固定する。
- 単純なフレーム、テープ、線、ピン、アイコン等は画像生成AIより SVG/Figma native vector を優先し、会話内の画像文脈汚染を回避する。

## Current queue
- [x] 1. るるぶWEDDING ロゴA
  - file: `rurubu_wedding_logo_A_v1.png`
  - status: `CURRENT_CANDIDATE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - Drive ID: `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
  - Drive URL: https://drive.google.com/file/d/1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b
- [x] 2. るるぶWEDDING ロゴB
  - file: `rurubu_wedding_logo_B_v1.png`
  - status: `CURRENT_CANDIDATE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - Drive ID: `1YGUHk3PwKBLZ9onAL0iW-GdlSb-VXkWn`
  - Drive URL: https://drive.google.com/file/d/1YGUHk3PwKBLZ9onAL0iW-GdlSb-VXkWn
- [x] 3. るるぶWEDDING ロゴC
  - file: `rurubu_wedding_logo_C_v1.png`
  - status: `CURRENT_CANDIDATE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - Drive ID: `1rBM7ssGA9rMzG9p29Zxbgu0bFF67QVGZ`
  - Drive URL: https://drive.google.com/file/d/1rBM7ssGA9rMzG9p29Zxbgu0bFF67QVGZ
- [x] 4. 日付バッジ `2026.10.24 SAT`
  - file: `rurubu_04_date_badge_2026-10-24_sat.png`
  - status: `CURRENT_CANDIDATE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1336x843 after crop; real alpha present; suspicious visible green pixels = 0`
  - Drive ID: `1S7HP3LAQriL42PgkN2WwaX-p7DvU04iG`
  - Drive URL: https://drive.google.com/file/d/1S7HP3LAQriL42PgkN2WwaX-p7DvU04iG
- [x] 5. `PICK UP!` バッジ
  - file: `rurubu_05_pick_up_badge_transparent.png`
  - status: `CURRENT_CANDIDATE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1212x998 after crop; real alpha present; suspicious visible green pixels = 0`
  - Drive ID: `1i4FhqEIRWiZ9UHY998XIKN2QYcYUH84w`
  - Drive URL: https://drive.google.com/file/d/1i4FhqEIRWiZ9UHY998XIKN2QYcYUH84w
- [x] 6. `CHECK!` バッジ
  - file: `rurubu_06_check_badge_transparent_v2.png`
  - status: `CURRENT_CANDIDATE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1073x948 after crop; real alpha present; suspicious visible green pixels = 0`
  - Drive ID: `1NAt9SaallBR2E54AxBfISk2gPnosjsZ-`
  - Drive URL: https://drive.google.com/file/d/1NAt9SaallBR2E54AxBfISk2gPnosjsZ-
  - superseded candidate: `rurubu_06_check_badge_transparent.png` / Drive ID `1x8EaXJrahOeax6IErqffKwcsCLWyALLE` / `REJECTED: suspicious visible green pixels = 1`
- [x] 7. `BEST SHOT` バッジ
  - file: `rurubu_07_best_shot_badge_transparent.png`
  - status: `CURRENT_CANDIDATE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1142x943 after crop; real alpha present; suspicious visible green pixels = 0`
  - Drive ID: `1XK03fy0A5UnzaBgoOV59MiOlO-grsVpo`
  - Drive URL: https://drive.google.com/file/d/1XK03fy0A5UnzaBgoOV59MiOlO-grsVpo
- [x] 8. 写真フレーム（スクラップ風）
  - source: `rurubu_08_scrapbook_photo_frame.svg`
  - export: `rurubu_08_scrapbook_photo_frame.png`
  - status: `CURRENT_CANDIDATE / VECTOR_SOURCE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1600x1200; RGBA; real alpha present; central photo opening alpha = 0; frame alpha = 255; no text; no people`
  - SVG Drive ID: `12S8yfO2hjAIRswIERoMEIWeeI1lufEId`
  - SVG Drive URL: https://drive.google.com/file/d/12S8yfO2hjAIRswIERoMEIWeeI1lufEId
  - PNG Drive ID: `1JNN1AeGpKX9A_-gB24b-kx0EG4F--YbG`
  - PNG Drive URL: https://drive.google.com/file/d/1JNN1AeGpKX9A_-gB24b-kx0EG4F--YbG
- [x] 9. マスキングテープ風装飾
  - source: `rurubu_09_masking_tape.svg`
  - export: `rurubu_09_masking_tape.png`
  - status: `CURRENT_CANDIDATE / VECTOR_SOURCE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1400x500; RGBA; real alpha present; no text; no people`
  - SVG Drive ID: `1vX9CKoiFRGlAhmh8FAKsYSFbvLmw25FG`
  - PNG Drive ID: `1an7z2OToMkvKHmNLTtr5sIKmHHYZ7NQA`
- [x] 10. 旅ルート + 飛行機 + ハート装飾
  - source: `rurubu_10_travel_route_airplane_heart.svg`
  - export: `rurubu_10_travel_route_airplane_heart.png`
  - status: `CURRENT_CANDIDATE / VECTOR_SOURCE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1500x800; RGBA; real alpha present; no text; no people`
  - SVG Drive ID: `1m3gdS-v02dh9w7LcvEyM22P3IqbAvcaA`
  - PNG Drive ID: `1olSQtZpIBXLPm1gvNJ5zuwwvS-7Ie1GO`
- [x] 11. 地図ピン装飾
  - source: `rurubu_11_map_pin.svg`
  - export: `rurubu_11_map_pin.png`
  - status: `CURRENT_CANDIDATE / VECTOR_SOURCE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `900x1100; RGBA; real alpha present; no text; no people`
  - SVG Drive ID: `1qpljWdOq5-SehAvLtjPSw5BDRnW1J7rf`
  - PNG Drive ID: `1kJT3s_4ty4LZjji0aIv4XzbzrLUdrfz7`
- [x] 12. 小さな旅アイコンセット
  - source: `rurubu_12_small_travel_icons.svg`
  - export: `rurubu_12_small_travel_icons.png`
  - status: `CURRENT_CANDIDATE / VECTOR_SOURCE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1800x520; RGBA; real alpha present; intentional icon-row set; no text; no people`
  - SVG Drive ID: `1mj_fAKcHgjxx2d0d6yce9DA_JQ_WnecL`
  - PNG Drive ID: `1EqKmGXnv684cwFuB4SIbMZScxtVLnI2U`
- [x] 13. 写真キャプション飾り
  - source: `rurubu_13_photo_caption_ornament.svg`
  - export: `rurubu_13_photo_caption_ornament.png`
  - status: `CURRENT_CANDIDATE / VECTOR_SOURCE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `1600x600; RGBA; real alpha present; blank caption area; no embedded text; no people`
  - SVG Drive ID: `1KiSsaq-1PA6CHGdnDBJdMLIQ_Wfjmd4i`
  - PNG Drive ID: `1b6qFyaaNinIqtn_btVJwUdL71hFctF2I`
- [x] 14. 小さな特集スタンプ各種
  - status: `CURRENT_CANDIDATE / VECTOR_SOURCE / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - QA: `3 independent 800x800 stamps; RGBA; real alpha present; no text; no people`
  - star source/export: `rurubu_14a_feature_stamp_star.svg` / `rurubu_14a_feature_stamp_star.png`
    - SVG Drive ID: `1eAYyPm0KLh6MlYp9J_3pqkXe9nsDvppb`
    - PNG Drive ID: `1wmbAlnSmRG9nOIYBtQOODSsHMnTUHygn`
  - airplane source/export: `rurubu_14b_feature_stamp_airplane.svg` / `rurubu_14b_feature_stamp_airplane.png`
    - SVG Drive ID: `1JpcCIsfeQO4e221jHfkajectG7_10s-o`
    - PNG Drive ID: `1YTnlqy5C-I6BM99OR76LstI3jjYDKLIa`
  - heart source/export: `rurubu_14c_feature_stamp_heart.svg` / `rurubu_14c_feature_stamp_heart.png`
    - SVG Drive ID: `1zmXb0t8UOxY6bNySt36-SoogQonKgHhw`
    - PNG Drive ID: `1sT9wzLtzdF-3J_K1-zfGMl51y8cCy-Nj`

## Alpha QA — logo batch
- A: 1448x465 after crop; real alpha present; suspicious visible green pixels = 0
- B: 1493x974 after crop; real alpha present; suspicious visible green pixels = 0
- C: 1303x1024 after crop; real alpha present; suspicious visible green pixels = 0

## Alpha QA — fixed decoration batch
- Date badge `2026.10.24 SAT`: 1336x843 after crop; real alpha present; suspicious visible green pixels = 0
- `PICK UP!`: 1212x998 after crop; real alpha present; suspicious visible green pixels = 0
- `CHECK!`: 1073x948 after crop; real alpha present; suspicious visible green pixels = 0
- `BEST SHOT`: 1142x943 after crop; real alpha present; suspicious visible green pixels = 0
- Scrapbook photo frame: 1600x1200; SVG source + RGBA PNG export; transparent center verified
- Masking tape: 1400x500; SVG source + RGBA PNG export
- Travel route/airplane/heart: 1500x800; SVG source + RGBA PNG export
- Map pin: 900x1100; SVG source + RGBA PNG export
- Small travel icons: 1800x520; SVG source + RGBA PNG export
- Photo caption ornament: 1600x600; SVG source + RGBA PNG export
- Feature stamps: 3 independent 800x800 SVG/PNG pairs

The three logos are independent files. No production asset sheet is used. `#12` is an intentional icon-row set because the queue item itself is a set; `#14` remains three independent stamp files.

## Promotion boundary
These are current visual candidates, not the final selected masthead. Final choice happens after same-condition placement in the production Figma layout and visual/print-scale QA.