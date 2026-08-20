# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GB_PREFERRED / PROFILE_QA_GR_PREFERRED / STORY_CHRONOLOGY_GP_PREFERRED / MEMORY_SPOTS_GE_PREFERRED / GOURMET_CAFE_GJ_PREFERRED / ONE_DAY_PLAN_GQ_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback confirmed the six preferred V6 spreads on `845:2 / 00_RURUBU_START_HERE`:

- Outer GB `1929:2`; x `272000`, y `0`.
- Profile / Q&A GR `1971:2`; Profile page `1971:3`; x `273800`, y `0`.
- Story / chronology GP `1961:2`; chronology right `1961:28`; x `275600`, y `0`.
- Memory Spots GE `1941:2`; x `272000`, y `1300`.
- Gourmet / Cafe GJ `1954:2`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GQ `1964:2`; right page `1964:33`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GB + GR/GP + GE MEMORY SPOTS + GJ CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

GN `1957:2` is hidden rollback for GR. GO `1958:2` remains hidden rollback for GP. GP long-copy proof `1962:2 / 1962:28` remains hidden evidence. GD `1938:2` remains hidden rollback for GQ. Other prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GR Profile closing typography

### Visible problem

GN had already intentionally removed the third Profile snapshot photo, but the residual `03 / 次の旅へ。` role still used a large vertically separated number, long editorial rule and widely separated native copy. At whole-item and actual-size review it could still imply a missing third-photo slot rather than an intentional typographic closing feature.

### Bounded rollback-safe test

GR `1971:2` was duplicated from GN and changed only the Profile 03 closing role:

- compacted native `03`, metadata, title and body into one lower-right editorial group;
- removed the long vertical decorative rule;
- retained one short horizontal accent rule;
- changed no photo, image hash, Profile data, Q&A, page geometry or composed route texture;
- added no generated asset, card, shadow, gradient or new image role.

The first candidate geometry clipped `次の旅へ。` and was not promoted. After widening/repositioning the native copy, structure QA still found one number/title contact. The number was shifted left and QA rerun before adoption.

### Verification

- 500px whole spread: PASS;
- 1200px reading: PASS;
- Profile actual-size `794×1123`: PASS;
- visible native text: `26`;
- absolute text collisions: `0`;
- 18px safe-area risks: `0`;
- visible page-level stray text: `0`.

Evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GR-PROFILE-CLOSING-TYPO-QA-2026-08-20.md`

Feedback:
`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gr-profile-closing.md`

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-141-typography-closes-optional-image-role.md`

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` for the method only; exact Rurubu composition remains item-specific.

## Prior verified progress retained

- GP keeps the final `06 / WEDDING` as a native terminal editorial beat with 500px / 1200px / actual-size PASS and dynamic-copy stress PASS.
- GQ keeps its four short reader-facing stop metadata roles at `11.5px`, preserving the major/minor hierarchy while remaining readable at actual size.
- Existing generated Profile / Q&A / Timeline / Memories masters remain stored and unadopted until a quality-preserving placement path and actual-size QA are verified.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu shared feed as source-scope learning;
- read the neutral non-Rurubu feed only as permitted principle/QA input;
- did not inspect or mutate non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-141 is locally verified only, not a promoted visual rule.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- GR adopted + visually verified: YES;
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

`V6 GB + GR/GP + GE + GJ + GQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Judge all six spreads at the same scale before choosing the next defect.
4. Audit any remaining role that visually implies an unfilled placeholder or internal template convention even when the structure is technically complete.
5. Prefer stronger native editorial hierarchy or existing legitimate photo roles before creating another image role.
6. Treat photo frames, labels, rails and containers as subtraction candidates only after verifying binding/contrast/physical function.
7. Re-run actual-size collision, safe-area, parent-containment and realistic long-copy QA after material dynamic-copy movement near trim/footer/fold.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
