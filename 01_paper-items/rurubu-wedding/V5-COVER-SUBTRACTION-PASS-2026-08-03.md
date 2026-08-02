# V5 Cover Subtraction Pass — 2026-08-03

Status: `VERIFIED_VISUAL_IMPROVEMENT / PHOTO_PIPELINE_STILL_BLOCKED`

## Visible problem

The V5 front cover had an oversized raster `BEST SHOT` decoration in the lower-right of the hero photograph. It overlapped the dominant image, competed with the nearby `SPECIAL INTERVIEW` module, and added another loud visual voice to an already dense cover.

The dominant hero itself remains visibly low quality and is still governed by the ledger state `REJECT_LOW_QUALITY_DERIVATIVE`; this pass does not claim to solve that separate defect.

## Editorial principle tested

- Attempt subtraction before adding new cards, badges, stickers, shadows, gradients, or color fields.
- A cover may be abundant, but supporting decorations must not compete with the masthead, main promise, dominant photograph, and primary feature hierarchy.
- Technical presence is not editorial necessity.

## Live Figma change

File: `bfM0d4c9dCeBv5pCkJ3TNM`

Page: `01_RURUBU_WEDDING`

Candidate frame:
- `01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` — `77:18`

Changed node:
- `DECOR_BEST_SHOT` — `77:166`
- state changed from `visible: true` to `visible: false`

Preserved:
- hero semantic node `IMG_HERO` — `77:148`
- masthead, date badge, feature index, cover snap, native text, frame hierarchy, and V4 rollback

## Verification

A new whole-spread screenshot was taken after the mutation.

Observed result:
- the lower-right hero area is calmer;
- the `SPECIAL INTERVIEW` module is easier to distinguish;
- the photograph has more uninterrupted area;
- the cover still retains the Rurubu-like masthead, date, color bands, star stamp, cover snap, and six-feature index;
- no semantic content, native text, or structural node was removed.

This is a bounded editorial improvement, not a complete cover pass.

## Failed binary-transfer experiments retained as lessons

During the same run, two higher-quality cover-hero transfer methods were tested and rejected without mutating the live node:

1. Figma single-use upload URL + local multipart upload
   - blocked because the execution container could not resolve `mcp.figma.com`;
2. inline long base64 image payload
   - rejected by `figma.base64Decode()` due payload integrity failure.

Both failed Figma scripts were atomic. The current hero image hash and ledger state must remain unchanged. Long binary assets should not be manually transcribed through model-visible text.

## Reusable lesson

When a dominant asset is temporarily blocked by transport, continue only safe improvements that can be independently verified. Do not hide the unresolved dominant-image defect, but do not let it freeze all editorial progress.

A decorative element should survive only when it has a unique semantic or navigational job and improves the hierarchy at thumbnail scale.

## Next action

Highest priority remains a binary-safe, quality-preserving replacement of:

1. cover hero `77:148`;
2. back main `77:24`;
3. history lead `77:422`.

Do not mark any photo role complete until Drive ID → node ID → image hash evidence, screenshot QA, and structure QA are all present.
