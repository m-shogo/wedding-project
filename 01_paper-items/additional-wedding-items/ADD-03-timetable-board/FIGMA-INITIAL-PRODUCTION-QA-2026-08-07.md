# ADD-03 当日タイムテーブルボード — Figma initial production QA

Date: 2026-08-07
Authority checked before write: GitHub `main@9182dd665db3195b564096001c003b03f6ad1955`

## Live authorities

- Figma file: `ADD-03_TIMETABLE_BOARD_2026-10-24`
- Figma file key: `woFUHUqZcvNkih8o42xeH4`
- Production page/frame: `01_A2_PRIMARY / 1:5 / FRAME_TIMETABLE_BOARD`
- Rollback proof: `99_QA / 1:30 / QA_ADD_03_INITIAL_A2_PROOF_2026_08_07`
- Drive folder: `ADD-03_当日タイムテーブルボード`
- Drive folder ID: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`

## Production change

Created the first A2 primary production as native Figma structure rather than a raster export. Pages are `00_README`, `01_A2_PRIMARY`, `02_A3_COMPARISON`, `99_QA`.

The board uses a single vertical journey spine, with Ceremony, provisional transfer interval, and Reception in intentionally unequal hierarchy. No equal-card dashboard, fake gate/flight data, QR, or generated person imagery was introduced.

Confirmed copy is native editable text. Unconfirmed notes remain explicit semantic placeholders:

- `[CEREMONY NOTE · LAYOUT DUMMY]`
- `TBD · LAYOUT DUMMY`
- `[RECEPTION NOTE · LAYOUT DUMMY]`

## QA readback

- production frame: `1400 × 1980`
- native text nodes: 11
- visible-node overflow outside frame: 0
- `GUIDE_BLEED`, `GUIDE_TRIM`, `GUIDE_SAFE`: present and hidden
- semantic event groups and route nodes: present
- screenshot captured at 1400 × 1980 (maxDimension 2400)
- rollback proof exists before subsequent refinement
- no flattening or rasterized variable information
- Drive production files changed: none, intentionally; dummy/TBD exports are not production authority

## Status

`FIGMA_INITIAL_PRODUCTION_CREATED / WHOLE_ITEM_SCREENSHOT_CAPTURED / STRUCTURE_QA_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / PLACEHOLDERS_EXPLICIT / NOT_PRINT_READY`

## DEFERRED_FINALIZATION

- final transfer/activity label
- final ceremony/reception explanatory notes
- installation-size decision A2 vs A3
- printer template / exact bleed and safe-area override
- 100% physical proof and venue-distance readability check

These do not block continued design QA or progression once major visual/structural defects are closed.
