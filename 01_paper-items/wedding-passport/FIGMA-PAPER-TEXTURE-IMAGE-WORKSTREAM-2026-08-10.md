# WEDDING PASSPORT — Paper Texture Image Workstream

Date: 2026-08-10
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / IMAGE_ASSET_ADOPTED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this evidence write: `05344aef00d24e83e7aac3243ddbe15048f36dfe`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- production front cover: `18:2 / FRAME_FRONT_COVER`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Screenshot-supported defect

The live front cover retained strong typography and editorial hierarchy, but the large cream field remained visually flat and digitally clean at whole/reading scale. A generic travel photograph would have weakened the established cover language, so the image role was restricted to a subtle archival-paper surface layer.

## Image workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` for generative-AI imagery.

A deterministic procedural paper-texture master was created instead, with no people, text, fake UI, factual content, or identity risk. This is an image-production asset, not a claim of generative-AI output.

Asset role brief:

- purpose: add credible paper / print density without changing the cover composition;
- crop/aspect: seamless full-page texture; tile-safe derivative allowed;
- text-safe zone: entire image contains no lettering or subject matter;
- palette: warm ivory / archival paper;
- visual character: low-contrast grain, subtle fibers, no stains or fantasy effects;
- avoid: visible repeating motif, fake handwriting, map text, stamps, airplanes, people, plastic/noisy AI texture.

## Drive lifecycle

Adopted master:

- file: `WEDDING_PASSPORT_WARM_ARCHIVAL_PAPER_TEXTURE_MASTER_v1.png`
- Drive ID: `1owA3ypyPt21LnaXy_3xs6v74jTtL3YAi`
- parent authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- MIME: `image/png`

Drive upload and parent readback succeeded before Figma placement.

## Figma placement

Production front cover `18:2` received one non-destructive replaceable image role:

- node: `121:2 / IMG_PAPER_TEXTURE_REPLACEABLE`
- geometry: `1480 × 2100`, x/y `0 / 0`
- placement: child index `3`, below the navy/red/editorial content and above the frame background;
- image mode: tiled raster derivative;
- opacity: `0.16`;
- blend mode: `MULTIPLY`;
- native text remains separate and fully editable.

No back-cover/menu/seating node was changed in this bounded pass.

## Screenshot QA

Post-placement whole and reading/detail screenshots were checked at 1024px and 1800px render scales.

Result:

- large cream field gains subtle paper density instead of remaining a flat digital fill;
- `旅のはじまり` and the menu/seating hierarchy retain contrast and optical priority;
- route-line illustration remains legible and does not become noisy;
- navy date rail remains visually stable because it sits above the texture layer;
- no visible fake text, image artifact, obvious tile seam, web-card signal, or generic stock-photo motif was introduced.

## Structural readback

Post-write Plugin API readback for `18:2`:

- size: `1480 × 2100`, `clipsContent=true`;
- native text nodes: `18`;
- IMAGE-fill nodes: `1`;
- image role: `121:2 / IMG_PAPER_TEXTURE_REPLACEABLE`;
- text outside root: `0`;
- hidden bleed / trim / safe guides remain present;
- no rasterized text was introduced.

## Decision

The prior reopened sellable gate remains valid and the cover has materially improved paper realism without changing factual content or sacrificing editability.

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / IMAGE_ASSET_ADOPTED / NOT_PRINT_READY`

Future generative-image runs should only add a new destination/illustration asset when a screenshot shows a concrete compositional role; do not add generic travel imagery merely to increase image count.
