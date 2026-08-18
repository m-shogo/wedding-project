# ADD-08 Drink Menu Guide — V3 Measure Tick Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS`
Date: 2026-08-19
Start authority SHA: `a3e1d918e538dc7fff3bb9a9ce1f1dfd4789c2a4`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected Drink V3: `21:3 / CLEANROOM_ADD08_V3_A4_DRINK_LEDGER`
- long-copy proof: `23:34 / QA_CLEANROOM_ADD08_V3_DRINK_LONG_COPY_STRESS_FINAL_2026_08_15`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- retained legacy production remains untouched.

## Visible problem

Fresh whole-item / reading / actual-size review showed that the wide teal fixed-art field still contained twelve evenly spaced short horizontal tick marks beside the two beverage curves.

The fake numeric measure labels had already been removed in the 2026-08-18 cleanup, so the remaining repeated ticks no longer conveyed menu data. They instead made the right field read like a chart / measurement UI, which conflicted with the intended editorial print artifact.

## Bounded comparison

Rollback-safe comparison:

- `31:2 / QA_ADD08_DRINK_V3_NO_MEASURE_TICKS_2026_08_19`

The test changed only one fixed-art sub-role:

- hid the 12-vector tick group inside `VECTOR / BEVERAGE MEASURE CURVES`;
- retained the full teal field;
- retained both cream beverage curves;
- retained all native drink/menu copy and existing layout geometry.

At reading scale, the comparison was materially cleaner. The teal field still provided the needed asymmetric counterweight, while the dashboard/chart implication disappeared. The prior experiment that narrowed the teal field remains rejected; this test preserves its successful width and only subtracts the now-functionless tick marks.

## Adopted Figma change

Selected `21:3`:

- `21:10` tick-mark group: hidden;
- `21:7` beverage-curve group: retained;
- `21:5` teal fixed-art field: retained.

Long-copy proof `23:34`:

- `23:41` tick-mark group: hidden;
- `23:38` beverage-curve group: retained.

Pre-change rollback:

- `31:43 / ROLLBACK_ADD08_DRINK_V3_PRE_TICK_SUBTRACTION_2026_08_19` — hidden;
- `31:84 / ROLLBACK_ADD08_DRINK_V3_STRESS_PRE_TICK_SUBTRACTION_2026_08_19` — hidden.

Comparison `31:2` is hidden after adoption.

## Three-scale visual QA

- whole / thumbnail (`maxDimension=500`): PASS — Japanese title, drink ledger and teal/cream asymmetry remain clear;
- reading scale (`maxDimension=1000`): PASS — curve-only fixed art is materially less chart-like than the previous curve+ticks treatment;
- actual size (`1400×1980`): PASS — no loss of hierarchy or balance; fixed art reads as abstract beverage movement rather than a scale or graph.

The long-copy proof was temporarily shown and reviewed at native `1400×1980`, then returned to hidden state. Long Japanese menu guidance, multi-line alcohol/soft-drink entries and lower guidance remain clear with the fixed-art subtraction.

## Structure QA

Post-adoption readback:

### Selected `21:3`

- visible native text: `9`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- same-parent text collisions: `0`;
- tick group `21:10`: hidden.

### Long-copy proof `23:34`

- visible native text: `9`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- same-parent text collisions: `0`;
- tick group `23:41`: hidden;
- returned to hidden state after screenshot QA.

No variable menu facts were baked into vector/raster content.

## Asset / generation decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The concrete defect was repeated fixed vector micro-geometry behaving like a measurement UI, not missing photography, food imagery or texture. Drive write: `0`.

## Result

`VERIFIED_LOCAL / DRINK_V3_MEASURE_TICK_UI_SUBTRACTION_ADOPTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / CLEANROOM_SELECTED_FAMILY / LEGACY_PRESERVED / NOT_PRINT_READY`.