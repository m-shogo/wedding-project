# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GB_PREFERRED / PROFILE_QA_GA_PREFERRED / STORY_CHRONOLOGY_GI_PREFERRED / MEMORY_SPOTS_GE_PREFERRED / GOURMET_CAFE_GJ_PREFERRED / ONE_DAY_PLAN_GD_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback in this run confirmed the six preferred V6 spreads on `845:2 / 00_RURUBU_START_HERE`:

- Outer GB `1929:2`; x `272000`, y `0`.
- Profile / Q&A GA `1922:2`; x `273800`, y `0`.
- Story / chronology GI `1950:2`; x `275600`, y `0`.
- Memory Spots GE `1941:2`; x `272000`, y `1300`.
- Gourmet / Cafe GJ `1954:2`; Cafe left `1954:3`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GD `1938:2`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GB + GA/GI + GE MEMORY SPOTS + GJ CAFE & TABLE + GD 1DAY PLAN · V7 HOLD`

GH `1947:2` is preserved hidden as rollback. Other prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GJ Cafe photo/text editorial binding

### Visible problem

GH Cafe was structurally sound and reader-facing, but the source-limited Yokohama view still read as a separate lower photo card. Native `02`, headline, support copy and Cafe Check note were spread too widely around it.

### Bounded visual test

Rollback-safe GJ changed only the existing Cafe 02 role:

- kept `PHOTO / GOURMET_VIEW_REPLACEABLE` at `238×218`;
- moved it upward/left and used a mild `-3°` rotation;
- moved native `02` partly across the photo edge;
- tightened native headline, copy, metadata and Cafe Check note into one adjacent column;
- preserved Table page, image hashes, Drive assets, generated-asset state and V7 state.

### Three-scale / structure evidence

- whole spread ~700px: PASS;
- reading spread 1200px: PASS;
- Cafe actual-size `1954:3 / 794×1123`: PASS;
- visible native text count: `20`;
- absolute native text collisions: `0`;
- 18px text safe-area risks: `0`.

GJ was promoted into the Cafe/Table review-board slot. GH was renamed/hidden as rollback.

## Evidence / learning

Evidence:

`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GJ-CAFE-VIEW-BOUND-EDITORIAL-BEAT-QA-2026-08-20.md`

Feedback:

`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gj-cafe-view-bound-editorial-beat.md`

Learning:

`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-138-source-limited-photo-editorial-binding.md`

RSL-138 state: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Existing preferred verification retained

- GB retains readable major/minor back-cover milestones and actual-size verification.
- GA retains its verified Profile closing column and Q&A page.
- GI retains reader-facing Story notes and boxless chronology.
- GE retains direct-photo Spot 03 and dominant dining Spot 04.
- GD retains semantic 1DAY stop hierarchy and native photo-bound closing caption.
- GJ retains GH reader-facing Cafe recommendations while binding the source-limited view into one stronger editorial beat.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub production paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-138 is a local cross-item candidate, not a promoted visual rule.

## Drive / asset truth

Drive root reverified in this run:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Existing generated Profile / Q&A / Timeline / Memories masters remain stored and unadopted until a quality-preserving placement path and actual-size QA are verified.

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

`V6 GB + GA/GI + GE + GJ + GD = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Cafe photography remains source-limited: do not enlarge the current Yokohama view beyond verified tolerance or substitute semantically unrelated imagery merely to add density.
5. Prefer stronger editorial binding and hierarchy before creating another image role.
6. Treat photo frames, labels, rails and containers as subtraction candidates only after verifying binding/contrast/physical function.
7. Re-run actual-size collision, safe-area, parent-containment and source-fidelity QA after material typography or geometry changes.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
