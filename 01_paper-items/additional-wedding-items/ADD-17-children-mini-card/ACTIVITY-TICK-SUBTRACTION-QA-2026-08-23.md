# ADD-17 Activity Tick Subtraction QA — 2026-08-23

Status: `VERIFIED_LOCAL / CURRENT_UPDATED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main SHA: `09f3894454340c1f2f4a2f6742f5defe67a703b8`

## Scope

Target only the Current ADD-17 front activity-surface cue. No old design was used as a production base and no back-side change was made.

Figma file: `PAvkRggJiRuXVypi3RgZCN`

- Current front: `67:3 / CURRENT_SELECTED / ADD17 / FRONT / EXPEDITION FIELD SHEET`
- Current back: `67:4 / CURRENT_SELECTED / ADD17 / BACK / DISCOVERY POSTLOG` — unchanged
- realistic front stress: `69:2`
- rollback-safe comparison: `73:2 / QA / ADD17 / FRONT / NO ACTIVITY TICKS / 2026-08-23`
- pre-change Current rollback: `74:2`
- pre-change stress rollback: `74:40`

## Visible problem

The four open corner ticks around the large drawing area were structurally harmless but, at whole-item scale, they read more like crop/scanner/reticle marks than a child-facing discovery cue. They also visually bounded a surface whose intended quality is openness and free drawing.

The Current already has enough functional orientation through:

- native `[お題]` prompt;
- the large uninterrupted blank activity field;
- one coherent discovery-route gesture;
- star/wave/spark cues outside the writing/drawing area;
- optional name/date and closing line.

## Bounded comparison

Created `73:2` from the Current only as rollback-safe QA evidence and hid exactly these four roles:

- `VECTOR / ACTIVITY TICK TL`
- `VECTOR / ACTIVITY TICK TR`
- `VECTOR / ACTIVITY TICK BL`
- `VECTOR / ACTIVITY TICK BR`

No text, typography, route, color, spacing, activity prompt, footer, name/date or back-side geometry changed.

## Three-scale result

- whole / 500 px: PASS; the drawing field reads more open and less scanner/UI-like;
- reading scale: PASS; `[お題]` still clearly establishes the activity surface;
- actual / native `1110×1540`: PASS; the blank field remains intentional rather than empty;
- realistic long-copy front stress: PASS after applying the same tick subtraction; long prompt and optional long name keep their existing safe spacing.

The comparison clearly improved the intended defect without reducing usability, so the treatment was promoted to Current.

## Current change

Current `67:3` and stress `69:2` now hide the four activity ticks. The temporary comparison `73:2` is hidden after verification.

Pre-change states were preserved unchanged as hidden rollback:

- `74:2 / ROLLBACK / ADD17 / FRONT / PRE-NO-ACTIVITY-TICKS / 2026-08-23`
- `74:40 / ROLLBACK / ADD17 / FRONT STRESS / PRE-NO-ACTIVITY-TICKS / 2026-08-23`

Post-readback confirms all four Current tick roles are hidden. Existing structure evidence remains valid: native variable copy, no IMAGE fills, no rasterized semantic text, and no new production asset dependency.

## Hybrid / image decision

- variable copy: native Figma text;
- discovery route/star/wave/spark: editable vector roles;
- activity ticks: removed from visible Current rather than replaced with generated decoration;
- generated/composed raster: `0`;
- image generation: `0`;
- Drive write: `0`.

Image generation was not relevant because the defect was an unnecessary boundary cue, not missing illustration or atmosphere.

## Drive

Exact non-Rurubu Drive authority was re-confirmed live before the Figma change:

`1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`

No Drive asset changed.

## Learning state

`VERIFIED_LOCAL`

Hypothesis for future receiving items: an open creative/writing surface should not be bounded with crop/scanner-style corner marks unless those marks have a real reader-facing or physical production function. Do **not** generalize this to “remove all corner marks”; print/crop/registration marks and meaningful framing must remain item-specific.

## Result

`CURRENT_UPDATED / ACTIVITY_SURFACE_OPENNESS_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
