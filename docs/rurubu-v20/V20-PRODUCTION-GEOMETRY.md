# V20 Production Geometry

Status: `PHYSICAL_GEOMETRY_AUTHORITY`

This file defines the V20 physical page model before Figma construction.

Exact printer templates override these working values if the printer later specifies different bleed/safe requirements.

## 1. Final format

- trim: A5 portrait = 148 x 210 mm;
- pages: 8 fixed;
- bleed: 3 mm each side working standard;
- full bleed canvas: 154 x 216 mm.

## 2. Figma working conversion

Figma dimensions are px. Use the CSS/Figma physical mapping assumption of 96 px/in for the working master:

`1 mm = 96 / 25.4 = 3.779527559 px`

Therefore:

- trim width 148 mm ≈ 559.37 px;
- trim height 210 mm ≈ 793.70 px;
- bleed 3 mm ≈ 11.34 px;
- full bleed width 154 mm ≈ 582.05 px;
- full bleed height 216 mm ≈ 816.38 px.

Recommended Figma page frame:
- use approximately `582.05 x 816.38 px` if decimal precision is practical;
- create explicit trim guides inset `11.34 px` from all four frame edges;
- do not visually guess A5 proportions.

Before final print delivery, verify exported PDF physical page size in a PDF/preflight tool. Figma canvas dimensions alone are not proof of final printer dimensions.

## 3. Safe-area working model

Until printer-specific guidance exists:

- bleed-to-trim: 3 mm;
- critical copy: prefer at least 6 mm inside trim;
- therefore critical-copy safe edge from full-bleed frame: about 9 mm ≈ 34.02 px;
- body copy near the fold/gutter: prefer about 7–8 mm inside trim where practical;
- important faces/eyes should not depend on the last 3–5 mm near trim.

Decoration and noncritical photography may intentionally enter bleed.

## 4. Fold / spread handling

Logical spreads:
- P02–P03;
- P04–P05 center spread;
- P06–P07.

Critical content never relies on perfect cross-page registration.

P04–P05 may use a route/atmosphere/background that crosses the center fold, but:
- no critical small text on the fold;
- no face/eye centered on the fold;
- no destination marker whose meaning disappears if alignment shifts slightly;
- no thin border that must match perfectly across two pages.

## 5. Page master structure

Recommended layers for every page:

- `GUIDE / BLEED EDGE`;
- `GUIDE / TRIM`;
- `GUIDE / SAFE COPY`;
- `BACKGROUND`;
- `EDGE DECOR`;
- `PHOTO SOURCES`;
- `PHOTO MASKS / FRAMES`;
- `DISPLAY ART`;
- `NATIVE TEXT`;
- `FOREGROUND ACCENTS`;
- `QA / NOTES` hidden from export.

Guides and QA notes must be clearly excluded from final export.

## 6. Photo resolution

For final raster photography/graphics:
- preferred effective resolution: 300 ppi or higher at placed physical size;
- 250–299 ppi: warning/review;
- below 250 ppi: not print-ready for a final promoted image unless there is a deliberate exception and physical proof.

During composition, low-resolution proxy people/scenery may be used only when:
- clearly marked proxy;
- independently masked/replacement-ready;
- not promoted as final;
- final replacement QA is still required.

## 7. Raster pixel examples at 300 ppi

Useful production targets:
- full A5 trim 148 x 210 mm ≈ 1748 x 2480 px at 300 ppi;
- full bleed 154 x 216 mm ≈ 1819 x 2551 px at 300 ppi;
- 100 mm wide image ≈ 1181 px at 300 ppi;
- 70 mm wide image ≈ 827 px at 300 ppi;
- 50 mm wide image ≈ 591 px at 300 ppi.

These are source-raster guidance; Figma frame px are a layout-coordinate system and should not be confused with source-photo pixel dimensions.

## 8. Print/export rule

V20 working master remains sRGB/editable in Figma.

Final print workflow should be treated as a separate controlled stage:
1. complete editable Figma master;
2. export high-quality PDF with bleed;
3. verify physical dimensions;
4. convert/manage CMYK/profile using the chosen print workflow/printer requirement;
5. preflight fonts/images/bleed/overprint where applicable;
6. inspect proof/physical print before final quantity.

Do not call the Figma file alone `PRINT_READY`.

## 9. Imposition rule

Do not rearrange V20 design frames into printer imposition order as the canonical design master.

Keep logical reading order P01–P08.

If DIY or printer imposition is needed later, generate a separate imposition artifact from the approved page exports. This avoids editing the design in printer-order and accidentally swapping page content.