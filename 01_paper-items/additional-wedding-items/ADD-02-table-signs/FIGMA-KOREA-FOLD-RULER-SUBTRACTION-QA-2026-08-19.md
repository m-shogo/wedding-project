# ADD-02 Korea — repeated fold-ruler subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / KOREA_FOLD_RULER_SUBTRACTION_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `50f37972b7c33e74e53ed2f7edd9315c7011f506`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Korea production root: `2:83 / FRAME_TABLE_SIGN_KOREA`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Visible problem

Fresh whole-item review showed five equally spaced thin rules immediately above and into the Korean-name region. Their node names were `KR_FOLD_1`–`KR_FOLD_5`, but visually the repeated parallel set read like form fields / ruled UI rather than a meaningful fold, trim, writing surface or destination-specific print device. Korea already had a strong blue/red/ink block composition, a diagonal cut, large country label and table number.

## Bounded comparison

A local rollback-safe comparison was created:

- `99:2 / QA / ADD-02 KOREA / NO REPEATED FOLD RULER / 2026-08-19`

Only `KR_FOLD_1`–`KR_FOLD_5` were hidden. The Taegeuk-adjacent color blocks, diagonal cut, country and Japanese labels, semantic description placeholder, large `10`, bottom blue/red rule and print grain were unchanged.

At 500px the comparison removed the form/worksheet read and made the lower Japanese information field more deliberate. Native `1000×1480` review retained sufficient visual structure and country identity without the five repeated rules.

## Promotion / rollback

- production root remains `2:83`
- `KR_FOLD_1`–`KR_FOLD_5` hidden
- fresh pre-change rollback: `99:24 / ROLLBACK / ADD-02 KOREA / PRE_FOLD_RULER_SUBTRACTION / 2026-08-19` (hidden)
- QA comparison `99:2` hidden after adoption
- all other country production unchanged

## QA

- whole / thumbnail 500px: PASS
- actual-size `1000×1480`: PASS
- visible native text: `4`
- visible IMAGE fills: `1`
- text outside root: `0`
- visible text intersections: `0`
- `KR_FOLD_1`–`KR_FOLD_5`: all hidden

## Asset decision

Image generation: `0`.
Drive write: `0`.

The defect was repeated form-like native ruling, not missing imagery.

## Decision

`KOREA_FOLD_RULER_SUBTRACTION_PASS`. ADD-02 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`; legacy/history and the remaining country signs stay preserved.