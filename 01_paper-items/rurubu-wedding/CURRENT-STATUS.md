# るるぶWEDDING — CURRENT STATUS

Date: 2026-08-08
Current authority: live Figma + Drive readback + `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json` + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

Process authority:
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `docs/wedding-figma-production-system.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`

## Current declaration

`RURUBU_V5_CURRENT_CANDIDATE / REALISTIC_DUMMY_MASTERS_13_OF_13_DRIVE_VERIFIED / ACTIVE_CURRENT_PHOTO_ROLES_11 / RETIRED_PRESERVED_ROLES_2 / INTENDED_SOURCE_APPLIED_6 / PHOTO_ROLE_PASS_5 / ROLE_COMPLETE_5 / DOMINANT_PHOTO_PASS_2_OF_3 / COVER_HERO_REPAIR_REQUIRED / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

## Current live Figma

Page: `01_RURUBU_WEDDING`

Current candidates:
- outer `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- inside `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

Rollback evidence:
- outer V4 `59:2`
- inside V4 `59:178`

Important comparison frames preserved:
- Friends two-up/three-up `336:2`
- FEATURE 01 subtraction `345:2`
- back-main derivative `360:2`
- history derivative `383:2`
- dense Rurubu clean-room cover `413:2`
- inside editorial clean-room `419:2`
- memory 02 `421:2`
- memory 03 `427:2`
- memory 04 `429:2`
- cover-snap scope/transport comparison `432:2`

## Active-scope truth

Registered photo roles: `13`.
Active Current roles: `11`.
Retired/preserved roles: `2`.

Retired roles:
- `V5-11 / 77:35 / BACK_VISUAL_FRIEND_1_PHOTO` — hidden legacy third Friends role; Current two-up composition won the comparison.
- `V5-02 / 77:236 / AUTH_COVER_SNAP_01` — live-Figma audit on 2026-08-08 verified the image node and its label `77:237` are both hidden, and no alternate cover-snap node is effectively visible in Current. Its Drive master and tested derivative remain preserved, but it is excluded from the active completion denominator rather than falsely counted as a pass.

Verified ledger counts:
- Drive readback: `13 / 13`
- intended source applied: `6 / 11 active`
- photo-role pass: `5 / 11 active`
- role complete: `5 / 11 active`
- dominant role pass: `2 / 3`

## Dominant-photo gate

- cover hero `77:148` — **OPEN / current derivative rejected for visible quality**
- back main `77:24` — **PASS for V5 dummy-design QA**
- history `77:422` — **PASS for V5 dummy-design QA**

The cover hero remains the last dominant-photo blocker. V6 production remains closed until the full V5 dummy-photo/design gate is genuinely verified.

## Verified completed active photo roles

### V5-05 — history lead
- Current node: `77:422 / IA_HISTORY_MEMORY_PHOTO`
- derivative Drive ID: `1ndvJShFDKPO6OmUD3JeIRvPwpS8V1v8x`
- derivative: `1356 × 560`, `29,582 bytes`
- image hash: `539c259be8036b481d06b4f76db9a39b407d90e8`
- QA: whole/page, reading, actual-size detail, structure PASS for dummy-design QA

### V5-07 — memory spot 02 / old town
- Current node: `77:438 / IA_MEMORY_2_PHOTO`
- derivative Drive ID: `1ZsLOgZbZWyfYgDfvKvYPqOsbMJrSf1J5`
- derivative: `352 × 368`, `12,186 bytes`
- image hash: `439a719d73f28e8dd2889f2026cccb15f345ec63`
- QA: whole/page, reading, actual-size detail, structure PASS

### V5-08 — memory spot 03 / night view
- Current node: `77:446 / IA_MEMORY_3_PHOTO`
- derivative Drive ID: `1rJJDOX_lwkCbA_DiCDptZfAQrMieG5LL`
- derivative: `352 × 368`, `7,762 bytes`
- image hash: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`
- QA: whole/page, reading, actual-size detail, structure PASS

### V5-09 — memory spot 04 / resort sunset
- Current node: `77:454 / IA_MEMORY_4_PHOTO`
- derivative Drive ID: `1QHWfftLU6m6FZYNJy8IxbOAgp1knzzoP`
- derivative: `352 × 368`, `9,950 bytes`
- image hash: `c09aa82e7b2ac75708707345c6f845452bf67663`
- QA: whole/page, reading, actual-size detail, structure PASS

### V5-10 — back-cover main
- Current node: `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
- derivative Drive ID: `17YaX5CK-c0cTr4zsL2Dly4J1XSZyFxHG`
- derivative: `944 × 608`, `33,577 bytes`
- image hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- QA: whole/page, reading, actual-size detail, structure PASS for dummy-design QA

## V5-02 scope reconciliation / preserved evidence

Master:
- `02_COVER_SNAP_AIRPLANE_DUMMY.png`
- Drive ID `1fkzkpkhi2nEq-gxYjroqJipsvAoDStwI`
- `1,625,765 bytes`

Role-specific derivative preserved:
- `RURUBU_V5_02_COVER_SNAP__FIGMA_528x528_Q08_BINARYSAFE.jpg`
- Drive ID `19KuYUYkyePCErVjXbzX0KQpNoBOdFh34`
- `528 × 528`
- `4,492 bytes`
- SHA-256 `6366d4700992fcc1407929d815c96b6c8a7b8f1c6e88c1c32cbce0e2f01ee11e`

Binary-safe comparison proof:
- comparison frame `432:2`
- comparison node `432:220`
- verified image hash `6508fe94eb77b14d73b06ed2b8e705d33e5ab880`
- guarded chunks reconstructed to encoded length `5,992`, decoded length `4,492`, valid JPEG SOI/EOI

This does **not** become PHOTO_ROLE_PASS because the Current semantic node is hidden. The correct quality-over-legacy action is retirement from visible scope, not importing activity for its own sake.

## Remaining active V5 photo roles

1. `V5-01 / 77:148` — cover hero; highest priority and final dominant blocker
2. `V5-03 / 77:296` — groom atmosphere profile; identity-safe treatment required
3. `V5-04 / 77:302` — bride atmosphere profile; recognizable-face risk must be removed
4. `V5-06 / 77:430` — lead memory coast image
5. `V5-12 / 77:39` — Friends & Family 02 / cafe
6. `V5-13 / 77:43` — Friends & Family 03 / dining

No active role may be counted complete until Drive ID, derivative dimensions/bytes, exact Figma node/hash, screenshot QA, structure QA, and Git readback agree.

## Design direction

Current remains a candidate, not a sacred composition. Clean-room comparisons `413:2` and `419:2` remain valid evidence that a denser, more authentic travel-magazine hierarchy can outperform legacy card geometry. Whole-item, reading/page, and actual-size comparisons decide promotion; legacy implementation effort does not.

## V6 gate

V6 remains separate and production-blocked. Research, Drive structure, asset queue, and two clean-room concept directions are prepared, but no V6 production frame or generated production master may be claimed until V5 reaches the verified dummy-photo/design QA gate.

## Next safe work

- close `V5-01` with a quality-passing role-specific cover derivative and duplicate-first three-scale QA
- advance `V5-06`, `V5-12`, and `V5-13` while preserving source identity and crop quality
- treat V5-03/V5-04 with identity-safe crops/replacements before any pass
- continue comparing Current against the clean-room cover/inside candidates
- keep print readiness separate from dummy-design completion
