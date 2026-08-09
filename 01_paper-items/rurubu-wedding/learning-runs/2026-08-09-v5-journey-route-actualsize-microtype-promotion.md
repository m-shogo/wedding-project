# Rurubu V5 — Journey-route actual-size microtype promotion

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
- V6 Current Status, Hawaii reference analysis, research matrix, and asset queue

Live Figma remained the implementation authority.

## Visible problem

The back-cover `OUR JOURNEY ROUTE` is meaningful narrative information rather than decorative folio text. Its six year/date labels and six event labels were all 11 px native text. At actual-size review, this was one of the smallest factual text systems on the outer spread and read more weakly than intended despite having sufficient physical room.

Target Current nodes:

Years/dates:
- `77:50 / BACK_VISUAL_HISTORY_1_YEAR`
- `77:53 / BACK_VISUAL_HISTORY_2_YEAR`
- `77:56 / BACK_VISUAL_HISTORY_3_YEAR`
- `77:59 / BACK_VISUAL_HISTORY_4_YEAR`
- `77:62 / BACK_VISUAL_HISTORY_5_YEAR`
- `77:65 / BACK_VISUAL_HISTORY_6_YEAR`

Event labels:
- `77:51 / BACK_VISUAL_HISTORY_1_TEXT`
- `77:54 / BACK_VISUAL_HISTORY_2_TEXT`
- `77:57 / BACK_VISUAL_HISTORY_3_TEXT`
- `77:60 / BACK_VISUAL_HISTORY_4_TEXT`
- `77:63 / BACK_VISUAL_HISTORY_5_TEXT`
- `77:66 / BACK_VISUAL_HISTORY_6_TEXT`

## Hypothesis / principle tested

Japanese/Latin factual micro-information should remain visibly subordinate, but actual-size print legibility outranks keeping it artificially tiny. Increase only this bounded route system from 11 px to 12 px and switch fixed-height text to `textAutoResize=HEIGHT` without moving its nodes.

Expected improvement:
- improve actual-size reading of years, dates and route milestones;
- keep the route subordinate to `OUR TRAVEL NOTES` and `FRIENDS & FAMILY`;
- preserve the existing editorial route geometry and color coding;
- avoid introducing any new container, badge or decoration.

Possible regression:
- route could become too dominant;
- labels could wrap or collide with adjacent nodes;
- the bottom bar could become crowded;
- larger text could weaken the light editorial rhythm.

Adoption evidence required:
- rollback-safe duplicate;
- whole-item comparison;
- reading/back-page comparison;
- actual-size geometry/readback;
- native text and semantic IDs preserved;
- outer image hashes, fold guide and rollback frames unchanged.

## Prototype

Created comparison frame:

- `572:2 / V5_OUTER_JOURNEY_ROUTE_MICROTYPE_QA_2026_08_09`

Prototype-only text nodes were changed from 11 px to 12 px and to `textAutoResize=HEIGHT`:
- years/dates: `572:34`, `572:37`, `572:40`, `572:43`, `572:46`, `572:49`
- event labels: `572:35`, `572:38`, `572:41`, `572:44`, `572:47`, `572:50`

No image, crop, route line, marker, caption copy, color, frame geometry, or unrelated node was changed.

## Three-scale QA

### Whole item / thumbnail

PASS. The back cover still reads in the same hierarchy: `OUR TRAVEL NOTES` → main memory photo → `FRIENDS & FAMILY` → `OUR JOURNEY ROUTE`. The 1 px increase does not cause the route to compete with the major modules.

### Reading / page scale

PASS. The route labels are more immediately readable, while the six-marker sequence remains compact and clearly grouped. No wrapping or collision was visible in the comparison or promoted Current screenshot.

### Actual-size / detail geometry

PASS after Current promotion. Live readback:

- all six year/date nodes: 12 px, 94 px wide, 14 px high, y=974, `textAutoResize=HEIGHT`
- all six event nodes: 12 px, 86 px wide, 14 px high, y=996, `textAutoResize=HEIGHT`
- no text wrapping or clipping
- bottom issue bar remains visually separate

## Current promotion

Promoted the verified bounded change to Current outer `77:18`:

- `77:50`, `77:53`, `77:56`, `77:59`, `77:62`, `77:65`: `11 → 12 px`, `textAutoResize=HEIGHT`
- `77:51`, `77:54`, `77:57`, `77:60`, `77:63`, `77:66`: `11 → 12 px`, `textAutoResize=HEIGHT`

Semantic node IDs and copy were preserved. Comparison frame `572:2` remains available as rollback/comparison evidence.

## Structure and provenance readback

Post-promotion outer `77:18`:

- native text nodes: `85`
- visible text nodes: `44`
- IMAGE-fill nodes: `14`
- fold guide `77:288 / PROVISIONAL_FOLD_GUIDE`: visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved
- comparison `572:2`: preserved

Relevant Current image hashes remained unchanged:

- cover hero `77:148`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- back main `77:24`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `77:39`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `77:43`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

Thus this run changed only native typography; it did not mutate asset provenance, crop or image identity.

## Cover-hero reconciliation / blocker discipline

The rollback-safe Q60 staging target `469:132` was audited before attempting any further transfer. It currently has the same image hash as Current `77:148`:

- Current `77:148`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- staging `469:132`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

Therefore there is no already-imported hidden Q60 image available to copy from the staging frame. This invalidates the in-file-copy shortcut and avoids wasting a run on a false premise.

The verified Q60 derivative still exists in Drive:
- ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`

Known failed binary-transfer fingerprints were not repeated.

## Decision

`VERIFIED / ADOPTED FOR THIS V5 JOURNEY-ROUTE SYSTEM ONLY`.

This does not create a project-wide rule that every 11 px label should become 12 px. Folios, issue labels and decorative English microcopy may appropriately remain smaller. The verified reason here is that the route carries factual/narrative information that guests are expected to read at print size and the geometry safely supports the increase.

## Learning record

Source: live Figma whole-item screenshot, rollback-safe comparison, Current post-promotion screenshot and structure readback.

Hypothesis: 12 px would improve factual route legibility without disturbing the outer-spread hierarchy.

Result: accepted. The route is clearer at actual size; whole-item balance and page rhythm remain stable.

Failure/regression: none observed. The staging audit separately rejected the assumption that `469:132` contained the Q60 derivative; it does not.

Status: `PROTOTYPED → VERIFIED`; not promoted to `PROJECT_RULE`.

Next application: return priority to the unresolved cover-hero quality gate using a genuinely different binary-safe path only. Continue other V5 design QA if that transport path remains blocked; do not claim V5 completion from typography polish.

## V5 / V6 gate impact

No photo-role state changed. Truthful gate remains:

- `PHOTO_ROLE_PASS 10/11`
- `ROLE_COMPLETE 10/11`
- `DOMINANT_PHOTO_PASS 2/3`
- active blocker: `V5-01 / 77:148 / IMG_HERO`

This typography improvement does not authorize `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS` or V6 production start.

## Canonical-log append safety

The complete experiment is recorded in this bounded learning-run file. The current GitHub connector exposes whole-file replacement for existing files rather than a safe atomic append operation, while the canonical learning and Rurubu lessons files are large and connector reads may be truncated. They were therefore not destructively replaced from an incomplete readback. This record is the exact synchronization source for a future safe append path.