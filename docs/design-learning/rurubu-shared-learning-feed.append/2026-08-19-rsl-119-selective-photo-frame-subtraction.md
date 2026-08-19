# RSL-119 — Selective photo-frame subtraction by role

Date: 2026-08-19
Source scope: Rurubu WEDDING / V6 Outer cover
State: `CROSS_ITEM_CANDIDATE`

## OBSERVED

Outer EV had a strong dominant waterfront hero and asymmetrical lower support photography, but both lower support photos still carried the same 6px white frame. At same-scale review this preserved a residual two-card/module feeling.

## ROOT_CAUSE_HYPOTHESIS

The frame treatment was being repeated by convention rather than by function. The smaller rotated Cafe photo needed separation because it overlaps another image, while the much larger Dining photo already had enough scale and edge contrast to work without a white card frame.

## TESTED_LOCAL

Rollback-safe duplicate from EV:

- removed the white frame from the dominant Dining support only;
- kept the Cafe frame because it still performs visual separation;
- preserved all photo sources/hashes and native cover text;
- made only a bounded geometry/rotation refinement to the Dining support;
- added no photo, card, shadow, generated decoration or raster.

Expected improvement: strengthen dominant/support difference and make the lower cover read as an edited photo collage rather than two similarly framed modules.

Regression risk: images could visually merge, hierarchy could weaken, or the larger photo could collide with copy/folio.

## VERIFIED_LOCAL

Outer EZ `1836:2`, front `1836:51`:

- 500px whole thumbnail: PASS
- 1200px reading: PASS
- 794×1123 actual-size front: PASS
- native text: 13
- text collisions: 0
- 18px safe risks: 0
- image hashes unchanged
- Dining remains source-safe; Cafe remains source-safe
- EV retained as hidden rollback

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EZ-OUTER-SELECTIVE-PHOTO-FRAME-SUBTRACTION-QA-2026-08-19.md`

## CROSS_ITEM_CANDIDATE

Generalizable hypothesis only:

> Do not keep or remove every photo frame uniformly. Re-evaluate the separation/binding function per photo role. A dominant support image may become more editorial when its redundant frame is removed, while an overlapping small photo may still need a frame to remain legible.

Do not transfer Rurubu photos, masthead, coordinates, rotations, white-stroke values or cover composition.

## Failure fingerprint / stop condition

`UNIFORM_PHOTO_FRAME_TREATMENT_OVERRIDES_ROLE`

If subtraction makes overlapping photos merge or destroys subject separation, preserve the functional frame. Do not apply frame removal globally as a style rule.
