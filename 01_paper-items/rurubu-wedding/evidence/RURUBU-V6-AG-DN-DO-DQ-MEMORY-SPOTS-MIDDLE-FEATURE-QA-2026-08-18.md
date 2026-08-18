# Rurubu WEDDING V6 — DQ Memory Spots Middle Feature QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL / PREFERRED_MIDDLE_FEATURE_STUDY / V7_HOLD / NOT_PRINT_READY`

## Problem

V6 had a strong outer spread, Profile/Q&A, and Story/chronology, but still lacked the destination-information middle spread that makes a Japanese travel guide feel like an actual travel publication rather than only a wedding profile/history booklet.

The existing V6 Hawaii reference authority already specifies a Memory Spots direction: one lead destination, supporting stops with unequal image scale, direct native captions/markers, and no dashboard grid.

## Clean-room test

Created DP `1685:2` from scratch without modifying AG `1676:2`, DN `1675:2`, DO `1679:2`, or V7.

Refined it into DQ `1686:2`:

- left page: one dominant waterfront lead image + SPOT 01/02 editorial beats;
- right page: unequal SPOT 03/04 modules + reader-facing travel-note closing block;
- all meaningful copy remains native Figma text;
- all four photos are independent replaceable IMAGE-fill roles copied from already verified Rurubu sources;
- no new generated asset, Drive save, external binary upload, shadow/card grid, or new raster hash;
- removed production-facing copy (`写真はあとから差し替えOK。`) from the visible page and replaced it with reader-facing editorial copy;
- strengthened SPOT 02 with a large native ordinal and pull quote rather than another card;
- DP is preserved hidden as rollback.

DQ Figma:

- spread: `1686:2` — `PREFERRED / V6_INSIDE_DQ_MEMORY_SPOTS_MIDDLE_FEATURE_2026_08_18`;
- left page: `1686:3`;
- right page: `1686:21`.

## Image roles / hashes

- `PHOTO / MEMORY_SPOT_LEAD_REPLACEABLE` — `840×610` — hash `539c259be8036b481d06b4f76db9a39b407d90e8`;
- `PHOTO / MEMORY_SPOT_02_REPLACEABLE` — `405×335` — hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- `PHOTO / MEMORY_SPOT_03_REPLACEABLE` — `315×465` — hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- `PHOTO / MEMORY_SPOT_04_REPLACEABLE` — `455×318` — hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

The lead intentionally bleeds beyond the left page frame; the other roles remain bounded. Existing image fills/hashes are reused rather than creating new assets.

## Three-scale visual QA

- whole spread / 1200px: PASS;
- left actual-size `794×1123`: PASS;
- right actual-size `794×1123`: PASS;
- left native text count: `13`;
- right native text count: `14`;
- absolute text collisions: `0 / 0`;
- 18px text safe-area risks: `0 / 0`.

An initial SPOT 03 ordinal/title collision was detected by structural QA, corrected by moving the title/copy/meta column, and re-tested to zero collisions before promotion.

## Visual result

DQ adds the missing travel-information behavior: destination first, unequal spot hierarchy, compact captions/metadata, direct photo-led reading, and a reader-facing closing note. It is materially different from the Profile/Q&A and chronology spreads and does not make them visually identical.

## Asset lifecycle truth

`existing verified Rurubu photo fills → clean-room composition → screenshot QA → structural QA → preferred study`

- new ImageGen: `0`;
- new Drive save: `0`;
- new external binary placement: `0`;
- new image hash: `0`;
- generated section master adopted: `NO`;
- native text preserved: `YES`;
- replaceable photos preserved: `YES`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Remaining gate

DQ is a verified dummy-design middle-feature study, not print-ready. Final legitimate location photography/copy, exact print template, bleed/trim/page-order verification, PDF preflight, and physical proof remain required.