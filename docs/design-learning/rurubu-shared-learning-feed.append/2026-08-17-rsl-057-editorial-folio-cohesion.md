# RSL-057 — Editorial folios can create book-level cohesion without adding container geometry

Source scope/item: Rurubu WEDDING V6 interior
Date: 2026-08-17
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The four preferred interior pages were individually readable but still behaved like separate feature layouts. At whole-item scale there was little recurring evidence that they belonged to one printed magazine system.

## Evidence before change

- live preferred Profile/Q&A: CB `1527:2`;
- live preferred Story/chronology: CA `1517:2`;
- both already passed image/crop/text/safe-area checks;
- no new imagery or card geometry was missing.

## Root-cause hypothesis

Publication continuity can be strengthened by a small recurring native folio/page slug rather than by adding another card, badge, colored field or raster decoration. The folio should remain subordinate to the dominant photography and section headline.

## Bounded test

Rollback-safe duplicates CD `1535:2` and CE `1535:78` added only native page folios:

- `02 PROFILE / FAVORITES`;
- `03 Q&A / MEMORIES`;
- `04 OUR STORY / JOURNEY`;
- `05 TRAVEL TIMELINE`.

No photo, crop, image hash, composed decoration, section layout, fold guide or factual content changed.

A prior test CC added small captions directly to the profile snapshots; it was rejected because the improvement was too small and looked applied after the fact.

## Expected improvement

- stronger book-level continuity;
- more authentic editorial/page reading;
- no increase in card/UI geometry;
- all added information remains native and editable.

## Regression risk

A folio can disappear or become noisy when it ignores local background contrast. Page 05 initially used navy text on the dark WEDDING ending band and failed visual QA. The folio was corrected to light cream before promotion.

Therefore the transferable method is not one fixed folio color. Preserve the recurring semantic role while adapting polarity/contrast to the page field.

## Three-scale evidence

- CD whole spread / 1000px: PASS;
- CE whole spread / 1000px: PASS;
- Profile actual size `1535:3` 794×1123: PASS;
- Timeline actual size `1535:102` 794×1123: PASS after polarity correction;
- all four candidate pages: text collision 0, 18px text safe-area risk 0.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted CD: `1535:2`;
- adopted CE: `1535:78`;
- rollback CB: `1527:2`;
- rollback CA: `1517:2`;
- rejected CC: `1534:2`;
- Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CD-CE-EDITORIAL-FOLIO-QA-2026-08-17.md`;
- evidence commit: `a5aa5cb5df2f44296ee335d266d1f6b17a4db9f5`.

## What must remain Rurubu-specific

Do not transfer the exact page numbers, English slugs, type size, navy/cream colors, positions, Rurubu section names, photography, or layout.

## Cross-item applicability hypothesis

A materially different multi-page print artifact may independently test whether a recurring native folio/page identifier improves artifact-level cohesion before introducing more visible containers or decoration. The receiving item must independently choose its own wording, placement, typography and polarity.

## Next receiving-item experiment

Test only where multiple pages or panels already have distinct local layouts but need stronger publication-level continuity. If a folio competes with trim, ticket/perforation semantics, QR quiet zones, or another physical role, reject it rather than forcing the pattern.