# るるぶWEDDING — Figma Visual Checkpoint 2026-08-01

Status: `AUTHENTIC_RURUBU_VARIANT_BUILT / REAL_CONTENT_REPLACEMENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

This checkpoint records work verified directly in the live Figma file. It does not declare the item final or print-ready.

## Current preferred direction

User direction changed from a restrained travel-editorial look to a much closer imitation of actual Rurubu travel-guide visual grammar.

The preferred review target is now the separate Figma page:

`02_RURUBU_AUTHENTIC`

Frames:
- `01_RURUBU_AUTHENTIC_OUTER`
- `02_RURUBU_AUTHENTIC_INSIDE`

The earlier selected line `Cover A + Inside A + Back A` remains preserved on the original page as editable fallback and comparison evidence. It was not destroyed or flattened.

## Authentic Rurubu-style redesign completed

### Outer spread
The new outer spread intentionally moves away from the previous elegant/minimal composition and adopts the dense visual grammar associated with real Rurubu travel guides:

- oversized outlined cover headline
- large hero-photo mass
- bright pink / blue / yellow / green / orange palette
- circular inset photos with caption ribbons
- dense numbered feature boxes
- multiple short editorial callouts
- `PICK UP!` and `BEST SHOT` as prominent badges
- large `CONTENTS` back-cover treatment
- five numbered contents modules with photo, title, summary, and page badge
- compact journey-route strip at the bottom

The existing accepted transparent PNG assets remain in use:
- Logo A
- `2026.10.24 SAT` date badge
- masking-tape decoration #9
- `PICK UP!`
- `BEST SHOT`
- feature-stamp star #14a

### Inside spread
The new inside spread also adopts the dense, practical guidebook hierarchy rather than the previous restrained profile-book hierarchy:

- oversized outlined `ふたりのこと ぜんぶ見せ！` headline
- thick blue/pink profile-card borders
- large colored name ribbons
- color-coded profile details
- `3大 QUESTION` banner
- three individually color-coded Q&A blocks
- large `ふたり旅 HISTORY` title
- numbered six-step timeline
- yellow-framed history photo feature
- bright caption treatment
- `思い出スポット BEST 4` banner
- four photo-led destination cards with colored borders and page badges
- Current map-pin and small-travel-icon PNGs retained as semantic accents

All normal headings, names, profile copy, Q&A, dates, captions, page numbers, and feature copy remain native editable Figma text.

## Screenshot QA and fixes

Screenshot QA was completed on both authentic frames.

Issues found and corrected:
- Q&A background panels initially covered the existing native copy because of layer order.
- All Q&A numbers, questions, and answers were moved above the colored panels.
- The cover dummy-photo badge initially competed with the yellow callout.
- The badge was moved to a clear top-center position inside the hero area.
- Current map-pin and travel-icon PNGs were previously normalized to RGBA so palette transparency renders visibly in Figma.

Final screenshot read:
- outer spread strongly resembles the high-density Rurubu travel-guide structure
- inside spread has clear numbered reading order despite increased visual density
- no major clipping or missing-text region remains visible
- dummy images remain clearly identifiable as replace-later content

## Final structural audit of authentic variant

Live Figma audit result:
- missing font: false
- authentic outer frame: `1587.4 × 1122.5`
- authentic inside frame: `1587.4 × 1122.5`
- visible nodes: outer `119`, inside `132`
- new authentic-layout nodes: `149`
- visible native text nodes: `129`
- visible raster image nodes checked: `13 / 13`
- invalid geometry: `0`
- accepted assets regenerated: no
- prior design candidates preserved: yes

## Dummy photo placement

The authentic variant currently uses visible layout-only dummy fills for:

1. cover hero
2. cover inset profile / friends photos
3. back contents thumbnails
4. profile A
5. profile B
6. history memory
7. memory spot 01
8. memory spot 02
9. memory spot 03
10. memory spot 04

These are composition dummies only. Every dummy must be replaced before FINAL.

## Remaining before final

1. Confirm the authentic variant as the production direction after user visual review.
2. Replace every dummy image with selected real photos.
3. Replace dummy profile, Q&A, history, memory-spot, friends/family, and page-number copy with approved final content.
4. Re-run crop, subject-safe-position, text overflow, fold-proximity, and visual-density QA after every replacement group.
5. Verify the exact current print product/template and final bleed/safe requirements immediately before ordering.
6. Apply the exact vendor template without inventing production-safe values.
7. Export the final PDF and run the repository final-print QA checklist.
8. Complete actual-size print and physical proof review.

## Declaration

The Rurubu item now has a dedicated high-density authentic-style variant in live editable Figma, with prior candidates preserved for rollback.

It is now at:

`AUTHENTIC_RURUBU_VARIANT_BUILT / REAL_CONTENT_REPLACEMENT_PENDING / NOT_PRINT_READY`
