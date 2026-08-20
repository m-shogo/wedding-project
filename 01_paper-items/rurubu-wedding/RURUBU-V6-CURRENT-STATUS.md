# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GU_PREFERRED / PROFILE_QA_GR_PREFERRED / STORY_CHRONOLOGY_GP_PREFERRED / MEMORY_SPOTS_GV_PREFERRED / GOURMET_CAFE_GJ_PREFERRED / ONE_DAY_PLAN_GQ_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback confirmed the six preferred V6 spreads on `845:2 / 00_RURUBU_START_HERE`:

- Outer GU `1975:2`; x `272000`, y `0`.
- Profile / Q&A GR `1971:2`; Profile page `1971:3`; x `273800`, y `0`.
- Story / chronology GP `1961:2`; chronology right `1961:28`; x `275600`, y `0`.
- Memory Spots GV `1976:2`; guide page `1976:24`; x `272000`, y `1300`.
- Gourmet / Cafe GJ `1954:2`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GQ `1968:71`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GU + GR/GP + GV MEMORY SPOTS + GJ CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

GB `1929:2` is hidden rollback for GU. GE `1941:2` is hidden rollback for GV. GN `1957:2` is hidden rollback for GR. GO `1958:2` remains hidden rollback for GP. Existing prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GU Outer factual-placeholder subtraction

### Visible problem

The back-cover chronology still showed unresolved pseudo-years `201x / 202x` for events 01–04. At actual size those values read less like intentional editorial placeholders and more like unfinished semi-real facts. The sequence numbers already carried chronology order, while authoritative dates for those events were not available in the current scope.

### Bounded rollback-safe test

GU `1975:2` was duplicated from GB and changed only the four unresolved pseudo-year text nodes:

- hid `201x / 201x / 202x / 202x` for events 01–04;
- retained native event numbers, labels and all verified dates (`2026.02.11`, `2026.10.24`);
- changed no photo, image hash, crop, masthead, front cover, known fact or event order;
- added no new card, rail, generated asset or image role.

### Verification

- whole spread 1587×1123 / 1200-equivalent: PASS;
- back cover actual-size `794×1123`: PASS;
- back visible native text: `21`;
- absolute text collisions: `0`;
- 18px safe-area risks: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Latest verified progress — GV Memory Spots guide metadata

### Visible problem

Memory Spots right-page `CHECK! / 4 SPOT GUIDE` used one dense two-line 11.5px metadata string. The information was technically present but actual-size scanability was weak, and the long line read like template microcopy rather than six intentional travel-guide notes.

### Bounded rollback-safe test

GV `1976:2` was duplicated from GE and changed only the guide metadata role:

- kept the same six facts: BEST TIME / 夕暮れ, MOOD / さんぽ, PHOTO / 水辺, CAFE / 休憩, SUNSET / みなとみらい, TABLE / ふたり時間;
- replaced the single dense native text block with six native 12.5px metadata beats in a 3×2 field;
- added no cards, images, raster, icon or decorative container;
- initial row spacing caused three 3px text contacts; the second row was moved before adoption.

### Verification

- 500px/whole-equivalent: PASS;
- 1200px reading: PASS;
- right-page actual-size `794×1123`: PASS;
- guide visible native text: `19`;
- absolute text collisions: `0`;
- 18px safe-area risks: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GU-GV-FACTUAL-PLACEHOLDER-AND-GUIDE-METADATA-QA-2026-08-20.md`

Feedback:
`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gu-gv-editorial-cleanup.md`

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-142-143-factual-placeholders-and-readable-metadata.md`

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu base feed and canonical append mechanism;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or mutate non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-142 / RSL-143 are locally verified only, not promoted visual rules.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- GU adopted + visually verified: YES;
- GV adopted + visually verified: YES;
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

`V6 GU + GR/GP + GV + GJ + GQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Audit remaining reader-visible dummy/template conventions that can be removed without inventing facts.
5. Preserve known facts; do not manufacture dates merely to make a chronology look complete.
6. Keep minor reader-facing information readable at actual size without turning it into cards/UI.
7. Re-run actual-size collision, safe-area, parent-containment and realistic long-copy QA after material dynamic-copy movement.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
