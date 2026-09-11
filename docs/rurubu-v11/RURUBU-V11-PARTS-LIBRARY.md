# Rurubu WEDDING V11 — Parts Library

Status: `CANONICAL_PART_VOCABULARY`

The library is a vocabulary, not a template kit. A part is reusable only when it keeps its editorial meaning without forcing different pages into the same layout.

## Part metadata
Each part should record:
- semantic role;
- page affinity;
- scale band: HERO / SECTION / SUPPORT / MICRO;
- editability: native / vector / raster / mixed;
- replacement behavior;
- expected z-order;
- generation/search status;
- print-resolution status when raster.

## Identity / title
- `TITLE_HERO_WEDDING` — P01 hero identity.
- `IDENTITY_MARK_ORIGINAL` — original travel-magazine mark; do not copy commercial logo.
- `TITLE_PAGE_PLATE` — P02–P07 expressive Japanese page title.
- `TITLE_MICRO_SUBTITLE` — small English/Japanese support line.
- `NAME_RIBBON` — couple/name ribbon.
- `SECTION_RIBBON` — one genuine subfeature.

## Badges / labels
- `BADGE_BURST` — countdown/CHECK/one strong callout.
- `BADGE_ROUND_SEAL` — date/special issue/editor pick.
- `STAMP_DATE` — wedding/travel date treatment.
- `STAMP_POSTMARK` — postcard/airmail closing motif.
- `LABEL_DATA` — compact factual field; text native.
- `LABEL_DESTINATION` — place name bound to photo/map.
- `LABEL_Q_NUMBER` — Q01–Q06 identity.
- `LABEL_TIME` — itinerary time; native.

## Photo frames
All frame artwork stays separate from replaceable photo sources.
- `FRAME_POLAROID_PORTRAIT`
- `FRAME_POLAROID_LANDSCAPE`
- `FRAME_WHITE_BORDER_TILT`
- `FRAME_ORGANIC_ROUND`
- `FRAME_HERO_EDGELESS`
- `PHOTO_STACK_2_3_PRINTS`
- `FRAME_POSTCARD`

Rule: never use one frame family at identical size across all photos on a page.

## Travel vocabulary
- `ICON_AIRPLANE`
- `ICON_CAMERA`
- `OBJECT_PASSPORT`
- `OBJECT_TICKET`
- `OBJECT_SUITCASE`
- `TRAVEL_STILL_LIFE` — overlapping passport/ticket/suitcase or camera/stamp cluster.
- `MAP_WORLD`
- `MAP_VENUE`
- `ROUTE_DOTTED`
- `PIN_NUMBERED`
- `POSTCARD_LINES`

Semantic rule: route/map elements must correspond to actual journey/location/sequence meaning, not filler.

## Floral/tropical vocabulary
- `CLUSTER_TROPICAL_CORNER`
- `CLUSTER_PHOTO_JUNCTION`
- `CLUSTER_TITLE_SUPPORT`
- `FLOWER_PINK`
- `FLOWER_YELLOW`
- `LEAF_TROPICAL`

Prefer clusters over evenly sprinkling individual flowers.

## Doodle / micro-discovery
- `DOODLE_ARROW`
- `DOODLE_HEART`
- `CALLOUT_SPEECH_BUBBLE`
- `HANDWRITTEN_MICROCOMMENT`
- `SMALL_EDITORS_NOTE`

Every arrow/comment must point to or explain something meaningful.

## Utility structures
These are semantic patterns, not UI cards.
- `PROFILE_FACT_ROWS`
- `MINI_STORY_STRIP`
- `Q_ANCHOR_SYSTEM`
- `ITINERARY_STOP`
- `VENUE_GUIDE_BLOCK`
- `PHOTO_CTA_BLOCK`

Avoid giant rounded containers. Use typography, rules, labels and proximity first.

## Page affinity
- P01: hero title, identity mark, coverline labels, polaroids, date seal, tropical corners, travel still-life.
- P02: map, route, airplane, polaroids, date stamp, luggage cluster.
- P03: portrait frames, name labels, fact rows, mini-story markers, BEST/subfeature ribbon.
- P04: mixed photo frames, camera, suitcase, photo-junction flowers, destination labels.
- P05: venue hero frame, detail frames, map/pins, location label, guide accent.
- P06: route/spine, time labels, event icons, one side-feature ribbon, wedding visuals.
- P07: Q labels, answer fields, speech-bubble/label variants, small related motifs.
- P08: postcard field, postmark, camera, passport/ticket/suitcase cluster, closing title.

## Generation contract
When generating a missing part, always specify:
- semantic role;
- intended physical footprint in mm;
- transparent/opaque background;
- target 300–350 ppi equivalent pixel size for raster;
- safe internal padding;
- intended edge crop/bleed behavior;
- page affinity;
- z-order;
- allowed text (normally none unless decorative/non-authoritative);
- dominant/support color job;
- negative space requirements;
- forbidden content.

Example:
`CLUSTER_TROPICAL_CORNER / P04 lower-right. Transparent PNG, visible footprint about 32×26 mm, pink hibiscus + yellow flower + 2 tropical leaves, asymmetric, open upper-left area so it can frame a photo junction. No text/logo/people. Crisp detail for 300+ ppi placement. May crop at bottom/right trim.`