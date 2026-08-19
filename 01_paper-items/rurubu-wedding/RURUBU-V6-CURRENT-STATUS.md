# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GB_PREFERRED / PROFILE_QA_GA_PREFERRED / STORY_CHRONOLOGY_FR_PREFERRED / MEMORY_SPOTS_FT_PREFERRED / GOURMET_CAFE_FN_PREFERRED / ONE_DAY_PLAN_FM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

All six current preferred spreads live on `845:2 / 00_RURUBU_START_HERE` as one 3×2 review board:

- Outer GB `1929:2` — back `1929:3`; x `272000`, y `0`.
- Profile / Q&A GA `1922:2` — Profile page `1922:3`; x `273800`, y `0`.
- Story / chronology FR `1904:18` — chronology right `1904:44`; x `275600`, y `0`.
- Memory Spots FT `1912:2` — guide right `1912:24`; x `272000`, y `1300`.
- Gourmet / Cafe FN `1866:2` — x `273800`, y `1300`.
- Yokohama 1DAY Plan FM `1879:71` — x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GB + GA/FR + FT MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

FO `1891:18` is preserved hidden as the Outer rollback. FP `1895:18` remains the Profile/Q&A rollback. EW `1826:18` remains the earlier Memory Spots rollback. FQ `1898:125` remains an earlier chronology rollback. Rejected Cafe/Table study FS `1909:2` remains hidden evidence.

## Latest verified progress — GB Outer minor-milestone actual-size readability

### Visible problem

FO already had a strong major/minor chronology hierarchy, but `02 / お出かけ` and `04 / 同棲` were only 14px numerals with 9.5–13px supporting copy. At actual size they read closer to micro-annotations than intentional secondary milestones.

### Bounded visual test

Rollback-safe GB duplicated FO and changed only the two minor back-cover chronology beats:

- `02 / 04` native numerals: `14px → 20px`;
- minor year labels: `9.5px → 10.5px`;
- minor event titles: `13px → 15px`;
- local positions adjusted to preserve unequal hierarchy and breathing room;
- no change to front cover, masthead, photos, image hashes, major `01 / 03 / 05 / 06`, factual roles or Drive assets.

The first candidate had one 2px contact between `02` and the `01` event title. It was not promoted in that state. The local 02 group was moved down 6px and structure QA was rerun.

### Three-scale / structure evidence

- whole spread / 1200px: PASS and more readable than FO;
- back actual-size `1929:3` = `794×1123`: PASS;
- visible back native text: `25`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- new generated assets / Drive saves / binary placements / image hashes: `0`;
- native text remains editable;
- existing photos remain independent replaceable IMAGE roles;
- FO preserved hidden rollback.

Learning: RSL-133 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GB-OUTER-MINOR-MILESTONE-READABILITY-QA-2026-08-20.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gb-minor-milestone-readability.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-133-subordinate-beat-actual-size-legibility.md`.

## Existing preferred verification retained

- GA retains its verified readable Profile closing column and unchanged Q&A page.
- FR retains the boxless native chronology terminal and actual-size verification.
- FT retains the compact Spot 03 → dominant dining flow and actual-size verification.
- FN remains preferred; Cafe photography is still an asset bottleneck, so no semantically unrelated substitution was made.
- FM retains semantic 1DAY stop hierarchy and replaceable photos.

No internal design changes were made to GA / FR / FT / FN / FM in this run.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-133 is a local cross-item candidate, not a promoted visual rule.

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

`V6 GB + GA/FR + FT + FN + FM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Treat Cafe photography as an actual asset bottleneck; do not substitute semantically unrelated imagery merely to add density.
5. Keep major/minor repeated information unequal, but verify that subordinate beats remain genuinely readable at actual size.
6. When native copy moves over a composed raster, add actual-size visual review for baked-line/text crossings; structure collision checks are insufficient.
7. Continue subtraction only when contrast/binding/physical function can be replaced by hierarchy.
8. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
