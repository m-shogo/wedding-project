# V20 Asset Production Manifest

Status: `LIVE / PRIORITIZED PRODUCTION QUEUE`

Purpose: define exactly which prepared visual assets are worth making before decorative Figma assembly.

## Priority principle

Production order follows editorial leverage, not convenience.

1. assets that define the book identity;
2. assets that define the center-spread experience;
3. assets that support profile/story variety;
4. micro accents;
5. optional decorations only after the page still needs them.

Do not produce generic filler packs.

---

# P0 — BOOK IDENTITY / MAKE FIRST

## A01 — `V20_MASTHEAD_WEDDING_A`

Job:
- create immediate magazine-cover identity;
- carry the playful travel-wedding energy without copying a commercial logo.

Format:
- transparent PNG or high-quality vector/raster hybrid;
- no names/date/location baked in;
- large simple `WEDDING` display art may be included if legible and original;
- Japanese commercial-magazine logo must not be traced/copied.

Target placement:
- P01 top 20–28% of page;
- physical width roughly 100–128 mm depending on final source photo.

Target raster:
- minimum ~1800 px wide; prefer 2400+ px for flexibility.

Visual direction:
- bold rounded display lettering;
- white keyline + hard colorful shadow/offset behavior;
- energetic but not 3D-plastic AI typography;
- deliberately hand-art-directed irregularity.

Avoid:
- glossy 3D text;
- chrome;
- gradients as the main device;
- perfect symmetry;
- faux commercial logo replication.

## A02 — `V20_TROPICAL_EDGE_CLUSTER_A`

Job:
- anchor one edge/corner with tactile layered foliage/flowers;
- create a printed travel-magazine edge crop.

Format:
- true transparent PNG;
- no text.

Target physical size:
- ~45–80 mm depending on crop.

Composition:
- hibiscus-like flowers + tropical leaves + 1–2 smaller flowers;
- asymmetrical;
- some elements point outward so edge cropping looks natural;
- enough negative alpha area to overlap photography without becoming a rectangle.

Avoid:
- perfect wreath;
- symmetrical bouquet;
- photoreal wedding florist arrangement;
- isolated clip-art icons evenly spaced.

## A03 — `V20_TROPICAL_EDGE_CLUSTER_B`

Job:
- second non-matching cluster for center spread/back cover;
- avoid repeating A02 in same orientation.

Must materially differ from A02 in silhouette and dominant direction.

## A04 — `V20_TRAVEL_OBJECT_CLUSTER_A`

Job:
- provide one compact editorial travel cue.

Contents:
- camera;
- suitcase/travel bag;
- ticket/passport-like abstract paper object;
- optional sunglasses.

Format:
- transparent PNG;
- no functional text;
- not a perfectly aligned product flat-lay.

Target size:
- ~35–55 mm wide.

Avoid:
- luxury product-ad realism;
- identical perspective across objects;
- fake readable passport/ticket data.

## A05 — `V20_DATE_STAMP_SHELL_A`

Job:
- provide print/stamp personality around native date/location text.

Format:
- transparent shell only;
- no final date text baked in.

Shape:
- imperfect circular/oval ink stamp;
- optional tiny abstract stars/lines;
- center kept visually calm enough for native text overlay.

Target:
- ~18–28 mm.

---

# P1 — CENTER SPREAD IDENTITY / MAKE SECOND

## A06 — `V20_ROUTE_HANDDRAWN_A`

Job:
- visually connect P04 → P05 as one travel story.

Format:
- transparent PNG or vector;
- route line + small hand-drawn travel marks only;
- destination names remain native.

Behavior:
- imperfect dotted/hand-drawn path;
- visually survives center-fold interruption;
- not a Google Maps UI path.

## A07 — `V20_DESTINATION_STAMP_SHELL_A`

Job:
- support destination names without baking facts into raster.

Format:
- transparent stamp shell;
- native destination text placed above it in Figma.

Variants allowed:
- round;
- angled rectangular.

