# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_JC_PREFERRED / PROFILE_QA_IX_PREFERRED / STORY_CHRONOLOGY_JB_PREFERRED / MEMORY_SPOTS_IZ_PREFERRED / GOURMET_CAFE_IT_PREFERRED / ONE_DAY_PLAN_JA_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / JC_IX_JB_IZ_IT_JA_THREE_SCALE_DUMMY_DESIGN_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer JC `2148:2`; x=`272000`, y=`0`.
- Profile / Q&A IX `2132:101`; profile left `2132:102`; Q&A right preserved from IP; x=`273800`, y=`0`.
- Story / Chronology JB `2144:2`; chronology right `2144:28`; x=`275600`, y=`0`.
- Memory Spots IZ `2138:2`; lead left `2138:3`; guide right preserved from IV; x=`272000`, y=`1300`.
- Gourmet / Cafe IT `2116:65`; left `2116:66`; dining right `2116:96`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan JA `2141:2`; left `2141:3`; right preserved from IW; x=`275600`, y=`1300`.

## Rollback / comparison

- IU `2124:2`: hidden rollback for JC Outer, x=`295500`, y=`0`.
- IR `2104:2`: hidden rollback for JB Story / Chronology, x=`293700`, y=`0`.
- IW `2131:2`: hidden rollback for JA 1DAY, x=`291900`, y=`1300`.
- IV `2127:2`: hidden rollback for IZ Memory Spots, x=`288400`, y=`1300`.
- IP `2096:2`: hidden rollback for IX Profile / Q&A, x=`286600`, y=`0`.
- Earlier comparison frames remain hidden and preserved.

## Latest verified progress — JC Outer

After JB promotion, a fresh 500 px comparison of `IU + IX + JB + IZ + IT + JA` selected IU Outer as the next macro weakness. The front already had a strong full-height Yokohama hero, large Japanese destination typography and a lower dining support photo, but it still resolved mainly as a clean brochure-like `hero + one support image` composition rather than a layered travel-information magazine cover.

Bounded JC test:

1. IU `2124:2` duplicated rollback-safely to JC `2148:2`; back cover preserved unchanged.
2. Existing front hero, masthead, native headline copy and dining support were retained.
3. One smaller photo-postcard beat `2148:108` was added over the hero using an existing verified image source; no new binary was introduced.
4. Initial café-photo test was REJECTED because it improved density but lacked a truthful semantic owner.
5. Postcard source was switched to existing skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, and the existing native `02 出会いから今日まで / ふたりの旅年表` caption was moved onto the skyline photo.
6. Postcard uses a small warm-white physical photo edge and `-2.5°` rotation; existing dining support uses `+1.2°` rotation to create unequal collage rhythm without a card grid.
7. Existing Feature 01 rule was widened to improve handoff into the new middle beat.
8. No new factual copy, generated image, Drive save, upload, image hash, rounded card, shadow, gradient, or whole-page rasterization was introduced.

JC evidence:

- whole outer / 500 px: PASS and stronger than IU;
- reading / 1400 px: PASS;
- native spread / `1587×1123`: PASS;
- visible native text: `35`;
- visible IMAGE-fill nodes: `5`;
- text intersections: `0`;
- 18 px text safe-area risks: `0`;
- whole-page flattening: NO.

Promotion:

- JC `2148:2` → `PREFERRED / V6_OUTER_JC_FRONT_PHOTO_POSTCARD_COLLAGE_2026_08_21`, live x=`272000`, y=`0`.
- IU `2124:2` → `ROLLBACK / V6_OUTER_IU_FULL_BLEED_EDITORIAL_COVER_2026_08_21`, hidden x=`295500`, y=`0`.

Decision: `JC ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-JC-OUTER-POSTCARD-COLLAGE-QA-2026-08-21.md`.

## Prior preferred state retained

- IX `2132:101`: full-width profile travel hero + compact fact band; three-scale QA PASS.
- JB `2144:2`: chronology Event 04 visually bound to Event 03 photo; three-scale QA PASS.
- IZ `2138:2`: Memory Spots hero-to-postcard overlap; three-scale QA PASS.
- IT `2116:65`: Gourmet / Cafe photo-led opening; three-scale QA PASS.
- JA `2141:2`: 1DAY waterfront hero + dense lower editorial close; three-scale QA PASS.

## Drive / asset truth

Drive V6 root reverified before JC promotion:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Current run asset state:

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive saves: `0`;
- new role-sized derivatives: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing verified replaceable Rurubu image fills only: YES;
- native variable text preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed, neutral non-Rurubu feed and project-wide authority were consumed under the scope firewall before durable writes.
- No non-Rurubu item-specific Figma, Drive, ledger, asset or GitHub production path was inspected or edited.
- RSL-182 remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
- RSL-183: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; photo-role variety can strengthen a photo-led composition, but a newly added support photo must have a truthful semantic owner. The initial unowned café-photo test was rejected before adoption.
- Fingerprint `F-RSL-183-DENSITY-PHOTO-WITHOUT-SEMANTIC-OWNER` is recorded once; do not retain decorative-density photos without explicit ownership.
- Literal Rurubu rotations, photo edge, imagery, palette, cover numbering, masthead and travel-magazine collage grammar remain Rurubu-specific.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 JC + IX + JB + IZ + IT + JA = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run common-scale comparison using `JC + IX + JB + IZ + IT + JA`; do not edit JC merely because it is newest.
4. Keep all comparison/rollback frames hidden and preserved.
5. Stress-test final-real-photo replacement against dominant crops before treating dummy compositions as stable.
6. Stress-test longer real profile facts against IX's 3×2 fact band and rerun text/background contrast at final role positions.
7. Stress-test IZ/Memory metadata/captions and JA 1DAY lower close with final longer copy before final copy lock.
8. Keep photo-semantic truth and source fidelity above density/repetition targets.
9. Never invent unresolved dates/details for visual completeness.
10. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
