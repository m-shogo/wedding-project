# ADD-17 Children Mini Card — Open Observation Field Polish

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT`
Date: 2026-08-18
Start authority SHA: `aff8a07930fad6af0fb58fdd5b416cee20019a4a`

## Authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- selected front: `2:2`
- selected back: `2:5` (unchanged)
- Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- final adoption remains blocked on real child-attendance/use information.

## Visible problem
Fresh whole-item review of selected front found that the large observation/sketch field contained three nested contour rings. Together they read like a radar/target graphic rather than an open place to draw, write or notice something. The field already had a pale irregular base shape, title, prompt and bottom guidance, so the nested contours added template-like decoration without a clear child-facing function.

A second line of explanatory copy, `ここは、自由な観察ページ。`, also repeated the role already communicated by `みつけたものを、ひとつ残そう。`, `[お題]`, and the bottom guidance.

## Bounded comparison
Rollback-safe comparison:
- `29:2 / QA / ADD17 / FRONT / OPEN OBSERVATION FIELD / 2026-08-18`

Only the following were hidden:
- inner contour vectors corresponding to selected nodes `15:37 / 15:38 / 15:39`;
- redundant explanatory text `15:47 / ここは、自由な観察ページ。`.

Preserved unchanged:
- outer pale observation field / largest contour support;
- title, prompt and all native editable text roles;
- binding rule / top tick;
- bottom writing/sketch guidance;
- footer and margin note;
- size `1110×1540`;
- back side;
- no raster/person imagery.

The simplified comparison was materially stronger at 500–700px whole-item review: the center reads as an open creative field instead of a target/radar symbol, while the activity role remains immediately understandable.

## Adoption / rollback
Before selected mutation, hidden rollback was saved:
- `30:2 / ROLLBACK / ADD17 / FRONT / PRE_OPEN_OBSERVATION_FIELD / 2026-08-18`

The comparison node `29:2` was hidden after adoption. Selected front `2:2` now keeps the large irregular pale field but omits the three nested target-like contours and the redundant internal explanatory sentence.

## Image / Drive decision
`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_POLISH`.
The problem was meaningless fixed vector decoration, not missing imagery. Drive metadata was live-read and matched exact folder `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`; Drive writes: `0`.

## Safety / finalization boundary
No child identity, age, count, interest or personalized prompt was invented. This remains an age-independent neutral editable template. Final use still requires the authoritative ADD-17 requirement gate.

## Result
- sellable visual: `PASS` maintained
- semantic/native editability: preserved
- target/radar-like decorative signal: removed
- rollback safety: `PASS`
- legacy/previous state preserved: `PASS`
- final adoption: `BLOCKED_REQUIRED_INPUT`
- print readiness: `NO`
