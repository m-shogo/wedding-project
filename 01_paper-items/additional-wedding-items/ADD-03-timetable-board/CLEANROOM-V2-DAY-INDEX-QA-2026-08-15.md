# ADD-03 当日タイムテーブルボード — Clean-room V2 Day Index QA

Status: `CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LEGACY_PRESERVED / LONG_COPY_STRESS_PASS / NOT_PRINT_READY`
Date: 2026-08-15
Start authority SHA: `ce5d23df25abad926a6120ecb40eb8a9e7aef8de`

## Clean-room declaration

This V2 family was created from blank frames under the 2026-08-15 clean-room mandate.

During authoring, the previous production frame, old V2/V3 layout, old decorative vectors/rails/background composition and prior generated assets were not used as visual references or copied into the candidate. The previous production remains intact. Only verified non-visual requirements were re-authored manually:

- primary A2 portrait / comparison A3 portrait;
- confirmed wedding date `2026.10.24 SAT`;
- confirmed location `YOKOHAMA`;
- Ceremony `14:10–14:40`;
- transfer interval `14:40–15:00`, with the activity explicitly unresolved;
- Reception `15:00–17:30`;
- approved fixed semantic copy and required editable roles;
- working placeholders remain native text and are clearly marked `LAYOUT DUMMY` / `TBD`.

No invented opening time, venue floor, gate, flight number, QR, couple image, guest image or other unverified fact was introduced.

## Art direction

Direction: `DAY INDEX / CHRONOGRAPHIC SHEET`.

The board is treated as a large-format printed time score rather than a collection of event cards or a simulated airport departure board. Large time numerals establish the hierarchy. A single narrow temporal spine and three event index points provide orientation without becoming decorative transport UI. Reception receives the largest temporal field because it is the longest confirmed event; the unresolved transfer interval stays materially quieter.

This direction deliberately avoids using legacy layout grammar as a starting point.

## Hybrid authoring split

- variable/factual copy: native editable Figma text;
- provisional guidance: native editable semantic placeholder text;
- temporal spine, rules and event points: simple functional native geometry;
- reusable SVG: not required for this direction;
- raster/generated decoration: not required; image fills = 0;
- variable text baked into SVG/raster: 0.

`IMAGE_GENERATION_NOT_REQUIRED`: the clean-room design's quality is carried by large-format typography, time hierarchy and paper composition rather than a missing hero/background asset.

## Figma authority and nodes

File: `woFUHUqZcvNkih8o42xeH4`

### A2 primary clean-room V2

- page: `1:2 / 01_A2_PRIMARY`
- candidate: `14:2 / CLEANROOM_V2_ADD03_DAY_INDEX`
- size: `1400 × 1980`
- clean-room long-copy stress: `15:2 / QA_ADD03_CLEANROOM_V2_LONG_COPY_STRESS` — hidden after QA

Structural readback:

- native editable text: `23`
- IMAGE fill nodes: `0`
- visible text outside candidate: `0`
- `clipsContent=true`
- clean-room stress clearances after reflow:
  - ceremony note → divider: `38px`
  - transfer note → divider: `46px`
  - reception note → divider: `45px`

### A3 comparison clean-room V2

- page: `1:3 / 02_A3_COMPARISON`
- candidate: `15:40 / CLEANROOM_V2_ADD03_A3_DAY_INDEX_REFLOW`
- size: `990 × 1400`
- this was built from a blank A3 frame; it was not a scaled/duplicated A2 frame
- long-copy stress: `15:72 / QA_ADD03_A3_CLEANROOM_V2_LONG_COPY_STRESS` — hidden after QA

Structural readback:

- native editable text: `21`
- IMAGE fill nodes: `0`
- visible text outside candidate: `0`
- `clipsContent=true`

The first A3 long-copy stress exposed one real regression: the long Reception placeholder touched the section divider. The candidate was not passed in that state. `RULE_EVENT_02` was moved below the verified two-line note region and the stress was rerendered.

Post-fix stress clearances:

- ceremony note → divider: `30px`
- transfer note → divider: `37px`
- reception note → divider: `56.5px`

Decision: `LONG_COPY_STRESS_PASS` for both A2 and A3 clean-room frames.

## Three-scale visual QA

A2 was reviewed at whole/thumbnail, reading scale and native-detail scale. A3 was independently reviewed at its reflowed size.

Verified reading order:

1. confirmed date/location context;
2. `14:10` Ceremony start;
3. quiet unresolved `14:40–15:00` transfer interval;
4. dominant `15:00` Reception start and `17:30` end;
5. closing note/footer.

The candidate does not use repeated cards, dashboard boxes, fake transport data, repeated icons, gradients, shadows or generated decoration.

## Legacy comparison — only after clean-room completion

Only after A2/A3 candidate construction and long-copy QA were complete was retained production `1:5 / FRAME_TIMETABLE_BOARD` visually opened for comparison.

Observed comparison:

- retained production remains structurally valid and is preserved unchanged;
- clean-room V2 has materially stronger long-distance time hierarchy at thumbnail scale;
- clean-room V2 has fewer template-like decorative fields and does not rely on a large colored side rail or a boxed middle interval;
- the new Reception duration relationship reads more distinctly instead of treating Ceremony/Reception as similarly formatted rows;
- the new A3 is a deliberate reflow rather than a mechanical scale-down.

Decision: the clean-room V2 family is selected as the new visual candidate. The previous production is **not deleted or overwritten** and remains comparison/rollback history.

## Drive authority

Live metadata readback before Figma work:

- folder: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`
- name: `ADD-03_当日タイムテーブルボード`
- parent: `0ADXt8irGMFGnUk9PVA`

No Drive asset was added because this candidate requires no raster/generated production asset.

## Remaining deferred finalization

Still `NOT_PRINT_READY` pending:

- exact printer template / final bleed values;
- final transfer/activity wording;
- any other presently unconfirmed event guidance;
- final font/output embedding review;
- physical A2 proof and approximately 1.5–2m viewing-distance check.
