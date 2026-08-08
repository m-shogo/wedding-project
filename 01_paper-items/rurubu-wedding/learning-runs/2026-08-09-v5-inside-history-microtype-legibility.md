# V5 inside history timeline microtype legibility promotion

Date: 2026-08-09
Item/version: Rurubu WEDDING V5
Status: `PROTOTYPED → VERIFIED / CURRENT_ADOPTED / V6_GATE_UNCHANGED`

## Source authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `01_paper-items/rurubu-wedding/POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `01_paper-items/rurubu-wedding/RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`

## Visible problem

The inside-right `OUR HISTORY` timeline carried six event years at 11 px and six event labels at 10 px. At whole-spread scale the sequence was structurally clear, but the labels were among the smallest factual native text on the spread and were weak at actual-size print-oriented review. This was a typography/print-plausibility defect, not an asset-generation problem.

## Principle tested

Japanese editorial microcopy must remain readable at actual size. Before adding decoration or containers, improve hierarchy through native typography while preserving the underlying semantic timeline and geometry.

## Hypothesis

Increasing only the six year labels from 11 → 12 px and the six event labels from 10 → 11 px would improve actual-size legibility without changing content, timeline spacing, image hierarchy, fold safety, or the dominant photograph.

Possible regression: larger text could crowd adjacent event columns, alter the light micro-information role, or create line-wrap/collision.

Evidence required: rollback-safe duplicate, whole-spread screenshot, reading-scale inspection, actual-size typography inspection, structure readback, preserved rollback frames.

## Safe prototype

Created duplicate comparison frame:

- `539:2 / V5_INSIDE_HISTORY_TIMELINE_MICROTYPE_QA_2026_08_09`

Changed only duplicate native text:

Years 11 → 12 px:
- `539:123` IA_HISTORY_1_YEAR
- `539:126` IA_HISTORY_2_YEAR
- `539:129` IA_HISTORY_3_YEAR
- `539:132` IA_HISTORY_4_YEAR
- `539:135` IA_HISTORY_5_YEAR
- `539:138` IA_HISTORY_6_YEAR

Event labels 10 → 11 px:
- `539:124` IA_HISTORY_1_TEXT
- `539:127` IA_HISTORY_2_TEXT
- `539:130` IA_HISTORY_3_TEXT
- `539:133` IA_HISTORY_4_TEXT
- `539:136` IA_HISTORY_5_TEXT
- `539:139` IA_HISTORY_6_TEXT

Fonts were loaded from each text node's existing styled segments before mutation. No copy, image, crop, background, route, card, badge, shadow, fold, or page geometry changed.

## Result

`VERIFIED / ADOPTED`.

Three-scale review found:

- whole spread: timeline remains subordinate to `OUR HISTORY` and the dominant history photograph; no new visual competition
- reading/page scale: dates and event labels scan more clearly across the six-point sequence
- actual-size/detail: microcopy is materially easier to read while retaining its micro-information role
- no observed wrap, collision, clipping, or change in event spacing
- no asset role or completion count changed

## Current promotion

Promoted the same bounded type change to Current `77:290`.

Current year nodes now 12 px:
- `77:405`, `77:408`, `77:411`, `77:414`, `77:417`, `77:420`

Current event-label nodes now 11 px:
- `77:406`, `77:409`, `77:412`, `77:415`, `77:418`, `77:421`

Preserved:
- semantic native text nodes
- images and image hashes
- current history photo
- fold guide
- rollback outer `59:2`
- rollback inside `59:178`
- comparison `539:2`

## Asset / V5 gate truth

This run did not modify or falsely advance photo-role evidence. Cover hero remains the only active photo-role blocker. Official counts remain:

- intended source applied: 11 / 11 active
- PHOTO_ROLE_PASS: 10 / 11 active
- ROLE_COMPLETE: 10 / 11 active
- dominant photo pass: 2 / 3

V6 production remains closed until the V5 dummy-photo/design gate is genuinely complete.

## Failure / rejected activity

The known cover-Q60 transport blocker was deliberately not retried. The same upload/network and large model-visible binary paths have already failed repeatedly. No regeneration was performed because the Q60 Drive derivative is already verified and the defect is transport, not source quality.

## Reusable lesson

`PROTOTYPED → VERIFIED`, not yet `PROJECT_RULE`: when a factual horizontal timeline is already compositionally correct but its smallest text is weak at actual-size review, a one-step native-type increase can outperform adding boxes or visual markers. Adoption requires collision/wrap checks and whole-spread hierarchy confirmation.

## Next application

Continue V5 final typography/weakest-three review on non-photo areas while keeping Q60 untouched until a genuinely binary-safe bridge is available. Do not open V6 production while the cover hero gate remains 2/3 dominant.