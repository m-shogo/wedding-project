# WEDDING PASSPORT — Semantic seating guest placeholders QA

Date: 2026-08-05
Current authority before write: `main@b254c0d96caa2599049929d7e64a45448db12f4e`

## Scope

- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production page: `02_INSIDE`
- Production frame: `18:131 / FRAME_SEATING`
- Production guest nodes: `18:171, 18:175, 18:179, 18:183, 18:187, 18:191, 18:195, 18:199, 18:203, 18:207, 18:211`
- Rollback proof: `61:2 / QA_SEATING_SEMANTIC_PLACEHOLDERS_PROOF_2026_08_05`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Evidence-defined problem

The live proof layout used realistic-looking personal names such as `AKIRA`, `YUKI`, `HARUKA`, `KANA`, `MEGUMI`, and `MOMO`, plus category-like values such as `FAMILY`, `FRIENDS`, and `GUESTS`. No source in current authority identifies these as confirmed attendees. Although a footer stated that final names would replace the proof layout, the visible names themselves could still be mistaken for real guest data, copied into downstream exports, or survive a later edit by omission.

This conflicted with the project rule that unconfirmed guest and family information must remain explicit placeholders rather than plausible fabricated facts.

## Rollback-safe proof

A duplicate of production was created on `99_QA` before the production mutation:

- `61:2 / QA_SEATING_SEMANTIC_PLACEHOLDERS_PROOF_2026_08_05`

Only the 11 existing native guest text values were changed. Node names, positions, dimensions, font settings, table labels, parent relationships and editability were preserved.

Proof screenshot QA confirmed:

- all 11 table cards remain present
- each guest field is visibly non-factual and sequentially identifiable
- no clipping, overlap, missing line or card overflow was introduced
- table-number hierarchy, head table, watermark and final-data footnote remain intact
- the proof cannot reasonably be mistaken for a confirmed attendee list

## Production changes

The following native text values replaced the realistic-looking names:

- TABLE 01: `GUEST NAME 01–03`
- TABLE 02: `GUEST NAME 04–06`
- TABLE 03: `GUEST NAME 07–09`
- TABLE 04: `GUEST NAME 10–12`
- TABLE 05: `GUEST NAME 13–15`
- TABLE 06: `GUEST NAME 16–18`
- TABLE 07: `GUEST NAME 19–21`
- TABLE 08: `GUEST NAME 22–24`
- TABLE 09: `GUEST NAME 25–27`
- TABLE 10: `GUEST NAME 28–30`
- TABLE 11: `GUEST NAME 31–33`

No node was deleted, flattened, renamed, converted to an image, moved, resized or reparented. All variable guest content remains native editable text.

## Screenshot and structure QA

- Whole-item screenshot after production write: PASS
- Native text count: `38` preserved
- Guest text node count: `11` preserved
- Guest text font size: `24px` preserved
- Guest text auto-resize: `HEIGHT` preserved
- Production frame: `1480 × 2100`, `clipsContent=true`
- Zone nodes: `11` preserved, visible count `0`
- Non-semantic realistic guest-name values remaining in guest nodes: `0`
- Rollback evidence: proof `61:2` retained on `99_QA`

## Drive

The Drive authority folder was read back before editing. No Drive file was changed or regenerated because the defect involved native Figma placeholder text only.

## Status

`LIVE_VISUAL_FIX_APPLIED / SEMANTIC_GUEST_PLACEHOLDERS_ENFORCED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blocks include confirmed guest names, final table allocation, actual venue geometry, printer template, bleed/safe-area/fold specification, 100% physical proof and final PDF preflight.
