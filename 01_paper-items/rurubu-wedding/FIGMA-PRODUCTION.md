# るるぶWEDDING Figma Production

- status: FILE_CREATED / WRITE_BLOCKED_BY_FIGMA_STARTER_MCP_LIMIT
- production file: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
- created: 2026-07-29
- last verified Figma MCP block: 2026-07-30
- rule: this URL is the single production Figma file for るるぶWEDDING
- Current authority: GitHub `main`. Drive Current Authority still contains a stale historical branch pointer; do not restore that branch as authority.

## Current build target
A4二つ折り 420×297mm spread。Front coverは `るるぶ WEDDING` / `YOKOHAMA 2026.10.24` / couple hero photo / PICK UP badge。Back coverは OUR TRAVEL NOTES を軸に、思い出スポット・友達・歴史を旅行誌として整理する。

## Asset state
All listed SVG assets are transparent by construction: the SVG root has no background rectangle/image and only the intended artwork is painted. They are Figma-editable candidates and are kept as separate single-asset files.

- `assets/pickup-badge-v1.svg`: CANDIDATE
- `assets/date-badge-v1.svg`: CANDIDATE
- `assets/route-heart-plane-v1.svg`: CANDIDATE
- `assets/check-burst-v1.svg`: CANDIDATE
- `assets/cloche-heart-v1.svg`: CANDIDATE
- `assets/champagne-heart-v1.svg`: CANDIDATE
- `assets/guidebook-check-v1.svg`: CANDIDATE
- `assets/hearts-sparkle-v1.svg`: CANDIDATE
- raster transparency attempts: REJECTED. Checkerboard/background pixels were baked into generated images, so raster generation is no longer the primary path.

## Freeze progress
- Fixed asset generation is proceeding as one asset per file; asset-sheet generation is prohibited.
- Current vector route avoids the failed raster transparency loop entirely.
- Drive production upload remains pending where the connector cannot accept the GitHub/local SVG bytes directly; GitHub `main` remains the Current source until a byte-capable Drive upload path is available.

## Next write when MCP quota recovers
1. create `01_Cover_Back` A4 spread
2. establish front/back foundation and fold guide
3. place native title/date/hero-photo placeholder
4. import/recreate the frozen SVG candidates one at a time
5. continue wireframe → visual design → real-data stress test → QA
