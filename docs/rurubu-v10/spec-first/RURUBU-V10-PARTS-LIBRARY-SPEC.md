# Rurubu WEDDING V10 — Reusable Parts Library Specification

Status: `CANONICAL_PARTS_TAXONOMY`

Purpose: convert the canonical reference's visual vocabulary into reusable semantic parts so Figma assembles authored pages instead of inventing them from scratch.

---

# 1. Parts philosophy

A part must have an editorial job.

Good part:
- helps hierarchy;
- groups information;
- signals travel/wedding context;
- creates a tactile magazine layer;
- guides reading order;
- provides visual rhythm.

Bad part:
- exists only to fill a blank gap;
- is a generic UI badge/pill/card;
- repeats the same geometry across every page;
- adds decoration without meaning.

Parts should be reusable as a family, not cloned identically.

---

# 2. Core families

## A. HERO / PAGE TITLE PARTS

Roles:
- `TITLE / COVER / RURUBU_WEDDING`
- `TITLE / PROFILE`
- `TITLE / QA`
- `TITLE / STORY`
- `TITLE / TIMELINE`
- `TITLE / MEMORY_SPOTS`
- `TITLE / 1DAY`
- `TITLE / BACK`

Visual grammar:
- strong pink/blue/yellow contrast;
- white keyline or offset shadow where useful;
- ribbon/brush/backplate support;
- small English subtitle optional;
- decorative flowers/travel motif may overlap title edge.

Editable contract:
- fixed expressive display title may be composed/raster/vector;
- changing facts and long text remain native.

Variants to prepare:
- horizontal ribbon;
- slightly arched headline;
- brush-underlined title;
- outlined sticker-title;
- title + small English subtitle lockup.

## B. SECTION LABELS / RIBBONS

Roles:
- editor's pick;
- check point;
- profile fact;
- our story;
- best shot;
- memory spot;
- special thanks;
- dress code;
- photo contest;
- map/guide label.

Visual grammar:
- short, high-contrast copy;
- non-uniform ribbon/tag shapes;
- not every section uses the same pill.

Variants:
- paper ribbon;
- tape strip;
- small burst;
- luggage-tag shape;
- handwritten label.

## C. PHOTO FRAMES

Required families:
- `FRAME / POLAROID / PORTRAIT`
- `FRAME / POLAROID / LANDSCAPE`
- `FRAME / POSTCARD`
- `FRAME / WHITE_KEYLINE`
- `FRAME / TAPE_CORNERS`
- `FRAME / ORGANIC_CUTOUT`
- `FRAME / CIRCLE`
- `FRAME / SNAPSHOT_SMALL`

Rules:
- photo source remains separate and replaceable;
- frame artwork sits above/around image;
- rotation is controlled, usually a few degrees;
- do not use one frame type everywhere.

## D. STAMPS / POSTMARKS

Roles:
- wedding date;
- Yokohama;
- journey/passport;
- special issue;
- arrival/departure;
- chapter marker.

Visual grammar:
- circular or imperfect inked edge;
- single dominant ink color;
- slightly distressed/tactile feel;
- short copy only.

Do not rasterize critical final factual copy unless verified.

## E. TRAVEL OBJECTS

Core semantic objects:
- airplane;
- suitcase/luggage;
- passport;
- boarding pass/ticket;
- camera;
- map pin;
- route line;
- compass;
- sunglasses;
- postcard;
- travel signpost.

Rules:
- use in relation to page meaning;
- one object can become a page anchor, but do not create an icon soup;
- vary object scale dramatically.

## F. TROPICAL / FLORAL EDGE PARTS

Core:
- hibiscus flower;
- plumeria-like flower;
- tropical leaf;
- palm leaf;
- flower + leaf corner cluster;
- small standalone blossom.

Variants:
- top-left corner;
- top-right corner;
- bottom-left corner;
- bottom-right corner;
- horizontal mini cluster;
- small single accent.

Use mostly as page framing / edge tension rather than centered decoration.

