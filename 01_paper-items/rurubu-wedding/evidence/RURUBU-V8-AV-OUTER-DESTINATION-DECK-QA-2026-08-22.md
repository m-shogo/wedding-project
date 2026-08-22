# RURUBU V8 Outer AV — destination-deck QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Current candidate: `2273:24 / V8 CLEANROOM AV / BOOK EDITION / OUTER / CONTENT-OWNED DESTINATION DECK / CURRENT / 2026-08-22`
Previous rollback: `2251:2 / V8 OUTER AP / PRE-DESTINATION-DECK`

## Why this reconciliation exists

GitHub Current Status still named AP as the V8 Outer authority, while live Figma had already moved AP to hidden rollback and exposed AV as the current Outer root. Per authority order, live Figma wins once the live candidate is re-read and QA is reproduced.

## AP → AV bounded change

Layout geometry, one existing abstract ocean-light supporting image, masthead, `横浜` hierarchy, back-cover contents, and all other visible copy remain unchanged except the front deck.

AP deck:

`写真、年表、好きな店、寄り道。`
`読むたびに、その日の空気へ戻れる本。`

AV deck:

`海辺、街歩き、好きな店、夜の食卓。`
`横浜の一日を、ページに残す。`

The change replaces production-format/inventory language with reader-facing, destination-owned concrete experience language. It does not claim that the current abstract ocean-light master is Yokohama photography.

## Three-scale visual QA

- 500px whole-item: PASS. `横浜` remains the dominant first read; the new deck is still legible as supporting copy and reads as travel experience rather than internal publication inventory.
- 1400px reading scale: PASS. Masthead → destination → supporting image/headline → concrete destination deck → folio/caption remains coherent.
- 1587×1123 actual size: PASS. No accidental wrap or collision observed; the abstract image still remains the main visual weakness rather than the copy hierarchy.

## Structural QA

Live readback of AV:

- parent page: `2052:2`
- visible native text: `12`
- visible IMAGE fills: `1`
- same-spread text intersections: `0`
- 18px text safe-area risks: `0`
- image node: `2273:36`
- existing image hash: `be21a846e961b3a13c24c7476f6a01b12b8d07ff`
- existing Drive source in node name: `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`

No V6/V7 image was introduced.

## Photo-art-direction production brief refinement

Live brief `2270:2 / V8 / PHOTO ART DIRECTION / OUTER-01 / QA_PASS` remains `GENERATION_READY / NOT CURRENT` and was refined after new professional travel-editorial research.

Added criteria:

- the desired response is not only `ここへ行きたい` but also `この街を歩いてみたい`;
- visual authenticity must include lived-in city evidence such as pavement, storefront rhythm or harbor infrastructure, rather than relying on landmark/postcard beauty alone;
- keep the existing 35–50mm, natural-light, realistic-color, crop/text-safe and anti-fake-signage constraints.

The first expanded brief copy overflowed into the next section. It was rejected immediately and compressed until the original vertical rhythm was restored. Final brief screenshot QA: PASS.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new production Figma IMAGE placement: `0`
- V6/V7 image reuse: `0`
- current abstract ocean-light remains a supporting placeholder/essay image, not destination-specific final photography.

Drive V8 authority was re-read and still contains only the five existing masters; no new OUTER-01 role-specific generated master exists yet.

## Decision

AV is accepted as the live V8 Outer current authority because it improves destination-owned reader language without introducing layout or structural regression.

V8 is still **not** the global winner and is **not** print-ready. V6 remains stronger for immediate destination/travel desire because the V8 Outer still lacks role-specific Yokohama photography.
