# RSL-059 — A legitimate secondary image can bind a split print page before adding ornament

Source scope/item: Rurubu WEDDING V6 Outer back cover
Date: 2026-08-17
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The back cover remained visually split between a strong photographic upper region and a separate lower chronology field even though both regions were individually readable.

## Root-cause hypothesis

The page did not need another card, badge, decorative field or generated asset. An existing legitimate secondary photo was too weak in scale and stopped before the information region. Promoting that image into a larger page-binding field could connect photo, section headline and chronology while preserving native editable facts.

## Bounded test

On rollback-safe Outer Y `1542:2`:

- enlarge the existing verified cafe/memory role to a major secondary feature;
- keep the small skyline image near intrinsic size and use overlap rather than enlargement;
- attach the existing `みんなとの思い出` strip directly to the photo;
- start the native chronology immediately below that photo field;
- retain the existing WEDDING terminal;
- add no new raster, card, shadow, gradient or generated decoration.

An initial actual-size pass exposed the chronology title still entering the enlarged photograph. The candidate was corrected before adoption by shortening the photo and moving the chronology start fully onto the cream field.

## Expected improvement

Reduce false section boundaries and make the page read as one magazine composition instead of `photo block + information panel`.

## Regression risk

A larger secondary photograph can expose softness or dominate the page; information moved too close to the image can lose contrast; a low-resolution support image can fail if scale is increased instead of using overlap.

## Three-scale evidence

- whole item / 500px: PASS and preferred over Outer W;
- reading/spread: front/back hierarchy remains coherent;
- actual-size back `1542:3` 794×1123: PASS after correction;
- text collision: `0`;
- 18px text safe-area risk: `0`;
- visible back images all remain within intrinsic dimensions.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted Outer Y: `1542:2`;
- back page: `1542:3`;
- rollback Outer W: `1491:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CF-CE-PHOTO-BOUND-BACK-CLOSURE-QA-2026-08-17.md`.

## What must remain Rurubu-specific

Do not transfer the exact crop, dimensions, photo subject, skyline angle, labels, colors, chronology positions, Yokohama context or Rurubu editorial grammar.

## Cross-item applicability hypothesis

When another print artifact appears split into an image region and a detached information region, independently test whether an already legitimate secondary image can take a page-binding role before introducing another visible container or ornament. The image must still pass provenance, semantic-fit, intrinsic-resolution and actual-size gates.
