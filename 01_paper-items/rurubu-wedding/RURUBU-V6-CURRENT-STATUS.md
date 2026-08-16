# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-17
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Y_CURRENT / INSIDE_CL_CJ_PREFERRED_STUDIES / CHRONOLOGY_MAJOR_MINOR_MAGAZINE_BEATS_VERIFIED / GUEST_FACING_QA_COPY_VERIFIED / PROFILE_TRAVELER_DATA_RAIL_VERIFIED / PROFILE_LONG_COPY_STRESS_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Current preferred set:

- Outer Y `1542:2` — `PREFERRED / V6_OUTER_Y_PHOTO_BOUND_BACK_CLOSURE_2026_08_17`;
- Profile / Q&A CL `1556:2` — `PREFERRED / V6_INSIDE_CL_GUEST_FACING_QA_COPY_2026_08_17`;
- Story / chronology CJ `1554:97` — `PREFERRED / V6_INSIDE_CJ_CHRONOLOGY_MAGAZINE_BEATS_2026_08_17`.

Immediate rollback / proof:

- CK `1553:79` — `ROLLBACK_HIDDEN / V6_INSIDE_CK_PRE_CL_GUEST_FACING_QA_COPY_2026_08_17`;
- CI `1551:2` — `ROLLBACK_HIDDEN / V6_INSIDE_CI_PRE_CJ_CHRONOLOGY_2026_08_17`;
- Profile long-copy proof `1553:156` remains hidden and valid for unchanged Profile geometry;
- older CG / CH / CE / CF / W and rejected comparisons remain preserved.

Start Here live readback:

`V5 FU/FX · V6 Y + CL/CJ INSIDE STUDIES · V7 HOLD`

V7 was not edited.

## Outer Y retained

Outer Y remains unchanged and retains its previous verified photo-bound front/back system, native text, replaceable image roles, collision-free layout and 18px safe-area compliance.

## CL — guest-facing Profile / Q&A copy

CL is a rollback-safe duplicate of CK. Profile layout, traveler-data rail, Profile long-copy behavior, Q&A questions/answers, photos, composed texture, image hashes and editability are unchanged.

Only the visible Q&A deck changed:

- old implementation-facing text: `質問も答えもnative text。あとから自由に変更できます。`;
- new native guest-facing editorial copy: `旅の途中で聞いた、ふたりの6つのこと。`.

The neutral non-Rurubu lesson `2026-08-17-nrsl-internal-status-label-leakage.md` was consumed only as a hypothesis. No non-Rurubu production node, asset, layout or current state was inspected or copied.

Verification:

- actual-size Q&A `1556:40` = `794×1123`: PASS;
- native text `26`;
- visible IMAGE fills `3` (`2` replaceable photos + `1` bounded composed texture);
- text collision `0`;
- 18px text safe-area risk `0`;
- visible text outside page `0`.

## CJ — chronology major/minor magazine beats

CJ keeps Story, native event facts/placeholders, image sources/hashes, replaceable-photo semantics and WEDDING terminal while changing chronology emphasis:

- Event 2 / 4 numeric markers hidden; date/title/copy remain native;
- Event 1 / 3 / 5 / 6 markers reduced to small colored editorial metadata;
- Event 1 / 3 / 5 retain stronger photo/title beats;
- Event 2 / 4 remain quieter bridge events;
- existing composed travel texture stays bounded at reduced opacity;
- no new cards, shadows, gradients, generated assets or binary placements.

The initial CJ candidate failed four text-collision checks and was corrected before promotion.

Verification:

- whole spread / 500px: PASS;
- reading / 1200px: PASS;
- actual-size chronology `1554:122` = `794×1123`: PASS;
- native text `28`;
- visible IMAGE fills `5` (`4` replaceable photos + `1` bounded composed texture);
- text collision `0`;
- 18px safe-area risk `0`;
- text outside page `0`;
- image hashes changed `0`.

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

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CL-CJ-GUEST-FACING-COPY-CHRONOLOGY-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CK-CJ-CHRONOLOGY-MAGAZINE-BEATS-QA-2026-08-17.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-064-chronology-major-minor-beats.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-17-rsl-065-internal-copy-leakage.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-17-rurubu-v6-y-cl-cj.md`.

Learning states:

- RSL-064 — unequal major/minor visual beats can preserve native chronology order: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-065 — implementation language belongs in production evidence, not guest-facing editorial copy: locally verified in Rurubu and supportive of the already cross-item-verified neutral method; not promoted as a visual-style rule.

## Asset lifecycle truth

- newly image-generated assets `0`;
- new Drive saves `0`;
- new external binary placements `0`;
- new raster bytes `0`;
- image hashes changed `0`;
- native variable text preserved `YES`;
- replaceable image semantics preserved `YES`;
- screenshot/actual-size QA `PASS` for changed pages;
- structure/safe-area QA `PASS`;
- rollback preserved `YES`;
- V7 touched `NO`.

## Completion gate

Do not call V6 complete or print-ready until:

- Y + CL/CJ cohere with final legitimate photography and final personal copy as one magazine system;
- fresh realistic-copy stress passes after final copy insertion;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 Y + CL/CJ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare Y + CL/CJ together and target the next area that still reads like a template rather than a finished travel-information magazine.
3. Replace dummy/repeated photos with final legitimate photography when available and rerun crop/contrast/actual-size QA.
4. Replace dummy native copy with final copy and rerun dedicated stresses.
5. Keep generated section masters unadopted until quality-preserving placement + actual-size QA is possible.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
