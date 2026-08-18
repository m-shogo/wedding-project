# ADD-02 Taiwan — chart-grid subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / TAIWAN_GRID_SUBTRACTION_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `2a6d959ebbba17bb16ac3719c2723b958b88e3c0`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Taiwan production root: `2:38 / FRAME_TABLE_SIGN_TAIWAN`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- retained production family: all eleven roots remain preserved

## Visible problem

Fresh whole-item review of Taiwan showed nine evenly spaced horizontal/vertical construction lines behind the fixed color blocks. Together with the rectangular amber/cinnabar blocks, those lines read as a bar-chart/dashboard grid rather than destination-specific print art. The country title, Japanese label, large table number, semantic description placeholder, fixed color blocks, route cut and print-grain role already carried the composition without that chart scaffold.

## Bounded comparison

A rollback-safe QA duplicate was created from the current Taiwan production only for local comparison:

- `95:2 / QA / ADD-02 TAIWAN / NO CHART GRID / 2026-08-19`

Only these fixed decorative nodes were hidden in the comparison:

- `TW_GRID_H_1`–`TW_GRID_H_4`
- `TW_GRID_V_1`–`TW_GRID_V_5`

No native copy, country name, table number, semantic country-description placeholder, route cut, color block, print-grain IMAGE role, geometry or other country production was changed.

At 500px the no-grid candidate stopped reading like a chart and retained the intended asymmetric night/city rhythm. Native `1000×1480` review confirmed that the simplified fixed art still had enough visual mass and hierarchy.

## Promotion / rollback

The bounded comparison was adopted to Taiwan only:

- production root remains `2:38`
- nine `TW_GRID_H_* / TW_GRID_V_*` nodes are now hidden
- fresh pre-change rollback: `96:2 / ROLLBACK / ADD-02 TAIWAN / PRE_GRID_SUBTRACTION / 2026-08-19` (hidden)
- QA comparison `95:2` hidden after adoption
- all other ten production signs unchanged

## Three-scale / structure QA

- whole / thumbnail 500px: PASS
- reading / native-size equivalent: PASS
- actual-size `1000×1480`: PASS
- production size: `1000×1480`
- visible native text: `4`
- visible IMAGE fills: `1` (`IMG_PRINT_GRAIN_REPLACEABLE`)
- text outside root: `0`
- nine chart-grid nodes: all hidden

A numeric bounding-box intersection between `TXT_TW_NOTE` and `TXT_TW_NO` remains detectable because their text boxes extend into the same region, but fresh 500px and actual-size screenshots show no visible glyph collision; no geometry change was justified from bounds alone.

## Asset decision

Image generation: `0`.
Drive write: `0`.

The defect was excess chart-like native decoration, not missing imagery. Existing print grain and Drive authority remain unchanged.

## Decision

`TAIWAN_GRID_SUBTRACTION_PASS`. ADD-02 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`; legacy/history and all other country signs remain preserved.