# Rurubu V6 EA — Cafe/Table intrinsic-safe correction

Date: 2026-08-18
Scope: Rurubu WEDDING only

## Observation

Preferred DZ passed prior visual QA but a live Figma image-size audit found two photo roles displayed above intrinsic dimensions by about 8%.

## Root-cause hypothesis

Mild raster enlargement can survive thumbnail/reading review while still weakening actual-size sharpness and making the durable status record inaccurate.

## Bounded experiment

Created rollback-safe EA `1720:2` from DZ and changed only:

- `PHOTO / GOURMET_VIEW_REPLACEABLE`: `260×220 → 238×218` against intrinsic `240×220`.
- `PHOTO / GOURMET_DINING_HERO_REPLACEABLE`: `793.7×500 → 732×498` against intrinsic `732×498`.

Hashes, native copy, replaceability, composed texture, support imagery, hierarchy and V7 state remained unchanged.

## Expected improvement

Preserve the accepted Cafe/Table magazine composition while eliminating avoidable raster upscaling.

## Regression risk

Reducing the dining hero could weaken full-width photo dominance; reducing the Yokohama view could make the lower-left beat too quiet.

## Evidence

- whole/read screenshot: PASS;
- actual-size structural QA: PASS;
- Cafe native text `14`, collisions `0`, 18px safe risks `0`;
- Table native text `19`, collisions `0`, 18px safe risks `0`;
- all 4 visible IMAGE roles within intrinsic source dimensions;
- Figma preferred EA `1720:2`;
- DZ `1719:2` preserved as hidden rollback;
- Drive authority unchanged: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EA-CAFE-INTRINSIC-SAFE-QA-2026-08-18.md`.

## Status

`VERIFIED_LOCAL / ADOPTED`

## Rurubu-specific boundary

Do not transfer exact Cafe/Table geometry, photo dimensions, hashes, palette, captions or Japanese travel-magazine composition.

## Generalizable lesson

Even after screenshot QA passes, compare live display dimensions to intrinsic raster dimensions. If a mild upscale is found, test a source-bounded duplicate and adopt only when whole/read/actual-size visual hierarchy still passes.
