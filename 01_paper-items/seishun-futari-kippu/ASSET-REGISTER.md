# 青春ふたりきっぷ — Asset Register

Status: `10_ASSETS_COMPLETED / DRIVE_VERIFIED / PLACEMENT_READY / BOARDING_PASS_ADVANCE_ALLOWED`

## Scope

This register is owned by the fixed-asset lane for paper item 4. It must not modify `01_paper-items/rurubu-wedding/`.

## Current Drive authority — 2026-07-31

Item folder ID: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`
Production folder: `20_制作素材`
Production folder ID: `1KsF80iBOynFy5RdTjPM7grQXClzXW4Tv`
Vector/icon subfolder ID: `1bhhltc5APlthGbisvFvYzeJMdDyM52au`
Decorative/stamp subfolder ID: `1Mh7acGiT3cw4NQE29Ew2eJiNDtlNTIqF`

The local-file -> Drive upload bridge is working in the current runtime. All selected production assets have been uploaded independently and verified in Drive.

## Completed vector-native assets

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

## Completed decorative PNG assets

The legacy flat stamp SVGs remain reference-only and are not promoted. Two independent production PNG rebuilds were created and mechanically QA'd.

| Asset | Production filename | Mechanical QA | Drive ID | Drive state |
|---|---|---|---|---|
| red celebratory `祝` stamp | `seishun_stamp_shuku_red_v1.png` | 2048x2048 RGBA; transparent exterior; border max alpha 0; visible green 0 | `18IfyAhcrnW16shx-rYrSMPWnYfStZfqz` | `COMPLETED` |
| blue fictional ticket-gate/date stamp | `seishun_stamp_gate_blue_v1.png` | 2048x2048 RGBA; transparent exterior; border max alpha 0; visible green 0 | `1TkdqzYldyQc8kB6nxl4os8NGF28i_GM9` | `COMPLETED` |

The blue stamp is fictional decorative artwork and does not reproduce a real railway operator mark. Both PNGs use distressed ink treatment suitable for the intended retro-ticket composition.

## PNG fallback derivative QA

1024x1024 transparent PNG derivatives of the eight vectors previously passed mechanical alpha QA. They remain fallback-only because SVG is the preferred production representation for those simple geometries.

## Current gate

`PLACEMENT_READY = true`

All required fixed assets for item 4 now satisfy the one-asset-one-file production rule and the Drive-save/existence gate. Physical label dimensions still require normal print-lock remeasurement, but that is downstream layout/print QA rather than a missing fixed-asset blocker.

## Progression decision

`BOARDING_PASS_ASSET_GENERATION_ALLOWED = true`

Item 4 fixed-asset generation is closed. The fixed-asset lane may advance to `3. BOARDING PASS` without returning to item 4 unless later Figma/print QA identifies a concrete defect.

## Next queue

1. Advance fixed-asset generation to `3. BOARDING PASS`.
2. Keep item 4 assets unchanged unless placement/print QA reveals a specific issue.
3. Do not modify `01_paper-items/rurubu-wedding/` from this lane.
