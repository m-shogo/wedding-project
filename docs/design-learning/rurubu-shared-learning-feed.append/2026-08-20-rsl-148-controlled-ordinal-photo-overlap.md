# RSL-148 — Resolve ordinal/title collisions by moving the ordinal deeper onto its legitimate photograph when contrast supports it

Source scope/item: Rurubu WEDDING
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

Cross-spread structure QA found that GK Cafe page's large native `02` ordinal overlapped its native title `景色まで、ごちそう。` by `12×62px`. The composition looked nearly acceptable at reduced scale, so this was a real example of a structural defect hidden by a visually plausible layout.

## Root-cause hypothesis

When a large editorial ordinal is intentionally shared between a photograph and adjacent copy, small geometry drift can make it collide with the title. Moving the copy farther away can weaken the editorial column and create excess whitespace. If the photograph has enough contrast and the ordinal already overlaps it, moving the ordinal farther onto the legitimate image can improve both separation and editorial binding.

## Principle tested

For a photo-bound native ordinal that collides with adjacent native copy:

1. do not automatically move the whole copy column outward;
2. test whether the ordinal can move farther onto the already legitimate replaceable photo;
3. preserve image geometry/hash and copy geometry;
4. verify the new photo overlap and text separation at actual size.

Reject this method when photograph contrast is insufficient or the ordinal would obscure important image content.

## Bounded test

GL `2000:2` duplicated GK `1991:2` and changed only `TEXT / VIEW_NUM`:

- x `224 → 202`;
- y, dimensions, font size, color and characters unchanged;
- photograph remains `238×218`, same source/hash;
- ordinal/photo overlap increased to `62px`;
- title/body/meta/Cafe Check/closing and Table page remain unchanged.

## Expected improvement

Remove the structural collision without making the copy column more timid, while strengthening the intended photo/ordinal relationship.

## Regression risk

- number can become unreadable on a detailed or low-contrast photograph;
- number can cover semantically important photo content;
- moving the number too far can make it look like a decorative watermark instead of an ordinal;
- thumbnail improvement can hide actual-size safe-area or collision regressions.

## Three-scale evidence

- ~900px whole spread: PASS and more intentional than GK;
- reading scale: PASS;
- actual Cafe `2000:3 / 794×1123`: PASS;
- native visible text: 20;
- visible text collisions: 0;
- 18px safe-area risks: 0;
- number/photo overlap: 62px;
- image geometry/hash: unchanged.

## Figma / Drive / GitHub evidence

- preferred: GL `2000:2`;
- Cafe page: `2000:3`;
- hidden rollback: GK `1991:2`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GL-CAFE-02-CONTROLLED-NUMBER-PHOTO-OVERLAP-QA-2026-08-20.md`.

## Failure fingerprint

`PHOTO_BOUND_ORDINAL_DRIFTS_INTO_ADJACENT_TITLE`: a visually plausible photo-bound ordinal drifted far enough toward the adjacent title to create a real text collision. Thumbnail review alone did not reveal the structural defect.

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

Exact `02` size/color, Yokohama view photograph, overlap amount, coordinates, Japanese headline, Cafe-page composition and travel-guide visual grammar.

## Cross-item applicability hypothesis

On another print artifact, if a large native ordinal already belongs partly to a legitimate photograph and begins colliding with adjacent copy, independently test whether moving the ordinal deeper onto the photograph can preserve a stronger copy column. Require actual-size contrast, collision, safe-area and semantic-photo checks before adoption.
