# ADD-13 メッセージカード — QA

Status: `CURRENT / FAMILY_DIVERSE_RESORT_DESK_LETTER_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD13 / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-23
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current front: `52:72 / CURRENT / FAMILY-DIVERSE / ADD13 / FRONT / RESORT DESK LETTER`
- Current back: `52:91 / CURRENT / FAMILY-DIVERSE / ADD13 / BACK / LETTER 02`
- hidden realistic long-copy stress: `52:109 / 52:128`
- family-diversity studies: `52:2 / 52:20 / 52:54`
- retained prior Professional vNext SUNSHINE POSTCARD: `48:3 / 48:21` — comparison/rollback/history only
- retained prior clean-room V6 and legacy production remain preserved
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive write for the family-diverse promotion: `0`

Canonical current evidence:
- `FAMILY-DIVERSE-RESORT-DESK-LETTER-QA-2026-08-21.md`
- `FIGMA-BACK-ARTIFACT-LABEL-POLISH-2026-08-23.md`

## Why Current changed after SUNSHINE POSTCARD

`SUNSHINE POSTCARD` remained structurally sound and individually attractive, but family-scale review found that its large rounded coral / mint / sun-like fields repeated a graphic grammar already appearing across unrelated non-Rurubu items. Per the promoted family-scale template-repetition rule, the replacement had to change the physical/artifact grammar rather than merely recolor the same shapes.

The selected replacement was therefore authored from blank frames using only verified non-visual requirements: A6 landscape `148×105 mm`, duplex role, >=55% handwriting area, native editable title/prompt/name/date roles, safe-area/readability constraints, and unresolved-input boundaries.

## Current visual direction — RESORT DESK LETTER

### Front `52:72`

- resort/hotel writing-desk stationery metaphor rather than a colorful postcard graphic;
- dark resort-green letterhead strip;
- thin terracotta paper/binding edge;
- one small butter-yellow folded-corner cue;
- Japanese-first `旅の途中から、ひとこと。`;
- broad open handwriting rules remain the dominant function;
- native `[メッセージテーマ]`, `おなまえ`, date roles;
- no giant circle/capsule/sun, fake stamp/barcode/airline credential, generic travel icon, gradient, shadow or rasterized copy.

### Back `52:91`

- quieter second-letter face from the same stationery family;
- narrow green stationery strip rather than a large rounded decorative field;
- strip identity is now `LETTER 02`, pairing with the front's `YOKOHAMA · LETTER 01` without implying a hotel checkout instruction;
- Japanese-first `帰る前に、ひとこと。`;
- large uninterrupted writing lane;
- native `[自由記入]`, name/date roles;
- no fake postal/transport data or tropical clip-art.

The first back screenshot exposed title/guide/free-writing-label crowding. The title and guide/prompt lanes were separated before selection. A later actual-size re-audit on 2026-08-23 found that `CHECKOUT NOTE` read more like an internal concept label or checkout instruction than guest-facing artifact identity. A rollback-safe comparison first tested `YOKOHAMA · LETTER 02`, rejected it for awkward wrapping in the 120px strip, then selected the shorter `LETTER 02`.

## Three-scale screenshot QA

Live Current re-audit on 2026-08-23 reconfirmed the selected front/back at native `1400×993`.

- front whole-item / reading / actual-size: PASS;
- back whole-item / reading / actual-size: PASS after `LETTER 02` promotion;
- handwriting remains the primary use surface rather than decoration;
- no screenshot-visible UI card/container regression was found.

## Long-copy / structure QA

Hidden stress roots remain `52:109 / 52:128`.

Verified structure from the promoted evidence:

- selected front: native visible text `6`; fixed-height `0`; IMAGE fills `0`; outside text `0`; collisions `0`;
- selected back: native visible text `6`; fixed-height `0`; IMAGE fills `0`; outside text `0`; collisions `0`;
- stress front/back: fixed-height `0`; IMAGE fills `0`; outside `0`; collisions `0`;
- canvas: `1400×993`;
- semantic handwriting area: `900×870`;
- handwriting-area ratio: `56.32%`;
- SPEC minimum: `55%`;
- result: PASS.

Post-change stress screenshot QA also exposed an editorial line-break defect in the retained back stress title: the prior long string stranded a Japanese ending at the bottom of the narrow title lane. Current short copy did not fail, so production title typography was left unchanged. The hidden stress title now demonstrates the verified fallback at 28px with explicit semantic line breaks (`帰る前に、 / 今日の思い出と / ふたりへの / 言葉を。`) instead of relying on mechanical wrapping.

All variable/factual copy remains native editable Figma text.

## Hybrid authoring / image decision

- variable/factual copy: native Figma text;
- writing rules / paper edges: simple native functional geometry;
- generated/composed raster: `0`;
- editable SVG: `0`;
- replaceable image roles: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITERATION`: the diagnosed defects were artifact-label semantics and Japanese editorial line breaking, not missing photography or illustration. Generated resort/aircraft/tropical imagery would reduce writing space and increase stock/AI-template risk.

## Professional Design Council

Score: `92/100 / PASS / NO VETO`.

- Concept clarity / ownability: 14/15
- Emotional excitement / want-to-pick-up: 12/15
- Japanese editorial craft: 14/15
- Composition / hierarchy / rhythm: 14/15
- Travel / hospitality integration without cliché: 8/10
- Item-specific functionality: 10/10
- Physical print credibility: 10/10
- Editability / content resilience: 5/5
- Family fit without template sameness: 5/5

## Deferred finalization

Remain `NOT_PRINT_READY` until the following are authoritative:

- final title/theme/prompt copy;
- final signer/name/date policy;
- actual handwriting test with intended pen;
- paper stock;
- printer template/profile and exact bleed/export settings;
- 100% physical proof.

Do not invent final personal copy or signer details.

## Result

`FAMILY_DIVERSE_RESORT_DESK_LETTER_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD13 / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

Next progression target remains ADD-14 only if live review finds a material defect; otherwise continue past already-verified items rather than redesigning for novelty alone.
