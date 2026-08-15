# ADD-02 11卓の国別テーブルサイン — clean-room V6 raster-depth method switch

Date: 2026-08-16
State: `SELLABLE_VISUAL_QA_REOPENED / V6_REPRESENTATIVE_METHOD_TEST / FRANCE_RASTER_DEPTH_VERIFIED_LOCAL / ITALY_COMPARE_ONLY / JAPAN_REJECTED_DEPTH_INSUFFICIENT / LONG_COPY_REFLOW_REPAIRED / LEGACY_PRESERVED / NOT_PRINT_READY`

Authority: latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`.
Start main SHA: `d0cc698a14b578bb480720838885ed95a6b27163`.
Figma: `LAZAZ0u3RGqtN4bYFPZ3pU`.
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`.

## Why the method changed

V3 and V5 independently reached structurally sound vector/composed-SVG clean-room families but both failed to clearly beat retained production across the whole set. V5 isolated the remaining defect as destination-specific material/editorial depth rather than basic layout structure. Under the shared failure-fingerprint rule, this run did not make another vector-only V6. It switched to a bounded pixel/composed-raster test on three representative destinations only: Italy, France, and Japan.

This is a capability/method experiment, not a production-family promotion.

## Clean-room boundary

A new Figma page was created before opening retained production:

- `45:2 / CLEANROOM / ADD-02 / V6 IMAGE DEPTH / 2026-08-16`
- `45:3 / V6 / POST-COMPARISON / RASTER DEPTH METHOD TEST`

Representative roots were created as blank `1000×1480` frames:

- `45:4 / COMPARE_ONLY / V6 ITALY RASTER MATERIAL / LEGACY STILL STRONGER`
- `45:6 / CANDIDATE / V6 FRANCE RASTER FOLD / METHOD VERIFIED LOCAL`
- `45:8 / REJECTED / V6 JAPAN WASHI / DEPTH INSUFFICIENT`

No retained production frame, V3/V5 frame, old SVG, old generated image, crop, badge, rail, or background composition was copied or visually referenced while these candidates were authored. Only verified non-visual requirements were used: representative destination identity/order, `1000×1480` working trim, table index, destination naming roles, native editable country-note placeholder, date semantics, and print-safe structural expectations.

Retained family `31:274` was opened only after the new representatives had received screenshot QA, structural readback, and long-copy stress/repair.

## Hybrid authoring split

Each representative has:

- fixed atmosphere/depth field: one procedural composed raster IMAGE role;
- destination, table number, country note, date: native editable Figma text;
- country note remains explicit semantic placeholder `[国テーマ説明文 · LAYOUT DUMMY]`;
- variable/factual text baked into raster: `0`;
- root size: `1000×1480`;
- visible text outside root: `0`;
- IMAGE fill count: `1` per representative.

The raster fields were procedurally authored for this experiment rather than copied from previous production. This run did not have an adopted AI image-generation output, so no AI-generation claim is made.

## Raster transport and source-quality boundary

Direct local-file upload to the Figma upload endpoint was unavailable from the runtime network path. An initial progressive JPEG fallback was also rejected by Figma as unsupported; the failed Figma script was atomic and made no canvas mutation.

The bounded experiment therefore used small baseline-JPEG derivatives embedded through `figma.createImage`:

- Italy raster role `45:5`, image hash `1806f0677156c16673ef63794db92370c24304aa`;
- France raster role `45:7`, image hash `c8ea6300de9aea706c1aca9b6ae1d532f1bd8c6b`;
- Japan raster role `45:9`, image hash `d4df9afc0f64605a1d5093aea4c2d1ef95270026`.

These embedded derivatives are sufficient for visual method comparison, but they are **not** print-resolution masters and do not satisfy final actual-size raster-resolution QA.

A full-resolution France comparison master was saved to Drive after France survived visual comparison:

- Drive file ID: `1_upRvZXq4PE54UsvmeWz-Hqhb1fXVP8U`;
- filename: `V6_COMPARE_FRANCE_folded-publication-depth_2026-08-16.png`;
- MIME: `image/png`;
- size: `1,867,839 bytes`;
- parent: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`.

The Figma candidate currently still uses the bounded embedded derivative, not that Drive master. Production promotion therefore remains blocked until a final adopted high-resolution raster is placed and read back in Figma.

## Native-text reflow QA and repair

Initial long-copy stress revealed an important structural issue. The country-note nodes had been given a fixed width but their initial resize order left them at fixed height. This was corrected by explicitly restoring `textAutoResize=HEIGHT` after width assignment.

Fresh long-copy stress clones were then created only from the new V6 representatives:

- `48:2 / QA / LONG NOTE STRESS / ... ITALY`;
- `48:10 / QA / LONG NOTE STRESS / ... FRANCE`;
- `48:18 / QA / LONG NOTE STRESS / ... JAPAN`.

With true auto-height enabled, France expanded enough to collide with the independently positioned date; Japan also lost comfortable reserve. The treatment therefore changed structurally rather than cosmetically: note + date were moved into native vertical auto-layout `TEXT / INFO STACK` containers in both production candidates and stress clones.

Post-repair stress readback:

- Italy stack bottom: `1266 / 1480`, outside visible text `0`;
- France stack bottom: `1412 / 1480`, outside visible text `0`;
- Japan stack bottom: `1334 / 1480`, outside visible text `0`.

The completed stress clones are retained but hidden after verification. This new stress evidence supersedes the pre-repair fixed-height assumption.

## Pre-legacy visual result

At whole-item/thumbnail and reading scale, before opening retained production:

- Italy: procedural stone/paper/material swatches create real tonal depth, but the embedded comparison raster is visibly softer/blockier than a final print master should be;
- France: folded-publication planes create the strongest material/editorial depth of the three while preserving a clear `03 → FRANCE → note/date` hierarchy;
- Japan: the washi field was too quiet, so a bounded pair of low-opacity blurred ink blooms (`47:2`, `47:3`) was tested; the result remained intentionally sparse and still did not create enough destination-specific visual depth.

All three retained native editable text and one isolated fixed raster role instead of rasterizing the page.

## Completion-only retained comparison

After the above QA was closed, retained family `31:274` was opened for the first time in this run.

Result:

- **France:** V6 demonstrates that composed raster/pixel depth can materially improve the clean-room method. The folded-publication candidate is a serious comparison direction and is `VERIFIED_LOCAL` as a method test. It is not yet production because the embedded Figma derivative is not final-resolution.
- **Italy:** V6 gains subtle material depth, but retained production still has stronger destination-specific visual punch. Keep as comparison evidence only.
- **Japan:** V6 remains too quiet against retained production's stronger identity and contrast. Reject this direction; do not extend its sparse washi treatment across the family.

Therefore this run does **not** promote V6 to the 11-sign production family and does not change the global ADD-02 sellable state. Retained production and all earlier clean-room versions remain untouched.

## Learning / next method

The repeated failure was not “SVG is bad.” It was that abstract vector-only atmosphere was insufficient for several destination roles. This bounded test verifies a narrower principle locally:

> when a clean-room print artifact is structurally sound but lacks material/editorial depth, an isolated composed raster role can add useful depth while variable text remains native — but each destination must still earn adoption independently, and raster source resolution becomes a new hard gate.

Next safe ADD-02 work should not blindly rasterize all 11 signs. Use France as evidence that the method can work, then test a small number of other destinations with materially different non-person architecture/material/landscape/paper roles and high-resolution masters. Reject destinations where image depth merely creates generic texture or weakens identity.

## Current declaration

`SELLABLE_VISUAL_QA_REOPENED / CLEANROOM_V5_11_SIGN_STRUCTURAL_PASS / V6_RASTER_DEPTH_METHOD_VERIFIED_LOCAL_ON_FRANCE / ITALY_COMPARE_ONLY / JAPAN_REJECTED / LEGACY_PRESERVED / HIGH_RES_FIGMA_PLACEMENT_REQUIRED_BEFORE_PROMOTION / NOT_PRINT_READY`
