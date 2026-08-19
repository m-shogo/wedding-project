# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_FH_PREFERRED / PROFILE_QA_FG_PREFERRED / STORY_CHRONOLOGY_EN_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_FB_PREFERRED / ONE_DAY_PLAN_FA_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_NODE_LIVENESS_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer FH `1854:2` — back `1854:3`; front `1854:51`.
- Profile / Q&A FG `1851:2` — Profile `1851:3`; Q&A `1851:47`.
- Story / chronology EN `1773:2` — chronology `1773:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe FB `1843:2` — Cafe `1843:3`.
- Yokohama 1DAY Plan FA `1840:2` — right `1840:33`.

Start Here `845:27`:

`V5 FU/FX · V6 FH + FG/EN + EW MEMORY SPOTS + FB CAFE & TABLE + FA 1DAY PLAN · V7 HOLD`

Hidden rollback / comparison state relevant to the latest run:

- EZ `1836:2` — hidden rollback before FH.
- ET `1817:2` — hidden rollback used to restore missing FC-equivalent Profile/Q&A state as FG.
- AH `1683:2` — hidden old study; no longer left visible beside the current Outer.
- ES `1811:2` — hidden old candidate; no longer left visible beside the current Outer.
- EU `1818:2`, EY `1835:2`, EV `1821:2`, EX `1831:2` remain preserved historical rollbacks/comparisons.
- V7 was not edited.

## Latest verified progress

### FG — live preferred Profile / Q&A restoration

A fresh live Figma lookup found that the GitHub-declared preferred FC `1846:18` no longer existed, even though the verified hidden rollback ET `1817:2` remained intact. Because live Figma outranks status prose, FC was not treated as a valid current node.

Rollback-safe FG `1851:2` was reconstructed from ET and only the already-verified FC reader-facing Japanese microcopy was reapplied:

- `MEMORIES FROM OUR JOURNEY` → `ふたりの旅の記憶`
- `DINNER NOTE / FAVORITE SCENE` → `旅の途中の、好きな一皿。`
- `NEXT TRIP / FEATURE` → `つぎの旅で、やりたいこと。`
- `OUR NEXT CHAPTER` → `ふたりの次の章へ`
- `TO BE CONTINUED / OUR JOURNEY` → `これからも、ふたりの旅はつづく。`

The support-photo caption was restored to the cream field below the photo for actual-size readability. Q&A answers, Profile geometry, photographs, crops, image hashes and replaceable-photo roles were not changed.

Final FG evidence:

- whole spread: PASS
- actual-size Q&A `1851:47` = `794×1123`: PASS
- Profile `1851:3`: native text `25` / IMAGE `4` / text collisions `0` / 18px safe-area risks `0`
- Q&A `1851:47`: native text `30` / IMAGE `2` / text collisions `0` / 18px safe-area risks `0`

Status: `LIVE_PREFERRED_LIVENESS_RESTORED / VERIFIED_LOCAL`.

### FH — back-cover native editorial chronology

Same-scale review found EZ's upper back-cover photograph strong, but its lower chronology still read as a small timeline/UI module because several short colored rules and a filled navy WEDDING terminal field remained under the photo.

Rollback-safe FH `1854:2` tested subtraction and native hierarchy only:

- hide redundant magenta/cyan/yellow chronology rule fragments;
- hide the filled navy WEDDING terminal field and its yellow top rule;
- retain `01 / 03 / 05` as large unequal native milestones;
- retain `02 / 04` as quiet bridge beats;
- rebuild `06 / 2026.10.24 / WEDDING` as native typography directly on cream;
- preserve the dominant back photo, front cover, all photo sources and image hashes.

The first FH state was **not adopted**. QA found:

1. `06` had been cloned to the Figma page level instead of inside the back-page frame.
2. `2026.10.24` and `WEDDING` inherited white text fills from the removed dark terminal field and became low-contrast on cream.
3. after the first containment/contrast repair, structural QA still found two contacts between `06` and date/WEDDING.

The failed color-fix script itself was atomic and made no partial mutation because a name lookup was wrong. Direct node-ID readback was used before the corrected write.

Final FH repair:

- `06` reparented into back page `1854:3`;
- `06` uses existing Rurubu magenta;
- date and WEDDING use existing Rurubu navy;
- a clean typographic gutter separates `06` from the date/WEDDING stack.

Final FH evidence:

- whole spread 700px: PASS
- whole spread 1200px: PASS
- back `1854:3` actual-size `794×1123`: PASS
- back native text `25`; front native text `13`
- text collisions `0` on both pages
- 18px text safe-area risks `0` on both pages
- visible page-level stray milestone nodes after repair `0`
- image-source/hash changes `0`

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FH-FG-LIVE-RESTORE-CHRONOLOGY-QA-2026-08-19.md`.
Learning: `RSL-122` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-122-container-subtraction-context-revalidation.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-fh-fg-live-restore.md`.

### FA — 1DAY photo-led stop hierarchy

FA remains verified and unchanged. It preserves all stop copy, chronology, image hashes and replaceable-photo semantics while assigning unequal photo responsibility:

- STOP01 compact `238×210`, source `240×220`;
- STOP02 dominant `480×290`, source `810×552`;
- STOP03 bridge `290×220`, source `352×368`;
- STOP04 closing `480×220`, source `732×498`.

Final FA: 900px whole PASS; 1200px reading PASS; right `1840:33` actual-size `794×1123` PASS; native text `25`; collision `0`; 18px safe-area risk `0`; image intrinsic violations `0/4`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FA-1DAY-PHOTO-LED-STOPS-QA-2026-08-19.md`.
Learning: `RSL-120` in `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-120-unequal-photo-mass-itinerary-rhythm.md`.

