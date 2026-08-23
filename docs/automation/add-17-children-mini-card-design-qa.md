# ADD-17 子ども向けミニカード / ぬりえ — Design QA

Updated: 2026-08-23
Authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current status

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_EXPEDITION_FIELD_SELECTED / FAMILY_DIVERSITY_PASS / LONG_COPY_VISUAL_PASS / CHILD_ACTIVITY_SURFACE_PASS / ACTIVITY_TICK_SUBTRACTION_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

This status applies only to the age-independent neutral editable template. Final real-wedding adoption remains blocked until authoritative child-attendance/count/age and activity-use information exists.

## Current live authority

### Figma

- file key: `PAvkRggJiRuXVypi3RgZCN`
- current selected front: `67:3 / CURRENT_SELECTED / ADD17 / FRONT / EXPEDITION FIELD SHEET`
- current selected back: `67:4 / CURRENT_SELECTED / ADD17 / BACK / DISCOVERY POSTLOG`
- hidden realistic stress: `69:2 / 69:40`
- current clean-room page: `67:2 / VNEXT_PRO / ADD-17 / EXPEDITION FIELD SHEET / 2026-08-23`
- latest bounded comparison: `73:2 / QA / ADD17 / FRONT / NO ACTIVITY TICKS / 2026-08-23` — hidden after verification
- pre-change Current/stress rollback: `74:2 / 74:40` — hidden
- three current blank-frame directions: `70:2 / 70:11 / 70:21` — hidden comparison evidence
- previous Foldout Discovery Map Current: `62:2 / 62:22` — rollback/history only
- previous FIELD NOTE Current: `60:2 / 60:3 / 60:18` — comparison/history only
- previous WINDOW SEAT Current: `47:2 / 48:2 / 48:13` — comparison/history only
- retained V5 production: `2:2 / 2:5` — comparison/history only
- working canvas: `1110×1540` (A6 trim + bleed model)

### Google Drive

- folder: `ADD-17_子ども向けミニカード_ぬりえ`
- Drive ID: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- live folder ID/title readback on 2026-08-23: PASS
- Drive writes for this pass: `0`

## Current visual direction — EXPEDITION FIELD SHEET

The Current is a playful expedition field sheet / discovery note rather than a worksheet card or age-specific coloring illustration.

Front:
- pale mint paper field;
- Japanese-first `旅の途中で、見つけたもの。`;
- one compact cobalt→pink discovery-route gesture kept outside the main activity surface;
- reader-facing `きょうの発見 / 01`;
- tiny star/wave/spark remain as discovery cues;
- the previous four activity-corner ticks are hidden after a bounded comparison showed they read more like crop/scanner reticles than useful child-facing guidance;
- native `[お題]`, optional name and date roles;
- footer is open editorial copy + a short yellow rule, not a pill/card.

Back:
- cream open writing surface;
- cobalt top band + coral physical edge;
- reader-facing `きょうの発見 / 02`;
- Japanese-first `もうひとつ、見つけたこと。`;
- open writing rules with fixed cues outside the writing area;
- no generated child/person/animal imagery or fake transport credential.

All prompts, guidance, optional name and date remain native editable Figma text.

## Three-direction professional comparison

Three materially different directions were built from blank frames before selection:

1. `70:2 / EXPEDITION FIELD` — selected; best balance of activity openness, movement and joyful color.
2. `70:11 / FOLDED COLOR ATLAS` — rejected; tactile but more poster-like and consumed too much activity space.
3. `70:21 / OBSERVATION RIBBON` — rejected; distinct but prompt/ribbon treatment moved toward card/UI semantics.

The selected direction was then rebuilt at full size rather than promoted from a thumbnail.

A later Current-only bounded comparison `73:2` tested removal of only the four activity-corner ticks. The no-ticks version retained clear activity semantics through `[お題]`, the open field and discovery-route/cue system while reducing scanner/crop-mark reading. The treatment was promoted with rollback preserved.

## Three-scale / live screenshot QA

Fresh Current and stress screenshots on 2026-08-23 after activity-tick subtraction:

- whole-item / 500 px: PASS;
- reading scale: PASS;
- actual/native `1110×1540`: PASS;
- realistic front long-copy: PASS after applying the same subtraction;
- back remains unchanged and retains its previous PASS.

Professional Design Council remains `94/100 / PASS / NO VETO`; the bounded subtraction improves the existing selected direction rather than constituting a new art direction.

## Structure / stress QA

Current front `67:3`:
- native text `7`;
- fixed-height visible text `0`;
- visible text outside root `0`;
- text-text collision `0`;
- IMAGE fills `0`;
- four activity-tick roles hidden.

Current back `67:4`:
- native text `6`;
- fixed-height visible text `0`;
- visible text outside root `0`;
- text-text collision `0`;
- IMAGE fills `0`.

Stress `69:2 / 69:40`:
- front native text `7`, back native text `6`;
- fixed-height visible text `0`;
- visible text outside root `0`;
- text-text collision `0`;
- IMAGE fills `0`;
- front activity ticks hidden to match Current.

Meaningful failures caught and corrected:

1. three disconnected colored bars read as generic decoration; method-switched to one coherent discovery-route gesture;
2. a rounded cobalt footer box reintroduced UI/pill grammar; removed and replaced by open native copy + short rule;
3. initial realistic long-copy placed the long prompt too near a fixed activity corner and left insufficient reserve for a long optional name; prompt width, activity ticks, and lower reserve were redesigned without shrinking the main headline;
4. later whole-item review showed the remaining corner ticks still behaved visually like crop/scanner reticles. A no-ticks bounded comparison passed whole/reading/actual-size and long-copy QA, so the ticks were hidden rather than replaced with more decoration.

Canonical evidence:
- `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/CURRENT.md`
- `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/PROFESSIONAL-VNEXT-EXPEDITION-FIELD-PROMOTION-QA-2026-08-23.md`
- `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/ACTIVITY-TICK-SUBTRACTION-QA-2026-08-23.md`
- prior `PROFESSIONAL-VNEXT-FOLDOUT-DISCOVERY-MAP-QA-2026-08-22.md` remains rollback/history evidence.

## Hybrid / image decision

- variable/semantic/factual copy: native text;
- fixed route/star/wave/spark: small editable vector/SVG roles;
- paper fields/rules: simple native functional geometry;
- activity-corner ticks: hidden after bounded QA instead of replaced;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- image generation: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_PASS`: the screenshot-supported bottleneck was an unnecessary boundary cue, not missing photography or illustration. Generic travel imagery or generated children would reduce function and increase stock/identity risk.

## Deferred / blocked finalization

Do not fabricate:
- whether children attend;
- age range/count;
- venue-provided amenities;
- activity preference;
- personalization;
- final copy or paper/pen/crayon handling.

Resolution remains one of `NOT_REQUIRED / ADOPT_VNEXT / REDESIGN_REQUIRED` after authoritative input.

Also deferred:
- final paper/printer template;
- production PDF/export profile;
- 100% physical print proof;
- pen/crayon usability;
- edge/bleed verification;
- real-use handling.

## Result

`PROFESSIONAL_VNEXT_EXPEDITION_FIELD_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_VISUAL_PASS / CHILD_ACTIVITY_SURFACE_PASS / ACTIVITY_TICK_SUBTRACTION_PASS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.
