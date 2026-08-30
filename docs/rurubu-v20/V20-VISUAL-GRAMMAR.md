# V20 Visual Grammar

Status: `CANONICAL_V20_VISUAL_LANGUAGE`

This is an original V20 design system. The North-Star image defines desired energy, not literal layout/trade dress to copy.

## 1. Design thesis

V20 should feel like:

`Japanese travel editorial + personal scrapbook tactility + real wedding utility`

It should NOT feel like:
- a Canva wedding template;
- a web dashboard;
- a luxury brochure with huge empty margins;
- a direct replica of a commercial magazine brand;
- an AI collage with random stickers.

Core principle:

> High energy comes from hierarchy, scale contrast, crop, overlap and editorial clustering — not from adding more objects everywhere.

## 2. Five visual levels on every page

1. `FIRST READ` — one title or hero image.
2. `SECOND READ` — main photo/story cluster.
3. `EDITORIAL SUPPORT` — secondary labels/photos.
4. `UTILITY` — facts, dates, captions, schedule, map data.
5. `MICRO DISCOVERY` — tiny stamp, handwritten note, icon, arrow, ticket detail.

A page fails when levels 1–5 have similar size/contrast.

## 3. Composition grammar

### Use
- asymmetric clusters;
- large/small image contrast;
- partial overlap;
- 2–3 strong anchor zones rather than even distribution;
- page-edge anchoring;
- intentional cropped decoration in bleed;
- one calm readable field inside a busy page;
- mixed rectangular / circle / cutout / postcard treatment where semantically useful.

### Avoid
- equal card grids;
- four identical image tiles;
- equal spacing everywhere;
- all-centered text;
- one Auto Layout stack controlling the whole page;
- repeated pill badges;
- generic soft shadows and rounded rectangles as the main grammar.

## 4. Scale contrast

Use noticeable scale contrast before decoration.

Working heuristic:
- one hero element clearly larger than the median support element;
- support photos should normally have at least 2–3 visibly different scale classes;
- a page should not contain 4+ equally dominant blocks;
- if thumbnail view collapses into similar rectangles, rebuild scale hierarchy.

Do not enforce a mathematical ratio when crop/content needs something else; the visible hierarchy is the authority.

## 5. Photo behavior

Photography should carry the emotional truth.

Roles:
- HERO;
- PORTRAIT;
- DESTINATION;
- CANDID;
- DETAIL;
- CUTOUT;
- BACKGROUND SUPPORT.

Rules:
- one hero or anchor image per page/spread;
- no repeated same-size photo component as a default;
- preserve face/subject focal points;
- allow 15–25% crop overscan inside replaceable masks when source permits;
- frame art remains separate from image source;
- avoid reusing a hero photo elsewhere unless deliberate;
- photo-led pages should visually feel photo-led: decoration supports rather than competes.

Working rotation range for paper/photo objects:
- normally 0–6 degrees in either direction;
- stronger angles only when a specific composition needs them;
- do not rotate every image.

## 6. Overlap grammar

Purposeful overlap creates the tactile magazine feel.

Good overlap examples:
- title slightly overlaps hero crop;
- flower/leaf cluster enters from edge and crosses a frame corner;
- tape/stamp crosses one photo edge;
- route line disappears behind one object and reappears;
- cutout person/object breaches a background field.

Bad overlap:
- body text covered;
- faces blocked by decoration;
- every object overlapping everything;
- overlap used to hide weak spacing.

Typical page target:
2–5 purposeful overlap relationships, adjusted by page role. P08 can use fewer.

## 7. Edge tension

At least some pages should visibly connect to the page edge.

Allowed in bleed/trim zones:
- foliage;
- flowers;
- abstract color shapes;
- route continuation;
- large photographic crop;
- decorative stamp fragment;
- noncritical pattern/texture.

Keep critical copy, faces, eyes, dates and essential markers safely away from trim/fold.

## 8. Working V20 color family

The North-Star image was analyzed for its saturated editorial accents. The following is a V20 working family, not a literal color-copy requirement.

- `OCEAN` #17A6EE — main travel energy;
- `SKY` #5BC1EB — support blue;
- `HOT_PINK` #F83176 — display accent only;
- `SOFT_PINK` #F16596 — secondary emotional accent;
- `SUN` #F1C120 — highlight/burst;
- `SAND` #F3C069 — warm support;
- `LEAF` #508849 — foliage/grounding;
- `PAPER` #FDF6E8 — warm reading field;
- `INK` #1C2430 — primary text;
- `WHITE` #FFFFFF.

