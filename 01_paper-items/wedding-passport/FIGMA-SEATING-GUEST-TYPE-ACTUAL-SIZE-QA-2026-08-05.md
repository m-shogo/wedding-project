# WEDDING PASSPORT — Seating guest-type actual-size QA

Date: 2026-08-05
Current authority before write: `main@132f1dd869f584ec5bf26087f9309fbf8bef0f0b`

## Scope

- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production page: `02_INSIDE`
- Production frame: `18:131 / FRAME_SEATING`
- Rollback proof: `57:2 / QA_SEATING_GUEST_TYPE_ACTUAL_SIZE_PROOF_2026_08_05`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Evidence-defined problem

The live production frame used 22 px guest names with a 24 px line height inside 280 px-tall table panels. At the current approximately 10 px/mm production scale, the guest type was only about 6.2 pt in print. This preserved eight-line capacity but remained below a comfortable reading size for a seating chart.

## Verified proof

A rollback-safe duplicate was created on `99_QA` before production mutation. The proof increased each of the 11 table panels from 280 px to 300 px and changed the native guest-name text to 24 px with a 26 px line height at y=72. The proof screenshot retained all table labels, zones, guest placeholders, borders and the final-data disclaimer without clipping or overlap.

## Production changes

Applied to all 11 `GROUP_TABLE_##` frames:

- height: `280 → 300 px`

Applied to all 11 native `TABLE_##_GUESTS` text nodes:

- font size: `22 → 24 px`
- line height: `24 → 26 px`
- y: `76 → 72 px`

Applied to `SEATING_FOOTNOTE`:

- y: `1970 → 1990 px`

No nodes were deleted, flattened or converted to images. Semantic names, native editable text, table positions, table widths, zones, labels, fills, strokes and parent structure were preserved.

## Screenshot and structure QA

- Whole-item screenshot: PASS
- Reading-scale hierarchy: PASS
- Existing three-line placeholders: PASS
- Eight-line capacity contract: retained by the 300 px panel height and 26 px line-height geometry
- Clipping or overlap: none observed
- Production frame: `1480 × 2100`, `clipsContent=true`
- Rollback evidence: proof `57:2` retained on `99_QA`

## Drive

No Drive files were changed or regenerated. The issue was native Figma typography and geometry only.

## Status

`LIVE_VISUAL_FIX_APPLIED / GUEST_TYPE_LEGIBILITY_IMPROVED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blocks include confirmed guest names, final table allocation, actual venue geometry, printer template, bleed/safe-area/fold specification, 100% physical proof and final PDF preflight.
