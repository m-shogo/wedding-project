# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Y_CURRENT / INSIDE_CN_CM_PREFERRED_STUDIES / PROFILE_SNAPSHOT_EDITORIAL_CAPTIONS_VERIFIED / CHRONOLOGY_MINOR_BEAT_NUMERIC_ANCHORS_VERIFIED / GUEST_FACING_QA_COPY_VERIFIED / PROFILE_TRAVELER_DATA_RAIL_VERIFIED / PROFILE_LONG_COPY_STRESS_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Current preferred set:

- Outer Y `1542:2` — `PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`;
- Profile / Q&A CN `1562:2` — `PREFERRED / V6_INSIDE_CN_PROFILE_SNAPSHOT_CAPTIONS_2026_08_17`;
- Story / chronology CM `1559:2` — `PREFERRED / V6_INSIDE_CM_CHRONOLOGY_MINOR_BEAT_NUMERIC_ANCHORS_2026_08_17`.

Immediate rollback / proof:

- CL `1556:2` — `ROLLBACK_HIDDEN / V6_INSIDE_CL_PRE_CN_PROFILE_CAPTIONS_2026_08_17`;
- CJ `1554:97` — `ROLLBACK_HIDDEN / V6_INSIDE_CJ_PRE_CM_CHRONOLOGY_2026_08_17`;
- CK `1553:79`, CI `1551:2`, Profile long-copy proof `1553:156`, and older comparisons remain preserved.

Start Here live readback:

`V5 FU/FX · V6 Y + CN/CM INSIDE STUDIES · V7 HOLD`

V7 was not edited.

## Outer Y retained

Outer Y remains unchanged and retains its previously verified photo-led front/back system, native text, replaceable image roles, collision-free layout and safe-area compliance.

## CN — Profile snapshot editorial captions

CN keeps CL Profile/Q&A geometry, photos, image hashes, traveler-data rail and Q&A content while improving the lower Profile photo cluster.

Observed defect:

- the three overlapping snapshots still read partly as placed-photo collage elements rather than editorial scenes.

Bounded test:

1. Existing hidden native snapshot captions were first placed over the photos. This was rejected because 9px metadata lost contrast on heterogeneous image backgrounds.
2. The same native captions were moved immediately outside the photo borders onto the cream page and rechecked.

Adopted native dummy metadata:

- `CAFE MEMORY / FAVORITE SCENE`;
- `NIGHT WALK / PHOTO NOTE`;
- `YOKOHAMA / NEXT VIEW`.

These are editable design-study captions, not final factual copy.

Verification:

- Profile actual-size `1562:3` = `794×1123`: PASS;
- whole Profile/Q&A spread ~1200px: PASS;
- visible Profile native text `22`;
- text collision `0`;
- 18px text safe-area risk `0`;
- visible overflow `0`;
- all four Profile photo roles remain intrinsic-safe;
- image hashes changed `0`;
- Q&A geometry/content remains unchanged from verified CL.

## CM — chronology minor-beat numeric anchors

CM keeps Story, native event facts/placeholders, image sources/hashes, replaceable-photo semantics and the WEDDING terminal while refining minor chronology beats.

Observed defect:

- CJ correctly made Event 1 / 3 / 5 strong and Event 2 / 4 quiet, but the center-left field could read as unfinished because Event 2 / 4 were too visually silent.

Bounded test:

- Event 2 / 4 existing native number nodes re-enabled at small `14px` scale;
- their redundant small rule bars hidden;
- Event 2 / 4 title scale raised `17px → 22px` while date/copy remain restrained;
- Event 3 replaceable photo increased `285×210 → 310×230`, still below source intrinsic `352×368`;
- Event 1 / 3 / 5 remain the major photographic beats; Event 2 / 4 remain minor;
- no new cards, shadows, gradients, generated assets, binary placements or image hashes.

Verification:

- whole spread ~1200px: PASS;
- chronology actual-size `1559:27` = `794×1123`: PASS;
- native text `30`;
- text collision `0`;
- 18px text safe-area risk `0`;
- image intrinsic violations `0`;
- image hashes changed `0`;
- only page-bound overflow is the already-intentional top-hero bleed.

## Drive / generated section masters

V6 Drive root re-read live on 2026-08-17:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Registered generated section masters remain authoritative-but-unadopted:

- Profile `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`;
- Q&A `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`;
- Timeline `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`;
- Memories `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`.

No material capability change occurred for the known quality-preserving external binary-placement blocker, so that failed path was not retried.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CN-CM-PROFILE-CAPTIONS-CHRONOLOGY-QA-2026-08-17.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-066-minor-chronology-anchors.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-067-photo-caption-binding.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-y-cn-cm.md`.

Learning states:

- RSL-066 — small native ordinal anchors can clarify minor chronology beats without restoring equal-card hierarchy: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-067 — existing photo clusters can gain editorial meaning from small native captions outside image bounds without adding containers: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Neither is a promoted project-wide visual-style rule.

## Asset lifecycle truth

- newly image-generated assets `0`;
- new Drive saves `0`;
- new external binary placements `0`;
- new raster bytes `0`;
- image hashes changed `0`;
- native variable text preserved `YES`;
- replaceable image semantics preserved `YES`;
- screenshot / actual-size QA `PASS` for changed pages;
- structure / safe-area QA `PASS`;
- rollback preserved `YES`;
- V7 touched `NO`.

## Completion gate

Do not call V6 complete or print-ready until:

- Y + CN/CM cohere with final legitimate photography and final personal copy as one magazine system;
- fresh realistic-copy stress passes after final copy insertion;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 Y + CN/CM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare Y + CN/CM together and target the next area that still reads like a template rather than a finished travel-information magazine.
3. Replace dummy/repeated photos with final legitimate photography when available and rerun crop/contrast/actual-size QA.
4. Replace dummy native copy with final copy and rerun dedicated stresses.
5. Keep generated section masters unadopted until quality-preserving placement + actual-size QA is possible.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
