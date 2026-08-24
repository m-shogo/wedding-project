# ADD-14 二次会案内 — Pink Top Retention QA — 2026-08-24

Status: `TESTED_LOCAL / REJECTED_SUBTRACTION / CURRENT_RETAINED`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main: `1de67f12a7db192f86534b51cdc7dd388eb2ad03`

## Visible question

Current `MIDNIGHT ZINE` already had the unsupported yellow terminal edge removed. A fresh whole/read/actual-size audit asked whether the remaining hot-pink `PINK TOP` was also merely a decorative frame or whether it still carried a distinct celebratory/night-event job.

## Bounded test

Current was not mutated. Two rollback-safe duplicates changed only `PINK TOP` visibility:

- A6 comparison: `67:2 / REJECTED / ADD14 / A6 / NO PINK TOP / 2026-08-24`
- A5 comparison: `67:14 / REJECTED / ADD14 / A5 / NO PINK TOP / 2026-08-24`

The following remained unchanged: cobalt side column, cream information field, dark footer, all native copy, placeholder facts, date/RSVP hierarchy, dimensions and A5 independent reflow.

Exact Drive authority was re-read live before the test:

- `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`

Drive writes: `0`.

## Result

The subtraction was **rejected**.

Without the pink top field, both A6 and A5 became noticeably more sober and administrative. The large Japanese headline and cobalt column still worked, but the composition lost the small burst of after-party energy that differentiates it from a generic information notice. The pink top field therefore still has a distinct whole-item role: it is the single celebratory print accent that lifts the cream/cobalt structure without becoming a button, card, badge or fake transport cue.

This is the opposite result from the earlier yellow-edge subtraction: the yellow edge acted as an unsupported fourth frame, while the pink top field still contributes event energy and top-edge pacing.

## QA evidence

Current retained:

- A6 `59:3`: `PINK TOP` visible, `YELLOW EDGE` hidden, visible native text `7`, fixed-height visible text `0`.
- A5 `59:15`: `PINK TOP` visible, `YELLOW EDGE` hidden, visible native text `7`, fixed-height visible text `0`.

Comparison screenshots were reviewed at their native canvases:

- A6 `592×420`: no-pink version structurally valid but visually weaker.
- A5 `840×592`: no-pink version structurally valid but visually weaker.

Comparison roots are hidden after review. Current/stress production was not changed.

## Learning state

`VERIFIED_LOCAL` application of the existing binding/function audit.

Transferable lesson is **not** “keep pink bars.” It is: subtraction must improve the artifact, not merely reduce decoration count. A fixed field may remain when whole-item comparison proves a distinct reader-facing/emotional pacing job that is not duplicated elsewhere.

No project-wide rule promotion from this single test.
