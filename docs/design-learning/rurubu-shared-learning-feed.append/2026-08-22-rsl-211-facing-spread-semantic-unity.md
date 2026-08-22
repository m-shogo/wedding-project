# RSL-211 — Facing-spread unity must come from semantic role contrast, not arbitrary geometric choreography

Date: 2026-08-22
Source scope/item: Rurubu WEDDING / V8 Cafe+Table
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V8 Cafe AC had become intentionally quiet and article-owned, but the right Dinner page still felt slightly under-resolved. A first attempt to make the spread feel more unified moved left-page sensory text progressively toward the gutter.

That attempt made the spread look more 'designed' without giving the movement a sufficiently strong editorial reason. It also created a poor Japanese line break in the closing copy.

## Root-cause hypothesis

A two-page spread is one reading field, but **visual continuity is not the same thing as geometric continuity**. If text is moved, rotated, scattered or diagonally staged only to demonstrate a cross-spread gesture, the result can become poster-like or AI-decorative.

Spread unity should instead emerge from:

- different but complementary page roles;
- content-owned scale relationships;
- page-turn/opening/closing cadence;
- a line, rule, image or field only when it performs a real binding function.

## Professional research observation

Fresh references used as hypotheses, not copied styles:

- MoMA / Irma Boom `SHV Think Book`: book design operates through typography, layout, physical production and reader journey as one system.
- D&AD / Donna Payne on Book Design: page turns and physicality matter because the work should belong specifically to the book medium.
- Designing With Type / Double-Page Spread: a spread coordinates display/body type, heads, captions, folios, illustrations and grid decisions rather than treating pages as unrelated panels.

## Bounded tests

### AE `2230:2` — REJECTED

Changed the left Cafe page into a stronger diagonal progression toward the gutter while enlarging Dinner hierarchy.

Observed regressions:

- movement lacked content ownership;
- page looked more poster-like;
- closing copy wrapped awkwardly as `何気ないひと休みま / で、 / 今日の味になる。`;
- more visible choreography did not improve the editorial job.

AE is preserved hidden as rejection evidence.

### AF `2230:26` — ADOPTED

Returned to AC and preserved the proven left Cafe page unchanged. Changed only the weaker Dinner page:

- removed a short rule that did not prove a binding function;
- strengthened the article-owned opening title;
- retained the quieter action line;
- strengthened the article-owned closing sentence;
- added no new imagery, card, badge, decorative English, shadow, gradient or invented content.

## Expected improvement

Make the spread feel intentionally paced as a two-page publication without inventing a visual bridge whose only job is to look editorial.

## Regression risk

This lesson must not become 'never move text across a spread' or 'remove every rule'. A strong image, caption bridge, binding line, bleed, or directional sequence may legitimately cross or connect pages when the content/physical object owns that behavior.

## Three-scale evidence

AF after promotion:

- whole spread / 500 px: `PASS`
- reading / 1000 px: `PASS`
- actual 1587×1123: `PASS`
- visible native text: `13`
- IMAGE fills: `0`
- text intersections: `0`
- 18 px safe risk: `0`
- accidental explicit one-character Japanese wrap candidates: `0`
- parent page: `2052:2`

## Failure fingerprint

`F-RSL-211-FACING-SPREAD-UNITY-SIMULATED-BY-ARBITRARY-DIAGONAL-TEXT-DRIFT`

Operation/capability: facing-spread editorial choreography.

Symptom: text is spatially staggered across a spread to create apparent flow, but the movement is not supported by content role and can cause awkward Japanese wrap or poster-like styling.

Likely cause class: visual variation created for design-signaling rather than reader meaning.

Replacement method: restore stable content roles, then change only the weak page/role through content-owned scale, pacing, or a proven binder.

Stop condition: if the movement cannot be explained by reading order, time, location, image subject, physical fold, caption relationship, or another semantic/physical role, reject rather than decorate further.

## What must remain Rurubu-specific

Do not transfer:

- Cafe/Dinner wording;
- exact x/y positions;
- type scales;
- cream/navy/rust palette;
- V8 restraint level;
- food/travel editorial grammar.

## Cross-item applicability hypothesis

On another materially different print artifact, when someone attempts to 'connect the spread' by staggering or scattering elements, compare it against a simpler version where each side has a distinct semantic job. Promote the connective gesture only if it improves reader understanding at whole-item scale without line-break, safe-area, or role regressions.

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- canonical page: `2052:2`
- AC rollback: `2226:2`
- AE rejected: `2230:2`
- AF Current: `2230:26`
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-CAFE-AF-DINNER-PAGE-CONTENT-OWNED-SCALE-QA-2026-08-22.md`
