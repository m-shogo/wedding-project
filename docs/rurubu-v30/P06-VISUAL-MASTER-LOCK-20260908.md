# Rurubu WEDDING V30 — P06 Visual Master Lock / Production Restart

Date: 2026-09-08
Scope: P06 `3535:17` only
Version: V30 only. V31 creation is forbidden.
Owner Visual Master reviewed directly: YES

## Canonical owner source

- file: `P06_OWNER_VISUAL_MASTER_HQ_UNCOMPRESSED_20260906.png`
- dimensions: `1055 × 1491`
- format: PNG / RGBA
- bytes: `3,682,318`
- SHA-256: `13bed2e07d66803d67cd6a117a57bc67dbdd9677b9ba54f4b9dd634910747103`
- Figma production frame: `3535:17`
- Figma logical trim: `559 × 794`
- placed-size/source ratio for a full-page comparison raster: about `0.53×`, within the owner's `<=0.70` no-upscale guardrail.

The owner source is the current P06 visual authority. JPEG proxies, Figma screenshots, Drive preview screenshots, the old 140×198 embedded reference, and any lossy/downsampled derivative are forbidden as production sources.

## PASS A — direct production review

### 1. Page role

`REAL LIFE / FAVORITES / BEST SHOTS + Q5/Q6`

The page is a joyful inside-page editorial spread about ordinary life, favorite things, pets, food and travel. It is intentionally dense and playful, but not a UI/dashboard/grid.

### 2. Three-second hierarchy

1. `ふたりの日常と / 好きなもの♥` title ecology
2. large relaxed-coffee MAIN photo + Q5 pair
3. FOOD / PETS / TRAVEL lower triptych
4. Q6 full-width bottom closure
5. PAGE 06 shared publication badge

### 3. Background / frame

- clean warm cream tactile paper
- airmail stripe border
- high-saturation pink/blue/yellow/green/cyan accent family
- crisp dark outlines, bright keylines and restrained printed depth

Reject aged parchment, sepia scrapbook, watercolor/painterly drift and dominant purple.

### 4. Identity anchors

#### Header ecology

The header is not plain typography. It is an authored ecology:

- `Shogo & Shiori` ribbon
- hot-pink upper line `ふたりの日常と`
- vivid blue lower line `好きなもの`
- heart ending
- thick white/yellow keyline + dark outline + controlled depth
- hibiscus/plumeria/leaf anchor
- coffee/music/heart/sparkle accents integrated into the title region

Its visual character is LOCKED. Do not reconstruct it from generic native text + rectangles.

#### Q5 ecology

- blue hand-drawn paper vessel
- `Q5` badge
- pink tape
- question underline
- hearts/sparkles
- dense but readable answer interior

It is editorial art, not a card component.

#### Q6 bottom ecology

- wide yellow/pink question closure
- `Q6` badge
- three-item wish list
- journey postmark
- camera
- palm/island travel accent
- bottom tropical flower cluster

It is a closing ecology, not a generic rounded rectangle.

### 5. Photo system

Exactly four independently replaceable photo roles survive into final Figma:

- MAIN mask `4000:52` / image `4000:53`: two-person relaxed everyday coffee scene
- FOOD mask `4000:55` / image `4000:56`: appetizing cafe/Italian food
- PETS mask `4000:58` / image `4000:59`: Cookie + Melon / two dogs
- TRAVEL mask `4000:61` / image `4000:62`: joyful couple travel/beach/ice-cream scene

All photo masks remain clipped, independent and replaceable. The Visual Master must never be cropped into an active photo fill.

Current frame geometry is already close to the owner master and remains the first target:

- MAIN `x24 y184 w300 h244 rot -2°`
- FOOD `x17 y434 w185 h157 rot -4.2°`
- PETS `x197 y425 w172 h157 rot +2.7°`
- TRAVEL `x370 y443 w170 h158 rot -2.4°`

Face/eye safety outranks tiny coordinate matching.

### 6. Photo rhythm

The lower three images are related but intentionally non-identical. Their width, rotation and overlap differ. Do not normalize them into three equal cards.

### 7. Caption ecologies

The four captions are separate authored paper objects:

- MAIN: yellow coffee caption
- FOOD: pink food caption
- PETS: yellow pet caption + paw accent
- TRAVEL: blue travel caption + airplane/heart accent

They sit in front of photo-frame bottoms but must not cover important faces/subjects.

### 8. Quiet zones

Protect:

- MAIN faces/eyes/hands/cups
- TRAVEL faces/eyes/ice creams
- PETS faces/eyes
- Q5 readable interior
- intro bubble readable interior
- Q6 list interior
- intentional cream breathing gaps between major ecologies

Do not fill quiet space merely because an empty patch exists.

### 9. Saliency weights

