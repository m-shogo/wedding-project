# RSL-204 — Short interview answers can own the visual voice before prompts do

Date: 2026-08-22
Source scope/item: Rurubu WEDDING / V8 Profile V → Z
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Profile V had already removed card/UI containment, but the Q&A still gave the prompts more size and visual authority than the actual short answers. At reading scale the page could still behave like a polished form: question label → large prompt → smaller muted response.

## Root-cause hypothesis

When a short answer contains the real respondent voice, visually subordinating it to the prompt can preserve form/interview-template semantics even after cards and dividers are removed. The editorial hierarchy should be based on who owns the meaning, not on the structural role of the field.

## Professional research hypothesis

- Córdova Canillas / It's Nice That: strong publication design depends on content, not layout technique by itself.
- Elana Schlenker / Eye on Design: large decorative display devices can become an empty shorthand for editorial design.

Transferable interpretation: before adding decorative type or enlarging prompts for visual interest, test whether article-owned/respondent-owned language itself can carry the display mass.

## Bounded test

1. **Y `2214:2` — REJECTED**
   - enlarged/staggered prompts to create more visual rhythm;
   - rejected because Q1/Q2/Q3 hierarchy was visually varied without enough semantic justification.
2. **Z `2215:2` — ADOPTED**
   - kept prompts small enough to function as navigation/context;
   - promoted existing native answers into the larger editorial beats;
   - changed the Q&A kicker to reader-facing Japanese `Q&A / 小さな会話`;
   - added no new image, decoration, card, badge, shadow or invented fact.

## Three-scale evidence

- 500 px whole spread: PASS
- 1000 px reading: PASS
- 1587×1123 actual size: PASS
- native text: `23`
- IMAGE roles: `0`
- text intersections: initial Q-label boxes overlapped question boxes by 5–8 px; corrected before adoption; final `0`
- 18 px safe risk: `0`
- one-character Japanese explicit-line heuristic: `0`

Figma:
- current Z `2215:2`
- hidden rollback V `2207:2`
- hidden rejected Y `2214:2`
- file `bfM0d4c9dCeBv5pCkJ3TNM`

GitHub evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-PROFILE-Z-ANSWER-OWNED-VOICE-QA-2026-08-22.md`

Drive:
No asset change. V8 authority folder remained `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`.

## Failure fingerprints

`F-RSL-204-PROMPTS-DOMINATE-SHORT-ACTUAL-VOICE-AND-PRESERVE-FORM-SEMANTICS`

Secondary rejected-experiment fingerprint:
`F-RSL-204-UNEQUAL-PROMPT-SCALE-WITHOUT-CONTENT-BASIS`

## What must remain Rurubu-specific

Do not transfer:
- SHOGO / SHI-CHAN copy
- Q&A wording
- exact x/y positions
- type sizes
- navy/red palette
- this two-page composition

## Cross-item applicability hypothesis

A different print artifact containing short interview/testimonial/reply content may independently test whether the actual speaker voice should own more visual hierarchy than its labels or prompts. Do not apply this to long answers, legal/form fields, questionnaires where prompt hierarchy is functional, or cases where speaker identity is unresolved.

## Next receiving-item experiment

If a non-Rurubu artifact has a real short quote/testimonial role and currently gives the metadata/question more hierarchy than the voice, test a rollback-safe answer-owned version and verify whole-item, reading, actual-size, dynamic-copy and physical-role safety independently.
