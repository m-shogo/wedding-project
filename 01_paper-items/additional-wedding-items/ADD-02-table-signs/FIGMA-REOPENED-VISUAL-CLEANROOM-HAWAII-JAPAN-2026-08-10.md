# ADD-02 — Reopened Visual Clean-room / Hawaii V4 + Japan V2

Date: 2026-08-10
State: `VISUAL_REOPENED / CLEANROOM_DIRECTION_ADVANCED / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `765723f89ecb66a2ad5216150e82884d47ff343a`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- Hawaii production: `2:2 / FRAME_TABLE_SIGN_HAWAII`
- Hawaii prior clean-room: `7:2 / QA_ADD_02_HAWAII_CLEANROOM_V3_VECTOR_LED_EDITORIAL_2026_08_10`
- Hawaii new clean-room: `11:2 / QA_ADD_02_HAWAII_CLEANROOM_V4_POSTER_EDITORIAL_2026_08_10`
- Japan production: `2:47 / FRAME_TABLE_SIGN_JAPAN`
- Japan new clean-room: `12:2 / QA_ADD_02_JAPAN_CLEANROOM_V2_PRINT_POSTER_2026_08_10`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Whole-production diagnosis

A fresh screenshot of `1:3` shows the 11 production signs are still dominated by three sparse color-block formulas: top block, side bar, or bottom block. France / Spain / Italy are especially close to colorway variants, while Taiwan / Japan / Hong Kong / Singapore share the same lower-block composition. The set remains structurally useful but does not yet satisfy the reopened sellable visual gate.

## Hawaii V3 rejection points

The V3 screenshot is cleaner than production, but still reads partly like a designed wireframe:

- a narrow information rail on the left plus a second information area below creates duplicated hierarchy;
- the hero field contains explanatory placeholder lines that read as mockup scaffolding rather than finished print art;
- a contour circle and large identifier remain detached decorative devices;
- country title, illustration and lower copy feel like separate modules rather than one poster composition.

V3 remains rollback-safe evidence but is not promoted.

## Hawaii V4 — poster editorial clean-room

Created `11:2` from scratch without modifying production.

The direction removes the duplicated module structure and treats the sign as one continuous graphic poster:

- full-width deep-teal hero field across the upper ~900px;
- one cropped coral sun disc rather than multiple stamps/badges;
- three layered native coastal contour bands with a restrained sand horizon;
- large left-aligned `HAWAII` headline integrated into the hero field;
- lower ivory information field with one red registration rule, Japanese destination name, semantic dummy copy, one folio and one table identifier;
- no rounded cards, gradients, drop shadows, fake transport data, fake stamp, fake route code or web-UI framing.

Visual screenshot result: materially stronger thumbnail hierarchy than V3 and substantially less wireframe-like. It is still intentionally a clean-room candidate, not production.

## Japan V2 — separate print-poster grammar

Created `12:2` as a third distinct destination grammar rather than applying Hawaii or Italy as a template.

Direction:

- upper black print field;
- one restrained vermilion disc;
- two thin landscape/contour strokes crossing the transition;
- large `JAPAN` headline with small editorial subline;
- lower warm-ivory field with one red vertical rule, large native `日本`, semantic dummy copy and table identifier;
- no generic flag card, ticket UI, airport code, rounded card, gradient or shadow.

This deliberately differs from Hawaii's coastal color-field grammar and Italy's architectural facade grammar.

## Structure QA

Live readback after creation:

### Hawaii V4 `11:2`
- frame: `1000 × 1480`;
- native text nodes: `7`;
- IMAGE fill nodes: `0`;
- text outside root: `0`;
- hidden safe guide: `50,50 / 900 × 1380`;
- all variable copy remains native editable text.

### Japan V2 `12:2`
- frame: `1000 × 1480`;
- native text nodes: `7`;
- IMAGE fill nodes: `0`;
- text outside root: `0`;
- hidden safe guide: `50,50 / 900 × 1380`;
- all variable copy remains native editable text.

No rasterized or flattened text was introduced.

## Image-generation status

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed, saved or placed. The screenshot review still supports future image-generation comparison for destination atmosphere, but this run proves that stronger hierarchy can be achieved without adding generic AI travel stock.

Future raster briefs, when generation is available, should be compared against these clean-room candidates rather than against the old color blocks. Hawaii should target non-person coastal / volcanic / botanical editorial atmosphere with clear text-safe composition. Japan should target non-person paper/print/landscape or architectural texture, avoiding generic shrine/kimono/tourist postcard clichés and fake signage.

## Drive

- exact authority folder live-read before Git write: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- Drive changes: `0`;
- reason: no adopted/generated raster master exists in this run.

## Decision

`ADD_02_VISUAL_DIRECTION_ADVANCE / HAWAII_V4_ADVANCES_OVER_V3 / JAPAN_V2_CLEANROOM_CREATED / STRUCTURE_QA_PASS / PRODUCTION_NOT_PROMOTED / SELLABLE_VISUAL_GATE_NOT_YET_CLOSED`

Next highest-value step: create one more destination-specific clean-room for the weak Europe/Asia production group or compare approved image-generation candidates when the tool is available. Do not propagate one grammar to all 11 signs until thumbnail-scale family rhythm and destination differentiation are both proven.