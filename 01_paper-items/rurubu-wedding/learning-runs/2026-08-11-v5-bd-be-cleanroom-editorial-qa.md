# 2026-08-11 — V5 BD/BE clean-room editorial QA

## Scope
Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

## Authorities re-read before writes
- GitHub `main` at `8e0e730c91e8233c7620bf32d382cc7f4d11ce23`
- `CLAUDE.md`
- `README.md`
- Drive `00_Figma本番前_Current Authority・制作ルール`
- `docs/wedding-asset-generation-memory.md`
- `01_paper-items/rurubu-wedding/FOUNDATION.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`
- prior run `learning-runs/2026-08-11-v5-bb-bc-editorial-qa.md`
- live Figma Current outer `77:18`, Current inside `77:290`, BB `750:173`, BC `753:2`

## Clean-room selection check
BB/BC were re-evaluated as though selecting from scratch. Both were materially better than the legacy Current, but BB still read as a large photo followed by a tidy feature index and BC still read as a sparse chronology above a photo. Neither was treated as sacred. Separate rollback-safe duplicates were created.

## Q60 fresh Drive readback
Fresh Drive metadata and raw-file readback reconfirmed:
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- bytes: `155,439`
- runtime materialization succeeded

A fresh `Figma.upload_assets` single-use URL was obtained for the BB hero target, but the execution container could not resolve `mcp.figma.com`. This is the same network-class blocker already known, so no repeated upload attempts were made after the fresh confirmation. Q60 remains `DRIVE_VERIFIED_AND_MATERIALIZED / FIGMA_NOT_PLACED / NOT_VISUALLY_VERIFIED_IN_FIGMA`.

## Experiment BD — asymmetric cover feature blocks

### Visible problem
BB front still behaved like a hero image plus a tidy three-feature navigation area. The three stories were more editorial than the old card grid, but at thumbnail scale the bottom still read as a controlled index rather than a real travel-magazine cover with unequal story weight.

### Principle/capability tested
Preserve the existing verified photos and native text, but make feature 01 the dominant article and let 02/03 become smaller paper callouts that intrude into the photographic field. Use unequal scale, overlap, and a single print rule instead of repeated rails/cards.

### Expected improvement
- stronger thumbnail silhouette
- clearer major/minor story hierarchy
- less three-column navigation behavior
- teaser photography and feature copy feel like one editorial composition

### Regression risk
- Japanese copy could clip inside the smaller 02/03 callouts
- teaser images could cover callout text because of z-order
- number/title overlap could be hidden at thumbnail scale
- decorative edge rails could reintroduce UI framing

### Implementation
Rollback-safe duplicate from BB:
- `756:2 / V5_OUTER_RURUBU_CLEANROOM_BD_ASYMMETRIC_COVER_BLOCKS_2026_08_11`
- front `756:131 / FRONT_COVER_BD_ASYMMETRIC_PHOTO_BLOCKS`

Key changes:
- temporary hero deepened to `774 × 900`
- cream feature field reduced to a left-dominant editorial floor rather than a full-width footer panel
- feature 01 promoted to a large `01` plus large native Japanese title
- feature 02 moved to a flat light-blue paper block on the right
- feature 03 moved to a smaller pale-yellow paper block below it
- one 10 px magenta top rule added
- old repeated feature rules hidden
- a trial cyan page-edge rail was created, then hidden after screenshot QA showed it read like interface chrome
- no new image, gradient, shadow, pill, rounded card, or baked text

### Screenshot-driven repairs
1. First actual-size pass showed feature 02 Japanese clipping. The wording was preserved but line-broken natively to `出会いから / 今日まで旅年表` and type size reduced slightly.
2. Structure QA then detected three real number/title intersections. Titles and descriptions were shifted right; no overlap remained.
3. A later actual-size screenshot exposed a z-order regression: the overlapping teaser collage visually covered feature 02 text. Fresh child-order inspection confirmed the teaser photos were above the feature blocks. The 02/03 paper blocks and native copy were reordered above the teaser collage and re-screenshotted.

### Three-scale QA
- thumbnail (`500 px` whole spread): PASS as comparator; feature 01 remains visibly dominant and 02/03 read as smaller editorial callouts rather than equal navigation cards
- reading/whole-item (`1588 × 1123`): PASS as comparator; front and back keep different but coherent editorial density
- actual-size front (`794 × 1123`): PASS after clipping, intersection, and z-order repairs

### Final structure evidence
- visible native text: `42`
- visible IMAGE fills: `8`
- same-parent visible text intersections: `0`
- provisional fold guide `756:172`: `2 × 1122.5`
- image hashes preserved:
  - back main `e3738476f760932bb5b09c9d60f174dd6c84049d`
  - Friends cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
  - Friends dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - temporary hero `539c259be8036b481d06b4f76db9a39b407d90e8`
  - logo `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
  - date badge `0cbbf09357938365c2550f08928be1db33fa6060`
  - coast teaser `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - old-town teaser `439a719d73f28e8dd2889f2026cccb15f345ec63`