### FB — Cafe composed-raster intrinsic-safe correction

FB remains verified and unchanged. It keeps the composed Cafe travel texture source-safe at `720×448` from a `720×860` source while preserving native copy, opacity, Yokohama view photo, Table page and image hashes.

Final FB: 1200px whole PASS; Cafe `1843:3` actual-size `794×1123` PASS; native text `17`; collision `0`; 18px safe-area risk `0`; Cafe intrinsic violations `0/2`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FB-CAFE-INTRINSIC-SAFE-TEXTURE-QA-2026-08-19.md`.

### EN / EW

Story/chronology EN and Memory Spots EW remain live preferred and unchanged in the FH/FG experiment. Their existing verified evidence remains authoritative.

## Shared-learning input used this run

- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`, Rurubu feed and neutral non-Rurubu feed were read before writes.
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`.
- the neutral non-Rurubu feed was consumed only for general QA/process hypotheses; no literal layout, palette, asset or current-state conclusion was transferred.
- no non-Rurubu item-specific Figma, Drive, asset, ledger, GitHub production path or production state was inspected or copied.

## Drive / asset truth

Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Latest run:

- newly generated assets: `0`
- adopted generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`
- image-source changes: `0`
- native variable text preserved: YES
- replaceable photo roles preserved: YES
- rollback states preserved: YES
- V7 touched: NO

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 FH + FG/EN + EW + FB + FA = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Reconcile exact live preferred IDs before every write; do not trust a preferred ID merely because GitHub says it exists.
3. Continue same-scale six-spread review and attack screenshot-visible weak regions before cosmetic additions.
4. Revalidate inherited text fill/contrast, grouping and parent containment whenever a field/container is removed.
5. Audit generic scaffold/template microcopy at actual size, but preserve intentional English branding/navigation where it has a real editorial role.
6. Revalidate dynamic native copy after material spatial/typography changes.
7. Continue semantic photo-repetition reduction only where a photo role is not essential evidence; never substitute unrelated imagery merely to reduce counts.
8. Keep photo frames/rules/support geometry only where they prove a binding or separation function.
9. Prefer unequal editorial responsibility among repeated content/photo roles when equal mass creates module rhythm; rerun actual-size and source-fidelity QA after geometry changes.
10. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
11. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
