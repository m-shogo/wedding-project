# RSL-132 — Composed raster marks are invisible to text collision QA

Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source scope: Rurubu WEDDING only

## Source problem

In V6 Profile GA, widening a valid native closing-copy role improved readability, but the first reflow moved `次の旅へ。` through a yellow rule already baked inside an existing composed travel-texture raster.

## Root-cause hypothesis

Text/text and safe-area structure QA only understands node bounds. It cannot detect visual lines, labels, paint, tape, shadows or other marks that are baked inside a raster IMAGE fill. Reflowing native copy over a composed raster can therefore pass structural collision checks while visibly failing.

## Bounded test

- preserve the same composed raster;
- preserve the same native copy role;
- move the native meta/title/body below the baked rule rather than regenerating decoration;
- review at thumbnail, reading and actual-size scales;
- rerun text/text and safe-area structure QA after the visual fix.

## Expected improvement

Keep hybrid authoring benefits — one composed decoration + editable native text — without allowing invisible raster marks to cross live copy.

## Regression risk

A purely structural automated checker may report PASS while the page is visibly wrong. Conversely, treating every raster as forbidden would discard a useful hybrid-authoring capability.

## Evidence

Figma:
- adopted GA spread `1922:2`;
- Profile page `1922:3`;
- rollback FP `1895:18` hidden;
- first GA visual state rejected because the baked yellow rule crossed the native title;
- final actual-size `794×1123`: PASS;
- final target text contacts: `0`;
- final 18px safe-area risks: `0`.

Drive:
- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified;
- no new master or derivative created.

GitHub evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GA-PROFILE-03-READABLE-CLOSING-COLUMN-QA-2026-08-20.md`.

## What must remain Rurubu-specific

Do not transfer the yellow rule, travel texture, Profile composition, photo overlap, typography sizes, colors, Japanese copy or coordinates.

## Cross-item applicability

Candidate principle only:

> When native editable copy is placed or reflowed over a composed raster, structural collision checks are insufficient. Inspect the actual rendered result at actual size for crossings with marks baked inside the raster before adoption.

This does not authorize inspection or editing of non-Rurubu item-specific Figma/Drive/assets. Cross-item verification must occur independently in another authorized item before any project-rule promotion.
