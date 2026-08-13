# WEDDING PASSPORT — Menu / Seating Internal Copy Cleanup

Date: 2026-08-13
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- observed latest `main` before this run/write: `83a224683f53ab6b5380aa3ba625677c71a36d12`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- menu production: `18:90 / FRAME_MENU_DRINK`
- seating production: `18:131 / FRAME_SEATING`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Fresh visual diagnosis

Fresh whole/reading/actual-size screenshots found two residual authoring/QA signals that were not appropriate in the visible print composition even though earlier visual gates had passed:

- menu: drink category rows still mixed generic `DUMMY` with `LAYOUT DUMMY`, the upper-right page note was overly implementation-like, and the lower-right `[正式メニュー確定後差し替え]` instruction was visibly exposed;
- seating: the bottom-left `11 TABLES / MAX 7 GUESTS EACH` and bottom-right `FINAL NAMES & TABLE ASSIGNMENTS PENDING` were internal QA/production notes visible to the guest-facing design.

No composition rebuild or new raster was warranted; the underlying V5 menu and V3 seating art direction remains strong.

## Rollback-safe proof

Created hidden production-page rollback duplicates before the edits:

- menu rollback: `125:2 / ROLLBACK_MENU_PRE_NOTE_CLEANUP_2026_08_13`
- seating rollback: `125:71 / ROLLBACK_SEATING_PRE_INTERNAL_FOOTER_CLEANUP_2026_08_13`

Both retain the full 1480×2100 pre-change state.

## Production changes

### Menu `18:90`

- `116:72 / MENU_V3_DUMMY_NOTE`: changed to `[掲載内容 · LAYOUT DUMMY]` and visually subordinated with opacity `0.60`;
- `116:112 / 115 / 118 / 121 / 124`: drink category placeholders normalized from `[カテゴリ · DUMMY]` to `[カテゴリ · LAYOUT DUMMY]`;
- `116:130 / MENU_V3_FOOTER_NOTE`: visible internal replacement instruction hidden;
- all food/drink/allergy variable content remains native editable semantic placeholder text.

### Seating `18:131`

- `110:129 / V2_LAYOUT_DUMMY_NOTE`: retained semantic marker `[ゲスト名・卓配置 · LAYOUT DUMMY]` but visually subordinated with opacity `0.60`;
- `110:189 / V2_FOOTER`: hidden because `11 TABLES / MAX 7 GUESTS EACH` is QA policy, not guest-facing copy;
- `110:190 / V2_FOOTER_NOTE`: hidden because `FINAL NAMES & TABLE ASSIGNMENTS PENDING` is an internal production instruction;
- 11 tables × maximum 7 guest placeholders remain unchanged. No eighth guest was introduced.

## Screenshot QA

Post-write full-frame screenshots at 1100px long edge confirmed:

- menu hierarchy remains `お料理` / `お飲みもの` first, with the semantic page note now subordinate and no visible replacement instruction at the lower-right;
- seating retains the three-column stagger and head-table hierarchy while the bottom QA footer pair is removed from the guest-facing print surface;
- no new collision, clipping, web-UI signal, or empty-box artifact was introduced.

## Structural readback

### Menu `18:90`

- size: `1480×2100`, `clipsContent=true`;
- native text nodes: `41` total / `39` visible;
- IMAGE-fill nodes: `0` inside the production root;
- text outside root: `0`;
- rollback `125:2` exists and is hidden.

### Seating `18:131`

- size: `1480×2100`, `clipsContent=true`;
- native text nodes: `41` total / `39` visible;
- IMAGE-fill nodes: `0` inside the production root;
- text outside root: `0`;
- rollback `125:71` exists and is hidden.

## Image / Drive

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

The concrete defects were visible authoring/QA copy rather than missing imagery, so no substitute raster was generated and no Drive asset was added. Drive authority remained unchanged.

## Decision

The production family remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

Deferred work remains final menu/drink facts, guest names/table assignments, vendor geometry/export profile, and physical proof only.
