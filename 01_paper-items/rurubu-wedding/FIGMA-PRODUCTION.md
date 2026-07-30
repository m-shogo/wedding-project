# るるぶWEDDING Figma Production

- status: FILE_CREATED / FOUNDATION_SPEC_READY / WIREFRAME_SPEC_READY / FIGMA_BUILD_SPEC_READY / WRITE_BLOCKED_BY_FIGMA_STARTER_MCP_LIMIT
- production file: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
- created: 2026-07-29
- last verified Figma MCP block: 2026-07-30
- rule: this URL is the single production Figma file for るるぶWEDDING
- Current authority: GitHub `main`. Drive Current Authority still contains a stale historical branch pointer; do not restore that branch as authority.
- foundation spec: `FOUNDATION.md`
- wireframe comparison spec: `WIREFRAME.md`
- executable Figma wireframe build: `FIGMA-WIREFRAME-BUILD.md`

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
- `assets/photo-frame-tape-v1.svg`: CANDIDATE
- `assets/best-shot-tag-v1.svg`: CANDIDATE
- `assets/rurubu-wedding-identity-mono-v1.svg`: CANDIDATE — original monochrome identity study; transparent exterior; route/heart/plane motif; must be judged in the same-condition cover comparison before Freeze.
- raster transparency attempts: REJECTED. Checkerboard/background pixels were baked into generated images, so raster generation is no longer the primary path.

## Freeze progress
- Fixed asset generation is proceeding as one asset per file; asset-sheet generation is prohibited.
- Current vector route avoids the failed raster transparency loop entirely.
- Drive production upload remains pending where the connector cannot accept the GitHub/local SVG bytes directly; GitHub `main` remains the Current source until a byte-capable Drive upload path is available.
- Foundation geometry/content hierarchy is documented in `FOUNDATION.md` without guessing printer-specific bleed/safe values.
- Three monochrome outer-spread wireframes are specified in `WIREFRAME.md`: A Classic Rurubu, B Editorial Split, C Scrapbook Journey. A is the provisional first candidate only; final selection waits for same-condition Figma comparison and weighted rubric scoring.
- `FIGMA-WIREFRAME-BUILD.md` now fixes the physical-size-equivalent Figma geometry, shared stress-copy payload, semantic node structure, incremental mutation order and QA checklist so quota recovery can go directly to canvas execution without rediscovery.
- Figma MCP read/write remains blocked by the Starter plan call limit as verified on 2026-07-30; do not repeat mutation probes until quota recovers.
- Identity is now an explicit single-asset monochrome candidate instead of being folded into decorative asset generation. It remains CANDIDATE until Figma wireframe comparison validates hierarchy and legibility.

## Next write when MCP quota recovers
1. execute `FIGMA-WIREFRAME-BUILD.md` against the existing production file
2. create/reuse `01_RURUBU_WEDDING`
3. create the three spread wrappers and validate geometry
4. add Front/Back containers, provisional fold guide, variables and text styles
5. populate A/B/C with identical shared copy
6. screenshot and score the weighted rubric; promote only the winner
7. place native title/date/hero-photo structure on the winner
8. import/recreate frozen SVG candidates one at a time
9. continue Visual Design → real-data Stress Test → QA
