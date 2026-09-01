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
- selected calm space
- deliberate editorial surprises

Reduce:
- tiny stickers
- meaningless microcopy
- too many simultaneous mini-features
- equal-size photo grids
- decoration used only to fill empty space

`FULL-STRENGTH MAGAZINE CHARACTER, EDITED TO 75% INFORMATION LOAD.`

## What “Rurubu-like” means

Rurubu feeling is **not** a sticker kit, a color palette, or a copied commercial layout.

The desired behavior is:

`EDITORIAL IDEA → CLEAR PAGE PROMISE → FIRST READ → STRONG TITLE/PHOTO GESTURE → UNEQUAL PHOTO HIERARCHY → ASYMMETRIC CLUSTERS → PURPOSE-BUILT PRINT OBJECTS → MEANINGFUL COLLISION → HUMAN COPY → SELECTIVE DISCOVERY → CALM SPACE → PAGE TEMPO`.

The page should feel rich before body copy without filling every gap.

Translate travel-magazine editorial thinking into the couple's real story:
- who are they?
- how did their story develop?
- where did they travel?
- who are the friends around them?
- what is ordinary life like?
- how does the book emotionally close?

A page is not successful merely because it contains colorful tickets, stamps or arrows. Every object must help the page tell or organize something.

## Hierarchy / reading-path priority

When hierarchy is weak, fix it in this order:

1. `SCALE`
2. `IMAGE WEIGHT / CROP`
3. `POSITION`
4. `CONTRAST`
5. `GROUPING`
6. `OVERLAP`
7. `COLOR`
8. `DECORATION`

Never repair a weak reading path by adding stickers.

## Five visual levels

Most energetic pages may use:

1. `FIRST READ` — title or primary visual event
2. `SECOND READ` — main photo/story cluster
3. `EDITORIAL SUPPORT` — secondary photos/labels/vessels
4. `FACTUAL COPY` — names, dates, captions, Q&A, story copy
5. `MICRO DISCOVERY` — tiny stamp, arrow, ticket fragment, doodle or issue detail

P07 and especially P08 intentionally use fewer levels.

Hard test:
- if 4 or more objects compete at nearly the same size/contrast, hierarchy is weak;
- at thumbnail/squint view, the first read must be obvious;
- energetic pages usually have 1 first-read event + 1–3 meaningful secondary events, not 10 equal events.

## Truth / editorial boundary

Travel-magazine styling must never invent autobiographical or operational facts.

### 1. FACT
Must be grounded in user-confirmed/source evidence.
Examples:
- names;
- wedding/registration dates;
- real destinations;
- relationship events;
- venue/schedule facts;
- profile answers;
- real-photo provenance.

Never infer or fabricate missing FACT content.

### 2. EDITORIAL COPY
Creative wording may frame or summarize grounded facts without adding a new factual claim.
Examples:
- chapter title;
- short travel-magazine lead;
- emotional bridge copy.

Draft editorial copy remains native/editable until approved.

### 3. DECORATIVE FICTION
Safe non-factual visual language is allowed only when it clearly does not pretend to be operational truth.
Examples:
- generic `CHECK!`, `MEMO`, `BEST SHOT` labels;
- non-functional route doodle;
- generic issue mark;
- decorative stamp with no false real date/place claim.

Do **not** fabricate:
- flight numbers;
- booking/reference codes;
- exact travel dates not grounded;
- addresses;
- transport guidance;
- venue floor/gate/room details;
- restaurant names unless grounded;
- factual rankings such as `No.1`;
- relationship dates;
- Q&A answers;
- dog ages/personalities;
- fake QR codes/barcodes that imply functionality.

Any unresolved guest-facing fact used during layout must visibly remain `TODO`, `TBD`, `PLACEHOLDER` or equivalent until grounded.

Before final export, every guest-facing text object must be classifiable as FACT, approved EDITORIAL COPY, or safe DECORATIVE FICTION. Unknown origin = fail.

## Anti-AI / anti-template hard gate

Immediately revise a page if it shows any of these symptoms:

