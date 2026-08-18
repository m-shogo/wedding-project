# RURUBU V6 EB — Memory Spots Intrinsic-Safe QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Preferred: `1721:2 / PREFERRED / V6_INSIDE_EB_MEMORY_SPOTS_INTRINSIC_SAFE_2026_08_18`
Rollback: `1709:2 / ROLLBACK / V6_INSIDE_DS_MEMORY_SPOTS_YOKOHAMA_TRUTH_REPAIR_2026_08_18`

## Visible problem

A preferred-set intrinsic audit after EA promotion found one remaining violation: Memory Spots lead photo `840×610` against intrinsic source `1356×560`. Width was safe, but displayed height exceeded source height by about 8.9%.

## Root-cause hypothesis

Simply shrinking the lead photo to intrinsic height would create dead space below the hero. Rebalancing the following native information and existing replaceable Cafe image upward could preserve or improve editorial rhythm while eliminating the raster upscale.

## Bounded test

Created rollback-safe EB from DS and changed only the left Memory Spots page:

- lead photo `840×610 → 840×560`; hash unchanged `539c259be8036b481d06b4f76db9a39b407d90e8`;
- lead caption moved to remain bound to the photograph;
- SPOT 01 native number/title/copy moved upward;
- existing SPOT 02 replaceable image moved upward without resizing;
- SPOT 02 native number/title/copy/label/pullquote moved upward to restore page rhythm;
- right guide page, all image hashes, all copy, and replaceability remained unchanged.

## Expected improvement

Eliminate the last preferred-set intrinsic-size violation without leaving a weak gap below the hero or reducing the information-magazine rhythm.

## Regression risk

The denser lower-left page could create text/photo collisions, weaken the large-photo dominance, or push lower information toward trim.

## Evidence

EB actual-size validation:

- left page native text `13`; collision `0`; 18px safe risk `0`;
- lead photo `840×560` vs intrinsic `1356×560`: PASS;
- SPOT 02 image `405×335` vs intrinsic `810×552`: PASS;
- right page native text `14`; collision `0`; 18px safe risk `0`;
- SPOT 03 `238×218` vs `240×220`: PASS;
- SPOT 04 `455×318` vs `732×498`: PASS.

Whole/read screenshot: PASS. The shorter lead photo creates a clearer photo-to-information transition and the tightened 01/02 block avoids dead space.

A full preferred-set audit after EA + EB found `37` visible IMAGE roles and `0` intrinsic-size violations.

## Adoption

`VERIFIED_LOCAL / ADOPTED`.

Start Here `845:27`:

`V5 FU/FX · V6 AH + DN/DO + EB MEMORY SPOTS + EA CAFE & TABLE + DX 1DAY PLAN · V7 HOLD`

## Asset lifecycle truth

- newly generated assets: `0`;
- Drive writes: `0`;
- external binary placements: `0`;
- new image hashes: `0`;
- native text preserved: `YES`;
- replaceable photo roles preserved: `YES`;
- preferred-set intrinsic audit: `37 / 37 PASS`;
- print-ready claim: `NO`.
