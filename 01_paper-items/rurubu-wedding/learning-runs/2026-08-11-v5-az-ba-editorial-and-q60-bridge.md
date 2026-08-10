# 2026-08-11 — V5 AZ/BA editorial QA + Q60 bridge limits

## Scope
Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

## Authorities and live state re-read before writes
- Drive `00_Figma本番前_Current Authority・制作ルール`
- `docs/wedding-asset-generation-memory.md`
- `01_paper-items/rurubu-wedding/FOUNDATION.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- prior run `learning-runs/2026-08-11-v5-av-aw-cleanroom-editorial-qa.md`
- live Figma AV outer `739:171`, AW inside `740:2`
- live Current outer `77:18` re-read after experiments; Current was not modified
- GitHub main before this evidence write: `df464383d6797c29823cb1c6296a4bed037d0a34`

## Q60 cover-hero bridge — verified source, still not placed

Fresh Drive raw-file readback materialized the registered cover derivative again:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- registered geometry `1330 × 1220`
- registered SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The official Figma `upload_assets` action produced a single-use upload URL for AV hero `739:299`, but the runtime still could not resolve `mcp.figma.com`, so no bytes reached Figma. Two alternative plugin-runtime routes were tested only as capability probes and failed atomically before mutation:
- `figma.createImageAsync(...)` is not supported in this runtime
- global `fetch` is not defined in this runtime

No repeated raw-POST retry was performed after the same DNS fingerprint was confirmed. Q60 state remains: `DRIVE_VERIFIED_AND_MATERIALIZED / FIGMA_NOT_PLACED / NOT_VISUALLY_VERIFIED_IN_FIGMA`.

## Experiment AZ — deeper photo bleed + direct editorial feature index

### Visible problem
AV improved photo overlap, but the lower feature area still separated into a tidy navigation/table-of-contents zone. The rectangular magenta `今号の3大特集` bar reinforced an app-like module boundary.

### Principle tested
Use subtraction first, then increase photo-to-paper continuity and typographic scale contrast. The seam should feel composed by an editor, not split into hero and navigation components.

### Expected improvement
- photo collage carries further into the lower page
- less obvious UI/panel boundary
- 01 reads as the dominant story while 02/03 remain subordinate
- thumbnail silhouette remains legible without adding decorative containers

### Regression risk
- extending the hero could crowd the feature kicker
- larger 01 could collide with title/description
- direct kicker text could disappear at the photo/paper seam

### Implementation
Created rollback-safe comparator:
- `744:2 / V5_OUTER_RURUBU_CLEANROOM_AZ_DEEP_BLEED_EDITORIAL_INDEX_2026_08_11`
- front `744:129 / FRONT_COVER_CLEANROOM_AZ_DEEP_BLEED_EDITORIAL_INDEX`

Changes from AV:
- hero `744:130` extended from `774 × 780` to `774 × 812`
- cream feature field starts lower (`y=810`) and is shorter
- rectangular kicker bar hidden
- `今号の3大特集` rendered directly as native magenta text
- coast and old-town verified teaser photos moved deeper into the seam
- feature 01 increased to 88 px number / 38 px title
- 02/03 kept smaller and staggered
- short magenta/cyan/yellow rules retained with slightly varied angles
- footer moved lower
- no new card, pill, gradient, shadow, or image was added

First screenshot exposed a real regression: the direct feature kicker clipped at the seam. That state was not accepted. The kicker was moved to `y=814`, reduced to `13.5 px`, its shadow removed, and feature 01 spacing was retuned.

### Three-scale QA
- whole-item: PASS as comparator; back cover remains stable and front photo/feature transition is visibly less componentized than AV
- reading/page: PASS on `744:129`; logo → destination → dominant Japanese title → photo collage → 01/02/03 remains readable
- actual-size/detail: PASS for native feature typography and captions; temporary hero remains visibly below the quality target and is not hidden by the redesign

### Structure evidence
Final fresh audit:
- visible native text: `41`
- visible IMAGE fills: `8`
- same-parent visible text intersections: `0`
- fold guide `744:170`: `2 × 1122.5`
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
`AZ = ADOPT_AS_STRONGER_OUTER_COMPARATOR_THAN_AV_FOR_NEXT_Q60_TEST`.

The improvement is visual/structural only. AZ is not Current and does not close V5-01 because the verified Q60 hero is still not placed.

## Experiment BA — shared-travel pull quote as inside editorial anchor

### Visible problem
AW's profile photography was strong, but the lower left-page Q&A still read like a sparse questionnaire/form. The shared-interest sentence was too small to terminate the page with a magazine-style editorial beat.

### Principle tested
Do not add another box. Tighten secondary Q&A spacing and promote existing factual/native copy into a large pull quote so the lower half gains a strong typographic anchor.

### Expected improvement
- less form-like vertical rhythm
- stronger large/medium/small text contrast
- page closes with a memorable shared-travel statement before the Travel Note
- no factual-content invention

### Regression risk
- Q3 could collide with the long Q1 answer
- larger pull quote could crowd Travel Note

### Implementation
Created rollback-safe comparator:
- `747:2 / V5_INSIDE_RURUBU_CLEANROOM_BA_PULLQUOTE_EDITORIAL_2026_08_11`
- left `747:3 / INSIDE_LEFT_BA_PULLQUOTE_EDITORIAL`

Changes from AW:
- Q&A heading increased slightly
- Q2/Q3 secondary groups tightened and staggered
- existing `ふたりの共通点` label promoted slightly
- existing native sentence `旅 × 写真 × HAWAII　好きが重なるところ。` increased to 28 px as a direct pull quote
- Travel Note retained in its original print-like footer treatment
- all profile/history/Memory photography preserved
- no new cards, badges, gradients, shadows, or images

Fresh structure QA caught two real intersections created by the first stagger: Q1 B with Q3 number/title. That first state was not accepted. Q3 was moved down and re-audited.

### Three-scale QA
- whole-item: PASS as comparator; right page remains AW's photo-led history/Memory layout while the left page now has a clearer ending beat
- reading/page: PASS on `747:3`; profile collage remains dominant, Q1 remains primary, Q2/Q3 stay secondary, shared-travel pull quote becomes the lower editorial anchor
- actual-size/detail: PASS after collision repair; the quote remains native/editable and Travel Note stays readable

### Structure evidence
Final fresh audit:
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent visible text intersections: `0`
- fold guide `747:274`: `2 × 1122.5`
- verified image hashes preserved:
  - profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - profile B `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - memory 03/next `c09aa82e7b2ac75708707345c6f845452bf67663`

