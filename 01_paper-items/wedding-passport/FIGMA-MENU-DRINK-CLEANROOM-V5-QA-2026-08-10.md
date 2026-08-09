# WEDDING PASSPORT — Menu / Drink Clean-room V5 QA

Date: 2026-08-10
State: `VISUAL_REOPENED / MENU_V5_PRODUCTION_PROMOTED / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / PASSPORT_FAMILY_QA_REMAINS`

## Live authority

- latest observed `main` immediately before evidence write: `2664d3627b1afc9ef47edf34827f92045b6bf827`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- page: `02_INSIDE / 1:3`
- production menu identity: `18:90 / FRAME_MENU_DRINK`
- clean-room V5: `112:2 / QA_MENU_DRINK_CLEANROOM_V5_INTEGRATED_EDITORIAL_2026_08_10`
- V5 long-copy stress: `114:2 / QA_MENU_DRINK_CLEANROOM_V5_LONG_COPY_STRESS_2026_08_10`
- rollback: `116:2 / ROLLBACK_MENU_DRINK_PRE_V5_INTEGRATED_EDITORIAL_2026_08_10`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visual diagnosis

The promoted V4 was structurally strong, but the full Passport family screenshot review still exposed one visible template signal: the warm full-height drinks paper field read as a fixed sidebar/card. That made the menu feel closer to a print-styled admin layout than a single editorial paper composition.

The quality bottleneck remained composition, not missing photography.

## Clean-room V5 change

V5 was built from the live production as a rollback-safe comparison and intentionally moved away from the V4 sidebar treatment.

- removed `MENU_V4_DRINK_PAPER_FIELD` completely;
- removed the full-height burgundy separator;
- reduced the top title to the primary Japanese `お料理`, avoiding duplicate stacked title wording;
- integrated the drinks hierarchy directly into the cream page rather than a separate card/paper field;
- enlarged the right-side `お飲みもの` title and widened its content region;
- changed the burgundy accent into a short local anchor beside the drinks heading instead of a full-height divider;
- retained the open left course flow and six semantic course placeholders;
- added a very low-opacity native `乾杯` Japanese typographic atmosphere behind the drinks area; it carries meaning and remains editable text rather than raster decoration;
- extended the allergy rule across the page so the bottom region resolves as one paper composition;
- retained native editable content and explicit semantic dummies.

The first V5 screenshot exposed an accidental two-line `乾杯` wrap and an overlong red accent. Both were corrected in the same run: `乾杯` now stays horizontal and lower-opacity, and the red accent is shortened to a local 190px anchor.

## Screenshot QA

Compared live screenshots at whole/reading/detail scale.

- V4 production: readable but the warm right paper field still reads as a sidebar/card at thumbnail scale;
- V5 clean-room: the right side now belongs to the same paper surface, with stronger asymmetry and less Web/UI-like zoning;
- V5 corrected screenshot: no accidental text wrap in the atmospheric `乾杯`; the red accent no longer divides the page into two UI columns;
- long-copy stress `114:2`: long Japanese course names, descriptions, categories, and drink content remain readable, with expected native wrapping in the right column and no visible collision;
- no generic airplane, passport stamp, badge, gradient, shadow, or stock image was introduced.

V5 is materially stronger than V4 and was promoted to production.

## Long-copy stress

Stress proof `114:2` uses explicit semantic dummy strings only.

- changed semantic text nodes: `22`
- course-name stress: `[長い料理名レイアウト確認用テキスト · LAYOUT DUMMY]`
- course-description stress: `[長い料理説明が入る場合の可読性と改行確認用テキスト · LAYOUT DUMMY]`
- drink-category stress: `[長いカテゴリ名 · LAYOUT DUMMY]`
- drink-content stress: `[長いドリンク内容レイアウト確認用テキスト · LAYOUT DUMMY]`
- frame: `1480 × 2100`
- native text nodes: `41`
- IMAGE-fill nodes: `0`
- text outside frame: `0`

No final menu facts were invented.

## Production promotion and rollback

- production identity remains `18:90 / FRAME_MENU_DRINK`;
- former V4 production is preserved as `116:2 / ROLLBACK_MENU_DRINK_PRE_V5_INTEGRATED_EDITORIAL_2026_08_10`;
- V5 comparison `112:2` remains available;
- V5 long-copy proof `114:2` remains available;
- production guide nodes were restored explicitly after promotion because the inherited V4 production no longer contained them:
  - `GUIDE_BLEED`: `1480 × 2100`, hidden;
  - `GUIDE_TRIM`: `1460 × 2080` at `10,10`, hidden;
  - `GUIDE_SAFE`: `1360 × 1980` at `60,60`, hidden.

## Post-promotion structure readback

Production `18:90`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `41`
- IMAGE-fill nodes: `0`
- text outside frame: `0`
- hidden bleed/trim/safe guides: `3`
- rollback: `116:2 / ROLLBACK_MENU_DRINK_PRE_V5_INTEGRATED_EDITORIAL_2026_08_10`

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed, stored, or placed. The screenshot-supported defect in this run was the sidebar/card composition. Forcing a generic food/travel raster would have hidden rather than solved that defect. Future image generation is still appropriate if a later live screenshot proves the menu needs a specific non-person food/ingredient editorial visual role.

## Drive

Drive authority was re-read immediately before promotion.

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive changes: `0`
- reason: no generated/raster asset was adopted.

## Decision

`MENU_V5_PRODUCTION_PROMOTED / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / STRUCTURE_QA_PASS / PASSPORT_FAMILY_QA_REMAINS / NOT_PRINT_READY`

Do not mark the whole Passport `SELLABLE_VISUAL_QA_PASS` yet. The seating page was also promoted in this run, but the complete front/back/menu/seating family still needs one final same-scale sellable visual gate before progression to BOARDING PASS.
