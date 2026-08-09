# Rurubu V5 — MEMORY SPOTS secondary body microtype promotion

Date: 2026-08-09
State: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`
Scope: Rurubu WEDDING V5 only

## Authorities read before execution

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`

Live Figma remains the highest authority.

## Visible problem

On the right-page `MEMORY SPOTS / MINI MAP` module, the two visible secondary-location body texts were only 11 px in the live Current frame. At whole-spread view they were materially smaller than the surrounding editorial body copy and became the weakest readable factual copy in the module.

Affected Current nodes:

- `77:444 / IA_MEMORY_2_BODY`
- `77:460 / IA_MEMORY_4_BODY`

The content itself was correct; this was a typography/readability issue, not a reason to regenerate or replace any image asset.

## Principle tested

Increase only the two weakest secondary body texts from 11 px to 12 px while preserving native text, fixed semantic width, editorial hierarchy, image crops, fold state, rollback evidence, and the compact secondary-card rhythm.

Expected improvement:

- better actual-size readability;
- less microcopy-like treatment for real Japanese body copy;
- clearer relationship between location title and supporting sentence.

Possible regression:

- added text height could collide with the next rule/module;
- body copy could compete with the secondary title;
- wrapped Japanese could become visually cramped.

Adoption evidence required:

- rollback-safe comparison;
- whole-spread screenshot;
- reading/page screenshot;
- actual-size detail/geometry check;
- no image hash or crop change;
- structure readback after Current promotion.

## Prototype

Created comparison frame:

- `569:2 / V5_INSIDE_MEMORY_SECONDARY_BODY_MICROTYPE_QA_2026_08_09`

Prototype nodes:

- `569:162 / IA_MEMORY_2_BODY`: 11 → 12 px, width 108 preserved, height 48 → 51, `textAutoResize=HEIGHT`
- `569:178 / IA_MEMORY_4_BODY`: 11 → 12 px, width 108 preserved, height 32 → 34, `textAutoResize=HEIGHT`

No image, crop, card geometry, heading, section rule, or decorative asset was changed.

## Three-scale QA result

### Whole item / spread

PASS. The page hierarchy remains `OUR HISTORY` → lead photo → `MEMORY SPOTS` → lead memory → secondary locations. The two body texts remain subordinate to their titles.

### Reading / page scale

PASS. The secondary explanatory copy is easier to read without making the two small modules visually louder than the large lead memory.

### Detail / actual-size and geometry

PASS.

- `IA_MEMORY_2_BODY` now ends at y=765; the next secondary rule begins at y=770, leaving 5 px separation and no overlap.
- `IA_MEMORY_4_BODY` height is 34 px and remains inside the intended secondary module zone with no clipping.
- Both strings remain native Japanese text with controlled wrapping.

## Current promotion

Promoted only the verified prototype values into live Current:

- `77:444 / IA_MEMORY_2_BODY`: 11 → 12 px; height 48 → 51; width remains 108; `textAutoResize=HEIGHT`
- `77:460 / IA_MEMORY_4_BODY`: 11 → 12 px; height 32 → 34; width remains 108; `textAutoResize=HEIGHT`

## Structure and provenance readback

Post-promotion Current inside readback:

- native text nodes: 92
- visible text nodes: 57
- IMAGE-fill nodes: 9
- fold guide `77:540`: visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved
- comparison `569:2`: preserved

Relevant image hashes remained unchanged:

- groom `77:296`: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `77:302`: `2359f635b4926a83e22ca1f9214e75c709291152`
- history `77:422`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory 01 `77:430`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `77:438`: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- memory 03 `77:446`: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- memory 04 `77:454`: `c09aa82e7b2ac75708707345c6f845452bf67663`

## Decision

`VERIFIED / ADOPTED FOR THESE TWO V5 SECONDARY BODY ROLES`.

Do not generalize this into a project-wide minimum-font rule from one bounded experiment. Other captions, folios, codes, and navigation labels have different semantic roles and must be judged separately.

## V5/V6 gate impact

The photo gate is unchanged. `V5-01 / 77:148 / IMG_HERO` remains the only active photo-role blocker and the last dominant-photo blocker. This typography gain does not authorize V5 completion or V6 production start.

## Next application

Continue V5 with the next safe highest-impact incomplete item. Do not repeat the already-known cover-Q60 transport failure path unless a materially different binary-safe method becomes available.