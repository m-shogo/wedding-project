# Rurubu WEDDING V30 — FINAL PRODUCTION AUTHORITY

Status: `CURRENT_CANONICAL / FINAL_PRODUCTION / V30_ONLY / 2026-09-01`

## One-rule summary

**V30 is the only current production version.**

- Do not create V31 unless the user explicitly requests a new version.
- Do not continue production in V20.
- V20 and earlier versions are frozen historical/reference material only.
- Do not average V20/V30 directions.
- Do not revive old Figma geometry or obsolete generated assets because they once looked finished.

## Git authority

Current branch:
`rurubu/v30-final-production-20260901`

Current directory:
`docs/rurubu-v30/`

New generated production assets belong under:
`assets/rurubu-v30/`

Anything under `docs/rurubu-v20/` or `assets/rurubu-v20/` is historical/reference unless this V30 document explicitly names a source as reusable.

## Figma authority

File key:
`bfM0d4c9dCeBv5pCkJ3TNM`

Current production page:
`V30_FINAL_PRODUCTION`

Current production board:
`V30 / FINAL PRODUCTION / 2026-09-01`

Board node:
`3535:2`

Current page frames:
- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

The V30 board was moved out of the mixed historical V20 canvas into its own top-level Figma page. Do not move production back into old Rurubu pages.

## Fixed physical facts

- A5 portrait
- trim: `148 × 210 mm`
- 8 pages
- wedding date: `2026.10.24`
- P08 decorative barcode digits: **`2026102400000` exactly**
- barcode is decorative; never claim JAN/ISBN/EAN commerce metadata

## Visual calibration

- `RURUBU FEEL = 100%`
- `EDITORIAL DENSITY = 75% OF PREVIOUS MAXIMUM-CLUTTER TESTS`
- `READABILITY = HIGH`

75% means reducing information overload, not reducing Rurubu character.

Keep:
- strong display headlines
- vivid travel-magazine color
- unequal photo hierarchy
- title/photo/frame collision
- paper/ticket/stamp/ribbon tactility
- authored asymmetry
- lively travel-magazine energy

Reduce:
- tiny stickers
- meaningless microcopy
- too many simultaneous mini-features
- equal-size photo grids
- decoration used only to fill empty space

`FULL-STRENGTH MAGAZINE CHARACTER, EDITED TO 75% INFORMATION LOAD.`

## Current P01–P08 roles

### P01 — COVER
`るるぶ WEDDING`
- 1 hero + 0–2 supports
- strong masthead
- SHOGO & SHIORI
- `2026.10.24`
- density about 75/100

### P02 — PROFILE + Q1/Q2
- SHOGO / SHIORI profile
- 2 main portraits/personality photos + optional support
- 3–5 grounded facts each
- Q1/Q2 only
- avoid symmetric employee-profile UI
- density 58–62

### P03 — OUR STORY + Q3/Q4
- 3–4 grounded story chapters
- 2–3 preferred photos, max 4
- proposal belongs here as relationship meaning
- Q3/Q4 only
- density 48–55

### P04 — ALL TRAVEL MEMORIES / OUR JOURNEY
- strongest interior travel-magazine page
- 1 travel hero + 4–5 unequal supports/details
- real trips such as Okinawa / Korea / Hawaii / other verified places
- personal memories only; no generic internet tourism facts
- density about 75

### P05 — FRIENDS MEMORIES ONLY
Title direction: `友達との思い出`

Required:
- `SHOGO FRIENDS`
- `SHIORI FRIENDS`
- roughly 3–4 photos per cluster / 6–8 total
- medium/small editorial collage
- balanced unequal clusters
- faces recognizable at A5
- density 65–70

Hard reject:
- family / FAMILY / Family & Friends
- giant page-wide hero or anchor
- Hawaii-only feature
- proposal/arrival article
- old P05 Hawaii/proposal assets
- rigid 50:50 UI cards
- inferred friend names/relationships/anecdotes

### P06 — REAL LIFE / FAVORITES / BEST SHOTS + Q5/Q6
- 1 candid hero + 3–4 supports/details
- everyday life / food / play / hobbies / Cookie / Melon when real sources exist
- Q5/Q6 only
- playful Q&A variant
- density 60–65

