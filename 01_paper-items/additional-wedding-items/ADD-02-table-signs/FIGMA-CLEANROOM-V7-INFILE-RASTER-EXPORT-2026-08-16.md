# ADD-02 11卓の国別テーブルサイン — clean-room V7 in-file raster export study

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / V7_INFILE_RASTER_EXPORT_VERIFIED_LOCAL / HAWAII_COMPARE_ONLY / MALDIVES_COMPARE_ONLY / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Start main SHA: `4934eb7eddff8b1c9d2218a912f5b440115e06fa`.
Figma: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Why this run changed transport method

V6 proved on France that a single composed raster role can add useful material/editorial depth while native copy remains editable, but the adopted full-resolution France Drive master could not be placed through the external binary-upload path in this runtime. This run rechecked the Drive master (`1_upRvZXq4PE54UsvmeWz-Hqhb1fXVP8U`, PNG, 1,867,839 bytes) and attempted the official Figma `upload_assets` path once. The returned `mcp.figma.com` upload endpoint could not resolve from the available runtime network path. A bounded Figma-plugin probe also confirmed that global `fetch` is not available in `use_figma`, so direct Drive URL fetch is not a valid fallback.

Per the repeated transport-failure rule, the run did not keep retrying external upload. It switched to an in-file raster-composition method:

`temporary clean-room Figma artwork → exportAsync(PNG @ 1x) → figma.createImage(bytes) → one IMAGE fill → remove temporary source`

This keeps the final candidate structure simple while producing a true `1000×1480` raster inside the Figma file without external binary transport.

## Clean-room boundary

A new page was created before retained production was opened:

- `51:18 / CLEANROOM / ADD-02 / V7 RASTER EXPORT / 2026-08-16`
- `51:19 / V7 / PRE-COMPARISON / RASTER DEPTH TEST`

Only SPEC facts were used while authoring: `1000×1480`, destination order/identity, table number, native destination naming, native country-note placeholder, date, and destination-specific palette/motif guidance. No retained production/V3/V5/V6 node, asset, crop, badge, rail or image hash was copied into V7.

Representative clean-room roots:

- `51:20 / COMPARE_ONLY / V7 HAWAII FULL-RES RASTER / DEPTH UP, LEGACY HIERARCHY STILL STRONGER`
- `51:36 / COMPARE_ONLY / V7 MALDIVES FULL-RES RASTER / ATMOSPHERE UP, LEGACY HIERARCHY STILL STRONGER`

The retained production roots were opened only after V7 screenshot QA, structural readback, and long-copy stress were complete.

## Hybrid authoring split

Both V7 representatives use:

- one fixed full-canvas composed raster atmosphere role;
- table index, destination English/Japanese support, country-note placeholder, and date as native editable text;
- `TEXT / INFO STACK` as native auto-layout;
- variable/factual text baked into raster: `0`;
- root size: `1000×1480`;
- visible text outside root: `0`;
- IMAGE fill count: `1` per root.

Full-resolution raster roles produced in-file:

- Hawaii `51:28`, image hash `8383af980bd69a7892d5b445a126e3192da2bdfb`, exported PNG bytes `408,354`;
- Maldives `51:47`, image hash `809c3ff661fb3814091f329cf5defcfab3fd734b`, exported PNG bytes `715,185`.

The temporary vector/blur source frames were removed immediately after PNG export, so humans editing the candidate see one intentional fixed raster role plus native semantic text rather than dozens of decorative primitives.

## Screenshot and structure QA before retained comparison

Pre-comparison review was completed at:

- family/thumbnail scale: section `51:19`;
- reading scale: individual `1000 px` renders of `51:20` and `51:36`;
- actual-size/detail scale: native `1000×1480` renders of both roots.

Initial screenshot QA found two real issues and they were repaired before comparison:

1. default auto-layout fills made the note/date stack look like a web UI card → fills removed;
2. `MALDIVES` wrapped badly at the first type size/width → width/size rebalanced to a single readable line.

Hawaii was also changed from an oversized pale vertical strip to a lower editorial field so the raster atmosphere could carry the upper composition.

Post-repair structural readback:

- Hawaii: native text `5`, IMAGE `1`, outside visible text `0`;
- Maldives: native text `5`, IMAGE `1`, outside visible text `0`.

## Long-copy stress

Stress clones were created only from the new V7 roots:

- `52:2 / QA / LONG NOTE STRESS / ... HAWAII`
- `52:11 / QA / LONG NOTE STRESS / ... MALDIVES`

A realistic long Japanese editorial dummy was inserted into native `TEXT / COUNTRY NOTE` while preserving `textAutoResize=HEIGHT` and the native vertical `TEXT / INFO STACK`.

Readback:

- Hawaii stack bottom `1242 / 1480`, outside visible text `0`;
- Maldives stack bottom `1220 / 1480`, outside visible text `0`;
- both stress roots retain IMAGE `1`, native text `5`.

The verified stress clones were hidden after QA.

## Completion-only retained comparison

After the above work was closed, retained production was opened for the first time in this run:

- retained Hawaii `31:275`;
- retained Maldives `31:524`.

Result:

- **Hawaii:** V7 adds real continuous-tone depth and a stronger volcanic/ocean atmosphere, but retained production still has clearer long-distance hierarchy and more immediately legible table-sign balance. Keep V7 as compare-only evidence.
- **Maldives:** V7 adds convincing lagoon-depth continuity and is less flat than a vector-only field, but retained production still has stronger title/table-number hierarchy at distance. Keep V7 as compare-only evidence.

Neither V7 representative is promoted to production. Retained production and all earlier clean-room versions remain unchanged.

## What was actually verified

`VERIFIED_LOCAL` is the **in-file raster export capability**, not the visual promotion of Hawaii or Maldives:

> when external binary transport is unavailable, a clean-room fixed atmosphere can be composed temporarily inside Figma, rendered with `exportAsync` to a full-size PNG, converted to one image fill, and the temporary micro-geometry removed. Native semantic copy remains independently editable.

This removes the transport/resolution blocker for procedural composed raster fields.

The visual limitation is now clearer: additional abstract atmosphere alone is not sufficient to beat strong retained destination-specific hierarchy. Do not repeat more color-field/blur-only V8s. The next visual method should use materially richer non-person destination-semantic detail (architecture, landscape, material, photographic/illustrative detail) with verified rights/provenance and native text overlays.

## Current declaration

`SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V5_11_SIGN_STRUCTURAL_PASS / V6_FRANCE_RASTER_DEPTH_VERIFIED_LOCAL / V7_INFILE_FULL_RES_RASTER_TRANSPORT_VERIFIED_LOCAL / HAWAII_COMPARE_ONLY / MALDIVES_COMPARE_ONLY / ABSTRACT_RASTER_ATMOSPHERE_NOT_SUFFICIENT_FOR_PROMOTION / LEGACY_PRESERVED / NOT_PRINT_READY`
