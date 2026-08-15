# Rurubu V6 M/I — semantic role redistribution + intrinsic-safe density

Date: 2026-08-15
Scope: Rurubu WEDDING only
Observed main before this write: `aebfb71d7ebccfff4f68ef591171d5f456c15c99`

## Visible problem

V6 H's back cover gave its largest image role to a dining scene. Although technically valid, it read more as restaurant/lifestyle memory than the strongest visual answer to `TRAVEL LOG / 旅の途中で見つけた景色`. A verified map/camera flatlay with better travel-memory semantics already existed, but only as a smaller support role.

## Principle / capability tested

1. Re-rank already-verified images by **editorial role semantics**, not by legacy placement.
2. Redistribute photo roles before assuming a new generated image is required.
3. Increase collage density only while maintaining the intrinsic/display raster gate.
4. Preserve native copy, non-destructive IMAGE fills and rollback studies.

## Bounded experiments

- J `1239:55`: flatlay → back dominant, dining → front support.
- K `1240:2`: denser cafe + skyline overlap.
- L `1240:55`: collision repair.
- M `1241:2`: keep the useful density and semantic redistribution, but restore skyline to its `240×220` intrinsic-safe display size.

## Expected improvement

A more immediate travel-editorial first read on the back cover, stronger asymmetric magazine rhythm, and less reliance on the generic dining scene as issue-level identity.

## Regression risk

Denser layout can hide source-quality regressions, accidental text/image collisions, or duplicated narrative roles. K/L demonstrated this: they looked denser but enlarged a `240×220` skyline to `270×238`, so they were rejected rather than counted as progress.

## Three-scale result

- whole spread: M PASS and visually stronger than H for travel-memory semantics;
- reading/page: back title → flatlay → cafe/skyline collage → timeline reads coherently;
- actual-size/detail: type remains legible, support photography remains plausible, 18px text safe-area risk `0`;
- structure: Outer M `28` visible native texts / `7` visible IMAGE fills; Inside I `41` visible native texts / `6` visible IMAGE fills.

## Evidence

Figma:
- selected Outer M `1241:2`
- selected Inside I `1233:2`
- Start Here `845:27` → `V5 FU/FX · V6 M/I`
- H/J/K/L retained hidden for rollback/comparison

Drive:
- flatlay Q18 `17YaX5CK-c0cTr4zsL2Dly4J1XSZyFxHG`
- cafe Q22 `1CN3gXWgHccx6WwcsmJcXDfXWgARMLFrO`
- dining Q15 `1R0JW7jny0XSOaysUzLMLo8n8nDxVGqdy`
- skyline `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`

GitHub:
- `01_paper-items/rurubu-wedding/RURUBU-V6-M-I-ACTIVE-ASSET-LEDGER-2026-08-15.json`
- `01_paper-items/rurubu-wedding/RURUBU-V6-M-I-COMPARATOR-PROMOTION-2026-08-15.json`
- shared lesson: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-15-rsl-018-semantic-role-redistribution-with-intrinsic-gate.md`

## Decision

`ADOPTED / VERIFIED_LOCAL`: M/I is now the selected V6 comparator.

Generated this experiment: `0`
New Drive save: `0`
New binary placement: `0`
Existing verified assets recomposed: `YES`

## Next application

For the next Rurubu concept, do not inherit M's exact composition. Keep the learned method: assign assets by semantic/editorial role first, preserve source-fidelity gates, and use the project-wide hybrid authoring rule so Figma remains native text + replaceable image roles + meaningful SVG, while fixed visual flourish can be composed/generated when genuinely useful.
