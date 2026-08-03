# V5 back-main WebP transport derivative

Date: 2026-08-04
Item/version: Rurubu WEDDING V5
Role: `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
Target Figma node: `77:24`

## Authorities and live state

The project-wide Figma production, asset-generation, continuous-learning, project-memory, quality-over-legacy, Current status, evidence-ledger, editorial knowledge, lessons, V5 operating-system, postmortem, and V6 clean-room authorities were reviewed before this run. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not modified.

## Visible problem

The accepted `944 × 608` JPEG derivative is visually suitable but weighs `184,920 bytes`. The normal Figma upload endpoint remains blocked because the execution container cannot resolve `mcp.figma.com`. The proven network-independent path transfers image data through integrity-checked Figma shared-plugin-data chunks, so reducing bytes without reducing role dimensions materially lowers the number of transfer calls and corruption risk.

## Experiment

Source derivative:
- filename: `RURUBU_V5_10_BACK_MAIN__FIGMA_944x608_Q85.jpg`
- Drive ID: `1Ysumy3RP-Ju62_at6wF0LleOqb1fiqYq`
- dimensions: `944 × 608`
- bytes: `184,920`

Tested WebP derivatives at qualities 50, 55, 60, 65, 70, 80, 85, and 90 while preserving the exact `944 × 608` dimensions. Q60 was selected as the smallest candidate that retained clean map detail, ring edges, pen silhouette, cloth texture, passport edge, and photograph borders at source view and at the target role scale.

Accepted transport candidate:
- filename: `RURUBU_V5_10_BACK_MAIN__FIGMA_944x608_Q60.webp`
- dimensions: `944 × 608`
- bytes: `73,152`
- byte reduction versus JPEG Q85: approximately `60.4%`
- SHA-256: `5231ee0b3a777c235d2c14d097c50da49a2c3d5bca57fe1bbec49c5f0933523b`
- Drive ID: `1g6XyukRTp83yA7TOsq3yv0u4zqaMQ8B3`
- Drive parent: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`
- Drive upload/readback: PASS

## Direct upload retry

A fresh official Figma single-use upload endpoint was generated for node `77:24`, then tested once with raw `image/webp` bytes. The execution container again failed at DNS resolution for `mcp.figma.com` before any upload occurred. This confirms the blocker is unchanged; the normal external POST route will not be retried in the next run.

## Quality and truthfulness decision

- `DERIVATIVE_VISUAL_QA_PASS`
- `DRIVE_READBACK_VERIFIED`
- `FIGMA_NOT_APPLIED`
- `PHOTO_ROLE_PASS_UNCHANGED`

No Figma node, image hash, crop, native text, semantic name, frame hierarchy, or rollback state changed. This file is a transfer-optimized derivative, not a new master and not evidence of visual completion.

## Reusable lesson

For network-independent Figma chunk transfer, format efficiency may reduce operational risk without lowering editorial quality, but only when dimensions stay role-appropriate and the recompressed candidate passes direct visual comparison. Byte reduction alone is never an acceptance criterion.

Evidence level: `PROTOTYPED / ROLE-SPECIFIC ACCEPTED / PROJECT_RULE_NOT_PROMOTED`.

## Next action

Use only the integrity-checked Figma internal chunk path with this 73,152-byte WebP candidate, verify reconstructed byte length and checksum, apply it to `77:24`, record the resulting image hash, run outer-spread/page/detail screenshots and structure QA, then update the V5 ledger. Do not claim role completion before those gates pass.
