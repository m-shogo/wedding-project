# RSL-172 — Existing dominant photography can replace a false masthead section

Source scope/item: Rurubu WEDDING / V6 outer cover
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred cover was technically sound but still read as three horizontal web-like bands: a cream masthead support region, a large photo region, and a cream lower feature region. The destination image was semantically correct yet visually contained instead of dominant.

## Evidence before change

- live preferred outer: ID `2051:2`;
- front Yokohama hero hash: `539c259be8036b481d06b4f76db9a39b407d90e8`;
- existing support photo hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- current masthead lockup hash: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`.

## Root-cause hypothesis

The visual defect was caused primarily by background segmentation and a nonessential masthead support field, not by missing or weak photography. When the dominant image is already semantically and technically suitable, expanding its editorial role may be stronger than generating another asset or adding decoration.

## Principle / capability tested

Before adding a new hero or decorative module to a print cover that reads as stacked sections, test whether an existing legitimate dominant image can become the continuous field behind native editable masthead/type while the lower information close becomes more compact.

## Exact bounded test

On rollback-safe IQ `2099:2`:

- preserved the entire back cover;
- extended the existing front hero from ~690px to 850px height;
- hid the cream masthead support field;
- kept native `横浜`, `ふたり旅。`, feature copy and micro coverline editable above the photograph;
- retained only the current masthead lockup and hid the redundant older raster;
- reduced the lower cream close to ~273px;
- resized/repositioned the existing dining support photo so it overlaps the hero-to-lower transition;
- moved feature 03 into the compact lower close;
- added no new card, shadow, gradient, raster, Drive upload or image hash;
- after structure QA found one text-box collision, tightened only the short issue-line box and reran QA.

## Expected improvement

A single photographic first read, stronger destination hierarchy, less web/dashboard segmentation, and more authentic print-editorial continuity without reducing editability.

## Regression risk

- headline contrast can fail over bright image regions;
- an enlarged raster can expose quality limits;
- overlap can create unsafe trim/fold pressure;
- removing a support field can weaken grouping if that field had a real binding function.

## Three-scale evidence

- whole-item / 500px: PASS; IQ stronger and more continuous than ID;
- reading / 1400px: PASS;
- actual-size / native 1587×1123 spread: PASS; front half effectively ~794×1123;
- effective visible native text: `35`;
- effective visible IMAGE fills: `4`;
- front text intersections: `0`;
- front 18px text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted IQ: `2099:2`;
- hidden rollback ID: `2051:2`;
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- no new asset transport or generation;
- detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IQ-OUTER-CONTINUOUS-PHOTO-COVER-QA-2026-08-21.md`.

## Adopted / rejected / blocked status

`IQ ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## What must remain Rurubu-specific

Do not transfer the exact Yokohama image, masthead/logo, colors, coverline scale, hero height, support-photo crop, overlap geometry, or travel-magazine visual grammar.

## Cross-item applicability hypothesis

On a materially different print item that has a semantically correct dominant image but a false header/body segmentation, independently compare a continuous image/texture field behind native editable type against the segmented version. Preserve any border/support field that proves a real binding, physical, scan, trim, or contrast function.

## Next receiving-item experiment

Test only the method—not the look—on a future print artifact where a header support box appears nonfunctional at thumbnail scale. Re-run contrast, long-copy/safe-area, and source-quality QA before adoption.
