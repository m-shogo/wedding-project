# Rurubu WEDDING — EG solid history type feedback — 2026-08-12

Scope: Rurubu WEDDING only.

## Problem observed

EE's right-page composition was already photo-led, but the history heading/subtitle and year labels still used drop shadows or text strokes. At actual size these read as digital readability effects rather than ink-on-photo editorial typography.

## Principle tested

Choose solid native text color from the actual tonal zone of the photograph instead of outlining every label. EG uses deep navy on the light sky, magenta for the small history subline, and solid white only for the final date over the darker city/walkway. No layout cards or shadow fields were added.

Expected improvement: flatter print character, stronger Japanese editorial plausibility, and less UI/composite polish.

Regression risk: solid type can disappear when the crop changes. The first `NEXT DESTINATION` dark treatment did become too weak on the sunset support image; it was rejected and changed to solid white after fresh readback.

## Evidence / decision

EG `1057:2` passed 500px thumbnail, 1000px spread-reading, and 794×1123 actual-size right-page QA. Final structural readback: 53 visible native text nodes, 6 visible IMAGE fills, 0 same-parent collisions, 0 bounded side safe-area risks, fold `1057:283` preserved.

Status: `ADOPTED` and promoted as Review inside `1058:2`. EE remains hidden rollback. Current production candidates remain unchanged.

## Reusable lesson

Do not use shadow/stroke as the default answer to text-on-photo. First map the text to a stable light or dark image zone and use solid ink. If one microcaption genuinely crosses an unstable photo area, change its solid color or crop before reaching for effects.