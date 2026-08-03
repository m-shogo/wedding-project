# V5-07 single-call binary-transfer experiment

Date: 2026-08-03
Item/version: Rurubu WEDDING V5
Role: `V5-07 / IA_MEMORY_2_PHOTO`
Target Figma node: `77:438`

## Authorities read

Before the experiment, the project-wide Figma production system, asset-generation memory, continuous-learning system, feedback log, project memory, quality-over-legacy decision, current Rurubu status, asset ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 status were re-read from GitHub main.

## Visible problem

The semantic small-memory role still used an unverified existing IMAGE fill rather than the intended Drive master. The live V5 ledger therefore remained at `PHOTO_ROLE_PASS 0/13`.

## Hypothesis

Because this role requires only a `352 × 368` derivative, a visually acceptable JPEG could remain below the `use_figma` single-call code-size boundary and avoid the external upload DNS blocker.

## Source and derivative

- Drive master ID: `1z7pV8BzSaqrvChCbmotTRoEptTaQZMLw`
- source: `07_MEMORY_SPOT_02_OLD_TOWN_DUMMY.png`
- source dimensions: `1122 × 1402`
- derivative: `352 × 368`, JPEG quality 75, 4:2:0
- derivative bytes: `27,477`
- derivative visual QA: PASS for the intended small role; architecture, lamps, street perspective, and crop remained legible
- Drive derivative ID: `1b6ELbuMRenOCfAI7RNygNyIJoWEg3fMv`
- Drive filename: `RURUBU_V5_07_IA_MEMORY_2_PHOTO__FIGMA_352x368_Q75.jpg`
- Drive save/readback: PASS

## Figma experiment

The derivative was base64-encoded and supplied to one bounded `use_figma` call targeting only semantic node `77:438`. The planned mutation preserved the node and replaced only its image fill.

## Result

`REJECTED / BASE64_INTEGRITY_FAILURE / FIGMA_ATOMIC_NO_CHANGE`

Figma returned `Invalid base64 string` before mutation. The script was atomic, so node `77:438`, its existing fill, semantic name, surrounding structure, native text, and rollback state were not changed.

The failure indicates that a model-visible or tool-argument path can truncate or otherwise alter even a nominally sub-50k encoded payload. Raw character count alone is not sufficient evidence of binary integrity.

## Expected improvement versus possible regression

Expected improvement was one verified small photo role with correct Drive provenance and improved image distinctness. Possible regression was accidental corruption or replacement of the semantic node. Atomic failure prevented the regression, but the expected improvement was not achieved.

## Decision

- derivative: `MASTER_DERIVED / DRIVE_VERIFIED / RETAIN_FOR_NEXT_BINARY_SAFE_METHOD`
- transfer method: `REJECTED`
- V5 role counts: unchanged
- V6 gate: unchanged

## Next application

Do not retry long base64 through a single model-visible argument. Use a binary-safe connector upload, a verified chunk store with per-chunk checksum and exact readback, or an in-editor official image replacement route. Until then, continue only other rollback-safe V5 work and do not claim photo completion.
