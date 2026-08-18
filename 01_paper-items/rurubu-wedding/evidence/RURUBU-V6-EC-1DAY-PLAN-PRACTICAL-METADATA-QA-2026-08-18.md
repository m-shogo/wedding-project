# RURUBU V6 EC — 1DAY Plan Practical Metadata QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Source preferred: DX `1714:2`
Adopted preferred: EC `1723:63`
Rollback: DX renamed and hidden

## Visible problem

DX had already solved the exact hero/STOP01 photo duplication and had a strong photo-led model-course composition. Fresh whole/read/actual-size review still showed a travel-guide density gap on the right page: each STOP contained time + title + one short sentence, so the sequence looked editorially clean but not yet as practically scannable as a real travel-information spread.

## Root-cause hypothesis

The missing quality was not another photo, card or decorative surface. The STOP beats needed a second layer of compact reader-facing metadata tied directly to the existing sequence.

## Bounded test

Created rollback-safe candidate `1723:63 / CANDIDATE / V6_INSIDE_EC_1DAY_PLAN_PRACTICAL_METADATA_2026_08_18` from DX.

Only four native text roles were added under existing STOP copy:

- STOP 01: `MOVE / WALK　　MOOD / MORNING`
- STOP 02: `BREAK / CAFE　　PACE / SLOW`
- STOP 03: `MOVE / WALK　　STYLE / DETOUR`
- STOP 04: `TABLE / DINNER　　MOOD / RELAX`

No existing photo, route line, time, title, copy, color field or crop was changed.

## Failure / recovery evidence

1. First write failed atomically because `node.query()` was given a selector containing `/`. Per Figma atomic-write behavior, no mutation occurred.
2. Corrected script created EC and the four metadata nodes, but cloned text nodes landed at page root rather than inside the candidate right page. Structural readback detected that all four had parent `0:1 / 01_RURUBU_WEDDING`, so the candidate screenshot had not actually changed.
3. The four nodes were reparented into `1723:90 / PAGE / V6_1DAY_RIGHT`, local coordinates restored, then QA was rerun.

This is evidence that transport/create success alone is not completion; parent/placement readback remains mandatory.

## Three-scale visual evidence

- whole spread 1200px: PASS;
- reading scale: PASS; the added metadata is subordinate to STOP number/title and does not create a card grid;
- actual-size right page `1723:90`, `794×1123`: PASS; practical metadata is readable and improves scan density.

## Structure QA

- EC visible native text total: `44`;
- EC right page visible native text: `25`;
- right-page text collisions: `0`;
- 18px right-page text safe-area risks: `0`;
- visible IMAGE roles: `5`, unchanged from DX;
- image geometry and hashes: unchanged from DX;
- all five images remain independently replaceable.

## Drive / asset lifecycle

Drive V6 root re-read:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

This experiment required no image generation, no Drive save, no binary upload and no new image hash.

## Decision

`VERIFIED_LOCAL / ADOPTED`.

EC is stronger than DX because it adds useful travel-guide scan density without reintroducing cards or weakening the photo-led hierarchy. DX remains hidden rollback.

## Regression risk

Small metadata can become production-note filler if it describes design mechanics instead of reader-useful meaning. Final copy should remain reader-facing and native/editable, and exact practical claims must be verified when real itinerary facts replace dummy content.
