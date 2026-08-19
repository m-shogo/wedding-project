# ADD-02 Maldives — water-ruler subtraction QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / WATER_RULER_SUBTRACTION_PASS / ROLLBACK_SAFE`
Start authority SHA: `4961c48632e236704a80a552604691d697822918`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- selected Maldives root: `2:92`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- retained family/legacy/history remain preserved.

## Visible problem

Fresh whole-item review showed six evenly spaced horizontal `MV_WATER_1`–`MV_WATER_6` rules filling the dark-water band. Their repeated equal spacing read more like a ruled form/data ledger than water, despite the otherwise strong sky/deep-water/sand fields and native destination hierarchy.

## Bounded comparisons

Two rollback-safe variants were tested from the unchanged selected root:

1. `103:2 / QA / ADD-02 MALDIVES / REDUCED WATER RULER / 2026-08-19`
   - hid only `MV_WATER_2 / 4 / 6`, leaving three horizontal rules plus the separate current line.
2. `103:24 / QA / ADD-02 MALDIVES / SINGLE CURRENT / 2026-08-19`
   - hid all six horizontal water rulers;
   - retained the single existing `MV_DIAGONAL_CURRENT` line.

The first comparison reduced density but still read as a ruler. The second produced the stronger print composition: the dark-water band retained one purposeful current/line while losing the form-like repetition.

## Promotion / rollback

Adopted in production `2:92`:

- `MV_WATER_1`–`MV_WATER_6`: hidden;
- `MV_DIAGONAL_CURRENT`: retained visible;
- sky, deep-water and sand fields unchanged;
- coral disc unchanged;
- country/Japanese labels, semantic country-description placeholder and table number unchanged;
- existing tiled print-grain IMAGE unchanged.

Hidden pre-change rollback:

- `104:2 / ROLLBACK / ADD-02 MALDIVES / PRE_WATER_RULER_SUBTRACTION / 2026-08-19`

Both comparisons are hidden after promotion.

## QA

- whole/thumbnail: PASS;
- actual-size `1000×1480`: PASS;
- visible native text: `4`;
- IMAGE fills: `1`;
- visible text outside root: `0`;
- visible six horizontal water rulers: `0`;
- retained current line: visible.

A numeric text-box overlap between the semantic note box and large table-number box remains detectable in bounds, but fresh actual-size screenshot shows no visible glyph collision; geometry was therefore not changed solely to satisfy bounding-box math.

## Asset decision

Image generation: `0`.
Drive writes: `0`.

The observed defect was repeated native ruler scaffolding, not missing imagery.

## Decision

`WATER_RULER_SUBTRACTION_PASS`.

Maldives remains part of the current ADD-02 selected family with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The transferable lesson is not to erase lines globally; repeated equal rules should prove an actual physical/editorial function at whole-item scale.