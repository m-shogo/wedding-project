# RSL-053 — Bounded composed texture can connect a semantic flow; subtraction can go too far

Date: 2026-08-16
Source scope: `Rurubu WEDDING / V6`
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

Two related V6 defects were tested:

1. Profile/Q&A BT was structurally safe but the Q&A page still split into a left question list and right photo area, with a large cream field making it feel template-like.
2. Outer W back-cover timeline still used three flat colored year blocks, raising the possibility that subtraction alone could make it more editorial.

## Root-cause hypothesis

A. When repeated native information already has sufficient hierarchy, a **single bounded composed decoration** can supply editorial continuity across the empty field without turning each item into a card.

B. Conversely, removing all flat labels is not automatically better. In an information-magazine grammar, a small number of strong colored labels can be part of the useful editorial energy rather than UI clutter.

## Bounded tests

### BW Q&A — adopted

Source: BT `1488:2`
Candidate/promoted: BW `1502:2`
Q&A page: `1502:38`
Composed role: `1502:75 / DECOR / QA_ROUTE_TEXTURE_COMPOSED_RASTER`

Test:

- reuse an already verified Rurubu textless travel-route composed raster as a **new bounded crop/role**;
- keep question/answer copy native;
- keep both photos separately replaceable;
- tighten Q4–Q6 reading positions;
- do not create six card backgrounds.

Expected improvement:

- reduce dead cream/template impression;
- visually connect the lower question flow;
- retain strong Q1/Q4 and photo hierarchy.

Regression risks:

- texture could become repeated wallpaper;
- Q4 could collide with/slide under the hero photo;
- decorative continuity could become weaker than actual hierarchy.

Observed intermediate failure:

`TEXT_UNDER_PHOTO_DUE_TO_Z_ORDER_AND_OVERWIDE_COPY_BOX`

The first BW pass allowed Q4 native text to extend under the hero image. It was repaired before promotion by reducing the Q4 native text box and rebalancing the decoration.

Final three-scale evidence:

- whole-item `500px`: PASS;
- spread/reading `1200px`: PASS;
- actual Q&A `794×1123`: PASS.

Structure evidence:

- native text `25`;
- replaceable IMAGE roles `2`;
- text/text collision `0`;
- unintended text/photo collision `0`;
- 18px text safe-area risk `0`.

Result: `VERIFIED_LOCAL / ADOPTED`.

### Outer X — rejected

Source/preferred: Outer W `1491:2`
Comparison: Outer X `1506:2`

Test:

- remove magenta/teal/yellow year blocks;
- preserve Wedding terminal;
- use varied year typography only.

Expected improvement:

- reduce UI-like block feeling.

Observed result:

- block/UI feeling decreased;
- travel-information-magazine energy also decreased;
- back cover became too quiet at thumbnail/reading scale;
- W remained stronger.

Failure fingerprint:

`OVER_SUBTRACTION_REMOVES_EDITORIAL_ENERGY`

Result: `REJECTED / HIDDEN`.

## Generalizable principle

Before adding more cards or shapes to a sparse repeated-information section:

1. confirm whether the problem is missing hierarchy or missing continuity;
2. if hierarchy already exists, test **one bounded composed non-semantic decoration** behind the flow rather than many live ornament layers;
3. keep all variable/factual copy native and all replacement images independent;
4. verify decoration at thumbnail, reading and actual-size scales;
5. if removing existing flat labels makes the page quieter rather than clearer, treat those labels as editorial anchors, not automatically as UI clutter.

This is not permission to reuse the same texture everywhere. A composed role requires a concrete visible defect and must remain subordinate to photos/typography.

## What must remain Rurubu-specific

Do NOT transfer literal:

- the BW route texture/crop;
- magenta/cyan/yellow/navy palette;
- 01/04 Q&A emphasis;
- Outer W year geometry;
- Rurubu photography or exact Japanese travel-guide art direction.

Cross-item transfer is limited to the decision logic: bounded composed continuity versus over-subtraction.

## Evidence

- Figma preferred: `1502:2 / PREFERRED / V6_INSIDE_BW_QA_COMPOSED_ROUTE_2026_08_16`
- Figma rejected comparison: `1506:2 / REJECTED / V6_OUTER_X_BACK_TIMELINE_TOO_QUIET_2026_08_16`
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BW-BV-QA-COMPOSED-ROUTE-QA-2026-08-16.md`
- Drive V6 authority remains: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
