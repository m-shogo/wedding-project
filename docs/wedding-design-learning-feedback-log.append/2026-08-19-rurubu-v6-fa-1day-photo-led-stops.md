# Rurubu V6 — FA 1DAY photo-led stops experiment

Date: 2026-08-19
Status: `ADOPTED / VERIFIED_LOCAL`

## Problem

The 1DAY right page was structurally correct but still read as four similar itinerary modules with repeated text-left/photo-right rhythm and unused cream mass.

## Hypothesis

The page did not need more imagery or decoration. Giving the existing four photos materially different editorial mass and moving native stop copy toward the corresponding image should create stronger travel-magazine rhythm while preserving chronology and editability.

## Bounded test

EU `1818:2` was duplicated to FA candidate `1840:2`. Only right-page photo/text geometry changed. No copy, image hash, Drive asset, generated asset, new card or new decoration system was added.

## Result

ADOPTED as FA `1840:2`.

- whole 900px: PASS;
- reading 1200px: PASS;
- actual right page 794×1123: PASS;
- native text collisions: 0;
- 18px safe-area risks: 0;
- image intrinsic violations: 0/4.

## Regression / rollback

EU remains hidden rollback. The transfer lesson is only the method: repeated semantic units may benefit from unequal visual mass. Rurubu-specific photo choices, positions, colors, copy and rotations must not transfer to other Wedding items.