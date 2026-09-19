# Rurubu WEDDING V30 — Codex P05 Phase A / Header Calibration

## HARD
This is V30 continuation. DO NOT create V31.

repo: `m-shogo/wedding-project`
branch: `rurubu/v30-final-production-20260901`
PR: `#878`

Target only:
- P05 existing Figma frame `3535:15`
- Phase A only
- one representative ecology only: `P05_HEADER_ECOLOGY_V30_ALIGNED`

Do not modify:
- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

Do not create a duplicate P05 frame.

## Before writes
Fetch/rebase to latest remote branch and confirm PR #878 current head.

Read in this order:
1. `docs/RURUBU-CURRENT.md`
2. `assets/rurubu-v30/manifest.json`
3. `assets/rurubu-v30/preproduction-page-gates-manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. `assets/rurubu-v30/ornament-art-direction-manifest.json`
6. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
7. `assets/rurubu-v30/p05/manifest.json`
8. `assets/rurubu-v30/p05/production-plan-manifest.json`
9. actual Visual Master `assets/rurubu-v30/p05/P05.png`

The P05 manifest has already been updated from direct ChatGPT review of the actual Visual Master and direct live-Figma review. Do not revert it to old prose.

## P05 role
`FRIENDS MEMORIES ONLY`

Hard facts:
- exactly 8 independently replaceable friend-photo slots
- exactly 4 SHOGO + 4 SHIORI
- SHOGO stays left/blue
- SHIORI stays right/pink
- no family page
- no Hawaii feature page
- no proposal/arrival carry-over
- no giant hero
- no generic equal-card grid

P05 live Figma `3535:15` was reviewed as:
`BLANK_CREAM_FRAME / NO_ACTIVE_P05_PRODUCTION_MODULES`

This is a blank safe start, not cleanup.

## Phase A — only one job
Generate:
`P05_HEADER_ECOLOGY_V30_ALIGNED`

It is ONE authored grouped display block.

Include as one ecology:
- `るるぶ`
- `2026`
- `友達との思い出`
- subtitle ribbon: `最高の仲間たちと、笑顔で未来へ！`
- tropical hibiscus / plumeria / foliage
- sparkle accents
- airplane + heart-route logic
- camera accent
- ring / diamond sparkle accent
- `OUR JOURNEY / TAKE A TRIP` stamp relationship

Do NOT split these into isolated clipart assets.

Do NOT generate:
- SHOGO FRIENDS / SHIORI FRIENDS headers yet
- photo vessels
- friend photos
- captions
- closing bubble
- PAGE 05
- micro accents
- full P05 assembly

## Style target
P01/P02/P03/P04 are rendering-family anchors, never layout templates.

Match:
- very high saturation
- hot pink
- vivid blue
- yellow
- green
- cyan
- strong navy/black outline
- crisp silhouette
- white/yellow keyline
- controlled dimensional shadow
- printed sticker/cutout feel
- bright clean editorial paper energy
- cute Japanese travel magazine / るるぶ temperature
- tropical motifs rendered as pop editorial cutouts

Reject:
- watercolor
- painterly/fine-art botanical
- aged parchment / sepia
- retro travel poster
- generic Canva/SVG icon packs
- SaaS flat illustration
- muted beige wedding editorial
- thin flat vector-only styling
- dominant `#7e08f9` purple

## Important note about the earlier ChatGPT draft
A ChatGPT-side Header draft was generated before the manifest writeback. It is NOT production authority and must not be treated as accepted evidence. The official Phase A starts now from the updated manifest + actual P05 Visual Master.

Do not import that untracked draft as production.

## True Alpha
Before Figma placement require:
- `ART_QUALITY_PASS`
- `TRUE_ALPHA_PREFLIGHT_PASS`
- `ALPHA_INTERIOR_OPACITY_PASS`
- `EDGE_ALPHA_QUALITY_PASS`

If direct alpha produces checkerboard or opaque RGB:
1. reject that alpha production state
2. DO NOT repeat the same failed direct-alpha method
3. switch to a single separable flat extraction matte
4. edge-aware extract to real RGBA
5. decontaminate matte RGB from partial-alpha edge pixels
6. composite on light / mid-gray / dark backgrounds
7. verify curves, flowers, leaves, airplane, rings, camera, ribbon tails and lettering
8. proceed only when all four gates PASS

A checkerboard is never an extraction matte.

## Figma
When the Header passes the four gates:
- place ONLY the Header into existing P05 frame `3535:15`
- use Visual Master-comparable upper-band scale/position
- do not add any other P05 modules

Then capture fresh screenshots:
- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`

Evaluate:
- saturation
- outline character
- white/yellow keyline
- shadow/depth
- sticker/cutout feeling
- tropical rendering
- paper/print feeling
- cute/pop visual temperature
- whether P05 keeps its own friends-page composition

Set:
`CROSS_PAGE_STYLE_FAMILY_PASS = PASS | FAIL`

If FAIL:
- regenerate/rework Header only
- do not touch other P05 modules

If PASS:
- record evidence
- STOP this run
- DO NOT continue to Phase B in the same run

## Evidence / storage
Follow the same production-storage discipline as P01-P04.

Use a path such as:
`assets/rurubu-v30/p05/production/phase-a-header-calibration/`

Preserve:
- source/matte if used
- final production RGBA
- SHA256
- alpha diagnostics
- light/gray/dark composite QA
- fresh P01-P05 screenshots
- cross-page comparison
- production manifest/evidence

Sync accepted production/QA assets into the existing V30 Drive structure as with prior pages.

## Blocker rule
Do not stop merely because direct-alpha generation failed once.

Use the documented fallback first.

If the same actual operation/fallback path blocks twice for ImageGen, alpha conversion, Figma write/upload, Drive sync or Git write, report immediately and stop repeated retries.

## Final report
Return:
1. Header asset path + SHA256
2. source/matte path if used
3. alpha diagnostics
4. four gate results
5. Figma Header node ID + imageHash
6. fresh P01/P02/P03/P04/P05 screenshots
7. `CROSS_PAGE_STYLE_FAMILY_PASS`
8. 3–5 concrete visual reasons
9. untouched-pages confirmation
10. Git commit SHA / PR #878 head
11. Drive evidence location
12. whether Phase B is safe to open

Even if PASS:
STOP after Phase A.
