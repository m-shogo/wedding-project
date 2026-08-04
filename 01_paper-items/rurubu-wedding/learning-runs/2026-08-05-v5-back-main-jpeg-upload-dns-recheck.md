# V5 back-main JPEG upload DNS recheck

Date: 2026-08-05
Scope: Rurubu WEDDING V5 only
Target role: `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
Target Figma node: `77:24`

## Authorities consulted

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- existing transfer/blocker learning runs
- live Figma node state
- verified Drive derivative `1yZIwZ5cdLf_qAXe2BI9Yt5RsH5yE8q8V`

## Visible problem

The live back-cover main photo still uses an unverified existing image fill. The role-sized JPEG derivative is prepared and Drive-readback verified, but the intended source has not yet been applied and screenshot-QA'd.

## Tested principle / capability

Test whether the connector-issued binary upload endpoint can now accept the verified local JPEG directly, avoiding fragile model-visible base64 transcription.

Expected improvement:
- exact binary transport;
- direct placement on semantic node `77:24`;
- preservation of native text, structure, crop editability, and rollback state.

Possible regression:
- accidental partial mutation if placement succeeds without evidence capture;
- low-Q JPEG artifacts visible at actual size;
- repeated network retry without changing method.

Evidence required for adoption:
- successful POST response with image hash;
- live node hash readback;
- outer-spread, back-cover, and actual-size screenshot QA;
- structure audit;
- ledger mapping from Drive ID to node ID to image hash.

## Experiment

1. Downloaded the verified Drive JPEG derivative to the execution workspace.
2. Verified local byte length: `20,063`.
3. Verified SHA-256: `28e14592f3cb08b9c1da85e89ee240117ffae6dea28aed0185e318ae0598fcae`.
4. Requested a fresh Figma single-use upload URL targeting node `77:24` with `FILL` scale mode.
5. Attempted multipart binary POST from the execution container.
6. Read the live Figma node after the failed upload.

## Result

`REJECTED / TRANSIENT INFRASTRUCTURE BLOCKER RECONFIRMED`

- The execution container again failed DNS resolution for `mcp.figma.com`.
- No upload response or new image hash was produced.
- Live node `77:24` remains:
  - name: `BACK_VISUAL_MAIN_MEMORY_PHOTO`
  - size: `472 × 304`
  - image hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`
  - scale mode: `FILL`
- No Figma mutation occurred.
- No photo-role PASS count, ledger state, or Current Status declaration changed.

## Failure and process decision

This is the same external-upload DNS blocker already observed multiple times. Further immediate retries of the same endpoint from the same container are not justified. The next run must switch method rather than repeat the POST:

1. use a binary-safe connector action that accepts a mounted file parameter, when available; or
2. use an integrity-checked inline JPEG route only if the payload can be transferred without truncation or manual transcription; or
3. continue other safe V5 editorial/structure work while preserving the prepared derivative and evidence.

Long base64 strings must not be copied from truncated tool output. Transport success and visual acceptance remain separate gates.

## Adoption status

- JPEG derivative: `PROTOTYPED / DRIVE_VERIFIED / FIGMA_NOT_APPLIED`
- external upload method: `REJECTED_FOR_CURRENT_RUNTIME`
- live design: `UNCHANGED`
- project-wide rule promotion: `NO` (existing binary-safe transport principle remains sufficient)
