# V5 outer clean-room L — photo-led back cover + stronger Japanese cover type

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authority refresh and boundaries

Before visual writes, the project root authority, Rurubu Current Status, recent cover-hero transport evidence, live Figma state, Google Drive cover derivative, and current GitHub main were re-read. The live production Current remained:

- outer `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- inside `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was edited.

## Cover-hero transport truth

The verified Q60 source was fetched from Drive again as real binary:

- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- JPEG
- `1330 × 1220`
- `155,439 bytes`
- recorded SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

Figma `upload_assets` issued a valid single-use replacement endpoint for clean-room K hero `641:130`, but the runtime again could not resolve `mcp.figma.com`. The POST was not completed and the node did not change. The already-rejected manual/model-visible base64 chunk method was not repeated.

A fresh live-Figma page-wide image inventory found 32 unique IMAGE hashes and no hidden high-resolution cover candidate. Current `77:148` remains hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` with intrinsic `640 × 587`; the strongest large in-file image remains the history derivative `1356 × 560`, which is not a valid cover source.

Result: `Q60_SOURCE_VERIFIED / REAL_BINARY_AVAILABLE / FIGMA_PLACEMENT_STILL_BLOCKED / NO_FALSE_PROMOTION`.

## Visible problem

Clean-room K already had substantially stronger Japanese travel-magazine cover hierarchy than legacy Current, but its back cover still behaved like a conventional sectioned brochure: title above a photo, photo as one module, then friends and timeline. The front cover also remained overly monochrome in the main destination headline and its lower feature navigation was visually timid relative to the hero.

The design question was not “can K be polished?” but “would this outer be selected from scratch?” The answer remained no while the back page failed to use its strongest photograph as the dominant editorial field and the front destination title lacked the color/scale tension visible in real Japanese travel-information-magazine grammar.

## Principle / capability tested

1. Let one verified photograph become the page field rather than keeping it inside a module.
2. Put native Japanese type directly on photography when contrast can be controlled without a rounded card.
3. Use materially different text scale and selective range color rather than adding new badges/cards.
4. Preserve asymmetry through unequal photo sizes and small rotations, while keeping a stable lower-page grid.

Expected improvement:
- stronger thumbnail silhouette
- less brochure/card-module feel
- more authentic photo-led editorial rhythm
- better destination recognition from the front cover

Regression risks:
- white title losing legibility over photo
- decorative outline becoming too loud
- Friends title colliding with photo tabs
- enlarged front feature labels touching the hero strip
- footer text leaving its dark bar

## Clean-room L implementation

Created rollback-safe duplicate:

- `644:2 / V5_OUTER_RURUBU_CLEANROOM_L_PHOTOLED_BACK_2026_08_10`

Current outer and Current inside were not overwritten.

### Back cover

- dominant main photo `644:8` expanded to `730 × 470`, x/y `24 / 42`, with a small `-0.8°` editorial rotation
- main title `644:6` moved directly over the photograph, enlarged to `40 px`, white, with a narrow dark outline/shadow for photographic contrast
- subtitle `644:7` moved onto the photograph as a small editorial line
- `MEMORY 01`, heading, and body were moved to the lower-right photo region rather than kept as a detached block
- Friends photos became deliberately unequal: `344 × 226` at `-1.2°` and `294 × 190` at `+1.4°`
- redundant `MAIN_TEXT_STICKER_TXT` was hidden rather than adding another layer
- history/timeline remained direct native text and rules on the paper field

A first screenshot exposed the title behind the enlarged photo due to layer order. The text stack was explicitly moved above the photograph; the failed visual state was not adopted.

Programmatic QA then detected one small Friends-title/photo-tab overlap. `BACK_VISUAL_FRIENDS_TITLE` was moved from y `535` to `527`, and the overlap was removed.

### Front cover

The existing Japanese-first clean-room composition was retained, but destination recognition was strengthened without creating a new badge system:

- native headline node `644:139 / CE_MAIN` keeps `横浜\nふたり旅。`
- character range `横浜` changed to strong magenta while `ふたり旅。` remains dark navy
- three feature numbers enlarged from `22` to `28 px`
- three feature headings enlarged from `17` to `18 px`

The first actual-size screenshot revealed that the stronger feature labels sat too close to the hero’s color strip and that the footer text had been moved off its dark bar, causing a contrast regression. The feature groups were moved down and the footer text restored to y `1038` on the navy bar. A second actual-size screenshot confirmed the repair.

## Three-scale visual evidence

### Whole-item / thumbnail

Fresh whole-outer screenshot of `644:2` shows:

- a substantially stronger back-page silhouette because the flat-lay photograph now owns the top half
- direct Japanese title over the image instead of a heading-plus-card stack
- a more coherent photo-led spread across back and front
- front-cover destination name now reads immediately in magenta/navy at thumbnail scale

### Reading / page

Fresh back-page screenshot `644:3` confirms:

- title, subtitle, MEMORY block, Friends section, and timeline remain readable
- unequal Friends photographs read as an editorial pair rather than equal cards
- the photo overlays remain native text and do not flatten the design

Fresh front-page screenshot `644:129` confirms:

- `横浜` now anchors destination recognition
- `ふたり旅。` remains the larger secondary line
- feature 01/02/03 hierarchy is stronger but no longer touches the hero strip after repair
- footer text is again legible on its navy bar

### Actual-size / structure

Final live structure QA for `644:2`:

- visible native text: `39`
- visible IMAGE fills: `9`
- text overlaps: `0`
- fold guide `644:158`: visible, `2 × 1122.5`
- Current outer still `77:18`
- Current inside still `77:290`
- Current cover hero still hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

Verified L image hashes remained provenance-preserving:

- `644:8` back main → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- `644:23` Friends cafe → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- `644:27` Friends dining → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- logo `644:135` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `644:136` → `0cbbf09357938365c2550f08928be1db33fa6060`

Temporary comparator hero `644:130` remains hash `539c259be8036b481d06b4f76db9a39b407d90e8`; it is the history derivative and is explicitly **not** counted as a valid cover hero.

## Adoption state

- Q60 generated/master: already existing; no new image was generated in this run
- Q60 Drive source: **verified / fetched as real binary**
- Q60 Figma placement: **not completed**
- clean-room L: **created / placed as duplicate / visually verified at whole, page, and actual-size scales**
- L Current promotion: **not adopted** because the final cover hero is still invalid
- Current outer: unchanged
- Current inside: unchanged
- V5 gate: remains `PHOTO_ROLE_PASS 9/10`, `ROLE_COMPLETE 9/10`, dominant `2/3`
- V6 production: remains closed

## Learning result

**Tested lesson:** When a back-cover story already has one strong verified photograph, promoting that image into a page-level field and layering native headline/caption type over it can create more authentic Japanese travel-magazine rhythm than adding or polishing containers. On the front cover, selective range color in a large native Japanese destination headline can increase shelf/thumbnail recognition without requiring another sticker or color card.

**Failure converted into process knowledge:** actual-size QA caught two regressions that a simple “no text overlap” check did not: feature labels touching a strong image boundary and footer text losing contrast after leaving its dark bar. Programmatic overlap = 0 is necessary but not sufficient; visual boundary/contrast review must follow it.

Status: `TESTED / STRONGEST_OUTER_COMPARATOR_SO_FAR / CURRENT_UNCHANGED / HERO_GATE_OPEN`.

## Next application

1. Keep L preserved as the strongest outer comparator.
2. Do not repeat the blocked external POST or rejected manual-base64 methods under the same runtime capability.
3. When a genuinely binary-safe file-reference/raw-byte bridge becomes available, place the verified Q60 cover derivative into L hero first.
4. Re-run whole, front-page, actual-size crop/sharpness, fold/safe-area, native-text, hash, and provenance QA.
5. Promote outer Current only if L with the real Q60 hero beats legacy Current and preserved comparators at all three scales.
6. Only after dominant-photo pass reaches `3/3`, perform final weakest-three and V5 gate review before opening V6 production.