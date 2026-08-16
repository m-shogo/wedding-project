# ADD-02 11卓の国別テーブルサイン — clean-room V8 destination-semantic study

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / V8_DESTINATION_SEMANTIC_COMPARE_ONLY / LONG_COPY_STRESS_PASS / LEGACY_STILL_STRONGER / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Start main SHA: `6549dab736af94b74ab1e595c8510d8992787118`.
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Purpose and method switch

V7 proved that a true full-resolution in-file raster can be created without external binary transport, but abstract color/blur atmosphere still did not beat retained production. V8 therefore changed the visual method rather than repeating another abstract raster pass.

The bounded hypothesis was:

> destination-semantic non-person detail such as landscape, architecture, timber/shoji structure, arcade material, volcanic coastline and site-specific spatial cues may add enough identity and editorial depth to beat an abstract-only atmosphere while variable copy stays native.

No old production, V3, V5, V6 or V7 visual node was opened during V8 authoring and pre-comparison QA. Only verified facts/constraints were used: `1000×1480`, destination identity/order, table index, native destination text, native country-note placeholder, date and the clean-room/hybrid authoring rules.

## New clean-room page and candidates

New page:

- `55:2 / CLEANROOM / ADD-02 / V8 DESTINATION DETAIL / 2026-08-16`
- section `55:560 / COMPARE_ONLY / V8 / DESTINATION-SEMANTIC RASTER STUDY / LEGACY STILL STRONGER`

Representative roots created from blank frames:

- `55:3 / COMPARE_ONLY / V8 / HAWAII / VOLCANIC COAST`
- `55:188 / COMPARE_ONLY / V8 / ITALY / ARCADE & TRAVERTINE`
- `55:355 / COMPARE_ONLY / V8 / JAPAN / TIMBER & SHOJI SHADOW`

Each candidate uses one full-canvas composed raster produced inside Figma from temporary clean-room artwork, then flattened through `exportAsync(PNG @ 1x) -> figma.createImage(bytes)` and the temporary source removed.

Raster evidence:

- Hawaii image node `55:182`, hash `a72b68d7e638f783d02eb1cb0e12495a524d61c5`, exported bytes `39,067`;
- Italy image node `55:349`, hash `12b574078aa3930d232a7d98a83946824436aa4f`, exported bytes `44,011`;
- Japan image node `55:554`, hash `f0446e1ba8be53a81cb2065d5075bb30335c090c`, exported bytes `37,417`.

The semantic text roles remain independently editable and are not baked into the raster:

- `TEXT / TABLE INDEX`
- `TEXT / DESTINATION EN`
- `TEXT / DESTINATION JP`
- `TEXT / COUNTRY NOTE`
- `TEXT / DATE`

A native `TEXT / INFO STACK` was added for Japanese support / country-note / date so variable text mass pushes following copy structurally instead of relying on independent absolute coordinates. A simple lower `TEXT SUPPORT / LOWER PAPER FIELD` isolates variable copy from busy fixed imagery without rasterizing semantic text.

## Pre-comparison visual QA

Three-scale review was performed before opening retained production:

- family/thumbnail: section `55:560`;
- reading scale: individual candidate screenshots;
- actual-size/detail: native `1000×1480` roots.

Observed candidate-specific results:

- **Hawaii:** volcanic ridge/coast/palm material made the destination meaning more explicit than V7 abstract atmosphere, but the illustrative raster still read coarse and the lower title/info transition was less resolved than a professional final sign.
- **Italy:** arcade/travertine/terracotta cues created the clearest V8 destination identity and the strongest material depth of the three, but the composition remained more literal and less graphically disciplined than the retained design.
- **Japan:** timber/eave/shoji/shadow cues were semantically clear, but the literal architectural treatment weakened the quiet graphic authority expected from the sign family.

No V8 root was promoted during pre-comparison QA.

## Long-copy stress

Hidden stress clones were made only from the new V8 roots:

- `57:2 / QA / LONG COPY STRESS / ... HAWAII`
- `57:11 / QA / LONG COPY STRESS / ... ITALY`
- `57:20 / QA / LONG COPY STRESS / ... JAPAN`

A long Japanese layout dummy was inserted into `TEXT / COUNTRY NOTE`.

Readback for all three:

- root: `1000×1480`;
- native text count: `5`;
- visible text outside root: `0`;
- `TEXT / INFO STACK` bottom: `1420 / 1480`;
- variable text baked into raster: `0`.

Result: `LONG_COPY_STRESS_PASS`.

## Completion-only retained comparison

Only after V8 authoring, screenshot QA and long-copy stress were complete, retained production was opened:

- Hawaii `2:2`;
- Italy `2:11`;
- Japan `2:47`.

Result:

- **Hawaii:** V8 increases literal destination semantics, but retained production has materially better long-distance hierarchy, cleaner typography, stronger table-number balance and a more sellable graphic finish.
- **Italy:** V8 has stronger architectural/material literalness, but retained production remains more edited, more legible as a table sign and visually more confident.
- **Japan:** retained production is clearly stronger. V8 becomes too illustrative and loses the retained version's restrained hierarchy and negative-space authority.

All three V8 candidates remain `COMPARE_ONLY`. Retained production was not edited, overwritten or deleted.

## Learning / failure fingerprint

Observed failure fingerprint:

`DESTINATION_SEMANTIC_LITERALISM_WITHOUT_ART_DIRECTION`

Meaning:

> Adding recognizable architecture/landscape/material detail can improve destination specificity, but literal procedural illustration can still reduce sellable graphic quality when typography, hierarchy, negative space and editorial restraint are weaker than the retained design.

This is different from the V7 `ABSTRACT_RASTER_ATMOSPHERE_NOT_SUFFICIENT_FOR_PROMOTION` result. Together they narrow the next method:

- do not return to abstract color-field/blur-only raster;
- do not scale procedural literal illustration across all 11 destinations;
- next visual test should use a materially stronger authored/generated/photographic-or-illustrative non-person destination asset with enough art-direction quality to preserve hierarchy and print sophistication;
- retain native text and structural text-fit behavior from V8;
- test only a small representative subset before family rollout.

## Current declaration

`SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V5_11_SIGN_STRUCTURAL_PASS / V6_FRANCE_RASTER_DEPTH_VERIFIED_LOCAL / V7_INFILE_FULL_RES_RASTER_TRANSPORT_VERIFIED_LOCAL / V8_DESTINATION_SEMANTIC_DETAIL_TESTED_LOCAL / V8_COMPARE_ONLY / LEGACY_STILL_STRONGER / LEGACY_PRESERVED / NOT_PRINT_READY`
