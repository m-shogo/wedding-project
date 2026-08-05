# WEDDING PASSPORT — MENU ring-pattern full removal QA

Date: 2026-08-05
Current authority at write check: `main@256e6e2c0d40b0a06ea380fe1c82e1e20aa3a8b9`

## Scope

- Item: WEDDING PASSPORT
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production page/frame: `02_INSIDE / 18:90 / FRAME_MENU_DRINK`
- Drive canonical folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- RURUBU/るるぶ item-specific state was not read or modified.

## Observed issue

The previous refinement reduced the decorative concentric-ring pattern from eight visible rings to three. The remaining three rings still had no semantic relationship to the course count, beverage categories, trim/fold guides, or other print information. In the live whole-item screenshot they formed a target-like motif behind the menu copy and continued to introduce avoidable visual noise and an AI/mechanical-decoration impression.

## Rollback-safe proof

A production duplicate was created in `99_QA` before the production write:

- `66:2 / QA_MENU_RING_PATTERN_REMOVAL_PROOF_2026_08_05`

All eight retained ring nodes were hidden on the proof. The screenshot confirmed that removing the remaining visible rings preserved the two-column hierarchy, copy readability, visa panel, dividers, titles, folio, and footer note without clipping or a new artifact.

## Production change

The following existing nodes were preserved and set to `visible=false`:

- `18:95 / BG_PATTERN_RING_80`
- `18:96 / BG_PATTERN_RING_125`
- `18:97 / BG_PATTERN_RING_170`
- `18:98 / BG_PATTERN_RING_215`
- `18:99 / BG_PATTERN_RING_260`
- `18:100 / BG_PATTERN_RING_305`
- `18:101 / BG_PATTERN_RING_350`
- `18:102 / BG_PATTERN_RING_395`

No node was deleted, flattened, rasterized, renamed, moved, or resized. Menu and drink copy remain native editable text.

## QA readback

- Production frame: `1480 × 2100`
- `clipsContent=true`
- Ring nodes retained: 8
- Visible ring nodes after write: 0
- Native text nodes retained: 12
- `MENU_VISA_PANEL` remains visible and unchanged
- Whole-item screenshot: no clipping, overlap, missing copy, or new visual artifact

## Drive

No Drive file or asset was changed. The defect existed only in Figma-native decoration, and no concrete defect was found in the canonical Drive assets.

## Status

`LIVE_VISUAL_FIX_APPLIED / MEANINGLESS_RING_PATTERN_REMOVED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

## Remaining blockers

- Confirmed venue menu and actual course count
- Confirmed beverage list
- Allergy-note policy
- Final decision on whether the decorative VISA panel and English footer remain in the print version
- Printer template, bleed, safe area, and fold specification
- 100% actual-size test print
- Final PDF preflight and placeholder-removal gate
