# Rurubu V6 EX — Cafe denser editorial field QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

ER Cafe/Table was structurally sound, but same-scale review showed the Cafe left page remaining noticeably quieter than the photo-led Table page. The dominant `01` and title sat mostly on the left while the right half of the composed travel texture carried little editorial information, so the middle field still read as underused template space.

## Bounded test

Created rollback-safe candidate EX from ER without changing photography, image hashes, right-page Table content, or replaceability.

Changes on Cafe left only:
- existing composed travel texture `691a6ceed471a5d8efa144052a10564eed177b4f` expanded from `720×430` to `793.7×448` and opacity `0.20 → 0.30`;
- native `01` strengthened from 92px to 104px and repositioned;
- existing native Cafe metadata redistributed into the right half as a two-line reader-facing block;
- existing title/body/photo/02 feature retained;
- no new card, photo, raster, image hash, generated asset, Drive save, or external binary placement.

The first metadata arrangement was rejected because it became production-note-like and later caused a real title/metadata collision. Metadata was returned to a readable two-line editorial block and moved below the title. Final structure collision count is 0.

## Evidence

- ER baseline: `1805:134` / Cafe `1805:135`.
- EX preferred: `1831:2` / Cafe `1831:3`.
- 1200px whole spread: PASS; EX is denser and more continuous than ER without adding photography.
- Cafe actual-size `794×1123`: PASS.
- native text remains editable.
- replaceable view photo remains `238×218`, source/hash unchanged.
- text collision: 0.
- 18px safe-area risk: 0.
- right Table page unchanged.

## State

`VERIFIED_LOCAL` and adopted as current V6 Cafe/Table preferred.

Generated: 0. Adopted generated: 0. New Drive save: 0. New external binary placement: 0. New image hash: 0.

## Regression risk

Increasing composed texture strength can turn into generic decoration if it competes with native type. Redistributing metadata can also become production-note-like if it is too small. Actual-size readability and screenshot comparison are therefore required.

## Rurubu-specific boundary

Do not transfer this exact travel texture, opacity, cyan/magenta/yellow palette, copy, coordinates, `01/02` treatment, or Cafe/Table composition to other Wedding items.
