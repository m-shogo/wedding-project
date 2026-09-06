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

## Transfer evidence — 2026-09-07

The blocker is now narrowed further:

- Google Drive authenticated raw download succeeds for the canonical owner master.
- The exact PNG materializes into the execution container as `P06_OWNER_VISUAL_MASTER_HQ_UNCOMPRESSED_20260906.png` with MIME `image/png` and `3,682,318` bytes.
- Live Figma metadata re-verifies production frame `3535:17`, HQ target node `4249:56`, and independent replaceable photo masks `4000:52`, `4000:55`, `4000:58`, `4000:61`.
- Figma `upload_assets` successfully issues a single-use upload URL targeting `4249:56` with `scaleMode=FILL`.
- The remaining failure occurs only at the final raw-byte POST from the execution container: DNS resolution of `mcp.figma.com` fails (`curl: (6) Could not resolve host`).

Therefore Drive → container is proven healthy; Figma authorization/target discovery is proven healthy; the unresolved segment is container network/DNS → Figma upload endpoint only. Do not alter production quality or completion status until that segment succeeds.

## Automated transfer attempt evidence — 2026-09-07 01:27 JST

- Latest `main` before this attempt: `b8b3dd2457454910c1b4ea7acf00644dd62e371a`.
- Canonical Drive file re-downloaded successfully; dimensions `1055 × 1491`, mode `RGBA`, format `PNG`, bytes `3,682,318`.
- SHA-256 of the materialized canonical bytes: `13bed2e07d66803d67cd6a117a57bc67dbdd9677b9ba54f4b9dd634910747103`.
- Fresh live Figma readback confirms `3535:17` is still `V30 P06 / OWNER VM HQ LOSSLESS / TRANSFER PENDING`; target `4249:56` is still pending exact bytes; all four replaceable masks remain present.
- Official `upload_assets` generated a fresh single-use upload URL for `4249:56` with `scaleMode=FILL`.
- Raw POST of the canonical PNG failed again before any HTTP exchange because the execution container still cannot resolve `mcp.figma.com` (`curl: (6) Could not resolve host`).
- No Figma production mutation was claimed or simulated. No proxy/JPEG/lossy fallback was used.

This confirms the blocker is persistent at the container DNS boundary, not Drive retrieval, Figma target discovery, node structure, or source integrity. Continue retrying the official lossless path on later runs and only proceed to final P02–P05 comparison QA after exact-byte placement succeeds.

## Automated transfer attempt evidence — 2026-09-07 03:27 JST

- Latest `main` before this attempt: `50a59f98d9a34633a2cec80dba6504dece7905ab`.
- V30 manifest was read first and the P06 authority re-verified before any write.
- Canonical Drive owner master re-downloaded successfully as `image/png`, `3,682,318` bytes, and materialized as a real `1055 × 1491` RGBA PNG.
- Fresh live Figma metadata confirms `3535:17` is still `V30 P06 / OWNER VM HQ LOSSLESS / TRANSFER PENDING`; `4249:56` remains the exact-byte target; masks `4000:52`, `4000:55`, `4000:58`, `4000:61` remain independent and replaceable.
- Official `upload_assets` issued a fresh single-use URL targeting `4249:56` with `scaleMode=FILL`.
- Raw multipart POST of the canonical PNG again failed before any HTTP exchange because the execution container cannot resolve `mcp.figma.com` (`curl: (6) Could not resolve host`).
- No proxy, JPEG, lossy derivative, duplicate frame, V31, or simulated completion was used.

The unresolved segment remains container DNS/network → Figma upload endpoint only. Final cross-page visual QA remains intentionally deferred until exact-byte placement succeeds.
