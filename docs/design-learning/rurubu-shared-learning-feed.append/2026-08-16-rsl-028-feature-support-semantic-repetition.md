# RSL-028 — Semantic repetition still needs feature/support hierarchy

Date: 2026-08-16
Source scope: Rurubu WEDDING V6 Profile / Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-O-AK-AI-QA-2026-08-16.md`

## Visible problem

The AJ Q&A page had already removed cards and dashboard containers, but six question groups still carried near-equal visual weight. At thumbnail and reading scale the page therefore continued to feel partially templated.

## Root-cause hypothesis

Removing container geometry does not remove template rhythm if repeated semantic units preserve equal type scale, width, alignment and vertical weight.

## Bounded test

Rollback-safe AK `1367:2` retained the same six native question/answer roles and the same replaceable Memories photography, but redistributed roles:

- `01` and `04` = feature anchors;
- `02 / 03 / 05` = smaller supporting beats;
- `06` = stronger closing beat;
- question/answer widths and positions staggered;
- no new cards, shadows, gradients or generated decoration.

The first render exposed feature-number wrapping. The broken state was rejected, number boxes widened, then number/question/answer intersections were repaired to zero.

## Expected improvement

A repeated information family should read like an edited magazine sequence rather than a component grid while preserving native copy and easy later editing.

## Regression risk

Large numbers can overpower the actual questions, create wrap/clipping, or reduce room for long answers.

## Evidence

- whole spread 500 px: PASS
- whole spread 1400 px: PASS
- actual-size Q&A `1367:30` at `794×1123`: PASS
- visible native text: 22
- absolute text intersections: 0
- 18 px text safe-area risks: 0
- hidden long-copy proof `1368:2 / 1368:30`: six realistic two-line Japanese answers, intersections 0, safe-area risks 0

## Status

`VERIFIED_LOCAL` in Rurubu. `CROSS_ITEM_CANDIDATE` only for the general principle.

## What must remain Rurubu-specific

Do not transfer:

- the exact 01/04/06 emphasis pattern;
- colors;
- question positions;
- type sizes;
- Memories placement;
- travel-magazine art direction.

## Cross-item applicability hypothesis

When repeated semantic content feels templated, first test **role hierarchy inside the repetition**—feature/support/closing weights—before adding more containers or decoration.

A receiving item must reproduce the benefit in its own visual grammar before promotion beyond `CROSS_ITEM_CANDIDATE`.
