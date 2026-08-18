# 2026-08-18 — Rurubu V6 EC 1DAY Plan practical metadata

Scope: Rurubu WEDDING only
Status: `VERIFIED_LOCAL / ADOPTED`

## Visible problem

DX 1DAY Plan was visually strong but still slightly too sparse on the route page for a Japanese travel-information magazine. STOP 01–04 had times, titles and short copy, but little second-level practical scan information.

## Experiment

Created rollback-safe EC from DX and added only four compact native metadata lines tied to the existing STOP beats. No cards, new photos, generated decoration, crop changes or image-hash changes were introduced.

Expected improvement: stronger travel-guide usefulness and density without reverting to dashboard/card UI.

Regression risk: microcopy could become unreadable or turn into production-note filler; final factual claims must be verified when real itinerary content replaces dummy copy.

## Evidence

- Figma EC `1723:63`, right page `1723:90`;
- whole 1200px PASS;
- right actual `794×1123` PASS;
- right native text `25`;
- text collisions `0`;
- 18px safe risks `0`;
- visible IMAGE roles unchanged at `5`;
- Drive root re-read `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- new image generation / Drive save / upload / hash: `0 / 0 / 0 / 0`.

## Decision

EC adopted; DX hidden rollback. The improvement came from reader-facing native information density, not extra decorative containment.

Next application: continue V6 photo-repetition and page-role review. Keep practical metadata small and semantic; do not make every page use the same label grammar.
