# 青春ふたりきっぷ — Live Contrast QA 2026-08-04

Status: `LIVE_CONTRAST_QA_PASS / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/v7rIRHv8YKQXG0LYD0I5OA
Production frame: `11:2 / FRAME_LABEL / 720 × 250`

## Start state

- GitHub `main` start SHA: `ff30a6c23088d2e05cd1d3625155c7d61c62f500`
- Drive Current authority and reference materials for 青春ふたりきっぷ were live-searchable.
- Figma remote metadata exposed only `00_README`, so the file was programmatically inspected before making any completion judgment.
- Live Figma actually contained `00_README`, `01_LABEL`, and `99_QA`.
- `01_LABEL` contained one visible production frame, `11:2 / FRAME_LABEL`.
- archived legacy frame remained excluded from the production surface.
- no RURUBU/るるぶ target was read or modified.

## Risk examined

The previous run increased the smallest informational text layer from 9 to 10 Figma units. Before any further enlargement or recoloring, this run checked whether the remaining weakness was actually caused by insufficient foreground/background contrast.

The live production colors were read directly from the native Figma nodes:

- paper background `BG_BASE`: approximately `rgb(246, 244, 229)`;
- secondary green text: approximately `rgb(56, 99, 74)`;
- primary dark text: approximately `rgb(31, 41, 36)`;
- gate-stamp blue text: approximately `rgb(20, 71, 120)`.

Calculated WCAG-style luminance contrast against the live paper background:

- secondary green / paper: approximately `6.17:1`;
- primary dark / paper: approximately `13.56:1`;
- gate-stamp blue / paper: approximately `8.56:1`.

These values indicate that the live foreground colors are not the current limiting factor. The unresolved risk remains physical reproduction size, paper/ink behavior, and normal-distance readability at the final measured MINTIA label dimensions.

## Live visual QA

The current `720 × 250` screenshot was checked after the prior microtype adjustment:

- title and route remain the dominant hierarchy;
- DATE / FROM / DESTINATION labels remain distinguishable from their values;
- serial remains readable in the live canvas view;
- the secondary green is visibly subordinate but not washed out;
- blue gate-stamp text remains distinct from the cream paper;
- no clipping, missing content, or new overlap was observed;
- no evidence supported another color, weight, or size change before physical measurement.

## Change decision

Figma change: none.
Drive change: none.
Asset regeneration: none.

Reason: machine contrast QA and live screenshot inspection did not reveal a color-contrast defect. Changing the palette or enlarging more text without the physical MINTIA measurement would be activity-driven rather than evidence-driven and could damage the established ticket hierarchy.

## Structure readback

- production frame remains `11:2 / FRAME_LABEL`;
- size remains `720 × 250`;
- `clipsContent=true`;
- export settings remain empty;
- all inspected variable information remains native editable text;
- no production node was deleted, renamed, flattened, rasterized, or replaced.

## Remaining blocks

- physical MINTIA application-area width, height, corner radius, and non-adhesive zones;
- final mm size, bleed, safe area, and corner treatment;
- print provider minimum reproducible type/line specification;
- final wording and serial-number rule;
- 100% scale test print;
- physical adhesion and normal viewing-distance review;
- final print PDF QA.

Current state:

`LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / UPPER_RIGHT_CLEARANCE_FIX_APPLIED / LIVE_PRINT_GEOMETRY_AUDITED / MICROTYPE_PRINT_LEGIBILITY_FIX_APPLIED / LIVE_CONTRAST_QA_PASS / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
