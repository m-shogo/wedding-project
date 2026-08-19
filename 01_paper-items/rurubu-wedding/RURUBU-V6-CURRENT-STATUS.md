# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GB_PREFERRED / PROFILE_QA_GA_PREFERRED / STORY_CHRONOLOGY_FR_PREFERRED / MEMORY_SPOTS_FT_PREFERRED / GOURMET_CAFE_GC_PREFERRED / ONE_DAY_PLAN_GD_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

All six current preferred spreads live on `845:2 / 00_RURUBU_START_HERE` as one review board:

- Outer GB `1929:2` — back `1929:3`; x `272000`, y `0`.
- Profile / Q&A GA `1922:2` — Profile page `1922:3`; x `273800`, y `0`.
- Story / chronology FR `1904:18` — chronology right `1904:44`; x `275600`, y `0`.
- Memory Spots FT `1912:2` — guide right `1912:24`; x `272000`, y `1300`.
- Gourmet / Cafe GC `1933:2` — Cafe page `1933:3`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GD `1938:2` — right `1938:33`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GB + GA/FR + FT MEMORY SPOTS + GC CAFE & TABLE + GD 1DAY PLAN · V7 HOLD`

FM `1879:71` is preserved hidden rollback. Other prior rollbacks/comparisons remain preserved hidden.

## Latest verified progress — GD 1DAY native closing caption

### Visible problem

FM's final dining stop still used a yellow `END` tag plus tiny `END / TABLE & TALK` copy. At whole-item scale the element read as a UI/status tag rather than a magazine closing caption.

### Bounded visual test

Rollback-safe GD duplicated FM and changed only the final closing role:

- hid `LABEL / END`;
- replaced the English status copy with native `一日の終わりは、食卓で。`;
- placed the native caption directly on the existing dining photo;
- preserved stop order, route copy, photography, crop and image hashes.

Structure QA also exposed inherited 3px contacts between `02` / `12:30` and `04` / `19:00`. The two time nodes were moved from x=105 to x=116 before promotion.

### Three-scale / structure evidence

- 1200px whole spread: PASS and cleaner than FM;
- reading/page scale: PASS;
- right-page actual-size context: PASS;
- visible right-page native text: `25`;
- absolute text collisions: `0` after inherited-contact correction;
- 18px text safe-area risks: `0`;
- page-level stray nodes: `0`;
- new images / generated assets / Drive saves / binary placements / image hashes: `0`.

Learning: RSL-135 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GD-1DAY-NATIVE-CLOSING-CAPTION-QA-2026-08-20.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gd-1day-native-closing-caption.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-135-photo-bound-native-closing-caption.md`.

## Existing preferred verification retained

- GB retains readable major/minor back-cover milestones and actual-size verification.
- GA retains its verified readable Profile closing column and Q&A page.
- FR retains the boxless native chronology terminal and actual-size verification.
- FT retains the compact Spot 03 → dominant dining flow and actual-size verification.
- GC retains the source-safe overlapped Cafe view beat and actual-size verification.
- GD retains semantic 1DAY stop hierarchy, replaceable photos, and a native photo-bound closing caption.

No internal design changes were made to GB / GA / FR / FT / GC in this run.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-135 is a local cross-item candidate, not a promoted visual rule.

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

`V6 GB + GA/FR + FT + GC + GD = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Cafe photography remains an asset bottleneck: do not enlarge the current Yokohama view beyond source tolerance or substitute semantically unrelated imagery merely to add density.
5. Treat UI/status-like labels as candidates for subtraction only after verifying whether they still provide binding/contrast/physical function.
6. Keep major/minor repeated information unequal, but verify subordinate beats remain readable at actual size.
7. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
