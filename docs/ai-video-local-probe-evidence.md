# AI Video Local Probe Evidence

## Purpose

Movie Dashboard can inspect a locally selected generated video before formal result review. The file itself stays in the browser; it is not uploaded to Git, Drive, or any external AI service by this feature.

When the browser successfully reads the media metadata, result intake may persist a small audit line on the generated result Asset:

```text
local-media-probe=completed / probedAt=<ISO> / preview-frames=<n> / sample-fingerprint=sha256-sampled-v1:<digest> / sampled-bytes=<n>
```

This evidence means only that the local file was opened by the probe and metadata was read. `preview-frames=3` means the first/middle/end QA preview extraction succeeded for all three samples. A smaller value means the preview extraction was partial or unavailable.

## Sample fingerprint

For large video files, Movie Dashboard does **not** hash the entire file. It reads at most 64 KiB from the beginning, middle and end of the local file, includes the file size and sample offsets in the payload, then computes SHA-256 in the browser. This keeps the work bounded to roughly 192 KiB regardless of movie size.

The resulting `sha256-sampled-v1` value is a lightweight identity hint for catching common variant mix-ups after renaming or copying. It is **not a full-file cryptographic integrity guarantee**: two files could theoretically differ outside the sampled regions while producing the same sampled input. Never use this value as a security signature or archival checksum.

If Web Crypto or sampled reading is unavailable, metadata and QA-frame probing continue without the fingerprint.

## Important boundary

`local-media-probe=completed` is **not** a human visual QA PASS and never changes Prompt status by itself. Formal adoption still requires the existing AI video result review checklist and authoritative selected-result record.

The production evidence intentionally does not store the local file name, file size as a standalone identifying field, browser local path, or preview image data. Those values remain display-only. The sampled fingerprint is stored only as an audit hint tied to the probe evidence.
