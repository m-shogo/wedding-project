# V20 Layer / Overlap System

Status: `CANONICAL_ASSET_FIRST_ASSEMBLY_RULE`

Purpose: make V20 feel like a designed travel magazine rather than a web UI or an AI-generated sticker sheet. Figma assembles already-designed editorial assets and keeps variable content editable; it does not invent page composition from scratch.

## 1. Core principle

V20 intentionally uses overlap, depth and edge intrusion.

Good overlap creates:
- hierarchy;
- reading flow;
- tactile paper/editorial feeling;
- visual continuity between photography and decoration;
- controlled asymmetry.

Overlap is not random clutter. Every overlap must improve hierarchy, continuity, or story.

## 2. Canonical layer stack

Bottom to top:

1. `BACKGROUND / PAPER + COLOR FIELD`
2. `BACKGROUND ART / LARGE COMPOSITE`
3. `REAL PHOTO / REPLACEABLE`
4. `PHOTO FRAME / PAPER OBJECT / MASK OVERLAY`
5. `DISPLAY TITLE / MASTHEAD / LARGE LABEL`
6. `EDITORIAL CLUSTER / STAMP / ROUTE / FLOWER / TRAVEL OBJECT`
7. `NATIVE FACT TEXT / BODY / CAPTION / TIME / NAME`
8. `MICRO ACCENT / ARROW / HEART / NUMBER / TINY STICKER`
9. `QA / GUIDE` hidden from export

Important: this is a semantic order, not a requirement that every page use every layer.

## 3. Figma's job

Figma is primarily responsible for:
- placing approved assets;
- replacing/cropping real photos;
- controlling z-order;
- applying final rotations/scale;
- keeping names, dates, body copy, captions, schedule facts editable;
- print geometry and final QA.

Figma is NOT primarily responsible for:
- drawing flower bouquets from primitives;
- inventing travel illustrations;
- building decorative clusters one atom at a time;
- deciding the page layout from a generic prompt;
- turning every content item into an Auto Layout card.

## 4. Prefer editorial cluster assets over atomic assets

Bad production pattern:
- one flower;
- one leaf;
- one star;
- one camera;
- one line;
- one ribbon;
- then compose them all in Figma.

Preferred V20 pattern:
- `P01_TOP_RIGHT_TRAVEL_CLUSTER`;
- `P01_BOTTOM_EDITORIAL_CLUSTER`;
- `P45_JOURNEY_ROUTE_CLUSTER`;
- `P05_PROPOSAL_HIGHLIGHT_CLUSTER`;
- `P08_CLOSING_EDGE_CLUSTER`.

A cluster is precomposed for a known page job, usually with transparent background and a deliberate empty area where photography/copy must remain visible.

## 5. Asset granularity

Use three levels.

### LARGE COMPOSITE
Page-defining atmosphere/structure. Normally 1–3 per page/spread.

Examples:
- cover edge environment;
- center-spread route + atmospheric marks;
- large page-edge flower/travel composition.

### MEDIUM EDITORIAL PART
Normally 2–6 per page.

Examples:
- masthead;
- title plate;
- destination stamp shell;
- paper-note overlay;
- postcard/polaroid overlay;
- feature burst;
- proposal highlight.

### MICRO ACCENT
Normally 0–5 per page, added only after hierarchy already passes.

Examples:
- arrow;
- heart;
- tiny number;
- micro flower;
- tiny airplane/camera mark.

Never use micro accents to fill empty space that should remain calm.

## 6. Overlap rules

### Strongly encouraged
- photo ↔ photo;
- title ↔ photo edge;
- stamp/label ↔ photo corner;
- flower/foliage ↔ photo/frame edge;
- paper object ↔ photo;
- route ↔ photo cluster, when it genuinely guides reading.

### Usually protected
- long body copy;
- schedule times and operational facts;
- names/dates when small;
- eyes/faces;
- emotionally important gestures;
- QR codes or functional information.

## 7. Overlap amount

Do not enforce one numeric percentage globally, but typical overlap should be visually meaningful rather than accidental.

Useful working behavior:
- light overlap: about 5–15% of the smaller item's footprint;
- medium overlap: about 15–30%;
- strong overlap: 30%+ only for intentionally layered collage moments.

Avoid the weak `almost touching` state unless spacing itself is intentional.

