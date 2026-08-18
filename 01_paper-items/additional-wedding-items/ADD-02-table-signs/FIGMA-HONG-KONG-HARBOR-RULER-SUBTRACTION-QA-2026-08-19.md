# ADD-02 Hong Kong — harbor-ruler subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / HONG_KONG_HARBOR_RULER_SUBTRACTION_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `32a61be90554056906b1b1849383bb056350b888`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Hong Kong production root: `2:56 / FRAME_TABLE_SIGN_HONG_KONG`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Visible problem

Fresh whole-item review showed five evenly spaced cyan `HK_HARBOR_H_*` rules directly beneath the two fixed ochre/red tower blocks. At thumbnail scale the combination read as a bar chart with horizontal grid lines rather than a destination-specific Hong Kong print composition. The large country title, two tower/window blocks, red spine, paper cut, lower Japanese label and table number already carried the hierarchy without the repeated ruler.

## Bounded comparison

Two rollback-safe local comparisons were made from current Hong Kong production:

- `97:2 / QA / ADD-02 HONG KONG / NO HARBOR RULER / 2026-08-19`
- `97:30 / QA / ADD-02 HONG KONG / NO CHART SCAFFOLD / 2026-08-19`

Candidate A hid only `HK_HARBOR_H_1`–`HK_HARBOR_H_5`. Candidate B additionally hid `HK_TOWER_V_1`–`HK_TOWER_V_7`.

At 500px both removed the chart reading. Native `1000×1480` review showed that removing only the visible harbor ruler was sufficient; the more aggressive tower-scaffold subtraction offered no additional visible benefit. Candidate A was therefore the bounded choice rather than deleting all fixed structure.

## Promotion / rollback

- production root remains `2:56`
- only `HK_HARBOR_H_1`–`HK_HARBOR_H_5` are now hidden
- `HK_TOWER_V_1`–`HK_TOWER_V_7`, fixed tower blocks, country title, Japanese label, semantic description placeholder, table number, lower rule and print grain remain unchanged
- fresh pre-change rollback: `98:2 / ROLLBACK / ADD-02 HONG KONG / PRE_HARBOR_RULER_SUBTRACTION / 2026-08-19` (hidden)
- QA comparisons `97:2 / 97:30` hidden after decision
- all other ten production signs unchanged

## QA

- whole / thumbnail 500px: PASS
- actual-size `1000×1480`: PASS
- production size: `1000×1480`
- visible native text: `4`
- visible IMAGE fills: `1`
- text outside root: `0`
- five harbor ruler lines: all hidden

A numeric bounding-box intersection remains between `TXT_HK_NOTE` and `TXT_HK_NO`, but fresh screenshots show no visible glyph collision. No additional geometry change was justified from numeric bounds alone.

## Asset decision

Image generation: `0`.
Drive write: `0`.

The defect was chart-like fixed decoration, not missing imagery.

## Decision

`HONG_KONG_HARBOR_RULER_SUBTRACTION_PASS`. ADD-02 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`; legacy/history and all other country signs remain preserved.