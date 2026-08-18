# Rurubu V6 EB — Memory Spots intrinsic-safe correction

Date: 2026-08-18
Scope: Rurubu WEDDING only

## Observation

After EA fixed Cafe/Table, a full preferred-set intrinsic audit found one remaining raster-size violation: Memory Spots lead photo `840×610` against intrinsic `1356×560`.

## Root-cause hypothesis

Reducing the lead photo height without rebalancing the following content would create a dead transition zone. The photo and the native information below it should be corrected as one bounded editorial rhythm.

## Bounded experiment

Created rollback-safe EB `1721:2` from DS.

- lead photo: `840×610 → 840×560`, hash unchanged;
- lead caption moved with the photo edge;
- SPOT 01 native text moved upward;
- existing SPOT 02 replaceable image moved upward without resize;
- SPOT 02 native text/pullquote moved upward;
- right guide page unchanged.

## Expected improvement

Remove the final preferred-set raster upscale while preserving or strengthening the travel-magazine reading rhythm.

## Regression risk

Tightening the lower-left composition could create collisions or safe-area pressure, or reduce the hero's dominance.

## Evidence

- whole/read screenshot: PASS;
- left actual-size context: PASS;
- left native text `13`, collision `0`, 18px safe risk `0`;
- right native text `14`, collision `0`, 18px safe risk `0`;
- all four EB photo roles within intrinsic dimensions;
- full preferred-set image audit after EA+EB: `37 / 37` visible IMAGE roles intrinsic-safe;
- Figma preferred EB `1721:2`;
- DS `1709:2` hidden rollback;
- Drive authority unchanged `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Status

`VERIFIED_LOCAL / ADOPTED`

## Learning relation

This independently reproduces RSL-097 inside a second materially different Rurubu spread during the same run. It strengthens the local evidence for the audit method but does not by itself create cross-item verification.
