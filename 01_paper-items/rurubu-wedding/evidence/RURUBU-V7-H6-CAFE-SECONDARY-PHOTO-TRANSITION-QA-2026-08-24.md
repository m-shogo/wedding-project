# RURUBU V7 H6 — Cafe/Table secondary-photo transition QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Current candidate: `2404:2 / H6`
Baseline: `2401:2 / H4`
Rejected comparison: `2403:2 / H5`
State: `DESIGN_QA_PASS / VERIFIED_LOCAL_DUMMY_DESIGN / REAL-PHOTO-BLOCKED / NOT_PRINT_READY`

## New professional research

Fresh sources used for this decision:

- Aperture, **Stuart Smith: How Not to Design a Photobook** — editing and sequencing are core design work; weak photographs should be removed from a sequence, while useful material can be discovered in the broader edit / b-roll.
  - https://aperture.org/workshops/smith2016/
  - https://aperture.org/workshops/smith2017/
- Aperture, **How to Produce a Photobook** — editing and sequencing are treated as early bookmaking decisions and are tested through physical/dummy iteration, not added as late decoration.
  - https://aperture.org/editorial/how-to-produce-a-photobook/

Research observation only: a secondary image earns its place by what it does to the sequence, not by filling unused space.

Rurubu-local hypothesis: in V7 Cafe, the small secondary street dummy may be useful as a transition from cafe sensory memory toward `次の店を決める会話。`, but only if its placement makes that role legible.

## Baseline H4

H4 `2401:2` kept a secondary street image:

- node `2401:10`
- `x=500 / y=615`
- `260×230`
- structural dummy, not verified Hawaii photography

At reading scale it aligned more strongly with `カップの音。 / 窓の光。` than with `次の店を決める会話。`. The image therefore had ambiguous ownership and could read as decorative filler.

## Test A — H5 removal

H5 `2403:2` changed only secondary-image visibility to hidden.

Result:

- geometry/structure remained clean;
- at 500 px the left page became noticeably quieter and less travel-magazine-like;
- at 1400 px the lower-left cream field felt under-edited rather than intentionally paced;
- removal solved ambiguity by deleting useful tempo.

Decision: **REJECTED**.

Final evidence state:
`2403:2 / REJECTED / V7 H5 / CAFE+TABLE / SECONDARY-PHOTO-REMOVAL / PACE-AND-ENERGY-LOSS / HIDDEN`

## Test B — H6 transition binding

H6 `2404:2` keeps the same image hash but changes its editorial role and local geometry:

- node `2404:10`
- renamed `STRUCTURAL PHOTO DUMMY / V7 CAFE TRANSITION / NEXT-SHOP CONTEXT / NOT FINAL HAWAII`
- `x=500 / y=690`
- resized `260×175`
- image hash `439a719d73f28e8dd2889f2026cccb15f345ec63`
- intrinsic image size `352×368`

The image now shares the visual band of `次の店を決める会話。` rather than the sensory pair above it. Its bottom is `865`; the closing beat begins at `900`, preserving a 35 px separation.

No reader copy, factual copy, title graphic, dominant photo, image hash, palette, card/container grammar, shadow, gradient, sticker, or decorative English was added.

## Three-scale visual QA

### 500 px whole-item

PASS.

- H5 is too empty and loses V7 energy.
- H4 retains energy but the secondary image has ambiguous semantic ownership.
- H6 retains energy while reading as an intentional transition beat.

### 1400 px reading scale

PASS.

Reading order is clearer:

`dominant Cafe photo → 11:40 caption → カップの音 / 窓の光 → 次の店を決める会話 + transition image → Cafe close`

The right-page food sequence remains unchanged.

### 1587×1123 actual-size design proof

PASS for DESIGN QA.

No visible clipping, accidental collision, broken Japanese line break, or unsafe edge condition was introduced.

## Structure QA

H6 final readback:

- visible native text: `11`
- IMAGE-fill nodes: `5`
- text-text intersections: `0`
- bounded 18 px edge risks: `0`
- Japanese font mismatch: `0`
- current V7 root pairwise overlap after promotion: `0`
- parent: `2052:2`

Current/rollback state:

- current: `2404:2 / H6`
- hidden rollback: `2401:2 / H4`
- hidden rejected evidence: `2403:2 / H5`

## Six-view professional critique

A. **Art director** — PASS: the spread keeps a clear high-energy Cafe/Table idea and does not add decorative furniture.

B. **Editorial designer** — PASS: the secondary image now advances a specific reading beat rather than occupying a spare rectangle.

C. **Book designer** — PASS locally: the left page keeps a faster visual tempo than a restrained book spread, appropriate to V7. Publication-wide winner is not asserted.

D. **Typographer** — PASS: no text change; existing semantic line breaks and Japanese font assignments remain intact.

E. **Photo editor** — DESIGN PASS / REAL CONTENT BLOCKED: the role is clearer, but the image remains a non-Hawaii structural dummy with low intrinsic size for final print.

F. **Print designer** — DESIGN STRUCTURE PASS / PRINT BLOCKED: final printer template, bleed/fold, final photo resolution and physical proof remain unverified.

## Asset truth

- image generation: `0`
- Drive write: `0`
- new Drive master: `0`
- new image hash: `0`
- final Hawaii photo adopted: `0`
- existing dummy repositioned/resized: `1`

The transition image is not approved as final photography. Filename/node semantics must not be used to imply Hawaii documentary truth.

## Decision

Promote H6 `2404:2` as current V7 Cafe comparison candidate.

Learning state: `VERIFIED_LOCAL` only. A real-photo replacement must reproduce the sequence advantage before any stronger promotion.
