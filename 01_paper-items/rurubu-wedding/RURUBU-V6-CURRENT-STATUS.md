# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_EE_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_EB_PREFERRED / GOURMET_CAFE_EF_PREFERRED / ONE_DAY_PLAN_EG_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / PREFERRED_VISIBLE_IMAGE_ROLES_36 / PHOTO_REPETITION_ROLE_AUDITED / PREFERRED_NODE_LIVENESS_RECONCILED / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

- Outer EE `1730:2` — preferred outer spread; duplicate back-cover cafe photo removed, existing flatlay extended only to known source height, memory title rebound to the dominant field.
- Profile / Q&A DN `1675:2` — preferred profile/interview spread.
- Story / chronology DO `1679:2` — preferred story/timeline spread.
- Memory Spots EB `1721:2` — preferred destination-information spread; lead image remains source-bounded.
- Gourmet / Cafe EF `1734:2` — preferred cafe/table spread; EA image roles preserved while the Cafe page gains a compact native reader-facing guide note in the previous dead gap.
- Yokohama 1DAY Plan EG `1739:2` — live preferred model-course spread; reconstructed from verified DX rollback after durable EC IDs were found missing live. Right page `1739:29`; practical metadata remains native/editable.

Start Here `845:27`:

`V5 FU/FX · V6 EE + DN/DO + EB MEMORY SPOTS + EF CAFE & TABLE + EG 1DAY PLAN · V7 HOLD`

Rollback/rejected comparisons remain preserved. V7 was not edited.

## EG — 1DAY preferred liveness reconciliation

Fresh pre-write reconciliation found that durable status still pointed to EC `1723:63`, but live Figma no longer contained `1723:2`, `1723:63`, or right page `1723:90`. Verified rollback DX `1714:2` remained intact and hidden.

Per authority order, live Figma was treated as truth. No attempt was made to continue writing against the missing EC IDs.

Rollback-safe EG `1739:2` was reconstructed from DX using only the already-verified RSL-098 delta:

- STOP 01 `MOVE / WALK　　MOOD / MORNING`;
- STOP 02 `BREAK / CAFE　　PACE / SLOW`;
- STOP 03 `MOVE / WALK　　STYLE / DETOUR`;
- STOP 04 `TABLE / DINNER　　MOOD / RELAX`.

Metadata node parent readback:

- `1739:63` → `1739:29 / PAGE / V6_1DAY_RIGHT`;
- `1739:64` → `1739:29`;
- `1739:65` → `1739:29`;
- `1739:66` → `1739:29`.

Actual-size left-page review also found visible internal copy `TRIP DATA / EDITABLE`. It was replaced in native text with reader-facing `TRIP DATA / YOKOHAMA`. A subsequent scan across all live preferred V6 visible text found no remaining production/proof terms in the tested vocabulary.

EG QA:

- 1200px whole spread: PASS;
- left actual `1739:3`, `794×1123`: PASS;
- right actual `1739:29`, `794×1123`: PASS;
- left native text: `19`; collisions `0`; 18px safe risks `0`;
- right native text: `25`; collisions `0`; 18px safe risks `0`;
- right replaceable photo roles: `4`;
- whole spread preserves the verified five-photo 1DAY structure;
- image hashes/crops/routes/times/titles were inherited unchanged from verified DX.

Promotion: EG preferred; DX `1714:2` remains hidden rollback.

Failure fingerprint: `PREFERRED_STATUS_POINTS_TO_MISSING_LIVE_NODE`.

Before future writes, durable preferred IDs must be resolved against live node existence/visibility/semantic role. If a preferred node is missing, reconcile from verified rollback/evidence rather than silently inventing a replacement.

## Preferred canvas organization

Fresh live readback found EB `1721:2` and EF `1734:2` almost exactly overlapping at the same page-level canvas position. Internal designs were valid, but the overlap made the preferred set unnecessarily difficult for a human to inspect and edit.

