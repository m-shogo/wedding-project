# WEDDING PASSPORT — Asset Register

Updated: 2026-07-31
Current authority: GitHub `main`

Status: `12_DRIVE_VERIFIED / FIXED_ASSET_COMPLETE / PLACEMENT_READY / FIXED_LANE_4_3_2_COMPLETE`

## Scope

This register is owned by the fixed-asset lane for item 2 (`WEDDING PASSPORT`). It must not modify `01_paper-items/rurubu-wedding/`.

The fixed lane has now completed `4. 青春ふたりきっぷ -> 3. BOARDING PASS -> 2. WEDDING PASSPORT` in the required reverse order.

## Current design authority

Drive item folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
Production folder `20_制作素材`: `1G4b7Qhtj6Ng7RRREtN_us4eKnwvCbWA6`
Vector/icon subfolder: `1zs8Y7jVKW7xqng_U9Hr2aKZxyySbbym2`
Background/pattern subfolder: `1CYOKUBqEh6koqWUY8zEehHxEosoXv1Tx`
Decor/stamp subfolder: `1SGR08lb0EOkLzjRS3b8wScBZv2Gr3kZG`

Direction: modern premium wedding passport; deep navy, warm ivory, restrained gold; muted red/blue only for travel-stamp accents; generous whitespace; front-cover fictional globe/airplane/laurel identity; MENU & DRINK on left interior, SEATING CHART on right interior.

Never reproduce a real national passport, coat of arms, official seal, MRZ, passport number, security pattern, or airline/travel-company logo.

## Source-pack audit

The legacy 38-asset bundle was extracted and inspected. All 18 simple icon SVGs have a viewBox, no embedded raster `<image>`, and no live `<text>` nodes. Only final-placement-useful icons were promoted as production children; the full pack was not bulk-promoted merely to increase counts.

## Completed vector-native assets

| Asset | Production filename | Drive ID | QA / state |
|---|---|---|---|
| globe icon | `passport_globe_v1.svg` | `1svje75vn0DabCSh8BdB6ilAfVahByTIz` | viewBox; no raster/text; `COMPLETED` |
| airplane icon | `passport_plane_v1.svg` | `1TCzwQxBRKwlzfOSUf6zNA0oA84v5ilQh` | viewBox; no raster/text; `COMPLETED` |
| compass icon | `passport_compass_v1.svg` | `1obYVHiPF3PH95V53g0Y8tharjJSv2UFw` | viewBox; no raster/text; `COMPLETED` |
| MENU utensils icon | `passport_utensils_v1.svg` | `1-7DY0RZZOo4bOv5BN5QdtQ4UAn4llTzh` | viewBox; no raster/text; `COMPLETED` |
| DRINK wine icon | `passport_wine_v1.svg` | `1JMCI37kPr2Jw8_NcvkO61Kbl9g4cyPmF` | viewBox; no raster/text; `COMPLETED` |
| seating/table icon | `passport_table_v1.svg` | `1ePet7OMntW9-pGN59ku0FuKSf3DcSPrc` | viewBox; no raster/text; `COMPLETED` |

## Completed background / texture assets

| Asset | Production filename | Drive ID | QA / state |
|---|---|---|---|
| warm ivory paper texture | `passport_paper_texture_ivory_v1.png` | `1_rEilwWnVKsU0dZoYPwKpnr2SpfT5qTQ` | subtle print texture; `COMPLETED` |
| clean white paper texture | `passport_paper_texture_white_v1.png` | `1RgycJ_cWh3wwmlglIiHeCHbk19aiqfxj` | clean contrast option; `COMPLETED` |
| route background | `passport_route_pattern_v1.svg` | `1DP2tcgw0eag1tiQYx7MC0V36JyHqIpMe` | simple vector ornament; not security pattern; `COMPLETED` |
| dot-grid background | `passport_dot_grid_v1.svg` | `1QU2UEnYPx5Yqjn2fhqmrVY8p4PesGKM9` | simple vector ornament; `COMPLETED` |

## Completed decorative PNG assets

| Asset | Production filename | Mechanical / visual QA | Drive ID | State |
|---|---|---|---|---|
| primary cover emblem | `passport_emblem_globe_plane_laurel_v2.png` | 2048x2048 RGBA; transparent exterior; border max alpha 0; visible green 0; v1 rejected because laurel read as branch-like; v2 visually corrected | `1DRuep9shagE_007KEIHY7NmKcxA4HzRc` | `COMPLETED` |
| fictional YOKOHAMA/date travel stamp | `passport_stamp_yokohama_date_v1.png` | 1800x1800 RGBA; transparent exterior; border max alpha 0; visible green 0; muted-red fictional mark | `1oTxcKrp2yxDJBauK3z97trK0iK15flcq` | `COMPLETED` |

All twelve selected production assets exist as independent Drive children and were read back after upload. ZIP bundles and preview sheets remain reference-only.

## Previous emblem authority change

`assets/passport-emblem-compass-airplane.svg` remains in Git for history/fallback only.

Status: `FALLBACK / ARCHIVE`

Reason:
- it contains live typography inside a main cover emblem;
- under the current production rule, the high-value cover identity is better represented by the controlled transparent PNG;
- the Current production identity is `passport_emblem_globe_plane_laurel_v2.png`.

Do not delete or rewrite the historical SVG; simply do not treat it as Current production authority.

## Native-text boundary

Keep these Figma-native and editable:

- `WEDDING PASSPORT`
- date / location
- `MENU & DRINK`
- all food and beverage text
- `SEATING CHART`
- all guest names, table numbers and seating labels
- back-cover itinerary / thank-you copy

The seating chart itself is Figma-native geometry + text; `passport_table_v1.svg` is only a supporting section cue.

## Placement / readability authority

See `PLACEMENT-PLAN.md`.

The fixed-asset set covers cover, interior and back-cover composition without requiring more image assets. Thin rules, separators, page frames and simple table geometry remain Figma-native/vector layout elements.

## Current gate

`PLACEMENT_READY = true`

All required fixed visual building blocks satisfy the one-asset-one-file rule and Drive-save/readback gate. Remaining work is Figma composition, variable-data insertion, print-scale remeasurement and physical print QA rather than missing fixed assets.

## Fixed-lane completion decision

`FIXED_ASSET_LANE_4_3_2_COMPLETE = true`

The fixed-asset lane must not return to `1. るるぶWEDDING` until the chat-owned rurubu lane explicitly records completion / handoff in Git or Drive.

## Next non-conflicting queue

1. Backfill any missing Drive/Git metadata for items 4/3/2 if discovered by fresh inspection.
2. Run Git/Drive consistency QA for items 4/3/2.
3. Prepare Figma placement/readability QA for at most one item per day, respecting the rurubu ownership boundary.
4. Do not touch `01_paper-items/rurubu-wedding/` production assets, adoption state, Drive uploads, or Figma until explicit handoff.
