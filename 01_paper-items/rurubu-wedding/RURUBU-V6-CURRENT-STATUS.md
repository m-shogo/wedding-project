# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_IQ_PREFERRED / PROFILE_QA_IP_PREFERRED / STORY_CHRONOLOGY_IR_PREFERRED / MEMORY_SPOTS_IH_PREFERRED / GOURMET_CAFE_IN_PREFERRED / ONE_DAY_PLAN_IM_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / IQ_IP_IR_IH_IN_IM_THREE_SCALE_DUMMY_DESIGN_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer IQ `2099:2`; x=`272000`, y=`0`.
- Profile / Q&A IP `2096:2`; profile left `2096:3`; Q&A right `2096:49`; x=`273800`, y=`0`.
- Story / chronology IR `2104:2`; chronology right `2104:28`; x=`275600`, y=`0`.
- Memory Spots IH `2077:2`; guide right `2077:24`; x=`272000`, y=`1300`.
- Gourmet / Cafe IN `2091:2`; left `2091:3`; dining right `2091:33`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan IM `2087:2`; left `2087:3`; right `2087:33`; x=`275600`, y=`1300`.

## Rollback / comparison

- ID `2051:2`: hidden rollback for IQ outer.
- IK `2084:2`: hidden rollback for IP Profile / Q&A.
- IO `2095:18`: hidden rollback for IR Story / Chronology.
- IL `2085:2`: earlier hidden Story / Chronology rollback.
- IE `2061:2`: hidden rollback for IN Gourmet / Cafe.
- IG `2073:2`: hidden rollback for IM 1DAY.
- IJ `2080:2`: earlier hidden Story / Chronology rollback.
- HU `2044:2`: earlier hidden profile rollback.
- IF `2067:2`: earlier hidden chronology rollback.
- GY `2003:2`: hidden rollback for IH Memory Spots.
- HN `2029:2`: earlier outer rollback.
- IC `2049:47`: hidden clean-room outer study.
- HK `2027:2`, HT `2040:2`, HR `2033:111`, HC `2012:2`, HS `2019:2`: earlier hidden rollback/comparison frames.
- earlier comparison frames remain hidden and preserved.

## Latest verified progress

### IR Story / Chronology — chronology rail replaced by unequal editorial beats

Common-scale comparison of the six live preferred spreads identified IO Story / Chronology as the next weakest spread. The Story left page was already photo-led, but the Chronology right page still depended on a vertical route rail and repeated event rows, causing the spread to switch from editorial photography to timeline-UI grammar.

Bounded IR clean-room test:

1. IO `2095:18` was duplicated rollback-safely to IR `2104:2`.
2. Story left page was preserved unchanged.
3. On Chronology right `2104:28`, the vertical route rail and six node dots were hidden.
4. Existing top travel-object hero hash `e3738476f760932bb5b09c9d60f174dd6c84049d` remained the opening field.
5. 01/02 were grouped into a compact opening beat.
6. Existing event-03 destination hash `439a719d73f28e8dd2889f2026cccb15f345ec63` was promoted to a 552×286 middle photo chapter.
7. Event 04 became a narrow cream side-note.
8. 05 `入籍` and 06 `WEDDING` became a broad typographic terminal beat.
9. One existing cyan rule was retained only as a functional binder between the middle photo chapter and terminal beat.
10. No generated image, new raster, Drive save, external upload, card, shadow, gradient or new image hash was added.

Intermediate failure and repair:

- first IR pass let event-04 dark copy cross into the event-03 photograph; reading-scale contrast failed, so that overlap was rejected;
- event 04 was narrowed to a cream side-note and native copy reflowed;
- structure QA then exposed small event-number/text intersections; 04 and 06 positions were corrected before adoption;
- final structure QA returned zero text intersections and zero 18px text safe-area risks.

IR evidence:

- whole spread / 500px: PASS;
- reading / 1400px: PASS after repair;
- actual-size Chronology right / ~794×1123: PASS after final adjustment;
- right visible native text `27`;
- right visible IMAGE-fill nodes `2`;
- text intersections `0`;
- 18px text safe-area risks `0`;
- whole-page flattening: NO;
- replaceable image roles preserved: YES.

Promotion:

- IR `2104:2` → `PREFERRED / V6_INSIDE_IR_STORY_CHRONOLOGY_CLEANROOM_PHOTO_BAND_2026_08_21`, x=`275600`, y=`0`, visible.
- IO `2095:18` → `ROLLBACK_HIDDEN / V6_INSIDE_IO_STORY_CHRONOLOGY_TALL_ROUTE_PHOTO_2026_08_21`, x=`279200`, y=`0`, hidden, not deleted.

Decision: `IR ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IR-STORY-CHRONOLOGY-CLEANROOM-PHOTO-BAND-QA-2026-08-21.md`.

