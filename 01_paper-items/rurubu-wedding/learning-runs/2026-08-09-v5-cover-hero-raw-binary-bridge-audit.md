# V5 cover hero — raw-binary bridge audit

Date: 2026-08-09
Item/version: Rurubu WEDDING V5
Scope: `V5-01 / 77:148 / IMG_HERO` only
State: `PROTOTYPED / CURRENT_UNCHANGED / ROLE_NOT_COMPLETE`

## Authority read before action

This run re-read the project-wide production system, asset-generation memory, continuous-learning system, learning log, project memory, quality-over-legacy decision, Current Status, V5 asset ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and the V6 Current Status / reference analysis / research matrix / asset queue. V6 remains production-gated by V5.

## Visible problem

The only remaining active V5 photo-role blocker is the dominant cover hero `77:148 / IMG_HERO`.

Live/ledger truth before this run:

- role geometry: `665 × 610`
- Current image hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- Current derivative: rejected for dominant-photo visible quality
- prepared Q60 derivative: `1330 × 1220`, `155,439 bytes`
- Q60 Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- Q60 SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`
- rollback-safe staging frame/node: `469:2 / 469:132`
- PHOTO_ROLE_PASS: `10 / 11 active`
- ROLE_COMPLETE: `10 / 11 active`
- dominant pass: `2 / 3`

The editorial hypothesis remains that the verified Q60 derivative can materially improve the final dominant role without regeneration, provided it reaches the staging node losslessly and passes whole-item, cover-reading, and actual-size detail QA.

## New verified capability — Drive raw-file materialization

The Q60 derivative was fetched from Google Drive using the streamed/raw-file path rather than inline base64.

Drive readback returned:

- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- file size: `155,439 bytes`
- a materialized raw file reference was produced and became an actual local JPEG in the execution environment

This is a real improvement in the pipeline: `Drive verified asset → raw binary local file` is no longer the blocker. No model-visible base64 transcription is required for the Drive half of the transfer.

## Experiment A — Figma native upload URL with raw Q60

Figma `upload_assets` was requested for staging node `469:132` with `FILL` mode. A valid single-use submit URL was issued.

The raw `155,439-byte` JPEG was then posted from the execution environment.

Result:

`REJECTED / KNOWN NETWORK BLOCKER`

The POST could not resolve `mcp.figma.com` (`curl: (6) Could not resolve host`). This is the same blocker fingerprint seen in prior runs. Per the project rule, this path was not retried repeatedly.

Important distinction: Figma successfully issuing a submit URL is not an upload, image-hash, placement, or visual-QA success.

## Experiment B — bounded inline derivative as a transport probe

A smaller temporary derivative was created from the verified Q60 solely to test whether a one-call integrity-guarded Figma `createImage` path could avoid the external upload host.

Probe derivative:

- dimensions: `900 × 826`
- JPEG bytes: `34,505`
- SHA-256: `eb6139688be8a34b16e57136ee6745eede2c8dba83cc65564712208f4379b3da`
- expected base64 length: `46,008`

This derivative is **below the V5 operating-system large-role floor of approximately 2× the semantic box**, so even a successful transport could only have been a pipeline experiment, not an automatic PHOTO_ROLE_PASS.

The Figma script performed a length guard before decoding or touching the node.

Actual received encoded length: `19,321 / 46,008`.

Result:

`REJECTED / MODEL-VISIBLE PAYLOAD TRUNCATION`

The script failed before mutation. Figma's atomic failure behavior protected Current and staging state. This confirms that even a nominally sub-50k single-call model-visible image payload is not reliable for this dominant role in this execution path.

## Experiment C — HTML capture bridge feasibility

A local HTML page containing the Q60 JPEG was prepared as a possible binary-safe Figma HTML-capture bridge. A Figma capture ID could be created for existing staging frame `469:2`.

However, local capture requires an actual browser to open the localhost URL with the Figma capture hash/script. This automation environment exposes neither a usable browser/Playwright session nor a supported direct local-page submission action.

Result:

`DISCOVERED / NOT EXECUTABLE IN CURRENT RUNTIME`

No capture completion was claimed and the path is not counted as progress.

## Current-state verification

No Current Figma node was modified in this run.

Therefore counts remain intentionally unchanged:

- intended source applied: `11 / 11 active` (source identity coverage, not quality completion)
- PHOTO_ROLE_PASS: `10 / 11 active`
- ROLE_COMPLETE: `10 / 11 active`
- dominant pass: `2 / 3`

V6 production remains closed.

## Learning

### Source / observation

The Drive connector can now materialize the verified Q60 as a raw local file, but the current Figma upload action still delegates the final binary POST to a hostname the execution environment cannot resolve.

### Hypothesis tested

Separating raw binary retrieval from Figma placement would reveal whether the old failure was a Drive/base64 problem or a final upload-host problem.

### Result

Verified: the Drive/base64 half is solved. The remaining blocker is specifically the last-mile POST to the Figma upload host or another file-parameter-aware Figma placement action.

### Failure

- external `mcp.figma.com` POST remains network-blocked
- model-visible inline payload is truncated before Figma receives the expected bytes
- browser-based local HTML capture cannot be completed with the currently exposed runtime tools

### Status

- raw Drive materialization: `VERIFIED`
- native upload URL path: `REJECTED_IN_CURRENT_RUNTIME`
- model-visible one-call base64 hero path: `REJECTED`
- HTML capture bridge: `DISCOVERED / NOT CURRENTLY EXECUTABLE`
- Q60 visual candidate itself: still `PROTOTYPED / DRIVE_VERIFIED`, not Figma-verified

## Next application

Do **not** regenerate the hero merely to create activity and do **not** repeat the rejected DNS or model-visible-base64 paths.

The next safe attempt should use one of these only if a genuinely new capability is available:

1. a connector-native Figma action that accepts the materialized local file/file reference directly;
2. an execution path with network access able to POST raw bytes to the existing Figma upload mechanism;
3. a browser/Playwright-capable local-capture bridge that can submit the raw image without model-visible encoding.

After successful staging placement, require in order:

1. new staging image hash on `469:132` different from Current hash;
2. screenshot QA at actual-size detail;
3. cover reading-scale QA;
4. whole-outer QA;
5. comparison against Current and materially different clean-room cover candidates (`413:2` and the preserved hybrid candidate where applicable);
6. semantic structure/native text/crop/fold/rollback verification;
7. Current promotion only if the repaired candidate wins;
8. ledger + Current Status + learning logs + Git readback;
9. only then final V5 weakest-three/type/density/fold review and V6 gate evaluation.
