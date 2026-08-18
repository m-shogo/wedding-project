# 2026-08-19 — Rurubu V6 EN chronology photo-staircase

Scope: Rurubu WEDDING only

## Observed problem

EL chronology was safe and editable but still showed a large central cream region around Event 01 while the main supporting photos were compressed low on the page. The spread therefore retained some timeline-template / assembled-Figma feeling.

## Root-cause hypothesis

The page did not need more decoration or another photo. Existing Event 03 and Event 05 photos had enough source-safe scale but insufficient editorial responsibility.

## Bounded experiment

Created EN `1773:2` from EL as rollback-safe duplicate. Kept hero/title, facts, native text and image hashes. Reorganized the lower chronology into:

- Event 01 strong native opening beat on the left;
- Event 03 source-safe photo beat in center/right;
- Event 05 larger overlapping dining beat below;
- Event 02 / 04 quiet side-trip notes;
- WEDDING terminal preserved at the bottom.

No new image, generated decoration, Drive asset or raster hash was added.

## Expected improvement

Reduce dead paper, break timeline-UI reading and create a photo-led staircase that reads more like a Japanese travel-magazine story.

## Regression risk

Overlapping photo/text beats can collide with native copy or exceed source dimensions.

## Evidence / result

Initial EN visual comparison was stronger, but structural QA found five text contacts. Those were corrected before adoption. Final evidence:

- whole spread 1200px: PASS;
- reading scale: PASS;
- actual chronology page 794×1123: PASS;
- native visible text 31;
- text collision 0;
- 18px safe-area risk 0;
- Event 03 350×260 within 352×368 source;
- Event 05 402×254 within 732×498 source.

## Decision

ADOPTED: EN `1773:2` promoted to preferred. EL `1763:2` retained hidden as rollback. Start Here updated to `EE + EK/EN + EM + EF + EI`, V7 HOLD.

## What remains Rurubu-specific

Exact event hierarchy, coordinates, photo selection, Yokohama travel imagery, palette, Japanese headline treatment and WEDDING terminal.

## Next application

Continue reviewing V6 preferred spreads for screenshot-visible dead paper and weak photo hierarchy. Before adding assets, first test whether an existing legitimate source-safe photo can carry more editorial responsibility.
