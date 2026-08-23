# ADD-17 Discovery Cue Consolidation QA — 2026-08-24

Status: `VERIFIED_LOCAL / CURRENT_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

Start authority SHA: `eec748ff1f770e9ff46b9e8b532482b5e5bfcfef`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Target: ADD-17 子ども向けミニカード / ぬりえ only.

Figma:
- file: `PAvkRggJiRuXVypi3RgZCN`
- Current front: `67:3`
- Current back: `67:4`
- hidden realistic stress: `69:2 / 69:40`
- exact Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`
- Drive write: `0`

## Visible problem

Fresh whole-item and native-size review showed that the selected `EXPEDITION FIELD SHEET` still carried more discovery decoration than needed after the earlier removal of the rounded kicker carrier and activity-corner ticks.

Front retained three separate small fixed cues in addition to the main discovery-route gesture:
- star;
- pink wave;
- yellow spark.

Back retained both a star and a pink bottom wave.

The star still read as a direct “discovery” cue, and the large cobalt→pink route remained the main movement gesture. The extra wave/spark marks no longer added a distinct function; they scattered the playful energy across unrelated corners and started to read as generic AI-template decoration.

## Root-cause hypothesis

Playfulness is stronger when concentrated into a small number of semantically legible gestures. Once one dominant movement gesture and one discovery symbol already carry the concept, additional isolated marks can weaken hierarchy even if each mark is individually attractive.

This is not a rule to remove decorative symbols globally. The bounded question is whether each fixed cue has a distinct reader-facing / physical / semantic job in the actual artifact.

## Rollback-safe comparison

Current comparisons:
- front `79:2 / QA / ADD-17 / FRONT / CONSOLIDATED DISCOVERY GESTURE / 2026-08-24`
- back `79:78 / QA / ADD-17 / BACK / CONSOLIDATED DISCOVERY GESTURE / 2026-08-24`

Realistic long-copy comparisons:
- front stress `79:40`
- back stress `79:97`

Only these roles were hidden in comparison:
- front `VECTOR / DISCOVERY WAVE`;
- front `VECTOR / DISCOVERY SPARK`;
- back `VECTOR / BOTTOM WAVE`.

Retained unchanged:
- front `VECTOR / DISCOVERY STAR`;
- front `VECTOR / DISCOVERY ROUTE`;
- back `VECTOR / BOTTOM STAR`;
- all native copy, date, prompts, writing rules, activity surface, paper fields and physical edges.

## Result

Comparison was visually stronger:
- front became calmer and more open without losing movement or child-neutral playfulness;
- the main cobalt→pink route became the unmistakable motion gesture;
- one star remained enough to establish “discovery” on each face;
- back writing surface gained more breathing room and the lower-right no longer looked like a cluster of decorative stickers.

The same treatment passed realistic long-copy stress.

## Promotion and rollback

Complete pre-change rollbacks were created before Current mutation:
- front `80:2`;
- front stress `80:40`;
- back `80:78`;
- back stress `80:97`.

Current promotion:
- `67:3`: discovery wave hidden, discovery spark hidden; discovery star + route retained;
- `67:4`: bottom wave hidden; bottom star retained;
- `69:2`: same front treatment;
- `69:40`: same back treatment.

QA comparisons `79:2 / 79:40 / 79:78 / 79:97` are hidden after verification.

## Three-scale QA

Front:
- whole / thumbnail: PASS;
- reading: PASS;
- native `1110×1540`: PASS;
- realistic long-copy: PASS.

Back:
- whole / thumbnail: PASS;
- reading: PASS;
- native `1110×1540`: PASS;
- realistic long-copy: PASS.

## Structure readback

Current front `67:3`:
- visible native text `7`;
- fixed-height text `0`;
- IMAGE fills `0`;
- discovery wave `hidden`;
- discovery spark `hidden`;
- discovery star `visible`;
- discovery route `visible`.

Current back `67:4`:
- visible native text `6`;
- fixed-height text `0`;
- IMAGE fills `0`;
- bottom wave `hidden`;
- bottom star `visible`.

Stress front/back retain the same cue states with fixed-height text `0` and IMAGE fills `0`.

## Hybrid / image decision

- semantic and factual copy: native Figma text;
- route/star fixed cue: editable vector/SVG roles;
- paper fields / writing rules: simple native geometry;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- image generation: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported defect was excessive distribution of small decorative cues, not missing imagery. Adding generated travel/child imagery would reduce the activity surface and increase stock/identity risk.

## Learning state

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` for the narrow principle:

> When a playful print artifact already has one dominant functional/movement gesture and one semantically legible discovery cue, additional isolated fixed marks should prove a distinct job at whole-item scale. If they only scatter attention, test consolidation rollback-safely rather than adding more decoration.

Do not transfer ADD-17's palette, star, route geometry, children-card composition, or exact cue count to other items.

## Deferred / blocked finalization

Unchanged:
- child attendance/count/age;
- final activity choice/personalization;
- paper/pen/crayon handling;
- printer profile / exact bleed/export;
- 100% physical proof.

Final use remains `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.
