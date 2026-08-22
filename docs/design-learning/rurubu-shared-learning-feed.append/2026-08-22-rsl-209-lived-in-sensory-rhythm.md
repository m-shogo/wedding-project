# RSL-209 — quiet editorial restraint still needs article-owned signs of human occupation

Date: 2026-08-22
Source scope: Rurubu WEDDING
Source role: V8 Cafe/Table
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Professional observation

Fresh source direction:

- Apartamento / Omar Sosa described the publication's rejection of sterile, over-styled interiors in favor of real living spaces and visible human occupation.
- Apartamento's Here 2016 discussion similarly framed everyday clutter/life as more compelling than empty visual perfection.

The transferable principle is not to add decorative clutter. It is to avoid confusing immaculate emptiness with editorial authenticity when the subject is fundamentally human and lived.

## Visible problem

V8 Cafe X was structurally clean and anti-template, but the left page still reduced three sensory observations to one evenly weighted text block surrounded by broad neutral whitespace. The page was becoming a refined wireframe: clean, quiet, and technically correct, but insufficiently inhabited by the actual cafe experience described by its own copy.

## Root-cause hypothesis

When a quiet page removes weak imagery and generic modules, it can over-correct into sterile restraint if article-owned sensory details all receive the same visual treatment. The absence of cards does not guarantee human editorial presence.

Failure fingerprint:

`F-RSL-209-QUIET-EDITORIAL-RESTRAINT-BECOMES-STERILE-WHEN-HUMAN-SENSORY-BEATS-ARE-EQUALLY-WEIGHTED`

## Bounded test

Rollback-safe candidate AC `2226:2` from X `2212:2`.

No new words were invented for the three main sensory moments. Existing native copy was separated and given content-derived roles:

- `カップの音。` — strong immediate sensory entry;
- `窓の光。` — quieter middle observation;
- `次の店を決める会話。` — stronger human/relational close.

The dinner-side action `一皿ずつ分け合いながら。` was moved closer to the food/table semantic headline to strengthen human ownership of the page.

No image, card, sticker, random rotation, decorative English, arbitrary accent alternation, gradient, shadow, or invented fact was added.

## Evidence

- 500px whole-spread: PASS
- reading-scale: PASS
- 1587×1123 actual-size: PASS
- native text: `13`
- IMAGE: `0`
- intersections: `0`
- 18px safe risk: `0`
- one-character explicit Japanese line heuristic: `0`
- previous X preserved as hidden rollback

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-CAFE-AC-LIVED-IN-SENSORY-RHYTHM-QA-2026-08-22.md`

## Verified result

AC is locally stronger than X because the page stays restrained but no longer treats the lived cafe details as one generic block. The new rhythm is justified by the semantic jobs of the exact existing copy rather than by visual novelty alone.

## Regression risk

Do not convert this into a rule that every quiet page needs scattered text, fake clutter, or multiple font sizes. Unequal emphasis is valid only when the content itself supports different roles. Previous RSL-203/RSL-204 logic still applies: disconnected fragments or arbitrary hierarchy without semantic basis remain failures.

## Cross-item applicability

Candidate principle only:

> After subtracting weak imagery/UI modules from a human/lifestyle spread, check whether the remaining copy has become too evenly weighted and sterile. If the article contains genuinely different sensory or relational beats, test content-owned hierarchy before adding decoration.

This remains `CROSS_ITEM_CANDIDATE`, not `VERIFIED_CROSS_ITEM` and not `PROMOTED_PROJECT_RULE`.

## Asset / transport boundary

No new image generation or transport was attempted. Existing RSL-208 remains the authority for the currently unchanged Drive→Figma DNS-blocked official upload path; do not retry that same path without a material capability change.
