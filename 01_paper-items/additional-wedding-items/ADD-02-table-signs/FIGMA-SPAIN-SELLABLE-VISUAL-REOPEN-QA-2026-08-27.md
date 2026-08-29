# ADD-02 Spain — Sellable visual reopen / 2026-08-27

Status: `CURRENT_VISUAL_OVERRIDE / SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / SPAIN_LOCAL_ART_DIRECTION_REBUILD_REQUIRED / V7_REJECTED_PRE_FIGMA / V8_SERIOUS_PRE_FIGMA_CANDIDATE / CURRENT_PRODUCTION_UNCHANGED / NOT_PRINT_READY`

This is the newest item-specific visual-status authority for ADD-02 Spain only. It supersedes the `SELLABLE_VISUAL_QA_PASS` portion of `QA.md` for Spain until a new blank-frame candidate is independently verified. Existing structural, factual, long-copy, rollback, date-legibility and family-authority evidence remains valid.

## Live authority

- latest `main` observed immediately before this write: `eb8e1b31c0cc0086bd886e1ce2b517716da5932c`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Spain production root: `2:29 / FRAME_TABLE_SIGN_SPAIN`
- exact Drive folder verified live: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive write: `0`
- Figma production mutation: `0`
- image generation: `0`

## Fresh visual evidence

Fresh live screenshots were reviewed at:

- whole-item / thumbnail: max dimension `500px`;
- reading scale: max dimension `1000px`;
- native root is `1000×1480`.

The design remains structurally clean, but the reopened visual question is different: **if this arrived today as a new paid wedding table-sign proposal, would it be selected?** On that criterion, Spain should no longer be treated as visually complete.

Visible issues:

1. The lower `COURTYARD FLOOR` is composed of five isolated rectangular `TILE A–E` blocks. At whole and reading scales these do not read convincingly as ceramic/courtyard material; they read as generic colored UI/content blocks.
2. The central `COBALT COLUMN + SAFFRON SLIVER` is a very large vertical bar with no reader-facing, physical-paper, architectural or information-binding job strong enough to justify its visual mass.
3. The composition is split into a red header, sparse cream body, a large vertical rail, and a rectangular bottom module. The result is closer to a layout/system exercise than a sellable destination-specific wedding graphic.
4. Placeholder copy is not itself the defect. The problem remains even when judging only hierarchy, negative space, fixed-art meaning and destination specificity.

Live metadata confirms the visual grammar is carried by generic primitives rather than hidden raster problems:

- `173:88 / DECOR / FESTIVE TOP FIELD`
- `173:89 / DECOR / COBALT COLUMN`
- `173:90 / DECOR / SAFFRON SLIVER`
- `173:91 / DECOR / COURTYARD FLOOR`
- `173:92–96 / DECOR / TILE A–E`

Semantic copy remains native Figma text, and no IMAGE fills are implicated.

## Current decision

`SPAIN_LOCAL_SELLABLE_VISUAL_PASS = REOPENED`.

Do **not** mutate Current `2:29` incrementally to fix this. The user-mandated clean-room policy applies: the next serious Spain proposal must start from a blank `1000×1480` frame using only verified facts/constraints/semantic requirements. Current Spain remains untouched as comparison/rollback history.

The previously rejected Spain V5 (`COURTYARD TILE FOLD`) and V6 (`SUNLIT ARCHWAY POSTER`) remain terminal evidence for their respective failure fingerprints. Do not restyle or resume them.

## V7 TARDEO TYPE SHEET — rejected before Figma assembly

V7 deliberately removed fixed art and proposed a blank type-first sheet using only:

- `SPAIN / スペイン`;
- table number `04`;
- `[国テーマ見出し]`;
- `[国テーマ説明]`;
- `2026.10.24`;
- warm cream paper + native typography;
- SVG `0`, generated raster `0`, IMAGE role `0`.

A clean-room 1000×1480 composition proxy was rendered using only those allowed semantic roles and no Current/V5/V6 geometry.

