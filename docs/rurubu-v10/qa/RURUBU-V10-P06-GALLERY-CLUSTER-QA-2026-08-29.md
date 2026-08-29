# Rurubu WEDDING V10 — P06 Gallery Cluster QA — 2026-08-29

Status: `LIVE_FIGMA_VERIFIED / PRODUCTION_CANDIDATE / NOT_DESIGN_COMPLETE / NOT_PRINT_READY`

Scope: Rurubu V10 only. Production frame: P06 `2787:35` (`MEMORY SPOTS + GALLERY`). Closest editorial reference: `2771:3`.

## Canonical-first live state

- Live production page remains `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`) with the documented P01–P08 frame map unchanged.
- Drive authority parent and all organized folders `01_LOGO_TITLE` through `08_REFERENCE` were live-listed before this write.
- Canonical structural linter was executed before and after the correction.

## Largest reference-distance diagnosis

The P06 hierarchy and mixed image weights were already credible, but the fallback `BEST SHOT` circle was visually isolated in the right-side color field rather than behaving as part of the lower gallery discovery cluster. Adding decoration would not solve that relationship.

Structural correction in live Figma:

- existing fallback badge `2831:6`: moved from `x=415, y=536` to `x=246, y=520`;
- existing native badge text `2831:7`: moved from `x=430, y=571` to `x=261, y=555`;
- no new sticker, photo, generated copy, or factual content was added;
- the badge now bridges the hero/lower-gallery transition and lightly overlaps the lower-photo cluster instead of floating as an independent module.

Post-write reading path:

`1 思い出スポット → 2 destination hero / 01 → 3 portrait memory / 02 → 4 BEST SHOT + lower gallery / 03・04 → 5 写真から、ふたりの旅の記憶をめぐる。`

## Photo proxy verification

The selected hero semantic source remains:

- `REAL_PHOTO_COVER_HAWAII_PALMS_COUPLE_WIDE_02.jpg`
- Drive ID `1G-8t1JbX-GyqeMhuPLCPjsLKT_oue4Rb`
- Drive original inspected at `4500×3000` pixels.

Live Figma hero mask `2787:38` contains only a `220×147` derivative. The layer name was hardened to state this explicitly as `LOW_RES_LAYOUT_PROXY_ONLY / DRIVE ORIGINAL VERIFIED 4500x3000 / FINAL_PHOTO_QA_DEFERRED`.

A fresh role-sized `1800×1200` JPEG derivative was prepared from the verified Drive original. Figma's direct asset-upload action successfully issued a new single-use target URL for `2787:38`, but the byte POST again failed with `Could not resolve host: mcp.figma.com`. The existing fill was therefore left intact; no partial upload or broken production fill was created. Do not repeat the same byte-transport path without a material capability/environment change.

This is a replaceable people/scenery proxy, so its current low resolution does not invalidate the editorial layout pass. It remains explicitly non-final photography.

## Live linter after correction

- `PRODUCTION_CANDIDATE`: 8/8;
- fatal AI tells: `0/8`;
- canonical strong warnings: `0/8`;
- P06 dominance: `1.366`;
- P06 edge-shape count: `3`;
- P06 controlled rotated shapes: `8`;
- highest page-signature similarity: P02↔P06 `66%` (`INFORMATIONAL`);
- P05↔P07 `59%`, P01↔P02 `56%`, P01↔P06 `55%`;
- no pair reaches `REVIEW` (70–84%) or `HIGH_RISK` (>=85%).

## A5 actual-size preflight

Live targeted P06 check after the correction:

- visible native text nodes: `12`;
- text outside trim: `0`;
- critical 6 mm working-safe violations: `0`;
- missing fonts: `0`;
- visible text below 12 px is limited to spot numbers `01–04` at 11 px (~8.25 pt), a micro metadata role above the 7.5 pt floor;
- replaceable P06 photo masks: `4`, all `clipsContent=true`;
- no REFERENCE or DUMMY artwork was promoted.

Verified fixed graphics currently surviving in P06:

- `FRAME_GLOBAL_PHOTO_POLAROID_FLORAL_WHITE_01.png` — Drive `1-EgrkJMu5b0hvnPcUwgXG1UaN0V-YciS`; live derivative 500×625 at 151×188 Figma units, previously measured around 318 ppi for the fixed frame role;
- `ROUTE_GLOBAL_AIRPLANE_DOTTED_LOOP_TROPICAL_01.png` — Drive `1fJtfi-NJzWzbUhey83v_roqu_yvgmVeh`; live derivative 300×300 at 96×96 Figma units, around 300 ppi for its fixed route-cue role.

## Reference-match judgment

P06 remains a `CREDIBLE_REFINE` production candidate, approximately `82/100` on the canonical editorial score. The weakest categories remain useful editorial density and final publication texture. The largest remaining distance is not a need for more decoration: it is unavailable authoritative destination/memory micro-copy plus pending final title/badge transport and final photo replacement.

`CONTENT_COMPLETE != DESIGN_COMPLETE != PRINT_READY` remains in force.