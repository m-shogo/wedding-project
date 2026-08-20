# RSL-162 — A functional route can bind chronology that otherwise floats as labels

Source scope/item: Rurubu WEDDING / V6 Story-Chronology IF
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

HT `2040:2` had already removed redundant decorative fields and passed collision/safe-area QA, but its right chronology still read as six separate event labels distributed over a large cream field. The photographs had hierarchy; the chronology itself did not have a continuous reading device.

## Root-cause hypothesis

When sequential content is structurally correct yet visually disconnected, the missing element may be functional binding rather than more decoration. One route/spine can make separate moments read as a journey, while asymmetric photos and varied number scales can prevent the result from becoming a rigid table or dashboard timeline.

## Bounded test

1. Duplicate HT into rollback-safe IF `2067:2`; preserve the left story page.
2. Activate existing timeline rail and nodes as one vertical route on right page `2067:28`.
3. Redistribute existing native event numerals and title/copy stacks around the route instead of creating cards.
4. Enlarge existing Event 03 image as a strong photographic stop.
5. Keep unresolved dates/facts unresolved; do not create filler facts for visual completeness.
6. Use 500px, 1400px and native 794×1123 review plus structure readback before promotion.

## Expected improvement

- one obvious journey/sequence instead of floating labels;
- denser-but-readable editorial rhythm;
- stronger relationship between chronology and travel-magazine narrative;
- preserve photography and native copy without UI-style containers.

## Regression risk

- a rail can become decorative noise if events do not visibly relate to it;
- aggressive asymmetric placement can make chronological order ambiguous;
- large event numbers can collide with native title/date text;
- white image captions can lose contrast if moved off-image;
- a safe but overly regular timeline can regress into generic infographic/dashboard grammar.

## Three-scale evidence

### Whole-item / thumbnail

500px: PASS. IF reads more clearly as a single chronology than HT; the vertical route and Event 03 photograph establish a strong right-page spine without card rows.

### Reading scale

1400px: PASS after correction. Event 03 white title/copy was returned to the photograph after contrast loss was observed on cream. Event clusters remain distinct around the route.

### Actual size

Right `2067:28 / 794×1123`: PASS. Hero/title, route, Event 03, Event 05, Event 06 terminal information and folio remain readable.

## Structure evidence

Final right page:

- native visible text: `27`;
- visible IMAGE fills: `2`;
- unintended text intersections: `0`;
- 18px text safe-area risks: `0`;
- whole-page flattening: NO;
- replaceable photo roles preserved: YES.

The first aggressive IF layout produced seven text intersections. Those were explicitly corrected by tightening Event 01 width and separating Event 05/06 title/date clusters from their numerals. The final collision-free state was re-rendered at all three scales.

## Figma / Drive / GitHub evidence

- preferred IF: `2067:2`;
- chronology page: `2067:28`;
- hidden HT rollback: `2040:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- new generated assets: `0`;
- new Drive writes: `0`;
- new binary uploads: `0`;
- new image hashes: `0`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IF-TIMELINE-VERTICAL-ROUTE-QA-2026-08-21.md`;
- evidence commit: `a2121e448548d8669f8321d7ccae0e9156caf0e3`;
- current-status promotion commit: `8cbbf04574e04cc317b72d5558afc02f58d6d7a4`.

## Adopted / rejected status

- IF final: `ADOPTED / VERIFIED_LOCAL`.
- HT preferred chronology: `SUPERSEDED`, preserved hidden as rollback.
- first IF seven-intersection geometry: `REJECTED / CORRECTED`.
- Event 03 white-on-cream title/copy placement: `REJECTED / RETURNED TO PHOTO`.

## What must remain Rurubu-specific

Do not transfer:

- route position/color/node styling;
- event number sizes or coordinates;
- Event 03 photo/crop/rotation;
- exact dates/event names;
- current palette/type treatment;
- Rurubu-like travel-magazine visual grammar.

## Cross-item applicability hypothesis

When another print item contains true sequential content that passes structural QA but reads as unrelated labels, independently test one functional binding device such as a route/spine. The receiving item must verify its own reading order, physical role, type hierarchy and three-scale clarity. Do not add a route merely because one worked in Rurubu.

Transferable method:

`identify sequential relationship → add one bounded functional binder → allow content/photo hierarchy to break rigidity → inspect real reading order → correct unintended collisions/contrast loss → adopt only if the sequence becomes clearer`.