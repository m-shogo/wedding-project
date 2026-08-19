# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-19
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_FO_PREFERRED / PROFILE_QA_FP_PREFERRED / STORY_CHRONOLOGY_FR_PREFERRED / MEMORY_SPOTS_EW_PREFERRED / GOURMET_CAFE_FN_PREFERRED / ONE_DAY_PLAN_FM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

All six current preferred spreads now live on the same review page `845:2 / 00_RURUBU_START_HERE` as one verified 3×2 board:

- Outer FO `1891:18` — x `272000`, y `0`.
- Profile / Q&A FP `1895:18` — x `273800`, y `0`.
- Story / chronology FR `1904:18` — chronology right `1904:44`; x `275600`, y `0`.
- Memory Spots EW `1826:18` — x `272000`, y `1300`.
- Gourmet / Cafe FN `1866:2` — x `273800`, y `1300`.
- Yokohama 1DAY Plan FM `1879:71` — x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 FO + FP/FR + EW MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`

Previous chronology FQ `1898:125` is preserved as hidden rollback on `47:2 / 02_RURUBU_AUTHENTIC`.

## Latest verified progress — FR chronology / review-board repair

### Visible problem

Same-scale review of the six preferred spreads showed the FQ chronology had matured into photo + native-type editorial grammar across most of the page, but the final `2026.10.24 / WEDDING / 06` endpoint still sat inside a full-width dark navy `WEDDING_CAPTION_STRIP`. Relative to the rest of the page, that last container read as a residual timeline/UI module rather than the terminal beat of a travel-magazine photo story.

A second live-authority defect was also found before writing: GitHub stated that the six preferred spreads formed one compact 3×2 review board, but FO/FP/FQ were actually on page `47:2`, while EW/FN/FM were on `845:2`.

### Bounded visual test

Rollback-safe candidate FR was cloned from FQ. Only the terminal treatment changed:

- hide the full-width navy terminal field;
- retain a thin yellow terminal rule;
- preserve `06`, `2026.10.24`, `WEDDING`, and closing copy as native text;
- flip box-dependent white text to dark navy on the cream paper field;
- add a small native magenta kicker `FINAL DESTINATION / 06`;
- add no photo, card, raster, generated asset, or image hash.

Result: FR preserves endpoint dominance but reads as a continuation of the page's native editorial hierarchy instead of a separate UI block.

### Three-scale / structure evidence

- whole spread at 700–1000px: PASS and visually stronger than FQ;
- chronology actual-size `1904:44` = `794×1123`: PASS;
- visible chronology native text: `32`;
- absolute text collisions: `0`;
- 18px safe-area risks: `0`;
- page-level stray nodes in candidate bounds: `0`;
- visible IMAGE roles on chronology right: `3`, with the same existing hashes as FQ;
- new image hashes: `0`.

FR was promoted to `PREFERRED / V6_INSIDE_FR_BOXLESS_WEDDING_TERMINAL_2026_08_19`; FQ was renamed rollback and hidden.

### Review-board authority repair

After FR passed QA, FO, FP, and FR were reparented to `845:2 / 00_RURUBU_START_HERE` without changing their internal design. Their review coordinates are now the live 3×2 top row; EW/FN/FM remain the bottom row. Fresh readback verified all six preferred spreads are visible and share parent `845:2`. FO screenshot after reparent remained visually unchanged.

This resolves the previously false `CURRENT_REVIEW_BOARD_CLEAN` claim rather than documenting around it.

Learning: RSL-130 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FR-BOXLESS-WEDDING-TERMINAL-AND-REVIEW-BOARD-QA-2026-08-19.md`.
Feedback: `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-fr-boxless-wedding-terminal-and-board-repair.md`.
Learning append: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-19-rsl-130-boxless-terminal-after-hierarchy-matures.md`.

## Existing preferred verification retained

- FO retains its verified photo-led outer hierarchy and direct-on-photo issue metadata.
- FP retains native profile/Q&A editability and replaceable photos.
- EW retains the verified Memory Spots travel-guide hierarchy.
- FN retains the current Cafe/Table reader-information hierarchy.
- FM retains semantic 1DAY stop hierarchy and replaceable photos.

No internal design changes were made to FO / FP / EW / FN / FM in this run; only FO/FP were structurally reparented into the review page with visual readback.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning history;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or edit non-Rurubu item-specific Figma, Drive, assets, ledgers, GitHub paths or production state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-130 is a local cross-item candidate, not a promoted visual rule.

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
- review-board parent drift repaired: YES;
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

`V6 FO + FP/FR + EW + FN + FM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and their parent page before every write.
3. Judge all six spreads on the now-real same-page 3×2 board before cosmetic changes.
4. Continue subtraction only when contrast/binding/physical function can be replaced by hierarchy; do not universalize box removal.
5. Never substitute semantically unrelated imagery merely to reduce repetition counts.
6. Re-run actual-size collision, safe-area, contrast, parent-containment and source-fidelity QA after material typography or geometry changes.
7. Keep generated section masters unadopted until quality-preserving transport and actual-size QA materially improve.
8. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