Only top-level spread positions were changed; no internal page geometry changed:

- EB remains x `249387.75` / y `6440`;
- EF is now x `251155.15625` / y `6440`;
- EG is now x `252922.5625` / y `6440`.

EB / EF / EG now read side-by-side on the working canvas.

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

Preferred roots: EE / DN / DO / EB / EF / EG.

Visible IMAGE roles remain `36` total after restoring the intended live 1DAY preferred spread. EG restores the verified DX/EC image roles rather than introducing a new asset set.

Hash repetition from the latest full preferred-set audit remains the working reference:

- Yokohama skyline `644f449c...`: `6` roles;
- waterfront `539c259b...`: `6` roles;
- dining `d76eb07d...`: `6` roles;
- travel texture `691a6cee...`: `5` roles;
- cafe `c1ada112...`: `5` roles;
- travel-object/flatlay `e3738476...`: `4` roles;
- travel street `439a719d...`: `3` roles;
- masthead PNG `0bdbf479...`: `1` role.

Do not optimize repetition count blindly. Evidentiary/place roles and dominant editorial-energy roles must not be removed merely to lower a number. ED proves that even a non-evidentiary repeated photo can still be necessary for magazine energy; EE proves that a redundant role can be removed when another legitimate field already performs its job.

The prior preferred-set intrinsic audit passed all live roles. EG uses the verified DX image geometry/hashes and introduces no new upscale condition. This remains a dummy-layout geometry gate, not final print effective-DPI proof.

## Drive / generated section masters

V6 root remains verified in Drive:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted until quality-preserving placement plus actual-size QA is possible.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EG-1DAY-PREFERRED-LIVENESS-RECONCILIATION-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-eg-live-preferred-reconciliation.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-100-preferred-node-liveness-reconciliation.md`;
- previous latest visual evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EE-EF-PHOTO-REPETITION-AND-CAFE-DENSITY-QA-2026-08-18.md`.

RSL-100: durable preferred status is not sufficient evidence that the preferred node still exists live. Resolve live node existence/visibility/semantic role before writes; if missing, reconcile only from verified rollback/evidence. State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

RSL-099 remains active: reduce photo repetition by semantic/editorial role, not by count.

RSL-098 remains active: when a travel-guide sequence is too sparse to feel useful, add small semantic native practical metadata before cards or extra photography. EG restores that already-verified behavior in live Figma.

## Asset lifecycle truth for latest run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- reconstructed Figma preferred root from verified rollback: `YES`;
- visible preferred IMAGE roles: `36`;
- native text preserved: `YES`;
- remaining photography preserved as independently replaceable roles: `YES`;
- EG whole / left actual / right actual visual QA: `PASS`;
- EG collision / safe-area QA: `PASS`;
- preferred-visible production-term scan after correction: `0 hits`;
- preferred middle-spread canvas overlap corrected: `YES`;
- rollback/rejected evidence preserved: `YES`;
- V7 touched: `NO`.

## Completion gate

Do not call V6 complete or print-ready until final legitimate photography/copy, final page count/imposition, exact printer/product template, bleed/trim/fold/safe area, exported PDF preflight and physical proof are verified.

Current state:

`V6 EE + DN/DO + EB + EF + EG = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / PHOTO_REPETITION_REDUCED_BY_ROLE / PRACTICAL_GUIDE_DENSITY_RESTORED_LIVE / PREFERRED_NODE_LIVENESS_RECONCILED / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Before each write, reconcile durable preferred IDs with live Figma node liveness.
3. Continue publication-level photo-repetition audit by semantic role, not by count alone.
4. Prioritize final legitimate distinct Yokohama/destination photography over extra surface decoration.
5. Do not repeat the rejected Profile texture substitution without a material new asset/capability.
6. Keep practical metadata native/editable and varied by page role; do not turn all spreads into the same label system.
7. Keep EB / EF / EG as preferred middle-feature studies until page count/imposition is known.
8. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
