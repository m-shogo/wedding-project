# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GB_PREFERRED / PROFILE_QA_GA_PREFERRED / STORY_CHRONOLOGY_FR_PREFERRED / MEMORY_SPOTS_GE_PREFERRED / GOURMET_CAFE_GC_PREFERRED / ONE_DAY_PLAN_GD_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

All six current preferred spreads were fresh-read immediately before this status write and live on `845:2 / 00_RURUBU_START_HERE` as one review board:

- Outer GB `1929:2`; x `272000`, y `0`.
- Profile / Q&A GA `1922:2`; x `273800`, y `0`.
- Story / chronology FR `1904:18` — chronology right `1904:44`; x `275600`, y `0`.
- Memory Spots GE `1941:2` — guide right `1941:24`; x `272000`, y `1300`.
- Gourmet / Cafe GC `1933:2` — Cafe page `1933:3`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GD `1938:2` — right `1938:33`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GB + GA/FR + GE MEMORY SPOTS + GC CAFE & TABLE + GD 1DAY PLAN · V7 HOLD`

FT `1912:2` is now preserved as hidden Memory Spots rollback. Other prior rollbacks/comparisons remain preserved hidden.

## Latest verified progress — GE Memory Spot 03 direct photo beat

### Visible problem

FT had already established Spot 04 as a strong dominant direct-photo feature, but Spot 03 still used a 6px white photo frame, a separate yellow edge and a detached native text block. At whole-spread scale this was one of the last obvious photo-card/UI-like treatments inside Memory Spots.

### Bounded visual test

Rollback-safe GE duplicated FT and changed only Spot 03:

- preserved the existing replaceable Spot 03 image fill/hash and `238×218` role size;
- removed the 6px white stroke;
- hid `DECOR / SPOT03_EDGE_YELLOW`;
- retained a restrained `-3.2°` photo rotation;
- increased native `03` from 58px to 72px;
- moved native title/copy/meta into one adjacent editorial beat;
- preserved Spot 04, guide metadata, left page, Drive assets and V7.

Initial structure QA found a 4px `03` / title contact. GE was not promoted in that state. The adjacent native text was shifted right and rechecked before adoption.

### Three-scale / structure evidence

- whole spread: PASS and stronger than FT;
- reading/page scale: PASS;
- right-page actual-size `794×1123`: PASS;
- visible right-page native text: `14`;
- visible right-page IMAGE roles: `2`;
- absolute text collisions: `0` after correction;
- 18px text safe-area risks: `0`;
- page-level stray nodes around the candidate: `0`;
- new images / generated assets / Drive saves / binary placements / image hashes: `0`.

GE was promoted to the existing Memory Spots review-board slot. FT was renamed/hidden as rollback, and Start Here was synchronized.

Learning: RSL-136 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GE-MEMORY-SPOT03-DIRECT-PHOTO-BEAT-QA-2026-08-20.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-ge-memory-spot03-direct-photo-beat.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-136-direct-photo-beat-after-frame-function-check.md`.

## Existing preferred verification retained

- GB retains readable major/minor back-cover milestones and actual-size verification.
- GA retains its verified readable Profile closing column and Q&A page.
- FR retains the boxless native chronology terminal and actual-size verification.
- GE retains Spot 03 as a direct photo + native editorial beat and Spot 04 as the dominant dining feature.
- GC retains the source-safe overlapped Cafe view beat and actual-size verification.
- GD retains semantic 1DAY stop hierarchy, replaceable photos, and a native photo-bound closing caption.

No internal design changes were made to GB / GA / FR / GC / GD in this run.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed and relevant append state as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- read `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-136 is a local cross-item candidate, not a promoted visual rule.

## Drive / asset truth

Drive root reverified in this run:

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

`V6 GB + GA/FR + GE + GC + GD = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Cafe photography remains an asset bottleneck: do not enlarge the current Yokohama view beyond source tolerance or substitute semantically unrelated imagery merely to add density.
5. Treat photo frames, UI/status-like labels, borders and rails as candidates for subtraction only after verifying whether they still provide binding/contrast/physical function.
6. Keep major/minor repeated information unequal, but verify subordinate beats remain readable at actual size.
7. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
