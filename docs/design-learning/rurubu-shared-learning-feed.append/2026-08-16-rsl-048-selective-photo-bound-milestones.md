# RSL-048 — Selective photo-bound milestones outperform one treatment for every chronology event

Date: 2026-08-16
Source scope: Rurubu WEDDING V6
Source item: Story / chronology BH → BQ
State: `CROSS_ITEM_CANDIDATE`

## State progression

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

BH had already escaped equal timeline cards and paired major milestones with photographs, but major event copy and imagery still behaved as parallel systems. The same sunset source also appeared both as an upper support image and event 01. A reused generated timeline layer remained present without proving a useful visible role.

## Root-cause hypothesis

For repeated chronology content, a receiving page does not need one visual treatment for every event. A large-enough photograph with suitable contrast can carry its native milestone text directly; a smaller photo can remain adjacent to separate native text. Selective binding may create stronger editorial rhythm than forcing either all-photo-overlay or all-text-outside behavior.

Also, repeated image sources and visually inert generated layers should be subtracted before adding new decoration.

## Bounded test

Rollback-safe clone from BH `1451:2` to working root `1468:2`.

Tests:

1. bound 01/03/05 copy onto event photographs;
2. rejected direct binding for 03 because the small skyline role became cramped;
3. retained direct binding for 01 and 05;
4. hid the non-contributing reused generated timeline image;
5. repaired all absolute text collisions and right-edge safe-area defects exposed by structure QA;
6. hid the duplicated upper sunset support and retained a distinct old-town support image;
7. reran thumbnail, reading, actual-size and structure QA before promotion.

No new generated asset, image upload, card, shadow or gradient was introduced.

## Expected improvement

- make major milestones read as photo-led editorial units;
- preserve compact support beats without forcing uniformity;
- reduce timeline/UI feeling;
- preserve native copy and replaceable images;
- avoid duplicate visual evidence and decoration without a proven job.

## Regression risks

- photo-overlay copy can lose contrast;
- small photos can become overcrowded;
- large milestone numbers can collide with copy;
- repeated pattern breaking can become random collage if there is no major/support hierarchy;
- subtracting an existing layer can break binding if that layer actually performed a role.

## Three-scale evidence

### Whole / thumbnail

BQ `1468:2`, 500px render: PASS and preferred to BH.

01 and 05 read as complete photo-led beats; 03 remains a separate large text beat; duplicated sunset support is removed.

### Reading / spread

BQ `1468:2`, 1000px render: PASS.

The mixed treatment reads intentionally rather than inconsistently because major/support hierarchy and final WEDDING endpoint remain clear.

### Actual size / detail

BQ chronology `1468:21 / 794×1123`: PASS.

- visible native text `30`;
- visible replaceable IMAGE roles `5`;
- absolute text/text collision `0`;
- 18px text safe-area risk `0`;
- visible text outside page `0`;
- rendered line-break/contrast review PASS.

## Figma / Drive / GitHub evidence

Figma:

- promoted BQ root `1468:2`;
- chronology page `1468:21`;
- prior BH `1451:2` hidden as rollback;
- Start Here `845:27` updated to `V5 FU/FX · V6 T + BK/BQ INSIDE STUDIES · V7 HOLD`.

Drive:

- V6 root re-read `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- no new Drive write was needed;
- generated Profile/Q&A/Timeline/Memories masters remain stored but were not adopted.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-T-BK-BQ-PHOTO-BOUND-CHRONOLOGY-QA-2026-08-16.md`.

## What must remain Rurubu-specific

Do not transfer literally:

- event numbers `01/03/05` as the chosen major beats;
- exact photo-overlay positions;
- Japanese type sizes/colors;
- specific photo hashes/crops;
- Hawaii/travel art direction;
- final WEDDING band treatment.

## Cross-item applicability hypothesis

Potentially transferable principle only:

> When repeated timeline/history content still feels like separate text and image systems, test selective photo/text binding only on roles whose image size and contrast support it. Keep smaller roles separate instead of enforcing one pattern everywhere. Remove duplicated imagery and decoration that cannot prove a visible binding function before adding more visual elements.

Receiving items must independently test the method in rollback-safe scope and rerun their own dynamic-copy, safe-area and actual-size checks.
