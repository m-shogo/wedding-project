# 2026-08-11 — V5 BH/BI clean-room editorial QA

## Scope
Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

## Authorities re-read before writes
- GitHub `main` at `6fee7a0ccf6ee72a5f009d3062912cac5069ec5e`
- `AGENTS.md`
- `README.md`
- `docs/wedding-asset-generation-memory.md`
- prior comparator reconciliation `RURUBU-V5-COMPARATOR-RECONCILIATION-BF-BG-2026-08-11.json`
- prior run `learning-runs/2026-08-11-v5-bf-bg-cleanroom-editorial-qa.md`
- live Figma BF `761:2`, BG `763:2`, Current outer `77:18`, Current inside `77:290`
- Drive Q60 derivative ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`

## Clean-room selection check
BF/BG were re-evaluated as if selecting from scratch. BF remained stronger than legacy Current but the lower feature area still occupied too much of the front cover as an editorial panel. BG remained strong, but its right-page history still read as a fairly tidy horizontal sequence. Both were treated as replaceable comparators rather than sacred layouts.

## Experiment BH — narrow editorial strip / more photo dominance

### Visible problem
BF still let the cream feature field occupy too much of the bottom front cover, reducing destination-photo ownership and making the cover read partly as photo + index.

### Principle tested
Narrow the paper field to a strong left editorial strip, allow the verified coast/old-town teaser photos to own more of the right side, and keep 01 dominant while 02/03 become clearly subordinate. Preserve native text, existing verified image hashes, and non-destructive image fills.

### Implementation
Rollback-safe duplicate:
- outer `765:2 / V5_OUTER_RURUBU_CLEANROOM_BH_NARROW_EDITORIAL_STRIP_2026_08_11`
- front `765:131 / FRONT_COVER_BH_NARROW_EDITORIAL_STRIP`

Key changes:
- warm paper field narrowed to `438 × 440.5` at lower-left
- coast teaser enlarged to `332 × 224`, rotated `-5.2°`
- old-town teaser enlarged to `250 × 172`, rotated `5.8°`
- 01 remains the dominant feature inside the strip
- 02 stays in the strip under one cyan rule
- 03 remains a compact yellow print callout over the photo area
- no new rounded cards, dashboard modules, gradients, or shadows

### Screenshot QA
Whole-spread and actual-size front screenshots show a stronger photo/paper split than BF. The front keeps a large uninterrupted hero region, then changes rhythm sharply at the lower third rather than resolving into a full-width feature panel.

Initial structure QA detected one real same-parent text intersection between feature `01` and its headline. The headline was moved right and QA was repeated.

### Final structure evidence
- visible native text: `39`
- visible IMAGE-fill nodes: `8`
- same-parent visible text intersections: `0`
- provisional fold guide `765:180`: `2 × 1122.5`
- verified image hashes preserved, including temporary hero hash `539c259be8036b481d06b4f76db9a39b407d90e8`, coast `adbb8e529451a81dd25e4eb29bf068655569ce25`, old-town `439a719d73f28e8dd2889f2026cccb15f345ec63`

### Decision
`BH = ADOPT_AS_STRONGER_OUTER_COMPARATOR_THAN_BF`.

BH is not Current and does not close V5-01 because the hero still uses the temporary comparator image rather than Q60.

## Experiment BI — staggered milestone editorial history

### Visible problem
BG's right-page history was cleaner than earlier versions but still read as a controlled horizontal event row. At page scale it lacked the varied typographic beats seen in Japanese travel-information magazine timelines.

### Principle tested
Use unequal year sizes, alternating vertical positions, and intentionally irregular milestone spacing without restoring a stepper line or dot system. Keep the large history photograph and Memory Spots collage dominant.

### Implementation
Rollback-safe duplicate:
- inside `765:181 / V5_INSIDE_RURUBU_CLEANROOM_BI_STAGGERED_MILESTONE_EDITORIAL_2026_08_11`
- left `765:182 / INSIDE_LEFT_BI_PROFILE_STORY_COLLAGE`
- right `765:308 / INSIDE_RIGHT_BI_STAGGERED_HISTORY_MEMORY`

Key changes:
- history heading promoted to 38 px
- major milestones use larger years than secondary events
- six factual events remain present but are staggered vertically and horizontally
- history photograph moved to y=`232` and remains full-width
- Memory Spots paper strip moved down slightly to preserve the photo-led transition
- left profile collage and Q&A remain intact from BG

### Screenshot-driven repairs
1. First whole-spread screenshot exposed `2026.10.24` wrapping into two lines. It was widened and reduced to 24 px while preserving prominence.
2. Fresh structure QA exposed seven timeline text intersections. Positions were re-read, events were redistributed, and QA was repeated.
3. Two further QA passes found three residual collisions and then one residual collision. Each was corrected rather than accepted as intentional overlap.
4. Final QA returned zero same-parent visible text intersections.

### Final structure evidence
- visible native text: `53`
- visible IMAGE-fill nodes: `6`
- same-parent visible text intersections: `0`
- provisional fold guide `765:458`: `2 × 1122.5`
- profile/history/Memory Spots image hashes preserved

### Decision
`BI = ADOPT_AS_STRONGER_INSIDE_COMPARATOR_THAN_BG`.

## Q60 truth and placement attempt
Fresh Drive search and raw-file readback reconfirmed:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- runtime materialization succeeded

BH hero target `765:132` was re-read immediately before the write attempt and still carried temporary image hash `539c259be8036b481d06b4f76db9a39b407d90e8`.

A fresh official `Figma.upload_assets` single-use URL was requested for node `765:132`. The raw JPEG POST failed before upload because `mcp.figma.com` could not resolve from the execution container. No second retry of the same method was made.

Truth state:
- Q60 selected: YES
- Q60 Drive verified: YES
- Q60 materialized locally: YES
- Q60 Figma placed: NO
- Q60 visually verified in Figma: NO
- new image generated this run: NO
- new generated image adopted this run: NO

## Reusable lessons
1. A front cover gains more magazine energy when the supporting editorial field becomes a narrow asymmetrical strip rather than a full lower panel.
2. Thumbnail hierarchy can tolerate aggressive overlap, but actual structure QA should still end at zero accidental text intersections.
3. Editorial timelines benefit from unequal milestone sizes and irregular rhythm; however, Japanese/number strings need enough width to avoid accidental wraps.
4. Staggered type must be repaired against actual bounding boxes, not guessed by nominal x/y alone.
5. When a binary placement path is blocked before upload, do not count Drive verification or transport preparation as Figma completion.

## Gate truth
- Current outer `77:18`: unchanged
- Current inside `77:290`: unchanged
- strongest outer comparator: `BH / 765:2`
- strongest inside comparator: `BI / 765:181`
- PHOTO_ROLE_PASS remains `9 / 10`
- dominant-photo pass remains `2 / 3`
- V5 complete: NO
- V6 production: NOT STARTED

Status: `BH_OUTER_BEST / BI_INSIDE_BEST / CURRENT_UNCHANGED / Q60_DRIVE_VERIFIED_NOT_FIGMA_PLACED / V5_GATE_OPEN / V6_NOT_STARTED`
