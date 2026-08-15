# 青春ふたりきっぷ — zero-reuse clean-room V4/V5 study

Date: 2026-08-15
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_CANDIDATE / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main`, Current `docs/automation/non-rurubu-figma-quality-current.md`.
Figma: `v7rIRHv8YKQXG0LYD0I5OA`.
Drive: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`.

## Verified non-visual inputs only

The rebuild used only the current fixed-copy authority `FIGMA-COPY.json` and the physical frame size from current item authority:

- size: `720×250`;
- title: `青春ふたりきっぷ`;
- subtitle: `WEDDING JOURNEY TICKET`;
- route: `新郎駅 → 新婦駅 → 未来行き`;
- date: `2026.10.24`;
- issue number: `No.1024`;
- phrase: `旅のはじまりは、あなたと。`.

All authoritative copy remains native Figma text. No retained frame, layout group, rail, linework, stamp, texture, image crop, generated asset or old SVG was copied into either new candidate.

Hybrid split: native text for all copy; newly authored editable SVG/vector for fixed non-semantic graphics; raster/generated image roles 0; Drive writes 0.

## V4 — retained clean-room study

Section: `50:2 / RETAINED STUDY / SEISHUN FUTARI / V4 TIMETABLE STRIP / 2026-08-15`.
Frame: `50:3 / V4 / TIMETABLE STRIP / 720x250`.

V4 was built before opening retained production for comparison.

Art direction established from blank:

- narrow date-index field;
- native title/subtitle/route/phrase/issue copy;
- new editable `VECTOR / EDITABLE JOURNEY WEAVE`;
- restrained print edge and route baseline;
- no train illustration, old texture, old route graphics, old stamp, old badge or old crop was imported.

During QA one unsupported visual filler, `2名さま`, was removed because it was not present in the current fixed-copy authority. The final V4 structure reads:

- `720×250`;
- native text nodes `7`, visible `6`;
- IMAGE fills `0`;
- vector-ish nodes `7`;
- outside visible text `0`;
- `clipsContent=true`.

Three-scale QA:

- thumbnail `240×84`: PASS;
- reading `500×174`: PASS;
- actual size `720×250`: PASS.

Completion-only comparison then showed that retained production still carried stronger immediate rail-ticket narrative, so V4 was not promoted and remains a preserved study.

## V5 — selected clean-room candidate

Section: `52:24 / SELECTED CLEANROOM / SEISHUN FUTARI / V5 ARCHIVAL COUPON / LEGACY PRESERVED / 2026-08-15`.
Frame: `52:25 / V5 / ARCHIVAL JOURNEY COUPON / 720x250`.

V5 is a materially different blank-frame direction. Its visual identity is an archival coupon / date-inspection artifact rather than V4's timetable strip:

- top off-register ink band;
- narrow right print band;
- newly authored editable `VECTOR / EDITABLE DATE SEAL`;
- fixed route rendered as native typographic cadence, not raster/vector lettering;
- small crop cues as functional print-artifact detail;
- no image fill and no generated raster.

Structure readback:

- `720×250`;
- native text nodes `10`, visible `10`;
- IMAGE fills `0`;
- vector-ish nodes `9`;
- outside visible text `0`;
- `clipsContent=true`.

Verified visible native copy and sizes:

- subtitle `WEDDING JOURNEY TICKET` — 9px;
- title `青春ふたりきっぷ` — 34px;
- route station labels — 15px; arrows — 13px;
- phrase — 13px;
- issue `No.1024` — 10px;
- date `2026.10.24` — 13px.

Three-scale QA:

- thumbnail `240×84`: PASS; title/date seal/route survive while microcopy correctly subordinates;
- reading `500×174`: PASS;
- actual size `720×250`: PASS;
- text outside root: 0.

Current fixed copy is not dynamic, so no fabricated long-copy replacement was used as visual-completion evidence. Historical long-copy tests remain structural history only.

## Completion comparison

Retained production `11:2` was opened only after the first blank candidate was fully authored and QA'd; it remains untouched and preserved.

At thumbnail scale retained production's fine route/metadata detail loses more hierarchy, while V5 keeps title, route and date-inspection role legible as the first reads. At actual size, retained production remains a valid rail-ephemera interpretation, but V5 provides a cleaner contemporary print-product hierarchy without using literal train art or copying retained route-line/stamp/texture grammar.

Decision: V5 is selected as the current zero-reuse clean-room candidate and receives `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` for the reopened visual audit. Retained production remains intact as reference/rollback/history; V4 remains as an independent study.

## Asset / Drive state

Drive authority live readback: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`.

- new generated raster: 0;
- Drive writes: 0;
- newly authored vector roles remain editable in Figma;
- no variable/factual copy is baked into SVG/raster.

## Next target

Proceed to `ADD-01 ウェルカムボード` as a fresh blank-frame clean-room rebuild. Do not use retained ADD-01 production as visual reference during construction; preserve it for completion-only comparison.
