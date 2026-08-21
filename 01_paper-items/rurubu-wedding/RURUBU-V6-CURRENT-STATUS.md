# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_IU_PREFERRED / PROFILE_QA_IX_PREFERRED / STORY_CHRONOLOGY_IR_PREFERRED / MEMORY_SPOTS_IV_PREFERRED / GOURMET_CAFE_IT_PREFERRED / ONE_DAY_PLAN_IW_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / IU_IX_IR_IV_IT_IW_THREE_SCALE_DUMMY_DESIGN_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer IU `2124:2`; x=`272000`, y=`0`.
- Profile / Q&A IX `2132:101`; profile left `2132:102`; Q&A right preserved from IP; x=`273800`, y=`0`.
- Story / Chronology IR `2104:2`; chronology right `2104:28`; x=`275600`, y=`0`.
- Memory Spots IV `2127:2`; guide right `2127:24`; x=`272000`, y=`1300`.
- Gourmet / Cafe IT `2116:65`; left `2116:66`; dining right `2116:96`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan IW `2131:2`; right `2131:33`; x=`275600`, y=`1300`.

## Rollback / comparison

- IP `2096:2`: hidden rollback for IX Profile / Q&A, x=`286600`, y=`0`.
- IM `2087:2`: hidden rollback for IW 1DAY, x=`284800`, y=`1300`.
- IQ `2099:2`: hidden rollback for IU outer, x=`283000`, y=`0`.
- IH `2077:2`: hidden rollback for IV Memory Spots, x=`283000`, y=`1300`.
- IS `2110:2`: hidden rollback for IT Gourmet / Cafe.
- ID `2051:2`, IK `2084:2`, IO `2095:18`, IN `2091:2`, IL `2085:2`, IE `2061:2`, IG `2073:2`, IJ `2080:2`, HU `2044:2`, IF `2067:2`, GY `2003:2`, HN `2029:2`, IC `2049:47`, HK `2027:2`, HT `2040:2`, HR `2033:111`, HC `2012:2`, HS `2019:2`: earlier hidden rollback/comparison frames.
- Earlier comparison frames remain hidden and preserved.

## Latest verified progress

### IW Yokohama 1DAY — dominant street field + dinner postcard

Fresh six-spread comparison found that IM's right page, although already asymmetric, still resolved into separate lower Stop 03/04 rectangles and retained a mild tile/dashboard cadence.

Bounded IW test:

1. IM `2087:2` duplicated rollback-safely to IW `2131:2`; left page preserved.
2. Stop 03 street image expanded from `360×220` to `560×292` and became the dominant lower photographic field.
3. Stop 04 dining image reduced from `366×200` to `280×176` and became an overlapping support/postcard beat.
4. Stop numbers, times, titles, copy and metadata remained native/editable.
5. Initial structure QA found folio bottom reserve `12 px` and Stop 04 metadata right reserve `8.7 px`; folio moved `1098 → 1090` and metadata width `285 → 265` before promotion.
6. Existing verified photo fills/hashes were preserved; no new asset or decoration was added.

IW evidence:

- whole spread / 500 px: PASS;
- reading / 1400 px: PASS;
- actual right page / `794×1123`: PASS;
- right visible native text `24`;
- right IMAGE-fill nodes `4`;
- text intersections `0`;
- 18 px safe-area risks `0`;
- native text / replaceable photos preserved: YES;
- whole-page flattening: NO.

Promotion:

- IW `2131:2` → `PREFERRED / V6_INSIDE_IW_1DAY_DOMINANT_STREET_POSTCARD_2026_08_21`, live x=`275600`, y=`1300`.
- IM `2087:2` → hidden rollback x=`284800`, y=`1300`.

Decision: `IW ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

### IX Profile / Q&A — full-width travel hero + editorial fact band

After IW promotion the same common-scale review selected Profile as the next macro defect. IP used a strong travel/camera photograph, but six facts remained stacked in a narrow side column, so the page still read partly as `content + web sidebar` even without cards.

Bounded IX test:

1. IP `2096:2` duplicated rollback-safely to IX `2132:101`; Q&A right page preserved unchanged.
2. Main photo expanded from `520×640` to `793.7×500`, making the travel image a full-width editorial field.
3. The same six native facts were regrouped into a compact `3 columns × 2 rows` band below the hero.
4. Existing waterfront/street photos remained verified replaceable fills and were rebalanced as the lower collage.
5. `03 次の旅へ。` remained the closing editorial beat.
6. First render exposed inherited white title text after `ふたりの旅プロフィール` moved from image to cream paper. Candidate was held, title changed to the existing navy text color, and all scales were rechecked.
7. A prior script targeting the wrong exact child-frame name failed atomically before mutation; live child-name readback corrected the method before retry.

IX evidence:

- whole spread / 500 px: PASS;
- reading / 1400 px: PASS;
- actual left page / `794×1123`: PASS;
- full-spread visible native text `54`;
- full-spread IMAGE-fill nodes `5`;
- same-parent text intersections `0`;
- 18 px safe-area risks `0`;
- native variable copy / replaceable photos preserved: YES;
- whole-page flattening: NO.

Promotion:

- IX `2132:101` → `PREFERRED / V6_PROFILE_IX_WIDE_HERO_FACT_BAND_2026_08_21`, live x=`273800`, y=`0`.
- IP `2096:2` → hidden rollback x=`286600`, y=`0`.

Decision: `IX ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence for both: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IW-IX-1DAY-PROFILE-EDITORIAL-HIERARCHY-QA-2026-08-21.md`.

### Prior preferred state retained

- IU `2124:2`: full-bleed outer editorial cover; three-scale QA PASS.
- IR `2104:2`: chronology rail replaced by unequal editorial beats; three-scale QA PASS.
- IV `2127:2`: Memory Spots editorial information tail; three-scale QA PASS.
- IT `2116:65`: Gourmet / Cafe photo-led opening; three-scale QA PASS.

## Drive / asset truth

Drive V6 root reverified during this run:

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

- Shared system, Rurubu feed, neutral non-Rurubu feed, Hybrid Authoring policy and Rurubu production/editorial authorities were read before durable writes.
- No non-Rurubu item-specific Figma/Drive/ledger/asset/GitHub path was inspected or edited.
- RSL-178: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; unequal photo sizes can still read as a dashboard if every image retains separate module ownership. Test one dominant visual field plus a truly subordinate support role before adding more modules.
- RSL-179: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; a narrow factual sidebar can create UI reading without cards. Role-width redistribution may improve editorial hierarchy, but any text moved between image/paper contexts requires fresh contrast QA.
- RSL-176/177 and earlier lessons remain governed by their recorded states.
- Literal Rurubu layout, palette, imagery, route numbering, coordinates, masthead treatment and photo overlaps are not transferable project rules.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 IU + IX + IR + IV + IT + IW = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run common-scale comparison using `IU + IX + IR + IV + IT + IW`; do not edit IX/IW merely because they are newest.
4. Keep all prior comparison/rollback frames hidden and preserved.
5. Stress-test final-real-photo replacement against dominant crops before treating dummy compositions as stable.
6. Stress-test longer real profile facts against IX's 3×2 fact band and rerun text/background contrast at the final role positions.
7. Stress-test IV's continuous metadata tail with final longer labels before final copy lock.
8. Keep photo-semantic truth and source fidelity above repetition-count targets.
9. Never invent unresolved dates/details for visual completeness.
10. Keep printer/PDF/physical-proof gates separate from dummy-design QA.