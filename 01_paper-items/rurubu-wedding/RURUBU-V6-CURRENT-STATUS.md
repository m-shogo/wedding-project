# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_ID_PREFERRED / PROFILE_QA_IK_PREFERRED / STORY_CHRONOLOGY_IO_PREFERRED / MEMORY_SPOTS_IH_PREFERRED / GOURMET_CAFE_IN_PREFERRED / ONE_DAY_PLAN_IM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ID_IK_IO_IH_IN_IM_WHOLE_READING_AND_ACTUAL_SIZE_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer ID `2051:2`.
- Profile / Q&A IK `2084:2`; profile left `2084:3`; Q&A right `2084:49`; x=`273800`, y=`0`.
- Story / chronology IO `2095:18`; chronology right `2095:44`; x=`275600`, y=`0`.
- Memory Spots IH `2077:2`; guide right `2077:24`; x=`272000`, y=`1300`.
- Gourmet / Cafe IN `2091:2`; left `2091:3`; dining right `2091:33`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan IM `2087:2`; left `2087:3`; right `2087:33`; x=`275600`, y=`1300`.

Start Here `845:27` still identifies `V6 ID` for the outer current marker.

## Rollback / comparison

- IL `2085:2`: hidden rollback for IO Story / Chronology.
- IE `2061:2`: hidden rollback for IN Gourmet / Cafe.
- IG `2073:2`: hidden rollback for IM 1DAY.
- IJ `2080:2`: earlier hidden Story / Chronology rollback.
- HU `2044:2`: hidden rollback for IK Profile / Q&A.
- IF `2067:2`: earlier hidden chronology rollback.
- GY `2003:2`: hidden rollback for IH Memory Spots.
- HN `2029:2`: hidden rollback for ID.
- IC `2049:47`: hidden clean-room outer study; front principle adopted through ID, whole spread not adopted.
- HK `2027:2`, HT `2040:2`, HR `2033:111`, HC `2012:2`, HS `2019:2`: earlier hidden rollback/comparison frames.
- earlier comparison frames remain hidden and preserved.

## Latest verified progress

### IO Story / Chronology — taller route photo creates a stronger terminal rhythm

Common-scale comparison of `ID + IK + IL + IH + IN + IM` identified IL's chronology right page as the next useful visual defect. The Story left page was already strong, but the chronology became visually quiet after the upper hero and read as a route rail with separated event labels rather than one continuous photo-led editorial page.

Bounded IO test:

1. IL `2085:2` was duplicated rollback-safely to IO `2095:18`.
2. Story left was preserved.
3. Only chronology-right hierarchy was reweighted.
4. Existing event-3 photo hash `439a719d73f28e8dd2889f2026cccb15f345ec63` was enlarged from approximately `385×318` to `411×390`.
5. 05 / 06 were tightened beneath the same functional route rail.
6. Existing top chronology hero hash `e3738476f760932bb5b09c9d60f174dd6c84049d` was preserved.
7. No card, shadow, gradient, new raster, Drive save, upload or image hash was added.
8. Initial absolute-bounds QA found four small text overlaps. Date/title positions and the 03 numeral were corrected before promotion.

IO three-scale evidence:

- whole spread / 500px: PASS; stronger visual continuity than IL.
- reading spread / 1400px: PASS.
- actual-size chronology right `2095:44 / 794×1123`: PASS.
- visible native text `39` across spread.
- visible IMAGE fills `6` across spread.
- chronology-right text intersections `0`.
- chronology-right 18px text safe-area risks `0`.
- whole-page flattening: NO.
- replaceable image roles preserved: YES.

Promotion:

- IO `2095:18` → `PREFERRED / V6_INSIDE_IO_STORY_CHRONOLOGY_TALL_ROUTE_PHOTO_2026_08_21`, x=`275600`, y=`0`, visible.
- IL `2085:2` → `ROLLBACK_HIDDEN / V6_INSIDE_IL_STORY_CONTINUOUS_PHOTO_BRIDGE_2026_08_21`, hidden, not deleted.

Decision: `IO ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IO-STORY-CHRONOLOGY-TALL-ROUTE-PHOTO-QA-2026-08-21.md`.

### Prior preferred state retained

- ID `2051:2`: photo-led clean-room front + stronger retained back; three-scale dummy-design QA PASS.
- IK `2084:2`: dominant vertical profile photo + native fact column + asymmetric lower snapshots; three-scale QA PASS.
- IH `2077:2`: Memory Spots dominant Spot 04 + attached utility memo; three-scale QA PASS.
- IN `2091:2`: Gourmet/Cafe dining hero + image-bound 04 afterglow close; three-scale QA PASS.
- IM `2087:2`: 1DAY unequal photo mosaic route; three-scale QA PASS.

Dedicated evidence files preserve the detailed change history and rollback references.

## Drive / asset truth

Drive V6 root reverified before IO work:

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
- RSL-170: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when a chronological print page already has one semantically legitimate mid-sequence visual but reads as labels around a rail, test promoting that existing image to a larger structural beat and tightening the terminal sequence before adding another module or asset.
- RSL-169: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; use an existing semantically legitimate support image to bind a hero-to-closing narrative before generating another asset or adding a container.
- RSL-168: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; repeated semantic steps do not require repeated visual geometry.
- RSL-167: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when blank paper behaves as a false section divider, test moving an existing legitimate downstream field closer before adding decoration.
- RSL-166: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when a print profile reads as stacked modules, test changing image orientation and binding facts beside it before adding boxes.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 ID + IK + IO + IH + IN + IM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run the common-scale preferred-set comparison using `ID + IK + IO + IH + IN + IM` and select the next weakest page.
4. Do not keep polishing IO merely because it is newest.
5. Keep IL, IE, IG, IJ, HU, IF, GY, HS, HT and HC hidden as rollback/comparison evidence.
6. Stress-test final-real-photo replacement against current dominant crops before treating dummy compositions as stable.
7. Stress-test longer real profile facts against IK's narrower right fact column before final copy lock.
8. Keep photo-semantic truth and source fidelity above repetition-count targets.
9. Keep native copy and rerun realistic long-copy stress after material layout/type changes.
10. Never invent unresolved dates/details for visual completeness.
11. Keep generated section masters unadopted until quality-preserving transport materially improves.
12. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
