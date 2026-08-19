# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EV_PREFERRED / PROFILE_QA_ET_PREFERRED / STORY_CHRONOLOGY_EN_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_EX_PREFERRED / ONE_DAY_PLAN_EU_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EV `1821:2` — back `1821:3`.
- Profile / Q&A ET `1817:2` — Profile `1817:3`.
- Story / chronology EN `1773:2` — chronology `1773:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe EX `1831:2` — Cafe `1831:3`.
- Yokohama 1DAY Plan EU `1818:2` — left `1818:3`; right visually unchanged.

Start Here `845:27`:

`V5 FU/FX · V6 EV + ET/EN + EW MEMORY SPOTS + EX CAFE & TABLE + EU 1DAY PLAN · V7 HOLD`

Rollback/rejected comparisons remain preserved. ER `1805:134` is the latest Cafe rollback. V7 was not edited.

## Latest verified progress

### EX — Cafe denser editorial field

Same-scale comparison showed ER Cafe remaining quieter than the photo-led Table page. The middle composed travel texture existed, but the right half carried little reader-facing information, so the page still read partly as underused template space.

EX preserves all photography, image hashes, the full Table page, native text editability and image replaceability. It changes only the Cafe editorial field:

- existing composed travel texture expanded from `720×430` to `793.7×448` and opacity `0.20 → 0.30`;
- existing native `01` strengthened `92px → 104px`;
- existing native Cafe metadata redistributed to the right half as a readable two-line editorial block;
- no new card, photo, raster, generated asset, Drive save, external binary placement or image hash.

The first metadata variant was rejected because it became micro/production-note-like. A later placement produced a real title/metadata collision; that was corrected before promotion.

Final EX: 1200px whole spread PASS; Cafe `1831:3` actual-size `794×1123` PASS; text collision 0; 18px safe-area risk 0; right Table page unchanged.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EX-CAFE-DENSER-EDITORIAL-FIELD-QA-2026-08-19.md`.
Learning: `RSL-117` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-117-composed-texture-plus-native-metadata-density.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-ex-cafe-density.md`.

### EW — Memory Spots redundant-copy subtraction + stronger SPOT02 photo beat

EW removes redundant SPOT02 helper copy, strengthens the existing pullquote, and enlarges the same verified SPOT02 photo to `430×355`. Final 500px/1200px/actual-size QA PASS; collision 0; 18px safe risk 0; image intrinsic violations 0/4.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EW-MEMORY-SPOT02-COPY-SUBTRACTION-QA-2026-08-19.md`.
Learning: `RSL-116`.

### EV — Outer repeated-photo reduction via native editorial copy

EV removes one redundant support skyline role and uses native editorial copy on an existing legitimate photo surface instead. Whole/actual-size QA PASS; collision 0; 18px safe risk 0.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EV-OUTER-TEXT-ONLY-MEMORY-ROUTE-QA-2026-08-19.md`.
Learning: `RSL-115`.

### EU — 1DAY Plan lower editorial feature

EU strengthens the lower left-page utility area using native editorial hierarchy rather than another photo/card. Whole/actual-size QA PASS after correcting two real text contacts.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EU-1DAY-LOWER-EDITORIAL-FEATURE-QA-2026-08-19.md`.
Learning: `RSL-114`.

## Drive / asset truth

Drive root reverified this run: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Latest run:
- newly generated assets: 0
- adopted generated assets: 0
- new Drive saves: 0
- new external binary placements: 0
- new image hashes: 0
- image-source changes: 0
- Cafe texture geometry/opacity changed only; source hash unchanged
- native variable text preserved: YES
- replaceable photo roles preserved: YES
- rollback states preserved: YES
- V7 touched: NO

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EV + ET/EN + EW + EX + EU = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile live preferred IDs before every write.
3. Continue same-scale six-spread review and attack screenshot-visible weak regions before cosmetic additions.
4. Revalidate dynamic native copy after any material spatial or typography change.
5. Continue semantic photo-repetition reduction only where the photo role is not essential evidence; never substitute unrelated imagery merely to reduce counts.
6. Treat composed texture as useful only when reader-facing hierarchy/information actually uses the field; reject microtext that looks like production annotation.
7. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
8. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
