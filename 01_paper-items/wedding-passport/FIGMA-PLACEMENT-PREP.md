# WEDDING PASSPORT — Figma Placement Preparation

Status: `PREPARATION_100_PERCENT / FIGMA_EXECUTION_PENDING`
Current authority: GitHub `main`
Item: `2. WEDDING PASSPORT`

This document borrows only the **pre-Figma execution method** proven in the Rurubu lane: semantic node naming, replace-later placeholders, concentrated Figma operations, and a single restart entrypoint. It does **not** borrow Rurubu visual tone, palette, typography, composition, or decoration.

## 1. Restart rule

When Figma becomes available, read only:

1. `ASSET-REGISTER.md`
2. `PLACEMENT-PLAN.md`
3. this `FIGMA-PLACEMENT-PREP.md`

Do not rediscover historical design notes during the Figma budget window. Do not modify `01_paper-items/rurubu-wedding/`.

## 2. Figma file contract

Production rule: **one item = one Figma design file = one URL**.

Proposed file name: `02_WEDDING_PASSPORT_2026-10-24`

Pages:

- `00_README`
- `01_OUTSIDE`
- `02_INSIDE`
- `99_QA`

`01_OUTSIDE` contains independent `FRAME_BACK_COVER` and `FRAME_FRONT_COVER` frames.
`02_INSIDE` contains independent `FRAME_MENU_DRINK` and `FRAME_SEATING` frames.

Their side-by-side review order is not printer imposition authority. Exact vendor template/order wins at print lock.

## 3. Provisional working geometry

Current format intent: A5 portrait class.

For straightforward layout arithmetic, use a provisional **10 px = 1 mm** working scale:

- trim page: `1480 x 2100`
- 3 mm bleed shell: `1540 x 2160`
- 5 mm safe inset from trim: `1380 x 2000`
- two-page review spread: `2960 x 2100` trim-only, before any gutter/view gap

These numbers are layout-prep coordinates, not final printer authority. Rebuild/scale onto the exact current vendor template before print lock if required.

## 4. Semantic frame / layer tree

### `01_OUTSIDE / FRAME_FRONT_COVER`

1. `GUIDE_BLEED`
2. `GUIDE_TRIM`
3. `GUIDE_SAFE`
4. `BG_COVER_NAVY`
5. `BG_COVER_PATTERN`
6. `DECOR_COVER_EMBLEM`
7. `TXT_WEDDING_PASSPORT`
8. `TXT_COVER_DATE`
9. `TXT_COVER_LOCATION`
10. `TXT_COVER_SUBTITLE`
11. `QA_OVERLAY`

### `01_OUTSIDE / FRAME_BACK_COVER`

1. `GUIDE_BLEED`
2. `GUIDE_TRIM`
3. `GUIDE_SAFE`
4. `BG_BACK`
5. `BG_BACK_PATTERN`
6. `TXT_BACK_TITLE`
7. `TXT_BACK_ITINERARY`
8. `TXT_BACK_THANK_YOU`
9. `DECOR_BACK_STAMP`
10. `QA_OVERLAY`

### `02_INSIDE / FRAME_MENU_DRINK`

1. `GUIDE_BLEED`
2. `GUIDE_TRIM`
3. `GUIDE_SAFE`
4. `BG_INTERIOR`
5. `BG_INTERIOR_PATTERN`
6. `ICON_MENU`
7. `TXT_MENU_TITLE`
8. `AREA_MENU_COPY`
9. `DIVIDER_MENU_DRINK`
10. `ICON_DRINK`
11. `TXT_DRINK_TITLE`
12. `AREA_DRINK_COPY`
13. `QA_OVERLAY`

`AREA_MENU_COPY` and `AREA_DRINK_COPY` should use layout containers that allow final copy replacement without manual repositioning of every line.

### `02_INSIDE / FRAME_SEATING`

