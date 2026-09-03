# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / P02_DESIGN_LOCKED / 2026-09-03`

The only current Rurubu WEDDING production version is **V30**. V20 is frozen history/reference only. Do not create V31 unless explicitly requested.

## REQUIRED READ SET — every production run

1. this file
2. actual page Visual Master — `assets/rurubu-v30/pXX/PXX.png`
3. Root manifest — `assets/rurubu-v30/manifest.json`
4. V30 visual-polish override — `assets/rurubu-v30/visual-polish-manifest.json`
5. **Ornament art-direction authority — `assets/rurubu-v30/ornament-art-direction-manifest.json`**
6. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
7. page manifest
8. page polish manifest when present
9. page-specific ornament manifest when present
10. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
11. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
12. page README when production exists

For P02, also read `assets/rurubu-v30/p02/ornament-art-direction-manifest.json` before any new ornament generation or Figma replacement.

Newest explicit owner feedback wins.

### Current override precedence

`owner feedback → page-specific ornament/page-polish authority → global ornament-art-direction authority → visual-polish → TRUE-ALPHA policy → current Acceptance gate → older generic/root/page-main execution language`

Older rules that broadly rasterize fixed/stylized text, treat checkerboard as a transparency workflow, approve good standalone art without publication-family review, or make P01 the literal template for later pages are **SUPERSEDED**.

## Ownership — USER LOCKED

### ChatGPT
- feedback / Visual Master / current screenshot review
- Root/shared/page manifest improvement
- contradiction/stale-rule cleanup
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

## Systemic design architecture

### 1. Rurubu editorial DNA is the root

The hierarchy is:

`RURUBU_EDITORIAL_DNA → RURUBU_WEDDING_V30_ART_DIRECTION → PAGE_VISUAL_LANGUAGE → ORNAMENT_FAMILY → ASSET_INSTANCE`

P01 is a **global style calibration reference**, not the root authority and not a page template for P02+.

A high-quality standalone illustration can still fail if it does not function as Rurubu-style editorial material.

### 2. Plan globally, produce contextually

Do **not** generate every final icon upfront.

Use:

`global ornament-slot inventory → small family calibration anchors → shared components once → final page-specific variants in context → registry writeback`

This is intentional:
- pure page-by-page work causes style drift;
- generating every final icon upfront creates wrong-context assets, sunk-work carry-over and asset-pack behavior.

When P09+ is added, inventory its ornament jobs, map them to existing families, and create a new family only when the page role genuinely requires one.

Canonical system: `assets/rurubu-v30/ornament-art-direction-manifest.json`.

### 3. Asset role before render mode

Classify material elements as:
- `NATIVE_TEXT`
- `SHARED_COMMON_COMPONENT`
- `GENERATED_DISPLAY_ASSET`
- `PAGE_SPECIFIC_ORNAMENT`
- `PHOTO`

Stylized/fixed text is not automatically an image. Shared publication furniture is not a page-specific generated ornament.

### 4. Ornament review order

Before accepting generated ornament art, review in this order:

1. `RURUBU_EDITORIAL_DNA_PASS`
2. `V30_ART_DIRECTION_PASS`
3. `PAGE_ROLE_FIT_PASS`
4. `ORNAMENT_FAMILY_COHERENCE_PASS`
5. `ORNAMENT_OBJECT_QUALITY_PASS`
6. `REUSE_INTENT_PASS`
7. `TRUE_ALPHA_PREFLIGHT_PASS`

Do not approve a beautiful individual PNG if it already fails a higher-level editorial/art-direction gate.

### 5. Controlled mixed media

V30 does not require every ornament to use identical brushwork. Different ornament families may vary, but they must feel art-directed for one publication.

Reject both extremes:
- unrelated botanical-art / retro-poster / sticker-pack genres mixed without an editorial unifier;
- forcing every ornament into one identical style and losing Rurubu-like mixed-media energy.

### 6. True-alpha before Figma

For generated floating art:

`true-alpha generation/export → immediate alpha preflight → only PASS assets enter Figma`

If direct alpha is unavailable:

`single safe flat matte → one extraction → alpha preflight`

Visible checkerboard RGB is `GENERATION_ALPHA_FAIL`. Background extraction is fallback, not the default pipeline.

## P01 — DESIGN LOCKED

P01 CURRENT: `3535:7`.

- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

Remaining work is final owner-photo replacement + final-photo/print QA only. Do not copy P01's cover density or exact ornament set into later pages merely for consistency.

## P02 — DESIGN LOCKED AFTER ORNAMENT ART-DIRECTION REBUILD

P02 CURRENT: `3535:9`.

Preserve:
- SHOGO = left / blue
- SHIORI = right / pink
- Q1 has exactly one replaceable couple-photo inset
- Q2 has no photo slot
- three clean standalone photo proxies
- profile/Q paper opacity
- background-adjacent border
- unapproved personal copy native/separate
- P01 and P03–P08 untouched

Correct role classification:
- `ふたりの`, `プロフィール`, ribbon sentence, `SHOGO`, `SHIORI` = `NATIVE_TEXT`
- `PAGE 02` = `SHARED_COMMON_COMPONENT`
- travel/tropical/route/icon art = `PAGE_SPECIFIC_ORNAMENT`
- replaceable pictures = `PHOTO`

The five ornament targets were rebuilt after Phase A calibration:
- `P02_Q2_PLANE_AND_ROUTE`
- `P02_TOP_AIRPLANE_ROUTE`
- `P02_Q2_SUITCASE`
- `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER`
- `P02_TOP_LEFT_TROPICAL_CLUSTER`

The accepted family treatment uses compatible navy hand-drawn contours, bright simplified gouache blocks, restrained print texture, warm-white sticker keylines and light-to-medium editorial weight. Vehicle/route and tropical pairs are related but compositionally distinct; Q2 suitcase is a locally integrated travel-ephemera prop.

P02-specific authority: `assets/rurubu-v30/p02/ornament-art-direction-manifest.json`.

Current P02 gates:
- structure/copy/photo/material alpha/border = PASS preserved
- `RURUBU_EDITORIAL_DNA_PASS = PASS`
- `V30_ART_DIRECTION_PASS = PASS`
- `PAGE_ROLE_FIT_PASS = PASS`
- `ORNAMENT_FAMILY_COHERENCE_PASS = PASS`
- `ORNAMENT_OBJECT_QUALITY_PASS = PASS`
- `REUSE_INTENT_PASS = PASS`
- `TRUE_ALPHA_PREFLIGHT_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_TARGETED_ORNAMENT_ART_DIRECTION_REBUILD`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

P02 design is locked. Remaining work is final owner-photo replacement and final-photo/print QA.

## P03+

P03 has direct Visual Master/page-polish authority but production has not started.

P04–P08 still require direct image rereview before page-specific generation. Do not pre-generate their final ornament assets from prose alone; inventory/planning is allowed, final production waits for page context.

**CURRENT = V30. V20 = FROZEN HISTORY.**
