# BOARDING PASS — Figma Placement Preparation

Status: `PREPARATION_100_PERCENT / FIGMA_EXECUTION_PENDING`
Current authority: GitHub `main`
Item: `3. BOARDING PASS`

This document borrows only the **pre-Figma execution method** proven in the Rurubu lane: semantic node names, replace-later placeholders, a strict MCP call budget, and a single restart entrypoint. It does **not** borrow Rurubu visual tone, color, typography, layout, or decoration.

## 1. Restart rule

When Figma becomes available, do not rediscover the project from scratch. Read only:

1. `ASSET-REGISTER.md`
2. `PLACEMENT-PLAN.md`
3. this `FIGMA-PLACEMENT-PREP.md`

Then execute the call plan below. Do not touch `01_paper-items/rurubu-wedding/`.

## 2. Figma file contract

Production rule: **one item = one Figma design file = one URL**.

Proposed file name: `03_BOARDING_PASS_WEDDING_2026-10-24`

Pages inside that file:

- `00_README`
- `01_FRONT`
- `02_BACK`
- `99_QA`

Do not create alternate production files merely to compare cosmetic variants. If a structural comparison is needed, keep variants as named frames inside the same file.

## 3. Working geometry before print lock

Current finished-size intent: `120 x 55 mm` landscape.

For easy Figma construction, use a **provisional working scale of 10 px = 1 mm**:

- trim frame: `1200 x 550`
- 3 mm bleed shell: `1260 x 610`
- provisional 4 mm safe inset from trim: `1120 x 470`
- right stub target: `260–300 px` wide inside trim

This scale is for layout arithmetic only. Final vendor template / exported PDF dimensions override it at print lock.

## 4. Semantic layer tree

### `01_FRONT / FRAME_FRONT`

Use this exact top-to-bottom semantic order:

1. `GUIDE_BLEED` — hidden before export
2. `GUIDE_TRIM` — hidden before export
3. `GUIDE_SAFE` — hidden before export
4. `BG_BASE`
5. `BG_TEXTURE`
6. `BG_PATTERN`
7. `SHAPE_TICKET_OUTLINE`
8. `SHAPE_STUB_DIVIDER`
9. `TXT_BOARDING_PASS`
10. `ICON_PLANE`
11. `GROUP_ROUTE`
12. `TXT_GUEST_NAME`
13. `GROUP_TABLE`
14. `GROUP_GATE`
15. `GROUP_BOARDING_TIME`
16. `DECOR_PRIMARY_STAMP`
17. `DECOR_BARCODE`
18. `QA_OVERLAY` — hidden before export

### `02_BACK / FRAME_BACK`

1. `GUIDE_BLEED`
2. `GUIDE_TRIM`
3. `GUIDE_SAFE`
4. `BG_BASE`
5. `BG_TEXTURE`
6. `BG_PATTERN`
7. `TXT_THANK_YOU_TITLE`
8. `TXT_THANK_YOU_BODY`
9. `TXT_DATE_LOCATION`
10. `DECOR_THANK_YOU_STAMP`
11. `DECOR_ROUTE_OR_DOTS`
12. `QA_OVERLAY`

## 5. Native-text node map

All of these stay editable Figma text. Never replace them with generated raster text.

| Node | Initial placeholder | Final source |
|---|---|---|
| `TXT_BOARDING_PASS` | `BOARDING PASS` | fixed copy |
| `TXT_GUEST_NAME` | `山田 はるか 様` | guest CSV / final guest list |
| `TXT_TABLE_LABEL` | `TABLE` | fixed copy |
| `TXT_TABLE_VALUE` | `07` | guest CSV / table assignment |
| `TXT_FROM_LABEL` | `FROM` | fixed copy |
| `TXT_FROM_VALUE` | `YOKOHAMA` | fixed copy unless later changed |
| `TXT_TO_LABEL` | `DESTINATION` | fixed copy |
| `TXT_TO_VALUE` | `HAPPINESS` | fixed wedding-theme copy |
| `TXT_DATE` | `2026.10.24` | fixed event date |
| `TXT_GATE_LABEL` | `GATE` | fixed copy |
| `TXT_GATE_VALUE` | `W24` | fictional fixed/dummy value |
| `TXT_BOARDING_TIME_LABEL` | `BOARDING TIME` | fixed copy |
| `TXT_BOARDING_TIME_VALUE` | `14:10` | final schedule value |
| `TXT_VENUE` | `VENUE TBD` | final venue label |
| `TXT_THANK_YOU_TITLE` | `THANK YOU FOR COMING` | fixed copy |
| `TXT_THANK_YOU_BODY` | `今日は私たちの旅の1日にご搭乗いただきありがとうございます。` | final thank-you copy |

For text stress, test one deliberately long guest value before FINAL, e.g. `髙橋 アレクサンダー 様`, without changing the approved minimum type size merely to make it fit.

## 6. Fixed-asset placement map

Current Drive authority:

- production root: `1QgPsr8nmMeWoHMBK2GubDWIWi64l9UYE`
- vectors: `1Z2HQp8cTEzheaYSk4WJcnLabJOf3PeHp`
- backgrounds: `1-9QLDRFi1Sz7hGcfHu232eDFdxs9_I19`
- decor/stamps: `1dYvI-9Ajl4DpYaHYziidDkHpYcDidQ_R`

| Figma node | Production asset | Drive ID | Initial placement rule |
|---|---|---|---|
| `ICON_PLANE` | `boarding_plane_v1.svg` | `1fJ4No5VhnnKncNfxfL4CZW9m6Ry9ju59` | small header/route cue |
| `ICON_ROUTE_SUPPORT` | `boarding_globe_v1.svg` OR `boarding_pin_v1.svg` | `1YW2Fs5YqYz8u1iX3sLF8KWvHGJeiRilf` / `1QNzxJJzvTeP7PwmuChmYgvHouXZvo6UA` | choose at most one |
| `ICON_GATE` | `boarding_gate_v1.svg` | `1j2q7pzP9gu3VBk8mCAE2MFSZvp8uJA21` | beside gate text |
| `ICON_SEAT` | `boarding_seat_v1.svg` | `1HXEqkHrfEzF7PQBEd5aiuhyQYn32Xhtz` | optional table/seat cue |
| `DECOR_BARCODE` | `boarding_decorative_barcode_v1.svg` | `1F7CJmUHnOoorS0mPpUTfTkCS3WKjwsCn` | stub only; decorative/non-scannable |
| `BG_TEXTURE_FRONT` | `boarding_paper_texture_ivory_v1.png` | `1Nnw5TaZa1X2NsEb11A5CN2y8vAMdg8kp` | low-strength paper fill |
| `BG_TEXTURE_BACK` | `boarding_paper_texture_white_v1.png` | `1FUHUhZOYusKkPadC3D01N0RtdKM-SPoO` | optional lighter back |
| `BG_PATTERN` | `boarding_route_pattern_v1.svg` OR `boarding_dot_grid_v1.svg` | `1RKguRc-vNnIw_dUxFrHUBkj7S-4zTIBh` / `1NdqFGzMUpDssE0qesJgPvKjc1MIdudgx` | choose one at low opacity |
| `DECOR_PRIMARY_STAMP` | `boarding_stamp_yokohama_happiness_v2.png` | `10NyGH4zHN1jK27-k9vRscJ7Ir3931aOz` | one occurrence max |
| `DECOR_THANK_YOU_STAMP` | `boarding_stamp_thank_you_v1.png` | `1R_ang01qGsjCx_274oxJB1vktI9_rqfR` | back accent |

Do not place assets merely because they exist. Empty space is allowed.

## 7. Layout zoning

Use these normalized zones so placement survives final-size rescaling:

### Front

- left/main zone: approximately `0–76%` of trim width
- right stub: approximately `76–100%`
- title/header band: top `0–22%`
- guest-name priority band: vertical `25–55%`
- route/facts band: vertical `55–82%`
- small factual/footer band: vertical `82–100%`

Hard hierarchy:

1. `TXT_GUEST_NAME`
2. `TXT_TABLE_VALUE`
3. `TXT_BOARDING_PASS`
4. route/date/gate/time
5. decoration

### Back

Reserve the center-left majority for thank-you copy. Keep the secondary stamp and pattern away from the copy safe area.

## 8. Figma Starter execution budget

### CALL 1 — consolidated read

Confirm only:

- correct design file / editor
- page list
- Japanese-capable fonts
- whether exact semantic frames already exist

If access/file/font is wrong, stop. Do not probe randomly.

### CALL 2 — foundation mutation

Create/reuse:

- the four pages
- `FRAME_FRONT` and `FRAME_BACK`
- bleed/trim/safe guides
- native ticket outline
- stub divider / perforation cue
- native text nodes with placeholders

Return IDs and geometry.

### CALL 3 — fixed assets

Place/import all selected SVG/PNG assets in one concentrated pass. Apply semantic names from this document. Do not create alternative files.

### CALL 4 — hierarchy/layout pass

Set typography hierarchy, spacing, alignment, and initial asset opacity/scale. Keep guest name and table number dominant.

### CALL 5 — consolidated QA

Capture front/back screenshots and check:

- text clipping / overflow
- longest-name stress
- table-number readability
- stamp/text overlap
- stub/perforation visibility
- bleed/safe margins
- accidental real-ticket similarity
- duplicate/missing nodes

### CALL 6 — one correction pass

Make only evidence-driven corrections found in Call 5, then capture the post-fix evidence. Do not spend the final call on cosmetic experimentation.

## 9. Replacement / finalization gate

Figma composition may be called `LAYOUT_READY` when:

- all semantic nodes exist,
- no variable copy is rasterized,
- all selected fixed assets resolve to Current Drive authority,
- longest-name/table stress passes,
- no critical text enters trim/stub risk zones,
- front/back screenshots exist.

It is not `PRINT_READY` until the exact printer/template size is rechecked and a physical-size proof is reviewed.

## 10. Current declaration

`PREPARATION_100_PERCENT` means Figma access is the only blocker to starting layout execution. No additional asset generation or rediscovery is required for the first complete placement pass.