1. `GUIDE_BLEED`
2. `GUIDE_TRIM`
3. `GUIDE_SAFE`
4. `BG_SEATING`
5. `BG_SEATING_PATTERN`
6. `ICON_SEATING`
7. `TXT_SEATING_TITLE`
8. `GROUP_HEAD_TABLE`
9. `GROUP_TABLE_01`
10. `GROUP_TABLE_02`
11. `GROUP_TABLE_03`
12. `GROUP_TABLE_04`
13. `GROUP_TABLE_05`
14. `GROUP_TABLE_06`
15. `GROUP_TABLE_07`
16. `GROUP_TABLE_08`
17. `GROUP_TABLE_09`
18. `GROUP_TABLE_10`
19. `GROUP_TABLE_11`
20. `QA_OVERLAY`

Each `GROUP_TABLE_NN` contains only Figma-native geometry/text:

- `TABLE_NN_SHAPE`
- `TABLE_NN_LABEL`
- `TABLE_NN_GUESTS`

Do not rasterize the seating chart.

## 5. Native-text / replace-later map

| Semantic node | Initial placeholder | Final replacement |
|---|---|---|
| `TXT_WEDDING_PASSPORT` | `WEDDING PASSPORT` | fixed copy |
| `TXT_COVER_DATE` | `2026.10.24` | fixed date |
| `TXT_COVER_LOCATION` | `YOKOHAMA` | fixed/location copy |
| `TXT_COVER_SUBTITLE` | `OUR WEDDING JOURNEY` | final subtitle if retained |
| `TXT_MENU_TITLE` | `MENU` | fixed copy |
| `AREA_MENU_COPY` | dummy multi-course menu copy | final venue menu |
| `TXT_DRINK_TITLE` | `DRINK` | fixed copy |
| `AREA_DRINK_COPY` | dummy drink-category copy | final venue drink list |
| `TXT_SEATING_TITLE` | `SEATING CHART` | fixed copy |
| `TXT_HEAD_TABLE_LABEL` | `BRIDE & GROOM` | final head-table label |
| `TABLE_01_LABEL` ... `TABLE_11_LABEL` | `TABLE 01` ... `TABLE 11` | final table names/numbers |
| `TABLE_01_GUESTS` ... `TABLE_11_GUESTS` | dummy guest lines | final seating data |
| `TXT_BACK_TITLE` | `WEDDING JOURNEY` | final back-cover heading |
| `TXT_BACK_ITINERARY` | short dummy itinerary | final itinerary / note |
| `TXT_BACK_THANK_YOU` | short dummy thank-you | final copy |

Dummy text is layout-only. Never ship a final PDF with dummy values.

## 6. Fixed-asset placement map

Current Drive authority:

- production root: `1G4b7Qhtj6Ng7RRREtN_us4eKnwvCbWA6`
- vectors: `1zs8Y7jVKW7xqng_U9Hr2aKZxyySbbym2`
- backgrounds: `1CYOKUBqEh6koqWUY8zEehHxEosoXv1Tx`
- decor/stamps: `1SGR08lb0EOkLzjRS3b8wScBZv2Gr3kZG`

| Figma node | Production asset | Drive ID | Initial role |
|---|---|---|---|
| `DECOR_COVER_EMBLEM` | `passport_emblem_globe_plane_laurel_v2.png` | `1DRuep9shagE_007KEIHY7NmKcxA4HzRc` | one centered cover identity |
| `ICON_COVER_SUPPORT_PLANE` | `passport_plane_v1.svg` | `1TCzwQxBRKwlzfOSUf6zNA0oA84v5ilQh` | optional small cue only |
| `ICON_FOLIO_GLOBE` | `passport_globe_v1.svg` | `1svje75vn0DabCSh8BdB6ilAfVahByTIz` | optional interior cue |
| `ICON_FOLIO_COMPASS` | `passport_compass_v1.svg` | `1obYVHiPF3PH95V53g0Y8tharjJSv2UFw` | optional interior cue |
| `ICON_MENU` | `passport_utensils_v1.svg` | `1-7DY0RZZOo4bOv5BN5QdtQ4UAn4llTzh` | MENU section cue |
| `ICON_DRINK` | `passport_wine_v1.svg` | `1JMCI37kPr2Jw8_NcvkO61Kbl9g4cyPmF` | DRINK section cue |
| `ICON_SEATING` | `passport_table_v1.svg` | `1ePet7OMntW9-pGN59ku0FuKSf3DcSPrc` | seating section cue only |
| `BG_INTERIOR` | `passport_paper_texture_ivory_v1.png` | `1_rEilwWnVKsU0dZoYPwKpnr2SpfT5qTQ` | preferred interior texture |
| `BG_SEATING` | `passport_paper_texture_white_v1.png` | `1RgycJ_cWh3wwmlglIiHeCHbk19aiqfxj` | optional cleaner seating base |
| `BG_INTERIOR_PATTERN` | `passport_route_pattern_v1.svg` OR `passport_dot_grid_v1.svg` | `1DP2tcgw0eag1tiQYx7MC0V36JyHqIpMe` / `1QU2UEnYPx5Yqjn2fhqmrVY8p4PesGKM9` | low-opacity support only |
| `DECOR_BACK_STAMP` | `passport_stamp_yokohama_date_v1.png` | `1oTxcKrp2yxDJBauK3z97trK0iK15flcq` | one muted-red back accent |

