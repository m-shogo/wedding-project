# ADD-13 メッセージカード — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- selected page: `48:2 / SELECTED / VNEXT PRO / ADD-13 / SUNSHINE POSTCARD / 2026-08-21`
- selected front: `48:3 / VNEXT_SELECTED_CANDIDATE / ADD13 / FRONT / SUNSHINE POSTCARD`
- selected back: `48:21 / VNEXT_SELECTED_CANDIDATE / ADD13 / BACK / AFTERGLOW LETTER`
- hidden long-copy front/back: `48:39 / 48:57`
- three-direction concept page: `47:2`
- retained prior clean-room V6: `27:2 / 27:3 / 27:4` — comparison/rollback/history only
- retained legacy production: `1:3 / 1:13` — comparison/rollback/history only
- Drive folder: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`

Canonical vNext evidence:
- `PROFESSIONAL-VNEXT-SUNSHINE-POSTCARD-QA-2026-08-21.md`

Drive metadata was re-read live. Drive write: `0`.

## Clean-room vNext

The professional vNext was built from blank frames without using retained V6/legacy visual construction as an authoring source. Only verified requirements were carried forward: A6 landscape `148×105 mm`, duplex role, >=55% handwriting area, editable title/prompt/name/date roles, print/readability constraints, and unresolved-input boundaries.

Three new directions were authored:
- `47:3 / SUNSHINE POSTCARD` — selected;
- `47:18 / OCEAN LETTER` — stronger contrast but too heavy for the front role;
- `47:34 / BREEZE LETTER` — rejected because its rounded white writing field read too much like a UI card.

## Current visual direction

### Front `48:3`
- warm cream writing surface;
- Japanese-first `ふたりへ、旅のおみやげを。`;
- coral / sunlight / mint crop-through movement;
- broad open writing rules rather than a visible card/container;
- native `[メッセージテーマ]`, `おなまえ`, date;
- no fake stamp/barcode/airline credential, generic travel icon or rasterized copy.

### Back `48:21`
- deep-ocean left field + warm cream writing field;
- Japanese-first `旅の余白に、ひとこと。`;
- open writing rules remain the dominant physical role;
- coral/mint movement remains on the non-writing side;
- native `[自由記入]`, name/date roles.

## Screenshot / refinement QA

Initial live screenshots caught two meaningful defects before selection:

1. front Japanese title wrapped awkwardly into three lines;
2. fixed sun/mint/coral decoration and the back mint wind approached or entered the semantic writing lane.

The title was optically reflowed to two lines and fixed decoration was pulled outside the `AREA_HANDWRITING_MAIN` role.

Three-scale result:
- front whole-item 500px: PASS;
- back whole-item 500px: PASS;
- reading 900px: PASS;
- native `1400×993` front/back actual-size/detail representation: PASS.

## Long-copy / structure QA

Stress roots `48:39 / 48:57` were revealed for realistic long title/theme/prompt review and returned hidden afterward.

Final readback:
- selected front: native text `6`, IMAGE `0`, outside visible text `0`, collisions `0`;
- selected back: native text `6`, IMAGE `0`, outside `0`, collisions `0`;
- stress front: native text `6`, IMAGE `0`, outside `0`, collisions `0`;
- stress back: native text `6`, IMAGE `0`, outside `0`, collisions `0`.

Every selected/stress face preserves:
- canvas `1400×993`;
- semantic `AREA_HANDWRITING_MAIN = 900×870`;
- handwriting-area ratio `56.32%`;
- SPEC minimum `55%`;
- result `PASS`.

All variable/factual copy remains native editable. Generated/composed raster `0`; replaceable images `0`; person imagery `0`.

## Mature comparison / professional gate

Retained V6 was opened only after the new candidate passed visual, stress and structural QA. V6 remains structurally strong but visually very quiet. The vNext is materially stronger for the current `SUNSHINE DEPARTURE` brief: clearer departure/arrival emotion, stronger thumbnail memory and joyful movement while preserving handwriting-first function.

Professional Design Council: `92/100`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`: the diagnosed problem was art direction and emotional amplitude, not missing photography/illustration. Adding generic postcard/tropical/aircraft imagery would reduce writing space and raise stock/AI-template risk.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

- final title/theme/prompt copy;
- final signer/name/date policy;
- actual handwriting test with intended pen;
- paper stock;
- printer template/profile and exact bleed/export settings;
- 100% physical proof.

Do not invent final personal copy or signer details.

## Result

`PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next progression target: `ADD-14 二次会案内`.
