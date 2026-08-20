# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_HN_PREFERRED / PROFILE_QA_HK_PREFERRED / STORY_CHRONOLOGY_HR_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_HC_PREFERRED / ONE_DAY_PLAN_HS_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / HR_WHOLE_AND_ACTUAL_SIZE_QA_PASS / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE` after HR promotion:

- Outer HN `2029:2`; x `272000`, y `0`.
- Profile / Q&A HK `2027:2`; x `273800`, y `0`.
- Story / chronology HR `2033:111`; Story left unchanged from HJ; timeline right `2033:137`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; x `272000`, y `1300`.
- Gourmet / Cafe HC `2012:2`; x `273800`, y `1300`.
- Yokohama 1DAY Plan HS `2019:2`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 HN + HK/HR + GY MEMORY SPOTS + HC CAFE & TABLE + HS 1DAY PLAN · V7 HOLD`

Rollback / comparison evidence:

- HJ `2024:2` hidden rollback for HR.
- HD `2014:2` hidden rollback for HN.
- GZ `2004:2` hidden rollback for HK.
- earlier preferred/rejected studies remain hidden and preserved.

## Latest verified progress — HR photo-boundary timeline staircase

### Visible problem

HJ already had a strong full-width photographic hero, but its lower timeline still split into two disconnected systems: 01/02/04 native text on the left and a 03 photo module on the right. At whole spread and actual size this preserved a timeline/template reading instead of a continuous travel-photo editorial sequence.

### Root-cause hypothesis

The timeline did not need another image, rail, card or generated decoration. The existing source-safe 03 photo could carry more editorial responsibility by crossing the hero/cream boundary, while 01 → 03 → 05 → WEDDING could form a deliberately unequal visual staircase. 02/04 could remain quieter bridge events.

### Bounded test

Rollback-safe duplicate HR `2033:111` from live HJ:

- Story left page remained unchanged.
- hid the weak lower timeline composed texture; did not delete it.
- moved existing replaceable 03 photo `350×260` upward from `y=522` to `y=402`, keeping its source, dimensions and image role unchanged.
- moved native `03 / ふたり旅 / copy` onto the photo.
- kept 01 as the dominant opening milestone; 02/04 as minor bridge events.
- moved 05 into an independent right-side native milestone.
- rebuilt 06/WEDDING as the page-width terminal beat without adding a container.
- changed only the small yellow kicker and folio from generic English labels to reader-facing native Japanese.
- no new image, generated asset, Drive save, binary placement or image hash was introduced.

### Rejected / corrected states

1. First write attempted to change Noto Sans JP Bold text without `figma.loadFontAsync`; Figma rejected the write and live readback confirmed no partial candidate existed. Method changed before retry.
2. Initial HR geometry looked strong in screenshot QA but actual-size structure audit found three text contacts: Event 05 date/number, Event 05 number/title and Event 06 date/WEDDING. HR was not promoted in that state.
3. Event 05 was moved inward and its native stack narrowed; WEDDING was moved away from the 06 date. Final audit returned zero text collisions and zero 18px safe-area risks.

### Verification

HR `2033:111`, timeline right `2033:137`:

- 1200px whole spread: PASS and visually preferred over HJ.
- actual-size timeline `794×1123`: PASS.
- visible native text on timeline: `28`.
- visible image roles on timeline: `2` (hero + replaceable 03 photo).
- text collisions: `0`.
- 18px text safe-area risks: `0`.
- page-level stray text: `0`.
- 03 image geometry remains `350×260`; no enlargement or new hash.
- HJ `2024:2` preserved hidden as rollback.

Decision: `HR ADOPTED / VERIFIED_LOCAL`.

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
- HR placed as preferred: YES;
- HR whole and actual-size visually verified: YES;
- HJ preserved hidden as rollback: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed and neutral non-Rurubu feed were read before writes.
- Only neutral principles/capabilities/failure fingerprints were consumed from non-Rurubu work; no non-Rurubu item-specific Figma, Drive, asset, ledger or production path was inspected or edited.
- `RSL-158` records the HR lesson: when a timeline still reads as separate text and photo modules, test moving an already-legitimate photo across a section boundary and bind the major native milestone copy to it before adding cards/rails/assets.
- State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
- Exact Yokohama/Europe dummy images, event geometry, palette, typography sizes and Rurubu travel-magazine grammar remain item-specific.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 HN + HK/HR + GY + HC + HS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live preferred IDs and current GitHub main before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Continue reducing semantically weak module/card patterns through photo responsibility + native Japanese hierarchy before adding assets.
5. Keep photo-semantic truth and source fidelity above repetition-count targets.
6. Keep variable Q&A/profile copy native and rerun realistic long-copy stress after material layout/type changes.
7. Never invent unresolved dates/details for visual completeness.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
