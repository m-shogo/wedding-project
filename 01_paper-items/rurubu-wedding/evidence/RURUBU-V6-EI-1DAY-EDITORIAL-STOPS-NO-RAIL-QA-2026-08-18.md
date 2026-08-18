# Rurubu WEDDING V6 EI — 1DAY editorial stops / no rail QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

Live Figma had EH `1744:2` preserved only as a hidden rollback. `INDEX_STATUS` already referenced EI, but no EI production node existed. EH itself was visually stronger than EG, yet its right page still used a long vertical route rail plus four circular markers; with time, native ordinal, copy and asymmetric photos already present, those marks made the page read more like a process/timeline UI than a Japanese travel-guide feature.

## Bounded test

Created rollback-safe EI `1752:2` from EH without changing facts, photo sources/hashes, route copy, practical metadata, left-page design, or replaceable-photo semantics.

Right-page changes only:

- hid `FUNCTION / ROUTE_RAIL` `1752:35`;
- hid STOP marker ellipses `1752:36 / 42 / 48 / 54`;
- retained native `01–04`, times, headings, body copy and practical metadata;
- slightly staggered ordinal x-positions to preserve intentional rhythm after rail removal;
- kept all four replaceable photos and existing subtle rotations.

First structural QA found small unintended contact between the rotated STOP02/STOP04 photos and their metadata lines. The candidate was not promoted in that state. Metadata widths were reduced while preserving the same native strings; re-read then showed zero unintended text/photo contact.

## Evidence

- EI spread: `1752:2`
- EI right page: `1752:29`
- previous EH rollback: `1744:2`
- Start Here index: `845:27`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

### Whole / reading

EI whole-spread screenshot rendered at `1400×991`: PASS. Compared with EH grammar, the right page keeps the photo cascade and practical information while losing the explicit timeline-diagram reading.

### Actual size

Right page rendered at native `794×1123`: PASS. The page reads as `01–04 + time + photo + useful metadata`, with hierarchy carried by native type and photography rather than a route diagram.

### Structure

Final right page:

- native visible text: `25`;
- visible replaceable photos: `4`;
- text/text collisions: `0`;
- unintended text/photo collisions: `0` (`END / TABLE & TALK` intentionally remains photo-bound and is excluded from accidental-contact count);
- 18px text safe-area risks: `0`;
- route rail hidden: YES;
- four stop-marker ellipses hidden: YES;
- image source/hash changes: `0`.

## Adoption

`VERIFIED_LOCAL` and promoted in live Figma:

- `1752:2` → `PREFERRED / V6_INSIDE_EI_1DAY_EDITORIAL_STOPS_NO_RAIL_2026_08_18`;
- EH `1744:2` → hidden rollback.

V7 was not edited.

## Asset lifecycle truth

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photography preserved: YES;
- rollback preserved: YES.

## Remaining gate

EI is a verified dummy-design study, not print-ready. Final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe area, exported PDF preflight and physical proof remain separate gates.
