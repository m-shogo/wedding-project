# Rurubu WEDDING V8 — Outer AB Back-cover Reading Gate QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Previous current: Outer AA `2216:2`
New current: Outer AB `2218:2`
V6 control: frozen `JC + IX + JB + IZ + IT + JA`
V7: preserved six-role comparison set

## Professional research used

Fresh references used for this bounded test:

- Eye on Design / AIGA, **Five Beautiful Book Covers and the Stories Behind Them**: a cover should culminate the concept, logic and internal system of the book rather than behave as an unrelated wrapper.
- Designing With Type, **Typographic Book Cover**: compare hierarchy and arrangements inside a fixed format; hierarchy should come from logic, content and clarity rather than decorative complexity.

Rurubu-specific hypothesis: the back cover should not merely repeat five equal lines because the first item is the reader's entry into the publication. A small reader-owned label plus a clearly stronger first entry can make the back-cover navigation feel like part of the book's editorial system rather than a generic list.

This is not a rule that the first item must always be largest. The test is valid only when the first entry actually functions as the reading gateway.

## Before — Outer AA `2216:2`

Back cover:

- `BACK_INDEX` was five equal lines: `01 ふたり / 02 物語 / 03 記憶 / 04 食卓 / 05 1DAY`.
- the index existed as useful navigation, but its equal cadence was visually detached from the rest of the back-cover hierarchy.
- large whitespace separated body copy and navigation without a reader-facing bridge.

Front cover:

- unchanged in this experiment.
- destination-led `横浜` hierarchy and existing ocean-light supporting master remain intact.

## Bounded experiment

Created rollback-safe duplicate **AB `2218:2`**.

Back cover changes only:

- added native reader-facing label `この本の中身`;
- moved the existing functional rule so it binds the label to navigation instead of crossing the first line;
- retained all five native navigation entries and order;
- increased only `01 ふたり` from 20px to 34px as the publication entry point;
- retained 02–05 at 20px;
- no new image, card, badge, pill, shadow, gradient, sticker or decorative English;
- no facts were invented;
- front cover remained unchanged.

The first draft placed the rule through the enlarged first entry. It was rejected before promotion. The rule was moved above the navigation block and the three-scale QA was repeated.

## Three-scale visual QA

### Whole-item / thumbnail — 500px

PASS.

- back cover has a clearer reading gate and is easier to parse at thumbnail scale;
- `01 ふたり` is visibly the entry point without turning the back into a dashboard;
- front/back still read as one restrained V8 book system.

### Reading scale — 1400px

PASS.

- `この本の中身 → rule → 01 ふたり → 02–05` reads in a deliberate sequence;
- the navigation block no longer reads as a floating equal list;
- whitespace remains controlled rather than filled with decoration.

### Actual size — 1587×1123

PASS.

- Japanese text remains legible;
- no accidental one-character explicit line ending was introduced;
- the new label and enlarged first entry remain optically balanced with the existing title/body.

## Structure QA

For Outer AB:

- visible native text: `12`
- IMAGE roles: `1`
- text intersections: `0`
- 18px safe-area risks: `0`
- one-character Japanese explicit-line heuristic: `0`
- whole-page flattening: `0`

Existing generated image role remains:

- Drive master: `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- in-file image hash: `be21a846e961b3a13c24c7476f6a01b12b8d07ff`
- role remains abstract supporting atmosphere, **not** Yokohama photography.

## Promotion / rollback

- AB `2218:2` promoted to Current.
- AA `2216:2` renamed as rollback and hidden.
- AA was moved away from the Current presentation area; it was not deleted.
- V6 and V7 were not modified.

## Learning result

State: `RSL-206 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:

`F-RSL-206-FUNCTIONAL-INDEX-REMAINS-GENERIC-WHEN-EVERY-ENTRY-HAS-EQUAL-VISUAL-WEIGHT`

Meaning: even when navigation is functionally correct and contains no cards, a publication's back-cover index can still feel generic if every entry receives equal cadence despite a genuine reader-entry role. Before adding decoration, test whether the navigation hierarchy reflects how the publication is actually entered and read.

Do not transfer the exact navy field, line position, 34px first entry, wording, or Rurubu content order to other items.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`

No approval-free new image generation route was available in this run. No unrelated image was substituted to satisfy an image quota.

## Current decision

Outer AB is locally stronger than AA for back-cover editorial navigation and remains weaker than V6 in destination-specific photographic desire. V8 is not promoted as global winner and is not print-ready.