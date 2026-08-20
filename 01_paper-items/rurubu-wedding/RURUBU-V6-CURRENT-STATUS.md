# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_ID_PREFERRED / PROFILE_QA_IK_PREFERRED / STORY_CHRONOLOGY_IJ_PREFERRED / MEMORY_SPOTS_IH_PREFERRED / GOURMET_CAFE_IE_PREFERRED / ONE_DAY_PLAN_IG_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ID_IK_IJ_IH_IE_IG_WHOLE_AND_ACTUAL_SIZE_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer ID `2051:2`.
- Profile / Q&A IK `2084:2`; profile left `2084:3`; Q&A right `2084:49`; x=`273800`, y=`0`.
- Story / chronology IJ `2080:2`; chronology right `2080:28`; x=`275600`, y=`0`.
- Memory Spots IH `2077:2`; guide right `2077:24`; x=`272000`, y=`1300`.
- Gourmet / Cafe IE `2061:2`; café left `2061:3`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan IG `2073:2`; left `2073:3`; right `2073:33`; x=`275600`, y=`1300`.

Start Here `845:27` still identifies `V6 ID` for the outer current marker.

## Rollback / comparison

- HU `2044:2`: hidden rollback for IK Profile / Q&A.
- IF `2067:2`: hidden rollback for IJ chronology.
- GY `2003:2`: hidden rollback for IH Memory Spots.
- HN `2029:2`: hidden rollback for ID.
- IC `2049:47`: hidden clean-room outer study; front principle adopted through ID, whole spread not adopted.
- HK `2027:2`: earlier hidden profile rollback.
- HT `2040:2`: earlier hidden chronology rollback.
- HR `2033:111`: earlier hidden chronology rollback.
- HC `2012:2`: hidden rollback for IE Gourmet/Cafe.
- HS `2019:2`: hidden rollback for IG 1DAY.
- earlier comparison frames remain hidden and preserved.

## Latest verified progress

### IK Profile / Q&A — clean-room vertical photo field + native fact column

Common-scale comparison of ID + HU + IJ + IH + IE + IG identified HU as the weakest remaining preferred spread. HU was technically sound, but its left page still read as a legacy-derived stack of hero photo → profile facts → lower snapshots rather than one decisive magazine field.

Bounded IK test:

1. HU `2044:2` was duplicated rollback-safely into IK `2084:2`.
2. Only the left profile page was materially rebuilt; the Q&A right page remained unchanged.
3. Existing replaceable main photo became a tall `520×640` photo field.
4. Existing generated route-texture raster was hidden rather than used to manufacture density.
5. Existing native headline, `もっと。`, quote and profile name were bound directly to the dominant photo field.
6. Six existing native profile facts were consolidated into a narrow right editorial column.
7. Existing verified lower snapshots were reweighted into a large support photo plus a smaller overlapping photo.
8. Native `03 / 次の旅へ。` became a terminal lower-right beat.
9. The white deck moved onto cream during the test and failed contrast; it was corrected to the existing dark native text fill after loading the current font.
10. Local `03` metadata/number/title collisions were corrected before promotion.
11. No new wording, fact, person image, generated asset, card, shadow, gradient, Drive save, external upload or image hash was added.

IK three-scale evidence:

- whole spread / 500px: PASS; stronger than HU and less horizontal-section-like.
- reading spread / 1400px: PASS.
- actual-size profile left `2084:3 / 794×1123`: PASS.
- visible native text `55` across spread.
- visible IMAGE fills `5`.
- same-parent absolute text intersections `0`.
- page-edge 18px text safe-area risks `0`.
- whole-page flattening: NO.
- replaceable image roles preserved: YES.

Promotion:

- IK `2084:2` → `PREFERRED / V6_PROFILE_QA_IK_CLEANROOM_PHOTO_COLUMN_2026_08_21`, x=`273800`, y=`0`, visible.
- HU `2044:2` → `ROLLBACK_HIDDEN / V6_PROFILE_QA_HU_RULE_SUBTRACTION_2026_08_20`, hidden, not deleted.

Decision: `IK ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IK-PROFILE-CLEANROOM-PHOTO-COLUMN-QA-2026-08-21.md`.

### Prior preferred state retained

- ID `2051:2`: photo-led clean-room front + stronger retained back; three-scale dummy-design QA PASS.
- IJ `2080:2`: chronology photo-route reweighting; three-scale QA PASS; intersections `0`; safe risks `0`.
- IH `2077:2`: Memory Spots dominant Spot 04 + attached utility memo; three-scale QA PASS; intersections `0`; safe risks `0`.
- IE `2061:2`: café photo-led clean-room promotion; three-scale QA PASS; intersections `0`; safe risks `0`.
- IG `2073:2`: 1DAY photo-overlay first beat + editorial memo; three-scale QA PASS; intersections `0`; safe risks `0`.

Historical detail remains in each dedicated evidence file and rollback frame.

## Drive / asset truth

Drive V6 root reverified before IK work:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Current IK asset state:

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
- RSL-166 records the locally verified IK finding: when a print profile has a legitimate dominant image plus several short native facts but reads as stacked horizontal modules, independently test changing the image orientation and binding facts beside it before adding boxes or more decoration.
- RSL-165 remains locally verified for reweighting a legitimate sequential visual before decorating chronology islands.
- RSL-164 remains locally verified for attaching a compact utility memo to a dominant event field.
- RSL-161, RSL-162 and RSL-163 remain locally verified prior Rurubu lessons for dominant-content-photo promotion, functional chronology spines, and photo-bound first information beats.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 ID + IK + IJ + IH + IE + IG = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run the common-scale preferred-set comparison using ID + IK + IJ + IH + IE + IG and select the next weakest page.
4. Do not keep polishing IK merely because it is newest.
5. Keep HU, IF, GY, HS, HT and HC hidden as rollback/comparison evidence.
6. Stress-test final-real-photo replacement against the current dominant crops before treating dummy compositions as stable.
7. Stress-test longer real profile facts against IK's narrower right fact column before final copy lock.
8. Keep photo-semantic truth and source fidelity above repetition-count targets.
9. Keep native copy and rerun realistic long-copy stress after material layout/type changes.
10. Never invent unresolved dates/details for visual completeness.
11. Keep generated section masters unadopted until quality-preserving transport materially improves.
12. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