- 3+ equal cards in a clean grid
- same corner radius on nearly every image/box
- every section centered
- generic gradient background
- soft SaaS shadow on every card
- repeated pill badges
- one identical header component on every page
- identical photo frames everywhere
- equal spacing everywhere
- identical photo counts/positions on adjacent pages
- one Auto Layout stack controlling the whole editorial page
- random sticker distribution used to fill holes
- fake hand-writing/English that carries no meaning
- meaningless decorative English
- too many tiny objects because the page felt empty
- luxury-brochure emptiness with no editorial event
- generated “scrapbook” texture with no relation to the actual photos/story
- AI-clean symmetry that looks mathematically balanced rather than edited

**Generic gradients are not part of the V30 design language.** Do not add gradients merely because an AI tool suggests them. Broad flat color fields, paper tone, photography and controlled texture are preferred.

The anti-AI target is not “make it messy.” The target is **authored irregularity**: purposeful hierarchy, local asymmetry, different object jobs, different page silhouettes and selective imperfections.

## Figma = compositor, not the source of magazine personality

Figma's main job is assembly and editability.

Figma should primarily:
- place and crop real photos;
- use non-destructive masks so photos remain replaceable;
- position transparent generated editorial assets;
- control z-order, scale, rotation and overlap;
- keep factual/personal copy native and editable;
- adjust line breaks and local typography;
- maintain trim/bleed/safe guides;
- perform contact-sheet, spread and A5 QA;
- prepare the editable sRGB master for print handoff.

Figma should **not** create the publication personality by stacking generic rectangles, cards, pills and shadows.

Simple native geometry is allowed when it is genuinely simple and useful, but the visual identity should come mainly from:

`REAL PHOTOGRAPHY + PAGE-SPECIFIC PREPARED ART + NATIVE TYPOGRAPHY/COPY + EDITORIAL COMPOSITION`.

### Auto Layout boundary

Auto Layout is useful locally for things that truly have a structural relationship, such as a small label/copy group or a tidy factual unit.

Do **not** make the whole page one responsive UI stack. Freeform editorial clusters, collisions and uneven photography remain intentionally positioned.

### Non-destructive photo rule

Real photographs remain separate from their frames/backings. Use masks/crops without destructively trimming the underlying source. A photo must be swappable without rebuilding the surrounding editorial art.

### No flattening

Never flatten a finished page into one final raster master.

Background, photos, frames/backings, titles, vessels, native text and foreground accents remain separable enough to:
- reorder;
- hide;
- replace;
- revise copy;
- swap photos;
- regenerate one weak part without rebuilding the page.

## Real source → generated-art bridge

Inspect the real source photos before generating page-specific art.

Generated decoration should respond to the actual page composition, photo subjects, crop direction, empty areas and story role. It must not look like a prebuilt unrelated sticker pack dropped on top afterward.

During layout development, lower-resolution real-photo proxies are acceptable because final real photos will be replaced later. That tolerance does **not** apply to the quality of title art, frames, ornaments, alpha edges or other production graphics; those must be judged strictly.

## Photo-role system — photo follows editorial job, not old geometry

Classify candidate photographs by editorial role before forcing them into a frame:
- `HERO` — strongest anchor only where the page requires one;
- `EMOTION` — intimacy/laughter/human expression;
- `PLACE` — destination/environment;
- `ACTION` — eating/walking/playing/activity;
- `DETAIL` — food/ticket/object/signage/hands/small memory;
- `COMEDY` — casual/funny/off-guard;
- `PORTRAIT` — person-first identity;
- `FRIEND_MEMORY` — friend/group/candid memory for P05;
- `CUTOUT_CANDIDATE` — subject separates cleanly from background;
- `TRANSITION` — bridges zones rather than dominates.

Hard rules:
- old slot geometry never dictates current photo choice;
- frame geometry follows the source photo's orientation/crop behavior;
- HERO is not automatically the highest-resolution photo;
- HERO is not mandatory on every page;
- do not fill a page/spread with near-identical poses;
- real autobiographical photos outrank generated substitutes;
- DUMMY/REFERENCE imagery never becomes final autobiographical truth.

