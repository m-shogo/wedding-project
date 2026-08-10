# V5 outer clean-room Q — print-folio subtraction

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / Q_WINS_P_FOOTER_COMPARISON / STRONGEST_OUTER_COMPARATOR / CURRENT_NOT_PROMOTED`

## Authority and safety refresh

Immediately before the write, clean-room P `659:2`, its footer nodes, Current outer `77:18`, Current inside `77:290`, and the latest GitHub main were re-read. This experiment changes only a rollback-safe duplicate. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items remain untouched.

The Q60 cover derivative remains Drive-verified and binary-materialized but not placed in Figma, so this comparison does not alter `PHOTO_ROLE_PASS`, `ROLE_COMPLETE`, or dominant-photo counts.

## Visible problem

P solved the largest remaining lower-cover dead zone, but its `738 × 24` navy footer bar still read as a UI/status strip. The same date and Rurubu identity already exist higher on the cover, so the heavy dark rectangle contributed more visual mass than information.

## Principle tested

Subtraction order for a low-priority closing folio:

`heavy field → thin print rule + direct native microtype`

Expected improvement:
- more print-native bottom edge
- less dashboard/status-bar geometry
- preserve editorial closure without adding another component

Regression risk:
- losing the visual anchor at the trim edge
- microtype becoming too weak
- the lower rail appearing unfinished

## Figma implementation

Created from P:
- `663:162 / V5_OUTER_RURUBU_CLEANROOM_Q_PRINT_FOLIO_SUBTRACTION_2026_08_10`
- front `663:289`
- temporary hero comparator `663:290`
- fold guide `663:321`

Footer-only change:
- `CE_FOOTER`: `738 × 24` navy bar → `738 × 3` navy rule at `y=1084`
- `CE_FOOTER_TXT`: preserved native text, moved below the rule and reduced to `8 px` navy microtype
- no text deletion, new factual copy, image change, crop change, card, pill, gradient, or shadow

The first write attempt correctly failed before creating Q because `Noto Sans JP Regular` had not been loaded for the font-size mutation. Readback verified `qCount=0` and P remained unchanged. The method was corrected by explicitly awaiting `figma.loadFontAsync(t.fontName)`; Q was then created successfully. The failed attempt is not counted as progress.

## Three-scale visual QA

Whole-item:
- Q retains P's stronger front-cover photo/title/collage density and O's photo-led back cover
- the front now ends like a printed folio rather than a dark app/status bar
- lower navigation remains a coherent three-part editorial rail

Reading/page:
- `横浜 / ふたり旅。` remains dominant
- 01/02/03 feature hierarchy remains unchanged
- the thin rule is subordinate to all editorial content

Actual-size/detail:
- folio microtype remains readable but intentionally quiet
- the bottom edge remains anchored by the 3 px rule
- no visible clipping or new collision was found

## Fresh structure QA

Final Q readback:
- visible native text: `42`
- visible IMAGE fills: `9`
- same-parent text overlaps: `0`
- fold guide `663:321`: visible, `2 × 1122.5`
- footer rule `663:311`: `738 × 3`
- native folio `663:312`: `8 px`
- Current outer/inside remain `77:18` / `77:290`

Verified image hashes remain unchanged:
- temporary hero comparator `663:290` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- back main `663:166` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `663:178` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `663:182` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- logo `663:295` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `663:296` → `0cbbf09357938365c2550f08928be1db33fa6060`

The temporary hero remains the verified history image used only to judge layout. It is not the V5-01 cover source and does not close the cover-photo gate.

## Adoption state

- generated: none
- Q60 Drive source: previously verified; unchanged
- Q60 placed/adopted in Figma: no
- Q duplicate placed: yes
- whole/page/actual-size visually verified: yes
- structure verified: yes
- Q vs P footer comparison: Q wins
- strongest outer comparator: Q
- production Current promotion: no
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V6: remains closed

## Learning result

**Visible problem:** a heavy footer field can reintroduce interface-like geometry even after the main cover has been successfully rebuilt as a photo-led editorial composition.

**Principle/capability tested:** when the footer carries only repeated identity/date information, test a thin print rule and direct native microtype before retaining a full dark field.

**Expected improvement:** quieter print-native closure and less UI resemblance.

**Regression risk:** too little visual anchoring or illegible microtype; both require actual-size review.

**Screenshot/structure evidence:** Q whole-item and front actual-size screenshots, `42` visible native texts, `9` IMAGE fills, overlap `0`, visible fold guide, preserved hashes.

**Status:** `TESTED / ADOPTED_AS_STRONGEST_OUTER_COMPARATOR / CURRENT_NOT_PROMOTED`.

**Next application:** keep Q as the leading outer comparator. Do not spend more time decorating its footer. The decisive next outer test remains binary-safe placement of the actual Q60 cover derivative into `663:290`, followed by crop/sharpness/contrast and three-scale Current/P/Q comparison. Until that bridge exists, only independent high-value editorial/print-safety defects should be changed.