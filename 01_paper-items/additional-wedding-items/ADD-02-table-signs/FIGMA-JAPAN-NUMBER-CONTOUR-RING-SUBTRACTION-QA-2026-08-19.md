# ADD-02 Japan table sign — number contour-ring subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / JAPAN_NUMBER_RING_SUBTRACTION_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Start authority SHA: `69b5476cb8af5a50d3f34be3dd7bdea684e9ef22`

## Authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Japan production: `2:47 / FRAME_TABLE_SIGN_JAPAN`
- Drive: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
- other ten country signs unchanged.

## Visible issue
Fresh native `1000×1480` review found the thin `JP_CONTOUR_RING` encircling table number `06` behaving like a badge/widget boundary rather than a meaningful Japanese/destination or physical table-sign device. The number is already large and immediately readable. The red sun, black field, horizon strokes, Japanese name block and left rust binder provide sufficient composition and country identity.

This was tested only on Japan; no family-wide rule or visual homogenization was applied.

## Bounded comparison
Rollback-safe candidate:
- `93:2 / QA / ADD-02 JAPAN / NO NUMBER CONTOUR RING / 2026-08-19`

Only `JP_CONTOUR_RING` was hidden. The following were preserved:
- `06` native table number;
- `JAPAN / 日本`;
- native country-description placeholder;
- red sun;
- landscape strokes;
- left rust vertical binder;
- print-grain IMAGE role;
- frame/safe geometry.

Native-size comparison was stronger without the circle: the lower field reads as editorial type and number rather than a contained badge, while `06` remains equally scannable.

## Promotion / rollback
- production `21:343 / JP_CONTOUR_RING`: hidden
- hidden pre-change rollback: `94:2`
- comparison `93:2`: hidden after adoption
- other country signs and historical rollbacks: unchanged

## QA
- whole / reading / actual `1000×1480`: PASS
- visible native text: `4`
- IMAGE fills: `1` (existing replaceable print grain)
- outside visible text: `0`
- variable copy remains native/editable

## Asset decision
Image generation: `0`. Drive write: `0`. Existing grain master remains unchanged. The defect was non-semantic containment around a number, not missing imagery.

## Decision
`JAPAN_NUMBER_RING_SUBTRACTION_PASS`. ADD-02 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`.