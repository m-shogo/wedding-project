# RSL-219 — Quiet page closing gravity

Date: 2026-08-22
Source scope: Rurubu WEDDING
Source role: V8 Cafe/Table
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A restrained page can still look unfinished when its semantic closing statement floats in leftover space with no clear positional or scale-based ending function. This occurred on V8 Cafe/Table AF: the Dinner close was real reader-facing content, but it did not visually behave as a close.

## Root-cause hypothesis

The problem was not insufficient decoration or insufficient information. The page already had a strong opening and support sentence. The remaining defect was role/position mismatch: closing copy had mid-page gravity instead of closing gravity.

## Professional research input

- The Guardian Saturday redesign emphasizes flatplanning that alternates breathing room and density to create publication pacing.
- Neville Brody's magazine typography discussion treats type scale/placement as part of a rhythmic journey across pages.

These are used only as decision principles, not copied layouts.

## Bounded test

On rollback-safe duplicate AS `2261:2`:
- keep all copy unchanged;
- keep the entire left Cafe page unchanged;
- keep Dinner opening/support unchanged;
- move only the closing phrase lower and slightly left into the Dinner text field;
- increase its scale moderately;
- add no decoration or imagery.

## Expected improvement

The right page should read as entry → support → late close, with whitespace acting as intentional breathing room rather than empty wireframe residue.

## Regression risk

- closing copy could become a second competing headline;
- lower placement could create trim/safe-area risk;
- larger scale could force bad Japanese wraps.

## Evidence

- whole-item 500px: PASS
- reading 1200px: PASS
- actual-size 1587×1123: PASS
- native text: 13
- IMAGE: 0
- intersections: 0
- 18px safe risk: 0
- accidental explicit one-character Japanese lines: 0
- parent page: `2052:2`
- old AF `2230:26` retained hidden

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AS-CAFE-DINNER-CLOSING-GRAVITY-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-219-QUIET-PAGE-CLOSING-COPY-FLOATS-WITHOUT-CLOSING-GRAVITY`

Normalized meaning:
- operation/capability: quiet editorial pacing / typographic hierarchy
- symptom: real closing copy is present but appears to float in leftover whitespace
- likely cause: semantic role and visual position/weight are mismatched
- replacement method: first test stronger content-owned closing position/scale; do not add decorative filler
- stop condition: reject if the close competes with the page opening, creates unsafe trim proximity, or damages Japanese wrapping

## What must NOT transfer

Do not transfer Rurubu's exact copy, typography sizes, coordinates, color palette, Cafe/Dinner structure, or page composition.

## Cross-item applicability hypothesis

May be useful on other print/editorial artifacts where subtraction has removed UI/card grammar but the result still feels like an unfinished wireframe. Test whether the real article ending needs clearer closing gravity before adding decoration.
