# RSL-102 — Mature sequence hierarchy can make a route rail redundant

Date: 2026-08-18
Source scope/item: Rurubu WEDDING / V6 Yokohama 1DAY Plan
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

EH's 1DAY right page had already evolved into an asymmetric photo diary, but it still retained a long vertical route rail and four circular stop markers. At actual size the reader could already infer order from `01–04`, time, vertical placement, headings and photo sequence, so the remaining rail/markers added diagram/UI character more than useful guidance.

## Root-cause hypothesis

A functional binder can become redundant after surrounding editorial hierarchy matures. Keeping a once-useful line or marker system by inertia can leave a print page reading like a flowchart even after native ordinal/time/photo structure is sufficient.

## Bounded test

Rollback-safe EI `1752:2` cloned EH `1744:2` and changed only the sequence-binding devices:

- hide the long route rail;
- hide four circular stop markers;
- keep native ordinals, times, titles, body copy and practical metadata;
- keep all four replaceable photo roles and their image sources/hashes;
- lightly stagger ordinal positions for editorial rhythm.

A structural read found two tiny rotated-photo/metadata contacts after the subtraction. Those were repaired before adoption by narrowing only the corresponding native metadata text boxes; copy and photo geometry stayed otherwise intact.

## Expected improvement

Move the page from `timeline/process diagram` toward `Japanese travel-guide model-course feature` without adding cards, decoration, assets or fixed text.

## Regression risk

Removing a route binder too early can make sequence ambiguous. The method applies only when order remains obvious at thumbnail, reading and actual-size scales from other semantic cues. Rotated photos also require fresh text/photo contact QA because subtraction can expose previously masked spacing weaknesses.

## Three-scale evidence

- whole spread `1400×991`: PASS;
- right page native `794×1123`: PASS;
- native visible text `25`;
- replaceable photo roles `4`;
- text/text collisions `0`;
- unintended text/photo collisions `0` after repair;
- 18px text safe-area risks `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- EI preferred: `1752:2`;
- EI right page: `1752:29`;
- EH rollback: `1744:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EI-1DAY-EDITORIAL-STOPS-NO-RAIL-QA-2026-08-18.md`.

## Adopted / rejected / blocked

Adopted as `VERIFIED_LOCAL`. No generated asset, Drive write or external binary placement was involved.

## What must remain Rurubu-specific

Do not transfer the Yokohama itinerary, exact photo cascade, colors, numeric sizes, coordinates, Japanese headline, practical metadata wording or travel-magazine art direction.

## Cross-item applicability hypothesis

On another materially different print artifact, when a rail/line/marker system was once useful but surrounding native hierarchy has since become strong, independently compare `binder retained` vs `binder removed` at whole-item scale. Remove it only if sequence/grouping remains immediate and actual-size copy/geometry QA still passes.
