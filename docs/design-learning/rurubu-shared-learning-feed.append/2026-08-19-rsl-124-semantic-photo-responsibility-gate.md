# RSL-124 — Semantic photo responsibility gate

Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Scope: Rurubu WEDDING local verification. Cross-item visual transfer prohibited.

## Source problem

A mature travel-magazine layout can still look synthetic when every informational beat is given a photograph simply because the template has a photo slot. In the current V6, two such roles remained:

- Table `04` used a small repeated support photo even though a dominant dining hero already established the food/table subject.
- Chronology event `05 / 入籍` used the repeated dining photo even though that image did not document or semantically explain the milestone.

The repeated failure fingerprint is:

`SEMANTICALLY_WEAK_PHOTO_ROLE_REPETITION`

The role exists because another photo seems visually expected, not because the photograph supplies unique evidence, story meaning or destination information.

## Root-cause hypothesis

When a photo has weak semantic/evidentiary responsibility, keeping it for density can create two defects at once:

1. repeated-image artificiality;
2. card/module rhythm that makes the page feel templated.

A stronger result may come from moving editorial responsibility to native typography, but only when sufficient visual evidence remains elsewhere on the page and the page does not become too quiet.

## Bounded tests

### Test A — Table 04

- source: FB `1843:2`;
- candidate/adopted: FJ `1866:2`;
- hide the small Table-04 support photo;
- keep the dominant dining hero;
- promote 04 into a native typographic feature;
- no replacement photo or new decoration system.

Expected improvement: remove the extra photo-card module without losing food/table evidence.

Regression risk: over-subtraction could make the lower page empty or reduce travel-magazine energy.

Result: `VERIFIED_LOCAL`.

### Test B — chronology event 05

- source: EN `1773:2`;
- candidate/adopted: FK `1870:2`;
- hide the repeated dining image attached to `05 / 入籍`;
- preserve native date/title/body;
- promote the event into a typographic milestone;
- keep the hero and other legitimate photo beats.

Expected improvement: stop implying that an unrelated food image is evidence for the milestone and reduce repeated-photo artificiality.

Regression risk: removing too many milestone images could turn the chronology back into a text-only timeline.

Result: `VERIFIED_LOCAL`.

## Failure / repair evidence

Both candidates initially exposed a native text collision after typography was enlarged:

- FJ: 04 number/title collision;
- FK: event-05 number/title collision.

Neither initial state was adopted. Positions/auto-height stack were repaired, then actual-size structural QA was rerun.

This reinforces the existing principle that moving responsibility from image to typography must include actual-size collision QA; it is not a license to simply delete imagery.

## Three-scale evidence

FJ:

- whole-item/spread: PASS;
- reading/page: PASS;
- actual-size Table `794×1123`: PASS;
- native text `22`;
- text collisions `0`;
- 18px safe-area risks `0`.

FK:

- whole/read context: PASS;
- actual-size chronology `794×1123`: PASS;
- native text `31`;
- text collisions `0`;
- 18px safe-area risks `0`.

## Figma / Drive / GitHub evidence

Figma:

- FJ preferred `1866:2`, Table `1866:29`;
- FK preferred `1870:2`, chronology `1870:28`;
- FB `1843:2` and EN `1773:2` preserved hidden as rollback;
- Start Here `845:27` updated to `FH + FG/FK + EW + FJ + FI · V7 HOLD`.

Post-adoption six-spread image-role audit:

- visible IMAGE-fill roles: `30`;
- unique hashes: `8`;
- dining image visible repetitions: `5` after FK;
- no new image hash.

Drive:

- authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- new Drive save: `0`;
- generated asset adopted: `0`.

GitHub detailed evidence:

`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FJ-FK-SEMANTIC-PHOTO-RESPONSIBILITY-QA-2026-08-19.md`

## What must remain Rurubu-specific

Do not transfer:

- the 04/05 numbering treatment;
- magenta/cyan/navy colors;
- exact typography sizes or coordinates;
- Yokohama/Hawaii editorial styling;
- specific photo choices;
- chronology wording or structure.

## Cross-item applicability

Candidate transferable decision method only:

> Before retaining or adding a photograph for a repeated informational beat, ask what unique evidence/story/destination responsibility the image carries. If that responsibility is weak, test whether native typography can carry the beat while an existing legitimate visual anchor preserves page energy.

This is not yet `VERIFIED_CROSS_ITEM` and must remain a hypothesis outside Rurubu until independently tested.