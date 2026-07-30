# NEXT ASSET 08 — PNG Production Brief

Status: READY_FOR_NEW_RASTER_GENERATION
Current authority: GitHub `main`

## Deliverable

One single scrapbook-style photo frame decoration for a cheerful Japanese travel-magazine wedding profile book.

## Visual target

- landscape rectangular photo frame
- cream/white paper material with a slightly handmade cut-paper feel
- large empty rectangular center opening for inserting a real photograph later
- gentle editorial scrapbook character, playful but tasteful
- two small pieces of pastel washi tape at outer corners
- a few tiny heart/star/travel-paper accents only around the perimeter
- slightly imperfect paper edges / subtle printed-paper texture
- one isolated object, centered
- bright, clean, print-friendly styling suitable for an A4 wedding profile book

## Composition

The central photo opening is the dominant empty area. Decorations stay on the outer frame and never cover the photo opening.

## Content boundary

- no readable typography
- no people
- no photograph inside the opening
- no emblem/seal composition
- no ribbon/banner composition
- no camera motif
- no multiple-object asset sheet

## Production format

Target production authority is transparent PNG only.

Preferred raster workflow when direct alpha is unreliable:
1. create the isolated frame on a uniform chroma-green canvas
2. chroma-key the outside and center opening to real alpha
3. tight crop
4. verify transparent outside + transparent center opening
5. verify no visible green spill

## Acceptance

PASS only if the result immediately reads as a blank scrapbook photo frame, not as a badge, sticker collection, logo or completed photograph.

After PASS:
- save new PNG without overwriting historical candidates
- alpha QA
- Drive upload + metadata readback
- mark queue #8 complete
- only then advance to #9