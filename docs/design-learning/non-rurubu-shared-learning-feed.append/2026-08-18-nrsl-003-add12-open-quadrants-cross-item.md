# NRSL-003 cross-item verification — ADD-12 open quadrants

Date: 2026-08-18
Source scope/item: non-Rurubu / ADD-12 新郎新婦クイズカード
Receiving lesson: NRSL-003 `Preserve functional quiet zones without drawing UI-like boxes around them`
State after this verification: `VERIFIED_CROSS_ITEM`

## Visible problem

Selected clean-room ADD-12 V3 had a justified 2×2 equal-answer structure, but each answer role was still enclosed by a complete rectangular stroke. At 500px whole-item scale, the four full boxes made the quiz read closer to a dashboard/form even though equal response weighting itself was correct.

## Root-cause hypothesis

The functional job was not performed by the outer rectangles alone. Equal areas, A–D labels, native answer text and short handwriting-selection rules already established the response action. The complete borders were therefore redundant containment rather than necessary interaction geometry.

## Bounded test

- selected clean-room front: `26:3`
- rollback-safe comparison: `33:2 / QA / ADD12 / OPEN QUADRANTS / 2026-08-18`
- change: remove only the four `CHOICE / QUADRANT A–D` frame strokes;
- preserve question, A–D labels, answer text, writing prompts/rules, answer method, spacing, palette and semantic roles.

The comparison was reviewed at 500px and native `620×875`. It retained equal choice weighting while losing the strongest UI-card signal.

## Promotion / rollback evidence

Before promotion:

- rollback selected front: `34:2`
- rollback stress front: `34:34`

The same border subtraction was applied to selected front `26:3` and hidden long-copy front `27:51`. Comparison `33:2` was hidden after promotion. Retained legacy production `1:2 / 1:26` was untouched.

## Three-scale / structure evidence

- whole / 500px: PASS, clearer and less form-like;
- reading / native `620×875`: PASS;
- actual working scale: native `620×875` PASS;
- long-copy geometry: unchanged except for border subtraction; the same treatment was mirrored to the existing stress proof;
- IMAGE fills: `0`;
- native editable question/choice/answer-method roles preserved.

Item evidence:

- `01_paper-items/additional-wedding-items/ADD-12-couple-quiz-card/CLEANROOM-V3-OPEN-QUADRANTS-POLISH-2026-08-18.md`
- evidence commit: `f1ec45dc6a185f098155693755e48c39f59afddf`
- reconciled QA commit: `401ddd2fdf6436c28b73813957e82afa9f88e249`
- Drive authority: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

## What must remain item-specific

Do not transfer ADD-12's 2×2 geometry, navy/mint palette, exact answer spacing, `Q.01` treatment or handwriting-rule lengths. This verification does not establish a global rule that borders are bad.

## Cross-item conclusion

NRSL-003 is now independently verified on a materially different print artifact. The transferable rule is:

> Reserve the physical/semantic space an interaction needs, but do not draw a complete UI-like container around it when spacing, labels, rules or other paper-native cues already perform the grouping function.

When a border also carries trim, QR quiet-zone, ticket/perforation, writing-surface or another real physical function, preserve that function and test subtraction only on a rollback-safe duplicate.
