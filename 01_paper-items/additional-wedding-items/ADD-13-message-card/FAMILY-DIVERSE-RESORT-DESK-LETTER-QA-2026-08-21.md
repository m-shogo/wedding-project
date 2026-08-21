# ADD-13 メッセージカード — Family-diverse `RESORT DESK LETTER` QA

Date: 2026-08-21
Start/latest main before evidence write: `d8af5d7f49eb49e1fe2f3e66992fc0067d7727d6`
State: `FAMILY_DIVERSITY_REAUDIT / CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`.
- Shared learning: `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` plus both neutral feeds; only neutral transferable principles were consumed.
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`.
- Item spec: `01_paper-items/additional-wedding-items/ADD-13-message-card/SPEC.md`.
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`.
- Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`; live metadata readback PASS; Drive write `0`.

## Why the previous professional vNext was reopened

The retained `SUNSHINE POSTCARD` front/back (`48:3 / 48:21`) remained individually readable and structurally sound, but family-scale review exposed a broader suite problem: its dominant visual grammar depended on the same large rounded coral / mint / sun-like fields already identified as a repeated AI-template signature across several otherwise unrelated items.

The problem was not that the previous design was ugly in isolation. It was that the suite had begun to look as though different artifacts were recolors of one generated graphic system.

Per the promoted `FAMILY_SCALE_TEMPLATE_REPETITION` rule, the correction must change the artifact grammar, not merely recolor the same circles/capsules.

## Clean-room boundary

No `48:*`, V6 or legacy visual node was duplicated or used as a construction source.

Only non-visual requirements were carried forward:

- A6 landscape `148 × 105 mm` represented by `1400×993` working canvas;
- duplex front/back role;
- safe-area/readability intent;
- handwriting area >=55% of finished area;
- native editable title/prompt/theme/guest-name/date roles;
- unresolved final copy remains semantic placeholder text;
- no AI-generated people or identity imagery.

## Three materially different blank-frame directions

New family-diversity studies:

1. `52:2 / RESORT DESK LETTER`
   - resort/hotel writing-desk stationery metaphor;
   - dark green letterhead, thin terracotta binding edge, small corner fold;
   - no giant circle/capsule/abstract sweep.
2. `52:20 / AIRMAIL FOLD SHEET`
   - edge-stripe letter sheet and fold-line logic;
   - clearly travel-coded but intentionally rejected as more literal/cliche and closer to transport stationery cosplay.
3. `52:54 / ROOM DESK MEMO`
   - loose hotel memo-pad sheet with tear rule and room tab;
   - physically plausible, but less distinctive and more office-stationery-like.

Professional selection: `RESORT DESK LETTER`.

The concept studies are retained hidden as evidence; no old production was deleted or overwritten.

## Current selected family-diverse design

- front: `52:72 / CURRENT / FAMILY-DIVERSE / ADD13 / FRONT / RESORT DESK LETTER`
- back: `52:91 / CURRENT / FAMILY-DIVERSE / ADD13 / BACK / CHECKOUT NOTE`
- hidden front long-copy stress: `52:109`
- hidden back long-copy stress: `52:128`

### Front

The card is treated as actual resort writing stationery rather than a colorful postcard graphic:

- dark resort-green letterhead strip;
- thin terracotta binding edge;
- one small butter-yellow folded-corner cue;
- Japanese-first `旅の途中から、ひとこと。`;
- broad handwriting rules remain the dominant function;
- `TXT_MESSAGE_PROMPT`, guest-name label and date stay native editable text.

### Back

The reverse becomes a quieter checkout note from the same physical stationery family:

- narrow green address/stationery strip rather than a large rounded decorative field;
- thin terracotta top edge and one small fold cue;
- Japanese-first `帰る前に、ひとこと。`;
- large uninterrupted writing lane;
- no fake stamp, barcode, gate/class language, plane icon, tropical clip-art, gradient or shadow.

The first live back screenshot exposed a real local defect: the title and guide shared the same upper lane and the free-writing label crowded the title. The title was shortened/reflowed and the prompt/guide positions were separated before selection.

## Three-scale screenshot QA

Front `52:72`:

- whole-item / 500px: PASS;
- reading / 900px: PASS;
- actual-size / 1400×993: PASS.

Back `52:91`:

- whole-item / 500px: PASS;
- reading / 900px: PASS;
- actual-size / 1400×993: PASS.

Compared with retained `SUNSHINE POSTCARD`, the new family is quieter but more ownable as a real writing artifact and removes the repeated large rounded-shape grammar while preserving a warm travel/hospitality cue.

## Long-copy stress

Stress screenshots were temporarily revealed, reviewed, then hidden again.

Front `52:109`:

- title: `ふたりのこれからへ、伝えておきたいこと。`;
- prompt: a realistic long travel/advice prompt;
- result: PASS after correcting an initially overlong stress string that unrealistically collapsed the left editorial column.

Back `52:128`:

- three-line Japanese stress title with deliberate line breaks;
- longer free-writing prompt;
- result: PASS; writing lane remains intact.

The failed first front stress was not counted as progress. It exposed a real text-mass problem and the test was corrected to a realistic maximum content contract before final PASS.

## Structure readback

Programmatic Figma readback after visual corrections:

- selected front `52:72`: native visible text `6`; fixed-height text `0`; IMAGE fills `0`; outside text `0`; same-parent text collisions `0`; handwriting ratio `56.32%`.
- selected back `52:91`: native visible text `6`; fixed-height text `0`; IMAGE fills `0`; outside text `0`; collisions `0`; handwriting ratio `56.32%`.
- stress front `52:109`: native visible text `6`; fixed-height `0`; IMAGE `0`; outside `0`; collisions `0`; handwriting ratio `56.32%`.
- stress back `52:128`: native visible text `6`; fixed-height `0`; IMAGE `0`; outside `0`; collisions `0`; handwriting ratio `56.32%`.

SPEC minimum handwriting ratio is 55%; selected and stress faces pass.

## Hybrid authoring / asset decision

- variable/factual copy: native Figma text;
- writing rules / physical paper edges: simple native functional geometry;
- generated/composed raster: `0`;
- editable SVG: `0`;
- replaceable image role: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITERATION`.

