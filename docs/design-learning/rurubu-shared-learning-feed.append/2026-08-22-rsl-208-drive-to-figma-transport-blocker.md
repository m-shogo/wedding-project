# RSL-208 — Drive raw read succeeds but official Figma upload submit is DNS-blocked

Date: 2026-08-22
Source scope: Rurubu WEDDING
Source capability: generated/composed master transport, Drive → Figma
State: `BLOCKED`

## Goal

Re-test the asset-transport layer independently from image-model generation so a future role-specific generated image does not fail at the final `Drive master → Figma` handoff.

This test used the historical V8 contact-proof master only as a transport diagnostic. It was **not** adopted back into Current V8 and did not change any production spread.

Drive test master:

- file: `v8_contact_proof_essay_master.png`
- Drive ID: `1MsisJ-qed1vYjGbMFiylN2DI6Lim_1Ko`
- MIME: `image/png`
- Drive raw download size observed: `6664` bytes

## Observed sequence

1. Google Drive raw-file fetch succeeded and returned the PNG as a local/streamed file reference.
2. Figma `upload_assets` succeeded in creating a single-use upload submit URL for the target Figma file.
3. The required POST to that submit URL failed in the current execution environment because host `mcp.figma.com` could not be resolved.
4. The same DNS lookup was checked independently and remained unresolved.
5. The official upload path was therefore not repeatedly retried in a loop.

## Secondary fallback probe

A hidden, far-away Figma transport-test frame `2220:2` was used to probe Plugin API `figma.createImage(bytes)` as a potential bypass.

Important truth boundary:

- an early byte-string probe was incomplete/truncated and therefore cannot count as a valid transport test;
- a later integrity-check probe detected a byte-length mismatch before write and failed atomically;
- no Plugin API fallback was visually verified from the exact 6664-byte source in this run;
- the transport-test frame was returned to hidden state;
- no fallback image was promoted into Current production.

Do not turn `figma.createImage(bytes)` into a preferred route until an exact-byte source is passed and its rendered screenshot is verified.

## Failure fingerprint

`F-RSL-208-MCP-FIGMA-UPLOAD-SUBMIT-DNS-UNRESOLVED-AFTER-DRIVE-RAW-READ`

Operation/capability: Drive master → Figma raster upload
Environment/tool path: Google Drive raw fetch → Figma `upload_assets` submit URL → HTTP POST
Symptom: Drive succeeds, upload slot succeeds, final submit host cannot resolve
Likely cause class: execution-environment DNS/network path to `mcp.figma.com`, not Drive data absence and not image-format rejection
Last verified: 2026-08-22

## Stop / retry condition

Do not repeat the same official submit POST in every run while the environment has no material DNS/network change.

Retry is justified only when one of these changes:

- `mcp.figma.com` resolves from the execution environment;
- Figma exposes a connector action that accepts a local/connector file reference directly rather than requiring our own POST;
- a separately verified exact-byte Plugin API route becomes available;
- another authenticated binary handoff route is introduced.

## Next method candidates

In order of preference:

1. official `upload_assets` after a material network/DNS capability change;
2. a direct connector-file parameter handoff if Figma adds one;
3. exact-byte `figma.createImage(bytes)` only after byte-count/hash integrity and visible screenshot verification;
4. for suitable flat graphics only, SVG text/string import through the editable-vector route; this is not a substitute for photography.

Existing in-file image hashes may still be reused only when the asset itself is legitimately the intended Current role. They are not a route for introducing genuinely new generation bytes.

## What this run did NOT do

- new image-model generation: `0`
- new Drive master: `0`
- new production Figma image placement: `0`
- historical contact-proof re-adoption: `0`
- V6/V7 image reuse: `0`

## Cross-item applicability

This is primarily a transport-capability fingerprint and may be relevant project-wide, but it remains `BLOCKED` rather than `PROMOTED_PROJECT_RULE`. Another item should consume only the stop/retry logic, not this Rurubu master or its IDs.