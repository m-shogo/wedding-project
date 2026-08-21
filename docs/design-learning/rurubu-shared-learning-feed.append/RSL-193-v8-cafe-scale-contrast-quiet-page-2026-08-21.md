# RSL-193 — Quiet editorial pages still need deliberate scale contrast

Date: 2026-08-21
Source scope: Rurubu WEDDING / V8 Cafe+Table
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A structurally correct quiet spread used mostly medium-size type plus large neutral fields. At thumbnail scale it read as a refined wireframe rather than a professionally paced editorial spread.

## Evidence before change

V8 Cafe/Table I `2178:2` had native editable text, no collisions and no fake image slot, but its two pages had similar visual weight and insufficient scale contrast.

## Root-cause hypothesis

White space is not automatically editorial sophistication. Quietness becomes convincing when the page still has clear hierarchy, tension and pacing. Medium-everything typography plus large empty fields can become another AI/template failure mode even after cards and fake imagery are removed.

## Professional principle tested

New research used in the local test:

- Aperture redesign analysis: stronger pacing comes from deliberate modulation of image scale, white space and article tempo rather than an even flow.
- The Gourmand: a simple text-led page can work inside a broader publication when quieter pages and visually flamboyant pages are intentionally sequenced.
- David Lane / The Gourmand: visual elements should have a clear editorial idea and decisive scale instead of default middle-weight treatment.

## Bounded change

On rollback-safe Cafe/Table L `2183:2`:

- promoted the meaningful reader-facing thesis to a much larger type role;
- reduced sensory supporting text to a subordinate scale;
- increased left/right contrast through different headline and index masses;
- preserved functional rules and native editability;
- kept the semantically weak generated TABLE_ESSAY image hidden;
- added no unrelated photography, card, shadow, gradient or decorative English.

## Expected improvement

Make a quiet spread feel authored rather than unfinished while preserving book-design restraint and avoiding fake image placeholders.

## Regression risk

Excessive type enlargement can become poster-like, decorative, or monotonous across a publication. This is not permission to make every page type-only or to use oversized type without semantic ownership.

## Evidence after change

- 500px whole spread: PASS
- 1400px reading scale: PASS
- 1587×1123 actual size: PASS
- native text: `13`
- IMAGE roles: `0`
- text intersections: `0`
- 18px safe-area risks: `0`

Figma current: `2183:2`
Rollback: `2178:2` hidden
Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-CAFE-L-SCALE-CONTRAST-FOOD-ESSAY-QA-2026-08-21.md`

## Failure fingerprint

`F-RSL-193-QUIET-PAGE-WITHOUT-SCALE-CONTRAST-READS-AS-WIREFRAME`

Normalized meaning: after UI/card/image-placeholder subtraction, a page can still look AI/template-like if all visible elements retain similar middle-weight scale and white space has no pacing function.

Replacement method: first test semantic hierarchy, scale contrast, asymmetric mass and publication-sequence role before reintroducing decoration or fake imagery.

## What must remain Rurubu-specific

Exact Japanese copy, page coordinates, pale `04` / `夜` index treatment, palette, type sizes and Cafe-specific publication rhythm.

## Cross-item applicability hypothesis

Other print items may independently test whether a quiet page that reads unfinished needs stronger hierarchy rather than more containers or decoration. Receiving items must verify at thumbnail, reading and actual-size scales; this is not a project-wide rule yet.
