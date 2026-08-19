# RSL-138 — Source-limited small photography can gain editorial responsibility through controlled overlap

Date: 2026-08-20
Source scope/item: Rurubu WEDDING / V6 Cafe
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A semantically valid, source-limited small photo was already present, but its number, headline and supporting native copy were spatially dispersed. At whole/read scale the lower page read as a photo card plus separate text modules rather than one editorial beat.

## Root-cause hypothesis

The problem was not insufficient image size. Enlarging the photo would violate source fidelity. The weak point was insufficient binding between photo and native hierarchy.

## Bounded test

On rollback-safe GJ, keep the photo at `238×218`, move it slightly upward, use a mild `-3°` rotation, let the large native ordinal overlap the photo edge, and tighten the existing headline/copy/metadata into the adjacent column. No new card, new image, or generated decoration.

## Expected improvement

Increase magazine-like continuity and visual responsibility without inventing another asset or enlarging beyond source tolerance.

## Regression risk

- text/photo collisions from overlap;
- rotated photo crossing trim/safe zones;
- small image becoming visually over-important;
- accidental card-like composition if the surrounding copy remains detached.

## Evidence

- Figma GH source `1947:2`; GJ preferred `1954:2`; actual-size Cafe `1954:3`.
- whole ~700px PASS; reading 1200px PASS; actual-size 794×1123 PASS.
- native text collision `0`; 18px safe-area risk `0`.
- photo hash unchanged `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GJ-CAFE-VIEW-BOUND-EDITORIAL-BEAT-QA-2026-08-20.md`.

## What remains Rurubu-specific

Exact overlap, rotation, Japanese headline treatment, Cafe subject, palette, coordinates and photo choice.

## Cross-item applicability hypothesis

When another print artifact has a legitimate small image that cannot be enlarged safely, independently test whether controlled overlap with native hierarchy can increase editorial binding before adding a new asset. This is not permission to overlap every small photo.
