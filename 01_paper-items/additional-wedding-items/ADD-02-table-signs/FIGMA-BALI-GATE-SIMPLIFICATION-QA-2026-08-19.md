# ADD-02 Bali — gate simplification QA

Status: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE`
Date: 2026-08-19
Start authority SHA: `1fed86dd26f066341f8938125f158350c6cf7b6a`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production: `2:74 / FRAME_TABLE_SIGN_BALI`
- Drive: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- retained print-grain IMAGE role unchanged

## Visible problem

Fresh whole-item review showed eight evenly stepped cream gate bars around the central gap. At thumbnail scale the repeated symmetric steps read partly as an audio equalizer / dashboard glyph rather than destination-specific gate architecture.

This was a fixed-art problem, not a missing-image problem. Country/Japanese labels, table number, semantic note, clay/black fields, ochre sun and print grain were already adequate and were not candidates for replacement.

## Bounded comparisons

Two rollback-safe comparisons were created from the live Bali root without changing production first:

1. `106:2 / QA / ADD-02 BALI / OUTER GATE ONLY / 2026-08-19`
   - retained only `BA_GATE_L_0 / BA_GATE_R_0`;
   - rejected because the top field became too empty and the gate lost useful architectural depth.
2. `106:26 / QA / ADD-02 BALI / TWO OUTER GATE PAIRS / 2026-08-19`
   - retained `BA_GATE_L/R_0` and `BA_GATE_L/R_1`;
   - hid only `BA_GATE_L/R_2` and `BA_GATE_L/R_3`;
   - adopted because the motif still reads as a split gate while the equalizer-like repetition is materially reduced.

## Production change

Before adoption, the full pre-change production root was preserved as hidden rollback:

- `107:2 / ROLLBACK / ADD-02 BALI / PRE_GATE_SIMPLIFICATION / 2026-08-19`

Production `2:74` now hides only:

- `21:398 / BA_GATE_L_2`
- `21:399 / BA_GATE_R_2`
- `21:400 / BA_GATE_L_3`
- `21:401 / BA_GATE_R_3`

The two outer gate pairs remain visible. Comparison frames were hidden after QA.

## Three-scale / structure QA

- whole-item ~500px: PASS; gate remains recognizable and hierarchy is clearer;
- reading ~1000px: PASS;
- actual canvas: `1000×1480`;
- visible native text: `4`;
- visible IMAGE-fill nodes: `1` (existing tiled print grain);
- visible text outside root: `0`;
- no generated asset or Drive write was required.

A numeric text-box overlap remains between `TXT_BA_NOTE` and the large `TXT_BA_NO` bounding regions, but fresh whole/read screenshots show no visible glyph collision. Per Current, good optical spacing was not damaged merely to eliminate a bounds-only intersection.

## Decision

`ADOPTED` — reducing the stepped gate from four pairs to two improves print/editorial reading without stripping the item to an empty generic field.

## What must remain item-specific

Do not transfer Bali's clay/black palette, sun, gate geometry, exact bar count, table-number placement, or typography to other items. The transferable method is only to compare whether repeated symmetric fixed-art marks create unintended UI/chart semantics at whole-item scale.
