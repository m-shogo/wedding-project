# ADD-14 二次会案内 — Yellow Terminal Edge Subtraction QA

Date: 2026-08-23
Start authority SHA: `4255e826a6ccdfe6f64237d276e5c15b14655bf0`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Fresh whole / reading / actual-size review of the selected `MIDNIGHT ZINE` A6/A5 pair found one remaining fixed-geometry issue: the right-side yellow `YELLOW EDGE` acted as a fourth framing bar but did not carry venue, RSVP, trim, fold, binding, ticket, navigation, or reader-facing information.

The selected concept itself was not reopened. This was a rollback-safe bounded comparison on one fixed decorative role.

## Live authority

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- Current A6: `59:3`
- Current A5: `59:15`
- realistic long-copy stress: `59:27 / 59:39`
- exact Drive authority: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`
- Drive write: `0`
- image generation: `0`

## Bounded comparison

Only `YELLOW EDGE` visibility changed.

- A6 no-edge comparison: `65:2`
- A5 no-edge comparison: `65:14`
- A6 long-copy no-edge comparison: `65:26`
- A5 long-copy no-edge comparison: `65:38`

The cobalt left column, hot-pink top edge, warm-cream information field, dark footer, all native copy, and the A6/A5 independent reflow stayed unchanged.

### Result

The no-edge variant was stronger at both sizes:

- title → venue/access/details → footer read became more direct;
- the cream field felt like one intentional editorial surface rather than a framed web panel;
- night-event energy remained through cobalt + hot pink + dark footer;
- removing yellow did not weaken artifact identity, grouping, or RSVP/date hierarchy.

A6/A5 realistic long-copy comparisons also passed after the subtraction.

## Rollback / production change

Complete pre-change rollback copies were created before mutating Current:

- A6 rollback: `66:2`
- A5 rollback: `66:14`
- A6 long-copy rollback: `66:26`
- A5 long-copy rollback: `66:38`

Production change:

- `59:3 / YELLOW EDGE`: hidden
- `59:15 / YELLOW EDGE`: hidden
- `59:27 / YELLOW EDGE`: hidden
- `59:39 / YELLOW EDGE`: hidden

All QA comparison roots were hidden after adoption.

## Post-change screenshot QA

- A6 whole / reading / native `592×420`: PASS
- A5 whole / reading / native `840×592`: PASS
- A6 realistic long-copy: PASS
- A5 realistic long-copy: PASS

## Structure readback

Current A6 `59:3`:
- visible native text: `7`
- fixed-height visible text: `0`
- outside visible text: `0`
- IMAGE fills: `0`
- yellow edge visible: `false`

Current A5 `59:15`:
- visible native text: `7`
- fixed-height visible text: `0`
- outside visible text: `0`
- IMAGE fills: `0`
- yellow edge visible: `false`

Stress `59:27 / 59:39`:
- visible native text: `7 / 7`
- fixed-height text: `0 / 0`
- outside visible text: `0 / 0`
- IMAGE fills: `0 / 0`
- yellow edge visible: `false / false`

## Learning state

`VERIFIED_LOCAL` only.

This re-applies the already established bounded-function audit for fixed bars/edges: a named “edge” is not automatically physical. It must visibly perform a reader-facing, binding, navigation, trim/fold, or artifact-semantic job at whole-item scale.

Do **not** transfer the exact subtraction, colors, geometry, or MIDNIGHT ZINE layout to another item. Do not create a new project-wide rule from this single ADD-14 result.

## Result

`YELLOW_TERMINAL_EDGE_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
