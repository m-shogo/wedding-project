# V30 P01 production assets

Status: `P01_BEST_CURRENT / TARGETED_POST_LOCK_PATCH_COMPLETE / FINAL_PHOTO_QA_PENDING`

P01 CURRENT remains Figma node `3535:7`. Do not roll back to FIRST BUILD and do not create another P01 frame.

The large REWORK and first 2026-09-02 micro-polish remain the accepted baseline for:
- clean standalone Hero + Feature photo proxies;
- Feature 1–3 opaque-paper fix;
- Feature 1–3 left-edge safety;
- top-left gold rings + diamond + yellow sparkles;
- stale/duplicate LIVE cleanup;
- first micro-polish production binary sync.

## Authority precedence

`assets/rurubu-v30/p01/polish-manifest.json` is the newer P01 execution/copy authority. Where the older P01 main manifest still contains stale execution wording, the newer polish manifest wins.

## Latest owner review — TARGETED PATCH COMPLETE

### 1. Date + PAGE 01 internal opacity

Targets:
- `P01_WEDDING_DATE_2026_10_24_SAT / FINAL_REWORK_COMPLETE_MODULE`
- `P01_PAGE_01 / FINAL_REWORK_COMPLETE_MODULE`

The source-alpha discriminator confirmed that both legacy source assets had transparent pixels inside intended paper cores. They were replaced in place with:

- `final-rework/V30_P01_DATE_MODULE_TARGETED_PATCH_OPAQUE_PAPER_RGBA.png`
- `final-rework/V30_P01_PAGE_01_MODULE_TARGETED_PATCH_OPAQUE_PAPER_RGBA.png`

Both repaired paper cores are `alpha=255` throughout the measured core ROI; outside transparency is retained. No Figma rescue rectangle was added. The sibling sweep passed Date / Feature 1 / Feature 2 / Feature 3 / Bottom Story / PAGE 01.

### 2. Feature 3 teaser copy

Superseded/rejected:
- `家族と友達`
- bare `友達`

Current approved exact visible heading:

**`3 / 友達との思い出`**

The active module is `final-rework/V30_P01_FEATURE_3_MODULE_TARGETED_PATCH_FRIENDS_COPY_RGBA.png`. Active superseded/rejected copy count is `0`.

This keeps the P01 teaser editorially descriptive while remaining friends-only and consistent with P05 Friends Memories.

### 3. Airmail border depth / z-order

Target:
- `P01_AIRMAIL_BORDER / PRODUCTION_RGBA`

Required layer depth:

`background → airmail border → Hero/photos → authored display modules → major stickers/badges`

The border now sits at top-level index `1`, immediately above the background at index `0` and below Hero/photos/modules/stickers.

## Targeted-patch production metadata

| Asset | SHA-256 | Figma node / image hash | Drive file ID |
|---|---|---|---|
| Date opaque paper | `c78224e8c68d966f0914c2708962410e6321daef8e39b5b7956ed497efb28c78` | `3681:111` / `3495ae9705fb650f3ce1e4d318baf12b8a1c88dd` | `16QnuF_oMMgBp8Qw0MvuyIY4DAqal10wX` |
| PAGE 01 opaque paper | `2ffc14ddc432502868e96ee2209f0d6be9e84f852097aae6c8238e3bdaa51a61` | `3681:117` / `5c7391135b17e8b8ed22b6e7303808d3fd8eb0d1` | `1y7qv2RvUI8dmjDmQdwnGl6zObbvLpOOd` |
| Feature 3 copy sync | `f3aa456e0260644ce0974b8f720851b0946968b3e952cfd54582eb1f0f4ab46f` | `3681:114` / `cd900ddf2020ce1f5bb47cee7d70a66b497dbd84` | `1_mxdMD3rKPtKE0nhTpcuUU-FcX7DvGC4` |

Fresh full-page screenshot SHA-256: `dd39f877da701f43db58e6a22cf6836b886584ab139fba1e6f5a624f6a647f74`. QA evidence is in Drive folder `1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d`.

## Current gate state

- `BEST_CURRENT = YES`
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

P02 `3535:9` remains untouched and may now proceed. P01 is not print-ready until final owner photos replace the four photo proxies and final-photo QA passes.

## Fast-fail rule

For cheap generated-asset defects:

`one quick discriminator → asset-side failureなら即 regenerate/re-cut → sibling sweep when same-family alpha failed → replace affected module only → one integrated final QA`

Do not burn context on repeated identical diagnosis.

## Remaining P01 work

Replace only the four clean photo fills with final owner photos, then run final-photo and print-readiness QA. Preserve all accepted modules and layer order.

Historical baseline/rejected/superseded assets belong in Drive/Git history, not active Figma LIVE.
