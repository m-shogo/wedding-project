# V20 Prepared Asset Production Queue

Status: `ACTIVE_PRODUCTION_QUEUE`

Purpose: convert approved V20 page manuals/greyboxes into a small number of high-impact prepared editorial assets. The queue exists to prevent random sticker generation and to keep Figma in the role of compositor.

## Queue rules

- produce high-impact assets first;
- no generic “Rurubu-style sticker” prompts;
- every asset has a page/spread job, expected overlaps and negative-space requirements;
- authoritative names/dates/locations/body copy stay OUT of generated artwork;
- transparent PNG preferred for complex decorative composites;
- simple geometry may later be rebuilt/vectorized only if it materially improves editability without lowering visual quality;
- assets must be reviewed at intended A5 physical size before `APPROVED_FOR_FIGMA`;
- do not create micro decorations until the first decorated page reveals a real need.

## Status vocabulary

- `READY_TO_GENERATE`
- `GENERATED_NEEDS_QA`
- `REJECTED_REGENERATE`
- `APPROVED_FOR_FIGMA`
- `PLACED_IN_FIGMA`
- `RETIRED`

---

# PRIORITY A — P01 COVER

## A01 — `V20_P01_MASTHEAD_A`
Status: `READY_TO_GENERATE`

Job:
- strongest cover identity;
- broad irregular word silhouette;
- overlaps HERO photography significantly.

Format:
- transparent PNG or editable/vector-quality result when practical;
- no names/date/location in artwork.

Generation/art direction:
- joyful Japanese travel-magazine energy;
- thick dimensional display-letter treatment;
- strong white/cream keyline + hard offset shadow / printed outline behavior;
- irregular but highly legible silhouette;
- can include one small attached tab/ribbon shape;
- no glossy 3D AI lettering;
- no direct trace of a commercial Rurubu logo;
- no generic wedding-calligraphy look;
- no gradient-heavy SaaS styling.

QA:
- recognizable at thumbnail scale;
- still intentional in grayscale;
- can cross photo without losing legibility;
- print edges clean;
- visual personality is travel editorial, not bridal stationery.

## A02 — `V20_P01_TROPICAL_FRAME_CLUSTER_A`
Status: `RETIRED`

Job:
- create authored environment/depth around the HERO photo and masthead.

Format:
- transparent PNG;
- approximately page-corner/edge scale, not a tiny sticker.

Required composition:
- density highest beyond top/right or top/side bleed;
- tropical foliage, several flowers, one small travel-print cue/object;
- visual flow toward center but becomes sparse near face/title legibility area;
- asymmetric;
- contains large transparent openings;
- designed to be partly BEHIND HERO and partly IN FRONT using crop/split placement if useful.

Forbidden:
- wreath;
- centered bouquet;
- even border around all four sides;
- repeated identical flowers;
- text;
- stock clip-art spacing;
- symmetrical AI floral frame.

QA:
- looks intentionally composed even when 30–50% is hidden;
- no obvious generative repetition;
- edge/cutout quality survives print size.

2026-08-31 attempt result:
- three materially different bridge directions were generated for comparison: tropical extension, tactile ephemera collision and graphic print burst;
- their composition/color directions were useful, but all three raster files reported `hasAlpha: no` and contained a baked checkerboard background;
- one background-extraction regeneration was attempted on the tropical extension and again returned `hasAlpha: no`;
- repeated failure fingerprint: `imagegen / transparent PNG / checkerboard baked into RGB output`;
- all candidates are rejected and none was uploaded to Drive or placed in Figma;
- next generation must prove true alpha before visual placement; do not repeat the same extraction method without a changed capability or input contract.

2026-08-31 final production decision:
- live Figma compared Candidate H without a bridge against two additional `035`-hash-only prepared-art tests;
- Candidate I / bridge A added a duplicated palm mass at the left edge and weakened the support-photo path;
- Candidate J / bridge B added a cropped photo fragment plus native print strip but broke the masthead/date quiet zone;
- Candidate H without a bridge remained stronger at thumbnail, reading and A5 provisional scales;
- the bridge is therefore retired for the current P01 lock instead of being regenerated indefinitely.

## A03 — `V20_P01_FEATURE_VESSEL_A`
Status: `READY_TO_GENERATE`

Job:
- hold one major native coverline while covering a meaningful part of photography.

Format:
- transparent PNG around the vessel shape;
- no baked text.

Art direction:
- printed travel-magazine promotional slab;
- irregular hand-cut / offset-print silhouette;
- one strong warm/yellow family body plus a small contrasting tab;
- designed to overlap HERO by 50%+ of its own footprint if composition calls for it;
- may include subtle outline/print marks.

Forbidden:
- generic rounded UI card;
- perfect centered rectangle with soft shadow;
- empty decorative icons unrelated to text job;
- fake Japanese/English words.

## A04 — `V20_P01_DATE_LOCATION_SUPPORT_A`
Status: `READY_TO_GENERATE`

Job:
- support native date/location as magazine metadata.

Direction:
- stamp shell + paper/tab interaction;
- can overlap both masthead and photo;
- no authoritative text baked in;
- should not look like a functional airline boarding pass.

## A05 — `V20_P01_SUPPORT_FRAME_A`
Status: `READY_TO_GENERATE`

Job:
- one secondary real-photo treatment.

Direction:
- printed snapshot/postcard object;
- transparent photo opening;
- thicker caption/print edge on one side rather than a neutral equal border;
- one tiny tape/print imperfection allowed;
- no baked caption.

