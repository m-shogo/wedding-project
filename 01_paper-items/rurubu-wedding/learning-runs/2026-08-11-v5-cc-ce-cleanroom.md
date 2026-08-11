# Rurubu V5 learning run — CC/CE clean-room editorial QA

Date: 2026-08-11
Scope: Rurubu WEDDING only
Authority: live Figma + Drive readback + GitHub main

## Authority and safety before writes

- GitHub main was re-read from latest commit `9b0d03f3e21e2d4ab935f57cb503ae39e6cb9aaf` before this write.
- Drive Current Authority was re-read. Production Figma remains `bfM0d4c9dCeBv5pCkJ3TNM`; working print target remains A4 two-fold / 420×297mm trim, 426×303mm working bleed, center fold 210mm, 3mm outer bleed and 3mm important-element inset.
- Current outer `77:18` and Current inside `77:290` were re-read live and never mutated.
- BY `796:2` and BZ `798:2` were re-read at whole-spread scale before clean-room writes.

## Q60 cover authority / blocker

Fresh Drive raw readback materialized `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg` from Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` as a JPEG. Runtime bytes remain `155,439` with the previously verified SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.

A fresh Figma `upload_assets` single-use target was obtained for rollback-safe staging hero `794:133`, but the execution container still could not reach the `mcp.figma.com` POST endpoint. The failed transport was not counted as placement. Per the repeated-method rule, the same POST route was not retried further in this run.

Strict state: Drive verified/materialized = YES; exact Q60 Figma placement = NO; Q60 screenshot/crop QA = NO.

## Inside progression — BZ → CA → CC

### Visible problems

BZ's upper history photograph was strong, but its Memory Spots lower half still read like a pale-blue application/content zone: a broad cream title strip, colored number boxes, and a separate background field weakened photographic continuity. The left-page common-point section also still used a broad yellow banner that behaved like a UI callout.

### CA experiment

Candidate `800:2` — `V5_INSIDE_RURUBU_CLEANROOM_CA_MEMORY_PHOTO_BLEED_2026_08_11`.

Principle tested: subtract container geometry first, then rebuild hierarchy from photography + native Japanese typography.

Changes:
- right lower background changed from pale blue to warm ivory to unify the spread;
- broad Memory Spots cream strip hidden, preserved for rollback;
- main memory photo enlarged to `592×352`; satellites changed to `226×150` and `260×170` with unequal rotations;
- number background boxes hidden; semantic number text retained with restrained magenta/cyan/orange accents;
- heading enlarged/direct on the page and native captions repositioned around the photo collage;
- all six accepted image hashes preserved.

Regression handling:
- first structure QA detected `PAGE_BOTTOM_BAR_TXT ↔ IA_MEMORY_4_CITY` and `IA_MEMORY_1_NO ↔ IA_MEMORY_1_TITLE` collisions;
- after repair, a second QA exposed `IA_MEMORY_4_BODY ↔ IA_MEMORY_4_CITY`;
- the existing city text was converted to a small on-photo editorial caption instead of adding another box.

Final CA evidence:
- whole-spread screenshot reviewed;
- right-page actual-size screenshot reviewed at natural `794×1123`;
- right-page visible text intersections: `0`;
- IMAGE fills: `6`, accepted hashes preserved;
- fold guide `800:283`: x=`792.7000122070312`, width `2`, height `1122.5`.

### CC experiment

Candidate `801:2` — `V5_INSIDE_RURUBU_CLEANROOM_CC_COMMONPOINT_SUBTRACTION_2026_08_11`.

Visible problem: CA left page still had one broad yellow banner, producing a card/callout silhouette inconsistent with the more editorial right page.

Principle tested: reduce a broad color field to a small print accent while keeping the native semantic text.

Changes:
- existing yellow tape was not deleted; it was reduced to an `8×70` vertical accent;
- `ふたりの共通点` retained as native text and changed to a small magenta editorial label;
- `旅 × 写真 × HAWAII / 好きが重なるところ。` remains native text, direct on warm ivory at 22px;
- no new card, badge, gradient, image, or generated asset.

Final CC evidence:
- whole-spread screenshot: compared against BZ and CA; broad yellow-card silhouette is gone;
- reading/page scale: left-page hierarchy remains clear while matching the photo-led right page better;
- structure QA: visible native text `54`, text-text intersections `0`;
- IMAGE fills `6`, hashes unchanged:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 1 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 2 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 4 `c09aa82e7b2ac75708707345c6f845452bf67663`
- fold guide `801:283`: x=`792.7000122070312`, width `2`, height `1122.5`.

Decision: **ADOPT CC over BZ/CA as the strongest inside comparison candidate, not production Current.**

## Outer progression — BY → CB → CD → CE

### Visible problems

BY still exposed the known soft/pixelated Yokohama hero over `820px` of vertical cover space and retained a small cream paper block around feature 01. Even after previous clean-room passes, the lower front cover still read as a designed module rather than a forceful editorial feature floor.

### CB experiment

Candidate `800:467` — `V5_OUTER_RURUBU_CLEANROOM_CB_COVER_BOUNDED_HERO_DIRECT_FEATURES_2026_08_11`.

Changes:
- same semantic Yokohama hero retained but bounded from 820px to 700px height as mitigation only, not a raster pass;
- feature-01 paper hidden, retained for rollback;
- 01 typography placed directly on warm ivory;
- 02/03 photographs moved into overlapping editorial positions.

One initial creation script failed atomically because `CE_FOOTER` is a rectangle rather than text. No canvas mutation occurred; the corrected script was then applied.

CB improved card subtraction but left too much quiet ivory around 01, so it was not selected as the final comparator.

### CD experiment

Candidate `800:650` — `V5_OUTER_RURUBU_CLEANROOM_CD_AGGRESSIVE_FEATURE_PHOTO_OVERLAP_2026_08_11`.

Principle tested: aggressive but intentional overlap and materially different photo scale rather than filling whitespace with new decoration.

Changes:
- 02 enlarged to `380×246`, rotation `-4.8°`;
- 03 enlarged to `416×250`, rotation `+4.2°`;
- existing native feature numbers/headlines placed directly on those photos;
- no additional cards, gradients, stickers, badges, or copy.

Regression handling:
- structure QA detected `CE_FEATURE_1_NO ↔ CE_FEATURE_1` and `CE_FEATURE_1 ↔ CE_FEATURE_2_NO`;
- positions/widths were repaired and re-read; final CD text intersections = `0`.

### CE experiment

Candidate `801:284` — `V5_OUTER_RURUBU_CLEANROOM_CE_FEATURE01_SCALE_HIERARCHY_2026_08_11`; front page `801:413`.

Visible problem: CD still had a timid 01 relative to the photo-led 02/03 collage and left a weak lower-left silhouette.

Principle tested: varied editorial scale, using hierarchy rather than another box or filler decoration.

Changes:
- existing `01` enlarged to 92px and given materially greater visual weight;
- existing feature-01 headline enlarged to 34px;
- existing descriptor kept small, producing a print-like title/deck relationship;
- 02/03 aggressive photo overlap preserved.

Regression handling:
- first CE structure readback detected one collision `CP_FEATURE_1_DESC ↔ CE_FEATURE_3_NO`;
- descriptor width reduced from 260 to 212 without changing copy;
- final structure QA returned `37` visible native text nodes and `0` text-text intersections.

Final CE evidence:
- whole-spread screenshot compared against BY/CD;
- front-page actual-size screenshot reviewed at natural `794×1123`;
- hero remains `793.7×700`, same known temporary hash `539c259be8036b481d06b4f76db9a39b407d90e8` — therefore visual softness remains an open dominant-raster defect;
- IMAGE fills `7`; known hashes retained, including date badge and article photos;
- fold guide `801:466`: x=`792.7000122070312`, width `2`, height `1122.5`.

Decision: **ADOPT CE over BY/CB/CD as the strongest outer comparison candidate, not production Current.** The smaller hero footprint is mitigation, not acceptance of the raster.

## Reusable Rurubu lessons

1. When a page still feels like an app after card subtraction, inspect the page-level background field itself; a tinted content zone can preserve dashboard grammar even without rounded cards.
2. Small number boxes often recreate UI badges. In editorial layouts, keep the number as native typography and let proximity/scale carry the relationship.
3. A broad highlight banner should earn its area. If the message is short, a narrow print accent plus direct type is often stronger and less synthetic.
4. Empty editorial space is not automatically premium whitespace. On an energetic travel-magazine cover, resolve timid space first by increasing hierarchy or photo overlap, not by adding more widgets.
5. A low-resolution dominant image can be bounded to reduce damage, but that is mitigation only; never convert it into a raster-quality PASS.
6. Every typography enlargement must be followed by structure collision QA; visual screenshots alone missed several small overlaps in this run.

## Gate state after run

- Generated new images: `0`.
- Newly adopted generated images: `0`.
- CC inside: placed in safe duplicate + whole/page/detail visual review + structure QA passed.
- CE outer: placed in safe duplicate + whole/page/detail visual review + structure QA passed.
- Current outer `77:18`: unchanged.
- Current inside `77:290`: unchanged.
- Q60: Drive verified/materialized; exact Figma placement **NO**; exact Figma visual QA **NO**.
- V5 photo-role gate remains `9/10`, dominant-photo gate `2/3` until Q60 closes.
- V5: **not complete**.
- V6 production: **not started**.