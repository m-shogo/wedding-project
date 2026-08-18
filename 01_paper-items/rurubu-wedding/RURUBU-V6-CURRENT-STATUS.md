# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AH_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_EB_PREFERRED / GOURMET_CAFE_EA_PREFERRED / ONE_DAY_PLAN_DX_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_VISIBLE_RASTERS_INTRINSIC_SAFE_37_OF_37 / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer AH `1717:55` — preferred outer spread; front duplicate skyline role converted to editable issue panel.
- Profile / Q&A DN `1675:2` — preferred profile/interview spread.
- Story / chronology DO `1679:2` — preferred story/timeline spread.
- Memory Spots EB `1721:2` — preferred destination-information spread; DS visual grammar retained while the lead photo is now source-bounded and the lower-left editorial rhythm is rebalanced.
- Gourmet / Cafe EA `1720:2` — preferred gourmet/cafe spread; DZ hierarchy retained while all visible Cafe/Table raster roles are displayed within intrinsic source dimensions.
- Yokohama 1DAY Plan DX `1714:2` — preferred model-course spread; exact hero/STOP01 photo duplication removed.

Start Here `845:27`:

`V5 FU/FX · V6 AH + DN/DO + EB MEMORY SPOTS + EA CAFE & TABLE + DX 1DAY PLAN · V7 HOLD`

Rollback and rejected comparisons remain preserved. V7 was not edited.

## EB — Memory Spots intrinsic-safe correction

A full preferred-set image-size audit after EA promotion found one remaining intrinsic-size violation in DS:

- Memory Spots lead display `840×610`, intrinsic source `1356×560`.

Width was safe but displayed height exceeded source height by about 8.9%.

EB `1721:2` corrected the lead photo to `840×560` while preserving the existing waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8`. To avoid creating dead space beneath the shorter photo, the existing editable content was rebalanced as one bounded left-page composition:

- lead caption moved with the photographic edge;
- SPOT 01 native number/title/copy moved upward;
- SPOT 02 existing replaceable cafe image moved upward without resize;
- SPOT 02 native number/title/copy/label/pullquote moved upward;
- right guide page, all hashes and all semantic roles remained unchanged.

QA:

- left page native text `13`, collision `0`, 18px safe risks `0`;
- lead `840×560` vs intrinsic `1356×560`: PASS;
- SPOT 02 `405×335` vs intrinsic `810×552`: PASS;
- right page native text `14`, collision `0`, 18px safe risks `0`;
- SPOT 03 `238×218` vs intrinsic `240×220`: PASS;
- SPOT 04 `455×318` vs intrinsic `732×498`: PASS;
- whole/read screenshot PASS and actual-size structural review PASS.

Promotion: EB preferred; DS `1709:2` hidden rollback.

## DS — Memory Spots semantic truth repair history

DS replaced DR's destination-wrong SPOT 03 with the existing verified Yokohama skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, kept at `238×218` rather than enlarging the small source. EB keeps that semantic-truth repair while correcting the later-discovered lead-image upscale.

## DX — 1DAY Plan photo-diversity refinement

DV `1701:2` repeated waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8` as both dominant hero and STOP 01.

- DW `1713:2`: alternate image reduced repetition but actual screenshot showed a tropical-resort scene, contradicting Yokohama. Rejected/hidden.
- DX `1714:2`: STOP 01 changed only to existing verified Yokohama skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, kept at `238×210`.

DX remains preferred and verified.

## EA — Cafe/Table intrinsic-safe correction

DZ `1719:2` had already established the accepted Cafe/Table visual direction, but a fresh live intrinsic-dimension audit found two displayed photo roles exceeding their source dimensions:

- `PHOTO / GOURMET_VIEW_REPLACEABLE`: display `260×220`, intrinsic `240×220`;
- `PHOTO / GOURMET_DINING_HERO_REPLACEABLE`: display `793.7×500`, intrinsic `732×498`.

EA `1720:2` preserved DZ's typography, composed texture, image hashes, copy, hierarchy and replaceability while correcting only those geometries:

- Yokohama view `260×220 → 238×218`; hash unchanged `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- dining hero `793.7×500 → 732×498`; hash unchanged `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- dining hero remains top-left aligned so native white title stays bound to photography;
- travel texture remains `720×430` against intrinsic `720×860`;
- travel-object support remains `320×235` against intrinsic `944×608`;
- Cafe native text `14`, collision `0`, 18px safe risks `0`;
- Table native text `19`, collision `0`, 18px safe risks `0`;
- whole/read screenshot PASS and actual-size structural review PASS.

Promotion: EA preferred; DZ `1719:2` hidden rollback.

## DZ — Cafe typographic-field refinement history

