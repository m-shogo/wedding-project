# ADD-05 — Ribbon Fold Physical-Cue Audit

Date: 2026-08-26
State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Non-Rurubu only. This audit does not inspect or reuse any Rurubu item-specific production, asset, layout, Drive path, node, or visual grammar.

## Live authority

- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- Current 50×80 front: `31:2`
- Current 45×70 front: `31:10`
- Current optional 50×80 back: `31:18`
- Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- Existing Current state remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` while this bounded visual hypothesis is pending.

## Visible problem

Fresh live screenshots at the native physical layouts show the mango/yellow horizontal `fold` element crossing the vertical coral ribbon as a detached rectangle.

Across all three Current faces:

- 50×80 front: the yellow rectangle reads more like a small button/status bar placed over the coral strip than a folded ribbon or wrapped-paper junction;
- 45×70 front: the same reading becomes stronger because the smaller format compresses the surrounding negative space;
- optional 50×80 back: the yellow rectangle again appears as a floating horizontal control-like block rather than a connected fold.

The coral vertical ribbon still communicates gift wrapping. The uncertainty is specifically whether the yellow horizontal part proves the claimed physical fold/wrap role at whole-item scale.

## Root-cause hypothesis

The physical metaphor is under-specified geometrically: the yellow role has no visible tuck, overlap, notch, direction change, shadowless paper turn, or other connection that makes it read as a fold of the same wrapping system. Because it is a plain rectangle intersecting a strong vertical band, it can regress into the same UI/status-bar reading that the project has already learned to reject in unrelated artifacts.

This is not evidence that all yellow accents, folds, or ribbon crosspieces should be removed. The Current coral ribbon itself remains meaningful and must not be changed by this hypothesis.

## Required bounded test

When safe Figma authoring is available, do not redesign the whole tag and do not use legacy production as a visual source.

Create rollback-safe comparisons for the three materially different Current faces and change only the mango/yellow fold role:

1. `CURRENT` — retained as-is;
2. `NO_YELLOW_FOLD` — hide the yellow rectangle only;
3. `CONNECTED_FOLD` — replace only that role with one simple physically connected paper/ribbon fold treatment that visibly belongs to the coral ribbon. Do not add badge, pill, fake ticket notch, shadow, gradient, or decorative text.

Do not change:

- `Thank you.` / `for traveling with us.` / `Have a safe trip home.`;
- date;
- punch geometry;
- coral ribbon width/position unless the connected-fold test proves a minimal local junction adjustment is necessary;
- deep-ocean lower field;
- canvas sizes.

## Expected improvement

The winning state should read immediately as a small gift tag rather than a clean UI-like composition with a floating horizontal control. If `NO_YELLOW_FOLD` is strongest, subtraction is allowed. If `CONNECTED_FOLD` is stronger, the retained cue must prove its physical role. If Current wins, reject the hypothesis and keep the existing fold.

## Regression risks

- removing the yellow role may reduce the celebratory/gift-wrapping character;
- over-literal fold geometry can become craft-template clip art;
- a notch/triangle added only to prove “physicality” can create a new generic ticket or origami cliché;
- any geometry change must preserve punch clearance and confirmed-copy readability at actual size.

## Current three-scale evidence

Current screenshots inspected this run:

- 50×80 front `31:2`: native 500×800 — issue visible;
- 45×70 front `31:10`: native 450×700 — issue visible;
- optional 50×80 back `31:18`: native 500×800 — issue visible.

The defect is optical/semantic, not overflow. Existing structure and confirmed-copy actual-size evidence remain valid.

## Hybrid authoring decision

- variable/factual copy: native Figma text;
- coral ribbon and candidate fold geometry: simple fixed editable geometry is sufficient for the bounded test;
- generated raster: `0` required;
- SVG: `0` required for the initial bounded test;
- Drive write: `0` until a materially stronger adopted/comparison asset actually exists.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS` only.

Do not publish a new cross-item rule from this observation. The transferable question is only: **does a named physical cue actually read as that physical cue in the finished artifact?** That method already exists in shared learning; this item must independently verify the local result before any further learning promotion.

## Next action

Execute the 3-state bounded Figma comparison at whole-item → reading → actual-size on all three tag faces, then rerun punch/copy clearance and structure readback on the winner before any Current mutation.