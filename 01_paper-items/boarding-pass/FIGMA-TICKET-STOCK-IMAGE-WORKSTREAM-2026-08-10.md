# BOARDING PASS — Ticket Stock Image Workstream

Date: 2026-08-10
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / IMAGE_ASSET_ADOPTED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `b4df063531444d11961306b4f9fe32837fe59255`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `P2PtpMyhyZqHYe1ZBBCD13`
- production front: `8:5 / FRAME_FRONT`
- production back: `8:73 / FRAME_BACK`
- Drive authority folder: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`

## Screenshot-supported defect

The V2 production composition remains strong and avoids the old airline/admin UI language, but live front/back screenshots still showed uniformly flat cream fields. At actual ticket scale this reads more like a clean vector mockup than printed ticket stock.

A generic plane/airport/travel photograph was explicitly rejected as unnecessary and likely to reintroduce stock/template signals. The image role was therefore restricted to a subtle ticket-stock surface layer.

## Image workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` for generative-AI imagery.

A deterministic procedural ticket-stock texture master was created instead. It contains no people, text, fake UI, transport credentials, QR/barcodes, or factual content.

Asset role brief:

- purpose: increase physical print credibility without competing with the Japanese-first ticket hierarchy;
- crop/aspect: seamless full-ticket surface; tile-safe derivative allowed;
- text-safe zone: full image has no semantic marks;
- palette: dry warm cream ticket stock;
- character: low-contrast grain with irregular restrained vertical fibers;
- avoid: visible stripe repetition, stains, handwriting, map text, stamps, aircraft, fantasy/noise artifacts.

## Drive lifecycle

Adopted master:

- file: `BOARDING_PASS_TICKET_STOCK_TEXTURE_MASTER_v1.png`
- Drive ID: `1BHLldoaTjfIar_d8sDBmzidJ8j8Lja_O`
- parent authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- MIME: `image/png`

Drive parent metadata was re-read before upload and the returned parent ID matches the authority folder.

## Figma placement

Front `8:5`:

- `23:2 / IMG_TICKET_STOCK_TEXTURE_REPLACEABLE`
- geometry: `1200 × 550`;
- inserted after physical background/perforation geometry and before the first text layer;
- opacity: `0.14`;
- blend mode: `MULTIPLY`.

Back `8:73`:

- `23:3 / IMG_TICKET_STOCK_TEXTURE_REPLACEABLE`
- geometry: `1200 × 550`;
- inserted after background geometry and before all text;
- opacity: `0.14`;
- blend mode: `MULTIPLY`.

Both image layers are independent and replaceable. Native editable text remains separate.

## Screenshot QA

Live post-placement front/back screenshots were checked at the native `1200 × 550` render size.

Front:

- guest-name hierarchy and reception/table fields remain the first read;
- tear-off stub/perforation still reads as physical ticket structure;
- faint `24`, burgundy anchor and small date line retain contrast;
- no texture seam, fake credential, stock-airline motif or web-card signal appears.

Back:

- `きょうを、ありがとう。` remains dominant;
- body copy and `余韻` atmosphere remain readable;
- the surface now feels slightly less like a flat vector panel without reducing negative-space quality;
- no fake text/image artifact was introduced.

## Structural readback

Front `8:5`:

- native text nodes: `24`;
- IMAGE-fill nodes: `1`;
- image role: `23:2 / IMG_TICKET_STOCK_TEXTURE_REPLACEABLE`;
- text outside root: `0`.

Back `8:73`:

- native text nodes: `8`;
- IMAGE-fill nodes: `1`;
- image role: `23:3 / IMG_TICKET_STOCK_TEXTURE_REPLACEABLE`;
- text outside root: `0`.

No rasterized text was introduced and the prior long-copy/rollback evidence remains valid.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / IMAGE_ASSET_ADOPTED / NOT_PRINT_READY`

This pass improves physical paper realism without changing factual placeholders or returning to literal airline imagery. Future generative-image work should only be adopted if a live screenshot reveals a specific non-decorative role.
