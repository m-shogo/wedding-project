# Rurubu WEDDING V8 — 1DAY AO destination-owned reader-copy QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Figma page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Authority and comparison boundary

- V6 control remains frozen: `JC + IX + JB + IZ + IT + JA`.
- V7 six-role comparison set remains untouched.
- Previous V8 1DAY Current: `AN 2238:106`.
- New verified V8 1DAY Current: `AO 2249:2`.
- Previous AN is preserved as hidden rollback.
- No image-model generation, Drive master creation, external image upload, or V6/V7 image reuse was involved.

## Professional research used as a hypothesis

Fresh source: D&DEPARTMENT / `d design travel` editorial policy and 2026 activity.

Useful principle extracted, without copying layout or visual style:

- travel editorial value is strengthened by material that is genuinely specific to the place rather than generic travel atmosphere;
- editorial voice should describe the destination and lived experience in reader-facing language;
- photography and wording should avoid exaggerated or artificial travel-signalling when the place itself can carry the meaning.

The current non-Rurubu neutral lesson `travel energy must not erase artifact-role specificity` was also consumed only as a neutral QA hypothesis. No non-Rurubu item-specific layout, node, asset, palette, or production state was inspected or copied.

## Visible defect before change

AN's right page was structurally sound and its time axis was data-bound, but its most prominent copy still described the design device rather than the trip:

- `一日の時刻 / 4つの停留点`
- `時間を読む。 / 余白も読む。`
- `時刻の距離が、そのまま一日のリズムになる。`
- visible process note: `時刻差を実寸の間隔として配置。`

This made the page feel like a polished information-design demonstration rather than a finished Yokohama travel/wedding publication.

## Root-cause hypothesis

When a travel page already has valid factual data and a coherent layout, reader-facing copy should let the destination/experience own the semantic hierarchy. Explaining the visualization technique on the finished page creates design-process leakage and weakens place identity.

This is not a rule to make every heading a place name. It is a test of whether the dominant words are owned by the article/trip or by the designer's implementation method.

## Bounded experiment

Created rollback-safe duplicate:

- candidate/current: `2249:2 / V8 CLEANROOM AO / BOOK EDITION / 1DAY / DESTINATION-OWNED READER COPY`

Only the right-page reader copy changed. The left experiential pace, exact times, time-marker positions, spine, folios, colors, typography system, and bottom close remained unchanged.

Changes:

- `一日の時刻 / 4つの停留点` → `横浜 / 一日の流れ`
- `時間を読む。 / 余白も読む。` → `海辺から、 / 夜の食卓まで。`
- `時刻の距離が、そのまま一日のリズムになる。` → `10:00から18:30。寄り道しながら、横浜をゆっくり歩く。`
- `時刻差を実寸の間隔として配置。` → hidden process evidence; not reader-facing

No unknown location, date, venue, or event detail was invented. `横浜`, the four stops, and the time range were already verified in the Current content.

## Three-scale visual QA

### Whole-item / 500px

PASS.

The right page now reads first as a Yokohama day route rather than a visualization-method explanation. The left/right role separation remains clear: left = felt pace, right = exact route/time information.

### Reading / 1400px

PASS.

`横浜 / 一日の流れ` and `海辺から、夜の食卓まで。` establish destination and journey arc without adding decorative travel motifs. Existing time data remains the main navigation structure.

### Actual-size / 1587×1123

PASS.

No accidental wrap, no visible process-language note, no weak single-character tail, and no new contrast problem were observed.

## Structural QA

AO `2249:2` after candidate QA:

- parent page: `2052:2` PASS
- visible native text: `21`
- visible IMAGE fills: `0`
- text intersections: `0`
- 18px outer safe-area risks: `0`
- visible process/schema leakage audit: `0`
- exact time/action data retained: `10:00 海辺 / 11:40 カフェ / 15:10 街歩き / 18:30 食卓`
- native editable text preserved
- whole-spread flattening: `0`

## Promotion

AO was promoted only after three-scale and structure QA.

- new Current: `2249:2`
- old AN `2238:106`: renamed rollback and hidden
- current page placement: `x=3600 / y=9850`

## Learning result

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:

`F-RSL-216-DESIGN-METHOD-COPY-OUTRANKS-DESTINATION-EXPERIENCE-ON-TRAVEL-PAGE`

Generalizable hypothesis: when a final travel/editorial page explains its own grid, scale, visualization logic, or layout metaphor more prominently than the destination/experience, test replacing only that reader-facing layer with article-owned language while preserving verified information design.

Do not transfer AO's exact copy, coordinates, type scale, time-axis geometry, palette, or Yokohama content to another item.

## Asset truth

- new image-model generation: `0`
- new Drive masters: `0`
- new Figma image placements: `0`
- V6/V7 image reuse: `0`
- existing V8 Drive folder retained: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`
- unchanged RSL-208 DNS-blocked upload-submit route was not retried without a material environment change

## Status

`AO VERIFIED_LOCAL / CURRENT / ROLLBACK_SAFE / NATIVE_EDITABLE / NOT_PRINT_READY`
