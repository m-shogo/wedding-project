# 青春ふたりきっぷ — Asset Register

Status: `REBUILD_IN_PROGRESS / 4_STRUCTURAL_QA_PASS / DRIVE_UPLOAD_BLOCKED / NOT_PLACEMENT_READY`

## Scope

This register is owned by the scheduled fixed-asset lane for paper item 4. The scheduled lane processes items in the fixed order `4. 青春ふたりきっぷ -> 3. BOARDING PASS -> 2. WEDDING PASSPORT` and must not modify `01_paper-items/rurubu-wedding/`.

## Current Drive inspection — 2026-07-30

Item folder ID: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`
Production folder: `20_制作素材`
Production folder ID: `1KsF80iBOynFy5RdTjPM7grQXClzXW4Tv`
Vector/icon subfolder ID: `1bhhltc5APlthGbisvFvYzeJMdDyM52au`

Existing Drive material is reference/legacy bundled material, not proof of production readiness under the current one-asset-one-file rule:

- `青春ふたりきっぷ風_制作素材一式_38点.zip` — Drive file ID `1rNMWF-Y42BGa4mA5M5vGVJ1wjkl7yNt8`
- `01_ベクター・アイコン/01_青春ふたりきっぷ風_ベクターアイコン18点.zip` — Drive file ID `1VnrvwRt89WGkT2RoXbOV897RZdqzaiXi`
- `01_ベクター・アイコン/01_青春ふたりきっぷ風_ベクターアイコン一覧.png` — Drive file ID `1BHYnYCeb2XWCxM4DDs-uWFwPNUgX2lLj`
- `02_背景・パターン/02_青春ふたりきっぷ風_背景パターン10点.zip` — Drive file ID `1tXeHzJgSA9OIc3oCp0LhYYOKm-Pvc8ZF`
- `02_背景・パターン/02_青春ふたりきっぷ風_背景パターン一覧.png` — Drive file ID `1q84XiBS5BvTvZun2mSzfa8gCI8waQItS`
- `03_装飾・スタンプ/03_青春ふたりきっぷ風_装飾スタンプ10点.zip` — Drive file ID `1nqCiDk4I2sNqi9PEsY-NHU3aLipZmxMY`
- `03_装飾・スタンプ/03_青春ふたりきっぷ風_装飾スタンプ一覧.png` — Drive file ID `1VUvmaqB5vDgk5BcRU0xW1AEIppprh0Jy`

The preview sheets and ZIP bundles are not production assets. They remain references until each selected production asset exists as its own independently QA'd file in the appropriate Drive production subfolder.

## Independently audited production candidates — 2026-07-30

The legacy bundle was inspected only as a reference source. Four simple vector-native elements were selected because SVG is clearly preferable for these geometries under the production rule. Each now exists as an independent file in Git main, not as an asset sheet.

| Asset | Git path | Structural QA | SHA-256 | Drive state |
|---|---|---|---|---|
| route geometry | `01_paper-items/seishun-futari-kippu/assets/seishun_route_v1.svg` | PASS: viewBox present, no embedded raster/image, transparent exterior | `adbee56638686b9d0bf353b01d0593dc4d3049dd08c712bd3481649c6a6ff5f0` | `DRIVE_UPLOAD_BLOCKED` |
| ticket frame | `01_paper-items/seishun-futari-kippu/assets/seishun_ticket_frame_v1.svg` | PASS: viewBox present, no embedded raster/image, transparent exterior | `b3799d66932e9b82b1b250b406f6bfc525de22f26425dabf235f3e976c46b3d2` | `DRIVE_UPLOAD_BLOCKED` |
| train icon | `01_paper-items/seishun-futari-kippu/assets/seishun_train_icon_v1.svg` | PASS: viewBox present, no embedded raster/image, transparent exterior | `a5a9932b9cb58a1d2489b332ab2ffe4a382a7cfb8c7c84831c74ffc9dfb09762` | `DRIVE_UPLOAD_BLOCKED` |
| decorative barcode-like mark | `01_paper-items/seishun-futari-kippu/assets/seishun_decorative_barcode_v1.svg` | PASS: viewBox present, no embedded raster/image, transparent exterior; decorative only, not a real scannable code | `a1a8ebdd402764bac3adf840e39f02e60833213ea6303ad37bb4deab53e5e009` | `DRIVE_UPLOAD_BLOCKED` |

These are `GIT_CURRENT_CANDIDATE / STRUCTURAL_QA_PASS`, not `COMPLETED`. Completion still requires independent Drive upload and post-upload existence verification.

## Current gate

`PLACEMENT_READY = false`

Reasons:
- the Drive production folders still contain only legacy ZIP bundles/preview sheets for these elements;
- the current production rule requires `1 asset = 1 independent file` in Drive as well as Git;
- no individual asset may be promoted merely because it exists inside a ZIP or comparison sheet;
- generated transparent PNGs must pass alpha-channel, transparent-edge, and green-fringe QA before promotion;
- simple lines, route geometry, perforations, barcode-like marks, base patterns, and simple frames may remain SVG/native vectors when that is visually superior;
- the four audited vectors cannot be marked `COMPLETED` until their independent Drive files exist and are verified.

## Next queue

1. Retry independent Drive upload for the four structurally approved SVG candidates and verify each file ID/existence.
2. Mark each candidate `COMPLETED` only after Drive verification.
3. Continue selecting/rebuilding the remaining important fixed decorative assets one file at a time; image-generated PNG remains preferred for texture-heavy/main decorative artwork when image-generation is available.
4. Do not bulk-promote the remaining contents of the legacy bundles.
5. Only after the fixed asset set is complete mark this item `PLACEMENT_READY` and advance to BOARDING PASS.

## Runtime constraint observed

The Google Drive connector now exposes an `upload_file` action, so the previous statement that no upload action exists is obsolete. In this run the actual upload attempt failed with `UNREGISTERED_FILE_REFERENCE`: local sandbox paths produced by the runtime could not be converted into connector file references. Re-writing the files through the visible Python runtime did not register them as connector-uploadable references either. Therefore the four candidates remain `DRIVE_UPLOAD_BLOCKED` rather than being misrepresented as uploaded or completed. Retry this gate first when an uploadable connector file reference becomes available.