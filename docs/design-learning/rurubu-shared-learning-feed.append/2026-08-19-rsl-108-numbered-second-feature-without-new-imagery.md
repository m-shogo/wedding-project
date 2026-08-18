# RSL-108 — Numbered second-feature hierarchy can strengthen a quiet page without new imagery

Source scope/item: Rurubu WEDDING / V6 Cafe & Table
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A print page can be structurally correct yet still feel under-edited when its secondary photograph and nearby copy read as separate small modules. In Cafe/Table EF, the lower view photo was legitimate and source-safe, but the page lacked a clear second visual beat.

## Root-cause hypothesis

The defect was not missing imagery. It was insufficient hierarchy and weak binding between an existing support photo and native copy.

## Bounded test

- rejected comparison `1788:2`: move the support photo right and float copy below the texture field; this increased dead paper and weakened binding;
- adopted comparison `1789:2`: retain the support photo at source-safe size, add one large native ordinal (`02`), and regroup existing native title/copy/check information as a single second editorial beat;
- first structure audit found an 18px ordinal/title overlap, corrected before promotion.

## Expected improvement

Increase print-editorial rhythm and scale contrast without adding a new photograph, card, raster decoration, or binary asset.

## Regression risk

A large ordinal can become decoration-only noise or collide with variable copy. The photo may still be too small to carry a second-feature role in another artifact. Actual-size and text-collision QA remain mandatory.

## Evidence

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Adopted: `1789:2 / PREFERRED / V6_INSIDE_EL_CAFE_NUMBERED_SECOND_FEATURE_2026_08_19`
Actual-size Cafe page: `1789:3`, 794×1123.
Rollback: EF `1734:2` hidden.
Rejected: `1788:2` hidden.
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EL-CAFE-NUMBERED-SECOND-FEATURE-QA-2026-08-19.md`.

Three-scale result: 500px whole PASS; 1200px reading PASS; actual-size 794×1123 PASS. Final Cafe page: 17 visible native text nodes, collision 0, 18px safe-area risk 0. Image source/hash changes 0.

## What must remain Rurubu-specific

Exact ordinal colors, sizes, Japanese copy, Cafe/Table composition, photo choice, palette, texture, and travel-magazine visual grammar.

## Cross-item applicability hypothesis

When another print artifact has a legitimate source-safe support image but the page still feels like loosely placed modules, independently test whether native numbering/typographic hierarchy can bind that image into a stronger second editorial beat before adding another image or container.
