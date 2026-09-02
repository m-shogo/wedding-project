# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / P01_TARGETED_POST_LOCK_PATCH_COMPLETE / 2026-09-02`

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

## P01 — TARGETED POST-LOCK PATCH COMPLETE

P01 CURRENT remains `3535:7`.

Preserve the already accepted improvements:
- clean standalone Hero + Feature proxies;
- Feature 1–3 opaque-paper fix;
- Feature 1–3 left-edge safety fix;
- top-left gold ring / diamond / yellow sparkle improvement;
- stale/duplicate LIVE cleanup;
- first micro-polish production binaries already synchronized to Git.

The three targeted owner-review issues are closed on CURRENT `3535:7`:

### 1. Date + PAGE 01 internal opacity

Targets:
- `P01_WEDDING_DATE_2026_10_24_SAT / FINAL_REWORK_COMPLETE_MODULE`
- `P01_PAGE_01 / FINAL_REWORK_COMPLETE_MODULE`

The source-alpha discriminator confirmed an asset-side defect. Both modules were replaced in place with opaque-paper RGBA assets; no rescue rectangles were added. Figma node opacity, image-paint opacity, and blend settings remain `1 / 1 / NORMAL`.

Because this was another same-family white-paper failure, one quick sibling sweep was run across:
- Date
- Feature 1
- Feature 2
- Feature 3
- Bottom Story
- PAGE 01

The one-time sibling sweep passed: Date, Feature 1, Feature 2, Feature 3, Bottom Story, and PAGE 01 all have opaque intended paper cores. Date and PAGE 01 were the only failed source assets and were repaired; the other four were preserved.

### 2. Feature 3 teaser copy

The old visible wording `家族と友達` is superseded.

Current approved exact P01 cover-teaser wording:

**`3 / 友達との思い出`**

`友達` alone is also not the approved final heading because it is too bare for the editorial teaser role.

This friends-only wording aligns with the locked P05 Friends Memories role without importing family semantics back into P01.

### 3. Airmail border depth / z-order

Target:
- `P01_AIRMAIL_BORDER / PRODUCTION_RGBA`

Required depth:

`background → airmail border → Hero/photos → authored display modules → major stickers/badges`

The border was moved from top-level index `22` to index `1`: background index `0` → border index `1` → Hero/photos index `2+` → authored modules index `9+` → major stickers/badges index `23+`.

## P01 targeted-patch evidence

- fresh Figma screenshot SHA-256: `dd39f877da701f43db58e6a22cf6836b886584ab139fba1e6f5a624f6a647f74`
- Date asset: `assets/rurubu-v30/p01/final-rework/V30_P01_DATE_MODULE_TARGETED_PATCH_OPAQUE_PAPER_RGBA.png` / Drive `16QnuF_oMMgBp8Qw0MvuyIY4DAqal10wX`
- PAGE 01 asset: `assets/rurubu-v30/p01/final-rework/V30_P01_PAGE_01_MODULE_TARGETED_PATCH_OPAQUE_PAPER_RGBA.png` / Drive `1y7qv2RvUI8dmjDmQdwnGl6zObbvLpOOd`
- Feature 3 asset: `assets/rurubu-v30/p01/final-rework/V30_P01_FEATURE_3_MODULE_TARGETED_PATCH_FRIENDS_COPY_RGBA.png` / Drive `1_mxdMD3rKPtKE0nhTpcuUU-FcX7DvGC4`
- QA folder: Drive `1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d`
- P02 `3535:9`: unchanged (`x=721`, `y=150`, `559×794`, hidden, opacity `1`, child count `0`, parent index `6`)

## Current P01 gates

- `FIGMA_STRUCTURE_READY = PASS`
- `CLEAN_PROXY_PASS = PASS`
- `FEATURE_ALPHA_FIX_PASS = PASS`
- `FEATURE_LEFT_EDGE_PASS = PASS`
- `RING_CLUSTER_PASS = PASS`
- `ALPHA_INTEGRITY_PASS = PASS`
- `COPY_SYNC_PASS = PASS`
- `BORDER_Z_ORDER_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_TARGETED_PATCH`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

P02 production may proceed. P01 still requires owner-photo replacement and final-photo QA before print readiness.

## Remaining P01 action

Replace only the four clean photo fills with final owner photos, then run final-photo and print-readiness QA. Do not change the accepted modules, masks, copy, alpha, or z-order.

## P02/P03

P02/P03 have direct Visual Master/page-polish authorities already. The P01 targeted patch no longer blocks P02.

## P04–P08

P04–P08 require direct image rereview before page-specific generation. Do not invent exact module lists from prose alone.

**CURRENT = V30. V20 = FROZEN HISTORY.**