For photo-heavy pages/spreads, check diversity across:
- shot distance;
- orientation;
- people vs environment;
- activity vs posed;
- color/lighting;
- crop treatment;
- emotional tone.

## Composition grammar

Use:
- asymmetric clusters;
- strong large/medium/small contrast;
- partial overlap;
- 2–3 meaningful anchor zones rather than even distribution;
- selected edge cropping;
- one calm/readable field inside busy pages;
- mixed print-object treatments only when each has a different semantic job.

Avoid:
- equal card grids;
- four identical image tiles;
- exact symmetry;
- equal spacing everywhere;
- repeated filler decorations.

### Meaningful overlap targets

Purposeful overlap creates tactile editorial depth.

Good examples:
- title overlaps a photo edge;
- tape/stamp crosses one printed-photo edge;
- frame/backing extends behind and in front of a photo through separate assets;
- caption straddles a photo boundary;
- a P04 route disappears behind an object and reappears;
- P05 friend photos overlap locally while faces remain readable.

Bad examples:
- body text covered;
- faces/eyes blocked;
- every object overlaps everything;
- overlap used to hide poor spacing.

Working target:
- energetic pages: about 2–5 meaningful overlap relationships;
- P07: 0–2;
- P08: 0–1.

`COLLISION MAY BE STRONG; HIERARCHY AND READABILITY MUST BE STRONGER.`

### Rotation discipline

Paper/photo objects normally stay within about `0–6°` either direction. Stronger angles require a composition reason. Do not rotate every photo simply to manufacture “scrapbook” energy.

### Active edges

Selected page edges may be activated by crop, paper, stamp fragment, route, foliage/organic accent or broad color field. Do not activate every corner. Critical copy, dates, faces and eyes remain inside safe areas.

## Invisible structure: freeform does not mean random

Editorial pages may visibly break the grid, but they still need an invisible structure.

Maintain:
- trim;
- bleed;
- safe margins;
- fold awareness where relevant;
- a hidden alignment/grid logic;
- consistent factual text baselines where useful;
- intentional calm fields.

Break the grid deliberately for titles, photos and editorial objects. Do not drift by accident.

Busy pages still need recovery space. White/negative space is an active design tool, but it must feel intentional rather than unfinished.

## Color grammar

Working principle:
- one dominant accent;
- one support accent;
- optional one surprise accent;
- paper/ink/photography stabilize readability.

Do not use every publication color equally on every page.

Color has jobs, not quotas. Use contrast to establish hierarchy.

Current broad family may include ocean cyan/blue, hot coral/pink, sun yellow, navy/ink, warm paper/cream and limited natural accents, but the exact mixture is page-specific.

No generic gradients.

## Typography grammar

Japanese is primary.

Working A5 ranges before actual-size proof:
- page title: roughly `22–34 pt` equivalent
- section title: roughly `13–20 pt`
- body: roughly `9–10.5 pt`
- captions: roughly `8–9 pt`
- noncritical micro meta: roughly `7.5 pt` floor

These are working ranges, not rigid tokens. Actual-size print proof wins.

Rules:
- do not shrink important text simply to preserve an overloaded layout;
- edit or restructure content first;
- authoritative Japanese text remains native/editable unless a generated display-title treatment is explicitly approved;
- long body copy is never baked into raster decoration;
- Q&A stays native/editable;
- names/dates/captions stay native/editable;
- fake Japanese paragraph text is forbidden;
- meaningless decorative English is avoided.

## Editorial object ecology

Boxes are not inherently bad. Repeated generic UI containers are bad.

Useful families include:

### PAPER / PRINT
- clean/torn paper note
- postcard field
- printed-photo caption foot
- taped memo
- clipped magazine inset
- offset paper stack
- ticket/notch form
- stamp-frame field

### DISPLAY / PROMO
- irregular slab
- burst
- ribbon
- vertical strip
- marker backplate
- circular/oval badge
- asymmetric corner enclosure

