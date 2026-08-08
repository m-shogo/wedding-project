# V5 Memory Spots microtype legibility promotion

Date: 2026-08-09
Item/version: Rurubu WEDDING V5
Status: `PROTOTYPED → VERIFIED / CURRENT_ADOPTED / V6_GATE_UNCHANGED`

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`

The known cover-Q60 transfer blocker was not retried. The verified Q60 Drive source remains valid; repeated network/model-visible binary transfer methods are already rejected. This run therefore advanced another safe V5 incomplete step without falsifying the dominant-photo gate.

## Visible problem

On Current inside spread `77:290`, the two small supporting Memory Spots modules on the right page contained some of the smallest factual/editorial text on the spread:

- `77:444 / IA_MEMORY_2_BODY`: 10 px
- `77:459 / IA_MEMORY_4_CITY`: 9 px
- `77:460 / IA_MEMORY_4_BODY`: 10 px

At whole-spread scale the modules were understandable, but these labels were weak at actual-size print-oriented review compared with the recently improved history timeline. The defect was typography/readability, not image generation or composition.

## Principle tested

Before adding containers, badges, or decoration, improve actual-size legibility through bounded native typography while preserving editorial hierarchy, semantic nodes, imagery, fold safety, and rollback.

Expected improvement: supporting Memory Spots copy becomes easier to read without competing with the dominant `01` memory photograph or section heading.

Possible regression: larger type could wrap excessively, collide with adjacent modules, or expose fixed-height clipping.

Evidence required: rollback-safe duplicate, whole-spread/reading screenshot review, target geometry readback, clipping/auto-resize check, Current promotion readback, preserved fold/rollback/comparison frames.

## Safe prototype

Created duplicate comparison frame:

- `540:2 / V5_INSIDE_MEMORY_MICROTYPE_QA_2026_08_09`

Initial bounded changes on duplicate:

- `540:162 / IA_MEMORY_2_BODY`: 10 → 11 px
- `540:177 / IA_MEMORY_4_CITY`: 9 → 10 px
- `540:178 / IA_MEMORY_4_BODY`: 10 → 11 px

Fonts were loaded from each text node's existing styled segments before mutation. No copy, image, crop, card, route, fold, or page geometry changed.

## Failure caught during QA

The first duplicate readback exposed a real regression risk: `IA_MEMORY_4_BODY` still had `textAutoResize = NONE` and a fixed height of about 14.4 px after increasing to 11 px. This was not accepted merely because the screenshot rendered.

Correction on duplicate:

- `540:178 / IA_MEMORY_4_BODY`: `textAutoResize NONE → HEIGHT`
- resulting height: about `32 px`

`IA_MEMORY_2_BODY` already used `HEIGHT` auto-resize and expanded safely to `48 px`.

This demonstrates that a type-size increase must include geometry/readback QA; visible rendering alone is insufficient evidence.

## Result

`VERIFIED / ADOPTED`.

Three-scale review found:

- whole spread: Memory Spots remains subordinate to `OUR HISTORY` and the dominant memory photograph; no hierarchy regression
- reading/page scale: the small `02` and `03` modules scan more comfortably
- actual-size/detail: body copy and `NEXT DESTINATION` are materially more legible
- no observed collision with photos, rules, titles, route markers, page footer, or fold
- native text and semantic roles preserved

## Current promotion

Promoted the same bounded change to Current `77:290`:

- `77:444 / IA_MEMORY_2_BODY`: 10 → 11 px, `HEIGHT`, final height `48 px`
- `77:459 / IA_MEMORY_4_CITY`: 9 → 10 px
- `77:460 / IA_MEMORY_4_BODY`: 10 → 11 px, `NONE → HEIGHT`, final height `32 px`

Post-promotion structure readback:

- native text nodes: `92`
- visible text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:540`: visible
- rollback frames `59:2` and `59:178`: preserved
- comparison frame `540:2`: preserved

## Asset / gate truth

No photo role, source, image hash, Drive ID, crop, or asset ledger count changed in this run.

Official V5 photo gate therefore remains:

- intended source applied: `11 / 11 active`
- PHOTO_ROLE_PASS: `10 / 11 active`
- ROLE_COMPLETE: `10 / 11 active`
- dominant photo pass: `2 / 3`

`V5-01 / 77:148 / IMG_HERO` remains the only active photo-role blocker. V6 production remains closed until the full V5 dummy-photo/design gate is genuinely verified.

## Learning status

`PROTOTYPED → VERIFIED`, not yet `PROJECT_RULE`.

Candidate lesson: when a compact editorial side module is compositionally sound but its smallest factual copy is below comfortable actual-size readability, a one-step native type increase can outperform adding containers. Any promotion must include auto-resize/height inspection because fixed-height text boxes can silently become clipping risks.

## Next application

Continue the V5 weakest-three typography/density/fold-safe audit on non-photo areas while leaving the repeatedly blocked Q60 transport path untouched. When a genuinely binary-safe Figma asset bridge becomes available, repair `77:148`, then run final V5 whole-item/reading/detail/print-plausibility comparison against the clean-room cover before opening V6 production.
