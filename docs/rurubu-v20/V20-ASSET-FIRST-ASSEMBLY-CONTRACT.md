# V20 Asset-First Assembly Contract

Status: `CANONICAL / FIGMA-AS-COMPOSITOR`

## Purpose

V20 should not be designed inside Figma from generic prompts. The visual quality must already exist in the approved source assets, photo choices, editorial hierarchy, and page manuals before final placement.

Figma's main role is:
- place;
- crop non-destructively;
- mask;
- overlap;
- reorder layers;
- keep real photos replaceable;
- keep authoritative text editable;
- make final micro-adjustments;
- export and preflight.

Figma is NOT the primary illustration engine, decorative ideation engine, or page-composition generator.

## 1. Desired production ratio

Working target for a decorated page:

- 55–75% of perceived visual personality comes from approved real photos + prepared artwork/assets;
- 15–30% comes from native editorial typography and factual copy;
- 5–15% comes from simple native geometry, guides, rules, masks, and layout corrections.

This is a visual-weight target, not a literal layer-count quota.

If a page's personality depends mostly on Figma-drawn rounded cards, pills, gradients, or generic icons, the workflow has drifted.

## 2. Three asset tiers

### Tier A — REAL CONTENT

Highest authority.

Examples:
- real couple photos;
- real travel photos;
- real venue photos when verified;
- actual dates/times/names;
- actual memories/captions.

Rules:
- never replace autobiographical content with generated fake memories;
- photos remain replaceable in Figma;
- crop decisions follow the source image, not a predetermined template.

### Tier B — PREPARED VISUAL ART

This tier carries most of the Rurubu-like editorial energy.

Examples:
- original masthead art;
- tropical foliage/flower clusters;
- travel-object illustrations;
- hand-drawn arrows/hearts;
- decorative stamps without authoritative wording;
- ticket/ribbon/burst backing art;
- paper/tape/torn-edge artwork;
- map/route decorative art when it is non-authoritative;
- page-specific visual accents.

Preferred format:
- transparent PNG for painterly/complex raster art;
- SVG/vector only where cleanly scalable and visually superior;
- no baked variable text.

### Tier C — FIGMA-NATIVE EDITABLE LAYERS

Only what benefits from editability.

Examples:
- names;
- dates;
- venue/location text;
- profile facts;
- story body copy;
- schedule times;
- captions;
- Q&A answers;
- page numbers;
- masks;
- simple rules/routes when simple geometry is sufficient;
- safe/trim/bleed guides.

## 3. AI-look prevention rules

V20 must actively reject these common AI/UI signatures:

- repeated equal cards;
- repeated equal circles;
- same corner radius everywhere;
- one component pattern repeated across all pages;
- overly clean modular spacing;
- every object aligned to a visible grid;
- excessive center alignment;
- decorative elements distributed evenly;
- synthetic symmetry;
- identical photo-frame treatment for every image;
- generic pastel gradient fields;
- soft SaaS-like shadows;
- filler icons inserted because space is empty;
- five pieces of information with equal visual weight.

Instead use controlled editorial irregularity:
- one dominant object;
- asymmetric satellites;
- varied photo scales;
- edge cropping;
- occasional rotations;
- overlaps with purpose;
- quiet fields next to dense fields;
- tactile paper/sticker/postcard behavior;
- strong page-to-page rhythm differences.

## 4. Generation rule

Do not ask image generation to create a finished page unless it is explicitly a disposable concept reference.

Generate atomic or semi-atomic assets instead.

Preferred generated deliverables:
- one corner decoration;
- one masthead art treatment;
- one sticker/burst backing;
- one travel illustration;
- one hand-drawn accent set;
- one page-specific decorative cluster;
- one nonfunctional stamp shell;
- one texture field.

Avoid:
- full page with baked photos/text;
- fake couple photos;
- generated Japanese body copy;
- generated schedules;
- generated location facts;
- generated QR/barcodes that appear functional.

## 5. Transparent-asset standard

For any raster decorative part intended to float over photography:

- true alpha transparency;
- no checkerboard baked into pixels;
- no colored halo around edges;
- no leftover green/white matte;
- no unintended background rectangle;
- preserve interior whites when they are part of the artwork;
- leave 2–4% composition-safe padding when practical;
- artwork must tolerate small rotation and partial edge crop.

