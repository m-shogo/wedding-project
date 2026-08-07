# AI Video Local Probe Evidence

## Purpose

Movie Dashboard can inspect a locally selected generated video before formal result review. The file itself stays in the browser; it is not uploaded to Git, Drive, or any external AI service by this feature.

When the browser successfully reads the media metadata, result intake may persist only a small audit line on the generated result Asset:

```text
local-media-probe=completed / probedAt=<ISO> / preview-frames=<n>
```

This evidence means only that the local file was opened by the probe and metadata was read. `preview-frames=3` means the first/middle/end QA preview extraction succeeded for all three samples. A smaller value means the preview extraction was partial or unavailable.

## Important boundary

`local-media-probe=completed` is **not** a human visual QA PASS and never changes Prompt status by itself. Formal adoption still requires the existing AI video result review checklist and authoritative selected-result record.

The production evidence intentionally does not store the local file name, file size, browser local path, or preview image data. Those values remain display-only.
