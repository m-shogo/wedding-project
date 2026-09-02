# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / POST-BUILD_VISUAL_QA / 2026-09-02`

Purpose: prevent a technically clean/editable rebuild from being called complete when it is visually weaker, contaminated, unintentionally translucent, stale in copy, clipped, or layered at the wrong depth.

Hard summaries:

`CLEAN LAYER TREE ≠ VISUALLY FRESH PAGE`

`TRUE ALPHA ≠ CORRECT ALPHA`

`VISUAL MASTER CROP ≠ CLEAN PHOTO PROXY`

`EDITABLE ≠ BETTER DESIGN`

`CHEAP ASSET FAILURE ≠ LONG DIAGNOSIS`

`OLD GENERATED COPY ≠ CURRENT OWNER COPY`

`BORDER ≠ FOREGROUND CONTENT`

## Execution ownership

- ChatGPT: feedback analysis, Visual Master/current screenshot review, manifest/doc authority updates, contradiction cleanup, Codex handoff, post-build review.
- Codex: production ImageGen, alpha/cutout preparation, Figma writes/cleanup, proxy installation, screenshots/exports, Drive/Git production evidence.

## Mandatory read set

1. `docs/RURUBU-CURRENT.md`
2. actual page Visual Master
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. page manifest
6. page polish manifest when present
7. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. this document
9. page README when production exists

Newest explicit owner feedback can reopen an older PASS.

## Completion vocabulary — HARD

Use explicit gates:
- `FIGMA_STRUCTURE_READY`
- `CLEAN_PROXY_PASS`
- `BUNDLED_DISPLAY_MODULE_PASS`
- `ALPHA_INTEGRITY_PASS`
- `COPY_SYNC_PASS`
- `EDGE_SAFETY_PASS`
- `BORDER_Z_ORDER_PASS`
- `IDENTITY_ANCHOR_PASS`
- `VISUAL_CARRYOVER_PASS`
- `REFERENCE_DELTA_PASS`
- `PHOTO_SWAP_PASS`
- `A5_PRINT_QA_PASS`
- `HUMAN_FEEDBACK_REVIEWED`
- `FIGMA_DESIGN_COMPLETE`
- `FINAL_PHOTO_QA_PENDING` / `FINAL_PHOTO_QA_PASS`
- `COMPLETE`

## Clean photo-proxy policy — HARD

Visual Master is comparison authority, not photo-slot source material.

Never use page-master crops or page screenshots as active photo fills, and never use proxies containing page border/title/badge/ticket/stamp/Q shell/flower/route/frame/background decoration.

Allowed:
1. suitable user real photo;
2. clean standalone representative photo;
3. clean generated standalone photo proxy with no page-layout decoration.

## Bundled fixed display-module policy — HARD

When short fixed text/numbers visually behave as one authored editorial object with their vessel/background/icon/accents, generate/prepare the complete visible module as one production asset.

Visible fixed text does not need to remain editable in Figma. Replaceable photos and long/TBD/personal/frequently changing copy stay separate.

## Alpha Integrity Gate — HARD

An RGBA file can have a valid alpha channel and still be visually wrong.

Verify separately:

### Outside transparency
- intended external region transparent;
- no baked checkerboard, key-color halo, opaque rectangle, fringe or debris.

### Intended interior opacity
- opaque paper/ticket/label/vessel/badge/card areas remain opaque;
- interior alpha normally `>= 0.95`, preferably `1.00`;
- large translucent interiors require explicit Visual Master/page-authority evidence.

Reject outer-transparency PASS when intended white/cream interiors are semi-transparent.

Do not hide broken alpha with rescue rectangles or Figma opacity tricks. Repair/regenerate the affected source/cutout.

### Sibling sweep rule — HARD

If one same-family white-paper/ticket/label/vessel module fails inside-opacity QA, do not stop at that one module.

Run one quick sibling sweep across the page's other same-family modules before closing `ALPHA_INTEGRITY_PASS`.

For P01 the sweep set is:
- Date ticket;
- Feature 1 shell;
- Feature 2 shell;
- Feature 3 shell;
- Bottom Story vessel;
- PAGE 01 badge.

This is one sweep, not repeated context-heavy diagnosis.

## Fast-fail regeneration rule — HARD

For a cheap likely asset-side defect:

1. run **one quick discriminator**;
2. if source/RGBA/cutout is wrong, **regenerate/re-cut immediately**;
3. when one same-family paper module fails, run one sibling sweep;
4. inspect Figma opacity/blend/mask only when source passes;
5. replace only the affected module and delete superseded LIVE content;
6. run one integrated final QA pass.