## 6. Page-specific prepared-art budget

This is the first-pass target before final Figma decoration.

### P01 COVER
Prepared art:
- masthead art x1;
- feature burst/backing x1;
- tropical edge cluster x1–2;
- travel-object cluster x1;
- date/location stamp shell x1;
- optional hand-drawn accent x1.

Real photos:
- hero x1;
- support x1–2.

Native:
- names;
- date/location;
- coverlines;
- small issue metadata.

### P02 PROFILE
Prepared art:
- portrait frame treatment A/B;
- mini fact-label backings;
- annotation arrow;
- one shared-life accent.

Real photos:
- 2 primary/personality images;
- 1–2 support.

Native:
- all profile facts/names.

### P03 STORY
Prepared art:
- story title backing;
- restrained thread/route;
- paper-note field;
- emotional/proposal highlight shell.

Real photos:
- 1 story anchor;
- 1–3 supporting moments.

Native:
- all episode copy/facts.

### P04–P05 CENTER SPREAD
Prepared art:
- destination title art;
- route connector art;
- destination stamp shells;
- tropical edge cluster x1–2;
- proposal highlight art;
- tiny ticket/camera micro assets.

Real photos:
- strongest available travel photos; people + place + emotion + detail mix.

Native:
- destination names;
- captions;
- actual story facts;
- arrival/date information.

### P06 OFF THE MAP
Prepared art:
- tape/note accents;
- cutout outline treatment;
- heart/arrow set;
- tiny shared-life labels.

Real photos:
- 3 minimum / 5 ideal / 7 maximum without grid normalization.

Native:
- captions/facts/Q&A snippets.

### P07 WEDDING DAY
Prepared art:
- itinerary stop shell;
- one route/chronology accent;
- one practical-note backing;
- optional verified venue accent.

Native dominates:
- all times;
- all operational wording;
- date/location.

Real photos:
- optional 0–2.

### P08 BACK COVER
Prepared art:
- closing stamp/postcard accent;
- one quiet edge cluster;
- decorative issue/barcode shell only if clearly nonfunctional.

Real photos:
- calm closing image x1.

Native:
- closing message;
- names/date;
- issue metadata.

## 7. Asset promotion lifecycle

Every generated/custom asset moves through:

`BRIEF`
→ `GENERATED / DRAWN`
→ `EDGE / ALPHA QA`
→ `A5 SIZE QA`
→ `PAGE ROLE QA`
→ `APPROVED PART`
→ `FIGMA PLACEMENT`

Do not skip directly from generation to final page.

## 8. Figma placement discipline

When placing prepared art:

- retain semantic layer names;
- no flattening of the whole page;
- keep real photos independently replaceable;
- keep text above/below assets as required by reading hierarchy;
- do not use Auto Layout to control freeform editorial clusters;
- use Auto Layout only inside factual/text modules where reflow is genuinely useful;
- preserve a clean z-order: background → photo → frame → art → native text → foreground micro accents;
- do not allow a decorative asset to cover important eyes/faces or factual text accidentally.

## 9. Asset reuse without template feel

Shared assets are allowed, repeated composition is not.

A shared asset should change at least some of:
- crop;
- scale;
- rotation;
- edge position;
- overlap partner;
- visual context.

Never place the same flower cluster in the same corner on adjacent pages.

## 10. Stop conditions

Stop and correct before continuing if:
- the page still looks like a wireframe after assets are placed;
- removing color reveals repeated equal modules;
- the page can be recreated with generic UI cards without losing identity;
- the prepared art becomes more important than the real couple photography;
- a generated object contains fake text/facts;
- a photo must be aggressively cropped only because the old mask exists;
- every page starts looking like the same template.

## 11. Definition of success

V20 should feel like an intentionally art-directed Japanese travel-magazine wedding booklet where Figma is mostly a finishing/assembly surface.

A future editor should be able to:
- swap a photo;
- edit a caption;
- change a date;
- hide one decorative part;

without needing to regenerate the entire page.

At the same time, the visual result should NOT look as if it was built from a conventional web/UI component library.
