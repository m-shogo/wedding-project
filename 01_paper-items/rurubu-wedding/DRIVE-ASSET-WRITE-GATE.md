# るるぶWEDDING — Drive Asset Write Gate

Status: `CURRENT_WORKFLOW_RULE`
Current authority: GitHub `main`
Updated: 2026-07-31

## Purpose

PNG固定装飾をGoogle Driveへ保存する際、同名・同内容ファイルの重複を作らないための強制ゲート。

## Pre-upload gate

新しいPNGをDriveへアップロードする前に、必ず次を実行する。

1. `IMAGE-GENERATION-QUEUE.md` をmainから再取得する。
2. 対象ファイル名を、正規Rurubu asset folder内でDrive検索する。
3. 同名候補が0件なら新規uploadへ進む。
4. 同名候補が1件以上ある場合は、**即uploadしない**。
5. 既存候補が今回のCurrent candidateと同一内容なら、その既存Drive IDを再利用する。
6. 内容が異なる場合のみ、明確な新version名で新規保存する。既存Currentは上書きしない。

## Post-upload verification

新規uploadした場合は必ず:

1. Drive検索で対象名を読み返す。
2. expected parent folder内にあることを確認する。
3. 同じCurrent filenameが複数件になっていないことを確認する。
4. queueへ記録するDrive IDは1件だけにする。
5. 重複を誤って作った場合、内容を確認して不要な新規重複だけを削除してからGit更新する。

## Current dedupe incident — 2026-07-31

#8〜#14 PNG-only Current候補は既にDrive保存済みだったが、再uploadにより同名重複を一時的に9件増やした。

- #8の新旧をraw fetchし、SHA-256 `b1837ab11dbbb1cd21f7ef0505f377e7b01520679d8e2f4d3c94323c0ce2b287` で同一内容を確認。
- 今回追加した重複9件は削除。
- 正規folderを再検索し、#8〜#14のPNG-only Current候補が各1件だけ残っていることを確認。
- `IMAGE-GENERATION-QUEUE.md` に記録済みの旧Drive IDをCurrentとして維持。

## Current canonical PNG-only Drive IDs

- #8 `rurubu_08_scrapbook_photo_frame_pngonly_v1.png` — `1InvEJp5UID7_x2gU3cvEbGzeF6G18WC4`
- #9 `rurubu_09_masking_tape_pngonly_v2.png` — `1Svo5Degcq2sRXsxBX2H-xJIM90xOMF-9`
- #10 `rurubu_10_travel_route_airplane_heart_pngonly_v1.png` — `18jk-uwgCeCv9vJyKjjy7q4yVQT2Fw_A0`
- #11 `rurubu_11_map_pin_pngonly_v2.png` — `1DrTPSDeb7mfmIF6_WTL14NJY8DbLTNnc`
- #12 `rurubu_12_small_travel_icons_pngonly_v2.png` — `1Q0E0TuTfIXfckpDpFxWKtkClmskZQv6u`
- #13 `rurubu_13_photo_caption_ornament_pngonly_v1.png` — `1h99j9EiZ-3yRnBoMMYCYuxBRvjzWX3fx`
- #14a `rurubu_14a_feature_stamp_star_pngonly_v1.png` — `1TiR8B1hX1PW1AlMkSDVMkF9T4aMOkNno`
- #14b `rurubu_14b_feature_stamp_airplane_pngonly_v1.png` — `1AOQmOqSEPmzpyUARzetEvic6H6Q6Spu1`
- #14c `rurubu_14c_feature_stamp_heart_pngonly_v1.png` — `1GoMtMrf-EGseg6YcKBK_CGK0-sQFUadJ`

## Non-negotiable

`upload first, search later` を禁止する。必ず `search first, upload only if needed`。
