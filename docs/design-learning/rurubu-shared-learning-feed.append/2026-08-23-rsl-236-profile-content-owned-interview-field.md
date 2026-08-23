# RSL-236 — Interview structure should follow unequal answer salience

Date: 2026-08-23
Source scope/item: Rurubu WEDDING / V8 Profile+Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Failure fingerprint

`F-RSL-236-INTERVIEW-RAIL-REPEATS-EQUAL-QA-MODULES-DESPITE-UNEQUAL-ANSWER-SALIENCE`

## Visible problem

The V8 Profile/Q&A AW spread was structurally clean, but its right page presented Q1, Q2 and Q3 as three vertically repeated question-answer modules with nearly equal cadence. The answers did not have equal editorial jobs: Q1 and Q2 were compact travel-character answers, while Q3 carried the more human wedding-memory close.

## Evidence before change

- previous current V8 Profile/Q&A: `2278:2 / AW`
- all copy was native and editable
- IMAGE fills: `0`
- no collision/safe-area defect was driving the change
- the defect was editorial rhythm: repeated module grammar overrode answer meaning

## Root-cause hypothesis

A disciplined interview rail can become template-like when its spatial repetition treats all answers as equally salient. Publication consistency should preserve a recognizable system while allowing content-owned variation where one answer has a materially different narrative job.

## Fresh professional input

This run used fresh editorial-design research rather than repeating the recent V8 grid/photo references:

- Pentagram's publications/editorial practice frames editorial design as a balance between theme and variations, allowing stories to unfold differently inside a familiar publication setting.
- Veronica Ditting describes an editorially driven process based on dialogue among form, creative direction, photography and language, rather than form operating as an independent template.
- Seibundo Shinkosha's `idea` magazine provides a Japanese publication example where a strong editorial identity coexists with issue-specific treatment/specification rather than one repeated page grammar.

These observations were treated as hypotheses, not copied styles.

## Bounded test

Rollback-safe AW2 `2329:2` changed only the right Q&A composition:

- Q1 and Q2 became a paired upper interview field;
- Q3 became a full-width lower closing voice;
- exact question and answer strings were preserved;
- left profile hierarchy, names, descriptors, folios, palette and publication identity were preserved;
- no card, pill, box, shadow, gradient, image or decorative English was added.

## Expected improvement

Reduce survey/form repetition and let answer meaning determine cadence while preserving clear interview reading order and V8 restraint.

## Regression risk

- paired questions can become too compressed;
- unequal answer scale can look arbitrary if not supported by semantic role;
- the treatment can become a new template trick if copied mechanically to other spreads.

## Three-scale evidence

- whole-item / 500px: PASS; Q1/Q2 read as concise paired travel voices and Q3 as a distinct close rather than three repeated rows.
- reading / 1400px: PASS; Q1/Q2 remain separable and readable without visible containment.
- actual-size / 1587×1123: PASS; current copy is unclipped and legible.

## Structure evidence

AW2 pre-promotion QA:

- parent `2052:2`
- visible native text `23`
- IMAGE fill nodes `0`
- same-parent text intersections `0`
- bounded 18px safe risks `0`
- accidental explicit one-character lines `0`
- Japanese semantic font mismatch `0`

Promotion readback:

- current AW2 `2329:2`: visible, `x=1800 / y=8500`, parent `2052:2`
- previous AW `2278:2`: hidden rollback at `x=300000`

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`. AW2 is the current V8 Profile/Q&A comparison candidate. It is not a global winner and not print-ready.

## Transferable candidate principle

When an interview/profile spread uses repeated question modules, test whether the semantic role of the answers is actually equal. If one answer performs a different editorial job—opening, contrast, emotional close or transition—allow a bounded content-owned field variation while preserving reading order, copy truth and publication identity.

## What must remain Rurubu/V8-specific

Do not transfer:

- the two-up Q1/Q2 arrangement;
- Q3 placement or scale;
- exact coordinates;
- type sizes;
- cream/navy/rust palette;
- copy;
- V8 book-edition personality.

This is not permission for arbitrary asymmetry. Content role must explain the variation, and three-scale QA must verify it.

## Next receiving-item experiment

On a materially different interview/profile artifact with repeated modules, compare equal cadence against one bounded content-owned variation. Promote further only if the semantic distinction improves whole-item reading without introducing layout ambiguity, dynamic-copy regression or template styling.