# ADD-02 Spain — V7 pre-Figma rejection / V8 type-mass method switch — 2026-08-27

Status: `V7_REJECTED_PRE_FIGMA / V8_SERIOUS_PRE_FIGMA_CANDIDATE / CURRENT_PRODUCTION_UNCHANGED / SELLABLE_VISUAL_QA_REOPENED`

This evidence is Spain-only and remains inside the non-Rurubu scope. No Rurubu item-specific Figma, Drive, asset, ledger, layout, or GitHub path was inspected or copied.

## Live authority

- repository: `m-shogo/wedding-project`
- latest `main` read before this write: `2b291710645a4e8d74fcad575deba44b418f522f`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- item QA: `01_paper-items/additional-wedding-items/ADD-02-table-signs/QA.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- retained Spain production: `2:29 / FRAME_TABLE_SIGN_SPAIN`
- exact Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Current live visual defect remains valid

A fresh 1000px Figma screenshot of Spain `2:29` still shows the same sellable-gate defect:

- red header + sparse cream body + cobalt/saffron vertical rail + bottom rectangle cluster reads like a layout system rather than destination editorial print;
- `TILE A–E` forms read as generic UI/content modules rather than courtyard/ceramic material;
- the central rail has disproportionate visual mass for its reader-facing/physical job;
- the defect is fixed-art grammar, not placeholder wording.

Current production is retained untouched for rollback/comparison only.

## V7 TARDEO TYPE SHEET — pre-Figma proxy result

The V7 brief intentionally removed fixed art and proposed a blank 1000×1480 type-first sheet with:

- compact `SPAIN` / `スペイン` at upper left;
- oversized saffron `04` at upper right;
- Japanese theme heading/body in the middle field;
- confirmed date near the lower left;
- SVG `0`, generated raster `0`, IMAGE role `0`.

A clean-room 1000×1480 composition proxy was rendered using only these allowed semantic roles and typography mass. No Current geometry or rejected V5/V6 geometry was copied.

### Result

`V7 = REJECTED_PRE_FIGMA`.

The oversized `04` remained a useful memory device, but the combination of compact country identity + one middle copy island + large unused lower field produced **premium-by-emptiness**. At thumbnail/reading scale it looked like a restrained branding poster rather than a lively wedding table sign. The destination premise was not strong enough to justify promoting the composition to Figma assembly.

This triggers the explicit V7 stop condition from `CLEANROOM-SPAIN-V7-TARDEO-TYPE-FIRST-BRIEF-2026-08-27.md`; do not rescue V7 by adding tiles, rails, arches, waves, badges, planes, tapas icons, or decorative English.

## Method switch — V8 `TARDEO TYPE MASS`

A second blank-origin proxy was tested without looking to Current as construction input. It keeps the type-first premise but increases editorial mass instead of adding fixed decoration.

### V8 starting geometry for the next real Figma assembly

Canvas: `1000×1480`.

Native text roles only:

- `SPAIN`: upper left, approximately `118 px`, vermilion/red, strong but not centered;
- `スペイン`: directly below, approximately `30 px`, deep ink/navy;
- `04`: upper-right, approximately `250 px`, saffron/yellow, allowed close to right trim while remaining fully recognizable;
- `[国テーマ見出し]`: around `x≈68 / y≈485`, approximately `58–62 px`, Japanese-first;
- `[国テーマ説明]`: around `x≈70 / y≈660`, approximately `32–34 px`, width sized for realistic 4–6 line Japanese copy, `textAutoResize=HEIGHT`;
- `2026.10.24`: lower-left around `y≈1260`, approximately `28 px`;
- `TABLE 04`: lower-right around `y≈1260`, approximately `24 px`.

Initial fixed-art roles:

- editable SVG: `0`;
- generated/composed raster: `0`;
- replaceable IMAGE role: `0`;
- rails/cards/bottom modules: `0`.

### Proxy visual result

`V8 = SERIOUS_PRE_FIGMA_CANDIDATE`.

Compared with V7, the large `SPAIN` + `04` opposition creates a denser first read, the Japanese theme block is less isolated, and the page no longer depends on decorative modules to feel active. A realistic two-line Japanese heading plus longer description also fit the proposed mass without forcing boxes/cards/rails.

V8 is **not** production-approved and is not yet a Figma visual PASS. It must still be built as native Figma text on a completely blank frame and pass the required gates.

## Next Figma gate

When Figma authoring guidance is safely available:

1. create one new blank `1000×1480` Spain frame;
2. build only V8 `TARDEO TYPE MASS` using native text roles above;
3. do not duplicate Current, V5, V6, or V7;
4. run 500px whole-item QA first;
5. if it survives, run 1000px reading QA;
6. run native 1000×1480 actual-size/detail;
7. run realistic long-heading + 4–6 line Japanese description stress;
8. read back `textAutoResize`, overflow/outside, field ownership, and actual-size date/table legibility;
9. only after all independent gates pass, compare against retained Current `2:29`;
10. promote only if V8 clearly wins destination specificity, wedding warmth, Japanese typography, information retrieval, and absence of UI/module grammar.

Immediate reject conditions remain:

- giant `SPAIN`/`04` reads as a generic festival poster;
- long-copy pushes the sheet back toward modules/containers;
- country identity is carried mostly by red/yellow rather than typography rhythm;
- actual-size reading is weaker than retained Current;
- the sheet loses wedding warmth or feels like a brand identity exercise.

## Image-generation / Drive decision

Image generation: `0`.

Drive write: `0`.

Reason: live evidence still identifies composition/fixed-art grammar as the bottleneck. No hero/photography/texture/collage deficiency has been demonstrated. V8 deliberately tests whether stronger native typography solves the problem before adding any asset workstream.

## Learning state

Spain-specific state:

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL_PRE_FIGMA → V7_REJECTED_PRE_FIGMA → V8_SERIOUS_PRE_FIGMA_CANDIDATE`.

No cross-item or project-wide rule is promoted.

Item-specific / do not transfer:

- Spain/tardeo premise;
- `SPAIN` / `04` scale relationship;
- vermilion/saffron color roles;
- exact coordinates and type sizes.

Potential general hypothesis only: when removing generic fixed-art modules causes premium-by-emptiness, try increasing meaningful semantic type mass before reintroducing decorative geometry. This requires independent receiving-item verification before any shared-learning promotion.
