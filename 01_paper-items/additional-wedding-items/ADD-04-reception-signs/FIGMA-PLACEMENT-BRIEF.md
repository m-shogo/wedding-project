# ADD-04 受付サイン — FIGMA PLACEMENT BRIEF

Status: `CURRENT / PREPARED_FOR_FIGMA`
Authority: GitHub `main`
Date: 2026-08-02

## Entry condition

Figma work may begin only when Current permits ADD-04 writes. Completed four core paper items remain read-only.

## File/page structure

Create one dedicated page:

`ADD-04_RECEPTION_SIGNS`

Frames:

- `01_GROOM_RECEPTION_A5`
- `02_BRIDE_RECEPTION_A5`
- `03_PAIR_PRESENTATION_QA`
- `04_SHARED_RECEPTION_A6_OPTIONAL`
- `99_PRINT_QA`

Do not place production work on the pages of WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ or るるぶWEDDING.

## Build order

1. set A5 trim, provisional bleed and safe guides;
2. create warm-ivory paper field without card shadow;
3. establish Japanese label hierarchy using native text;
4. add English label and date/location as subordinate information;
5. build groom horizontal route and bride curved route as separate native vectors;
6. create non-gendered destination identifiers;
7. inspect both frames side by side before adding any decoration;
8. add one foil-like rule only if hierarchy needs it;
9. run screenshot QA at frame, pair and actual-size references;
10. remove redundant marks before recording the checkpoint.

## Composition A — Groom

- Japanese label sits left-of-center with a firm horizontal reading line
- longer route enters from the lower left and terminates near the label
- navy carries primary information; silver supports
- negative space remains on the upper right for optional approved surname
- destination mark is compact and architectural, not a badge/sticker

## Composition B — Bride

- Japanese label sits slightly higher with more open lower space
- route curves upward and ends in a larger but lighter destination node
- mint/soft blue supports the same navy typography family
- optional approved surname occupies a different relationship to the label than Groom
- do not mirror Groom mechanically

## Pair presentation

The pair QA frame should simulate:

- two tabletop stands with realistic spacing
- neutral tablecloth background
- guest-eye-level reading order
- equal physical size but intentionally different internal rhythm

The pair must read immediately without requiring the user to inspect English or color.

## Type contract

- Japanese primary labels remain native Figma text
- no outlined or rasterized Japanese text before final printer requirements demand it
- test Japanese font availability before layout lock
- avoid compressed tracking to force fit
- use optical alignment rather than mathematically centering every text block

## Native vector contract

All route lines, nodes and side identifiers must be named semantic nodes. Avoid decorative groups named `Group 1`, `Vector 12` or similar.

Minimum names:

- `PATH_GROOM_ROUTE`
- `NODE_GROOM_DESTINATION`
- `MARK_GROOM_IDENTIFIER`
- `PATH_BRIDE_ROUTE`
- `NODE_BRIDE_DESTINATION`
- `MARK_BRIDE_IDENTIFIER`

## Evidence required before checkpoint

- screenshot of each production frame
- screenshot of paired presentation
- text-overflow audit
- missing-font audit
- node-name audit
- guide visibility/export audit
- statement of whether optional shared A6 header is retained or rejected

## Completion state

A design screenshot pass alone yields:

`DESIGN_QA_PASS / FINAL_NAMES_AND_OPERATIONS_PENDING / NOT_PRINT_READY`

Only exact printer template, approved content, final export QA and physical proof can yield `PRINT_READY`.
