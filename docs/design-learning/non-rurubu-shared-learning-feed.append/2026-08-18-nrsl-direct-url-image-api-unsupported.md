# NRSL — Figma direct-URL image ingestion may be unsupported even when URL provenance is valid

Source scope/item: non-Rurubu / ADD-02 table signs V14
Date: 2026-08-18
State: `BLOCKED / FAILURE_FINGERPRINT_RECORDED`

## Visible / operational problem

ADD-02 V14 has a structurally valid replaceable image role but cannot yet place the intended high-resolution Hawaii destination photo. The older shell/upload route is already stopped because the runtime cannot deliver bytes to `mcp.figma.com`.

## New bounded method tested

A materially different method attempted to bypass shell binary transport by asking the connected Figma Plugin API runtime to load the verified public source directly:

`figma.createImageAsync(publicHttpsUrl)`

The Wikimedia source itself was valid and independently verified: non-person Diamond Head / Waikīkī photograph, 4032×3024 JPEG, Farragutful, CC BY-SA 4.0.

## Result

Connected `use_figma` returned:

`Error: in createImageAsync: "createImageAsync" is not a supported API`

No image was placed and no production/legacy node mutated.

## Failure fingerprint

- operation/capability: ingest public raster URL directly into Figma image resource;
- environment/tool path: connected `use_figma` Plugin API runtime;
- symptom/error family: requested Plugin API method explicitly unsupported;
- likely cause class: restricted/unsupported API surface in this runtime, not source licensing or layout geometry;
- last known evidence date: 2026-08-18;
- replacement method / stop condition: do not retry `createImageAsync` unless the connected Figma environment materially changes or advertises support. Use a connector-native binary/file-reference transfer or a newly supported image-ingestion capability instead.

## Regression / transfer boundary

This is a production-capability lesson only. Do not transfer ADD-02 layout, Hawaii imagery, crop, palette, typography or table-sign art direction to another item.

## Cross-item applicability

Any non-Rurubu item blocked on raster placement should check the known ingestion capability before spending a run preparing image assets. A valid web URL does not imply that `use_figma` can turn it into an IMAGE fill.

## Evidence

- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- V14 root: `78:8`
- replaceable hero: `78:9`
- item evidence: `01_paper-items/additional-wedding-items/ADD-02-table-signs/FIGMA-V14-DIRECT-URL-IMAGE-API-PROBE-2026-08-18.md`
- item evidence commit: `c887d96fbdd57081e3a550f5896a57f7a6c18a82`

Do not promote this to a project-wide rule yet; it is one connected-runtime capability observation, but the stop condition should prevent wasteful repeated retries in the same environment.
