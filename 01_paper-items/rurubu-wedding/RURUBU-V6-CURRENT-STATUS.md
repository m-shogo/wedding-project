# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_FH_PREFERRED / PROFILE_QA_FG_PREFERRED / STORY_CHRONOLOGY_FL_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_FJ_PREFERRED / ONE_DAY_PLAN_FM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_CLEAN / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer FH `1854:2` — back `1854:3`; front `1854:51`.
- Profile / Q&A FG `1851:2` — Profile `1851:3`; Q&A `1851:47`.
- Story / chronology FL `1874:2` — chronology `1874:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe FJ `1866:2` — Table `1866:29`.
- Yokohama 1DAY Plan FM `1879:71` — right `1879:102`.

Start Here `845:27`:

`V5 FU/FX · V6 FH + FG/FL + EW MEMORY SPOTS + FJ CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

The six preferred spreads are now arranged as one compact 3×2 review board. Twelve obsolete top-level V6 studies were hidden, not deleted; rollback/history remains preserved.

## Latest verified progress — FL / FM

### FL — event-05 bounded editorial texture

FK correctly removed a semantically weak repeated dining photo from event 05 `入籍`. FL keeps that semantic subtraction, but uses an existing bounded travel texture behind the native milestone so the resulting space reads as intentional editorial density rather than an unfilled photo slot.

Final FL evidence:

- whole-item ≈500px thumbnail: PASS;
- reading-scale review: PASS;
- chronology `1874:28` actual-size `794×1123`: PASS;
- native text `31`;
- absolute text collisions `0`;
- 18px text safe-area risks `0`;
- no new image hash.

Learning: RSL-125 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

### FM — 1DAY semantic stop hierarchy

FI already had unequal photography, but STOP02/03/04 native ordinals still carried near-equal visual mass. FM keeps photos, crops, hashes, times, copy and metadata unchanged while promoting native `02` and `04` from 28px to 42px. `03` remains the smaller bridge.

Resulting editorial reading:

`01 start → 02 dominant mid-route feature → 03 bridge → 04 closing feature`.

Final FM evidence:

- whole-item ≈500px thumbnail: PASS;
- reading scale: PASS;
- right page `1879:102` actual-size `794×1123`: PASS;
- native text `25`;
- absolute text collisions `0`;
- 18px text safe-area risks `0`;
- replaceable photos unchanged;
- new image hashes `0`.

The first implementation attempt failed atomically because `/` was used inside a Figma query selector. No mutation occurred. Existing fingerprint `FIGMA_QUERY_SELECTOR_SLASH_ATOMIC_FAILURE` was handled by switching to query-all + exact-name filtering rather than repeating the failed selector.

Adoption / rollback:

- preferred FM `1879:71`;
- source FI `1863:18` hidden as rollback;
- Start Here updated to FM;
- V7 unchanged / HOLD.

Learning: RSL-126 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FL-FM-REVIEW-BOARD-AND-SEMANTIC-HIERARCHY-QA-2026-08-19.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-fl-fm-review-board-semantic-hierarchy.md`.

## Existing preferred verification retained

- FH remains the current photo-led outer-cover authority.
- FG retains native reader-facing Profile/Q&A copy and replaceable photos.
- EW retains the verified Memory Spots travel-guide hierarchy.
- FJ retains the verified Cafe/Table typographic second-feature treatment.

No internal design changes were made to FH / FG / EW / FJ during the review-board cleanup.

## Shared-learning input used

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning history;
- read the neutral non-Rurubu feed only as permitted cross-scope principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, assets, ledgers, GitHub paths or production state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-125 and RSL-126 are local candidates only, not cross-item verified.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

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

`V6 FH + FG/FL + EW + FJ + FM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_CLEAN / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs before every write.
3. Use the compact six-spread board for same-scale selection before cosmetic changes.
4. Continue testing whether typography, subtraction, existing legitimate photo responsibility or bounded decoration can solve a defect before adding another module.
5. Never substitute semantically unrelated imagery merely to reduce repetition counts.
6. Re-run actual-size collision, safe-area, parent-containment and source-fidelity QA after material typography or geometry changes.
7. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
8. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
