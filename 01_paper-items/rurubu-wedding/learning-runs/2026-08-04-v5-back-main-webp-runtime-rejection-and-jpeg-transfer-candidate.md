# V5 back-main WebP runtime rejection and JPEG transfer fallback

Date: 2026-08-04
Item/version: Rurubu WEDDING V5
Target role: `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Target node: `77:24`

## Authorities and live evidence

The run re-read the project-wide Figma production system, asset-generation memory, continuous-learning system, project memory, quality-over-legacy decision, and the current learning log before mutation. Live node inspection confirmed:

- node: `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
- type: `RECTANGLE`
- target box: `472 × 304`
- existing live image hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- parent: `77:19 / BACK_COVER`

## Visible problem

The verified Drive master and role-sized derivatives exist, but the intended source is still not applied to the live semantic node. External Figma binary POST remains unavailable from the execution environment, so a network-independent inline path is required.

## Hypothesis

The prepared `944 × 608` WebP transfer derivative could be base64-decoded in Figma and passed to `figma.createImage()`, preserving the semantic node and avoiding external network access.

## Experiment

Source candidate:

- Drive ID: `1g9EeXoIsX_GFZX8RV03Qt3joNUvakXcf`
- file: `RURUBU_V5_10_BACK_MAIN__FIGMA_944x608_Q22_TRANSFER.webp`
- dimensions: `944 × 608`
- bytes: `33,886`

A smaller local Q10 WebP derivative was created only to test transport mechanics:

- dimensions: `944 × 608`
- bytes: `17,686`
- SHA-256: `01978467ce182404116ddd1af88f7de5eaee5d1e0922475c0130eaabfbda9a16`
- base64 length: `23,584`
- chunk lengths: `6,000 / 6,000 / 6,000 / 5,584`

The first two chunks were staged and read back exactly. The final bounded Figma script validated expected chunk lengths, total base64 length, and decoded byte count before attempting image creation.

## Result

`REJECTED_RUNTIME_FORMAT_UNSUPPORTED`

`figma.base64Decode()` reconstructed the expected byte payload, but the current `use_figma` runtime rejected `figma.createImage(bytes)` with:

`Image type is unsupported`

The failed script was atomic. The visual fill was not changed. Temporary staging values were then explicitly cleared and verified empty.

Post-cleanup live evidence:

- live image hash remains `2cfd19cf1701db58039a4fc645e4279832ec465a`
- staged chunk lengths before cleanup: `6,000 / 6,000 / 0 / 0`
- staging cleared: `true`
- semantic node and parent preserved

## Fallback prepared

A JPEG fallback was created from the same crop and visually inspected:

- file: `RURUBU_V5_10_BACK_MAIN__FIGMA_944x608_JPEG_Q15_TRANSFER.jpg`
- dimensions: `944 × 608`
- bytes: `20,063`
- SHA-256: `28e14592f3cb08b9c1da85e89ee240117ffae6dea28aed0185e318ae0598fcae`
- Drive ID: `1yZIwZ5cdLf_qAXe2BI9Yt5RsH5yE8q8V`
- Drive parent: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

The JPEG preserves the notebook, rings, pen, passport-like booklet, cloth, map, and printed-photo composition. It is a transfer candidate, not an adopted Figma asset. Screenshot QA is still required after placement.

## Decision

- WebP through `figma.createImage()` in this runtime: `REJECTED`
- external POST path: not retried because the same network blocker has already repeated
- JPEG inline path: `PREPARED / NOT YET APPLIED`
- V5-10 role pass: unchanged
- V5 photo-role count: unchanged
- V6 gate: unchanged

## Reusable lesson

A format supported by Drive, browsers, or Figma's external upload service is not automatically supported by the specific in-editor `figma.createImage()` runtime. Binary-integrity validation and image-format compatibility are independent gates. For network-independent inline transfers in this environment, use JPEG or PNG candidates and verify the format with a bounded role before scaling the method.

## Next application

Transfer the verified JPEG candidate with exact chunk-length and decoded-byte validation. Then inspect the outer spread, back-cover page, and actual-size image detail. Adopt only if compression and crop pass all three scales; otherwise revert immediately and use a higher-quality JPEG derivative.