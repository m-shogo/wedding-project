# 2026-08-12 — Rurubu EC minimal contrast-anchor feedback

Scope: Rurubu WEDDING V5 clean-room comparator only.

## Visible problem
EC's subtraction pass improved the outer cover by removing the top-right date badge and broad feature-02 panel, but actual-size screenshot QA showed the remaining direct dark feature-02 title becoming unreadable over a busy tilted photograph.

## Capability / principle tested
Subtraction is not the goal by itself. When direct type fails over high-frequency photography, use the smallest contrast device that completes the editorial function. Escalation order for this context: `direct type → rule → thin edge-attached caption strip → larger field only if necessary`.

## Expected improvement
Preserve the large tilted travel photograph and asymmetric Japanese-magazine silhouette while restoring actual-size title readability without reverting to a Web/UI-like module.

## Regression risk
A strip could become another card, cover too much photography, collide with the `02` numeral/title, or visually detach the photo from the full-bleed street image below.

## Experiment and correction
On EC `1039:2` only:
- reused hidden semantic rectangle `1039:176` rather than adding a new container;
- converted it to a warm `310×60` strip, rotation `-3°`, attached to the lower image edge;
- retained native editable `1039:177 / 02` and `1039:178 / 出会いから\n今日まで旅年表`;
- kept the 336×250 feature photograph and existing hashes unchanged.

The first repaired state was rejected because structure QA found one rotated text-box intersection between `1039:177` and `1039:178`. Moving the title to x=`538` removed the intersection.

## Verified evidence
- thumbnail: PASS at 500 px
- whole spread: PASS at 1588×1123
- actual-size front: PASS at 794×1123
- visible native text: 36
- visible IMAGE fills: 6
- same-parent text intersections: 0
- front safe-area risk under 18 px: 0
- fold `1039:184`: preserved at x 792.7, 2×1122.5

EC was promoted to Review snapshot `1043:2`; previous EB Review `1036:2` remains hidden rollback. Current `77:18 / 77:290` was not changed.

## Adopted / rejected status
Adopted for EC comparator: thin contrast strip tied to a real readability need.
Rejected: dark direct type over busy photography; restoring the old broad feature panel.

## Next application
Use this only when image frequency or tonal variation makes direct type fail at actual size. Do not turn thin strips into a default component. Q60 exact Drive→Figma provenance remains independently open, so V5 remains incomplete.

Evidence: `01_paper-items/rurubu-wedding/learning-runs/2026-08-12-v5-ec-caption-strip-visual-promotion.md`.
