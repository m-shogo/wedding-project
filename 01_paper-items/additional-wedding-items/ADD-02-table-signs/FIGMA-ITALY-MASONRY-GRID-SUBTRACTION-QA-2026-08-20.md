# ADD-02 Italy — Masonry Grid Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / ROLLBACK_SAFE`
Date: 2026-08-20
Start authority SHA: `02ae5afefc1cba0f32c87c8d15ba58313aeef43f`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production Italy root: `2:11 / FRAME_TABLE_SIGN_ITALY`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- existing print-grain IMAGE role retained; Drive writes: `0`

## Visible problem

Fresh whole-item review showed the repeated `V2_MASONRY_PRINT_LINES` behind the three architectural arches reading more like construction/grid scaffolding than destination-specific print art. The arches, color blocks and ground register already communicate the architectural idea without the repeated masonry ruler.

## Bounded test

A rollback-safe production duplicate was created on a new QA page:

- page: `114:2 / QA / ADD-02 ITALY / MASONRY SUBTRACTION / 2026-08-20`
- comparison: `114:3 / QA_ADD02_ITALY_NO_MASONRY_GRID_2026_08_20`
- changed only: `V2_MASONRY_PRINT_LINES` visibility → hidden

The no-grid version preserved the three large arch silhouettes, color fields, `ITALY`, `イタリア`, `[国テーマ説明]`, large `02`, lower register, olive-branch line art and print grain while removing the residual chart/scaffold reading.

## Adoption / rollback

Before mutating selected production, the full pre-change Italy root was saved as hidden rollback:

- `115:2 / ROLLBACK / ADD-02 ITALY / PRE_MASONRY_SUBTRACTION / 2026-08-20`

Adopted on production:

- `21:250 / V2_MASONRY_PRINT_LINES` → hidden
- comparison `114:3` hidden after adoption

No other country sign was changed.

## Three-scale / structure QA

- whole-item ~500px: PASS
- reading ~1000px: PASS
- native canvas: `1000×1480`
- visible native text: `4`
- visible IMAGE-fill nodes: `1`
- visible text outside root: `0`
- production masonry group visible: `false`
- rollback exists: `true`

## Decision

`VERIFIED_LOCAL / ADOPTED`.

The transferable lesson is not “remove architectural detail.” It is to test whether repeated construction lines still carry an item-specific print/art function after stronger silhouette and color-field cues already establish the concept. Here they did not.

## Deferred

Final country-description copy, physical stand obstruction, vendor bleed/safe-area template, paper/profile proof and actual-size physical print remain deferred. No factual or variable copy was invented.
