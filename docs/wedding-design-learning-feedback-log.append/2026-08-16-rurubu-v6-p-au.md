# 2026-08-16 — Rurubu V6 P / AU design feedback

Scope: Rurubu WEDDING only

## Observation

The run opened with `Outer O + Profile/Q&A AT + Story/chronology AS` as preferred.

Two screenshot-visible problems remained when the three preferred studies were judged as one magazine system:

- AT Q&A still read too much like one questionnaire/form rail and left passive cream space below the main image;
- Outer O back chronology still used six nearly equal entries in a 3×2 arrangement, weaker than AS's more editorial chronology rhythm.

Neutral non-Rurubu `NRSL-004` was consumed only as a hypothesis: adding recognizable destination imagery is not a substitute for hierarchy/art direction. No non-Rurubu item-specific state or literal design was used.

## AU experiment — Q&A

Bounded rollback-safe duplicate:

- source AT `1392:95`
- study/adopted AU `1394:2`

Tested principle:

- preserve all six native editable Q&A groups;
- preserve existing replaceable photo roles;
- break the uniform rail into unequal editorial beats around a larger legitimate memory-photo anchor;
- use typography/photo hierarchy before adding decorative cards or generated atmosphere.

Expected improvement:

- less form-like reading;
- stronger magazine interview hierarchy;
- better use of the lower page without sacrificing editability.

Regression risk:

- unclear question order;
- long answers colliding after photo enlargement;
- over-asymmetry becoming decorative noise.

Result:

- `VERIFIED_LOCAL / ADOPTED`;
- 500 px thumbnail PASS;
- 900 px reading PASS;
- actual Q&A `794×1123` PASS;
- native text `24`, replaceable IMAGE `2`;
- text collision `0`, 18 px safe-area risk `0`;
- hero `430×420` from `732×498` intrinsic;
- support `220×200` from `240×220` intrinsic.

Fresh long-answer proof:

- `1397:2 / QA_EVIDENCE / V6_AU_LONG_ANSWER_STRESS_PASS_2026_08_16`;
- six realistic Japanese answers;
- auto-height native text;
- actual-size PASS;
- collision `0`, safe risk `0`, outside-page text `0`.

AT remains hidden rollback.

## P experiment — back-cover chronology

Bounded rollback-safe duplicate:

- source O `1370:2`
- study/adopted P `1397:64`

Tested principle:

- keep all six chronology facts native;
- stagger the first five rather than keep a regular 3×2 grid;
- make `2026.10.24 / WEDDING` a strong endpoint band;
- preserve all existing photos/masthead/front geometry.

Expected improvement:

- reduce grid/list reading;
- make the back cover cohere better with AS chronology;
- give the book a clearer final temporal endpoint.

Regression risk:

- the endpoint becoming too heavy;
- factual order becoming ambiguous;
- back cover competing with the front.

Result:

- `VERIFIED_LOCAL / ADOPTED`;
- 500 px thumbnail PASS;
- 900 px reading PASS;
- actual back `794×1123` PASS;
- native text `18`;
- text collision `0`, 18 px safe-area risk `0`;
- all three active back images remain at or below verified intrinsic dimensions.

O remains hidden rollback.

## Current winner

Start Here `845:27`:

`V5 FU/FX · V6 P + AU/AS INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer P `1397:64`
- Profile/Q&A AU `1394:2`
- Story/chronology AS `1392:2`

## Asset-state truth

This run:

- generated: `0`
- new Drive saves: `0`
- new external Figma binary placement: `0`
- adopted generated section decoration: `0`
- existing verified photo-role recomposition: `YES`
- native variable/factual text preserved: `YES`
- new visually verified preferred studies: `P`, `AU`
- AU long-copy stress: `PASS`
- V7 changed: `NO`

Drive V6 root was repeatedly read back as `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`; existing generated section masters remain present but not adopted.

## Learning / next application

Adopted lesson:

- `RSL-036 — Break repeated Q&A out of one form rail before adding decoration`
- state `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Rurubu-specific and not transferable literally:

- exact P/AU node geometry;
- numbering colors;
- endpoint colors;
- Hawaii/Yokohama image choices;
- question grouping;
- title/copy treatment.

Next V6 work should continue from P + AU/AS and address only screenshot-visible remaining system incoherence. Do not reopen V7 while V6 final-content, print-template and proof gates are still open.

Evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-P-AU-AS-QA-2026-08-16.md`.
