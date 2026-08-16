# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Y_CURRENT / INSIDE_CK_CJ_PREFERRED_STUDIES / CHRONOLOGY_MAJOR_MINOR_MAGAZINE_BEATS_VERIFIED / PROFILE_TRAVELER_DATA_RAIL_VERIFIED / PROFILE_LONG_COPY_STRESS_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Current preferred set:

- Outer Y `1542:2` — `PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`;
- Profile / Q&A CK `1553:79` — `PREFERRED / V6_INSIDE_CK_PROFILE_TRAVELER_DATA_RAIL_2026_08_17`;
- Story / chronology CJ `1554:97` — `PREFERRED / V6_INSIDE_CJ_CHRONOLOGY_MAGAZINE_BEATS_2026_08_17`.

Immediate rollback / proof:

- Story / chronology CI `1551:2` — `ROLLBACK_HIDDEN / V6_INSIDE_CI_PRE_CJ_CHRONOLOGY_2026_08_17`;
- Profile / Q&A CG `1545:2` — existing hidden rollback;
- Profile long-copy proof `1553:156` — hidden;
- older CH / CE / CF / W and rejected comparisons remain preserved.

Start Here live readback:

`V5 FU/FX · V6 Y + CK/CJ INSIDE STUDIES · V7 HOLD`

V7 was not edited.

## Outer Y retained

Outer Y remains unchanged and retains the previous verified photo-bound front/back system, native text, replaceable image roles, collision-free text layout, and 18px safe-area compliance.

## CK — compact Profile traveler-data rail retained

CK remains preferred and unchanged in this pass.

Verified retained state:

- Profile native text `19`, replaceable photo roles `4`;
- actual-size Profile `794×1123`: PASS;
- text collision `0`, 18px safe-area risk `0`;
- dedicated hidden realistic long-copy proof remains valid for the unchanged CK geometry;
- Q&A page remains unchanged from the prior verified state.

## CJ — chronology major/minor magazine beats

### Visible defect

CI had already removed large rectangular timeline-number blocks, but 01—06 still carried too much equal visual weight. At whole-page scale the chronology continued to read as a designed timeline before it read as a travel-magazine photo feature.

### Bounded treatment

CJ duplicates CI and keeps the Story page, native event facts/placeholders, existing image sources/hashes, replaceable-photo semantics and WEDDING terminal. On chronology only:

- title becomes native `ふたりの旅、6つの景色。`;
- Event 2 / 4 numeric markers are hidden while their native date/title/copy remain;
- Event 1 / 3 / 5 / 6 markers become small colored editorial metadata rather than dominant display numbers;
- Event 1 / 3 / 5 retain stronger title hierarchy and photographic beats;
- Event 2 / 4 remain quieter bridge events;
- the existing composed travel texture remains bounded and is reduced in opacity;
- no new card, shadow, gradient, generated asset, external binary placement or image hash is introduced.

The first CJ layout was not promoted because structure QA found four text collisions. Those were corrected before adoption.

### Verification

- whole spread / 500px: PASS;
- reading / 1200px: PASS;
- actual-size chronology `1554:122` = `794×1123`: PASS;
- chronology visible native text `28`;
- visible IMAGE fills `5` (`4` replaceable photos + `1` bounded composed texture);
- absolute text collision `0`;
- 18px text safe-area risk `0`;
- visible text outside page `0`;
- image hashes changed `0`.

CI `1551:2` is preserved as hidden rollback.

## Drive / generated section masters

V6 Drive root re-read on 2026-08-17:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Registered generated section masters remain authoritative-but-unadopted:

- Profile `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`;
- Q&A `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`;
- Timeline `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`;
- Memories `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`.

No material capability change occurred for the known quality-preserving external binary-placement blocker, so the failed path was not retried.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CK-CJ-CHRONOLOGY-MAGAZINE-BEATS-QA-2026-08-17.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-064-chronology-major-minor-beats.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-y-ck-cj.md`.

RSL-064: an ordered print narrative can preserve native sequence while making visual emphasis unequal. Secondary steps do not need equal markers when dates/titles already preserve order. State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Exact Rurubu colors, type scale, photo positions, chronology wording and visual grammar remain item-specific.

## Asset lifecycle truth of latest pass

- newly image-generated assets `0`;
- new Drive saves `0`;
- new external binary placements `0`;
- new raster bytes `0`;
- image hashes changed `0`;
- existing verified photography retained `YES`;
- native variable text preserved `YES`;
- replaceable image semantics preserved `YES`;
- three-scale visual review `PASS`;
- structure / safe-area review `PASS`;
- rollback preserved `YES`;
- V7 touched `NO`.

## Completion gate

Do not call V6 complete or print-ready until:

- Y + CK/CJ cohere with final legitimate photography and final personal copy as one magazine system;
- fresh realistic-copy stress passes after final copy insertion;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 Y + CK/CJ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-evaluate Y + CK/CJ together at whole-magazine scale and target the remaining area that still reads most like a template.
3. Replace dummy/repeated photographs with final legitimate photography when available and rerun crop/contrast/actual-size QA.
4. Replace dummy native copy with final copy and rerun dedicated stress tests.
5. Keep generated section masters unadopted until quality-preserving placement plus actual-size visual QA is possible.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
