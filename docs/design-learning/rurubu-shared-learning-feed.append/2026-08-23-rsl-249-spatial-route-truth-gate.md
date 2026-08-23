# RSL-249 — Route/map graphics must not simulate unverified geography

Source scope/item: Rurubu WEDDING / V7 C6 + V8 AT3 model-course roles
Date: 2026-08-23

State: `TESTED_LOCAL (AUTHORITY + LIVE AUDIT) → CROSS-ITEM-CANDIDATE-NOT-YET`

Fingerprint: `F-RSL-249-SCHEMATIC-ROUTE-GRAPHIC-SIMULATES-VERIFIED-GEOGRAPHY-WITHOUT-SPATIAL-AUTHORITY`

## Visible / production problem

Travel publications naturally invite maps and route graphics. The V7 Drive authority contains files named `v7_one_day_route_master.png`, `v7_guide_map_master.png`, and `v7_hawaii_route_map_master.png`, which could be mistaken for ready-to-place production assets simply because their filenames sound authoritative.

Meanwhile, current model-course spreads C6 `2316:2` and AT3 `2342:2` contain time/action sequence but no verified venue names, coordinates, distances, travel modes or route geometry.

## Root-cause hypothesis

A schematic route line can look more informative than it really is. In a travel publication, readers may interpret a land silhouette + route + stops as documentary spatial guidance even when the geometry is invented. That is an information-truth defect, not merely a style issue.

## New professional evidence

This pass deliberately rotated research to cartography / orientation design.

- Geospatial Information Authority of Japan states that maps omit/select features and adjust expression according to purpose and scale for legibility.
- National Park Service frames visitor maps as general-reference, orientation and route-finding products and prioritizes features according to visitor task.
- Ordnance Survey's cartographic design principles start with what information the user requires and how the map will be used; unnecessary elements should be removed.

Decision principle extracted: **map form follows a verified orientation/route-finding job; visual map-ness is not itself useful information.**

## Bounded local test

1. Re-read current C6 and AT3 live content.
2. Re-read V7/V8 Drive authority folders.
3. Download and visually inspect Drive `18-Fvl_5_IjIxqLi42Nu5R82nTvAIQg_l / v7_hawaii_route_map_master.png`.
4. Confirm it is an abstract schematic: non-authoritative land silhouette + coral route + four nodes, with no verified source/scale/coordinates/place labels.
5. Audit current study page `2052:2` for map/route nodes; no current V7/V8 role is visibly using an actual route-map asset.
6. Do **not** add the schematic asset merely to increase travel-magazine appearance.
7. Mark current C6 and AT3 root names with `SPATIAL-TRUTH-GATED / NO-ROUTE-MAP-WITHOUT-VERIFIED-GEOGRAPHY` so the stop condition is visible to future production work without adding reader-facing meta-copy.

## Result

- No visual property changed.
- C6 remains readable through exact time + photo rhythm.
- AT3 remains readable through restrained time scan + one place observation.
- current V7+V8 root overlap count after write: `0`.
- V6 untouched.
- Existing route/map-named Drive files remain structural/schematic candidates, not production geography.

Because no visual map candidate with verified spatial facts was available, this is **not** promoted to `VERIFIED_LOCAL` visual learning yet. It is a source-truth/authority stop condition backed by live audit and direct asset inspection.

## Corrected method

Before adding a route/map to a travel/editorial spread, define its reader job and verify the minimum spatial data needed for that job. Depending on purpose, this may include named places, relative positions, route order, transport mode, distances, orientation context, source/provenance and intended scale. If those facts are absent, prefer truthful time/sequence/photo navigation over invented spatial certainty.

An intentionally non-geographic diagram is still possible, but its editorial role must be unmistakably schematic and must not imply real routing, distance or location accuracy.

## What must remain Rurubu-specific

Do not transfer C6/AT3 layouts, colors, time values, Hawaii/Yokohama content, photo roles, route-master files or exact Figma naming.

## Cross-item applicability hypothesis

Potentially useful to other physical/editorial artifacts that use maps, diagrams, venue routes or wayfinding. The receiving item must independently test whether a route/map has verified spatial authority and a real reader job. Do not promote project-wide until reproduced in a materially different item or validated with a legitimate map implementation.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-MODEL-COURSE-SPATIAL-TRUTH-GATE-QA-2026-08-23.md`.