DY had already made the correct semantic decision to remove one repeated cafe photograph and replace that non-evidentiary role with composed travel texture + native text. DZ strengthened that truthful subtraction rather than restoring imagery:

- verified composed travel texture hash `691a6ceed471a5d8efa144052a10564eed177b4f` at `720×430`, opacity `0.20`;
- native Cafe headline `甘いものと、\n窓ぎわの席。` at `50px`;
- native `01` at `92px`;
- native support label `CAFE NOTE / 01`;
- right Table support hash `e3738476f760932bb5b09c9d60f174dd6c84049d` at `320×235`, rotation `−2.5°`.

EA keeps this visual system while correcting the two source-dimension violations found later.

## AH — Outer duplicate skyline role subtraction

AG `1676:2` used the same Yokohama skyline hash twice inside one outer spread: back support and front postcard.

AH `1717:55` changed only the front postcard role:

- front repeated skyline replaced by existing verified travel texture `691a6ceed471a5d8efa144052a10564eed177b4f`;
- role became a native-editable issue panel: `YOKOHAMA / ISSUE 2026` + `PHOTO / FOOD / MEMORY`;
- back skyline photo remained untouched;
- initial native deck/title collision was detected and corrected before promotion;
- whole 500px PASS, whole 1200px PASS, front actual 794×1123 PASS;
- front native text `13`, collisions `0`, 18px safe risks `0`.

Promotion: AH preferred; AG hidden rollback.

## Preferred-set intrinsic-image audit

After EA and EB promotion, a live audit of every visible IMAGE role in all six preferred spreads returned:

- preferred roots audited: AH / DN / DO / EB / EA / DX;
- visible IMAGE roles: `37`;
- intrinsic-size violations: `0`;
- result: `37 / 37 PASS`.

This is a stronger current truth than the previous prose assumption. It verifies current dummy-design display geometry only; it does not prove final print effective DPI or final-source suitability.

## Preferred-set photo repetition audit

EA/EB change display geometry and page rhythm only; they do not materially change preferred-set image-hash repetition:

- cafe `c1ada...`: `6` roles;
- Yokohama skyline `644f...`: `6` roles;
- waterfront `539c...`: `6` roles;
- dining `d76e...`: `6` roles;
- travel texture `691a...`: `5` roles;
- travel-object/flatlay `e373...`: `4` roles;
- travel street `439a...`: `3` roles;
- masthead PNG `0bdb...`: `1` role.

Publication-level repetition remains a quality ceiling. Do not reduce repetition by introducing destination-wrong photography or by converting evidentiary place roles into decoration.

## Drive / generated section masters

V6 root remains:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted until quality-preserving placement plus actual-size QA is possible.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EA-CAFE-INTRINSIC-SAFE-QA-2026-08-18.md`;
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EB-MEMORY-SPOTS-INTRINSIC-SAFE-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-ea-cafe-intrinsic-safe.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-eb-memory-spots-intrinsic-safe.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-097-intrinsic-audit-can-overrule-visual-pass.md`.

RSL-097: a prior screenshot PASS does not replace a live intrinsic-dimension audit. If a raster role exceeds source dimensions, test a source-bounded rollback-safe candidate and adopt it only when whole/read/actual-size visual hierarchy still passes. EA and EB reproduced this method on two materially different Rurubu spreads in the same run; state remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`, not cross-item verified.

RSL-096 remains active: after a repeated/nonessential photo is truthfully removed, if the resulting print role is too quiet and does not require photographic evidence, independently test stronger native typography inside the existing bounded composed support before restoring imagery or adding cards.

## Asset lifecycle truth for latest run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- preferred visible IMAGE roles intrinsic-safe: `37 / 37`;
- existing verified composed texture reused: `YES`;
- existing verified image fills reused: `YES`;
- native text preserved: `YES`;
- remaining photography preserved as independently replaceable roles: `YES`;
- whole / actual-size visual QA: `PASS`;
- collision / safe-area QA: `PASS`;
- rollback evidence preserved: `YES`;
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 AH + DN/DO + EB + EA + DX = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_VISIBLE_RASTERS_INTRINSIC_SAFE_37_OF_37 / PHOTO_REPETITION_REDUCED_WITHOUT_FALSE_DESTINATION_ASSETS / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Continue publication-level photo-repetition audit by semantic role, not by count alone.
3. Treat `37 / 37 intrinsic-safe` as a dummy-layout gate only; final legitimate photography still needs effective print-resolution calculation.
4. Prioritize final legitimate distinct Yokohama/destination photography over extra surface decoration.
5. Keep EB / EA / DX as preferred middle-feature studies until page count/imposition is known.
6. Do not convert place-evidence photos into decoration merely to improve repetition metrics.
7. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
