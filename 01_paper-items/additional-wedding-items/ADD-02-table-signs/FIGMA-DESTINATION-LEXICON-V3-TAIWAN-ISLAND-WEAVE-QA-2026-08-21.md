# ADD-02 — Destination Lexicon V3 Taiwan Island-Weave QA

Date: 2026-08-21
State: `VERIFIED_LOCAL / SERIOUS_COMPARISON_CANDIDATE / FAMILY_ROLLOUT_HOLD / NOT_PROMOTED`
Start/live authority SHA before Figma authoring: `82aa1f68b67c174aff4419a75dcd1dd4fb3f1ea9`
Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
Drive writes: `0`

## Clean-room boundary

The candidate was built from a blank frame without duplicating current Taiwan `2:38` or any prior Taiwan composition. Only verified facts/constraints were carried forward:

- canvas `1000×1480`;
- `TAIWAN / 台湾`;
- `TABLE 05` / table-number role;
- native editable country-theme headline/description placeholders;
- `2026.10.24`.

Current production was not opened for visual comparison until the new candidate had passed initial whole/read/actual-size review and long-copy structure QA.

## External professional research applied

A short fresh research pass used official Taiwan Tourism Administration material and TDRI context only as principle-level input, not as artwork to copy.

Useful principles:

- Taiwan Tourism Administration's current tourism identity describes mountain, sea, winding road/rail movement, sunrise warmth and layered surprise as destination-level ideas;
- the current brand uses bright sunrise orange to communicate warmth and vitality;
- TDRI material reinforces contemporary Taiwan design as public-facing, human-centered and cross-disciplinary rather than a collection of stereotyped tourism icons.

No Taiwan Tourism logo, official mark, protected artwork, pictogram, lettering, or exact brand composition was copied.

## New blank-frame Taiwan V3

Created:

- page: `154:2 / VNEXT_V3 / ADD-02 / TAIWAN / ISLAND WEAVE / 2026-08-21`;
- selected candidate: `154:3 / VNEXT_V3 / TAIWAN / ISLAND WEAVE / CLEANROOM`;
- hidden realistic long-copy stress: `154:20 / QA_LONG_COPY / VNEXT_V3 / TAIWAN / ISLAND WEAVE / CLEANROOM`.

Art-direction sentence:

`an island-weave print field: deep ocean ink, sunrise orange and jade/indigo bands crossing like layered mountain-sea movement, with the table number treated as an immediate poster-scale identifier rather than a capsule or badge.`

## Visual construction / new skeleton

- deep-ink top corner rather than a full-height side spine;
- sunrise-orange cropped corner field;
- three diagonal non-rounded weave bands through the middle;
- open warm paper field for native theme copy;
- asymmetric lower-right paper register block for date / print rhythm;
- no sun circle, no pill/capsule, no chart grid, no fake route, no fake transport code, no Taiwan Tourism logo, no lantern/palm/temple stereotype cluster.

Semantic text remains native/editable:

- `05`;
- `TAIWAN`;
- `台湾`;
- `[国テーマ見出し]`;
- `[国テーマ説明]`;
- `2026.10.24`.

## Three-scale QA

Selected `154:3` was reviewed at:

- thumbnail / max 500px: PASS as a readable high-level poster structure;
- reading / max 1000px: PASS;
- actual canvas `1000×1480`: PASS.

At actual size the top identifier, diagonal weave and lower native-copy field remain optically distinct. The design is materially different from the earlier edge-field V3 skeleton and from current production's rounded-bar / circle language.

## Long-copy failure caught and repaired

Initial stress screenshot exposed a real visual defect that bounding-box structure metrics did not catch: the rotated `TW / INDIGO WEAVE` band crossed the long native headline even though text-vs-text collision count remained zero.

Bounded fix:

- changed only the indigo fixed-art band from `y=720` to `y=610` in selected and stress candidates;
- headline/body typography, widths, table semantics and other bands were unchanged.

Fresh stress screenshot after the fix: PASS. The long headline and description read as one native editorial field without fixed-art intrusion.

This is evidence that long-copy QA must inspect fixed decoration against glyphs, not only text-node bounding boxes.

## Structure QA

Selected `154:3`:

- native text: `6`;
- `textAutoResize=HEIGHT`: `6/6`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`.

Stress `154:20`:

- native text: `6`;
- `textAutoResize=HEIGHT`: `6/6`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`;
- long headline height: `124px`;
- long description height: `184px`;
- post-fix fixed-art intrusion: visually `0` on screenshot.

Stress was returned to hidden QA state after capture.

## Mature comparison with current production

Only after the candidate passed the above gates was current Taiwan `2:38` opened.

Current production remains coherent and celebratory but still uses a large red circle plus multiple rounded green bars around the giant `05`, which is a known family-level abstract-shape grammar.

Taiwan V3 is stronger on:

- layout-skeleton diversity;
- avoidance of repeated round/capsule geometry;
- contemporary print/editorial movement;
- destination principle linkage through mountain/sea/sunrise movement without literal tourism icon cosplay.

Current production is still stronger on immediate completed-copy warmth because its current native theme headline has already been authored, while V3 correctly retains semantic placeholders pending final country-copy authority.

Decision: `SERIOUS_COMPARISON_CANDIDATE`, not isolated production promotion.

## Five-destination family review

A five-anchor same-scale review was created after Taiwan matured:

- V3: HAWAII `149:2`, JAPAN `149:21`, ITALY `150:2`, SPAIN `153:2`, TAIWAN `154:3`;
- current: HAWAII `2:2`, JAPAN `2:47`, ITALY `2:11`, SPAIN `2:29`, TAIWAN `2:38`.

An initial review board built by calling `resize()` on frame clones was rejected because root resizing did not proportionally scale descendants and therefore produced clipped/false evidence. It was deleted and rebuilt with `rescale(0.30)`.

Valid review board:

- `156:166 / QA / ADD-02 / FIVE DESTINATION V3 VS CURRENT / SCALED / 2026-08-21`.

Result:

- Taiwan and Spain materially reduce the top-row skeleton repetition;
- HAWAII/JAPAN/ITALY still show too much edge-field convergence;
- V3 is not yet uniformly stronger enough to replace the 11-sign production family.

The board was returned to hidden QA state after capture.

## Hybrid authoring / assets

- native semantic/factual text: yes;
- fixed atmosphere: simple native prototype geometry;
- SVG: `0`;
- generated/composed asset adopted: `0`;
- IMAGE fill: `0`;
- Drive write: `0`.

No image-generation role was diagnosed as the immediate bottleneck in this bounded skeleton experiment. The current bottleneck is still destination-specific composition and family-level layout variation.

## Production decision

`CURRENT_PRODUCTION_RETAINED / TAIWAN_V3_VERIFIED_LOCAL / FAMILY_ROLLOUT_HOLD / NOT_PROMOTED`.

Do not bulk-copy Taiwan's diagonal weave to the remaining destinations. The next candidate must derive a new place/material vocabulary and a materially different mass-distribution skeleton.
