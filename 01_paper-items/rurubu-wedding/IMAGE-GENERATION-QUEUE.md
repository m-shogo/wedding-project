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
- [x] 9. マスキングテープ風装飾
  - file: `rurubu_09_masking_tape_pngonly_v2.png`
  - status: `CURRENT_CANDIDATE / RASTER_NATIVE / PNG_ONLY / VISUAL_QA_PASS / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - production method: `direct raster PNG via Pillow; clipped printed pattern; no SVG`
  - QA: `1438x279; RGBA; real alpha; one torn-edge tape strip; no text; no people; v1 rejected because cream stripes escaped tape bounds`
  - Drive ID: `1Svo5Degcq2sRXsxBX2H-xJIM90xOMF-9`
  - Drive URL: https://drive.google.com/file/d/1Svo5Degcq2sRXsxBX2H-xJIM90xOMF-9/view
  - previous PNG: `rurubu_09_masking_tape.png` / Drive ID `1an7z2OToMkvKHmNLTtr5sIKmHHYZ7NQA` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_09_masking_tape.svg` / Drive ID `1vX9CKoiFRGlAhmh8FAKsYSFbvLmw25FG` / `NON_PRODUCTION / DO_NOT_USE`
- [x] 10. 旅ルート + 飛行機 + ハート装飾
  - file: `rurubu_10_travel_route_airplane_heart_pngonly_v1.png`
  - status: `CURRENT_CANDIDATE / RASTER_NATIVE / PNG_ONLY / VISUAL_QA_PASS / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - production method: `direct raster PNG via Pillow; dotted route + paper-cut airplane + heart; no SVG`
  - QA: `1535x431; RGBA; alpha range 0..255; one composite travel-route decoration; no text; no people`
  - Drive ID: `18jk-uwgCeCv9vJyKjjy7q4yVQT2Fw_A0`
  - Drive URL: https://drive.google.com/file/d/18jk-uwgCeCv9vJyKjjy7q4yVQT2Fw_A0/view
  - previous PNG: `rurubu_10_travel_route_airplane_heart.png` / Drive ID `1olSQtZpIBXLPm1gvNJ5zuwwvS-7Ie1GO` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_10_travel_route_airplane_heart.svg` / Drive ID `1m3gdS-v02dh9w7LcvEyM22P3IqbAvcaA` / `NON_PRODUCTION / DO_NOT_USE`
- [x] 11. 地図ピン装飾
  - file: `rurubu_11_map_pin_pngonly_v2.png`
  - status: `CURRENT_CANDIDATE / RASTER_NATIVE / PNG_ONLY / VISUAL_QA_PASS / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - production method: `direct raster PNG via Pillow; layered paper pin with heart marker; no SVG`
  - QA: `567x976; RGBA; alpha range 0..255; one isolated map pin; no text; no people; v1 rejected for crossed/invalid white outline geometry`
  - Drive ID: `1DrTPSDeb7mfmIF6_WTL14NJY8DbLTNnc`
  - Drive URL: https://drive.google.com/file/d/1DrTPSDeb7mfmIF6_WTL14NJY8DbLTNnc/view
  - previous PNG: `rurubu_11_map_pin.png` / Drive ID `1kJT3s_4ty4LZjji0aIv4XzbzrLUdrfz7` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_11_map_pin.svg` / Drive ID `1qpljWdOq5-SehAvLtjPSw5BDRnW1J7rf` / `NON_PRODUCTION / DO_NOT_USE`
- [x] 12. 小さな旅アイコンセット
  - file: `rurubu_12_small_travel_icons_pngonly_v2.png`
  - status: `CURRENT_CANDIDATE / RASTER_NATIVE / PNG_ONLY / VISUAL_QA_PASS / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - production method: `direct raster PNG via Pillow; six handmade paper-cut travel icons; no SVG`
  - QA: `1952x281; RGBA; alpha range 0..255; 6 intentional icons; no text; no people; v1 rejected as visually too clean/vector-like, v2 adds torn paper edge, grain and shadow`
  - Drive ID: `1Q0E0TuTfIXfckpDpFxWKtkClmskZQv6u`
  - Drive URL: https://drive.google.com/file/d/1Q0E0TuTfIXfckpDpFxWKtkClmskZQv6u/view
  - previous PNG: `rurubu_12_small_travel_icons.png` / Drive ID `1EqKmGXnv684cwFuB4SIbMZScxtVLnI2U` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_12_small_travel_icons.svg` / Drive ID `1mj_fAKcHgjxx2d0d6yce9DA_JQ_WnecL` / `NON_PRODUCTION / DO_NOT_USE`
