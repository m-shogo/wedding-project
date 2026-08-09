# ADD-02 — Reopened Visual Clean-room / Italy

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_DIRECTION_CREATED / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `b1af221346a52575624e2f9c8d513633a213b3ed`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- Italy production: `2:11 / FRAME_TABLE_SIGN_ITALY`
- clean-room candidate: `9:2 / QA_ADD_02_ITALY_CLEANROOM_V2_ARCHITECTURAL_EDITORIAL_2026_08_10`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Production diagnosis

The live Italy production sign remains structurally sound but visually generic under the reopened sellable gate:

- the design is essentially an ivory field plus one full-height brown side bar;
- Italy identity is mostly the word `ITALY` plus color;
- the right bar reads as a placeholder/image slot rather than destination atmosphere;
- the layout repeats the same sparse European side-column grammar seen on France and Spain;
- at thumbnail scale it still looks like a colorway variation rather than a separately art-directed print object.

The prior structural PASS is retained only as structural evidence.

## Clean-room V2

Created `9:2` on the QA area without modifying production.

The new direction deliberately does **not** reuse Hawaii V3's coastal grammar. Italy receives a separate architectural/editorial language:

- warm-sand architectural hero across the upper ~620px;
- three asymmetric terracotta / wine / olive facade blocks;
- native vector arched openings and masonry-print rules;
- restrained olive-branch line drawing as a secondary motif;
- lower ivory editorial field with `TABLE 02`, `ITALIA`, semantic dummy copy, rust rule and a single lower identifier;
- oversized low-opacity `02` retained only as a quiet background rhythm;
- no fake airport code, ticket data, stamp, badge, rounded card, gradient, shadow or web UI.

## Screenshot-led correction

The first clean-room screenshot exposed a major art-direction weakness: the facade openings were simple tall ellipses and read as abstract eggs rather than architecture. That state was rejected.

The same candidate was repaired with native vector arch geometry:

- three proper round-top architectural openings replaced the oval placeholders;
- window-sill / facade rules added;
- light masonry registration lines added across the lower facade;
- olive branch reduced in scale and opacity so architecture remains the hero.

The revised reading-scale screenshot shows a materially more architectural and Italy-specific composition than production while remaining editable and print-native.

## Structure QA

Live readback for `9:2`:

- frame: `1000 × 1480`;
- native text nodes: `6`;
- IMAGE fills: `0`;
- text outside root: `0`;
- hidden `GUIDE_SAFE`: `50,50 / 900 × 1380`;
- visible nodes: `35`;
- hidden nodes: `6` (safe guide, rejected oval openings and legacy hidden content);
- no flattened/raster text introduced.

## Image-generation status

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed, stored or placed. Italy still merits a future image-generation comparison, but the role should be **architectural editorial atmosphere**, not generic landmark tourism stock:

- possible subjects: stucco facade detail, stone arch, shaded courtyard, tile/terracotta texture, olive foliage, sun-washed wall;
- vertical or square crop adaptable to the upper editorial field;
- warm sand / terracotta / olive / wine compatibility;
- no readable signage, fake text, people presented as real guests/couple, impossible architecture, oversaturated postcard look or glossy AI surfaces.

Any future raster candidate must be compared directly against the native architectural V2, not against the old brown side bar.

## Drive

- exact authority folder live-read before Git write: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- Drive changes: `0`;
- reason: no adopted/generated raster asset exists; the current candidate is native Figma vector proof only.

## Decision

`ITALY_CLEANROOM_VISUAL_DIRECTION_ADVANCE / STRUCTURE_QA_PASS / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED`

ADD-02 remains the active target. Hawaii and Italy now prove two distinct destination grammars rather than one shared colorway template. The next highest-value step is still image-generation-assisted comparison for Hawaii and/or Italy, followed by selective expansion to the remaining signs only when a grammar clearly wins at thumbnail, reading and actual-size scales.