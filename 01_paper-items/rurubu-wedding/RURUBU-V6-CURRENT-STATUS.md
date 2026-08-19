# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_FO_PREFERRED / PROFILE_QA_FP_PREFERRED / STORY_CHRONOLOGY_FR_PREFERRED / MEMORY_SPOTS_FT_PREFERRED / GOURMET_CAFE_FN_PREFERRED / ONE_DAY_PLAN_FM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

All six current preferred spreads live on `845:2 / 00_RURUBU_START_HERE` as one 3×2 review board:

- Outer FO `1891:18` — x `272000`, y `0`.
- Profile / Q&A FP `1895:18` — x `273800`, y `0`.
- Story / chronology FR `1904:18` — chronology right `1904:44`; x `275600`, y `0`.
- Memory Spots FT `1912:2` — guide right `1912:24`; x `272000`, y `1300`.
- Gourmet / Cafe FN `1866:2` — x `273800`, y `1300`.
- Yokohama 1DAY Plan FM `1879:71` — x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 FO + FP/FR + FT MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

EW `1826:18` is preserved hidden as the Memory Spots rollback. FQ `1898:125` remains the earlier chronology rollback. Rejected Cafe/Table study FS `1909:2` is hidden as visual evidence.

## Latest verified progress — FT Memory Spots compact editorial flow

### Visible problem

Same-scale review of all six preferred spreads showed EW Memory Spots already had valid Spot 03 and Spot 04 content, but the right page retained too much cream separation between the small Spot 03 block and the dominant Spot 04 dining feature. It read as `03 module → dead field → 04 module → guide` rather than one continuous travel-guide sequence.

### Bounded visual test

Rollback-safe FT duplicated EW and changed only right-page vertical cadence:

- Spot 03 photo moved upward without changing dimensions or image hash;
- Spot 03 native number/title/copy/meta compacted upward;
- Spot 04 dining feature moved `y=500 → 450` while staying `732×430` with the same image hash;
- Spot 04 native title/copy/label and the existing CHECK guide block moved upward proportionally;
- no card, new raster, generated asset, new photo, new image hash or factual copy;
- left Memory Spots page remained unchanged.

The first structure pass found a 2px Spot 03 number/title overlap. FT was not promoted until the title/copy/meta were corrected and the collision cleared.

### Three-scale / structure evidence

- whole spread / 500px: PASS and stronger than EW;
- reading / 1200px: PASS;
- right page actual-size `1912:24` = `794×1123`: PASS;
- left/right visible native text: `12 / 14`;
- left/right absolute text collisions: `0 / 0`;
- left/right 18px safe-area risks: `0 / 0`;
- photos remain independent replaceable IMAGE roles;
- image hashes unchanged:
  - lead `539c259be8036b481d06b4f76db9a39b407d90e8`;
  - Spot 02 `c1ada11205bc3978bf426b304d683f1c1566cac2`;
  - Spot 03 `644f449c3bf2001a94d4b822d2b55e2614c11042` at `238×218`;
  - Spot 04 `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` at `732×430`.

FT was promoted to `PREFERRED / V6_INSIDE_FT_MEMORY_SPOTS_COMPACT_03_DINING_FLOW_2026_08_19`; EW was renamed rollback and hidden.

### Rejected counterexample — Cafe/Table FS

A separate rollback-safe Cafe/Table study FS tried to bind the small source-safe 02 view photo and its native copy more aggressively. At whole-spread scale the result became cramped and weaker than FN, so FS was rejected and hidden instead of being cosmetically retried. This is explicit evidence that the FT lesson is not `reduce all whitespace`.

Learning: RSL-131 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FT-MEMORY-SPOTS-COMPACT-FLOW-QA-2026-08-19.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-ft-memory-spots-compact-flow.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-131-compact-existing-beats-before-adding-content.md`.

## Existing preferred verification retained

- FO retains its verified photo-led outer hierarchy and direct-on-photo issue metadata.
- FP retains native profile/Q&A editability and replaceable photos.
- FR retains the boxless native chronology terminal and its actual-size verification.
- FN remains preferred after FS was rejected; its quieter Cafe spacing is intentionally retained rather than over-compressed.
- FM retains semantic 1DAY stop hierarchy and replaceable photos.

No internal design changes were made to FO / FP / FR / FN / FM in this run.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed/base append history as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not use neutral learning as permission to inspect or edit non-Rurubu item-specific production state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-131 is a local cross-item candidate, not a promoted visual rule.

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

`V6 FO + FP/FR + FT + FN + FM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Distinguish accidental dead fields from intentional breathing room; FT succeeded but FS is the stop-condition counterexample.
5. Continue subtraction only when contrast/binding/physical function can be replaced by hierarchy.
6. Never substitute semantically unrelated imagery merely to reduce repetition counts.
7. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
