# Rurubu WEDDING V30 — P06 HQ Raster Production Guardrails

Scope: P06 `3535:17` only. V31 creation is forbidden.

## Canonical source

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Production frame: `3535:17`
- Owner master: `P06_OWNER_VISUAL_MASTER_HQ_UNCOMPRESSED_20260906.png`
- Drive file ID: `1mm14Nr1RqlhERZG97Z-9Oz_y-D2lpfWU`
- Source dimensions: `1055 × 1491`
- Source format: PNG
- Source bytes: `3,682,318`

## HARD rules

1. Never use a JPEG proxy, Figma preview screenshot, Drive preview screenshot, or low-resolution embedded reference as production source.
2. Never perform lossy recompression on the owner master.
3. Do not create a smaller derivative for production placement. Keep the source at its original pixel dimensions and let Figma display it at the required canvas size.
4. Production placement must satisfy width/sourceWidth <= 0.70 and height/sourceHeight <= 0.70. At `559 × 794`, the owner master is displayed at approximately `0.53 ×`, so it passes.
5. Four photo masks remain independent and replaceable: `4000:52`, `4000:55`, `4000:58`, `4000:61`.
6. Do not rebuild the owner's title, Q5, Q6, icons, or editorial art with native primitive substitutes.
7. Do not claim `P06 DESIGN_COMPLETE = YES` until the exact HQ PNG bytes are confirmed in live Figma and fresh visual QA passes.
8. One failed transfer path is not a reason to substitute a lower-quality source. Exhaust available lossless transfer routes first; if none are technically available, report the precise transport blocker without pretending production is complete.
9. Final QA must compare P06 with P02/P03/P04/P05 and inspect title, Q5/Q6, icons, photo frames, boundaries and raster quality.
10. Do not create V31 or a duplicate P06 frame as a workaround.

## Incident learning — 2026-09-06

A prior run stopped after the first Figma upload transport failed and then described speculative alternatives as if they were available. This is forbidden going forward.

Required recovery order:

1. Re-verify canonical Drive file metadata and bytes.
2. Re-read live Figma target and verify exact node IDs.
3. Attempt official lossless Figma asset upload.
4. If transport fails, test other actual available connector/runtime paths; do not merely propose them.
5. Preserve the production frame and masks while investigating.
6. Only report success after live Figma readback and fresh screenshot QA.

Current known transport issue at time of writing: the execution container cannot resolve `mcp.figma.com` for the raw-byte POST required by the upload URL, while the connector can generate that URL. This does not permit JPEG/proxy fallback.
