# RSL-170 — A route chronology can gain editorial continuity by enlarging one legitimate photo beat instead of adding more modules

Date: 2026-08-21
Source scope/item: Rurubu WEDDING / V6 Story + Chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The chronology right page in IL was technically correct and readable, but at whole-spread scale the lower half became visually quiet after the upper hero. The route rail and six native events survived, yet the page felt like a sequence of labels surrounding one modest photo rather than a continuous magazine composition.

## Root-cause hypothesis

The weakness was not missing content. The existing event-3 photo was semantically legitimate but underweighted relative to the large top hero and the importance of the 05/06 terminal events. Adding another card, badge, texture, or new raster would increase module count without repairing hierarchy.

## Principle / capability tested

When a chronological print page already has one semantically valid mid-sequence image, test increasing that image's editorial mass and tightening the terminal events around the same route before adding another module or asset.

## Exact bounded change

Rollback-safe IO `2095:18` was duplicated from IL `2085:2`. Only chronology-right hierarchy changed: the existing event-3 image was enlarged from about `385×318` to `411×390`; the functional route rail was extended slightly; 05/06 were tightened beneath it. No new card, raster, hash, upload, Drive save, shadow, or gradient was added. Initial structure QA exposed four small text-bound overlaps and the candidate was corrected before adoption.

## Expected improvement

- stronger photo-led middle beat;
- clearer 01→03→05→06 visual progression;
- less dashboard/list reading;
- denser but still readable print rhythm;
- no additional asset/provenance burden.

## Regression risk

A larger image can crowd date/title roles, imply false event-photo semantics, or expose weak source fidelity. The image must already be legitimate for the broader travel-story role, and structure QA must be rerun after movement.

## Three-scale evidence

- whole spread / 500px: PASS; IO stronger than IL.
- reading / 1400px: PASS.
- actual-size chronology right `2095:44 / 794×1123`: PASS.
- final chronology-right text intersections: `0`.
- final 18px text safe-area risks: `0`.
- full spread visible native text: `39`.
- full spread visible IMAGE fills: `6`.

## Figma / Drive / GitHub evidence

- Figma preferred IO: `2095:18`.
- chronology right: `2095:44`.
- rollback IL: `2085:2`, hidden.
- unchanged top hero hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`.
- unchanged event-3 hash: `439a719d73f28e8dd2889f2026cccb15f345ec63`.
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IO-STORY-CHRONOLOGY-TALL-ROUTE-PHOTO-QA-2026-08-21.md`.

## Adopted / rejected / blocked

`ADOPTED / VERIFIED_LOCAL`.

## What must remain Rurubu-specific

Do not transfer the route rail geometry, 01–06 composition, Rurubu-like color coding, image crops, destination imagery, giant numerals, or Japanese travel-magazine art direction.

## Cross-item applicability hypothesis

On a different print item with a chronological or stepped narrative, independently test whether one already-legitimate mid-sequence visual can be promoted to a larger structural beat before introducing another card/module/asset. Transfer the hierarchy test and three-scale QA only, not the composition.
