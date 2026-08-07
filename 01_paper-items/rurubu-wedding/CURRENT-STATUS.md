# るるぶWEDDING — CURRENT STATUS

Date: 2026-08-08
Current authority: live Figma + Drive readback + `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json` + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

Process authority:
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`

## Current declaration

`RURUBU_V5_CURRENT_CANDIDATE / REALISTIC_DUMMY_MASTERS_13_OF_13_DRIVE_VERIFIED / ACTIVE_CURRENT_PHOTO_ROLES_12 / RETIRED_PRESERVED_ROLE_1 / INTENDED_SOURCE_APPLIED_4 / PHOTO_ROLE_PASS_3 / ROLE_COMPLETE_3 / DOMINANT_PHOTO_PASS_2_OF_3 / COVER_HERO_REPAIR_REQUIRED / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

## Current live Figma

Page: `01_RURUBU_WEDDING`

Current candidates:
- outer `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- inside `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

Rollback evidence preserved:
- outer V4 `59:2`
- inside V4 `59:178`

Key preserved comparisons:
- Friends two-up/three-up `336:2`
- FEATURE 01 subtraction `345:2`
- back-main Q18 `360:2`
- history Q18 `383:2 / V5_HISTORY_Q18_DRIVE_DERIVATIVE_TEST_2026_08_08`
- V5-07 old-town derivative `421:2 / V5_07_OLD_TOWN_DERIVATIVE_TEST_2026_08_08`

## Active-scope truth

Registered photo roles: `13`.
Active Current roles: `12`.
Retired/preserved role: `1` (`V5-11 / 77:35`); its Drive master remains preserved and it is not counted as PHOTO_ROLE_PASS or ROLE_COMPLETE.

Verified counts from the ledger:
- Drive readback: `13 / 13`
- intended source applied: `4 / 12`
- photo-role pass: `3 / 12`
- role complete: `3 / 12`
- dominant role pass: `2 / 3`

## Dominant-photo gate

- cover hero `77:148` — **OPEN / current derivative rejected for visible quality**
- back main `77:24` — **PASS for V5 dummy-design QA**
- history `77:422` — **PASS for V5 dummy-design QA**

### Verified dominant-role gain — V5-05 history

Drive master:
- `05_HISTORY_WATERFRONT_DUMMY.png`
- ID `1LO9rwdFuWMD2TZvSa6efn-gjbdyRBYt3`
- `2,201,647 bytes`

Accepted V5 dummy-design derivative:
- `RURUBU_V5_05_HISTORY__FIGMA_1356x560_Q18_SINGLECALL.jpg`
- Drive ID `1ndvJShFDKPO6OmUD3JeIRvPwpS8V1v8x`
- `1356 × 560`
- `29,582 bytes`
- SHA-256 `f6642e7fd43e5058221bf6937d3e8428d8e2b89c35196ec43570aed4f8dd24da`
- exactly `2×` the `678 × 280` semantic target

Verified Figma mapping:
- Current node `77:422 / IA_HISTORY_MEMORY_PHOTO`
- previous hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- current hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- comparison frame `383:2`
- comparison node `383:140`

Three-scale QA:
- whole/page: PASS; the waterfront photograph reads as an intentional history lead and is materially sharper than the old blocky placeholder
- reading scale: PASS; the timeline → hero → caption → memory-spots reading order remains intact
- actual-size/detail: PASS for dummy-design QA; waterfront path, skyline/tree edge, lights, mountains and horizon remain distinct at natural `678 × 280` render size

Structure QA after promotion:
- inside native text nodes: `92`
- inside IMAGE-fill nodes: `9`
- semantic node name and `678 × 280` geometry preserved
- fold guide `77:288` preserved and visible
- rollback frames `59:2` / `59:178` preserved
- comparison `383:2` preserved

Transport learning:
- direct external `mcp.figma.com` upload repeated the known DNS blocker and was abandoned
- a one-shot manually pasted base64 payload failed validation and made no canvas changes because the Figma write was atomic
- changed method: the exact Drive-readback base64 was split into six guarded document-shared chunks (`7000,7000,7000,7000,7000,4444` chars), reconstructed in Figma, validated at encoded length `39,444`, decoded length `29,582`, and JPEG SOI/EOI markers, then applied to the duplicate first
- Current was promoted only after screenshot QA on `383:140` and `383:2`

Detailed evidence:
- `learning-runs/2026-08-08-v5-history-q18-binary-safe-promotion.md`

### Verified dominant-role gain — V5-10 back main

