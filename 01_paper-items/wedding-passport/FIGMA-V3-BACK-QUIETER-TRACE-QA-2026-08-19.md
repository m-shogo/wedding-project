# WEDDING PASSPORT V3 — back quieter trace QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V3_BACK_QUIETER_TRACE_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- production back: `144:26 / V3 / BACK / ARCHIVAL END NOTE`
- long-copy stress: `145:29`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Visible problem

The lower fixed route trace remained visually dominant after prior grid/endpoint subtraction. At whole-item and reading scales it competed with the date/issue block and made the lower field feel more like a plotted interface than a quiet archival end note.

## Bounded comparison

A rollback-safe duplicate `172:2 / QA / V3 BACK / DEEPER QUIETER TRACE COMPARISON_2026_08_19` changed only the fixed vector role `VECTOR / LOG GRID TRACE`:

- previous geometry: `x=300, y=1340, 1050×520`
- comparison/adopted geometry: `x=430, y=1510, 900×446`

No copy, date, issue placeholder, field boundary, palette, typography, route text, or semantic role changed. No image generation or Drive write was needed.

## Result

The smaller/deeper trace is subordinate to the message and issue information while retaining the archival journey cue. The lower green field reads more like a physical end-note page and less like a chart/dashboard surface.

## QA

- whole-item / thumbnail: PASS
- reading scale: PASS
- actual-size native `1480×2100`: PASS
- production and long-copy stress use the same adopted trace geometry
- native variable text remains editable
- raster/generated imagery added: `0`
- variable facts baked into vector/raster: `0`
- old production and comparison history preserved

Rollback nodes:

- `172:19 / ROLLBACK / V3 BACK PRE_QUIETER_TRACE_2026_08_19`
- `172:36 / ROLLBACK / V3 BACK STRESS PRE_QUIETER_TRACE_2026_08_19`

Comparison `172:2` is retained hidden after adoption.

## Learning status

No new shared rule is promoted. This is a local application of existing principles: fixed decoration must remain subordinate to semantic hierarchy, and retained geometry should prove a whole-item binding/art-direction function rather than behaving like interface scaffolding.

## Deferred finalization

Final factual copy, printer/vendor export settings, physical proof, and any vendor-specific finishing requirements remain deferred. No new blocker was introduced.
