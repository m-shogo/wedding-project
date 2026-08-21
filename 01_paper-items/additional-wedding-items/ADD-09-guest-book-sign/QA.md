# ADD-09 ゲストブックサイン — QA

Status: `CURRENT / FAMILY_DIVERSITY_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- start/latest `main` before final promotion: `8f8fc5232b368c0769f1c4c1e4f7c777b03767df`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- new current: `38:43 / CURRENT / ADD-09 / CLOTHBOUND ARRIVAL LOG / FAMILY DIVERSITY 2026-08-21`
- long-copy stress: `38:76 / QA / ADD-09 FAMILY DIVERSITY / LONG COPY STRESS` — hidden after QA
- prior Professional vNext preserved: `35:2 / ROLLBACK / ADD-09 / WORDS AS SOUVENIR / PRE-FAMILY-DIVERSITY`
- prior selected clean-room V4 preserved: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- retained legacy production preserved: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority verified live: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive write: `0`

## Why the family-scale pass reopened ADD-09

The prior `WORDS AS SOUVENIR` direction remained a valid 90/100 single-item design, but at suite scale its dominant grammar repeated the now-promoted failure fingerprint: large coral field + lagoon rounded sweep + yellow disc + navy closure. That grammar had independently appeared across multiple non-Rurubu vNext items and is now governed by `FAMILY_SCALE_TEMPLATE_REPETITION` as a project rule.

The visible problem was therefore not local readability or missing decoration. It was that a valid guest-book sign still looked like another color-field member of the same AI-authored family when placed beside other items.

## Clean-room method

The family-diversity candidate was authored from blank frames on a new page and did not duplicate or reuse `35:2`, V4, legacy production, old vectors, old color fields, old crop, or old layout groups.

Only verified non-visual requirements were carried forward:

- physical canvas `1000×1419`;
- guest-book sign role;
- native date `2026.10.24`;
- semantic roles `[ご記帳のご案内]`, `[記入方法・ペンのご案内]`, `[設置場所・補足情報]`;
- final writing method, pen placement and installation wording remain unresolved.

## Three materially different blank-frame directions

New page:

- `38:2 / FAMILY_DIVERSITY / ADD-09 GUEST BOOK / 2026-08-21`

Directions:

1. `38:3 / CLOTHBOUND ARRIVAL LOG`
2. `38:23 / HOTEL REGISTER CLOTH`
3. `38:33 / FIELD NOTE DESK`

The professional critique selected `CLOTHBOUND ARRIVAL LOG` because it gave the guest-book sign an item-specific physical-object metaphor: a stitched travel ledger / keepsake book rather than another tropical poster field. `HOTEL REGISTER CLOTH` risked drifting toward system/register UI, while `FIELD NOTE DESK` was more playful but weaker as a formal wedding guest-book sign.

The selected full-size frame was then rebuilt separately at `38:43`, not duplicated from the thumbnail.

## Current visual direction — CLOTHBOUND ARRIVAL LOG

Emotional brief:

`旅の途中で書き残す一冊。ゲストのことばそのものを、ふたりが持ち帰る旅の記録にする。`

First read:

`旅のことばを、ここに。`

Visual system:

- warm paper field rather than a large tropical color block;
- cobalt cloth spine with visible stitch rhythm as a real binding cue;
- pale sky page edge;
- one terracotta index tab;
- Japanese-first title and instructions;
- native Auto Layout for dynamic operational copy;
- no giant sun/circle/capsule, no fake airline device, no form cards, no QR/route/stamp cosplay.

This gives ADD-09 a book/ledger grammar distinct from Passport notebook, Boarding baggage tag, Photo Booth strip, Escort hanging rack and the remaining poster/sign artifacts while staying inside the travel-keepsake world.

## Hybrid authoring roles

- variable/final copy: native editable Figma text;
- semantic placeholders: native editable Figma text;
- dynamic information: native Auto Layout;
- fixed art: simple native cloth/page/index geometry because it is low-layer-count functional paper construction;
- editable SVG: `0` — no reusable silhouette justified vector asset work;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- rasterized variable copy: `0`.

Image generation was intentionally not started. The screenshot-supported defect was family-scale shape grammar repetition, not missing photography/illustration. Adding tropical imagery would not solve that defect and would increase stock/AI-template risk.

## Three-scale screenshot QA

Current `38:43` was reviewed live at:

- whole-item / ~500 px: PASS — reads as a bound guest ledger rather than a generic poster/template;
- reading / 705×1000: PASS — headline → lead → 3 operational roles → closing/date hierarchy is clear;
- actual size / `1000×1419`: PASS — Japanese type, stitch rhythm, cloth spine, index tab and page edge remain credible without micro-detail dependency.

Prior selected `35:2` was opened only after the new candidate matured. At 500/1000-scale comparison it remains lively and valid, but its coral/lagoon/yellow rounded-field grammar is materially closer to the repeated suite fingerprint. The new candidate wins the family-diversity gate while preserving guest participation clarity.

## Long-copy stress / defect caught during this run

Stress frame: `38:76`.

Initial structure:

- selected info stack: `38:63`, height `314`;
- stress info stack: `38:96`, height `578`, y `645`, bottom `1223`;
- closing copy was initially y `1198`.

This revealed a real stress regression: the dynamic stack expanded below the fixed closing-copy anchor even though the normal candidate screenshot looked clean.

Bounded correction:

- moved closing copy in selected/stress to y `1248`;
- moved the non-semantic bookmark away from the text lane (`x=865`, narrower width);
- retained title, semantic stack and paper grammar;
- rerendered the stress frame at reading scale.

Final stress screenshot: PASS. All three long Japanese operational roles remain readable with visible separation, the closing phrase remains below the stack, and the date remains inside the physical page.

## Structure QA

Current `38:43` metadata readback:

- native text nodes: `11`;
- all authored text uses `textAutoResize=HEIGHT`;
- dynamic info stack is native vertical Auto Layout;
- IMAGE fills: `0`;
- root size: `1000×1419`;
- no variable copy baked into decoration;
- old selected and all older history preserved, not overwritten.

Stress metadata confirms the three value fields expand to `132 px` each under the tested long copy and the full stack expands to `578 px`.

## Professional Design Council score

Current family-diverse candidate: **92/100**.

- Concept clarity / ownability: `15/15`
- Emotional excitement / pick-up appeal: `13/15`
- Japanese editorial typography: `14/15`
- Composition / hierarchy / rhythm: `14/15`
- Travel / destination integration without cliché: `9/10`
- Item-specific functionality: `10/10`
- Physical print credibility: `10/10`
- Editability / content resilience: `4/5`
- Family fit without template sameness: `3/5`

No Executive Creative Director, Japanese Editorial, or Print Production veto remains after the long-copy correction. The family-fit score reflects that the design intentionally keeps a restrained travel-paper family resemblance rather than maximizing novelty for its own sake.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- final writing method and pen placement;
- final installation wording/location;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

These do not block visual progression.

## Decision / next

`38:43` is the new ADD-09 Current. The prior `WORDS AS SOUVENIR` remains preserved as rollback/history.

Next high-value target: family-scale audit of **ADD-10 会場案内サイン**. Redesign only if its current dominant grammar materially repeats the promoted family-template fingerprint; otherwise retain the healthy Current and proceed.