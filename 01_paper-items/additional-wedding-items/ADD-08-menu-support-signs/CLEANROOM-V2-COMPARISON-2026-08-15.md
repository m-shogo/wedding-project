# ADD-08 メニュー補助サイン — Clean-room V2 Comparison — 2026-08-15

Status: `CLEANROOM_V2_COMPARISON_FAMILY / ALLERGY_DIETARY_STRONG / DRINK_WORLD_TRIP_MIXED / LEGACY_PRESERVED / NOT_PROMOTED`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Authority readback

- start/latest main before evidence write: `b22cfe8afd9cfaf8261fe899c2d76d82cdf26f5c`
- Figma: `xvJH23nWjWAApd3yOwr4y3`
- page: `0:1 / 01_PRODUCTION`
- retained production: `1:3 / FRAME_MENU_SUPPORT_A4`
- Drive: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Drive writes: `0`

The retained production was not duplicated or used as a component/source during V2 construction. It remains unchanged and was viewed only after the clean-room family had been authored and stress-checked.

## Inputs allowed into the rebuild

Only current SPEC facts/roles were used:

- primary A4 portrait 210×297 mm / working canvas 1400×1980;
- alternate A5 remains a future independent reflow target;
- bleed 3 mm / safe area 10 mm+;
- planned variants: Drink Menu Guide, Allergy / Dietary Information, World Trip Special Menu Introduction;
- all menu, drink, allergy, dietary and operational details remain native semantic placeholders rather than invented facts;
- variable text must remain editable and must not be rasterized.

## Clean-room V2 family

Section:

- `18:2 / CLEANROOM_ADD08_V2_COMPARISON_FAMILY_2026_08_15`

### Drink Menu Guide

- `18:3 / CLEANROOM_ADD08_V2_COMPARE_A4_DRINK_GUIDE`
- new editable native/vector construction with a tall index spine and original bubble-field SVG;
- 7 native text nodes;
- raster IMAGE fills: 0;
- visible text outside root: 0.

Whole-item QA: structurally clean and immediately readable, but after final comparison it remains somewhat sparse as a sellable A4 menu-support artifact. It is preserved as a serious comparison, not promoted.

### Allergy / Dietary Information

- `18:19 / CLEANROOM_ADD08_V2_STRONG_A4_ALLERGY_DIETARY`
- original navy header field + editable split-rule SVG;
- Japanese-first title and two clear semantic information columns;
- 8 native text nodes;
- raster IMAGE fills: 0;
- visible text outside root: 0.

Whole-item QA: PASS as a strong clean-room direction. The information role is clearer than the retained generic menu sheet for this specific planned variant, without equal cards or fabricated medical/food facts.

### World Trip Special Menu Introduction

- `18:33 / CLEANROOM_ADD08_V2_COMPARE_A4_WORLD_TRIP_MENU`
- original editorial edge + editable atmosphere/route SVG;
- 7 native text nodes;
- raster IMAGE fills: 0;
- visible text outside root: 0.

Whole-item QA: structurally clean and distinct, but the lower-middle field is still too quiet to claim a clear visual win over the retained production. Preserve for comparison; do not promote yet.

## Long-copy stress

Hidden after review:

- Drink: `18:48`
- Allergy/Dietary: `18:64`
- World Trip: `18:78`

Stress copy expanded the menu placeholders and staff-help text. All three roots retained text inside the 1400×1980 canvas. Screenshot review also showed no clipping or destructive overlap.

## Comparison decision

Only after all three clean-room V2 variants and stress checks were complete was retained production `1:3` viewed.

Result: `MIXED`.

- Allergy / Dietary V2 is a strong clean-room direction.
- Drink V2 and World Trip V2 are not yet a clear one-way improvement in visual density/closure.
- Because the clean-room mandate requires a clear visual win before promotion, the V2 family is **not** globally promoted and retained production remains untouched.
- Next safe work is a fresh blank V3 direction for Drink and World Trip, without using retained production or V2 as a component/layout source.

## Hybrid / generation decision

`IMAGE_GENERATION_NOT_REQUIRED_THIS_ITERATION`.

The unresolved issue is composition/density rather than missing photography or illustration. Native typography plus editable SVG remains the appropriate method until a screenshot-supported raster role is identified.

## Deferred

- final food/drink copy;
- confirmed allergy/dietary wording and venue operation guidance;
- printer bleed/template/profile;
- 100% physical proof and venue/table visibility;
- A5 independent reflows after an A4 clean-room direction is selected.
