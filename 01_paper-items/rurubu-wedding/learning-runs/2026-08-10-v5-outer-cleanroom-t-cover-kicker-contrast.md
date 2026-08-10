# V5 outer clean-room T — cover kicker contrast

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / T_WINS_S_KICKER_CONTRAST / CURRENT_NOT_PROMOTED`

## Authority refresh

Immediately before the write, live S, Current outer `77:18`, Current inside `77:290`, Q60 state, and latest GitHub main were re-read. Only Rurubu WEDDING was changed.

## Visible problem

S's actual-size front-cover screenshot exposed one defect independent of the unresolved Q60 image transport: the native kicker `＼ 横浜で叶える　ふたりの旅支度 ／` was yellow over a pale gray/pink sky area and lost contrast at reading scale.

The correct fix did not require another badge, field, shadow, or image. The text itself needed a stronger editorial color.

## Principle tested

Use typography/contrast before containment:

`low-contrast direct type → higher-contrast direct type`

Do not solve a color-contrast defect by adding another card/box when the underlying photograph can already support direct text.

Expected improvement:
- stronger reading hierarchy under the destination line
- clearer Japanese cover navigation at actual size
- less temptation to add another color field or badge

Regression risk:
- magenta could compete with the much larger `横浜` title
- increased contrast could make the kicker read as a second headline

## Figma implementation

Created from S:
- `672:2 / V5_OUTER_RURUBU_CLEANROOM_T_COVER_KICKER_CONTRAST_2026_08_10`
- front `672:131`
- kicker `672:140`
- fold `672:163`

Change:
- `CE_KICK` remained native editable text at `17 px`
- changed only its fill to controlled editorial magenta `rgb(0.96, 0.04, 0.27)`
- no image, crop, position, text, card, pill, gradient, shadow, logo, date badge, or support-photo change

## Three-scale QA

Actual-size front:
- the kicker now remains readable over the pale upper hero field
- it remains clearly subordinate to the 86 px `横浜 / ふたり旅。` title
- no new field interrupts the photo-led composition

Whole spread:
- the magenta kicker aligns with the existing pink editorial system and does not destabilize back-cover balance
- S's stronger timeline microtype and R's back-cover subtraction remain intact

Structure:
- visible native text `44`
- same-parent text overlaps `0`
- fold `672:163`: visible `2 × 1122.5`
- temporary hero remains hash `539c259be8036b481d06b4f76db9a39b407d90e8` and is still composition-only, not V5-01

Protected image hashes remain unchanged:
- back main `672:6` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `672:18` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `672:22` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- logo `672:137` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `672:138` → `0cbbf09357938365c2550f08928be1db33fa6060`

## Adoption state

- generated: none
- T duplicate placed: yes
- actual-size front QA: yes
- whole-item QA: yes
- structure QA: yes
- T vs S kicker comparison: T wins
- production outer Current promotion: no
- Q60 placed: no
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V6: remains closed

## Learning result

When a travel-magazine cover already has enough image/typographic structure, a weak text-safe area should first be repaired through direct-type contrast. Adding a field to rescue pale type would reintroduce the UI/card geometry the redesign is removing.
