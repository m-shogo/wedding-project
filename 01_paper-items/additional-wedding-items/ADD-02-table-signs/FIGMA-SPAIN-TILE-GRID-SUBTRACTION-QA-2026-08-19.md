# ADD-02 Spain — tile-grid subtraction QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / SPAIN_TILE_GRID_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
Start authority SHA: `c1e3d89f90cee0645dd2bf64baef329a9dc67caf`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- selected Spain root: `2:29 / FRAME_TABLE_SIGN_SPAIN`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- existing print-grain master remains unchanged.

## Visible problem

Fresh whole-item review found eight evenly spaced `ES_TILE_H_* / ES_TILE_V_*` construction lines in the terracotta upper field. Together they read more like a chart/grid scaffold than destination-specific print art, especially at thumbnail scale. The stronger fixed roles were already the saffron/dark/terracotta color blocking, native `SPAIN`, and the single outlined diamond.

This was not a missing-image problem. No new raster, SVG, generated asset, factual copy, or table information was required.

## Bounded comparison

Two rollback-safe comparisons were created from the current selected Spain sign:

1. `105:26 / QA / ADD-02 SPAIN / NO TILE GRID / 2026-08-19`
   - hides only `ES_TILE_H_1`–`ES_TILE_H_5` and `ES_TILE_V_1`–`ES_TILE_V_3`.
2. `105:50 / QA / ADD-02 SPAIN / PURE COLOR FIELD / 2026-08-19`
   - hides the same grid plus `ES_DIAMOND`.

The first comparison was stronger. Removing the grid eliminated dashboard scaffolding while the diamond still gave the upper field one intentional architectural/print anchor. The second comparison became too empty and was rejected.

## Promotion / rollback

Before selected mutation, a hidden rollback was created:

- `105:74 / ROLLBACK / ADD-02 SPAIN / PRE TILE GRID SUBTRACTION / 2026-08-19`

Promoted selected change on `2:29`:

- hide `ES_TILE_H_1`–`ES_TILE_H_5`;
- hide `ES_TILE_V_1`–`ES_TILE_V_3`;
- retain `ES_DIAMOND`;
- retain saffron/dark/terracotta fields, country/Japanese labels, semantic country-note placeholder, large `04`, lower rule/accent, and tiled print grain.

Both comparison studies were hidden after promotion.

## Three-scale / structure QA

- whole item / 500px: PASS; the upper field reads as editorial color blocking rather than a grid/chart.
- reading scale / 1000px: PASS.
- actual-size / `1000×1480`: PASS.
- visible native text: `4`.
- visible IMAGE fills: `1` (existing tiled print grain only).
- visible text outside root: `0`.
- variable/factual copy baked into raster/SVG: `0`.

## Drive / asset decision

Exact Drive authority metadata was live-read immediately before promotion/evidence write. Drive writes: `0`. Image generation: `0`.

## Decision

`VERIFIED_LOCAL / SPAIN_TILE_GRID_SUBTRACTION_PASS`.

ADD-02 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. This is an item-specific subtraction, not a family-wide style rule; other country lines/shapes should only be removed when fresh screenshots show the same non-functional chart/form reading.

## Deferred finalization

Still `NOT_PRINT_READY` until final country-description copy, stand/holder dimensions, vendor bleed/safe-area template, stock/profile, and physical proof are authoritative.
