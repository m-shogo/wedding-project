# RSL-205 — publication mark vs destination weight

Date: 2026-08-22
Source scope/item: Rurubu WEDDING / V8 Outer
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V8 Outer W was already semantically cleaner than earlier cover studies, but at whole-item scale the publication masthead and destination name still competed as two large stacked headings. The supporting abstract image then became a third major band. The cover felt professionally restrained but less decisive than it could be.

## Evidence before change

- current before test: Outer W `2209:2`
- same-scale 500 px screenshot showed a stacked masthead → destination → image rhythm
- destination-specific photographic desire remained below V6

## Root-cause hypothesis

A cover can remain template-like even after cards, badges and decorative English are removed when multiple high-level text roles are given similar visual ownership. Publication identity and issue/destination identity do not necessarily deserve equal scale.

## Professional references used

- IDEA No.391 / Tsutomu Toda: later editorial work moved away from visible multilayered graphism while continuing to pursue the essence of editorial design.
  - https://www.idea-mag.com/en/idea_magazine/391/
- Designing With Type / Typographic Book Cover: begin from hierarchy, logic, content and clarity, then compare arrangements inside a fixed format.
  - https://designingwithtype.com/basel/index.html

These were research observations only; the local test determined adoption.

## Bounded test

Rollback-safe Outer AA `2216:2` from W:

- masthead `るるぶ WEDDING` made one line and reduced from 74 to 48
- article-owned destination `横浜` increased from 112 to 172
- existing V8 ocean-light supporting master resized/repositioned without changing Drive provenance or image hash
- no new image, card, badge, shadow, gradient, sticker, decorative English or invented factual copy
- back cover unchanged

## Expected improvement

A clearer cover-level idea and reading hierarchy: publication mark supports; destination owns; visual master supports the destination-led composition.

## Regression risk

- simply enlarging destination text can become a generic poster trick if the destination is not actually the issue's semantic owner
- oversized Japanese text can wrap or clip if the text box is not widened with it
- demoting the masthead too far can weaken publication identity
- a stronger type hierarchy does not solve missing destination-specific photography

## Three-scale evidence

- 500 px whole item: PASS; AA is more decisive than W
- 1400 px reading: PASS
- 1587×1123 actual size: PASS
- native text: `11`
- IMAGE: `1`
- text intersections: `0`
- 18 px safe risk: `0`
- one-character explicit Japanese lines: `0`

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted current: Outer AA `2216:2`
- hidden rollback: Outer W `2209:2`
- Drive V8 folder: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`
- retained ocean-light master: `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- retained Figma image hash: `be21a846e961b3a13c24c7476f6a01b12b8d07ff`
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-OUTER-AA-DESTINATION-LED-TYPE-COMPOSITION-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-205-PUBLICATION-MASTHEAD-AND-DESTINATION-COMPETE-WITHOUT-CLEAR-CONTENT-OWNERSHIP`

Normalized form:

- operation: editorial cover hierarchy
- symptom: publication mark and issue/destination owner read as competing primary headings
- likely cause: hierarchy determined by inherited format rather than semantic ownership
- corrected method: compare a composition where the publication mark supports and the content owner dominates; verify at three scales
- stop condition: do not promote if publication identity disappears, Japanese text breaks, or the enlarged owner is not semantically justified

## What must remain Rurubu-specific

Do not transfer `横浜`, the 172 px size, V8 navy/cream palette, ocean-light master, exact cover coordinates, Rurubu masthead treatment or front/back composition.

## Cross-item applicability hypothesis

On another print cover or front-facing artifact with both a brand/publication mark and a specific event/place/content owner, independently test whether their visual weights match their semantic jobs before adding decoration. Do not assume the Rurubu result will reproduce unchanged.
