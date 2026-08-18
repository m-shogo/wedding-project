# ADD-08 World Trip V3 — redundant route-dot subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY / WORLD_TRIP_ROUTE_DOT_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `f07fa0d246b4e3d6bba208cff5d74f266d7811a2`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- World Trip selected: `21:43 / CLEANROOM_ADD08_V3_A4_WORLD_TRIP_CHAPTERS`
- World Trip long-copy proof: `23:75 / QA_CLEANROOM_ADD08_V3_WORLD_LONG_COPY_STRESS_FINAL_2026_08_15`
- Drive authority: `ADD-08_メニュー補助サイン` / `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`
- retained legacy production remains untouched.

## Visible problem

Fresh whole/reading/actual-size review found three mustard endpoint/checkpoint dots repeated along the right-side decorative culinary route. The route already functions as abstract fixed art beside the `01 / 02 / 03` culinary chapters, but the dots carried no guest-facing destination, chapter, timing, ingredient, or other semantic meaning. They made the route read more like a progress/slider/checkpoint UI than editorial print art.

The two orbit rings and the long route curve were intentionally retained because they still provide the fixed-art counterweight to the chapter ledger. The numbered native chapter hierarchy `01 / 02 / 03` also remains untouched because those numbers are real content hierarchy rather than decorative checkpoints.

## Bounded comparison

Rollback-safe comparison:

- `33:2 / QA / ADD-08 WORLD TRIP / REDUNDANT ROUTE DOT SUBTRACTION / 2026-08-19`

Only the three-dot vector group was hidden. Rust title field, chapter paper field, orbit rings, long route curve, three native culinary chapters, semantic placeholders, guidance note and date were unchanged.

Comparison result: stronger. The route continues to add asymmetric movement, but without the three non-semantic dots it reads as fixed editorial linework rather than a UI progress path.

## Promotion / rollback

Promoted to selected and matching long-copy proof:

- selected dot group `21:51` hidden;
- stress dot group `23:83` hidden.

Hidden rollback copies:

- `34:2 / ROLLBACK / ADD-08 WORLD TRIP V3 / PRE ROUTE DOT SUBTRACTION / 2026-08-19`;
- `34:40 / ROLLBACK / ADD-08 WORLD TRIP STRESS / PRE ROUTE DOT SUBTRACTION / 2026-08-19`.

Comparison `33:2` hidden after promotion.

## Three-scale / structure QA

- whole / thumbnail: PASS;
- reading scale: PASS;
- selected actual size `1400×1980`: PASS;
- long-copy actual-size screenshot: PASS and proof returned hidden after QA.

Post-write readback:

- selected visible native text: `14`;
- selected IMAGE fills: `0`;
- selected outside visible text: `0`;
- selected text collisions: `0`;
- selected route-dot group visible: `false`;
- stress visible native text while QA-revealed: `14`;
- stress IMAGE fills: `0`;
- stress outside visible text: `0`;
- stress text collisions: `0`;
- stress route-dot group visible: `false`;
- stress hidden again after QA.

The hidden stress retains explicit stress-only `LAYOUT DUMMY` payload wording for maximum-copy validation; that language is not visible in selected guest-facing production.

## Drive / image decision

Drive authority metadata was live-read before the edit. New Drive assets: `0`. Image generation: `0`.

The defect was redundant endpoint/checkpoint micro-geometry, not missing illustration or photography.

## Decision

`WORLD_TRIP_ROUTE_DOT_SUBTRACTION_PASS`.

ADD-08 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY`. This is an application of the already-promoted project rule that non-semantic endpoint/checkpoint markers can make print linework read like UI. It is **not** permission to remove meaningful destination, timeline, map, punch, or chapter markers that carry real semantic/physical roles.