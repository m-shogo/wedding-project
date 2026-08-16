# Rurubu WEDDING V6 — BB Q&A Hero Photo-Type QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `BB_PREFERRED / VERIFIED_LOCAL / BA_GEOMETRY_STRESS_INHERITED / V7_HOLD / NOT_PRINT_READY`

## Problem observed after BA promotion

BA solved the Q&A reading hierarchy, but actual-size `794×1123` review exposed a different quality limit: the dining-memory hero was technically inside its intrinsic dimensions (`465×480` display vs `732×498` source) yet still looked perceptually soft compared with the surrounding native typography and sharper photography.

This is a visual-quality issue, not a geometry or provenance failure.

## Bounded BB test

BB `1415:2` cloned BA with **one change only**:

- `PHOTO / QA_MEMORY_HERO_REPLACEABLE` kept the exact same `465×480` role geometry;
- image fill changed from the softer dining source to the already-verified Rurubu travel-flatlay image hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- intrinsic flatlay size: `944×608`;
- no text, position, font, support image, question order, safe area, mask role, card, shadow, gradient or decoration changed.

Expected improvement:

- preserve BA's successful interview reading flow;
- improve actual-size crispness;
- strengthen travel-magazine semantic fit through camera/map/travel-object imagery;
- keep the hero fully replaceable later.

Regression risk:

- flatlay might feel less personal than dining memory;
- crop might become too object-centric;
- repeated use of the flatlay elsewhere in the dummy study could become noticeable.

## Visual comparison

Actual Q&A `794×1123`:

- BA dining hero: hierarchy PASS, but visible softness remained.
- BB travel-flatlay hero: sharper object edges, stronger travel-information-magazine reading, cleaner contrast with native Q&A text.

500 px whole-spread:

- BB PASS; interview hierarchy remains unchanged and the new hero retains a clear dominant anchor.

Decision:

`BB > BA` for the current dummy-design study.

The photo is still a dummy/replaceable role; it is not final wedding photography.

## Structural and intrinsic readback

BB Q&A:

- native text geometry unchanged from BA;
- text/text collision `0`;
- 18 px text safe-area risk `0`;
- hero display `465×480`;
- hero intrinsic `944×608`;
- within intrinsic: `true`;
- hero remains `PHOTO / QA_MEMORY_HERO_REPLACEABLE`.

BA long-answer proof `1412:2` remains applicable because BB changed only the hero image fill and did not change any text/image role geometry.

## Rollback state

- BB `1415:2` → preferred
- BA `1411:2` → hidden rollback
- AZ `1409:2` remains preferred for Story/chronology
- V7 remains HOLD.

Start Here:

`V5 FU/FX · V6 P + BB/AZ INSIDE STUDIES · V7 HOLD`

## Asset lifecycle truth

- new generation: `0`
- new Drive save: `0`
- new Figma binary upload: `0`
- existing verified Figma image hash reused: `YES`
- image role replaceability preserved: `YES`
- visual inspection before adoption: `YES`
- generated decoration adopted: `NO`
- V7 touched: `NO`.
