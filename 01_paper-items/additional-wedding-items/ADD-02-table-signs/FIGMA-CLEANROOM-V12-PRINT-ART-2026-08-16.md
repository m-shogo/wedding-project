# ADD-02 11卓の国別テーブルサイン — V12 print-art clean-room study

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / V12_PRINT_ART_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_MIXED / NO_PROMOTION / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Observed main SHA before Git write: `95bbd2641e88ee31a069a9bb53fcf601e027314b`.
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Purpose

V11 showed that hierarchy-first integration solved much of the `HAWAII + 01` pickup problem, but the fixed visual was still weaker than retained production. This run tested a materially different print-art method without reusing retained production or prior clean-room design items: one newly authored editable SVG fixed-art field plus five native semantic text roles.

A public-domain/CC0 Hawaii photography route was researched as a possible source-quality method, but the Figma Plugin runtime exposes no global `fetch`, so direct remote-image ingestion failed atomically before any canvas write. The failed transport path was not retried. The run switched method to new editable SVG print art rather than faking an imported photo or reusing a previous ADD-02 asset.

## Clean-room boundary

Before retained production was opened, a new blank page was created:

- `71:2 / CLEANROOM / ADD-02 / V12 PRINT ART / 2026-08-16`

No retained production node, V5–V11 node, prior crop, prior generated asset, prior vector, rail, badge, or background composition was copied into V12.

Only verified non-visual requirements were used:

- working root: `1000×1480`;
- destination: Hawaii / table `01`;
- country name, Japanese label, description placeholder, date and table number remain native text;
- fixed non-semantic visual may be a composed/editable SVG;
- long-copy tolerance and outside-root text safety remain required.

## Candidates

### A — Engraved Coast

- root: `71:3 / V12 / HAWAII / A / ENGRAVED COAST`;
- fixed art: `71:4 / VECTOR / HAWAII / ENGRAVED COAST / EDITABLE SVG`;
- direction: archival engraving / wave-line print field, muted paper palette, integrated large native `HAWAII` and native `01`;
- native semantic text roles: `5`;
- raster/image roles: `0`;
- variable/factual copy baked into fixed art: `0`.

### B — Screenprint Field

- root: `71:63 / V12 / HAWAII / B / SCREENPRINT FIELD`;
- fixed art: newly authored editable SVG with bolder screenprint geometry;
- native semantic text roles: `5`;
- raster/image roles: `0`;
- variable/factual copy baked into fixed art: `0`.

B was visually weaker in pre-comparison thumbnail review because its mountain/sun geometry read more generically and the country identity depended too heavily on typography. It remains comparison evidence only.

## Pre-comparison screenshot QA

Candidate A was reviewed before retained production at:

- whole-item / thumbnail: `338×500` render from the `1000×1480` root;
- actual-size / detail: native `1000×1480` render.

Observed strengths before retained comparison:

- `HAWAII` and `01` both survive thumbnail scale;
- fixed art and native semantic information remain visually and structurally separate;
- no admin-card / rounded-card / web-UI system appears;
- the upper field reads as one print artifact rather than a stack of functional Figma primitives.

Observed weakness:

- the lower information field remains deliberately quiet and still depends on final real copy for its ultimate editorial density.

## Long-copy stress

Hidden pre-legacy stress clone:

- `72:2 / QA / V12 A / LONG NOTE STRESS / PRE-LEGACY`.

The native country-note role was replaced with a materially longer Japanese layout-dummy paragraph.

Verified geometry after stress:

- root: `1000×1480`;
- visible native text: `5`;
- image roles: `0`;
- visible text outside root: `0`;
- note: `x72 / y1065 / w790 / h176`;
- note bottom: `1241`;
- date top: `1388`;
- note→date gap: `147px`.

Result: `LONG_COPY_STRESS_PASS`.

## Completion-only retained comparison

Only after V12 candidate construction, thumbnail review, actual-size review and long-copy stress were complete was retained Hawaii opened:

- `31:275 / QA_CURRENT_FRAME_TABLE_SIGN_HAWAII`.

Comparison result: `LEGACY_COMPARISON_MIXED`.

V12 A improves:

- destination-specific print-art character compared with the more generic procedural landscape attempts;
- first-glance integration of `HAWAII` and `01`;
- decorative complexity is contained in one understandable editable SVG role;
- the candidate feels more like a designed print artifact than a UI composition.

Retained production remains stronger in:

- overall editorial restraint and finish;
- economy of hierarchy at reading scale;
- confidence of lower-field information composition with less unused vertical space.

Therefore V12 A is **not promoted**. Retained production is unchanged and preserved.

## Drive / provenance

Drive authority was read back live. Existing image children include the prior France comparison PNG and archival grain master. No new Drive file was written because V12 uses newly authored editable SVG fixed art inside Figma and no adopted external binary asset exists.

A CC0 Wikimedia Commons Hawaii photograph was researched only as a potential method/source-quality direction. It was not imported into Figma and is not claimed as a production asset.

## Method conclusion

Status: `VERIFIED_LOCAL` for the bounded capability, `COMPARE_ONLY` for the visual candidate.

Verified:

- a single composed editable SVG can raise print-art character without native micro-geometry overload;
- hierarchy-first native semantic text remains robust over fixed art;
- long-copy stress still passes with a 147px note→date gap;
- remote binary transport is not available through global `fetch` in the current Figma Plugin runtime, so that path must not be repeated without a material capability change.

Not verified:

- V12 does not clearly beat retained production overall;
- the result does not justify 11-destination rollout or production promotion.

## Next safe action

Do not produce another near-variant of the same Hawaii vector landscape. The remaining defect is lower-field editorial resolution and fixed-art source quality, not basic structural correctness. On a future fresh clean-room run, either test a genuinely different high-quality fixed visual transport/source path if a new capability becomes available, or move to a non-landscape print-art grammar that does not repeat schematic destination scenery. Preserve all retained and clean-room evidence.