### P07 — CLOSING MESSAGE / THANK YOU
- 1 calm strong photo
- short thank-you message
- SHOGO & SHIORI
- `2026.10.24`
- 1 restrained closing motif
- density 35–40

Never restore:
- TODAY'S TRAVEL GUIDE
- 11 DESTINATIONS
- LOOK AROUND
- EDITOR'S PICK
- timetable/schedule
- seated-guest discovery map

### P08 — MAGAZINE BACK COVER
- 0–1 calm photo/background
- tiny issue/meta
- optional names/date
- one tiny motif
- decorative barcode digits `2026102400000`
- 3–4 visible information objects max
- density 20–25
- no long thank-you / fake price / fake publisher / JAN / ISBN claim

## Q&A lock

Exactly six slots:
- P02: Q1/Q2 — tidy
- P03: Q3/Q4 — emotional
- P06: Q5/Q6 — playful

Design family: `70% shared + 30% page-specific`.

Questions and answers are not locked yet. Never fabricate them.

## Production method

Do not return to planning/spec accumulation. Production is the priority.

1. Use the current V30 A5 page proof as art direction.
2. Review P01–P08 as a contact sheet.
3. Review P02–P03, P04–P05, P06–P07 as spreads.
4. Identify the 4–10 important visual units that create each page's quality.
5. Generate/rebuild those units at high quality.
6. Process generated isolated assets through the canonical chroma-background → Python alpha-cutout pipeline below.
7. Save both source and transparent-production versions with clear provenance; upload the QA-passed production asset to the shared Drive asset area when available.
8. Assemble the transparent production assets as editable layers in Figma.
9. Keep real photos independently replaceable.
10. Keep names/date/profile/Q&A/story/captions as native editable text.
11. QA at A5 actual-size equivalent.
12. Only after design/source/copy are complete, run print QA.

Do not deliver a flattened whole-page generation as the final master.

## Canonical image-generation / transparency / Drive pipeline

This is a hard V30 production rule for isolated generated editorial parts.

### A. Generate the object on a deliberately removable solid background

For title parts, paper parts, tickets, stamps, ribbons, tape, labels, frames, ornaments and similar generated editorial objects:

- generate **one isolated object or one intentionally grouped production unit per image**;
- use a **flat single-color background that does not overlap the asset's own colors**;
- the key color is chosen per asset, not always green;
- if the asset contains green, use a clearly separated magenta/cyan/blue/etc. key background instead;
- keep enough clean margin around the object so the outer background is connected to the canvas edges;
- do not generate a scenic/gradient/textured background behind an object intended for alpha extraction;
- do not let the key color leak into the object itself;
- preserve intentional white, cream, yellow, red, green, blue and other interior colors in the object;
- avoid unwanted cast shadows into the key background. If a shadow is a deliberate part of the editorial object, treat it as part of the alpha silhouette and QA it separately.

### B. Python cutout — edge-connected background removal, not naive global color deletion

After generation, use Python/image processing to convert the keyed background to real alpha transparency.

Preferred behavior:

- sample/know the key background color;
- identify background connected to the outer image edges/corners;
- remove the connected key-background region with a controlled tolerance;
- do **not** globally delete every pixel that happens to resemble the key color inside the artwork;
- preserve interior white/cream/detail areas;
- preserve intentional holes/cutouts according to the artwork;
- clean the fringe/halo so no visible key-color edge remains;
- output true RGBA PNG with alpha channel.

### C. Mandatory alpha QA

Before an asset is considered usable:

- alpha channel exists;
- outer canvas is transparent;
- no visible key-color residue / halo;
- no accidental holes in the object;
- intentional internal white/cream/color regions remain intact;
- no unexpected opaque rectangle/background remains;
- edges look clean at 100% and enlarged inspection;
- test the PNG over both a light and a dark temporary background;
- record whether the asset is SOURCE / CUTOUT-QA / ADOPTED.

If QA fails, fix/regenerate the asset. Do not place a known-bad cutout in the final Figma composition.

### D. Source + production asset storage

Keep two conceptual states:

1. `SOURCE_KEYED`
   - original generated image with removable solid background
   - useful for regeneration/provenance

2. `PRODUCTION_RGBA`
   - Python-cutout transparent PNG
   - QA passed
   - this is the version intended for Drive/Figma placement