Historical `assets/passport-emblem-compass-airplane.svg` remains `FALLBACK / ARCHIVE`; do not place it as Current cover identity.

## 7. Layout zoning

### Front cover

- top `0–22%`: title/date/location area
- middle `20–76%`: primary emblem visual field
- bottom `76–100%`: optional subtitle / small supporting copy

Keep the emblem visually central but leave enough negative space that the cover still reads as a premium paper object rather than a badge sheet.

### MENU & DRINK

- outer safe margins fixed first
- MENU and DRINK content may use either vertical split or stacked blocks, but both must remain inside named containers
- menu/drink copy must be editable without moving decorative assets
- only one low-opacity background pattern per page

### SEATING CHART

Start with a clean 11-table semantic shell, not final physical table positions. The first objective is fitting all names legibly at actual size.

Recommended first-pass structure:

- title / legend band: top `0–14%`
- head-table zone: `14–28%`
- guest-table field: `28–94%`
- footer/notes: `94–100%`

Arrange the 11 groups into a balanced grid for the first proof. Exact real-room geometry can replace the grid later without renaming guest/table nodes.

### Back cover

Reserve a clean text-safe zone first; place the red fictional stamp after copy fit is confirmed.

## 8. Figma Starter execution budget

### CALL 1 — consolidated read

Confirm:

- correct file/editor
- page list
- Japanese-capable fonts
- existing styles/variables worth reusing
- whether exact semantic frames already exist

If access/font/file is wrong, stop instead of random probing.

### CALL 2 — shell mutation

Create/reuse:

- all four semantic frames
- bleed/trim/safe guides
- page background shapes
- native text containers
- 11 seating-table groups

Return IDs and geometry.

### CALL 3 — fixed asset import/placement

Place Current emblem, section icons, textures, one selected pattern, and back stamp. Keep all names from this document.

### CALL 4 — dummy content / fit pass

Populate menu/drink dummy copy, 11 dummy seating groups, cover/back copy placeholders. The purpose is fit testing, not final wording.

### CALL 5 — consolidated screenshot / stress QA

Capture all four frames and check:

- cover emblem optical centering / edge quality
- menu and drink overflow
- longest menu/drink line behavior
- seating readability across all 11 groups
- longest guest-name stress
- pattern/texture contrast
- stamp/text overlap
- safe/bleed proximity
- duplicate/missing semantic nodes

### CALL 6 — evidence-driven corrections only

Correct failures from Call 5 and capture final post-fix evidence. Do not use the last call for exploratory decoration.

## 9. Replacement gate

Final content replacement is complete only when:

1. all menu/drink dummy copy is replaced,
2. all 11 seating guest blocks use final data,
3. no overflow forces type below the approved print minimum,
4. all variable copy remains native text,
5. final screenshots exist after replacement.

## 10. Print gate

`LAYOUT_READY` is not `PRINT_READY`.

Before PRINT_READY:

- use the exact current printer/template dimensions,
- verify page order / imposition,
- inspect thin rules and small table labels at actual size,
- inspect gold/navy output on the selected paper stock,
- run one physical proof before bulk printing.

## 11. Current declaration

`PREPARATION_100_PERCENT` means the first complete Figma placement pass can begin immediately when Figma access returns. No additional fixed-asset generation, placeholder discovery, or node-naming work is required first.
