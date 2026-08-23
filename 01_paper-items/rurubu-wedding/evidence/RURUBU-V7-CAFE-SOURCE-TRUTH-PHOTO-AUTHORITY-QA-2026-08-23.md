# るるぶWEDDING V7 — Cafe/Table SOURCE TRUTH Photo Authority QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Production spread preserved: H3 `2311:2`
Photo-art-direction authority: `2305:2`

## New professional research

This pass rotated away from recent pagination, divider, grid and photo-placement work and studied D&DEPARTMENT's primary-source `d design travel` editorial practice.

Useful observations:

- the editorial team researches each place through actual local use/experience rather than treating destination identity as a visual cliché;
- recommendations are written from what the editors actually verified and felt;
- local specificity and the people/messages rooted in the place are selection criteria;
- photography is explicitly not to be exaggerated with special lenses; the stated intent is to record things as they are;
- the publication distinguishes itself from an information-stuffed travel magazine by editorial selection and verified local character.

These observations are not a visual recipe for V7. The extracted decision principle is **documentary authority must be earned by source truth**.

Primary sources consulted:

- D&DEPARTMENT, `d design travel` editorial concept / selection criteria: https://www.d-department.com/item/DDESIGNTRAVEL.html
- D&DEPARTMENT, English editorial concept: https://www.d-department.com/item/DD_TEXT_REPORT_6872.html
- D&DEPARTMENT, `d design travel EXHIBITION 2026`, showing the publication's rule/research/prototype process: https://www.d-department.com/item/DD_EVENT_67235.html

## Problem / root-cause hypothesis

The existing V7 Cafe/Table generation brief correctly rejected fake readable signage and generic tropical stock grammar, but it still lacked an explicit boundary between:

1. a **specific real Hawaii venue/place** presented with documentary authority; and
2. a **non-specific generated Hawaii atmosphere role** used only for editorial mood/food context.

Without that boundary, a technically attractive AI image could invent a distinctive storefront, landmark, logo or venue-like scene and then be placed beside native travel copy in a way that falsely reads as photographed local evidence.

Fingerprint candidate:

`F-RSL-248-GENERATED-TRAVEL-PHOTO-IMPLIES-DOCUMENTARY-AUTHORITY-FOR-UNVERIFIED-SPECIFIC-PLACE`

## Rollback-safe bounded change

Before mutation, live `2305:2`, H3 `2311:2`, C6 `2316:2`, V6/V7/V8 roots and Drive authority were re-read.

Rollback created first:

- `2371:2 / ROLLBACK / V7 PHOTO ART DIRECTION / CAFE-TABLE / PRE-SOURCE-TRUTH-GATE / HIDDEN / 2026-08-23`
- parent `2052:2`
- `visible=false`

Current authority `2305:2` was expanded from `1200×980` to `1200×1098` and renamed:

`V7 / PHOTO ART DIRECTION / CAFE-TABLE / GENERATION_READY + SOURCE-TRUTH GATE / NOT CURRENT / 2026-08-23`

New source-truth nodes:

- `2371:27 / SOURCE TRUTH`
- `2371:28 / SOURCE TRUTH / BODY`

New authority text:

> 実在店・実在建築・固有ランドマークを「本物の取材写真」のようにAI生成で捏造しない。特定の店や場所として見せる場合は、実写真・正式提供写真・検証可能な一次参照を優先。生成素材は固有店を断定しない食卓／街の空気 role に限定し、読める看板・ロゴ・特徴的外観を作らない。

Candidate-selection line `2305:26` was also corrected so its claimed six critique dimensions are actually six:

`食欲 / Hawaii現地性 / source truth / crop耐性 / 印刷階調 / AI臭`

No production spread, image fill, hash, crop, native factual copy or Drive asset was changed.

## QA

### Authority panel visual QA

- native authority render `1200×1098`: PASS
- 500 px whole-panel thumbnail: PASS
- SOURCE TRUTH sits between CAFE FOCAL and TABLE without clipping or hierarchy regression
- bottom text extent: `1010` against panel height `1098`; bottom reserve `88 px`

### Structure QA

Final readback on `2305:2`:

- parent: `2052:2`
- visible text nodes: `26`
- text-box intersections: `0`
- rollback `2371:2`: hidden / preserved
- new label/body IDs: `2371:27 / 2371:28`

An intermediate readback found three label-box/body-box bounding intersections, including the newly added SOURCE TRUTH row. There was no glyph collision, but leaving the geometry would create false-positive structural QA. The method was corrected by reducing only the label text-box widths; final intersections are zero.

### Reader-facing truth check

Current V7 Cafe/Table H3 `2311:2` and 1DAY C6 `2316:2` were re-read. They contain generic editorial Hawaii/travel language but no invented specific venue name, logo or claimed real business identity. Therefore no reader-facing factual rewrite was needed in this pass.

## Professional critique

- **Art director:** PASS as an authority improvement; it sharpens what kind of travel-image credibility V7 is allowed to claim without changing the visual personality.
- **Editorial designer:** PASS; specific-place evidence and atmospheric illustration are now distinct editorial jobs.
- **Book/editorial sequence:** PASS as process authority only; no spread was made busier merely to demonstrate the new learning.
- **Typographer:** PASS; this pass does not alter production Japanese typography.
- **Photo editor:** PASS for selection protocol; source truth is now a named selection dimension rather than an implicit negative prompt.
- **Print designer:** NO new print claim. Final photo effective PPI and printer authority remain unresolved because no final photo was adopted.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL (AUTHORITY-ONLY)`

Do **not** promote to `VERIFIED_LOCAL` for photographic outcome yet. The gate has been implemented and structurally/visually verified, but it has not yet been tested against actual materially different Hawaii photo candidates and a final adopted source.

## Asset truth

- new image-model generations: `0`
- generated candidate adopted: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- production photo replacements: `0`
- final legitimate photography adopted: `0`
- V6 mutations: `0`
- V8 mutations: `0`
- non-Rurubu mutations: `0`

V7 Drive authority remains:

`1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`

## Next verification

When a legitimate photo-generation/selection path is available, test at least materially different Cafe/Table candidates under the new distinction:

- if claiming a specific venue/place: real/licensed/official/reference-grounded imagery with factual verification;
- if generated: non-specific food/table/street atmosphere that cannot be mistaken for documentary evidence of a named real business.

Then close the loop:

`candidate set → source-truth/photo-editor critique → Drive master/readback → exact replaceable H3 role → image hash/crop/effective PPI → 500 / reading / actual-size QA`.
