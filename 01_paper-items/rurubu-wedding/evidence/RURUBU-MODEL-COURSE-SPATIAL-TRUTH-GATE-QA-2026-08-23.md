# Rurubu WEDDING — Model Course Spatial Truth Gate QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## New professional research observation

This pass rotated to cartography / route-finding information design rather than reusing recent typography, photo, grid, folio or cover references.

Primary/high-quality sources reviewed:

- Geospatial Information Authority of Japan: maps intentionally select/omit features according to purpose and scale, and may generalize representation for legibility.
- National Park Service: visitor maps are general-reference/orientation/route-finding products and prioritize features needed for the visitor task.
- Ordnance Survey: cartographic design starts with the map user's required information and intended use; unnecessary information should be removed.

Rurubu-specific hypothesis:

> A model-course spread should not gain a route line or map merely because travel magazines often contain maps. If exact places, spatial relationships, route order, travel mode, distance or other geospatial authority are not verified, a decorative route can falsely imply real-world geography. Time/sequence/photo rhythm may remain the truthful navigation layer until spatial facts exist.

## Live authority re-read before write

Current V7 model-course root:
- `2316:2 / C6`
- current visible sequence: `09:00 海から始める / 12:30 甘いもの休憩 / 16:00 街を歩く / 19:00 食卓で締める`
- no verified venue names, coordinates, distances or turn-by-turn route are present in the current spread.

Current V8 model-course root:
- `2342:2 / AT3`
- current visible sequence: `10:00 海辺 / 11:40 カフェ / 15:10 街歩き / 18:30 食卓`
- no verified venue names, coordinates, distances or route geometry are present in the current spread.

No visible current Rurubu production/study node on page `2052:2` contains an actual map/route image. Existing `R_MAP_NOTE` layers are text labels/summary copy, not cartographic geometry.

## Drive asset audit

V7 authority folder: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x`.

Existing route/map-named files include:
- `1Mdo5oZF29VIH7ybc5lfLcOSkNzZ_cXI0 / v7_one_day_route_master.png`
- `1h4YCWgddoymmAl7tc2_PxmvrRyF7VxVp / v7_guide_map_master.png`
- `18-Fvl_5_IjIxqLi42Nu5R82nTvAIQg_l / v7_hawaii_route_map_master.png`

`v7_hawaii_route_map_master.png` was re-downloaded and visually inspected in this pass. It is a schematic graphic with an abstract land silhouette, a coral polyline and four circular stops. It contains no verified geographic source/scale/coordinates/place labels. It is therefore **not valid production geography** and must not be promoted merely because its filename says `route_map_master`.

V8 authority folder was also re-read: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`; five existing masters remain recorded. No new Drive asset was adopted or written.

## Bounded Figma authority write

No reader-facing visual was changed because the research showed that adding a map now would decrease source truth.

After re-reading both current roots immediately before mutation, only their semantic node names were updated:

- V7 C6 `2316:2` → appended `SPATIAL-TRUTH-GATED / NO-ROUTE-MAP-WITHOUT-VERIFIED-GEOGRAPHY`
- V8 AT3 `2342:2` → appended `SPATIAL-TRUTH-GATED / NO-ROUTE-MAP-WITHOUT-VERIFIED-GEOGRAPHY`

This is a production-authority marker, not visible microcopy. No text characters, fills, crops, dimensions, coordinates or child visibility changed.

## Post-write readback / QA

- C6 `2316:2`: visible, parent `2052:2`, geometry `1587.4×1123`, root position unchanged `x=3500 / y=13000`.
- AT3 `2342:2`: visible, parent `2052:2`, geometry `1587.4×1123`, root position unchanged `x=3600 / y=9850`.
- current V7+V8 root pairwise overlap count: `0`.
- visual properties changed: `0`.

The existing 500px screenshots were re-reviewed as part of the decision:
- V7 C6 already communicates sequence strongly through time + photo rhythm; adding the unverified schematic route would be redundant and misleading.
- V8 AT3 already communicates a restrained time scan; a fabricated route would undermine its book/editorial truth rather than improve orientation.

Because this pass intentionally made **no visual property change**, it does not claim a new visual three-scale promotion. Existing three-scale DESIGN QA for C6 and AT3 remains valid; the new gate is an authority/source-truth improvement.

## Decision

1. Do not place the existing schematic route/map masters into current V7/V8 merely to make the pages look more travel-like.
2. Route/map production becomes eligible only when the map can be built from verified spatial facts appropriate to its reader job.
3. If exact geography remains unavailable, keep time / sequence / photo evidence as the navigation layer rather than inventing spatial certainty.
4. If a future map is intentionally schematic rather than geographic, label its editorial function honestly and ensure it does not imply actual routing, distance or location accuracy.
5. V6 remains untouched.

## Truth state

- DESIGN QA: existing current C6/AT3 remains PASS for previously verified visual states.
- SPATIAL DATA / ROUTE AUTHORITY: BLOCKED / NOT VERIFIED.
- existing V7 route-map-named masters: STRUCTURAL / SCHEMATIC ONLY; not production geography.
- REAL CONTENT QA: still incomplete where photo/spatial facts are dummy or unverified.
- PRINT TEMPLATE/PREFLIGHT: NOT VERIFIED.
- PHYSICAL PROOF: NOT VERIFIED.
- new image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- native/factual reader-facing copy changes: `0`
- V6 changes: `0`
