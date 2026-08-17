# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AF_CURRENT / PROFILE_QA_DL_PREFERRED / STORY_CHRONOLOGY_DM_PREFERRED / STORY_SECONDARY_PHOTO_DOMINANCE_VERIFIED / SIDE_TRIP_BINDING_RAIL_VERIFIED / NATIVE_VARIABLE_TEXT_RESILIENCE_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Fresh post-promotion readback confirms:

- Outer AF `1655:2` — current preferred outer, unchanged this run;
- Profile / Q&A DL `1659:2` — current preferred profile/Q&A, unchanged this run;
- Story / chronology DM `1665:2` — `PREFERRED / V6_INSIDE_DM_STORY_PHOTO_BINDING_SIDE_TRIP_RAIL_2026_08_18`.

Start Here `845:27`:

`V5 FU/FX · V6 AF + DL/DM INSIDE STUDIES · V7 HOLD`

Immediate rollback:

- Story / chronology DK `1647:2` — `ROLLBACK_HIDDEN / V6_INSIDE_DK_PRE_DM_2026_08_18`;
- Profile/Q&A DK and Outer AE remain preserved as earlier rollback states;
- V7 was not edited.

## DM — Story photo binding + side-trip rail

### Visible problem

At whole-spread and actual page scale, DK had already moved away from a conventional timeline UI, but two weaker areas remained:

1. Story lower-half photography still read partly as a secondary image placed next to a text block rather than a strong editorial beat;
2. chronology events 02/04 were semantically secondary, but visually floated in the cream field and could read as leftover timeline copy rather than an intentional side-trip rail.

### Root-cause hypothesis

The defect did not require another card, generated decoration, or new photo. Existing legitimate imagery and native copy were strong enough. The page needed stronger binding between existing visual roles:

- increase the already-valid secondary Story photo within its existing replaceable role;
- retain the proven native headline scale after a failed over-enlargement;
- use a very thin functional rail to bind 02/04 into one secondary reading path.

### Bounded test

DM was created as a rollback-safe duplicate of DK.

Story changes:

- `PHOTO / STORY_SUPPORT_2_REPLACEABLE`: `515×350 → 545×370`, same image hash and replaceable role;
- added one 5px cyan `DECOR / STORY_TEXT_BINDING_RULE` between lower photo and native Story headline;
- initial enlarged headline treatment was visually rejected because it collided with body copy; the proven DK headline/body scale was restored before promotion.

Chronology changes:

- added one 5px magenta `DECOR / SIDE_TRIP_BINDING_RAIL` spanning the 02/04 side-trip region;
- added two small functional ticks to associate the rail with 02 and 04;
- event text, photos, dates, WEDDING endpoint, image hashes and replaceability remain unchanged.

### Expected improvement

- make the Story lower half read as a real secondary feature rather than residual paper space;
- make 02/04 read as a deliberate quiet side-trip path while 01/03/05 remain dominant photo-led milestones;
- increase Japanese travel-magazine rhythm without reintroducing cards/UI modules.

### Regression risk

- enlarging the Story headline could create body-copy collision — observed in first DM iteration and rejected;
- a rail without a real binding role could become decorative UI — retained only after whole/page comparison showed 02/04 grouping improved;
- larger secondary photography can expose source softness, so final legitimate photography must still be revalidated.

### Three-scale / structural evidence

DM passed:

- whole spread `1665:2` at 900px;
- Story actual-size `1665:3` at 794×1123;
- chronology actual-size `1665:27` at 794×1123.

Structural readback:

- Story native text: 12; visible IMAGE roles: 4; absolute text collisions: 0; 18px text safe-area risks: 0;
- chronology native text: 31; visible IMAGE roles: 5; absolute text collisions: 0; 18px text safe-area risks: 0;
- Story / chronology image hashes remain the DK hashes;
- DK preserved hidden as rollback.

Result: `DM VERIFIED_LOCAL / PREFERRED`.

## AF / DL unchanged baselines

Outer AF and Profile/Q&A DL were re-read as the other two active V6 surfaces and not changed. No speculative layout revision was introduced merely to consume runtime.

## Drive / generated section masters

Fresh Drive readback confirms V6 root:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted. No materially improved quality-preserving external binary-placement capability was established in this run, so known blocked transport methods were not repeated.

## Asset lifecycle truth for this run

- newly image-generated assets: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster/image hashes: 0;
- replaceable photo role retained: YES;
- existing Story secondary photo geometry changed: YES;
- new simple functional Figma geometry: 4 thin rail/rule/tick nodes;
- whole / reading / actual-size visual QA: PASS;
- structural collision/safe-area QA: PASS;
- rollback preserved: YES;
- V7 touched: NO.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AF-DL-DM-STORY-PHOTO-SIDE-TRIP-BINDING-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-dm-story-photo-side-trip-binding.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-087-bind-secondary-information-before-adding-modules.md`.

Latest learning:

- RSL-086 — physical-page closing cadence: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-087 — when secondary information is correct but visually floats, first test binding it to an existing photo/text reading path with minimal functional geometry before adding another container or asset: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Rurubu-specific coordinates, colors, photo choices, masthead, typography and chronology geometry do not transfer.

## Completion gate

Do not call V6 complete or print-ready until:

- AF + DL/DM are reconciled with final legitimate photography and final personal copy;
- final copy receives fresh actual-size / realistic-copy stress where wrapping changes;
- replacement photography revalidates crop, semantic role, contrast and intrinsic quality;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 AF + DL/DM = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_STORY_AND_SIDE_TRIP_BINDING_VERIFIED / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare AF + DL/DM as one magazine at thumbnail, reading and actual-size scales before choosing another visual target.
3. Retain the DM rails only while they demonstrably bind information; do not repeat them as a style signature.
4. Prefer final legitimate photography when available, then revalidate crop/contrast/semantics.
5. Keep generated section masters unadopted until quality-preserving placement plus actual-size QA are possible.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
