# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_IQ_PREFERRED / PROFILE_QA_IP_PREFERRED / STORY_CHRONOLOGY_IR_PREFERRED / MEMORY_SPOTS_IH_PREFERRED / GOURMET_CAFE_IT_PREFERRED / ONE_DAY_PLAN_IM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / IQ_IP_IR_IH_IT_IM_THREE_SCALE_DUMMY_DESIGN_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer IQ `2099:2`; x=`272000`, y=`0`.
- Profile / Q&A IP `2096:2`; profile left `2096:3`; Q&A right `2096:49`; x=`273800`, y=`0`.
- Story / Chronology IR `2104:2`; chronology right `2104:28`; x=`275600`, y=`0`.
- Memory Spots IH `2077:2`; guide right `2077:24`; x=`272000`, y=`1300`.
- Gourmet / Cafe IT `2116:65`; left `2116:66`; dining right `2116:96`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan IM `2087:2`; left `2087:3`; right `2087:33`; x=`275600`, y=`1300`.

## Rollback / comparison

- IS `2110:2`: hidden rollback for IT Gourmet / Cafe.
- ID `2051:2`: hidden rollback for IQ outer.
- IK `2084:2`: hidden rollback for IP Profile / Q&A.
- IO `2095:18`: hidden rollback for IR Story / Chronology.
- IN `2091:2`: earlier hidden Gourmet / Cafe rollback.
- IL `2085:2`, IE `2061:2`, IG `2073:2`, IJ `2080:2`, HU `2044:2`, IF `2067:2`, GY `2003:2`, HN `2029:2`, IC `2049:47`, HK `2027:2`, HT `2040:2`, HR `2033:111`, HC `2012:2`, HS `2019:2`: earlier hidden rollback/comparison frames.
- Earlier comparison frames remain hidden and preserved.

## Latest verified progress

### IT Gourmet / Cafe — photo-led left-page opening

A fresh common-scale comparison of `IQ + IP + IR + IH + IS + IM` selected the Gourmet/Cafe left page as the next weakest visual surface. The lead cafe photo was already strong and legitimate, but the large `01` plus narrow multi-line title column beside it created an image-plus-sidebar reading rather than a continuous travel-editorial page.

Bounded IT clean-room test:

1. IS `2110:2` was duplicated rollback-safely to IT `2116:65`.
2. The right dining page was preserved unchanged as IT `2116:96`.
3. Existing lead cafe hash `c1ada11205bc3978bf426b304d683f1c1566cac2` remained the dominant image and was widened.
4. Native `01` was bound directly to the photo edge instead of occupying a separate narrow text strip.
5. Native headline `甘いものと、窓ぎわの席。` and copy moved into a broader field below the photograph.
6. Useful `3つのカフェメモ` information was retained in a compact lower-left role rather than deleted.
7. Existing waterfront support hash `644f449c3bf2001a94d4b822d2b55e2614c11042` became a smaller unequal `02` feature.
8. Redundant closing copy/micro-note roles were hidden, not deleted.
9. No generated image, Drive save, external upload, new image hash, card, shadow, or gradient was added.

Intermediate repair:

- first visual pass put `01` behind the lead photo in z-order; corrected before adoption;
- the first `02` stack crowded title/copy beneath the support photo; re-composed side-by-side;
- structure QA then detected four text-box contacts; the `02` numeral/title/copy column was separated from the `01` copy/memo field;
- final structure QA returned zero intersections and zero 18 px text safe-area risks.

IT evidence:

- whole spread / 500 px: PASS;
- reading spread / 1400 px: PASS;
- actual-size left / 794×1123: PASS;
- left visible native text `16`;
- left visible IMAGE-fill nodes `2`;
- text intersections `0`;
- 18 px text safe-area risks `0`;
- whole-page flattening: NO;
- native text and replaceable image roles preserved: YES.

Promotion:

- IT `2116:65` → `PREFERRED / V6_INSIDE_IT_GOURMET_LEFT_PHOTO_LED_OPENING_2026_08_21`, x=`273800`, y=`1300`, visible.
- IS `2110:2` → `ROLLBACK_HIDDEN / V6_INSIDE_IS_GOURMET_AFTERGLOW_POSTCARD_CLOSE_2026_08_21`, x=`281000`, y=`1300`, hidden, not deleted.

Decision: `IT ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IT-GOURMET-LEFT-PHOTO-LED-OPENING-QA-2026-08-21.md`.

### Prior preferred state retained

- IQ `2099:2`: continuous dominant Yokohama front-cover photo field; three-scale QA PASS.
- IP `2096:2`: profile/Q&A editorial photo binding; three-scale QA PASS.
- IR `2104:2`: chronology rail replaced by unequal editorial beats; three-scale QA PASS.
- IH `2077:2`: Memory Spots dominant Spot 04 + attached utility memo; three-scale QA PASS.
- IM `2087:2`: 1DAY unequal photo mosaic route; three-scale QA PASS.

Dedicated evidence files preserve detailed earlier change history and rollback references.

## Drive / asset truth

Drive V6 root reverified during the IT run:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Current run asset state:

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing verified replaceable Rurubu image fills only;
- native variable text preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed and neutral non-Rurubu feed were read before writes.
- No non-Rurubu item-specific Figma/Drive/ledger/asset/GitHub path was inspected or edited.
- RSL-175: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; UI-like composition can arise from role width and sequencing even without cards. When a strong dominant image is paired with a narrow high-density title sidebar, test redistribution into a broader photo-led editorial sequence before adding decoration or imagery.
- RSL-174 remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`: subtract UI-like scaffolding without subtracting useful editorial density.
- RSL-173 remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`: when sequence cues already exist, visible rails may be replaced by unequal editorial beats after local verification.
- Earlier RSL lessons remain governed by their recorded states; literal Rurubu layouts/assets are not project rules.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 IQ + IP + IR + IH + IT + IM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run common-scale comparison using `IQ + IP + IR + IH + IT + IM` and select the next weakest page; do not polish IT merely because it is newest.
4. Keep all prior comparison/rollback frames hidden and preserved.
5. Stress-test final-real-photo replacement against current dominant crops before treating dummy compositions as stable.
6. Stress-test longer real profile facts against IP's narrow profile fact column before final copy lock.
7. Keep photo-semantic truth and source fidelity above repetition-count targets.
8. Keep native copy and rerun realistic long-copy stress after material layout/type changes.
9. Never invent unresolved dates/details for visual completeness.
10. Keep generated section masters unadopted until quality-preserving transport materially improves.
11. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
