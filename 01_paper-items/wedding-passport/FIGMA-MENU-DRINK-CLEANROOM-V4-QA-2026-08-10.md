# WEDDING PASSPORT — Menu / Drink Clean-room V4 QA

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_V4_PRODUCTION_PROMOTED / STRUCTURE_QA_PASS / PASSPORT_FAMILY_QA_REMAINS`

## Live authority

- latest observed `main` immediately before promotion evidence write: `420e1ee8193fbedeceb89e8e1f1129bc7bbc22f4`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- page: `02_INSIDE / 1:3`
- production menu identity: `18:90 / FRAME_MENU_DRINK`
- winning clean-room V4: `108:2 / QA_MENU_DRINK_CLEANROOM_V4_EDITORIAL_SIDEBAR_2026_08_10`
- rollback: `109:2 / ROLLBACK_MENU_DRINK_PRE_V4_EDITORIAL_SIDEBAR_2026_08_10`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visual diagnosis

Former production `18:90` was structurally sound and readable, but in the current Passport family it was the weakest visual page. The promoted cover pair had a strong graphic-editorial identity while the menu still read as a quiet two-column layout separated by one thin vertical rule. At thumbnail scale it looked more like a clean template than a deliberately art-directed print spread.

The visible bottleneck was composition and paper-field hierarchy rather than missing imagery.

## Winning clean-room V4

V4 was created as a rollback-safe comparison first.

- retained the existing native course/drink content hierarchy and semantic placeholders;
- removed the redundant top-right English menu label from the comparison;
- replaced the thin drink divider with a stronger burgundy vertical print accent;
- introduced a full-height warm paper field behind the drink section, using a square-corner print-sidebar treatment rather than a rounded card;
- shifted drink heading, dummy note, and drink flow to sit intentionally within the sidebar field;
- removed the internal drink underline so the sidebar reads as one editorial zone instead of a stack of UI-like modules;
- kept the food course area open and dominant rather than making two equal boxes;
- preserved native text and course/drink editability;
- did not add generic airplane/passport/stamp decoration.

## Screenshot QA and production promotion

The live 1480 × 2100 comparison was inspected before promotion.

- Japanese title remained the dominant signal;
- the drink section read as an inserted paper/stub field instead of a narrow web-style secondary column;
- the burgundy vertical accent created a deliberate asymmetric join between the two information zones;
- no rounded-card/dashboard treatment was introduced;
- no visible text collision or clipping was observed;
- V4 was materially stronger than former production and aligned better with the promoted front/back cover pair.

V4 was therefore promoted while preserving the semantic production frame ID.

- production remains `18:90 / FRAME_MENU_DRINK`
- former production preserved as `109:2 / ROLLBACK_MENU_DRINK_PRE_V4_EDITORIAL_SIDEBAR_2026_08_10`
- comparison `108:2` remains available for audit history
- post-promotion screenshot of `18:90` visually matches the winning V4 comparison

## Post-promotion structure readback

Production `18:90`:

- frame: `1480 × 2100`
- `clipsContent=true`
- top-level children: `20`
- native text nodes: `40`
- IMAGE-fill nodes: `0`
- text outside frame: `0`
- editorial paper-field present: `MENU_V4_DRINK_PAPER_FIELD`

Rollback `109:2`:

- frame: `1480 × 2100`
- `clipsContent=true`
- top-level children: `19`
- native text nodes: `40`
- IMAGE-fill nodes: `0`
- text outside frame: `0`
- V4 paper-field absent, confirming the old production is independently preserved

Previous long-copy/variable-copy evidence remains structural evidence only; this visual pass does not reinterpret it as sellable proof.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed, stored, or placed. Because the current menu defect was composition hierarchy rather than missing photography, the run continued with native Figma art direction instead of forcing generic raster decoration.

## Drive

Drive authority was re-read immediately before this evidence write.

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive changes: `0`
- reason: no generated/raster asset was adopted for this comparison.

## Decision

`MENU_V4_PRODUCTION_PROMOTED / ROLLBACK_SAFE / STRUCTURE_QA_PASS / PASSPORT_FAMILY_QA_REMAINS / NOT_PRINT_READY`

Do not mark the whole Passport `SELLABLE_VISUAL_QA_PASS` yet. The cover pair and menu have now materially advanced in production. Seating remains the unresolved visual choice: production `18:131` versus staggered clean-room V3 `106:69` with long-name stress proof `106:136`.

Next safe target: close the seating family-scale decision. Promote V3 only if it clearly improves the complete Passport family; otherwise explicitly reject it and keep production seating. Then perform the final four-page Passport visual gate before progressing to BOARDING PASS.
