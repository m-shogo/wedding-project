# V30 P02 production assets

Status: `STRUCTURE_COPY_PHOTO_PASS / ORNAMENT_QUALITY_REOPENED / FINAL_PHOTO_QA_PENDING / PRINT_READY_NO`

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
- P01 and P03–P08 remain untouched.

## Correct asset-role classification

Do not infer render mode from whether text is fixed or stylized. P02 uses these roles:

- `NATIVE_TEXT`: `ふたりの`, `プロフィール`, `私たちのこと、少しだけ紹介します♪`, `SHOGO`, `SHIORI`, profile labels/values, Q1/Q2 question/answer copy.
- `SHARED_COMMON_COMPONENT`: `PAGE 02`, which belongs to the P01–P08 shared PAGE-badge family.
- `PAGE_SPECIFIC_ORNAMENT`: travel/tropical/route/icon art used to shape this page's local editorial character.
- `PHOTO`: SHOGO portrait, SHIORI portrait, Q1 couple inset.
- `GENERATED_DISPLAY_ASSET`: only where an authored visual object genuinely benefits from being prepared as one display asset; fixed/stylized text alone is not a reason to rasterize it.

## Reopened ornament debt — REWORK_REQUIRED

The first production pass is structurally valid, but the following ornaments fail the current visual-quality bar because they read as generic/stock, repeated, or stale carry-over rather than locally authored magazine decoration:

- `P02_Q2_PLANE_AND_ROUTE`
- `P02_TOP_AIRPLANE_ROUTE`
- `P02_Q2_SUITCASE`
- `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`
- `P02_TOP_LEFT_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`

Moving, resizing, recoloring, or lightly reusing these same assets is not sufficient. Replace/rework the ornament art itself while preserving the accepted page structure.

`REQUALIFIED_CARRYOVER` only passes when current visual quality, local context fit, stock/clipart feel, and same-page reuse/duplication feel all pass.

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
- `ORNAMENT_ORIGINALITY_PASS = REOPENED`
- `VISUAL_CARRYOVER_PASS = REOPENED_FOR_FIVE_ORNAMENTS`
- `REFERENCE_DELTA_PASS = REOPENED_FOR_TARGETED_ORNAMENT_PATCH`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

Production baseline evidence remains recorded in `production/manifest.json`; it is not a current full-design LOCK until the five ornament debts close.
