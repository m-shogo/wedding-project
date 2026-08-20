# Rurubu WEDDING V6 — IO Story / Chronology Tall Route Photo QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

Common-scale comparison of current preferred V6 spreads showed Story / Chronology IL as the next useful defect. The left Story page was already strong, but the chronology right page became visually quiet below the upper hero and read as a route rail plus isolated events rather than one continuous photo-led magazine page.

## Hypothesis

The chronology did not need more cards, decoration, or new imagery. Increasing the existing event-3 destination photo's editorial mass and tightening 05/06 around the route rail should create a stronger photo-to-terminal reading path while keeping the six-event sequence native and editable.

## Bounded clean-room-safe test

- IL `2085:2` duplicated to IO candidate `2095:18`.
- Story left was preserved.
- Chronology right kept the existing hero image/hash and event-3 image/hash.
- Event-3 photo was enlarged from approximately `385×318` to `411×390`.
- 05/06 were tightened into a stronger terminal sequence beneath the image.
- No new raster, image hash, Drive save, upload, card, shadow, gradient, or flattened page was introduced.
- Initial structure QA found four small text-bound overlaps; IO was not promoted until they were corrected.

## Three-scale evidence

- whole spread / 500px: PASS; IO is visually stronger than IL because the chronology has a continuous large-photo middle beat and a clearer 05→06 terminal.
- reading spread / 1400px: PASS.
- actual-size chronology right `2095:44 / 794×1123`: PASS.
- visible native text across spread: `39`.
- visible IMAGE fills across spread: `6`.
- chronology-right native text: `27`.
- chronology-right visible IMAGE fills: `2`.
- absolute text intersections after correction: `0`.
- chronology-right 18px text safe-area risks: `0`.
- whole-page flattening: NO.
- replaceable photo roles preserved: YES.

## Asset / provenance evidence

No asset lifecycle mutation occurred in this experiment.

- top chronology hero hash remains `e3738476f760932bb5b09c9d60f174dd6c84049d`.
- enlarged event-3 photo hash remains `439a719d73f28e8dd2889f2026cccb15f345ec63`.
- Drive V6 root reverified before the experiment: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- generated assets: `0`.
- adopted generated assets: `0`.
- new Drive saves: `0`.
- new uploads: `0`.
- new image hashes: `0`.

## Promotion / rollback

- IO `2095:18` → `PREFERRED / V6_INSIDE_IO_STORY_CHRONOLOGY_TALL_ROUTE_PHOTO_2026_08_21`, visible at x=`275600`, y=`0`.
- IL `2085:2` → `ROLLBACK_HIDDEN / V6_INSIDE_IL_STORY_CONTINUOUS_PHOTO_BRIDGE_2026_08_21`.
- V7 was not touched.

Decision: `IO ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## What remains unresolved

This is dummy-design QA, not print readiness. Final legitimate photography/copy, longer real text stress, printer template, bleed/trim/fold requirements, PDF preflight, and physical proof remain separate gates.
