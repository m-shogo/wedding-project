# RSL-069 — A single bounded composed texture can bind a photo cluster without adding cards

Date: 2026-08-17
Source scope/item: Rurubu WEDDING / V6 Profile
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The Profile lower three-photo cluster had good image hierarchy and native captions, but still floated on a large cream field and read partly as separate placed-photo objects.

## Root-cause hypothesis

When several replaceable photos already form the right composition, one low-opacity composed background can create editorial continuity without wrapping each photo in another card or flattening the photos and captions together.

## Bounded test

On rollback-safe CP `1567:18`, one already-verified Rurubu travel texture was placed behind only the lower photo cluster:

- role: `DECOR / PROFILE_ROUTE_TEXTURE_COMPOSED_RASTER`;
- node `1567:95`;
- image hash `691a6ceed471a5d8efa144052a10564eed177b4f`;
- opacity `0.16`;
- final size `720×430`;
- all existing native text, captions, borders and replaceable photo roles remained independent.

Initial width `770` exceeded source intrinsic width `720`; that state was rejected and corrected to `720` before promotion.

## Expected improvement

Make the three snapshots read as one magazine scene while preserving easy image replacement and native copy editing.

## Regression risk

A texture can become decorative noise, reduce caption contrast, or function as a fake card if too opaque or too large. It also requires its own intrinsic-resolution gate even when used softly.

## Three-scale evidence

- whole Profile/Q&A 500px thumbnail: PASS;
- Profile actual-size `1567:19` = `794×1123`: PASS;
- Profile native text `22`;
- text collisions `0`;
- 18px safe-area risks `0`;
- all four replaceable Profile photos intrinsic-safe;
- texture final `720×430` ≤ source `720×860`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted root: CP `1567:18`;
- Profile page: `1567:19`;
- rollback: CN `1562:2` hidden;
- Drive V6 authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CP-CO-EDITORIAL-FLOW-QA-2026-08-17.md`;
- evidence commit: `61b5e79cd4c249fdebf4efc7b9d9aab89cdb5281`.

## Adopted / rejected / blocked status

`ADOPTED / VERIFIED_LOCAL` after the intrinsic-width correction.

## What must remain Rurubu-specific

Do not transfer the exact texture, opacity, photo angles, captions, colors, composition, or travel-magazine art direction.

## Cross-item applicability hypothesis

If another print artifact has a legitimate multi-image cluster that feels visually unbound, independently test a single bounded, low-opacity composed support before adding multiple visible containers. Preserve semantic text and replaceable images as separate roles and run intrinsic/actual-size QA on the support asset itself.
