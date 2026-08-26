# ADD-06 — Top Coral Crop / Web-Header Risk Audit

Date: 2026-08-27
State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start `main`: `52f3d01824ceefa2ef0fc57589ec688e01eb2e5c`
Latest live `main` before write: `82d202203fa599cf6b74211e0d63ca663524a656`

## Scope

Non-Rurubu only. No Rurubu item-specific Figma, Drive, asset, ledger or GitHub path was inspected or used.

Current target:

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current root: `56:106 / CURRENT / ADD-06 / STRIP IN THE LIGHT / CONTINUOUS DEVELOPED PRINTS`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- adopted SVG master remains `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1 / photo-strip-continuous-developed-prints-v2.svg`

## Visible problem

Fresh whole-item and reading-scale screenshots on 2026-08-27 show a full-width 28px coral strip across the very top edge of the Current composition.

Live metadata identifies the role as:

- `56:107 / DECOR / CORAL TOP CROP`
- `x=0 / y=0 / w=990 / h=28`

At whole-item scale the strip is visually detached from the continuous photo strip, native headline, lower physical information field, trim/fold/binding semantics and any reader-facing information. Because it spans the entire canvas edge, it reads closer to a web/app header or generic status bar than to a physical photo-booth artifact.

The defect is not the coral color itself. Coral remains purposeful inside the developed-photo SVG and other exposure moments. The concern is the isolated **full-width header geometry**.

## Evidence before change

Fresh live screenshots:

- whole / ≈500px: the coral strip becomes a prominent top-edge bar before the viewer reaches the physical photo strip;
- reading / ≈1000px: the same bar remains visually independent from the editable photo-strip artifact and typography;
- actual canvas remains `990×1400` per Current authority.

Live structure readback:

- Current root `56:106`;
- coral crop `56:107`, `990×28`;
- editable SVG photo strip `56:108`;
- native copy `56:149–156`;
- lower physical field `56:153`.

The coral top crop is therefore a separate fixed-geometry role, not part of the adopted SVG or native semantic hierarchy.

## Root-cause hypothesis

`FULL_WIDTH_DECORATIVE_EDGE_READS_AS_WEB_HEADER`

A thin full-width color edge at the absolute top of a print composition can acquire browser/app/header semantics when it is not visibly connected to trim, binding, mounting, a real paper layer, or a reader-facing information role.

This is distinct from the already-verified continuous photo-strip improvement. The clean-room V3 artifact itself remains strong; the possible regression is one residual generic decoration role around it.

## Bounded test

When Figma mutation guidance is safely available, do **one** rollback-safe comparison only:

1. duplicate Current `56:106` into a comparison role;
2. hide only `56:107 / DECOR / CORAL TOP CROP`;
3. change nothing else — no typography, strip, lower field, date/location, copy, crop or SVG geometry;
4. compare Current vs no-top-crop at:
   - ≈500px whole-item;
   - ≈1000px reading scale;
   - native `990×1400` actual-size;
   - existing long-copy state if the visual candidate wins;
5. if the no-crop version makes the page feel unfinished or weakens a real physical boundary, reject the hypothesis and keep Current;
6. if it removes web-header/status-bar reading while preserving artifact identity, create full rollback before Current mutation and promote the subtraction.

Do not invent a replacement top ornament. Do not create a new SVG or generated asset for this test.

## Expected improvement

- stronger `continuous physical photo strip → Japanese headline → lower information field` reading path;
- less website/app chrome at thumbnail scale;
- no loss of editable SVG artifact or native text hierarchy.

## Regression risk

The coral edge may be carrying subtle page closure/celebration energy that is not obvious from metadata alone. Therefore this is not permission to delete all top rules or color edges. The decision requires the direct whole-item comparison.

## Hybrid authoring / asset decision

- native semantic text: unchanged;
- editable SVG photo strip: unchanged;
- generated raster: `0`;
- replaceable IMAGE fill: `0`;
- new Drive asset: `0`;
- image generation: `0`.

The observed bottleneck is fixed-geometry semantics, not missing imagery.

## Drive verification

Live Drive search confirmed:

- `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`.

No Drive write was performed.

## Status / progression

This observation is strong enough to reopen the **visual sellable gate for this one role only**, while preserving all verified structure, long-copy, SVG editability and Drive-master evidence.

Recommended Current status until the bounded test is executed:

`SELLABLE_VISUAL_QA_REOPENED + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LOCAL_TOP_CROP_AUDIT_PENDING`

Do not re-open the continuous-strip clean-room direction itself and do not create another visual generation. The next action is the single-role subtraction comparison above.
