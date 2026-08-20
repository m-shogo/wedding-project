# RSL-159 — Mature photo + native-type hierarchy can retire redundant decorative bars

Source scope/item: Rurubu WEDDING / V6 Story + Chronology
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

HR had already solved the major timeline problem with a photo-boundary staircase, yet three rectangles remained from earlier iterations: a yellow kicker field, an Event 05 underline, and a WEDDING terminal rule. At whole/page/actual size they no longer performed unique contrast or binding work and left a residual component/timeline-UI reading.

## Root-cause hypothesis

A container/rule that was useful earlier can become redundant after photo hierarchy and native typography mature. If order, contrast and grouping remain legible without it, subtraction can increase editorial confidence and reduce UI/template character.

## Bounded test

Rollback-safe HT `2040:2` from preferred HR `2033:111`:

- Story left page unchanged;
- hero and Event 03 photos unchanged;
- hide yellow timeline-kicker rectangle;
- hide Event 05 editorial rule;
- hide WEDDING terminal rule;
- hide the now-unreadable tiny kicker text after its background was removed;
- rebalance Event 05/06 native numerals/date/title stacks without introducing a new container;
- preserve 02/04 as minor bridge events;
- no new imagery or hashes.

## Expected improvement

Cleaner Japanese travel-magazine chronology, fewer diagram/UI cues, stronger reliance on photo + Japanese typography, and unchanged editability/photo replaceability.

## Regression risk

Removing a bar can destroy contrast, grouping or closure. Subtraction must therefore be tested per role, not applied as a blanket 'remove boxes/lines' rule. It can also expose spacing problems that the old container visually hid.

## Three-scale evidence

- whole spread: HT visually preferred to HR;
- page/reading scale: 01 → 03 → 05 → 06 remains clear without the three decorative rectangles;
- actual-size timeline `2040:28 / 794×1123`: PASS;
- visible native text: `27`;
- visible image roles: `2`;
- text collisions: `0`;
- 18px safe-area risks: `0`;
- page-level stray text: `0`.

## Failure fingerprint / method change

`DECOR_SUBTRACTION_EXPOSES_SPACING_COLLISION`

The first HT layout passed visual inspection but structure QA found Event 05 date/number/title/body collisions and right-safe-area violations. The decorative bars had not caused those contacts, but subtracting them exposed that the new stronger 05 hierarchy needed fresh spacing. The method changed from cosmetic acceptance to structure-driven repositioning before promotion.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted HT: `2040:2`
- timeline right: `2040:28`
- hidden rollback HR: `2033:111`
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HT-TIMELINE-NATIVE-HIERARCHY-SUBTRACTION-QA-2026-08-20.md`

## Adopted / rejected status

`VERIFIED_LOCAL`, adopted as preferred HT. HR is preserved hidden for rollback.

## What must remain Rurubu-specific

Exact chronology, Yokohama/travel images, Japanese copy, photo geometry, number sizes, color palette, and the travel-magazine page grammar.

## Cross-item applicability hypothesis

On a materially different print artifact, when decorative rules/fields remain after hierarchy has matured, independently test removing one bounded decorative role. Keep it removed only if order, contrast, safe area, actual-size readability and closure remain equal or better. Do not copy Rurubu geometry or styling.
