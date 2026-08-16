# ADD-02 11卓の国別テーブルサイン — V10 editorial hero clean-room study

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / V10_HIGH_RES_COMPOSED_RASTER_PASS / TWO_CANDIDATES_TESTED / LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_MIXED / NO_PROMOTION / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Start main SHA: `efd2b120af963f494cdd3d9a3345f40cd3ed0bea`.
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Purpose

V9 verified the photo/type role split but was blocked by deliberately tiny raster resolution. V10 tested the next bounded clean-room method without reopening old production during authoring: create genuinely high-resolution fixed hero artwork inside Figma, flatten only that fixed art to one raster image role, and keep all semantic copy native and editable.

This run does not promote production. It verifies the actual-size raster path and tests whether richer destination art alone is enough to beat the retained Hawaii production.

## Clean-room boundary

Before retained production was opened, a new page was created from a blank state:

- `63:2 / CLEANROOM / ADD-02 / V10 EDITORIAL HERO / 2026-08-16`
- `63:44 / STUDY / ADD-02 / V10 EDITORIAL HERO / PRE-LEGACY-COMPARISON / 2026-08-16`

No old production frame, V3/V5/V6/V7/V8/V9 frame, old image, crop, vector, badge, rail, or background composition was copied into the new candidates. Only the verified non-visual requirements from SPEC were used: 1000×1480 working size, Hawaii as destination 01, volcanic/ocean/coral art direction, native table/destination/note/date roles, long-copy safety, and print-oriented hierarchy.

## V10 candidates

Two materially different blank-frame Hawaii candidates were authored before retained production comparison.

### A — volcanic coast screenprint

- root: `63:26 / COMPARE_ONLY / V10 / HAWAII / A / VOLCANIC COAST SCREENPRINT`
- hero role: `63:27 / IMAGE / HAWAII HERO / COMPOSED HIGH-RES / REPLACEABLE`
- raster hash: `5565b077fa10b098d4899dc800789b620750a3f4`
- exported PNG bytes before image creation: `665,498`
- source artwork authored at 1000×800 and exported at 2× before flattening
- final candidate keeps only one image role plus native semantic text

Direction: warm coral sun, volcanic black ridge, ocean blue/turquoise field, wave contour, restrained paper/grain marks. It is intentionally a print/editorial illustration rather than a literal stock-photo imitation.

### B — archival ocean atlas

- root: `63:35 / COMPARE_ONLY / V10 / HAWAII / B / ARCHIVAL OCEAN ATLAS`
- hero role: `63:36 / IMAGE / HAWAII HERO / COMPOSED HIGH-RES / REPLACEABLE`
- raster hash: `fdb97f6b920c9ab8fbc81fe70337fbac9ac55210`
- exported PNG bytes before image creation: `886,203`
- source artwork authored at 1000×800 and exported at 2× before flattening
- final candidate keeps only one image role plus native semantic text

Direction: deep ocean atlas field, volcanic contour silhouette, coral geology line, circular chart motif, wave-line engraving. This version is darker, more archival and more editorial than A.

## Hybrid authoring split

Both candidates use the same semantic boundary without sharing old production design items:

- fixed hero artwork: one composed raster IMAGE role;
- table index `01`: native editable text;
- destination `Hawaii`: native editable text;
- Japanese support `ハワイ`: native editable text;
- country note: native semantic placeholder `[国テーマ説明文 · LAYOUT DUMMY]`;
- date: native editable text;
- small editorial rule: simple native functional vector;
- factual/variable text baked into raster: `0`.

The fixed source art was temporary only: it was exported with `exportAsync`, converted with `figma.createImage(bytes)`, then removed so it did not become a hidden second production authority.

## Screenshot QA before retained comparison

Both original candidates were inspected at native `1000×1480` actual-size screenshot scale after an initial structure defect was repaired.

Initial defect:

- `TEXT / INFO STACK` had been resized after setting auto-layout, leaving its frame height at `10px` and visually clipping the native text.

Repair:

- restore `primaryAxisSizingMode=AUTO`;
- retain fixed 860px width;
- set `clipsContent=false`;
- re-screenshot both candidates.

Post-repair result:

- native typography renders normally;
- one fixed hero image only;
- lower paper field remains quiet and editable;
- no variable copy is rasterized;
- image itself is no longer the actual-size bottleneck seen in V9.

## Long-copy stress

Hidden stress clones were created only after the V10 originals were complete and before retained production was opened:

- `64:2 / QA / LONG NOTE STRESS / ... A ... / HIDDEN`
- `64:11 / QA / LONG NOTE STRESS / ... B ... / HIDDEN`

Each stress clone replaced the note with a materially longer Japanese layout-dummy paragraph.

Readback for both A and B:

- root: `1000×1480`;
- visible native text count: `5`;
- IMAGE fill count: `1`;
- visible text outside root: `0`;
- `TEXT / INFO STACK`: `x70 / y860 / w860 / h337`;
- stack bottom: `1197 / 1480`.

Result: `LONG_COPY_STRESS_PASS` for both candidates.

## Completion-only retained comparison

Only after V10 creation, actual-size screenshot QA and long-copy stress were complete was retained Hawaii production opened:

- retained Hawaii: `31:275 / QA_CURRENT_FRAME_TABLE_SIGN_HAWAII`.

Comparison result:

### What V10 improves

- fixed hero raster is now genuinely sharp enough for native-size visual inspection;
- art has more continuous visual depth than the low-resolution V9 study;
- variable text remains cleanly separated from fixed art;
- both candidates read as purpose-built print graphics rather than dashboard/card UI;
- candidate B in particular has stronger material/editorial atmosphere than previous abstract-raster attempts.

### Why V10 is not promoted

Retained Hawaii still has a stronger immediate destination hierarchy at distance: the large `HAWAII` title and table identifier are picked up faster in the retained production. V10 makes the hero art richer, but the destination name sits primarily in the lower paper field; therefore material depth improved without creating a clear whole-item sellable win.

The correct conclusion is not to make another decorative raster variant after seeing retained production. Any next V11 clean-room direction must begin in a fresh run from facts/constraints only and must solve destination-name/table-index hierarchy together with the fixed visual field before any retained comparison.

## Drive / provenance

Drive authority was read back live before Figma authoring:

- folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- current files included the earlier V6 France comparison master and archival print-grain master.

No new Drive file was written in this run. The available Drive upload action requires a connector/runtime `file_uri`; the new in-Figma raster bytes could not be truthfully materialized as that supported file reference. Therefore no false Drive-master claim is made.

The V10 hero art is original composed artwork authored inside Figma in this run; no external photo or prior ADD-02 visual asset was adopted.

## Method conclusion

Status: `VERIFIED_LOCAL` for high-resolution in-file composed-raster authoring, but `COMPARE_ONLY` for the Hawaii visual candidates.

Verified:

- a 2× exported composed hero can remove the V9 low-resolution blocker;
- fixed visual art can be flattened into one replaceable IMAGE role while semantic copy stays native;
- long-copy reflow remains safe;
- actual-size screenshot quality of the image role is no longer the immediate technical blocker.

Not verified:

- high-resolution raster depth by itself does not guarantee stronger sellable hierarchy;
- neither V10 A nor V10 B clearly beats retained Hawaii production;
- no production promotion or 11-destination rollout is justified yet.

## Next safe action

On a future fresh clean-room run, without opening retained production first:

1. build one materially different Hawaii candidate where destination name + table index + fixed hero are designed as one hierarchy from the blank frame;
2. keep semantic copy native and fixed art isolated;
3. repeat actual-size + long-copy + replacement QA;
4. only then open retained production for comparison;
5. expand to another destination only if the representative truly wins.

No retained production node was modified or overwritten.