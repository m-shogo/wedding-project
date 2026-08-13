# 2026-08-13 — Rurubu EY source-fidelity feedback

Scope: Rurubu WEDDING only.

## Problem observed

EX was materially better than the legacy composition, but actual-size inspection still exposed an important mismatch between source quality and printed scale. Several low-resolution/proxy photos were visually asked to do more than their source quality supported, and the outer still retained a slightly poster-like split between headline field and imagery.

## Principle tested

**Source fidelity before scale.** Do not manufacture magazine impact by enlarging a weak image. Use deliberate differences in photo size, asymmetric overlap, native Japanese display type, compact captions, and editorial rules to create energy while keeping raster roles within believable printed scale.

## Expected improvement

EY should look sharper at actual size, feel more like a Japanese travel-information magazine, and reduce the generic wedding-brochure / web-hero silhouette without adding cards, shadows, gradients, or synthetic decoration.

## Regression risk

Smaller dominant fields can reduce immediate photo impact and expose empty paper. Direct type on photography can also lose contrast. These risks were reviewed at thumbnail, whole-item, and actual-size scales rather than accepted from structure alone.

## Result

EY won the comparison and was promoted.

- production study: `1153:2`
- Working: `1155:2`
- Review: `1155:192`
- Start Here: `1155:382`
- Inside remains EO
- Current `77:18 / 77:290` untouched
- EX preserved as hidden rollback

Verification after repairs:
- 500px thumbnail PASS
- whole-item PASS
- actual-size front PASS
- actual-size back PASS
- visible native text 35
- visible IMAGE fills 7
- absolute text intersections 0
- bounded 18px safe-area risks 0

The first EY render was not counted as progress: stale caption backgrounds, title/subtitle collision, masthead safe-area drift, and subcopy collisions were corrected before promotion.

## Asset / provenance result

The accepted secondary Yokohama Q60 derivative remains exact and verified:

`Drive 1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb → Figma Working 1155:189 → image hash 644f449c3bf2001a94d4b822d2b55e2614c11042`.

The Q60 master `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` received a fresh Drive readback, but dominant-master exact Figma placement remains OPEN. Do not infer dominant provenance from visual similarity or an existing proxy hash.

## Reusable feedback

When actual-size QA exposes image softness, first reduce the printed burden on that image. A smaller source-faithful crop combined with stronger typography and asymmetric editorial composition can outperform a larger, visibly degraded hero. Apply this rule before generating new decoration or adding containers.
