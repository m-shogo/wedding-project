# Rurubu WEDDING V6 — AB + CX/CY back-timeline editorial-density QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Source problem

Outer AA was visually strong in photography, but the back-cover `ふたりの旅年表` still read like five isolated data points placed in leftover cream space. At actual size, the timeline felt more like a small UI/info module than part of the travel-magazine page.

## Root-cause hypothesis

The defect was not missing content or imagery. The title sat below the photo transition and the five milestones had insufficient major/minor scale contrast and binding. A denser editorial transition could connect `みんなとの思い出 → ふたりの旅年表 → WEDDING` without cards, shadows, new photography, or generated decoration.

## Bounded test

Created rollback-safe Outer AB `1607:2` from Outer AA `1592:2`.

Changed only the back-cover timeline region:

- moved `ふたりの旅年表` upward to the photo/cream transition;
- increased title size to 28px;
- added one 230×6 yellow editorial rule under the title;
- strengthened 01 / 03 / 05 as major beats;
- kept 02 / 04 smaller as bridges;
- tightened milestone positions vertically and horizontally;
- preserved all native dates/labels and the existing WEDDING terminal;
- preserved all image hashes and photo geometry;
- front cover unchanged.

No new card, shadow, gradient, generated asset, Drive save, binary upload, or raster byte was introduced.

## Expected improvement

- reduce the impression of a detached timeline widget;
- increase magazine-like visual rhythm at thumbnail and actual size;
- connect the photo-led upper back cover to the WEDDING terminal with native typography rather than additional containers.

## Regression risk

- title/photo overlap could become unreadable;
- stronger numerals could collide with year/title copy;
- denser placement could consume trim/safe-area reserve;
- extra rule could become decorative noise if it did not bind the timeline title to its content.

## Three-scale evidence

- whole outer spread 1400×990: PASS; AB reads more coherently than AA;
- back-cover actual size 794×1123: PASS;
- live post-promotion outer spread 1400×990: PASS.

Structural audit on AB back `1607:3`:

- visible native text: 23;
- same-page absolute text collisions: 0;
- 18px text safe-area risks: 0;
- visible IMAGE roles: 3;
- image hashes unchanged from AA.

Visible image roles:

- travel flatlay `1607:4`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- cafe `1607:10`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- skyline support `1607:11`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

## Adoption

`VERIFIED_LOCAL / ADOPTED`

- Outer AB `1607:2` renamed `PREFERRED / V6_OUTER_AB_BACK_TIMELINE_EDITORIAL_DENSITY_2026_08_17`;
- Outer AA `1592:2` preserved hidden as rollback;
- Start Here updated to `V5 FU/FX · V6 AB + CX/CY INSIDE STUDIES · V7 HOLD`;
- CX `1601:2` and CY `1601:81` were not edited.

## Asset lifecycle truth

- generated: 0;
- Drive saves: 0;
- binary placements: 0;
- new raster bytes: 0;
- image hashes changed: 0;
- native text preserved: YES;
- replaceable image roles preserved: YES;
- visually verified: YES.

## What remains Rurubu-specific

Exact milestone positions, numeric scale, yellow rule, palette, copy, photography, cover composition and travel-magazine grammar must not transfer as a literal design.

## Cross-item applicability hypothesis

When a repeated fact sequence is semantically correct but reads like isolated UI points, another print artifact may independently test whether moving its native section title into the preceding content transition and increasing major/minor typographic contrast can bind the sequence without adding cards or new imagery.
