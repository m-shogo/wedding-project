# Rurubu WEDDING V9 — Live Figma Checkpoint (2026-08-26)

## Scope / authority

This file is the current live checkpoint for **Rurubu WEDDING V9 only**.

- Figma file key: `bfM0d4c9dCeBv5pCkJ3TNM`
- V9 page: `08_RURUBU_V9_RURUBU_POP_PRODUCTION` (`2601:2`)
- Drive authority: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup`
- Do not touch WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, ADD items, or V6/V7/V8 controls.
- Production strategy: **assemble with existing Drive assets first; generate missing assets only after the six-page assembly exposes concrete missing roles.**
- One image = one production item. Sticker sheets / multi-asset collages are not production assets.

## Six live production frames

1. Cover — `2601:3`
2. Back cover — `2601:4`
3. Profile + Q&A — `2601:5`
4. Story + Timeline — `2601:6`
5. Memory + Gallery — `2601:7`
6. 1DAY + Cafe/Table — `2601:8`

All six live frames are `794 × 1123` A4 portrait.

## Photo / frame production contract

The live six-page set keeps all photos independently replaceable.

- Photo masks: `4 / 3 / 2 / 2 / 6 / 5 = 22`.
- Frame overlays: `4 / 3 / 2 / 2 / 6 / 5 = 22`.
- Every `PHOTO_MASK / ... / REPLACEABLE` keeps an IMAGE fill with `scaleMode=FILL`.
- Every photo has a separate geometry-matched `FRAME_OVERLAY / ... / NATIVE FALLBACK / ABOVE PHOTO / MOVEABLE` layer above it.
- Photo borders are not baked into the image layer.
- No page is flattened.
- Real decorative frame PNGs should later replace only the fallback overlay, never the photo mask geometry.

## Current visible asset state

Working Drive-derived/generated raster assets already proven by screenshot rendering:

- Profile generated title: `2603:2` — visible and working.
- Cafe & Table generated asset: `2621:115` — visible and working.

Known Drive raster placeholders still without usable rendered pixels:

- Cover logo source node formerly `FIXED PNG / V9 COVER LOGO ...` is now named `FAILED_RENDER / V9 COVER LOGO / PREEXISTING DRIVE HASH / KEEP FOR EVIDENCE` and remains hidden.
- Timeline image tests remain hidden failure evidence.
- Wedding Guide placeholder remains a separate role but is not treated as successful image placement.

An image hash alone is **not** accepted as successful placement. Visible screenshot evidence is required before a fallback is hidden.

## 2026-08-26 23H Drive-inspired editable-title pass

The newest Drive batch was re-read. The generated artwork confirms the intended direction: thick rounded pink lettering, white/cyan/yellow layered outlines, high-saturation Japanese travel-magazine energy, and movable one-item assets.

A fresh attempt to use `upload_assets` again produced a valid `mcp.figma.com` submit URL, but the runtime still could not resolve `mcp.figma.com`. The existing imported Cover logo hash was also promoted once and screenshot-tested; it produced no visible pixels. That promotion was immediately reverted. The identical transport route must not be looped again unless the runtime condition changes.

Rather than stopping the design pass, the Drive artwork was used as **visual truth** and the headings were upgraded with fully editable native layered text. Each treatment is three separate movable text layers, not a flattened image.

### Cover

Old generic editable title `2604:2` is hidden. New visible layered title `るるぶ WEDDING`:

- `2697:166` — outer yellow
- `2697:167` — middle cyan
- `2697:168` — top white

Screenshot QA confirms the new title renders visibly and gives the cover a substantially stronger Rurubu-style masthead hierarchy.

### Back cover

Old small `BACK ISSUE` pill/text (`2601:35`, `2601:36`) is hidden. New visible `WEDDING GUIDE` title:

- `2702:79` — outer yellow
- `2702:80` — middle cyan
- `2702:81` — top white

The existing `6ページ完全ガイド` badge remains separate and editable. Screenshot QA confirms no collision with the lead or photo area.

### Profile + Q&A

The existing generated Profile title `2603:2` remains the preferred visible title because it already renders correctly and is visually stronger than a native reconstruction. It remains a separate movable layer above the replaceable photos.

### Story + Timeline

Old generic title `2604:18` is hidden. New visible `ふたりのこと` title:

- `2698:195` — outer yellow
- `2698:196` — middle cyan
- `2698:197` — top white

The existing editable `TIMELINE` sticker remains visible and independent. Screenshot QA confirms the Story title fits the blue rail without disturbing the timeline/photo structure.

### Memory + Gallery

Old generic title `2604:22` is hidden. New visible `メモリースポット` title:

- `2697:169` — outer yellow
- `2697:170` — middle cyan
- `2697:171` — top white

Screenshot QA confirms the title fits the pink top band and improves the editorial hierarchy while leaving all six photo masks unchanged.

### 1DAY + Cafe/Table

Old generic title `2604:26` is hidden. New visible `1DAYプラン` title:

- `2698:198` — outer yellow
- `2698:199` — middle blue
- `2698:200` — top white

The first placement was caught by screenshot QA overlapping the kicker; all three layers were moved to `y=68`, after which screenshot QA confirmed clean separation. The working generated Cafe & Table asset `2621:115` remains visible.

## Rollback evidence created in the 23H pass

Hidden rollback frames were created before meaningful writes, including:

- `2694:2` — Cover before Drive-logo promotion test
- `2697:2` — Cover before layered title pass
- `2697:81` — Memory before layered title pass
- `2698:2` — Story before layered title pass
- `2698:91` — 1DAY before layered title pass
- `2702:2` — Back cover before layered Wedding Guide pass

These remain hidden outside the live production frames.

## Final structural QA after the 23H pass

Verified live state:

- six production frames: all exactly `794 × 1123`;
- replaceable photo masks: `22`;
- matched frame overlays: `22`;
- mask/overlay geometry mismatches: `0`;
- photo masks without IMAGE fill: `0`;
- visible direct-child overflow: `0`;
- visible text below 9.5 px: `0`;
- visible failure/placeholder/dummy/temp text-name leakage: `0`;
- visible layered title nodes: `15` total (Cover 3 / Back 3 / Story 3 / Memory 3 / 1DAY 3);
- Profile continues to use its working generated raster title instead of a layered fallback;
- no photo-mask geometry was changed by the title pass;
- no page was flattened.

## Folio convention

- Profile + Q&A: `PAGE 02`
- Story + Timeline: `PAGE 03`
- Memory + Gallery: `PAGE 04`
- 1DAY + Cafe/Table: `PAGE 05`
- Back cover: `BACK COVER`
- Cover and back cover do not use numeric folios.

## Failure fingerprints / method-switch rules

Retain these and do not repeat the same method without a material capability change:

1. `figma.base64Decode(...)` can fail with `Invalid base64 string` even for compact transport derivatives.
2. `upload_assets` can issue a valid submit URL while the runtime cannot resolve `mcp.figma.com`.
3. `figma.createImage(Uint8Array)` or an existing imported node can have a non-null image hash while screenshot QA still shows no usable rendered pixels.
4. Therefore: **imageHash exists ≠ placement success**. Screenshot evidence is mandatory.
5. Top-level Figma page metadata can omit the V9 page; resolve the known page by exact ID/name before concluding it is absent.

## Current boundary / next work

The six-page set is a strong editable **design / dummy-content master**, but not final printer-ready evidence.

Continue in this order:

1. keep using the Drive folder as the asset authority and place already-available one-item assets when a proven transport path exists;
2. replace dummy photos later without changing mask geometry;
3. replace dummy editorial copy only when legitimate final copy is available;
4. swap native fallback frames only after real decorative frame PNGs are screenshot-proven in Figma;
5. after assembly exposes genuine missing roles, generate those missing assets together as a later batch — not before;
6. once the printer template is known, apply real bleed/trim/safe-area rules and run export/preflight/effective-resolution QA;
7. obtain physical/printer proof before calling the piece print-ready.

Do not add decorative filler merely to keep iterating, and do not touch non-V9 paper-item scopes.
