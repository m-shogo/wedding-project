# 青春ふたりきっぷ — Asset Register

Status: `8_VECTOR_ASSETS_COMPLETED / DRIVE_VERIFIED / DECORATIVE_REBUILDS_PENDING / BOARDING_PASS_ADVANCE_ALLOWED / NOT_FIGMA_PLACEMENT_READY`

## Scope

This register is owned by the fixed-asset lane for paper item 4. It must not modify `01_paper-items/rurubu-wedding/`.

## Current Drive authority — 2026-07-31

Item folder ID: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`
Production folder: `20_制作素材`
Production folder ID: `1KsF80iBOynFy5RdTjPM7grQXClzXW4Tv`
Vector/icon subfolder ID: `1bhhltc5APlthGbisvFvYzeJMdDyM52au`

The local-file -> Drive upload bridge is working in the current runtime. The eight approved vector-native production assets have been uploaded independently and their existence was verified in the vector/icon subfolder.

| Asset | Git path | Drive ID | Drive state |
|---|---|---|---|
| route geometry | `assets/seishun_route_v1.svg` | `1U7cbVpsYrubKCEQxtR9Wjr2fzFyUEQkr` | `COMPLETED` |
| ticket frame | `assets/seishun_ticket_frame_v1.svg` | `1egVANlbNyaC-Z-t53l7Quo5w6cIM-12q` | `COMPLETED` |
| train icon | `assets/seishun_train_icon_v1.svg` | `145klnQiSp1ss9xXbAb-0o-In02pv7IyY` | `COMPLETED` |
| decorative barcode-like mark | `assets/seishun_decorative_barcode_v1.svg` | `1B2WRVxmuT_-Z6Ht5o2CjUjM6pDdrJVB-` | `COMPLETED` |
| map pin | `assets/seishun_pin_v1.svg` | `1tJ1a_fpAEw-qN6heiRhaexxsVnv54IoO` | `COMPLETED` |
| rail mark | `assets/seishun_rail_v1.svg` | `1A-tJXDC0asLvzdl-miAvyzmXZiTEIs_0` | `COMPLETED` |
| station mark | `assets/seishun_station_v1.svg` | `1T8uusECJLin4A2hGr8NF2QaglgJhd7XS` | `COMPLETED` |
| calendar mark | `assets/seishun_calendar_v1.svg` | `1kGE2dGh_iWtPtKb7KfSDuazETndko6KU` | `COMPLETED` |

All eight remain structurally QA-passed: SVG-native geometry, viewBox present, no embedded raster, transparent exterior where applicable, and one asset per file.

## PNG fallback derivative QA

1024x1024 transparent PNG derivatives of the eight vectors previously passed mechanical alpha QA. They remain fallback-only because SVG is the preferred production representation for these simple geometries.

## Decorative artwork still pending

Legacy stamp SVGs remain `REFERENCE / REBUILD_PNG_PREFERRED`. Do not promote the flat Arial/sans-serif versions.

Required future decorative work for final Figma composition:
1. red celebratory `祝` stamp as an independent transparent PNG;
2. blue fictional ticket-gate/date stamp as an independent transparent PNG;
3. optional subtle paper/ink texture accent only if Figma-native treatment is insufficient.

These pending decorations mean item 4 is **not yet final Figma placement-ready**. Exact physical label dimensions also remain subject to re-measurement before print lock.

## Progression decision

Per explicit user direction on 2026-07-31, the completed Drive gate for the eight already-generated fixed assets is sufficient to stop blocking the next fixed-asset lane.

`BOARDING_PASS_ASSET_GENERATION_ALLOWED = true`

This does **not** mean the remaining decorative rebuilds are waived or that item 4 is print/Figma-final. They stay as item-4 follow-up work, while item 3 asset generation may proceed in parallel without touching the rurubu lane.

## Next queue

1. Advance fixed-asset generation to `3. BOARDING PASS`.
2. Keep item 4 decorative stamp rebuilds as a non-blocking follow-up queue.
3. Before item 4 Figma placement, complete/replace required red and blue stamp treatments and verify their Drive files.
4. Do not modify `01_paper-items/rurubu-wedding/` from this lane.
