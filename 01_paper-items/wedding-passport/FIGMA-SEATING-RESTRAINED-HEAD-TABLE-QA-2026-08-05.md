# WEDDING PASSPORT — Restrained head-table hierarchy QA

Date: 2026-08-05
Current authority before write: `main@2aa1f1874d506722f4b7a0334c5039e05d5bc273`

## Scope

- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production page: `02_INSIDE`
- Production frame: `18:131 / FRAME_SEATING`
- Production nodes: `18:166 / GROUP_HEAD_TABLE`, `18:167 / TXT_HEAD_TABLE_LABEL`
- Rollback proof: `58:2 / QA_SEATING_RESTRAINED_HEAD_TABLE_PROOF_2026_08_05`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Evidence-defined problem

The live whole-item screenshot showed the dark `BRIDE & GROOM` block as a 530 × 150 px rounded panel with a 16 px radius. Its high-contrast area was disproportionately large relative to the 11 guest-table panels and retained a prominent rounded-card treatment after the guest cards had already been reduced to a 4 px radius. This made the head table read as a large UI card rather than a restrained seating-chart anchor.

## Verified proof

A rollback-safe duplicate was created on `99_QA` before production mutation. In the proof, only the existing native head-table rectangle and text position were adjusted:

- head-table height: `150 → 100 px`
- head-table y: `350 → 375 px`
- corner radius: `16 → 4 px`
- label y: `395 → 404 px`

The proof screenshot retained the navy/gold hierarchy and centered label while reducing the dominant visual mass and matching the restrained corner language used by the guest-table panels.

## Production changes

Applied to `18:166 / GROUP_HEAD_TABLE`:

- size: `530 × 150 → 530 × 100 px`
- y: `350 → 375 px`
- corner radius: `16 → 4 px`

Applied to `18:167 / TXT_HEAD_TABLE_LABEL`:

- y: `395 → 404 px`

No nodes were deleted, flattened, renamed or converted to images. Native editable text, fills, strokes, width, semantic names, guest tables and parent structure were preserved.

## Screenshot and structure QA

- Whole-item screenshot: PASS
- Reading-scale hierarchy: PASS
- Head-table label contrast and centering: PASS
- Guest-table positions and content: unchanged
- Clipping or overlap: none observed
- Production frame: `1480 × 2100`, `clipsContent=true`
- Native text count: `38`
- Guest-table frame count: `11`
- Rollback evidence: proof `58:2` retained on `99_QA`

## Drive

Drive authority metadata was read back. No Drive files were changed or regenerated because the issue was native Figma geometry only.

## Status

`LIVE_VISUAL_FIX_APPLIED / HEAD_TABLE_HIERARCHY_RESTRAINED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blocks include confirmed guest names, final table allocation, actual venue geometry, printer template, bleed/safe-area/fold specification, 100% physical proof and final PDF preflight.
