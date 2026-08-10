# V5 outer clean-room N — full-bleed masthead integration

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authority refresh and boundaries

Before any write, the run re-read the repository root authorities and current Rurubu production authorities, including `CLAUDE.md`, `README.md`, `docs/task-board.md`, `docs/wedding-figma-production-system.md`, `docs/wedding-asset-generation-memory.md`, `docs/decisions/2026-08-02-quality-over-legacy-design.md`, `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`, `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`, `CURRENT-STATUS.md`, the project learning log, the Rurubu lessons log, and the previous clean-room M evidence. Live Figma, latest GitHub main, and the Drive Q60 source were re-read again during execution.

No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was edited.

Production Current remains untouched:
- outer `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- inside `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

## Clean-room question

Would clean-room M `650:2` be chosen from scratch as the strongest possible travel-magazine cover? Not yet.

M was already materially stronger than legacy Current, but at thumbnail scale its cover still separated the logo/date masthead into a cream header above the photograph. That separation reduced the sense of a dominant photographic magazine cover and made the first 15% of the page behave more like a brochure header than a newsstand travel magazine.

## Visible problem

- masthead and dominant image felt vertically separated
- the photograph started too low, weakening full-cover photographic authority
- logo/date/title/support collage did not all participate in one continuous image field
- support photos could interact more aggressively with the hero while still respecting an invisible right-edge alignment

The remaining low-resolution temporary hero is a separate asset-quality blocker and was not confused with this layout experiment.

## Principle / capability tested

1. Let one dominant image own the masthead as well as the cover body.
2. Place logo, date, category line, main Japanese display, and support collage inside the same photographic field instead of stacking a separate header above it.
3. Preserve an invisible grid while increasing controlled overlap and scale contrast.
4. Make the structural experiment without changing verified image provenance, Current semantic nodes, or production counts.

Expected improvement:
- stronger newsstand / Japanese travel-magazine thumbnail silhouette
- less brochure/header feel
- faster recognition of `横浜 / ふたり旅。`
- more coherent relationship between logo, headline, dominant photograph, and support-photo cluster

Regression risks:
- masthead losing contrast over photography
- support-photo cluster becoming chaotic
- main Japanese title becoming too large at actual size
- important top content moving too close to trim
- mistaking a stronger composition for a valid cover-photo pass while the temporary comparator hero remains invalid

## Figma implementation

Created a rollback-safe duplicate of M:
- `654:2 / V5_OUTER_RURUBU_CLEANROOM_N_FULLBLEED_MASTHEAD_2026_08_10`
- front `654:129 / FRONT_COVER_CLEANROOM_I_JP_TRAVEL_MAG`
- fold guide `654:158`

Main front-cover changes:
- hero `654:130 / CF_HERO_VERIFIED_EXISTING_ALT`: moved to `x 14 / y 16`, enlarged to `766 × 842`
- logo `654:135`: `456 × 147`, moved to `x 24 / y 22`
- date badge `654:136`: `146 × 92`, moved to `x 612 / y 34`
- destination `654:137`: moved to `y 164`
- kicker `654:138`: moved to `y 190`
- main title `654:139`: moved to `x 22 / y 216`, increased to `86 px`, `84 px` line height
- subheads moved upward to maintain a compact headline block
- pickup strip `654:153–154`: moved upward into masthead/photo interaction and rotated to `-2.8°`
- support images strengthened as one irregular editorial cluster:
  - `654:155`: `244 × 164`, `-4.2°`
  - `654:156`: `176 × 150`, `+4.8°`
  - `654:157`: `274 × 190`, `-3.2°`
- direct-on-photo feature line retained without restoring a card
- feature navigation remains below the dominant image; no new card, pill, gradient, or shadow module was added

The back cover inherits M unchanged in this experiment so the comparison isolates the front-cover masthead/photo integration.

## Image/source truth

The front still uses the already-verified history derivative only as an explicit temporary layout comparator:
- `654:130` hash `539c259be8036b481d06b4f76db9a39b407d90e8`

It is **not** counted as the valid V5 cover source.

The intended Q60 cover derivative was re-read from Google Drive and materialized as a real binary file in this run:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- `1330 × 1220`
- `155,439 bytes`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The source binary is healthy. Figma placement remains unresolved because the repeatedly blocked external upload path is not retried and the project-wide learning log explicitly rejects long model-visible base64 transfer as a safe production method.

## Three-scale visual evidence

### Thumbnail / whole-item

Fresh `400 px` whole-item screenshots were compared for:
- legacy Current `77:18`
- clean-room M `650:2`
- clean-room N `654:2`

N wins the thumbnail comparison over M and Current for the front-cover silhouette:
- logo/date/headline/photo now form one continuous field
- dominant image begins immediately beneath the top accent rather than below a separate cream masthead
- `横浜 / ふたり旅。` remains the immediate primary read
- support photos read as a single editorial collage rather than detached gallery cards

The low-resolution comparator hero remains visibly soft and therefore prevents promotion.

### Reading / page

Fresh front-page screenshot `654:129` confirms:
- logo and date remain distinct
- destination/category line remains legible
- large Japanese title remains clear and does not collide with support photos
- support-photo cluster is aggressive but still controlled inside the right side of the cover
- feature navigation remains readable below the image field
- no new UI-card geometry was introduced

### Actual-size / structure

Fresh live structure QA for `654:2`:
- visible native text: `39`
- visible IMAGE fills: `9`
- same-parent text overlaps: `0`
- fold guide `654:158`: visible, `2 × 1122.5`
- Current outer remains `77:18`
- Current inside remains `77:290`

Verified image hashes in N:
- back main `654:6` → `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `654:18` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `654:22` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- temporary comparator hero `654:130` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- logo `654:135` → `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `654:136` → `0cbbf09357938365c2550f08928be1db33fa6060`

## Adoption state

- new image generation: **none**
- Q60 Drive master/derivative source: **verified and materialized as real binary**
- Q60 Figma placement: **not completed**
- clean-room N: **created / duplicate only / visually verified at thumbnail, whole-item, front-page and actual-size structure scales**
- clean-room N versus M: **N selected as the strongest current outer comparator for cover structure**
- Current promotion: **not adopted** because the valid cover-hero source is still absent from the candidate
- V5 counts: unchanged at `PHOTO_ROLE_PASS 9/10`, `ROLE_COMPLETE 9/10`, dominant `2/3`
- V6 production: remains closed

## Learning result

**Visible problem:** a separate masthead background can preserve hierarchy while still weakening a photo-led travel-magazine silhouette.

**Principle tested:** when cover photography is intended to dominate, test extending the image field behind the masthead and letting logo/date/headline participate in one photographic composition before adding any new decoration.

**Expected improvement:** stronger newsstand recognition and more authentic travel-magazine cover rhythm.

**Regression risk:** loss of contrast and trim safety at the top edge; must be rechecked with the actual final hero.

**Screenshot/structure evidence:** Current/M/N thumbnail comparison, whole N screenshot, front-page N screenshot, `39` visible native texts, `9` visible IMAGE fills, `0` same-parent text overlaps, fold guide preserved, hashes read back.

**Status:** `TESTED / ADOPTED_AS_STRONGEST_OUTER_COMPARATOR / CURRENT_NOT_PROMOTED`.

**Next application:** place the verified Q60 source into the N hero using a genuinely binary-safe bridge, then repeat thumbnail, reading/page, actual-size sharpness/crop, top-trim/safe-area, structure, Drive-ID → node/hash, and rollback checks. Promote only if real-hero N still wins.