# るるぶWEDDING production assets

## pickup-badge-v1.svg
- status: CANDIDATE / production-usable
- format: SVG (background elementなし = true transparency)
- tool chain: programmatic SVG; image generation transparency loop abandoned after repeated raster background failures
- purpose: cover / feature callout `PICK UP!`
- palette: gold #FFD84D→#F4B51E, pink #EE3E64, white outline
- QA: single asset only; no asset sheet; scalable; editable in Figma; no raster alpha ambiguity
- promotion rule: Figma placement + visual QA後に FINAL へ昇格

## rejected raster attempts
2026-07-29 の画像生成による `PICK UP!` 候補は checkerboard/背景が画像自体に描画されたため production asset として不採用。同方式の再試行は禁止し、SVG/Figma-native経路へ切替済み。
