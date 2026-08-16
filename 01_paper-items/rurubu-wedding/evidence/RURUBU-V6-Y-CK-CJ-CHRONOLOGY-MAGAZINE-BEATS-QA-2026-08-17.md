# Rurubu WEDDING V6 — CJ Chronology Magazine Beats QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Before

Preferred set before this pass:

- Outer Y `1542:2`
- Profile / Q&A CK `1553:79`
- Story / Chronology CI `1551:2`

Visible defect: CI had already removed large timeline boxes, but the chronology still read too much like a numbered timeline. 01—06 retained similar visual treatment and the editorial hierarchy was still driven by sequence markers rather than by photographs and event importance.

## Hypothesis

If native dates/titles preserve sequence, the page does not need six equally assertive numeric markers. Reduce secondary numbers, use restrained color only on major beats, and let Event 1 / 3 / 5 plus the WEDDING terminal carry the page as unequal photo-led magazine moments.

## Bounded clean-room test

Created rollback-safe duplicate:

- CJ root `1554:97` — `PREFERRED / V6_INSIDE_CJ_CHRONOLOGY_MAGAZINE_BEATS_2026_08_17`
- chronology page `1554:122`

Story remained inherited from CI. Chronology changes only:

- title changed to native `ふたりの旅、6つの景色。`;
- deck changed to explain a photo-led reading rather than a timeline UI;
- Event 2 and 4 numeric markers hidden; their date/title/copy remain native and readable;
- Event 1 / 3 / 5 / 6 numeric markers reduced to small colored editorial metadata;
- Event 1 / 3 / 5 titles remain stronger than bridge events 2 / 4;
- existing photos remain replaceable and source/hash state unchanged;
- existing composed travel texture retained at reduced opacity rather than adding new decoration;
- no new image generation, Drive save, raster bytes, external binary placement, card, shadow, or gradient.

## Iteration / rejection evidence

The first CJ layout was not adopted: structure QA found 4 text collisions (title/deck, Event 1 date/number, Event 2 title/copy, Event 5 date/number). The candidate was corrected before promotion.

## Verification

Three-scale review:

- whole spread / 500px: PASS;
- reading / 1200px: PASS;
- actual-size chronology `1554:122` = `794×1123`: PASS.

Final structure:

- visible native text: `28`;
- visible IMAGE fills: `5` (`4` replaceable photos + `1` bounded composed texture);
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible text outside page: `0`;
- image sources/hashes changed: `0`.

Rollback:

- CI `1551:2` renamed `ROLLBACK_HIDDEN / V6_INSIDE_CI_PRE_CJ_CHRONOLOGY_2026_08_17` and hidden.

Start Here readback after promotion:

`V5 FU/FX · V6 Y + CK/CJ INSIDE STUDIES · V7 HOLD`

## Drive readback

V6 root confirmed live:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

No Drive write was required in this pass.

## Decision

CJ adopted as `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY` and preferred over CI. It is not print-ready. Final legitimate photos, final personal copy, exact printer template, PDF preflight and physical proof remain separate gates.
