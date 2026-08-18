# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AH_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_DS_PREFERRED / GOURMET_CAFE_DY_PREFERRED / ONE_DAY_PLAN_DX_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer AH `1717:55` — preferred outer spread; front duplicate skyline role converted to editable issue panel.
- Profile / Q&A DN `1675:2` — preferred profile/interview spread.
- Story / chronology DO `1679:2` — preferred story/timeline spread.
- Memory Spots DS `1709:2` — preferred destination-information spread; SPOT 03 uses truthful Yokohama skyline source.
- Gourmet / Cafe DY `1717:2` — preferred gourmet/cafe spread; repeated cafe hero converted to composed texture + native editorial type.
- Yokohama 1DAY Plan DX `1714:2` — preferred model-course spread; exact hero/STOP01 photo duplication removed.

Start Here `845:27`:

`V5 FU/FX · V6 AH + DN/DO + DS MEMORY SPOTS + DY CAFE & TABLE + DX 1DAY PLAN · V7 HOLD`

Rollback and rejected comparisons remain preserved. V7 was not edited.

## DS — Memory Spots semantic truth repair

DS replaced DR's destination-wrong SPOT 03 with the existing verified Yokohama skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, kept at `238×218` rather than enlarging the small source. Whole/reading/actual-size QA passed with collisions `0` and 18px safe risks `0`.

## DX — 1DAY Plan photo-diversity refinement

DV `1701:2` repeated waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8` as both dominant hero and STOP 01.

- DW `1713:2`: alternate image reduced repetition but actual screenshot showed a tropical-resort scene, contradicting Yokohama. Rejected/hidden.
- DX `1714:2`: STOP 01 changed only to existing verified Yokohama skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, kept at `238×210`.

DX remains preferred and verified.

## DY — Cafe & Table photo-role subtraction

DT `1695:2` used cafe hash `c1ada11205bc3978bf426b304d683f1c1566cac2` as a large hero even though the role could be carried by editorial type / metadata rather than photographic evidence.

DY `1717:2`:

- hid only that repeated cafe hero;
- reused existing verified composed travel texture hash `691a6ceed471a5d8efa144052a10564eed177b4f` in the same bounded field;
- rebuilt the feature with native `休日のカフェ時間。` typography and practical Cafe metadata;
- retained the smaller replaceable Yokohama view photo;
- whole 500px PASS, whole 1200px PASS, left actual `1717:3` 794×1123 PASS;
- visible text `14`, visible IMAGE roles `2` (one composed texture + one replaceable photo);
- absolute text collisions `0`, 18px text safe risks `0`.

Promotion: DY preferred; DT hidden rollback.

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

After AH + DY promotion, current visible preferred-set image-hash counts are:

- cafe `c1ada...`: `6` roles (was 7);
- Yokohama skyline `644f...`: `6` roles (was 7);
- waterfront `539c...`: `6` roles;
- dining `d76e...`: `6` roles;
- travel texture `691a...`: `5` roles;
- travel-object/flatlay `e373...`: `4` roles;
- travel street `439a...`: `3` roles;
- masthead PNG `0bdb...`: `1` role.

Publication-level repetition is still a quality ceiling. Current improvement removes two exact repeated-photo roles without introducing destination-wrong substitutes. Continue to prefer truthful distinct photography when available; convert a repeated role to composed decoration + native text only when that role does not need photographic evidence.

## Drive / generated section masters

V6 root remains:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted until quality-preserving placement plus actual-size QA is possible.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AH-DY-PHOTO-REPETITION-SUBTRACTION-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-ah-dy-photo-repetition-subtraction.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-095-repetition-can-be-reduced-by-changing-role-not-source.md`.

RSL-095: when no truthful alternate photo exists, first classify whether a repeated role actually requires photographic evidence. A decorative/support role may be converted to composed fixed decoration + native editable text instead of forcing a false replacement image.

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

`V6 AH + DN/DO + DS + DY + DX = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PHOTO_REPETITION_REDUCED_WITHOUT_FALSE_DESTINATION_ASSETS / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Continue publication-level photo-repetition audit by semantic role, not by count alone.
3. Prioritize final legitimate distinct Yokohama/destination photography over extra surface decoration.
4. Keep DS / DY / DX as preferred middle-feature studies until page count/imposition is known.
5. Do not convert place-evidence photos into decoration merely to improve repetition metrics.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
