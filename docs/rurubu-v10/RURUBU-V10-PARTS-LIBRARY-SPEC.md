# Rurubu WEDDING V10 — Editorial Parts Library Specification

Status: `V10_CANONICAL_SUPPLEMENT / PART VOCABULARY`

Purpose: give Figma/Codex/Claude a finite editorial vocabulary to place, combine and vary instead of asking them to invent generic cards or random decoration.

The library is a **vocabulary**, not a template kit. Reusing a part must not force different pages into the same composition.

---

# 1. Part contract

Every reusable part should have:

- `ROLE`: what editorial job it performs;
- `VISUAL_FAMILY`: title / badge / frame / travel / floral / route / etc.;
- `EDITABILITY`: raster / vector / native text / mixed;
- `REPLACEMENT_BEHAVIOR`: static / content-bound / photo-bound;
- `SCALE_BAND`: hero / section / support / micro;
- `PAGE_AFFINITY`: pages where it naturally belongs;
- `DO_NOT_USE_WHEN`: common misuse;
- `Z_ORDER_HINT`: where it usually sits.

A part with no editorial job is not automatically allowed simply because there is empty space.

---

# 2. Identity and hero-title family

## `TITLE_HERO_WEDDING`

ROLE:
- publication/cover identity;
- first read on P01.

EDITABILITY:
- composed/raster or vector art allowed;
- names/date should remain separate unless explicitly approved and verified.

SCALE_BAND:
- HERO, roughly 55–85% page width depending on proportions.

PAGE_AFFINITY:
- P01 primarily;
- subtle reprise on P08 only if reduced strongly.

DO_NOT_USE_WHEN:
- it makes P02–P07 look like duplicate covers;
- it contains incorrect generated factual text.

---

## `TITLE_PAGE_PLATE`

ROLE:
- page identification;
- strong travel-magazine title silhouette.

Variants may include:
- rounded outlined Japanese title;
- brush/ribbon support;
- small English subtitle;
- flower/leaf accent integrated at edges.

EDITABILITY:
- title art can be raster/vector;
- authoritative Japanese title should be verified or kept native above/beside art if generation text is unreliable.

SCALE_BAND:
- SECTION/HERO, roughly 55–90% page width depending on page.

PAGE_AFFINITY:
- P02–P07.

DO_NOT USE:
- identical title plate at identical x/y/scale on every page.

Variation dimensions:
- left/center/right anchoring;
- width;
- supporting brush/ribbon direction;
- flower placement;
- subtitle placement.

---

## `TITLE_MICRO_SUBTITLE`

ROLE:
- editorial nuance, e.g. `Our Profile`, `Our Memories`, `Message`.

EDITABILITY:
- native or decorative art.

SCALE_BAND:
- MICRO/SUPPORT.

RULE:
- must never outrank Japanese page title;
- must not exist purely to create fake sophistication.

---

# 3. Editorial label family

## `LABEL_SECTION_RIBBON`

ROLE:
- introduce one subfeature inside a page.

Examples:
- `Our Story`;
- `Best 5`;
- `Special Thanks`;
- `Dress Code`;
- `Photo Contest`.

EDITABILITY:
- label background raster/vector;
- text native when factual/changeable.

SCALE_BAND:
- SUPPORT.

PAGE_AFFINITY:
- any page with a real secondary feature.

DO NOT USE:
- around every paragraph;
- as a software-tab replacement.

---

## `BADGE_BURST`

ROLE:
- one high-energy callout.

Examples:
- countdown;
- `CHECK!`;
- `注目!`;
- special date;
- one editorial pick.

SCALE_BAND:
- SUPPORT/MICRO.

COUNT GUIDANCE:
- usually 0–2 per page;
- P01 may allow 2–3 if hierarchy remains clear.

DO NOT USE:
- five equal badges competing for attention.

---

## `BADGE_ROUND_SEAL`

ROLE:
- date stamp / recommendation / special issue seal.

VISUAL BEHAVIOR:
- circular or near-circular;
- can overlap frame/photo edge;
- works well at corners/junctions.

DO NOT USE:
- as every section heading.

---

## `LABEL_DATA`

ROLE:
- compact factual metadata.

Examples:
- profile facts;
- venue utility;
- destination microdata.

EDITABILITY:
- native text mandatory;
- background treatment can be reusable.

DESIGN:
- small label/rule hierarchy;
- avoid large rounded card containers.

---

# 4. Photo frame family

Photo frames are visual wrappers. They never own the source image permanently.

All photo frames must remain separate from replaceable photo sources.

## `FRAME_POLAROID_PORTRAIT`

ROLE:
- people/profile/memory snapshot.

PAGE_AFFINITY:
- P02, P04, P05, P06.

GESTURE:
- may rotate ±1.5–4°;
- caption/name may overlap lower white border.

