# Rurubu WEDDING V8 — 1DAY J Time-Scaled Information Design QA

Date: 2026-08-21
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current candidate: `2179:2`
Previous rollback: `2164:67`
Scope: Rurubu WEDDING only

## Visible problem

The prior V8 1DAY right page used generated role `2164:91` / Drive `1KxMoNigZn6yKVu8e1MP9xt7Z-MaQzn-q`. It visually resembled an infographic—four vertical strips, repeated dots, a heavy horizontal bar—but those marks did not visibly encode the existing schedule times, activity sequence, or interval lengths. The left page also used four bars of different lengths without an explicit information contract.

## New professional research used

Giorgia Lupi's Data Humanism treats data as a visual language grounded in human stories and context rather than sterile graphic abstraction. Her information-design practice emphasizes understanding what the quantities actually contain before assigning visual form. Pentagram's data-driven editorial work similarly uses timelines and data structures to orient a reader within a real information system.

This was applied as an information-binding principle, not as a copied visual style.

## Root-cause hypothesis

The AI/prototype feeling came from **information-looking marks without an actual data binding**. Decorative bars and dots were signaling rigor without helping the reader understand the day's rhythm.

## Bounded test

1. Duplicate current 1DAY `2164:67` to rollback-safe candidate `2179:2`.
2. Hide the generated DAY_FOLDOUT visual.
3. Hide the four arbitrary left-side length bars while keeping the existing schedule list.
4. Preserve all four existing schedule facts:
   - `10:00 / START / 海辺`
   - `11:40 / CAFE / 長めに`
   - `15:10 / WALK / 寄り道`
   - `18:30 / TABLE / ゆっくり`
5. Build a native editable right-page time axis.
6. Place the four time markers according to elapsed time from 10:00, so the 10:00→11:40 interval is visibly shorter than the midday/afternoon intervals.
7. Keep the existing close: `全部回らなくてもいい。気になった場所で、予定より少し長く。`
8. Preserve former 1DAY F `2164:67` hidden at `x=7200 / y=7000`; promote J to `x=3600 / y=4550`.

## Three-scale QA

### Whole-item / thumbnail — 500px

PASS.

The right-page axis is still legible as a four-stage day, while the unequal marker spacing survives and communicates a different rhythm than the left list.

### Reading scale — 1400px

PASS.

Times, activity names, descriptions and elapsed spacing can be read together. The right page now performs an information-design role rather than displaying a schematic placeholder graphic.

### Actual size — 1588×1123

PASS.

All event labels remain readable; the axis and markers are crisp native geometry; the schedule copy remains native text and no generated raster is required for the current state.

## Structural readback

- visible native text: `34`
- visible IMAGE fill nodes: `0`
- same-parent text intersections: `0`
- 18px safe-area risks: `0`
- visible internal/process-language fingerprints: `0`
- whole-page flattening: `0`

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- previous V8 generated DAY_FOLDOUT master: preserved only in hidden rollback/history, not claimed by current 1DAY J

This pass does not claim generation → Drive → Figma closure. It verifies that an information-looking visual should be replaced by an actual information system when the necessary data already exists in native text.

## Result

`2179:2` promoted to current V8 1DAY/Model Course.

State: `DESIGN_QA_PASS / VERIFIED_LOCAL / NOT_GLOBAL_WINNER / NOT_PRINT_READY`.

## Learning

`RSL-191 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint: `F-RSL-191-INFOGRAPHIC-MARKS-WITHOUT-DATA-BINDING`

Transferable hypothesis: if graphic marks imply a timeline, scale, ranking, route or data system, at least one visible property should be bound to actual information. If the graphic is purely schematic, test a native data-bound structure or an explicitly non-data illustration instead of keeping pseudo-information design.

Must remain Rurubu-specific: exact times/activities, page copy, axis geometry, type scale, palette, page coordinates and V8 production state.
