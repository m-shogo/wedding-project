# Rurubu WEDDING V20 — Private Homage / Layered Page Generation Rule

Status: `CURRENT / PRODUCTION AUTHORITY / PRIVATE-NONCOMMERCIAL / LAYERED-PAGE-ASSEMBLY`

Purpose: remove ambiguity about how strongly V20 may reference the visual energy of the commercial Japanese travel-magazine category, what masthead wording is allowed for this private wedding booklet, and how page imagery must be generated and assembled.

This rule supplements:
- `V20-RURUBU-DESIGN-DECODE.md`;
- `V20-NORTH-STAR-DENSITY-EXTRACTION.md`;
- `V20-IMAGEGEN-EDITORIAL-REBUILD-POLICY.md`;
- `V20-P01-P08-VISUAL-PRODUCTION-BIBLE.md`;
- `V20-LAYER-OVERLAP-SYSTEM.md`;
- `V20-EDITORIAL-CONTAINER-AND-TITLE-GRAMMAR.md`.

## 1. Project use context

V20 is a private, noncommercial wedding booklet intended for the couple and invited guests. It is not being designed as a retail magazine, public commercial product, or resale item.

For this project, the working masthead wording may be:

`るるぶ WEDDING`

The visual direction may intentionally make the homage recognizable through:
- strong red / yellow / blue / cream relationships;
- thick display lettering;
- white or cream keylines;
- hard offset shadow;
- saturated travel-magazine energy;
- high information density;
- many unequal photo roles;
- bursts, ribbons, stamps, route marks, tickets, labels and paper fragments;
- page-edge crops;
- deep title/photo/vessel collision;
- lively small discoveries.

Do not weaken V20 merely to create unnecessary stylistic distance from the reference category.

This project direction is not a legal clearance statement. Private/noncommercial use does not itself grant ownership of third-party trademarks or artwork.

## 2. Exact masthead wording vs artwork

Allowed project direction:
- use the text `るるぶ WEDDING` as the private booklet masthead;
- create strong red/yellow/blue travel-magazine-style display treatment;
- use thick outline, keyline, offset shadow and energetic layering;
- make the reference relationship immediately understandable to invited readers.

Still avoid:
- importing or tracing a third-party official logo file;
- vector-tracing the exact proprietary logo artwork;
- recreating a particular published cover pixel-for-pixel;
- copying a specific issue's exact page coordinates, photo placements and proprietary illustrations.

Principle:

`REFERENCE STRONGLY; RE-AUTHOR THE PAGE.`

The wording may be familiar; the actual V20 page composition, photography, editorial units and supporting artwork should be authored for this wedding.

## 3. Color direction may be stronger

V20 does not need a muted wedding-stationery palette.

The production team may deliberately push toward the high-saturation Japanese travel-magazine feeling:
- dominant strong red/coral for major display emphasis when appropriate;
- bright yellow for bursts, highlight slabs and feature hooks;
- cyan / ocean blue for route/navigation/travel continuity;
- navy/ink for keyline and readability;
- cream/paper for reading islands;
- photography-derived green/sky/skin tones as real-source anchors.

Do not distribute all colors equally. Each page still needs dominant/support/accent roles.

## 4. A finished page is NOT generated as one indivisible final bitmap

A one-shot full-page image may be used as a visual concept/proof test, but it is not the preferred final production architecture.

The canonical production method is layered, page-aware generation and assembly.

Each page is decomposed into visual layers and editorial units before final Figma assembly.

Reason:
- real photos must remain replaceable;
- authoritative text must remain editable;
- stronger title/subtitle candidates can be swapped independently;
- frames/vessels can be resized or replaced;
- front/back overlap can be tuned;
- print resolution/provenance can be checked per asset;
- one weak generated object does not force regeneration of the entire page.

## 5. Canonical bottom-to-top page-generation stack

For every page, think from the bottom upward.

### L0 — PAPER / BASE
Generate or establish:
- paper tone;
- broad page color field;
- subtle print texture;
- very low-information atmospheric marks.

This may be native/simple only when genuinely sufficient. If the background itself carries important visual character, generate it as a page-aware background asset.

### L1 — LARGE BACKGROUND / ENVIRONMENT COMPOSITE
Generate page-specific large atmosphere when useful:
- tropical edge environment;
- map fragment;
- broad route background;
- giant cropped numeral/type fragment;
- destination/environment paper composition;
- edge flowers/travel objects.

Normally 0–2 large composites per page; more only when clearly justified.

### L2 — HERO REAL PHOTO
Place the strongest real photograph or replaceable photo source.

The HERO controls photographic weight and crop behavior. Do not flatten it into generated background art.

### L3 — SUPPORT PHOTOS / DETAIL PHOTOS
Place unequal satellites according to page role:
- emotion;
- action;
- place;
- detail;
- life;
- fun;
- bridge.

These are not equal cards.

### L4 — PHOTO FRAME / PAPER BACKING UNITS
Generate where useful:
- postcard frame;
- printed-photo edge;
- cut-paper backing;
- tape-integrated frame;
- caption-integrated photo holder.

A frame may sit partly behind and partly in front of a photo through split assets.

### L5 — ROUTE BACK / LARGE FLOW ART
Place generated movement that should pass behind foreground objects:
- route-back;
- map line;
- journey sweep;
- background arrows;
- print marks.

For pages with front/back travel motion, prefer separate BACK and FRONT assets rather than a single flat route.

