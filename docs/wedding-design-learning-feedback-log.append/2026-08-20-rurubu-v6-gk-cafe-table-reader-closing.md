# Rurubu V6 — GK Cafe/Table reader-facing closing

Date: 2026-08-20
Item: Rurubu WEDDING
Scope: Cafe/Table only

## Visible problem

The Table page was visually strong but ended with a small generic `3 WAYS / ENJOY` component and bilingual micro-labels. At actual size this preserved a design-template / internal-component feeling even though the rest of the spread already read as a finished Japanese travel-magazine page.

## Experiment

Duplicate GJ `1954:2` → GK `1991:2` and modify only existing native closing text:

- `3 WAYS / ENJOY` → `ふたりの、3つの楽しみ。`;
- `SWEETS / 甘いもの` → `甘いもの`;
- `VIEW / 景色` → `景色`;
- `TALK / 会話` → `会話`.

First pass was readable but still too small/cyan, so only the closing headline hierarchy was refined to 23 px navy. No image, crop, geometry, card, raster, shadow or gradient changed.

## Expected improvement

Make the final physical-page beat reader-facing and intentional rather than a generic reusable template module.

## Regression risk

Closing headline may crowd the numbered columns or safe-area/folio; Japanese-only labels may become too weak if not large enough.

## Evidence

- whole spread ~1100 px: PASS;
- actual-size Table page `1991:33 / 794×1123`: PASS;
- visible text collision: 0;
- 18 px safe-area risk: 0;
- source/candidate image roles, geometry and hashes identical;
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

GJ remains hidden rollback. GK is the live preferred Cafe/Table spread.

## Next application

Continue V6 only. In another mature page, if the visual composition is already sound but a small helper/closing label still reads as internal/template language, test native reader-facing copy first. Do not automatically remove intentional category/masthead English or labels with real navigation/brand function.
