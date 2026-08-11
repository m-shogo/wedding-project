# 2026-08-11 — Split-field destination architecture

## Lesson
When a temporary hero raster is too weak to deserve full-width dominance, merely reducing its height can still leave the composition structurally conventional. A stronger travel-magazine solution is to change the architecture: split the top field asymmetrically, reserve one side for destination identity and native Japanese type, keep the photo on the other side, and deliberately let the main headline cross the boundary.

## Why it worked in DA
DA `875:2` uses a yellow destination field, a right-side Yokohama photo, one magenta headline block, and one cyan transition rule. Below it, feature 01 is typographic, feature 02 is a tilted photo story, and feature 03 is the dominant lower image. This produces scale variation and editorial collision without dashboard cards, rounded modules, generic shadows, or filler decoration.

## Guardrails
- Crossing a field boundary is only useful when the headline remains readable at actual size.
- Reject wrap regressions immediately; DA's first `ふたり旅。` wrap was not accepted.
- Keep color blocks functional: destination identity, headline contrast, transition, or section cue.
- A better composition does not convert a bad raster into an asset-quality PASS.
- Preserve native editable text, image provenance, fold, rollback frames, and exact image hashes.

## Evidence
DA Working `875:2`, front `875:131`, Review `878:2`; native text 37; image fills 7; text intersections 0; fold `875:186` at x 792.7. Whole-item and 794×1123 actual-size visual QA passed. Hero remains proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, so Q60 replacement is still required.

## Reuse
Apply this pattern when a Japanese travel/editorial cover needs more energy than a conventional hero-plus-modules layout but still needs print-native restraint. Prefer asymmetric field division and type/photo interlock before adding badges, cards, or decorative stickers.