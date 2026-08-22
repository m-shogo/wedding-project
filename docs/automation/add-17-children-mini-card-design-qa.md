# ADD-17 子ども向けミニカード / ぬりえ — Design QA

Updated: 2026-08-22
Authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current status

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROFESSIONAL_VNEXT_FOLDOUT_DISCOVERY_MAP_SELECTED / FAMILY_DIVERSITY_PASS / LONG_COPY_VISUAL_PASS / CHILD_ACTIVITY_SURFACE_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

This status applies only to the age-independent neutral editable template. Final real-wedding adoption remains blocked until authoritative child-attendance/count/age and activity-use information exists.

## Current live authority

### Figma

- file key: `PAvkRggJiRuXVypi3RgZCN`
- current selected front: `62:2 / CURRENT_SELECTED / ADD17 / FRONT / FOLDOUT DISCOVERY MAP`
- current selected back: `62:22 / CURRENT_SELECTED / ADD17 / BACK / ARRIVAL MAP LOG`
- hidden realistic stress: `62:46 / 62:66`
- three blank-frame direction studies: `61:3 / 61:21 / 61:32` — hidden comparison evidence
- previous FIELD NOTE Current: `60:2 / 60:3 / 60:18` — comparison/history only
- previous WINDOW SEAT Current: `47:2 / 48:2 / 48:13` — comparison/history only
- retained V5 production: `2:2 / 2:5` — comparison/history only
- working canvas: `1110×1540` (A6 trim + bleed model)

### Google Drive

- folder: `ADD-17_子ども向けミニカード_ぬりえ`
- Drive ID: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- live folder ID/title readback on 2026-08-22: PASS
- Drive writes for this pass: `0`

## Current visual direction — FOLDOUT DISCOVERY MAP

The Current treats the item as a foldout discovery map / observation sheet rather than a worksheet card.

Front:
- cobalt physical binding edge;
- terracotta header paper;
- Japanese-first `今日の旅で、見つけたもの。`;
- central activity surface remains open paper, defined only by small corner/fold marks;
- native `[お題]`, optional name and date roles;
- no rounded web-card container around the main drawing area.

Back:
- `ARRIVAL LOG` kicker;
- Japanese-first `もうひとつ、見つけたこと。`;
- open ruled writing field;
- optional drawing/memo area marked by small corner cues only;
- no generated child/person/animal imagery or fake transport credential.

All prompts, guidance, optional name and date remain native editable Figma text.

## Three-scale / live screenshot QA

Live re-audit on 2026-08-22 rendered Current front `62:2` at native `1110×1540`.

Result: PASS.

- the activity surface remains the dominant use area;
- the cobalt edge and terracotta header read as physical-map/foldout cues rather than web UI;
- Japanese hierarchy remains legible;
- the open central field is not visually contaminated by generic travel illustration;
- no visible child-specific fabricated fact appears.

Promoted evidence already records front/back whole, reading, native actual-size and realistic long-copy PASS.

## Structure / stress QA

Canonical Current evidence records:

- selected front native text `7`;
- selected back native text `6`;
- fixed-height visible text `0` across selected + stress;
- visible text outside root `0`;
- text-text collision `0`;
- IMAGE fills `0`.

Two meaningful failures were caught and corrected before selection:

1. realistic front stress mechanically split `聞こえた音`; the stress contract was changed to deliberate clause-level native line breaks instead of shrinking type;
2. the initial authoring helper applied `textAutoResize='HEIGHT'` before `resize()`, silently returning text to fixed-height behavior; fonts were loaded, width was assigned first, then auto-height was applied and read back.

Canonical evidence:
- `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/CURRENT.md`
- `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/PROFESSIONAL-VNEXT-FOLDOUT-DISCOVERY-MAP-QA-2026-08-22.md`
- later `PROFESSIONAL-VNEXT-PLAYFUL-ACTIVITY-REJECTION-QA-2026-08-22.md` confirms a subsequent colorful clean-room experiment was weaker and Current was intentionally retained.

## Hybrid / image decision

- variable/semantic copy: native text;
- fixed paper/binding/fold/corner cues: simple native functional geometry;
- SVG: `0`;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- image generation: `0`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_PASS`: the screenshot-supported defect was dominant UI-like activity containment, not missing illustration or photography. Generic travel imagery would reduce activity space and increase stock/AI-template risk.

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

`PROFESSIONAL_VNEXT_FOLDOUT_DISCOVERY_MAP_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_VISUAL_PASS / CHILD_ACTIVITY_SURFACE_PASS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.