## A06 — `V20_P01_BOTTOM_EDITORIAL_CLUSTER_A`
Status: `WAIT_AFTER_FIRST_ASSEMBLY`

Do not generate until A01–A05 are placed and actual gaps are visible.

---

# PRIORITY B — P04–P05 CENTER SPREAD

## B01 — `V20_P45_ROUTE_BACK_A`
Status: `PLACED_IN_FIGMA`

Job:
- continuous journey movement beneath photography.

Format:
- transparent PNG/SVG-like asset sized for the logical two-page spread;
- no destination words.

Direction:
- hand-drawn / printed travel route;
- imperfect but deliberate line character;
- route nodes/arrows/mini print marks placed asymmetrically;
- multiple broad arcs/turns, not a transit diagram;
- designed to disappear below photos.

Forbidden:
- functional map UI;
- exact distances;
- flight numbers;
- uniform dots in a perfect SVG-dashboard style.

2026-08-31 production state:
- native editable back-layer geometry is placed at `3373:5` inside center-spread wrapper `3373:2`;
- it runs behind the P04 elastic photo mass and stops before the physical fold;
- no generated route asset or fake travel data was introduced.

## B02 — `V20_P45_ROUTE_FRONT_A`
Status: `PLACED_IN_FIGMA`

Job:
- selected route marks/arrows that reappear above photos and paper objects, creating depth.

Must visually belong to B01 but contain only the pieces that should sit on top.

2026-08-31 production state:
- P04 front arrow `3377:2` disappears before the fold;
- P05 route nodes `3373:54` and `3373:55` re-emerge above the Hawaii photo and lead to the arrival field;
- the simple native geometry is accepted for this production pass pending physical proof.

## B03 — `V20_P45_LEFT_EDGE_TRAVEL_CLUSTER_A`
Status: `READY_TO_GENERATE`

Job:
- P04 departure/exploration atmosphere.

Direction:
- enters heavily from left/top/bottom bleed;
- tropical/printed-travel cues + one paper/ticket fragment;
- large transparent windows for photo placement;
- may be mostly hidden after assembly;
- no words.

## B04 — `V20_P45_DESTINATION_STAMP_SHELL_SET_A`
Status: `READY_TO_GENERATE`

Job:
- 3 related but non-identical supports for native destination names.

Set behavior:
- one compact stamp-like shell;
- one ticket/locator variation;
- one larger Hawaii emphasis variation;
- common print DNA but clearly different silhouettes;
- designed for partial occlusion.

No destination names baked in.

## B05 — `V20_P05_PROPOSAL_HIGHLIGHT_A`
Status: `PLACED_IN_FIGMA`

Job:
- create a locally calm but deeply embedded reading island for proposal story.

Direction:
- irregular warm paper/coral/cream editorial field;
- designed to cover a substantial part of Hawaii photo;
- capacity for heading + roughly 45–100 Japanese characters as native text;
- one small attached tab/stamp fragment allowed;
- edges may tuck behind photo/stamp/route;
- calm internally, but not a detached UI card.

2026-08-31 production state:
- native irregular calm field `3373:60` and heading `3373:61` remain editable inside P05 Production F;
- no unverified proposal paragraph was added.

## B06 — `V20_P05_ARRIVAL_MARKER_A`
Status: `PLACED_IN_FIGMA`

Job:
- final journey node supporting native `YOKOHAMA / 2026.10.24`.

Direction:
- destination/arrival print object;
- can overlap route + paper/photo layers;
- no fake flight/transport facts;
- no baked date/location.

2026-08-31 production state:
- native irregular arrival field `3373:56` carries editable `YOKOHAMA → 2026.10.24` and `そして、今日へ。` text;
- it is connected to the front route rather than treated as a footer card.

## B07 — `V20_P45_POSTCARD_FRAME_SET_A`
Status: `WAIT_FOR_OKINAWA_KOREA_SOURCE_REVIEW`

Do not freeze frame geometry before real source behavior is known.

## B08 — `V20_P45_MICRO_DISCOVERY_SET_A`
Status: `WAIT_AFTER_FIRST_ASSEMBLY`

No generation until major-photo/route/title/paper collisions prove that additional micro density is necessary.

---

# PRIORITY C — after P01/P45 evidence

Do NOT start C before at least one decorated P01 and P04–P05 assembly exists.

Likely future jobs:
- P02 asymmetric profile annotation family;
- P03 story article/paper intrusion assets;
- P06 candid tape/note/cutout assets;
- P07 time/itinerary editorial vessels;
- P08 closing postcard/edge cluster.

The exact asset list must be revised using lessons from the first real compositions.

---

# Asset QA checklist

Every generated/composed asset must pass:

1. `JOB` — page role is obvious;
2. `ANTI-UI` — not a generic app card/pill/component;
3. `ANTI-AI` — no repeated petals/objects, fake text, mushy edges or symmetry-by-default;
4. `OCCLUSION` — still useful when partly hidden;
5. `NEGATIVE SPACE` — provides the transparent/quiet area its page requires;
6. `NO FAKE FACT` — no invented name/date/place/flight/route fact;
7. `TRANSPARENCY` — clean alpha edges if transparent asset;
8. `PRINT SIZE` — source raster supports intended physical placement;
9. `HIERARCHY` — does not overpower HERO/title unless that is its explicit job;
10. `FIGMA ROLE` — can be placed/overlapped without requiring Figma to rebuild the artwork atom-by-atom.

An asset failing 2, 3 or 6 is rejected even if it is visually attractive.
