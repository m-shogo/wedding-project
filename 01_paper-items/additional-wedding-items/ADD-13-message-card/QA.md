# ADD-13 メッセージカード — QA

Status: `CURRENT / FAMILY_DIVERSE_RESORT_DESK_LETTER_SELECTED / SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD13 / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / FLOATING_DESK_MARK_SUBTRACTION_PASS / CORNER_FOLD_CUE_SUBTRACTION_PASS / LOCAL_SEMANTIC_COPY_REPAIR_PENDING / PENDING_GUEST_GUIDE_SEMANTIC_AUDIT / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-26
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current front: `52:72 / CURRENT / FAMILY-DIVERSE / ADD13 / FRONT / RESORT DESK LETTER`
- Current back: `52:91 / CURRENT / FAMILY-DIVERSE / ADD13 / BACK / LETTER 02`
- hidden realistic long-copy stress: `52:109 / 52:128`
- latest no-fold comparisons: `61:2 / 61:21` — hidden after adoption
- latest complete pre-fold rollbacks: `61:39 / 61:58 / 61:76 / 61:95` — hidden
- pre-2026-08-23 front rollback: `57:21`
- pre-2026-08-23 front-stress rollback: `57:40`
- family-diversity studies: `52:2 / 52:20 / 52:54`
- retained prior Professional vNext SUNSHINE POSTCARD: `48:3 / 48:21` — comparison/rollback/history only
- retained prior clean-room V6 and legacy production remain preserved
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive write for the family-diverse promotion / latest cleanups: `0`

Canonical current evidence:
- `FAMILY-DIVERSE-RESORT-DESK-LETTER-QA-2026-08-21.md`
- `FIGMA-BACK-ARTIFACT-LABEL-POLISH-2026-08-23.md`
- `FIGMA-FLOATING-DESK-MARK-SUBTRACTION-QA-2026-08-23.md`
- `FIGMA-CORNER-FOLD-SUBTRACTION-QA-2026-08-23.md`
- `OBSERVED-GUEST-FACING-GUIDE-COPY-2026-08-25.md`

## Current visual direction — RESORT DESK LETTER

The selected replacement was authored from blank frames using only verified non-visual requirements: A6 landscape `148×105 mm`, duplex role, >=55% handwriting area, native editable title/prompt/name/date roles, safe-area/readability constraints, and unresolved-input boundaries.

### Front `52:72`

- resort/hotel writing-desk stationery metaphor rather than a colorful postcard graphic;
- dark resort-green letterhead strip;
- thin terracotta paper/binding edge;
- the former butter-yellow top-right fold cue is now hidden after a bounded comparison showed it read as a detached triangular accent rather than necessary paper construction;
- Japanese-first `旅の途中から、ひとこと。`;
- broad open handwriting rules remain the dominant function;
- native `[メッセージテーマ]`, `おなまえ`, date roles;
- the former small butter-yellow floating desk mark in the lower-left information column remains hidden after a bounded comparison showed no binding, trim/fold, writing, or reader-facing role;
- no giant circle/capsule/sun, fake stamp/barcode/airline credential, generic travel icon, gradient, shadow or rasterized copy.

### Back `52:91`

- quieter second-letter face from the same stationery family;
- narrow green stationery strip rather than a large rounded decorative field;
- strip identity is `LETTER 02`, pairing with the front's `YOKOHAMA · LETTER 01` without implying a checkout instruction;
- Japanese-first `帰る前に、ひとこと。`;
- large uninterrupted writing lane;
- the former bottom-right yellow fold cue is now hidden because it touched the final writing-rule region and read more like a marker/warning glyph than a useful physical fold;
- native `[自由記入]`, name/date roles;
- `52:100 / TEXT / GUIDE = 書く場所は、広めに。` remains native and structurally valid, but fresh native `1400×993` review on 2026-08-26 reconfirmed that it describes the designer's layout intent rather than a guest action. Because this sentence is visible on the finished guest-facing surface and has no reader-facing job, the sellable visual gate is reopened locally until the retained-vs-hidden comparison is completed;
- no fake postal/transport data or tropical clip-art.

## 2026-08-23 bounded desk-mark subtraction

Live whole-item review found `52:90 / PAPER / SMALL DESK MARK` to be a generic accent after the stronger stationery cues were already established.

Rollback-safe comparison:
- `57:2 / QA / ADD-13 / FRONT / NO FLOATING DESK MARK / 2026-08-23`

Only that 100×4 yellow rule was hidden. The green letterhead, terracotta paper edge, Japanese title/theme, name/date, handwriting rules and semantic writing area were unchanged.

Result:
- whole-item: PASS and calmer;
- reading: PASS with a clearer title/theme → name/date relationship;
- native `1400×993`: PASS;
- hidden front stress uses the same subtraction;
- back unchanged.

Promotion preserved:
- front rollback `57:21`;
- front-stress rollback `57:40`;
- comparison `57:2` hidden as evidence.

## 2026-08-23 bounded fold-cue subtraction

Fresh whole-item and native-size review found that the two remaining yellow triangular fold cues no longer read convincingly as physical paper construction.

Rollback-safe comparisons changed only fold-cue visibility:

- front `61:2 / QA / ADD-13 / FRONT / NO CORNER FOLD / 2026-08-23`;
- back `61:21 / QA / ADD-13 / BACK / NO BOTTOM FOLD / 2026-08-23`.

Result:

- front: the top edge is calmer and `YOKOHAMA · LETTER 01` plus the Japanese display title become the clear first read;
- back: the writing field is uninterrupted and the last writing-rule region no longer competes with a triangle-like marker;
- stationery identity remains clear through the green strip/letterhead, terracotta edge, typography and writing surface;
- whole / reading / native `1400×993`: PASS on both faces.

Complete pre-change rollbacks are hidden at `61:39 / 61:58 / 61:76 / 61:95`. Current and long-copy fold cues are hidden; comparison roots are hidden after adoption.

Learning state: `VERIFIED_LOCAL`. This re-applies the existing rule that a named physical cue must prove the claimed physical function at whole-item scale. It does not create a global rule to remove folds/corners.

## 2026-08-26 guest-guide semantic audit — sellable visual reopen

Fresh back review reconfirmed the semantic-audience defect on `52:100 / TEXT / GUIDE`:

`書く場所は、広めに。`

The sentence is grammatically natural and structurally valid, but it does not tell the guest what to write, where to submit the card, what pen to use, or another concrete action. At actual-size it reads like an explanation of the designer's internal decision to make the handwriting surface large.

This is visible finished-product copy, not hidden authoring metadata. Under the reopened sellable visual standard, a production face should not retain designer-internal layout commentary merely because it fits structurally. Therefore:

- structural/design evidence remains valid;
- handwriting-area evidence remains valid;
- the selected `RESORT DESK LETTER` art direction remains Current;
- `SELLABLE_VISUAL_QA_PASS` is locally reopened until the guide role is resolved.

Live bounded-test geometry remains safe:
- guide `52:100`: x `470`, y `110`, width `430`, height `26`;
- handwriting surface `52:99`: x `430`, y `62`, width `900`, height `870`;
- handwriting-area contract remains `56.32%`, above the 55% requirement;
- writing rules begin below and are independent geometry.

Required next test is intentionally narrow:
1. Current guide retained;
2. guide hidden entirely;
3. no replacement filler copy unless later authority provides a real reader-facing instruction;
4. compare whole-item → reading → native `1400×993` → matching long-copy stress;
5. adopt removal only if the page remains self-explanatory and reads more like finished guest stationery;
6. if Current unexpectedly wins, reject the hypothesis and restore the sellable visual gate.

The Current production has **not** been mutated for this hypothesis. Canonical evidence: `OBSERVED-GUEST-FACING-GUIDE-COPY-2026-08-25.md`.

Current authoring-path blocker: the connected Figma write action requires `figma-use` guidance before mutation, but the readable guidance resource is not exposed in the current connector environment. Do not bypass that contract or repeat speculative production writes. When the guidance path becomes available, execute the two-state comparison directly rather than re-diagnosing the issue.

Learning state: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING`. Do not promote as a cross-item rule before local verification.