DO NOT USE:
- more than 2–3 times at identical size on one page.

---

## `FRAME_POLAROID_LANDSCAPE`

ROLE:
- destination/memory/venue snapshot.

PAGE_AFFINITY:
- P01, P06, P08.

GESTURE:
- good for stacked clusters;
- may overlap another print by 3–8 mm.

---

## `FRAME_WHITE_BORDER_TILT`

ROLE:
- quick magazine print/photo without full polaroid bottom margin.

PAGE_AFFINITY:
- P01, P04, P05, P06, P07.

RULE:
- keep border optically visible at actual A5 size;
- slight shadow okay if tactile, not generic UI elevation.

---

## `FRAME_ORGANIC_ROUND`

ROLE:
- break rectangular rhythm.

PAGE_AFFINITY:
- P02, P03, P06.

RULE:
- use selectively;
- circular crop should have a reason such as profile face/detail/food/iconic destination.

---

## `FRAME_HERO_EDGELESS`

ROLE:
- dominant photo with little/no visible frame.

PAGE_AFFINITY:
- P01, P04, P06.

RULE:
- use when photography should carry the visual mass;
- may be cropped close to page edge/bleed where safe.

---

## `PHOTO_STACK_2_3_PRINTS`

ROLE:
- produce tactile collage cluster.

CONTRACT:
- 2–3 independently replaceable masks;
- different sizes/aspect ratios;
- only one is visually dominant;
- frames overlap, but faces/focal landmarks are not hidden.

PAGE_AFFINITY:
- P01, P06, P08.

---

# 5. Travel vocabulary family

## `ICON_AIRPLANE`

ROLE:
- journey/movement/route cue.

Use:
- near map/route/title where movement is semantic.

Avoid:
- one on every page simply because theme = travel.

---

## `ROUTE_DOTTED`

ROLE:
- connect actual locations or chronology.

PAGE_AFFINITY:
- P05 timeline;
- P06 destination map;
- P07 itinerary.

RULE:
- route direction must match reading semantics;
- never use as meaningless squiggle behind text.

---

## `PIN_NUMBERED`

ROLE:
- bind map and destination/photo.

PAGE_AFFINITY:
- P06 strongest;
- P05/P07 if semantically useful.

CONTRACT:
- same number appears on map and associated content;
- color is not the only binding signal.

---

## `STAMP_DATE`

ROLE:
- wedding date / journey event / postmark flavor.

EDITABILITY:
- decorative shell may be raster;
- date should be verified and preferably native when likely to change.

PAGE_AFFINITY:
- P01, P05, P08.

---

## `STAMP_AIRMAIL_POSTMARK`

ROLE:
- postcard/travel-journal closing motif.

PAGE_AFFINITY:
- P08 primarily.

---

## `OBJECT_CAMERA`

ROLE:
- photo/memory/contest cue.

PAGE_AFFINITY:
- P01, P06, P08.

Avoid:
- camera as filler where page is not about photos/memories.

---

## `OBJECT_PASSPORT_TICKET_SUITECASE_CLUSTER`

ROLE:
- tactile travel still life;
- lower-corner anchor;
- publication identity.

PAGE_AFFINITY:
- P01, P06, P08.

CONTRACT:
- overlap objects into one visual cluster;
- do not distribute them as three unrelated icons.

---

# 6. Floral / tropical family

The approved reference uses tropical decoration heavily, but in clusters.

## `CLUSTER_TROPICAL_CORNER`

Composition suggestion:
- 2–5 flowers;
- 1–3 leaves;
- optional tiny travel motif.

ROLE:
- create edge tension;
- frame a title/photo cluster;
- carry publication identity.

PAGE_AFFINITY:
- P01, P02, P06, P08 strong;
- P03/P05/P07 selective;
- P04 restrained.

RULE:
- may crop at trim/bleed;
- critical text remains safe.

---

## `CLUSTER_PHOTO_JUNCTION`

ROLE:
- visually bind overlapping photo frames;
- soften hard rectangular geometry.

Composition:
- 1–3 flowers + small leaf;
- sit near frame intersection, not randomly centered.

PAGE_AFFINITY:
- P01, P06.

---

## `CLUSTER_TITLE_SUPPORT`

ROLE:
- reinforce page title.

Composition:
- one flower/leaf pair or small tropical corner;
- keep title readable.

COUNT:
- one strong title-support cluster is often enough.

---

# 7. Doodle / micro-discovery family

## `DOODLE_ARROW`

ROLE:
- connect comment to a photo/detail;
- create reader path.

RULE:
- arrow points to something meaningful.

---

## `DOODLE_HEART`

ROLE:
- emotional micro-accent.

RULE:
- small and sparse;
- not a substitute for hierarchy.

