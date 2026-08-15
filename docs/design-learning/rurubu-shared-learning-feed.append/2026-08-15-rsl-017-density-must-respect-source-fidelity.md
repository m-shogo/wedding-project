# RSL-017 — Editorial density must not outrun raster source fidelity

Source scope/item: Rurubu WEDDING / V6 Inside

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V6 Inside A's lower-right `思い出スポット` cluster was technically clean but visually timid. Three images behaved as separated rectangular roles with a large cream field around them, so the page read more like a brochure/gallery than an energetic Japanese travel-information spread.

## Evidence before change

- previous best inside: `1223:2 / V6_PREVIOUS_INSIDE_A_PROFILE_MEMORY_EDITORIAL_2026_08_15`
- memory 01: `350×365`, intrinsic `352×368`
- memory 02: `220×202`, intrinsic `240×220`
- memory 03: `360×194`, intrinsic `796×428`
- prior whole-item and actual-size QA had no structural failures, so the defect was visual hierarchy and editorial rhythm rather than correctness.

## Root-cause hypothesis

The weak reading was caused by cautious role separation and captions outside the photo fields, not by asset scarcity. A denser asymmetric collage with direct photo-bound native captions could improve magazine rhythm. However, density created by enlarging weak rasters is false progress: it may look stronger in a clamped screenshot while reducing print fidelity.

## Principle/capability tested

Increase editorial density through **role overlap, caption binding, rotation, and unequal scale**, while treating intrinsic raster dimensions as a hard concurrent QA gate rather than a later cleanup step.

## Exact bounded test

1. Clone Inside A to safe candidate I `1233:2`.
2. Recompose only the right-page memory cluster; preserve facts, native text, image hashes, Drive provenance, history hero, profile page, fold guide, V5 and Outer H.
3. Initial I enlarged memory 01 to `430×425` and memory 02 to `300×282`.
4. Figma intrinsic readback showed those roles were invalid for print fidelity:
   - memory 01 intrinsic/display ratio fell below 1 in both axes;
   - memory 02 intrinsic/display ratio fell below 1 in both axes.
5. Reject that geometry without promoting it.
6. Rebuild the same editorial idea with intrinsic-safe roles:
   - memory 01 `350×365` against intrinsic `352×368`;
   - memory 02 `220×202` against intrinsic `240×220`;
   - memory 03 `430×230` against intrinsic `796×428`.
7. Bind native titles directly to the photos and resolve the final 01 number/title text-box collision before promotion.

## Expected improvement

A visibly denser, more asymmetric magazine composition without adding new assets, cards, shadows, gradients, or raster upscaling.

## Regression risk

- overlap can become scrapbook noise;
- low-resolution assets can be silently enlarged to manufacture hierarchy;
- native captions over photos can lose contrast;
- rotated roles can create collision/safe-area regressions.

## Three-scale evidence

- whole-item thumbnail 500 px: PASS and stronger than Inside A;
- reading spread 1000 px: PASS and stronger than Inside A;
- actual-size right page `794×1123`: PASS;
- final structure: visible native text `41`, IMAGE fills `6`, same-parent text intersections `0`, 18 px text safe-area risks `0`;
- all visible raster roles at or below intrinsic dimensions in both axes: PASS.

## Figma / Drive / GitHub evidence

- selected inside: `1233:2 / V6_BEST_INSIDE_I_DENSE_MEMORY_COLLAGE_2026_08_15`
- right page: `1233:28 / V6_INSIDE_I_RIGHT`
- previous inside A preserved hidden: `1223:2`
- Start Here: `845:27 = V5 FU/FX · V6 H/I`
- memory 01: `1233:46`, hash `439a719d73f28e8dd2889f2026cccb15f345ec63`
- memory 02: `1233:49`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`
- memory 03: `1233:52`, hash `adbb8e529451a81dd25e4eb29bf068655569ce25`
- exact bounded skyline Drive: `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`, 10,284 bytes
- Q60 master fresh readback: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, 155,439 bytes
- promotion authority: `01_paper-items/rurubu-wedding/RURUBU-V6-H-I-COMPARATOR-PROMOTION-2026-08-15-1500.json`
- active asset ledger: `01_paper-items/rurubu-wedding/RURUBU-V6-H-I-ACTIVE-ASSET-LEDGER-2026-08-15.json`

## Adopted / rejected / blocked status

- initial oversized I geometry: `REJECTED` by intrinsic-role gate;
- corrected intrinsic-safe I: `VERIFIED_LOCAL` and adopted as current best inside comparator;
- no new image was generated, saved to Drive, or externally placed.

## What must remain Rurubu-specific

Do not transfer the exact three-photo arrangement, crop angles, waterfront/old-town/coast imagery, magenta/cyan/yellow numbering, Japanese travel-magazine composition, or specific role sizes.

## Cross-item applicability hypothesis

When another print artifact needs more visual energy, independently test whether overlap and role reassignment can create density **without enlarging a raster beyond its intrinsic role size**. Screenshot improvement alone is not enough evidence if print source fidelity regresses.

## Next receiving-item experiment

On a materially different print item with a photo cluster, compare a conservative separated layout against an asymmetric overlap treatment while measuring intrinsic/display ratios during the experiment, not only after visual selection. If the stronger-looking candidate requires raster upscale, reduce the role or obtain a stronger source instead of accepting screenshot-only improvement.
