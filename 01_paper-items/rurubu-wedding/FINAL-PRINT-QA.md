# るるぶWEDDING — Final Print QA

Status: READY / WORKING_VENDOR_TARGET_RAKSUL
Current authority: GitHub `main`

## Scope
This is the final preflight gate after design winner promotion and real-content replacement. It does not make an unverified printer template production authority.

## Working vendor target
Current working target: ラクスル / 折りパンフレット / 二つ折り / A4仕上がり。

Official Raksul guidance verified 2026-07-31:
- two-fold pamphlets support spread data; Speed Check accepts spread data, not single-page data,
- for edge-to-edge print, extend background 3mm outside finish,
- critical text/design should be at least 3mm inside finish,
- minimum font size: 6pt,
- minimum line width: 0.3pt / 0.1mm,
- recommended image resolution at final physical size: 350–400dpi.

Source URLs are intentionally kept outside this document's authority chain; re-verify current official vendor guide/template at order time.

## Final geometry gate
- [ ] ordered product is confirmed as the intended A4-finished two-fold product
- [ ] official current vendor template downloaded for the exact ordered product
- [ ] spread orientation / front-back / opening direction checked against that template
- [ ] finish size and fold position match the order, not an old local assumption
- [ ] bleed matches the current vendor template; working assumption is 3mm until confirmed
- [ ] no important face, name, date, QR, or small caption sits on the fold
- [ ] critical elements remain inside the confirmed safe zone

## Typography / line gate
- [ ] no production text under 6pt
- [ ] no production rule/line under 0.3pt / 0.1mm
- [ ] Japanese characters render correctly in exported PDF
- [ ] no missing glyphs / tofu / font substitution
- [ ] all intended text remains readable at 100% print scale
- [ ] long names and captions do not overflow after final copy replacement

## Image gate
- [ ] every `DUMMY / REPLACE LATER` image has been removed from FINAL
- [ ] every `DUMMY BG` background has been removed from FINAL
- [ ] final photos are reviewed at actual placed size
- [ ] photos intended for print are approximately 350–400dpi at final physical size where practical
- [ ] no low-resolution screenshot is used where an original photo exists
- [ ] faces/hands/important objects are not accidentally cropped
- [ ] photo color/brightness is acceptable in print-oriented preview

## Asset gate
- [ ] SVG count in production artwork = 0
- [ ] approved decoration assets are transparent PNG only
- [ ] no checkerboard/matte/green-screen residue is baked into PNG
- [ ] no rejected/historical SVG-derived asset is used
- [ ] decoration density still supports reading order

## Fold / trim gate
- [ ] fold is inspected with a printed-paper mental model, not only flat-screen appearance
- [ ] no face is bisected by fold
- [ ] no small text crosses or hugs fold
- [ ] trim-edge decorative elements may bleed intentionally; critical content may not
- [ ] background reaches full confirmed bleed area where edge-to-edge printing is intended

## PDF export gate
- [ ] export method matches the current vendor's supported PDF workflow
- [ ] page/spread count is correct
- [ ] no accidental extra blank page/frame
- [ ] transparency effects render as expected in exported PDF
- [ ] no raster preview is mistaken for final artwork
- [ ] exported PDF re-opened independently after export

## Human visual QA
Review the final PDF in two modes:
1. 100% zoom — micro typography, image quality, trim/fold proximity
2. fit-to-page / thumbnail — hierarchy, cover impact, reading flow, visual balance

Then inspect:
- [ ] front cover reads instantly as `るるぶWEDDING`
- [ ] hero photo remains primary
- [ ] inside is calmer than cover
- [ ] back cover does not feel overdecorated
- [ ] names/date/place are correct
- [ ] no dummy labels remain

## Final vendor re-verification gate
Immediately before ordering:
- [ ] re-open the current official Raksul guide/template for the exact product
- [ ] compare template revision/current order options against Figma/PDF
- [ ] if vendor requirements differ from this working target, vendor requirements win

Only after every applicable checkbox passes may the PDF be called `PRINT_READY`.
