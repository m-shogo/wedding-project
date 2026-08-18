# NRSL — Open fields should not be over-specified by equal rules or redundant helper copy

Source scope: non-Rurubu
Source items: ADD-13 メッセージカード + ADD-17 子ども向けミニカード
State: `VERIFIED_CROSS_ITEM`
Date: 2026-08-19
Start authority SHA: `ca6a87e749b7691c0e244328db2726bbe7d39413`

## Visible problem

Two materially different print artifacts independently showed the same failure family after their major clean-room redesigns had already passed:

1. ADD-13 used a large semantic handwriting area but filled it with seven/six evenly repeated horizontal guides. The field began to read like a form/notepad instead of open correspondence.
2. ADD-17 had already simplified its drawing/writing geometry, yet one extra permissive helper sentence remained at the bottom of each face. The activity field began to read as over-instructed template copy rather than a confident child-facing paper surface.

## Root-cause hypothesis

A functional writing/drawing area needs enough guidance to communicate the action, but repeated equal rules and multiple equivalent helper sentences can become visible interface chrome. The problem is not the existence of guidance; it is guidance density exceeding the semantic/physical job.

## Bounded tests

### ADD-13

- selected V6 front/back: `27:3 / 27:4`;
- comparison: `42:2 / 42:20`;
- changed only writing-guide visibility;
- front rules reduced `7 → 4` by keeping 1/3/5/7;
- back rules reduced `6 → 3` by keeping 1/3/5;
- semantic handwriting geometry stayed unchanged at `56.32% / 57.98%` of the faces;
- the same visibility change was applied to long-copy stress `27:35 / 27:51`.

### ADD-17

- selected front/back: `2:2 / 2:5`;
- comparison: `39:2 / 39:19`;
- changed only the final redundant `TXT_FOOTER` helper sentence on each face;
- retained the stronger remaining child-facing cue, drawing/writing field, optional-name line, and existing binding structure.

## Expected improvement

The physical action area should read first as open paper for handwriting/drawing, not as a form, questionnaire, or instructional UI, while retaining enough visible affordance that a guest understands what to do.

## Regression risk

Blind subtraction can make a writing role ambiguous or intimidating. Do not remove all guides or all instruction text by default. Preserve guidance that materially helps the intended user, especially when age, accessibility, pen behavior, formality, or physical production conditions require it.

## Three-scale evidence

### ADD-13

- whole / reading: reduced-rule front/back comparison stronger than dense-rule selected;
- actual-size back `1400×993`: PASS after adoption;
- selected/stress outside text `0`;
- selected/stress text collision `0`;
- IMAGE fills `0`;
- writing-area ratio unchanged and remains above the SPEC minimum 55%.

### ADD-17

- whole / reading at 700px long-edge: selected front/back stronger after footer subtraction;
- front visible text `4`, back `5`;
- outside text `0 / 0`;
- text collision `0 / 0`;
- IMAGE fills `0 / 0`.

## Evidence

ADD-13:
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Drive: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- Git evidence: `01_paper-items/additional-wedding-items/ADD-13-message-card/OPEN-WRITING-RHYTHM-QA-2026-08-19.md`
- Git commit: `ca6a87e749b7691c0e244328db2726bbe7d39413`

ADD-17:
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- Drive: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- Git evidence: `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/REDUNDANT-HELPER-COPY-SUBTRACTION-QA-2026-08-19.md`
- Git commit: `de61bc39e80220edaa180223b8441fc2fca31f8c`

## What must remain item-specific

Do not transfer ADD-13's exact 4/3 guide counts, postcard layout, line spacing, title placement or palette. Do not transfer ADD-17's exact child-facing language, mint drawing field, journal binding rule or name treatment. These are not a universal visual template.

## Cross-item applicability

When another wedding print artifact contains an open writing/drawing/signature area, first identify the minimum semantic/physical guidance required. Then, on a rollback-safe duplicate, test whether repeated equal rules, multiple synonymous instructions, or decorative helper labels can be reduced while preserving comprehension and actual-use comfort.

## Next receiving-item experiment

Apply the method only when a fresh screenshot shows an open physical interaction field reading like a form or instructional UI. Candidate roles include guest-book writing, signature, free-response, drawing, or optional note areas. Preserve any rule required for actual writing comfort, trim, scan, ticket, or other physical semantics.
