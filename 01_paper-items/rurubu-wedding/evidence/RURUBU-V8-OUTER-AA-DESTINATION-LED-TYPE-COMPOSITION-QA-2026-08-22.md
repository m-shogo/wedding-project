# Rurubu WEDDING V8 — Outer AA Destination-led Type Composition QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authority before test

- V6 control preserved: `JC + IX + JB + IZ + IT + JA`
- V7 six-role comparison set preserved
- V8 current before this test: `W + Z + Q + R + X + T`
- Outer W: `2209:2`
- verified Drive V8 folder: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`
- current Outer supporting master: Drive `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`, existing Figma image hash `be21a846e961b3a13c24c7476f6a01b12b8d07ff`

## Visible problem

Outer W had already removed redundant internal English and made `横浜` the semantic destination anchor, but the front still read as a stacked hierarchy of masthead → destination → image. At thumbnail scale the masthead and destination competed for attention, and the abstract ocean-light master still contributed a generic editorial-book atmosphere rather than unmistakable destination identity.

The defect was not missing decoration. The cover needed a more decisive hierarchy using the content it already owned.

## Fresh professional research

### IDEA No.391 — Tsutomu Toda / editorial design

IDEA describes Toda's later editorial work as moving away from visibly multilayered graphism while continuing to explore the essence of editorial design. This reinforced a test direction based on hierarchy and underlying composition rather than adding surface devices.

Source: https://www.idea-mag.com/en/idea_magazine/391/

### Designing With Type — Typographic Book Cover

The assignment explicitly starts from text hierarchy, logic, content and clarity, then compares arrangements within a fixed format instead of relying on decorative effects. This reinforced a bounded cover-composition test where the destination name carries the dominant visual role.

Source: https://designingwithtype.com/basel/index.html

Research observations were treated as hypotheses, not project rules.

## Hypothesis

For this V8 book-edition cover, reducing the masthead to a single-line publication mark and promoting the article-owned destination name into the dominant typographic field would make the cover more specific and professionally defendable without adding a new image, sticker, card, badge, gradient, shadow or decorative English.

## Rollback-safe test

Created candidate:

- **Outer AA `2216:2`**
- initial test position: x `1800`, y `3200`
- cloned only from current Outer W for rollback safety

Bounded front-cover changes:

- `るるぶ\nWEDDING` → native editable `るるぶ WEDDING`
- masthead scale `74 → 48`
- destination `横浜` scale `112 → 172`
- ocean-light supporting image repositioned and resized from `647×326` at y `480` to `647×386` at y `420`
- existing native front headline repositioned within the same verified supporting image
- back cover unchanged
- Drive master and existing image hash unchanged

No new factual copy was invented.

## Professional critique

### Art director

PASS. The cover now has one obvious idea: this is the Yokohama edition. The hierarchy can be defended from content ownership rather than from decorative novelty.

### Editorial designer

PASS. `TRAVEL BOOK / 2026` → `るるぶ WEDDING` → `横浜` → image/headline → deck now has a more decisive reading order.

### Book designer

PASS locally. The front is more cover-like and less like a sequence of stacked UI/content modules. The back remains intentionally quieter and index-led.

### Typographer

PASS after actual-size review. The new single-line masthead and large two-character destination field retain clean Japanese line behavior with no one-character explicit line fragments.

### Photo editor

CONDITIONAL. The abstract ocean-light master remains only a supporting visual and still does not provide V6-level destination-specific photographic desire. It is not relabeled as Yokohama photography.

### Print designer

PASS for current design-study geometry. Final printer template, bleed, trim, fold, effective PPI, PDF preflight and physical proof remain separate gates.

## Three-scale QA

- whole / 500 px: PASS; destination hierarchy is stronger than W and remains legible at thumbnail scale
- reading / 1400 px: PASS; masthead no longer competes with destination, native headline remains readable on the supporting image
- actual / 1587×1123: PASS; no unintended wrap or visual collision found

## Structural QA

Outer AA `2216:2`:

- visible native text: `11`
- current IMAGE roles: `1`
- text intersections: `0`
- 18 px safe-area risks: `0`
- one-character explicit Japanese lines: `0`
- whole-page flattening: `0`
- current IMAGE hash: `be21a846e961b3a13c24c7476f6a01b12b8d07ff`

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- existing V8 ocean-light supporting master retained with unchanged provenance

The run does not claim a new `generation → Drive → Figma` closure.

## Decision

**ADOPT Outer AA `2216:2` as V8 Current.**

- previous Outer W `2209:2` preserved as hidden rollback
- V6 control unchanged
- V7 comparison unchanged
- V8 is still not the global winner
- V8 is still not print-ready

AA is locally stronger than W because destination identity owns the hierarchy more decisively, not because it adds more visual material.

## Learning state

`RSL-205 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:

`F-RSL-205-PUBLICATION-MASTHEAD-AND-DESTINATION-COMPETE-WITHOUT-CLEAR-CONTENT-OWNERSHIP`

The transferable hypothesis is not “make place names huge.” It is: when a cover contains both a publication mark and a specific destination/content owner, test whether their visual weights accurately reflect their semantic jobs before adding decorative layers.
