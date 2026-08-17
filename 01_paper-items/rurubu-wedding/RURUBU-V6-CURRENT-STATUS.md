# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Y_CURRENT / INSIDE_CP_CQ_PREFERRED_STUDIES / PROFILE_BOUNDED_TEXTURE_BINDING_VERIFIED / CHRONOLOGY_EVENT03_PHOTO_COPY_BINDING_VERIFIED / CHRONOLOGY_SIDE_TRIP_NOTES_RAIL_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Current preferred set:

- Outer Y `1542:2` — `PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`;
- Profile / Q&A CP `1567:18` — `PREFERRED / V6_INSIDE_CP_PROFILE_BOUNDED_ROUTE_TEXTURE_2026_08_17`;
- Story / chronology CQ `1569:2` — `PREFERRED / V6_INSIDE_CQ_EVENT03_PHOTO_BINDING_SIDE_NOTES_2026_08_17`.

Immediate rollback / proof:

- CO `1566:2` — `ROLLBACK_HIDDEN / V6_INSIDE_CO_PRE_CQ_CHRONOLOGY_2026_08_17`;
- CN `1562:2` — hidden rollback before CP;
- CM `1559:2` — hidden rollback before CO;
- older rollback-safe comparisons and long-copy proofs remain preserved.

Start Here live readback:

`V5 FU/FX · V6 Y + CP/CQ INSIDE STUDIES · V7 HOLD`

V7 was not edited.

## Outer Y retained

Outer Y remains unchanged and retains its previously verified photo-led front/back system, native text, replaceable image roles, collision-free layout and safe-area compliance.

## CP retained — bounded Profile route texture

CP remains unchanged from its verified state:

- lower three-photo cluster bound by one existing low-opacity composed travel texture;
- native snapshot captions preserved;
- traveler-data rail remains native/editable;
- Q&A structure unchanged;
- all replaceable Profile photo roles remain intrinsic-safe;
- screenshot / actual-size / safe-area QA already passed.

## CQ — Event 03 photo binding + side-trip notes rail

CQ was created as a rollback-safe clone of CO because CO still had one visible inconsistency:

- Events 01/05 bound native copy directly to their photos, while Event 03 photo and copy were detached;
- Event 02/04 sat in the left texture rail without an explicit editorial role, making the rail read partly as leftover pale space.

Bounded changes:

- Event 03 kept the same verified replaceable photo and image hash;
- Event 03 native number/date/title/copy were moved onto the existing photograph so the photo and copy read as one editorial milestone;
- Event 02/04 stayed native text on the existing bounded texture rail;
- native `寄り道メモ / 02・04` was added as the guest-facing rail label;
- no new external asset, generated image, Drive save, card, shadow, gradient or photo hash was introduced;
- Story, Event 01, Event 05 and the WEDDING terminal were preserved.

Rejected/corrected states before promotion:

1. Event 03 title/copy initially fell behind Event 05 due to overlap/z-order. That state was rejected; copy was moved fully inside Event 03's photo region.
2. Structure QA then found a 6px Event 03 number/date text collision. The date was moved right and QA rerun.

Verification after correction:

- whole spread 500px: PASS and stronger than CO;
- reading scale ~1000px: PASS;
- chronology actual-size `1569:27` = `794×1123`: PASS;
- visible native text `31`;
- absolute text collision `0`;
- 18px text safe-area risk `0`;
- visible text overflow `0`;
- visible image intrinsic violations `0`;
- photo image hashes changed `0`.

Relevant visible intrinsic checks:

- timeline composed texture `226×506` ≤ source `720×860`;
- top hero `801×430` ≤ source `944×608`;
- Event 03 `345×230` ≤ source `352×368`;
- Event 01 `455×218` ≤ source `1356×560`;
- Event 05 `455×154` ≤ source `732×498`.

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

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CP-CQ-EVENT03-BINDING-QA-2026-08-17.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-070-photo-copy-beat-and-secondary-rail-binding.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-y-cp-cq.md`.

Learning state:

- RSL-070 — major photographic milestones can be tested as one photo+native-copy editorial beat, while minor events can share an explicitly named secondary rail: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

This is not a promoted project-wide visual-style rule. Exact Rurubu layout, wording, colors, photography and travel-magazine grammar remain item-specific.

## Asset lifecycle truth

- newly image-generated assets `0`;
- newly adopted generated assets `0`;
- new Drive saves `0`;
- new external binary placements `0`;
- new raster bytes `0`;
- existing replaceable photo roles recomposed `YES`;
- photo image hashes changed `0`;
- native variable/factual text preserved `YES`;
- screenshot / actual-size QA `PASS`;
- structure / safe-area QA `PASS`;
- rollback preserved `YES`;
- V7 touched `NO`.

## Completion gate

Do not call V6 complete or print-ready until:

- Y + CP/CQ cohere with final legitimate photography and final personal copy as one magazine system;
- fresh realistic-copy stress passes after final copy insertion;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 Y + CP/CQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare Y + CP/CQ as one magazine and target the next region that still reads like a template rather than a finished Japanese travel-information magazine.
3. Prefer final legitimate photography when available; rerun crop, semantic, contrast and actual-size QA after replacement.
4. Replace dummy native copy with final personal copy and rerun dedicated long-copy stresses.
5. Keep generated section masters unadopted until quality-preserving placement + actual-size QA is possible.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
