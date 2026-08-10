# 2026-08-11 — V5 BF/BG clean-room editorial QA

## Scope
Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

## Authorities re-read before writes
- GitHub `main` at `c2c2ffc3abb2fd7e73f62e3f92bec03cfd72b8dd`
- `CLAUDE.md`
- `README.md`
- Drive `00_Figma本番前_Current Authority・制作ルール`
- `docs/wedding-asset-generation-memory.md`
- `01_paper-items/rurubu-wedding/FOUNDATION.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md`
- prior run `learning-runs/2026-08-11-v5-bd-be-cleanroom-editorial-qa.md`
- live Figma Current outer `77:18`, Current inside `77:290`, BD `756:2`, BE `758:2`

## Clean-room selection check
BD/BE were re-evaluated as if selecting from scratch. BD was materially stronger than legacy Current but still read as a large cover photo followed by a tidy feature index. BE's right page was strong, while its left page still read partly as a profile form with evenly distributed Q&A. Neither was treated as sacred. Separate rollback-safe duplicate frames were created.

## Experiment BF — full-photo cover + asymmetric feature column

### Visible problem
BD still split the front cover into a hero region and a relatively controlled lower index. At thumbnail scale the feature navigation was clearer than before but remained more orderly than a high-energy Japanese travel-information magazine cover.

### Principle/capability tested
Start with subtraction, extend the dominant photo almost through the full page, then rebuild secondary hierarchy with one warm paper field, unequal 01/02/03 scale, overlapping travel photos, and only purposeful magenta/cyan/yellow print accents. Avoid equal cards, dashboard rows, rounded containers, gradients, and decorative filler.

### Expected improvement
- stronger newsstand/thumbnail silhouette
- dominant destination photography before secondary navigation
- clearer 01 > 02 > 03 story hierarchy
- photo/copy overlap reads as one editorial composition instead of hero + footer

### Regression risk
- paper field could cover native feature text due z-order
- 02/03 could become cramped on photography
- Japanese line breaks could clip at actual size
- secondary photography could cover copy

### Implementation
Rollback-safe duplicate from BD:
- `761:2 / V5_OUTER_RURUBU_CLEANROOM_BF_FULLPHOTO_ASYMMETRIC_COLUMN_2026_08_11`
- front `761:131 / FRONT_COVER_BF_FULLPHOTO_ASYMMETRIC_COLUMN`

Key changes:
- temporary comparator hero expanded to `774 × 1102`
- old navy feature field and BD 02/03 paper blocks hidden
- created one asymmetric warm paper field instead of a full-width bottom panel
- main title `横浜 / ふたり旅。` promoted to 96 px with tighter 90 px leading
- feature 01 remains dominant on the warm paper field
- feature 02 moved to the lower-left with one cyan print rule
- feature 03 moved to a compact yellow print callout at lower-right
- coast/old-town teaser photos enlarged, rotated and layered across the photo/paper seam
- old footer container/microtype hidden in the front candidate
- no new rounded card, pill, gradient, shadow, or generated image

### Screenshot-driven repairs
1. First whole-item screenshot exposed a real z-order failure: the new warm paper field covered the feature-01 text. The paper field was moved behind editorial copy and feature text was re-ordered forward.
2. First actual-size front screenshot showed 02/03 cramped over photography. Feature 02 was moved fully into the cream field with a cyan rule; feature 03 became a deliberate yellow print callout instead of stacked copy directly on the image.
3. Re-screenshot at actual size confirmed the three-story hierarchy remained legible and the overlapping travel photos no longer obscured the copy.

### Three-scale QA
- thumbnail (`500 px` whole spread): PASS as comparator; the front reads photo-first with a strong 01 and visibly subordinate 02/03
- reading/whole-item (`1587 × 1123` natural spread): PASS as comparator; back remains coherent and front has more asymmetric cover energy than BD
- actual-size front (`794 × 1123`): PASS after z-order and 02/03 repairs

### Final structure evidence
- visible native text: `39`
- visible IMAGE-fill nodes: `8`
- same-parent visible text intersections: `0`
- provisional fold guide `761:176`: `2 × 1122.5`
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
`BF = ADOPT_AS_STRONGER_OUTER_COMPARATOR_THAN_BD`.

BF is not Current and does not close V5-01. Its full-page image remains the temporary comparator hash, not the verified Q60 Drive derivative.

## Experiment BG — profile story collage + asymmetric Q&A

### Visible problem
BE right page had become strongly photo-led, but the left page still used a profile-plus-even-Q&A structure that could be read as a clean form. The two profile photos were not yet exploiting the asymmetric collage potential of the page.

### Principle/capability tested
Promote the two verified identity-safe photos into a larger overlapping collage, then break the Q&A into a dominant Q1 on the left and stacked Q2/Q3 on the right. Use short magenta/cyan/yellow rules as editorial anchors rather than containers. Preserve all facts and native text.

