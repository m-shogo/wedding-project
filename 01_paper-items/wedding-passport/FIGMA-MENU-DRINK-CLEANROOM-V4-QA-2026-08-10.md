# WEDDING PASSPORT — Menu / Drink Clean-room V4 QA

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_V4_CREATED / STRUCTURE_QA_PASS / PRODUCTION_NOT_PROMOTED`

## Live authority

- latest observed `main` immediately before evidence write: `1fbc956fcbc79540b1b6a3b14d6f938d942f700f`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- page: `02_INSIDE / 1:3`
- production menu: `18:90 / FRAME_MENU_DRINK`
- new clean-room V4: `108:2 / QA_MENU_DRINK_CLEANROOM_V4_EDITORIAL_SIDEBAR_2026_08_10`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visual diagnosis

Production `18:90` is structurally sound and readable, but in the current Passport family it is the weakest visual page. The promoted cover pair now has a strong graphic-editorial identity while the menu still reads as a quiet two-column layout separated by one thin vertical rule. At thumbnail scale it looks more like a clean template than a deliberately art-directed print spread.

The visible bottleneck is composition and paper-field hierarchy rather than missing imagery.

## Clean-room V4 change

Created V4 as a rollback-safe duplicate; production was not edited.

- retained the existing native course/drink content hierarchy and semantic placeholders;
- removed the redundant top-right English menu label from the comparison;
- replaced the thin drink divider with a stronger burgundy vertical print accent;
- introduced a full-height warm paper field behind the drink section, using a square-corner print-sidebar treatment rather than a rounded card;
- shifted drink heading, dummy note, and drink flow to sit intentionally within the sidebar field;
- removed the internal drink underline so the sidebar reads as one editorial zone instead of a stack of UI-like modules;
- kept the food course area open and dominant rather than making two equal boxes;
- preserved native text and course/drink editability;
- did not add generic airplane/passport/stamp decoration.

This creates a materially different comparison while maintaining the same print size and content capacity.

## Screenshot QA

The live 1480 × 2100 render was inspected after the edit.

- Japanese title remains the dominant signal;
- the drink section now reads as an inserted paper/stub field instead of a narrow web-style secondary column;
- the burgundy vertical accent creates a deliberate asymmetric join between the two information zones;
- no rounded-card/dashboard treatment was introduced;
- no visible text collision or clipping was observed;
- the comparison is visually stronger than production at thumbnail and reading scale, but production is not promoted yet because the full Passport family comparison still needs to close together with seating V3.

## Structure readback

V4 `108:2`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `40`
- IMAGE-fill nodes: `0`
- text outside frame: `0`
- editorial paper-field node: `108:67 / MENU_V4_DRINK_PAPER_FIELD`, native rectangle, `420 × 1375`

Previous long-copy/variable-copy evidence remains structural evidence only; this visual pass does not reinterpret it as sellable proof.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed, stored, or placed. Because the current menu defect is composition hierarchy rather than missing photography, the run continued with native Figma art direction instead of forcing generic raster decoration.

## Drive

Drive authority was re-read immediately before this evidence write.

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive changes: `0`
- reason: no generated/raster asset was adopted for this comparison.

## Decision

`CLEANROOM_V4_CREATED / STRUCTURE_QA_PASS / VISUAL_COMPARISON_ADVANCE / PRODUCTION_NOT_PROMOTED / NOT_PRINT_READY`

Next safe target: perform one same-scale Passport family comparison using production covers `18:2 / 18:46`, production menu `18:90`, menu V4 `108:2`, production seating `18:131`, and seating V3 `106:69`. Promote only the comparison pages that clearly improve the family as a whole while preserving rollback. If the family still has a weak page, continue the weakest Passport page before moving to BOARDING PASS.