- [x] 13. 写真キャプション飾り
  - file: `rurubu_13_photo_caption_ornament_pngonly_v1.png`
  - status: `CURRENT_CANDIDATE / RASTER_NATIVE / PNG_ONLY / VISUAL_QA_PASS / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - production method: `direct raster PNG via Pillow; blank torn-paper caption label with tape accents; no SVG`
  - QA: `1488x411; RGBA; alpha range 0..255; blank center reserved for Figma text; no embedded text; no people`
  - Drive ID: `1h99j9EiZ-3yRnBoMMYCYuxBRvjzWX3fx`
  - Drive URL: https://drive.google.com/file/d/1h99j9EiZ-3yRnBoMMYCYuxBRvjzWX3fx/view
  - previous PNG: `rurubu_13_photo_caption_ornament.png` / Drive ID `1b6qFyaaNinIqtn_btVJwUdL71hFctF2I` / `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
  - historical SVG: `rurubu_13_photo_caption_ornament.svg` / Drive ID `1KiSsaq-1PA6CHGdnDBJdMLIQ_Wfjmd4i` / `NON_PRODUCTION / DO_NOT_USE`
- [x] 14. 小さな特集スタンプ各種
  - status: `CURRENT_CANDIDATE / RASTER_NATIVE / PNG_ONLY / VISUAL_QA_PASS / ALPHA_VERIFIED / DRIVE_VERIFIED`
  - production method: `3 independent direct-raster PNG files via Pillow; torn-paper stamp texture; no SVG`
  - QA: `star 716x712; airplane 717x715; heart 717x714; all RGBA; alpha range 0..255; no text; no people`
  - star PNG: `rurubu_14a_feature_stamp_star_pngonly_v1.png` / Drive ID `1TiR8B1hX1PW1AlMkSDVMkF9T4aMOkNno`
  - airplane PNG: `rurubu_14b_feature_stamp_airplane_pngonly_v1.png` / Drive ID `1AOQmOqSEPmzpyUARzetEvic6H6Q6Spu1`
  - heart PNG: `rurubu_14c_feature_stamp_heart_pngonly_v1.png` / Drive ID `1GoMtMrf-EGseg6YcKBK_CGK0-sQFUadJ`
  - previous SVG-derived PNGs: star `1wmbAlnSmRG9nOIYBtQOODSsHMnTUHygn`, airplane `1YTnlqy5C-I6BM99OR76LstI3jjYDKLIa`, heart `1sT9wzLtzdF-3J_K1-zfGMl51y8cCy-Nj` / all `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`
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
- Masking tape #9: 1438x279; direct-raster transparent PNG; printed pattern clipped to tape bounds; no SVG used
- Travel route #10: 1535x431; direct-raster transparent PNG; dotted route + airplane + heart; no SVG used
- Map pin #11: 567x976; direct-raster transparent PNG; clean paper-cut silhouette + heart center; no SVG used
- Small travel icons #12: 1952x281; direct-raster transparent PNG; 6 handmade paper-cut icons; no SVG used
- Photo caption ornament #13: 1488x411; direct-raster transparent PNG; blank label center; no SVG used
- Feature stamps #14: 3 independent direct-raster transparent PNGs; torn-paper stamp texture; no SVG used

## Rework boundary
- **#8〜#14 PNG-only rework COMPLETE.** Historical SVG-derived versions remain non-current and must not be restored.
- Current queue #1〜#14 is complete again.
- Do not create more fixed decorative assets unless a concrete Figma layout problem requires one.

## Promotion boundary
#1〜#14 are current visual candidates, not final production selections. Final choice happens after production Figma same-condition placement, real-photo fit, visual QA and print-scale QA.