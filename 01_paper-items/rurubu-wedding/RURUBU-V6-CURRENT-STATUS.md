# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AG_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DM_PREFERRED / PHOTO_BOUND_Q04_VERIFIED / REDUNDANT_CHRONOLOGY_SCAFFOLDING_REMOVED / NATIVE_VARIABLE_TEXT_RESILIENCE_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Fresh post-promotion readback confirms:

- Outer AG `1676:2` — `PREFERRED / V6_OUTER_AG_CHRONOLOGY_SUBTRACTION_2026_08_18`;
- Profile / Q&A DN `1675:2` — `PREFERRED / V6_INSIDE_DN_QA_PHOTO_BOUND_Q04_2026_08_18`;
- Story / chronology DM `1665:2` — `PREFERRED / V6_INSIDE_DM_STORY_PHOTO_BINDING_SIDE_TRIP_RAIL_2026_08_18`.

Start Here `845:27`:

`V5 FU/FX · V6 AG + DN/DM INSIDE STUDIES · V7 HOLD`

Immediate rollback:

- Outer AF `1655:2` — hidden rollback;
- Profile / Q&A DL `1659:2` — hidden rollback;
- Story / chronology DK `1647:2` and earlier comparisons remain preserved;
- V7 was not edited.

## DN — Q&A photo-bound Q04

### Visible problem

DL Q&A had strong photo-led sections, but Q04 still floated beside the lower memory photo, leaving a clean but template-like separation in the middle-right of the page.

### Bounded test / result

- duplicated DL rollback-safely;
- widened the existing replaceable support photo to `545×372` while preserving image hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` and `FILL` behavior;
- shifted only native `04` 24px left so it overlaps the photo edge;
- retained Q04 question/answer on the cream field for readability;
- first iteration hid `04` behind the photo because of z-order and was rejected until the ordinal alone was brought to front;
- no new card, new image, generated decoration or image hash.

Known dining source is `732×498`; the DN display remains intrinsic-safe.

### DN QA

- 500px whole inside thumbnail: PASS;
- 1200px whole inside reading: PASS;
- Q&A `1675:42` at `794×1123`: PASS;
- visible native text: 30;
- text collisions: 0;
- 18px text safe-area risks: 0;
- visible-node overflow: 0.

Result: `DN VERIFIED_LOCAL / PREFERRED`.

## AG — back chronology subtraction

### Visible problem

AF back cover had a useful major/minor chronology, but the thin chronology rail plus detached `201X — 2026` ghost still made the lower third read partly like a timeline diagram.

### Bounded test / result

- duplicated AF rollback-safely;
- hid only `DECOR / BACK_CHRONOLOGY_BINDING_RAIL_AF` and `TEXT / BACK_YEAR_RANGE_GHOST`;
- retained all photos, image hashes, front cover, 01–05 order, dates/copy and WEDDING terminal;
- structural scan found two inherited 1px contacts between milestone 05 and `2026.02.11 / 入籍`; both date/label nodes were nudged 6px right before promotion.

### AG QA

- 500px whole outer thumbnail: PASS;
- 1200px whole outer reading: PASS;
- back cover `1676:3` at `794×1123`: PASS;
- native text: 23;
- text collisions: 0;
- 18px text safe-area risks: 0;
- image hashes unchanged from AF.

Result: `AG VERIFIED_LOCAL / PREFERRED`.

## DM unchanged preferred

Story / chronology DM remains the verified preferred inner spread from the previous run. No speculative revision was made merely to consume runtime. Its photo-led Story second feature and thin 02/04 side-trip binding still read strongly beside AG + DN at thumbnail, reading and actual-size scales.

## Drive / generated section masters

Fresh Drive readback confirms V6 root:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted. No materially improved quality-preserving external binary-placement capability was established, so known failed transport methods were not repeated.

## Asset lifecycle truth for this run

- newly image-generated assets: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster/image hashes: 0;
- existing replaceable Q&A support-photo geometry changed: YES;
- native text preserved: YES;
- AG chronology scaffolding subtracted: YES;
- whole / reading / actual-size visual QA: PASS;
- structural collision/safe-area QA: PASS;
- rollback preserved: YES;
- V7 touched: NO.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AG-DN-DM-QA-PHOTO-BOUND-CHRONOLOGY-SUBTRACTION-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-ag-dn-photo-bound-and-subtraction.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-088-existing-anchor-overlap-and-scaffolding-subtraction.md`.

Latest learning:

- RSL-087 — bind correct secondary information to an existing reading path before inventing a new module: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-088 — when high-priority copy floats, first test binding it to an existing legitimate visual anchor; when hierarchy already carries order, remove redundant scaffolding only after three-scale proof: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Rurubu-specific coordinates, colors, masthead, photo choices, chronology geometry and wording do not transfer.

## Completion gate

Do not call V6 complete or print-ready until:

- AG + DN/DM are reconciled with final legitimate photography and final personal copy;
- final copy receives fresh actual-size / realistic-copy stress where wrapping changes;
- replacement photography revalidates crop, semantic role, contrast and intrinsic quality;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 AG + DN/DM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_MAGAZINE_HIERARCHY_VERIFIED / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare AG + DN/DM as one magazine at thumbnail, reading and actual-size scales before choosing another visual target.
3. Keep photo/text overlap only where it improves hierarchy without harming variable-copy readability.
4. Remove rails/ambient metadata only where sequence remains obvious without them; do not turn subtraction into a blanket style rule.
5. Prefer final legitimate photography when available, then revalidate crop/contrast/semantics.
6. Keep generated section masters unadopted until quality-preserving placement plus actual-size QA are possible.
7. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
