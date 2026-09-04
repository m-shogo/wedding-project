# Rurubu WEDDING V30 — P04 Phase A Codex Handoff

@GitHub
@Figma
@Google Drive

repo: `m-shogo/wedding-project`
branch: `rurubu/v30-final-production-20260901`
PR: `#878`

## Mission

Work on **P04 only**.

P04 role: **ALL TRAVEL MEMORIES / OUR JOURNEY**.

This run is **PHASE A ONLY**: generate, alpha-QA, install and visually calibrate **one representative Header ecology** against live P01/P02/P03. Do not scale out to the rest of P04 until the cross-page style-family gate passes.

## Read first — current authority order

Read the latest remote branch, then read in this order:

1. `docs/RURUBU-CURRENT.md`
2. `assets/rurubu-v30/manifest.json`
3. `assets/rurubu-v30/preproduction-page-gates-manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. `assets/rurubu-v30/ornament-art-direction-manifest.json`
6. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
7. `assets/rurubu-v30/p04/manifest.json`
8. `assets/rurubu-v30/p04/production-plan-manifest.json`
9. actual Visual Master: `assets/rurubu-v30/p04/P04.png`

Newest owner feedback + current page manifests override stale historical execution assumptions.

## Figma authority

File key: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `V30_FINAL_PRODUCTION`

Current frames:

- P01 `3535:7` — style anchor, DO NOT MODIFY
- P02 `3535:9` — style anchor, DO NOT MODIFY
- P03 `3535:11` — style anchor, DO NOT MODIFY
- P04 `3535:13` — target frame
- P05 `3535:15` — DO NOT MODIFY
- P06 `3535:17` — DO NOT MODIFY
- P07 `3535:19` — DO NOT MODIFY
- P08 `3535:21` — DO NOT MODIFY

Direct live review on 2026-09-04 confirmed P04 `3535:13` is effectively a blank cream frame. Treat it as a safe clean start. **Do not create a duplicate P04 frame.**

## P04 Visual Master

Use `assets/rurubu-v30/p04/P04.png` as the page-specific composition authority.

P04 is a photo-led travel-memory page with:

- large Okinawa Hero in upper-middle
- three lower support-photo roles
- destination labels local to each memory
- subordinate travel-route movement
- lower-right closing-message quiet zone
- tropical bottom closure
- PAGE 04 as separate publication component

Do not copy another page's layout.

## V30 style family — HARD

P01/P02/P03 are **rendering anchors, not layout templates**.

The accepted V30 family is:

- very bright / high saturation
- hot pink, vivid blue, yellow, green, cyan
- strong navy/black outline
- crisp silhouettes
- white/yellow keylines
- controlled dimensional shadow
- printed sticker/cutout feeling
- bright clean white/cream paper
- playful Japanese travel-magazine / Rurubu energy
- pop tropical/travel motifs

Reject:

- watercolor
- painterly tropical illustration
- fine-art botanical rendering
- aged parchment / sepia scrapbook
- retro travel poster
- generic Canva/SVG icon pack
- SaaS flat illustration
- muted beige wedding editorial
- dominant `#7e08f9` purple or nearby saturated purple drift
- thin flat vector-only treatment

`ANTI_CANVA` does **not** mean escaping into watercolor/vintage.

## PHASE A — ONLY OPEN JOB

Create one asset:

`P04_HEADER_ECOLOGY_V30_ALIGNED`

It must be **ONE grouped authored display ecology**, not a collection of mini-assets.

Include as one visual system:

- `旅の思い出`
- `ふたりで見た景色、ずっと忘れない！♡`
- top-left hibiscus/plumeria/foliage cluster
- small sparkle
- subtitle ribbon
- top-right airplane + heart-route logic
- `OUR JOURNEY / TAKE A TRIP` stamp relationship

Do not create separate flower / airplane / ribbon / heart-route / stamp clipart unless the generation system technically needs temporary source parts. The final live Figma job must read as one authored header ecology.

### Target appearance

