# V5 outer clean-room W → X — actual-size legibility + repeated-photo subtraction

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / X_STRONGEST_THIS_RUN / CURRENT_NOT_PROMOTED / Q60_STILL_UNPLACED`

## Authority and safety refresh

Read `CLAUDE.md`, `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`, current GitHub main, live Figma page `01_RURUBU_WEDDING`, leading comparator V `679:2`, and Q60 Google Drive master before writes. Live Figma was re-read before every write. Current outer `77:18` and Current inside `77:290` were not edited. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

Drive readback for intended cover hero:
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- bytes: `155,439`
- materialized file reference available in this runtime

The Figma asset upload service issued a single-use upload URL, but this run did not count transport as progress and did not repeat the historically rejected external raw-POST route. Q60 remains unplaced.

## Experiment W — actual-size readability repair

Created:
- `681:2 / V5_OUTER_RURUBU_CLEANROOM_W_EDITORIAL_DENSITY_ACTUALSIZE_2026_08_10`

Visible problem:
V's back folio microtype was white on the cream paper field and nearly disappeared in whole-spread inspection. The six-stop back timeline also used 9 px year/event microtype, weaker than the rest of the redesigned spread at actual size.

Principle/capability tested:
Keep the print-folio subtraction, but restore functional contrast and strengthen actual-size editorial microtype without reintroducing bars/cards. Increase only the secondary hierarchy that was measurably weak.

Changes:
- `BACK_BOTTOM_BAR_TXT` changed to dark navy on cream; `8 → 8.5 px`
- six timeline years `9 → 11 px`
- six timeline event labels `9 → 10.5 px`
- Feature 02/03 headings `18 → 19 px`
- Feature descriptions `10 → 11 px`
- no new cards, pills, gradients, shadows, factual copy, or images

Expected improvement:
Readable back folio and timeline at print/detail scale while preserving the clean magazine silhouette.

Regression risk:
Larger timeline microtype could collide horizontally or make the route feel heavier.

Screenshot result:
Whole-spread screenshot confirmed the back folio became readable while the route retained its light dotted editorial rhythm.

## Experiment X — repeated support-photo subtraction

Created:
- `682:2 / V5_OUTER_RURUBU_CLEANROOM_X_SINGLE_SUPPORT_PHOTO_2026_08_10`
- front `682:129`

Visible problem:
V/W reused the back-cover flatlay (`e373...`) as a front-cover support photo, creating obvious asset repetition across the same outer spread and weakening the clean-room claim.

Principle/capability tested:
Subtract the repeated support image instead of adding another decorative asset. Keep one stronger cafe support photo and let the dominant hero/title/index do more work.

First attempt:
- hid `CF_SUPPORT_PHOTO_1`
- enlarged remaining cafe support image to `252 × 176`

Screenshot QA caught a real regression: the enlarged photo intruded into Feature 02 text. The attempt was not accepted.

Repair after fresh live read:
- `CF_SUPPORT_PHOTO_1 / 682:155` remains hidden
- `CF_SUPPORT_PHOTO_2 / 682:156` repaired to `222 × 154`, positioned at `(548,608)`, rotation `1.8°`
- second whole-spread and actual-size front screenshots show clear separation from Feature 02/03

Expected improvement:
Less scrapbook duplication, stronger single-support-photo hierarchy, and more believable Japanese magazine collage behavior.

Regression risk:
Too much subtraction could make the hero lower-right feel empty; screenshot evidence shows the single cafe image still provides an editorial counterweight without covering the feature index.

## Fresh X structure QA

- visible native text: `40`
- visible IMAGE fills: `7`
- same-parent visible text overlaps: `0`
- fold guide `682:161`: visible, `2 × 1122.5`
- Current outer still `77:18`; Current hero hash unchanged: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

Verified visible X hashes:
- back main `682:6` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `682:18` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `682:22` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- temporary hero `682:130` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- logo `682:135` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `682:136` → `0cbbf09357938365c2550f08928be1db33fa6060`
- single support cafe `682:156` → `c1ada11205bc3978bf426b304d683f1c1566cac2`

The temporary hero remains a layout comparator only and is not counted as V5-01.

## Adoption state

- generated images this run: none
- Q60 Drive master readback: yes
- Q60 placed in Figma: **no**
- W placed and visually verified: yes
- X placed and visually verified: yes
- failed X overlap state: rejected and repaired
- X structure QA: pass (`40 text / 7 images / 0 overlaps / fold 2 × 1122.5`)
- Current outer/inside promotion: no
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V6 production: remains closed

## Learning result

**Visible problem:** after a large clean-room redesign, two subtle legacy artifacts still degraded quality: unreadable microtype created by subtraction without contrast re-check, and repeated photography reused as decorative collage.

**Principle/capability tested:** subtraction must be followed by actual-size legibility QA; duplicate imagery should be removed before adding new decoration. One strong support photo is better than two when the second merely repeats a major image elsewhere in the spread.

**Expected improvement:** better print legibility, less AI/template collage feeling, cleaner photo hierarchy, and stronger whole-spread editorial coherence.

**Regression risk:** enlarging a remaining support image can collide with index typography; every collage-scale change requires screenshot review plus structural intersection QA.

**Screenshot/structure evidence:** W whole spread; X first screenshot exposing overlap; X repaired whole spread; X actual-size front; final `40 text / 7 images / 0 overlaps / fold 2 × 1122.5`.

**Status:** `TESTED / X_STRONGEST_THIS_RUN / CURRENT_NOT_PROMOTED`.

**Next application:** keep X as the leading outer comparator. Do not promote until the real Q60 binary replaces temporary hero `682:130` and wins whole-item, page, actual-size, crop-integrity, and print QA. If binary ingress remains blocked, continue only independent high-value visual defects; do not close V5 or start V6 early.