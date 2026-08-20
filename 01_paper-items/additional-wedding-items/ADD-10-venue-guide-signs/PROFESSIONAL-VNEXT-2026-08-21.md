# ADD-10 Professional vNext — 2026-08-21

Status: `VNEXT_CANDIDATES_CREATED / THREE_DIRECTION_FAMILY_STARTED / NOT_PROMOTED`

## Live authority

- latest `main` before this write: `126ff96c42a8abc6fdb506169d00c3a886df0776`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `VISUAL_REOPENED`
- Figma: `mMfoBkoZ7eVbuerSRHePLV`
- prior selected clean-room V4 preserved: `32:3 / 32:15 / 32:27`
- retained legacy family preserved: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`
- Drive authority verified live: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`

## Clean-room inputs

Only documented non-visual requirements were carried into vNext authoring:

- A4 working role / `1400×1980` candidate canvas;
- Japanese-first wayfinding;
- native semantic destination placeholder `[目的地]`;
- native floor/room placeholder `[階数・部屋名]`;
- left / right / forward direction roles;
- date context `2026.10.24`;
- official destination names, installation-specific direction truth, final floor/room, sign count and installation locations remain unresolved and must not be fabricated.

No prior V4/legacy layout, arrow geometry, palette, spacing, decoration or asset was used as an authoring source.

## Three blank-frame thumbnails

New section:

- `48:2 / VNEXT_PRO / ADD-10 WAYFINDING / SUNSHINE WAY / 2026-08-21`

Materially different thumbnails:

1. `48:3 / SUNSHINE ARROW`
2. `48:12 / OCEAN GATE`
3. `48:21 / BREEZE WAY`

All prioritize one-glance destination + direction recognition rather than decorative travel-poster density.

Current critique:

- SUNSHINE ARROW offers the strongest daylight readability and current `SUNSHINE DEPARTURE` family fit without making the sign look like airport UI;
- OCEAN GATE is strong but darker and less immediately welcoming for general venue navigation;
- BREEZE WAY is energetic but its top color field competes more with the actual direction role.

SUNSHINE ARROW was therefore refined into full-size directional candidates.

## Full-size directional family started

Fresh A4 frames:

- `48:31 / VNEXT_SELECTED_CANDIDATE / ADD-10 / SUNSHINE ARROW / LEFT`
- `48:42 / VNEXT_SELECTED_CANDIDATE / ADD-10 / SUNSHINE ARROW / RIGHT`
- `48:53 / VNEXT_SELECTED_CANDIDATE / ADD-10 / SUNSHINE ARROW / FORWARD`

Visual system:

- warm cream field;
- oversized cropped yellow sunlight as arrival warmth;
- coral micro-anchor;
- a single large deep-ocean functional direction axis;
- restrained lagoon lower gesture;
- Japanese destination and floor/room roles remain the dominant information hierarchy;
- no redundant English destination, route nodes, fake airport codes, badges, cards, shadow, gradient or image filler.

A first live LEFT screenshot exposed a functional construction defect: the triangular arrowhead was reversed. The screenshot, not geometry assumptions, caught it. LEFT/RIGHT arrowhead rotations were corrected immediately and a fresh LEFT screenshot now points left correctly.

## Hybrid authoring state

- destination / floor-room / guidance copy: native editable Figma text;
- direction gesture: native editable vector/geometry because it is functional and likely to require direction-specific editing;
- fixed accent fields: simple native shapes;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- SVG: `0` at this stage.

`IMAGE_GENERATION_NOT_REQUIRED`: wayfinding is currently bottlenecked by recognition, hierarchy and functional direction correctness, not missing imagery.

## QA state / next

Not promoted yet.

Remaining before comparison/promotion:

1. screenshot right and forward directions and verify direction truth visually;
2. run realistic long-destination / floor-room stress on all materially different variants;
3. structure readback: native text auto-height, outside text, vector editability, safe area;
4. whole / reading / actual-size review;
5. Professional Design Council score;
6. only after candidate maturity compare against prior selected V4;
7. promote only if the new family improves current emotional brief without weakening first-glance wayfinding.