The diagnosed defect was suite-level graphic-grammar repetition, not missing photography or illustration. Generating a resort photo, airplane, hibiscus, stamp or tropical collage would reduce writing space and risk stock/AI-template behavior instead of solving the root cause. No Drive asset was added.

## Mature comparison and decision

Retained professional vNext `SUNSHINE POSTCARD` remains useful history and rollback evidence. It has stronger raw color amplitude, but the family-diverse candidate is stronger under the current project-wide rule because:

- it reads as a specific physical artifact (resort writing-desk stationery);
- it removes the suite's repeated giant rounded-shape signature;
- it preserves handwriting-first function and 55%+ writing area;
- it maintains travel/hospitality character without transport cosplay;
- it remains native, simple and editable.

Professional Design Council score:

- Concept clarity / ownability: 14/15
- Emotional excitement / want-to-pick-up: 12/15
- Typography / Japanese editorial craft: 14/15
- Composition / hierarchy / rhythm: 14/15
- Travel-flight-Hawaii integration without cliché: 8/10
- Item-specific functionality: 10/10
- Physical print credibility: 10/10
- Editability / content resilience: 5/5
- Family fit without template sameness: 5/5

Total: `92/100`.

No Executive Creative Director, Japanese Editorial Designer or Print Production Director veto remains.

## Deferred finalization

Still unresolved and must not be fabricated:

- final title/theme/prompt copy;
- final signer/name/date policy;
- physical pen/handwriting test;
- paper stock;
- printer template/profile and exact bleed/export settings;
- 100% physical proof.

Result: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_SCALE_TEMPLATE_REPETITION_CLOSED_FOR_ADD13 / LONG_COPY_STRESS_PASS / NOT_PRINT_READY`.

Next safe family-scale target: ADD-14 only if its current physical-artifact grammar still materially repeats the suite after live review; otherwise continue to the next actually repeated item instead of redesigning for novelty alone.