### Expected improvement
- stronger photo ownership in the top half
- less form/grid behavior in Q&A
- clearer question hierarchy at thumbnail and page scale
- better continuity from profiles to shared-interest pull quote and Travel Note

### Regression risk
- overlapping profile photos could crowd names/metadata
- duplicated shared-interest copy could appear during restructuring
- name/metadata boxes could intersect even if visually subtle
- Q&A columns could become too narrow for Japanese text

### Implementation
Rollback-safe duplicate from BE:
- `763:2 / V5_INSIDE_RURUBU_CLEANROOM_BG_PROFILE_STORY_COLLAGE_2026_08_11`
- left `763:3 / INSIDE_LEFT_BG_PROFILE_STORY_COLLAGE`
- right inherited `763:126 / INSIDE_RIGHT_BE_FULLBLEED_HISTORY_MEMORY_STRIP`

Key changes:
- profile A expanded to `420 × 398`, rotated slightly counter-clockwise
- profile B expanded to `330 × 330`, rotated slightly clockwise and overlapped over profile A
- profile color rules follow the photo edges rather than forming cards
- Q1 occupies the larger left column
- Q2/Q3 stack on the right with cyan/yellow rules
- existing shared-interest copy promoted to a 24 px native pull quote
- Travel Note remains direct native type over a thin rule
- no new generated image, rounded panel, pill, gradient, or shadow

### Screenshot-driven repairs
1. Actual-size screenshot exposed duplicate rendering of `旅 × 写真 × HAWAII　好きが重なるところ。` because a newly created pull quote duplicated an existing native semantic node. The new duplicate was deleted; the existing native text was promoted instead.
2. Fresh structure QA then found one real intersection between `SHOGO` and its metadata. Metadata/detail were shifted down and the QA was re-run.
3. Final structure QA returned zero same-parent text intersections.

### Three-scale QA
- thumbnail (`500 px` whole spread): PASS as comparator; larger profile collage remains visible and Q&A hierarchy no longer reads as three equal form fields
- reading/whole-item: PASS as comparator; left and right pages retain intentionally different density while sharing the same print-native accent language
- actual-size left (`794 × 1123`): PASS after duplicate-copy and metadata-intersection repairs

### Final structure evidence
- visible native text: `53`
- visible IMAGE-fill nodes: `6`
- same-parent visible text intersections: `0`
- provisional fold guide `763:276`: `2 × 1122.5`
- verified image hashes preserved:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 03/next `c09aa82e7b2ac75708707345c6f845452bf67663`

### Decision
`BG = ADOPT_AS_STRONGER_INSIDE_COMPARATOR_THAN_BE`.

## Q60 fresh Drive/readback and placement truth
Fresh Drive search + raw-file fetch reconfirmed:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- runtime materialization succeeded

A fresh `Figma.upload_assets` single-use URL was requested against BF hero node `761:132` with `FILL`. One raw-byte POST attempt from the execution container failed before upload because `mcp.figma.com` could not be resolved. This matches the known DNS-class blocker; the same method was not retried.

Truth state:
- Q60 selected: YES
- Q60 Drive verified: YES
- Q60 runtime materialized: YES
- Q60 Figma placed: NO
- Q60 visually verified in Figma: NO
- generated new image this run: NO
- adopted new generated image this run: NO

## Reusable Rurubu lessons
1. A cover can remain too index-like even after cards are removed. Extending the dominant photograph and allowing one asymmetric paper field to interrupt it can create a stronger magazine silhouette than styling three equal story boxes.
2. Z-order is part of print-editorial QA. A clean geometry graph does not protect text when a paper field or teaser image is later reordered above it.
3. If secondary stories become cramped on photography, move the weaker story into a deliberate print callout rather than shrinking Japanese type until it merely fits.
4. A profile page becomes less form-like when the portraits establish the page first and the questions use unequal columns/stacking rather than equal boxes.
5. When promoting an existing sentence into a pull quote, inspect semantic duplicates before creating new text. Reuse the native authority node when possible.
6. Programmatic text intersection QA remains necessary after visually plausible collage changes; BG exposed a name/metadata intersection not obvious at thumbnail scale.

## Asset/gate truth
- Current outer `77:18`: unchanged
- Current inside `77:290`: unchanged
- strongest outer comparator: `BF / 761:2`
- strongest inside comparator: `BG / 763:2`
- active PHOTO_ROLE_PASS remains `9 / 10`
- dominant-photo pass remains `2 / 3`
- V5 complete: NO
- V6 production: NOT STARTED

Status: `BF_OUTER_BEST / BG_INSIDE_BEST / CURRENT_UNCHANGED / Q60_DRIVE_VERIFIED_NOT_FIGMA_PLACED / V5_GATE_OPEN / V6_NOT_STARTED`