Use the Visual Master's hierarchy but calibrate rendering to current P01/P02/P03:

- title has bold, chunky Rurubu-like mass
- hot pink + vivid blue + yellow relationship
- strong dark/navy outline
- bright white/yellow keyline
- controlled shadow/depth
- tropical flowers read as crisp editorial sticker/cutout art
- airplane/heart-route is playful but subordinate
- cute/pop temperature should belong to the same booklet as P01/P02/P03

No painterly flowers. No vintage stamp plate. No Canva icon pack.

## TRUE ALPHA — REQUIRED BEFORE FIGMA

Before placement, all four gates must pass:

`ART_QUALITY_PASS`
`TRUE_ALPHA_PREFLIGHT_PASS`
`ALPHA_INTERIOR_OPACITY_PASS`
`EDGE_ALPHA_QUALITY_PASS`

Transparent outside is not enough.

For the Header, inspect:

- flower/leaf contours
- ribbon tails
- airplane contour
- heart-route curves
- title lettering/keylines

Check real alpha channel, interior opacity and edge anti-alias/fringe quality on light, mid-gray and dark backgrounds.

If alpha is only `{0,255}`, that is a mandatory edge-quality review for this kind of organic raster art. Do not accept it just because the outside is transparent.

No fake white rescue rectangles. No Figma opacity hacks. If design is good and only cutout is weak, fix the alpha edge without redesigning.

## Install into P04

Only after alpha preflight passes:

- install the Header ecology into existing P04 `3535:13`
- use Visual Master-comparable position/scale
- do not build the full page
- do not touch P01/P02/P03/P05-P08

## CROSS-PAGE CALIBRATION — HARD STOP GATE

After the Header is live, capture fresh screenshots of:

- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`

Compare:

1. saturation
2. outline weight/character
3. white/yellow keyline
4. shadow/depth
5. sticker/cutout feel
6. tropical rendering
7. paper/print feel
8. cute/pop visual temperature

Then set:

`CROSS_PAGE_STYLE_FAMILY_PASS = PASS | FAIL`

### If FAIL

Reject/regenerate **Header only**.
Do not make location labels, route, bottom closure, message vessel or photo production.

### If PASS

Record evidence and **STOP THIS RUN**.
Do not continue to Phase B unless a later instruction explicitly opens it.

## Still blocked in this run

Do NOT produce/install:

- `P04_LOCATION_LABEL_FAMILY`
- `P04_TRAVEL_ROUTE_CONNECTOR`
- `P04_BOTTOM_CLOSURE_ECOLOGY`
- `P04_MESSAGE_PANEL`
- final photo masks/proxies/full page assembly

You may inspect geometry offline if useful, but do not install live production for those jobs.

## File / evidence expectations

Create a P04 production evidence area under something like:

`assets/rurubu-v30/p04/production/phase-a-header-calibration/`

Record:

- source/generated Header asset
- final production RGBA
- SHA256
- alpha diagnostics
- Figma node ID + imageHash
- fresh comparison screenshots/evidence
- gate result
- exact run status

Sync relevant QA evidence to the existing V30/P04 Drive structure if available. Do not invent a new unrelated folder tree when an existing P04/V30 destination exists.

## Blocker reporting

If Figma upload/write, Drive sync, image generation or Git write blocks twice, report immediately instead of silently retrying.

Do not spend context on repeated midpoint narration. One concise blocker report if needed; otherwise one final Phase A report.

## Final report format

Return once Phase A ends:

1. Header asset path + SHA256
2. alpha diagnostics and four gate results
3. Figma node ID / imageHash
4. fresh P01/P02/P03/P04 comparison screenshot evidence
5. `CROSS_PAGE_STYLE_FAMILY_PASS`
6. why it passed/failed in 3-5 concrete visual points
7. confirmation that P01/P02/P03/P05-P08 were untouched
8. Git commit SHA / PR #878 head
9. whether Phase B is safe to open

Do not claim P04 complete. Phase A success means only: **representative Header rendering language calibrated and safe to scale later.**
