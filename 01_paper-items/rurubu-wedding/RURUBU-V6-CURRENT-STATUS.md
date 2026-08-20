# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GV_PREFERRED / PROFILE_QA_GZ_PREFERRED / STORY_CHRONOLOGY_GW_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_GL_PREFERRED / ONE_DAY_PLAN_GR_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / CURRENT_CHANGED_PAGES_COLLISION_AND_SAFE_AREA_CLEAN / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE`:

- Outer GV `2006:2`; back `2006:3`; x `272000`, y `0`.
- Profile / Q&A GZ `2004:2`; Q&A right `2004:49`; x `273800`, y `0`.
- Story / chronology GW `1987:2`; chronology right `1987:28`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; guide right `2003:24`; x `272000`, y `1300`.
- Gourmet / Cafe GL `2000:2`; Cafe left `2000:3`; Table right `2000:33`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GR `2007:2`; left `2007:3`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GV + GZ/GW + GY MEMORY SPOTS + GL CAFE & TABLE + GR 1DAY PLAN · V7 HOLD`

Rollback state:

- GU `1975:2` hidden rollback for GV.
- GQ `1968:71` hidden rollback for GR.
- HA `1996:99` hidden rollback for GZ.
- GV Memory predecessor `1976:2` remains hidden rollback for GY.
- GX `2002:2` remains hidden rejected experiment.
- prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GV Outer full-width WEDDING closing beat

### Problem

GU back chronology was structurally clean, but the final `06 / 2026.10.24 / WEDDING` ended in a compact left-side cluster while a large lower-right cream field remained visually accidental. The page therefore closed less strongly than the dominant travel photograph above it.

### Bounded test

Rollback-safe duplicate from GU changed only the final closing typography:

- native `06` increased to `72px` and kept at the lower-left;
- `2026.10.24` moved to the right of the ordinal at `14px`;
- native `WEDDING` expanded to `46px` across the lower page;
- no new fact, photo, container, generated asset, image hash, crop or palette change.

Initial candidate failed twice before promotion:

1. `06` wrapped vertically because its text box was too narrow;
2. after widening, structural QA found `06` touching the date/WEDDING by `6–8px`.

The ordinal box was widened and the date/WEDDING were moved right before re-QA.

### Verification

- whole spread / ~700px: PASS and stronger than GU;
- actual-size back `2006:3 / 794×1123`: PASS;
- visible back native text: `21`;
- text collisions: `0`;
- 18px text safe-area risks: `0`;
- new image hashes: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Same-run verified progress — GR 1DAY Japanese-first reader utility copy

### Problem

GQ's 1DAY layout and photography were strong, but the lower-left utility field still used generic English/template-like microcopy: `TRIP DATA / MOVE / PACE / BEST / MOOD` and `OUR YOKOHAMA / FLEXIBLE DAY`. At actual size those labels read more like production/template tokens than Japanese travel-guide reader copy.

### Adopted GR changes

Native text only:

- `START / WATERFRONT` → `START / 海辺`;
- `POINT / 01` → `旅のコツ`;
- `TRIP DATA / YOKOHAMA` → `横浜1DAYメモ`;
- `MOVE / PACE / BEST / MOOD` → `移動 / ペース / おすすめ / 気分`;
- `OUR YOKOHAMA / FLEXIBLE DAY` → `寄り道しながら、1日を楽しむ。`.

Photos, times, itinerary facts, route structure, image hashes and replaceable-photo roles were unchanged.

Initial structural QA found `旅のコツ` overlapping the large `寄り道、歓迎。` headline because the inherited text box was too wide. The label width was reduced before promotion.

### Verification

- whole spread / ~700px: PASS and more reader-facing than GQ;
- actual-size left `2007:3 / 794×1123`: PASS;
- visible left native text: `23`;
- text collisions: `0`;
- 18px text safe-area risks: `0`;
- new image hashes: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read Rurubu base feed and neutral non-Rurubu base/append feed under the scope firewall;
- consumed only neutral methods, never non-Rurubu item-specific Figma/Drive/assets/current state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-152 full-width native closing beat: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-153 Japanese-first reader utility microcopy: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- GV adopted + visually verified: YES;
- GR adopted + visually verified: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback states preserved: YES;
- V7 touched: NO.

Photo-pool repetition remains a quality ceiling rather than a numerical target. Do not reduce counts with semantically false photography.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 GV + GZ/GW + GY + GL + GR = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live preferred IDs and parent page before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Prioritize dead-space/hierarchy problems that can be fixed with legitimate photography or native typography before adding containers.
5. Keep reader-facing Japanese utility/semantic microcopy where generic implementation-style labels remain.
6. Keep variable Q&A/profile copy in native Auto Layout with fresh realistic Japanese long-copy stress after material type/layout changes.
7. Keep unresolved facts at authoritative precision; never invent dates/details for visual completeness.
8. Do not chase photo-diversity counts with semantically false assets.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.