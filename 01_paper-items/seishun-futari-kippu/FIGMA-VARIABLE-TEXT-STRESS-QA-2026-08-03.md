# 青春ふたりきっぷ — Figma Variable Text Stress QA 2026-08-03

Status: `LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`

Current authority checked live before write:
- GitHub `main`: `aae3f64af7d22955c7750641d4a9a134ea56c780`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- Production frame: `11:2` (`FRAME_LABEL`, `720 × 250`)
- Drive: current 青春ふたりきっぷ authority, research, and production-folder references remain accessible

## Visible problem

A rollback-safe proof using realistic long station and destination strings revealed that the original variable-text geometry was only safe for the current short placeholders:

- long first and second station names displaced or obscured route arrows
- a long origin value ran into the destination column
- a long destination value collided with adjacent facts content
- a longer decorative serial exceeded its original auto-width behavior

The test also showed that a very long issue number would require a separate content rule. The production issue number remains `No.1024`, so that unverified change was not applied.

## Rollback-safe proof

Created `99_QA/VARIABLE_TEXT_STRESS_PROOF` as node `26:2` by duplicating the existing actual-size QA wrapper. Production was not touched during initial proofing.

Proof values included:
- `新横浜中央駅`
- `みなとみらい駅`
- `ふたりの未来行き`
- `横浜みなとみらい`
- `ふたりの新しい未来へ`
- `WJ-20261024-YOKOHAMA-02`

The first screenshot exposed collisions and clipping risks. A corrected proof used bounded native-text widths, explicit column spacing, and retained editable text.

## Production change

Applied only the verified route, facts, and serial geometry to production frame `11:2`:

- `11:56` `TXT_ROUTE`: fixed native-text width `100`, font `14`, `HEIGHT` resize
- `11:57` first arrow: `x 108`, font `16`
- `11:58` `TXT_ROUTE_2`: `x 138`, width `118`, font `14`, `HEIGHT` resize
- `11:59` second arrow: `x 266`, font `16`
- `11:60` `TXT_ROUTE_3`: `x 296`, width `170`, font `14`, `HEIGHT` resize
- `11:79` `TXT_FROM`: width `120`, font `13`, `HEIGHT` resize
- `11:80` `TXT_DEST_LABEL`: `x 260`, width `82`, font `9`
- `11:81` `TXT_DEST`: `x 260`, width `180`, font `13`, `HEIGHT` resize
- `11:136` `DECOR_SERIAL`: width `190`, font `9`, `HEIGHT` resize

Preserved:
- all production node IDs and semantic names
- native editable text
- production frame dimensions and clipping behavior
- train, stamps, guilloche, route line, stop markers, and border artwork
- rollback proof on `99_QA`

No node was deleted, flattened, rasterized, or fully replaced.

## Screenshot QA

Post-change natural-size screenshot of `11:2` confirmed:

- current short route values remain visually balanced
- both red arrows remain clear and evenly separated
- route text does not collide with the train area
- date, origin, and destination columns remain distinct
- title, issue number, class label, red stamp, blue stamp, train, guilloche, and serial remain visible
- no clipping, missing content, overlap, or unintended visual regression

## Drive

Drive writes: `0`

No asset regeneration was justified. The observed defect was native-text geometry and variable-content resilience, not source-image quality.

## Remaining blockers

Before `PRINT_READY`:

1. Measure the actual MINTIA application area.
2. Confirm final mm dimensions, bleed, trim, safe area, and corner behavior.
3. Confirm final station names, destination copy, issue-number rule, and serial rule.
4. Print at 100% scale and apply to the physical case.
5. Verify normal viewing-distance legibility and adhesion.
6. Export and inspect the final print PDF.

## Declaration

Current state:

`LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
