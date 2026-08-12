# Rurubu WEDDING — EH vertical issue strap / solid-ink back feedback — 2026-08-12

Scope: Rurubu WEDDING only.

## Problem observed

EF was already much stronger than Current, but the square `保存版` badge still read as an attached module, Feature 02 could overlap the photo fields more decisively, and the back-cover display type still used drop-shadow compensation.

## Principle tested

Replace module-like decoration with print furniture and photo geometry: a slim vertical issue strap, stronger asymmetric photo overlap, and solid native ink chosen against the actual image zone. Add no new card, shadow field, gradient, or generated image.

Expected improvement: stronger travel-magazine recognition at thumbnail scale and less digital/composited typography at actual size.

Regression risk: solid type can disappear on photography; edge furniture can become noise; denser overlap can introduce collisions.

## Evidence / decision

EH `1061:2` passed 500px thumbnail, 1000px spread-reading, 794×1123 front and 794×1123 back QA. Final structural readback: 37 visible native text nodes, 6 visible IMAGE fills, 0 same-parent text collisions, 0 bounded safe-area risks, fold `1061:184` preserved.

The initial solid-navy back headline was rejected after actual-size review and changed to solid magenta. Structural QA also caught a Feature 03 number/title collision; it was repaired before promotion.

Status: `ADOPTED`. Review Best Outer is `1064:2`; previous EF `1054:2` is hidden rollback. Best Inside remains verified EG `1058:2`. Current production frames were not changed.

## Reusable lesson

A magazine issue cue does not need a badge-shaped card. Thin edge furniture can carry the same semantic job with less UI residue. Shadow-free type is only better when the local photograph provides enough luminance separation; actual-size rendered contrast remains the acceptance test.
