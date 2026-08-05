# WEDDING PASSPORT — Unverified seating-zone label suppression QA

Date: 2026-08-05
Current authority before write: `main@065485caf8860825f2dbb4fad22ac20459002092`

## Scope

- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production page: `02_INSIDE`
- Production frame: `18:131 / FRAME_SEATING`
- Production nodes: `21:32–21:42 / TABLE_01_ZONE–TABLE_11_ZONE`
- Rollback proof: `59:2 / QA_SEATING_HIDE_UNVERIFIED_ZONES_PROOF_2026_08_05`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Evidence-defined problem

The live seating chart displayed `ZONE A–D` on all 11 tables. The same live frame explicitly states that final names and actual room geometry will replace the proof layout, and no confirmed venue-zone definition or legend was present in the live design or current authority record. Keeping the zone labels visible therefore presented an unconfirmed spatial classification as if it were real guest information. It also added repeated secondary labels that competed with table numbers without helping a guest navigate a confirmed room plan.

This is a data-trust issue rather than a typography issue: improving the size or alignment of an unverified label cannot make the underlying information valid.

## Verified proof

A rollback-safe duplicate was created on `99_QA` before production mutation:

- `59:2 / QA_SEATING_HIDE_UNVERIFIED_ZONES_PROOF_2026_08_05`

Only the 11 existing native zone text nodes were hidden in the proof. Their text content, semantic names, font settings, positions and parent relationships were preserved.

Proof screenshot QA confirmed:

- the table-number hierarchy remains clear without `ZONE A–D`
- guest-name areas are unchanged
- all 11 table cards, the head table, title, rule, watermark and footnote remain visible
- no clipping, overlap or new artifact was introduced
- the page no longer implies an unconfirmed venue zoning system

## Production changes

Applied to `21:32–21:42 / TABLE_01_ZONE–TABLE_11_ZONE`:

- `visible: true → false`

No node was deleted, flattened, renamed, converted to an image, moved or resized. The native editable text values `ZONE A–D` remain available for rollback or later replacement if a confirmed venue zoning plan is supplied.

## Screenshot and structure QA

- Whole-item screenshot after production write: PASS
- Repeated unverified classification removed: PASS
- Production frame: `1480 × 2100`, `clipsContent=true`
- Native text count: `38` preserved
- Guest-table frame count: `11` preserved
- Zone node count: `11` preserved
- Visible zone node count: `0`
- Existing orbit nodes: `18` preserved and hidden
- Existing final-data footnote: preserved
- Rollback evidence: proof `59:2` retained on `99_QA`

## Drive

The Drive authority folder was read back before editing. No Drive file was changed or regenerated because the defect involved unconfirmed native Figma text only.

## Status

`LIVE_VISUAL_FIX_APPLIED / UNVERIFIED_ZONE_LABELS_SUPPRESSED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blocks include confirmed guest names, final table allocation, actual venue geometry, any verified navigation grouping, printer template, bleed/safe-area/fold specification, 100% physical proof and final PDF preflight.
