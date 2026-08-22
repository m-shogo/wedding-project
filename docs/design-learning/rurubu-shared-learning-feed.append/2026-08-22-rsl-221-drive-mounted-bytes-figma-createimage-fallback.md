# RSL-221 — Drive-mounted bytes can bypass the blocked external Figma upload submit path

Date: 2026-08-22
Source: Rurubu WEDDING / V8 image transport
State: `VERIFIED_LOCAL`
Capability fingerprint: `DRIVE_RAW_MATERIALIZE_TO_FIGMA_CREATEIMAGE_BYTES`
Failure fingerprint: `F-RSL-221-FIGMA-PLUGIN-RUNTIME-HAS-NO-FETCH`

## Context

RSL-208 already records that the official external upload submit route was blocked by DNS resolution at `mcp.figma.com`. Repeating that unchanged POST is prohibited without a material environment change.

## New capability tested

A verified V8 Drive master was fetched through the connected Drive authority and materialized into the execution environment. A low-resolution transport derivative was encoded as bytes and injected into the Figma Plugin API with `figma.createImage(bytes)`, avoiding the external upload-submit endpoint entirely.

Verified source master:
- Drive ID: `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- file: `v8_ocean_light_essay_master.png`

## Failed alternate method

A first alternate attempt tried to fetch the Drive download URL from inside the Figma Plugin API runtime. The script failed atomically with `ReferenceError: fetch is not defined`; no Figma write occurred.

This method must not be retried unchanged. Plugin runtime network fetch is not currently an available bridge.

## Successful bounded probe

Method switched to:

`Drive raw fetch → execution-environment bytes → small transport derivative → base64/byte decode in Figma script → figma.createImage(bytes) → hidden QA image fill`

Hidden QA evidence:
- frame: `2266:2 / QA / DRIVE_MOUNT_BYTES_TO_FIGMA_CREATEIMAGE / 2026-08-22`
- rectangle: `2266:3 / LOW_RES_TRANSPORT_PROBE_NOT_PRODUCTION`
- imported image hash: `69f50f48faf0a463bf09b249a25b6669698aca7a`
- probe bytes: `736`
- parent page: `2052:2`
- QA frame visibility: hidden

## What this proves

- The blocker is not `figma.createImage(bytes)` itself.
- A byte-injection fallback exists when the image has already been materialized from Drive.
- Future production use can preserve the full-resolution Drive master and create an appropriately sized, visually QA'd Figma derivative for the exact image role.

## What this does NOT prove

- The 64×45 transport probe is not production quality and must never be promoted as an asset.
- Large image payloads may exceed the `use_figma` script-size ceiling when embedded directly; larger assets still need a bounded derivative/chunking/file-bridge strategy.
- This run did not generate a new image-model asset.
- This run did not replace the Current Outer master or any production IMAGE role.

## Next experiment

When a new role-specific generated master exists in Drive, prefer:

1. keep the high-quality Drive master immutable;
2. derive the exact Figma-role dimensions/quality outside Figma;
3. confirm derivative quality and physical/effective resolution;
4. if the encoded payload fits the plugin write contract, inject bytes with `figma.createImage`;
5. place into the exact replaceable image role;
6. verify image hash/crop and whole/reading/actual-size screenshots;
7. otherwise record the payload-size blocker and switch to a larger binary bridge rather than falling back to low-quality screenshots.

Item-specific image content and hashes do not transfer across wedding items; only the transport capability/failure method may transfer.
