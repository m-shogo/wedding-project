# ADD-13 メッセージカード — Professional vNext `SUNSHINE POSTCARD` QA

Date: 2026-08-21
Start `main` for this item: `1c437b19a922c1cddeb1f78af553608dd82d7eac`
State: `PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`.
- Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`.
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`.
- Item spec: `01_paper-items/additional-wedding-items/ADD-13-message-card/SPEC.md`.
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`.
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`; metadata re-read live; Drive write `0`.

The old SPEC sentence prohibiting Figma operation is superseded for this run by the live Current authority explicitly allowing Figma edits.

## Clean-room boundary

The professional vNext was authored from blank frames. No visual structure, layout, ornament, rail, crop, image or generated asset was copied from retained V6 or legacy production.

Only verified non-visual requirements were carried forward:

- primary A6 landscape `148 × 105 mm`, represented by `1400×993` working canvas;
- duplex front/back role;
- safe-area/readability intent;
- handwriting field must occupy at least `55%` of finished area;
- native editable title, prompt/theme, guest-name and date roles;
- final title/theme/prompt/signer policy remains unresolved and was not fabricated.

Retained V6 `27:2 / 27:3 / 27:4` and legacy `1:3 / 1:13` remain intact for comparison/history only.

## Three blank-frame directions

New concept page:
- `47:2 / VNEXT_PRO / ADD-13 MESSAGE CARD / 2026-08-21`

Directions:

1. `47:3 / SUNSHINE POSTCARD`
   - warm paper, coral departure sweep, oversized sunlight, broad ruled writing lane;
   - strongest balance of joyful travel energy and handwriting-first utility.
2. `47:18 / OCEAN LETTER`
   - dark-ocean left field plus cream writing field;
   - strong editorial contrast but visually heavier and less welcoming for this front-face role.
3. `47:34 / BREEZE LETTER`
   - bright pop palette and very open copy side;
   - rejected because the large rounded white writing container read too much like a web/app card.

Professional selection: `SUNSHINE POSTCARD`.

## Selected vNext

Selected page:
- `48:2 / SELECTED / VNEXT PRO / ADD-13 / SUNSHINE POSTCARD / 2026-08-21`
- front `48:3 / VNEXT_SELECTED_CANDIDATE / ADD13 / FRONT / SUNSHINE POSTCARD`
- back `48:21 / VNEXT_SELECTED_CANDIDATE / ADD13 / BACK / AFTERGLOW LETTER`
- hidden long-copy stress front `48:39`
- hidden long-copy stress back `48:57`

### Front

Emotional brief: `書く時間そのものを、ふたりへ渡す小さな旅のおみやげにする`.

- warm cream paper is the writing surface;
- Japanese-first `ふたりへ、旅のおみやげを。` is the emotional first read;
- coral / sunlight / mint fields create departure-day movement without fake stamps, barcodes, airline credentials or travel icons;
- the English kicker is limited to artifact identity rather than generic filler;
- broad open rules carry the writing action;
- `[メッセージテーマ]`, `おなまえ`, `2026.10.24` remain native editable text.

Initial screenshot review caught an awkward three-line Japanese break. The title was reduced/reflowed to a deliberate two-line setting before selection. Fixed decoration was also pulled outside the semantic handwriting field rather than being allowed to compete with pen space.

### Back

Emotional brief: `書き終わった余韻を残す、夜側の旅の手紙`.

- deep-ocean left field and warm cream writing field create front/back contrast;
- Japanese-first `旅の余白に、ひとこと。`;
- broad open writing rules remain the dominant physical function;
- coral/mint movement stays on the non-writing side;
- `[自由記入]`, `おなまえ`, date remain native editable text.

The first back screenshot showed the mint decoration crossing into the cream writing field. It was reduced and moved left before selection.

## Three-scale visual QA

Selected front:
- whole-item / 500px: PASS;
- reading / 900px render: PASS;
- native actual-size representation / `1400×993`: PASS.

Selected back:
- whole-item / 500px: PASS;
- reading / 900px render: PASS;
- native actual-size representation / `1400×993`: PASS.

The smallest guest-facing copy remains legible at native review size and does not become screen-only microtype.

## Long-copy stress

Stress roots:
- front `48:39`;
- back `48:57`.

Both were temporarily revealed for screenshot QA with materially longer title/theme/prompt copy, then returned hidden.

Result:
- front long title + long theme: PASS without entering the writing lane;
- back long theme + long free-writing prompt: PASS without entering the cream writing lane;
- no text outside root;
- no same-parent text collisions.

## Structure / handwriting-area QA

Final programmatic readback:

- selected front `48:3`: visible native text `6`; IMAGE fills `0`; outside visible text `0`; text collisions `0`;
- selected back `48:21`: native text `6`; IMAGE fills `0`; outside `0`; collisions `0`;
- stress front `48:39`: native text `6`; IMAGE `0`; outside `0`; collisions `0`;
- stress back `48:57`: native text `6`; IMAGE `0`; outside `0`; collisions `0`.

Semantic handwriting role on every selected/stress face:

- `AREA_HANDWRITING_MAIN = 900×870`;
- canvas = `1400×993`;
- writing-area ratio = `56.32%`;
- SPEC minimum = `55%`;
- result = PASS.

All variable/factual text remains native editable. Generated/composed raster `0`; replaceable image roles `0`; person imagery `0`.

## Mature comparison against retained V6

Only after the new candidate had passed screenshots, stress and structural readback was retained V6 opened for comparison.

Retained V6 remains structurally sound and quiet, but its front/back read as restrained stationery with very low emotional amplitude. The professional vNext creates a clearer arrival/departure feeling, stronger thumbnail memory, more joyful color movement and a more explicit front/back emotional sequence while preserving the same handwriting-first purpose and editability.

Decision: vNext clearly wins the current `SUNSHINE DEPARTURE` professional brief. V6 and legacy stay preserved as rollback/history.

## Professional Design Council score

- Concept clarity / ownability: `14/15`
- Emotional excitement / want-to-pick-up: `14/15`
- Typography / Japanese editorial craft: `13/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel-flight-Hawaii integration without cliché: `8/10`
- Item-specific functionality: `10/10`
- Physical print credibility: `9/10`
- Editability / content resilience: `5/5`
- Family fit without template sameness: `5/5`

Total: `92/100`.

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto remains after the line-break and writing-lane corrections.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The item is intentionally handwriting-first. No screenshot-supported hero/photo/illustration deficit remained after the new composition was built. Adding generic postcard photography, aircraft, tropical motifs or AI illustration would reduce writing space or add stock/template signals. No Drive asset was created.

## Deferred finalization

Still unresolved and must not be fabricated:

- final title/theme/prompt copy;
- final signer/name/date policy;
- actual handwriting test with intended pen;
- paper stock;
- printer template/profile and exact bleed/export settings;
- 100% physical proof.

Result: `PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
