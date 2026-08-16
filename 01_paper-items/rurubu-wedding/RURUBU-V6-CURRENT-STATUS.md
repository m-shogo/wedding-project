# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-16
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_Q_CURRENT / INSIDE_BF_BE_PREFERRED_STUDIES / BF_QA_ANSWER_READABILITY_AND_LONG_COPY_STRESS_VERIFIED / BE_CHRONOLOGY_MAJOR_MINOR_EDITORIAL_CLUSTER_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here `845:27`:

`V5 FU/FX · V6 Q + BF/BE INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer Q `1426:2 / PREFERRED / V6_OUTER_Q_BACK_CHRONOLOGY_TYPE_HIERARCHY_2026_08_16`
- Profile / Q&A BF `1436:56 / PREFERRED / V6_INSIDE_BF_QA_ANSWER_READABILITY_2026_08_16`
- Story / chronology BE `1433:2 / PREFERRED / V6_INSIDE_BE_CHRONOLOGY_EDITORIAL_CLUSTER_2026_08_16`

Preserved comparison/rollback:

- BD `1430:2` — hidden Profile/Q&A rollback
- BC `1420:2` — hidden chronology rollback
- Outer R `1436:2` — hidden rejected masthead-scale comparison; 18 px top safe-area fail
- BF final long-answer proof `1436:180` — hidden after PASS
- BF pre-photo-shift stress `1436:118` — hidden superseded proof
- profile long-value proof `1431:2` remains valid because BF did not change Profile geometry.

V7 remains HOLD.

## Outer Q

Q remains preferred and unchanged.

Verified retained state:

- back native text `18`
- replaceable back IMAGE roles `3`
- text/text collision `0`
- 18 px text safe-area risk `0`
- masthead Drive master `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
- masthead image hash `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- masthead display `330×106.7`, intrinsic `500×161`: PASS.

A larger masthead comparison was rejected because its `y=14` placement violated the current 18 px top safe-area gate. Production Q was not changed.

## Profile / Q&A BF

Profile remains geometrically identical to verified BD:

- native text `17`
- replaceable IMAGE roles `4`
- text/text collision `0`
- unintended text/image collision `0`
- 18 px safe-area risk `0`
- realistic profile long-value proof `1431:2`: PASS.

Q&A improvement over BD:

- all six answer blocks now use native `11 px` Noto Sans JP Regular;
- previous answer sizes were `11 / 9 / 9 / 11 / 9 / 10 px`;
- existing hero photo shifted only `x=315 → 323` to remove tiny rotated-image bounding contact with Q2/Q3;
- Q&A native text `24`
- replaceable IMAGE roles `2`
- text/text collision `0`
- answer/image collision `0`
- 18 px safe-area risk `0`.

Dedicated BF long-answer proof `1436:180` uses realistic Japanese answers with natural HEIGHT sizing. Natural answer heights are `39 / 39 / 39 / 39 / 26 / 39 px`; collisions `0`; 18 px safe-area risks `0`.

Evidence:

- `RURUBU-V6-Q-BF-BE-QA-ANSWER-READABILITY-QA-2026-08-16.md`
- `RURUBU-V6-Q-BF-BE-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`.

## Story / chronology BE

BE remains preferred and unchanged from its verified pass:

- Story native text `11`, replaceable IMAGE roles `3`, collision `0`, safe-area risks `0`;
- chronology native text `32`, replaceable IMAGE roles `6`, collision `0`, safe-area risks `0`;
- `01 / 03 / 05` remain major milestones, `02 / 04` support beats, and WEDDING the terminal field;
- all chronology facts remain native/editable.

## Drive / generated section masters

Fresh Drive root readback confirms:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- Profile master `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`
- Q&A master `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`
- Timeline master `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`
- Memories master `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`.

No generated section master was adopted in this pass. Known unchanged boundary remains:

`DRIVE_RAW_MASTER_REACHABLE / FIGMA_SUBMIT_DNS_BLOCKED / NO_NEW_GENERATED_SECTION_DECORATION_ADOPTION`.

Do not retry the unchanged failing submit method without a material capability/environment change.

## Asset lifecycle truth of latest pass

- newly generated images: `0`
- new Drive saves: `0`
- new external binary placement: `0`
- existing verified Figma image hashes reused: `YES`
- replaceable photo roles preserved: `YES`
- native editable copy preserved: `YES`
- generated/fixed section decoration adopted: `NO`
- whole/read/actual-size visual verification: `YES`
- realistic long-answer stress: `PASS`
- structure/safe-area verification: `PASS`
- rollback comparison preserved: `YES`
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until:

- Q + BF/BE cohere with final real content as one magazine system;
- real photography and final copy replace dummy content and crop/contrast/text stress are rerun;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 Q + BF/BE = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Review Q + BF/BE together at thumbnail scale for remaining magazine-system incoherence.
3. Re-run profile value stress only if Profile geometry changes.
4. Re-run Q&A answer stress whenever Q&A geometry or type size changes.
5. Replace dummy photography only when actual-size visual quality and story semantics are clearly stronger.
6. Keep final print/template/PDF/physical-proof gates separate from dummy-design QA.
