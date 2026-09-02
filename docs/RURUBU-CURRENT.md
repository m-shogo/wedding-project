# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / P02_ORNAMENT_QUALITY_REOPENED / 2026-09-02`

The only current Rurubu WEDDING production version is **V30**.

## REQUIRED READ SET — every production run

1. this file
2. actual page Visual Master — `assets/rurubu-v30/pXX/PXX.png`
3. Root manifest — `assets/rurubu-v30/manifest.json`
4. V30 visual-polish override — `assets/rurubu-v30/visual-polish-manifest.json`
5. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
6. page manifest
7. page polish manifest when present
8. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
9. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
10. page README when production exists

Newest explicit owner feedback can reopen an older PASS.

### Current override precedence

Some older generic/root/page-main language predates the 2026-09-02 corrections. For current execution:

`owner feedback → page polish → visual-polish → TRUE-ALPHA policy → current Acceptance gate → older generic/root/page-main execution language`

Therefore any older rule that broadly treats fixed/stylized text as a generated/bundled image candidate, or treats checkerboard-looking output as an acceptable transparency workflow, is **SUPERSEDED** by the current role-classification and true-alpha rules.

## Ownership — USER LOCKED

### ChatGPT
- feedback / Visual Master / current-screenshot review
- Root/shared/page manifest updates
- contradiction and stale-rule cleanup
- Codex handoff
- post-build review

### Codex
- production ImageGen
- alpha/cutout preparation
- Figma writes/cleanup
- clean proxy placement
- screenshots/exports
- Drive/Git production evidence

## Git / Figma authority

Branch: `rurubu/v30-final-production-20260901`

PR: `#878`

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

Page: `V30_FINAL_PRODUCTION`

Frames:
- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

TEMP `3708:2` is deleted. Do not create alternate/TEMP production pages unless explicitly approved.

## Locked project facts / page roles

- A5 portrait / 8 pages
- trim `148 × 210 mm`
- bleed `3 mm`
- wedding date `2026.10.24`
- names `Shogo` / `Shiori`
- P08 barcode `2026102400000`

Roles:
- P01 Cover / `るるぶ WEDDING`
- P02 Profile + Q1/Q2
- P03 Our Story + Q3/Q4
- P04 All Travel Memories / Our Journey
- P05 Friends Memories only
- P06 Real Life / Favorites / Best Shots + Q5/Q6
- P07 Closing Message / Thank You
- P08 Magazine Back Cover

V20 = frozen history/reference only. Do not create V31 unless explicitly requested.

## Systemic rules that matter now

### 1. Asset role before render mode

Every major visible element must first be classified as:

- `NATIVE_TEXT`
- `SHARED_COMMON_COMPONENT`
- `GENERATED_DISPLAY_ASSET`
- `PAGE_SPECIFIC_ORNAMENT`
- `PHOTO`

Stylized/fixed text is **not automatically an image asset**.

Cross-page common furniture is **not a page-specific generated asset**.

### 2. Shared common components

Recurring publication furniture such as the PAGE badge family must remain one coherent P01-P08 system unless owner/Visual Master explicitly requires a page-specific exception.

### 3. Ornament originality / carry-over

Travel/tropical/icon/route ornaments must be judged for:

- current visual quality;
- local context fit;
- stock/clipart feel;
- same-page duplication/reuse feel;
- coherence with surrounding title/photo/paper modules.

`REQUALIFIED_CARRYOVER` is not a PASS merely because an old asset is technically clean or already exists.

Do not use the same or near-identical prominent airplane/route/suitcase/tropical cluster in multiple positions unless repetition is clearly intentional.

### 4. True-alpha generation before Figma

For every generated ornament/display asset that needs transparent surroundings:

- prefer a generation/export path with a real alpha channel;
- a visible checkerboard is never transparency and must never be requested/accepted as such;
- immediately inspect actual alpha after generation, before Figma placement;
- no meaningful alpha / baked checkerboard / opaque outside field = `GENERATION_ALPHA_FAIL`;
- only `TRUE_ALPHA_PREFLIGHT_PASS` assets may be placed in Figma;
- if direct alpha is unavailable, use one flat safe matte for extraction, never checkerboard;
- background extraction is a fallback, not the default pipeline;
- if extraction damages white/light art, thin routes, edges or internal details, regenerate instead of patching repeatedly.

