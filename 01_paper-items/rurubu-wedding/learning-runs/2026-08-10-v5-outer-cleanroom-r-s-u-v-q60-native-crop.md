# V5 outer clean-room R → S → U → V — Q60-native crop and print subtraction

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / V_STRONGEST_THIS_RUN / CURRENT_NOT_PROMOTED / Q60_STILL_UNPLACED`

## Authority and safety refresh

Before every Figma write, the live `01_RURUBU_WEDDING` page and the source comparator were re-read. GitHub `main`, `CURRENT-STATUS.md`, the existing Q experiment, and the Q60 Google Drive master were re-read before work. Current outer `77:18` and Current inside `77:290` were not edited. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

Drive readback for the intended cover hero:
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- bytes: `155,439`
- dimensions: `1330 × 1220`
- known SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The materialized Drive binary was visually inspected: believable Yokohama / Minato Mirai golden-hour waterfront, Landmark Tower and Ferris wheel visible, no baked final text, useful sky/water text-safe areas. It remains a suitable cover master.

## Experiment R — Q60-native crop geometry

Created:
- `678:2 / V5_OUTER_RURUBU_CLEANROOM_R_Q60_NATIVE_CROP_2026_08_10`
- front `678:129`
- temporary hero `678:130`

Visible problem:
Q used a `766 × 904` temporary history image as a layout stand-in. That silhouette was too tall for the real Q60 master (`1330 × 1220`) and encouraged a crop that would discard too much of the actual Yokohama scene.

Principle tested:
Design the cover geometry around the verified master before transport succeeds. R resized the hero role to `766 × 744`, reduced logo/date scale slightly, preserved dominant Japanese title hierarchy, hid the third support-photo module, and moved two supporting photos across the hero/lower-paper boundary.

Expected improvement:
- less destructive crop once Q60 is placed
- stronger photo-led cover silhouette
- less gallery/module repetition

Regression risk:
- lower cover becoming too empty after shortening the hero
- support photos competing with the eventual skyline hero

Whole-spread screenshot showed the crop geometry working, but the lower three-column feature rail became too sparse.

## Experiment S — asymmetric feature index

Created:
- `678:162 / V5_OUTER_RURUBU_CLEANROOM_S_ASYMMETRIC_FEATURE_INDEX_2026_08_10`
- front `678:289`

Visible problem:
R's lower cover had excessive dead space and still read like a uniform navigation strip.

Principle tested:
Rebuild hierarchy from existing information instead of adding cards: make Feature 01 dominant, stack 02/03 at right, and use one thin magenta vertical editorial rule. Hide the previous cyan/yellow lower strips.

Implementation:
- Feature 01 number enlarged to `38 px`; heading `22 px`
- Features 02/03 use `28 px` numbers and `18 px` headings
- one `5 × 188` magenta divider
- no new card, pill, gradient, shadow, image, or factual copy

Result:
Whole and actual-size screenshots show a materially stronger Japanese magazine contents/index rhythm than Q/R. The lower cover is denser without becoming a dashboard grid.

## Q60 host-fetch transport test — rejected

A disposable clone was attempted using `figma.createImageAsync()` with the Drive download URL, intentionally leaving S and Current untouched.

Result:
`createImageAsync` is not supported by the available Figma Plugin API runtime. The script failed atomically before any clone or canvas mutation was created. This failure is not progress and the method is not retried.

This is a separate method from the already-rejected external `mcp.figma.com` raw POST path. The remaining safe bridge still requires a supported binary ingress path; no low-quality substitute is promoted merely to close the count.

## Experiment U — back-cover subtraction

Created:
- `678:482 / V5_OUTER_RURUBU_CLEANROOM_U_BACK_SUBTRACTION_2026_08_10`
- front `678:609`
- back `678:483`

Visible problem:
The back cover still carried UI-like colored caption bars, redundant `MEMORY 01`/body microcopy, and English-led subcopy that diluted the Japanese editorial hierarchy.

Principle tested:
Subtract repeated fields and let photography + Japanese typography carry the hierarchy.

Changes:
- `BACK_VISUAL_SUB` → native Japanese `ふたりで集めた、旅の記憶。`
- hide redundant `BACK_VISUAL_MAIN_NO`
- hide redundant `BACK_VISUAL_MAIN_BODY`
- keep `旅の途中で / 見つけた一枚` with the existing magenta rule
- hide both Friends colored caption backgrounds
- preserve captions as quiet native text below the photos
- strengthen `みんなとの思い出` and `ふたりの旅年表`
- preserve all accepted image fills and crops

Actual-size back screenshot shows a cleaner magazine page with less web-card/button resemblance.

Fresh U structure QA:
- visible native text: `40`
- visible IMAGE fills: `8`
- same-parent text overlaps: `0`
- fold guide `678:641`: visible, `2 × 1122.5`

Verified hashes preserved:
- back main `678:486` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `678:498` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `678:502` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- temporary hero `678:610` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- logo `678:615` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `678:616` → `0cbbf09357938365c2550f08928be1db33fa6060`

The temporary hero remains only a layout comparator and is not counted as V5-01.

## Experiment V — dual print-folio subtraction

Created:
- `679:2 / V5_OUTER_RURUBU_CLEANROOM_V_DUAL_FOLIO_SUBTRACTION_2026_08_10`

Visible problem:
After U removed interface-like Friends caption bars, the back still ended in a `692 × 24` navy status-like footer, inconsistent with Q's thin front folio.

Principle tested:
Apply the same print-native subtraction at both outer-page trim edges.

Changes:
- back bottom bar → `692 × 3` navy rule at `y=1058`
- native footer microtype → `8 px` at `y=1066`
- no image or content changes

Whole-spread screenshot confirms the outer spread now has consistent quiet folio treatment on both pages.

## Adoption state

- generated images this run: none
- Q60 master visually inspected: yes
- Q60 Drive binary readback: yes
- Q60 placed in Figma: **no**
- R placed: yes; tested
- S placed: yes; tested; front hierarchy winner over R
- U placed: yes; tested; back subtraction winner over S
- V placed: yes; whole-spread visually verified; strongest outer comparator from this run
- Current outer/inside promotion: no
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V6 production: remains closed

## Learning result

**Visible problem:** a clean-room redesign can still inherit the wrong aspect-ratio assumptions and low-value UI residue from its temporary imagery and footer/caption treatments.

**Principle/capability tested:** design geometry from the verified master aspect ratio before transport; after the photo hierarchy is established, subtract status bars, colored caption fields, redundant microcopy, and uniform three-column feature rails.

**Expected improvement:** better eventual Q60 crop integrity, stronger Japanese travel-magazine silhouette, denser-but-readable feature rhythm, and more print-native front/back closure.

**Regression risk:** shortened hero or asymmetric index can create dead space; subtraction can make captions too weak. Both require whole/page/actual-size screenshot review plus programmatic overlap checks.

**Screenshot/structure evidence:** R/S/U/V whole-spread screenshots; U front/back actual-size screenshots; U visible-text `40`, visible IMAGE `8`, overlap `0`, fold `2 × 1122.5`; preserved image hashes listed above.

**Status:** `TESTED / V_STRONGEST_THIS_RUN / CURRENT_NOT_PROMOTED`.

**Next application:** keep V as the leading geometry/subtraction comparator for the next run, but do not promote until the real Q60 binary is placed and the resulting crop/sharpness/contrast wins at whole-item, page, and actual-size scales. If binary ingress remains blocked, continue only independent high-value visual work and do not create filler governance.