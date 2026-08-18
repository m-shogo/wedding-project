# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AH_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_DS_PREFERRED / GOURMET_CAFE_DZ_PREFERRED / ONE_DAY_PLAN_DX_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer AH `1717:55` — preferred outer spread; front duplicate skyline role converted to editable issue panel.
- Profile / Q&A DN `1675:2` — preferred profile/interview spread.
- Story / chronology DO `1679:2` — preferred story/timeline spread.
- Memory Spots DS `1709:2` — preferred destination-information spread; SPOT 03 uses truthful Yokohama skyline source.
- Gourmet / Cafe DZ `1719:2` — preferred gourmet/cafe spread; truthful photo subtraction retained, Cafe field strengthened with native Japanese typography, Table support photo made more editorial without changing its source.
- Yokohama 1DAY Plan DX `1714:2` — preferred model-course spread; exact hero/STOP01 photo duplication removed.

Start Here `845:27`:

`V5 FU/FX · V6 AH + DN/DO + DS MEMORY SPOTS + DZ CAFE & TABLE + DX 1DAY PLAN · V7 HOLD`

Rollback and rejected comparisons remain preserved. V7 was not edited.

## DS — Memory Spots semantic truth repair

DS replaced DR's destination-wrong SPOT 03 with the existing verified Yokohama skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, kept at `238×218` rather than enlarging the small source. Whole/reading/actual-size QA passed with collisions `0` and 18px safe risks `0`.

## DX — 1DAY Plan photo-diversity refinement

DV `1701:2` repeated waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8` as both dominant hero and STOP 01.

- DW `1713:2`: alternate image reduced repetition but actual screenshot showed a tropical-resort scene, contradicting Yokohama. Rejected/hidden.
- DX `1714:2`: STOP 01 changed only to existing verified Yokohama skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, kept at `238×210`.

DX remains preferred and verified.

## DZ — Cafe typographic-field refinement

DY had already made the correct semantic decision to remove one repeated cafe photograph and replace that non-evidentiary role with composed travel texture + native text. Actual-size and whole-spread comparison still showed the Cafe page as too quiet and under-filled.

DZ `1719:2` kept the truthful photo-subtraction decision and strengthened hierarchy instead of restoring imagery:

- existing verified composed travel texture hash `691a6ceed471a5d8efa144052a10564eed177b4f` widened to `720×430`, opacity `0.20`;
- native Cafe feature headline changed to `甘いものと、\n窓ぎわの席。` at `50px`;
- native `01` enlarged to `92px`;
- native support label changed to `CAFE NOTE / 01`;
- Cafe copy / metadata remained native text;
- replaceable Yokohama view photo hash `644f449c3bf2001a94d4b822d2b55e2614c11042` remained independent and unchanged;
- right Table page retained hero hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` and enlarged the existing travel-object support hash `e3738476f760932bb5b09c9d60f174dd6c84049d` to `320×235`, rotation `−2.5°`, reducing rigid module rhythm without adding imagery;
- whole 1200px PASS;
- Cafe actual `1719:3` 794×1123 PASS;
- left visible native text `14`, visible IMAGE roles `2`, absolute text collisions `0`, 18px safe risks `0`;
- right visible native text `19`, visible IMAGE roles `2`, absolute text collisions `0`, 18px safe risks `0`.

Promotion: DZ preferred; DY `1717:2` hidden rollback.

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

## Preferred-set photo repetition audit

DZ changes hierarchy and photo geometry only; it does not change preferred-set image-hash counts from the AH + DY audit:

- cafe `c1ada...`: `6` roles (was 7);
- Yokohama skyline `644f...`: `6` roles (was 7);
- waterfront `539c...`: `6` roles;
- dining `d76e...`: `6` roles;
- travel texture `691a...`: `5` roles;
- travel-object/flatlay `e373...`: `4` roles;
- travel street `439a...`: `3` roles;
- masthead PNG `0bdb...`: `1` role.

Publication-level repetition is still a quality ceiling. The current work proves a second step after truthful photo subtraction: if an editorial/non-evidentiary role becomes too quiet, recover energy through native hierarchy before reintroducing repeated or destination-wrong photography.

## Drive / generated section masters

V6 root remains:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted until quality-preserving placement plus actual-size QA is possible.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-DZ-CAFE-TYPOGRAPHIC-FIELD-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-dz-cafe-typographic-field.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-096-typography-can-recover-energy-after-photo-subtraction.md`.

RSL-096: after a repeated/nonessential photo is truthfully removed, if the resulting print role is too quiet and does not require photographic evidence, independently test stronger native typography inside the existing bounded composed support before restoring imagery or adding cards.

RSL-095 remains active: when no truthful alternate photo exists, first classify whether a repeated role actually requires photographic evidence; a decorative/support role may be converted to composed fixed decoration + native editable text instead of forcing a false replacement image.

## Asset lifecycle truth for latest run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
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

`V6 AH + DN/DO + DS + DZ + DX = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PHOTO_REPETITION_REDUCED_WITHOUT_FALSE_DESTINATION_ASSETS / CAFE_HIERARCHY_STRENGTHENED_WITHOUT_RESTORING_REPEATED_PHOTO / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Continue publication-level photo-repetition audit by semantic role, not by count alone.
3. Prioritize final legitimate distinct Yokohama/destination photography over extra surface decoration.
4. Keep DS / DZ / DX as preferred middle-feature studies until page count/imposition is known.
5. Do not convert place-evidence photos into decoration merely to improve repetition metrics.
6. When truthful photo subtraction makes a non-evidentiary role too quiet, test native hierarchy before restoring photography.
7. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
