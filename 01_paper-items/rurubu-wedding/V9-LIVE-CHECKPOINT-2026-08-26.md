# Rurubu WEDDING V9 — Live Figma Checkpoint (2026-08-26)

## Scope

This checkpoint records only the dedicated V9 Rurubu production in the existing production Figma file.

- Figma file key: `bfM0d4c9dCeBv5pCkJ3TNM`
- V9 page: `08_RURUBU_V9_RURUBU_POP_PRODUCTION` (`2601:2`)
- Page format: six separate A4 portrait pages, `794 × 1123`
- Do not overwrite V6/V7/V8 controls or other paper items.

## Six current production frames

1. Cover — `2601:3`
2. Back cover — `2601:4`
3. Profile + Q&A — `2601:5`
4. Story + Timeline — `2601:6`
5. Memory + Gallery — `2601:7`
6. 1DAY + Cafe/Table — `2601:8`

## Structure verified in live Figma

- 22 `PHOTO_MASK / ... / REPLACEABLE` nodes remain independently replaceable.
- Photo masks keep image fills; the pass did not flatten page-level images.
- Generated Profile title remains a separate movable image layer: `2603:2`.
- Native editable title/chip treatments remain separate from photos.

## 2026-08-26 density pass

Post-render review found:

- Cover already has acceptable Rurubu-pop density and strong hierarchy.
- Profile had unused lower-page space.
- Story/Timeline had excessive whitespace and duplicate Timeline labeling.
- Memory had unused lower-page space despite a strong photo grid.
- Back-cover header hierarchy was visually crowded.

Changes applied in live Figma:

- Preserved hidden rollback clones of Back/Profile/Story/Memory before the density pass.
- Reduced Back-cover `WEDDING GUIDE` title scale and separated it from the Japanese lead.
- Hid only the duplicate old Timeline placeholder (`2601:84`); the editable Timeline title remains visible.
- Added separate movable editorial micro-chips to Profile, Story, Memory, Cover, Back and 1DAY.
- Added small footer/navigation copy to use previously dead space without touching photo masks.
- Kept generated Profile title and all replaceable photo nodes unchanged.

## QA evidence

Whole-page screenshot QA was performed after mutation on:

- Back cover
- Story + Timeline
- Memory + Gallery

The first Back-cover pass still read as a collision at page scale. It was corrected in a second mutation by reducing the English title to 30px and Japanese lead to 34px and moving the footer navigation chip lower. Second screenshot QA confirmed clear separation.

## Failure learning

`get_metadata` top-level page listing did not expose the existing V9 page, even though `use_figma` could resolve it by name and returned page id `2601:2` with all six frames. Therefore:

> Do not conclude that V9 is absent solely from the top-level metadata page list. Resolve the page by exact name inside the Figma document before creating or replacing any V9 page.

This prevents false rebuilds and duplicate V9 production pages.

## Next pass

- Continue whole-page and actual-size QA on all six pages.
- Prefer one-image-one-item generated assets from the V9 Drive source folder as separate movable layers.
- Increase Rurubu-like information density only where it improves reading order; do not fill space mechanically.
- Keep photos independently replaceable and never flatten complete pages.
