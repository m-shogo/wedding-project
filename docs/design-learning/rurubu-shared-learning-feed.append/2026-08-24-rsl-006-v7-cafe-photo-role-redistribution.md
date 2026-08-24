# RSL-006 reproduction — V7 Cafe photo-role redistribution

Date: 2026-08-24
Source scope/item: Rurubu WEDDING / V7 Cafe+Table
Existing lesson: `RSL-006 — Photo-role redistribution can outperform adding assets`
State after this reproduction: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` (unchanged; same Rurubu item)

## Visible problem

V7 H9 `2454:2` had already removed much UI-like grammar, but the left Cafe opening still divided its top field into a `465px` dominant photo and a `328.7px` cobalt title field. At whole-item scale this remained close enough to equal-module behavior that the page read partly as `photo panel + title panel` rather than a strongly photo-led Japanese travel-magazine opening.

## New professional observation

This run rotated research into photo-led book/editorial construction rather than another typography/microcopy pass.

- MACK photobook production practice describes image editing/sequencing as an upstream design act; photographs are printed as thumbnails, shuffled/paired, and page structures are developed in service of the photographs rather than treating images as decoration inside already-finished modules.
- JAGAT DTP guidance treats photograph placement/composition as a factor that can determine the page impression and design itself.

These references were not promoted as rules. They produced one local hypothesis: if a page role is supposed to be photo-led, redistribute the existing visual mass before adding new assets.

## Bounded experiment

H10 `2467:2` changed only the left opening balance:

- dominant structural photo width `465 → 515`
- cobalt title field width `328.7 → 278.7`
- lead/kicker/fixed title moved with that field
- fixed title remained an independent raster role with source preserved
- all copy, image hashes, lower-page sequence and entire right Table page stayed unchanged
- no new card, badge, shadow, gradient or image asset was added

## Evidence

Three-scale DESIGN QA:

- 500px whole item: PASS; clearer `photo → title field` hierarchy and less equal-module reading
- 1400px reading scale: PASS
- 1587×1123 actual-size: PASS

Structure:

- parent `2052:2`
- native visible text `11`
- visible IMAGE fills `5`
- text-text intersections `0`
- 18px edge risks `0`
- Japanese text assigned to Inter `0`

Promotion:

- current H10 `2467:2`, `x=19500 / y=13000`
- H9 `2454:2` retained as hidden rollback at `x=300000`

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V7-H10-CAFE-PHOTO-LED-ASYMMETRIC-OPENING-QA-2026-08-24.md`

## Strengthened interpretation of RSL-006

When a print/editorial role owns a dominant photograph, a near-equal photo/decorative-field split should not survive merely because it already exists in the dummy composition. Before adding or generating more imagery, test whether redistributing existing visual mass gives the photograph a clearer editorial job and improves whole-item hierarchy.

This does **not** transfer H10's exact `515 / 278.7` geometry, cobalt field, Cafe title treatment, or V7 palette. It also does not mean photography must always dominate. The receiving composition must prove the hierarchy benefit at whole-item, reading and actual-size scales.

## Truth boundary

H10's imagery remains structural dummy photography. This reproduction verifies composition responsibility only:

- image generation `0`
- Drive write `0`
- new master `0`
- new Figma image hash `0`
- final photo adoption `0`
- REAL CONTENT QA `BLOCKED`
- PRINT READY `NO`
