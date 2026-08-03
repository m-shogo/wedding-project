# 青春ふたりきっぷ — Figma Upper-Right Clearance QA 2026-08-04

Status: `LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / UPPER_RIGHT_CLEARANCE_FIX_APPLIED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`

Current authority checked live before write:
- GitHub `main`: `7e22bf6a05e31c0998a33cb41e20a7a7d4d3b254`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- Production page/frame: `01_LABEL` / `11:2` (`FRAME_LABEL`, `720 × 250`)
- Drive: current 青春ふたりきっぷ authority, research, and production-folder references remain accessible

## Visible problem

The natural-size production screenshot showed that the right edges of both upper-right metadata lines were only `1` Figma unit away from the red commemorative stamp:

- `11:53` `TXT_ISSUE_NO`: right edge `623`
- `11:54` `TXT_CLASS`: right edge `623`
- `11:83` `DECOR_SHUKU_STAMP`: left edge `624`

This did not technically overlap, but the one-unit clearance made the issue number and class label visually fuse with the stamp at print scale. It weakened the ticket information hierarchy and created avoidable registration-risk around a prominent red mark.

## Rollback-safe proof

Created `99_QA/UPPER_RIGHT_CLEARANCE_PROOF` as node `29:2` by duplicating the production frame. Production was not touched during initial proofing.

The proof moved only the two native-text metadata nodes left so that their right edges aligned at `608`, creating `16` units of clearance before the stamp. The proof screenshot confirmed that:

- the issue number and class label read as a coherent metadata block
- the red stamp remained visually independent
- the upper-right area no longer felt pinched
- no new collision was introduced with the title, border, or train illustration

## Production change

Applied the verified geometry to production frame `11:2`:

- `11:53` `TXT_ISSUE_NO`: `x 566 → 551`
- `11:54` `TXT_CLASS`: `x 526 → 511`

Resulting geometry:

- both metadata lines end at `x 608`
- red stamp begins at `x 624`
- verified clearance: `16` Figma units

Preserved:
- production node IDs and semantic names
- native editable text
- font sizes, text content, and vertical positions
- stamp, train, route, facts, guilloche, border, and frame dimensions
- rollback proof on `99_QA`

No node was deleted, flattened, rasterized, or fully replaced.

## Screenshot QA

Post-change natural-size screenshot of `11:2` confirmed:

- issue number and class label are clearly separated from the red stamp
- both lines remain right-aligned as one metadata block
- title and subtitle hierarchy remains unchanged
- train, route, date, origin, destination, blue gate mark, serial, and border remain visible
- no clipping, missing content, overlap, or unintended visual regression

## Drive

Drive writes: `0`

No asset regeneration was justified. The observed defect was native-text spacing, not source-image quality.

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

`LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / UPPER_RIGHT_CLEARANCE_FIX_APPLIED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
