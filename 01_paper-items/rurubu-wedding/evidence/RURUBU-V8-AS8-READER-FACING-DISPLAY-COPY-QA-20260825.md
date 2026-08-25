# RURUBU V8 AS8 — Reader-facing display copy QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Research observation

This pass deliberately rotated away from pagination / section numbering / source-truth-only checks and studied picture editing + food editorial production.

High-quality references used:

- Aperture, **How Not to Design a Photobook** — picture edit and sequence are a core editorial responsibility, not a decorative afterthought: https://aperture.org/editorial/design-photobook/
- Aperture, **How to Produce a Photobook** — image selection, sequence, format, paper and binding interact; design should not be isolated from the actual image material: https://aperture.org/editorial/how-to-produce-a-photobook/
- Aperture, **Design Books to Know** — image scale and placement should respond to the internal structure of individual photographs rather than rigidly applying one grid treatment: https://aperture.org/editorial/design-books-know/
- Bon Appétit, **How We Develop Recipes in the Bon Appétit Test Kitchen** — food imagery is deliberately produced to be craveable and involves visuals, food styling, prop styling and production as coordinated editorial work: https://www.bonappetit.com/bon-appetit/story/how-we-develop-recipes-bon-appetit-test-kitchen
- Bon Appétit, **Bon Appétit’s Magazine Has a New Look** — art direction interprets stories visually; the redesign explicitly sought to keep playfulness while stripping noise: https://www.bonappetit.com/story/bon-appetit-redesign-announcement
- SAVEUR, **Every SAVEUR Cover for the Past 31 Years** — food photography historically differentiated itself by field/reportage realism rather than pristine studio polish alone: https://www.saveur.com/gallery2/Saveur-Covers-Gallery/

Rurubu-specific hypothesis extracted from these sources:

> Internal art-direction vocabulary may be necessary for commissioning and evaluating a photograph, but that vocabulary should not automatically become large reader-facing display copy. A professional publication can use the same editorial idea while expressing it in a human reading voice.

This is about responsibility separation, not a ban on nouns or lists.

## Before — AS7 `2454:25`

AS7 was structurally sound and already source-truth-gated, but its 58px right-page display copy was:

`料理、皿、\n手元、店の空気。`

The photo authority `2527:2` independently uses the conceptual evaluation sequence `food / gesture / place`. That makes the AS7 display line semantically valid as a **photo brief**, but at publication scale it read like a visible shot list / internal schema rather than finished editorial voice.

Anti-AI / authenticity diagnosis:

- not a collision or typography failure;
- not a source-truth failure;
- root defect = production vocabulary leaked into reader-facing hierarchy;
- cosmetic styling would not fix the role mismatch.

## Bounded test — AS8 `2533:2`

Rollback-safe duplicate created from AS7.

Only one visible text role changed:

- node: `2533:20`
- before: `料理、皿、\n手元、店の空気。`
- after: `一皿の向こうに、\n店の空気まで。`
- node role renamed to `F_SEMANTIC_WORD_1 / READER-FACING EDITORIAL COPY / NOT PHOTO-BRIEF SCHEMA`

Unchanged:

- root geometry `1587.4×1123`;
- single dining dummy image and imageHash;
- image position / crop / size;
- palette;
- title, caption, body and closing copy;
- font size and display box geometry for the changed role;
- V6 and V7 production.

No card, pill, badge, gradient, shadow, decorative English, new image or factual claim was added.

## Three-scale QA

### Whole-item / thumbnail

- `500px`: PASS.
- AS8 reads as a restrained publication rather than a visible photography checklist.
- The right page still has a clear first beat and remains distinct from V7's high-energy Cafe/Table grammar.

### Reading scale

- `1000–1400px`: PASS.
- Reading order remains `display statement → 一皿ずつ分け合いながら。 → dining image → 夜の食卓を、ゆっくり味わう。`.
- The new statement supports the same photo role without instructing the reader how the photo was commissioned.

### Actual size / detail

- `1587×1123`: DESIGN QA PASS.
- Native text remains editable.
- No new collision, clipping, edge or Japanese font defect was introduced.

## Structure QA

AS8 `2533:2`:

- parent: `2052:2`
- visible native text: `11`
- visible IMAGE fills: `1`
- text intersections: `0`
- 18px edge risks: `0`
- Japanese→Inter mismatches: `0`

Promotion:

- AS8 `2533:2`: current at `x=1800 / y=9850`
- AS7 `2454:25`: hidden rollback at `x=300000 / visible=false`

## Professional critique

- **Art director:** PASS — V8's voice is clearer; the idea is now editorial rather than procedural.
- **Editorial designer:** PASS — reading order and hierarchy remain intact.
- **Book designer:** PASS — the page contributes a quieter, sentence-led beat between more information-dense V7/V6 comparators.
- **Typographer:** PASS — Japanese line break and optical mass remain intentional.
- **Photo editor:** DESIGN ROLE PASS / REAL PHOTO BLOCKED — copy now leaves the photograph room to carry its own food/gesture/place evidence when a real candidate arrives.
- **Print designer:** DESIGN QA PASS / PROOF BLOCKED — no printer template, ICC/profile proof or final photography yet.

## V6 / V7 / V8 same-role comparison

Same-scale 500px comparison after AS8 promotion:

- V6 IT `2116:65`: still strongest for immediate food/travel impact because it has the richest photo mass.
- V7 H10 `2467:2`: strongest as a high-energy Japanese travel-information magazine system, but role-correct real Cafe/Table photography remains blocked.
- V8 AS8 `2533:2`: strongest as a restrained book/editorial-monograph interpretation; the revised display copy improves publication authenticity without copying V7 density.

No global winner is selected.

## Asset / Drive truth

- V8 Drive authority re-resolved: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`.
- V7 Drive authority re-resolved: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`.
- Parent-child Drive query did not hydrate a fresh V8 child listing in this pass; old master inventory is therefore not claimed as newly verified file-by-file.
- image generation `0`.
- Drive writes `0`.
- new masters `0`.
- new imageHash `0`.
- final photography adoption `0`.

## Learning result

New fingerprint: `RSL-272 / F-RSL-272-INTERNAL-PHOTO-BRIEF-VOCABULARY-LEAKS-INTO-READER-FACING-DISPLAY-COPY`.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Do NOT transfer the exact phrase, typography, Cafe layout, image size, navy/cream treatment or V8 spacing. Transfer only the responsibility check: internal commissioning/evaluation language and reader-facing editorial language are different jobs.