# BOARDING PASS — Asset Register

Status: `12_DRIVE_VERIFIED / FIXED_ASSET_COMPLETE / PLACEMENT_READY / WEDDING_PASSPORT_ADVANCE_ALLOWED`

## Scope

This register is owned by the fixed-asset lane for paper item 3. It must not modify `01_paper-items/rurubu-wedding/`.

Item order remains `4. 青春ふたりきっぷ -> 3. BOARDING PASS -> 2. WEDDING PASSPORT`. Item 4 is complete; item 3 fixed assets are now complete and may hand off to item 2.

## Current design authority

Drive item folder ID: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
Production folder `20_制作素材`: `1QgPsr8nmMeWoHMBK2GubDWIWi64l9UYE`
Vector/icon subfolder: `1Z2HQp8cTEzheaYSk4WJcnLabJOf3PeHp`
Background/pattern subfolder: `1-9QLDRFi1Sz7hGcfHu232eDFdxs9_I19`
Decor/stamp subfolder: `1dYvI-9Ajl4DpYaHYziidDkHpYcDidQ_R`

Direction remains: actual boarding-pass neatness plus wedding softness; ivory/white + dark navy with restrained pale accents; horizontal rounded ticket, right stub, perforation cue; guest name and TABLE number are Figma-native and visually dominant.

## Source-pack audit

The legacy 38-asset bundle was extracted and inspected. All 18 icon SVGs have a viewBox, no embedded raster `<image>`, and no live `<text>` nodes. Only final-placement-useful simple geometry was promoted; the full pack was not bulk-promoted merely to increase asset count.

The first free-form image-generation attempt produced a status/dashboard composition rather than one isolated asset and remains `REJECTED`. Decorative stamps were therefore rebuilt by a controlled raster route rather than repeating the failed method.

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

## Completed decorative PNG assets

| Asset | Production filename | Mechanical / visual QA | Drive ID | State |
|---|---|---|---|---|
| primary fictional travel stamp | `boarding_stamp_yokohama_happiness_v2.png` | 2048x2048 RGBA; transparent exterior; border max alpha 0; visible green 0; v1 rejected because plane/date overlapped; v2 visually corrected | `10NyGH4zHN1jK27-k9vRscJ7Ir3931aOz` | `COMPLETED` |
| secondary thank-you travel stamp | `boarding_stamp_thank_you_v1.png` | 2000x1300 RGBA; transparent exterior; border max alpha 0; visible green 0; clear hierarchy | `1R_ang01qGsjCx_274oxJB1vktI9_rqfR` | `COMPLETED` |

Both are fictional wedding-travel decoration and do not reproduce a real airline logo, real flight number, public mark, or scannable QR code.

All twelve selected production assets exist as independent Drive children and were read back after upload. Legacy ZIP bundles and preview sheets remain reference-only.

## Native-text boundary

Do not image-generate guest names, TABLE/SEAT number, venue, GATE, BOARDING TIME, date, or other variable labels. Keep them Figma-native for CSV/Variables-driven replacement and print legibility.

## Placement / readability authority

See `PLACEMENT-PLAN.md`.

The fixed-asset set covers the final front/back composition without requiring additional raster artwork. Ticket outline, rounded rectangle, perforation line, separators and variable typography are Figma-native/vector layout elements, not missing image assets.

## Current gate

`PLACEMENT_READY = true`

The required fixed visual building blocks satisfy the one-asset-one-file rule and Drive-save/readback gate. Remaining work is downstream composition and actual-size print QA, not missing fixed assets.

## Progression decision

`WEDDING_PASSPORT_ASSET_GENERATION_ALLOWED = true`

Item 3 fixed-asset generation is closed. The fixed-asset lane may advance to item 2 (`WEDDING PASSPORT`). Return to item 3 only if Figma placement or print QA identifies a concrete defect.

## Next queue

1. Advance fixed-asset generation to `2. WEDDING PASSPORT`.
2. Keep BOARDING PASS fixed assets unchanged unless placement/print QA reveals a specific defect.
3. Do not modify `01_paper-items/rurubu-wedding/` from this lane.
