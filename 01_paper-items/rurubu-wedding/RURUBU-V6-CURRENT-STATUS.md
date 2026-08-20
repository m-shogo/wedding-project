# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GU_PREFERRED / PROFILE_QA_GT_PREFERRED / STORY_CHRONOLOGY_GW_PREFERRED / MEMORY_SPOTS_GV_PREFERRED / GOURMET_CAFE_GK_PREFERRED / ONE_DAY_PLAN_GQ_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE`:

- Outer GU `1975:2`; x `272000`, y `0`.
- Profile / Q&A GT `1981:111`; x `273800`, y `0`.
- Story / chronology GW `1987:2`; chronology right `1987:28`; x `275600`, y `0`.
- Memory Spots GV `1976:2`; x `272000`, y `1300`.
- Gourmet / Cafe GK `1991:2`; Table right `1991:33`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GQ `1968:71`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GU + GT/GW + GV MEMORY SPOTS + GK CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

Latest rollback state:

- GJ `1954:2` hidden rollback for GK.
- GS `1981:2` hidden rollback for GW.
- GB `1929:2` hidden rollback for GU.
- GR `1971:2` hidden rollback for GT.
- GE `1941:2` hidden rollback for GV.
- prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GK reader-facing Cafe/Table closing

### Visible problem

GJ's Table page was already compositionally strong, but the lower closing still exposed `3 WAYS / ENJOY` and small bilingual category labels. At actual size this final beat read more like a generic reusable design-template component than finished reader-facing Japanese magazine copy.

### Bounded rollback-safe test

GK duplicated GJ and changed only four existing native text roles:

- `3 WAYS / ENJOY` → `ふたりの、3つの楽しみ。`;
- `SWEETS / 甘いもの` → `甘いもの`;
- `VIEW / 景色` → `景色`;
- `TALK / 会話` → `会話`.

The first screenshot showed that lexical cleanup alone was insufficient because the inherited small/cyan treatment still behaved like annotation. A second bounded refinement changed only the closing headline to 23 px navy using the existing page title/body color. No image, photo crop, image geometry, card, shadow, gradient, raster or page geometry changed.

### Verification

- whole spread / ~1100px: PASS and stronger than GJ;
- reading/page scale: PASS;
- actual-size Table page `1991:33 / 794×1123`: PASS;
- visible Table native text: `22`;
- absolute visible text collision: `0`;
- 18px text safe-area risk: `0`;
- source/candidate visible image-role set, dimensions and image hashes: identical;
- preferred-six-spread implementation/proof/placeholder leakage audit after promotion: `0` visible hits.

Decision: `ADOPTED / VERIFIED_LOCAL`.

Evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GK-CAFE-TABLE-READER-CLOSING-QA-2026-08-20.md`

Feedback:
`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gk-cafe-table-reader-closing.md`

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-146-reader-facing-closing-microcopy.md`

## Prior same-day verified progress

- GW bound Event 03 chronology copy to its legitimate photograph instead of adding more timeline UI.
- GT changed unresolved `1991.XX.XX` to authoritative-precision `1991年`.
- GS hid unresolved exact pseudo-dates for events 01–04 without inventing facts.
- GU removed unresolved pseudo-years from Outer chronology.
- GV split dense guide metadata into readable native beats.

Canonical prior evidence remains under `01_paper-items/rurubu-wedding/evidence/` and Rurubu shared-learning append entries.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu base feed and neutral non-Rurubu feed under the scope firewall;
- did not inspect or mutate non-Rurubu item-specific Figma, Drive, ledgers, assets or GitHub paths;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-146 is `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`, not a project-wide visual rule.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- GK adopted + visually verified: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback states preserved: YES;
- V7 touched: NO.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 GU + GT/GW + GV + GK + GQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Prefer reader-facing native editorial language over generic/template micro-labels where those labels have no physical, navigational or brand function.
5. Continue replacing timeline/module behavior with photo-led editorial relationships only where semantic/contrast evidence supports it.
6. Keep unresolved facts at authoritative precision; never invent dates/details for visual completeness.
7. Re-run actual-size collision, safe-area, parent-containment and realistic long-copy QA after material text movement.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
