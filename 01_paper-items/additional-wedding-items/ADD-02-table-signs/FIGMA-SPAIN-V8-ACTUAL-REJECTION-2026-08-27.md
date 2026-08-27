# ADD-02 Spain — V8 actual Figma rejection — 2026-08-27

Status: `V8_REJECTED_IN_FIGMA / CURRENT_PRODUCTION_UNCHANGED / SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_METHOD_SWITCH_REQUIRED`

## Live authority

- latest `main` immediately before this write: `5f1343f0805161061dfed00498a0fa24d77dc852`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `LAZAZ0u3RGqtN4bYFPZ3pU`
- retained Spain production: `2:29 / FRAME_TABLE_SIGN_SPAIN`
- exact Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Clean-room build performed

A new blank `1000×1480` frame was created from zero as `188:2`, without duplicating Current, V5, V6, or V7.

Allowed facts/semantic roles only:

- `SPAIN`
- `スペイン`
- table number `04`
- `[国テーマ見出し]`
- `[国テーマ説明]`
- `2026.10.24`
- `TABLE 04`

Authoring split:

- native editable text: all 7 roles
- editable SVG: 0
- generated/composed raster: 0
- replaceable IMAGE role: 0
- fixed rails/cards/tiles/badges/icons: 0

## Screenshot result

The V8 frame was rendered at 500px whole-item and 1000px reading scale. It failed before production comparison/promotion.

Visible failures:

1. The oversized `04` wrapped visually into a separated `0` and `4`, so the intended single table-number memory device did not read as one unit.
2. Removing fixed-art modules did not solve the earlier premium-by-emptiness failure. The lower half still reads as a large unused cream field rather than intentional editorial rhythm.
3. `SPAIN` + giant number + isolated Japanese copy reads closer to a generic festival/identity poster than a warm wedding table sign.
4. The destination feeling is carried too heavily by red/yellow scale contrast; there is not enough Spain-specific editorial character in the composition itself.

This hits V8's predeclared immediate reject conditions. Do not rescue V8 by adding rails, tiles, arches, waves, badges, planes, tapas icons, decorative English, or generic texture.

## Structural readback

V8 remained structurally clean despite visual rejection:

- root `188:2`: `1000×1480`
- native text roles: 7
- all text roles: `textAutoResize=HEIGHT`
- outside text: 0
- IMAGE fills: 0

The failure is therefore visual/art-direction, not overflow or flattening.

After QA the candidate was preserved as hidden history:

- `188:2 / REJECTED / ADD-02 SPAIN / V8 TARDEO TYPE MASS / 2026-08-27`
- `visible=false`

Current Spain `2:29` was not mutated.

## Decision / next method

`V8 = REJECTED_IN_FIGMA`.

Spain remains `SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS` under the Spain-specific override.

The next clean-room direction must change premise rather than cosmetically retrying type-mass. V7 and V8 together show that simply removing fixed art and enlarging semantic type can still collapse into premium-by-emptiness / generic identity-poster grammar.

Next method should begin from a different item-specific editorial premise that creates wedding warmth and destination specificity without returning to Current's UI-like tile/rail grammar or the rejected V5/V6 arch/tile grammar. Do not use V8 as a visual reference when constructing that next blank frame.

## Asset / Drive decision

- image generation: 0
- Drive write: 0

No screenshot-supported image/hero/texture bottleneck was established. The failed variable is composition/art direction.

## Learning state

Spain-only:

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL_PRE_FIGMA → V7_REJECTED_PRE_FIGMA → V8_TESTED_IN_FIGMA → V8_REJECTED_IN_FIGMA → CLEANROOM_METHOD_SWITCH_REQUIRED`.

No cross-item rule is promoted.