### READING / FACTUAL
- quiet article field
- local contrast support
- story inset
- caption tab attached to photo
- mini fact strip
- Q&A shell
- friend-memory caption vessel
- tiny back-cover meta plate

### IMAGE-BOUND
- label crossing a photo edge
- caption partly inside/outside a photo
- title partly behind/over a photo
- frame edge acting as text support

Good publication DNA means related print behavior with **page-specific geometry**, not one reusable UI component family.

## Parts rule — a part must have a job

A production part exists only when it improves at least one of:
- hierarchy;
- grouping;
- reading order;
- photo framing/crop;
- tactile print behavior;
- page-specific story/memory meaning;
- factual readability.

If it does none of these, do not create it.

Do not build a giant generic sticker library before real page proofs establish a need.

Related parts may have about 2–4 meaningful variants. Do not generate 12 near-identical versions and treat volume as quality.

A decorative part should be removable without destroying the information architecture.

## Generated-part brief contract

Before generating an isolated part, define:
- exact page;
- semantic job;
- intended physical size/aspect ratio;
- transparent vs opaque production requirement;
- source-photo relationship;
- crop/overlap expectation;
- z-order expectation;
- visual family;
- native/editable fields;
- forbidden fake text/facts;
- forbidden legacy roles/assets.

Never use a vague prompt such as `make a Rurubu-style sticker` as the complete production brief.

## Production asset metadata / provenance

Every adopted production part should be traceable with, where applicable:
- semantic name / part ID;
- page/job;
- source type;
- original source locator / Drive ID;
- generation prompt/version when relevant;
- editable fields;
- intended physical size;
- transparency requirement;
- raster pixel dimensions;
- provenance/license state;
- `SOURCE_KEYED` / `PRODUCTION_RGBA` / `ADOPTED` / `REFERENCE_ONLY` / `SUPERSEDED` state.

Avoid anonymous `image1.png`, `final2.png`, `new.png` naming.

## Current P01–P08 roles

### P01 — COVER
`るるぶ WEDDING`
- 1 hero + 0–2 supports
- strong masthead
- SHOGO & SHIORI
- `2026.10.24`
- density about 75/100

Reading path:
`るるぶ WEDDING → couple hero → names/date → 1–2 hooks → small details`.

### P02 — PROFILE + Q1/Q2
- SHOGO / SHIORI profile
- 2 main portraits/personality photos + optional support
- 3–5 grounded facts each
- Q1/Q2 only
- avoid symmetric employee-profile UI
- density 58–62

Reading path:
`profile title → SHOGO → SHIORI → short facts → Q1/Q2`.

### P03 — OUR STORY + Q3/Q4
- 3–4 grounded story chapters
- 2–3 preferred photos, max 4
- proposal belongs here as relationship meaning
- Q3/Q4 only
- density 48–55
- do not repeat one identical ticket/card four times; vary editorial vessel geometry while preserving reading order

Reading path:
`story title → anchor photo → story chapters → Q3/Q4`.

### P04 — ALL TRAVEL MEMORIES / OUR JOURNEY
- strongest interior travel-magazine page
- 1 travel hero + 4–5 unequal supports/details
- real trips such as Okinawa / Korea / Hawaii / other verified places
- personal memories only; no generic internet tourism facts
- density about 75

Reading path:
`travel title → travel hero → 3–4 destination/memory clusters → support photos/captions → selective travel details`.

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

Reading path:
`友達との思い出 → SHOGO FRIENDS / SHIORI FRIENDS → friend-photo clusters → short captions`.

P05 has **no page-wide HERO step**.

### P06 — REAL LIFE / FAVORITES / BEST SHOTS + Q5/Q6
- 1 candid hero + 3–4 supports/details
- everyday life / food / play / hobbies / Cookie / Melon when real sources exist
- Q5/Q6 only
- playful Q&A variant
- density 60–65

Reading path:
`real-life title → candid hero → support moments → Q5/Q6 → small captions`.

