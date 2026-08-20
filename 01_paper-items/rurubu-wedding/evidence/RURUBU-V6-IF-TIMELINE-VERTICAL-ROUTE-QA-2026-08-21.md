# Rurubu WEDDING V6 — IF Vertical-route Chronology QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem observed

After IE replaced the weak Gourmet/Cafe spread, the common 500px preferred-set comparison identified the HT chronology right page as the next visual bottleneck. HT was structurally clean, but its six events floated as separate text islands across a large cream field. The page had two useful photographs yet the chronological relationship itself remained visually weak.

## Root-cause hypothesis

The problem was not lack of decoration or lack of events. The six moments lacked a single editorial reading device that could make them feel like one journey. A bounded vertical travel-route rail, alternating event clusters, and a stronger Event 03 photo should create a continuous chronology without reverting to cards, table rows, or generic dashboard modules.

## Bounded clean-room test

IF `2067:2` was created as a rollback-safe duplicate of HT `2040:2`.

- left story page was inherited and intentionally left unchanged;
- right page became `2067:28 / PAGE / TIMELINE_EDITORIAL_IF_VERTICAL_ROUTE`;
- existing route rail and six route nodes were activated and reoriented vertically;
- existing native event numerals and title/copy stacks were redistributed into an asymmetric chronology;
- Event 03 existing replaceable photograph was enlarged and rotated slightly as the mid-page photo anchor;
- Event 03 white title/copy was moved back onto the photograph after reading-scale review showed it had lost contrast on the cream field;
- unresolved facts/dates were not invented;
- no cards, rounded containers, shadows, gradients, or flattened page image were introduced.

## Iteration failures corrected before promotion

The first IF structure audit found seven unintended text intersections, primarily numeral-to-title/date contacts created by the aggressive editorial geometry. These were not accepted as intentional magazine overlap.

Corrections included:

- tightening Event 01 title/copy width and separating its stack from `01`;
- moving Event 05 stack right of `05`;
- separating Event 06 date/title stack from `06`;
- keeping Event 03 white title/copy inside the photo rather than on cream.

Final readback returned zero unintended text intersections and zero 18px text safe-area risks.

## Three-scale evidence

### Whole item / 500px

PASS. Compared with HT, IF reads more clearly as a chronology rather than a set of floating event labels. The top photographic hero remains dominant, the vertical route provides a continuous editorial spine, and Event 03 becomes a strong secondary photographic stop.

### Reading / 1400px

PASS after correction. The chronology has distinct `01`, `02`, `03`, `04`, `05`, `06` roles, readable native event copy, and deliberate asymmetric whitespace. Event 03 title/copy now has image contrast; Event 05 and Event 06 are separated from their numerals.

### Actual size / 794×1123

Right page `2067:28`: PASS. The hero title, route spine, Event 03 photograph, Event 05 date, Event 06 date/wedding terminal and folio remain readable. No obvious crop or text clipping was observed.

## Structure QA

Final IF timeline `2067:28`:

- visible native text nodes: `27`;
- visible IMAGE fills: `2`;
- absolute text intersections: `0`;
- 18px text safe-area risks: `0`;
- whole-page flattening: NO;
- existing replaceable photo roles preserved: YES;
- unresolved dates/details invented: NO.

## Promotion / rollback

- IF `2067:2` promoted to `PREFERRED / V6_INSIDE_IF_TIMELINE_VERTICAL_ROUTE_CLEANROOM_2026_08_21` at x=`275600`, y=`0`;
- HT `2040:2` renamed `ROLLBACK / V6_INSIDE_HT_TIMELINE_NATIVE_HIERARCHY_SUBTRACTION_2026_08_20` and hidden;
- HT was not deleted and remains rollback/comparison evidence.

Decision: `IF ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Drive / asset truth

This experiment changed composition only. It reused existing verified Rurubu image fills already present in HT.

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive master saves: `0`;
- new Drive derivatives: `0`;
- new external binary uploads: `0`;
- new image hashes: `0`.

Drive V6 root remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Transferable hypothesis: when chronological content is structurally valid but reads as independent labels floating in whitespace, first test a single functional route/spine that binds the moments, then allow photos and event scales to break the rail asymmetrically. Do not transfer IF's exact rail, numbers, photos, palette, dates, or Rurubu grammar.

## Completion boundary

This is verified dummy-design QA only. Final legitimate photography/copy, printer template, bleed/trim/fold specifications, exported PDF preflight, and physical proof remain separate gates.