# Rurubu V5 — Q1 base-rule subtraction

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
- `01_paper-items/rurubu-wedding/RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `01_paper-items/rurubu-wedding/RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `01_paper-items/rurubu-wedding/POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- V6 current status, reference analysis, research matrix, and asset queue

Live Figma remained the implementation authority.

## Visible problem

On the inside-left `3 QUESTIONS` module, Q1 was already established as the main interview question by:

- heading `3 QUESTIONS`;
- pink `01` number disc;
- 20 px native question title;
- a vertical 8 px pink editorial rule;
- larger content width than Q2/Q3.

A second 650 × 4 px pink base rule (`85:19 / V5_QA_HERO_BASE_RULE`) closed the module into an L-shaped bracket. At whole-spread scale it visually over-contained Q1 and made the interview block feel more like a boxed UI callout than a magazine interview hierarchy.

## Hypothesis / principle tested

Test subtraction before adding or restyling. Keep the vertical rule as the hierarchy anchor, but remove only the bottom rule.

Expected improvement:

- reduce container/card silhouette;
- preserve Q1 dominance without drawing a large bracket around it;
- create a cleaner handoff from Q1 to the blue/yellow Q2/Q3 rules;
- improve editorial breathing room without changing copy, typography, images, or geometry.

Possible regression:

- Q1 might lose grouping;
- transition to Q2/Q3 might become ambiguous;
- the vertical rule might appear orphaned.

Adoption evidence required:

- rollback-safe duplicate;
- whole-spread comparison;
- reading/page comparison;
- actual-size geometry/detail check;
- native text, IMAGE fills/hashes, fold guide, rollback frames, and semantic nodes unchanged.

## Prototype

Created rollback-safe comparison frame:

- `571:2 / V5_INSIDE_Q1_BASE_RULE_SUBTRACTION_QA_2026_08_09`

Prototype change only:

- cloned `571:112 / V5_QA_HERO_BASE_RULE`: `visible true → false`

Preserved in the prototype:

- `571:111 / V5_QA_HERO_LEFT_RULE`: visible, 8 × 132
- Q1 number disc and native text
- Q2 rule 316 × 4
- Q3 rule 324 × 4
- all photography and crops
- all unrelated decorations and text

## Three-scale QA

### Whole spread / thumbnail

PASS. Q1 remains the dominant interview question because the 01 disc, larger title, wider text block, and vertical pink rule still establish hierarchy. Removing the base rule reduces the large bracket silhouette and makes the left page read more like an editorial interview than a contained UI panel.

### Reading / page scale

PASS. Reading order remains `3 QUESTIONS → Q1 → Q2/Q3`. The 18 px vertical gap between the Q1 rule end at y=590 and Q2/Q3 top rules at y=608 prevents collision while keeping the modules related.

### Actual-size / detail geometry

PASS.

- left rule: 8 × 132 at x=58, y=458
- removed base rule: 650 × 4 at x=58, y=586
- Q1 question: 20 px native text
- Q1 A/B answers: 14 px native text
- Q2/Q3 rules remain visible at y=608
- no text reflow, clipping, overlap, or image/crop mutation observed

## Current promotion

Promoted only the verified visibility change to live Current:

- `85:19 / V5_QA_HERO_BASE_RULE`: `visible true → false`

The node was not deleted, preserving rollback/editability. The comparison frame `571:2` is preserved.

## Structure and provenance readback

Post-promotion Current inside `77:290`:

- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:540`: visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved
- comparison `571:2`: preserved

Relevant image hashes remained unchanged:

- groom `77:296`: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `77:302`: `2359f635b4926a83e22ca1f9214e75c709291152`
- history `77:422`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory 01 `77:430`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `77:438`: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- memory 03 `77:446`: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- memory 04 `77:454`: `c09aa82e7b2ac75708707345c6f845452bf67663`

## Drive / dominant-photo reconciliation

The cover Q60 derivative was re-read from Google Drive during this run:

- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- bytes: `155439`
- parent: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

No image regeneration or repeated failed transfer path was attempted.

## Decision

`VERIFIED / ADOPTED FOR THIS V5 Q1 MODULE ONLY`.

Do not generalize this into a rule that bottom rules are always wrong. The gain comes from removing redundant containment where hierarchy is already established by number, type scale, width, and a vertical rule.

## Learning record

Source: live Figma before/after comparison + project editorial knowledge base.

Hypothesis: the 650 px base rule duplicated containment already provided by Q1 hierarchy.

Result: accepted. Q1 remains clear, page rhythm is lighter, and semantic/structural evidence is unchanged.

Failure/regression: none observed in three-scale QA. The vertical rule did not become orphaned because it still anchors the Q1 block and aligns with the question start.

Status: `PROTOTYPED → VERIFIED`; not promoted to `PROJECT_RULE`.

Next application: continue auditing V5 only for concrete visual weaknesses while the cover-hero binary transport gate remains open. Do not use micro-polish to claim completion.

## V5 / V6 gate impact

No photo-role count changed. The truthful gate remains:

- `PHOTO_ROLE_PASS 10/11`
- `ROLE_COMPLETE 10/11`
- `DOMINANT_PHOTO_PASS 2/3`
- active blocker: `V5-01 / 77:148 / IMG_HERO`

This editorial improvement does not authorize `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS` or V6 production start.

## Canonical-log append safety

This run records the full experiment here because the current GitHub connector exposes whole-file replacement for existing files, not a safe atomic append primitive. The canonical learning/lessons logs are intentionally not replaced from a truncated readback, because doing so could destroy prior history. This file is the exact synchronization source for a future safe append path.