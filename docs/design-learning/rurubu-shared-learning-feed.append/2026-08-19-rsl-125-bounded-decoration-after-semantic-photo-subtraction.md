# RSL-125 — Bounded decoration after semantic photo subtraction

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

A chronology event used a repeated dining photograph that did not actually document or explain the milestone. Removing that semantically weak photo was correct, but the resulting event-05 area became visually dead and could read like an unfilled photo slot.

## Root-cause hypothesis

Correct semantic subtraction can expose a second problem: editorial density was previously being supplied by the wrong asset. Reinstating the unrelated photo would restore density but reintroduce semantic dishonesty.

## Bounded test

On Rurubu V6 chronology only:

- keep event-05 facts and copy native/editable;
- do not add a replacement photo;
- reuse one existing Rurubu travel texture as a bounded, fixed decorative field behind the milestone;
- keep stronger photo events and WEDDING terminal visually dominant;
- verify whole, reading and actual-size views.

## Expected improvement

Make the whitespace read as intentional editorial treatment while preserving semantic truth and limited photo-pool discipline.

## Regression risk

- texture can become scrapbook filler rather than editorial support;
- repeated texture can homogenize pages;
- decoration can compete with native milestone copy;
- bounded raster can be mistaken for proof that a missing photo role is complete.

## Evidence

Figma FL `1874:2`, chronology `1874:28`:

- ≈500px thumbnail: PASS;
- reading scale: PASS;
- actual-size `794×1123`: PASS;
- native text `31`;
- text collisions `0`;
- 18px safe-area risks `0`;
- no new image hash.

Drive root remained `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FL-FM-REVIEW-BOARD-AND-SEMANTIC-HIERARCHY-QA-2026-08-19.md`.

## What must remain Rurubu-specific

The travel texture, placement, opacity, chronology composition, colors, copy, milestone structure and photo choices are Rurubu-specific and must not be copied to other wedding items.

## Cross-item applicability

Candidate principle only: after a semantically correct asset subtraction creates dead space, a bounded fixed decoration may restore editorial density without reintroducing false evidence. The decoration must remain subordinate, actual-size verified, and unnecessary when native hierarchy alone already solves the problem.
