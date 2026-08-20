# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_ID_PREFERRED / PROFILE_QA_HU_PREFERRED / STORY_CHRONOLOGY_IF_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_IE_PREFERRED / ONE_DAY_PLAN_HS_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ID_HU_IF_IE_WHOLE_AND_ACTUAL_SIZE_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer ID `2051:2`.
- Profile / Q&A HU `2044:2`; Q&A right `2044:49`; x `273800`, y `0`.
- Story / chronology IF `2067:2`; chronology right `2067:28`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; x `272000`, y `1300`.
- Gourmet / Cafe IE `2061:2`; café left `2061:3`; x `273800`, y `1300`.
- Yokohama 1DAY Plan HS `2019:2`; x `275600`, y `1300`.

Start Here `845:27` still identifies `V6 ID` for the outer current marker.

## Rollback / comparison

- HN `2029:2`: hidden rollback for ID.
- IC `2049:47`: hidden clean-room outer study; front principle adopted through ID, whole spread not adopted.
- HK `2027:2`: hidden rollback for HU.
- HT `2040:2`: hidden rollback for IF chronology.
- HR `2033:111`: earlier hidden chronology rollback.
- HC `2012:2`: hidden rollback for IE Gourmet/Cafe.
- earlier comparison frames remain hidden and preserved.

## Latest verified progress

### IF Story/Chronology — vertical journey route promotion

After IE replaced HC, the common 500px preferred-set comparison made the HT chronology right page the next visual bottleneck. HT was structurally clean but the six moments still read as independent labels floating across a large cream field; the chronology itself lacked one continuous editorial reading device.

Bounded clean-room IF test:

1. IF `2067:2` was created from HT as a rollback-safe duplicate; the left story page was intentionally preserved.
2. The existing route rail and six nodes were activated as a vertical journey spine rather than introducing card/table modules.
3. Existing native event numerals and title/copy stacks were redistributed asymmetrically around the spine.
4. Existing Event 03 photograph was enlarged and slightly rotated as a strong mid-page stop.
5. Event 03 white title/copy was moved back onto the photograph when reading-scale QA showed cream-background contrast loss.
6. The first aggressive IF geometry produced seven unintended native-text intersections. Event 01, Event 05 and Event 06 spacing/widths were corrected before promotion; final readback returned zero intersections.
7. No unresolved fact/date was invented.

IF three-scale evidence:

- whole-item / 500px: PASS; chronology reads as one journey rather than scattered labels.
- reading / 1400px: PASS after Event 03 contrast and event-spacing corrections.
- actual-size right `2067:28 / 794×1123`: PASS; hero title, route spine, Event 03 image/title, Event 05 and Event 06 terminal information remain readable.
- visible native text `27`.
- visible IMAGE fills `2`.
- text intersections `0`.
- 18px text safe-area risks `0`.
- whole-page flattening: NO.
- existing replaceable image roles preserved: YES.

Promotion:

- IF `2067:2` → `PREFERRED / V6_INSIDE_IF_TIMELINE_VERTICAL_ROUTE_CLEANROOM_2026_08_21`, x=`275600`, y=`0`, visible.
- HT `2040:2` → hidden rollback, not deleted.

Decision: `IF ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IF-TIMELINE-VERTICAL-ROUTE-QA-2026-08-21.md`.

### IE Gourmet/Cafe — clean-room photo-led left-page promotion

HC's left page was the weakest spread in the previous common 500px comparison because a large pale composed texture/background field carried hierarchy while legitimate photography remained small. The right dining page was already strong.

IE `2061:2` replaced that pseudo-hero field with an existing verified Rurubu café/dessert image from `2003:15`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`, as the dominant café photograph; the prior waterfront fill became a smaller support role. Native Feature 01/02 copy was re-clustered directly around photography without new cards/shadows/gradients. Early collision geometry and an over-narrow Feature 02 were corrected before promotion.

IE evidence:

- 500px whole spread: PASS.
- 1400px reading scale: PASS.
- actual-size left `2061:3 / 794×1123`: PASS.
- left native text `20`, visible IMAGE fills `2`, intersections `0`, 18px safe risks `0`.
- right native text `22`, visible IMAGE fills `1`, intersections `0`, 18px safe risks `0`.
- native text retained; no whole-page flattening.

Promotion:

- IE `2061:2` preferred at x=`273800`, y=`1300`.
- HC `2012:2` hidden rollback.

Decision: `IE ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IE-GOURMET-CLEANROOM-PHOTO-LED-QA-2026-08-21.md`.

### ID / HU prior verified state

- ID `2051:2`: photo-led clean-room front + HN's stronger back, three-scale dummy-design QA PASS, visible native text `35`, visible IMAGE fills `5`, intersections `0`, 18px safe risk `0`.
- HU `2044:2`: Q&A native structure retained; right `2044:49` native text `29`, replaceable photos `2`, collisions `0`, 18px safe risk `0`.

## Drive / asset truth

Drive V6 root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Existing generated section masters remain saved in Drive and unadopted in the current preferred spreads.

Current-run asset state:

- newly generated assets: `0`;
- adopted newly generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- IE reused an existing verified Rurubu image fill: YES;
- IF reused existing HT image fills: YES;
- native variable text preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed and neutral non-Rurubu feed were read before writes.
- No non-Rurubu item-specific Figma/Drive/ledger/asset/GitHub path was inspected or edited.
- RSL-161 records the locally verified IE finding: a decorative pseudo-hero can sometimes be replaced by a legitimate dominant content photo rather than adding more decoration.
- IF locally verifies a separate hypothesis: chronological labels that feel disconnected may benefit from one functional route/spine, provided aggressive editorial geometry is still corrected back to zero unintended text collisions before promotion.
- These are methods/hypotheses, not permission to transfer IE/IF geometry, photographs, palette, dates, numbers or Rurubu visual grammar to other wedding items.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 ID + HU + IF + GY + IE + HS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run the common-scale preferred-set comparison using ID + HU + IF + GY + IE + HS and select the next weakest page.
4. Do not keep polishing IE or IF merely because they are newest.
5. Keep HT and HC hidden as rollback/comparison evidence.
6. Stress-test final-real-photo replacement against the current dominant crops before treating the dummy composition as stable.
7. Keep photo-semantic truth and source fidelity above repetition-count targets.
8. Keep native copy and rerun realistic long-copy stress after material layout/type changes.
9. Never invent unresolved dates/details for visual completeness.
10. Keep generated section masters unadopted until quality-preserving transport materially improves.
11. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
