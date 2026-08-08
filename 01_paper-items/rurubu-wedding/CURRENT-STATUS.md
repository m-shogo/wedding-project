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

`RURUBU_V5_CURRENT_CANDIDATE / REALISTIC_DUMMY_MASTERS_13_OF_13_DRIVE_VERIFIED / ACTIVE_CURRENT_PHOTO_ROLES_11 / RETIRED_PRESERVED_ROLES_2 / INTENDED_SOURCE_APPLIED_11 / PHOTO_ROLE_PASS_10 / ROLE_COMPLETE_10 / DOMINANT_PHOTO_PASS_2_OF_3 / COVER_HERO_REPAIR_REQUIRED / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

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
- lead-memory coast derivative `436:2`
- Friends cafe derivative `442:2`
- groom identity-safe derivative `460:2`
- cover-hero Q60 staging comparison `469:2`
- bride identity-safe derivative `484:2`
- Friends dining derivative `487:2`

## Active-scope truth

Registered photo roles: `13`.
Active Current roles: `11`.
Retired/preserved roles: `2`.

Retired roles:
- `V5-11 / 77:35 / BACK_VISUAL_FRIEND_1_PHOTO` — hidden legacy third Friends role; Current two-up composition won the comparison.
- `V5-02 / 77:236 / AUTH_COVER_SNAP_01` — live-Figma audit verified the image node and its label `77:237` are both hidden, and no alternate cover-snap node is effectively visible in Current. Its Drive master and tested derivative remain preserved, but it is excluded from the active completion denominator rather than falsely counted as a pass.

Verified ledger counts:
- Drive readback: `13 / 13`
- intended source applied: `11 / 11 active`
- photo-role pass: `10 / 11 active`
- role complete: `10 / 11 active`
- dominant role pass: `2 / 3`

## Dominant-photo gate

- cover hero `77:148` — **OPEN / current source below quality target; Q60 derivative prepared but not yet promoted**
- back main `77:24` — **PASS for V5 dummy-design QA**
- history `77:422` — **PASS for V5 dummy-design QA**

The cover hero is now the only remaining active photo-role blocker and the last dominant-photo blocker. V6 production remains closed until the full V5 dummy-photo/design gate is genuinely verified.

## Verified completed active photo roles

### V5-03 — groom profile / identity-safe dummy
- Current node: `77:296 / IA_PROFILE_A_PHOTO`
- master Drive ID: `1x4zsKXkk4AHnXoUBHuSX0HnCqPGIy_Wd`
- accepted derivative Drive ID: `1gi7hPnUi2B_fWbwROrq5Mw5Skora3VQy`
- derivative: `616 × 720`, `12,865 bytes`, exactly `4×` the `154 × 180` semantic role
- derivative SHA-256: `1d4152adddb99ddf256f7f9e31d284cc8ca93e6b51624b0f6231f02e8a7d162c`
- retained higher-quality fallback: Drive ID `1nT1tAU5Ua8xU3h20jvQ1DRKV5hzDrHAO`, `24,795 bytes`
- Current image hash: `a39dd297eb9de572317a5ce57f0af12e8597b156`
- comparison: `460:2`, target `460:8`
- QA: whole spread, reading/page and natural-size profile detail PASS for V5 dummy-design QA
- identity: back/side-view adult man with camera; face remains unreadable and is not presented as the real groom

### V5-04 — bride profile / identity-safe dummy
- Current node: `77:302 / IA_PROFILE_B_PHOTO`
- master Drive ID: `1xOhG8tOmhUclfUchGzFOlrWP2vb9yPfO`
- accepted derivative Drive ID: `1OJLOs_17GCNrED-oUAWtCHknmx0v2cub`
- derivative: `488 × 488`, `11,932 bytes`, exactly `4×` the `122 × 122` semantic role
- derivative SHA-256: `cb099eb490d840e07413d246a4b4b9e8f95bdeba2a22199713da108787d287c9`
- Current image hash: `2359f635b4926a83e22ca1f9214e75c709291152`
- comparison: `484:2`, target `484:14`
- QA: whole spread, left-page reading scale and actual-size circular profile detail PASS for V5 dummy-design QA
- identity: face-excluding crop preserves hair/earring, bridal lace/back silhouette and warm architectural atmosphere; no recognizable generated face is presented as the real bride

### V5-05 — history lead
- Current node: `77:422 / IA_HISTORY_MEMORY_PHOTO`
- derivative Drive ID: `1ndvJShFDKPO6OmUD3JeIRvPwpS8V1v8x`
- derivative: `1356 × 560`, `29,582 bytes`
- image hash: `539c259be8036b481d06b4f76db9a39b407d90e8`
- QA: whole/page, reading, actual-size detail, structure PASS for dummy-design QA

### V5-06 — lead memory / coast
- Current node: `77:430 / IA_MEMORY_1_PHOTO`
- accepted derivative Drive ID: `1epb80L7WSZDmU86zl6PVQkZ8frP1JEeN`
- derivative: `796 × 428`, `23,276 bytes`
- Current image hash: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- comparison: `436:2`, target `436:148`
- QA: whole/page, reading, natural-size detail, structure PASS for V5 dummy-design QA

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

### V5-12 — Friends & Family cafe
- Current node: `77:39 / BACK_VISUAL_FRIEND_2_PHOTO`
- live semantic geometry: `270 × 184`
- accepted derivative Drive ID: `1CN3gXWgHccx6WwcsmJcXDfXWgARMLFrO`
- derivative: `810 × 552`, `25,901 bytes`, exactly `3×` live target geometry
- Current image hash: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- comparison: `442:2`, target `442:23`
- QA: whole/page, reading and natural-size detail PASS

### V5-13 — Friends & Family dining
- Current node: `77:43 / BACK_VISUAL_FRIEND_3_PHOTO`
- live semantic geometry: `244 × 166`
- master Drive ID: `1AcZTgDJY9LGYP_zfgh320OLtUifR53N1`
- accepted derivative Drive ID: `1R0JW7jny0XSOaysUzLMLo8n8nDxVGqdy`
- derivative: `732 × 498`, `13,867 bytes`, exactly `3×` the live target
- current Drive-readback SHA-256: `dae183acded3e9be767159b179b32fa456bbfd64a8b4779ac79c9df3de659f08`
- previous image hash: `3abe9ce228d2252b847860ac895f2c178b6b3ddd`
- Current image hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- comparison: `487:2`, target `487:27`
- QA: whole outer spread, back-page reading scale and natural-size dining detail PASS
- identity: food/table/glasses/waterfront atmosphere; no recognizable generated guest is presented as a real friend or family member
- structure: semantic node, fold guide `77:288`, rollback `59:2` / `59:178`, comparison frame and native text preserved

The first Current fill-assignment attempt for V5-13 appeared to succeed from the mutation return but did not persist. A separate live hash audit caught the mismatch before the role was counted. The implementation switched to indexed IMAGE-paint replacement with same-call readback, then fresh Current screenshots confirmed the final hash. This is recorded as a verified learning result, not hidden as an implementation detail.

## Retired-role evidence

### V5-02 — cover snap
The role-specific derivative remains preserved in Drive and its hidden comparison was binary-transport proven, but the Current image node and label are hidden. It is intentionally retired from the visible denominator and is not PHOTO_ROLE_PASS.

### V5-11 — legacy third Friends photo
The master remains preserved, but the two-photo Current composition won the clean comparison. The hidden legacy module is not forced back into Current merely to satisfy an obsolete checklist denominator.

## Remaining active V5 photo role

`V5-01 / 77:148 / IMG_HERO` — cover hero only.

- live geometry: `665 × 610`
- Current hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- Current source remains below the quality target and is not PHOTO_ROLE_PASS
- Q60 derivative: `1330 × 1220`, `155,439 bytes`
- Q60 Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- Q60 SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`
- rollback-safe staging comparison: `469:2`, target `469:132`

No role may be counted complete until Drive ID, derivative dimensions/bytes, exact Figma node/hash, screenshot QA, structure QA, and Git readback agree.

## Design direction

Current remains a candidate, not a sacred composition. Clean-room comparisons `413:2` and `419:2` remain evidence that materially different hierarchy can outperform legacy card geometry. Whole-item, reading/page, and actual-size comparisons decide promotion; legacy implementation effort does not.

## V6 gate

V6 remains separate and production-blocked. Research, Drive structure, asset queue, and two clean-room concept directions are prepared, but no V6 production frame or generated production master may be claimed until V5 reaches the verified dummy-photo/design QA gate.

## Next safe work

- close `V5-01` using a quality-preserving cover-hero derivative; do not fall back to the rejected low-quality transport proof merely to reach 11/11
- compare Current cover against clean-room cover `413:2` at whole-item, reading/page and actual-size scales after the hero is repaired
- run final V5 weakest-three, typography, density, fold/safe-area and structure checks only after the dominant-photo gate reaches `3/3`
- keep print readiness separate from dummy-design completion