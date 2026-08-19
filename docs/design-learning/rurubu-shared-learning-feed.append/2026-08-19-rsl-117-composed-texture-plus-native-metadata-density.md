# RSL-117 — Composed texture only helps density when native information uses the field

Source scope/item: Rurubu WEDDING / V6 Cafe & Table
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The Cafe page had a legitimate composed travel texture and strong native headline, but same-scale review still showed the middle field as underused. The texture was too faint and the reader-facing metadata remained concentrated on the left, so the right half read like unused template space.

## Root-cause hypothesis

A background texture does not create editorial density by itself. It becomes useful when hierarchy and reader-facing native information actually occupy and explain the field. Conversely, simply making a texture stronger can become generic decoration if the information remains disconnected or too small.

## Bounded test

Rollback-safe Cafe candidate EX changed only the existing composed texture and native type distribution:

- expanded the existing composed texture to the full Cafe page width and increased opacity moderately;
- strengthened the existing native `01`;
- redistributed existing native Cafe metadata into the right half;
- preserved both existing photo roles, source hashes, right Table page, native variable text, and replaceability.

The first metadata variant was rejected because it was too small and production-note-like. A second arrangement produced a real title/metadata collision. The final two-line metadata block was moved below the title and verified at actual size.

## Expected improvement

Create denser travel-note rhythm without adding a card, another photo, another raster, or fake decorative complexity.

## Regression risk

- stronger texture can compete with type;
- tiny metadata can look like production annotations instead of reader-facing editorial information;
- redistributed information can collide with large Japanese display type.

## Three-scale evidence

- ER baseline: `1805:134`.
- EX preferred: `1831:2`; Cafe page `1831:3`.
- 1200px whole spread: PASS and visually denser than ER.
- 794×1123 Cafe actual-size: PASS.
- final text collision: 0.
- final 18px safe-area risk: 0.
- generated assets: 0; new Drive saves: 0; new image hashes: 0.

GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EX-CAFE-DENSER-EDITORIAL-FIELD-QA-2026-08-19.md`.

## What must remain Rurubu-specific

Do not transfer the travel-route texture, opacity, Cafe copy, 01/02 composition, palette, coordinates, or Japanese travel-magazine styling.

## Cross-item applicability hypothesis

When another print artifact has a legitimate fixed composed background but still looks empty, independently test whether the missing ingredient is reader-facing native hierarchy/information using that field before adding another container, asset, or photograph. Actual-size review must reject microtext that reads like production annotation.
