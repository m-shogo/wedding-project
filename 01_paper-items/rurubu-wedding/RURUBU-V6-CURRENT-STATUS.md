# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_ID_PREFERRED / PROFILE_QA_IK_PREFERRED / STORY_CHRONOLOGY_IL_PREFERRED / MEMORY_SPOTS_IH_PREFERRED / GOURMET_CAFE_IE_PREFERRED / ONE_DAY_PLAN_IG_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ID_IK_IL_IH_IE_IG_WHOLE_AND_ACTUAL_SIZE_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer ID `2051:2`.
- Profile / Q&A IK `2084:2`; profile left `2084:3`; Q&A right `2084:49`; x=`273800`, y=`0`.
- Story / chronology IL `2085:2`; story left `2085:3`; chronology right `2085:28`; x=`275600`, y=`0`.
- Memory Spots IH `2077:2`; guide right `2077:24`; x=`272000`, y=`1300`.
- Gourmet / Cafe IE `2061:2`; café left `2061:3`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan IG `2073:2`; left `2073:3`; right `2073:33`; x=`275600`, y=`1300`.

Start Here `845:27` still identifies `V6 ID` for the outer current marker.

## Rollback / comparison

- IJ `2080:2`: hidden rollback for IL Story / Chronology.
- HU `2044:2`: hidden rollback for IK Profile / Q&A.
- IF `2067:2`: earlier hidden chronology rollback.
- GY `2003:2`: hidden rollback for IH Memory Spots.
- HN `2029:2`: hidden rollback for ID.
- IC `2049:47`: hidden clean-room outer study; front principle adopted through ID, whole spread not adopted.
- HK `2027:2`: earlier hidden profile rollback.
- HT `2040:2` / HR `2033:111`: earlier hidden chronology rollbacks.
- HC `2012:2`: hidden rollback for IE Gourmet/Cafe.
- HS `2019:2`: hidden rollback for IG 1DAY.
- earlier comparison frames remain hidden and preserved.

## Latest verified progress

### IL Story / Chronology — remove the false section band without adding decoration

After IK promotion, actual-size review identified the IJ story-left page as the next useful visual defect. The hero ended around y=`520` while the lower café field began around y=`660`, leaving a broad cream band that behaved more like an accidental web-section separator than purposeful print breathing room.

Bounded IL test:

1. IJ `2080:2` was duplicated rollback-safely to IL `2085:2`.
2. Only story left `2085:3` was reweighted; chronology right was preserved unchanged in the clone at `2085:28`.
3. Existing café support photo moved y=`660 → 585` and resized `545×370 → 525×420`.
4. Its bound travel texture, native story headline/body, binding rule and 3-scenes note group moved upward consistently.
5. A smaller cream transition was intentionally retained instead of eliminating breathing room.
6. Hero, supporting destination photo, wording, factual chronology, image hashes and native editability were unchanged.
7. No new asset, card, badge, shadow, gradient, Drive save, external upload or image hash was added.

IL three-scale evidence:

- whole spread / 500px: PASS; more continuous than IJ.
- reading spread / 1400px: PASS.
- actual-size story left `2085:3 / 794×1123`: PASS.
- visible native text `39` across spread.
- visible IMAGE fills `6`.
- same-parent absolute text intersections `0`.
- page-edge 18px text safe-area risks `0`.
- whole-page flattening: NO.
- replaceable image roles preserved: YES.

Promotion:

- IL `2085:2` → `PREFERRED / V6_INSIDE_IL_STORY_CONTINUOUS_PHOTO_BRIDGE_2026_08_21`, x=`275600`, y=`0`, visible.
- IJ `2080:2` → `ROLLBACK_HIDDEN / V6_INSIDE_IJ_CHRONOLOGY_PHOTO_ROUTE_2026_08_21`, hidden, not deleted.

Decision: `IL ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IL-STORY-CONTINUOUS-PHOTO-BRIDGE-QA-2026-08-21.md`.

### IK Profile / Q&A — clean-room vertical photo field + native fact column

Before IL, common-scale comparison identified HU as the weakest preferred spread. IK `2084:2` materially rebuilt only the left profile page into a tall dominant-photo field + narrow native-fact column + asymmetric lower snapshots, while preserving the Q&A right page.

IK verification retained:

- 500px whole spread PASS;
- 1400px reading spread PASS;
- actual-size profile left `2084:3 / 794×1123` PASS;
- visible native text `55` across spread;
- visible IMAGE fills `5`;
- same-parent text intersections `0`;
- page-edge 18px safe risks `0`;
- HU `2044:2` remains hidden rollback.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IK-PROFILE-CLEANROOM-PHOTO-COLUMN-QA-2026-08-21.md`.

### Prior preferred state retained

- ID `2051:2`: photo-led clean-room front + stronger retained back; three-scale dummy-design QA PASS.
- IH `2077:2`: Memory Spots dominant Spot 04 + attached utility memo; three-scale QA PASS; intersections `0`; safe risks `0`.
- IE `2061:2`: café photo-led clean-room promotion; three-scale QA PASS; intersections `0`; safe risks `0`.
- IG `2073:2`: 1DAY photo-overlay first beat + editorial memo; three-scale QA PASS; intersections `0`; safe risks `0`.

Historical detail remains in each dedicated evidence file and rollback frame.

## Drive / asset truth

Drive V6 root was reverified during this run:

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
- RSL-167: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when blank paper behaves as a false section divider, test moving an existing legitimate downstream field closer before adding decoration, while proving the gap has no physical/editorial job.
- RSL-166: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when a print profile has a legitimate dominant image plus short native facts but reads as stacked horizontal modules, test changing image orientation and binding facts beside it before adding boxes.
- Earlier RSL-161–165 remain at their prior evidence-backed states.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 ID + IK + IL + IH + IE + IG = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run the common-scale preferred-set comparison using ID + IK + IL + IH + IE + IG and select the next weakest page.
4. Do not keep polishing IK or IL merely because they are newest.
5. Keep IJ, HU, IF, GY, HS, HT and HC hidden as rollback/comparison evidence.
6. Stress-test final-real-photo replacement against current dominant crops before treating dummy compositions as stable.
7. Stress-test longer real profile facts against IK's narrower right fact column before final copy lock.
8. Keep photo-semantic truth and source fidelity above repetition-count targets.
9. Keep native copy and rerun realistic long-copy stress after material layout/type changes.
10. Never invent unresolved dates/details for visual completeness.
11. Keep generated section masters unadopted until quality-preserving transport materially improves.
12. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
