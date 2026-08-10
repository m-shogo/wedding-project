# V5 outer clean-room M — dense print editorial subtraction

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authority refresh and boundaries

Before writes, the live Figma Current, Google Drive cover derivative, `CURRENT-STATUS.md`, Rurubu Production Operating System V2, continuous-improvement/V6 guardrails, project-wide Figma production system, quality-over-legacy decision, and recent clean-room L evidence were re-read.

Production Current remained untouched:
- outer `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- inside `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was edited.

## Cover-hero source / transport truth

The intended Q60 cover derivative was re-read from Drive as a real stored JPEG:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- `1330 × 1220`
- `155,439 bytes`
- recorded SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

This run additionally obtained a connector-materialized binary file reference/local mounted copy, so the source itself is not the blocker. Figma `upload_assets` produced a valid single-use target URL for L hero `644:130`, but raw-byte POST from the execution environment again failed DNS resolution for `mcp.figma.com`. The node did not change. Because this is the same external-network blocker already observed repeatedly, the method was abandoned immediately rather than retried. The already-rejected large model-visible/manual base64 path was not repeated.

Result: `Q60_SOURCE_VERIFIED / REAL_BINARY_MATERIALIZED / EXTERNAL_FIGMA_POST_STILL_BLOCKED / NO_FALSE_PLACEMENT`.

## Visible problem

Clean-room L was already much stronger than legacy Current, but it still retained several web/template residues:
- the front-cover interview line sat inside a dark rectangular card
- one support photograph used a circular crop while the other two were angular, producing a mixed UI/gallery grammar rather than a deliberate magazine collage
- the support-photo cluster was too orderly and detached from the hero
- the back-cover MEMORY copy still relied on a dark text card even though the photograph could carry direct type
- the Friends pair and timeline still had more brochure-like vertical separation than necessary
- the back main title’s earlier outline treatment risked reading like video-thumbnail type rather than print editorial typography

The clean-room question remained: would L be selected from scratch? Not yet. A further subtraction-led alternative was justified.

## Principle / capability tested

1. Remove containment before adding decoration.
2. Let native Japanese type sit directly on photography where contrast can be solved with placement and restrained shadow.
3. Make all support photographs angular and deliberately unequal rather than mixing card/gallery and circular-avatar grammar.
4. Increase controlled overlap and reduce vertical dead zones while preserving an invisible grid.
5. Keep verified image sources/hashes stable so the experiment isolates layout and typography rather than asset substitution.

Expected improvement:
- stronger Japanese travel-magazine thumbnail silhouette
- less landing-page/card feel
- more direct photo/type interaction
- denser but still readable back-cover rhythm
- clearer hierarchy between dominant hero, support collage, feature navigation, and microcopy

Regression risks:
- direct type losing contrast over photographs
- support images becoming chaotic rather than intentionally irregular
- Friends captions colliding after enlargement
- timeline becoming too compressed
- display text becoming too outlined/heavy at actual size

## Clean-room M implementation

Created rollback-safe duplicate:
- `650:2 / V5_OUTER_RURUBU_CLEANROOM_M_DENSE_PRINT_EDITORIAL_2026_08_10`

Children:
- back `650:3 / BACK_COVER_PRESERVED_COMPARATOR`
- front `650:129 / FRONT_COVER_CLEANROOM_I_JP_TRAVEL_MAG`
- fold guide `650:158`

### Back cover

Subtraction and hierarchy:
- hid the existing `BACK_VISUAL_MAIN_TEXT_BG`; MEMORY headline/body now live directly on the dominant photograph
- preserved the dominant back photo, but let text hierarchy carry the story instead of another card
- enlarged/tightened the Friends pair to `370 × 238` and `326 × 208` with small opposing rotations
- reduced Friends caption bars to narrower editorial strips
- compressed the timeline vertically while retaining native years/events and the zig-zag route
- after actual-size review, removed the heavy outline from the main back-cover title, reduced it to `36 px`, and retained only a restrained shadow for photo contrast

Final verified back image hashes:
- `650:6 / BACK_VISUAL_MAIN_MEMORY_PHOTO` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- `650:18 / BACK_VISUAL_FRIEND_2_PHOTO` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- `650:22 / BACK_VISUAL_FRIEND_3_PHOTO` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

