# ADD-02 11卓の国別テーブルサイン — V13 non-landscape clean-room study

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / V13_NON_LANDSCAPE_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_LOSS / NO_PROMOTION / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Observed latest main immediately before this write: `54733728652075a974c5d61e8342bc4d5715447b`.
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Purpose

V12 concluded that another near-variant of the same schematic Hawaii landscape would be low-value. V13 therefore switched to a **non-landscape print-art grammar** while preserving the clean-room rule: old production and V5–V12 visual nodes were not opened during authoring or pre-comparison QA.

Only verified non-visual requirements were used:

- working root `1000×1480`;
- destination Hawaii / table `01`;
- table number, country name, Japanese label, country-note placeholder and date remain native editable text;
- unknown descriptive copy remains explicit layout dummy;
- old production remains untouched.

## Fresh clean-room page

Created from blank:

- page `74:25 / CLEANROOM / ADD-02 / V13 NON-LANDSCAPE PRINT ART / 2026-08-16`;
- Candidate A `74:26 / V13 / HAWAII / A / BOTANICAL PRESS`;
- Candidate B `74:50 / V13 / HAWAII / B / MATERIAL LEDGER`.

No retained production node, prior crop, prior generated asset, prior vector, prior layout group, rail, badge or background composition was copied into V13.

## Candidate A — Botanical Press

Direction:

- dark vertical ink field;
- abstract pressed botanical stems/leaves as fixed non-semantic decoration;
- native `01`, `HAWAII`, `ハワイ`, country-note placeholder and date.

Pre-comparison thumbnail review found the direction **too sparse and too dependent on generic botanical atmosphere**. It did not justify retained comparison as the lead candidate and remains rejected comparison evidence only.

## Candidate B — Material Ledger

Direction:

- oversized native `01 + HAWAII` first-glance field;
- three large material-color blocks rather than scenery;
- horizontal print-register rules;
- small `DESTINATION TABLE` editorial role label plus a native Japanese support line;
- country-note placeholder and date kept native.

A first screenshot revealed that the native info auto-layout retained Figma's default white frame fill and that the text nodes had `textAutoResize=NONE`, causing a white-box artifact and under-sized text geometry. This was repaired **before any retained-production comparison**:

- `TEXT / INFO STACK` fill removed;
- note/date text restored to `textAutoResize=HEIGHT`;
- Candidate B density refined without importing any prior visual.

Post-repair reading screenshot showed a clear `01 → HAWAII → material field → editorial support → note/date` hierarchy and no web-card composition.

## Long-copy stress

Hidden pre-legacy clone:

- `75:5 / QA / V13 B / LONG NOTE STRESS / PRE-LEGACY`.

The country-note role was replaced with a materially longer Japanese layout-dummy paragraph.

Verified geometry:

- root `1000×1480`;
- stack `x64 / y1120 / w872 / h245`;
- note height `192`;
- date begins at stack-local `y216`;
- stack bottom `1365 / 1480`;
- note/date remain structurally separated by auto-layout;
- no production node was changed.

Result: `LONG_COPY_STRESS_PASS`.

## Completion-only retained comparison

Only after Candidate B construction, repair, reading-scale review and long-copy stress were complete was retained Hawaii opened:

- retained production `31:275 / QA_CURRENT_FRAME_TABLE_SIGN_HAWAII`.

Result: `LEGACY_COMPARISON_LOSS` for V13 B.

V13 B improves over prior schematic-landscape experiments in:

- avoiding literal procedural scenery;
- clear first-glance `01 + HAWAII` pickup;
- simple semantic/native structure;
- more controlled material-led print grammar.

Retained production remains materially stronger in:

- destination-specific visual identity;
- integration of Hawaii/Japanese label/table number into one editorial artifact;
- economy of negative space;
- lower-field information resolution;
- overall finished-product confidence.

Therefore V13 A/B are **not promoted**. Retained production is unchanged and preserved.

## External source-quality check

A genuinely different source-quality path was checked after the V13 comparison: Wikimedia Commons file `Diamond head, hawaii, honolulu.jpg` is an original `3024×4032` JPEG published by its copyright holder under **CC0 1.0**, which permits commercial reuse and modification without asking permission. This confirms that a rights-safe high-resolution source exists for a future bounded photo-led test.

However, the current runtime still lacks a working binary bridge from the web result into the exact Drive/Figma asset flow. The image was **not** claimed as imported, saved, placed or production-ready. Do not repeat remote-image ingestion until the transport capability materially changes.

## Drive

The exact authority folder was read back live:

- `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

No Drive asset was added in this run because neither V13 candidate was adopted and no web binary was successfully transported.

## Conclusion / next safe action

V13 closes another method branch:

- landscape/vector variants: insufficient;
- abstract raster/material depth alone: insufficient;
- literal destination illustration: insufficient;
- **non-landscape generic material grammar: also insufficient when it loses destination-specific visual identity**.

Do not produce another cosmetic Hawaii V14 using the same generic swatches, botanical blocks, schematic landscapes or low-value SVG micro-geometry. The next high-value ADD-02 experiment requires a materially changed capability: a rights-safe high-resolution destination-specific source that can actually pass through Drive/Figma as a replaceable image role while preserving native text.

Until that transport capability changes, keep ADD-02 `SELLABLE_VISUAL_QA_REOPENED`, preserve production, and avoid filler iterations.