Result: `V7_REJECTED_PRE_FIGMA`.

The oversized `04` was a useful memory device, but compact country identity + one isolated middle copy block + a very large unused lower field produced **premium-by-emptiness**. At whole/reading scale it looked more like restrained brand-poster practice than a lively wedding table sign.

Do not rescue V7 by adding tiles, arches, rails, waves, badges, planes, tapas icons, decorative English or other fixed-art patches.

Canonical V7 brief:

- `CLEANROOM-SPAIN-V7-TARDEO-TYPE-FIRST-BRIEF-2026-08-27.md`

Rejection/method-switch evidence:

- `CLEANROOM-SPAIN-V7-PREFIGMA-REJECTION-V8-TYPE-MASS-2026-08-27.md`

## V8 TARDEO TYPE MASS — serious pre-Figma candidate

The next method keeps the type-first premise but increases **meaningful semantic type mass** rather than reintroducing fixed decoration.

Starting blank-frame geometry for the next actual Figma build:

- canvas `1000×1480`;
- `SPAIN`: upper left, approx `118 px`, vermilion/red;
- `スペイン`: directly below, approx `30 px`, deep ink/navy;
- `04`: upper right, approx `250 px`, saffron/yellow;
- `[国テーマ見出し]`: approx `x≈68 / y≈485`, `58–62 px`, native Japanese;
- `[国テーマ説明]`: approx `x≈70 / y≈660`, `32–34 px`, width for realistic 4–6 line Japanese copy, `textAutoResize=HEIGHT`;
- `2026.10.24`: lower left around `y≈1260`, approx `28 px`;
- `TABLE 04`: lower right around `y≈1260`, approx `24 px`.

Initial authoring split remains intentionally strict:

- variable/factual/semantic roles: native Figma text;
- editable SVG: `0`;
- generated/composed raster: `0`;
- replaceable IMAGE role: `0`;
- no rails/cards/bottom modules.

A realistic two-line Japanese heading + longer description proxy remained readable without forcing containers. This is enough to justify one real Figma test, but **not** enough to restore visual PASS.

## Next Figma gate

When Figma authoring guidance is safely available:

1. create one new blank `1000×1480` Spain frame;
2. build only V8 `TARDEO TYPE MASS` with native text roles;
3. do not duplicate Current, V5, V6, or V7;
4. review at `500px` whole-item first;
5. if it survives, review `1000px` reading scale;
6. review native `1000×1480` actual-size/detail;
7. run a realistic two-line heading + 4–6 line Japanese description stress;
8. read back `textAutoResize`, overflow/outside, field ownership, date/table legibility;
9. only after independent PASS, compare against retained Current `2:29`;
10. restore `SELLABLE_VISUAL_QA_PASS` for Spain only if V8 clearly wins.

Immediate reject conditions:

- giant `SPAIN` / `04` becomes generic festival poster typography;
- long-copy pushes the design back toward boxes/cards/rails;
- red/yellow color carries more destination identity than typography rhythm;
- actual-size reading is weaker than Current;
- wedding warmth is lost and the sheet feels like a brand identity exercise.

## Hybrid-authoring / image decision

No new image asset is justified by the current diagnosis.

- semantic copy stays native Figma text;
- SVG remains `0` for the first V8 assembly;
- generated/composed asset remains `0` until a screenshot demonstrates a real atmosphere/texture bottleneck;
- replaceable IMAGE role remains `0`;
- no variable/factual copy may be baked into future SVG/raster.

Image generation: `0`.
Drive write: `0`.

## Learning state

Spain-specific state:

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL_PRE_FIGMA → V7_REJECTED_PRE_FIGMA → V8_SERIOUS_PRE_FIGMA_CANDIDATE`.

No project-wide rule is promoted.

Potential general hypothesis only: if removing generic fixed-art modules creates premium-by-emptiness, test whether **more meaningful semantic typography mass** solves the composition before reintroducing decoration. This remains unverified outside Spain and must not be transferred as a style rule.
