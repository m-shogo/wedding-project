# ADD-13 メッセージカード — QA

Status: `CURRENT / FAMILY_DIVERSE_RESORT_DESK_LETTER_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD13 / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / FLOATING_DESK_MARK_SUBTRACTION_PASS / CORNER_FOLD_CUE_SUBTRACTION_PASS / GUEST_GUIDE_SEMANTIC_SUBTRACTION_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-27
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current front: `52:72 / CURRENT / FAMILY-DIVERSE / ADD13 / FRONT / RESORT DESK LETTER`
- Current back: `52:91 / CURRENT / FAMILY-DIVERSE / ADD13 / BACK / LETTER 02`
- hidden realistic long-copy stress: `52:109 / 52:128`
- pre-guide-hidden rollback: `62:38 / 62:56`
- guide-hidden comparisons: `62:2 / 62:20`, hidden after verification
- latest no-fold comparisons: `61:2 / 61:21` — hidden after adoption
- latest complete pre-fold rollbacks: `61:39 / 61:58 / 61:76 / 61:95` — hidden
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive write for latest cleanup: `0`

Canonical current evidence:

- `FAMILY-DIVERSE-RESORT-DESK-LETTER-QA-2026-08-21.md`
- `FIGMA-BACK-ARTIFACT-LABEL-POLISH-2026-08-23.md`
- `FIGMA-FLOATING-DESK-MARK-SUBTRACTION-QA-2026-08-23.md`
- `FIGMA-CORNER-FOLD-SUBTRACTION-QA-2026-08-23.md`
- `OBSERVED-GUEST-FACING-GUIDE-COPY-2026-08-25.md`
- `FIGMA-GUEST-GUIDE-SEMANTIC-SUBTRACTION-QA-2026-08-27.md`

## Current visual direction — RESORT DESK LETTER

The selected replacement was authored from blank frames using only verified non-visual requirements: A6 landscape `148×105 mm`, duplex role, >=55% handwriting area, native editable title/prompt/name/date roles, safe-area/readability constraints, and unresolved-input boundaries.

### Front `52:72`

- resort/hotel writing-desk stationery metaphor rather than a colorful postcard graphic;
- dark resort-green letterhead strip;
- thin terracotta paper/binding edge;
- Japanese-first `旅の途中から、ひとこと。`;
- broad open handwriting rules remain the dominant function;
- native `[メッセージテーマ]`, `おなまえ`, date roles;
- former small butter-yellow desk mark remains hidden after bounded subtraction;
- former top-right fold cue remains hidden after bounded subtraction;
- no giant circle/capsule/sun, fake stamp/barcode/airline credential, generic travel icon, gradient, shadow or rasterized copy.

### Back `52:91`

- quieter second-letter face from the same stationery family;
- narrow green stationery strip;
- strip identity `LETTER 02`, pairing with front `YOKOHAMA · LETTER 01` without implying a checkout instruction;
- Japanese-first `帰る前に、ひとこと。`;
- large uninterrupted writing lane;
- former bottom-right fold cue remains hidden;
- native `[自由記入]`, name/date roles;
- former `52:100 / TEXT / GUIDE = 書く場所は、広めに。` is now intentionally hidden after a 2026-08-27 bounded semantic-copy comparison proved it described the designer's layout intent rather than a guest action;
- no fake postal/transport data or tropical clip-art.

## 2026-08-27 guest-guide semantic subtraction

Fresh native `1400×993` review had reopened the sellable visual gate because `書く場所は、広めに。` was visible finished-product copy with no reader-facing job.

Rollback-safe comparisons changed only guide visibility:

- `62:2` — Current back with guide hidden
- `62:20` — realistic long-copy back with guide hidden

Result:

- whole-item: PASS; the page reads more directly from the headline into the writing surface;
- reading scale: PASS; no grouping/instruction loss;
- native `1400×993`: PASS;
- realistic long-copy: PASS;
- handwriting geometry unchanged;
- no replacement filler copy added.

Complete pre-change rollbacks:

- `62:38` — Current back before guide subtraction
- `62:56` — long-copy back before guide subtraction

Promoted Current mutation:

- `52:100 / TEXT / GUIDE` → hidden
- `52:137 / TEXT / GUIDE` → hidden in stress

The comparison roots were hidden after verification.

Learning state: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Transfer only the QA question: **is this sentence for the reader, or is it the designer explaining the design?** Do not transfer ADD-13's exact stationery layout, copy, palette or writing geometry.

## Prior bounded subtractions retained

### Floating desk mark

`52:90 / PAPER / SMALL DESK MARK` was previously removed after whole/read/native comparison showed it had no binding, trim/fold, writing, or reader-facing role. The green letterhead, terracotta edge and handwriting surface remained sufficient.

### Corner / bottom fold cues

The yellow triangular fold cues were previously removed from front/back after bounded comparisons showed they read more like detached marker/warning glyphs than credible paper construction. Front/back stationery identity remained clear without them.

These earlier passes remain `VERIFIED_LOCAL` and are not a blanket rule to remove all fold or accent geometry.

## Three-scale / long-copy / structure QA — 2026-08-27 readback

### Selected back `52:91`

- canvas `1400×993`
- visible native text `5`
- fixed-height text `0`
- IMAGE fills `0`
- outside text `0`
- text collisions `0`
- `TEXT / GUIDE` hidden
- semantic handwriting area `52:99 / AREA_HANDWRITING_MAIN = 900×870`
- handwriting-area ratio `56.32%`
- SPEC minimum `55%`

### Hidden long-copy back `52:128`

- visible native text `5`
- fixed-height text `0`
- IMAGE fills `0`
- outside text `0`
- text collisions `0`
- `TEXT / GUIDE` hidden
- handwriting area remains `900×870 / 56.32%`

Front structural evidence remains valid from the existing clean-room/long-copy passes: native editable text, no IMAGE fills, no unintended fold cues, handwriting function preserved.

## Hybrid authoring / image decision

- variable/factual/guest-facing copy: native Figma text;
- writing rules / paper edges: simple native functional geometry;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- IMAGE fills: `0`;
- image generation for this repair: `0`;
- Drive write for this repair: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was semantic audience mismatch, not missing photography or illustration. Generated resort/aircraft/tropical imagery would reduce writing space and increase stock/AI-template risk.

## Professional Design Council

Historical score remains `92/100 / PASS / NO VETO` for the selected overall direction. The desk-mark/fold-cue/guide subtractions removed unsupported production noise without changing the artifact concept, Japanese editorial craft, handwriting function, print credibility, editability, or family diversity.

The specific semantic defect that had reopened `SELLABLE_VISUAL_QA_PASS` is now closed with fresh whole/read/native/long-copy evidence.

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

`FAMILY_DIVERSE_RESORT_DESK_LETTER_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / GUEST_GUIDE_SEMANTIC_SUBTRACTION_PASS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD13 / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / FLOATING_DESK_MARK_SUBTRACTION_PASS / CORNER_FOLD_CUE_SUBTRACTION_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`.

ADD-13's local semantic-copy reopen is closed. Do not add replacement filler text unless a real guest-facing instruction becomes authoritative.