# Rurubu WEDDING V30 — True Alpha Asset Generation Policy

Status: `CURRENT_SYSTEMIC_OVERRIDE / TRUE_ALPHA_PLUS_EDGE_QUALITY`
Date: 2026-09-03
Scope: all generated/cutout assets that are intended to have transparent surroundings

## Why this exists

A transparency checkerboard can be rendered as ordinary RGB pixels. That is not transparency.

Previous alpha policy correctly rejected checkerboard pixels during QA, but it did not strongly govern the generation step itself. This allowed a visually good ornament to be generated with a baked checkerboard and then repaired afterward.

A second failure was confirmed on P03 after V30 style realignment: production PNGs could have real alpha and correct opaque interiors while still using a hard-threshold binary cutout (`alpha = 0 or 255 only`) around curved/organic raster art. That can leave jagged edges, matte-like rims or visibly harsh cutout boundaries even though `TRUE_ALPHA_PREFLIGHT_PASS` is technically true.

The preferred pipeline is now prevention-first and edge-quality-aware.

## Hard generation contract

For every `PAGE_SPECIFIC_ORNAMENT` or `GENERATED_DISPLAY_ASSET` that needs transparent surroundings:

1. Prefer a generation/export path that produces a real alpha channel directly.
2. Never request, accept, or treat a visible checkerboard pattern as transparency.
3. Immediately after generation/export, before Figma placement, inspect the actual alpha channel.
4. If the file has no meaningful alpha channel, or the intended outside region is opaque/checkerboard RGB, mark `GENERATION_ALPHA_FAIL` and do not place it in Figma.
5. Only assets that pass true-alpha, interior-opacity and edge-quality preflight may become final production/Figma assets.

## If the generator cannot produce true alpha

Use a single flat extraction matte, not a checkerboard.

- Choose a matte color that is clearly separated from the ornament palette.
- Do not use a matte that collides with important white/cream, skin, flower, foliage, blue, pink, yellow or other subject colors.
- If no safe matte exists, regenerate with a true-alpha-capable path rather than forcing extraction.

Checkerboard-as-matte is prohibited because repeated light/dark cells contaminate antialiased edges and make extraction unnecessarily destructive.

## Background extraction is fallback, not default

Background extraction may be used only when:

- the generated art quality is worth preserving;
- the background is separable without materially changing the ornament;
- the resulting edge/cutout can be validated quickly.

After extraction, verify:

- real alpha exists;
- no checkerboard pixels remain;
- no matte halo remains;
- thin lines/routes and small decorative details survive;
- white/cream/light-colored intended artwork has not been erased;
- no unintended holes appear inside the subject;
- the extracted artwork still matches the approved generated artwork.

If extraction changes the art materially, regenerate. Do not keep patching a damaged cutout.

## TRUE ALPHA is not EDGE ALPHA QUALITY

These are separate responsibilities.

### A. Outside transparency

The intended outside region is actually transparent.

### B. Inside opacity

Paper, ribbon, badge, white keyline, flower, text vessel and other intended subject areas remain opaque/complete.

### C. Edge alpha quality

The outer contour must composite cleanly at actual use size.

For curved, diagonal, organic or detailed raster art, naturally antialiased boundaries should normally contain partial alpha values (`1..254`) where the source contour transitions into transparency.

A cutout whose alpha channel contains only `{0,255}` is **not automatically a universal failure**, but it is a mandatory `EDGE_ALPHA_QUALITY_REVIEW` for generated raster art. Binary alpha is acceptable only when the intended art is truly hard-edged and the result remains clean at target A5/print size on light, mid and dark backgrounds.

For flowers, leaves, ribbons, airplanes, curved display lettering, small decorative routes and other non-pixel-art contours, a binary hard threshold is not the default desired result.

Gate: `EDGE_ALPHA_QUALITY_PASS`.

## Edge-alpha QA — REQUIRED

For every major floating generated raster asset:

1. inspect alpha unique values / histogram or equivalent mask diagnostic;
2. composite over light, mid-gray and dark/high-contrast backgrounds;
3. zoom the real outermost contour, not only the interior art;
4. distinguish intentional white keylines from unintended white/matte fringe;
5. confirm curves, leaves, petals, ribbon tails, thin lines and lettering edges do not show jagged thresholding;
6. confirm no source-matte RGB contaminates partially transparent edge pixels;
7. inspect again at actual intended Figma/A5 scale.

Do not approve edge quality from a white-background preview alone.

## Repair rule for binary/hard-threshold cutouts

If design/RGB art is already approved and only the cutout edge is weak:

- preserve the accepted RGB artwork and composition;
- prefer an edge-aware re-cut / alpha refinement at source resolution;
- restore controlled antialiasing at the true outer contour;
- decontaminate matte color from edge RGB where necessary;
- preserve intentional white/yellow keylines as artwork, not transparency;
- do not blur the entire object;
- do not soften interior typography, outlines or printed details;
- do not regenerate the design unless a clean re-cut cannot be achieved cheaply.

This is an asset-alpha correction, not a design reopen.

## Pre-Figma gate

Before any transparent generated asset is uploaded/placed in Figma:

`ART_QUALITY_PASS + TRUE_ALPHA_PREFLIGHT_PASS + ALPHA_INTERIOR_OPACITY_PASS + EDGE_ALPHA_QUALITY_PASS = required`

`TRUE_ALPHA_PREFLIGHT_PASS` means:

- alpha channel is real;
- intended outside region is transparent;
- there is no baked checkerboard or opaque background.

`ALPHA_INTERIOR_OPACITY_PASS` means:

- intended paper/vessel/keyline/art interiors remain opaque and complete;
- white/cream areas have not been accidentally weakened by extraction.

`EDGE_ALPHA_QUALITY_PASS` means:

- actual cutout boundary composites cleanly on light/mid/dark backgrounds;
- no unintended hard-threshold jaggies, matte halo or fringe is visible at intended use size;
- natural raster contours retain appropriate antialiasing unless a deliberately hard edge is part of the approved art direction.

Figma must never be used as the place where fake or visibly poor transparency is discovered for the first time.

## Fast-fail rule

If checkerboard RGB, opaque background, damaged interior opacity or visibly binary/harsh cutout edges are detected immediately after generation/cutout:

`detect once -> reject alpha production state -> direct-alpha regenerate OR one edge-aware extraction/refinement -> alpha preflight -> continue`

Do not spend repeated screenshots or Figma placement cycles diagnosing it.

## P03 confirmed lesson — 2026-09-03

After the P03 V30 style realignment, direct inspection of the accepted Header, Q3, Q4, Story Timeline and Bottom Closure PNGs found that each alpha channel contained only two values: `0` and `255`, with no partial-alpha edge pixels.

The page design remains locked because the RGB design/style/composition passed cross-page review. The affected assets require an edge-alpha cleanup review before final production/print readiness.

This finding supersedes any older P03 `ALPHA_INTEGRITY_PASS` that only proved outside transparency and inside opacity without validating antialiased edge quality.

## Applies to later pages

This is a systemic P01-P08 production rule. Any future page-specific ornament/image-generation handoff inherits it unless explicitly overridden by newer owner feedback.
