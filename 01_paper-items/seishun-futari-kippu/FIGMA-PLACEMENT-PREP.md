# 青春ふたりきっぷ — Figma Placement Preparation

Status: `PREPARATION_100_PERCENT / FIGMA_EXECUTION_PENDING`
Current authority: GitHub `main`
Item: `4. 青春ふたりきっぷ`

This document borrows only the **pre-Figma execution method** proven in the Rurubu lane: semantic node names, replace-later-safe structure, concentrated Figma operations, and a strict restart order. It does **not** borrow Rurubu visual tone, palette, typography, composition, or decoration.

## 1. Restart rule

When Figma becomes available, read only:

1. `ASSET-REGISTER.md`
2. `PLACEMENT-PLAN.md`
3. this `FIGMA-PLACEMENT-PREP.md`

Do not reopen historical ZIP/preview material unless a Current asset is actually missing. Do not modify `01_paper-items/rurubu-wedding/`.

## 2. Figma file contract

Production rule: **one item = one Figma design file = one URL**.

Proposed file name: `04_SEISHUN_FUTARI_KIPPU_2026-10-24`

Pages:

- `00_README`
- `01_LABEL`
- `99_QA`

The production face is front-only.

## 3. Provisional working geometry

Current direction uses an approximately `72 x 25 mm` flat label area, still requiring a real MINTIA-case measurement before print lock.

For layout arithmetic only, use **10 px = 1 mm**:

- provisional trim: `720 x 250`
- provisional 3 mm bleed shell: `780 x 310`
- provisional 3 mm safe inset: `660 x 190`

Do not treat these values as final print dimensions until the physical case is measured.

## 4. Semantic layer tree

### `01_LABEL / FRAME_LABEL`

Use this exact back-to-front semantic order:

1. `GUIDE_BLEED` — hidden before export
2. `GUIDE_TRIM` — hidden before export
3. `GUIDE_SAFE` — hidden before export
4. `BG_BASE`
5. `BG_GUILLOCHE_NATIVE`
6. `SHAPE_TICKET_FRAME`
7. `TXT_TITLE`
8. `TXT_SUBTITLE`
9. `GROUP_ROUTE`
10. `ICON_TRAIN`
11. `GROUP_FACTS`
12. `TXT_PHRASE`
13. `DECOR_SHUKU_STAMP`
14. `DECOR_GATE_STAMP`
15. `DECOR_SUPPORT_MARKS`
16. `QA_OVERLAY` — hidden before export

`BG_GUILLOCHE_NATIVE` should be simple Figma-native geometry/pattern treatment. It is not a missing image asset and must remain subtle enough that small ticket text stays clear.

## 5. Native-text node map

| Figma node | Initial / Current copy | Final source |
|---|---|---|
| `TXT_TITLE` | `青春ふたりきっぷ` | fixed copy |
| `TXT_SUBTITLE` | `WEDDING JOURNEY TICKET` | fixed copy |
| `TXT_ROUTE` | `新郎駅 → 新婦駅 → 未来行き` | fixed copy |
| `TXT_DATE` | `2026.10.24` | fixed date |
| `TXT_ISSUE_NO` | `No.1024` | fixed copy |
| `TXT_PHRASE` | `旅のはじまりは、あなたと。` | fixed copy; may be omitted only if actual-size proof fails legibility |

These remain Figma-native. Do not rasterize the title or route copy.

## 6. Fixed-asset placement map

Current Drive authority:

- production root: `1KsF80iBOynFy5RdTjPM7grQXClzXW4Tv`
- vectors: `1bhhltc5APlthGbisvFvYzeJMdDyM52au`
- decor/stamps: `1Mh7acGiT3cw4NQE29Ew2eJiNDtlNTIqF`

