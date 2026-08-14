# WEDDING PASSPORT — Seating repeated TABLE filler removal

Date: 2026-08-14
Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / TABLE_LABEL_FILLER_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- observed latest `main` immediately before write: `db055b85cef0538b7f96d471fc72774dae558953`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- production seating: `18:131 / FRAME_SEATING`
- Drive folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Fresh visual finding

The current seating composition remained sellable overall, but fresh whole/reading/actual-size review found the same small English label `TABLE` repeated beneath all 11 table numbers. The labels did not add guest-facing information and read as repeated suite/template filler under the reopened visual standard.

The table numbers themselves remain necessary and were preserved. No guest count, guest placeholder, table assignment, header, safe-area geometry, or seating rhythm was changed.

## Rollback-safe Figma change

An exact hidden production duplicate was created before the bounded edit:

- `130:2 / ROLLBACK_SEATING_PRE_TABLE_LABEL_FILLER_REMOVAL_2026_08_14`

Production root `18:131` remained stable. Only these 11 native text nodes were hidden:

- `110:136`, `110:141`, `110:146`, `110:151`
- `110:156`, `110:161`, `110:166`, `110:171`
- `110:176`, `110:181`, `110:186`

All contain the literal text `TABLE`.

## Screenshot QA

Fresh post-write screenshots were reviewed at thumbnail, reading, and native 1480×2100 detail scale.

Result: the staggered 3-column seating directory reads more cleanly, the gold table numbers carry the hierarchy without redundant English sublabels, and the page retains its editorial rhythm without becoming sparse or ambiguous.

## Structure / seating integrity readback

Production `18:131` after the edit:

- 1480×2100
- `clipsContent=true`
- native text nodes: 41
- visible text nodes: 28
- IMAGE-fill nodes: 0
- text outside production root: 0
- all 11 `TABLE` labels: hidden
- tables 01–11 remain present
- every table guest placeholder block still contains exactly 7 entries
- total seating QA capacity remains 11 × 7 = 77 placeholders; no eighth guest was introduced
- rollback `130:2` remains hidden and intact

No flattening, raster replacement, guest-name invention, or layout restructuring was introduced.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported defect was repeated English filler, not missing imagery. No Drive asset was added or changed.

## Decision

WEDDING PASSPORT seating retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Physical proof, final guest names/table assignments, printer profile and final export remain `DEFERRED_FINALIZATION / NOT_PRINT_READY`.
