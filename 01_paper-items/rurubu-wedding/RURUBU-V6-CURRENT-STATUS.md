# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_FO_PREFERRED / PROFILE_QA_GA_PREFERRED / STORY_CHRONOLOGY_FR_PREFERRED / MEMORY_SPOTS_FT_PREFERRED / GOURMET_CAFE_FN_PREFERRED / ONE_DAY_PLAN_FM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

All six current preferred spreads live on `845:2 / 00_RURUBU_START_HERE` as one 3×2 review board:

- Outer FO `1891:18` — x `272000`, y `0`.
- Profile / Q&A GA `1922:2` — Profile page `1922:3`; x `273800`, y `0`.
- Story / chronology FR `1904:18` — chronology right `1904:44`; x `275600`, y `0`.
- Memory Spots FT `1912:2` — guide right `1912:24`; x `272000`, y `1300`.
- Gourmet / Cafe FN `1866:2` — x `273800`, y `1300`.
- Yokohama 1DAY Plan FM `1879:71` — x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 FO + GA/FR + FT MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

FP `1895:18` is preserved hidden as the Profile/Q&A rollback. EW `1826:18` remains the earlier Memory Spots rollback. FQ `1898:125` remains an earlier chronology rollback. Rejected Cafe/Table study FS `1909:2` remains hidden evidence.

## Latest verified progress — GA Profile readable closing column

### Visible problem

FP had already made the photo-less `03 / NEXT TRIP` area intentional with native typography, but at actual size the far-right closing copy was squeezed into roughly 138px by snapshot 02. It remained noticeably tighter than the rest of the page and read like a leftover slot rather than a confident editorial closing beat.

### Bounded visual test

Rollback-safe GA duplicated FP and changed only the Profile lower cluster:

- existing replaceable snapshot 02 moved left and reduced `340×245 → 320×235`;
- native 03 closing column widened to about `168px`;
- native number/title/body scaled for actual-size readability;
- generic microcopy `NEXT TRIP / 03` became reader-facing `旅のつづき / 03`;
- no new photo, card, raster, generated asset, image hash or factual content;
- Q&A page remained unchanged.

The first GA layout was rejected because the moved native title crossed a yellow rule baked inside the existing composed travel texture. Text/text structure QA cannot detect marks inside raster imagery. The final GA moved the native copy below the baked rule and passed actual-size visual QA.

### Three-scale / structure evidence

- whole spread / 500px: PASS and more readable than FP;
- whole spread / 1200px: PASS;
- Profile actual-size `1922:3` = `794×1123`: PASS;
- visible Profile native text: `26`;
- changed closing-copy contacts vs visible text: `0`;
- 18px text safe-area risks: `0`;
- snapshot 02 is smaller than FP, so this change introduces no new source-fidelity enlargement risk;
- native text remains editable;
- photos remain independent replaceable IMAGE roles;
- FP preserved hidden rollback.

Learning: RSL-132 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GA-PROFILE-03-READABLE-CLOSING-COLUMN-QA-2026-08-20.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-ga-profile-readable-closing-column.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-132-baked-decor-native-copy-visual-crossing.md`.

## Existing preferred verification retained

- FO retains its verified photo-led outer hierarchy and current masthead/photo roles.
- GA inherits FP's verified Q&A page unchanged.
- FR retains the boxless native chronology terminal and actual-size verification.
- FT retains the compact Spot 03 → dominant dining flow and actual-size verification.
- FN remains preferred; a fresh Drive-only check found no clearly suitable Cafe replacement asset in the V6 root, so no semantically weak substitution was made.
- FM retains semantic 1DAY stop hierarchy and replaceable photos.

No internal design changes were made to FO / FR / FT / FN / FM in this run.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed and append history as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-132 is a local cross-item candidate, not a promoted visual rule.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

A Cafe-specific search inside the V6 root returned no clearly suitable replacement. Existing generated Profile / Q&A / Timeline / Memories masters remain stored and unadopted unless a quality-preserving placement path and actual-size QA are verified.

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

`V6 FO + GA/FR + FT + FN + FM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Treat Cafe photography as an actual asset bottleneck; do not substitute semantically unrelated imagery merely to add density.
5. When native copy moves over a composed raster, add actual-size visual review for baked-line/text crossings; structure collision checks are insufficient.
6. Continue subtraction only when contrast/binding/physical function can be replaced by hierarchy.
7. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
