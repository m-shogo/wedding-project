# るるぶWEDDING Figma Production

- status: FILE_CREATED / WRITE_BLOCKED_BY_FIGMA_STARTER_MCP_LIMIT
- production file: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
- created: 2026-07-29
- rule: this URL is the single production Figma file for るるぶWEDDING

## Current build target
A4二つ折り 420×297mm spread。Front coverは `るるぶ WEDDING` / `YOKOHAMA 2026.10.24` / couple hero photo / PICK UP badge。Back coverは OUR TRAVEL NOTES を軸に、思い出スポット・友達・歴史を旅行誌として整理する。

## Asset state
- `assets/pickup-badge-v1.svg`: CANDIDATE / transparent by construction / Figma-editable SVG
- raster transparency attempts: REJECTED. Checkerboard/background pixels were baked into generated images, so raster generation is no longer the primary path.

## Next write when MCP quota recovers
1. create `01_Cover_Back` A4 spread
2. establish front/back foundation and fold guide
3. place native title/date/hero-photo placeholder
4. import or recreate `pickup-badge-v1.svg`
5. continue wireframe → visual design → real-data stress test → QA
