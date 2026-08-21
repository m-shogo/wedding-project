# RSL-196 — Equal semantic roles can preserve template rhythm after UI subtraction

Date: 2026-08-22
Source: Rurubu WEDDING / V8 Profile+Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The prior V8 Profile/Q&A H had no cards, no images and very little decoration, yet still read as a polished wireframe. The right page expressed Q1/Q2/Q3 as three equal-height rows with equal divider rules; the left page treated two people as nearly equal information columns.

## Root-cause hypothesis

AI/UI-template feeling can survive the removal of cards and decorative containers when the **semantic roles themselves are assigned equal size, equal spacing and equal visual importance**. The problem can therefore be role weighting, not surface styling.

## Principle tested

Before adding visual decoration to a quiet type-led spread, ask whether the content roles genuinely deserve equal weight. If not, test an editorial sequence with differentiated entry / support / close roles, while preserving one coherent publication system.

## Bounded test

Profile/Q&A P `2194:2`:

- enlarged and staggered the two native names into a typographic dialogue;
- removed the profile rule and two equal Q&A divider rules;
- promoted Q1 as the entry beat, kept Q2 as support and shifted Q3 into a distinct closing beat;
- preserved all factual/question copy as native text;
- added no image, card, badge, shadow, gradient or decorative filler.

## Expected improvement

Less wireframe/template reading; stronger content-led hierarchy and page pacing without inventing new content.

## Regression risk

Asymmetry can become arbitrary decoration, and quiet space can become dead space. The differentiated roles must remain traceable to actual content purpose and pass whole-spread reading order at thumbnail and actual size.

## Evidence

- Figma current: `2194:2`
- rollback H: `2177:2`
- 1000px whole spread: PASS
- 1587×1123 actual-size: PASS
- native text: `25`
- IMAGE: `0`
- text intersections: `0`
- 18px safe risk: `0`
- Japanese semantic-wrap QA: PASS
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-PROFILE-P-ASYMMETRIC-VOICE-RHYTHM-QA-2026-08-22.md`

## What must remain Rurubu-specific

Exact SHOGO/SHI-CHAN scale, Q&A placement, navy/red/cream system, page coordinates, copy, and V8 book-edition art direction.

## Cross-item applicability

Other print items may independently test this when UI containers have already been removed but repeated equal rows/columns still make the design feel templated. Do not transfer the layout itself; test whether semantic role differentiation improves reading order without harming physical artifact requirements.