# 2026-08-11 — Rurubu V5 CV + Figma navigation feedback append

This is an append-only companion entry for `docs/wedding-design-learning-feedback-log.md`. It records only verified Rurubu WEDDING work from this run.

## Visible problems
- The production Figma had become hard to navigate: true Current, active review, safe working duplicates, and legacy study material were not obvious from the entrance.
- The Review page separated Best and Current too widely for useful whole-item comparison.
- CT cover masthead contrast was weak over the sky and the back travel-log hierarchy was too even.
- The cover photo is still a 640×587 proxy at actual size; composition improvements must not be mistaken for photo-quality completion.

## Principles tested
- Treat Figma information architecture as production usability: give Current / Review / Working / Legacy explicit responsibilities without moving true Current.
- Keep Best vs Current physically close enough to compare at one zoom level.
- Build print hierarchy with native typography, asymmetric scale, and selective accent color rather than new cards/pills/shadows.
- Separate composition adoption from asset-provenance/quality gates.

## Verified result
- New `00_RURUBU_START_HERE` page: `845:2`, screenshot-verified. It clearly routes to Current, Review, Working, and legacy/research pages and states that Current is not directly edited.
- `04_RURUBU_REVIEW` is now a compact 2×2 Best-vs-Current comparison. Current snapshots remain intact; inside remains CM.
- New outer comparator `CV / 848:2`, front `848:131`, back `848:3`.
- CV uses a single-line navy native `旅するWEDDING` masthead and unequal travel-log year hierarchy with `2026.10.24` emphasized in magenta.
- Initial wrapped masthead/date state was rejected. One final timeline text intersection was then found by structure QA and repaired.
- Final CV: visible native text `37`, IMAGE fills `7`, same-parent visible text intersections `0`, fold `848:186 = x 792.7000122070312 / 2 × 1122.5`.
- Review Best outer promoted to CV snapshot `851:2`; Review and Start page were screenshot-verified after promotion.
- True Current outer `77:18` and inside `77:290` remain unchanged.

## Reusable feedback
1. A complex Figma file needs an explicit start-here/navigation surface once experimentation becomes dense; otherwise good rollback history becomes unusable clutter.
2. Comparator distance is part of QA quality. Best and Current should be visible at the same zoom level whenever practical.
3. When a bright hero weakens a masthead, first repair text contrast and hierarchy; do not add another global panel or shadow system by default.
4. Timeline/editorial chronology reads more like print when milestone scale is unequal and semantic peaks receive emphasis; uniform dots/years resemble UI steppers.
5. Every typography enlargement or width change must be followed by actual-size screenshot QA plus intersection QA; CV caught both wrapping regressions and a final overlap.
6. A stronger composition does not upgrade a low-resolution or wrong-provenance image. Keep the raster gate independent.

## Asset-state truth
- in-file semantic cover proxy: node `848:133`, hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, natural `640×587`
- no semantically valid already-imported high-resolution cover replacement was found by the live Figma image audit
- known Q60 authority: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, `1330×1220`, `155,439` bytes
- generated new image: NO
- adopted new generated image: NO
- exact Q60 Figma placed: NO
- exact Q60 visually verified in Figma: NO
- PHOTO_ROLE_PASS: `9/10`
- dominant-photo pass: `2/3`
- V5 complete: NO
- V6 production started: NO

Detailed evidence: `01_paper-items/rurubu-wedding/learning-runs/2026-08-11-v5-cv-review-navigation-qa.md`.

Status: `VERIFIED_FOR_COMPARATOR / CV_OUTER_BEST / CM_INSIDE_BEST / CURRENT_UNCHANGED / HERO_GATE_OPEN`
