# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_ID_PREFERRED / PROFILE_QA_HU_PREFERRED / STORY_CHRONOLOGY_HT_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_HC_PREFERRED / ONE_DAY_PLAN_HS_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ID_HU_HT_WHOLE_AND_ACTUAL_SIZE_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live state on `845:2 / 00_RURUBU_START_HERE`:

- Outer ID `2051:2`; preferred at the former HN Current position. It combines HN's verified back cover with a new photo-led clean-room front.
- Profile / Q&A HU `2044:2`; Q&A right `2044:49`; x `273800`, y `0`.
- Story / chronology HT `2040:2`; timeline right `2040:28`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; x `272000`, y `1300`.
- Gourmet / Cafe HC `2012:2`; x `273800`, y `1300`.
- Yokohama 1DAY Plan HS `2019:2`; x `275600`, y `1300`.

Start Here `845:27` now identifies `V6 ID` rather than HN.

Rollback / comparison:

- HN `2029:2` hidden rollback for ID.
- IC `2049:47` hidden clean-room whole-spread study; its front direction won, while its back chronology was not adopted.
- HK `2027:2` hidden rollback for HU.
- HR `2033:111` hidden rollback for HT.
- earlier comparisons remain hidden and preserved.

## Latest verified progress

### ID outer — hybrid clean-room promotion

Visible problem in HN: the back cover had matured into a strong photo-led travel-note + chronology page, but the front still read as a full-width cream masthead/header followed by a horizontal hero section. At thumbnail scale the front retained a stacked-section rhythm that felt less like a real Japanese travel-information magazine than the strongest V6 inside spreads.

Bounded clean-room test:

1. IC `2049:47` rebuilt the whole outer spread from existing verified Rurubu image fills and native-text sources with a more photo-led front: the waterfront hero extends to the top, the masthead becomes a bounded cream support over the photograph, the issue lockup remains independent, and the lower half uses one editorial feature column + one support photograph rather than repeated card geometry.
2. IC's clean-room back chronology was intentionally evaluated separately. It improved simplicity but lost the useful information density of HN's mature back cover, so the whole IC spread was not adopted.
3. ID `2051:2` therefore combines the stronger HN back with the stronger IC front. HN and IC remain hidden rollback/comparison evidence.

ID three-scale evidence:

- whole-item / 500px: PASS; front reads more photo-led and less like a stacked web section than HN.
- reading / 1400px: PASS; masthead, Feature 01 and lower Feature 03/support-photo hierarchy remain distinct.
- actual-size / 1588×1123 render: PASS; small cover lines and captions remain legible in the editable dummy-design state.
- effective visible native text: `35`.
- effective visible IMAGE fills: `5`.
- effective text intersections: `0`.
- 18px safe-area risk: `0`.
- original HN front inside ID: hidden rollback only.
- native text retained; no whole-page flattening.
- existing verified image fills reused; no new image generation, Drive save, external upload, or image-hash claim.

Decision: `ID ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

### HT chronology

Removed three now-redundant decorative bars/fields after photo + native-type hierarchy had matured. The first HT geometry exposed Event 05 collisions/safe-area violations; it was corrected before promotion.

Final HT timeline `2040:28 / 794×1123`:

- native text `27`;
- visible image roles `2`;
- collision `0`;
- 18px safe-area risk `0`;
- stray text `0`;
- image hashes unchanged.

### HU Q&A

HK Q&A retained four thin separator/binding rules that no longer carried unique structure. HU removed only those four rules while preserving the yellow section kicker and cyan photo-caption field because those still provide meaningful category/contrast function.

Final HU Q&A `2044:49 / 794×1123`:

- native text `29`;
- replaceable photos `2`;
- collision `0`;
- 18px safe-area risk `0`;
- stray text `0`;
- image geometry/hash unchanged.

Decision: `HU + HT ADOPTED / VERIFIED_LOCAL`.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Existing generated section masters remain saved in Drive and unadopted in current preferred spreads.

This run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- ID built from existing verified Rurubu image fills: YES;
- HN/IC preserved hidden as rollback/comparison: YES;
- native variable text preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed and neutral non-Rurubu feed were read before writes.
- No non-Rurubu item-specific Figma/Drive/ledger/asset/GitHub path was inspected or edited.
- New local finding: when a clean-room whole-spread redesign improves one page but regresses the other, promotion should be page/role-selective rather than version-monolithic. The strongest verified combination may be a hybrid if native structure/provenance remain intact and rollback is preserved.
- The transferable principle is the comparison method, not HN/IC/ID geometry, palette, photographs or Rurubu visual grammar.
- The first IC build hit unsupported `setPluginData`; the atomic rollback was corrected by removing the unsupported call rather than repeating it. Fingerprint: `FIGMA_HOST_SETPLUGINDATA_UNSUPPORTED`.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 ID + HU/HT + GY + HC + HS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma and latest GitHub main before every write.
3. Compare ID + HU/HT + GY + HC + HS at the same thumbnail scale; select the next weakest page rather than polishing ID merely because it is newest.
4. Keep ID's front masthead/photo relationship only if it remains stronger after realistic final cover-line and real-photo replacement stress.
5. Keep HN/IC hidden as rollback/comparison evidence until the next outer comparison is stable.
6. Retain a decorative field only when its contrast/binding/category function is visible and necessary.
7. Keep photo-semantic truth and source fidelity above repetition-count targets.
8. Keep Q&A/profile copy native and rerun realistic long-copy stress after material layout/type changes.
9. Never invent unresolved dates/details for visual completeness.
10. Keep generated section masters unadopted until quality-preserving transport materially improves.
11. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
