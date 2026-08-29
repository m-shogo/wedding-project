# WEDDING PASSPORT — V4 Clean-room Harbor Atlas

State: `V4_CLEANROOM_CREATED / VISUAL_QA_IN_PROGRESS / STRUCTURE_QA_PASS / DRIVE_MASTER_SAVE_BLOCKED / NOT_PROMOTED / NOT_PRINT_READY`

Start main SHA: `944d7c08be018bcc384b85c5295c7b9f5068fbd2`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- image-generation-centered rule: `docs/design-learning/IMAGE-GENERATION-CENTERED-VISUAL-DESIGN-POLICY.md`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- V4 page: `212:2 / V4_CLEANROOM_2026_08_27`

## Clean-room facts used

V4 was authored from a new blank Figma page. No old production/V2/V3 layout, ornament, crop, generated asset, card system, rail, badge, or background was copied as construction input.

Inherited facts/constraints only:

- production frame size `1480×2100`;
- confirmed event date `2026.10.24`;
- confirmed location `YOKOHAMA`;
- wedding-keepsake / passport artifact role;
- native editable couple-name role;
- menu, drink, seating, back-message semantic roles;
- seating QA maximum `7 guests / table`, 11 tables;
- no fake passport / immigration / airline credential data;
- no real-person / guest / child / dog AI generation.

## V4 art direction

Direction: `HARBOR ATLAS`.

The V4 does not use generic airplane/stamp/passport cosplay. Its fixed art treats the booklet as a tactile travel record through an abstract harbor-chart vocabulary: warm paper, mineral-water field, oxblood registration gesture, chart grid, contour rings, and small registration ticks. Variable copy remains separate native text.

Four production frames were created:

1. `212:3 / V4 / 01 COVER / HARBOR ATLAS`
2. `212:13 / V4 / 02 MENU + DRINK / TIDE LEDGER`
3. `212:58 / V4 / 03 SEATING / OPEN LEDGER`
4. `212:99 / V4 / 04 BACK / RETURN NOTE`

## Authoring split

- native editable text: all reader-facing/factual/placeholder copy;
- generated/composed fixed art: editable SVG node trees on cover/back;
- cover composed art: `212:109`;
- back composed art: `212:160`;
- raster IMAGE fills: `0`;
- variable copy baked into art: `0`;
- replaceable real-photo roles: `0` in this V4 direction.

## FINAL MISSING ASSET LIST

Initial missing fixed-art role:

- item/page: Wedding Passport V4 cover + back;
- role: `FIXED_ART / HARBOR_ATLAS`;
- content/job: non-factual harbor-chart atmosphere supporting the travel-record artifact role;
- final placement: full-page `148×210 mm` equivalent;
- Figma display: `1480×2100 px`;
- aspect ratio: `148:210`;
- transparency: no;
- background: warm paper integrated;
- focal position: contour/chart field biased upper-right;
- text-safe zone: primary native title/message lane upper-left;
- z-order: bottom, below all native text;
- raster requirement if raster were used: `>=300 ppi`;
- 300 ppi minimum source: approximately `1748×2480 px`;
- generated comparison sources: `2400×3400 px`, therefore adequate if later raster adoption is required;
- crop/bleed: full-page artwork, no factual detail near trim;
- avoid: fake lettering, fake UI, planes, passport stamps, immigration marks, plastic/diffusion sheen, literal fake maps;
- Drive substitute: exact `20_制作素材/02_背景・パターン` was inspected and returned no V4-specific available asset, so a new clean-room fixed-art role was justified.

The missing visual role is now satisfied in Figma by editable composed SVG; there is no unresolved production-image requirement for the current V4 visual structure.

## Candidate generation / selection

Three materially different non-text fixed-art candidates were composed at `2400×3400`:

- A `HARBOR ATLAS` — selected;
- B `TIDE LAYERS` — rejected as too close to generic landscape abstraction;
- C `ARCHIVE FOLD` — rejected as too art-poster-like and less specifically legible as a travel record.

Direct raster transport into Figma failed because the execution environment could not resolve the temporary Figma upload host. Per failure-method-switch rule, the selected A direction was rebuilt as an editable composed SVG instead of repeatedly retrying raster upload.

Drive master save is still blocked in this run because the generated local asset cannot be converted by the available connector into the required Drive `file_uri` object. This does not authorize claiming a Drive master.

## Visual QA

### Whole / reading

Fresh screenshots were reviewed for all four V4 frames.

- COVER: PASS as V4 study; strong first-read Japanese title, clear date/location, fixed art does not fake travel credentials.
- MENU + DRINK: PASS as V4 study; food has dominant reading lane, drink is subordinate, no card/dashboard grammar.
- SEATING: first two-column attempt failed because table labels/guest text compressed and overlapped.
- SEATING method switch: promoted locally to a three-column staggered ledger with larger guest type and no containment cards.
- BACK: PASS as V4 study; return message remains native and fixed art stays subordinate.

### Actual-size / native `1480×2100`

Fresh native-size screenshots were checked for MENU and SEATING after repair.

- MENU: readable hierarchy and Japanese copy at native size; no visible overflow.
- SEATING: 11 tables visible, 7 guests/table retained, long-name stress visible at TABLE 11, no visible overlap/outside text after three-column redesign.

## Structure QA

After creation, structure readback detected an implementation issue: text nodes had become fixed-height because `resize()` had been applied after setting auto-height. This was repaired by loading each node's actual fonts and normalizing every V4 native text node to `textAutoResize=HEIGHT`.

Final readback:

- cover `212:3`: native text 6 / fixed-height 0 / outside visible text 0;
- menu `212:13`: native text 35 / fixed-height 0 / outside visible text 0;
- seating `212:58`: native text 26 / fixed-height 0 / outside visible text 0;
- back `212:99`: native text 6 / fixed-height 0 / outside visible text 0;
- raster IMAGE fills: 0;
- composed fixed SVG art: cover/back only.

## Learning

`VERIFIED_LOCAL`:

- `FIT_SEATING_BY_SHRINKING_TYPE` is rejected. If 11×7 seating forces text below practical actual-size readability, change column/composition architecture before reducing guest type.
- Figma clean-room text creation must set/restore `textAutoResize=HEIGHT` after width-resize operations and verify with structure readback.
- when temporary raster transport is unavailable, one bounded method switch to editable composed SVG is preferable to repeated upload retries, provided the visual role is non-photographic and fixed.

## Promotion / deferred

V4 is **not promoted** yet. It must mature further and then be compared against retained Current only after V4 QA is complete.

Deferred:

- Drive master persistence for adopted fixed art;
- final couple names / final menu / final drink / final seating names / final back copy;
- exact printer template/profile/stock/finishing/binding behavior;
- physical proof.

Next task: continue V4 visual refinement from the new page only, run fresh cover/back native-size QA and long-copy stress, persist fixed art to Drive when connector transport allows, then compare mature V4 against retained Current. Do not use old Current as construction input.
