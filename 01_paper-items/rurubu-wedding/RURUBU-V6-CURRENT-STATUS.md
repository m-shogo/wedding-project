# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_HN_PREFERRED / PROFILE_QA_HK_PREFERRED / STORY_CHRONOLOGY_HT_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_HC_PREFERRED / ONE_DAY_PLAN_HS_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / HT_WHOLE_AND_ACTUAL_SIZE_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE` after HT promotion:

- Outer HN `2029:2`; x `272000`, y `0`.
- Profile / Q&A HK `2027:2`; x `273800`, y `0`.
- Story / chronology HT `2040:2`; timeline right `2040:28`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; x `272000`, y `1300`.
- Gourmet / Cafe HC `2012:2`; x `273800`, y `1300`.
- Yokohama 1DAY Plan HS `2019:2`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 HN + HK/HT + GY MEMORY SPOTS + HC CAFE & TABLE + HS 1DAY PLAN · V7 HOLD`

Rollback / comparison evidence:

- HR `2033:111` hidden rollback for HT.
- HJ `2024:2` remains earlier hidden rollback.
- HD `2014:2` hidden rollback for HN.
- GZ `2004:2` hidden rollback for HK.
- earlier preferred/rejected studies remain hidden and preserved.

## Latest verified progress — HT native-hierarchy subtraction

### Visible problem

HR had already become photo-led, but the chronology right page still retained a yellow kicker field, Event 05 underline and WEDDING terminal rule from earlier timeline iterations. At whole, reading and actual size these no longer added unique binding/contrast and kept a residual diagram/UI character.

### Root-cause hypothesis

The existing dominant hero, Event 03 photo, and native 01→03→05→06 hierarchy had matured enough to carry sequence and closure without those decorative rectangles. Subtraction should make the page feel more like an edited travel-magazine chronology and less like a timeline component.

### Bounded test

Rollback-safe HT `2040:2` from HR `2033:111`:

- Story left page unchanged.
- hero image unchanged.
- Event 03 replaceable image unchanged at `350×260`.
- hid the timeline yellow kicker field.
- hid Event 05 editorial underline.
- hid WEDDING terminal rule.
- hid the tiny kicker text after its background disappeared and it no longer had a useful readable role.
- strengthened/repositioned native Event 05 and Event 06 typography without adding any new container.
- kept 02/04 as quieter bridge events.
- no new image, generated asset, Drive save, binary placement or image hash.

### Rejected / corrected state

The first HT geometry looked cleaner visually but actual-size structure QA found:

- Event 05 date/number overlap `9×18px`;
- Event 05 number/title overlap `9×38px`;
- Event 05 number/body overlap `9×12px`;
- Event 05 title/body right-safe-area violations.

HT was not promoted in that state. Event 05 number was moved left and the date/title/body stack moved inward. The second audit returned zero collisions and zero 18px safe-area risks.

### Verification

HT `2040:2`, timeline right `2040:28`:

- whole spread: PASS and visually preferred over HR;
- reading/page scale: PASS;
- actual-size timeline `794×1123`: PASS;
- visible native text: `27`;
- visible image roles: `2`;
- text collisions: `0`;
- 18px text safe-area risks: `0`;
- page-level stray text: `0`;
- hero and Event 03 image hashes unchanged;
- HR `2033:111` preserved hidden as rollback.

Decision: `HT ADOPTED / VERIFIED_LOCAL`.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Existing generated section masters remain saved in Drive and unadopted in the current preferred spreads. Transport-only state is not counted as visual progress.

This run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- HT placed as preferred: YES;
- HT whole/page/actual-size visually verified: YES;
- HR preserved hidden as rollback: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed and neutral non-Rurubu feed were read before writes.
- Only neutral principles/capabilities/failure fingerprints were consumed from non-Rurubu work; no non-Rurubu item-specific Figma, Drive, asset, ledger or production path was inspected or edited.
- `RSL-159` records the HT lesson: decorative bars/fields that once provided grouping should be re-tested after photo + native-type hierarchy matures; keep them only if they still provide unique contrast/binding/closure.
- Failure fingerprint: `DECOR_SUBTRACTION_EXPOSES_SPACING_COLLISION`.
- State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
- Exact chronology, Yokohama/travel imagery, geometry, palette and Rurubu travel-magazine grammar remain item-specific.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 HN + HK/HT + GY + HC + HS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live preferred IDs and current GitHub main before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Continue testing whether legacy bars/cards still perform a real role before adding or retaining them.
5. Keep photo-semantic truth and source fidelity above repetition-count targets.
6. Keep variable Q&A/profile copy native and rerun realistic long-copy stress after material layout/type changes.
7. Never invent unresolved dates/details for visual completeness.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
