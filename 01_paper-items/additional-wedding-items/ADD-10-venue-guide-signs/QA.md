# ADD-10 会場案内サイン — QA

Status: `CURRENT / VNEXT_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / AI_TEXT_GEOMETRY_READBACK_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- selected vNext V3 page: `49:2 / VNEXT_V3_SELECTED / ADD-10 / COLOR SIGNAL / 2026-08-21`
- selected left/right/forward: `49:3 / 49:19 / 49:33`
- hidden long-copy stress: `49:47`
- prior clean-room V4 retained: `32:3 / 32:15 / 32:27`
- earlier vNext V2 retained: `48:31 / 48:42 / 48:53`
- retained legacy family: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- Drive write this run: `0`

## vNext reset result

The first vNext `SUNSHINE ARROW` direction was not promoted. Live screenshots showed that it remained too sparse and visually polite for the current professional reset even though direction truth was correct.

A fresh blank-frame V3, `COLOR SIGNAL`, was then authored without duplicating V2/V4/legacy production. The V3 direction uses:

- deep-ocean navy as a distance-legibility field;
- large cream Japanese destination/floor copy;
- one oversized coral directional gesture;
- restrained yellow/lagoon indexing accents;
- a warm-paper lower guidance band;
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

Final stress:

- destination bottom `540`;
- floor/room top `610` → `70px` clearance;
- horizontal arrow top `850` → `170px` clearance after floor/room;
- outside visible text `0`;
- screenshot PASS.

## Structure / editability QA

Hybrid responsibility split:

- destination / floor-room / guidance / date: native editable Figma text;
- direction gesture: editable SVG vector tree (`FRAME → VECTOR`);
- fixed accent fields: native geometry;
- generated raster: `0`;
- replaceable image role: `0`;
- IMAGE fills: `0`.

Structural readback reproduced `AI_TEXT_RENDER_OK_BUT_BOUNDS_INVALID` in KICK / NOTE / DATE roles. They rendered correctly but initially retained `textAutoResize=NONE` and nominal 10px bounds.

Final repair loads fonts, preserves width/bounds, and applies `textAutoResize=HEIGHT` **after** any `resize()` call. All selected/stress semantic text roles now use real auto-height geometry.

## Professional Design Council

Score: `91 / 100`.

No Creative Director, Japanese Editorial, or Print Production veto remains.

Detailed evidence: `PROFESSIONAL-VNEXT-2026-08-21.md`.

## Image-generation decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The diagnosed bottleneck was first-glance recognition, direction correctness, hierarchy and emotional force. Decorative destination imagery would slow wayfinding and add stock/AI-template risk. No Drive asset was generated or added merely to satisfy an image quota.

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

`VNEXT_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / AI_TEXT_GEOMETRY_READBACK_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next progression target: `ADD-11 写真共有 / QR案内` professional vNext clean-room reset.