No fake dates.

## A08 — `V20_PROPOSAL_HIGHLIGHT_ART_A`

Job:
- make the Hawaii proposal/emotional peak visually distinct from other destination modules.

Format:
- warm paper/ribbon/heart accent with transparent surround;
- no event facts baked into art.

Tone:
- emotionally warmer and calmer than cover art;
- not Valentine's-card cute.

## A09 — `V20_POSTCARD_FRAME_ART_A`

Job:
- one tactile photo-frame treatment for travel photos.

Format:
- transparent frame overlay;
- photo remains separate underneath;
- no baked photograph.

Features:
- imperfect paper edge;
- optional small tape/stamp corner;
- enough clean inner window for crop flexibility.

## A10 — `V20_POLAROID_FRAME_ART_A`

Job:
- second photo treatment, clearly different from A09.

Do not overuse; maximum a few appearances across book.

---

# P2 — PROFILE / STORY / OFF-THE-MAP

## A11 — `V20_PROFILE_FRAME_A`

Job:
- personality-led portrait frame;
- not a corporate profile card.

Format:
- transparent irregular paper/photo-frame overlay.

## A12 — `V20_PROFILE_FRAME_B`

Job:
- second portrait treatment with different silhouette.

Must not simply be a recolor of A11.

## A13 — `V20_HANDDRAWN_ACCENT_SET_A`

Atomic set:
- arrow x2;
- heart x2;
- underline/swoosh x2;
- star/spark x2.

Format:
- transparent PNG sheet only if each item remains easy to crop/mask;
- preferred as individual transparent assets when possible.

Style:
- imperfect marker/pen;
- human editorial note feel;
- no fake handwriting text.

## A14 — `V20_TAPE_PAPER_ACCENT_SET_A`

Contents:
- masking tape strips;
- torn paper tabs;
- small note backing.

No text.

## A15 — `V20_CUTOUT_OUTLINE_ART_A`

Job:
- one hand-drawn cutout/outline treatment for P06 candid photos.

Must not force every photo into the same outline.

---

# P3 — WEDDING DAY / CLOSING

## A16 — `V20_ITINERARY_STOP_SHELL_A`

Job:
- support P07 time hierarchy.

Format:
- decorative stop marker/backing only;
- all times remain native text.

Avoid:
- airline-ticket cosplay;
- fake flight/transit information.

## A17 — `V20_PRACTICAL_NOTE_BACKING_A`

Job:
- calm readable field for factual guest guidance.

Visual:
- paper/note treatment;
- low decorative intensity.

## A18 — `V20_CLOSING_POSTCARD_ACCENT_A`

Job:
- make P08 feel intentionally designed while remaining calm.

Format:
- subtle postcard/stamp/airmail-like decorative cue;
- no false postal data.

## A19 — `V20_DECORATIVE_BARCODE_SHELL_A`

Optional only.

If used:
- clearly decorative/nonfunctional;
- no claim of publication affiliation;
- does not resemble a scannable production barcode strongly enough to confuse.

---

# Shared production metadata

Every approved raster asset records:
- asset ID;
- prompt/brief version;
- generated/manual source;
- alpha status;
- visible matte/halo status;
- pixel dimensions;
- intended physical width/height range;
- allowed pages;
- whether rotation/crop is allowed;
- status: `BRIEF / GENERATED / QA / APPROVED / REJECTED`.

# Initial production order

1. A01 masthead;
2. A02/A03 edge clusters;
3. A04 travel-object cluster;
4. A05 date stamp shell;
5. A06 route;
6. A08 proposal highlight;
7. A09/A10 photo frames;
8. A13 handdrawn accents;
9. A11/A12 profile frames;
10. A14/A15 P06 accents;
11. A16/A17 P07;
12. A18/A19 P08.

# Hard stop

Do not create more assets just because the library feels small.

After the first 10–12 high-value assets are approved, place them into the greybox and evaluate the actual pages. Only create further assets in response to a visible editorial need.
