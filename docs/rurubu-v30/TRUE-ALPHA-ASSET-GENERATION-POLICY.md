# Rurubu WEDDING V30 — True Alpha Asset Generation Policy

Status: `CURRENT_SYSTEMIC_OVERRIDE`
Date: 2026-09-02
Scope: all generated/cutout assets that are intended to have transparent surroundings

## Why this exists

A transparency checkerboard can be rendered as ordinary RGB pixels. That is not transparency.

Previous alpha policy correctly rejected checkerboard pixels during QA, but it did not strongly govern the generation step itself. This allowed a visually good ornament to be generated with a baked checkerboard and then repaired afterward.

The preferred pipeline is now prevention-first.

## Hard generation contract

For every `PAGE_SPECIFIC_ORNAMENT` or `GENERATED_DISPLAY_ASSET` that needs transparent surroundings:

1. Prefer a generation/export path that produces a real alpha channel directly.
2. Never request, accept, or treat a visible checkerboard pattern as transparency.
3. Immediately after generation/export, before Figma placement, inspect the actual alpha channel.
4. If the file has no meaningful alpha channel, or the intended outside region is opaque/checkerboard RGB, mark `GENERATION_ALPHA_FAIL` and do not place it in Figma.
5. Only assets that pass this preflight may become production/Figma assets.

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

## Pre-Figma gate

Before any transparent generated asset is uploaded/placed in Figma:

`ART_QUALITY_PASS + TRUE_ALPHA_PREFLIGHT_PASS = required`

`TRUE_ALPHA_PREFLIGHT_PASS` means:

- alpha channel is real;
- intended outside region is transparent;
- intended subject remains opaque/complete except antialiased edges;
- there is no baked checkerboard, opaque rectangle or key-color fringe.

Figma must never be used as the place where fake transparency is discovered for the first time.

## Fast-fail rule

If checkerboard RGB or opaque background is detected immediately after generation:

`detect once -> reject as production asset -> direct-alpha regenerate OR one safe extraction -> alpha preflight -> continue`

Do not spend repeated screenshots or Figma placement cycles diagnosing it.

## Applies to later pages

This is a systemic P01-P08 production rule. Any future page-specific ornament/image-generation handoff inherits it unless explicitly overridden by newer owner feedback.
