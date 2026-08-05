# V5 history-photo inline JPEG transfer rejection

Date: 2026-08-06
Item/version: Rurubu WEDDING V5
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Candidate: `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` (`77:290`)
Target: `77:422 / IA_HISTORY_MEMORY_PHOTO`
Status: `PROTOTYPED -> REJECTED -> ROLLED_BACK / NO_GATE_CHANGE`

## Visible problem

The live history lead photo remains visibly low-resolution at reading and actual-size scales. A higher-quality role-sized JPEG derivative already exists in verified Google Drive storage, but previous external upload attempts were blocked by DNS resolution of `mcp.figma.com`.

## Source and hypothesis

Verified Drive derivative:

- filename: `RURUBU_V5_05_HISTORY__FIGMA_1356x560_Q90.jpg`
- Drive ID: `1S0lJpPdM9pXNIkgJnq0iyFyq7KBRLe8M`
- MIME: `image/jpeg`
- bytes: `213,613`

Hypothesis: after the external upload path failed again, a deliberately bounded JPEG proof reconstructed inside `use_figma` with a custom decoder might establish a network-independent binary path. Adoption required a valid image render, preserved geometry/crop semantics, screenshot QA, and exact hash evidence.

## Experiment

1. Confirmed target state before mutation:
   - node size: `678 x 280`
   - scale mode: `FILL`
   - original image hash: `1bfd7f1fa601206bfed1594a140b40554e85d77a`
2. Requested a single-use Figma upload URL for the exact node. The execution environment again could not resolve `mcp.figma.com`; this unchanged route was stopped.
3. Tested a short inline JPEG payload.
   - the first `atob` attempt failed validation before mutation; the failed script was atomic.
   - a custom decoder then produced `6,548` bytes and `figma.createImage()` returned image hash `952509ffb548659790700977bd0a8f2161bad2fa`.
4. Applied the candidate hash to the exact semantic node without changing its size or position.
5. Captured the full inside-spread screenshot before adoption.

## Result and failure

**Rejected.** The screenshot showed the entire history-photo area as blank despite successful node mutation and a returned IMAGE hash. Therefore the decoded payload or runtime interpretation was not visually valid. Transport success, byte count, and IMAGE-hash creation did not establish a usable image.

The candidate was immediately rolled back:

- rejected hash: `952509ffb548659790700977bd0a8f2161bad2fa`
- restored hash: `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- rollback screenshot: history photo visibly restored
- node geometry, caption strip, native text, reading order, and surrounding layout unchanged

## Expected improvement and possible regression

Expected improvement was a sharper history image from the verified Drive derivative. The realized regression was complete visual loss of the photo. Because screenshot QA preceded ledger adoption, the regression did not remain in Current.

## Evidence needed for a future adoption

A future method must provide all of the following:

- binary-safe transfer from the exact Drive file or mounted local file;
- valid decoder/runtime rendering, not only an IMAGE hash;
- screenshot QA at whole-spread, page, and actual-size detail scales;
- preserved node ID, non-destructive crop, native text, and rollback frame;
- recorded Drive ID -> node ID -> final image hash chain;
- ledger and Git readback only after visual acceptance.

## Gate impact

- `PHOTO_ROLE_PASS`: unchanged.
- intended-source count: unchanged.
- V5 dummy-design QA gate: not reached.
- V6 production gate: remains closed.
- no generated asset was accepted or regenerated.

## Next application

Do not retry manual model-visible base64 or the unchanged DNS-blocked POST route. Continue other safe editorial/QA work until a connector-native file parameter, a mounted-file upload action, or another genuinely binary-safe Figma replacement capability becomes available.