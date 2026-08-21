# ADD-02 — Destination Lexicon V3 Italy Scalability QA

Date: 2026-08-21
State: `VERIFIED_LOCAL / THIRD_DESTINATION_TEST / FAMILY_THUMBNAIL_COMPARED / NOT_PROMOTED`
Start/live authority SHA before write: `950d4cd1552942868209184b446273e5d94f0345`
Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
Drive writes this test: `0`

## Purpose

The prior V3 anchors established two materially different place-derived treatments:

- HAWAII `149:2 / COASTAL LIGHT PRINT FIELD`
- JAPAN `149:21 / PAPER LIGHT DETAIL FIELD`

The next required test was one non-tropical destination built from a blank frame to determine whether the method itself scales without collapsing into a new shared template.

Production was not used as a visual construction source. Only verified facts/constraints were carried into the new test: `1000×1480`, destination name, Japanese label, table number, date, and native theme headline/description roles.

## New blank-frame Italy V3

Created:

- selected study: `150:2 / VNEXT_V3 / ITALY / TRAVERTINE PORTICO LIGHT / CLEANROOM`
- hidden realistic long-copy stress: `150:20 / QA_LONG_COPY / VNEXT_V3 / ITALY / TRAVERTINE PORTICO LIGHT / CLEANROOM`

Art-direction sentence:

`sun-warmed stone + portico light/shadow + restrained terracotta edge, treated as a print material field rather than a tourism-icon collage.`

The candidate intentionally does not reuse the HAWAII coastal field, JAPAN layered-paper field, current production's large circle/sweep geometry, or old Italy architecture composition.

## Visual construction

Fixed prototype atmosphere:

- dark warm stone spine;
- sunlit limestone field;
- vertical portico shadow/light rhythm;
- thin terracotta transition edge;
- low-opacity masonry-joint rhythm;
- shallow stone plinth near the lower folio.

Semantic roles remain native editable Figma text:

- `ITALY`
- `イタリア`
- `TABLE 02`
- `[国テーマ見出し]`
- `[国テーマ説明]`
- `2026.10.24`

No fake Italian wording, flag treatment, landmark illustration, people, airline credential, barcode, or tourism-logo imitation was introduced.

## Three-scale visual QA

Selected candidate was inspected at thumbnail/read scale and again at source-size `1000×1480`.

Result: `PASS_AS_SERIOUS_COMPARISON_CANDIDATE`.

The material grammar is recognizably different from HAWAII and JAPAN without becoming merely a recolor. At actual-size inspection the large Latin destination, Japanese label and table number remain immediate; the portico field gives the item a distinct architectural/material atmosphere while leaving a stable native-copy lane.

A mature-current comparison was performed only after the new candidate was structurally repaired. Current production remains:

- `2:11 / FRAME_TABLE_SIGN_ITALY`

Decision: **do not promote yet**. The V3 candidate improves destination/material specificity and avoids the repeated abstract circle/sweep family grammar, but the current production still carries more immediate celebration energy. The new method has earned further development, not automatic replacement.

## Long-copy / structure QA

Initial post-authoring readback exposed the same Figma authoring failure family seen elsewhere: the helper sequence set `textAutoResize='HEIGHT'` and then resized the node, leaving all 12 selected+stress text layers as fixed-height `NONE`.

This was repaired only after loading the exact fonts and reapplying auto-height to all native text roles.

Final selected `150:2`:

- native visible text: `6/6` auto-height;
- visible text outside root: `0`;
- IMAGE fills: `0`.

Stress `150:20` after repair:

- headline expanded to bottom `y=920`;
- description expanded to bottom `y=1260`;
- outside text: `0`.

Screenshot QA then exposed a physical/visual collision: the long description entered the original lower stone plinth. The repair was bounded to fixed atmosphere and lower folio geometry:

- base plinth moved to `y=1290`, height `60`;
- date moved to `y=1380`;
- masonry joints reduced to low opacity so they no longer compete with the long headline/body.

Stress screenshot after the repair: PASS. The longest description ends above the plinth with a visible reserve and the date remains inside the trim/safe field.

The stress duplicate was returned to hidden QA state after capture.

## Family thumbnail comparison

After Italy reached structural/long-copy maturity, a review-only same-scale board was created:

- `152:2 / QA / VNEXT_V3 / HAWAII-JAPAN-ITALY / FAMILY THUMBNAIL / 2026-08-21`

Top row contained review clones of the three mature V3 anchors:

- HAWAII `149:2`
- JAPAN `149:21`
- ITALY `150:2`

Bottom row contained same-scale review clones of the current production roots:

- HAWAII `2:2`
- JAPAN `2:47`
- ITALY `2:11`

The board was screenshot-reviewed and then hidden to keep the study page readable. These duplicates are QA evidence only and are not authoring sources.

### Family-level result

The V3 anchors are **more destination-specific by material/atmosphere** than the current abstract family, but two regressions remain visible at family scale:

1. JAPAN and ITALY both drift toward a left dark edge + pale main field + strong upper destination title, showing that distinct material choices can still converge into one layout skeleton.
2. The V3 row is calmer and more design-specific, but the current production row still communicates celebration/pop/wedding energy more immediately at thumbnail scale.

Therefore `more specific` and `more different` are not sufficient promotion signals. A replacement family must also preserve or improve excitement, warmth, and memorability.

## Hybrid authoring / asset decision

Current responsibility split:

- variable/factual copy: native editable text;
- fixed atmosphere: simple native prototype geometry;
- SVG: `0`;
- replaceable IMAGE fill: `0`;
- generated/composed master placed: `0`;
- Drive writes: `0`.

No image generation was necessary for this bounded scalability test. The question was whether place-derived material grammar could remain distinct across a third destination without creating another template. A generated asset should be introduced only after a fixed-art role is diagnosed as the quality bottleneck and can complete the full generation → critique → Drive → Figma → three-scale lifecycle.

## Production decision

`CURRENT_PRODUCTION_RETAINED / ITALY_V3_VERIFIED_LOCAL / THIRD_DESTINATION_METHOD_TEST_PASS / FAMILY_ROLLOUT_HOLD / NOT_PROMOTED`.

The test supports the existing local hypothesis that destination-family differentiation improves when each destination owns a materially different material/atmosphere role. It also adds two constraints:

- **specificity alone is not sufficient; the candidate must preserve or improve wedding excitement before replacing mature production;**
- **changing material vocabulary without changing the underlying layout skeleton can create a new template family.**

## Next highest-value step

1. retain `149:2`, `149:21`, and `150:2` as bounded V3 anchors;
2. do not copy their layouts to the remaining eight destinations;
3. do not create a fourth destination using the same edge-field + top-title skeleton merely to continue activity;
4. the next destination experiment, if run, must method-switch at the **layout skeleton level** as well as at material/atmosphere level, and must explicitly target stronger celebration energy;
5. before any family rollout, compare at family thumbnail scale for destination distinctness, skeleton diversity, and celebration energy;
6. promote only if the method clearly beats the current 11-sign production family, not merely because it is more different.

## Learning state

- `DESTINATION_SPECIFICITY_REQUIRES_DISTINCT_MATERIAL_OR_ATMOSPHERE_ROLE`: remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` within destination-family work.
- `DESTINATION_SPECIFICITY_WITHOUT_CELEBRATION_GAIN_IS_NOT_A_PROMOTION_SIGNAL`: `VERIFIED_LOCAL`.
- `MATERIAL_DIVERSITY_CAN_STILL_CONVERGE_ON_ONE_LAYOUT_SKELETON`: `OBSERVED → VERIFIED_LOCAL` in this three-anchor family comparison.
