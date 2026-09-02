# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / P01_TARGETED_POST_LOCK_PATCH_OPEN / 2026-09-02`

The only current Rurubu WEDDING production version is **V30**.

## REQUIRED READ SET — every production run

1. this file
2. actual page Visual Master — `assets/rurubu-v30/pXX/PXX.png`
3. Root manifest — `assets/rurubu-v30/manifest.json`
4. V30 visual-polish override — `assets/rurubu-v30/visual-polish-manifest.json`
5. page manifest
6. page polish manifest when present
7. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
9. page README when production exists

Newest explicit owner feedback can reopen an older PASS.

## Current work ownership — USER LOCKED

### ChatGPT
- feedback analysis
- actual Visual Master/current screenshot review
- Root/shared/page manifest updates
- contradiction cleanup
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

TEMP `3708:2` was deleted. Real P02 `3535:9` must not be repurposed by P01 cleanup.

## Locked facts / roles

- A5 portrait / 8 pages
- trim `148 × 210 mm`
- bleed `3 mm`
- wedding date `2026.10.24`
- names `Shogo` / `Shiori`
- P08 barcode digits exactly `2026102400000`

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

## Systemic production rules

- fixed short authored display modules may be bundled with their vessel/icon/decor; editable native text is not inherently better;
- page-master crops/screenshots are prohibited as active photo fills;
- `TRUE ALPHA ≠ CORRECT ALPHA`: verify outside transparency and inside opacity separately;
- if one same-family white-paper module fails inside-opacity QA, run one quick sibling sweep before closing page alpha integrity;
- opaque paper/ticket/label/vessel interiors normally remain alpha `>= 0.95`, preferably `1.00`;
- newest owner-approved copy must propagate to dependent teaser/index/cover modules; stale generated copy has no grandfathered PASS;
- page borders/frames are background-adjacent by default: above background, below Hero/photos/display modules/stickers unless Visual Master explicitly requires foreground overlap;
- use fast-fail regeneration: one quick discriminator, then regenerate/re-cut cheap asset-side defects instead of prolonged diagnosis;
- important labels/badges/text must not read as accidentally clipped by border/trim;
- keep Figma LIVE current-only; history belongs in Git/Drive evidence.

## P01 — TARGETED POST-LOCK PATCH OPEN

P01 CURRENT remains `3535:7`.

Preserve the already accepted improvements:
- clean standalone Hero + Feature proxies;
- Feature 1–3 opaque-paper fix;
- Feature 1–3 left-edge safety fix;
- top-left gold ring / diamond / yellow sparkle improvement;
- stale/duplicate LIVE cleanup;
- first micro-polish production binaries already synchronized to Git.

Latest owner review reopened **three targeted issues**:

### 1. Date + PAGE 01 internal opacity

Targets:
- `P01_WEDDING_DATE_2026_10_24_SAT / FINAL_REWORK_COMPLETE_MODULE`
- `P01_PAGE_01 / FINAL_REWORK_COMPLETE_MODULE`

Both appear internally translucent. Use one quick source-alpha/composite discriminator; if asset-side, regenerate/re-cut immediately. Do not hide the defect with rescue rectangles.

Because this is another same-family white-paper failure, perform one quick sibling sweep across:
- Date
- Feature 1
- Feature 2
- Feature 3
- Bottom Story
- PAGE 01

before closing `ALPHA_INTEGRITY_PASS`.

### 2. Feature 3 teaser copy

The old visible wording `家族と友達` is superseded.

Current approved exact P01 cover-teaser wording:

**`友達との思い出`**

`友達` alone is also not the approved final heading because it is too bare for the editorial teaser role.

This friends-only wording aligns with the locked P05 Friends Memories role without importing family semantics back into P01.

### 3. Airmail border depth / z-order

Target:
- `P01_AIRMAIL_BORDER / PRODUCTION_RGBA`

Required depth:

`background → airmail border → Hero/photos → authored display modules → major stickers/badges`

The border should frame the page, not sit as a strong foreground overlay over editorial content.

## Current P01 gates

- `FIGMA_STRUCTURE_READY = PASS`
- `CLEAN_PROXY_PASS = PASS`
- `FEATURE_ALPHA_FIX_PASS = PASS`
- `FEATURE_LEFT_EDGE_PASS = PASS`
- `RING_CLUSTER_PASS = PASS`
- `ALPHA_INTEGRITY_PASS = REOPENED_FOR_DATE_AND_PAGE01_PLUS_SIBLING_SWEEP`
- `COPY_SYNC_PASS = REOPENED_FOR_FEATURE_3`
- `BORDER_Z_ORDER_PASS = REOPENED_FOR_AIRMAIL_BORDER`
- `REFERENCE_DELTA_PASS = REOPENED_FOR_TARGETED_PATCH`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

P02 production is blocked until these targeted issues are resolved or explicitly deferred by the owner.

## Next P01 action — CODEX ONLY

1. update CURRENT `3535:7` only;
2. preserve Feature 1–3 opacity/edge fixes and ring improvement;
3. check Date and PAGE 01 inside opacity once and regenerate/re-cut immediately if asset-side;
4. run one white-paper sibling sweep before closing alpha integrity;
5. replace Feature 3 visible heading with exact `3 / 友達との思い出`;
6. move the airmail border to background-adjacent depth;
7. delete superseded LIVE modules/layers after replacement;
8. capture one fresh full-page + A5 final evidence set;
9. run `ALPHA_INTEGRITY → COPY_SYNC → BORDER_Z_ORDER → REFERENCE_DELTA` once after fixes;
10. commit/push any newly generated production binaries and verify remote paths;
11. do not touch P02 `3535:9`.

## P02/P03

P02/P03 have direct Visual Master/page-polish authorities already. P02 must wait until the P01 targeted patch above closes.

## P04–P08

P04–P08 require direct image rereview before page-specific generation. Do not invent exact module lists from prose alone.

**CURRENT = V30. V20 = FROZEN HISTORY.**
