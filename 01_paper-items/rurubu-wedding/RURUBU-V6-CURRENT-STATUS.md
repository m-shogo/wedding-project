# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_IU_PREFERRED / PROFILE_QA_IX_PREFERRED / STORY_CHRONOLOGY_IR_PREFERRED / MEMORY_SPOTS_IZ_PREFERRED / GOURMET_CAFE_IT_PREFERRED / ONE_DAY_PLAN_JA_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / IU_IX_IR_IZ_IT_JA_THREE_SCALE_DUMMY_DESIGN_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer IU `2124:2`; x=`272000`, y=`0`.
- Profile / Q&A IX `2132:101`; profile left `2132:102`; Q&A right preserved from IP; x=`273800`, y=`0`.
- Story / Chronology IR `2104:2`; chronology right `2104:28`; x=`275600`, y=`0`.
- Memory Spots IZ `2138:2`; lead left `2138:3`; guide right preserved from IV; x=`272000`, y=`1300`.
- Gourmet / Cafe IT `2116:65`; left `2116:66`; dining right `2116:96`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan JA `2141:2`; left `2141:3`; right preserved from IW; x=`275600`, y=`1300`.

## Rollback / comparison

- IW `2131:2`: hidden rollback for JA 1DAY, x=`291900`, y=`1300`.
- IV `2127:2`: hidden rollback for IZ Memory Spots, x=`288400`, y=`1300`.
- IP `2096:2`: hidden rollback for IX Profile / Q&A, x=`286600`, y=`0`.
- IM `2087:2`: earlier hidden 1DAY rollback, x=`284800`, y=`1300`.
- IQ `2099:2`: hidden rollback for IU outer, x=`283000`, y=`0`.
- IH `2077:2`: earlier hidden Memory Spots rollback, x=`283000`, y=`1300`.
- IS `2110:2`: hidden rollback for IT Gourmet / Cafe.
- ID `2051:2`, IK `2084:2`, IO `2095:18`, IN `2091:2`, IL `2085:2`, IE `2061:2`, IG `2073:2`, IJ `2080:2`, HU `2044:2`, IF `2067:2`, GY `2003:2`, HN `2029:2`, IC `2049:47`, HK `2027:2`, HT `2040:2`, HR `2033:111`, HC `2012:2`, HS `2019:2`: earlier hidden rollback/comparison frames.
- Earlier comparison frames remain hidden and preserved.

## Latest verified progress — JA Yokohama 1DAY

Fresh common-scale review of `IU + IX + IR + IZ + IT + IW` selected the 1DAY left page as the next macro defect. IW already had a strong waterfront hero and asymmetric right route page, but after the hero the left page dropped into a relatively sparse two-column cream information field. At whole-item scale this still read as `large hero → utility footer → dead lower reserve`.

Bounded JA test:

1. IW `2131:2` duplicated rollback-safely to JA `2141:2`; right page preserved unchanged.
2. Existing verified waterfront hero on JA left was extended from `793.7×650` to `793.7×720` while keeping the same source and y=`70`.
3. Existing `START / 海辺`, `10:00`, start title and start copy moved with the extended photo so their semantic ownership remained attached to the same photographic event.
4. Existing lower cyan rule moved to y=`820` and widened `135 → 330` to bind the close.
5. Existing `旅のコツ + 01 + 寄り道、歓迎。` and `横浜1DAYメモ + four values + closing quote` were consolidated into a tighter lower editorial field.
6. No new card, badge, sticker, shadow, gradient, text, image, generated decoration, or external binary was added.
7. Native editable text and existing replaceable IMAGE structure were preserved.

JA evidence:

- whole spread / 500 px: PASS and stronger than IW;
- reading / 1400 px: PASS;
- actual left page / native `794×1123`: PASS;
- JA-left visible native text: `19`;
- JA-left IMAGE-fill nodes: `1`;
- same-parent text intersections: `0`;
- 18 px text safe-area risks: `0`;
- whole-page flattening: NO;
- right route page: preserved from IW without layout edits.

Promotion:

- JA `2141:2` → `PREFERRED / V6_INSIDE_JA_1DAY_DENSE_EDITORIAL_CLOSE_2026_08_21`, live x=`275600`, y=`1300`.
- IW `2131:2` → `ROLLBACK / V6_INSIDE_IW_1DAY_DOMINANT_STREET_POSTCARD_2026_08_21`, hidden x=`291900`, y=`1300`.

Decision: `JA ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-JA-1DAY-DENSE-EDITORIAL-CLOSE-QA-2026-08-21.md`.

## Prior preferred state retained

- IU `2124:2`: full-bleed outer editorial cover; three-scale QA PASS.
- IX `2132:101`: full-width profile travel hero + compact fact band; three-scale QA PASS.
- IR `2104:2`: chronology rail replaced by unequal editorial beats; three-scale QA PASS.
- IZ `2138:2`: Memory Spots hero-to-postcard overlap; three-scale QA PASS.
- IT `2116:65`: Gourmet / Cafe photo-led opening; three-scale QA PASS.

## Drive / asset truth

Drive V6 root reverified before JA promotion:

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

- Shared system, Rurubu feed, neutral non-Rurubu feed surface and project-wide production authority were consumed under the scope firewall before durable writes.
- No non-Rurubu item-specific Figma, Drive, ledger, asset or GitHub production path was inspected or edited.
- RSL-181: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; when a legitimate dominant photo hands off to a visibly underweighted utility-like closing field, test extending the existing visual field and recomposing existing native information before adding assets or containers. Crop/readability/safe-area checks remain mandatory.
- RSL-180 and earlier lessons remain governed by their recorded states.
- Literal Rurubu layout, palette, imagery, crop, numbering, coordinates, headline treatment and travel-magazine grammar are not transferable project rules.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 IU + IX + IR + IZ + IT + JA = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run common-scale comparison using `IU + IX + IR + IZ + IT + JA`; do not edit JA merely because it is newest.
4. Keep all prior comparison/rollback frames hidden and preserved.
5. Stress-test final-real-photo replacement against dominant crops before treating dummy compositions as stable.
6. Stress-test longer real profile facts against IX's 3×2 fact band and rerun text/background contrast at final role positions.
7. Stress-test IZ/Memory metadata/captions and JA 1DAY lower close with final longer copy before final copy lock.
8. Keep photo-semantic truth and source fidelity above repetition-count targets.
9. Never invent unresolved dates/details for visual completeness.
10. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
