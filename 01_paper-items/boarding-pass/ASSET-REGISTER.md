# BOARDING PASS — Asset Register

Status: `10_DRIVE_VERIFIED / FOUNDATION_READY / DECOR_STAMP_REBUILD_PENDING / NOT_PLACEMENT_READY`

## Scope

This register is owned by the fixed-asset lane for paper item 3. It must not modify `01_paper-items/rurubu-wedding/`.

Item order remains `4. 青春ふたりきっぷ -> 3. BOARDING PASS -> 2. WEDDING PASSPORT`. Item 4 is complete and `PLACEMENT_READY`; item 3 is now active.

## Current design authority

Drive item folder ID: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
Production folder `20_制作素材`: `1QgPsr8nmMeWoHMBK2GubDWIWi64l9UYE`
Vector/icon subfolder: `1Z2HQp8cTEzheaYSk4WJcnLabJOf3PeHp`
Background/pattern subfolder: `1-9QLDRFi1Sz7hGcfHu232eDFdxs9_I19`
Decor/stamp subfolder: `1dYvI-9Ajl4DpYaHYziidDkHpYcDidQ_R`

Direction: actual boarding-pass neatness plus wedding softness; ivory/white + dark navy, optional pale pink/mint/blue accents; rounded horizontal ticket with right stub and perforation; guest name and TABLE number remain Figma-native text and the strongest information hierarchy.

## Source-pack audit

The legacy 38-asset bundle was extracted and inspected. All 18 icon SVGs have a viewBox, no embedded raster `<image>`, and no live `<text>` nodes, so simple geometry may remain SVG. Legacy decorative stamp SVGs are references only; their flat/live-type treatment is not automatically promoted to production.

A first free-form image-generation attempt produced a progress/dashboard composition instead of one isolated asset. It is `REJECTED` and is not stored as production artwork. Subsequent decorative work must use one-asset-only generation or a controlled raster rebuild.

## Completed vector-native assets

| Asset | Production filename | Drive ID | QA / state |
|---|---|---|---|
| airplane icon | `boarding_plane_v1.svg` | `1fJ4No5VhnnKncNfxfL4CZW9m6Ry9ju59` | viewBox; no raster/text; `COMPLETED` |
| globe icon | `boarding_globe_v1.svg` | `1YW2Fs5YqYz8u1iX3sLF8KWvHGJeiRilf` | viewBox; no raster/text; `COMPLETED` |
| map pin | `boarding_pin_v1.svg` | `1QNzxJJzvTeP7PwmuChmYgvHouXZvo6UA` | viewBox; no raster/text; `COMPLETED` |
| gate icon | `boarding_gate_v1.svg` | `1j2q7pzP9gu3VBk8mCAE2MFSZvp8uJA21` | viewBox; no raster/text; `COMPLETED` |
| seat icon | `boarding_seat_v1.svg` | `1HXEqkHrfEzF7PQBEd5aiuhyQYn32Xhtz` | viewBox; no raster/text; `COMPLETED` |
| decorative non-scannable barcode | `boarding_decorative_barcode_v1.svg` | `1F7CJmUHnOoorS0mPpUTfTkCS3WKjwsCn` | decorative only; not QR/operational code; `COMPLETED` |

## Completed background / texture assets

| Asset | Production filename | Drive ID | QA / state |
|---|---|---|---|
| subtle ivory paper texture | `boarding_paper_texture_ivory_v1.png` | `1Nnw5TaZa1X2NsEb11A5CN2y8vAMdg8kp` | print-friendly subtle raster texture; `COMPLETED` |
| subtle white paper texture | `boarding_paper_texture_white_v1.png` | `1FUHUhZOYusKkPadC3D01N0RtdKM-SPoO` | print-friendly subtle raster texture; `COMPLETED` |
| route background | `boarding_route_pattern_v1.svg` | `1RKguRc-vNnIw_dUxFrHUBkj7S-4zTIBh` | simple vector pattern; `COMPLETED` |
| dot-grid background | `boarding_dot_grid_v1.svg` | `1NdqFGzMUpDssE0qesJgPvKjc1MIdudgx` | simple vector pattern; `COMPLETED` |

All ten production children were independently saved to Drive and read back after upload. ZIP bundles and preview sheets remain reference-only and do not count toward completion.

## Native-text boundary

Do not image-generate guest names, TABLE/SEAT number, venue, GATE, BOARDING TIME, date, or other variable labels. Keep those Figma-native for CSV/Variables-driven replacement and print legibility.

## Current gate

`PLACEMENT_READY = false`

Foundation artwork is ready, but the high-value decorative layer is not yet closed. The current priority is independent transparent PNG travel stamps / wedding travel marks with no real airline logo, no real flight number, and no scannable QR code.

## Next queue

1. Rebuild a primary fictional `YOKOHAMA -> HAPPINESS / 2026.10.24` travel stamp as independent transparent PNG; mechanical alpha QA; Drive save/readback.
2. Rebuild a secondary `THANK YOU FOR COMING` wedding-travel stamp as independent transparent PNG; mechanical alpha QA; Drive save/readback.
3. Promote only additional simple SVG icons/patterns that are actually useful to final placement; do not bulk-promote the full legacy pack merely to increase counts.
4. After decorative assets are complete, run item-level placement/readability QA and decide `PLACEMENT_READY`.
5. Only after item 3 is complete advance fixed-asset generation to item 2 (`WEDDING PASSPORT`).