### IQ Outer — continuous dominant Yokohama photo replaces the false masthead section

Common-scale review showed that the ID front still read as three stacked horizontal fields: cream masthead support, hero photo, then a cream lower feature section. The image itself was semantically correct and strong enough; the remaining defect was segmentation rather than missing photography.

Bounded IQ test:

1. ID `2051:2` was duplicated rollback-safely to IQ `2099:2`.
2. Entire back cover was preserved.
3. Front hero hash `539c259be8036b481d06b4f76db9a39b407d90e8` was extended from ~690px to 850px height.
4. The nonessential cream masthead support field was hidden.
5. Native `横浜`, `ふたり旅。`, feature 01 and micro coverline were retained over the continuous photo field.
6. Redundant older logo raster was hidden; current masthead lockup hash `0bdbf47904ea5865c71b1555dc73689b2c7b2126` was retained.
7. Lower cream close was reduced to ~273px.
8. Existing dining support photo hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` was resized/repositioned to overlap the hero-to-lower transition.
9. Feature 03 was moved into the compact lower close.
10. No card, shadow, gradient, new raster, Drive save, upload, generation or image hash was added.
11. Structure QA found one issue-line/micro-coverline text-box collision; the short issue-line box was tightened and QA was rerun before promotion.

IQ evidence:

- whole spread / 500px: PASS; stronger continuous cover read than ID;
- reading / 1400px: PASS;
- native spread / 1587×1123: PASS; front half effectively ~794×1123 at 1:1;
- effective visible native text `35`;
- effective visible IMAGE-fill nodes `4`;
- front text intersections `0`;
- front 18px text safe-area risks `0`;
- whole-page flattening: NO;
- replaceable image roles preserved: YES.

Promotion:

- IQ `2099:2` → `PREFERRED / V6_OUTER_IQ_CONTINUOUS_PHOTO_COVER_2026_08_21`, x=`272000`, y=`0`, visible.
- ID `2051:2` → `ROLLBACK_HIDDEN / V6_OUTER_ID_HN_BACK_PHOTOLED_FRONT_2026_08_21`, hidden, not deleted.

Decision: `IQ ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IQ-OUTER-CONTINUOUS-PHOTO-COVER-QA-2026-08-21.md`.

### Prior preferred state retained

- IP `2096:2`: earlier-support-photo Q04 binding refinement on the Q&A right, while retaining IK's dominant vertical profile-photo left; three-scale QA PASS.
- IH `2077:2`: Memory Spots dominant Spot 04 + attached utility memo; three-scale QA PASS.
- IN `2091:2`: Gourmet/Cafe dining hero + image-bound 04 afterglow close; three-scale QA PASS.
- IM `2087:2`: 1DAY unequal photo mosaic route; three-scale QA PASS.

Dedicated evidence files preserve detailed change history and rollback references.

## Drive / asset truth

Drive V6 root reverified during IR work:

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
- RSL-173: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; if ordered content already has reliable sequence cues, test whether a visible rail can be removed and hierarchy expressed by unequal editorial beats. Any retained separator must still prove a binding function at whole-item scale. Failed fingerprint: dark utility copy crossing into photography without a verified contrast zone.
- RSL-172: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when a print cover has a semantically correct dominant image but reads as stacked header/body sections, test a continuous image field behind native editable type before generating another asset or adding decoration. Preserve a support field if it proves a real contrast/binding/physical role.
- RSL-170: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; promote an existing semantically legitimate chronology image to a structural beat before adding another module.
- RSL-169: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; use an existing legitimate support image to bind a hero-to-closing narrative before generating another asset.
- RSL-168: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; repeated semantic steps do not require repeated visual geometry.
- RSL-167: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when blank paper behaves as a false section divider, test moving existing downstream content closer before adding decoration.
- RSL-166: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when a print profile reads as stacked modules, test changing image orientation and binding facts beside it before adding boxes.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 IQ + IP + IR + IH + IN + IM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run the common-scale preferred-set comparison using `IQ + IP + IR + IH + IN + IM` and select the next weakest page.
4. Do not keep polishing IR merely because it is newest.
5. Keep ID, IK, IO, IL, IE, IG, IJ, HU, IF, GY, HS, HT and HC hidden as rollback/comparison evidence.
6. Stress-test final-real-photo replacement against current dominant crops before treating dummy compositions as stable.
7. Stress-test longer real profile facts against IP's narrow profile fact column before final copy lock.
8. Keep photo-semantic truth and source fidelity above repetition-count targets.
9. Keep native copy and rerun realistic long-copy stress after material layout/type changes.
10. Never invent unresolved dates/details for visual completeness.
11. Keep generated section masters unadopted until quality-preserving transport materially improves.
12. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
