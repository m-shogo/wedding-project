# Rurubu WEDDING V9 — Live Figma Checkpoint (2026-08-26)

## Scope

This checkpoint records only the dedicated V9 Rurubu production in the existing production Figma file.

- Figma file key: `bfM0d4c9dCeBv5pCkJ3TNM`
- V9 page: `08_RURUBU_V9_RURUBU_POP_PRODUCTION` (`2601:2`)
- Page format: six separate A4 portrait pages, `794 × 1123`
- Do not overwrite V6/V7/V8 controls or other paper items.
- V9 Drive authority: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup`

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
- Photo masks keep image fills; page-level images are not flattened.
- Each current photo mask now has a separate geometry-matched `FRAME_OVERLAY / ... / NATIVE FALLBACK / ABOVE PHOTO / MOVEABLE` layer immediately above it.
- Generated Profile title remains a separate movable image layer: `2603:2`.
- Native editable title/chip treatments remain separate from photos.
- Existing V9 Drive placeholder layers remain separate, including Wedding Guide `2621:113` and Timeline `2621:114`.

## Folio convention verified from live Figma

The current publication treats the cover as the implicit first page and does not print a numeric folio on the cover or back cover.

- Profile + Q&A: `PAGE 02`
- Story + Timeline: `PAGE 03`
- Memory + Gallery: `PAGE 04`
- 1DAY + Cafe/Table: `PAGE 05`
- Back cover: `BACK COVER`

Older checkpoint prose that referred to these as PAGE 03–06 was stale documentation; the live Figma labels above are the current authority.

## 2026-08-26 magazine parts pass

Before mutation, exact-name lookup re-confirmed the live V9 page and all six production frames. The Drive authority was re-listed and confirmed to contain a large asset pool, including three Rurubu WEDDING logo variants, BEST SHOT/PICK UP/date badges, generated section titles, and many newly generated PNG parts.

Six hidden rollback clones were created before this pass at canvas y=5100.

A coherent magazine micro-decoration pass then added separate movable V9 parts. These are native editable layers, not flattened into photos. The treatment follows the approved Rurubu-pop language: compact rounded pills, high-contrast cyan/pink/yellow/blue accents, dense editorial signposting, and independent movable parts.

## 2026-08-26 13H editorial polish pass

The live six-page production was re-read before each write and refined as an editorial system rather than by flattening pages.

- Cover: retained the dense left-side index and hero hierarchy, completed the three lower photo-pick rhythm with `BEST SHOT! / MEMORY / PICK UP`, and added a compact `ISSUE 01` marker.
- Back cover: added independent `VENUE / CAFE / TABLE` photo labels and one-line descriptions under all four contents entries so the page reads as a real magazine index rather than a bare list.
- Profile + Q&A: converted the three questions into white bordered editorial cards, changed the top photo labels to `GROOM / BRIDE`, added `COUPLE TALK`, and replaced production-facing answer placeholders with guest-facing dummy editorial copy.
- Story + Timeline: added scrapbook-style tape to the hero photo, `PHOTO 01`, short captions for all four timeline moments. The four 2019/2021/2023/2026 rows remain separate editable event cards.
- Memory + Gallery: completed photo numbering `01–06`, added `PHOTO 01`, while retaining all six independent photo masks.
- 1DAY + Cafe/Table: added `PHOTO 01–03`, `FOOD 01–02`; filled the previous dead space with a guest-facing `TRIP MEMO` card instead of production instructions.

Fresh hidden rollback clones were created around these polish passes before modifying the live frames.

## 2026-08-26 14H print-safe finalization pass

A six-page screenshot review identified a real finishing issue: several folio/date labels sat only 5–13 px from the A4 bottom edge. Without pretending that the final printer bleed/template is known, these labels were moved upward to give the current editable layout a safer working margin.

- Back cover `BACK COVER` badge moved upward to leave about 25 px bottom clearance.
- Profile `PAGE 02` badge moved upward to leave about 25 px bottom clearance.
- Story `PAGE 03` badge moved upward to leave about 25 px bottom clearance.
- 1DAY `PAGE 05` badge moved upward to leave about 25 px bottom clearance.
- Cover date was reduced to a tighter 24 px text box so it no longer sits within ~6 px of the trim edge while preserving the name/date footer hierarchy.
- The 1DAY closing copy was rewritten and resized from an awkward four-line wrap to the clean two-line guest-facing copy: `食べたものより、 / 食卓の時間を覚えている。`

Five fresh hidden rollback clones were created immediately before this pass.

## 2026-08-26 15H finish / readability pass

The current six-page set was reviewed again at whole-page scale, then inspected structurally for clipping, tiny text, photo-mask integrity, and generated-asset transport.

- Memory + Gallery: the lower three photos now have separate movable captions `BEACH TRIP / DINNER / CAFE TIME`, completing the 01–06 photo rhythm instead of leaving photos 04–06 as number-only tiles.
- Back cover: tiny `VENUE / CAFE / TABLE / BACK COVER` text was increased for better reading-size legibility without changing the photo masks.
- Back cover lead: the two-line lead text box was enlarged so its 50 px line height is no longer structurally clipped.
- Story + Timeline: the lead was shortened to `出会ってから、今日まで。 / ページをめくるたび、思い出がよみがえる。`, reduced to 22 px with 32 px line height, and given sufficient box height so it no longer relies on overflow/wrap behavior.
- Memory + Gallery: the large two-line closing statement received sufficient height for its 46 px line height while retaining the same visual position and hierarchy.
- Fresh hidden rollback clones were created before the Memory/Back caption pass and before the three text-box corrections.

### Generated Timeline asset transport check

The Drive authority still contains the generated Timeline master (`RURUBU_V6_SECTION_TIMELINE_GENERATED_V1_2026-08-15.png`) and the local transparent transport derivative was re-tested through two distinct routes.

1. Direct `figma.base64Decode(...)` with a compact ~9 KB transparent PNG still returned `Invalid base64 string`; the Figma write was atomic, so no live production node was created or changed.
2. `upload_assets` successfully issued a single-use `mcp.figma.com` submit URL, but the runtime `curl` path still failed DNS resolution with `Could not resolve host: mcp.figma.com`.

This is now treated as an external transport blocker rather than a design blocker. Do not keep retrying either identical failure fingerprint inside the same run. Native editable fallback titles remain visible until a transport route is proven by screenshot rendering.

## 2026-08-26 15H photo-frame structure normalization

The six live production pages were re-read specifically against the requested frame/photo layering rule. Before changing the current production, six fresh hidden rollback clones were made.

All 22 photo compositions were normalized from a single image rectangle carrying its own visible border into an explicit two-layer structure:

1. `PHOTO_MASK / ... / REPLACEABLE` — image crop/fill layer below. Its IMAGE fill and `scaleMode=FILL` are preserved, while the visible stroke is removed from the photo layer.
2. `FRAME_OVERLAY / ... / NATIVE FALLBACK / ABOVE PHOTO / MOVEABLE` — separate no-fill frame layer directly above the matching photo, preserving the previous border thickness and corner radius.

This gives the current dummy-photo build the same production contract intended for the Drive V9 decorative frame PNGs: photo below, frame above, independent replacement/editability. When a real decorative frame asset can be transported successfully, replace only the native fallback overlay; do not flatten or rebuild the photo crop.

A pair-by-pair verification confirmed all 22 frame overlays have geometry matching their photo layer exactly and are later in z-order than the corresponding photo. Whole-page screenshot QA on all six pages confirmed no visible regression after normalization.

## 2026-08-26 17H Story generated-part fallback + design-complete QA

The live V9 Story page was re-read and a new transport route was tested using a tiny true-color RGBA PNG represented as a direct `Uint8Array`, bypassing both base64 decoding and the blocked `mcp.figma.com` upload host.

- Figma accepted the bytes and returned `imageHash=fe24b5b5c9c3265bbd356147328ed4af45f65192` on separate image node `2675:84`.
- Screenshot QA of that node did **not** prove valid rendered pixels; it rendered effectively blank/black and did not appear on the Story whole-page screenshot.
- The node was therefore renamed `FAILED_RENDER / V9 GENERATED TIMELINE / KEEP FOR EVIDENCE` and hidden. It is not part of visible production.
- A fresh hidden rollback was preserved before replacement work.
- The plain editable `TIMELINE` heading was replaced with a fully editable native Rurubu-style sticker composed of separate cyan / white / pink layers, white `TIMELINE` text, and a small yellow sparkle. The native sticker parts are `2676:85`–`2676:89` and remain separate movable layers.
- A tiny duplicate year-range label was removed after screenshot QA because it competed with the `FIRST MEET` chip.

A new publication-wide final design/dummy-content QA was then run against all six live production frames.

Verified live state:

- six visible A4 production frames, each exactly `794 × 1123`;
- photo masks: `4 / 3 / 2 / 2 / 6 / 5 = 22`;
- separate photo-frame overlays: `4 / 3 / 2 / 2 / 6 / 5 = 22`;
- zero visible direct-child overflow;
- zero visible missing-font nodes;
- zero visible text nodes below 9.5 px;
- zero visible node names containing `PLACEHOLDER`, `DUMMY`, `TEMP`, or `FAILED_RENDER`;
- the failed Timeline image test remains hidden;
- the old native Timeline title remains hidden as rollback/fallback evidence;
- the new native Story Timeline sticker is visible;
- no page is flattened and all 22 photo crops remain independently replaceable;
- hidden V9 rollback snapshots remain available outside production.

### Current completion boundary

The **V9 design / dummy-content production is complete enough to freeze as the current visual master**. Remaining work is not another layout-generation pass; it is content/print finalization:

1. replace dummy photos with the final legitimate photo set without changing mask geometry;
2. replace dummy editorial copy where final wording is required;
3. swap native fallback frame overlays for Drive decorative frame PNGs only if a transport route is proven by screenshot rendering;
4. apply the actual printer trim/bleed/safe template and run export/preflight/effective-resolution QA;
5. make a physical or printer proof before calling the piece printer-ready.

## QA evidence

Whole-page screenshots were regenerated for the current Cover, Back, Profile, Story, Memory, and 1DAY production frames after the 15H changes, after frame-overlay normalization, and after the 17H Story Timeline sticker refinement.

The latest publication-wide structural QA verified:

- all six current frames remain exactly `794 × 1123` and visible;
- replaceable photo-mask counts remain exactly `4 / 3 / 2 / 2 / 6 / 5 = 22`;
- all 22 replaceable masks still have an IMAGE fill with `scaleMode=FILL`;
- all 22 masks have a separate geometry-matched native fallback frame overlay directly above them;
- all photo-mask visible strokes have been moved to those independent overlay layers rather than baked into the photo layer;
- no visible direct child overflows its A4 frame;
- no visible text node has a missing font;
- no visible production node name contains `PLACEHOLDER`, `DUMMY`, `TEMP`, or `FAILED_RENDER`;
- no visible text is below 9.5 px after the latest legibility pass;
- no page was flattened and all photo masks remain independently replaceable;
- rollback snapshots remain hidden and outside current production frames.

This is now the frozen `DESIGN / DUMMY-CONTENT VISUAL MASTER` checkpoint, not final printer-ready evidence. Final photo selection, legitimate final copy, exact printer bleed/trim/safe template, export preflight, effective image resolution, and physical proof are still separate gates.

## Failure learning retained

`get_metadata` top-level page listing can omit the existing V9 page. Never conclude that V9 is absent solely from the top-level page list. Resolve `08_RURUBU_V9_RURUBU_POP_PRODUCTION` by exact name inside the Figma document before creating/replacing anything.

A Drive PNG can decode and still fail to render when transported through an unsuitable route. Node creation or an `imageHash` is not visual success. Screenshot-QA the placed asset before hiding an editable fallback.

A Figma helper in the 13H pass initially assumed six-digit hex and received `#fff`; the write failed atomically with a NaN paint validation error. No live changes were applied by the failed call. Re-read live state, then retry only after normalizing to `#ffffff` (or make future color parsers support three-digit hex explicitly).

The 15H transport test reconfirmed two distinct external failure fingerprints: `base64Decode: Invalid base64 string` and runtime DNS failure for `mcp.figma.com`. These routes must not be looped repeatedly without a changed transport condition.

The 17H direct-byte test adds a third distinct failure fingerprint: `figma.createImage(Uint8Array)` can return an image hash and create a node while screenshot QA still shows no usable rendered pixels. `imageHash exists` is therefore explicitly not accepted as asset-placement success.

## Next pass

- Treat the current six-page V9 as the frozen design/dummy-content visual master; do not add decorative filler just to keep iterating.
- Continue using the Drive folder as the visual/asset authority for final photo/frame/title swaps.
- When V9 decorative frame PNG transport becomes available, replace the matching `FRAME_OVERLAY / ... / NATIVE FALLBACK` layer only; keep each underlying replaceable photo crop intact.
- Replace dummy photos later without changing the mask geometry or editorial layer structure.
- When printer/template information is available, run true trim/bleed/safe-area and export/preflight QA rather than treating the current 25 px working margin as a printer specification.
- Do not touch Passport, Boarding Pass, 青春ふたりきっぷ, ADD items, or V6/V7/V8 controls.
