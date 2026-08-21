# 2026-08-22 — Rurubu V8 Outer AA

## What changed

Outer W `2209:2` was compared against a rollback-safe cover composition and replaced by Outer AA `2216:2` after three-scale and structural QA.

The front-cover hierarchy was simplified around semantic ownership:

- publication masthead became a smaller single-line `るるぶ WEDDING`
- `横浜` became the dominant native destination field
- the existing verified ocean-light generated master remained a supporting visual rather than being treated as destination photography
- no new decorative device or invented factual copy was added

Back cover remained unchanged.

## Why

The prior cover was clean but still read as three stacked primary bands: masthead, destination, abstract image. Fresh editorial/book-cover research suggested testing hierarchy and arrangement before adding further visual layers.

## Rejected / avoided behavior

- did not add stickers, tropical motifs, cards, badges, shadows or generic gradients
- did not relabel the abstract ocean-light asset as Yokohama photography
- did not reuse V6/V7 image hashes
- did not claim new image-generation closure
- did not make a global rule that destination names should always be huge

## QA

- 500 px whole: PASS
- 1400 px reading: PASS
- 1587×1123 actual: PASS
- native text 11
- IMAGE 1
- intersections 0
- 18 px safe risk 0
- one-character explicit Japanese lines 0

## Learning

`RSL-205 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:
`F-RSL-205-PUBLICATION-MASTHEAD-AND-DESTINATION-COMPETE-WITHOUT-CLEAR-CONTENT-OWNERSHIP`

The useful lesson is to test whether cover-level text roles receive visual weight according to semantic ownership before adding decoration.

## Asset truth

Drive V8 folder `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo` was re-read. No new master was added. Existing ocean-light master `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB` and Figma hash `be21a846e961b3a13c24c7476f6a01b12b8d07ff` were retained.
