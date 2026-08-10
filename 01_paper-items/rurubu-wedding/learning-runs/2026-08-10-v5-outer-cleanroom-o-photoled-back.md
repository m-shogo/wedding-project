# V5 outer clean-room O — photo-led back-cover density

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authority refresh and boundary

Before the write, live Rurubu Figma state and latest GitHub main were re-read. The previously verified Q60 Drive source remains the only active photo-role blocker. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was touched.

Production Current remains unchanged:
- outer `77:18`
- inside `77:290`

## Visible problem

Clean-room N materially improved the front cover, but its back cover still inherited M unchanged. At actual-size review the upper back image was strong, yet it retained relatively generous cream margins and the Friends section still read slightly like two placed modules beneath a framed hero rather than one dense travel-editorial page.

## Principle tested

- increase photographic authority before adding decoration
- enlarge the existing verified photographs and reduce unnecessary separation
- preserve direct-on-photo Japanese type and the existing timeline rather than introducing new cards or stickers
- keep the same verified image hashes so the experiment isolates layout/crop/scale rather than source substitution

Expected improvement: stronger back-cover thumbnail silhouette, more immediate photo-led reading, tighter Friends rhythm, less brochure-like separation.

Regression risk: top title becoming trim-sensitive, Friends images becoming over-dominant, timeline compression reducing readability.

## Figma implementation

Created rollback-safe duplicate:
- `657:2 / V5_OUTER_RURUBU_CLEANROOM_O_PHOTOLED_BACK_2026_08_10`
- back `657:3`
- front `657:129` inherits N unchanged
- fold guide `657:158`

Back changes:
- dominant back image `657:6`: enlarged to `770 × 500`, positioned `x 12 / y 18`, rotation reduced to `-0.3°`
- main title `657:124`: moved into the larger photo field, increased to `40 px / 42 px` line height
- supporting travel-note and MEMORY copy repositioned within the photo without reintroducing a card
- Friends title moved directly under the dominant image
- Friends cafe `657:18`: enlarged to `384 × 246`, rotation `-1.8°`
- Friends dining `657:22`: enlarged to `346 × 224`, rotation `+1.5°`
- caption strips tightened and aligned to the enlarged images
- entire `BACK_VISUAL_HISTORY_*` family shifted upward `14 px` as a unit to reduce lower-page dead space while preserving the route geometry
- footer retained as the quiet final anchor

No new card, pill, gradient, decorative sticker, generated image, or flattened text was added.

## Three-scale visual result

Thumbnail comparison shows O improving the back-cover silhouette over N: the dominant image owns more of the page and the Friends pair reads as a stronger middle editorial band.

Actual-size back screenshot `657:3` confirms:
- upper Japanese title remains readable on photography
- MEMORY copy remains separated from the main title
- Friends pair remains distinguishable despite enlargement
- timeline remains readable after the bounded upward shift
- no visible clipping or accidental text collision was observed

Fresh structure QA for `657:2`:
- visible native text `39`
- visible IMAGE fills `9`
- same-parent text overlaps `0`
- fold guide `657:158` visible at `2 × 1122.5`
- Current outer/inside still `77:18` / `77:290`

Verified hashes remain unchanged:
- back main `657:6` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `657:18` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `657:22` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- temporary cover comparator `657:130` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- logo/date hashes preserved

## Adoption state

- clean-room N front direction: retained
- clean-room O back direction: stronger than N/M and adopted as the new strongest outer **comparator**
- Current outer promotion: not performed
- Q60 cover source: Drive-verified but still not placed in Figma
- V5 gate: unchanged at `PHOTO_ROLE_PASS 9/10`, `ROLE_COMPLETE 9/10`, dominant `2/3`
- V6 remains closed

## Learning result

**Visible problem:** a good dominant back photograph can still feel brochure-like if its surrounding margin and subsequent modules are too separated.

**Principle/capability:** enlarge the photo and tighten the following photo band before inventing additional editorial devices.

**Expected improvement:** denser but more natural print-magazine rhythm.

**Regression risk:** trim safety and over-dominance; must be rechecked once the actual print template is known.

**Evidence:** thumbnail O comparison, actual-size `657:3`, structure QA, image-hash readback.

**Status:** `TESTED / ADOPTED_AS_STRONGEST_OUTER_COMPARATOR / CURRENT_NOT_PROMOTED`.

**Next application:** the next high-value step remains the valid Q60 cover placement. Once binary-safe placement is available, apply it to O/N front `657:130`, rerun crop/sharpness/contrast/top-safe-area QA, compare against legacy Current and M/N/O, and promote only the verified winner.