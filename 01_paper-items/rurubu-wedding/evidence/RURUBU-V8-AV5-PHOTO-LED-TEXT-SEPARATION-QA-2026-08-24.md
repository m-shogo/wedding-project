# Rurubu WEDDING V8 — AV5 Photo-led Text/Image Separation QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Starting authority

- V6 control frozen: `JC + IX + JB + IZ + IT + JA`
- V7 current comparison: `C8 + K2 + F4 + G9 + H9 + C6D`
- V8 starting Outer: AV3 `2431:2`
- V8 Drive authority: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`
- V7 Drive comparison authority: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x`

No non-Rurubu production Figma/Drive/item-specific authority was inspected. Only the neutral non-Rurubu shared-learning feed was read.

## New professional research observation

New reference rotation focused on magazine-cover art direction and image/type responsibility rather than repeating the recent source-truth, pagination, JLREQ or food-photography references.

Useful observation only: professional cover practice does not require photography to become a text background. When the photograph itself is the visual argument, art directors may keep type off the image and let the picture carry its own read. Conversely, overlay type remains valid when the editorial concept requires it. The decision must be tested against the actual publication, not copied as a style rule.

Sources reviewed for this bounded decision included Eye Magazine's cover/art-direction interviews and AIGA's cover-hierarchy teaching resource.

State before local test: `OBSERVED → ROOT_CAUSE_HYPOTHESIS`.

## Live problem in AV3

AV3 `2431:2` used one large structural destination-photo role `2431:14`, with `2431:18 / FRONT_HEAD` placed directly on top of the photograph in white.

The composition was legible, but the overlay created two production consequences:

1. the photo also had to act as a text-safe background, not only as destination/essay evidence;
2. future legitimate photography would be constrained to candidates/crops with a reliable high-contrast text-safe zone.

This is distinct from the earlier AV4A/AV4B source-truth experiments. Those removed the photo and materially weakened travel desire. The present hypothesis was therefore: **retain the photo, but test whether the display type still needs to sit on it.**

## Bounded candidate

Candidate: AV5 `2456:2`.

Unchanged:

- photograph and image hash;
- photo rectangle `647×386` at local `x=852 / y=420`;
- crop;
- `横浜` destination title;
- masthead/series copy;
- all character strings;
- back-cover layout;
- cream/navy palette;
- page size.

Changed only:

- `2456:18 / FRONT_HEAD`: `x=878 / y=826`; existing copy unchanged; fill changed from white to existing V8 navy;
- `2456:19 / FRONT_DECK`: moved to `x=878 / y=930`; copy unchanged;
- `2456:21 / FRONT_CAPTION`: moved to `x≈1278.7 / y=1040`; copy unchanged.

No new copy, decorative shape, card, badge, gradient, shadow, image or asset was introduced.

## Three-scale visual QA

### Whole-item / 500px

PASS.

AV5 retains immediate `横浜` destination recognition and a strong photograph, while the photograph reads as an independent visual field instead of a text panel. The cover remains materially more travel-oriented than the rejected photo-free AV4A/AV4B studies.

### Reading / 1400px

PASS.

Reading order is clear: masthead → destination → photograph → `ふたりの旅を、ページにして残す。` → deck/caption. The lower cream field now carries the explanatory typography without competing with the image.

### Actual-size / 1587×1123

DESIGN QA PASS.

No visible clipping, accidental Japanese wrap, text collision or contrast failure was found. Final print readiness is not claimed.

## Structure QA

Post-promotion readback:

- AV5 root: `2456:2`
- parent: `2052:2`
- visible: `true`
- position: `0 / 8500`
- visible native text: `11`
- visible IMAGE fills: `1`
- text-text intersections: `0`
- 18px edge risk: `0`
- current V7/V8 pairwise root overlap: `0`

Rollback:

- AV3 `2431:2`
- `visible=false`
- `x=300000`
- name: `ROLLBACK / V8 AV3 / OUTER / PRE-PHOTO-LED-TEXT-SEPARATION / HIDDEN`

## Six-view professional critique

- **Art director:** PASS — the front has a clearer idea: destination word + one image, rather than image-as-background.
- **Editorial designer:** PASS — reading order is explicit without adding navigation furniture.
- **Book designer:** PASS — stronger restrained-monograph character; the page does not become empty luxury whitespace.
- **Typographer:** PASS — display copy no longer depends on variable photographic contrast.
- **Photo editor:** PASS for structural role — future image selection gains freedom because the photo no longer requires a prescribed text-safe zone. Final photography remains blocked.
- **Print designer:** PASS for design structure — white reverse display type over variable continuous-tone photography is removed; printer-template/preflight/physical proof remain separate gates.

## Anti-AI / authenticity gate

PASS for the tested design change. No web-card grammar, generic polish, decorative English, fake randomness or ornamental module was added. The improvement came from clarifying editorial responsibility between picture and type.

## Truth boundary

AV5 is **not** a solution to destination-photo source truth. The live image remains a structural dummy while the cover still says `横浜`. Therefore:

- DESIGN QA: PASS
- REAL CONTENT QA: BLOCKED
- PHOTO SOURCE TRUTH: BLOCKED
- PRINT TEMPLATE / PREFLIGHT: NOT VERIFIED
- PHYSICAL PROOF: NOT VERIFIED

## Before/after learning check

YES. Without the new cover-art-direction research, the likely next action would have been additional overlay contrast/crop polish. The new knowledge changed the decision to test whether the overlay itself was necessary.

## Asset truth

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- final photography adopted: `0`
- V6 changes: `0`
- V7 changes: `0`

## Result

AV5 `2456:2` promoted to current V8 Outer. RSL-263 recorded as a bounded local learning; legitimate Outer photography remains the highest-value next step.
