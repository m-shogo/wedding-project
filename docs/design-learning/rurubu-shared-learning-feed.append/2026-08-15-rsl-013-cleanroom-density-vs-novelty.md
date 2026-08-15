# RSL-013 — Clean-room novelty must still carry editorial payload

Date: 2026-08-15
Owner: Rurubu WEDDING
Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

V6 needed to stop inheriting V5 macro geometry, so two materially different outer concepts and two materially different inside concepts were built from a clean sheet with the same verified raster pool. The most visually novel direction used a strong vertical navy story spine, but thumbnail and reading-scale comparison showed that novelty alone created large low-information zones and a quieter brochure/editorial-book silhouette than the requested dense Japanese travel-magazine rhythm.

## Root-cause hypothesis

Clean-room work can over-correct legacy lock-in by rewarding structural novelty as an end in itself. A candidate may be dramatically different yet still underperform because too much page area carries little editorial payload, or because a strong spine/panel consumes space that should be doing photo, headline, caption, or information-cluster work.

## Bounded test

Use the same verified Rurubu image pool and factual/native-text content to compare:

- Outer A `1221:2`: destination/photo-led hierarchy with a bounded Yokohama hero, oversized Japanese masthead, unequal overlapping support photos, compact timeline.
- Outer B `1221:55`: vertical type/object spine with a more formal split-page silhouette.
- Inside A `1223:2`: large profile atmosphere + asymmetric native Q&A + waterfront timeline + overlapping memory collage.
- Inside B `1223:58`: vertical story spine with cleaner but quieter lower-page regions.

All candidates were checked at whole-item/thumbnail, reading, and actual-size/detail scales. Structural checks were not used as a substitute for rendered judgment.

## Expected improvement

A clean-room winner should be materially different from legacy while also maintaining enough useful visual mass and editorial information density to read as a real magazine rather than a sparse brochure.

## Regression risk

Increasing editorial payload can become collage noise. The receiving item must still preserve one dominant reading path, source-fidelity limits, text-safe areas, and a bounded number of deliberate overlaps.

## Evidence

- V6 outer winner: `1221:2 / V6_BEST_OUTER_A_DESTINATION_LED_2026_08_15`
- V6 outer B study: `1221:55 / V6_STUDY_OUTER_B_TYPE_OBJECT_EDITORIAL_2026_08_15` — hidden, preserved
- V6 inside winner: `1223:2 / V6_BEST_INSIDE_A_PROFILE_MEMORY_EDITORIAL_2026_08_15`
- V6 inside B study: `1223:58 / V6_STUDY_INSIDE_B_VERTICAL_STORY_SPINE_2026_08_15` — hidden, preserved
- Outer A final structure: native text 28, visible image fills 7, absolute text intersections 0, 18px safe-area risks 0, all visible raster roles at/below intrinsic dimensions.
- Inside A final structure: native text 41, visible image fills 6, absolute text intersections 0, 18px safe-area risks 0, all visible raster roles at/below intrinsic dimensions.
- Promotion authority: `01_paper-items/rurubu-wedding/RURUBU-V6-COMPARATOR-A-A-PROMOTION-2026-08-15.json`

## What remains Rurubu-specific

Do not transfer the exact vertical spine, colors, Yokohama photographs, Japanese title treatment, photo angles, timeline geometry, or page arrangement. Those are Rurubu-specific art direction.

## Cross-item applicability

Candidate principle only: when comparing materially different clean-room concepts, score **editorial payload per visible page area** and low-information/dead zones at thumbnail scale in addition to novelty, asymmetry, and structural cleanliness. A different item must validate this independently before promotion.
