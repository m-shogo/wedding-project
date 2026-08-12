# ADD-03 当日タイムテーブルボード — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-12

## Authority

- Current visual authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `woFUHUqZcvNkih8o42xeH4`
- production frame: `1:5 / FRAME_TIMETABLE_BOARD`
- Drive authority folder: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`
- reopened promotion evidence: `FIGMA-REOPENED-VISUAL-PROMOTION-2026-08-10.md`

The original 2026-08-02 checklist below remains the fact/structure/readability contract. It is no longer a `PRE-FIGMA` state marker: the production frame has since been promoted through the reopened visual gate.

## Fresh visual spot-check — 2026-08-12

Fresh live screenshots of production `1:5` were reviewed again at thumbnail, reading and actual/detail scale.

- Japanese `本日の旅程` remains the primary hierarchy.
- `14:10–14:40` and `15:00–17:30` read before decorative detail.
- the sand `14:40–15:00 / TBD · LAYOUT DUMMY` interval remains visibly secondary and cannot reasonably be mistaken for a confirmed event.
- the deep-navy date rail and rust rules still structure the negative space without turning the board back into a dashboard or airport UI.
- fresh actual-size review found that `[CEREMONY NOTE · LAYOUT DUMMY]` and `[RECEPTION NOTE · LAYOUT DUMMY]` still read like internal implementation labels in an otherwise Japanese-first print layout.
- fresh Drive metadata readback confirmed the exact authority folder ID above.

### Rollback-safe semantic placeholder correction

Before editing production, frame `1:5` was cloned to `99_QA` as hidden rollback proof:

- rollback: `7:2 / ROLLBACK_ADD03_PRE_JA_SEMANTIC_PLACEHOLDER_FIX_2026_08_12`

Production root `1:5` was preserved. Only two native text nodes were changed:

- `6:43 / TXT_V2_CEREMONY_NOTE`: `[CEREMONY NOTE · LAYOUT DUMMY]` → `[挙式案内 · LAYOUT DUMMY]`
- `6:52 / TXT_V2_RECEPTION_NOTE`: `[RECEPTION NOTE · LAYOUT DUMMY]` → `[披露宴案内 · LAYOUT DUMMY]`

The unconfirmed middle interval remains `TBD · LAYOUT DUMMY` and was not promoted into a factual event.

Post-edit actual-size `1400 × 1980` screenshot QA confirmed that both placeholders read naturally beneath the bilingual event headings, without clipping, collision, or hierarchy change.

Post-edit structure readback:

- native editable text nodes: `19`
- IMAGE fill nodes: `0`
- text outside production root: `0`
- root remains `1400 × 1980`, `clipsContent=true`
- all variable/final note copy remains native editable text; no rasterization or flattened timetable was introduced.

Decision: `SELLABLE_VISUAL_QA_PASS` remains valid and the semantic placeholder presentation is cleaner. No Drive asset write was required.

## Fact QA

- [x] date is exactly `2026.10.24 SAT`
- [x] location is exactly `YOKOHAMA`
- [x] ceremony is exactly `14:10–14:40`
- [x] reception is exactly `15:00–17:30`
- [x] unconfirmed interval remains explicit `TBD · LAYOUT DUMMY` in working production
- [x] no invented reception/opening/departure/after-party time is exported as confirmed copy

## Structural QA

Current promoted production evidence:

- [x] one semantic production frame
- [x] all required text remains native and editable
- [x] decorative/route geometry remains native vector/shape construction
- [x] no flattened timetable raster
- [x] no missing or duplicated semantic event node observed in production
- [x] production remains `1400 × 1980`; vendor/A2-A3 output mapping remains deferred rather than guessed

Post-promotion structure readback recorded in the reopened evidence and refreshed after the semantic-placeholder correction:

- native editable text nodes: `19`
- IMAGE fill nodes: `0`
- hidden bleed / trim / safe guides retained
- text outside production root: `0`

## Readability QA

Review at:

1. whole-board thumbnail
2. reading scale
3. actual/detail-scale production screenshot
4. final physical 1.5–2 m viewing-distance proof before print

Pass conditions currently satisfied digitally:

- Ceremony and Reception times are readable before decorative detail
- title does not compete with times
- transfer/TBD row cannot be mistaken for a confirmed event
- Japanese and English labels remain legible
- no essential text visibly collides with the current composition
- no critical rule disappears in the live screenshot

## Editorial QA

Reject when:

- layout reads as a web dashboard
- every event has an identical rounded card
- airport iconography is repeated mechanically
- dark navy overwhelms the board and reduces wedding warmth
- empty space is filled with meaningless stamps
- route line crosses time or label text
- visual metaphor implies false gate, terminal, flight or operational information

Fresh 2026-08-12 visual review did not trigger these rejection conditions after the placeholder correction.

## Screenshot-driven correction protocol

1. capture full frame
2. identify at most three load-bearing defects
3. fix those defects only
4. capture post-fix frame
5. remove additions that create overlap or hierarchy noise

## Print gate

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` is not `PRINT_READY`.

Before print:

- exact vendor dimensions and bleed
- final confirmed transfer/activity information
- final font availability
- PDF font embedding/output review
- actual-size physical proof
- venue placement and approximately 1.5–2 m viewing-distance check
