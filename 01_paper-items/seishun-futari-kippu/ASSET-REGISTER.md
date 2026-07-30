# 青春ふたりきっぷ — Asset Register

Status: `REBUILD_REQUIRED / DRIVE_LEGACY_BUNDLES_PRESENT / NOT_PLACEMENT_READY`

## Scope

This register is owned by the scheduled fixed-asset lane for paper item 4. The scheduled lane processes items in the fixed order `4. 青春ふたりきっぷ -> 3. BOARDING PASS -> 2. WEDDING PASSPORT` and must not modify `01_paper-items/rurubu-wedding/`.

## Current Drive inspection — 2026-07-30

Item folder ID: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`
Production folder: `20_制作素材`
Production folder ID: `1KsF80iBOynFy5RdTjPM7grQXClzXW4Tv`

Existing Drive material is reference/legacy bundled material, not proof of production readiness under the current one-asset-one-file rule:

- `青春ふたりきっぷ風_制作素材一式_38点.zip` — Drive file ID `1rNMWF-Y42BGa4mA5M5vGVJ1wjkl7yNt8`
- `01_ベクター・アイコン/01_青春ふたりきっぷ風_ベクターアイコン18点.zip` — Drive file ID `1VnrvwRt89WGkT2RoXbOV897RZdqzaiXi`
- `01_ベクター・アイコン/01_青春ふたりきっぷ風_ベクターアイコン一覧.png` — Drive file ID `1BHYnYCeb2XWCxM4DDs-uWFwPNUgX2lLj`
- `02_背景・パターン/02_青春ふたりきっぷ風_背景パターン10点.zip` — Drive file ID `1tXeHzJgSA9OIc3oCp0LhYYOKm-Pvc8ZF`
- `02_背景・パターン/02_青春ふたりきっぷ風_背景パターン一覧.png` — Drive file ID `1q84XiBS5BvTvZun2mSzfa8gCI8waQItS`
- `03_装飾・スタンプ/03_青春ふたりきっぷ風_装飾スタンプ10点.zip` — Drive file ID `1nqCiDk4I2sNqi9PEsY-NHU3aLipZmxMY`
- `03_装飾・スタンプ/03_青春ふたりきっぷ風_装飾スタンプ一覧.png` — Drive file ID `1VUvmaqB5vDgk5BcRU0xW1AEIppprh0Jy`

The preview sheets and ZIP bundles are not production assets. They remain references until each selected production asset exists as its own independently QA'd file in the appropriate Drive production subfolder.

## Current gate

`PLACEMENT_READY = false`

Reasons:
- current Drive state is dominated by ZIP bundles and preview sheets;
- the current production rule requires `1 asset = 1 independent file`;
- no individual asset may be promoted merely because it exists inside a ZIP or comparison sheet;
- generated transparent PNGs must pass alpha-channel, transparent-edge, and green-fringe QA before promotion;
- simple lines, route geometry, perforations, barcode-like marks, base patterns, and simple frames may remain SVG/native vectors when that is visually superior.

## Next queue

1. Inspect the legacy bundles only as reference; do not bulk-promote them.
2. Rebuild/select the first visually important decorative asset as one independent production file.
3. QA transparency/edges or SVG structure as applicable.
4. Save the independent file into the appropriate `20_制作素材` subfolder and verify Drive existence.
5. Record Drive file ID here; only then mark that asset `COMPLETED`.
6. Continue through the item queue until the fixed asset set is complete; only then mark this item `PLACEMENT_READY` and advance to BOARDING PASS.

## Runtime constraint observed

The currently connected Google Drive action set exposes folder inspection/search/fetch but no direct file-upload action. Therefore new production assets cannot be truthfully marked `COMPLETED` from this runtime until an upload-capable Drive action is available. Existing Drive material must not be misrepresented as newly uploaded production assets.
