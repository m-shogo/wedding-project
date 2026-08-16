# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Y_CURRENT / INSIDE_CF_CE_PREFERRED_STUDIES / PHOTO_BOUND_BACK_CLOSURE_VERIFIED / EDITORIAL_FOLIO_COHESION_VERIFIED / JAPANESE_TYPOGRAPHY_COHESION_VERIFIED / TIMELINE_BOUNDED_TEXTURE_PLUS_RHYTHM_PRESERVED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here:

`V5 FU/FX · V6 Y + CF/CE INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer Y `1542:2` — `PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`.
- Profile / Q&A CF `1538:2` — `PREFERRED / V6_INSIDE_CF_JAPANESE_TYPOGRAPHY_COHESION_2026_08_17`.
- Story / chronology CE `1535:78` — `PREFERRED / V6_INSIDE_CE_EDITORIAL_FOLIO_COHESION_2026_08_17`.

Immediate rollback:

- Outer W `1491:2` — hidden as `ROLLBACK_HIDDEN / V6_OUTER_W_PRE_Y_PHOTO_BOUND_CLOSURE_2026_08_17`.
- CD `1535:2` — hidden as `ROLLBACK_HIDDEN / V6_INSIDE_CD_PRE_CF_JAPANESE_TYPE_2026_08_17`.
- CB `1527:2` — older hidden rollback before CD.
- CA `1517:2` — hidden rollback before CE.
- CC `1534:2` — rejected/hidden small snapshot-caption experiment.

Older comparison/proof frames remain preserved. V7 remains HOLD and was not edited.

## Outer Y — photo-bound back-cover closure

### Visible defect

At whole-item scale Outer W had a strong front cover and technically sound back cover, but the back still read as `top photo field → separate lower timeline information area`. The cafe/memory photo stopped before the chronology and the lower cream field therefore behaved like a secondary UI/info panel rather than the continuation of a magazine page.

### Root-cause hypothesis

The remaining weakness was not missing information or missing decoration. The existing verified secondary photography was under-weighted. Promoting the cafe image into a larger page-binding photo field and attaching `みんなとの思い出` directly to that field could reduce the section break while keeping the chronology native, editable and readable.

### Bounded treatment

Outer Y duplicates W and changes only back-cover composition:

- existing cafe photo `c1ada11205bc3978bf426b304d683f1c1566cac2` becomes a larger `552×320` secondary feature starting at the left bleed;
- existing skyline postcard `644f449c3bf2001a94d4b822d2b55e2614c11042` remains near intrinsic size at `232×210`, with a small editorial rotation;
- the existing dark `みんなとの思い出` strip is bound directly to the photo field;
- chronology title/rules move immediately beneath the photo field;
- the five pre-wedding events remain native text in an asymmetric compact rhythm;
- the WEDDING terminal remains a strong navy closure with its yellow edge;
- front cover, masthead, hero, front image hashes and all CF/CE interior pages remain unchanged.

No new image, card, gradient, shadow, generated decoration or raster source was added.

### Verification

- Y whole item 500px: PASS and stronger than W; back reads as photo → memory → chronology → WEDDING instead of two detached sections.
- Y back actual-size `1542:3` = 794×1123: PASS after one correction.
- Initial Y study exposed the chronology title over the enlarged photo at actual size; the candidate was not accepted in that state. Cafe height was corrected from `344 → 320`, and the memory/title/rule start was moved onto the cream field before promotion.
- final visible back native text: `18`;
- absolute text collision: `0`;
- 18px text safe-area risk: `0`;
- all three visible back images are within registered intrinsic dimensions:
  - flatlay `793.7×490` ≤ `944×608`;
  - cafe `552×320` ≤ `810×552`;
  - skyline `232×210` ≤ `240×220`.

## CF Japanese typography cohesion retained

CF remains unchanged from the previously verified pass. The two Japanese closing-copy nodes remain Noto Sans JP rather than accidental Inter fallback. Whole-spread and actual-size QA remain valid because Outer Y did not mutate CF.

Post-promotion preferred-book audit intent remains:
- Japanese native copy uses the intentional Japanese family established by CF/CE;
- no new Japanese node was created in Y.

## Editorial folio cohesion retained

CF/CE retain the recurring native folios:

- `02 PROFILE / FAVORITES`;
- `03 Q&A / MEMORIES`;
- `04 OUR STORY / JOURNEY`;
- `05 TRAVEL TIMELINE`.

The page-05 folio remains light cream on the dark WEDDING ending band. Outer Y does not modify any interior folio.

## Structure / visual state

CF remains:
- Profile: native text `18`, IMAGE roles `4`, text collision `0`, 18px text safe-area risk `0`;
- Q&A: native text `26`, IMAGE roles `3`, text collision `0`, 18px text safe-area risk `0`.

CE remains:
- Story: native text `12`, IMAGE roles `4`, text collision `0`, 18px text safe-area risk `0`;
- Timeline: native text `31`, IMAGE roles `5`, text collision `0`, 18px text safe-area risk `0`.

Representative Profile/Q&A values remain layout-evaluation dummy content, not final personal facts.

## Photo-diversity / provenance state

The preferred dummy studies still reuse some photo hashes across the book. Same-scope alternatives previously inspected do not justify lowering identity, provenance or resolution quality merely to increase variety. Recognizable generic/generated people must not be represented as the real couple. The replaceable-photo contract remains the correct path for final legitimate photography later.

Outer Y uses only existing verified Rurubu image hashes; no provenance state changed.

## Drive / generated section masters

V6 Drive root was re-read on 2026-08-17:
- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Timeline generated masters remain present, including:
- Timeline V1 `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`;
- Timeline v2 `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`.

Previously registered Profile/Q&A/Memories generated masters remain authoritative-but-unadopted. No material change to the known quality-preserving external binary-placement constraint was observed, so unchanged failed transport methods were not repeated.

## Evidence

Latest:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CF-CE-PHOTO-BOUND-BACK-CLOSURE-QA-2026-08-17.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-059-photo-bound-back-closure.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-y-cf-ce.md`.

Still relevant:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CF-CE-JAPANESE-TYPOGRAPHY-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CD-CE-EDITORIAL-FOLIO-QA-2026-08-17.md`.

## Asset lifecycle truth of latest pass

- newly image-generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new distinct raster bytes: `0`;
- image hashes changed: `0`;
- existing verified back-cover photography recomposed: `YES`;
- native text preserved: `YES`;
- replaceable image semantics preserved: `YES`;
- whole-item visual verification: `PASS`;
- actual-size back verification: `PASS`;
- structure / safe-area verification: `PASS`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Learning

### RSL-059
When a print page is still split into a dominant photo region and a detached information region, first test whether a legitimate existing secondary image can become a page-binding field before adding another container or ornament. The image should bind the adjacent headline/section and reduce the false section boundary; chronology/facts can remain native and editable below it.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Do not transfer Outer Y's exact crop, dimensions, palette, Yokohama photography, event geometry or Rurubu editorial grammar.

## Completion gate

Do not call V6 complete or print-ready until:
- Y + CF/CE cohere with final real content as one magazine system;
- final personal copy replaces dummy content and final-copy stress is rerun;
- final legitimate photography replaces stand-in/repeated roles where applicable and crop/contrast are rerun;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 Y + CF/CE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Treat final legitimate photography as the largest remaining visual-quality lever; do not substitute low-resolution or identity-unsafe imagery simply to increase variety.
3. Replace final Profile/Q&A dummy copy later and rerun realistic long-copy/safe-area proof.
4. Keep generated section masters in Drive as unadopted until a quality-preserving placement path and actual-size visual pass exist.
5. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
