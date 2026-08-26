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

- 22 `PHOTO_MASK / ... / REPLACEABLE` nodes remain independently replaceable in the six current production frames.
- Per-page mask counts are 4 / 3 / 2 / 2 / 6 / 5.
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

Whole-page screenshot QA was performed after mutation on Back cover, Story + Timeline, Memory + Gallery, Cover, Profile + Q&A, and 1DAY + Cafe/Table across the continuation passes.

The first Back-cover pass still read as a collision at page scale. It was corrected in a second mutation by reducing the English title and Japanese lead and moving the footer navigation chip lower.

### Cover + 1DAY continuation

Cover whole-page QA exposed a collision in the bottom three cover captions: added `YOKOHAMA / TRIP / PEOPLE` micro-chips sat over the original `ふたりのこと / 思い出スポット / 1DAY PLAN` labels. A hidden rollback clone was created as `2613:2`, then only the three colliding added chips were hidden. The original captions are readable again and photo masks remain untouched.

A generated `rurubu_wedding_logo_A_v1.png` Drive master (`1PMFJjPXW7925yFVNNPyYeFzuoeFhCJMU`) was tested as a separate cover image layer. The transport derivative created a Figma image node (`2613:41`) but rendered blank. The editable cover title/subtitle were restored immediately and the failed layer left hidden as evidence.

1DAY + Cafe/Table was strengthened with four concise native editable schedule sublines (`2615:36`, `2615:39`, `2615:42`, `2615:45`). A first pass also added STOP chips, but screenshot QA showed collisions; those chips were hidden and the corrected whole-page render is clean.

### Hierarchy cleanup continuation

A fresh exact-name lookup on the live document confirmed the V9 page still exists with all six A4 production frames. This is important because top-level metadata can omit the page.

Whole-page review then found a remaining real defect on the Back cover: the editable `WEDDING GUIDE` title at `2604:11` duplicated/collided with the Japanese lead even though the smaller pink `WEDDING GUIDE` issue pill already provided the English label. Before mutation, hidden rollback clones were created for Back (`2619:2`), Story (`2619:30`) and Memory (`2619:63`). The duplicate editable Back title `2604:11` was hidden; the pink issue pill was retained. Screenshot QA confirms the header now has one clear Japanese lead plus one English issue label with no overlap.

Story + Timeline received a separate movable `4 MOMENTS` editorial pill (`2619:96`/`2619:97`) beside the timeline guide. Memory + Gallery received a separate movable `6 SPOTS` pill (`2619:98`/`2619:99`) below the six-photo grid. Whole-page screenshots confirm both render without collision and preserve the existing reading order.

Final structure verification after this write confirmed all six production frames are still `794 × 1123`, visible, and contain exactly 22 current replaceable photo masks total. Rollback clones are hidden and excluded from that production count.

### Drive parts staging continuation

The V9 Drive source folder was opened through the connected Drive authority and actual generated files were fetched rather than inferred from filenames. Verified one-image-one-item candidates include:

- Cafe & Table title — Drive id `1Ayx8DuUowqnB2x93E-m3dqVq0zZHIan4`
- Wedding Guide title — Drive id `1XH5xBKL7heox5YfDolc1i9y8d3p4cc4R`
- Timeline title — Drive id `1ukg7Hmj8mkDVJGA-tTs6gqSM-LLAg3Fm`
- Message title — Drive id `1NbIe93cPeKafbSl5syaj9ATJGmPmvBJM`
- Goal/reference sheet — Drive id `17_XsnVTZpDSdEVn_lxaNd_mIjlDWPNxq`

Before staging, live Figma was re-resolved by exact V9 page name and Back, Story/Timeline, and 1DAY/Cafe were whole-page screenshot reviewed. Hidden rollback clones were then created before this Drive-parts pass:

- Back rollback — `2621:2`
- Story rollback — `2621:30`
- 1DAY rollback — `2621:65`

A dedicated side-by-side comparison frame was created at page level as `V9 / REFERENCE / DRIVE GOAL + PARTS 2026-08-26` (`2621:111`) with reference-image slot `2621:112`. Production pages received separate movable Drive-asset slots without changing any photo mask:

- Back `WEDDING GUIDE` asset slot — `2621:113`
- Story `TIMELINE` asset slot — `2621:114`
- 1DAY `CAFE & TABLE` asset slot — `2621:115`

These slots are separate scene nodes; they do not flatten pages and do not replace or merge with photo masks.

The source files were downloaded from Drive and visually inspected before transport. The Cafe/Table, Wedding Guide, and Timeline files are individual transparent PNG title/decorations, while the `02_42_21` sheet is a multi-item goal/reference board and must remain reference-only.

## Failure learning

`get_metadata` top-level page listing did not expose the existing V9 page, even though exact-name resolution inside `use_figma` returned page id `2601:2` with all six frames. Therefore:

> Do not conclude that V9 is absent solely from the top-level metadata page list. Resolve the page by exact name inside the Figma document before creating or replacing any V9 page.

Generated image transport learning:

> A Drive PNG can decode locally and still fail to render when converted to an indexed transport PNG and fed through `figma.createImage`. Always screenshot-QA the placed asset before hiding the fallback title. If it renders blank, restore the editable fallback immediately. Do not treat node creation or a returned `imageHash` as visual success.

The direct MCP asset upload path also hit DNS resolution failure from the execution environment, so the failed route was not blindly retried.

Additional Drive-parts transport evidence from the staging continuation:

> `upload_assets` successfully issued a Figma MCP submit URL, but the execution container could not resolve `mcp.figma.com`, so no upload POST reached Figma. A compact WebP derivative was rejected by `figma.createImage` as unsupported. A compact true-color RGBA PNG returned an image hash, but screenshot QA of the asset node rendered blank/transparent. A compact JPEG derivative was also rejected as unsupported in this Plugin execution path. Therefore none of these preview transports is allowed to replace the native fallback title yet.

> The correct response is to preserve the Drive master IDs, keep the separate V9 asset slots and rollbacks, and retry through a transport route only when screenshot QA proves real pixels are present. Never hide the existing readable native title because a node or image hash exists.

## Next pass

- Keep the `2621:111` reference board next to production and populate it with the Drive goal sheet once a verified pixel transport path is available.
- Populate `2621:113` / `2621:114` / `2621:115` with the verified Drive masters only after screenshot QA confirms rendering; native readable titles remain the fallback until then.
- Continue actual-size QA across all six as a set, especially Profile typography and bottom-edge safety.
- Prefer one-image-one-item generated assets from the V9 Drive source folder as separate movable layers, but only mark them placed after screenshot QA proves they render.
- Increase Rurubu-like information density only where it improves reading order; do not fill space mechanically.
- Keep photos independently replaceable and never flatten complete pages.
