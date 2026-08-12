# Rurubu WEDDING — EF cover label-rhythm feedback — 2026-08-12

Scope: Rurubu WEDDING only.

## Problem observed

The previous ED front was competent but still slightly too calm at thumbnail scale. It had the right photo-led foundation, yet the cover-line rhythm did not immediately signal the energetic grammar of a Japanese travel-information magazine. Feature 01 also lost contrast where navy type crossed the darker pier/water area.

## Principle tested

Use editorial energy through hierarchy, not through card count. EF keeps the page image-led and adds only purposeful flat anchors: a thin magenta issue rule, a compact yellow `保存版` marker, stronger native Japanese cover lines, one tilted support photo, and one narrow yellow rule on the lower street feature.

Expected improvement: stronger genre recognition, more varied scale, better reading order, and less AI-landing-page/module behavior.

Regression risk: loud labels can become sticker clutter. The constraint is therefore one dominant masthead/headline system plus only two compact flat color anchors.

## Evidence / decision

EF `1053:2` was checked at 500px thumbnail, 1000px spread-reading, and 794×1123 actual-size front. The first actual-size pass exposed low contrast on Feature 01. The title was changed to white native text without adding a background panel. Final structure: 37 visible native text nodes, 6 visible IMAGE-fill nodes, 0 same-parent text collisions, 0 bounded front safe-area text risks.

Status: `ADOPTED` and promoted to Review as `1054:2`. ED remains hidden rollback. Current production candidates were not edited.

## Reusable lesson

When a travel-magazine cover still looks like a polished poster, increase hierarchy contrast before adding decoration: enlarge the headline relationship, let type sit directly on photography, use one asymmetrical support image, and attach one flat issue/caption band. If contrast fails on the real crop, fix the type/crop first rather than wrapping it in another card.