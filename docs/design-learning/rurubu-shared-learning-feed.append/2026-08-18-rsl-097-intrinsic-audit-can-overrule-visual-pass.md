# RSL-097 — Intrinsic audit can overrule an earlier visual PASS

Source scope/item: Rurubu WEDDING / V6 Cafe & Table
Date: 2026-08-18
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Preferred DZ looked acceptable at whole-spread scale, but a live image-dimension audit found two displayed photo roles exceeding their intrinsic source dimensions by about 8%.

## Evidence before change

- Yokohama view: `260×220` display vs `240×220` source.
- Dining hero: `793.7×500` display vs `732×498` source.
- Both roles had passed prior screenshot review.

## Root-cause hypothesis

Screenshot acceptance and structural correctness can still miss mild raster enlargement. A small upscale may not look obviously broken at thumbnail/reading scale but can reduce actual-size sharpness and make the durable status record false.

## Bounded test

Rollback-safe EA `1720:2` cloned DZ and changed only the two violating photo geometries:

- view `260×220 → 238×218`;
- dining hero `793.7×500 → 732×498`.

Image hashes, crop roles, native copy, hierarchy and composed decoration did not change.

## Expected improvement

Remove avoidable raster enlargement without sacrificing the accepted editorial composition or later photo replaceability.

## Regression risk

Source-bounded geometry can reduce page coverage, weaken a visual anchor or create awkward margins. Therefore intrinsic compliance is not sufficient by itself; the bounded candidate still needs whole/read/actual-size visual QA.

## Three-scale evidence

- whole/reading candidate screenshot: PASS;
- actual-size structural review: PASS;
- Cafe text collision `0`; 18px safe risk `0`;
- Table text collision `0`; 18px safe risk `0`;
- all four visible IMAGE roles in EA are now within intrinsic dimensions.

## Figma / Drive / GitHub evidence

- Figma preferred EA: `1720:2`;
- hidden rollback DZ: `1719:2`;
- Start Here: `845:27` updated to EA;
- Drive authority unchanged: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EA-CAFE-INTRINSIC-SAFE-QA-2026-08-18.md`;
- evidence commit: `32f38c98c834a7edecb44397cf0d04dfc76e89ff`.

## What must remain Rurubu-specific

Do not transfer Cafe/Table geometry, exact photo sizes, hashes, Japanese headlines, palette or composition.

## Cross-item applicability hypothesis

For another print artifact with raster photography, independently compare live display dimensions against the source dimensions even after screenshot QA passes. If a violation exists, create a rollback-safe source-bounded candidate and accept it only when visual hierarchy still passes at whole, reading and actual-size scales.

This does not promote a universal “never upscale” visual rule; it promotes the audit-and-revalidate method.
