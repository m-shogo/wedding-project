# Rurubu EB — photography as editorial spine

Date: 2026-08-12
Scope: Rurubu WEDDING visual-learning feedback
Status: ADOPTED / TESTED IN V5 COMPARATOR

## Visible problem
A cover can technically use large full-bleed photographs and still read as stacked modules when a broad neutral bridge separates the hero from the lower photographic feature.

## Principle tested
Use photography itself as the structural spine. Let the dominant hero extend deeper, place the primary feature number/headline directly on its crop-safe area, start the next full-bleed photo at the same seam, and reserve only one bounded paper/photo-note for secondary information. This creates controlled irregularity without adding card geometry.

## Expected improvement
- stronger travel-magazine recognition at thumbnail scale,
- less landing-page / brochure segmentation,
- more varied scale and overlap,
- clearer 01 → 02 → 03 editorial hierarchy.

## Regression risks
Direct-on-photo type can lose contrast, overlaps can become arbitrary, and a stronger composition can tempt us to overclaim image provenance. Always retain actual-size type QA, collision/safe-area checks, and Drive→Figma provenance as separate gates.

## Evidence
EB Working `1029:2`; front `1029:131`; back `1029:3`; Review `1036:2`. Whole-item, actual-size front and actual-size back screenshots passed. Visible native text `36`, IMAGE fills `7`, same-parent text collisions `0`, safe-area risks `0`. EA Review `1027:2` preserved hidden as rollback. Current `77:18 / 77:290` unchanged.

## Adoption / next application
Adopt the photo-spine principle when a page transition feels like stacked modules despite full-bleed imagery. Do not turn it into a universal layout template: V6 must inherit the judgment about photographic continuity, not EB's exact geometry.