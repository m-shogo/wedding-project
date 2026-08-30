# V20 Parts System

Status: `CANONICAL_PARTS_ARCHITECTURE`

Purpose: make V20 rich and repeatable without turning it into a component showcase or sticker dump.

## 1. Core rule

A part exists only when it has an editorial job.

Every part must answer at least one:
- does it establish hierarchy?
- group related information?
- guide reading order?
- communicate travel/wedding meaning?
- frame/crop a photo?
- create a tactile printed-object feeling?
- support a specific page's story?

If none apply, do not create it.

## 2. Part classes

### A. STRUCTURAL
Reusable and mostly native/vector.

- `FRAME / PHOTO / POSTCARD`
- `FRAME / PHOTO / POLAROID`
- `FRAME / PHOTO / CLEAN PAPER`
- `MASK / CIRCLE`
- `MASK / ORGANIC CUTOUT SUPPORT`
- `LABEL / SECTION`
- `LABEL / MINI FACT`
- `MARKER / NUMBER`
- `MAP / PIN`
- `ROUTE / DOTTED`
- `ROUTE / HANDDRAWN`
- `RULE / EDITORIAL`
- `PAGE / NUMBER`
- `META / ISSUE DATE LOCATION`

These should remain editable and recolorable where practical.

### B. DISPLAY
Stronger visual personality; may be composed/vector/raster depending on quality.

- `MASTHEAD / V20`
- `TITLE BACKPLATE / RIBBON`
- `BURST / FEATURE`
- `STAMP / DATE`
- `STAMP / DESTINATION`
- `TICKET / TAG`
- `TAPE / PAPER`
- `HANDNOTE / ARROW`
- `HANDNOTE / HEART`

Authoritative variable copy must stay native even when display art is raster.

### C. ILLUSTRATIVE / ATMOSPHERE
Can be generated or custom artwork if needed.

- `FOLIAGE / CORNER`
- `FLOWER / HIBISCUS-LIKE TROPICAL`
- `TRAVEL OBJECT / AIRPLANE`
- `TRAVEL OBJECT / SUITCASE`
- `TRAVEL OBJECT / CAMERA`
- `TRAVEL OBJECT / PASSPORT-TICKET ABSTRACT`
- `BACKGROUND / PAPER TEXTURE`
- `BACKGROUND / COLOR SHAPE`

Use sparingly and page-specifically.

### D. CONTENT-SPECIFIC
Only create after the page manual requires it.

Examples:
- P04–P05 route/map connector;
- P07 itinerary stop marker;
- P06 dog/candid annotation treatment;
- P08 closing stamp/postcard treatment.

Do not generalize a one-page solution into a global component prematurely.

## 3. Minimum viable shared kit

Before Figma assembly, V20 only needs this shared kit:

1. original V20 masthead family;
2. 3 photo-frame families;
3. 2 label families;
4. 1 date/location stamp family;
5. 2 route-line styles;
6. 1 number-marker family;
7. 1 ticket/tag family;
8. 2 edge-decoration clusters;
9. 3 small travel-object illustrations;
10. 1 handwritten arrow/heart set;
11. page number / issue metadata treatment.

Everything else must be justified by a page manual.

## 4. Variation without template repetition

Each reusable family may have controlled variants.

Example `FRAME / PHOTO / POSTCARD`:
- A: clean white edge;
- B: thicker bottom caption edge;
- C: tape/stamp-ready corner.

Do not create 12 near-identical variants. Prefer 2–4 meaningful variants.

## 5. Reuse rule

A shared part should provide identity, not identical composition.

Across adjacent pages:
- do not reuse the same frame variant at the same size and angle;
- do not repeat the same corner flower cluster in the same corner;
- do not repeat the same burst treatment for major titles;
- do not use one stamp as the default solution for every empty space.

## 6. Part metadata contract

Every production part should eventually have:

- `partId`;
- semantic name;
- class: STRUCTURAL / DISPLAY / ILLUSTRATIVE / CONTENT-SPECIFIC;
- source: NATIVE / ORIGINAL_VECTOR / GENERATED / LICENSED;
- source locator / Drive ID where applicable;
- pages allowed/used;
- editable fields;
- color variants;
- intended physical size range;
- transparency requirement;
- final pixel dimensions if raster;
- print-resolution status;
- provenance/license note if external;
- `REFERENCE_ONLY` flag when not production art.

This prevents mystery assets from entering final print.

## 7. Naming convention

Examples:

- `V20_FRAME_POSTCARD_A`
- `V20_LABEL_SECTION_BLUE_A`
- `V20_STAMP_DATE_RING_A`
- `V20_ROUTE_HANDDRAWN_A`
- `V20_FOLIAGE_CORNER_PINKGREEN_A`
- `V20_TRAVEL_CAMERA_A`
- `V20_P07_STOP_MARKER_A`

Figma layer examples:
- `PART / V20_FRAME_POSTCARD_A`
- `PHOTO MASK / P05 HAWAII HERO / REPLACEABLE`
- `TEXT / P07 CEREMONY TIME / NATIVE`

## 8. Native-first vs generation

Prefer native/vector when:
- geometry is simple;
- recoloring matters;
- text is involved;
- the part must scale cleanly;
- a future editor will need to adjust it.

Use image generation/custom raster when:
- hand-drawn/illustrative complexity materially improves quality;
- foliage/flower/object cluster would look synthetic if constructed from generic vectors;
- texture/illustration is decorative and non-authoritative.

Do not generate text-heavy stamps or tickets when exact Japanese wording matters. Generate art without text, then overlay native text.

## 9. Generation brief contract

Any generated part brief must specify:
- exact purpose and page;
- transparent vs opaque background;
- composition-safe margins;
- approximate aspect ratio;
- whether cropping is allowed;
- no fake text unless the text is deliberately absent/abstract;
- no people when a real-couple photo is required;
- required visual family;
- target print size and minimum raster dimensions;
- forbidden elements;
- z-order expectation.

Never prompt simply “make a Rurubu-style sticker.”

## 10. Part-quality gate

Before a part is promoted:
- it has a clear editorial job;
- it is not duplicative;
- it does not contain incorrect text;
- transparency/mask edges are clean;
- raster dimensions support intended print size;
- it does not visually overpower the page hero;
- it still looks intentional at A5 actual size;
- provenance is recorded;
- it can be removed without destroying the information architecture.

That last test matters: decoration should enrich the page, not carry critical facts.

## 11. Parts planned by page

### P01
- V20 masthead;
- feature burst;
- date/location stamp;
- one edge foliage cluster;
- one travel-object cluster;
- 1–2 photo frames/cutout outlines.

### P02
- profile label family;
- 2 differentiated portrait frames;
- mini-fact markers;
- optional dog/couple-life chip;
- one annotation arrow.

### P03
- story episode label;
- small route/thread;
- one editorial paper-note support;
- proposal teaser stamp/tag;
- restrained photo frames.

### P04–P05
- center-spread route;
- destination markers;
- postcard/polaroid mix;
- destination stamp set;
- one/two page-edge tropical clusters;
- one proposal/emotional highlight device.

### P06
- candid caption tape/note;
- one cutout outline treatment;
- small heart/arrow set;
- optional tiny Q&A label treatment.

### P07
- itinerary stop marker;
- chronology connector;
- time emphasis field;
- practical-note label;
- optional verified venue marker.

### P08
- closing stamp/postcard cue;
- subtle issue metadata;
- one restrained edge accent;
- optional verified QR frame only if a real QR exists.

## 12. Anti-bloat rule

Do not make the library “complete” before pages exist.

Create:
1. shared minimum kit;
2. page skeletons from manuals;
3. identify true missing roles;
4. generate/design only those missing parts;
5. retire unused experimental parts instead of forcing them onto pages.