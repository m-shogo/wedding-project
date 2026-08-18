# Rurubu WEDDING V6 EV — Outer text-only memory-route QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

Preferred ES `1815:2` was visually strong, but preferred-set image repetition remained high. The small back-cover Yokohama skyline postcard reused the same skyline source also used across Story, Memory Spots, Cafe and 1DAY Plan. On the Outer back it acted mainly as supporting editorial punctuation rather than necessary place evidence because the dominant flatlay already carried the page.

## Hypothesis

A repeated support photo can sometimes be removed without reducing magazine density if the dominant photo already contains a natural, high-contrast physical surface that can carry reader-facing native editorial metadata.

## Bounded experiment

Created rollback-safe EV `1821:2` from ES.

Changed only the back-cover support role:

- hid the small repeated skyline postcard;
- repurposed existing native metadata into `YOKOHAMA / MEMORY ROUTE / 6 SCENES`;
- placed that native copy over the maroon notebook surface already present inside the dominant flatlay photo;
- preserved dominant photo, chronology, front cover, masthead, all other photos, hashes and replaceable roles.

No new image, generated asset, Drive save, raster or binary placement was introduced.

## Three-scale / structure evidence

- whole spread 1000px: PASS; EV reads cleaner and more editorial than ES;
- back page actual-size `1821:3` at 794×1123: PASS;
- back visible native text: 24;
- back visible IMAGE roles: 1;
- front visible native text: 13;
- front visible IMAGE roles: 5;
- text collision: 0 on both pages;
- 18px safe-area risk: 0 on both pages.

The text aligns naturally with an existing notebook object in the flatlay, so it does not read as arbitrary floating metadata.

## Adoption

- EV `1821:2` → `PREFERRED / V6_OUTER_EV_BACK_TEXT_ONLY_MEMORY_ROUTE_2026_08_19`;
- ES `1815:2` → hidden rollback;
- Start Here `845:27` updated to `V6 EV + ET/EN + EM + ER + EU · V7 HOLD`.

Status: `VERIFIED_LOCAL`.

## Repetition effect

Preferred-wide pre-test audit showed the skyline hash at 5 visible roles. EV removes the Outer skyline support role, reducing that hash's preferred-set usage by one without substituting an unrelated or semantically false photograph.

## Asset lifecycle state

- generated: 0
- adopted generated: 0
- Drive writes: 0
- external binary placements: 0
- new image hashes: 0
- native text preserved: YES
- remaining photos replaceable: YES
- rollback preserved: YES
- V7 touched: NO

## Completion boundary

EV is a verified dummy-design study, not print-ready. Final legitimate photography/copy, imposition, printer template, bleed/trim/fold, PDF preflight and physical proof remain separate gates.
