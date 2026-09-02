# V30 P01 production assets

Status: `P01_BEST_CURRENT / TARGETED_POST_LOCK_PATCH_OPEN / FINAL_PHOTO_QA_PENDING`

P01 CURRENT remains Figma node `3535:7`. Do not roll back to FIRST BUILD and do not create another P01 frame.

The large REWORK and first 2026-09-02 micro-polish remain the accepted baseline for:
- clean standalone Hero + Feature photo proxies;
- Feature 1–3 opaque-paper fix;
- Feature 1–3 left-edge safety;
- top-left gold rings + diamond + yellow sparkles;
- stale/duplicate LIVE cleanup;
- first micro-polish production binary sync.

## Latest owner review — TARGETED PATCH OPEN

### 1. Date + PAGE 01 internal opacity

Targets:
- `P01_WEDDING_DATE_2026_10_24_SAT / FINAL_REWORK_COMPLETE_MODULE`
- `P01_PAGE_01 / FINAL_REWORK_COMPLETE_MODULE`

Both still appear internally translucent.

Required:
- one quick source-alpha/composite discriminator;
- intended paper core alpha `>= 0.95`, preferably `1.00`;
- if asset-side, regenerate/re-cut immediately;
- no rescue white rectangle;
- after a failure, run one sibling sweep across Date / Feature 1–3 / Bottom Story / PAGE 01 before closing page alpha integrity.

### 2. Feature 3 teaser copy

Superseded/rejected:
- `家族と友達`
- bare `友達`

Current approved exact visible heading:

**`友達との思い出`**

This keeps the P01 teaser editorially descriptive while remaining friends-only and consistent with P05 Friends Memories.

### 3. Airmail border depth / z-order

Target:
- `P01_AIRMAIL_BORDER / PRODUCTION_RGBA`

Required layer depth:

`background → airmail border → Hero/photos → authored display modules → major stickers/badges`

The border frames the page. It must not read as a stronger foreground overlay cutting across content unless the Visual Master clearly requires a local overlap.

## Current gate state

- `BEST_CURRENT = YES`
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

P02 `3535:9` remains untouched and production is blocked until the three targeted issues above are resolved or explicitly deferred by the owner.

## Fast-fail rule

For cheap generated-asset defects:

`one quick discriminator → asset-side failureなら即 regenerate/re-cut → sibling sweep when same-family alpha failed → replace affected module only → one integrated final QA`

Do not burn context on repeated identical diagnosis.

## Next P01 work — CODEX ONLY

1. update CURRENT `3535:7` only;
2. preserve existing Feature opacity/edge fixes and ring improvement;
3. fix Date and PAGE 01 inside opacity if needed;
4. run the one-time P01 white-paper sibling sweep;
5. replace Feature 3 heading with exact `友達との思い出`;
6. move the airmail border behind main content / just above background;
7. remove superseded LIVE layers after replacement;
8. capture one fresh full-page + A5 screenshot set;
9. rerun `ALPHA_INTEGRITY → COPY_SYNC → BORDER_Z_ORDER → REFERENCE_DELTA` once;
10. commit/push any new production PNGs and verify remote paths;
11. only then restore `FIGMA_DESIGN_COMPLETE = YES` and allow P02.

Historical baseline/rejected/superseded assets belong in Drive/Git history, not active Figma LIVE.
