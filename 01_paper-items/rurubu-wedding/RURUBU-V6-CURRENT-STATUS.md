# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EZ_PREFERRED / PROFILE_QA_FC_PREFERRED / STORY_CHRONOLOGY_EN_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_FB_PREFERRED / ONE_DAY_PLAN_FA_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EZ `1836:2` — front `1836:51`.
- Profile / Q&A FC `1846:18` — Profile `1846:19`; Q&A `1846:63`.
- Story / chronology EN `1773:2` — chronology `1773:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe FB `1843:2` — Cafe `1843:3`.
- Yokohama 1DAY Plan FA `1840:2` — right `1840:33`.

Start Here `845:27`:

`V5 FU/FX · V6 EZ + FC/EN + EW MEMORY SPOTS + FB CAFE & TABLE + FA 1DAY PLAN · V7 HOLD`

ET `1817:2` is preserved as hidden rollback before FC. EU `1818:2` and EY `1835:2` are preserved as hidden rollbacks. EV `1821:2` and EX `1831:2` remain hidden rollbacks. V7 was not edited.

## Latest verified progress

### FC — Q&A reader-facing Japanese editorial microcopy

Same-scale review found the Profile/Q&A spread structurally healthy but still carrying several small generic English helper labels that read like template/AI scaffolding at actual size.

Rollback-safe FC changes native helper microcopy only:

- `MEMORIES FROM OUR JOURNEY` → `ふたりの旅の記憶`
- `DINNER NOTE / FAVORITE SCENE` → `旅の途中の、好きな一皿。`
- `TO BE CONTINUED / OUR JOURNEY` → `これからも、ふたりの旅はつづく。`
- `OUR NEXT CHAPTER` → `ふたりの次の章へ`
- `NEXT TRIP / FEATURE` → `つぎの旅で、やりたいこと。`

The support-photo caption was moved from the image edge to the cream field directly below the photo for actual-size legibility. Q&A answers, photos, crops, image hashes, Profile geometry and replaceable-image roles remain unchanged.

Final FC: whole spread 1000px PASS; actual-size Q&A `1846:63` 794×1123 PASS; Profile native text 25 / IMAGE 4 / collisions 0 / 18px safe-area risks 0; Q&A native text 30 / IMAGE 2 / collisions 0 / 18px safe-area risks 0.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FC-QA-JAPANESE-EDITORIAL-CAPTIONS-QA-2026-08-19.md`.
Learning: `RSL-121` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-121-reader-facing-microcopy-over-template-labels.md`.

### FA — 1DAY photo-led stop hierarchy

Same-scale six-spread review showed the 1DAY right page as a weak remaining page. FA preserves all stop copy, chronology, image hashes and replaceable-photo semantics while assigning unequal photo responsibility:

- STOP01 compact `238×210`, source `240×220`;
- STOP02 dominant `480×290`, source `810×552`;
- STOP03 bridge `290×220`, source `352×368`;
- STOP04 closing `480×220`, source `732×498`.

Final FA: 900px whole PASS; 1200px reading PASS; right `1840:33` actual-size `794×1123` PASS; native text `25`; collision `0`; 18px safe-area risk `0`; image intrinsic violations `0/4`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FA-1DAY-PHOTO-LED-STOPS-QA-2026-08-19.md`.
Learning: `RSL-120` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-120-unequal-photo-mass-itinerary-rhythm.md`.

### FB — Cafe composed-raster intrinsic-safe correction

FB keeps the composed Cafe travel texture source-safe at `720×448` from a `720×860` source while preserving native copy, opacity, Yokohama view photo, Table page and image hashes.

Final FB: 1200px whole PASS; Cafe `1843:3` actual-size `794×1123` PASS; native text `17`; collision `0`; 18px safe-area risk `0`; Cafe intrinsic violations `0/2`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FB-CAFE-INTRINSIC-SAFE-TEXTURE-QA-2026-08-19.md`.

### EZ / EN / EW

Outer EZ, Story/chronology EN and Memory Spots EW remain live preferred and unchanged in the FC experiment. Their existing verified evidence remains authoritative.

## Shared-learning input used this run

- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- the neutral non-Rurubu feed was consumed only for general QA/process hypotheses; no literal layout, palette, asset or current-state conclusion was transferred;
- no non-Rurubu item-specific Figma, Drive, asset, ledger, GitHub production path or production state was inspected or copied.

## Drive / asset truth

Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Latest run:
- newly generated assets: 0
- adopted generated assets: 0
- new Drive saves: 0
- new external binary placements: 0
- new image hashes: 0
- image-source changes: 0
- native variable text preserved: YES
- replaceable photo roles preserved: YES
- rollback states preserved: YES
- V7 touched: NO

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EZ + FC/EN + EW + FB + FA = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile live preferred IDs before every write.
3. Continue same-scale six-spread review and attack screenshot-visible weak regions before cosmetic additions.
4. Audit generic scaffold/template microcopy at actual size, but preserve intentional English branding/navigation where it has a real editorial role.
5. Revalidate dynamic native copy after material spatial/typography changes.
6. Continue semantic photo-repetition reduction only where a photo role is not essential evidence; never substitute unrelated imagery merely to reduce counts.
7. Keep photo frames/rules/support geometry only where they prove a binding or separation function.
8. Prefer unequal editorial responsibility among repeated content/photo roles when equal mass creates module rhythm; rerun actual-size and source-fidelity QA after geometry changes.
9. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
