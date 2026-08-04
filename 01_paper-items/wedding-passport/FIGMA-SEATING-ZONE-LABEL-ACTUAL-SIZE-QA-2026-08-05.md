# WEDDING PASSPORT — seating zone-label actual-size QA

Date: 2026-08-05
Current authority at start: `main@2fe0166868ec912b19515499a57901a0b80664a9`

## Scope

- Item: WEDDING PASSPORT
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `02_INSIDE`
- Production frame: `18:131 / FRAME_SEATING`
- QA proof: `55:2 / QA_SEATING_ZONE_LABEL_ACTUAL_SIZE_PROOF_2026_08_05`
- RURUBU/るるぶ scope: not read or modified

## Evidence and problem

The production seating frame is `1480 × 2100`, corresponding to the established A5-like 10 px/mm working scale. The eleven `ZONE A–D` labels were native Noto Sans JP Bold text at 16 px, approximately 4.5 pt at that scale. They were visibly weaker than the table labels and too close to microcopy size for dependable print reading.

The change was limited to the eleven semantic `TABLE_##_ZONE` text nodes. No guest names, table numbers, card geometry, fills, strokes, or room-layout placeholders were changed.

## Rollback-safe QA proof

A full production duplicate was created on `99_QA`:

- `55:2 / QA_SEATING_ZONE_LABEL_ACTUAL_SIZE_PROOF_2026_08_05`

Proof changes:

- font size: `16 px → 20 px`
- width: `110 px → 120 px`
- position: `x 250 → 240`, `y 31 → 29`

The proof screenshot confirmed that all eleven zone labels remained inside their headers, did not collide with `TABLE ##`, and preserved the existing hierarchy.

## Production change

Applied to eleven native editable text nodes:

- `21:32` through `21:42`
- semantic names: `TABLE_01_ZONE` through `TABLE_11_ZONE`

No deletion, flattening, rasterization, asset replacement, or Drive write occurred.

## Post-write screenshot QA

Confirmed on live production `18:131`:

- all eleven zone labels are visibly more legible;
- no clipping or overlap with table labels;
- card boundaries, central watermark, bride-and-groom block, guest placeholders, and final-data disclaimer remain unchanged;
- native editable text and rollback proof remain available.

## Google Drive

Live folder confirmed:

- `01_パスポート風_メニュー・ドリンク・座席表`
- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

Drive changes: none. The issue was native Figma typography, so no material regeneration or duplicate asset was justified.

## Status

`LIVE_VISUAL_FIX_APPLIED / ZONE_LABEL_LEGIBILITY_IMPROVED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blockers include final guest names and table assignment, actual room geometry, printer template and bleed/safe/fold requirements, 100% physical proof, and final PDF preflight.