### L6 — MAIN TITLE / MASTHEAD UNIT
Generate the page-defining title object:
- `るるぶ WEDDING` masthead on P01;
- page title;
- destination feature title;
- giant numerals when editorially useful.

Title is a graphic mass, not merely text.

It may overlap photography deeply and may itself be partly occluded when readability survives.

### L7 — SUBTITLE / SECOND-READ UNIT
Generate subtitle support as a deliberate object:
- ribbon;
- slanted strip;
- paper strip;
- tab;
- mini burst;
- attached feature plate.

Subtitle should help establish second read, not simply sit below the title as plain text.

### L8 — ARTICLE / PROFILE / EPISODE / DISCOVERY VESSELS
Generate content vessels from zero for the actual page job:
- short-note vessel;
- profile/Q&A vessel;
- episode unit;
- proposal article field;
- destination field;
- Editor's Pick field;
- closing message field.

Design the strongest vessel first where appropriate; final human copy may be shortened/rebroken to fit.

### L9 — CAPTION / LABEL / TICKET / STAMP UNITS
Generate medium/small editorial objects:
- caption tabs;
- destination label shells;
- ticket fragments;
- luggage tags;
- stamps;
- small feature slabs;
- mini index strips.

Prefer page-specific coherent units over isolated generic stickers.

### L10 — ROUTE FRONT / FOREGROUND COLLISION
Bring selected travel/graphic motion back above photography/vessels:
- route-front;
- arrow crossing a frame;
- stamp crossing two layers;
- label crossing route + photo;
- foreground paper fragment.

This is how depth is created without drawing everything atom-by-atom in Figma.

### L11 — NATIVE AUTHORITATIVE TEXT
Place in Figma as editable text:
- names;
- dates;
- factual descriptions;
- personal copy;
- captions;
- profile facts;
- destination/theme names;
- final wedding-detail copy.

Long factual text should not be baked into generated PNGs.

### L12 — MICRO DISCOVERIES
Only after the large hierarchy works, add small rewards:
- camera cue;
- plane cue;
- paw/food cue;
- tiny star/heart;
- mini note;
- issue mark;
- small flower/leaf;
- tiny route node;
- little arrow;
- small locator.

Micro detail must enrich the page, not fill random emptiness.

### L13 — FOLIO / META / FINAL EDGE ACCENTS
Final low-priority layer:
- page number;
- tiny issue metadata;
- decorative edge crop;
- small print mark.

### L14 — QA / GUIDE
Non-export layer:
- bleed/trim/safe guides;
- replacement notes;
- technical QA;
- hidden production labels.

## 6. Generation is page-specific, not library-first

Do not create one giant generic asset library first.

For each page:
1. inspect current page and spread;
2. read its Bible recipe;
3. identify the specific missing layer/job;
4. generate that page's large/background/title/vessel units;
5. assemble;
6. review the actual gaps;
7. only then generate medium/micro assets still needed.

The order is:

`PAGE INTENT -> LAYER PLAN -> LARGE UNITS -> PHOTOS -> TITLE/SUBTITLE -> VESSELS -> MEDIUM UNITS -> MICRO -> QA`

not:

`GENERATE MANY STICKERS -> TRY TO FIND PLACES FOR THEM`.

## 7. One-shot full-page generation still has a role

A page-wide generated concept image is useful as a diagnostic:
- does the written brief produce the intended visual world?;
- is title scale strong enough?;
- is density high enough?;
- are colors energetic enough?;
- does the page feel like the intended travel-magazine homage before implementation?

Use it as:
- art-direction proof;
- composition candidate;
- reference for decomposition.

Do not automatically use it as the final flattened print page.

If a strong concept image is produced, decompose its successful behaviors into separate production assets and rebuild the page in layered Figma form.

## 8. Per-page decomposition rule

Before Codex produces final V20 assets for P01–P08, each page should have an explicit list of:
- base/background;
- large composite(s);
- real-photo roles;
- title unit;
- subtitle unit;
- article/profile/story/discovery vessel(s);
- photo-frame unit(s);
- route BACK/FRONT if applicable;
- medium labels/tickets/stamps;
- micro discoveries;
- native text responsibilities;
- calm island;
- active edges;
- principal front/back collision.

This list should come from `V20-P01-P08-VISUAL-PRODUCTION-BIBLE.md`, not be invented ad hoc by Figma.

## 9. Current-page status

No page is permanently visually locked yet.

P01/P05/P08 may be strong baselines, but they can still be improved if a new candidate clearly wins at:
- page view;
- spread view;
- full-book contact;
- A5 actual-size review.

`CURRENT PREFERRED IS A BASELINE, NOT A CEILING.`

## 10. Final working principles

`PRIVATE WEDDING HOMAGE MAY BE RECOGNIZABLE.`

`るるぶ WEDDING IS AN ALLOWED WORKING MASTHEAD.`

`REFERENCE STRONGLY; RE-AUTHOR THE PAGE.`

`GENERATE PAGE-AWARE LAYERS, NOT ONE FLATTENED FINAL PAGE.`

`BUILD FROM BACKGROUND TO FOREGROUND.`

`KEEP REAL PHOTOS AND AUTHORITATIVE TEXT REPLACEABLE.`

`USE ONE-SHOT PAGE GENERATION AS A PROOF, THEN DECOMPOSE SUCCESS INTO PRODUCTION ASSETS.`
