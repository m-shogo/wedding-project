# Rurubu WEDDING V6 — EJ / EK / EL semantic photo-role QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / V7_HOLD / NOT_PRINT_READY`

## Starting preferred set

- Outer EE `1730:2`
- Profile/Q&A DN `1675:2`
- Story/Chronology DO `1679:2`
- Memory Spots EB `1721:2`
- Cafe/Table EF `1734:2`
- 1DAY Plan EI `1752:2`

Live-node liveness was re-read before writes and matched GitHub authority.

## Experiment 1 — Memory Spots EB → EJ

### Visible problem

On EB right page, Spot 03 used a source-limited `240×220` Yokohama skyline and could not be enlarged safely. The area below it remained visually weak while Spot 04 had a `732×498` dining source with room to become a stronger second feature.

### Bounded test

Rollback-safe EJ `1759:2` kept all text native and kept both photo hashes unchanged. Spot 04 alone was promoted from `455×318` to `493×344`, moved upward, and its existing native title/copy/label were rebalanced beside it. Spot 03 remained source-safe at `238×218`.

### Result

Adopted. Whole-spread and actual-size review showed better page fill and a clearer 03→04 hierarchy without enlarging the low-resolution skyline or adding a card/asset.

Final EJ right page `1759:24`:

- native text: `14`
- text collisions: `0`
- 18px text safe-area risks: `0`
- overflow: `0`
- Spot 03: `238×218` / intrinsic `240×220`
- Spot 04: `493×344` / intrinsic `732×498`

EB `1721:2` remains hidden rollback.

## Experiment 2 — Profile DN → EK

### Visible problem

The preferred photo pool was still heavily repeated. DN used the same low-resolution Yokohama skyline as its small third profile snapshot even though that role was decorative/supporting rather than evidence-bearing.

### Legacy-raster audit before substitution

The existing Rurubu-only unused-raster contact sheet was inspected in a temporary visible QA clone and then hidden again. The unused candidates included non-Yokohama coastal/resort imagery and two people images without sufficiently established production provenance for this role. They were rejected rather than used merely to reduce repetition.

### Bounded test

Rollback-safe EK `1762:2` hid only `PHOTO / PROFILE_SNAPSHOT_3_REPLACEABLE` and reused the already-adopted composed travel texture behind the cluster. The removed skyline support was replaced by editable native typography:

- `NEXT DESTINATION`
- large native `03`
- `次の目的地へ。`
- one small functional yellow rule

The first typography attempt was not adopted because newly cloned text nodes were parented at page root rather than the candidate Profile page and therefore rendered behind the intended composition. Parent readback caught the error. After correct re-parenting, another structural pass found text-box overlap/safe-area proximity; title/ordinal geometry was tightened until both were zero.

### Result

Adopted. The page remains photo-led through the full-width Profile hero plus two overlapping replaceable snapshots, while the third repeated skyline becomes an intentional editorial beat rather than empty space.

Final EK Profile page `1762:3`:

- visible native text: `25`
- text collisions: `0`
- 18px text safe-area risks: `0`
- visible image roles: `4` total (`3` raster/texture roles plus `2` replaceable support photos and Profile hero as counted by actual fills)
- all visible image roles intrinsic-safe
- repeated skyline use across preferred set: `6 → 5`

DN `1675:2` remains hidden rollback.

## Experiment 3 — Story/Chronology DO → EL

### Visible problem

DO repeated the identical Yokohama waterfront image twice in the same spread: once as the large Story hero on the left and again as Event 01 on the chronology page. Same-spread duplication was more visually distracting than cross-spread reuse.

### Bounded test

Rollback-safe EL `1763:2` preserved the left Story hero, hid only `PHOTO / EVENT_1_REPLACEABLE_EDITORIAL`, and converted Event 01 into a native typographic milestone on the cream field:

- large magenta `01`
- native date placeholder
- large native `出会い`
- native supporting copy

No new card, raster or generated asset was added. Initial absolute-bounds QA found a 6px ordinal/date overlap; the date was moved down before adoption.

### Result

Adopted. Event 01 reads as a major magazine milestone while the surrounding Event 03/05 photos retain the photo cascade. The identical waterfront image is no longer repeated within the spread.

Final EL timeline page `1763:28`:

- native text: `31`
- text collisions: `0`
- 18px text safe-area risks: `0`
- visible image roles: `4`
- intrinsic violations: `0`
- same-spread waterfront duplication: removed
- preferred-set waterfront use: `6 → 5`

DO `1679:2` remains hidden rollback.

## Final preferred-set audit

Current live preferred:

- Outer EE `1730:2`
- Profile/Q&A EK `1762:2`
- Story/Chronology EL `1763:2`
- Memory Spots EJ `1759:2`
- Cafe/Table EF `1734:2`
- 1DAY Plan EI `1752:2`

Start Here:

`V5 FU/FX · V6 EE + EK/EL + EJ MEMORY SPOTS + EF CAFE & TABLE + EI 1DAY PLAN · V7 HOLD`

Cross-spread raster audit after promotion:

- visible image roles: `34`
- intrinsic-size violations: `0`
- reader-visible production/proof terminology matches: `0`
- dining photo uses: `6`
- Yokohama skyline uses: `5`
- waterfront uses: `5`
- cafe photo uses: `5`
- flatlay uses: `4`
- street uses: `3`

The remaining repeated photos were not replaced with semantically wrong imagery. Final legitimate distinct destination photography remains a separate quality gate.

## Asset lifecycle truth

- newly generated assets: `0`
- adopted generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`
- existing composed decoration reused: `YES`
- native variable text preserved: `YES`
- remaining photos replaceable: `YES`
- rollback states preserved: `YES`
- V7 touched: `NO`

## Completion gate

These are verified dummy-design improvements, not print-ready completion. Final legitimate photography/copy, final page count/imposition, printer/product template, bleed/trim/safe areas, exported PDF preflight and physical proof remain required.
