# RSL-238 — browse guide should not imply mandatory order without an ordering job

Date: 2026-08-23
Source scope: Rurubu WEDDING / V8 Memory+Guide
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:
`F-RSL-238-BROWSE-GUIDE-USES-ORDINAL-STEPS-WHEN-SEMANTIC-ENTRY-POINTS-ARE-NONLINEAR`

## Professional observation

Fresh research into Joost Grootens' atlas/information-book practice emphasized that an information publication can be a tool readers enter non-linearly. Structure should help readers discover and compare information rather than impose a visual system that is stronger than the content's actual retrieval logic.

Observation source set: Domus interview with Joost Grootens; Studio Joost Grootens archive; nai010 publishers' description of `I swear I use no art at all`.

The source material is not itself a project rule.

## Visible problem

V8 Memory/Guide AQ used meaningful semantic entry labels `朝 / 昼 / 夕 / 夜`, but also displayed `01 / 02 / 03 / 04` beside the four guide entries. The right page was `寄り道案内`, not a mandatory four-step itinerary.

At whole-item scale the ordinals added checklist/step-component residue and suggested stronger linearity than the reader actually needed.

## Root-cause hypothesis

An ordinal is an information affordance, not neutral decoration. When a printed guide is intended for browsing and its semantic labels already provide adequate entry points, visible `01/02/03/04` can falsely imply mandatory sequence.

## Bounded experiment

Rollback-safe AQ2 `2335:2` cloned current AQ and changed only the visibility of the four exact ordinal text nodes:

- `2335:13 / 01`
- `2335:17 / 02`
- `2335:21 / 03`
- `2335:25 / 04`

All content, positions, day-part labels, typography, folios and colors stayed unchanged. No image, container or decorative replacement was added.

## Evidence

Three-scale visual QA:

- 500px whole-item: PASS
- 1400px reading: PASS
- 1587×1123 actual-size: PASS

Structure before promotion:

- visible native text `17`
- IMAGE fills `0`
- text intersections `0`
- 18px safe risks `0`
- Japanese semantic font mismatch `0`

After verification AQ2 `2335:2` became current at `x=0 / y=9850`; previous AQ `2256:2` is hidden rollback at `x=300000 / y=9850`.

Item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AQ2-MEMORY-NONLINEAR-GUIDE-QA-2026-08-23.md`.

## What changed in design judgment

Fresh research redirected the intervention away from generic spacing/density polish. The real problem was the mismatch between **browse behavior** and **step affordance**.

## Transferable candidate principle

Before adding or retaining ordinal numbers in an editorial guide, ask what retrieval job the order performs.

- Keep ordinals when sequence, map lookup, chronology, itinerary order, cross-reference or other reader retrieval genuinely depends on them.
- When semantic entry points are intentionally non-linear and already sufficient, independently test whether removing the ordinal layer reduces UI/checklist residue without harming navigation.

## Do not transfer

Do not transfer Rurubu's exact `朝/昼/夕/夜` structure, coordinates, cream/navy/rust palette, type scale, copy, V8 composition or folio treatment.

This is not a blanket `remove numbering` rule.
