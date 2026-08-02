# V5 Hero Caption — Editorial Strip Lesson

Date: 2026-08-03
Status: `TESTED / VERIFIED_FOR_V5 / NOT_GLOBAL_RULE`

## Context

The V5 cover hero used a floating white rounded caption card over the lower-right of the dominant photograph.

## Observed opportunity

The caption was readable, but the rounded white container repeated a Web/UI-card pattern, occupied more photograph area than necessary, and felt visually detached from the cover image.

## Hypothesis

A compact strip aligned to the image edge could keep reliable contrast while feeling more like a magazine caption and less like a floating application component.

## Live design change

Mutated semantic nodes only:

- `77:205` — `HERO_CAPTION_PANEL`
- `77:206` — `HERO_CAPTION_KICK`
- `77:207` — `HERO_CAPTION_MAIN`

Changes:

- white 94%-opaque rounded panel → navy 88%-opaque square-corner strip
- height `66 → 58`
- kicker `12 → 10`, retained as pink eyebrow
- main caption `17 → 16`, changed to white
- removed strokes and effects
- preserved native `Noto Sans JP` text, semantic IDs, editability, and rollback frames

## Verification evidence

Whole-spread screenshot after mutation confirmed:

- no overlap or missing text
- no structural flattening
- improved integration with the photograph edge
- reduced UI-card feel
- slightly more visible photograph area
- readable contrast at whole-spread scale

## General editorial principle

When variable photography requires containment, a compact edge-aligned strip can be preferable to a floating rounded card. The gain comes from lower visual mass, square geometry, and alignment—not from color change alone.

## Boundary

Do not standardize this treatment across all captions. Prefer direct typography or minimal rules where the image provides enough contrast. Use a strip only when containment has a clear editorial and readability function.

## Next application

Audit remaining V5 photo overlays one by one and classify each as:

1. direct type is sufficient
2. minimal rule/field is sufficient
3. containment is genuinely required
