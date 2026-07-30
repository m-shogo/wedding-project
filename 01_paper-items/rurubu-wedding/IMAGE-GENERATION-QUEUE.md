# るるぶWEDDING — Image Generation Queue

Updated: 2026-07-30
Current authority: GitHub `main`

## Workflow
1. 1素材 = 1画像で生成/制作
2. 明らかに採用可能かQA
3. 透過が必要な固定装飾は transparent PNG を正本とする。AI生成素材は必要に応じて green screen -> Python chroma key -> alpha QA
4. Google Driveへ実ファイル保存
5. Drive上で存在確認
6. このリストを更新
7. Gitへ記録
8. 次の素材へ

装飾のないタイトル・本文・見出し・ラベルは画像化せずFigma native textで作る。

## Format policy — SVG PROHIBITED
- **SVGは禁止。るるぶWEDDINGでは今後SVGを新規制作・採用・Figma配置・Current昇格しない。**
- 固定装飾の正本形式は **透過PNG**。
- PNGは実alpha channelを必須とし、checkerboardや背景色が焼き付いたものは `REJECTED`。
- 過去に制作済みのSVGは履歴としてDriveに残っていてもよいが、すべて `HISTORICAL / NON_PRODUCTION / DO_NOT_USE` と扱う。
- **過去SVGから書き出したPNG #8〜#14もCurrentから降格。見た目が良くなかったため再制作必須。** alpha QAに通っていても採用根拠にはしない。
- 新規PNGは「るるぶ風旅行誌の楽しさ・手作り感・印刷時の見栄え」を視覚QAし、単に幾何学的に整っているだけの素材は採用しない。

## Hard generation gate
- 画像生成直前に必ずこの `main` のキューを再取得し、最初の `[ ]` だけを `NEXT ASSET` とする。
- `[x]` の素材は、ユーザーが「別案」「作り直し」を明示しない限り再生成禁止。
- 生成結果が `NEXT ASSET` と一致しない場合は即 `REJECTED`。Drive保存・Git更新・`[x]`化をしない。
- 文字指定がある素材は、指定文字以外の主要文字が出たら `REJECTED`。
- 文字なし素材は、意味のある文字・単語・日付・既存バッジ文言が1つでも出たら `REJECTED`。
- 異なる素材へ進むときは、直前素材を編集・変形・流用する発想を禁止し、完全な新規単体素材として生成する。
- `進めて` は「前素材の後処理を完了し、次の未完了素材へ進む」の意味。既完了素材の再生成ではない。
- 同じ誤素材が2回連続で出た場合、その素材の生成を止め、次回生成前にこのHard generation gateとNEXT ASSET固有仕様を再固定する。
- SVG/Figma vectorへの逃げ道は使わない。固定装飾は最終的に透過PNGとして品質判断する。
- **SVG-derived旧PNGを次素材の見本として直接変形・流用しない。新規PNGとして作り直す。**

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
  - file: `rurubu_08_scrapbook_photo_frame_pngonly_v1.png`
  - status: `CURRENT_CANDIDATE / RASTER_NATIVE / PNG_ONLY / VISUAL_QA_PASS / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - production method: `direct raster PNG via Pillow; no SVG; no image-generation retry loop`
  - QA: `1528x1071; RGBA; alpha range 0..255; center/left/right photo-opening samples alpha=0; frame sample alpha=255; one isolated frame; no text; no people; no camera motif`
  - Drive ID: `1InvEJp5UID7_x2gU3cvEbGzeF6G18WC4`
  - Drive URL: https://drive.google.com/file/d/1InvEJp5UID7_x2gU3cvEbGzeF6G18WC4/view
  - historical rejected raster attempts: `745d17a5-9171-4e97-80f1-f2fcb70e374a`, `2107c552-b3ec-40b8-b444-75ba72f3542a`, `363f8330-fec1-4120-9a4c-58d55e4077a0` / all `REJECTED / NOT_SAVED_TO_DRIVE`
  - previous PNG: `rurubu_08_scrapbook_photo_frame.png` / Drive ID `1JNN1AeGpKX9A_-gB24b-kx0EG4F--YbG` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_08_scrapbook_photo_frame.svg` / Drive ID `12S8yfO2hjAIRswIERoMEIWeeI1lufEId` / `NON_PRODUCTION / DO_NOT_USE`
