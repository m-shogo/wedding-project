# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-21
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_ID_PREFERRED / PROFILE_QA_HU_PREFERRED / STORY_CHRONOLOGY_HT_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_IE_PREFERRED / ONE_DAY_PLAN_HS_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ID_HU_HT_IE_WHOLE_AND_ACTUAL_SIZE_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live state on `845:2 / 00_RURUBU_START_HERE`:

- Outer ID `2051:2`; preferred at the former HN Current position. It combines HN's verified back cover with a new photo-led clean-room front.
- Profile / Q&A HU `2044:2`; Q&A right `2044:49`; x `273800`, y `0`.
- Story / chronology HT `2040:2`; timeline right `2040:28`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; x `272000`, y `1300`.
- Gourmet / Cafe IE `2061:2`; left `2061:3`; x `273800`, y `1300`.
- Yokohama 1DAY Plan HS `2019:2`; x `275600`, y `1300`.

Start Here `845:27` still identifies `V6 ID` for the outer current marker.

Rollback / comparison:

- HN `2029:2` hidden rollback for ID.
- IC `2049:47` hidden clean-room whole-spread study; its front direction won, while its back chronology was not adopted.
- HC `2012:2` hidden rollback for IE.
- HK `2027:2` hidden rollback for HU.
- HR `2033:111` hidden rollback for HT.
- earlier comparisons remain hidden and preserved.

## Latest verified progress

### IE Gourmet/Cafe — clean-room photo-led left-page promotion

Visible problem in HC: at the same 500px comparison scale used for the full preferred V6 set, the Gourmet/Cafe left page was the weakest current page. It relied on a large pale composed texture field, one small waterfront photo and separated type clusters, so it read more like a sparse brochure/web section than a Japanese travel-information magazine page. The right-page dining hero was already strong and was intentionally preserved.

Bounded clean-room test:

1. IE `2061:2` was created as a rollback-safe duplicate of HC rather than editing HC in place.
2. The left composed texture field was hidden and the existing replaceable lead-photo role was reassigned to an already-verified Rurubu café/dessert image from `2003:15`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`.
3. The former waterfront view image remained as a smaller support role rather than becoming another hero.
4. Existing native Japanese copy was re-clustered directly around the dominant photo. No new card, shadow, gradient or rounded UI container was added.
5. Early IE geometry exposed two absolute text intersections (`CAFE_NUM↔CAFE_TITLE` and `VIEW_NUM↔VIEW_TITLE`). Those were corrected before promotion. A later thumbnail review also showed Feature 02 becoming too narrow; its title/copy role was widened and the support photo shifted right.

IE three-scale evidence:

- whole-item / 500px: PASS; left page is immediately more photo-led, denser and more editorial than HC without increasing UI-like containment.
- reading / 1400px: PASS after headline-height/copy-position and Feature 02 width corrections.
- actual-size left `2061:3 / 794×1123`: PASS; dominant café photo retains useful table/flower/camera detail and native headline/copy remain readable.
- left native text `20`; left visible IMAGE fills `2`; text intersections `0`; 18px text safe-area risks `0`.
- right native text `22`; right visible IMAGE fills `1`; text intersections `0`; 18px text safe-area risks `0`.
- native text retained; no whole-page flattening.
- no new generated asset, Drive save, upload or image hash was introduced.

Promotion:

- IE `2061:2` renamed `PREFERRED / V6_INSIDE_IE_GOURMET_CLEANROOM_PHOTO_LED_LEFT_2026_08_21` and moved into the former Gourmet/Cafe preferred position `x=273800, y=1300`.
- HC `2012:2` renamed rollback and hidden, not deleted.

Decision: `IE ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IE-GOURMET-CLEANROOM-PHOTO-LED-QA-2026-08-21.md`.

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

This IE experiment:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing Rurubu image fill reused from `2003:15`: YES;
- HC preserved hidden as rollback: YES;
- native variable text preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed and neutral non-Rurubu feed were read before writes.
- No non-Rurubu item-specific Figma/Drive/ledger/asset/GitHub path was inspected or edited.
- IE locally verifies that a sparse print page whose hierarchy is being carried by a large decorative/background field can improve materially when an already-legitimate photo takes the dominant role and native type is clustered directly around it.
- The first IE geometry also confirms that aggressive magazine scale/overlap must still return to zero unintended text intersections before promotion; intentional visual energy is not permission to accept unreadable collision.
- The transferable principle is the test method, not IE's café image, giant `01/02`, photo ratios, palette or Rurubu grammar.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer template, bleed/trim/fold/safe-area requirements, exported PDF preflight and physical proof are verified.

Current state:

`V6 ID + HU/HT + GY + IE + HS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live Figma, Drive and latest GitHub main before every write.
3. Re-run the common-scale preferred-set comparison using ID + HU/HT + GY + IE + HS; select the next weakest page rather than polishing IE merely because it is newest.
4. Keep IE only if realistic final café/venue photography replacement preserves the dominant-photo crop and title-safe relationship.
5. Keep HC hidden as rollback/comparison evidence until the next Gourmet/Cafe comparison is stable.
6. Retain a decorative field only when its contrast/binding/category function is visible and necessary.
7. Keep photo-semantic truth and source fidelity above repetition-count targets.
8. Keep Q&A/profile copy native and rerun realistic long-copy stress after material layout/type changes.
9. Never invent unresolved dates/details for visual completeness.
10. Keep generated section masters unadopted until quality-preserving transport materially improves.
11. Keep printer/PDF/physical-proof gates separate from dummy-design QA.
