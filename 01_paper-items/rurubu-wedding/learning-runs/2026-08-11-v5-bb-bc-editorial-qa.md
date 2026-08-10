# 2026-08-11 — V5 BB/BC editorial QA

## Scope
Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

## Authorities re-read before writes
- Drive `00_Figma本番前_Current Authority・制作ルール`
- `docs/wedding-asset-generation-memory.md`
- `01_paper-items/rurubu-wedding/FOUNDATION.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- prior AZ/BA run `learning-runs/2026-08-11-v5-az-ba-editorial-and-q60-bridge.md`
- live Figma Current outer `77:18`, Current inside `77:290`, AZ `744:2`, BA `747:2`
- GitHub main immediately before this evidence write: `c0b18104a172ca42503e5d22a117d7bf9200f02e`

## Q60 fresh Drive readback
Fresh Drive readback reconfirmed:
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- bytes: `155,439`
- registered geometry: `1330 × 1220`
- file was materialized in the runtime and visually inspected again

Visual role observation: the Q60 source has generous sky/water negative space on the left and the Yokohama skyline concentrated center-right, so AZ/BB's deep cover-photo geometry remains compositionally plausible for eventual quality-preserving placement.

Q60 lifecycle state remains `DRIVE_VERIFIED_AND_MATERIALIZED / FIGMA_NOT_PLACED / NOT_VISUALLY_VERIFIED_IN_FIGMA`. No failed external-upload method was repeated merely to advance the count.

## Experiment BB — back-cover photo collage + travel-log rhythm

### Visible problem
AZ's front cover was the stronger comparator, but the back cover still looked like one large photo followed by a tidy two-card photo row and a very small timeline. At whole-spread scale the back read calmer and more UI-modular than the front.

### Principle/capability tested
Keep the verified photos and facts, but rebuild the back-cover hierarchy through larger overlap, unequal image scale, direct type, and a route-like chronology. Subtract UI containment rather than adding cards.

### Expected improvement
- larger Friends photography becomes an editorial collage instead of a two-column card row
- the seam between dominant photo and lower content feels more magazine-like
- the chronology reads as a travel log rather than tiny metadata
- front/back energy becomes more coherent without touching the stronger AZ front

### Regression risk
- overlapping Friends photos could crowd captions
- adding another route line could duplicate the existing zig-zag route graphic
- a travel-log label could collide with the route line

### Implementation
Rollback-safe duplicate from AZ:
- `750:173 / V5_OUTER_RURUBU_CLEANROOM_BB_BACK_COLLAGE_TRAVEL_LOG_2026_08_11`
- back `750:174 / BACK_COVER_BB_PHOTO_COLLAGE_TRAVEL_LOG`

Key changes on the duplicate back only:
- Friends cafe photo expanded to `476 × 292`, rotation `-2.2°`
- Friends dining photo set to `302 × 214`, rotation `3.4°`
- `みんなとの思い出` strengthened to 31 px and anchored with one narrow magenta editorial rule
- captions retained as native text and kept directly under their photos
- `ふたりの旅年表` retained as the bottom editorial anchor
- preserved existing zig-zag route graphic
- added native `TRAVEL LOG / ふたりの旅の記録` micro-label
- no new card, pill, gradient, shadow, or image

The first BB actual-size screenshot exposed a real regression: the preserved zig-zag route and a newly added horizontal route line doubled each other, and the Travel Log label sat on the zig-zag. That state was not accepted. The added horizontal line was hidden and the label moved clear of the preserved route before re-QA.

### Three-scale QA
- whole-item: PASS as comparator; BB back is visibly denser and more photo-led than AZ while the AZ front remains unchanged
- reading/page: PASS on `750:174`; dominant memory photo → Friends collage → travel-year chronology is explicit
- actual-size/detail: PASS after route-line subtraction; captions and chronology remain readable

### Structure evidence
Fresh final audit:
- visible native text: `42`
- visible IMAGE fills: `8`
- same-parent visible text intersections: `0`
- fold guide `750:341`: `2 × 1122.5`
- image hashes preserved:
  - back main `e3738476f760932bb5b09c9d60f174dd6c84049d`
  - Friends cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
  - Friends dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - temporary front hero `539c259be8036b481d06b4f76db9a39b407d90e8`
  - logo `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
  - date badge `0cbbf09357938365c2550f08928be1db33fa6060`
  - coast teaser `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - old-town teaser `439a719d73f28e8dd2889f2026cccb15f345ec63`

### Decision
`BB = ADOPT_AS_STRONGER_OUTER_COMPARATOR_THAN_AZ FOR BACK-COVER EDITORIAL RHYTHM`.

BB is not Current and does not close V5-01 because its front hero remains the temporary comparator image.

## Experiment BC — asymmetric history milestones

### Visible problem
BA's inside spread had a strong photo-led lower right page, but the six history points above the history photo still looked like an evenly spaced app stepper. All milestones had nearly the same visual weight.

### Principle/capability tested
Preserve every factual milestone while removing dot-stepper semantics. Promote the beginning, first trip, and wedding date; keep intermediate events smaller and staggered. Use typography hierarchy instead of another container.

### Expected improvement
- less UI/stepper feel
- clearer editorial emphasis on major story beats
- more breathing room around the dominant history photo
- stronger large/medium/small hierarchy at page scale

### Regression risk
- free positioning can create subtle text intersections that are harder to see than a grid
- over-emphasized dates can crowd adjacent secondary milestones

### Implementation
Rollback-safe duplicate from BA:
- `753:2 / V5_INSIDE_RURUBU_CLEANROOM_BC_ASYMMETRIC_HISTORY_2026_08_11`
- right `753:126 / INSIDE_RIGHT_BC_ASYMMETRIC_HISTORY`

Changes:
- all six timeline dots hidden on BC
- history heading increased to 42 px
- `201x / はじめて出会う`, `202x / 初めてのふたり旅`, and `2026.10.24 / WEDDING DAY` promoted as larger anchors
- intermediate milestones kept smaller and vertically staggered
- one short magenta editorial rule added below the section intro
- history photo slightly deepened to `738 × 336`
- Memory Spots collage and every verified image hash preserved
- no card, pill, gradient, shadow, or new image

Structure QA caught 3 initial timeline intersections. After the first repair, two 1–2 px intersections remained; after another repair a new milestone-04/milestone-06 caption overlap surfaced. Each intermediate state was rejected. Milestone 04 geometry was iteratively shifted and the final audit reached zero intersections.

### Three-scale QA
- whole-item: PASS as comparator; left BA profile/pull-quote page remains intact, while the right history area is visibly less stepper-like
- reading/page: PASS; history title → asymmetric milestones → dominant waterfront photo → Memory Spots remains legible
- actual-size/detail: PASS after collision repair; all six milestones remain readable as native text

### Structure evidence
Fresh final audit:
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent visible text intersections: `0`
- fold guide `753:274`: `2 × 1122.5`
- verified image hashes preserved:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 03/next `c09aa82e7b2ac75708707345c6f845452bf67663`

### Decision
`BC = ADOPT_AS_STRONGER_INSIDE_COMPARATOR_THAN_BA`.

## Asset and gate truth
- generated new image this run: NO
- adopted new generated image: NO
- placed new generated image in Figma: NO
- visually verified new generated image in Figma: NO
- reason: the highest-value safe defects in this run were composition/rhythm using already verified assets; the unresolved image bottleneck remains binary-safe Q60 placement, not lack of a source asset
- Current outer `77:18`: unchanged
- Current inside `77:290`: unchanged
- strongest outer comparator: `BB / 750:173`
- strongest inside comparator: `BC / 753:2`
- active PHOTO_ROLE_PASS remains `9 / 10`
- dominant-photo pass remains `2 / 3`
- V5 complete: NO
- V6 production: NOT STARTED

## Reusable Rurubu lessons
1. A photo module can still feel like a UI grid even after removing rounded cards; unequal crop scale and overlap are often the higher-leverage repair.
2. When a preserved travel-route graphic already performs the connective role, adding a second route line is visual duplication. Subtract before polishing.
3. A chronology does not need six equal markers. Editorial hierarchy can preserve every fact while emphasizing only the story-defining milestones.
4. Asymmetric editorial timelines require automated/structural intersection checks; BC produced several subtle collisions that were not obvious at thumbnail scale.
5. Whole-item, page, detail, and structure checks remain separate gates. A comparator is not adopted from screenshot appearance alone.

Status: `BB_OUTER_BEST / BC_INSIDE_BEST / CURRENT_UNCHANGED / Q60_DRIVE_VERIFIED_NOT_FIGMA_PLACED / V5_GATE_OPEN / V6_NOT_STARTED`
