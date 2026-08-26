# ADD-05 — Ribbon Fold Physical-Cue Audit

Date: 2026-08-26
State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / SERIOUS_COMPARISON_ASSET_CREATED / BOUNDED_FIGMA_TEST_PENDING`
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

## Pre-Figma serious comparison asset — 2026-08-26

A clean editable SVG candidate was created specifically for the `CONNECTED_FOLD` bounded role:

- Git path: `01_paper-items/additional-wedding-items/ADD-05-thank-you-gift-tags/assets/ribbon-fold-connected-junction-candidate.svg`
- commit: `ddfb6aec4a7f732330a3adb4bdd9dda0a33d6c2d`
- canvas: `160×80`
- semantic/variable copy baked in: `0`
- gradient/shadow/fake UI/fake transport cue: `0`
- purpose: test whether a flat, visibly turning/tucking mango flap reads as one physical ribbon junction rather than a floating button/status bar.

The SVG uses a flat main flap plus two flat return planes. It is intentionally a **serious comparison candidate only**, not a production asset. Do not save it to Drive or promote it to Current until direct Figma whole/reading/actual-size comparison proves it beats both `CURRENT` and `NO_YELLOW_FOLD`.

If the candidate becomes too illustrative, origami-like, bulky, or attention-stealing at 45×70, reject it rather than refining it indefinitely.

## Live actual-size revalidation — 2026-08-26 20:30 JST

The three Current faces were re-rendered live at their native canvases and the exact geometry was read back from Figma before any new write:

### 50×80 front `31:2`

- canvas: `500×800`
- coral ribbon: `31:4`, `x=330 / y=0 / 74×800`
- mango fold: `31:5`, `x=286 / y=450 / 162×70`
- result: issue remains clearly visible at native size; the mango role reads as a detached horizontal rectangle crossing the ribbon rather than a material turn.

### 45×70 front `31:10`

- canvas: `450×700`
- coral ribbon: `31:12`, `x=296 / y=0 / 66×700`
- mango fold: `31:13`, `x=258 / y=392 / 142×64`
- result: issue is strongest here because the smaller physical format makes the horizontal rectangle more control-like and visually bulky relative to the tag.

### Optional 50×80 back `31:18`

- canvas: `500×800`
- coral ribbon: `31:20`, `x=72 / y=0 / 70×800`
- mango fold: `31:21`, `x=42 / y=485 / 130×62`
- result: the same detached-crossbar reading independently reproduces on the reverse composition.

This makes the observation stronger than a single-face taste concern: the same physical-cue ambiguity is visible on three materially different faces/reflows while the coral ribbon itself still reads correctly.

The exact Drive authority was also re-read live and remains the folder `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`.

### Test priority after revalidation

The next Figma experiment remains deliberately ordered:

1. test `NO_YELLOW_FOLD` first because it is the lowest-complexity repair and directly tests whether the yellow role is unnecessary;
2. only if subtraction materially weakens gift-wrap energy, test the existing clean editable `CONNECTED_FOLD` SVG;
3. reject the SVG rather than iterating it if it becomes origami/clip-art-like at `45×70`.

No new decorative candidate is justified before this bounded comparison.

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
- coral ribbon: current simple native geometry remains unchanged in the bounded test;
- `NO_YELLOW_FOLD`: no replacement asset;
- `CONNECTED_FOLD`: editable SVG candidate is allowed because the fold silhouette benefits from a coherent reusable flat graphic and contains no variable information;
- generated raster: `0` required;
- Drive write: `0` until a materially stronger adopted/comparison asset actually wins in Figma.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS` only.

Do not publish a new cross-item rule from this observation. The transferable question is only: **does a named physical cue actually read as that physical cue in the finished artifact?** That method already exists in shared learning; this item must independently verify the local result before any further learning promotion.

## Next action

Execute the 3-state bounded Figma comparison at whole-item → reading → actual-size on all three tag faces. Test `NO_YELLOW_FOLD` first because it is the lowest-complexity repair. Test the SVG `CONNECTED_FOLD` only if subtraction weakens gift-wrap energy. Then rerun punch/copy clearance and structure readback on the winner before any Current mutation.