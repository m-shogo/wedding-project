# るるぶWEDDING — Asset Transparency QA

Status: PASS_STRUCTURE / FIGMA_PLACEMENT_PENDING
Current authority: GitHub `main`
Verified: 2026-07-30

## Scope
Mechanically inspect every currently registered frozen-candidate SVG in `assets/` before any Drive production promotion or Figma placement. This QA is structural SVG transparency verification; PNG alpha-channel verification is not applicable because these accepted candidates are SVG, not raster PNG.

## Acceptance rule
PASS only when:
- the SVG root/viewBox does not paint a canvas-sized background rectangle/image;
- no embedded raster image is used as a fake transparent background;
- only intended artwork is painted;
- area outside the intended artwork remains transparent by SVG construction.

A deliberately painted badge/icon body (including circular icon discs) is artwork, not a canvas background. A checkerboard, white canvas, generated matte, or full-viewBox background would be REJECTED.

## Results

| Asset | Structural transparency | Embedded raster | Canvas background | Result |
|---|---|---|---|---|
| `assets/pickup-badge-v1.svg` | yes | none | none | PASS |
| `assets/date-badge-v1.svg` | yes | none | none | PASS |
| `assets/route-heart-plane-v1.svg` | yes | none | none | PASS |
| `assets/check-burst-v1.svg` | yes | none | none | PASS |
| `assets/cloche-heart-v1.svg` | yes; circular disc is intended artwork | none | none | PASS |
| `assets/champagne-heart-v1.svg` | yes; circular disc is intended artwork | none | none | PASS |
| `assets/guidebook-check-v1.svg` | yes; circular disc is intended artwork | none | none | PASS |
| `assets/hearts-sparkle-v1.svg` | yes; circular disc is intended artwork | none | none | PASS |
| `assets/photo-frame-tape-v1.svg` | yes; photo frame fill is intended artwork | none | none | PASS |
| `assets/best-shot-tag-v1.svg` | yes; tag fill is intended artwork | none | none | PASS |

## Promotion boundary
- These ten files are accepted as structurally transparent SVG candidates.
- Do not call them final production assets until the selected wireframe/visual design actually uses them and visual QA passes.
- Do not regenerate any of these solely to obtain transparency; the transparency requirement is already satisfied structurally.
- If a future raster derivative is created, verify real alpha values mechanically before Drive production promotion. A baked checkerboard/matte is REJECTED.

## Figma placement rule
Import/recreate one SVG at a time only after the wireframe winner is selected. Do not create an asset sheet. After each import, verify bounds, transparent exterior, text/font behavior, and print-scale legibility before placing the next asset.
