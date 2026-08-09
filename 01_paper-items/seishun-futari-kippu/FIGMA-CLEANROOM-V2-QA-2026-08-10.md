# 青春ふたりきっぷ — Clean-room V2 Reopened Visual QA

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_V2_CREATED / STRESS_COLLISION_CAUGHT_AND_REPAIRED / PRODUCTION_NOT_PROMOTED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `67e0d2617cf927fe018c7f29541fd0d9df758324`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `v7rIRHv8YKQXG0LYD0I5OA`
- production frame: `11:2 / FRAME_LABEL / 720 × 250`
- prior rollback proof: `39:2 / QA_SEISHUN_FUTARI_PRE_EDITORIAL_CLEANUP_2026_08_08`
- Drive authority folder: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`

The older `DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains structural evidence only. This run reopened the current production visually.

## Reopened visual diagnosis

The live production has a recognizable nostalgic rail-ticket language and solid information capacity, but still contains several signals that are too literal/template-like for the reopened sellable gate:

- a large clip-art-like train illustration dominates the right middle area;
- a large circular red `祝` stamp competes with the title and reads as a decorative badge;
- `No.1024` remains as fixed-looking fake serial data even though a semantic management-number placeholder exists elsewhere;
- the green ornamental ticket frame, route line, train, stamp, serial, arrows, and guilloche all compete at once;
- the result is charming but closer to a themed template than a restrained professional rail-ephemera reinterpretation.

The screenshot-supported defect is composition and motif density, not missing raster imagery.

## Clean-room V2

Created `40:2 / QA_SEISHUN_FUTARI_CLEANROOM_V2_EDITORIAL_2026_08_10` without touching production.

Changes:

- retained the cream/green rail-ticket material language and outer print frame;
- reduced the guilloche background opacity instead of using it as a dominant texture;
- removed the literal train illustration;
- removed the large circular `祝` stamp and its overlaid `祝` text;
- replaced fixed-looking `No.1024` with the confirmed date folio `24 OCT 2026`;
- strengthened the Japanese title using native `Noto Serif JP`;
- retained the meaningful route narrative `これまで → きょう → これから` and widened its route line after freeing the right side;
- rebuilt the lower facts strip with Japanese labels for date / departure / destination;
- moved the semantic management-number placeholder out of the crowded bottom line;
- added only a low-opacity native `24` typographic atmosphere and one narrow red anchor on the right;
- preserved perforation/detail geometry as physical ticket texture rather than adding new decorative badges.

The resulting normal-state screenshot is materially cleaner than production and has more deliberate hierarchy without losing the nostalgic ticket identity.

## Long-copy stress — failure caught

Initial stress proof `41:2` was intentionally preserved as:

`REJECTED_QA_SEISHUN_V2_LONG_COPY_STRESS_COLLISION_2026_08_10`

It exposed a real defect: long departure and destination dummy strings collided in the bottom facts strip. The candidate was **not** promoted.

## Stress repair

The V2 lower facts area was rebuilt into wider independent columns:

- date column remains compact at left;
- departure field moved to an independent 185px region;
- destination field moved to an independent 225px region;
- management-number dummy moved to the upper-right metadata area;
- a new stress proof was created as `42:2 / QA_SEISHUN_FUTARI_CLEANROOM_V2_LONG_COPY_STRESS_V2_2026_08_10`.

Second stress strings remain explicit semantic dummies and no realistic facts were invented.

The second stress screenshot shows no collision or frame escape, but the departure/destination microtype becomes visually small at actual ticket scale. Therefore this is **not yet sufficient evidence for production promotion** under the reopened sellable gate.

## Current comparison judgment

Normal-state V2 clearly improves the art direction:

- less clip-art/stamp/template feel;
- stronger Japanese title hierarchy;
- cleaner negative-space distribution;
- route line remains meaningful and recognizably rail-inspired;
- date and `2名さま` become metadata rather than decorative badges;
- no fake serial remains visible in the candidate.

However, long-copy actual-size legibility must be improved one more step before V2 can replace production. The correct next move is to refine the lower information architecture or stress-copy width/line-height while keeping realistic minimum print type, rather than hiding the failure.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated image was claimed, stored, or placed. This item currently benefits more from native typography/vector paper logic than from adding a raster illustration. A generated train/landscape asset would risk recreating the literal themed-template problem that V2 is removing.

## Drive

- authority folder ID: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`
- Drive changes: `0`
- reason: no generated/raster asset was adopted.

## Decision

`CLEANROOM_V2_CREATED / VISUAL_COMPARISON_ADVANCE / STRESS_COLLISION_CAUGHT_AND_REPAIRED / ACTUAL_SIZE_MICROTYPE_REFINEMENT_REQUIRED / PRODUCTION_NOT_PROMOTED / NOT_PRINT_READY`

Next safe target: improve V2 lower-fact long-copy legibility at actual size, repeat the stress screenshot and structural readback, and promote only if the candidate remains clearly stronger than production without relying on undersized type. Do not progress to ADD-01 until 青春ふたりきっぷ reaches the reopened `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` gate or a true external blocker remains.
