# V5 inside-history caption editorial-strip refinement

Date: 2026-08-05
Item/version: Rurubu WEDDING V5
Target nodes: `77:425 / IA_HISTORY_CAPTION_BG`, `77:426 / IA_HISTORY_CAPTION`

## Source

- Live Figma frame `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- Current V5 live structure and prior Rurubu learning runs

## Visible problem

The history-lead photograph used a floating white caption rectangle inside the image. It was readable, but the pale card shape and small corner radius repeated a Web/UI containment pattern and visually separated the caption from the photograph.

## Hypothesis

A compact, square-corner navy strip aligned flush to the photograph's left edge would preserve guaranteed contrast while making the caption read as an editorial image treatment rather than a floating interface card.

## Expected improvement

- stronger photo-caption relationship
- reduced card/UI feel
- clearer visual continuity with the print-oriented navy folio and footer system
- unchanged native text, semantic photo node, crop, and rollback history

## Possible regression

The dark strip could become too visually heavy, cover too much of the image, or compete with the yellow history kicker above the photograph.

## Experiment

Changed only:

- `77:425`: `x 76 → 58`, `y 478 → 492`, `300 × 48 → 330 × 40`
- `77:425`: white fill → navy fill at approximately 94% opacity
- `77:425`: corner radius `2 → 0`; strokes/effects remain absent
- `77:426`: `x 91 → 72`, `y 491 → 502`, width `270 → 302`
- `77:426`: navy text → white text

Preserved:

- caption copy as native `Noto Sans JP Bold`
- `77:422 / IA_HISTORY_MEMORY_PHOTO`
- image hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- photo crop, geometry, stroke, and effects
- all surrounding history, memory-spot, folio, and fold structures
- V5 Current frame and rollback history

## Verification

Post-change screenshot of `77:290` was reviewed at whole-spread and page scale:

- the caption is visibly integrated with the lower-left edge of the photograph
- no text clipping, overflow, collision, blank hole, or mask exposure
- the strip remains subordinate to the yellow history kicker and the `OUR HISTORY` heading
- photo area remains dominant despite the current low-resolution source
- the right-page reading order remains history timeline → lead photograph → caption → memory spots

Structure readback confirms only nodes `77:425` and `77:426` were mutated and native text was preserved.

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT`

This is an editorial treatment improvement, not a photo-source quality pass. `PHOTO_ROLE_PASS` and the V6 start gate remain unchanged.

## Failure / limitation

The lead image remains visibly pixelated. The caption treatment cannot substitute for the pending binary-safe placement of the verified Drive derivative.

## Reusable lesson

For a wide editorial photograph requiring guaranteed caption contrast, a shallow, flush, square-corner strip can outperform a floating white card when it stays subordinate to the primary kicker and image. This is verified for the V5 history role only and is not promoted directly to a universal project rule.

## Next application

Resume Batch A image replacement or another evidence-closing step. Do not repeat the same strip treatment across unrelated images without role-specific comparison.