Accessibility/readability working rule:
- use INK on OCEAN/SKY/PINK/YELLOW/SAND light-to-mid fields for small text;
- white on the bright OCEAN/SKY/YELLOW fields is not approved for small text;
- if reversed white text is needed, create a deliberately darker blue/pink/green support token and test it;
- long body copy defaults to INK on PAPER/light stable field.

Page color rule:
- 1 dominant accent;
- 1 support accent;
- 1 surprise accent;
- PAPER/INK as stability.

Do not use the full palette at equal strength on every page.

## 9. Suggested color rhythm across V20

Not mandatory coordinates — this is book-level rhythm.

- P01: OCEAN dominant + HOT_PINK + SUN;
- P02: PAPER dominant + pink/blue person accents;
- P03: warm PAPER/SAND + one emotional pink + blue route hint;
- P04–P05: photography dominant with OCEAN route + SUN/HOT_PINK highlights;
- P06: PAPER/light field + playful mixed accents, lower saturation area than center spread;
- P07: OCEAN/INK structure + SUN/warmer event highlight;
- P08: PAPER/warm calm with one reprise accent.

Adjacent pages should not repeat the same dominant field.

## 10. Typography grammar

Japanese is primary.

Display hierarchy:
- masthead / hero title: bespoke composition or carefully built native/vector treatment;
- page title: bold, wide visual silhouette;
- section title: compact and strong;
- body: quiet and highly readable;
- caption/meta: small but not disposable.

Working A5 ranges before actual-size proof:
- page title: ~22–34 pt;
- section title: ~13–20 pt;
- body: ~9–10.5 pt;
- caption: ~8–9 pt;
- micro meta: ~7.5 pt floor for noncritical information.

Rules:
- never shrink important copy to rescue an overloaded layout;
- expressive generated art may support a title, but authoritative Japanese words must be checked or kept native;
- long body copy is never baked into raster decoration;
- avoid fake decorative English that has no editorial meaning.

## 11. Display-title treatment

Use combinations selectively:
- thick colored type + white keyline;
- offset hard shadow rather than soft UI shadow;
- ribbon/backplate;
- marker/brush underline;
- small subtitle;
- one overlapping travel/flower element.

Do not use all treatments on every title.

## 12. Shape language

Prefer:
- straight-edged photo paper;
- irregular sticker/burst;
- circle marker;
- ticket/notch shape;
- stamp ring;
- ribbon;
- hand-drawn line;
- organic foliage silhouette.

Limit generic rounded-rectangle cards.

If a rectangular information support is needed, treat it like an editorial paper panel, label block, ticket or clipping rather than a web card.

## 13. Texture / tactility

Optional subtle texture:
- paper grain;
- print-dot/halftone accent;
- stamped ink imperfection;
- tape/paper edge;
- hand-drawn underline.

Texture must remain secondary and print-safe. It should not dirty small body copy or create fake vintage noise everywhere.

## 14. Calm-zone rule

Busy magazine pages still need a readable landing area.

Every copy-heavy page identifies one calm zone where:
- background is stable;
- body copy has no competing image texture;
- line length is comfortable;
- decoration does not invade the text block.

P06 can be more image-led and use captions instead of a large calm body area.

## 15. Spread rule

For P02–P03, P04–P05, P06–P07:
- connect spreads using one shared cue, not mirrored templates;
- vary hero position and density side-to-side;
- critical content does not sit on the fold;
- P04–P05 may carry one noncritical route/atmosphere element through the fold.

## 16. Originality / brand distance

V20 should evoke the excitement of Japanese travel magazines without claiming official affiliation or tracing one brand's exact logo/trade dress.

Therefore:
- build an original V20 masthead;
- use original title composition;
- derive general editorial principles, not exact page copies;
- use the North-Star image as taste calibration only.

## 17. V20 anti-AI test

Immediately revise if any page shows:
- 3+ equal cards in a clean grid;
- same corner radius on all images/boxes;
- every section centered;
- generic gradient background;
- soft shadow on all cards;
- decorative stickers with no reading job;
- identical photo counts/positions on adjacent pages;
- empty luxury whitespace replacing information hierarchy;
- tiny text created to make a template fit;
- fake facts or generated Japanese text errors.

## 18. Thumbnail test

At small thumbnail scale, each page/spread must still have a different silhouette.

Expected silhouettes:
- P01: huge title + hero crop;
- P02: two-person offset profile cluster;
- P03: flowing story with calmer copy field;
- P04–P05: wide route/photo panorama;
- P06: irregular mosaic/candid cluster;
- P07: strong vertical/diagonal itinerary rhythm;
- P08: calm closing image/message.

If silhouettes become similar, change structure before decoration.