### Decision
`BA = ADOPT_AS_STRONGER_INSIDE_COMPARATOR_THAN_AW`.

Reason: it improves editorial hierarchy using existing content and subtraction rather than restoring container UI. The collision found by structure QA was repaired before adoption.

## Current / gate truth after experiments
- Current outer `77:18`: unchanged
- Current inside `77:290`: unchanged
- strongest outer comparator: `AZ / 744:2`
- strongest inside comparator: `BA / 747:2`
- generated new image this run: NO
- adopted new generated image this run: NO
- Q60 Drive verified/materialized: YES
- Q60 placed in Figma: NO
- Q60 visually verified in Figma: NO
- active PHOTO_ROLE_PASS remains `9 / 10`
- dominant-photo pass remains `2 / 3`
- V5 complete: NO
- V6 production: NOT STARTED

## Reusable lesson candidates
1. A rectangular editorial kicker can become UI-like even when the rest of the composition is magazine-led; direct native text at a photo/paper seam can preserve hierarchy with less component signal.
2. Extending photo bleed is useful only if the seam labels remain legible. AZ's first clipped kicker proves whole-page screenshot QA must follow geometry changes.
3. Existing factual copy can carry more editorial energy when promoted as a pull quote instead of adding a new decorative module.
4. Staggering questionnaire content is not automatically safer than a grid; BA initially produced real Q1/Q3 intersections and required structure QA repair.
5. Asset-quality and composition gates remain independent. AZ can be the strongest cover composition while V5-01 remains open because its hero fill is still the temporary comparator image.

Status: `AZ_OUTER_BEST / BA_INSIDE_BEST / CURRENT_UNCHANGED / Q60_DRIVE_VERIFIED_NOT_FIGMA_PLACED / V5_GATE_OPEN / V6_NOT_STARTED`
