# 2026-08-22 — Rurubu V8 1DAY AT + image transport fallback

## V8 1DAY AT

Observed: AR's left-page `海辺 / 長めに / 寄り道 / ゆっくり` used scale and distance to imply pace, but the four fragments could also read as fake editorial randomness.

Fresh professional input: IDEA No.346 / Heikichi Harata — parataxis as deliberate connection of separated short statements.

Test: pair existing words into two reader-facing statements without changing the right exact-time page:
- `海辺は、長めに。`
- `寄り道は、ゆっくり。`

First pass rejected because the second phrase produced a small final-line wrap. Width/scale was corrected and the candidate was re-QA'd.

Result: AT `2264:2` promoted; AR `2257:2` hidden rollback.

Evidence: 500 / 1000 / 1587×1123 PASS; native text 19; IMAGE 0; intersections 0; 18px safe risk 0; accidental explicit one-character lines 0.

Learning: RSL-220 / `F-RSL-220-SCATTERED-SHORT-WORDS-SIMULATE-EDITORIAL-RHYTHM-WITHOUT-EXPLICIT-SEMANTIC-PAIRING`.

## Image transport capability

RSL-208 official upload-submit DNS blocker was not retried.

New method A: Drive URL fetch from inside Figma Plugin runtime — rejected/blocked atomically because `fetch` is undefined.

New method B: verified Drive file materialized in execution environment → bounded derivative bytes → Figma `figma.createImage(bytes)` → hidden QA IMAGE fill — SUCCESS.

Hidden probe:
- `2266:2 / QA / DRIVE_MOUNT_BYTES_TO_FIGMA_CREATEIMAGE / 2026-08-22`
- `2266:3 / LOW_RES_TRANSPORT_PROBE_NOT_PRODUCTION`
- hash `69f50f48faf0a463bf09b249a25b6669698aca7a`
- 736-byte low-resolution probe

This is transport evidence only, not a production asset. Production still requires full Drive master + role-sized high-quality derivative + effective-resolution/crop/hash/three-scale QA.

Learning: RSL-221 / `DRIVE_RAW_MATERIALIZE_TO_FIGMA_CREATEIMAGE_BYTES`; failed sub-route `F-RSL-221-FIGMA-PLUGIN-RUNTIME-HAS-NO-FETCH`.
