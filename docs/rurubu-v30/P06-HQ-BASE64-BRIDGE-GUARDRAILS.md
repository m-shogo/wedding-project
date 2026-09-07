# Rurubu WEDDING V30 — P06 HQ Base64 Bridge Guardrails

Scope: P06 `3535:17` only. This is a lossless fallback transport for the exact canonical owner PNG. It is not production artwork by itself.

## Canonical source

- Drive file ID: `1mm14Nr1RqlhERZG97Z-9Oz_y-D2lpfWU`
- File: `P06_OWNER_VISUAL_MASTER_HQ_UNCOMPRESSED_20260906.png`
- PNG bytes: `3,682,318`
- Dimensions: `1055 × 1491`
- Canonical SHA-256: `13bed2e07d66803d67cd6a117a57bc67dbdd9677b9ba54f4b9dd634910747103`
- Canonical Base64 length: `4,909,760`
- Figma target node: `4249:56`
- Shared-plugin-data namespace: `rurubu_v30_p06_hq_transfer`

## HARD staging rules

1. Official `Figma.upload_assets` lossless upload is attempted first on each run.
2. Base64 staging is used only while container DNS/network cannot reach the official Figma upload endpoint.
3. Every staged character must come directly from the canonical local PNG Base64 stream. Never stage a screenshot, preview, JPEG, resized derivative, or recompressed source.
4. Store sequential keys `b64_0000`, `b64_0001`, ... and reconstruct by lexicographic key order.
5. Existing historical chunk lengths are variable. Never infer offsets from the key number or assume a fixed historical chunk length. Compute the next offset from the verified cumulative stream length.
6. **Maximum safe new chunk payload is 12,000 Base64 characters per `use_figma` write.** A 40,000-character source was truncated by the execution/tool transport to 19,999 characters and produced a checksum mismatch. Do not repeat that experiment.
7. After every new chunk, immediately concatenate all staged `b64_*` keys and compare cumulative length + FNV-1a 32-bit against the same canonical Base64 prefix in the container.
8. If cumulative verification fails, remove only the newly written bad key by setting its shared plugin data value to an empty string, then re-verify the previous known-good cumulative length/checksum before continuing.
9. Never reconstruct the Figma image until all `4,909,760` Base64 characters pass cumulative verification.
10. Reconstruction must decode the full stream, verify byte count `3,682,318`, PNG signature, dimensions `1055 × 1491`, and canonical SHA-256 before `figma.createImage(Uint8Array)` and applying the resulting image hash to `4249:56`.
11. Visible production artwork must not change during staging. Four replaceable masks `4000:52`, `4000:55`, `4000:58`, `4000:61` remain intact.
12. P06 remains `DESIGN_COMPLETE = NO` until exact-byte placement succeeds and fresh high-resolution P02/P03/P04/P05 comparison QA passes.
