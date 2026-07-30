# るるぶWEDDING — PNG-only Asset Integration QA 2026-07-30

Status: `LOCAL_QA_COMPLETE / FIGMA_PLACEMENT_PENDING`
Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Purpose

SVG-derived #8–#14 were rejected for visual quality and rebuilt as new raster-native transparent PNGs. This QA checks the **new PNG-only assets together in one approximate Cover A / Back A spread** before Figma access recovers.

This is a local integration check only. It is not production artwork and does not promote Cover A to Final.

## Evidence

Local artifact:
- `rurubu_pngonly_asset_integration_previsual_A.png`

Drive QA evidence:
- file: `QA_rurubu_pngonly_asset_integration_previsual_A_20260730.png`
- Drive ID: `1dSHrMGfdaNoZUlmoqK1oAFCLlvWMVtho`
- Drive metadata readback: VERIFIED

The integration preview uses only the new accepted PNG-only #8–#14 assets. It does not use historical SVGs or rejected SVG-derived PNGs.

## Integration read

### PASS

- new #8–#14 share a coherent handmade-paper / pastel travel-magazine language
- alpha edges remain usable over the cream page background
- #8 scrapbook frame reads correctly around a secondary photo area
- #9 masking tape works as a small photo-corner accent
- #10 dotted route is readable at reduced scale and works naturally in HISTORY / journey areas
- #11 map pin remains legible at small size and suits MEMORY SPOTS
- #13 blank caption ornament has enough center space for Figma-native text
- #14 stamps remain legible as small accent marks

### Main risk found: decoration overload

When #12 icon row and multiple #14 stamps are placed in the same lower cover region, the layout becomes noticeably too busy. The problem is not asset quality in isolation; it is simultaneous density.

The existing `BEST SHOT` badge is already visually dense, so nearby extra stamps compete with it quickly.

## Decoration budget — production rule

Use the following as a visual-density guardrail when Figma access returns.

### Front cover

Beyond the logo/date/hero-photo structure:
- target **2–3 decorative PNG groups maximum**
- `BEST SHOT` counts as one dense group
- one masking-tape accent counts as one group
- one #14 stamp counts as one group
- do **not** place the full #12 icon row and multiple #14 stamps together in the same small footer/feature zone
- hero photo remains the largest visual mass

Recommended first Cover A test:
1. logo/date
2. hero photo
3. one #9 tape accent
4. `BEST SHOT`
5. at most one #14 stamp
6. feature copy as Figma-native text

Keep #12 off the first Cover A pass. Reintroduce only if the composition has clear unused space after real-photo placement.

### Back cover

The back can use more varied small motifs because its modules are spatially separated, but each motif must have a job:
- #8 = secondary/memory photo frame
- #10 = HISTORY / journey route
- #11 = MEMORY SPOTS location cue
- #13 = one caption treatment per relevant photo cluster
- #14 = optional single accent, not repeated filler

### Inside spread

Prefer #12 small travel icon set inside the profile/history spread rather than on the front cover. It works better as a navigation/micro-detail device than as a cover focal decoration.

## Asset-specific placement guidance

- #8: secondary photos / scrapbook memory module; **not** front-cover hero frame
- #9: one small tape strip per photo area; avoid repeated wallpaper use
- #10: history, route, journey transition; keep away from dense body copy
- #11: use only where location semantics are real
- #12: inside-page navigation/micro-detail; avoid full set on already dense cover
- #13: blank caption holder with Figma-native text over it; never rasterize the caption text
- #14: one stamp per page/major zone maximum unless a later screenshot proves additional density is safe

## Figma recovery consequence

When MCP access returns:
1. build A/B/C structural wireframes as already specified
2. promote the structural winner only after same-condition screenshots and stress QA
3. on the first Visual pass, insert a **reduced PNG subset**, not every accepted asset
4. compare the real-photo hierarchy first
5. add decorations one at a time and stop as soon as the page reads complete

## Boundary

- no new fixed decorative generation is justified by this QA
- current #1–#14 queue stays complete
- historical SVGs and historical SVG-derived #8–#14 PNGs remain non-current
- local previsual is QA evidence only; production authority remains the Figma file once access is available