- title ecology: 100
- MAIN photo: 90
- Q5: 85
- Q6: 80
- lower triptych: 74
- intro bubble: 60
- caption ecologies: 52
- PAGE 06: 45
- micro accents: 30

Low-saliency decoration may never weaken higher-saliency information.

## PASS B — reverse omission / misclassification audit

The Visual Master was re-read top/middle/bottom and left/center/right without relying on the old P06 manifest.

### Top scan

Confirmed distinct objects:

- top-left tropical cluster
- `Shogo & Shiori` ribbon
- two-level hero title
- coffee cup
- music notes
- heart/sparkles
- separate green intro bubble
- palm/waves beside intro bubble
- airmail border

The intro bubble is not part of the title lettering even though it shares the same top region.

### Middle scan

Confirmed:

- MAIN photo is a real-photo role
- left-side camera/hearts are editorial accents
- MAIN caption is separate from the photo
- Q5 is a single authored question ecology
- Q5 must not be normalized into native card UI

### Lower-middle scan

Confirmed:

- FOOD / PETS / TRAVEL are three separate replaceable photos
- each has a different caption vessel treatment
- `Cookie` / `Melon` labels are local pet-photo labeling, not a reusable shared component
- the travel heart/plane is local to travel role
- visual irregularity is intentional

### Bottom scan

Confirmed:

- Q6 is one full-width closure ecology
- journey stamp, camera and tropical bottom cluster belong to the closure region
- PAGE 06 remains shared publication furniture, not baked into a new P06-specific graphic

### Misclassification corrections

Rejected old production ideas:

- plain Figma title text with colored bars
- rounded/dashed Q5/Q6 cards
- isolated basic camera/plane/heart vectors as the main ornament language
- treating structural mask QA as proof of visual quality
- flattening the whole page merely because source transfer is difficult
- using the Visual Master itself as a photo proxy

### Display-module classification

Approved fixed prepared modules:

1. `P06_HEADER_ECOLOGY`
2. `P06_INTRO_BUBBLE_ECOLOGY`
3. `P06_Q5_EDITORIAL_ECOLOGY`
4. `P06_MAIN_CAPTION_ECOLOGY`
5. `P06_FOOD_CAPTION_ECOLOGY`
6. `P06_PETS_CAPTION_ECOLOGY`
7. `P06_TRAVEL_CAPTION_ECOLOGY`
8. `P06_Q6_BOTTOM_ECOLOGY`

Keep separate:

- four replaceable photos
- shared PAGE 06 component

## Production method after lock

The owner Visual Master already has the correct approved magazine personality. Therefore the default production method is:

`owner HQ PNG → original-pixel prepared module extraction → alpha/material QA where transparency is used → representative header ecology → P02/P03/P04/P05 style-family comparison → remaining modules → live P06 assembly → high-resolution QA`

Do not regenerate the visual character just to recreate something that already exists correctly in the approved owner master. Image generation is reopened only if a prepared module cannot meet visual/alpha/print requirements without destructive artifacts.

No module may be downsampled before Figma placement. No JPEG/lossy substitute.

## Representative ecology gate

Representative ecology: `P06_HEADER_ECOLOGY`.

Before scaling to Q5/Q6/captions, require:

- RURUBU editorial DNA pass
- V30 art-direction pass
- direct P02/P03/P04/P05 family comparison
- no Canva/SVG/clipart tell
- no painterly/vintage escape
- owner-master silhouette and title character retained
- source pixels preserved

## Current live-Figma state checked 2026-09-08

Frame `3535:17` is still an unfinished production shell. It contains the four replaceable photo frames/masks, shared PAGE 06, paper/border support and the empty HQ raster target `4249:56`.

`4249:56` has no image fill, so HQ owner art has NOT yet been placed in live Figma. No completion is claimed.

Current blocker remains binary transport from the current execution runtime to the official Figma upload endpoint. The official `upload_assets` action can authorize and return a target URL, but the container cannot establish outbound network to the upload host. This blocker is transport-only; it is not permission to lower production quality.

## Completion gate

P06 stays `FIGMA_DESIGN_COMPLETE = NO` until all of the following are true:

- owner-master-derived header ecology installed and cross-page PASS
- Q5/Q6/caption ecologies installed at production quality
- four photo masks remain replaceable
- shared PAGE 06 preserved
- no obsolete Phase B/C visible or hidden production layers
- no unintended overflow
- source/alpha/material QA passes
- fresh high-resolution screenshot passes direct owner-master comparison
- fresh P02/P03/P04/P05/P06 family comparison passes
- final A5/print-resolution gate is explicitly recorded

`VISUAL_MASTER_LOCKED = YES`
`PART_MAP_APPROVED = YES`
`FIGMA_DESIGN_COMPLETE = NO`
