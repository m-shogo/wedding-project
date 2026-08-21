# RSL-187 — Japanese typographic Story can beat unresolved photo-slot grammar

Date: 2026-08-21
Scope: Rurubu WEDDING local learning
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Observed problem

A Story spread had no legitimate role-specific image, but three large flat rectangles remained visible as nominal photo roles. At thumbnail and reading scale they looked like unfinished template slots and weakened publication authenticity.

## New professional knowledge

This run deliberately changed research domains instead of re-reading only previous photobook/grid sources.

- W3C JLREQ treats Japanese composition as a system including character classes, punctuation behavior, headings, illustrations and hanmen design—not merely text boxes that avoid overlap.
- Adobe's 2026 InDesign Japanese guidance distinguishes Kinsoku line-breaking rules from Mojikumi spacing relationships among Japanese characters, Roman characters, numerals and punctuation.

The transferable implication is that a Japanese text-led spread can be professionally designed through line endings, mixed-script rhythm, measure, hierarchy and page role. It does not need decorative containers that imply missing photography.

## Root-cause hypothesis

The design system treated image-slot repetition as structural consistency. Once the Story-specific asset was unavailable, the slot grammar remained even though the editorial role no longer justified it.

## Bounded test

Figma current V8 Story/Chronology:
- source root `2163:22`
- candidate/current root `2171:2`

Test:
- hide all three unresolved Story photo blocks and dependent captions;
- preserve the right factual chronology;
- rebuild the left page as an emotional typography-led essay using native Japanese text, unequal measures and a small functional editorial rule;
- keep the old root hidden as rollback.

## Expected improvement

- remove visible prototype/template residue;
- create a defensible sequence role: emotional Story page facing factual Chronology page;
- reduce equal-module AI grammar;
- keep copy editable for later real-content mojikumi/kinsoku QA.

## Regression risk

- book-design restraint may become destination-neutral;
- removing imagery can reduce travel desire if neighboring pages are also quiet;
- dummy copy passing current line breaks does not prove final copy will pass Japanese typographic QA.

## Evidence

Three-scale visual readback on `2171:2`:
- 500px thumbnail: PASS for bounded comparison;
- 1400px reading: PASS;
- 1588×1123 natural/actual render: PASS.

Structural readback:
- visible native text: `25`;
- text intersections: `0`;
- 18px safe-area risks: `0`;
- visible old Story photo slots: `0`;
- visible internal design/schema language: `0`.

The prior root `2163:22` is preserved hidden and explicitly named as rollback evidence.

## Verified local result

The typography-led candidate was promoted as current V8 Story root `2171:2`.

This verifies only the bounded local decision: when a page has no legitimate image and the facing page already carries structured factual content, replacing unresolved photo-slot grammar with an intentional text-led sequence beat can improve editorial authenticity.

## What must remain Rurubu-specific

Do not transfer:
- exact copy;
- exact coordinates;
- colors;
- line lengths;
- heading wording;
- the decision that another item should also be text-led.

## Cross-item applicability

Candidate transferable method only:
1. identify whether an image slot has a real semantic owner and legitimate asset;
2. if not, compare against an intentional text-led alternative rather than preserving the slot;
3. evaluate Japanese line endings, mixed Japanese/Latin/numeral rhythm, hierarchy and sequence role;
4. judge the result at thumbnail, reading and actual scale;
5. promote only with rollback evidence and no critical regression.

## Next receiving-item experiment

Before project-wide promotion, test on a materially different Rurubu role or a neutral shared-learning receiver where image absence is real. Do not inspect or copy non-Rurubu item-specific layouts under this task.
