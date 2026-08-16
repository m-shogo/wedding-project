# RSL-042 — Raise weak body-copy tiers before adding more decoration

Date: 2026-08-16
Source scope/item: Rurubu WEDDING V6 Profile/Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The Q&A spread had already escaped equal-card/grid composition, but answer copy still used an inconsistent `11 / 9 / 9 / 11 / 9 / 10 px` scale. At actual-size review the 9–10 px answers read as a weaker micro-text tier than the surrounding interview hierarchy.

## Root-cause hypothesis

A print/editorial page can still feel template-like or under-resolved even after the layout is strong when its body-copy floor is too low. Before adding more labels, cards, shadows or decorative assets, normalize genuinely readable body copy and revalidate the adjacent image boundary.

## Bounded test

On rollback-safe BF `1436:56`:

- set all six native answer blocks to `11 px` Noto Sans JP Regular;
- expanded the small answer boxes to preserve reserve;
- shifted the existing replaceable hero photo only `8 px` right after rotated-bounding measurement found tiny Q2/Q3 contact;
- added no new decoration, raster, card, shadow, gradient or baked copy.

A separate masthead-enlargement comparison was rejected because it entered the current 18 px safe area. The readability fix was therefore preferred over cosmetic cover escalation.

## Expected improvement

More consistent actual-size Japanese reading, less UI/help-text impression, and better body/heading hierarchy without increasing decorative density.

## Regression risk

Increasing body size can cause line growth, image contact, safe-area pressure or page overflow. Old long-copy evidence cannot be reused when type size changes.

## Three-scale evidence

- whole spread / 700×495: PASS;
- page/reading context: PASS;
- actual Q&A page / 794×1123: PASS.

Final structure:

- native text `24`
- replaceable IMAGE roles `2`
- text/text collision `0`
- answer/image collision `0`
- 18 px safe-area risk `0`.

Dedicated final realistic long-answer proof `1436:180` produced natural answer heights `39 / 39 / 39 / 39 / 26 / 39 px`, collisions `0`, safe-area risks `0`.

## Figma / Drive / GitHub evidence

- Figma file `bfM0d4c9dCeBv5pCkJ3TNM`
- BF `1436:56`
- hidden final stress `1436:180`
- hidden BD rollback `1430:2`
- hidden rejected Outer R `1436:2`
- Drive root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- QA `01_paper-items/rurubu-wedding/RURUBU-V6-Q-BF-BE-QA-ANSWER-READABILITY-QA-2026-08-16.md`
- reconciliation `01_paper-items/rurubu-wedding/RURUBU-V6-Q-BF-BE-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`.

## What must remain Rurubu-specific

Do not transfer the exact 11 px value, Q&A geometry, photo position, type hierarchy, palette or Rurubu interview composition. Another artifact has a different physical size, reading distance and typography system.

## Cross-item applicability hypothesis

When a print item remains visually weak after card/grid subtraction, independently check whether factual/body text has fallen into an unnecessarily small micro-text tier. If so, test a clearer body-copy floor before adding more decorative treatment, and rerun realistic long-copy/collision/safe-area QA after any type-size change.
