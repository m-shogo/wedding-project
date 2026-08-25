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

## 2026-08-26 cover + 1DAY QA continuation

A later live pass re-read the same V9 page by exact name before writing and verified the six production frames plus the 22 replaceable photo masks again.

### Cover

Whole-page QA exposed a real collision in the bottom three cover captions: the added `YOKOHAMA / TRIP / PEOPLE` micro-chips were sitting over the original `ふたりのこと / 思い出スポット / 1DAY PLAN` labels. A hidden rollback clone was created as `2613:2`, then only the three colliding added chips were hidden. The original three captions are now readable again, while the cover photo masks remain untouched.

A generated `rurubu_wedding_logo_A_v1.png` Drive master (`1PMFJjPXW7925yFVNNPyYeFzuoeFhCJMU`) was also tested as a separate cover image layer. The local PNG transport derivative created a valid Figma image node (`2613:41`) but rendered transparent/blank in the whole-page screenshot. The attempted WebP fallback failed before mutation because the embedded base64 payload was invalid. The prior editable cover title/subtitle were therefore restored immediately and the failed PNG layer was left hidden rather than deleting evidence.

### 1DAY + Cafe/Table

The schedule area still read too sparse at page scale, so a hidden rollback clone was created as `2615:2`. Four concise native editable sublines were added beneath the schedule stops:

- `2615:36` — 10:00 editorial note
- `2615:39` — 11:40 editorial note
- `2615:42` — 15:10 editorial note
- `2615:45` — 18:30 editorial note

A first pass also added four STOP chips, but screenshot QA showed the chips colliding with the sublines. Those four chips (`2615:37`, `2615:40`, `2615:43`, `2615:46`) were hidden in the correction pass. A second whole-page screenshot confirmed clean readable sublines with no overlap. The five 1DAY/Cafe photo masks remain unchanged and independently replaceable.

### Additional QA

Profile + Q&A was re-rendered at whole-page scale and remains coherent: the generated profile title is still a separate movable image, Shogo/Shiori photos remain independent masks, and Q&A/footer reading order is intact.

## Failure learning

`get_metadata` top-level page listing did not expose the existing V9 page, even though `use_figma` could resolve it by name and returned page id `2601:2` with all six frames. Therefore:

> Do not conclude that V9 is absent solely from the top-level metadata page list. Resolve the page by exact name inside the Figma document before creating or replacing any V9 page.

This prevents false rebuilds and duplicate V9 production pages.

Generated image transport learning from the later pass:

> A Drive PNG can decode locally and still fail to render when converted to an indexed transport PNG and fed through `figma.createImage`. Always screenshot-QA the placed asset before hiding the fallback title. If it renders blank, restore the editable fallback immediately. Do not treat node creation or a returned `imageHash` as visual success.

The direct MCP asset upload path also hit DNS resolution failure from the execution environment, so this pass did not blindly retry it.

## Next pass

- Continue whole-page and actual-size QA on Back, Story, Memory and the final 1DAY state, then recheck all six as a set.
- Prefer one-image-one-item generated assets from the V9 Drive source folder as separate movable layers, but only mark them placed after screenshot QA proves they render.
- Use the original transparent/true-color asset path or another verified transport route instead of the indexed-PNG derivative that rendered blank.
- Increase Rurubu-like information density only where it improves reading order; do not fill space mechanically.
- Keep photos independently replaceable and never flatten complete pages.
