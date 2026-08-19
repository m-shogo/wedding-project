# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_FO_PREFERRED / PROFILE_QA_FG_PREFERRED / STORY_CHRONOLOGY_FL_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_FN_PREFERRED / ONE_DAY_PLAN_FM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_CLEAN / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer FO `1891:18` — front `1891:68`; previous FH `1854:2` hidden rollback.
- Profile / Q&A FG `1851:2` — Profile `1851:3`; Q&A `1851:47`.
- Story / chronology FL `1874:2` — chronology `1874:28`.
- Memory Spots EW `1826:18` — lead `1826:19`; guide `1826:40`.
- Gourmet / Cafe FN `1866:2` — live node name `PREFERRED / V6_INSIDE_FN_CAFE_READER_INFO_CLUSTER_2026_08_19`; Table `1866:29`.
- Yokohama 1DAY Plan FM `1879:71` — right `1879:102`.

Start Here `845:27`:

`V5 FU/FX · V6 FO + FG/FL + EW MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

The six preferred spreads are arranged as one compact 3×2 review board. Rollback/history remains preserved.

During the FO promotion, stale visible V6 studies `1286:18`, `1624:18`, `1626:99`, `1671:18`, `1747:18`, `1846:18` were hidden, not deleted. Post-write live readback confirmed all six current preferred roots visible and those stale studies hidden.

## Latest verified progress — FO Outer

### Visible defect

FH front cover retained a tilted white `YOKOHAMA / ISSUE 2026` panel above the hero image. Its information was useful, but the visible rectangle read as an inserted UI/postcard module rather than photo-bound travel-magazine metadata.

### FO bounded change

Rollback-safe FO `1891:18`:

- hid only `DECOR / FRONT_YOKOHAMA_ISSUE_TEXTURE_PANEL`;
- kept `YOKOHAMA / ISSUE 2026` and `PHOTO / FOOD / MEMORY` as native editable Figma text;
- bound that native copy directly to a verified dark upper-right region of the existing waterfront hero;
- used subtle text-only shadow for contrast;
- changed no hero image, crop, logo, lower collage, back cover, generated asset, or image hash.

The first structure pass found a 2px title/meta contact. Metadata was moved down and QA rerun before adoption.

### FO evidence

- whole-spread ≈700px: PASS and stronger than FH;
- whole-spread 1200px: PASS;
- front actual-size `1891:68` = `794×1123`: PASS;
- visible front native text `13`;
- absolute text collisions `0`;
- 18px text safe-area risks `0`;
- page-level stray issue nodes `0`;
- new image hashes `0`.

Adoption / rollback:

- preferred FO `1891:18`;
- FH `1854:2` renamed rollback and hidden;
- V7 unchanged / HOLD.

Learning: RSL-127 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FO-OUTER-ISSUE-PANEL-SUBTRACTION-QA-2026-08-19.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-fo-outer-issue-panel-subtraction.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-127-photo-bound-metadata-card-subtraction.md`.

## Existing preferred verification retained

- FG retains native reader-facing Profile/Q&A copy and replaceable photos.
- FL retains event-05 bounded editorial texture and verified chronology hierarchy.
- EW retains the verified Memory Spots travel-guide hierarchy.
- FN retains the current Cafe/Table reader-information treatment.
- FM retains semantic 1DAY stop hierarchy and replaceable photos.

No internal design changes were made to FG / FL / EW / FN / FM in this run.

## Shared-learning / reference input used

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning history;
- read the neutral non-Rurubu feed only as permitted cross-scope principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, assets, ledgers, GitHub paths or production state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-127 remains a local cross-item candidate, not a promoted visual rule;
- current Japanese travel-guide references were inspected only for genre grammar: strong photo dominance, unequal visual mass, native headline hierarchy, and dense short practical information. No protected logo, exact page, proprietary illustration or literal layout was copied.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

The folder still contains the existing generated Profile / Q&A / Timeline / Memories masters. They remain unadopted unless a quality-preserving placement path and actual-size QA are verified.

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

`V6 FO + FG/FL + EW + FN + FM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_CLEAN / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs before every write.
3. Use the compact six-spread board for same-scale selection before cosmetic changes.
4. Continue testing whether typography, subtraction, existing legitimate photo responsibility or bounded decoration can solve a defect before adding another module.
5. Never substitute semantically unrelated imagery merely to reduce repetition counts.
6. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
7. Recheck direct-on-photo metadata whenever its source image/crop changes.
8. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
