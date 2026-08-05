# IMAGE-hash creation does not prove renderability

Date: 2026-08-06
Scope: Rurubu V5/V6 and later Figma image-transfer work
Status: `PROTOTYPED / VERIFIED FAILURE / NOT PROJECT_RULE`

## Source

A verified Drive JPEG derivative for the V5 history lead photo was tested on semantic node `77:422 / IA_HISTORY_MEMORY_PHOTO` after the normal Figma upload endpoint remained unreachable from the execution environment.

## Hypothesis

If a bounded JPEG payload decoded to bytes and `figma.createImage()` returned an image hash, the resulting fill might provide a network-independent replacement route.

## Result

The runtime returned image hash `952509ffb548659790700977bd0a8f2161bad2fa` and accepted the fill mutation, but screenshot QA showed a completely blank photo area. The node was immediately restored to original hash `1bfd7f1fa601206bfed1594a140b40554e85d77a`; a rollback screenshot confirmed restoration.

## Failure

The experiment proved that all of the following can succeed while visual output still fails:

- custom payload decoding;
- nonzero decoded byte count;
- `figma.createImage()` returning a hash;
- assignment of an IMAGE fill;
- preservation of node geometry and scale mode.

The likely fault is malformed or incomplete binary content that passed the API boundary without yielding a renderable image. The exact internal decoder behavior remains runtime-specific and is not inferred beyond the observed blank render.

## Reusable principle

Treat **renderability** as its own evidence gate after transfer integrity, format compatibility, and IMAGE-hash creation. Only a visual screenshot can establish that the intended pixels actually render.

Required sequence:

1. verify source and role-sized derivative;
2. transfer with a binary-safe method;
3. verify byte integrity and format compatibility;
4. apply to the exact semantic node;
5. verify screenshot rendering before any ledger update;
6. verify structure and provenance;
7. adopt or roll back.

## Process change

- Never treat a returned image hash as visual completion.
- Do not use aggressively compressed or manually transcribed image payloads for production placement.
- Keep the previous image hash available until screenshot QA passes.
- Roll back immediately when the target renders blank, corrupted, or materially degraded.
- Do not retry an unchanged blocked upload route or manual base64 route after repeated failure.

## Evidence

- Drive source ID: `1S0lJpPdM9pXNIkgJnq0iyFyq7KBRLe8M`
- target node: `77:422`
- rejected hash: `952509ffb548659790700977bd0a8f2161bad2fa`
- restored hash: `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- failed candidate decoded bytes: `6,548`
- screenshot result: blank photo area
- rollback screenshot result: original photo restored

## Adoption status

This observation is verified for the current runtime and workflow. It is not promoted into a universal project rule until reproduced or generalized across another bounded test. The mandatory screenshot gate already remains a project-wide authority.