# V20 Layer / Overlap System

Status: `CANONICAL / IMAGEGEN_FIRST / CURRENT_PAGE_ROLES_2026-09-01`

Purpose: make V20 feel like a professionally edited Japanese travel magazine while preserving current page roles, A5 readability, real-photo truth and replaceability.

Highest page-role authority:
- `V20-CURRENT-PAGE-ARCHITECTURE.md`
- `V20-PAGE-BY-PAGE-DESIGN-SPEC.md`

## Core principle

Overlap, depth, occlusion and edge intrusion are tools, not quotas.

Ask:
- is FIRST / SECOND / THIRD read clear?;
- is important copy readable at A5?;
- are faces/gestures protected?;
- does depth improve editorial authorship?;
- is information load still near the current page target?

`COLLISION MAY BE STRONG; HIERARCHY AND READABILITY MUST BE STRONGER.`

## Canonical semantic stack

Use as needed, not mechanically:
1. PAPER / BASE
2. BACKGROUND / ENVIRONMENT
3. REAL PHOTOS
4. PHOTO FRAME / PAPER BACKING
5. PAGE-SPECIFIC FLOW ART when relevant
6. DISPLAY TITLE / MASTHEAD
7. SUBTITLE / SECOND READ
8. ARTICLE / PROFILE / STORY / FRIENDS / Q&A VESSELS
9. CAPTION / LABEL / TICKET / STAMP
10. NATIVE AUTHORITATIVE TEXT
11. SELECTIVE MICRO DISCOVERIES
12. FOLIO / META / EDGE ACCENTS
13. QA / GUIDES

P04 may split a route into BACK/FRONT when useful.
P05 does not require route layers.
P07/P08 use materially fewer layers.

## Figma's job

Figma primarily:
- places approved assets;
- crops/replaces real photos;
- controls z-order, scale and rotation;
- keeps names, dates, captions, Q&A/story/friend copy native/editable;
- manages trim/safe/fold geometry;
- performs page/spread/contact/A5 QA.

Do not invent page personality from repeated primitive cards/pills.

## Current page-aware units

Examples:
- `P01_MASTHEAD_FEATURE_UNIT`
- `P02_PROFILE_QA_UNIT`
- `P03_EPISODE_QA_UNIT`
- `P04_TRAVEL_TITLE / ROUTE / MEMORY_UNIT`
- `P05_FRIENDS_TITLE_UNIT`
- `P05_SHOGO_FRIENDS_LABEL_UNIT`
- `P05_SHIORI_FRIENDS_LABEL_UNIT`
- `P05_FRIEND_PHOTO_BACKING_UNIT`
- `P06_BEST_SHOTS / QA_UNIT`
- `P07_CLOSING_MESSAGE_SUPPORT`
- `P08_ISSUE_BARCODE_META_UNIT`

Explicitly do not use old P05 proposal or old P07 destination-discovery units as current parts.

## Asset granularity

### LARGE COMPOSITE
Usually 0–2 per page, only when it has a clear job.

### MEDIUM EDITORIAL UNIT
Several on energetic pages, fewer on P07/P08.

### MICRO DISCOVERY
Added only after hierarchy passes.

The current target is about 75% of previous maximum-clutter information load. Do not use micro-detail count as a density goal.

## Valid collision

Examples:
- title crossing one photo edge;
- frame and photo separating into back/front layers;
- support photos overlapping locally;
- one stamp/tape crossing a frame;
- P04 route going behind one travel image and in front of another;
- caption straddling a photo boundary;
- edge object partly cropped.

## P05 collision exception

P05 is `SHOGO FRIENDS + SHIORI FRIENDS` and has **no page-wide giant HERO**.

Allowed:
- medium/small friend photos overlapping within each cluster;
- one photo in each cluster may be locally larger than its neighbors;
- cluster label may overlap one frame edge;
- small tape/paper/photo-print interactions.

Reject:
- one image taking over the page;
- giant backing/art creating a fake hero behind one friend photo;
- family/FAMILY grouping;
- Hawaii/proposal/arrival route language;
- cross-fold journey dependency.

## Text readability

Solve locally using:
- opaque/near-opaque paper;
- irregular color support;
- keyline/outline;
- hard offset shadow;
- marker/backplate;
- photo negative space;
- attached caption foot.

Long personal/factual copy remains native.

## Protected content

Never casually obscure:
- eyes/mouth/important gestures;
- small A5 body copy;
- names/dates/Q&A answers;
- friend faces on P05;
- thank-you copy on P07;
- barcode digits `2026102400000` on P08.

## Edge intrusion

Energetic pages may activate selected edges with photos, foliage, paper fragments, route or title pieces.

Do not require 2–4 active edges on every page.
P07 and P08 deliberately use little edge activity.

## Rotation discipline

Rotation is purposeful:
- main photo may stay stable;
- support photos/paper objects can rotate slightly;
- body text remains comfortably readable;
- P05 uses varied but controlled photo-print angles, not every image tilted.

## Calm zones by page

- P03: narrative article field;
- P04: at least one photo/caption recovery area;
- P05: breathing space that keeps SHOGO/SHIORI clusters legible;
- P06: small calm caption/Q&A zones inside playful mosaic;
- P07: most of the page is a deliberate calm closing field;
- P08: overwhelmingly calm back-cover field.

## Current intensity rhythm

- P01: 75/100 information load / strong opening
- P02: 58–62 / people feature
- P03: 48–55 / narrative
- P04: 75 / travel-feature peak
- P05: 65–70 / warm social friend-memory page
- P06: 60–65 / playful real life
- P07: 35–40 / emotional release
- P08: 20–25 / quiet back cover

Rurubu-like character remains strong across the booklet; only information load changes.

## Current spread behavior

### P02–P03
`WHO → STORY`; shared Q&A family can bridge them.

### P04–P05
`PLACES WE REMEMBER → FRIENDS WE REMEMBER`.
No mandatory route crossing the fold. P05 does not inherit P04 destination/map grammar.

### P06–P07
`REAL LIFE → THANK YOU`; P07 visibly slows down.

### P08
Standalone back cover.

## Explicit obsolete overlap systems

Do not recover:
- P05 proposal paper embedded in Hawaii hero;
- P05 arrival marker;
- P04–P05 mandatory route BACK/FRONT spanning both pages;
- P07 destination-map layers;
- P07 giant `11`;
- P07 LOOK AROUND / EDITOR'S PICK fields;
- P07 itinerary/timetable;
- P08 closing-message composition.

## One-shot proof vs production

A one-shot page image is art-direction proof only. If it wins, decompose the behavior into editable page-aware assets and rebuild in Figma.

## Final principle

`USE DEPTH TO STRENGTHEN THE CURRENT PAGE ROLE — NEVER TO RECOVER AN OBSOLETE ROLE.`