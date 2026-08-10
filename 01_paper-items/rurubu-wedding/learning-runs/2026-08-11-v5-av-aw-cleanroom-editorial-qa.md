# 2026-08-11 — V5 AV/AW clean-room editorial QA

## Scope
Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

## Authorities re-read before writes
- Drive `00_Figma本番前_Current Authority・制作ルール`
- `01_paper-items/rurubu-wedding/FOUNDATION.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- latest GitHub main before evidence write: `004b0df5f57ee0be794cc3c17d45d3f5e362b463`
- live Figma page `01_RURUBU_WEDDING`
- prior strongest candidates: outer AU `735:2`, inside AT `730:2`
- Current remained outer `77:18`, inside `77:290` throughout.

## Experiment AV — photo-led cover feature collage

### Visible problem
AU reduced the app-like navy panel, but the lower-third 01/02/03 cluster still read too evenly organized at whole-spread scale, while the two travel teaser photos were not carrying enough editorial energy.

### Principle tested
Increase photo dominance and asymmetric scale without adding cards, pills, gradients, rounded UI, new decorative assets, or new factual copy.

### Expected improvement
- stronger magazine/newsstand silhouette
- more aggressive photo overlap at the hero-to-paper seam
- clearer large/medium/small story hierarchy
- less equal-module navigation feel

### Regression risk
- teaser images could crowd the fold or feature kicker
- oversized feature 01 number could wrap
- intentional overlap could become accidental text collision

### Implementation
Rollback-safe duplicate created:
- `739:171 / V5_OUTER_RURUBU_CLEANROOM_AV_PHOTO_LED_FEATURE_COLLAGE_2026_08_11`
- front page `739:298`

Changes relative to AU:
- coast teaser enlarged to `282 × 188`, rotation `-3.8°`
- old-town teaser enlarged to `214 × 150`, rotation `5.8°`
- magenta issue kicker widened slightly at the photo/paper seam
- feature 01 increased and given stronger scale priority
- feature 02/03 shifted to a less rigid shared alignment
- short article rules rotated slightly rather than forming a strict grid
- no new image, card, pill, shadow, gradient, or rounded panel added

### Screenshot correction
First AV screenshot exposed a real regression: `01` wrapped vertically because its text box was too narrow after the font-size increase. The state was not adopted. `CE_FEATURE_1_NO / 739:314` was corrected to `112 × 82`, 78 px, and a fresh screenshot verified normal `01` rendering.

Fresh structure QA then found an `8 px` intersection between `CE_FEATURE_1_NO / 739:314` and `CE_FEATURE_1 / 739:315`. The title was shifted right. Re-run intersection QA: `0`.

### Three-scale visual QA
- whole-item: PASS as comparator; photo seam is visibly more energetic than AU and feature 01 remains dominant
- reading/page: PASS on `739:298`; logo/title/photo/teasers/feature index remain legible as one cover rather than separate UI regions
- actual-size/detail: PASS for native feature text and teaser-caption legibility; the temporary hero is still visibly below the quality target and therefore remains a blocker rather than being hidden by layout polish

### Evidence
- visible native text: `41`
- visible IMAGE-fill nodes: `8`
- fold guide: `739:339 / PROVISIONAL_FOLD_GUIDE / 2 × 1122.5`
- same-parent visible text intersections after correction: `0`
- verified image hashes preserved:
  - back main `e3738476f760932bb5b09c9d60f174dd6c84049d`
  - Friends cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
  - Friends dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - temporary comparator hero `539c259be8036b481d06b4f76db9a39b407d90e8`
  - logo `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
  - date badge `0cbbf09357938365c2550f08928be1db33fa6060`
  - coast teaser `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - old-town teaser `439a719d73f28e8dd2889f2026cccb15f345ec63`

### Decision
`AV = ADOPT_AS_STRONGER_OUTER_COMPARATOR_THAN_AU FOR_NEXT_Q60 TEST`.

Reason: the two teaser photos now form a more convincing editorial collage at the seam, while the feature index keeps a clear 01 > 02/03 hierarchy without returning to cards or a dark product panel.

## Experiment AW — staggered editorial inside timeline

### Visible problem
AT's right-page six-point history strip was technically clean but still resembled an evenly spaced progress/step component. The left Q2/Q3 pair also remained too grid-like.

### Principle tested
Subtract the long UI-like rail and use controlled vertical staggering. Preserve all factual/native text and verified photography.

### Expected improvement
- history reads as editorial chronology rather than stepper UI
- greater visual rhythm above the dominant history photo
- Q2/Q3 feel like separately edited interview fragments rather than equal cards/columns

### Regression risk
- disconnected chronology could become visually vague
- staggered questions could collide with Q1 answers or common-point pull quote

### Implementation
Rollback-safe duplicate created:
- `740:2 / V5_INSIDE_RURUBU_CLEANROOM_AW_STAGGERED_EDITORIAL_TIMELINE_2026_08_11`
- left page `740:3`
- right page `740:126`

Changes relative to AT:
- `CRC_HISTORY_YELLOW_RULE` hidden
- six year/dot/text groups staggered vertically in alternating positions
- all six history events retained
- `IA_QA_META` hidden as non-essential UI-like metadata
- Q1 increased slightly
- Q2/Q3 blocks offset vertically rather than sharing one baseline
- common-point pull quote and TRAVEL NOTE retained
- no new images or decorative cards added

### Screenshot/structure correction
Fresh structure QA detected a `4 px` intersection between `IA_QA_1_B / 740:27` and `IA_QA_3_Q / 740:39`. Q3 and its answers were shifted down by a controlled amount. Re-run intersection QA: `0`.

### Three-scale visual QA
- whole-item: PASS as comparator; left interview blocks and right timeline no longer share the same rigid horizontal rhythm
- reading/page left `740:3`: PASS; profile collage remains dominant, Q1 is primary, Q2/Q3 are staggered and readable, common-point pull quote still closes the page
- reading/page right `740:126`: PASS; history events read as a loose editorial chronology above the dominant history image, and Memory Spots remains a large-photo + two-support-photo collage
- actual-size/detail: PASS after the 4 px Q1/Q3 collision correction; native text remains editable and all verified image hashes persist

### Evidence
- visible native text: `53`
- visible IMAGE-fill nodes: `6`
- fold guide: `740:274 / PROVISIONAL_FOLD_GUIDE / 2 × 1122.5`
- same-parent visible text intersections after correction: `0`
- verified hashes preserved:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 03/next `c09aa82e7b2ac75708707345c6f845452bf67663`

### Decision
`AW = ADOPT_AS_STRONGER_INSIDE_COMPARATOR_THAN_AT`.

Reason: the history area now avoids a long dashboard-step rail and the Q section has visibly less equal-grid behavior while retaining native/editable content.

## Experiment AX — outer back timeline subtraction

### Visible problem
AV back cover still used a small zig-zag path across six evenly distributed history points.

### Test
Created `740:275 / V5_OUTER_RURUBU_CLEANROOM_AX_EDITORIAL_BACK_TIMELINE_2026_08_11`, removed the five zig-zag lines, and staggered the six event dots/year labels.

### Decision
`AX = REJECT_FOR_NOW`.

Whole-spread screenshot was cleaner but the six points became too disconnected; the route/travel metaphor weakened more than the UI signal improved. Preserve as experiment evidence only. AV remains the stronger outer comparator.

## Asset-generation / Drive state
No new image was generated, adopted, or placed in this run. Existing verified fills were preserved. The cover-specific Q60 remains the only active V5 photo blocker and was not falsely counted as placed.

Fresh Drive search/readback during this run confirmed the file still exists at the same identity:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- expected registered geometry `1330 × 1220`
- expected registered size `155,439 bytes`
- Figma placement: NOT VERIFIED / NOT COMPLETE

## Current / gates
- Current outer `77:18`: unchanged
- Current inside `77:290`: unchanged
- strongest clean-room outer comparator: `AV / 739:171`
- strongest clean-room inside comparator: `AW / 740:2`
- V5 complete: NO
- dominant photo pass: still `2 / 3`
- V6 production: NOT STARTED

## Reusable lessons
1. Photo overlap should do editorial work at a transition seam; enlarging existing verified teasers was more valuable than adding another badge or card.
2. Large numerals require geometry QA after typography changes; screenshot inspection caught a wrap that structure-only planning would miss.
3. A perfectly straight multi-event timeline quickly reads as product UI. Removing the rail and staggering event labels can restore magazine rhythm, but removing all connecting logic can go too far (AX rejection).
4. Asymmetry must still be collision-tested. AW improved composition but initially created a 4 px Q1/Q3 text intersection.
5. Rejected experiments are preserved as rollback/learning evidence but are not counted as progress or Current promotion.

## Next application
- use AV, not AU, as the next outer target for the verified cover-specific Q60 placement/comparison
- use AW, not AT, as the inside comparator for final V5 weakest-three review
- do not promote Current until Q60 is truly placed and AV wins whole-item, page, actual-size, structure, crop, and print-safe comparison
- keep AX only as evidence that timeline subtraction needs some route logic, not total disconnection

Status: `AV_OUTER_BEST / AW_INSIDE_BEST / AX_REJECTED / CURRENT_UNCHANGED / Q60_NOT_PLACED / V5_GATE_OPEN / V6_NOT_STARTED`
