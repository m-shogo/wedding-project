# Rurubu V6 EN — Chronology Photo Staircase QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Source problem

Preferred EL chronology `1763:2` was structurally correct but its right page retained a large cream dead region around Event 01 while Event 03 / Event 05 photos sat too low. At whole-item scale the page partially returned to a timeline-template reading instead of a photo-led Japanese travel-magazine spread.

## Root-cause hypothesis

The problem was not missing assets. Existing legitimate Event 03 and Event 05 photography had enough source resolution but too little editorial responsibility. Rebalancing the same native milestones and replaceable photos into an asymmetric photo staircase could improve density and travel-magazine rhythm without adding cards, new generated decoration or new images.

## Bounded rollback-safe test

- source preferred: EL `1763:2` / chronology page `1763:28`;
- test candidate: EN `1773:2` / chronology page `1773:28`;
- hero/title area preserved;
- Event 01 promoted to a strong left-side native milestone below the hero;
- Event 03 photo kept at source-safe `350×260` and moved to the center/right as the first major photo beat;
- Event 05 dining photo kept source-safe at `402×254` and overlapped below Event 03;
- Event 02 / 04 retained as quiet native side-trip notes;
- WEDDING terminal retained as the bottom destination;
- existing composed route texture was reduced to a bounded `220×292` support role behind the quiet note rail;
- no new raster, image hash, Drive asset, card, shadow system or generated section decoration was introduced.

## Pre-adoption failure / correction

Initial EN looked stronger visually but structural AABB QA detected five text contacts:

- Event 01 date vs Event 01 number;
- Event 01 number vs Event 01 title;
- Event 03 date/number/title region vs Event 01 title/copy.

The candidate was not promoted in that state. Event 01 date/title and Event 03 photo/text positions were adjusted; fresh QA then returned text collisions `0`.

A read-only QA script itself initially failed because a generic bounding helper attempted to read `.characters` from a FRAME. This was an inspection-code error only; the call was atomic/read-only and mutated nothing. The helper was corrected before QA continued.

## Three-scale evidence

- whole spread, 1200px render: PASS; EN reads more continuously than EL and the center/right no longer has a dead cream gap;
- reading scale: PASS;
- chronology page actual `794×1123`: PASS;
- native visible text: `31`;
- absolute text collisions after correction: `0`;
- 18px text safe-area risks: `0`.

## Asset / structure evidence

Visible image roles on EN chronology page:

- composed travel texture `1773:29` hash `691a6ceed471a5d8efa144052a10564eed177b4f`, `220×292`;
- timeline hero `1773:30` hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, `801×430`;
- Event 03 `1773:32` hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, `350×260` against known source `352×368`;
- Event 05 `1773:47` hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, `402×254` against known source `732×498`.

All final copy remains native/editable. Event photography remains replaceable.

## Adoption

- EN `1773:2` renamed `PREFERRED / V6_INSIDE_EN_CHRONOLOGY_PHOTO_STAIRCASE_2026_08_19`;
- EL `1763:2` renamed rollback and hidden;
- Start Here `845:27` updated to `V5 FU/FX · V6 EE + EK/EN + EM MEMORY SPOTS + EF CAFE & TABLE + EI 1DAY PLAN · V7 HOLD`.

Status: `VERIFIED_LOCAL` and adopted in V6 preferred dummy-design studies.

## Regression risks / boundaries

- do not generalize the exact photo coordinates, sizes, palette, event hierarchy or chronology wording;
- the method only transfers as a hypothesis: when a chronology is semantically correct but visually template-like, test whether existing legitimate photos can carry more editorial responsibility before adding assets;
- print-ready remains blocked on final photography/copy, page count/imposition, printer template, bleed/trim/fold, PDF preflight and physical proof.
