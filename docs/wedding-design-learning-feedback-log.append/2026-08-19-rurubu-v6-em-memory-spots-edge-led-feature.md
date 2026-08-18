# Rurubu V6 — EM Memory Spots edge-led feature experiment

Date: 2026-08-19
Scope: Rurubu WEDDING only

## Observation

EJ Memory Spots was already structurally valid, but the right guide page still had a visible cream gap before Spot 04 and read as a sequence of separate modules rather than a strongly photo-led travel-guide page.

## Hypothesis

The page did not need another image. Existing Spot 04 dining photography had enough semantic value and source resolution to become a larger feature. Moving the existing native title/copy onto that photograph should create editorial continuity without sacrificing editability.

## Bounded experiment

- source preferred: EJ `1759:2`;
- rollback-safe candidate: EM `1767:2`;
- right page: `1767:24`;
- Spot 04 photo: `1767:36`;
- promoted Spot 04 from `493×344` to `732×430` within verified source `732×498`;
- preserved image hash, native copy and replaceable photo role;
- overlaid existing native title/copy in white with small contrast shadows;
- retained existing magenta label but moved it into the photo;
- no new image, generated asset, card or page-wide background added.

## Failures caught before adoption

1. First label position crossed the bottom guide rule. Corrected upward before QA.
2. First photo width was 733px against a 732px verified source width. Corrected to exactly 732px before adoption.

## Expected improvement

Stronger Rurubu-like photo hierarchy, less dead paper, less card/module reading, no asset-count increase.

## Regression risks reviewed

- overlay copy contrast;
- source upscaling;
- label/binding-rule collision;
- safe-area pressure;
- loss of text editability.

## Evidence

- whole spread before EJ: reviewed at 1200px;
- whole spread after EM: PASS and stronger;
- actual right page 794×1123: PASS;
- native text 14;
- absolute text collision 0;
- 18px safe-area risk 0;
- Spot 04 732×430 / source 732×498: PASS;
- Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

EJ is hidden rollback. EM is visible preferred. V7 was not touched.

## Next application

Continue V6. Prefer expanding the editorial responsibility of legitimate, source-safe photography before introducing another asset when a page is weak because of dead paper rather than missing content. Do not apply this to photos that are semantically weak, source-limited or merely decorative.
