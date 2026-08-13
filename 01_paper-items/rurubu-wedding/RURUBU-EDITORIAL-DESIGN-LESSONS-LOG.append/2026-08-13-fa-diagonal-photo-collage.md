# FA — diagonal photo-led travel cover lesson — 2026-08-13

## Lesson
A travel-magazine cover does not become more authentic merely by making one photo larger. When source quality is bounded, editorial energy is better created through materially different image scales, directional overlap, and native Japanese typography.

## Applied in FA
- reduced the history proxy to a shorter wide field rather than stretching it vertically
- converted old-town imagery into a tall lower-left anchor
- enlarged and tilted Feature 02 so it crosses photo zones instead of sitting in a regular module
- exposed the verified coast image as a bounded lower-right travel fragment
- retained the exact Yokohama Q60 derivative as a factual destination postcard
- retained `横浜` as the dominant native headline
- added no new rounded card, generic shadow, or gradient

This creates an asymmetric eye path and a dense-but-readable rhythm closer to a Japanese travel-information magazine than EZ’s horizontal banding.

## QA rule learned
Collision checks are necessary but not sufficient. Promotion required screenshot evidence at 500 px whole-item, 1000 px reading scale, and 794 × 1123 actual-size front. The final FA structure has 35 visible native text nodes across the outer, no absolute text intersection on either page, no 18 px text safe-area risk, and a preserved 2 px fold guide at x=792.7.

## Provenance rule reinforced
A reused image must keep its real role. History hash `539c259be8036b481d06b4f76db9a39b407d90e8` remains a history derivative even when used as a front-cover field; it is not the Q60 master. The verified secondary Yokohama chain is Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → Figma `1161:189` → hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

## Failure-switch rule reinforced
When a large atomic Figma mutation was rejected before execution, the successful response was not to repeat it. Split the redesign into small reversible geometry operations, re-read live state between writes, and compare renders after each meaningful step.

## Next use
If a future clean-room cover still reads like horizontal web sections, first change photo geometry and relative scale. Only after that should typography or decorative anchors be adjusted. Avoid solving density with more boxes.
