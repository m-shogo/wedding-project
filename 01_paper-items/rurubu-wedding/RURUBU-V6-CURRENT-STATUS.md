# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AH_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_EB_PREFERRED / GOURMET_CAFE_EA_PREFERRED / ONE_DAY_PLAN_EC_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_VISIBLE_RASTERS_INTRINSIC_SAFE_37_OF_37 / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer AH `1717:55` — preferred outer spread; front duplicate skyline role converted to editable issue panel.
- Profile / Q&A DN `1675:2` — preferred profile/interview spread.
- Story / chronology DO `1679:2` — preferred story/timeline spread.
- Memory Spots EB `1721:2` — preferred destination-information spread; lead image remains source-bounded.
- Gourmet / Cafe EA `1720:2` — preferred gourmet/cafe spread; all visible Cafe/Table raster roles remain intrinsic-safe.
- Yokohama 1DAY Plan EC `1723:63` — preferred model-course spread; DX photo-diversity composition retained and four compact native practical metadata lines added to the STOP sequence.

Start Here `845:27`:

`V5 FU/FX · V6 AH + DN/DO + EB MEMORY SPOTS + EA CAFE & TABLE + EC 1DAY PLAN · V7 HOLD`

Rollback and rejected comparisons remain preserved. V7 was not edited.

## EC — 1DAY Plan practical-metadata refinement

DX already had a strong photo-led model-course layout, but its right page still read mainly as time + title + short copy. At actual size it lacked the small practical scan-density common to travel-guide editorial.

Rollback-safe EC `1723:63` preserved every existing image role, photo hash, route line, time, title, copy and page geometry, and added only four compact native-text metadata roles beneath STOP 01–04:

- `MOVE / WALK　　MOOD / MORNING`
- `BREAK / CAFE　　PACE / SLOW`
- `MOVE / WALK　　STYLE / DETOUR`
- `TABLE / DINNER　　MOOD / RELAX`

The first mutation attempt failed atomically because a selector contained `/`; no Figma write occurred. The corrected candidate initially placed cloned metadata at the page root rather than inside the candidate right page. That structural defect was detected before adoption; all four nodes were reparented to `1723:90 / PAGE / V6_1DAY_RIGHT` and revalidated.

Final QA:

- 1200px whole spread screenshot: PASS;
- right page actual size `794×1123`: PASS;
- visible native text on EC: `44` total;
- right page visible native text: `25`;
- absolute right-page text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible IMAGE roles: `5`, unchanged from DX;
- image hashes / crops / geometry: unchanged from DX;
- all photos remain independently replaceable.

Promotion: EC preferred; DX `1714:2` renamed rollback and hidden.

## Preferred-set intrinsic-image audit

The preferred visible raster geometry remains unchanged by EC. The previous live audit remains valid:

- preferred visible IMAGE roles: `37`;
- intrinsic-size violations: `0`;
- result: `37 / 37 PASS`.

This is a dummy-layout geometry gate only; it does not prove final print effective DPI or final-source suitability.

## Preferred-set photo repetition audit

EC adds no raster and changes no photo hash. Publication-level repetition remains a quality ceiling:

- cafe `c1ada...`: `6` roles;
- Yokohama skyline `644f...`: `6` roles;
- waterfront `539c...`: `6` roles;
- dining `d76e...`: `6` roles;
- travel texture `691a...`: `5` roles;
- travel-object/flatlay `e373...`: `4` roles;
- travel street `439a...`: `3` roles;
- masthead PNG `0bdb...`: `1` role.

Do not reduce repetition by introducing destination-wrong photography or by converting evidentiary place roles into decoration.

## Drive / generated section masters

V6 root remains verified in Drive:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted until quality-preserving placement plus actual-size QA is possible.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EC-1DAY-PLAN-PRACTICAL-METADATA-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-ec-1day-practical-metadata.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-098-practical-metadata-without-cards.md`.

RSL-098: when a travel-guide sequence is structurally sound but still too sparse to feel useful, test compact native practical metadata tied directly to each editorial beat before adding cards, badges or more photography. The principle is `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; exact copy, colors, geometry and Rurubu grammar remain item-specific.

## Asset lifecycle truth for latest run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- preferred visible IMAGE roles intrinsic-safe: `37 / 37`;
- native text preserved: `YES`;
- photography preserved as independently replaceable roles: `YES`;
- whole / actual-size visual QA: `PASS`;
- collision / safe-area QA: `PASS`;
- rollback evidence preserved: `YES`;
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 AH + DN/DO + EB + EA + EC = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / PRACTICAL_GUIDE_DENSITY_IMPROVED / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_VISIBLE_RASTERS_INTRINSIC_SAFE_37_OF_37 / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Continue publication-level photo-repetition audit by semantic role, not by count alone.
3. Prioritize final legitimate distinct Yokohama/destination photography over extra surface decoration.
4. Keep practical metadata native/editable; do not turn it into a card grid.
5. Keep EB / EA / EC as preferred middle-feature studies until page count/imposition is known.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
