# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EE_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_EB_PREFERRED / GOURMET_CAFE_EF_PREFERRED / ONE_DAY_PLAN_EC_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_VISIBLE_IMAGE_ROLES_36 / PHOTO_REPETITION_ROLE_AUDITED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EE `1730:2` — preferred outer spread; duplicate back-cover cafe photo removed, existing flatlay extended only to known source height, memory title rebound to the dominant field.
- Profile / Q&A DN `1675:2` — preferred profile/interview spread.
- Story / chronology DO `1679:2` — preferred story/timeline spread.
- Memory Spots EB `1721:2` — preferred destination-information spread; lead image remains source-bounded.
- Gourmet / Cafe EF `1734:2` — preferred cafe/table spread; EA image roles preserved while the Cafe page gains a compact native reader-facing guide note in the previous dead gap.
- Yokohama 1DAY Plan EC `1723:63` — preferred model-course spread; practical metadata remains native/editable.

Start Here `845:27`:

`V5 FU/FX · V6 EE + DN/DO + EB MEMORY SPOTS + EF CAFE & TABLE + EC 1DAY PLAN · V7 HOLD`

Rollback/rejected comparisons remain preserved. V7 was not edited.

## EE — Outer repeated-cafe subtraction

AH used cafe hash `c1ada11205bc3978bf426b304d683f1c1566cac2` on both back and front within one spread.

Rollback-safe EE `1730:2`:

- hid only back cafe image;
- extended existing flatlay from `793.7×490` to `793.7×608`;
- known flatlay source remains `944×608`, so geometry is source-bounded;
- moved existing memory caption strip/title upward to bind directly to the flatlay;
- kept skyline support, year sequence, WEDDING closure and entire front cover unchanged;
- added no new image, card, shadow, gradient or generated decoration.

QA:

- 1200px whole spread: PASS and stronger than AH;
- back cover actual size `794×1123`: PASS;
- back-cover text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible IMAGE roles in EE: `7` vs AH `8`.

Promotion: EE preferred; AH `1717:55` hidden rollback.

Counterexample: Profile ED `1727:2` tried replacing the non-evidentiary flatlay hero with the existing composed travel texture. Despite stronger native typography, the page lost too much photographic/editorial energy and became template-like. ED is `REJECTED` and hidden. Failure fingerprint: `PHOTO_REPETITION_SUBTRACTION_REMOVES_EDITORIAL_ENERGY`.

## EF — Cafe guide-note density

EA left Cafe page was visually sound but still had an underused gap between `02 / VIEW & WALK` and the closing beat.

Rollback-safe EF `1734:2` kept every image role/hash/geometry and added only native reader-facing text:

- `CAFE CHECK / 02`;
- `午後の光がやわらかい時間に。`;
- `食後は海側へ少し歩く。`;
- existing closing quote/meta moved slightly downward.

No card, new raster, photo or generated decoration was added.

QA:

- 1200px whole spread: PASS and denser than EA without card/grid reading;
- Cafe actual size `794×1123`: PASS;
- left native text: `16`;
- text collisions: `0`;
- 18px text safe-area risks: `0`;
- image roles/hashes unchanged from EA.

Promotion: EF preferred; EA `1720:2` hidden rollback.

## Preferred-set live image-role / repetition audit

Preferred roots audited: EE / DN / DO / EB / EF / EC.

Visible IMAGE roles: `36` total.

Hash repetition:

- Yokohama skyline `644f449c...`: `6` roles;
- waterfront `539c259b...`: `6` roles;
- dining `d76eb07d...`: `6` roles;
- travel texture `691a6cee...`: `5` roles;
- cafe `c1ada112...`: `5` roles (reduced from `6` by EE);
- travel-object/flatlay `e3738476...`: `4` roles;
- travel street `439a719d...`: `3` roles;
- masthead PNG `0bdbf479...`: `1` role.

Do not optimize repetition count blindly. Evidentiary/place roles and dominant editorial-energy roles must not be removed merely to lower a number. ED proves that even a non-evidentiary repeated photo can still be necessary for magazine energy; EE proves that a redundant role can be removed when another legitimate field already performs its job.

The prior preferred-set intrinsic audit was `37/37 PASS`. EE removes one image role and changes only flatlay height to its known source height; EF changes no image geometry. Current live preferred image geometry has no newly introduced upscale violation. This remains a dummy-layout geometry gate, not final print effective-DPI proof.

## Drive / generated section masters

V6 root remains verified in Drive:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted until quality-preserving placement plus actual-size QA is possible.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EE-EF-PHOTO-REPETITION-AND-CAFE-DENSITY-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-ee-ef-photo-repetition-cafe-density.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-099-photo-repetition-role-subtraction.md`.

RSL-099: reduce photo repetition by semantic/editorial role, not by count. A rollback-safe substitution that loses editorial energy must be rejected even if it improves diversity metrics. A redundant photo role can be removed when an existing legitimate field preserves or improves the page at whole/read/actual-size scales. State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

RSL-098 remains active: when a travel-guide sequence is too sparse to feel useful, add small semantic native practical metadata before cards or extra photography. EF independently follows the same general direction on a different page role without copying the 1DAY label grammar.

## Asset lifecycle truth for latest run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- visible preferred IMAGE roles: `36`;
- cafe repetition: `6 → 5`;
- native text preserved: `YES`;
- remaining photography preserved as independently replaceable roles: `YES`;
- whole / actual-size visual QA: `PASS` for EE and EF;
- collision / safe-area QA: `PASS`;
- rollback/rejected evidence preserved: `YES`;
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EE + DN/DO + EB + EF + EC = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / PHOTO_REPETITION_REDUCED_BY_ROLE / PRACTICAL_GUIDE_DENSITY_IMPROVED / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Continue publication-level photo-repetition audit by semantic role, not by count alone.
3. Prioritize final legitimate distinct Yokohama/destination photography over extra surface decoration.
4. Do not repeat the rejected Profile texture substitution without a material new asset/capability.
5. Keep practical metadata native/editable and varied by page role; do not turn all spreads into the same label system.
6. Keep EB / EF / EC as preferred middle-feature studies until page count/imposition is known.
7. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
