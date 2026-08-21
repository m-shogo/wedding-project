# ADD-17 子ども向けミニカード / ぬりえ — Professional vNext Foldout Discovery Map QA

Date: 2026-08-22
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_FOLDOUT_DISCOVERY_MAP_SELECTED / FAMILY_DIVERSITY_PASS / LONG_COPY_VISUAL_PASS / CHILD_ACTIVITY_SURFACE_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Start latest main observed before write: `0b5feabb1c5f4a9ece5453c84067535cd62de572`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- exact Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`
- previous Current retained untouched: page/root family `60:2 / 60:3 / 60:18`
- new selected front: `62:2 / CURRENT_SELECTED / ADD17 / FRONT / FOLDOUT DISCOVERY MAP`
- new selected back: `62:22 / CURRENT_SELECTED / ADD17 / BACK / ARRIVAL MAP LOG`
- hidden realistic stress: `62:46 / 62:66`
- three blank-frame direction studies retained hidden: `61:3 / 61:21 / 61:32`

## Visible problem

The previous FIELD NOTE Current was structurally strong, but whole-item review exposed one remaining print-design defect: the front activity surface was a very large white rounded rectangle with a label inside it. Because the activity area occupied most of the card, that containment became the dominant first read and looked closer to a web form/card or generic worksheet component than a tactile travel keepsake.

This was not an overflow defect and not a reason to add more decoration. It was a physical-artifact / containment problem.

## Clean-room direction study

Three materially different age-neutral directions were built from blank frames without copying the previous production geometry:

1. `61:3 / FOLDOUT DISCOVERY MAP`
   - open cream map sheet;
   - cobalt binding edge;
   - terracotta header paper;
   - activity area defined only by four crop/fold corner marks, not a rounded container.
2. `61:21 / WINDOW GRID JOURNAL`
   - dark field + rectangular paper window;
   - rejected because the paper window still behaved as a large contained widget and the draft phrase `見つけた！を、` was editorially awkward.
3. `61:32 / TRAVEL OBSERVATION STRIP`
   - vertical plum strip + saffron header + open observation field;
   - viable but more static/poster-like and weaker as an object a guest would actively draw/write on.

`FOLDOUT DISCOVERY MAP` was selected because it preserved the usable activity area while replacing the web-card signal with a more credible folded-map / observation-sheet physical grammar.

## Mature selected direction

### Front `62:2`

- 1110×1540;
- cobalt physical binding edge;
- terracotta paper header;
- Japanese-first display title `今日の旅で、見つけたもの。`;
- open central activity field with only corner/fold marks;
- no rounded activity card, shadow, pill, fake UI, airplane, barcode, stamp, or generated child imagery;
- native semantic placeholders for `[お題]` and `[おなまえ・任意]`;
- date remains native text.

### Back `62:22`

- same physical sheet family without mirroring the front layout;
- `ARRIVAL LOG` identity kicker;
- Japanese-first title `もうひとつ、見つけたこと。`;
- open ruled writing field rather than an enclosing card;
- optional drawing/memo role marked by small corner cues only;
- no raster or generated asset dependency.

## Long-copy / Japanese typography QA

Realistic stress frames `62:46 / 62:66` were built separately and are hidden after review.

Front stress initially rendered a mechanically poor Japanese wrap splitting `聞こえた音` across lines. The structure was technically in-bounds, but the reading-scale typography failed the already-verified semantic Japanese line-break QA principle.

The stress contract was corrected to deliberate clause-level native line breaks:

- `今日いちばん心に残ったもの、見つけた景色、`
- `聞こえた音、面白かったことを、`
- `絵やことばで自由に残してみよう`

No type-size collapse was used. The prompt remains native editable text.

A second authoring defect was also caught programmatically: the initial helper sequence set `textAutoResize='HEIGHT'` and then called `resize()`, which silently returned all new text nodes to fixed-height behavior. After loading every actual font used by the four roots, the repair order was changed to `width assignment / resize -> textAutoResize='HEIGHT'` and all roots were re-read.

Final selected + stress structure:

- front selected: native text `7`, fixed-height `0`, outside `0`, text-text collisions `0`, IMAGE fills `0`;
- back selected: native text `6`, fixed-height `0`, outside `0`, text-text collisions `0`, IMAGE fills `0`;
- front stress: native text `7`, fixed-height `0`, outside `0`, text-text collisions `0`, IMAGE fills `0`;
- back stress: native text `6`, fixed-height `0`, outside `0`, text-text collisions `0`, IMAGE fills `0`.

## Three-scale visual QA

- whole-item / approx. 500–900px: PASS; the activity surface now reads as open paper/map space, not a form card;
- reading scale / 1200px render: PASS; Japanese hierarchy and prompt/name roles remain clear;
- actual-size / native 1110×1540: PASS;
- realistic long-copy front/back: PASS after semantic line-break correction;
- physical writing/drawing usability: PASS at visual-design level; exact paper/tool proof remains deferred.

## Professional Design Council

Score: `93/100 / PASS / NO VETO`.

Reasons the new candidate beats the retained previous Current:

- stronger item-specific physical metaphor (`foldout discovery map / observation sheet` rather than generic large rounded activity card);
- less web/UI containment at thumbnail scale;
- more open drawing behavior without reducing usable area;
- Japanese headline remains the emotional carrier;
- family diversity improves without adding unrelated tropical/airline decoration;
- structure and long-copy resilience are preserved.

## Hybrid authoring / assets

- variable semantic copy: native Figma text;
- fixed paper/binding/fold/corner cues: simple native geometry because they are functional and low-complexity;
- SVG: `0`;
- replaceable image roles: `0`;
- generated/composed raster: `0`;
- image generation candidates: `0`;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_PASS`: the screenshot-supported bottleneck was dominant UI-like containment, not missing illustration or photography. Adding generic travel imagery would have reduced activity space and increased stock/AI risk.

## Legacy / rollback

Previous Current `60:2 / 60:3 / 60:18` remains intact as comparison/history. Earlier WINDOW SEAT / V5 families also remain untouched. The new selected family does not require destructive overwrite of the previous production.

## Deferred finalization

Still intentionally unresolved:

- whether children attend;
- count and age range;
- whether ADD-17 is required at all;
- final prompt wording and personalization;
- venue-provided paper/tools/amenities;
- crayon/pen/pencil compatibility;
- final paper stock, print profile, trim/bleed and physical proof.

Final-use state remains `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`; this does not invalidate the selected visual/design candidate.
