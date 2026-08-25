# RSL-272 — Internal photo-brief vocabulary leaks into reader-facing display copy

Date: 2026-08-25
Source scope/item: Rurubu WEDDING / V8 Cafe+Table
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Fingerprint: `F-RSL-272-INTERNAL-PHOTO-BRIEF-VOCABULARY-LEAKS-INTO-READER-FACING-DISPLAY-COPY`

## Visible problem

V8 AS7 `2454:25` was structurally clean and source-truth-gated, but its 58px right-page display line was:

`料理、皿、\n手元、店の空気。`

The current V8 photo-art-direction authority independently uses a similar internal conceptual triad (`food / gesture / place`) to commission and judge a dining photograph. At reader-facing display scale, the production copy therefore read less like finished editorial voice and more like the commissioning checklist leaking onto the page.

## Root-cause hypothesis

A valid internal design/photo concept is not automatically valid publication copy. Commissioning language optimizes production decisions; reader-facing language must support the reading experience. When the two are collapsed, the page can feel AI/schema-like even when typography, hierarchy and source truth are otherwise correct.

## Principle tested

Keep the underlying semantic job, but translate it from production vocabulary into reader-facing editorial language. Do not solve this by merely styling the same checklist more attractively.

## Bounded experiment

Rollback-safe AS8 `2533:2` changed only one visible text role:

- before: `料理、皿、\n手元、店の空気。`
- after: `一皿の向こうに、\n店の空気まで。`

No image, crop, geometry, font size, palette, container, decoration, factual content or other copy changed.

## Expected improvement

- less internal-schema / AI-instruction reading;
- stronger V8 editorial/book voice;
- preserve the same semantic territory without making the photo brief reader-visible;
- leave the eventual real photograph responsible for showing food / gesture / place rather than enumerating those requirements in type.

## Regression risk

Over-correcting can produce vague lifestyle poetry or remove useful information. The replacement must remain specific enough to support the page role and should not invent personal facts, place claims or sensory events.

## Three-scale evidence

- whole-item / 500px: PASS; AS8 reads more like a publication and less like an art-direction checklist;
- reading / 1000–1400px: PASS;
- actual-size / 1587×1123: DESIGN QA PASS;
- visible native text `11`;
- visible IMAGE `1`;
- text intersections `0`;
- 18px edge risks `0`;
- Japanese→Inter mismatch `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- authority page: `2052:2`
- adopted AS8: `2533:2`
- changed text: `2533:20`
- hidden rollback AS7: `2454:25`
- V8 photo authority: `2527:2`
- V8 Drive authority: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AS8-READER-FACING-DISPLAY-COPY-QA-20260825.md`

## Professional research used

- Aperture, `How Not to Design a Photobook`
- Aperture, `How to Produce a Photobook`
- Aperture, `Design Books to Know`
- Bon Appétit, `How We Develop Recipes in the Bon Appétit Test Kitchen`
- Bon Appétit, `Bon Appétit’s Magazine Has a New Look`
- SAVEUR, `Every SAVEUR Cover for the Past 31 Years`

Observation extracted: picture editing, art direction and production language are expert-facing systems; final publication voice is a separate editorial responsibility.

## Adopted / rejected / blocked status

- AS8 adopted as current V8 Cafe/Table design comparison.
- AS7 retained as hidden rollback.
- REAL PHOTO QA remains blocked; the dining image is still structural dummy evidence.
- PRINT/PREFLIGHT and physical proof remain blocked.

## What must remain V8-specific

Do not transfer:

- the exact new phrase;
- 58px typography;
- right-page composition;
- cream/navy palette;
- single-photo dining-essay art direction;
- spacing or image geometry.

## Cross-item applicability hypothesis

In another print/editorial item, inspect large display copy, kickers, labels and microcopy for language that belongs to the design brief, shot list, schema, CMS field name or internal production model rather than to the reader. If found, test a rollback-safe translation that preserves semantic utility without exposing internal process language.

Do not automatically replace all lists or technical nouns. A list can be valid reader content when the reader actually needs the list.