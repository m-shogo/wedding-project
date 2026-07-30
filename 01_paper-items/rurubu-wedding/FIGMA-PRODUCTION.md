# るるぶWEDDING Figma Production

- status: FILE_CREATED / FOUNDATION_SPEC_READY / WIREFRAME_SPEC_READY / FIGMA_BUILD_SPEC_READY / INSIDE_BACK_WIREFRAME_SPEC_READY / PNG_ASSET_REWORK_8_TO_14 / WRITE_BLOCKED_BY_FIGMA_STARTER_MCP_LIMIT
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

## Asset authority

**SVG is prohibited for current るるぶWEDDING production.**

Current accepted PNG candidates:
- #1 logo A
- #2 logo B
- #3 logo C
- #4 date badge
- #5 PICK UP!
- #6 CHECK!
- #7 BEST SHOT

Current remake queue:
- #8 scrapbook photo frame — PNG remake pending
- #9 masking tape decoration — PNG remake pending
- #10 travel route + airplane + heart — PNG remake pending
- #11 map pin decoration — PNG remake pending
- #12 small travel icon set — PNG remake pending
- #13 photo caption ornament — PNG remake pending
- #14 feature stamps — PNG remake pending

Historical `.svg` files in `assets/` and Drive are:
`HISTORICAL / NON_PRODUCTION / DO_NOT_USE`

Old PNGs exported from those SVGs #8–#14 are also non-current because the visual direction was rejected. Their technically valid alpha channels do not make them acceptable production assets.

## Freeze progress
- asset-sheet generation is prohibited
- one accepted fixed asset = one production PNG file, except queue items explicitly defined as a set
- transparent PNG must pass visual QA before alpha/Drive QA is allowed to justify completion
- Foundation geometry/content hierarchy is documented in `FOUNDATION.md` without guessing printer-specific bleed/safe values
- three monochrome outer-spread wireframes are specified in `WIREFRAME.md`: A Classic Rurubu, B Editorial Split, C Scrapbook Journey
- `FIGMA-WIREFRAME-BUILD.md` fixes the physical-size-equivalent Figma geometry, shared stress-copy payload, semantic node structure, incremental mutation order and QA checklist
- `INSIDE-BACK-WIREFRAME.md` specifies two inside directions and two back-cover directions
- Figma MCP read/write remains blocked by the Starter plan call limit as verified on 2026-07-30; do not repeat mutation probes within the same blocked run
- the old SVG identity files are not production logo authority; actual accepted logo PNG candidates #1–#3 are the current candidates

## Next write when MCP quota recovers
1. execute `FIGMA-WIREFRAME-BUILD.md` against the existing production file
2. create/reuse `01_RURUBU_WEDDING`
3. create the three outer spread wrappers and validate geometry
4. add Front/Back containers, provisional fold guide, variables and text styles
5. populate A/B/C with identical shared copy
6. place logo PNG candidates A/B/C one at a time for same-condition comparison where needed
7. screenshot and score the weighted rubric; promote only the winner
8. build `02_INSIDE_WF_A` and `02_INSIDE_WF_B` from `INSIDE-BACK-WIREFRAME.md`
9. build `03_BACK_WF_A` and `03_BACK_WF_B` from the same spec
10. run the common long-copy / 6-milestone / 4-memory-spot / photo-ratio stress payload
11. promote only the structural winners to Visual Design
12. place native date/hero-photo structure on the winners
13. import only accepted Current transparent PNG assets one at a time
14. never import or recreate SVG assets for this production path
15. continue Visual Design → real-data Stress Test → QA