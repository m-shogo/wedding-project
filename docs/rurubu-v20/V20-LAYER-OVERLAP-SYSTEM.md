# V20 Layer / Overlap System

Status: `CANONICAL_ASSET_FIRST_ASSEMBLY_RULE / FULL_EDITORIAL_COLLISION`

Purpose: make V20 feel like a designed travel magazine rather than a web UI or an AI-generated sticker sheet. Figma assembles already-designed editorial assets and keeps variable content editable; it does not invent page composition from scratch.

## 1. Core principle

V20 intentionally uses strong overlap, depth, occlusion and edge intrusion.

The previous weak assumption — “overlap only a little” — is rejected.

Background, photography, frame, masthead, label, stamp, route, decorative art and text-support fields may overlap heavily when the editorial result improves.

Good overlap creates:
- hierarchy;
- reading flow;
- tactile paper/editorial feeling;
- visual continuity between photography and decoration;
- controlled asymmetry;
- strong magazine silhouette.

The governing constraint is NOT overlap percentage. The governing constraints are:
- does the first/second/third read remain clear?
- is important text readable?
- are important faces/gestures intentionally protected when needed?
- does the overlap create depth/story rather than random clutter?

## 2. Canonical semantic layer stack

Bottom to top as a common model:

1. `BACKGROUND / PAPER + COLOR FIELD`
2. `BACKGROUND ART / LARGE COMPOSITE`
3. `REAL PHOTO / REPLACEABLE`
4. `PHOTO FRAME / PAPER OBJECT / MASK OVERLAY`
5. `DISPLAY TITLE / MASTHEAD / LARGE LABEL`
6. `EDITORIAL CLUSTER / STAMP / ROUTE / FLOWER / TRAVEL OBJECT`
7. `TEXT SUPPORT / PAPER / SLAB / LOCAL CONTRAST DEVICE`
8. `NATIVE FACT TEXT / BODY / CAPTION / TIME / NAME`
9. `MICRO ACCENT / ARROW / HEART / NUMBER / TINY STICKER`
10. `QA / GUIDE` hidden from export

Important:
- this is semantic, not a rigid z-index law;
- title may sit behind a cutout subject;
- a stamp may sit above title;
- a frame may sit above and below different photo regions;
- text-support may cover a large portion of photography;
- one asset may cross several semantic layers visually.

## 3. Figma's job

Figma is primarily responsible for:
- placing approved assets;
- replacing/cropping real photos;
- controlling z-order;
- applying final rotations/scale;
- keeping names, dates, body copy, captions, schedule facts editable;
- adding/adjusting text-support fields when exact copy requires it;
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

A cluster is precomposed for a known page job, usually with transparent background and deliberate transparent/quiet regions where photography or copy must remain legible.

## 5. Asset granularity

Use three levels.

### LARGE COMPOSITE
Page-defining atmosphere/structure. Normally 1–3 per page/spread.

Examples:
- cover edge environment;
- center-spread route + atmospheric marks;
- large page-edge flower/travel composition;
- broad editorial color/paper shape.

### MEDIUM EDITORIAL PART
Normally 2–6 per page.

Examples:
- masthead;
- title plate;
- destination stamp shell;
- paper-note overlay;
- postcard/polaroid overlay;
- feature burst;
- proposal highlight;
- page-specific box/band/container art.

### MICRO ACCENT
Normally 0–5 per page, added only after hierarchy already passes.

Examples:
- arrow;
- heart;
- tiny number;
- micro flower;
- tiny airplane/camera mark.

Never use micro accents to fill empty space that should remain calm.

## 6. Full editorial collision rule

Strong overlap is explicitly allowed and often preferred.

Allowed examples:
- photo behind title, frame over photo, title over frame, stamp over title;
- title crossing background, photo and paper field at once;
- paper/box covering 50–90% of a photo if it creates a useful reading field;
- small photo covering a significant corner of the HERO photo;
- flower/route entering beneath and above different photo layers;
- cutout person sitting in front of title while title remains readable from silhouette/context;
- caption partly inside and partly outside photo;
- destination label crossing route + photo + frame simultaneously;
- giant numeral behind a text block and photo cluster;
- title or photo intentionally cropped at bleed.

There is no universal light/medium/strong overlap percentage in V20.

A nearly full overlap can be correct. An almost-touching layout can be wrong.

## 7. Text readability is solved by support, not separation

Do NOT protect text by automatically moving it away from photography/decor.

Instead choose an appropriate support method:
- opaque paper field;
- irregular color slab;
- ribbon/band;
- translucent local panel;
- thick keyline/outline;
- hard offset shadow;
- local photo darkening/lightening;
- marker stroke / handwritten backplate;
- quiet area already present in photography;
- frame/caption foot acting as text support;
- cutout contour creating a readable edge.

Long body copy and operational facts may be visually embedded in a busy composition as long as their local support produces reliable readability.

## 8. Protected content is contextual, not automatically isolated

Important content may overlap strongly, but protect its semantic integrity.

Examples:
- a face may be partially overlapped if expression/readability remains strong;
- a title may cover part of a body/landscape if the intended focal point survives;
- schedule times can sit on a large photo if backed by an authoritative high-contrast field;
- proposal copy can live inside the collage if it has a calm local reading island.

Hard protections:
- do not obscure eyes/mouth/critical gesture without a deliberate composition reason;
- do not reduce body-copy contrast below comfortable A5 readability;
- do not compromise QR/functionality;
- do not bury authoritative facts in decorative noise.

## 9. Depth hierarchy

