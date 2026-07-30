# 青春ふたりきっぷ — Asset Register

Status: `REBUILD_IN_PROGRESS / 8_STRUCTURAL_QA_PASS / PNG_FALLBACK_QA_PASS / DRIVE_UPLOAD_BLOCKED / NOT_PLACEMENT_READY`

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

The legacy vector ZIP was mounted and inspected as a reference source. Eight simple vector-native elements are now independently represented in Git main because SVG is clearly preferable for these geometries under the production rule. None is an asset sheet.

| Asset | Git path | Structural QA | SHA-256 | Drive state |
|---|---|---|---|---|
| route geometry | `01_paper-items/seishun-futari-kippu/assets/seishun_route_v1.svg` | PASS: viewBox present, no embedded raster/image, transparent exterior | `adbee56638686b9d0bf353b01d0593dc4d3049dd08c712bd3481649c6a6ff5f0` | `DRIVE_UPLOAD_BLOCKED` |
| ticket frame | `01_paper-items/seishun-futari-kippu/assets/seishun_ticket_frame_v1.svg` | PASS: viewBox present, no embedded raster/image, transparent exterior | `b3799d66932e9b82b1b250b406f6bfc525de22f26425dabf235f3e976c46b3d2` | `DRIVE_UPLOAD_BLOCKED` |
| train icon | `01_paper-items/seishun-futari-kippu/assets/seishun_train_icon_v1.svg` | PASS: viewBox present, no embedded raster/image, transparent exterior | `a5a9932b9cb58a1d2489b332ab2ffe4a382a7cfb8c7c84831c74ffc9dfb09762` | `DRIVE_UPLOAD_BLOCKED` |
| decorative barcode-like mark | `01_paper-items/seishun-futari-kippu/assets/seishun_decorative_barcode_v1.svg` | PASS: viewBox present, no embedded raster/image, transparent exterior; decorative only, not a real scannable code | `a1a8ebdd402764bac3adf840e39f02e60833213ea6303ad37bb4deab53e5e009` | `DRIVE_UPLOAD_BLOCKED` |
| map pin | `01_paper-items/seishun-futari-kippu/assets/seishun_pin_v1.svg` | PASS: viewBox present, path/circle only, transparent exterior | `07dbc5f350c35fca244b8af751e71f7ab72c113a51a6972dfd5672c9554861ea` | `DRIVE_UPLOAD_BLOCKED` |
| rail mark | `01_paper-items/seishun-futari-kippu/assets/seishun_rail_v1.svg` | PASS: viewBox present, paths only, transparent exterior | `5c77921ad80db7bfa6325ae9a34d3960f9445a06cafcb7ab5948721634924ed8` | `DRIVE_UPLOAD_BLOCKED` |
| station mark | `01_paper-items/seishun-futari-kippu/assets/seishun_station_v1.svg` | PASS: viewBox present, path only, transparent exterior | `38e4422f9c595272f6ba70730064d8f785aba068ae3eddffe8941ef556ec3140` | `DRIVE_UPLOAD_BLOCKED` |
| calendar mark | `01_paper-items/seishun-futari-kippu/assets/seishun_calendar_v1.svg` | PASS: viewBox present, rect/paths only, transparent exterior | `f24fe1781dc646fb80616b59fa8422e0bc6a704c68ee54387bb600a135127557` | `DRIVE_UPLOAD_BLOCKED` |

These are `GIT_CURRENT_CANDIDATE / STRUCTURAL_QA_PASS`, not `COMPLETED`. Completion still requires independent Drive upload and post-upload existence verification.

## PNG fallback derivative QA — 2026-07-30

Because direct upload of generated SVG children again failed at the connector file-reference boundary, the method was changed instead of repeating the same failure. 1024x1024 transparent PNG derivatives were generated from the eight Git-current SVGs for a Drive/Figma fallback path.

All eight derivatives passed mechanical alpha QA:

- real RGBA alpha channel present;
- transparent exterior present;
- outermost border max alpha = `0` for all eight files;
- no white/checkerboard/matte canvas introduced;
- antialiasing is represented as partial alpha where applicable.

The generated PNG derivatives are **not** promoted because the same Drive connector rejected the new local PNG paths with `UNREGISTERED_FILE_REFERENCE`. They remain ephemeral QA evidence only; Git SVG remains the persistent current source for these simple geometries.

## Legacy decorative stamp audit — 2026-07-30

`03_青春ふたりきっぷ風_装飾スタンプ10点.zip` was mounted and inspected directly. It contains `stamp_01.svg` through `stamp_10.svg`.

The ten legacy stamps are deliberately **not** bulk-promoted. They are flat circle/rectangle SVG constructions with live `Arial,sans-serif` text such as `青春ふたりきっぷ`, `未来行き 2026.10.24`, `新郎駅`, `新婦駅`, `改札済 WEDDING`, `記念発行 YOKOHAMA`, `旅立ち TOGETHER`, `幸福行 EXPRESS`, and `THANK YOU GIFT`.

Decision under the current visual-quality rule:

- simple geometry can remain vector/native;
- these stamp treatments are main decorative artwork whose value depends on texture, type treatment, and print character;
- the legacy flat/font-dependent SVG stamps are `REFERENCE / REBUILD_PNG_PREFERRED`, not Current production candidates;
- rebuild as independent textured PNG assets when image generation is available, then perform alpha/edge QA and Drive verification one file at a time.

## Current gate

`PLACEMENT_READY = false`

Reasons:
- the Drive production folders still contain only legacy ZIP bundles/preview sheets for these elements;
- the current production rule requires `1 asset = 1 independent file` in Drive as well as Git;
- no individual asset may be promoted merely because it exists inside a ZIP or comparison sheet;
- generated transparent PNGs must pass alpha-channel, transparent-edge, and green-fringe QA before promotion;
- simple lines, route geometry, rail marks, barcode-like marks, base patterns, simple frames, and similarly elementary icons may remain SVG/native vectors when that is visually superior;
- the eight audited vectors cannot be marked `COMPLETED` until their independent Drive files exist and are verified;
- the ten legacy stamp SVGs require quality-led rebuilding rather than bulk promotion.

## Next queue

1. Retry independent Drive upload for the eight structurally approved vector candidates using a genuinely connector-registered file reference; verify each resulting Drive file ID/existence.
2. Mark each candidate `COMPLETED` only after Drive verification.
3. Rebuild the selected main decorative stamps as independent textured PNGs when image generation is available; do not reuse the flat legacy SVG typography as Current production art.
4. Continue selecting/rebuilding only remaining important fixed assets; image-generated PNG remains preferred for texture-heavy/main decorative artwork.
5. Do not bulk-promote the remaining contents of the legacy bundles.
6. Only after the fixed asset set is complete mark this item `PLACEMENT_READY` and advance to BOARDING PASS.

## Runtime constraint observed

The Google Drive connector exposes `upload_file`, and raw Drive ZIP files can be mounted into the runtime for direct inspection. However, `upload_file` still requires a connector-registered file reference for each independent output. Both direct SVG local paths and newly generated transparent PNG local paths were rejected with `UNREGISTERED_FILE_REFERENCE`; converting format alone does not solve the connector boundary. The legacy ZIP itself is registered, but extracted/generated children are not automatically registered as uploadable connector files. Do not falsely promote or re-upload the ZIP. The eight vector candidates remain `DRIVE_UPLOAD_BLOCKED` until an independent connector-uploadable file reference is available for each production file.