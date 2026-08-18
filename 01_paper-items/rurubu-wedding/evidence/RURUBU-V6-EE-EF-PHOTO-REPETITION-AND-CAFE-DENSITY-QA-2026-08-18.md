# Rurubu WEDDING V6 — EE / EF QA

Date: 2026-08-18
Scope: Rurubu WEDDING only

## Starting live preferred set

- Outer AH `1717:55`
- Profile/Q&A DN `1675:2`
- Story/Chronology DO `1679:2`
- Memory Spots EB `1721:2`
- Cafe/Table EA `1720:2`
- 1DAY Plan EC `1723:63`
- V7 HOLD

## Experiment A — Profile ED rejected

Visible problem: publication-level photo repetition remained high, including travel-flatlay imagery in several non-person editorial roles.

Hypothesis: the Profile hero is not a place-evidence role, so replacing its flatlay photo with the existing verified composed travel texture might reduce repeated photography without losing the profile hierarchy.

Bounded test: rollback-safe duplicate ED `1727:2` changed only the Profile hero from flatlay image to existing composed travel texture and strengthened native `TRAVEL PROFILE` / pullquote typography. Existing lower Profile texture was hidden to avoid double-texture repetition. Q&A and all replaceable snapshots stayed unchanged.

Result: REJECTED. Whole-spread comparison showed a clear loss of photographic energy in the upper Profile page. The candidate became too quiet and looked more like a designed template than a Japanese travel-magazine editorial page.

Status: `REJECTED`; ED is hidden and preserved as evidence.

Failure fingerprint: `PHOTO_REPETITION_SUBTRACTION_REMOVES_EDITORIAL_ENERGY`.

## Experiment B — Outer EE adopted

Visible problem: Outer AH used the same cafe hash `c1ada11205bc3978bf426b304d683f1c1566cac2` twice in one spread: back-cover cafe feature and front-cover cafe-memory support.

Root-cause hypothesis: the back-cover cafe photo was not necessary once the verified flatlay already carried the back-cover editorial field. Removing that duplicate could improve publication diversity if the dominant flatlay were allowed to bind the memory title directly.

Bounded test on EE `1730:2`:

- hide only `V6_A_BACK_CAFE`;
- extend existing flatlay from `793.7×490` to `793.7×608`;
- source remains known `944×608`, so display stays intrinsic-safe;
- move existing navy memory caption strip/title upward to bind directly to the flatlay;
- keep skyline support, timeline, WEDDING closure and entire front cover unchanged;
- add no new image, card, shadow, gradient or generated decoration.

### Visual evidence

- 1200px whole spread: PASS and stronger than AH;
- back cover actual size `794×1123`: PASS;
- back-cover text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible IMAGE roles in EE: `7` vs AH `8`;
- flatlay `793.7×608` against known source `944×608`: PASS.

Result: `VERIFIED_LOCAL`; EE promoted to `PREFERRED / V6_OUTER_EE_BACK_CAFE_SUBTRACTION_2026_08_18`. AH is hidden rollback.

## Experiment C — Cafe/Table EF adopted

Visible problem: EA left Cafe page was structurally sound but the area between `02 / VIEW & WALK` and the closing quote still read as unused template space at actual size.

Root-cause hypothesis: this role needs reader-facing guide density, not another photo or card.

Bounded test on EF `1734:2`:

- preserve every image role/hash/geometry from EA;
- add native `CAFE CHECK / 02`;
- add native two-line guide note `午後の光がやわらかい時間に。 / 食後は海側へ少し歩く。`;
- move existing closing quote/meta downward to preserve rhythm;
- no new raster, card, image or generated asset.

### Visual evidence

- 1200px whole spread: PASS and denser than EA without becoming card/grid-like;
- Cafe left page actual size `794×1123`: PASS;
- visible native text on left page: `16`;
- text collisions: `0`;
- 18px safe-area risks: `0`;
- image roles/hashes unchanged from EA.

Result: `VERIFIED_LOCAL`; EF promoted to `PREFERRED / V6_INSIDE_EF_CAFE_GUIDE_NOTE_DENSITY_2026_08_18`. EA is hidden rollback.

## Preferred-set readback after promotion

Live preferred roots:

- EE `1730:2`
- DN `1675:2`
- DO `1679:2`
- EB `1721:2`
- EF `1734:2`
- EC `1723:63`

Visible IMAGE roles: `36` total.

Hash repetition:

- Yokohama skyline `644f449c...`: `6`
- waterfront `539c259b...`: `6`
- dining `d76eb07d...`: `6`
- travel texture `691a6cee...`: `5`
- cafe `c1ada112...`: `5` (reduced from 6)
- travel-object/flatlay `e3738476...`: `4`
- travel street `439a719d...`: `3`
- masthead PNG `0bdbf479...`: `1`

No new image hash was created.

## Asset lifecycle truth

- newly generated assets: `0`
- adopted generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`
- native text preserved: `YES`
- remaining photos independently replaceable: `YES`
- rollback/rejected comparisons preserved: `YES`
- V7 touched: `NO`

## Completion boundary

EE/EF are verified dummy-design improvements only. V6 remains `NOT_PRINT_READY` until final legitimate photography/copy, page count/imposition, exact printer template, bleed/trim/fold/safe area, PDF preflight and physical proof are verified.
