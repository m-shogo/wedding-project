# V5 inside clean-room G — print-editorial comparison

Date: 2026-08-10
Status: `PROTOTYPED / COMPARATOR_ONLY / CURRENT_UNCHANGED`

## Visible problem

Clean-room F (`630:2`) improved photo scale and information hierarchy, but retained several interface-like cues: rounded photo containers, circular bride portrait, pill-shaped memory numbers, and QA/crop bars that read more like design-system decoration than a Japanese travel-information magazine.

## Hypothesis

A bounded duplicate that removes those UI silhouettes while keeping the same verified imagery and native text should feel more print-native and more deliberately editorial. Small asymmetric rotations on supporting photography may add magazine rhythm without introducing fake sticker/tape decoration.

## Experiment

Created rollback-safe comparator:

- `631:274 / V5_INSIDE_RURUBU_CLEANROOM_G_PRINT_EDITORIAL_2026_08_10`
- source `630:2` preserved unchanged
- Current `77:290` untouched

Changes:

- squared the six visible photo containers instead of rounded/circular treatment
- rotated groom/bride and the two small Memory Spot supports by small unequal angles
- squared Memory Spot number fields and page accent bars
- removed comparison-only QA/crop bars from the visible composition
- reduced profile vertical rules from 6px to 4px
- reduced the heavy bottom footer bar from 20px to 12px
- preserved native Japanese text, image fills, semantic names, and fold guide

## Failure during execution

The first write attempted to assign `height` directly to a rectangle and failed because that property is read-only in the Plugin API. The failed invocation was atomic. The method was changed to `resize()` before retrying; the second invocation succeeded. This is a tooling correction, not a design regression.

## Result

Fresh whole-spread screenshot and design-context readback confirm the new comparator exists and the source/current frames remain separate. The square photography and reduced UI geometry improve print-editorial character, especially on the right-page Memory Spots. The overlapping bride photograph creates stronger magazine energy, but its proximity to the profile title is intentionally aggressive and requires actual-size comparison before any promotion.

The candidate is therefore retained as a comparator, not promoted to Current.

## Regression risk

- rotation can become scrapbook-like if pushed further
- square geometry can feel harsh if every module receives identical treatment
- bride/title overlap could reduce reading comfort at actual print size

## Evidence needed before adoption

1. whole-item A/B against Current `77:290` and F `630:2`
2. left/right page reading-scale QA
3. actual-size Japanese title/profile detail QA
4. programmatic text-overlap/clip check
5. confirmation that all six active image fills retain intended verified sources
6. fold/safe-area and semantic structure readback

## Decision

`PROTOTYPED / KEEP FOR COMPARISON / DO NOT PROMOTE YET`

## Next application

Use G to test whether the remaining rounded/pill geometry is actually helping navigation. Prefer direct type, rules, and photo edges where contrast allows. Do not add tape, stickers, shadows, or extra cards merely to increase density.