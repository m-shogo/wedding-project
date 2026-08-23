# ADD-16 両親贈呈品メッセージカード — Vertical Thread Subtraction QA

Date: 2026-08-23
Start authority SHA: `4255e826a6ccdfe6f64237d276e5c15b14655bf0`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Fresh whole / reading / actual-size review of the selected `HOME TEXTILE MAT` front/back found one remaining ambiguous fixed role: the long `THREAD / VERTICAL` rail. The forest selvage and horizontal rust/saffron/forest weft already carried the textile metaphor; the long 3px vertical line increasingly read as an editorial/UI rail rather than necessary cloth structure.

This pass changed only that fixed line. No copy, typography, writing rules, palette, layout stack, dates, signatures, or semantic roles were changed.

## Live authority

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Current front: `57:3`
- Current back: `57:17`
- realistic long-copy stress: `57:36 / 57:50`
- exact Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive write: `0`
- image generation: `0`

## Bounded comparison

Only `THREAD / VERTICAL` visibility changed:

- front no-thread comparison: `69:2`
- back no-thread comparison: `69:18`
- front realistic long-copy no-thread comparison: `69:37`
- back realistic long-copy no-thread comparison: `69:53`

Result:

- the textile identity remained clear through the dark forest selvage and top/bottom weft bands;
- the front gained calmer, more intentional whitespace around the Japanese message;
- the back writing surface became more open and less like an editorial/form layout;
- no information grouping or writing function depended on the vertical rail;
- realistic long-copy remained safe on both sides.

## Rollback / production change

Complete pre-change rollback copies were created before Current mutation:

- front rollback: `70:2`
- back rollback: `70:18`
- front long-copy rollback: `70:37`
- back long-copy rollback: `70:53`

Production change:

- Current front `57:3 / THREAD / VERTICAL`: hidden
- Current back `57:17 / THREAD / VERTICAL`: hidden
- stress front `57:36 / THREAD / VERTICAL`: hidden
- stress back `57:50 / THREAD / VERTICAL`: hidden

The comparison roots were hidden after adoption.

## Three-scale QA

- front whole / reading / native `700×1036`: PASS
- back whole / reading / native `700×1036`: PASS
- front realistic long-copy: PASS
- back realistic long-copy: PASS

## Structure readback

Current front `57:3`:
- visible native text: `5`
- fixed-height visible text: `0`
- outside visible text: `0`
- IMAGE fills: `0`
- vertical thread visible: `false`

Current back `57:17`:
- visible native text: `4`
- fixed-height visible text: `0`
- outside visible text: `0`
- IMAGE fills: `0`
- vertical thread visible: `false`

Stress `57:36 / 57:50`:
- visible native text: `5 / 4`
- fixed-height text: `0 / 0`
- outside visible text: `0 / 0`
- IMAGE fills: `0 / 0`
- vertical thread visible: `false / false`

## Learning state

`VERIFIED_LOCAL`.

This is another local application of the established whole-item fixed-bar/rail function audit. A role named `THREAD` is not automatically required merely because it supports the concept in layer naming. The rendered object must still prove reader-facing, physical, binding, navigation, trim/fold, writing, or artifact-semantic value.

Do not transfer HOME TEXTILE MAT geometry, colors, textile motif, or the specific subtraction to another item. No new project-wide rule is promoted from this pass.

## Result

`VERTICAL_THREAD_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / WRITING_SURFACE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
