# WEDDING PASSPORT — Menu Placeholder Hierarchy Follow-up

Date: 2026-08-14
State: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / MENU_PLACEHOLDER_HIERARCHY_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before this evidence write: `db3c37100b2d18c4af006c648c060958c8d64ac5`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- menu production: `18:90 / FRAME_MENU_DRINK / 1480×2100`
- rollback: `128:2 / ROLLBACK_MENU_PRE_PLACEHOLDER_HIERARCHY_2026_08_14`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Fresh screenshot diagnosis

Fresh whole/reading/actual-size review confirmed the integrated V5 menu composition remained strong, but 23 semantic placeholders still rendered `LAYOUT DUMMY` at the same visual weight as the guest-facing field. This made the otherwise sellable menu read like a proof/calibration sheet at actual size.

`116:72 / MENU_V3_DUMMY_NOTE` was already sufficiently subordinate and was intentionally left unchanged.

## Production change

A hidden rollback copy was created before editing production. The production root and all semantic fields/geometries were preserved.

Only the ` · LAYOUT DUMMY` suffix was demoted in the remaining 23 native editable text nodes:

- course-name suffixes: `9px`;
- course-description suffixes: `7px`;
- drink-category suffixes: `7px`;
- drink-value suffixes: `8px`;
- allergy suffix: `8px`;
- suffix fill: muted warm-gray with approximately `0.76` opacity.

No menu/drink facts were invented. No rasterization, image replacement, layout redesign, or variable-copy baking was introduced.

## Post-write visual QA

Fresh production screenshot at `1480×2100` confirms:

- the first read is now the semantic menu/drink content rather than proof metadata;
- `LAYOUT DUMMY` remains visible enough to communicate unresolved values without competing with the design;
- course rhythm, drink rail, allergy line, Japanese hierarchy, rules, spacing, and overall V5 composition remain intact;
- no clipping or visible collision was introduced.

## Structural readback

- native text: `41`;
- visible text: `39`;
- visible `LAYOUT DUMMY` nodes: `24` including the intentionally unchanged top note;
- image-fill nodes in menu production: `0`;
- text outside production frame: `0`;
- `clipsContent=true`;
- all 23 edited suffix ranges read back at the intended font sizes and muted warm-gray fill/opacity;
- production remains native/editable and rollback-safe.

## Drive / image decision

Drive authority was live-read before the write and remains unchanged: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`.

- Drive change: `0`;
- generated image: `0`;
- image decision: `IMAGE_GENERATION_NOT_REQUIRED`.

The concrete bottleneck was typography/proof-metadata hierarchy, not a missing hero, texture, background, or editorial image role.

## Remaining deferred work

`NOT_PRINT_READY` remains until final menu/drink copy, allergy wording, physical proof, and vendor/print checks are authoritative.
