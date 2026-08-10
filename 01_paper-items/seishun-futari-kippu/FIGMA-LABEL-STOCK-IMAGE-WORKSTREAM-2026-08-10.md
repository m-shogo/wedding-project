# 青春ふたりきっぷ — Label Stock Image Workstream

Date: 2026-08-10
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / IMAGE_ASSET_ADOPTED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `c2336ccc82ef14d80b22e59bebdbaf4c49de5ddf`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `v7rIRHv8YKQXG0LYD0I5OA`
- production frame: `11:2 / FRAME_LABEL / 720 × 250`
- Drive authority folder: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`

## Screenshot-supported defect

The promoted V3 typography and route hierarchy remain strong at the real 720 × 250 label size, but the large pale field still appeared uniformly digital. Adding a train, station photo, stamp, or literal rail illustration would reverse the successful V3 subtraction, so the only justified image role is physical label-stock surface texture.

## Image workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` for generative-AI imagery.

A deterministic procedural label-stock master was produced instead, containing only low-contrast paper grain / sparse speckle / broad absorption variation. It contains no people, text, fake station data, stamps, trains, QR/barcodes, or factual content.

Asset role brief:

- purpose: make the Mintia-label/ticket object read as printed stock rather than a flat Figma panel;
- crop/aspect: seamless horizontal label surface; tile-safe derivative allowed;
- text-safe zone: entire raster has no semantic marks;
- palette: warm pale green-ivory compatible with the existing rail-ephemera palette;
- character: restrained paper grain and tiny irregular label-stock speckle;
- avoid: visible pattern repetition, stains, fake aging, handwriting, train imagery, station signs, decorative stamps.

## Drive lifecycle

Adopted master:

- file: `SEISHUN_FUTARI_LABEL_STOCK_TEXTURE_MASTER_v1.png`
- Drive ID: `1k6UqSecIv5WGYwcaovVxwg68N5B_ubtX`
- parent authority: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J`
- MIME: `image/png`

The authority folder was re-read immediately before upload and the returned parent ID matches the required folder.

## Figma placement

Production `11:2` received one independent replaceable image role:

- node: `45:2 / IMG_LABEL_STOCK_TEXTURE_REPLACEABLE`
- geometry: `720 × 250`, x/y `0 / 0`;
- child index: `1`, directly above `BG_BASE` and below `BG_GUILLOCHE_NATIVE`, rules, route, facts and all text;
- image mode: tiled raster derivative;
- opacity: `0.12`;
- blend mode: `MULTIPLY`.

The native guilloche remains native; the new texture does not replace or flatten it.

## Screenshot QA

Post-placement live screenshot was reviewed at the exact 720 × 250 production size.

Result:

- title `青春ふたりきっぷ`, subtitle, route and facts retain hierarchy and contrast;
- existing green rule/route structure remains crisp;
- faint `24` atmosphere remains intentionally subordinate;
- the pale field gains subtle physical density without reintroducing the old clip-art/train/stamp look;
- no visible seam, raster lettering, fake fact, web-card signal or AI-looking artifact appears.

## Structural readback

Post-write Plugin API readback:

- root: `720 × 250`;
- native text nodes: `19`;
- IMAGE-fill nodes: `1`;
- image role: `45:2 / IMG_LABEL_STOCK_TEXTURE_REPLACEABLE`;
- text outside root: `0`;
- hidden legacy `ICON_TRAIN`, `DECOR_SHUKU_TEXT`, and `DECOR_GATE_TEXT` remain hidden only;
- no rasterized text was introduced.

The earlier long-copy/readability proof remains valid because text geometry and typography were not modified.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / IMAGE_ASSET_ADOPTED / NOT_PRINT_READY`

The object now has slightly more credible printed-stock presence while preserving the V3 editorial subtraction. Future generative-image work should not add literal railway scenery unless a future screenshot reveals a concrete compositional need.
