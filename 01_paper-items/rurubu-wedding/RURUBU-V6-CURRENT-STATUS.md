# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GB_PREFERRED / PROFILE_QA_GA_PREFERRED / STORY_CHRONOLOGY_FR_PREFERRED / MEMORY_SPOTS_FT_PREFERRED / GOURMET_CAFE_GC_PREFERRED / ONE_DAY_PLAN_FM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

All six current preferred spreads live on `845:2 / 00_RURUBU_START_HERE` as one review board:

- Outer GB `1929:2` — back `1929:3`; x `272000`, y `0`.
- Profile / Q&A GA `1922:2` — Profile page `1922:3`; x `273800`, y `0`.
- Story / chronology FR `1904:18` — chronology right `1904:44`; x `275600`, y `0`.
- Memory Spots FT `1912:2` — guide right `1912:24`; x `272000`, y `1300`.
- Gourmet / Cafe GC `1933:2` — Cafe page `1933:3`; x `273800`, y `1300`.
- Yokohama 1DAY Plan FM `1879:71` — x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GB + GA/FR + FT MEMORY SPOTS + GC CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

Rollbacks remain preserved hidden, including FO `1891:18`, FP `1895:18`, EW `1826:18`, FQ `1898:125`, FN `1866:2`, and rejected Cafe/Table study FS `1909:2`.

## Latest verified progress — GC Cafe source-safe overlapped view beat

### Visible problem

FN Cafe/Table was structurally safe, but the Cafe left page still read as `large travel-note texture → separate small Yokohama-view module → separate closing copy`. The small view photo began only after the composed field ended, so the page retained a false section break and modular/card-like reading.

### Root cause

The problem was not missing photography. The Yokohama view source was already near its safe display ceiling, so enlarging it would trade editorial hierarchy for image softness. The better test was whether the same legitimate replaceable photo could carry more editorial responsibility through controlled overlap rather than scale.

### Bounded visual test

Rollback-safe GC duplicated FN and changed only the Cafe left page:

- existing replaceable Yokohama view photo remained `238×218`, source/hash unchanged;
- photo moved `y=686 → 600` and rotation `-2.5° → -4°`, overlapping the lower edge of the travel-note field;
- native `02`, view title/copy/meta/check note moved upward into the same editorial beat;
- nonfunctional cyan `DECOR / CAFE_LABEL` was hidden;
- closing quote moved upward slightly to maintain page cadence;
- no new photo, generated asset, raster, Drive save, binary placement or image hash.

The first GC geometry improved the visual flow but created a 32px native-text overlap between `02` and the view title. It was not promoted in that state. The right text column was moved to x=382 and structure QA was rerun.

### Three-scale / structure evidence

- FN 1400px spread was reviewed before write;
- GC 1400px spread: PASS and stronger continuity than FN;
- GC Cafe actual-size `1933:3` = `794×1123`: PASS;
- visible Cafe native text: `21`;
- absolute text collisions after correction: `0`;
- 18px text safe-area risks: `0`;
- page-level stray nodes: `0`;
- view photo remains `238×218`, rotation `-4°`, existing hash/source role unchanged;
- FN preserved hidden rollback.

Learning: RSL-134 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GC-CAFE-OVERLAPPED-VIEW-BEAT-QA-2026-08-20.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gc-cafe-overlapped-view-beat.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-134-controlled-overlap-for-source-limited-photo.md`.

## Existing preferred verification retained

- GB retains readable major/minor back-cover milestones and actual-size verification.
- GA retains its verified readable Profile closing column and Q&A page.
- FR retains the boxless native chronology terminal and actual-size verification.
- FT retains the compact Spot 03 → dominant dining flow and actual-size verification.
- FM retains semantic 1DAY stop hierarchy and replaceable photos.

No internal design changes were made to GB / GA / FR / FT / FM in this run.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-134 is a local cross-item candidate, not a promoted visual rule.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Existing generated Profile / Q&A / Timeline / Memories masters remain stored and unadopted unless a quality-preserving placement path and actual-size QA are verified.

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback states preserved: YES;
- V7 touched: NO.

## Completion gate

Do not call V6 complete or print-ready until all of the following are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 GB + GA/FR + FT + GC + FM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Cafe photography remains an asset bottleneck: do not enlarge the current Yokohama view beyond source tolerance or substitute semantically unrelated imagery merely to add density.
5. Use controlled overlap only when it improves continuity without text/photo collision or source upscaling.
6. Keep major/minor repeated information unequal, but verify subordinate beats remain readable at actual size.
7. Continue subtraction only when contrast/binding/physical function can be replaced by hierarchy.
8. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
