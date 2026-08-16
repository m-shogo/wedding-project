# NRSL — Equal-choice fairness does not require radio-list UI

Source scope/item: non-Rurubu / ADD-12 新郎新婦クイズカード

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A first clean-room ADD-12 rebuild independently converged on the retained production's vertical open-circle ballot grammar even though no nodes were copied. The result was structurally valid but failed the clean-room independence goal with fingerprint `POST_COMPARISON_VISUAL_CONVERGENCE`.

## Root-cause hypothesis

When answer choices need equal visual treatment, an authoring system can default too quickly to a familiar form pattern: radio circles in a vertical list. That solves fairness but can force a quiz card toward generic form/UI grammar and can also recreate an earlier design silhouette without explicit copying.

## Bounded test

A fresh V3 was authored from semantic facts only before reopening retained production:

- A6 front/back;
- no left spine;
- no radio circles;
- four answer choices placed as a 2×2 editorial response field;
- A–D labels and handwriting-selection rules remain functionally equivalent across choices;
- back uses one large open correspondence field instead of repeated horizontal message rules;
- all unresolved copy remains native semantic placeholder text;
- no generated raster or prior design asset.

Figma evidence:

- file `oZ24SbwGkeAfFJcXlbxCoD`
- page `26:2 / SELECTED / CLEANROOM / ADD-12 / V3 EDITORIAL QUADRANTS / 2026-08-16`
- front `26:3`
- back `26:4`
- hidden stress `27:51 / 27:83`

## Expected improvement

Preserve equal answer opportunity and obvious physical response behavior without automatically inheriting radio-list / form-interface visual language.

## Regression risk

A 2×2 field can itself become a dashboard/card grid if it gains heavy boxes, rounded corners, shadows, badges, or unrelated containment. Equal geometry is justified only when it serves choice fairness and response clarity. The exact 2×2 layout must not become a cross-item template.

## Three-scale result

- whole-item / 500px-long-edge: PASS; quiz hierarchy remains immediate and the four choices read as one response surface;
- reading / native 620×875: PASS;
- actual working-detail 620×875: PASS;
- long-copy stress: front outside visible text `0`, back outside visible text `0`.

## Retained-production comparison

Opened only after V3 completion and stress QA.

V3 was materially independent from the retained front's dark side edge + vertical circular choice list and the retained back's repeated writing-line field. V3 was selected while retained production stayed unchanged.

## Evidence

- item evidence: `01_paper-items/additional-wedding-items/ADD-12-couple-quiz-card/CLEANROOM-V3-EDITORIAL-QUADRANTS-QA-2026-08-16.md`
- item evidence commit: `73f8dd33de103d8dc1a6fa54445ffe39d8e2553c`
- Drive authority: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- Drive writes: `0`

## What must remain item-specific

Do not transfer ADD-12's 2×2 geometry, navy/mint palette, masthead dimensions, exact typography, or correspondence-back layout.

## Cross-item applicability hypothesis

For future print artifacts with multiple equally valid actions or answers, test whether fairness can be expressed through spacing, labeling, alignment and equal write affordance rather than defaulting to radio-button UI. Evaluate at thumbnail scale for grid/dashboard reading before adoption.