## 8. Depth hierarchy

A page should have obvious depth levels.

Typical hierarchy:
- environmental background = broad and quiet;
- hero photo = largest image weight;
- secondary photos = smaller and partially overlapping;
- title/display art = crosses one boundary;
- medium editorial cluster = adds story/context;
- body/fact text = protected and readable;
- micro accents = final discovery layer.

If every item is equally raised, bordered and shadowed, the result becomes UI-like.

## 9. Edge intrusion

At least some dense pages should let noncritical elements enter/crop at page edges or bleed.

Good candidates:
- foliage;
- flowers;
- photo corners;
- route line;
- paper/ticket edge;
- decorative travel objects.

Critical facts and faces do not depend on bleed areas.

## 10. Rotation discipline

Rotation is purposeful, not random.

Typical behavior:
- hero: usually stable or very slight rotation;
- one/two support photos: about ±1–4°;
- ticket/paper/stamp: may rotate more;
- body text: normally level;
- not every photo is tilted.

A page where every object is rotated looks synthetic and noisy.

## 11. Protected calm fields

Rurubu-like density still needs readable calm zones.

Each page should deliberately reserve one or more calm fields for:
- body copy;
- factual profile data;
- proposal story;
- schedule guidance;
- closing message.

Dense surroundings make the calm field more effective. Do not decorate every square millimeter.

## 12. Background strategy

Backgrounds are not just flat page colors.

Possible composition:
- paper tone;
- one broad color shape;
- subtle texture;
- cropped edge botanical/travel artwork;
- faint route/print marks;
- local calm field.

However, the background must not become a single flattened page image containing variable facts or irreplaceable photography.

## 13. Photo-frame strategy

Prefer overlays and masks that allow independent photo replacement.

Example stack:
- real photo;
- replaceable crop/mask;
- transparent postcard/polaroid frame overlay;
- optional tape/stamp overlay;
- native caption.

Do not bake final autobiographical photos and captions together when they may change.

## 14. Page intensity rhythm

Overlap intensity is page-specific.

Working target:
- P01 COVER: HIGH;
- P02 PROFILE: MEDIUM;
- P03 STORY: LOW–MEDIUM;
- P04–P05 JOURNEY: HIGH, with a calmer proposal copy island;
- P06 OFF THE MAP: MEDIUM–HIGH / playful;
- P07 WEDDING DAY: LOW–MEDIUM / information protected;
- P08 BACK: LOW / deliberate closing calm.

This prevents eight pages from feeling like the same template.

## 15. Anti-AI / anti-UI checks

Reject or redesign when:
- every photo is inside an identical card;
- every element has the same shadow/radius;
- empty space is filled with arbitrary stickers;
- all layers are isolated with no visual interaction;
- every photo has the same rotation;
- all sections align to one obvious dashboard grid;
- decorative assets look independently generated and unrelated;
- cluster assets are symmetrical or centered by default;
- hierarchy only exists because of different card colors.

## 16. Cluster generation brief

When generating a page-specific cluster, specify:
- exact page and location;
- what the cluster must overlap;
- where transparency/negative space must remain;
- direction of visual flow;
- density gradient (where dense, where sparse);
- object count/type;
- forbidden symmetry;
- transparent background requirement;
- no real-person replacement;
- no authoritative text baked into art;
- approximate physical print size and required raster size.

Example concept:
`P01 upper-right cluster: dense at top-right, becomes sparse toward center-left; tropical flowers + foliage + one small travel motif; transparent central-left opening reserved for masthead/face; no text; no circular bouquet; no symmetrical arrangement.`

## 17. Assembly sequence

For every page:
1. place background/base composite;
2. place real photography and determine crop from source behavior;
3. add frame/paper overlays;
4. add masthead/title/display art;
5. add medium editorial clusters and route/stamp assets;
6. add native variable/fact text;
7. add micro accents only if the page still needs them;
8. inspect at thumbnail scale and A5 physical scale;
9. temporarily hide decoration: information hierarchy must still work;
10. re-enable decoration: overlap must improve, not merely increase density.

## 18. Final principle

V20 should look designed through composition, not generated through accumulation.

The desired feeling is `controlled editorial collision`: photos, titles, paper objects and travel motifs intentionally touch and overlap while the page remains readable and has a clear first/second/third read.
