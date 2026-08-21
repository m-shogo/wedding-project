# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_IU_PREFERRED / PROFILE_QA_IP_PREFERRED / STORY_CHRONOLOGY_IR_PREFERRED / MEMORY_SPOTS_IV_PREFERRED / GOURMET_CAFE_IT_PREFERRED / ONE_DAY_PLAN_IM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / IU_IP_IR_IV_IT_IM_THREE_SCALE_DUMMY_DESIGN_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer IU `2124:2`; x=`272000`, y=`0`.
- Profile / Q&A IP `2096:2`; profile left `2096:3`; Q&A right `2096:49`; x=`273800`, y=`0`.
- Story / Chronology IR `2104:2`; chronology right `2104:28`; x=`275600`, y=`0`.
- Memory Spots IV `2127:2`; guide right `2127:24`; x=`272000`, y=`1300`.
- Gourmet / Cafe IT `2116:65`; left `2116:66`; dining right `2116:96`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan IM `2087:2`; left `2087:3`; right `2087:33`; x=`275600`, y=`1300`.

## Rollback / comparison

- IQ `2099:2`: hidden rollback for IU outer, x=`283000`, y=`0`.
- IH `2077:2`: hidden rollback for IV Memory Spots, x=`283000`, y=`1300`.
- IS `2110:2`: hidden rollback for IT Gourmet / Cafe.
- ID `2051:2`: earlier hidden outer rollback.
- IK `2084:2`: hidden rollback for IP Profile / Q&A.
- IO `2095:18`: hidden rollback for IR Story / Chronology.
- IN `2091:2`, IL `2085:2`, IE `2061:2`, IG `2073:2`, IJ `2080:2`, HU `2044:2`, IF `2067:2`, GY `2003:2`, HN `2029:2`, IC `2049:47`, HK `2027:2`, HT `2040:2`, HR `2033:111`, HC `2012:2`, HS `2019:2`: earlier hidden rollback/comparison frames.
- Earlier comparison frames remain hidden and preserved.

## Latest verified progress

### IU Outer — continuous full-bleed editorial cover

Fresh common-scale comparison selected the outer front as the next macro defect after IT. IQ was already photo-led, but its header/photo/deep-lower-field stack still reduced cover immersion.

Bounded IU test:

1. IQ `2099:2` duplicated rollback-safely to IU `2124:2`.
2. Back cover was preserved unchanged.
3. Existing Yokohama hero hash `539c259be8036b481d06b4f76db9a39b407d90e8` was expanded into a longer continuous front-cover field.
4. Cream closing field reduced from 273 px to 150 px.
5. Existing dining support photo remained an overlapping secondary beat.
6. First full-height attempt was rejected: 1123 px `FILL` crop over-emphasized sky and `横浜` clipped because inherited fixed line-height remained 25 px.
7. Final repair: hero height 973 px, destination 100 px / 104 px line-height, footer moved 2 px upward after safe-area QA.
8. No new image, card, gradient, shadow, upload or hash added.

IU evidence:

- whole spread / 500 px: PASS;
- reading / 1400 px: PASS;
- actual / 1587×1123: PASS;
- front visible native text `9`;
- front IMAGE-fill nodes `3`;
- text intersections `0`;
- 18 px text safe-area risks `0`;
- whole-page flattening: NO;
- native text / replaceable photo roles preserved: YES.

Promotion:

- IU `2124:2` → `PREFERRED / V6_OUTER_IU_FULL_BLEED_EDITORIAL_COVER_2026_08_21`, visible at x=`272000`, y=`0`.
- IQ `2099:2` → hidden rollback at x=`283000`, y=`0`.

Decision: `IU ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

### IV Memory Spots — editorial information tail

After IU promotion, Memory Spots was the next weak close: the strong Spot 04 dining photo was followed by six equal small utility facts in a 3×2 pattern.

Bounded IV test:

1. IH `2077:2` duplicated rollback-safely to IV `2127:2`.
2. Left Memory Spots page preserved unchanged.
3. Spot 04 kept its verified hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` and grew from 750×490 to 750×515.
4. Existing yellow `4つのスポットチェック` cue was attached to the photograph edge.
5. Existing native two-line metadata copy (`BEST TIME / MOOD / PHOTO / CAFE / SUNSET / TABLE`) was revealed as one compact editorial tail.
6. Six equal `GUIDE_INFO_1…6` utility roles were hidden, not deleted.
7. No new asset, card, icon, upload or image hash added.

IV evidence:

- whole spread / 500 px: PASS;
- reading / 1400 px: PASS;
- actual / 1587×1123: PASS;
- visible native text `27`;
- IMAGE-fill nodes `4`;
- text intersections `0`;
- 18 px text safe-area risks `0`;
- legacy six utility roles retained hidden: YES;
- whole-page flattening: NO.

Promotion:

- IV `2127:2` → `PREFERRED / V6_INSIDE_IV_MEMORY_SPOTS_EDITORIAL_INFO_TAIL_2026_08_21`, visible at x=`272000`, y=`1300`.
- IH `2077:2` → hidden rollback at x=`283000`, y=`1300`.

Decision: `IV ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence for both: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IU-IV-OUTER-MEMORY-EDITORIAL-QA-2026-08-21.md`.

### Prior preferred state retained

- IP `2096:2`: Profile / Q&A editorial photo binding; three-scale QA PASS.
- IR `2104:2`: chronology rail replaced by unequal editorial beats; three-scale QA PASS.
- IT `2116:65`: Gourmet / Cafe photo-led left-page opening; three-scale QA PASS.
- IM `2087:2`: 1DAY unequal photo mosaic route; three-scale QA PASS.

## Drive / asset truth

Drive V6 root reverified during this run:

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
- RSL-176: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; full-bleed photo expansion must revalidate both new crop/focal-density and inherited text metrics. Larger is not automatically more editorial.
- RSL-177: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; short parallel secondary facts can sometimes retain density as one attached editorial information tail instead of equal utility cells.
- RSL-175/174/173 remain governed by their recorded states.
- Literal Rurubu layout, palette, photography, masthead treatment, numbers and coordinates are not transferable project rules.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 IU + IP + IR + IV + IT + IM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run common-scale comparison using `IU + IP + IR + IV + IT + IM`; do not edit IU/IV merely because they are newest.
4. Keep all prior comparison/rollback frames hidden and preserved.
5. Stress-test final-real-photo replacement against current dominant crops before treating dummy compositions as stable.
6. Stress-test longer real profile facts against IP's narrow profile fact column before final copy lock.
7. Stress-test IV's continuous metadata tail with final longer labels before final copy lock.
8. Keep photo-semantic truth and source fidelity above repetition-count targets.
9. Never invent unresolved dates/details for visual completeness.
10. Keep printer/PDF/physical-proof gates separate from dummy-design QA.