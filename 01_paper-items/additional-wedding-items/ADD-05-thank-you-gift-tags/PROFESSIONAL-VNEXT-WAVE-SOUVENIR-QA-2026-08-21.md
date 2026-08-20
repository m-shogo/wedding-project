# ADD-05 サンキュータグ / プチギフトタグ — Professional vNext `WAVE SOUVENIR` QA

Date: 2026-08-21
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_SELECTED / 45X70_INDEPENDENT_REFLOW_PASS / PREVIOUS_PRODUCTION_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `396930787cd30eaf6b084e90b5f068d4e47e8132`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- professional bar: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`

## Clean-room brief

Emotional brief: **プチギフトを受け取った瞬間に、今日の旅の小さなおみやげを手渡されたような喜びが残るタグ。**

Before authoring, only verified facts / physical constraints were used:

- 50×80 front role represented by `500×800` canvas;
- 45×70 comparison role represented by `450×700` canvas;
- optional 50×80 back;
- a real punch/string attachment role must retain a clear isolated punch region;
- date `2026.10.24`;
- thank-you / petit-gift function.

No prior production/V2 visual layout, rail, serif treatment, ornament, crop, image or asset was used as the vNext construction base. Existing production was opened visually only after the new family had passed its own visual/structure readback.

## Three blank-frame directions

New page:

- `24:2 / VNEXT_PRO / ADD-05 THANK YOU TAG / TINY TRAVEL SOUVENIR / 2026-08-21`

Three materially different 50×80 studies:

1. `24:3 / SUNSET TOKEN` — giant cropped sunset + lagoon sweep + Japanese `ありがとう`.
2. `24:10 / LUGGAGE RIBBON` — punch axis extended as a deep-ocean ribbon.
3. `24:18 / WAVE NOTE` — oversized navy wave carrying Japanese `ありがとう`, with coral/lagoon afterglow gestures.

Council critique:

- `SUNSET TOKEN`: warm and cheerful, but the lower sunset field competed with copy/date and felt more poster-like than tiny keepsake.
- `LUGGAGE RIBBON`: the physical-axis idea was relevant, but the central ribbon split `ありがとう` awkwardly and became a device stronger than the thank-you message; rejected rather than polished into a transport gimmick.
- `WAVE NOTE`: clearest Japanese-first gratitude, strongest small-object memorability, travel/light/movement without fake baggage/airline credentials, and the punch remains physically quiet and isolated.

Selected direction: `WAVE NOTE` → rebuilt as `WAVE SOUVENIR` family.

## Selected professional vNext family

- `25:2 / SELECTED PROFESSIONAL VNEXT / ADD-05 / FRONT 50X80 / WAVE SOUVENIR`
- `25:10 / SELECTED PROFESSIONAL VNEXT / ADD-05 / FRONT 45X70 / WAVE SOUVENIR REFLOW`
- `25:18 / SELECTED PROFESSIONAL VNEXT / ADD-05 / BACK 50X80 OPTIONAL / AFTERGLOW NOTE`

### 50×80 front

- warm cream paper field;
- isolated top punch role;
- one oversized deep-ocean wave carrying native `ありがとう`;
- native message `今日の思い出を、小さなおみやげに。`;
- coral breeze and cropped lagoon sun as two large, simple movement gestures;
- date as the final small anchor.

### 45×70 front

This is an **independent reflow**, not a proportional scale clone:

- punch role `54×54` rather than blindly scaling all geometry;
- wave/message/date positions and dimensions re-authored for the shorter physical field;
- visual hierarchy remains `ありがとう → message → date` at the smaller format.

### Optional 50×80 back

- deep-ocean afterglow field rather than a mirrored cream front;
- yellow sunlight sweep, lagoon sweep, cropped coral sun;
- native `またどこかの旅で。` + `今日の続きを、またいつか。`;
- same family emotion, materially different back composition.

No plane, stamp, fake baggage label, airline code, route node, barcode, badge, shadow, gradient or stock tropical illustration.

## Three-scale / format QA

50×80 front `25:2`:

- whole-item / thumbnail: PASS — gratitude is immediate and punch is visually isolated;
- reading scale: PASS — message remains secondary but readable;
- native `500×800`: PASS — crop, punch clearance and date density remain credible.

45×70 front `25:10`:

- whole-item: PASS;
- reading scale: PASS;
- native `450×700`: PASS;
- independent reflow remains coherent rather than appearing compressed.

Optional back `25:18`:

- whole-item: PASS;
- reading/native `500×800`: PASS;
- front/back family relationship: PASS without mirrored-template sameness.

## Structure QA

`25:2` front 50×80:

- `500×800`, `clipsContent=true`;
- visible native text `3`;
- all text `textAutoResize=HEIGHT`;
- IMAGE fills `0`;
- text outside root `0`;
- text collisions `0`;
- provisional punch role: x=`220`, y=`34`, `60×60`.

`25:10` front 45×70:

- `450×700`, `clipsContent=true`;
- visible native text `3`;
- all text `textAutoResize=HEIGHT`;
- IMAGE fills `0`;
- text outside root `0`;
- text collisions `0`;
- provisional punch role: x=`198`, y=`34`, `54×54`.

`25:18` optional back:

- `500×800`, `clipsContent=true`;
- visible native text `3`;
- all text `textAutoResize=HEIGHT`;
- IMAGE fills `0`;
- text outside root `0`;
- text collisions `0`;
- provisional punch role: x=`220`, y=`34`, `60×60`.

The exact punch size/offset remains a production placeholder until the actual punch/attachment specification exists; no claim is made that these geometry values are vendor-final.

## Hybrid authoring / image decision

- factual/final copy: native editable Figma text;
- fixed art: only large simple native fields/waves/orbs;
- editable SVG: not required;
- generated/composed raster: not required;
- replaceable image role: not required;
- IMAGE fills: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: at this 50×80 / 45×70 physical scale the quality bottleneck is typography, punch/attachment axis, shape rhythm and souvenir character. A photo or generated Hawaii/airplane image would reduce legibility and increase stock/AI-template risk rather than improve the object.

## Completion-only comparison with retained production

After the new family had passed its own QA, retained production `1:2 / FRAME_TAG_FRONT_50X80` was opened for comparison.

The retained version is structurally competent and refined, but reads as a quiet formal English editorial tag: cream field, left navy rail, Cormorant `Thank you.`, hairline and small date.

For the current `SUNSHINE DEPARTURE` brief, professional vNext is preferred because:

- Japanese gratitude becomes the emotional first read;
- the tag feels like a joyful small travel souvenir rather than formal stationery;
- crop/scale/color create stronger memorability at thumbnail size;
- physical punch readability is retained;
- no fake transport vocabulary is needed to create travel energy.

Retained production remains unchanged as history/rollback.

## Professional Council score

`92 / 100`

- Concept clarity / ownability: 14/15
- Emotional excitement / pick-up appeal: 14/15
- Japanese editorial typography: 14/15
- Composition / hierarchy / rhythm: 14/15
- Travel / Hawaii integration without cliché: 9/10
- Item-specific function: 9/10
- Physical print credibility: 9/10
- Editability / resilience: 5/5
- Family fit without template sameness: 4/5

No Executive Creative Director, Japanese Editorial Designer, or Print Production Director veto.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final stock thickness;
- actual punch diameter/offset and punching tolerance;
- string/ribbon/twist-tie width and attachment method;
- rotation/hiding behavior on the real petit gift;
- final printer bleed/template/profile;
- 100% physical print proof;
- optional back adoption decision using the real attachment method.

## Decision

`PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / 45X70_INDEPENDENT_REFLOW_PASS`.

Next progression target: `ADD-06 フォトブースサイン`.