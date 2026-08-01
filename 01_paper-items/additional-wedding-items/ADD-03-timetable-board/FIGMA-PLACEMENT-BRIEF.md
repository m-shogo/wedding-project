# ADD-03 当日タイムテーブルボード — FIGMA PLACEMENT BRIEF

Status: `CURRENT / PREPARED_FOR_FIGMA`
Date: 2026-08-02

## File contract

- one item = one Figma file = one URL
- proposed file name: `ADD-03_TIMETABLE_BOARD_2026-10-24`
- pages:
  - `00_README`
  - `01_A2_PRIMARY`
  - `02_A3_COMPARISON`
  - `99_QA`

A3 is a comparison/layout-adaptation frame, not an automatic scale-down of A2.

## Primary frame

`01_A2_PRIMARY / FRAME_TIMETABLE_BOARD`

Provisional 10 px = 1 mm working geometry:

- trim: `4200 × 5940`
- 3 mm bleed shell: `4260 × 6000`
- 12 mm safe inset from trim: `3960 × 5700`

Exact printer template overrides these values before print lock.

## Composition

Use a single vertical journey spine rather than identical event cards.

- top 0–18%: title/date/location
- 18–48%: Ceremony origin block
- 48–58%: transfer interval; visibly provisional until confirmed
- 58–88%: Reception destination block, largest narrative field
- 88–100%: closing note and quiet footer

The route should move slightly left/right instead of being mechanically centered, while every time remains aligned to a hidden typographic grid.

## First-pass visual hierarchy

- title: editorial serif or refined sans, not split-flap display
- event time: strongest sans/condensed figure style
- event label: medium contrast
- note copy: smallest but still legible at distance
- one gold micro-rule or direction mark maximum per major section
- background watermark opacity low enough to disappear before text hierarchy

## Semantic layer order

1. `GUIDE_BLEED`
2. `GUIDE_TRIM`
3. `GUIDE_SAFE`
4. `BG_PAPER_IVORY`
5. `BG_ROUTE_WATERMARK`
6. `PATH_DAY_ROUTE`
7. `NODE_CEREMONY`
8. `NODE_TRANSFER`
9. `NODE_RECEPTION`
10. `TXT_TIMELINE_TITLE`
11. `TXT_TIMELINE_DATE_LOCATION`
12. `GROUP_EVENT_CEREMONY`
13. `GROUP_TRANSFER_TBD`
14. `GROUP_EVENT_RECEPTION`
15. `TXT_CLOSING_NOTE`
16. `QA_OVERLAY`

## Text placeholders

- title: `OUR WEDDING JOURNEY`
- date/location: `2026.10.24 SAT · YOKOHAMA`
- ceremony time: `14:10–14:40`
- ceremony label: `CEREMONY`
- ceremony note: editable placeholder only
- transfer time: `14:40–15:00`
- transfer label: `TBD` until approved
- reception time: `15:00–17:30`
- reception label: `RECEPTION`
- reception note: editable placeholder only
- closing: `Thank you for traveling with us.`

## Execution sequence

1. verify file, fonts and page list
2. create A2 shell, guides and semantic text containers
3. draw route and three nodes as native vectors
4. populate only confirmed facts; leave provisional fields as `TBD`
5. screenshot whole board and actual-size details
6. correct only evidence-backed hierarchy/readability defects
7. adapt—not scale—the A3 comparison if needed
8. record node IDs and final screenshots in Git

## Do not

- import ADD-01 route/compass PNGs by default
- edit completed four-item Figma files
- invent missing schedule information
- use rounded UI cards for every row
- spend the final QA pass adding decoration