- [ ] 9. マスキングテープ風装飾
  - status: `REWORK_REQUIRED / PNG_REMAKE_PENDING`
  - previous PNG: `rurubu_09_masking_tape.png` / Drive ID `1an7z2OToMkvKHmNLTtr5sIKmHHYZ7NQA` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_09_masking_tape.svg` / Drive ID `1vX9CKoiFRGlAhmh8FAKsYSFbvLmw25FG` / `NON_PRODUCTION / DO_NOT_USE`
- [ ] 10. 旅ルート + 飛行機 + ハート装飾
  - status: `REWORK_REQUIRED / PNG_REMAKE_PENDING`
  - previous PNG: `rurubu_10_travel_route_airplane_heart.png` / Drive ID `1olSQtZpIBXLPm1gvNJ5zuwwvS-7Ie1GO` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_10_travel_route_airplane_heart.svg` / Drive ID `1m3gdS-v02dh9w7LcvEyM22P3IqbAvcaA` / `NON_PRODUCTION / DO_NOT_USE`
- [ ] 11. 地図ピン装飾
  - status: `REWORK_REQUIRED / PNG_REMAKE_PENDING`
  - previous PNG: `rurubu_11_map_pin.png` / Drive ID `1kJT3s_4ty4LZjji0aIv4XzbzrLUdrfz7` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_11_map_pin.svg` / Drive ID `1qpljWdOq5-SehAvLtjPSw5BDRnW1J7rf` / `NON_PRODUCTION / DO_NOT_USE`
- [ ] 12. 小さな旅アイコンセット
  - status: `REWORK_REQUIRED / PNG_REMAKE_PENDING`
  - previous PNG: `rurubu_12_small_travel_icons.png` / Drive ID `1EqKmGXnv684cwFuB4SIbMZScxtVLnI2U` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_12_small_travel_icons.svg` / Drive ID `1mj_fAKcHgjxx2d0d6yce9DA_JQ_WnecL` / `NON_PRODUCTION / DO_NOT_USE`
- [ ] 13. 写真キャプション飾り
  - status: `REWORK_REQUIRED / PNG_REMAKE_PENDING`
  - previous PNG: `rurubu_13_photo_caption_ornament.png` / Drive ID `1b6qFyaaNinIqtn_btVJwUdL71hFctF2I` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_13_photo_caption_ornament.svg` / Drive ID `1KiSsaq-1PA6CHGdnDBJdMLIQ_Wfjmd4i` / `NON_PRODUCTION / DO_NOT_USE`
- [ ] 14. 小さな特集スタンプ各種
  - status: `REWORK_REQUIRED / PNG_REMAKE_PENDING`
  - previous PNGs:
    - star `rurubu_14a_feature_stamp_star.png` / Drive ID `1wmbAlnSmRG9nOIYBtQOODSsHMnTUHygn`
    - airplane `rurubu_14b_feature_stamp_airplane.png` / Drive ID `1YTnlqy5C-I6BM99OR76LstI3jjYDKLIa`
    - heart `rurubu_14c_feature_stamp_heart.png` / Drive ID `1sT9wzLtzdF-3J_K1-zfGMl51y8cCy-Nj`
    - all `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVGs: star `1eAYyPm0KLh6MlYp9J_3pqkXe9nsDvppb`, airplane `1JpcCIsfeQO4e221jHfkajectG7_10s-o`, heart `1zmXb0t8UOxY6bNySt36-SoogQonKgHhw` / all `NON_PRODUCTION / DO_NOT_USE`

## Alpha QA — accepted current assets
- A: 1448x465 after crop; real alpha present; suspicious visible green pixels = 0
- B: 1493x974 after crop; real alpha present; suspicious visible green pixels = 0
- C: 1303x1024 after crop; real alpha present; suspicious visible green pixels = 0
- Date badge `2026.10.24 SAT`: 1336x843 after crop; real alpha present; suspicious visible green pixels = 0
- `PICK UP!`: 1212x998 after crop; real alpha present; suspicious visible green pixels = 0
- `CHECK!`: 1073x948 after crop; real alpha present; suspicious visible green pixels = 0
- `BEST SHOT`: 1142x943 after crop; real alpha present; suspicious visible green pixels = 0
- Scrapbook photo frame #8: 1528x1071; direct-raster transparent PNG; center opening verified alpha=0; no SVG used

## Rework boundary
- #8 is complete again using a new raster-native PNG; historical SVG-derived #8 remains non-current.
- 次の `NEXT ASSET` は **#9 マスキングテープ風装飾**。
- 新しい#9が視覚QA + alpha QA + Drive verifyを通るまで#10へ進まない。
- 誤生成・旧SVG由来PNGは採用しない。

## Promotion boundary
#1〜#8も最終選定ではなくcurrent visual candidates。最終choiceはproduction Figmaでのsame-condition placementとvisual/print-scale QA後に行う。