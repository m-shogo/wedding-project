# Rurubu WEDDING V6 — EL Cafe numbered second-feature QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Observed defect

Preferred Cafe/Table EF `1734:2` was structurally sound, but the Cafe left page remained one of the quietest V6 pages. The lower view-photo role and its copy read as a small image placed beside text rather than a deliberate second editorial beat.

## Root-cause hypothesis

The page did not need another photograph or container. It needed stronger scale contrast and a clearer relationship between the existing source-safe view photo and native typography.

## Bounded tests

1. `1788:2` moved the small view photo to the right and floated the copy below the texture field. Whole-page review showed more dead paper and weaker binding. **REJECTED** and hidden.
2. `1789:2` retained the verified `238×218` replaceable view photo on the left, introduced a large native cyan `02`, and regrouped the view title/copy/check information into one second-feature beat. A first structure audit found an 18px overlap between `02` and the view title; the title/copy group was shifted right before promotion.

## Adopted state

`1789:2 / PREFERRED / V6_INSIDE_EL_CAFE_NUMBERED_SECOND_FEATURE_2026_08_19`

Previous EF `1734:2` is preserved as hidden rollback.

### Three-scale evidence

- whole-item / 500px: PASS; `01` and `02` read as intentionally unequal editorial beats and the spread remains balanced against the image-heavy Table page;
- reading / 1200px: PASS; second-feature hierarchy is clearer than EF without adding a card or image;
- actual-size Cafe page `1789:3`, 794×1123: PASS; native copy remains readable and the source-safe photo does not need enlargement.

### Structure evidence

Cafe left page:
- visible native text: 17;
- absolute text collisions: 0;
- 18px text safe-area risks: 0;
- composed travel texture remains `720×430`;
- replaceable view photo remains `238×218`, rotation ≈ `+1.5°`;
- no image hash/source changes.

Table right page is unchanged from EF:
- visible native text: 19;
- absolute text collisions: 0;
- 18px text safe-area risks: 0;
- dining hero remains `732×498`;
- travel-object photo remains `320×235`, rotation ≈ `-2.5°`.

## Asset lifecycle

- newly generated assets: 0
- adopted generated assets: 0
- new Drive saves: 0
- new external binary placements: 0
- new image hashes: 0
- image source changes: 0
- native text preserved: YES
- replaceable photography preserved: YES
- rollback preserved: YES
- V7 touched: NO

Drive authority remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Decision

`VERIFIED_LOCAL / ADOPTED AS V6 CAFE-TABLE PREFERRED`

What remains Rurubu-specific: exact `01/02/03` color hierarchy, Japanese copy, cafe/photo placement, palette, travel-magazine grammar and coordinates.
