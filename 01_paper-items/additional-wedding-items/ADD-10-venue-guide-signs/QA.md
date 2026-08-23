# ADD-10 会場案内サイン — QA

Status: `CURRENT / VNEXT_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / AI_TEXT_GEOMETRY_READBACK_PASS / DIVIDER_SUBTRACTION_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-23
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- selected vNext V3 page: `49:2 / VNEXT_V3_SELECTED / ADD-10 / COLOR SIGNAL / 2026-08-21`
- selected left/right/forward: `49:3 / 49:19 / 49:33`
- hidden long-copy stress: `49:47`
- latest refinement evidence: `FIGMA-DIVIDER-SUBTRACTION-QA-2026-08-23.md`
- pre-divider-subtraction rollbacks: `56:16 / 56:30 / 56:44 / 56:58` — hidden
- bounded no-divider comparison: `56:2` — hidden after verification
- prior clean-room V4 retained: `32:3 / 32:15 / 32:27`
- earlier vNext V2 retained: `48:31 / 48:42 / 48:53`
- retained legacy family: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- Drive write for the latest refinement: `0`

## vNext reset result

The first vNext `SUNSHINE ARROW` direction was not promoted. Live screenshots showed that it remained too sparse and visually polite for the current professional reset even though direction truth was correct.

A fresh blank-frame V3, `COLOR SIGNAL`, was then authored without duplicating V2/V4/legacy production. The Current direction uses:

- deep-ocean navy as a distance-legibility field;
- large cream Japanese destination/floor copy;
- one oversized coral directional gesture;
- one full-width yellow top signal with a clear family/wayfinding hierarchy job;
- a warm-paper lower guidance band;
- no unsupported short divider after the 2026-08-23 bounded subtraction QA;
- no floating lagoon index or decorative lower foot bars after earlier bounded cleanup;
- no fake airport codes, barcodes, route nodes, badges, cards, gradients, shadows, decorative English, stock imagery or raster travel filler.

## Three-scale visual QA

- whole / thumbnail: PASS — destination and direction are immediate and memorable;
- reading scale: PASS — Japanese hierarchy remains clear and the lower guidance band does not compete with wayfinding;
- actual-size `1400×1980`: PASS — type, arrow silhouette and color contrast remain credible at working A4 size;
- LEFT direction truth: PASS;
- RIGHT direction truth: PASS;
- FORWARD direction truth: PASS.

The retained V4 was opened only after V3 reached maturity. V3 clearly wins the current `travel / flight / pop / excitement` brief on recognition speed, emotional force and thumbnail identity while preserving wayfinding functionality.

## Long-copy stress

Hidden stress `49:47` uses:

- `[メインダイニング・レセプション会場]`
- `[ホテル棟 3階・オーシャンビュー バンケットルーム]`

The first stress attempt failed because the initial destination scale was too large. The selected family was hardened to a 120px destination role with a deeper reserved copy lane.

Final stress before the latest subtraction:

- destination bottom `540`;
- floor/room top `610` → `70px` clearance;
- horizontal arrow top `850` → `170px` clearance after floor/room;
- outside visible text `0`;
- screenshot PASS.

After the 2026-08-23 divider subtraction, stress `49:47` was temporarily revealed and freshly rendered. The same long destination/floor-room strings remain separated from each other and the arrow; the removed divider was not providing copy separation. Stress returned hidden after QA.

## 2026-08-23 divider subtraction refinement

Fresh whole-item review found the short yellow `DECOR / DIVIDER` between the floor/room role and the arrow had no remaining destination, direction, room/floor, mounting, trim/fold, binding, or navigational function. With the full-width yellow top signal already providing the secondary yellow cue, the short rule read as leftover decorative punctuation.

Rollback-safe LEFT comparison:

- `56:2 / QA / ADD-10 LEFT / NO DIVIDER / 2026-08-23`

Only the divider was hidden. The no-divider result was stronger because `[目的地] → [階数・部屋名] → arrow` reads as one direct wayfinding path and the oversized arrow gains clearer authority without losing grouping or function.

Full hidden pre-change rollbacks were created before Current mutation:

- `56:16` — LEFT;
- `56:30` — RIGHT;
- `56:44` — FORWARD;
- `56:58` — long-copy stress.

Production/stress divider roles now hidden:

- LEFT `49:9`;
- RIGHT `49:25`;
- FORWARD `49:39`;
- stress `49:53`.

Fresh LEFT native render, RIGHT reading-scale render and realistic long-copy stress all PASS after subtraction.

## Structure / editability QA

Hybrid responsibility split:

- destination / floor-room / guidance / date: native editable Figma text;
- direction gesture: editable SVG vector tree (`FRAME → VECTOR`);
- full-width top signal / lower guidance field: simple native fixed geometry with explicit hierarchy/wayfinding jobs;
- unsupported short divider: hidden after bounded comparison;
- generated raster: `0`;
- replaceable image role: `0`;
- IMAGE fills: `0`.

Structural readback had previously reproduced `AI_TEXT_RENDER_OK_BUT_BOUNDS_INVALID` in KICK / NOTE / DATE roles. They rendered correctly but initially retained `textAutoResize=NONE` and nominal 10px bounds. The verified repair loads fonts, preserves width/bounds, and applies `textAutoResize=HEIGHT` **after** any `resize()` call.

Post-divider-subtraction Plugin API readback:

| Root | visible native text | fixed-height text | outside text | IMAGE fills | visible divider |
| --- | ---: | ---: | ---: | ---: | ---: |
| LEFT `49:3` | 5 | 0 | 0 | 0 | 0 |
| RIGHT `49:19` | 5 | 0 | 0 | 0 | 0 |
| FORWARD `49:33` | 5 | 0 | 0 | 0 | 0 |
| stress `49:47` | 5 | 0 | 0 | 0 | 0 |

No variable/factual copy was rasterized or flattened.

## Professional Design Council

Score remains `91 / 100 / PASS / NO VETO`.

The 2026-08-23 refinement removes one unsupported fixed punctuation mark without weakening concept clarity, Japanese hierarchy, direction recognition, physical credibility or long-copy resilience.

Detailed original vNext evidence: `PROFESSIONAL-VNEXT-2026-08-21.md`.

## Image-generation decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The latest diagnosed bottleneck was unsupported fixed decoration, not missing photography, illustration, texture or destination atmosphere. Decorative imagery would slow wayfinding and add stock/AI-template risk. No Drive asset was generated or added merely to satisfy an image quota.

## Learning state

The divider cleanup is `VERIFIED_LOCAL` application of an existing cross-item QA method:

> A line/field is not retained merely because it decorates a gap. At whole-item scale it should prove a reader-facing, physical, binding or navigational job.

This is not a blanket `remove dividers` rule. The full-width top signal remains because it performs a clear family/signal function; the oversized arrow remains because it performs the core wayfinding function. Exact geometry and color treatment are ADD-10-specific.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Do not fabricate:

- official destination names / venue terminology;
- exact left/right/forward truth per installation point;
- final floor/room labels;
- sign count / installation locations.

Final print readiness also waits for:

- frame/stand/wall-mount interference check;
- matte/low-glare venue-light proof;
- route walk-through by a first-time visitor;
- printer template/profile and bleed/trim confirmation;
- 100% physical print proof and final PDF/export.

## Current result

`VNEXT_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / AI_TEXT_GEOMETRY_READBACK_PASS / DIVIDER_SUBTRACTION_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`.

Next progression target: continue ADD-11 onward with fresh live review, but redesign only when a concrete screenshot-supported visual, typography, physical-artifact, or authority defect is present.
