# Rurubu WEDDING V11 — 8-Page Book Architecture

Status: `CANONICAL_BOOK_MAP`
Date: 2026-08-30

This architecture is derived from the user-approved reference image and the wedding/travel concept. It intentionally does not preserve the V10 page map.

## Canonical page map

| Page | Role | Editorial metaphor | Primary job |
|---|---|---|---|
| P01 | COVER | travel-magazine special issue cover | make the booklet instantly recognizable and exciting |
| P02 | WEDDING JOURNEY | journey opener / world-map feature | establish the couple's shared journey and travel theme |
| P03 | PROFILE | two protagonists + mini story | introduce Shogo/Shiori quickly and enjoyably |
| P04 | MEMORIES | destination/photo feature | browse memorable trips/places through photography |
| P05 | VENUE GUIDE | travel guide to the wedding venue | explain the venue like a destination feature |
| P06 | 1DAY | model-course itinerary | make wedding-day flow easy and fun to scan |
| P07 | Q&A | magazine interview | reveal personality/relationship through playful questions |
| P08 | MESSAGE / BACK | postcard closing + photo CTA | thank guests, close the journey and invite participation |

---

# Why this sequence

The sequence creates an intentional reader journey:

`impact`
→ `theme/world`
→ `meet the couple`
→ `browse their memories`
→ `arrive at the venue`
→ `understand today's route`
→ `discover personality`
→ `receive the closing message`.

It also creates alternating visual rhythms:
- P01 very-high impact;
- P02 broad graphic field + map;
- P03 structured people/facts;
- P04 photo-heavy;
- P05 guide/information;
- P06 chronological utility;
- P07 playful repeated Q anchors;
- P08 calm message field + lower cluster.

This helps prevent eight pages from becoming one repeated template.

---

# Cross-page adjacency rules

Adjacent pages should differ in at least four of:
- hero position;
- title alignment;
- dominant color field;
- photo count;
- frame family;
- density peak;
- calm-zone location;
- composition verb;
- overlap gesture.

Recommended contrast:

## P01 → P02
P01 = crowded coverline/hero collage.
P02 = larger cyan/sky field, world-map structure, fewer but strategic photo clusters.

## P02 → P03
P02 = graphic map/environment.
P03 = faces, facts and profile reading.

## P03 → P04
P03 = structured facts.
P04 = photography-led exploration.

## P04 → P05
P04 = emotional memories.
P05 = useful guide information and venue map/photography.

## P05 → P06
P05 = spatial/place guide.
P06 = temporal/day sequence.

## P06 → P07
P06 = one ordered vertical route.
P07 = multiple playful Q anchors without route semantics.

## P07 → P08
P07 = high micro-interaction.
P08 = calm closing/message surface with dense lower/perimeter accents.

---

# Global content-authority rule

The architecture defines the *role* of each page, not invented facts.

Any factual content not already confirmed must remain:
- placeholder copy clearly marked;
- `TBD`/`NEEDS_CONFIRMATION` in specs;
- native editable text in Figma.

No agent may invent:
- relationship dates;
- profile facts;
- venue schedule times;
- guest hashtags;
- ranking claims;
- travel destinations;
- personal stories.

---

# Global image-replacement rule

All couple/venue/travel/food photography remains independently replaceable.

Each photo slot must have a semantic ID such as:
- `P01_HERO_COUPLE`
- `P02_MEMORY_POLAROID_01`
- `P03_PROFILE_SHOGO`
- `P04_MEMORY_HERO`
- `P05_VENUE_HERO`
- `P06_SCHEDULE_VISUAL_01`
- `P07_QA_SUPPORT_01`
- `P08_CLOSING_PHOTO`

The slot role is stable even when its source image changes.

---

# Global composed-art rule

Composed/generated decorative art is encouraged for:
- title plates;
- flowers/leaves;
- stamps;
- frames;
- travel-object clusters;
- route/map decoration;
- badges;
- arrows/doodles.

Changeable factual copy stays native.

---

# Page role changes

A future page-role change is allowed, but it must update this architecture first.

Do not silently change page content in Figma and leave the book architecture stale.