New adopted production assets belong in Git under:
`assets/rurubu-v30/p01/` ... `assets/rurubu-v30/p08/`

When the shared Google Drive production folder is available, upload the QA-passed transparent PNG there as the placement source. Do not upload only the uncut keyed source and then treat it as production-ready.

### E. Batch strategy — do not blindly generate the whole book in one giant batch

Best V30 workflow:

1. approve/choose the page art-direction proof;
2. decompose **that page** into roughly 4–10 important generated units;
3. write explicit prompts for those units;
4. generate that page's unit batch efficiently;
5. cut out each unit with Python;
6. alpha-QA the batch;
7. save/upload the production PNG batch;
8. place and layer that batch in Figma;
9. review the page and spread;
10. regenerate only weak units.

Do not generate dozens of generic decorations first and try to find a use for them later.
Do not generate P01–P08 as one uncontrolled asset dump before page hierarchy is understood.

A multi-page generation run is allowed only when the requested units are already clearly specified and named. Even then, keep page ownership explicit and QA each asset independently.

### F. Naming / traceability

Use semantic page-specific names, e.g.:

- `V30_P05_FRIENDS_TITLE_SOURCE_KEYED.png`
- `V30_P05_FRIENDS_TITLE_PRODUCTION_RGBA.png`
- `V30_P05_SHOGO_LABEL_PRODUCTION_RGBA.png`
- `V30_P08_ISSUE_STAMP_PRODUCTION_RGBA.png`

Avoid anonymous `image1.png`, `final2.png`, `new.png` naming.

### G. Placement principle

The expected flow is:

`PAGE PROOF`
→ `4–10 IMPORTANT UNITS`
→ `IMAGE GENERATION ON SAFE SOLID KEY BACKGROUND`
→ `PYTHON ALPHA CUTOUT`
→ `ALPHA QA`
→ `DRIVE / GIT PRODUCTION ASSET`
→ `FIGMA LAYERED PLACEMENT`
→ `PAGE / SPREAD / A5 QA`
→ `TARGETED REGENERATION IF NEEDED`

This is the default V30 image-production pipeline.

## Canonical layer order

1. PAPER / BASE
2. BACKGROUND / ENVIRONMENT
3. REAL PHOTOS
4. PHOTO FRAME / BACKING
5. ROUTE / THREAD BACK if needed
6. MAIN TITLE
7. SUBTITLE / SECOND READ
8. PROFILE / STORY / TRAVEL / FRIEND / Q&A VESSELS
9. CAPTION / TICKET / STAMP / LABEL
10. ROUTE / THREAD FRONT if needed
11. NATIVE AUTHORITATIVE TEXT
12. SELECTIVE MICRO DISCOVERIES
13. FOLIO / META
14. QA / GUIDES

Layering is intentional: do not flatten the page and do not treat generated decoration as one merged wallpaper. Background, photos, frame/backing, title, vessels, native text and foreground accents remain separable enough to edit/reorder/replace.

## Legacy policy

V20 is frozen.

Allowed from V20/history:
- factual provenance
- source locators
- verified real-photo sources
- general design lessons that do not conflict with V30

Not allowed from V20/history:
- old page roles
- old page geometry
- old P05 Hawaii/proposal system
- old P07 seated-guest/guide system
- old P08 closing role
- old cross-spread route assets as automatic reuse
- old generated decorations merely recolored or traced

Rule:
`KEEP THE LESSON; REBUILD THE CURRENT OBJECT FROM ZERO.`

## Current completion state

- `DESIGN_COMPLETE = NO`
- `SOURCE_COMPLETE = NO`
- `COPY_LOCKED = NO`
- `PRINT_READY = NO`

This is expected. The next work is production-quality visual execution, not another architecture rewrite.

## Codex start rule

At the start of every V30 run:
1. read this file first;
2. inspect the current V30 Figma board `3535:2`;
3. confirm no V31 is being created;
4. do not use `docs/rurubu-v20/` as current authority;
5. follow the chroma-background → Python alpha-cutout → QA → Drive/Git → layered Figma pipeline for generated isolated assets;
6. make concrete progress on P01–P08 production.

**CURRENT = V30. V20 = FROZEN HISTORY.**
