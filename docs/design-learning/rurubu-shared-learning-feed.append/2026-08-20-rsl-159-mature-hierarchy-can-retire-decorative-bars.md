# RSL-159 — Mature photo + native-type hierarchy can retire redundant decorative bars

Source scope/item: Rurubu WEDDING / V6 Story + Chronology, Profile + Q&A
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

Two mature V6 spreads still retained decorative bars from earlier iterations after photo/native-type hierarchy had become strong enough to carry structure on its own.

- HR chronology retained a yellow kicker field, Event 05 underline, and WEDDING terminal rule.
- HK Q&A retained four thin separator/binding rules around Q01, Q02/Q03 and the final Q05/Q06 section.

At whole/page/actual size, these shapes increasingly read as timeline/form components rather than unique editorial structure.

## Root-cause hypothesis

A rule or field that was useful earlier can become redundant after photo hierarchy and native typography mature. If order, contrast and grouping remain legible without it, subtraction can increase editorial confidence and reduce UI/template character. But any field that still performs unique contrast/category work must remain.

## Bounded test A — chronology HT

Rollback-safe HT `2040:2` from preferred HR `2033:111`:

- Story left page unchanged;
- hero and Event 03 photos unchanged;
- hid yellow timeline-kicker rectangle;
- hid Event 05 editorial rule;
- hid WEDDING terminal rule;
- hid the now-unreadable tiny kicker text after its background was removed;
- rebalanced Event 05/06 native numeral/date/title stacks without introducing a new container;
- preserved 02/04 as minor bridge events;
- no new imagery or hashes.

## Bounded test B — Q&A HU

Rollback-safe HU `2044:2` from preferred HK `2027:2`:

- Profile left page unchanged;
- hero/support photos unchanged;
- hid Q01 magenta binding rule;
- hid Q02/Q03 navy binding rule;
- hid support-photo magenta rule;
- hid Q05/Q06 yellow rule;
- deliberately kept the yellow Q&A section field and cyan hero-photo caption because they still provide meaningful category/contrast function;
- no copy, image geometry, image hash or photo-role changes.

## Expected improvement

Cleaner Japanese travel-magazine rhythm, fewer diagram/form cues, stronger reliance on photo + Japanese typography, unchanged editability/photo replaceability.

## Regression risk

Removing a bar can destroy contrast, grouping or closure. Subtraction must therefore be tested per role, not applied as a blanket 'remove boxes/lines' rule. It can also expose spacing problems that the old container visually hid.

## Three-scale evidence

### HT chronology

- whole spread: HT visually preferred to HR;
- page/reading scale: 01 → 03 → 05 → 06 remains clear;
- actual-size timeline `2040:28 / 794×1123`: PASS;
- native text `27`, image roles `2`, collisions `0`, safe risks `0`, stray text `0`.

### HU Q&A

- whole spread: HU visually preferred to HK;
- page/reading scale: Q01→Q06 remains clear without four separator rules;
- actual-size Q&A `2044:49 / 794×1123`: PASS;
- native text `29`, replaceable photos `2`, collisions `0`, safe risks `0`, stray text `0`.

## Failure fingerprint / method change

`DECOR_SUBTRACTION_EXPOSES_SPACING_COLLISION`

The first HT layout passed visual inspection but structure QA found Event 05 date/number/title/body collisions and right-safe-area violations. The method changed from cosmetic acceptance to structure-driven repositioning before promotion.

HU did not reproduce that collision fingerprint: because it only removed non-structural rules and left text/photo geometry unchanged, its first structure audit returned zero collisions and zero safe-area risks.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted HT: `2040:2`; timeline right `2040:28`; hidden rollback HR `2033:111`
- adopted HU: `2044:2`; Q&A right `2044:49`; hidden rollback HK `2027:2`
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- chronology QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HT-TIMELINE-NATIVE-HIERARCHY-SUBTRACTION-QA-2026-08-20.md`
- Q&A QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HU-QA-RULE-SUBTRACTION-QA-2026-08-20.md`

## Adopted / rejected status

`VERIFIED_LOCAL`, independently reproduced in two Rurubu V6 spread roles. This is still not `VERIFIED_CROSS_ITEM`; no non-Rurubu item-specific design was inspected or copied.

## What must remain Rurubu-specific

Exact chronology/Q&A content, Yokohama/travel images, Japanese copy, photo geometry, number sizes, palette, and travel-magazine page grammar.

## Cross-item applicability hypothesis

On a materially different print artifact, when decorative rules/fields remain after hierarchy has matured, independently test removing one bounded decorative role. Keep it removed only if order, contrast, safe area, actual-size readability and closure remain equal or better. Do not copy Rurubu geometry or styling.
