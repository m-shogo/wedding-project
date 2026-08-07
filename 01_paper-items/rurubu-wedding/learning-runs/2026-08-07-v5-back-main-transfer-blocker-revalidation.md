# V5-10 back-main transfer blocker revalidation — 2026-08-07

Scope: Rurubu WEDDING V5 only. No Passport, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

## Authorities reread

Before action, the project-wide Figma production system, asset-generation memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, current Rurubu status, V5 evidence ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, V6 current status, V6 asset queue, and V6 reference analysis were reread from GitHub main.

## Visible problem

`V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO / 77:24` still shows the older sunset-dining image hash `2cfd19cf1701db58039a4fc645e4279832ec465a`, while the accepted travel-flatlay Q70 derivative is already Drive-verified and visually accepted for a Figma test.

## Verified derivative evidence

- Drive derivative ID: `1L-SQiPuNHrCMuTbb_yaf9FNPg5iuf8uN`
- filename: `RURUBU_V5_10_BACK_MAIN_TRAVEL_FLATLAY__FIGMA_944x608_Q70_TRANSPORT.jpg`
- dimensions: `944 x 608`
- bytes: `95,542`
- SHA-256: `4ab985df8eccde405a66eaedb12cf6218e5b21856521f60ec175a5a61273c1f1`
- target node: `77:24`
- target box: `472 x 304`

Drive raw readback materialized the same file locally and byte length / SHA-256 were reverified before any placement attempt.

## Live Figma preflight

Live node `77:24` remained:

- visible: true
- size: `472 x 304`
- scale mode: `FILL`
- image hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`

Rollback frames `59:2` and `59:178` and fold guide `77:288` were present.

## Experiment 1 — staged text chunk integrity check

A temporary shared-plugin-data chunk was staged as preparation for the previously proven `base64Decode() -> createImage()` fallback. The returned stored character count and prefix did not match the expected JPEG base64 chunk, proving the model-visible chunk had been sourced from an incorrect/truncated fragment rather than the verified local file.

Decision: **REJECTED BEFORE IMAGE CREATION.**

The temporary shared-plugin-data key was cleared. No Figma image was created or applied and the old visible image hash remained unchanged.

## Experiment 2 — official raw asset upload revalidation

A fresh official Figma `upload_assets` single-use URL was requested for exact node `77:24`, then the verified 95,542-byte JPEG was POSTed as raw `image/jpeg` bytes from the execution container.

Result:

`curl: (6) Could not resolve host: mcp.figma.com`

This is the same blocker fingerprint recorded in earlier V5 transfer attempts. Per the loop-breaker rule, this method is now stopped rather than retried again.

## Whole-item observation

A fresh whole-outer screenshot was captured after cleanup. It confirms:

- the visible design did not change during the rejected transfer attempts;
- `77:24` remains visibly softer/pixelated than the accepted source derivative warrants;
- the back page still reads `OUR TRAVEL NOTES -> main memory -> FRIENDS & FAMILY -> OUR JOURNEY ROUTE`;
- the front cover remains structurally intact.

This is not a visual completion claim.

## Learning

### Source

Live Figma, Drive readback, exact local byte verification, and the Figma upload endpoint response.

### Hypothesis

A transfer mechanism should be adopted only when it can prove binary integrity before touching the visible fill.

### Result

- incorrect/truncated text chunk: detected and rejected before image creation;
- raw upload: blocked by the already-known DNS fingerprint;
- visible Figma state: unchanged.

### Failure converted into process change

1. Do not copy long base64 from truncated connector-visible output.
2. Any chunked fallback must source chunks from the verified local bytes and validate each staged chunk's exact length/prefix/suffix before reconstruction.
3. Do not retry `mcp.figma.com` raw POST from this container after repeated DNS failure.
4. Do not advance `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, or any V5/V6 gate from transfer preparation.

### Expected improvement of the next method

The next attempt should either use short independently verified chunks from the local artifact or another binary-safe connector path, and must verify reconstructed byte length before `figma.createImage()`.

### Possible regression

Model-visible base64 transcription can silently corrupt bytes even when the Figma script itself succeeds; therefore transport success alone is not evidence.

## Gate impact

No ledger count changed.

- `INTENDED_SOURCE_APPLIED`: unchanged
- `PHOTO_ROLE_PASS`: unchanged
- V5 dummy-design gate: closed
- V6 production gate: closed

Status: `BLOCKER_REVALIDATED / CORRUPT_STAGING_REJECTED / LIVE_DESIGN_UNCHANGED / METHOD_SWITCH_REQUIRED`
