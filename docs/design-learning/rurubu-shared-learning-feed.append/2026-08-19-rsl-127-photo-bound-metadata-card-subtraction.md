# RSL-127 — Photo-bound metadata can lose its card when the image proves the binding and contrast job

Source scope/item: Rurubu WEDDING / V6 Outer

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Outer FH used a white tilted `YOKOHAMA / ISSUE 2026` card over the front-cover hero. The metadata was useful, but the visible rectangle read as an inserted UI/postcard module and reduced the dominance of the travel photograph.

## Evidence before change

- live source: FH `1854:2`, front `1854:51`;
- whole-spread screenshot showed the panel as a separate white rectangle above the hero;
- issue title/meta were already native Figma text, so the card itself was not required for editability.

## Root-cause hypothesis

The real functions were (a) metadata-to-hero binding and (b) contrast. When a legitimate photo region can perform both functions, a separate visible container may be redundant.

## Principle / capability tested

Compare container retained vs. native text directly bound to the existing image field, without changing the image source, crop, headline, logo or surrounding composition.

## Exact bounded change

Rollback-safe FO `1891:18`:

- hid only the issue texture panel;
- retained issue title and metadata as native text;
- moved the native copy onto a verified dark portion of the hero;
- used subtle text shadow only for photo contrast;
- no new card, asset, raster, image hash, or generated decoration.

The first structure pass found a 2px title/meta overlap; metadata was moved and the test rerun before promotion.

## Expected improvement

More photo-led cover hierarchy, less UI/card reading, and preserved editable issue metadata.

## Regression risk

Direct-on-photo copy depends on the photo/crop. A replacement hero may destroy contrast, so actual-size contrast and collision QA must be rerun when the image changes.

## Three-scale evidence

- whole-item / ≈700px: PASS and stronger than source;
- reading / 1200px: PASS;
- actual-size / front `1891:68` 794×1123: PASS;
- visible front native text: 13;
- text collisions: 0;
- 18px safe-area risks: 0;
- page-level stray issue nodes: 0.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted FO: `1891:18`, front `1891:68`;
- hidden rollback FH: `1854:2`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FO-OUTER-ISSUE-PANEL-SUBTRACTION-QA-2026-08-19.md`;
- evidence commit: `9c97c9544c21830f1f7a45d2a35ddd6069a50e81`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL / ADOPTED`.

## What must remain Rurubu-specific

Do not transfer the Yokohama issue copy, logo, exact photo/crop, white text placement, cover geometry, colors, or travel-magazine composition.

## Cross-item applicability hypothesis

When another print artifact has a small visible card whose only jobs are contrast and attachment to an existing legitimate image, independently compare card retained vs. native copy directly on the image. Preserve the card whenever it still performs a real physical, semantic, scan, grouping, or contrast function.

## Next receiving-item experiment

On a materially different print artifact, test only a bounded metadata/caption role where the image offers a verified text-safe area. Review at whole-item, reading, and actual-size scales; reject direct placement if a plausible replacement image would make the text unsafe.