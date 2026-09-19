# V30 P02 production assets

Status: `FIGMA_DESIGN_COMPLETE / FINAL_PHOTO_QA_PENDING / PRINT_READY_NO`

P02 CURRENT is the official Figma frame `3535:9`. No duplicate or TEMP P02 frame exists.

## Preserve — already accepted

- SHOGO is left / blue.
- SHIORI is right / pink.
- Q1 owns exactly one replaceable couple-photo inset.
- Q2 has no photo slot.
- Three active photo fills use clean standalone proxies.
- Profile/Q paper interiors are opaque.
- Airmail border remains background-adjacent.
- Unapproved personal copy remains native/separate and is not factized.
- P01 changed only by the authorized shared PAGE badge migration; P03–P08 remain untouched.

## Correct asset-role classification

Do not infer render mode from whether text is fixed or stylized. P02 uses these roles:

- `GENERATED_DISPLAY_ASSET`: `ふたりのプロフィール`, `私たちのこと、少しだけ紹介します♪`, `SHOGO`, `SHIORI`.
- `NATIVE_TEXT`: profile labels/values and Q1/Q2 question/answer copy.
- `SHARED_PUBLICATION_COMPONENT`: `PAGE 02`, instance `3773:9` of `PAGE_BADGE_SHARED_MASTER` `3772:2`.
- `PAGE_SPECIFIC_ORNAMENT`: travel/tropical/route/icon art used to shape this page's local editorial character.
- `PHOTO`: SHOGO portrait, SHIORI portrait, Q1 couple inset.

The canonical display strings, production hashes and Figma image hashes are recorded in `production/display/manifest.json`.

## Ornament art-direction patch — COMPLETE

Phase A established one TRAVEL_VEHICLE/ROUTE anchor and one TROPICAL_BOTANICAL anchor before the five contextual final assets were produced:

- `P02_Q2_PLANE_AND_ROUTE`
- `P02_TOP_AIRPLANE_ROUTE`
- `P02_Q2_SUITCASE`
- `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`
- `P02_TOP_LEFT_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`

All five were replaced with newly authored art using one compatible V30 treatment: imperfect navy contours, bright simplified gouache color, restrained print texture, warm-white sticker keylines and light-to-medium editorial weight.

The two vehicle/route compositions and two tropical compositions are related but not duplicated or mirrored. Q2 suitcase is an integrated travel-ephemera vignette. Production assets and hashes are in `production/ornaments/manifest.json`.

## Clean standalone proxies

- `production/proxies/V30_P02_SHOGO_CLEAN_STANDALONE_PROXY.png`
- `production/proxies/V30_P02_SHIORI_CLEAN_STANDALONE_PROXY.png`
- `production/proxies/V30_P02_Q1_COUPLE_CLEAN_STANDALONE_PROXY.png`

Final owner photos can replace only these fills.

## Current gates

- `FIGMA_STRUCTURE_READY = PASS_PRESERVED`
- `CLEAN_PROXY_PASS = PASS_PRESERVED`
- `ALPHA_INTEGRITY_PASS = PASS_PRESERVED`
- `COPY_SAFETY_PASS = PASS_PRESERVED`
- `BORDER_Z_ORDER_PASS = PASS_PRESERVED`
- `ASSET_ROLE_CLASSIFICATION_PASS = PASS_AFTER_OWNER_CORRECTION`
- `RURUBU_EDITORIAL_DNA_PASS = PASS`
- `V30_ART_DIRECTION_PASS = PASS`
- `PAGE_ROLE_FIT_PASS = PASS`
- `ORNAMENT_FAMILY_COHERENCE_PASS = PASS`
- `ORNAMENT_OBJECT_QUALITY_PASS = PASS`
- `REUSE_INTENT_PASS = PASS`
- `TRUE_ALPHA_PREFLIGHT_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_FINAL_INTEGRATED_REVIEW`
- `DISPLAY_ROLE_CLASSIFICATION_PASS = PASS`
- `LIVE_ROLE_IMPLEMENTATION_PASS = PASS`
- `DISPLAY_ART_QUALITY_PASS = PASS`
- `SHARED_PUBLICATION_COMPONENT_PASS = PASS`
- `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS = PASS`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

P02 is design-locked. Final-photo and print-readiness QA remain pending.
