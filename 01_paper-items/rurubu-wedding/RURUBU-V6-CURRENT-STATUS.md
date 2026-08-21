# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_IU_PREFERRED / PROFILE_QA_IX_PREFERRED / STORY_CHRONOLOGY_JB_PREFERRED / MEMORY_SPOTS_IZ_PREFERRED / GOURMET_CAFE_IT_PREFERRED / ONE_DAY_PLAN_JA_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / IU_IX_JB_IZ_IT_JA_THREE_SCALE_DUMMY_DESIGN_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer IU `2124:2`; x=`272000`, y=`0`.
- Profile / Q&A IX `2132:101`; profile left `2132:102`; Q&A right preserved from IP; x=`273800`, y=`0`.
- Story / Chronology JB `2144:2`; chronology right `2144:28`; x=`275600`, y=`0`.
- Memory Spots IZ `2138:2`; lead left `2138:3`; guide right preserved from IV; x=`272000`, y=`1300`.
- Gourmet / Cafe IT `2116:65`; left `2116:66`; dining right `2116:96`; x=`273800`, y=`1300`.
- Yokohama 1DAY Plan JA `2141:2`; left `2141:3`; right preserved from IW; x=`275600`, y=`1300`.

## Rollback / comparison

- IR `2104:2`: hidden rollback for JB Story / Chronology, x=`293700`, y=`0`.
- IW `2131:2`: hidden rollback for JA 1DAY, x=`291900`, y=`1300`.
- IV `2127:2`: hidden rollback for IZ Memory Spots, x=`288400`, y=`1300`.
- IP `2096:2`: hidden rollback for IX Profile / Q&A, x=`286600`, y=`0`.
- IM `2087:2`: earlier hidden 1DAY rollback, x=`284800`, y=`1300`.
- IQ `2099:2`: hidden rollback for IU outer, x=`283000`, y=`0`.
- IH `2077:2`: earlier hidden Memory Spots rollback, x=`283000`, y=`1300`.
- IS `2110:2`: hidden rollback for IT Gourmet / Cafe.
- Earlier comparison frames remain hidden and preserved.

## Latest verified progress — JB Story / Chronology

Fresh common-scale review of `IU + IX + IR + IZ + IT + JA` selected the Story / Chronology right page as the next macro defect. IR already removed the legacy timeline rail and used a strong hero + Event 03 photo + 05/06 terminal beats, but Event 04 `同棲` still floated as a small cream-space label beside the dominant Event 03 photograph. At thumbnail scale this retained a residual list/utility reading.

Bounded JB test:

1. IR `2104:2` duplicated rollback-safely to JB `2144:2`; left Story page preserved unchanged.
2. Existing Event 03 photo kept the same verified hash but changed from `x=208 y=535 w=552 h=286` to `x=175 y=510 w=585 h=310`.
3. Event 03 native number/title/copy were rebalanced within the photographic beat.
4. One square-corner yellow editorial strip `2144:111` was added at `x=18 y=726 w=305 h=96`, overlapping the lower-left edge of the Event 03 photo.
5. Existing native Event 04 number/title/copy moved onto that strip so 04 reads as an attached follow-up event rather than a detached utility label.
6. Existing cyan handoff rule moved to `y=846` so the middle 03/04 beat closes before 05/06.
7. Reading-scale QA exposed the inherited white `01 / 旅のはじまり` photo caption as redundant/stranded on the new strip; it was hidden and all three scales were rerun.
8. No new photography, generated asset, Drive save, upload, image hash, shadow, gradient, rounded card, or whole-page rasterization was introduced.

JB evidence:

- whole spread / 500 px: PASS and stronger than IR;
- reading / 1400 px: PASS;
- actual chronology right / native `794×1123`: PASS;
- visible native text on JB right: `26`;
- visible IMAGE-fill nodes on JB right: `2`;
- visible hashes unchanged: `e3738476f760932bb5b09c9d60f174dd6c84049d`, `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- text intersections: `0`;
- 18 px text safe-area risks: `0`;
- whole-page flattening: NO.

Promotion:

- JB `2144:2` → `PREFERRED / V6_INSIDE_JB_STORY_CHRONOLOGY_LINKED_EVENT04_2026_08_21`, live x=`275600`, y=`0`.
- IR `2104:2` → `ROLLBACK / V6_INSIDE_IR_STORY_CHRONOLOGY_CLEANROOM_PHOTO_BAND_2026_08_21`, hidden x=`293700`, y=`0`.

Decision: `JB ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-JB-CHRONOLOGY-LINKED-EVENT04-QA-2026-08-21.md`.

## Prior preferred state retained

- IU `2124:2`: full-bleed outer editorial cover; three-scale QA PASS.
- IX `2132:101`: full-width profile travel hero + compact fact band; three-scale QA PASS.
- IZ `2138:2`: Memory Spots hero-to-postcard overlap; three-scale QA PASS.
- IT `2116:65`: Gourmet / Cafe photo-led opening; three-scale QA PASS.
- JA `2141:2`: 1DAY waterfront hero + dense lower editorial close; three-scale QA PASS.

## Drive / asset truth

Drive V6 root reverified before JB writes:

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
- RSL-182: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; sequential information can remain utility-like when semantic adjacency lacks visual attachment. A bounded binder may be tested only when it visibly connects a dominant role and a related subordinate role at whole-item scale.
- The first JB refinement exposed fingerprint `F-RSL-182-ATTACHED-BEAT-OLD-CAPTION-STRANDING`: after changing ownership/binding of a photo beat, inherited captions must be re-audited rather than assumed valid.
- Literal Rurubu strip color, photo crop, numbering, coordinates, palette and travel-magazine grammar remain Rurubu-specific.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 IU + IX + JB + IZ + IT + JA = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run common-scale comparison using `IU + IX + JB + IZ + IT + JA`; do not edit JB merely because it is newest.
4. Keep all prior comparison/rollback frames hidden and preserved.
5. Stress-test final-real-photo replacement against dominant crops before treating dummy compositions as stable.
6. Stress-test longer real profile facts against IX's 3×2 fact band and rerun text/background contrast at final role positions.
7. Stress-test IZ/Memory metadata/captions and JA 1DAY lower close with final longer copy before final copy lock.
8. Keep photo-semantic truth and source fidelity above repetition-count targets.
9. Never invent unresolved dates/details for visual completeness.
10. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