### P07 — CLOSING MESSAGE / THANK YOU
- 1 calm strong photo
- short thank-you message
- SHOGO & SHIORI
- `2026.10.24`
- 1 restrained closing motif
- density 35–40

Reading path:
`closing photo/title → thank-you → names/date → final motif`.

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
- no `VOL.20`, `V20`, or other superseded version text; if version is visible, it must be V30/current or omitted
- sparse must read as deliberately edited, not as an unfinished empty page

Reading path:
`quiet back-cover field → tiny issue/meta → decorative barcode`.

## Q&A lock

Exactly six slots:
- P02: Q1/Q2 — tidy
- P03: Q3/Q4 — emotional
- P06: Q5/Q6 — playful

Design family: `70% shared + 30% page-specific`.

Questions and answers are not locked yet. Never fabricate them.

## Production method

Do not return to planning/spec accumulation. Production is the priority.

1. Review the real source/proxy photos and current page proof.
2. Review P01–P08 as a contact sheet.
3. Review P02–P03, P04–P05, P06–P07 as spreads.
4. Identify the largest visual weakness before adding decoration.
5. Define each page's layer/decomposition checklist.
6. Identify the 4–10 important visual units that create each page's quality.
7. Generate/rebuild those units at high quality.
8. Process generated isolated assets through the canonical chroma-background → Python alpha-cutout pipeline below.
9. Save both source and transparent-production versions with clear provenance; upload the QA-passed production asset to the shared Drive asset area when available.
10. Assemble the transparent production assets as editable layers in Figma from background to foreground.
11. Keep real photos independently replaceable.
12. Keep names/date/profile/Q&A/story/captions as native editable text.
13. QA at thumbnail, spread and A5 actual-size equivalent.
14. Regenerate only the weak units.
15. Only after design/source/copy are complete, run print QA.

Do not deliver a flattened whole-page generation as the final master.

## Per-page decomposition checklist

Before generating final assets for a page, explicitly identify:
- PAPER / base;
- large background/environment composite(s), normally 0–2 when useful;
- real-photo roles;
- photo frame/backing roles;
- route/flow BACK and FRONT where applicable;
- main title unit;
- subtitle / second-read unit where applicable;
- article/profile/story/friend/Q&A vessels;
- medium labels/tickets/stamps;
- native text responsibilities;
- micro discoveries, only if still needed;
- calm island / recovery field;
- selected active edge(s);
- principal front/back collision relationships;
- QA/guides.

This decomposition comes from the actual page proof and real source behavior, not from a generic asset library.

`PAGE INTENT → LAYER PLAN → LARGE UNITS → PHOTOS → TITLE/SUBTITLE → VESSELS → MEDIUM UNITS → MICRO → QA`.

Not:
`GENERATE MANY STICKERS → TRY TO FIND PLACES FOR THEM`.

## Quality correction order

When a page looks weak, do **not** automatically add more stickers/assets.

Fix in this order:
1. real source/photo choice
2. crop/focal point
3. title hierarchy
4. composition silhouette
5. reading path
6. photo-size relationships
7. calm field / negative space
8. meaningful overlap
9. color job / contrast
10. medium-sized editorial units
11. micro discoveries last

`QUALITY = AUTHORED HIERARCHY + SOURCE QUALITY + CONTROLLED DENSITY, NOT MORE OBJECTS.`

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
   - intended for Drive/Figma placement

New adopted production assets belong in Git under:
`assets/rurubu-v30/p01/` ... `assets/rurubu-v30/p08/`

When the shared Google Drive production folder is available, upload the QA-passed transparent PNG there as the placement source. Do not upload only the uncut keyed source and then treat it as production-ready.

### E. Batch strategy — page-owned batches

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

`REAL SOURCE REVIEW`
→ `PAGE PROOF`
→ `PAGE LAYER PLAN`
→ `4–10 IMPORTANT UNITS`
→ `IMAGE GENERATION ON SAFE SOLID KEY BACKGROUND`
→ `PYTHON ALPHA CUTOUT`
→ `ALPHA QA`
→ `DRIVE / GIT PRODUCTION ASSET`
→ `FIGMA LAYERED PLACEMENT FROM BACKGROUND TO FOREGROUND`
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