### Front cover

Subtraction and collage:
- hid `CE_INTERVIEW_BG`; the interview kicker/main now sit directly on the lower hero image
- preserved native Japanese copy and moved contrast work into yellow/white type plus restrained shadow
- changed all support imagery to angular rectangles; the previous circular support crop was removed
- enlarged/repositioned the three support images into a more overlapped, intentionally irregular right-side cluster:
  - `650:155` → `230 × 154`, `-3.2°`
  - `650:156` → `184 × 142`, `+3.8°`, corner radius `0`
  - `650:157` → `260 × 178`, `-2.4°`
- slightly rotated/repositioned the yellow pickup strip so it behaves as an editorial callout rather than a dashboard badge
- strengthened supporting Japanese hierarchy while preserving the large native `横浜 / ふたり旅。` destination display

The front still uses the history derivative as an explicit temporary comparator hero:
- `650:130 / CF_HERO_VERIFIED_EXISTING_ALT`
- `762 × 662`
- hash `539c259be8036b481d06b4f76db9a39b407d90e8`

This image is **not** counted as the valid V5 cover source.

## Three-scale visual evidence

### Whole-item / thumbnail

Fresh whole-spread comparison shows M materially outperforming legacy Current and improving on L in magazine grammar:
- direct photo/type interaction on both front and back
- no front interview card
- no circular support-photo UI cue
- stronger irregular collage silhouette
- denser Friends/timeline rhythm without adding modules

### Reading / page

Fresh front-page screenshot `650:129` confirms:
- destination headline remains the primary read
- support photographs behave as a single asymmetric editorial cluster
- direct-on-photo interview copy remains readable
- 01/02/03 navigation remains distinct below the hero

Fresh back-page screenshot `650:3` confirms:
- dominant photograph owns the upper page
- title and MEMORY story remain readable without a dark story card
- Friends pair is denser but still distinguishable
- timeline remains readable and visually separate from the Friends section

### Actual-size / structure

Final live structure QA for `650:2`:
- visible native text: `39`
- visible IMAGE fills: `9`
- same-parent text overlaps: `0`
- fold guide `650:158`: visible, `2 × 1122.5`
- back title `650:124`: `36 px`, `600 × 90`, `0` strokes, restrained shadow only
- Current outer remains `77:18`
- Current inside remains `77:290`

Other verified image hashes are unchanged:
- logo `650:135` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `650:136` → `0cbbf09357938365c2550f08928be1db33fa6060`
- support photos reuse the verified back/Friends sources only for layout comparison

## Adoption state

- new image generation: **none**
- Q60 Drive source: **verified and materialized as real binary**
- Q60 Figma placement: **not completed**
- clean-room M: **created / placed as duplicate / visually verified at whole, front-page, back-page and actual-size scales**
- structure QA: **verified for the comparator**
- Current promotion: **not adopted** because the final cover hero source is still invalid in M
- Current outer: unchanged
- Current inside: unchanged
- V5 gate: remains `PHOTO_ROLE_PASS 9/10`, `ROLE_COMPLETE 9/10`, dominant `2/3`
- V6 production: remains closed

## Learning result

**Visible problem:** containers and mixed photo geometry were still weakening an otherwise strong clean-room cover.

**Principle tested:** when photography is already dominant, remove nonessential card containment and make collage geometry consistently editorial before adding decoration.

**Expected improvement:** stronger print-magazine rhythm and less UI/template feel.

**Regression risk:** direct-on-photo contrast and excessive irregularity.

**Evidence:** fresh whole, front, back, actual-size screenshots plus final overlap/image/fold structure readback.

**Status:** `TESTED / ADOPTED_AS_STRONGEST_OUTER_COMPARATOR / CURRENT_NOT_PROMOTED`.

**Next application:** preserve M as the first target for the verified Q60 cover hero when a genuinely binary-safe Figma bridge is available. After real Q60 placement, re-run whole/front/actual-size crop and sharpness QA, exact node/hash/provenance verification, fold/safe-area review, then promote outer Current only if the real-hero M still wins against legacy Current and preserved comparators.
