# RURUBU V8 AS — Cafe/Table Dinner Closing Gravity QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Previous current: AF `2230:26`
Promoted current: AS `2261:2`

## Visible problem

AF had already removed fake image slots and template-like schema furniture, but the Dinner page still ended weakly: the article-owned close `夜の横浜を、ゆっくり味わう。` floated in the middle-lower field at moderate scale. The page was restrained, but the close did not feel like a deliberate ending and the empty lower field could still read as unfinished wireframe space.

## Fresh professional hypothesis

Two professional editorial references were used as decision principles rather than visual templates:

- The Guardian Saturday redesign describes flatplanning as an intentional balance of breathing room and density contrast so different parts of a publication have distinct pace.
- Neville Brody's discussion of magazine typography treats type scale and placement as part of the reader's rhythmic/filmic journey, not merely styling.

Hypothesis: on a quiet page, semantic entry/support/close should still be legible through position and scale. A real closing statement should have closing gravity; it should not simply float in leftover space.

## Bounded experiment

Rollback-safe duplicate of AF.

Unchanged:
- all copy
- left Cafe page
- Dinner opening `料理、皿、手元、店の空気。`
- Dinner support `一皿ずつ分け合いながら。`
- color system
- folios
- page size

Changed only:
- `夜の横浜を、ゆっくり味わう。`
- x: `1010 → 900`
- y: `600 → 680`
- font size: `48 → 54`
- line-height: `64 → 70`
- width: `420 → 500`

No new card, badge, shadow, gradient, decorative English, raster image or generated asset was added.

## Visual QA

- 500px whole spread: PASS — Dinner now reads as opening → support → late close rather than a large title with a floating phrase.
- 1200px reading scale: PASS — closing beat is clearly secondary to the main Dinner headline but strong enough to terminate the page.
- 1587×1123 actual size: PASS — no crowding, no accidental wrap, and the lower field reads as deliberate breathing room around a real ending.

## Structure QA

- parent page: `2052:2`
- visible native text: `13`
- visible IMAGE fills: `0`
- unintended text intersections: `0`
- 18px safe-area risks: `0`
- accidental explicit one-character Japanese lines: `0`
- whole-page flattening: `0`

## Rollback

AF `2230:26` preserved as hidden rollback.
AS `2261:2` promoted to Current.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- Drive V8 authority retained: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`

## Learning state

`RSL-219 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:
`F-RSL-219-QUIET-PAGE-CLOSING-COPY-FLOATS-WITHOUT-CLOSING-GRAVITY`

Transferable principle: quiet editorial restraint still needs content-owned entry/support/close. Do not fill whitespace with decoration; instead check whether the real ending has enough positional and typographic gravity to perform its semantic job.

Must remain Rurubu-specific: exact copy, positions, font sizes, cream/navy/coral palette, Cafe/Dinner role, and page geometry.
