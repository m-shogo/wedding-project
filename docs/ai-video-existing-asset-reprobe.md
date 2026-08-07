# Existing AI Video Reprobe

`/video-asset-reprobe` exists to add or refresh local-media probe evidence on an **existing** generated-video Asset without replacing the media.

## What the page may change

Only the Asset `notes` line beginning with `local-media-probe=completed` is replaced. The update is one normal Movie Dashboard history entry and can be undone.

## What the page must not change

- video file contents
- Asset path
- Asset title
- Asset status
- Prompt adoption/rejection state
- scene relationships
- generation ID / seed / stored reproduction metadata

If the newly probed local file reports materially different duration or resolution from the stored reproduction metadata, the page warns instead of rewriting those fields. A genuinely different generation should remain a separate Asset so lineage and review history are preserved.

This follows the project rule that generated media is non-destructive: regenerate, replace, or revise video content as another Asset; use reprobe only to refresh audit evidence for the same existing media.
