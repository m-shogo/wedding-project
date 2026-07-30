# 青春ふたりきっぷ — Asset Register

Status: `REBUILD_IN_PROGRESS / 8_STRUCTURAL_QA_PASS / PNG_FALLBACK_QA_PASS / DRIVE_CHILD_UPLOAD_BLOCKED / NOT_PLACEMENT_READY`

## Scope

This register is owned by the scheduled fixed-asset lane for paper item 4. The scheduled lane processes items in the fixed order `4. 青春ふたりきっぷ -> 3. BOARDING PASS -> 2. WEDDING PASSPORT` and must not modify `01_paper-items/rurubu-wedding/`.

## Current Drive inspection — 2026-07-31 03:26 JST

Item folder ID: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`
Production folder: `20_制作素材`
Production folder ID: `1KsF80iBOynFy5RdTjPM7grQXClzXW4Tv`
Vector/icon subfolder ID: `1bhhltc5APlthGbisvFvYzeJMdDyM52au`

Fresh direct-child inspection of the vector/icon subfolder confirms exactly three current entries:

- `_transport_probe_vector18_copy.zip` — Drive ID `1kfmmU4S2uoxpPtbVWJvIVfMGX8_aSzYm`, 5750 bytes; transport evidence only.
- `01_青春ふたりきっぷ風_ベクターアイコン一覧.png` — Drive ID `1BHYnYCeb2XWCxM4DDs-uWFwPNUgX2lLj`, 93037 bytes; preview/reference only.
- `01_青春ふたりきっぷ風_ベクターアイコン18点.zip` — Drive ID `1VnrvwRt89WGkT2RoXbOV897RZdqzaiXi`, 5750 bytes; legacy bundle/reference only.

There are still **zero independently uploaded production child SVG/PNG files** in this subfolder. Therefore no candidate may be marked COMPLETED from Drive evidence.

Other existing Drive material remains reference/legacy bundled material, not proof of production readiness under the current one-asset-one-file rule:

- `青春ふたりきっぷ風_制作素材一式_38点.zip` — Drive file ID `1rNMWF-Y42BGa4mA5M5vGVJ1wjkl7yNt8`
- `02_背景・パターン/02_青春ふたりきっぷ風_背景パターン10点.zip` — Drive file ID `1tXeHzJgSA9OIc3oCp0LhYYOKm-Pvc8ZF`
- `02_背景・パターン/02_青春ふたりきっぷ風_背景パターン一覧.png` — Drive file ID `1q84XiBS5BvTvZun2mSzfa8gCI8waQItS`
- `03_装飾・スタンプ/03_青春ふたりきっぷ風_装飾スタンプ10点.zip` — Drive file ID `1nqCiDk4I2sNqi9PEsY-NHU3aLipZmxMY`
- `03_装飾・スタンプ/03_青春ふたりきっぷ風_装飾スタンプ一覧.png` — Drive file ID `1VUvmaqB5vDgk5BcRU0xW1AEIppprh0Jy`

The preview sheets and ZIP bundles are not production assets. They remain references until each selected production asset exists as its own independently QA'd file in the appropriate Drive production subfolder.

## Independently audited production candidates

Eight simple vector-native elements are independently represented in Git main because SVG is clearly preferable for these geometries under the production rule. None is an asset sheet.

| Asset | Git path | Structural QA | Drive state |
|---|---|---|---|
| route geometry | `assets/seishun_route_v1.svg` | PASS: viewBox, no embedded raster, transparent exterior | `DRIVE_CHILD_UPLOAD_BLOCKED` |
| ticket frame | `assets/seishun_ticket_frame_v1.svg` | PASS | `DRIVE_CHILD_UPLOAD_BLOCKED` |
| train icon | `assets/seishun_train_icon_v1.svg` | PASS | `DRIVE_CHILD_UPLOAD_BLOCKED` |
| decorative barcode-like mark | `assets/seishun_decorative_barcode_v1.svg` | PASS; decorative only | `DRIVE_CHILD_UPLOAD_BLOCKED` |
| map pin | `assets/seishun_pin_v1.svg` | PASS | `DRIVE_CHILD_UPLOAD_BLOCKED` |
| rail mark | `assets/seishun_rail_v1.svg` | PASS | `DRIVE_CHILD_UPLOAD_BLOCKED` |
| station mark | `assets/seishun_station_v1.svg` | PASS | `DRIVE_CHILD_UPLOAD_BLOCKED` |
| calendar mark | `assets/seishun_calendar_v1.svg` | PASS | `DRIVE_CHILD_UPLOAD_BLOCKED` |

These are `GIT_CURRENT_CANDIDATE / STRUCTURAL_QA_PASS`, not `COMPLETED`. Completion still requires independent Drive upload and post-upload existence verification.

## PNG fallback derivative QA

1024x1024 transparent PNG derivatives were generated from the eight Git-current SVGs. All eight passed mechanical alpha QA: real RGBA alpha, transparent exterior, outermost border max alpha 0, no matte/checkerboard/white canvas, antialiasing represented as partial alpha. They remain fallback evidence because generated child files are not connector-registered upload references.

## Legacy decorative stamp audit

The ten legacy stamps are deliberately not bulk-promoted. They are flat SVG constructions with live Arial/sans-serif text. Main decorative artwork depends on texture/type treatment/print character, so these are `REFERENCE / REBUILD_PNG_PREFERRED`; simple geometry can remain vector/native.

## Drive transport verification

Drive `upload_file` itself is known to work with connector-registered file references. Prior successful transport probes prove this, including Drive ID `1kfmmU4S2uoxpPtbVWJvIVfMGX8_aSzYm` in the vector subfolder.

This evidence must not be confused with production readiness. The remaining blocker is narrower: Git text fetches and locally generated/extracted SVG/PNG outputs do not expose a connector-registered `file_uri` that `upload_file` accepts. The current runtime exposes no supported registration bridge for those arbitrary child bytes. Repeating ZIP-copy probes cannot resolve that boundary and is prohibited.

## Current gate

`PLACEMENT_READY = false`

Reasons:
- one-asset-one-file Drive gate remains unsatisfied for all eight approved vectors;
- current Drive inspection confirms zero individual production child files in the vector subfolder;
- generated/extracted child SVG/PNG files still lack connector-registered upload references;
- no individual asset may be promoted merely because it exists inside a ZIP/comparison sheet;
- the ten legacy stamp SVGs require quality-led rebuilding rather than bulk promotion.

## Next queue

1. On a future run, first inspect Drive for independently uploaded production children; skip any that already exist and are verified.
2. If a supported connector-registration bridge becomes available, upload the eight approved children individually and verify Drive IDs/existence before marking each COMPLETED.
3. Do not spend further runs on duplicate ZIP transport probes; they have already proven transport and cannot satisfy the production gate.
4. Rebuild selected main decorative stamps as independent textured PNGs when image generation plus a viable Drive-registration path can complete the full generate -> QA -> Drive gate.
5. Only after the fixed asset set is complete mark this item `PLACEMENT_READY` and advance to BOARDING PASS.
