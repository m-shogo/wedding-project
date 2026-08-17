# RSL-077 — Repeated sequences can gain editorial density by binding the title to the preceding content transition

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source scope/item: Rurubu WEDDING / V6 Outer AB

## Visible problem

A correct five-point back-cover chronology still read like isolated UI/data points in leftover cream space after a strong photo-led upper half.

## Root-cause hypothesis

The problem was not missing decoration. The section title sat too far below the photo transition and the repeated milestones lacked enough major/minor contrast to feel editorially authored.

## Bounded test

On rollback-safe Outer AB `1607:2`, move the native chronology title upward to the photo/cream transition, add one functional yellow title rule, strengthen 01/03/05, keep 02/04 smaller, and tighten the five beats without changing image hashes, facts, WEDDING terminal, or front cover.

## Expected improvement

Create a continuous `photo → chronology → terminal` reading path and reduce widget/list reading without adding cards or new imagery.

## Regression risk

Stronger numbers or transition overlap can create collisions, reduce safe-area reserve, or make the rule decorative noise rather than a binder.

## Three-scale evidence

- whole outer spread 1400×990: PASS and stronger than AA;
- back cover actual size 794×1123: PASS;
- post-promotion whole outer: PASS;
- text collisions: 0;
- 18px text safe-area risks: 0.

## Figma / Drive / GitHub evidence

- Figma AB: `1607:2`;
- back cover: `1607:3`;
- rollback AA: `1592:2` hidden;
- Drive V6 root remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` with no new writes;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AB-CX-CY-BACK-TIMELINE-EDITORIAL-DENSITY-QA-2026-08-17.md`.

## Adopted / rejected / blocked

`VERIFIED_LOCAL / ADOPTED` in Rurubu V6.

## What must remain Rurubu-specific

Exact yellow rule, milestone colors/sizes/positions, wedding dates, photography, copy, and Rurubu-like travel-magazine art direction.

## Cross-item applicability hypothesis

For another print artifact with a repeated sequence that looks detached from the content above it, independently test title-to-transition binding and major/minor typographic contrast before introducing cards, panels, icons, or additional imagery.

Do not transfer the literal layout or palette.
