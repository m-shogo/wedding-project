# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EZ_PREFERRED / PROFILE_QA_ET_PREFERRED / STORY_CHRONOLOGY_EN_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_EY_PREFERRED / ONE_DAY_PLAN_EU_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EZ `1836:2` — front `1836:51`.
- Profile / Q&A ET `1817:2` — Profile `1817:3`.
- Story / chronology EN `1773:2` — chronology `1773:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe EY `1835:2` — Cafe `1835:3`.
- Yokohama 1DAY Plan EU `1818:2` — left `1818:3`; right visually unchanged.

Start Here `845:27`:

`V5 FU/FX · V6 EZ + ET/EN + EW MEMORY SPOTS + EY CAFE & TABLE + EU 1DAY PLAN · V7 HOLD`

Rollback/rejected comparisons remain preserved. EV `1821:2` and EX `1831:2` are hidden rollbacks. V7 was not edited.

## Latest verified progress

### EZ — Outer selective photo-frame subtraction

Same-scale review showed the lower front-cover photography still reading partly as two similarly framed photo cards. The two roles did not need the same treatment: the smaller rotated Cafe photo still benefits from a white separation frame, while the larger Dining support is strong enough to work edge-led.

EZ preserves all photography, image hashes, masthead and native copy. It changes only the dominant Dining support treatment:

- Dining white frame removed;
- Dining geometry refined to `543.7×327`, rotation `0.6°`, still source-safe against the previously reconciled `732×498` source;
- Cafe support retains its functional 6px white frame;
- no new photo, raster, generated asset, Drive save, external binary placement, copy or image hash.

Final EZ: 500px whole thumbnail PASS; 1200px whole spread PASS; front `1836:51` actual-size `794×1123` PASS; visible native text 13; text collision 0; 18px safe-area risk 0; overflow 0.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EZ-OUTER-SELECTIVE-PHOTO-FRAME-SUBTRACTION-QA-2026-08-19.md`.
Learning: `RSL-119` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-119-selective-photo-frame-subtraction.md`.

### EY — Cafe native closing feature

EX had already improved the Cafe middle field, but the lower quarter still read as residual template space. Rather than adding another photo/card, EY strengthens the existing native closing line `好きな店が、旅の目的地になる。` into a true closing beat.

EY preserves every photo/hash, the composed travel texture and the full Table page. It changes only native hierarchy/position in the Cafe closing area:

- closing quote enlarged to 32px with deliberate two-line cadence;
- existing accent rule moved to bind the closing beat;
- existing `CAFE CHECK / 02` remains reader-facing native information;
- no new photo, raster, generated asset, Drive save, external binary placement or image hash.

Final EY: 500px whole thumbnail PASS; 1200px whole spread PASS; Cafe `1835:3` actual-size `794×1123` PASS; visible native text 17; text collision 0; 18px safe-area risk 0; overflow 0.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EY-CAFE-NATIVE-CLOSING-FEATURE-QA-2026-08-19.md`.
Learning: `RSL-118` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-118-native-closing-cadence-before-more-media.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-ey-ez-editorial-closing-and-frame-subtraction.md`.

### EW — Memory Spots redundant-copy subtraction + stronger SPOT02 photo beat

EW removes redundant SPOT02 helper copy, strengthens the existing pullquote, and enlarges the same verified SPOT02 photo to `430×355`. Final 500px/1200px/actual-size QA PASS; collision 0; 18px safe risk 0; image intrinsic violations 0/4.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EW-MEMORY-SPOT02-COPY-SUBTRACTION-QA-2026-08-19.md`.
Learning: `RSL-116`.

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
- Cafe native hierarchy changed only; photo/texture hashes unchanged
- Outer dominant support frame/geometry changed only; photo hashes unchanged
- native variable text preserved: YES
- replaceable photo roles preserved: YES
- rollback states preserved: YES
- V7 touched: NO

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EZ + ET/EN + EW + EY + EU = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile live preferred IDs before every write.
3. Continue same-scale six-spread review and attack screenshot-visible weak regions before cosmetic additions.
4. Revalidate dynamic native copy after any material spatial or typography change.
5. Continue semantic photo-repetition reduction only where the photo role is not essential evidence; never substitute unrelated imagery merely to reduce counts.
6. Keep photo frames only where they still perform separation/binding work; never apply frame removal globally.
7. If a page end feels unfinished, test existing native closing cadence before adding another photo/card.
8. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
