# Rurubu WEDDING V11 — Print Production Specification

Status: `V11_PRINT_WORKING_AUTHORITY`

This file isolates production facts from old V10 design decisions. No V10 visual composition is inherited through this document.

## Working format
- finished size: A5 portrait, 148 × 210 mm;
- page count: 8 pages;
- working bleed: 3 mm on all sides unless printer template overrides;
- critical copy: keep comfortably inside trim; working target roughly 6 mm+ from trim edges, with extra care at gutter/inner edge;
- decorative foliage/photo/frame art may intentionally enter bleed.

## Figma master
- preserve editable text;
- preserve independent photo masks;
- preserve frame artwork separately;
- keep an sRGB working master;
- do not flatten the entire book merely to simplify handoff.

## Raster quality
- preferred final effective resolution: 300 ppi+;
- 250–299 ppi: warning/review;
- below 250 ppi: not final print-ready for important promoted imagery unless explicitly accepted;
- proxy people/scenery may be lower resolution during structure work but remain explicitly non-final.

## Export pipeline
Working target:
1. finish editable sRGB Figma master;
2. export high-quality PDF;
3. convert/preflight in print-capable software according to printer requirements;
4. candidate CMYK profile when appropriate: Japan Color 2001 Coated;
5. candidate final standard: PDF/X-4;
6. inspect fonts, overprint/transparency, image resolution, trim/bleed and color conversion;
7. physical/actual-size proof before final order where practical.

Printer's supplied specification always overrides generic profile/PDF assumptions.

## A4 self-imposition fallback
If manually imposing the 8-page A5 booklet onto A4 sheets, working page order is:

- Sheet 1 outside: `P08 | P01`
- Sheet 1 inside: `P02 | P07`
- Sheet 2 outside: `P06 | P03`
- Sheet 2 inside: `P04 | P05`

Reconfirm binding/flip orientation with the actual print workflow before output.

## Actual-size typography
Do not approve body/caption sizes from zoomed-out screenshots alone.

At A5 actual size verify:
- body readability;
- Japanese line breaks;
- caption size;
- thin keylines/strokes;
- small white outlines around display type;
- barcode-like decorative details;
- map labels;
- Q&A and itinerary copy.

## Final status boundary
`STRUCTURE_APPROVED` and `CONTENT_APPROVED` do not imply `PRINT_READY`.

`PRINT_READY` requires:
- final/verified photo sources;
- final factual copy;
- final resolution check;
- final bleed/safe-area check;
- final output profile/format confirmation;
- PDF preflight / actual-size proof.