| Figma node | Production asset | Drive ID | Initial role |
|---|---|---|---|
| `SHAPE_TICKET_FRAME` | `seishun_ticket_frame_v1.svg` | `1egVANlbNyaC-Z-t53l7Quo5w6cIM-12q` | primary thin ticket frame |
| `ROUTE_GEOMETRY` | `seishun_route_v1.svg` | `1U7cbVpsYrubKCEQxtR9Wjr2fzFyUEQkr` | secondary route cue |
| `ICON_TRAIN` | `seishun_train_icon_v1.svg` | `145klnQiSp1ss9xXbAb-0o-In02pv7IyY` | principal fixed illustration |
| `DECOR_BARCODE` | `seishun_decorative_barcode_v1.svg` | `1B2WRVxmuT_-Z6Ht5o2CjUjM6pDdrJVB-` | optional small decorative mark only |
| `ICON_PIN` | `seishun_pin_v1.svg` | `1tJ1a_fpAEw-qN6heiRhaexxsVnv54IoO` | optional supporting mark |
| `ICON_RAIL` | `seishun_rail_v1.svg` | `1A-tJXDC0asLvzdl-miAvyzmXZiTEIs_0` | optional supporting mark |
| `ICON_STATION` | `seishun_station_v1.svg` | `1T8uusECJLin4A2hGr8NF2QaglgJhd7XS` | optional supporting mark |
| `ICON_CALENDAR` | `seishun_calendar_v1.svg` | `1kGE2dGh_iWtPtKb7KfSDuazETndko6KU` | optional date support |
| `DECOR_SHUKU_STAMP` | `seishun_stamp_shuku_red_v2_centered.png` | `18IfyAhcrnW16shx-rYrSMPWnYfStZfqz` | red primary accent; one use |
| `DECOR_GATE_STAMP` | `seishun_stamp_gate_blue_v1.png` | `1TkdqzYldyQc8kB6nxl4os8NGF28i_GM9` | blue secondary accent; one use |

Do not place every optional icon. The small format must not become an icon catalog.

## 7. First-pass layout zoning

Use normalized zones so the layout survives exact-size correction later:

- title/subtitle band: top `0–34%`
- route band: `30–58%`
- date / issue facts: `55–82%`
- phrase / small supporting detail: `78–100%`
- red/blue stamps: edge/overlap accents only, never covering title, route, date, or issue number

Recommended first composition:

- title left/center dominant
- subtitle close to title but clearly secondary
- route text/geometry as the second-largest information group
- train icon small and balanced against facts
- red `祝` stamp and blue gate stamp placed at opposite visual tensions rather than stacked together
- supporting pin/rail/station/calendar limited to zero, one, or two based on empty-space balance

## 8. Figma Starter execution budget

### CALL 1 — consolidated read

Confirm:

- correct design file/editor
- page list
- Japanese-capable fonts
- whether `FRAME_LABEL` already exists

If access/font/file is wrong, stop. Do not spend calls rediscovering history.

### CALL 2 — foundation mutation

Create/reuse:

- all three pages
- `FRAME_LABEL`
- bleed/trim/safe guides
- background base
- native guilloche placeholder
- all native text nodes with exact semantic names

Return IDs and geometry.

### CALL 3 — fixed asset placement

Import/place:

- ticket frame
- route geometry
- train icon
- accepted red/blue PNG stamps
- only the supporting icons actually needed by the first composition

Do not import the legacy flat stamp SVGs.

### CALL 4 — hierarchy / actual-size simulation

Set first-pass type hierarchy, alignment, asset scaling, and stamp placement. Produce an on-canvas `10 px = 1 mm` actual-size reference annotation in `99_QA`, not on the export frame.

### CALL 5 — consolidated screenshot QA

Check:

- title legibility
- route readability
- date / `No.1024` readability
- whether bottom phrase survives at expected print size
- red `祝` optical centering after placement
- blue stamp not overpowering the copy
- decorative barcode not reading as operational code
- no JR/operator resemblance
- no bleed/safe-area violations
- duplicate/missing nodes

### CALL 6 — one evidence-driven correction pass

Fix only failures found in Call 5, then capture post-fix evidence. Do not use the final call to add more decoration.

## 9. Physical replacement / final gate

Before `PRINT_READY`:

1. physically measure the actual label application area on the MINTIA case,
2. update frame/bleed/safe values if needed while preserving normalized layout relationships,
3. print one copy at 100% scale,
4. apply it to the actual case,
5. verify title/route/date readability from normal hand-held viewing distance,
6. verify corners/edges/adhesion and water resistance if that stock is used.

A physical-size change must not trigger asset regeneration unless a concrete asset defect appears.

## 10. Current declaration

`PREPARATION_100_PERCENT` means Figma access is the only blocker to the first complete placement pass. All Current fixed assets, semantic node names, initial geometry, and QA steps are already defined.
