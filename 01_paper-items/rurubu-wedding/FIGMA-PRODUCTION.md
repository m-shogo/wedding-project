# るるぶWEDDING Figma Production

- status: FILE_CREATED / FOUNDATION_SPEC_READY / WIREFRAME_SPEC_READY / FIGMA_BUILD_SPEC_READY / IDENTITY_3_DIRECTION_READY / INSIDE_BACK_WIREFRAME_SPEC_READY / WRITE_BLOCKED_BY_FIGMA_STARTER_MCP_LIMIT
- production file: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
- created: 2026-07-29
- last verified Figma MCP block: 2026-07-30
- rule: this URL is the single production Figma file for るるぶWEDDING
- Current authority: GitHub `main`. Drive Current Authority still contains a stale historical branch pointer; do not restore that branch as authority.
- foundation spec: `FOUNDATION.md`
- outer-cover wireframe comparison spec: `WIREFRAME.md`
- inside/back wireframe comparison spec: `INSIDE-BACK-WIREFRAME.md`
- executable Figma wireframe build: `FIGMA-WIREFRAME-BUILD.md`

## Current build target
A4二つ折り 420×297mm spread。Front coverは `るるぶ WEDDING` / `YOKOHAMA 2026.10.24` / couple hero photo / PICK UP badge。Back coverは OUR TRAVEL NOTES を軸に、思い出スポット・友達・歴史を旅行誌として整理する。Insideは Profile / About Us / History / Memory Spots を、Travel Editorial Grid と Journey Feature Spread の2方向で比較する。

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
- `assets/rurubu-wedding-identity-mono-v1.svg`: CANDIDATE — Rounded Travel Masthead direction; route/heart/plane motif.
- `assets/rurubu-wedding-identity-editorial-pop-v1.svg`: CANDIDATE — Editorial Pop direction; bold editorial hierarchy.
- `assets/rurubu-wedding-identity-stamped-issue-v1.svg`: CANDIDATE — Stamped Travel Issue direction; issue-stamp/travel-ticket character.
- raster transparency attempts: REJECTED. Checkerboard/background pixels were baked into generated images, so raster generation is no longer the primary path.

## Freeze progress
- Fixed asset generation is proceeding as one asset per file; asset-sheet generation is prohibited.
- Current vector route avoids the failed raster transparency loop entirely.
- Drive production upload remains pending where the connector cannot accept the GitHub/local SVG bytes directly; GitHub `main` remains the Current source until a byte-capable Drive upload path is available.
- Foundation geometry/content hierarchy is documented in `FOUNDATION.md` without guessing printer-specific bleed/safe values.
- Three monochrome outer-spread wireframes are specified in `WIREFRAME.md`: A Classic Rurubu, B Editorial Split, C Scrapbook Journey. A is the provisional first candidate only; final selection waits for same-condition Figma comparison and weighted rubric scoring.
- `FIGMA-WIREFRAME-BUILD.md` fixes the physical-size-equivalent Figma geometry, shared stress-copy payload, semantic node structure, incremental mutation order and QA checklist so quota recovery can go directly to canvas execution without rediscovery.
- `INSIDE-BACK-WIREFRAME.md` now closes the remaining Drive Design Freeze wireframe requirement: two inside directions and two back-cover directions, with common stress payload, weighted rubric and explicit exit criteria. No direction is frozen before canvas comparison.
- Figma MCP read/write remains blocked by the Starter plan call limit as verified on 2026-07-30; do not repeat mutation probes within the same blocked run.
- Drive Design Freeze requires three independent monochrome logo directions before production; all three are present as separate SVG candidate files. None is frozen until same-condition cover comparison validates hierarchy, originality and print-scale legibility.

## Next write when MCP quota recovers
1. execute `FIGMA-WIREFRAME-BUILD.md` against the existing production file
2. create/reuse `01_RURUBU_WEDDING`
3. create the three outer spread wrappers and validate geometry
4. add Front/Back containers, provisional fold guide, variables and text styles
5. populate A/B/C with identical shared copy
6. place the three monochrome identity directions one at a time for same-condition comparison
7. screenshot and score the weighted rubric; promote only the winner
8. build `02_INSIDE_WF_A` and `02_INSIDE_WF_B` from `INSIDE-BACK-WIREFRAME.md`
9. build `03_BACK_WF_A` and `03_BACK_WF_B` from the same spec
10. run the common long-copy / 6-milestone / 4-memory-spot / photo-ratio stress payload
11. promote only the structural winners to Visual Design
12. place native date/hero-photo structure on the winners
13. import/recreate remaining frozen SVG candidates one at a time
14. continue Visual Design → real-data Stress Test → QA