Layering is intentional: generated decoration is not one merged wallpaper. Background, photos, frame/backing, title, vessels, native text and foreground accents remain independently controllable.

## Full-book rhythm / silhouettes

At thumbnail scale, pages must not collapse into the same template.

- P01: huge masthead + strong couple/environment photography
- P02: asymmetric two-person profile clusters + Q1/Q2
- P03: story anchor + varied episodes + Q3/Q4 + calm narrative field
- P04: strong travel feature + unequal travel memories
- P05: two readable friend-memory clusters with no page-wide hero
- P06: irregular candid/life mosaic + Q5/Q6
- P07: one calm closing photo/message field
- P08: sparse back-cover field + tiny meta/barcode

If adjacent pages have the same silhouette, fix structure before decoration.

Spread rhythm:
- P02–P03 = `WHO → STORY`
- P04–P05 = `PLACES WE REMEMBER → FRIENDS WE REMEMBER`
- P06–P07 = `REAL LIFE → THANK YOU`
- P08 = standalone back cover

## Current preferred is a baseline, not a ceiling

No page is permanently protected merely because it is the current preferred candidate.

A new candidate may replace it when it clearly improves:
- page view;
- spread view;
- full-book contact sheet;
- A5 actual-size readability;
- source truth/replaceability;
- layered editability.

Do not preserve weak legacy geometry because of sunk cost.

## Originality / brand distance

V30 should evoke the excitement and editing behavior of Japanese travel magazines while remaining an original private wedding publication.

Therefore:
- derive editorial principles rather than copying exact commercial layouts;
- do not trace/import an official commercial logo vector;
- do not reproduce a specific page pixel-for-pixel;
- use Rurubu references as energy, hierarchy and editing calibration;
- build original geometry around the couple's real content.

`REFERENCE STRONGLY; RE-AUTHOR THE PAGE.`

## Print-production handoff

Figma remains the editable sRGB production master/compositor.

Final print workflow is separate from design completion:

`FIGMA EDITABLE sRGB MASTER`
→ `HIGH-QUALITY PDF EXPORT`
→ `PRINT/PREFLIGHT SOFTWARE`
→ `CMYK CONVERSION USING PRINTER-SPECIFIED PROFILE`
→ `PREFLIGHT`
→ `FINAL PRINT PDF`
→ `PHYSICAL PROOF WHEN POSSIBLE`

Default working candidates when the print provider gives no different instruction:
- bleed: about `3 mm`;
- PDF/X-4 as preferred modern print-PDF candidate;
- CMYK candidate: Japan Color 2001 Coated;
- raster effective resolution target: about `300 ppi` at final placed size where practical.

The print provider's actual specification overrides these defaults.

Commercial-print QA must include:
- trim dimensions;
- bleed coverage;
- safe/fold zones;
- no critical faces/text near trim/fold;
- effective PPI at final size;
- missing/broken font or image issues;
- overset/clipped text;
- PDF page dimensions;
- barcode digits exact;
- color conversion/profile;
- transparency/output integrity.

Low-resolution proxies are acceptable during layout, but final print assets must be replaced with suitable-resolution sources before `PRINT_READY = YES`.

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
5. run the truth/editorial boundary and anti-AI / anti-template gates before adding decoration;
6. inspect and classify real source/proxy photos by editorial role before forcing geometry;
7. use hierarchy priority `scale → image weight/crop → position → contrast → grouping → overlap → color → decoration`;
8. make the per-page layer/decomposition plan from background to foreground;
9. follow the safe-key-background → Python alpha-cutout → QA → Drive/Git → layered Figma pipeline for generated isolated assets;
10. use Figma primarily as compositor, not as a generic UI-shape design generator;
11. review contact sheet, spreads and A5 actual-size equivalent;
12. fix the largest visual gap before microdetails;
13. make concrete progress on P01–P08 production.

**CURRENT = V30. V20 = FROZEN HISTORY.**
