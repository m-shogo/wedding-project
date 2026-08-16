# RSL-041 — Repeated chronology can gain editorial rhythm from major/minor semantic anchors

Source scope/item: Rurubu WEDDING V6 chronology

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The chronology already used a dominant travel photograph, native event facts and a strong final endpoint, but the middle `01–05` milestone field still read as sparse coordinates rather than a magazine feature.

## Root-cause hypothesis

Repeated events do not need equal visual authority merely because they share the same data schema. When chronology/order remains explicit in native text, selected milestones can become major anchors while other events remain compact support beats. A very small number of functional rules can bind those groups without introducing cards or UI containment.

## Bounded test

Rollback-safe BE `1433:2` was duplicated from BC `1420:2`.

- kept all event facts native/editable;
- kept all six replaceable chronology IMAGE roles and existing hashes;
- promoted `01 / 03 / 05` to larger native number anchors;
- kept `02 / 04` compact;
- tightened each date/title/copy block around its number;
- reorganized existing lower event photos into a diagonal rhythm;
- added only two thin editorial rules to bind the major groups;
- retained the existing WEDDING endpoint;
- added no cards, shadows, gradients, generated raster, or baked final copy.

## Expected improvement

A clearer `major → support → major → endpoint` reading path, stronger thumbnail rhythm, and less diagram/template feeling without sacrificing editability.

## Regression risk

- enlarged numerals can wrap when old text boxes are too narrow;
- large anchors can collide with adjacent text if semantic grouping is not re-spaced;
- thin rules become meaningless decoration if they do not visibly bind groups;
- changing event hierarchy may imply false narrative importance if the final factual story requires equal emphasis.

## Failure/correction evidence

The initial bounded test caught two problems before adoption:

1. an unscoped duplicate-name lookup accidentally changed the Story page title;
2. enlarged numbers wrapped and created structural collisions.

The Story page was restored from BC, chronology searches were scoped to the chronology frame, number text boxes were widened, and all detected collisions/safe-area issues were repaired before promotion.

## Three-scale evidence

- 500 px whole spread: PASS; BE reads more clearly than BC at thumbnail scale.
- 1400×990 reading spread: PASS.
- 794×1123 chronology page: PASS.
- final chronology structure: native text `32`, replaceable IMAGE `6`, text/text collision `0`, 18 px safe-area risk `0`.
- Story side remained native text `11`, IMAGE `3`, collision `0`, safe-area risk `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted BE: `1433:2`
- hidden rollback BC: `1420:2`
- Start Here: `845:27 / V5 FU/FX · V6 Q + BD/BE INSIDE STUDIES · V7 HOLD`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- item QA: `01_paper-items/rurubu-wedding/RURUBU-V6-Q-BD-BE-CHRONOLOGY-EDITORIAL-CLUSTER-QA-2026-08-16.md`
- evidence commit: `496177a7dd8e990afff61d9ada76db051cea3296`

## What must remain Rurubu-specific

Do not transfer the magenta/cyan colors, exact number sizes, three-major/two-minor selection, photo geometry, Japanese travel-magazine visual grammar, WEDDING endpoint treatment, or specific event importance.

## Cross-item applicability hypothesis

On another print artifact with repeated chronological or sequential facts, independently test whether semantic major/minor weighting improves editorial reading before creating more cards or decoration. Preserve chronology and factual meaning; do not mechanically copy the Rurubu grouping.
