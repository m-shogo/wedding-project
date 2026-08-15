# RSL-015 — Intrinsic/display ratio is a role-level print gate, not only a source-quality note

Source scope/item: Rurubu WEDDING / V6 Outer C → D

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V6 Outer C had already passed whole-item and actual-size visual QA, but a later full image-role audit found that the back-cover Yokohama skyline support used a `240×220` raster at `306×270` display size. The page looked coherent, yet the selected Best comparator still contained one support raster enlarged beyond intrinsic pixel dimensions.

## Evidence before change

- current Best Outer C: `1227:2`
- affected node: `1227:10 / V6_A_BACK_STREET`
- image hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`
- Drive: `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`
- Drive readback: `RURUBU_V5_01_COVER_HERO__ROLE_240x220_Q78.jpg`, `image/jpeg`
- intrinsic: `240×220`
- C display: `306×270`
- intrinsic/display: about `0.78× / 0.81×`

## Root-cause hypothesis

Three-scale screenshot QA and generic “source looks acceptable” judgment are not sufficient when a small raster occupies a print role. Intrinsic/display ratio should be checked per actual role before promotion. If a support image can retain its editorial function at or below native pixel dimensions, downscaling the role can improve print fidelity without requiring regeneration.

## Bounded test

Created rollback-safe Outer D `1229:2` from C and changed only the skyline support role:

- `306×270 → 240×220`
- repositioned within the same cafe/skyline pair
- image hash unchanged
- Drive provenance unchanged
- no new asset, card, gradient, shadow, typography, front-cover composition or other raster changed

C was preserved hidden as rollback after promotion.

## Expected improvement

Remove avoidable source enlargement while preserving the postcard/support reading and strengthening scale contrast between adjacent image roles.

## Regression risk

A mechanical “never exceed 1×” rule can make important imagery too timid or leave dead space. This lesson is specifically a **role-level decision rule**: first ask whether the smaller role still works at whole-item/reading scale. If the image must be larger to perform its semantic job, a stronger source or new generated/photographic master is required instead of shrinking blindly.

## Three-scale evidence

- D whole outer / 1400px: PASS and visually coherent
- D actual back / 794×1123: PASS
- post-readback: native text `28`, IMAGE fills `7`, same-parent text intersections `0`, 18px text safe-area risks `0`
- all selected Outer D raster roles now have intrinsic/display ratio `>= 1.0×` on both axes
- affected skyline support is exactly `1.0× / 1.0×`

## Figma / Drive / GitHub evidence

- Figma production file: `bfM0d4c9dCeBv5pCkJ3TNM`
- promoted Outer D: `1229:2`
- affected D node: `1229:10`
- previous C rollback: `1227:2`
- Start Here status: `845:27 = V5 FU/FX · V6 D/A`
- Drive ID: `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`
- comparator evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-D-A-COMPARATOR-PROMOTION-2026-08-15-1300.json`
- comparator commit: `163ba8a50871737c7317af65e315db19499fc2d9`

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: D adopted as current V6 Outer Best. No image generation, new Drive save, or external binary placement was needed.

## What must remain Rurubu-specific

Do not transfer the exact `240×220` threshold, skyline asset, photo pair geometry, angles, Yokohama imagery, palette, or magazine composition. Other items have different print dimensions and role importance.

## Cross-item applicability

Before a raster-heavy print artifact promotes a comparator, inspect each selected image role as `intrinsic pixels ÷ displayed pixels` and identify any role below 1×. If the role can become smaller without harming hierarchy, independently test that safer scale. If not, treat the deficiency as an upstream asset-quality requirement rather than hiding it behind screenshot-only QA.

## Next receiving-item experiment

On a materially different print item with real raster imagery, audit one image whose display size exceeds intrinsic pixels. Compare a rollback-safe intrinsic-safe role against the current composition at whole-item, reading, and actual-size scales. Do not copy Rurubu geometry or asset choices.
