# ADD-03 — Placeholder Hierarchy Polish — 2026-08-13

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / NOT_PRINT_READY`

Authority before write:
- `main`: `60e7ef43d3540808dbb992f4b62a0823f2224cb3`
- Current: `VISUAL_REOPENED / FIGMA_EDIT_ALLOWED`
- Figma: `woFUHUqZcvNkih8o42xeH4 / 1:5`
- Drive: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j`

Fresh 1400×1980 visual review found that `[挙式案内 · LAYOUT DUMMY]`, `TBD · LAYOUT DUMMY / ご案内`, and `[披露宴案内 · LAYOUT DUMMY]` still gave proof metadata too much guest-facing weight.

Rollback proof: `10:2 / ROLLBACK_ADD03_PLACEHOLDER_TEXT_PRE_HIERARCHY_2026_08_13` on `99_QA`, hidden.

Production changes, native text only:
- `6:43`: `[挙式案内] · LAYOUT DUMMY`; suffix 11px muted gray at 0.70 opacity.
- `6:46`: factual state remains `TBD`; only `LAYOUT DUMMY` is reduced to 10px muted gray at 0.70 opacity. No event was invented.
- `6:52`: `[披露宴案内] · LAYOUT DUMMY`; suffix 11px muted gray at 0.70 opacity.

Post-write actual-size screenshot: PASS. Ceremony/reception times remain dominant; the sand TBD row remains visibly unconfirmed; proof metadata now reads as metadata rather than event copy.

Structure readback: 1400×1980, `clipsContent=true`, native text 19, visible text 18, IMAGE fills 0, visible text outside root 0, rollback hidden, no flattening/raster text replacement.

Image generation: not required. Drive writes: 0.

## 2026-08-14 fresh editorial de-template polish — kicker removal

Observed latest `main` immediately before this evidence write: `bd024071b99dfabc281704e480ccde611f2c83c0`.

Fresh 1400×1980 production screenshot showed that the current itinerary composition remains sellable, but `WEDDING DAY / ITINERARY` under the Japanese title was redundant English filler. The Japanese `本日の旅程`, factual date/city rail and the bilingual ceremony/reception labels already communicate the role; the extra kicker made the top hierarchy feel more like a template.

Rollback-safe proof created before mutation:
- `11:2 / ROLLBACK_ADD03_PRE_KICKER_REMOVAL_2026_08_14`, hidden on `99_QA`.

Production root remained `1:5`. Only `6:37 / TXT_V2_KICKER` was hidden. No date, time, city, ceremony/reception copy, TBD state, semantic placeholder, geometry, color field or layout structure changed.

Post-write actual-size screenshot: PASS. The Japanese title now owns the top hierarchy more cleanly, while the event sequence, 14:10–14:40 ceremony, unresolved 14:40–15:00 interval, and 15:00–17:30 reception remain unchanged and easy to scan.

Structural readback:
- root: 1400×1980, `clipsContent=true`;
- native text nodes: 19 total / 17 visible;
- IMAGE fill nodes: 0;
- visible text outside root: 0;
- `6:37` reads back `visible=false`;
- no text flattening or raster replacement.

Drive authority was live-read before the Figma write and remains `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`; Drive write 0.

Image decision: `IMAGE_GENERATION_NOT_REQUIRED`. The screenshot-supported defect was non-semantic English filler, not missing imagery.

Current result remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / NOT_PRINT_READY`.