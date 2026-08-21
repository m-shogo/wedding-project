# ADD-07 エスコートカード案内ボード — A2 step typography / Japanese line-break polish

Date: 2026-08-22
State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A2_STEP_TYPOGRAPHY_POLISH_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Start/latest GitHub authority immediately before this evidence write: `bcc1c77e51c404657d4f09bf01ce5d85d252ea6c`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`.
- Figma: `rplj1IWXP4XVKjWDQRg3dU`.
- A2 Current: `32:2`.
- A3 Current: `32:16`.
- Drive authority live-confirmed before the write: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`.
- Drive write: `0`.

## Visible problem

A fresh whole-item screenshot of the already-promoted A2 `HANGING CARD RACK` exposed a Japanese editorial defect that the earlier structural/long-copy QA had not treated as a failure:

- `お名前を探す` rendered as `お名前を探 / す`;
- `カードを取る` rendered as `カードを取 / る`;
- `行き先の卓へ` rendered as `行き先の卓 / へ`.

All text was technically inside its card and `textAutoResize=HEIGHT`, so bounds-only QA passed. Visually, however, each short action stranded a one-character grammatical ending on the second line, which weakened reading rhythm and made the three hanging cards look more mechanically typeset than professionally composed.

A3 `32:16` was checked independently and did **not** have the same defect; its two-line wrapping remained natural at the smaller reflow. Therefore this was treated as an A2-only optical typography repair, not a family redesign.

## Bounded comparison

The Current was not mutated during comparison. Two rollback-safe A2 clones were created:

- `39:25 / QA / ADD-07 / STEP WRAP A / WIDTH250 SIZE42`
  - step width `220 → 250`;
  - font size retained at `42`;
  - result: still produced awkward two-line breaks.
- `39:48 / QA / ADD-07 / STEP WRAP B / WIDTH250 SIZE40`
  - step width `220 → 250`;
  - font size `42 → 40`;
  - result: all three short actions became stable single-line phrases within the physical card widths.

The first write attempt to the comparison clone hit Figma's unloaded-font guard. No partial QA frame remained. The method immediately switched to loading `Noto Sans JP / Bold` before changing `fontSize`; the bounded comparison then succeeded. This reproduces an already-known authoring prerequisite and is not logged as a new failure rule by itself.

## Selected typography treatment

A2 Current `32:2` now uses:

- `TEXT / STEP 1`: `250 px`, `40 px`, auto-height, `お名前を探す` on one line;
- `TEXT / STEP 2`: `250 px`, `40 px`, auto-height, `カードを取る` on one line;
- `TEXT / STEP 3`: `250 px`, `40 px`, auto-height, `行き先の卓へ` on one line.

No card geometry, rail/thread/hole geometry, title, lead, step numbering, footer, date, color or semantic copy was changed.

Pre-polish A2 was preserved hidden:

- `40:2 / ROLLBACK / ADD-07 / A2 / PRE-STEP-LINEBREAK-POLISH / 2026-08-22`.

A3 `32:16` remains unchanged because its current line breaks are already natural and legible.

## Three-scale / screenshot evidence

### Whole-item

Post-promotion A2 screenshot: PASS.

The three action phrases now read as complete units at first glance. The cards retain the physical hanging-rack metaphor, but the micro-hierarchy no longer looks mechanically wrapped.

### Reading / actual-size

Post-promotion higher-resolution A2 render: PASS.

The 40 px step type remains comfortably subordinate to the main instruction while being clearer than the prior 42 px awkward-wrap state. No card edge collision is visible.

### Long-copy stress

A fresh stress clone was created from the existing long-copy proof:

- `39:71 / QA / ADD-07 / A2 STEP TYPO 40-250 / LONG COPY STRESS`.

Stress actions:

- `お名前のカードを探す`;
- `カードを手に取る`;
- `記載された卓へ進む`.

At `250 px / 40 px`, all three expand to two lines (`116 px` height) without clipping or leaving the card field:

- step 1 bottom `1401`;
- step 2 bottom `1376`;
- step 3 bottom `1406`;
- root bottom `1980`.

Stress screenshot: PASS. The longer phrases wrap at semantic phrase scale rather than creating single-character orphan lines.

## Structure readback

A2 Current `32:2` after promotion:

- visible native text: `12`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`;
- selected step text auto-height: `3/3`.

Stress `39:71`:

- visible native text: `12`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`;
- stress step text auto-height: `3/3`.

A3 `32:16` was read back unchanged with visible text auto-height and outside count `0`.

## Hybrid / image decision

- variable/factual copy: native editable Figma text;
- fixed rail/card/thread/hole art: existing simple native geometry with physical meaning;
- generated raster: `0`;
- SVG: `0`;
- image generation: not required;
- Drive write: `0`.

The defect was Japanese line-breaking and optical typography, not missing imagery or decoration.

## Decision

`A2_STEP_TYPOGRAPHY_POLISH_PASS`.

The prior `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid and is now stronger at reading scale. This was a bounded typography correction to an already-valid physical-artifact direction, not another clean-room redesign.

## Transferable learning candidate

Normalized observation: **text can be structurally valid yet editorially wrong when a short Japanese action phrase strands a one-character grammatical ending on its own line.**

Treat this as `VERIFIED_LOCAL` only. On another materially different compact sign/card, test whether short action phrases should remain one semantic unit or break at a meaningful phrase boundary. Do not globally shrink Japanese type; first adjust measure/line-break behavior and preserve actual-size legibility.