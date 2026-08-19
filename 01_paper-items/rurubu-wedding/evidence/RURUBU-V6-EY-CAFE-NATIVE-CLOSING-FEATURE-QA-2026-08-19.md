# RURUBU V6 EY — Cafe native closing feature QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL / ADOPTED_PREFERRED / NOT_PRINT_READY`

## Source problem

Preferred EX `1831:2` had already improved the Cafe mid-field, but same-scale review of all six preferred V6 spreads showed the Cafe left-page lower quarter still reading as residual template space. The existing native closing copy `好きな店が、旅の目的地になる。` was semantically strong but visually too quiet to close the page.

## Root-cause hypothesis

The defect was not a missing photograph or missing decoration. The page already had a legitimate source-safe view photo and useful native copy. The closing copy simply carried too little editorial weight relative to the large `01` feature above it.

## Bounded test

Rollback-safe duplicate from EX:

- candidate/promotion node: EY `1835:2`
- Cafe page: `1835:3`
- old EX `1831:2` preserved hidden as rollback
- no photo/source/hash changes
- no new raster, generated asset, Drive save, external binary placement, card, shadow or gradient
- existing closing quote enlarged and given a deliberate closing position
- existing accent rule moved to bind the closing beat
- existing `CAFE CHECK / 02` remains native and readable

Changed native role:

- `TEXT / GOURMET_CLOSING_QUOTE` → `450×82`, 32px / 38px line-height, two-line closing feature
- `TEXT / GOURMET_CLOSING_META` remains native support metadata

## Expected improvement

Turn the lower quarter from unused-looking space into a deliberate editorial cadence without repeating another photo or introducing UI-like cards.

## Regression risks checked

- closing quote overwhelming the source-safe `02` photo
- copy/metadata collision
- bottom safe-area loss
- folio collision
- loss of editability
- accidental change to Table page or image hashes

## Evidence

Three-scale visual review:

- 500px whole-spread thumbnail: PASS
- 1200px whole-spread reading scale: PASS
- Cafe actual-size `794×1123`: PASS

Structure QA on `1835:3`:

- visible native text: 17
- absolute text collisions: 0
- 18px safe-area risks: 0
- page overflow: 0
- replaceable view photo remains `238×218`
- existing composed travel texture hash unchanged: `691a6ceed471a5d8efa144052a10564eed177b4f`
- existing view photo hash unchanged: `644f449c3bf2001a94d4b822d2b55e2614c11042`

Final live promotion:

- EY `1835:2` = `PREFERRED / V6_INSIDE_EY_CAFE_NATIVE_CLOSING_FEATURE_2026_08_19`
- EX `1831:2` = hidden rollback

## Result

`VERIFIED_LOCAL → ADOPTED_PREFERRED`

EY is visually stronger than EX because the page now ends with an intentional native editorial beat rather than residual cream space. No image-generation or transport progress is claimed.

## Rurubu-specific boundary

The Japanese copy, exact scale, coordinates, cyan/yellow/magenta palette and Cafe page composition remain Rurubu-specific. Only the production principle may transfer as a hypothesis.
