# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Y_CURRENT / INSIDE_CP_CO_PREFERRED_STUDIES / PROFILE_BOUNDED_TEXTURE_BINDING_VERIFIED / CHRONOLOGY_MAJOR_PHOTO_MINOR_NOTES_RAIL_VERIFIED / PROFILE_SNAPSHOT_EDITORIAL_CAPTIONS_VERIFIED / GUEST_FACING_QA_COPY_VERIFIED / PROFILE_TRAVELER_DATA_RAIL_VERIFIED / PROFILE_LONG_COPY_STRESS_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Current preferred set:

- Outer Y `1542:2` — `PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`;
- Profile / Q&A CP `1567:18` — `PREFERRED / V6_INSIDE_CP_PROFILE_BOUNDED_ROUTE_TEXTURE_2026_08_17`;
- Story / chronology CO `1566:2` — `PREFERRED / V6_INSIDE_CO_CHRONOLOGY_MAJOR_PHOTO_MINOR_NOTES_RAIL_2026_08_17`.

Immediate rollback / proof:

- CN `1562:2` — `ROLLBACK_HIDDEN / V6_INSIDE_CN_PRE_CP_PROFILE_TEXTURE_2026_08_17`;
- CM `1559:2` — `ROLLBACK_HIDDEN / V6_INSIDE_CM_PRE_CO_CHRONOLOGY_2026_08_17`;
- CL `1556:2`, CJ `1554:97`, CK `1553:79`, CI `1551:2`, Profile long-copy proof `1553:156`, and older comparisons remain preserved.

Start Here live readback:

`V5 FU/FX · V6 Y + CP/CO INSIDE STUDIES · V7 HOLD`

V7 was not edited.

## Outer Y retained

Outer Y remains unchanged and retains its previously verified photo-led front/back system, native text, replaceable image roles, collision-free layout and safe-area compliance.

## CP — bounded Profile route texture

CP keeps CN's Profile/Q&A geometry, native captions, traveler-data rail, Q&A content, photos, photo borders, image hashes, and replaceable semantics.

Observed defect:

- the lower three-photo cluster still floated on a large cream field even after native captions had improved editorial meaning.

Bounded test:

- one existing Rurubu-internal composed travel texture was inserted behind only the lower snapshot cluster;
- role `1567:95 / DECOR / PROFILE_ROUTE_TEXTURE_COMPOSED_RASTER`;
- image hash `691a6ceed471a5d8efa144052a10564eed177b4f`;
- opacity `0.16`;
- initial `770×430` width was rejected after intrinsic QA and corrected to `720×430` against source `720×860`;
- no photo hash, native copy, photo border, or replacement role changed.

Verification:

- whole Profile/Q&A thumbnail 500px: PASS;
- Profile actual-size `1567:19` = `794×1123`: PASS;
- visible Profile native text `22`;
- text collision `0`;
- 18px text safe-area risk `0`;
- all four replaceable Profile photo roles intrinsic-safe;
- composed texture intrinsic-safe after correction;
- image hashes changed `0`.

Q&A geometry/content remains unchanged from the prior verified state.

## CO — chronology major-photo / minor-notes rail

CO keeps Story, native chronology facts/placeholders, replaceable photo semantics, top feature hero, and WEDDING terminal while materially changing the chronology reading path.

Observed defect:

- CM had strong major/minor scale hierarchy, but Event 1/3/5 photography and Event 2/4 text still occupied the same central field, creating crossing reading paths and visual congestion.

Bounded test:

- Event 2 / 4 moved into a narrow quiet left travel-notes rail;
- lower composed travel texture narrowed to `226×506`, opacity `0.22`, as a subordinate rail support;
- Event 1 / 3 / 5 remain large replaceable photo beats in the main field;
- redundant crossing magenta/cyan rules hidden;
- native title copy remains `ふたりの旅、6つの景色。` but its text box was widened so it reads as one intentional line;
- Event 03 typography was corrected after QA to return inside the 18px right safe area;
- no new card, shadow, gradient, generated asset, external binary placement, or image hash was introduced.

Verification:

- whole spread ~1200px: PASS and clearer than CM;
- chronology actual-size `1566:27` = `794×1123`: PASS;
- native text `30`;
- text collision `0`;
- 18px text safe-area risk `0`;
- outside visible nodes `0`;
- visible image intrinsic violations `0`.

Relevant intrinsic checks:

- top hero `801×430` ≤ `944×608`;
- Event 1 `455×218` ≤ `1356×560`;
- Event 3 `345×230` ≤ `352×368`;
- Event 5 `455×154` ≤ `732×498`;
- rail texture `226×506` ≤ `720×860`.

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

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CP-CO-EDITORIAL-FLOW-QA-2026-08-17.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-068-major-photo-minor-notes-rail.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-069-bounded-texture-photo-cluster-binding.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-y-cp-co.md`.

Learning states:

- RSL-068 — spatial separation of major photographic events and minor chronology notes: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-069 — one bounded low-opacity composed support can bind a legitimate multi-photo cluster without adding cards: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Neither is a promoted project-wide visual-style rule. Exact Rurubu layout, texture, photography, palette and travel-magazine grammar remain item-specific.

## Asset lifecycle truth

- newly image-generated assets `0`;
- new Drive saves `0`;
- new external binary placements `0`;
- new raster bytes `0`;
- existing composed raster reused in a new bounded Profile role `YES`;
- photo image hashes changed `0`;
- native variable text preserved `YES`;
- replaceable image semantics preserved `YES`;
- screenshot / actual-size QA `PASS` for changed pages;
- structure / safe-area QA `PASS`;
- rollback preserved `YES`;
- V7 touched `NO`.

## Completion gate

Do not call V6 complete or print-ready until:

- Y + CP/CO cohere with final legitimate photography and final personal copy as one magazine system;
- fresh realistic-copy stress passes after final copy insertion;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 Y + CP/CO = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare Y + CP/CO together and target the next region that still reads like a template rather than a finished Japanese travel-information magazine.
3. Prefer final legitimate photography when available; rerun crop, semantic, contrast and actual-size QA after replacement.
4. Replace dummy native copy with final personal copy and rerun dedicated long-copy stresses.
5. Keep generated section masters unadopted until quality-preserving placement + actual-size QA is possible.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