## Three-scale / long-copy / structure QA

Live Current re-audit on 2026-08-23 reconfirmed front/back at native `1400×993` after both subtraction passes. The back was re-rendered at native `1400×993` again on 2026-08-26 for the pending guide-copy audit.

- front whole-item / reading / actual-size: PASS;
- back hierarchy / writing geometry / actual-size structure: PASS;
- back finished-product semantic copy: `REOPENED` only for `TEXT / GUIDE`;
- handwriting remains the primary use surface rather than decoration;
- no screenshot-visible UI card/container regression.

Hidden stress roots remain `52:109 / 52:128`.

Verified structure after fold-cue subtraction:
- selected front: native visible text `6`; fixed-height `0`; IMAGE fills `0`; outside text `0`; collisions `0`; visible fold cues `0`;
- selected back: native visible text `6`; fixed-height `0`; IMAGE fills `0`; outside text `0`; collisions `0`; visible fold cues `0`;
- stress front/back: fixed-height `0`; IMAGE fills `0`; outside `0`; collisions `0`; visible fold cues `0`;
- canvas: `1400×993`;
- semantic handwriting area: `900×870`;
- handwriting-area ratio: `56.32%`;
- SPEC minimum: `55%`;
- result: structural PASS.

The retained back stress also demonstrates semantic Japanese fallback line breaks at 28px rather than mechanical wrapping. All variable/factual copy remains native editable Figma text.

## Hybrid authoring / image decision

- variable/factual copy: native Figma text;
- writing rules / paper edges: simple native functional geometry;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- IMAGE fills: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITERATION`: the diagnosed defect is semantic audience mismatch, not missing photography or illustration. Generated resort/aircraft/tropical imagery would reduce writing space and increase stock/AI-template risk.

## Professional Design Council

Historical score remains `92/100 / PASS / NO VETO` for the selected overall direction. The 2026-08-23 subtractions removed unsupported accent noise without changing the artifact concept, Japanese editorial craft, handwriting function, print credibility, editability, or family diversity.

That historical score is **not sufficient to restore `SELLABLE_VISUAL_QA_PASS` while the newly reconfirmed guest-guide semantic defect remains visible on the Current back face**. Restore the sellable visual gate only after the bounded retained-vs-hidden test is evidenced.

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

`FAMILY_DIVERSE_RESORT_DESK_LETTER_SELECTED / SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LOCAL_SEMANTIC_COPY_REPAIR_PENDING / PENDING_GUEST_GUIDE_SEMANTIC_AUDIT / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD13 / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / FLOATING_DESK_MARK_SUBTRACTION_PASS / CORNER_FOLD_CUE_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.