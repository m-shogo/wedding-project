# WEDDING PASSPORT — SEATING unexplained alternating-fill removal QA

Date: 2026-08-05
Current authority before write: `main@c5b96e0e207a1c271b60421e8f333fec21d41207`

## Scope

- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `02_INSIDE`
- Production frame: `18:131 / FRAME_SEATING`
- Protected area: RURUBU/るるぶ was not read or written.

## Problem evidence

The live production screenshot showed the 11 seating cards alternating between two pale fills:

- cream `#FBF6E3`
- cool gray-green `#F5F7F2`

The alternation did not correspond to `ZONE A–D`, table theme, guest type, room area, or any legend. After the previous removal of the red/blue/gold table markers, this remaining alternation still implied an unexplained classification and weakened the seating hierarchy.

## Rollback-safe proof

Created on `99_QA`:

- `51:2 / QA_SEATING_UNIFIED_CARD_FILL_PROOF_2026_08_05`
- Position: `x=13480, y=0`

Only the 11 duplicated `GROUP_TABLE_01–11` frame fills were changed to the existing cream fill `#FBF6E3`. All text, geometry, borders, hidden marker nodes, zones, and proof placeholders were preserved.

## Production change

Updated these existing production nodes only:

- `18:168 / GROUP_TABLE_01`
- `18:172 / GROUP_TABLE_02`
- `18:176 / GROUP_TABLE_03`
- `18:180 / GROUP_TABLE_04`
- `18:184 / GROUP_TABLE_05`
- `18:188 / GROUP_TABLE_06`
- `18:192 / GROUP_TABLE_07`
- `18:196 / GROUP_TABLE_08`
- `18:200 / GROUP_TABLE_09`
- `18:204 / GROUP_TABLE_10`
- `18:208 / GROUP_TABLE_11`

Change:

- all table-card fills unified to `#FBF6E3`

No nodes were deleted, flattened, rasterized, renamed, moved, or resized. Native text remained editable.

## Screenshot QA

Production screenshot after the change confirmed:

- the unexplained checkerboard/alternating-card effect is removed;
- `ZONE A–D` remains the only explicit grouping system;
- all 11 table cards remain distinct through gold borders and spacing;
- `BRIDE & GROOM`, title hierarchy, central watermark, and proof footnote are unchanged;
- no clipping, missing text, overlap, or new visual artifact was introduced.

## Structural readback

- production frame: `1480 × 2100`
- `clipsContent=true`
- table frames: `11`
- native text nodes: `38`
- all 11 table fills read back as the same solid RGB equivalent of `#FBF6E3`
- all 11 legacy `TABLE_XX_SHAPE` nodes remain present and `visible=false` for rollback

## Drive

Live Drive folder confirmed:

- `01_パスポート風_メニュー・ドリンク・座席表`
- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

Drive change: none. The defect was confined to Figma-native frame fills; no asset regeneration or duplicate file creation was justified.

## Status

`LIVE_VISUAL_FIX_APPLIED / UNEXPLAINED_ALTERNATING_FILL_REMOVED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blockers:

- confirmed guest names and long-name final stress test;
- final table assignment and actual room geometry;
- printer template, bleed, safe area, fold specification, and minimum reproducible line/text rules;
- 100% physical proof print and final PDF preflight.