V5-10 remains PASS and unchanged:
- Current node `77:24`
- derivative Drive ID `17YaX5CK-c0cTr4zsL2Dly4J1XSZyFxHG`
- current hash `e3738476f760932bb5b09c9d60f174dd6c84049d`
- comparison `360:2`
- evidence `learning-runs/2026-08-07-v5-back-main-q18-binary-safe-promotion.md`

## Verified supporting-role gain — V5-07 old-town memory

Drive master:
- `07_MEMORY_SPOT_02_OLD_TOWN_DUMMY.png`
- ID `1z7pV8BzSaqrvChCbmotTRoEptTaQZMLw`
- `2,591,213 bytes`

Accepted V5 dummy-design derivative:
- `RURUBU_V5_07_MEMORY_OLD_TOWN__FIGMA_352x368_Q30_SINGLECALL.jpg`
- Drive ID `1ZsLOgZbZWyfYgDfvKvYPqOsbMJrSf1J5`
- `352 × 368`
- `12,186 bytes`
- SHA-256 `a957431f3b6177661d03e8ddec93a784a1a7fa86bfa4ecba0cf959ec557939be`
- exactly `4×` the `88 × 92` semantic target

Verified Figma mapping:
- Current node `77:438 / IA_MEMORY_2_PHOTO`
- previous hash `27ad4cfab8fd579b8452540ce954f8b36edc77fb`
- current hash `439a719d73f28e8dd2889f2026cccb15f345ec63`
- comparison frame `421:2`
- comparison target `421:156`

Three-scale QA:
- whole spread: PASS; it reads as a distinct old-town supporting destination without disturbing the history/lead-memory hierarchy
- reading scale: PASS; warm architecture clearly differentiates memory 02 from the bright lead coast and memory 03
- actual-size/detail: PASS for dummy-design QA at natural `88 × 92`; the central street, lit façades and perspective remain recognizable

Structure QA after promotion:
- inside native text nodes: `92`
- visible native text nodes: `57`
- inside IMAGE-fill nodes: `9`
- semantic node name and `88 × 92` geometry preserved
- fold guide `77:288` preserved and visible
- rollback frames `59:2` / `59:178` preserved
- comparison `421:2` preserved

Transport learning:
- external `upload_assets` returned a valid endpoint but repeated the known `mcp.figma.com` DNS blocker; the method was not retried
- changed method: a small role-sized Q30 derivative was decoded in one guarded Figma call with exact encoded/decoded-length and JPEG-marker checks
- the duplicate was screenshot/structure-QA'd before its verified hash was promoted to Current
- this Q30 acceptance is role-specific and does not establish a general compression rule for larger images

Detailed evidence:
- `learning-runs/2026-08-08-v5-memory-02-q30-binary-safe-promotion.md`

## Next required V5 work

### Priority A — final open dominant role

1. close cover hero `77:148` with a quality-passing role-sized derivative, Drive ID → node ID → Figma hash evidence, and three-scale QA
2. do not regenerate unless the existing master/derivative cannot satisfy crop, resolution, text-safe-space, identity, or editorial-fit requirements
3. preserve rollback and test on a duplicate first

### Priority B — remaining active photo roles

Identity/lead:
- cover snap `77:236`
- groom `77:296`
- bride `77:302`
- lead memory `77:430`

Friends & Family active:
- `77:39`
- `77:43`

Small memories:
- `77:446`
- `77:454`

Completed supporting role:
- `77:438 / V5-07` — PASS

Generated recognizable people must not be represented as the real bride, groom, family, or friends; profile dummies require safe identity treatment before pass.

### Final V5 design gate

Do not declare `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS` until:
- intended high-quality derivatives: `12 / 12`
- active PHOTO_ROLE_PASS: `12 / 12`
- retired preserved roles: `1 / 1` truthfully recorded
- dominant PHOTO_ROLE_PASS: `3 / 3`
- whole-item / reading / actual-size QA complete
- fold/safe-area/print plausibility complete
- native text, semantic nodes, crop integrity, Drive IDs, Figma hashes and rollback state verified
- weakest-three repair and at least one evidence-based subtraction review completed

## V6 boundary

V6 remains research/preparation only until the V5 dummy-design gate passes. Production must remain separate from V5, use clean-room Figma concepts and V6-specific assets/Drive evidence, and must not overwrite V5 or inherit its image hashes/crops/composition by default.

## Print boundary

Figma dummy-design QA is not print readiness. Later independent gates remain:
1. `REAL_CONTENT_EDITORIAL_QA_PASS`
2. `PRINT_TEMPLATE_PREFLIGHT_PASS`
3. `PHYSICAL_PROOF_PASS`
4. `PRINT_READY`

Do not claim final/print-ready while dummy content remains, printer template is unverified, PDF preflight is incomplete, or physical proof has not passed.