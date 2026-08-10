# V5 outer clean-room P — dense lower editorial rail

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `TESTED / ADOPTED_AS_STRONGEST_OUTER_COMPARATOR / CURRENT_NOT_PROMOTED / HERO_SOURCE_STILL_BLOCKED`

## Authority refresh and boundary

Before Figma writes, the project-wide authorities, Rurubu Current Status, Production Operating System V2, Postmortem/V6 Guardrails, latest clean-room O record, latest GitHub main, live Current frames, and the live O structure were re-read.

Production Current remained unchanged throughout:
- outer `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- inside `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was edited.

Fresh Drive readback also reconfirmed the unresolved cover derivative:
- `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- raw binary materialized successfully in the runtime

The already hard-closed `mcp.figma.com` external POST path was not retried. The file is healthy; binary-safe Figma placement remains the blocker.

## Anti-anchoring decision

The production Current outer would not be selected from scratch against the clean-room direction. At thumbnail scale Current still reads as a relatively orderly cover/back-cover template with a restrained image field and small coverline matrix, while O already establishes a materially stronger Japanese travel-magazine silhouette.

Therefore the safe next action was another duplicate-frame clean-room refinement, not legacy Current cleanup.

## Visible problem

Clean-room O `657:2` materially improves both pages, especially the photo-led back cover, but its front cover still leaves too much low-information cream field between the dominant hero and the footer. The `01 / 02 / 03` navigation groups are individually useful yet float as three sparse islands. At whole-item scale this weakens the otherwise energetic photo/title/collage composition and makes the lower fifth feel less edited than the upper four-fifths.

## Principle tested

- recover dead space by increasing the dominant photo before adding decorative containers
- convert the lower cover area into one compressed editorial rail rather than three detached modules
- add only native microcopy that clarifies the existing sections; do not add cards, badges, shadows, gradients, or fictional factual claims
- keep the irregular 01/02/03 rhythm, but stabilize it with bounded measures and a common seam/footer relationship

Expected improvement:
- stronger front-cover thumbnail density
- more continuous photo → feature navigation → footer rhythm
- less brochure/landing-page whitespace
- clearer secondary reading layer without competing with `横浜 / ふたり旅。`

Regression risks:
- feature groups colliding after compression
- microcopy becoming too small to justify itself
- footer/feature band becoming visually heavy
- hero/crop becoming unsafe before the final Q60 source is actually placed

## Figma implementation

Created rollback-safe duplicate from O:
- `659:2 / V5_OUTER_RURUBU_CLEANROOM_P_DENSE_LOWER_RAIL_2026_08_10`
- front `659:129`
- hero `659:130`
- fold guide `659:158`

Back cover was inherited from O unchanged because its photo-led back layout had already won the previous comparison.

Front-cover changes:
- extended the temporary comparison hero from `766 × 842` to `766 × 904`
- aligned hero bottom and the existing magenta/cyan/yellow seam at `y=920`
- shifted the three existing feature groups downward into the recovered space
- kept their asymmetric vertical rhythm rather than turning them into equal cards
- added three small native-text descriptors only:
  - `659:159 / 写真と記憶をめぐる`
  - `659:160 / ふたりの歩みをたどる`
  - `659:161 / 当日の楽しみ方`
- moved the quiet navy footer upward to `y=1068`, reducing the unstructured gap without adding a new module

No generated image, source substitution, flattened text, card, pill, gradient, or new shadow was added.

## QA-discovered regression and correction

The first structure sweep after visual refinement found two real same-parent text intersections in the feature rail:
- `CE_FEATURE_1` intersected `CE_FEATURE_2_NO` by roughly `8 × 26 px`
- `CE_FEATURE_2` intersected `CE_FEATURE_3_NO` by roughly `38 × 24 px`

The screenshot looked close enough that these could have been missed by visual review alone. The candidate was not accepted in that state.

Correction:
- narrowed `CE_FEATURE_1` measure to `194 px`
- narrowed `CE_FEATURE_2` measure to `180 px`
- shifted group 03 number to `x=548`
- shifted group 03 title/descriptor to `x=598`
- retained two-line Japanese titles and the asymmetric rail

Fresh actual-size screenshot and programmatic QA after correction show the collisions removed.

## Three-scale evidence

### Whole-item / thumbnail

Compared live Current `77:18`, O `657:2`, and P `659:2`.

Observed result:
- Current remains substantially more orderly/template-like
- O establishes the strong clean-room photo/title/collage language
- P improves O's remaining weak lower-cover field by extending photography and compressing the navigation into a single denser editorial rail
- back cover remains O's stronger photo-led composition

### Reading / page scale

Fresh front screenshot `659:129` confirms:
- `横浜 / ふたり旅。` remains the dominant read
- logo/date badge remain clearly separated from the title
- three support photographs remain intentionally unequal and overlapping
- the 01/02/03 feature navigation is closer to the hero and reads as one lower cover system instead of floating modules
- the new descriptors remain subordinate to the existing section titles

Back page inherits O; its previously verified large-photo → Friends pair → journey-route sequence is unchanged.

### Actual-size / detail

Fresh front screenshot after the collision correction shows:
- no visible clipping in the feature rail
- two-line feature titles remain intact
- microcopy is legible at natural page render while clearly secondary
- footer remains a quiet final anchor
- hero seam is geometrically aligned instead of cutting through the image field at an arbitrary position

## Fresh structure QA

Final `659:2` readback:
- visible native text: `42`
- visible IMAGE fills: `9`
- same-parent text overlaps: `0`
- fold guide `659:158`: visible, `2 × 1122.5`
- Current outer/inside still present under original semantic names

Verified unchanged image hashes:
- temporary comparison hero `659:130` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- back main `659:6` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `659:18` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `659:22` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- logo `659:135` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `659:136` → `0cbbf09357938365c2550f08928be1db33fa6060`

The hero hash above is explicitly a composition comparator borrowed from the verified history role. It is not counted as V5-01 completion and is not represented as the final cover source.

## Adoption state

- generated: none
- Drive Q60: read back and raw binary materialized; not newly generated
- Q60 adopted to Figma: **no**
- clean-room P placed in Figma: **yes, duplicate only**
- visually verified: **yes, whole-item + page + actual-size/detail**
- structure verified: **yes, after correcting two detected collisions**
- Current outer promotion: **not performed**
- V5 photo gate: unchanged at `9/10`, dominant `2/3`
- V6 production: remains closed

P is adopted only as the strongest current **outer comparator**. It is not production Current because the final cover-hero source is still absent from Figma.

## Learning result

**Visible problem:** once a cover becomes strongly photo-led, a large low-information field immediately below the hero can undo much of that gain and make secondary navigation feel like detached UI modules.

**Principle/capability tested:** expand the dominant image and compress existing feature navigation into one editorial rail before inventing new decorative containers.

**Expected improvement:** stronger magazine silhouette and more continuous reading rhythm with fewer dead zones.

**Regression risk:** compressed Japanese feature groups can collide even when the screenshot initially looks acceptable; programmatic text-box intersection QA is valuable after asymmetric compression.

**Evidence:** Current/O/P whole-item comparison, fresh `659:129` actual-size screenshot, final overlap `0` structure readback, fold/hashes/Current safety readback.

**Status:** `TESTED / ADOPTED_AS_STRONGEST_OUTER_COMPARATOR / CURRENT_NOT_PROMOTED`.

**Next application:** when a genuinely different binary-safe bridge becomes available, place the verified Q60 source into `659:130`, verify exact node/hash and crop/sharpness at three scales, then compare Current/O/P again. Promote only if the final intended hero preserves P's visual advantage. Until then, continue only independent high-value typography/crop/print-safety work and do not repeat the closed external upload path.