### Decision
`BD = ADOPT_AS_STRONGER_OUTER_COMPARATOR_THAN_BB`.

BD is not Current and does not close V5-01. Its hero is still the temporary comparator source, not the Q60 Drive derivative.

## Experiment BE — full-bleed history + memory editorial strip

### Visible problem
BC right page reduced stepper semantics but still gave a large amount of pale-blue air to six chronology labels before the history photo. At whole-spread and thumbnail scale the page still felt like a clean information layout followed by photography rather than photography driving the page.

### Principle/capability tested
Push the history image to full page width, let the photo/caption directly bridge into the Memory Spots heading, and use one paper-like editorial strip as an anchor. Increase photo ownership before adding any decorative module.

### Expected improvement
- dominant history photo reads earlier and larger
- less app-stepper whitespace
- stronger transition from history to memory stories
- tighter magazine rhythm while preserving every chronology fact

### Regression risk
- full-width image could crowd chronology
- overlap strip could feel like another card if too large
- support photos could collide with captions/body copy
- lower support module could breach the footer/print edge

### Implementation
Rollback-safe duplicate from BC:
- `758:2 / V5_INSIDE_RURUBU_CLEANROOM_BE_FULLBLEED_HISTORY_MEMORY_STRIP_2026_08_11`
- right `758:126 / INSIDE_RIGHT_BE_FULLBLEED_HISTORY_MEMORY_STRIP`

Key changes:
- history photo `758:149` expanded to page width: `793.7 × 398`, x `0`, y `204`
- history caption kept native and attached to the lower photo edge
- `思い出スポット` moved onto a flat cream editorial strip overlapping the history-to-memory seam
- heading promoted to 38 px with one magenta rule
- lead Memory photo expanded to `548 × 294`
- support photos retain unequal scale and rotation
- no new image, gradient, shadow, pill, or rounded card

### Screenshot-driven repair
The first actual-size BE screenshot exposed a real collision: the lower support photo overlapped Memory 02 body copy. Fresh geometry inspection confirmed the overlap. The lower support photo and its number/title/body/city were shifted downward together, preserving semantic grouping and clearing the Memory 02 copy before re-QA.

### Three-scale QA
- thumbnail (`500 px` whole spread): PASS as comparator; history photo clearly owns the top-right page and the memory collage remains visible as a second photographic rhythm
- reading/whole-item (`1588 × 1123`): PASS; profile page and history/memory page have intentionally different density without breaking the spread
- actual-size right page (`794 × 1123`): PASS after the support-photo collision repair

### Final structure evidence
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent visible text intersections: `0`
- provisional fold guide `758:275`: `2 × 1122.5`
- verified image hashes preserved:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 03/next `c09aa82e7b2ac75708707345c6f845452bf67663`

### Decision
`BE = ADOPT_AS_STRONGER_INSIDE_COMPARATOR_THAN_BC`.

## Reusable Rurubu lessons
1. Merely making a feature area cream and card-free does not remove navigation semantics. Unequal story scale plus overlap between photo and copy is a stronger magazine cue.
2. If a right-side callout overlaps photography, z-order is part of editorial QA. Geometric non-intersection alone does not prove visible legibility.
3. Japanese line-break QA must be done at actual size. A module can look acceptable at whole-spread scale while a two-line heading clips or reflows badly.
4. Full-width photography can reduce stepper/dashboard feel more effectively than styling the timeline itself. Promote the photo before inventing another chronology container.
5. A flat editorial strip can successfully bridge two sections when it is narrow, edge-aligned, and anchored to photography; it should not become a general card system.
6. Overlapping photo collages require photo-versus-text collision checks in addition to text-versus-text structural intersection checks.

## Asset/gate truth
- generated new image this run: NO
- adopted new generated image: NO
- placed new generated image in Figma: NO
- visually verified new generated image in Figma: NO
- Q60 Drive readback/materialization: YES
- Q60 Figma placement: NO
- Current outer `77:18`: unchanged
- Current inside `77:290`: unchanged
- strongest outer comparator: `BD / 756:2`
- strongest inside comparator: `BE / 758:2`
- active PHOTO_ROLE_PASS remains `9 / 10`
- dominant-photo pass remains `2 / 3`
- V5 complete: NO
- V6 production: NOT STARTED

Status: `BD_OUTER_BEST / BE_INSIDE_BEST / CURRENT_UNCHANGED / Q60_DRIVE_VERIFIED_NOT_FIGMA_PLACED / V5_GATE_OPEN / V6_NOT_STARTED`
