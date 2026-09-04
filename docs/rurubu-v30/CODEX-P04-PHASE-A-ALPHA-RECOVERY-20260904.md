# Rurubu WEDDING V30 — P04 Phase A Alpha Recovery Override

Date: 2026-09-04
Status: CURRENT OWNER-FEEDBACK OVERRIDE
Scope: P04 Phase A `P04_HEADER_ECOLOGY_V30_ALIGNED` only

This file supplements `docs/rurubu-v30/CODEX-P04-PHASE-A-20260904.md` after the first production attempt stopped incorrectly after two direct transparent-image generation failures.

## Why this override exists

The project-wide policy in `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md` already states that when the generator cannot produce true alpha, production must switch to a **single flat extraction matte**, then cut that matte to real alpha and run alpha-edge QA.

A baked checkerboard is never transparency and is never an acceptable extraction matte.

The previous run detected baked checkerboard RGB twice and stopped under the generic blocker rule. That was too literal. The correct control flow is strategy-switching, not repeating the same direct-alpha path.

## HARD control flow for this recovery

Work on P04 Phase A only. Do not open Phase B.

1. Do not retry the same checkerboard-producing direct-alpha generation path again.
2. Preserve the accepted P04 Header art direction from the existing handoff.
3. Generate the Header ecology on **one single flat extraction matte** that is clearly separated from all intended artwork colors.
4. The matte must not collide with white/cream, hot pink, vivid blue, yellow, green/cyan, navy/black outlines, flowers, foliage, airplane, ribbon, route or lettering.
5. Extract that single matte to a real RGBA alpha channel using an edge-aware cutout/refinement process.
6. Decontaminate matte color from partially transparent edge RGB where needed.
7. Preserve intentional white/yellow keylines, dark outlines, interior text, ribbon surfaces, flower interiors and all intended artwork opacity.
8. Do not use a binary hard threshold as the default for curved/organic raster contours.
9. Run all four gates before any Figma placement:
   - `ART_QUALITY_PASS`
   - `TRUE_ALPHA_PREFLIGHT_PASS`
   - `ALPHA_INTERIOR_OPACITY_PASS`
   - `EDGE_ALPHA_QUALITY_PASS`
10. Composite QA must be performed on light, mid-gray and dark/high-contrast backgrounds, plus actual intended A5/Figma use size.
11. If the matte extraction succeeds, continue the existing Phase A handoff: install Header only into existing P04 `3535:13`, capture fresh P01/P02/P03/P04 screenshots, set `CROSS_PAGE_STYLE_FAMILY_PASS`, then STOP.
12. If this **distinct matte-extraction strategy** fails twice due to the same technical blocker, stop and report immediately. Do not silently loop.

## Blocker rule clarification

`same operation blocks twice -> report` remains valid.

But a direct-alpha generator returning baked checkerboard does **not** mean all alpha production is blocked. After one clear direct-alpha failure pattern is established, switch strategy to the policy-approved single-flat-matte extraction path.

Do not spend a second or third run repeating a known checkerboard-producing generation mode.

## Still prohibited

- checkerboard background generation
- accepting RGB/checkerboard as transparency
- fake white rectangles
- Figma opacity hacks
- destructive extraction that erases white/cream intended artwork
- full-page flattening
- generating location labels, route, bottom closure, message panel or full photo production
- modifying P01/P02/P03/P05/P06/P07/P08

## Recovery completion report

Return only after Phase A succeeds or this recovery strategy genuinely blocks:

1. matte color used and why it was separable
2. source asset path
3. final RGBA asset path + SHA256
4. alpha histogram/diagnostics
5. four alpha gate results
6. light/mid/dark composite QA evidence
7. Figma node ID / imageHash if placed
8. fresh P01/P02/P03/P04 screenshots if placed
9. `CROSS_PAGE_STYLE_FAMILY_PASS`
10. untouched-page confirmation
11. Git SHA / PR #878 head
12. Phase B safe yes/no

Phase A success still means only that the representative Header rendering/cutout language is calibrated. Do not continue to Phase B in the same run.