## G. HAND-DRAWN MICRO PARTS

Core:
- heart;
- curved arrow;
- underline;
- circle/rough ring;
- sparkle/star;
- wavy line;
- handwritten note marker;
- mini travel doodle.

Rules:
- these create human/editorial irregularity;
- use sparingly around meaningful content;
- never scatter them uniformly.

## H. INFO / DATA PARTS

Core:
- compact profile data row;
- short `DATA` block;
- map legend;
- number marker 01–06;
- timeline date marker;
- schedule time marker;
- caption plate;
- small recommendation burst.

Rules:
- native editable text;
- decorative shell may be reusable;
- avoid dashboard card styling;
- support scanability without boxing every paragraph.

## I. MAP / ROUTE PARTS

Core:
- dotted travel route;
- curved route with airplane;
- destination pin;
- numbered destination marker;
- simplified map field;
- timeline-as-route connector.

Semantic rule:
The route must encode an actual sequence or spatial relation. A fake transit line used only for decoration is prohibited.

## J. PAPER / TEXTURE PARTS

Core:
- warm cream paper field;
- subtle postcard paper;
- tiny halftone/grain support;
- ripped/torn paper accent;
- tape strip.

Rules:
- tactile effect should remain subtle enough for print readability;
- do not use texture to hide weak composition.

---

# 3. Part states

Every part role should have one state:

- `EXISTING_VERIFIED`
- `EXISTING_NEEDS_VISUAL_QA`
- `NEEDS_SEARCH`
- `NEEDS_GENERATION`
- `REJECTED`
- `DEPRECATED`

Do not regenerate a role until existing organized assets have been searched.

---

# 4. Generation requirements

When generation is required, generate isolated semantic assets rather than full pages whenever possible.

Preferred output characteristics:
- transparent background for stickers/decoration;
- no embedded long text;
- clean edges suitable for A5 print;
- enough resolution for intended physical size;
- multiple variants with genuinely different silhouettes;
- consistent reference vocabulary without exact copying of third-party publication artwork.

For title art containing copy:
- verify Japanese text manually;
- keep a native editable text fallback when factual copy can change.

---

# 5. Minimum useful library target

Before fine page polish, aim for approximately:

- 8 page-title roles;
- 8–12 label/ribbon variants;
- 6–8 photo-frame variants;
- 4–6 stamps;
- 8–12 travel-object assets;
- 8–12 tropical/floral assets/clusters;
- 8–12 hand-drawn micro accents;
- 6–10 info/data shells;
- 4–6 route/map assets;
- 3–5 tactile paper/texture supports.

These are role targets, not mandatory generation counts. Reuse good existing assets first.

---

# 6. Figma organization

Recommended semantic component/group naming:

`RURUBU/PART/TITLE/...`
`RURUBU/PART/LABEL/...`
`RURUBU/PART/FRAME/...`
`RURUBU/PART/STAMP/...`
`RURUBU/PART/TRAVEL/...`
`RURUBU/PART/FLORAL/...`
`RURUBU/PART/HANDDRAWN/...`
`RURUBU/PART/INFO/...`
`RURUBU/PART/ROUTE/...`
`RURUBU/PART/TEXTURE/...`

Do not expose a final parts page as production output.

---

# 7. Part-selection rule per page

A page manual should select parts by role, not by “what looks cute.”

Example:

P06 MEMORY SPOTS needs:
- 1 title treatment;
- 1 dominant destination marker system;
- 3–5 mixed photo frames;
- 1 camera/travel-object anchor;
- 1 route/map support if semantically useful;
- 1–2 corner floral clusters;
- 2–4 micro handwritten accents.

It does NOT need every available sticker family.

---

# 8. Quality test

A reusable part passes when:
- it still looks intentional at A5 actual size;
- it survives print-scale reduction;
- it has a clear editorial purpose;
- it can combine with at least two page roles without making pages look cloned;
- its silhouette is recognizably different from other variants;
- it does not force body copy into raster artwork;
- it does not create generic web/card UI grammar.
