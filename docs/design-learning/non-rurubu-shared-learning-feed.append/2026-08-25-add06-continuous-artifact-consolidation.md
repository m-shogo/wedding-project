# NRSL append — ADD-06 continuous artifact consolidation

Source scope/item: non-Rurubu / ADD-06 フォトブースサイン
Date: 2026-08-25
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A structurally strong photo-booth sign used three separate small developed-print scenes. At whole-item scale they still read partly as independent colorful cards/icons rather than one physical photo-booth artifact.

## Root-cause hypothesis

When an item's identity is a single physical object, splitting its fixed art into repeated mini-scenes can create card/module semantics even if each scene is individually attractive. Consolidating those scenes into one artifact-specific physical object may improve whole-item reading without adding more decoration.

## Bounded experiment

A clean-room V3 was authored from a blank `990×1400` frame using only verified size and semantic roles. The retained production layout and fixed geometry were not duplicated.

Two materially different directions were tested:

- `STRIP IN THE LIGHT`: one continuous cream photo strip with four successive abstract exposures plus open native Japanese typography;
- `AFTERGLOW CONTACT SHEET`: dark outer field + inset cream sheet + continuous strip.

The second direction was rejected because it read more like a mounted poster. The first direction was matured through 500px, 1000px, actual-size and realistic long-copy QA, then compared with the retained Current.

## Expected improvement

Make the photo-booth function and physical artifact legible immediately while reducing the impression of separate UI/card modules.

## Regression risk

A continuous strip can become filmstrip/gallery UI, dominate the native Japanese headline, or become a generic retro-camera motif. The treatment is valid only when the artifact reading remains physical, warm and item-specific.

## Three-scale evidence

- whole-item ≈500px: PASS; one photo-booth strip reads immediately;
- reading ≈1000px: PASS; four exposures remain distinct and the flash frame does not read as a logo;
- actual `990×1400`: PASS; grain/paper edges remain credible;
- long-copy: PASS with long guide, long location placeholder and long closing copy.

## Structure / authoring evidence

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- retained old Current: `45:2`
- clean-room study: `55:2`
- winning study: `55:3`
- rejected study: `55:54`
- stress: `55:107`
- promoted Current: `56:106`
- hidden promoted stress: `56:157`
- native text: `7`, auto-height `7/7`
- adopted SVG root: `56:108`, editable vector tree (`40` descendants, `28` vector-like nodes)
- IMAGE fills: `0`
- generated raster: `0`

Drive master:

- folder: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`
- SVG ID: `1FYhUCWx5yLIY5mo2DXm-aZaVh7Dpidr1`
- MIME: `image/svg+xml`
- size: `3124 bytes`

GitHub evidence:

- `01_paper-items/additional-wedding-items/ADD-06-photo-booth-sign/CLEANROOM-V3-STRIP-IN-THE-LIGHT-PROMOTION-QA-2026-08-25.md`
- promotion commit: `fb4e576b98693b78451e934d16bffe67de76a3a7`
- canonical QA sync: `7896f208791b8ecc594d007bc59ec11a44582d99`

## Item-specific details that must NOT transfer

Do not copy ADD-06's coral top crop, continuous four-exposure strip, exact exposure art, dark lower field, rotation, palette, text scale or photo-booth vocabulary into other items.

## Cross-item applicability hypothesis

On a materially different artifact that currently uses several repeated mini-cards/icons to represent one physical object or one user action, independently test whether one consolidated artifact-specific object improves whole-item reading. Reject the hypothesis if consolidation harms hierarchy, editability or functional clarity.

## Next receiving-item experiment

Only test this when another non-Rurubu item has a screenshot-supported repeated-mini-module defect. Do not force it onto HANGING CARD RACK or other items whose multiple physical objects are semantically real and necessary.
