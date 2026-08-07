# V5 Rurubu Urban Clean-room B — 2026-08-07

## Scope

Rurubu WEDDING V5 only. Other paper items were not modified.

## Problem

Clean-room A (`378:276`) achieved much stronger Rurubu-style density than Current, but used the bright-pink overseas-guide language. A second materially different concept was required to avoid anchoring and to test a domestic/urban travel-guide language better suited to Yokohama.

## Hypothesis

A pale-blue urban cover with a huge destination masthead, one dominant city hero, multiple overlapping photo teasers, strong color bars, vertical copy, and micro-information can retain Rurubu-like visual energy while improving hierarchy and wedding/Yokohama relevance.

## New Figma candidate

- outer: `380:2 / V5_OUTER_RURUBU_URBAN_CLEANROOM_B_2026_08_07`
- front: `380:129`
- back: `380:3`
- fold guide: `380:274`

Current remains untouched:

- `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

Replaceable image slots:

- `380:132 / IMG_HERO`
- `380:293 / REPLACEABLE_URBAN_TEASER_1`
- `380:294 / REPLACEABLE_URBAN_TEASER_2`
- `380:295 / REPLACEABLE_URBAN_TEASER_3`

All new copy, bars, badges, rails, and labels are native/editable Figma nodes. No proprietary Rurubu logo, map, illustration, or published cover image was copied.

## Three-scale QA

### Whole item

B is materially different from both Current and A. It has a clearer Yokohama/urban silhouette and a stronger giant-destination hierarchy than Current. The front reads as a Japanese travel-guide cover rather than a wedding brochure.

### Reading scale

Reading order is strong:

1. top edition strip
2. huge `横浜`
3. WEDDING TRIP bar / right-side `王道も最新もぜんぶ！`
4. date and NEWS/TOPICS
5. dominant hero + BEST 8 module
6. right vertical `食べる / 遊ぶ / 撮る / 祝う`
7. pickup circle
8. three photo teasers
9. bottom micro-navigation

No rounded-card grid is used.

### Actual-size/detail

Native text and photo-slot independence are preserved. The micro-navigation and top strip remain readable in the screenshot but require final print-size confirmation before adoption. The current dummy hero remains a quality/provenance-gated asset and is not promoted by this composition experiment.

## Structure QA

- native text nodes: `99`
- visible text nodes: `55`
- IMAGE-fill nodes: `17`
- independent replaceable front image slots: `4`
- fold guide preserved and visible: `380:274`
- Current `77:18` remains present and visible
- rollback/history preserved

## Comparison: Current vs A vs B

### Current `77:18`

Strengths:
- readable
- calm
- existing semantic/asset evidence

Weaknesses:
- sparse
- six repeated feature modules feel UI/system-like
- insufficient bookstore/travel-guide energy

### Clean-room A `378:276`

Strengths:
- highest deliberate clutter/information density
- strongest overseas-Rurubu energy
- multiple edge callouts and teaser rhythms

Weaknesses:
- left white feature copy crosses the bright hero and needs contrast refinement
- bright pink language can dominate the wedding/Yokohama identity

### Urban Clean-room B `380:2`

Strengths:
- strongest destination hierarchy
- better Yokohama/urban relevance
- dense without relying on equal cards
- clearer reading order than A

Weaknesses:
- slightly cleaner/less chaotic than the requested Rurubu maximum-density target
- requires another pass of useful micro-information rather than decorative noise

## Decision

Status: `PROTOTYPED / COMPARISON WINNER NOT YET DECLARED`.

B currently wins hierarchy and Yokohama relevance; A wins Rurubu-like density. Neither is promoted to Current yet. The next experiment should combine only verified strengths: B's destination hierarchy and image architecture with A's richer information density, while preserving a coherent palette and readable hero contrast.

No PHOTO_ROLE_PASS, V5 completion gate, or V6 start gate changed.

## Learning

The useful dimension is not simply `minimal ↔ cluttered`. The better editorial axis is:

`unstructured noise ↔ controlled information density`.

A Rurubu-like wedding cover can support many elements when they are assigned clear jobs: destination identity, feature navigation, bonus information, teaser photography, chronology, or utility. Decorative objects with no editorial job should still be rejected.

This remains `PROTOTYPED`, not `PROJECT_RULE`.

## Next safe step

Create a C candidate that combines B's giant `横浜` hierarchy and pale-blue urban identity with A's stronger edge callouts and micro-information density. Then run whole-item, reading, actual-size, fold/trim, and native-structure QA before deciding whether any clean-room front replaces Current.