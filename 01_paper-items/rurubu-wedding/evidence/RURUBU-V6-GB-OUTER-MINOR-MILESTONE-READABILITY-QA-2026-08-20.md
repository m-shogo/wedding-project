# Rurubu WEDDING V6 — GB Outer minor-milestone readability QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Source problem

Preferred Outer FO `1891:18` had a strong photo-led cover and a useful back-cover chronology, but minor milestones `02 / お出かけ` and `04 / 同棲` were only 14px numerals with 9.5–13px supporting copy. At actual size they read less as intentional secondary beats and more as near-microtext between the dominant `01 / 03 / 05 / 06` milestones.

## Root-cause hypothesis

A major/minor hierarchy is useful, but minor information must remain legible enough to participate in the editorial rhythm. If the subordinate beats fall below a practical actual-size reading threshold, hierarchy collapses into omission rather than controlled contrast.

## Bounded test

Rollback-safe duplicate `1929:2` was created from FO and only the two minor back-cover milestones were changed:

- `02` and `04`: `14px → 20px` native numerals;
- minor year labels: `9.5px → 10.5px`;
- minor event titles: `13px → 15px`;
- local x/y positions adjusted to preserve breathing room and keep them subordinate to `01 / 03 / 05 / 06`;
- all photography, masthead, image hashes, front cover, dominant milestones and factual/native text roles otherwise unchanged.

Initial structure QA detected one `02` contact against the `01` title. The candidate was not promoted in that state. `02` and its local year/title were moved down by 6px and QA was repeated.

## Evidence

- 1200px whole spread screenshot: PASS; minor milestones are more readable without becoming equal to major beats.
- back cover actual-size `1929:3` = `794×1123`: PASS.
- visible back-cover native text: `25`.
- absolute text collisions after correction: `0`.
- 18px text safe-area risks: `0`.
- new image hashes: `0`.
- generated assets: `0`.
- Drive writes: `0`.
- photo geometry / crop changes: `0`.

## Adoption

- promoted: `1929:2 / PREFERRED / V6_OUTER_GB_MINOR_MILESTONE_READABILITY_2026_08_20` at review-board position x `272000`, y `0`;
- rollback: FO `1891:18` renamed `ROLLBACK / ...` and hidden;
- Start Here `845:27` synchronized to `V6 GB + GA/FR + FT + FN + FM · V7 HOLD`.

## Regression risk

If secondary milestones are enlarged too far they will compete with the major photo-led milestones and recreate a uniform timeline UI. The transferable lesson is therefore not a specific point size; it is to verify subordinate beats at actual size and keep a visible but unequal hierarchy.

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Rurubu-specific and non-transferable: exact colors, chronology geometry, dates/copy, cover photography, masthead, and Japanese travel-magazine art direction.
