# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / POST-BUILD_VISUAL_QA / 2026-09-02`

Purpose: prevent a technically clean/editable rebuild from being called complete when it is visually weaker, contaminated, unintentionally translucent, clipped, or mixed with stale production language.

Hard summaries:

`CLEAN LAYER TREE ≠ VISUALLY FRESH PAGE`

`TRUE ALPHA ≠ CORRECT ALPHA`

`VISUAL MASTER CROP ≠ CLEAN PHOTO PROXY`

`EDITABLE ≠ BETTER DESIGN`

`CHEAP ASSET FAILURE ≠ LONG DIAGNOSIS`

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
- `EDGE_SAFETY_PASS`
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

## Fast-fail regeneration rule — HARD

For a cheap likely asset-side defect:

1. run **one quick discriminator**;
2. if source/RGBA/cutout is wrong, **regenerate/re-cut immediately**;
3. inspect Figma opacity/blend/mask only when source passes;
4. replace only the affected module and delete superseded LIVE content;
5. run one integrated final QA pass.

If diagnosis/context cost is likely to exceed regeneration/cutout cost, prefer regeneration/cutout.

Do not burn time/context on repeated midpoint screenshots, identical alpha diagnosis, long status updates or manual patching of clearly broken generated art.

Normally report once at the end: **cause → replacement → QA result → remaining debt**.

## Edge Safety Gate — HARD

Busy edge activation is allowed, but important labels/badges/text must not look accidentally clipped by trim/border.

Review at full page and A5 size. Preserve intentional irregularity; do not mechanically equalize unrelated modules.

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
5. edge safety
6. identity anchors
7. high-saliency photo mass
8. title/photo ratio
9. occupied vs calm areas
10. asymmetric silhouette
11. overlap/module rhythm
12. background/frame character
13. carry-over coherence
14. micro accents

## Human Feedback Writeback — HARD

New repeatable failures must be modeled before scaling production. Page-specific feedback goes to page authority; systemic failures go to Root/visual-polish/this guide.

## P01 current calibration — DESIGN LOCKED 2026-09-02

P01 CURRENT remains `3535:7`.

Major REWORK and the later micro-polish are accepted.

The micro-polish closed these reopened gates:

### Feature 1–3 label/vessel opacity — PASS
- source-PNG internal alpha was identified as the cause;
- affected Feature RGBA modules were repaired/replaced;
- reported paper-core alpha samples are `255`;
- outside transparency remains available;
- Figma node/image opacity remains `1.0`;
- fresh CURRENT screenshot no longer shows Hero/background through intended white Feature vessels.

### Feature 1–3 left-edge safety — PASS
- modules were tuned inward;
- accepted module x positions are `21 / 23 / 22`;
- their unequal editorial rhythm was preserved;
- fresh screenshot no longer reads badges/headings as accidentally clipped by the airmail border.

### Top-left ring cluster fidelity — PASS
- support cue now reads as gold wedding rings + visible diamond + yellow sparkles;
- accepted node `3681:137` is at `27,40,92×76`;
- it remains subordinate to masthead/WEDDING hierarchy.

Fresh direct screenshot review also shows no material regression to Hero, names, 2026, Date, Bottom Story, OUR JOURNEY, PAGE 01 or overall page hierarchy.

Current P01 status:

- `FIGMA_STRUCTURE_READY = PASS`
- `CLEAN_PROXY_PASS = PASS`
- `BUNDLED_DISPLAY_MODULE_PASS = PASS`
- `MICRO_POLISH_DEBT = CLOSED`
- `INTERNAL_OPACITY_PASS = YES`
- `ALPHA_INTEGRITY_PASS = PASS`
- `EDGE_SAFETY_PASS = PASS`
- `RING_CLUSTER_PASS = YES`
- `IDENTITY_ANCHOR_PASS = PASS`
- `VISUAL_CARRYOVER_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_MICRO_POLISH`
- `PHOTO_SWAP_PASS = PASS`
- `A5_GRAYSCALE_PASS = PASS`
- `HUMAN_FEEDBACK_REVIEWED = PASS`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

**P02 production may begin.**

Evidence: fresh CURRENT screenshot SHA-256 `f83e608d943fb15131042edb43d59a503b171ca427902428e140789b134989a3`; QA Drive folder `1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d`; hidden obsolete / duplicate same-job layers `0 / 0`; P02 `3535:9` unchanged.

P01 should not be reopened merely because final owner photos are pending. Final photos require only photo replacement plus crop/face-safe/effective-resolution/A5/print QA unless a new material visual defect appears.

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