---

## `CALLOUT_SPEECH_BUBBLE`

ROLE:
- short personal comment;
- Q&A support;
- photo annotation.

EDITABILITY:
- text native.

RULE:
- keep very short;
- long paragraphs do not belong in speech bubbles.

---

## `HANDWRITTEN_MICROCOMMENT`

ROLE:
- editorial personality and discovery.

Examples:
- `ここ注目!`;
- `一緒に行こう!`;
- `Welcome`;
- tiny emotional phrases.

EDITABILITY:
- native or composed art when non-authoritative.

RULE:
- 1–4 per high-density page depending on role;
- never use decorative English with no meaning.

---

# 8. Utility structures that must not become UI cards

## `PROFILE_FACT_ROWS`

Good:
- compact labels + values;
- shared baseline/rules;
- small color chips or icons;
- paper background.

Bad:
- giant rounded container for every fact.

---

## `Q_ANCHOR_SYSTEM`

Good:
- repeated Q number semantics;
- varied wrappers/positions;
- calm answer fields;
- small motifs.

Bad:
- identical 3×2 software card grid.

---

## `TIMELINE_MILESTONE`

Good:
- strong date + short fact;
- varied milestone importance;
- route continuity;
- occasional photo interruption.

Bad:
- identical project roadmap nodes.

---

## `ITINERARY_STOP`

Good:
- consistent time label;
- event name;
- optional icon;
- chronology obvious.

Bad:
- each stop as an independent rounded card with equal visual weight.

---

# 9. Page-to-part affinity matrix

Legend:
- `H` = high affinity / commonly appropriate
- `M` = medium / selective
- `L` = low / rare

| Part family | P01 | P02 | P03 | P04 | P05 | P06 | P07 | P08 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Hero title | H | L | L | L | L | L | L | M |
| Page title plate | M | H | H | H | H | H | H | M |
| Burst/seal badges | H | M | H | L | M | M | M | M |
| Polaroids | H | H | M | H | H | H | M | M |
| Organic round frames | M | H | M | M | M | H | L | L |
| Route | M | L | L | L | H | M | H | L |
| Numbered pins/map | L | L | L | L | M | H | M | L |
| Camera | M | L | M | L | M | H | L | H |
| Passport/ticket/suitcase cluster | H | L | L | L | L | H | M | H |
| Tropical corner | H | H | M | L | M | H | M | H |
| Photo-junction flowers | H | M | L | L | M | H | L | L |
| Handwritten microcomment | H | H | H | M | M | H | M | M |

This matrix is a starting heuristic, not a quota.

---

# 10. Part-count guidance

Do not treat counts as requirements. They are guardrails against both emptiness and clutter.

Approximate purposeful accent counts:

- P01: 5–9 accents/clusters;
- P02: 3–6;
- P03: 3–6;
- P04: 1–4;
- P05: 3–6;
- P06: 4–8;
- P07: 3–6;
- P08: 2–5.

A `cluster` can contain multiple small visual objects and still count as one editorial gesture.

If a page is weak, do not automatically increase the count. Check hero/image/title geometry first.

---

# 11. Figma naming examples

Use semantic names:

- `TITLE / PAGE / PROFILE`
- `BADGE / DATE / 2026-10-24`
- `PHOTO MASK / HERO / REPLACEABLE`
- `PHOTO MASK / SUPPORT 02 / REPLACEABLE`
- `FRAME / POLAROID / SUPPORT 02`
- `CLUSTER / TROPICAL CORNER / UPPER RIGHT`
- `ROUTE / TIMELINE / CHRONOLOGICAL`
- `PIN / MEMORY / 03`
- `OBJECT CLUSTER / PASSPORT TICKET SUITCASE`
- `TEXT / CAPTION / MEMORY 03`

Avoid:
- `Group 42`;
- `Decoration 7`;
- `Card 3`;
- `Image 12`.

---

# 12. Generation specification for missing parts

When a genuinely missing visual part must be generated, specify:

- semantic role;
- page affinity;
- intended physical size in mm;
- target pixel dimensions at 300–350 ppi equivalent;
- transparent vs opaque background;
- safe internal padding;
- whether edge cropping is intended;
- expected z-order;
- whether any text is allowed;
- forbidden content;
- visual family/tone;
- expected color job;
- replacement/variation needs.

Example:

`Generate CLUSTER_TROPICAL_CORNER / P06 upper-right. Transparent PNG. Intended visible footprint approx 34 × 28 mm at A5. Pink hibiscus + yellow flower + 2 tropical leaves, asymmetric, with open lower-left negative space so it can frame a photo/title junction. No text, no people, no logo. Crisp print detail suitable for 300+ ppi placement. Must work partially cropped at page edge.`

That is materially stronger than `generate some tropical flowers`.