A page should have obvious depth levels even when many layers collide.

Typical hierarchy:
- environmental background = broad atmosphere;
- HERO photo = largest photographic weight;
- secondary photos = smaller and may cover/enter HERO;
- title/display art = may cross multiple boundaries;
- editorial cluster = creates story/context;
- text support = local readability structure;
- native facts/copy = readable and editable;
- micro accents = discovery layer.

If every item has the same border, shadow, radius and raised-card treatment, the result becomes UI-like.

## 10. Edge intrusion

Dense pages should frequently let noncritical elements enter/crop at page edges or bleed.

Good candidates:
- foliage;
- flowers;
- photo corners;
- route line;
- paper/ticket edge;
- decorative travel objects;
- title letters;
- giant numerals;
- color slabs.

Critical facts do not rely on bleed survival.

## 11. Rotation discipline

Rotation is purposeful, not random.

Typical behavior:
- HERO may remain stable or follow source-photo energy;
- support photos may rotate independently;
- paper/ticket/stamp may rotate more;
- major title may be diagonal if that is its silhouette;
- body copy normally stays readable, but its containing paper field may rotate subtly.

No numeric rotation quota. Avoid randomizing every object.

## 12. Calm fields are local supports, not empty pages

A dense Rurubu-like page can have a calm reading island completely surrounded by overlap.

Good examples:
- proposal story field floating on/over Hawaii photography;
- profile copy field partly covered by portrait edge;
- P07 practical note box embedded under giant time typography;
- P08 closing copy on a postcard field sitting over photography.

Calm does NOT mean separated from the composition.

## 13. Background strategy

Background is an active participant and may itself be heavily covered.

Possible composition:
- paper tone;
- broad color shape;
- texture;
- giant cropped typography;
- cropped edge botanical/travel artwork;
- faint route/print marks;
- local photo/environment fragment;
- intentional calm support field.

The background must not become a single flattened page image containing variable facts or irreplaceable photography.

## 14. Photo-frame strategy

Prefer overlays and masks that allow independent photo replacement.

Possible stack:
- background art;
- real photo;
- secondary photo partly over HERO;
- transparent frame/paper overlay;
- tape/stamp/title crossing frame/photo;
- native caption on attached support field.

A frame is optional. Do not frame every photo.

## 15. Page intensity rhythm

Overlap is strong where editorial energy calls for it, but visual temperature still varies.

Working direction:
- P01 COVER: VERY HIGH collision;
- P02 PROFILE: MEDIUM–HIGH, with readable profile supports;
- P03 STORY: MEDIUM, article field penetrated by photo/title;
- P04–P05 JOURNEY: VERY HIGH, with local proposal reading support;
- P06 OFF THE MAP: HIGH / playful collage;
- P07 WEDDING DAY: MEDIUM–HIGH visually, but information hierarchy protected;
- P08 BACK: LOW–MEDIUM collision / deliberate closing calm.

Do not interpret a lower-intensity page as “everything separated.”

## 16. Anti-AI / anti-UI checks

Reject or redesign when:
- every photo is inside an identical card;
- every element has the same shadow/radius;
- empty space is filled with arbitrary stickers;
- all layers are isolated with no visual interaction;
- every photo has the same rotation/treatment;
- all sections align to one obvious dashboard grid;
- decorative assets look independently generated and unrelated;
- cluster assets are symmetrical or centered by default;
- hierarchy only exists because of different card colors;
- all text is protected by the same white rounded rectangle;
- boxes/bands are banned simply because they are boxes/bands;
- every asset is fully visible like a sticker catalogue.

## 17. Editorial container rule

Boxes, bands, labels and frames are welcome when designed as magazine vessels.

Use `V20-EDITORIAL-CONTAINER-AND-TITLE-GRAMMAR.md` as the authority for:
- diverse box/band silhouettes;
- title-as-shape behavior;
- strong text-support devices;
- intentional occlusion;
- anti-UI repetition checks.

## 18. Cluster generation brief

When generating a page-specific cluster, specify:
- exact page and location;
- what the cluster must overlap and what may sit over it;
- transparent/quiet zones that variable copy/photo may need;
- direction of visual flow;
- density gradient;
- object count/type;
- forbidden symmetry;
- transparent background requirement;
- no real-person replacement;
- no authoritative text baked into art;
- approximate physical print size and required raster size;
- expected z-order interactions.

Example concept:
`P01 upper-right cluster: dense beyond top/right bleed, enters hero photo and masthead area, tropical flowers + foliage + one travel print motif, transparent center-left region reserved for face/title legibility, no text, no centered bouquet, designed to be partly hidden by the HERO and partly sit in front of its frame.`

## 19. Assembly sequence

For every page:
1. place background/base composite;
2. place real photography based on source behavior;
3. place large editorial composite(s), allowing deep overlap;
4. add frame/paper overlays only where editorially useful;
5. add masthead/title/display art, including behind/in front of photo where intended;
6. add medium editorial containers / route / stamp assets;
7. create/adjust text-support geometry based on actual copy;
8. add native variable/fact text;
9. add micro accents only if needed;
10. inspect first/second/third read at thumbnail scale;
11. inspect text/face/function at A5 physical scale;
12. hide micro decoration—not major composites—to verify hierarchy still works;
13. re-enable all layers and judge whether collision creates authored depth.

## 20. Final principle

V20 is not “slightly overlapping elements.”

V20 is `controlled editorial collision`: background, photographs, frames, titles, editorial vessels and decorations may collide strongly and obscure one another, while local support preserves readability and the visual hierarchy remains deliberate.