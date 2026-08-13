# EY — source fidelity before printed scale

Date: 2026-08-13
Scope: Rurubu WEDDING V5 / reusable editorial lesson
Status: TESTED

## Observed failure or opportunity

A visually energetic composition can still look cheap at actual size when a low-resolution or proxy raster is enlarged beyond the role its source quality can support. EX had already reduced several UI-like traits, but some image fields still depended on scale to create impact.

## Root cause

Magazine energy and photo dominance had been treated too closely as the same thing. That encouraged large raster fields even when the source was better suited to a bounded supporting or wide atmospheric role.

## General editorial principle

**Source fidelity comes before photo scale.** If the source is weak at the intended printed dimensions, reduce its role or displayed scale first. Recover editorial energy through:

- materially different photo sizes
- intentional crop and overlap
- large native Japanese typography
- direct captions / thin rules
- compact information density
- asymmetric but grid-supported placement

Do not compensate with new cards, shadows, gradients, or decorative badges.

## Process change

Actual-size image QA must ask not only “does the crop look good?” but also “is this source being asked to carry more printed area than its fidelity supports?” When the answer is yes, test a smaller/bounded role before regenerating or adding decoration.

## EY evidence

EY `1153:2` reduced the oversized back-cover memory field, introduced two deliberately different supporting photo scales, compacted the travel chronology, and retained a ratio-appropriate wide front hero. The accepted secondary Yokohama derivative remained exact rather than being upscaled into a fake dominant master.

After repairing stale caption backgrounds, text collisions, and safe-area drift:

- thumbnail PASS
- whole-item PASS
- actual-size front PASS
- actual-size back PASS
- visible native text 35
- visible images 7
- absolute text collisions 0
- bounded 18px safe-area risks 0

EY was promoted to Working `1155:2`, Review `1155:192`, and Start Here `1155:382`; EX was retained hidden for rollback.

## Provenance boundary

`Drive 1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb → Figma 1155:189 → hash 644f449c3bf2001a94d4b822d2b55e2614c11042` is verified only for the secondary destination postcard. The dominant master Drive asset `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` remains not-exact in Figma.

## Applies to

V5, V6, and later print/editorial work whenever raster source quality and desired printed prominence conflict.

## Next evidence needed for promotion to a broader rule

Repeat the same result on at least one other dominant-image role or on V6 with a different image family, confirming that a source-faithful smaller role plus stronger editorial hierarchy beats visible raster enlargement at actual size.
