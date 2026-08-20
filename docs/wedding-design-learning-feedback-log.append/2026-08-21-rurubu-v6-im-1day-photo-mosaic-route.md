# Rurubu V6 IM — 1DAY photo-mosaic route feedback

Date: 2026-08-21

## Visible problem

IG's right 1DAY page still looked like a vertical itinerary list: repeated text rows, large cream intervals, and photos appearing as secondary attachments rather than the main travel rhythm.

## Principle tested

Preserve sequence in native numbers/times, but stop giving every stop equal visual geometry. Redistribute already-authorized photos into unequal editorial roles before generating more assets or adding route UI.

## Expected improvement

A denser but still readable Japanese travel-magazine journey page with stronger visual movement and less dashboard/template reading.

## Regression risk

Photo-role asymmetry can obscure chronology, cause neighboring stop text to attach to the wrong image, or create collisions when the layout becomes denser.

## Experiment and correction

IM `2087:2` duplicated IG rollback-safely and rebuilt only right `2087:33`. Existing STOP 01 skyline was revealed; STOP 02 café became dominant; STOP 03 street and STOP 04 dining became unequal lower beats.

The first reading-scale pass exposed STOP 02 text behind its photo and STOP 04 time visually attaching to STOP 02 metadata. Those placements were corrected. Structural QA then found four small text intersections; the final candidate was not promoted until all were removed.

## Evidence

- 500px whole spread: PASS and stronger than IG.
- 1400px reading: PASS after correction.
- 794×1123 right page: PASS.
- native text: 43 across spread.
- IMAGE fills: 5 across spread.
- text intersections: 0.
- right-page 18px safe-area risks: 0.
- generated/adopted new assets: 0 / 0.
- Drive saves/uploads/new hashes: 0 / 0 / 0.

## Decision

IM adopted as preferred; IG preserved hidden as rollback.

## Next application

When the next preferred V6 spread looks too modular at common scale, first ask whether equal visual weighting is causing the template feel. Test role asymmetry only where semantic order remains obvious and source quality supports the larger roles.
