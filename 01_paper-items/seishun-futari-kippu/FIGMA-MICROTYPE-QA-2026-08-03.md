# 青春ふたりきっぷ — Figma Microtype QA 2026-08-03

Status: `LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`

Current authority checked live before write:
- GitHub `main`: `4e5e91588c391ab6a6bf44337e0e0b444352c7d9`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- Production frame: `11:2` (`FRAME_LABEL`, `720 × 250`)
- Drive: current 青春ふたりきっぷ authority/research documents and production-folder references remain accessible

## Visible problem

The natural-size production screenshot showed several native-text elements at only 8–10 Figma units. The existing `99_QA` frame also records a provisional `10 px = 1 mm` assumption, so these elements were the weakest legibility tier even before physical print lock:

- English subtitle
- `FOR TWO PERSONS`
- `DATE` / `FROM` / `DESTINATION` labels
- blue gate-stamp text
- decorative serial

The class label also extended beneath the red `祝` stamp area, creating avoidable visual interference.

## Rollback-safe proof

Created `99_QA/MICROTYPE_LEGIBILITY_PROOF` as node `22:2` by duplicating the existing actual-size QA frame. Production was not touched during the first proof.

The first proof showed that increasing the class label without repositioning caused the label to touch the red stamp. The proof was corrected by moving only that label left. A second natural-size screenshot confirmed clear separation and no collision.

## Production change

Applied the verified proof values to native-text nodes in production frame `11:2`:

- `11:52` `TXT_SUBTITLE`: `10 → 11`
- `11:54` `TXT_CLASS`: `9 → 10`, `x 552 → 526`
- `11:76` `TXT_DATE_LABEL`: `8 → 9`
- `11:78` `TXT_FROM_LABEL`: `8 → 9`
- `11:80` `TXT_DEST_LABEL`: `8 → 9`
- `11:86` `DECOR_GATE_TEXT`: `8 → 9`
- `11:136` `DECOR_SERIAL`: `8 → 9`

Preserved:
- all node IDs and semantic names
- native editable text
- current production frame dimensions and crop
- train/vector/stamp artwork
- rollback proof in `99_QA`

No node was deleted, flattened, rasterized, or fully replaced.

## Screenshot QA

Post-change natural-size screenshot of `11:2` confirmed:

- the class label no longer runs beneath the red stamp
- the smallest labels and serial are more legible
- title, route, date, train, red stamp, blue stamp, and guilloche remain intact
- no clipping, overlap, missing content, or unintended regression
- the overall hierarchy remains ticket-like rather than UI-card-like

## Drive

Drive writes: `0`

No asset regeneration was justified. The observed defect was native-text legibility and placement, not source-image quality.

## Remaining blockers

Before `PRINT_READY`:

1. Measure the actual MINTIA application area.
2. Confirm final mm dimensions, bleed, trim, safe area, and corner behavior.
3. Print at 100% scale and apply to the physical case.
4. Verify normal viewing-distance legibility and adhesion.
5. Export and inspect the final print PDF.

## Declaration

Current state:

`LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