Canonical detail: `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`.

### 5. Clean proxy / material alpha / border

- page-master crops/screenshots are prohibited as active photo fills;
- `TRUE ALPHA ≠ CORRECT ALPHA`;
- opaque paper/ticket/label/vessel interiors normally remain alpha `>= 0.95`, preferably `1.00`;
- if one same-family white-paper module fails inside-opacity QA, run one quick sibling sweep;
- border/frame is background-adjacent by default;
- cheap asset-side failure -> one quick discriminator -> regenerate/re-cut -> one integrated final QA.

### 6. Fast close

For a bounded correction, do not restart a full-page certification cycle. Fix the reopened scope, run one integrated final QA, sync once, then STOP.

## P01 — DESIGN LOCKED

P01 CURRENT: `3535:7`.

- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

Remaining P01 work is only final owner-photo replacement + final-photo/print QA. Do not change accepted modules/masks/copy/alpha/z-order without new owner feedback.

## P02 — STRUCTURE/COPY/PHOTO PASS, ORNAMENT QUALITY REOPENED

P02 CURRENT: `3535:9`.

Preserve:
- SHOGO = left / blue;
- SHIORI = right / pink;
- Q1 has exactly one replaceable couple-photo inset;
- Q2 has no photo slot;
- all three photo roles use clean standalone proxies;
- profile/Q paper opacity is correct;
- border is background-adjacent;
- unapproved personal copy remains native/separate;
- P01 and P03-P08 untouched.

Owner-corrected role classification:
- `ふたりの` = `NATIVE_TEXT`
- `プロフィール` = `NATIVE_TEXT`
- `私たちのこと、少しだけ紹介します♪` = `NATIVE_TEXT`
- `SHOGO` = `NATIVE_TEXT`
- `SHIORI` = `NATIVE_TEXT`
- `PAGE 02` = `SHARED_COMMON_COMPONENT` aligned to P01-P08 PAGE badge family
- travel/tropical/route/icon art = `PAGE_SPECIFIC_ORNAMENT`
- three replaceable pictures = `PHOTO`

Reopened ornament targets — `REWORK_REQUIRED`:
- `P02_Q2_PLANE_AND_ROUTE`
- `P02_TOP_AIRPLANE_ROUTE`
- `P02_Q2_SUITCASE`
- `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`
- `P02_TOP_LEFT_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`

Reason: generic/stock icon feel and visible carry-over/reuse quality. Moving/resizing the existing assets is not a sufficient fix.

Current P02 gates:
- `FIGMA_STRUCTURE_READY = PASS_PRESERVED`
- `CLEAN_PROXY_PASS = PASS_PRESERVED`
- `ALPHA_INTEGRITY_PASS = PASS_PRESERVED`
- `COPY_SAFETY_PASS = PASS_PRESERVED`
- `ASSET_ROLE_CLASSIFICATION_PASS = PASS_AFTER_OWNER_CORRECTION`
- `SHARED_COMPONENT_PASS = PASS_WITH_PAGE_BADGE_RULE_CORRECTED`
- `TRUE_ALPHA_GENERATION_POLICY = REQUIRED_FOR_REPLACEMENT_ORNAMENTS`
- `ORNAMENT_ORIGINALITY_PASS = REOPENED`
- `VISUAL_CARRYOVER_PASS = REOPENED_FOR_FIVE_ORNAMENTS`
- `REFERENCE_DELTA_PASS = REOPENED_FOR_TARGETED_ORNAMENT_PATCH`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

Do not start P03 production until the P02 ornament patch closes or the owner explicitly defers it.

## P03+

P03 has direct Visual Master/page-polish authority but production has not started.

P04-P08 still require direct image rereview before page-specific generation.

**CURRENT = V30. V20 = FROZEN HISTORY.**