# V5 History Event Microtype Promotion — 2026-08-09

## Scope

Rurubu WEDDING V5 only. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, ADD item, V6 production, image asset, crop, or factual-content edits were made.

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- relevant Rurubu editorial/lessons/V5/V6 authority files discovered from the repository index

## Visible problem

The `OUR HISTORY` timeline already had its six year/date nodes promoted to 12 px, while the six event labels directly beneath them remained 11 px. At whole-spread scale the hierarchy was correct, but at natural print/detail scale the event labels were still the weakest factual text in the chronology and read lighter than the dates immediately above them.

Target Current frame: `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`.

Target nodes:

- `77:406 / IA_HISTORY_1_TEXT`
- `77:409 / IA_HISTORY_2_TEXT`
- `77:412 / IA_HISTORY_3_TEXT`
- `77:415 / IA_HISTORY_4_TEXT`
- `77:418 / IA_HISTORY_5_TEXT`
- `77:421 / IA_HISTORY_6_TEXT`

## Hypothesis

Raising only the six event labels from 11 px to 12 px would improve actual-size chronological readability and align the factual hierarchy with the already-verified 12 px year/date row, without changing geometry, adding decoration, or overpowering the dominant history photograph.

Expected improvement:
- clearer date → event pairing at natural size;
- less fragile microtype in print-like viewing;
- no change to editorial composition.

Possible regressions:
- fixed 118 × 20 text boxes could clip or wrap;
- the timeline could become visually too heavy;
- Japanese/English labels could collide with adjacent event columns.

Evidence required for adoption:
- rollback-safe duplicate comparison;
- whole-spread / reading / actual-size visual QA;
- node geometry readback;
- Current screenshot after promotion;
- structure, image-hash, fold-guide, rollback, and comparison-frame verification.

## Prototype

Created rollback-safe duplicate:

- `545:2 / V5_INSIDE_HISTORY_EVENT_MICROTYPE_QA_2026_08_09`

Prototype nodes:
- `545:124`, `545:127`, `545:130`, `545:133`, `545:136`, `545:139`

Only `fontSize` changed: `11 → 12`.

All six prototype boxes remained `118 × 20`, `textAutoResize=NONE`. No wrap, clipping, collision, or timeline-width expansion was observed in the comparison screenshot.

## Three-scale QA result

### Whole spread

PASS. The inside spread remains profile-led on the left and history/photo-led on the right. The event labels do not compete with `OUR HISTORY`, the dominant waterfront image, or `MEMORY SPOTS / MINI MAP`.

### Reading/page scale

PASS. Date and event pairings are easier to scan as one chronology. Six columns remain distinct and evenly spaced.

### Detail / actual-size

PASS for V5 dummy-design QA. The 12 px labels are visibly more robust than 11 px while staying subordinate to the year/date row and main section typography. The longest Japanese label `初めてのふたり旅` and English `WEDDING DAY` remain within their fixed boxes.

## Current promotion

Promoted the same bounded change to Current:

- `77:406`: 11 → 12 px
- `77:409`: 11 → 12 px
- `77:412`: 11 → 12 px
- `77:415`: 11 → 12 px
- `77:418`: 11 → 12 px
- `77:421`: 11 → 12 px

No text content, positions, widths, heights, image fills, crop, routes, guides, or unrelated nodes changed.

## Post-promotion structure evidence

Current `77:290` readback:

- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- promoted labels: all six `12 px`, `118 × 20`, visible, `textAutoResize=NONE`
- fold guide: `77:540 / PROVISIONAL_FOLD_GUIDE`, visible
- rollback preserved: `59:2`, `59:178`
- comparison preserved: `545:2`

Relevant Current image hashes remained unchanged:

- groom `77:296`: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `77:302`: `2359f635b4926a83e22ca1f9214e75c709291152`
- history `77:422`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- lead memory `77:430`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `77:438`: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- memory 03 `77:446` preserved hidden: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- memory 04 `77:454`: `c09aa82e7b2ac75708707345c6f845452bf67663`

## Asset / dominant-photo gate

No image asset was regenerated or altered. Drive search re-confirmed the prepared cover hero derivative remains present:

- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`

This does not change the official photo-role gate. Keep:

- `PHOTO_ROLE_PASS 10 / 11 active`
- `ROLE_COMPLETE 10 / 11 active`
- `DOMINANT_PHOTO_PASS 2 / 3`
- cover hero `77:148` still open
- V6 production gate still closed

Known failed Q60 transport methods were not retried.

## Learning state

`DISCOVERED → PROTOTYPED → VERIFIED` for this bounded V5 chronology context.

### Adopted lesson

When a compact chronology uses equally important date and event facts, and the event row is the weakest real-size factual text, a one-step microtype increase can improve print-like readability without adding containers or decoration — but only after longest-label fit and fixed-box clipping are verified.

### Not promoted to PROJECT_RULE

This result is contextual. It does not establish 12 px as a universal minimum or require equal sizing for every timeline.

## Canonical-log sync note

The canonical project learning log and Rurubu lessons log are large files. The current GitHub connector exposes safe full-file replacement but no atomic append primitive. This run therefore records the complete evidence in this dedicated learning-run file rather than risking truncation of those authorities. Sync this verified entry into:

- `docs/wedding-design-learning-feedback-log.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`

when a safe append-capable path is available.

## Status

`VERIFIED / V5_CURRENT_ADOPTED / ROLLBACK_PRESERVED / PHOTO_GATE_UNCHANGED / V6_GATE_CLOSED`