If diagnosis/context cost is likely to exceed regeneration/cutout cost, prefer regeneration/cutout.

Do not burn time/context on repeated midpoint screenshots, identical alpha diagnosis, long status updates or manual patching of clearly broken generated art.

Normally report once at the end: **cause → replacement → QA result → remaining debt**.

## Copy Sync Gate — HARD

Newest owner-approved visible wording overrides stale generated/native copy.

When page role, teaser wording, section naming, or other visible owner-approved text changes:
- update every dependent module on that page;
- mark previous generated wording `SUPERSEDED`;
- update page authority/README;
- verify final screenshot uses one coherent terminology set.

Hard reject:
- old wording surviving because an earlier generated asset already exists;
- mixed old/new terminology on one page;
- page-role semantics contradicting the owner's latest decision.

## Edge Safety Gate — HARD

Busy edge activation is allowed, but important labels/badges/text must not look accidentally clipped by trim/border.

Review at full page and A5 size. Preserve intentional irregularity; do not mechanically equalize unrelated modules.

## Border Z-Order Gate — HARD

Page border/frame assets are background-adjacent support assets by default.

Unless the Visual Master clearly requires otherwise, use this depth order:

`background field → border/frame → Hero/photos → authored display modules → major stickers/badges/foreground accents`

Hard reject:
- border sitting above major editorial content by default;
- frame visually slicing through photos/cards/text without clear Visual Master basis;
- solving z-order by flattening unrelated content instead of moving the border.

## Identity Anchor Gate

Compare high-identity objects by silhouette, letterform character, stroke/outline, depth/shadow, color proportions, relative scale and relation to neighboring art. Text correctness alone is not a visual pass.

## Anti-UI / editorial irregularity

Related editorial modules do not automatically become identical components. Preserve authored differences in size, padding, icon placement, local x/y, overlap and tilt. Do not add random scrapbook rotation.

## Visual Carry-over Audit — HARD

A clean Figma tree can still contain stale visual language. Existing visible assets have no permanent grandfathered PASS.

Use:
- `UNREVIEWED_CARRYOVER`
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

After a major anchor/module improves, reopen nearby support assets.

## Reference Delta Gate

Use the current screenshot, not layer names or prior reports.

Compare:
1. 3-second impression
2. clean proxy integrity
3. fixed display-module fidelity
4. alpha/material integrity
5. copy sync
6. edge safety
7. border depth / z-order
8. identity anchors
9. high-saliency photo mass
10. title/photo ratio
11. occupied vs calm areas
12. asymmetric silhouette
13. overlap/module rhythm
14. background/frame character
15. carry-over coherence
16. micro accents

## Human Feedback Writeback — HARD

New repeatable failures must be modeled before scaling production. Page-specific feedback goes to page authority; systemic failures go to Root/visual-polish/this guide.

## P01 current calibration — TARGETED POST-LOCK PATCH OPEN 2026-09-02

P01 CURRENT remains `3535:7`.

Keep the already accepted baseline:
- clean standalone Hero/Feature proxies;
- Feature 1–3 opaque-paper correction;
- Feature 1–3 safer left-edge spacing;
- top-left gold wedding rings + diamond + yellow sparkles;
- stale LIVE cleanup;
- first micro-polish binary sync.

Latest owner review reopens three targeted issues:

### Date + PAGE 01 inside opacity

Targets:
- `P01_WEDDING_DATE_2026_10_24_SAT / FINAL_REWORK_COMPLETE_MODULE`
- `P01_PAGE_01 / FINAL_REWORK_COMPLETE_MODULE`

Both appear internally translucent. Use one quick source-alpha/composite discriminator; if asset-side, regenerate/re-cut immediately. Then run the single P01 white-paper sibling sweep before closing page alpha integrity.

### Feature 3 teaser copy

Superseded/rejected:
- `家族と友達`
- bare `友達`

Approved exact heading:

**`友達との思い出`**

This preserves friends-only meaning while remaining an editorial teaser rather than a bare category word.

### Airmail border depth

Target:
- `P01_AIRMAIL_BORDER / PRODUCTION_RGBA`

Required depth:

`background → airmail border → Hero/photos → authored display modules → major stickers/badges`

The frame should support the page edge, not cover the content.

Current P01 status:

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

P02 production must wait until the targeted patch closes or the owner explicitly defers it.

## Print boundary

Before final print acceptance verify:
- trim `148 × 210 mm`;
- 3 mm bleed where required;
- critical faces/text safe;
- generated display text readable at actual size;
- final-photo effective raster resolution around 300 ppi where practical;
- current export evidence;
- grayscale/thumbnail review.

Technical print readiness never overrides visual acceptance.
