# WEDDING PASSPORT — seating card corner refinement QA

Date: 2026-08-05

## Current authority checked

- GitHub `main` before Figma write: `016711e1adaab574a4767ab4924dce4b7d3fa455`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `02_INSIDE`
- Production frame: `18:131 / FRAME_SEATING`
- Drive canonical folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- RURUBU / るるぶ-specific files, pages, assets, and records were not read or changed.

## Visible problem

After the prior removal of unexplained color coding and alternating fills, all 11 table blocks still used a `20 px` corner radius. At the live 1480 × 2100 page scale, this made the chart read as a repeated rounded-card UI rather than a restrained printed directory/map. The repeated high-radius geometry was especially visible because every block had the same size, stroke, fill, and spacing.

## Rollback-safe proof

A production duplicate was created on `99_QA` before editing production:

- `52:2 / QA_SEATING_RESTRAINED_CARD_CORNERS_PROOF_2026_08_05`

Within the proof, the 11 `GROUP_TABLE_01`–`GROUP_TABLE_11` frames were changed from `cornerRadius=20` to `cornerRadius=4`. No table frames, text, strokes, fills, hidden rollback shapes, or placeholders were deleted.

The proof screenshot showed that the lower radius:

- reduced the app-card / AI-layout impression;
- made the table blocks read more like printed chart cells;
- preserved separation, hierarchy, and scanability;
- introduced no clipping, overlap, or missing content.

## Production change

Changed only the following existing production nodes:

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

For all 11 nodes:

- `cornerRadius: 20 -> 4`

No text, position, size, fill, stroke, semantic name, or parent relationship changed.

## Readback QA

- Production frame remains `1480 × 2100`.
- `clipsContent=true` remains unchanged.
- 11 table frames remain present.
- All 11 table frames read back with `cornerRadius=4`.
- Native editable text count remains `38`.
- The 11 previously hidden `TABLE_##_SHAPE` rollback nodes remain present and hidden.
- The head-table block was not included in the verified production change; its live corner value remains unchanged.
- Production screenshot after write shows no clipping, overlap, missing labels, or new rendering artifacts.

## Drive impact

No Drive file was created, replaced, or regenerated. The defect was confined to Figma-native frame geometry, so asset regeneration was not justified.

## Status

`LIVE_VISUAL_FIX_APPLIED / REPEATED_CARD_UI_REDUCED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blockers include final guest names, final table assignment, actual venue geometry, printer template, bleed/safe/fold specification, 100% physical proof, and final PDF preflight.
