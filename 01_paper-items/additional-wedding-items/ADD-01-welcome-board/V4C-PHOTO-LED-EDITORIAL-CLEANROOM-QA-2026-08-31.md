# ADD-01 — V4C `COASTAL EDITORIAL SPREAD` clean-room QA — 2026-08-31

Status: `V4C_CLEANROOM_COMPARISON_CREATED / STRUCTURE_QA_PASS / LONG_NAME_MESSAGE_STRESS_PASS / PHOTO_GEOMETRY_300PPI_SAFE_IN_A2_A3_SCENARIOS / REAL_PHOTO_IMPORT_BLOCKED / SELLABLE_VISUAL_QA_IN_PROGRESS / NOT_PROMOTED / NOT_PRINT_READY`

Start / pre-write authority SHA: `c4ef9c57c5a59601c76da8b6ce93f65e47ca9272`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Scope: non-Rurubu `ADD-01 ウェルカムボード` only.

## Live authority

- Figma file: `XyyTGuz6BMf8XRhPZZfdoT`
- page: `24:2 / V4_CLEANROOM_ADD01_WELCOME_2026_08_28`
- retained V4: `24:3`
- retained V4B resolution-safe comparison: `58:2`
- new V4C clean-room root: `61:2 / V4C / ADD-01 / COASTAL EDITORIAL SPREAD / CLEANROOM / PHOTO-LED`
- V4C replaceable photo role: `61:7 / PHOTO / COUPLE / REPLACEABLE / REAL_PHOTO_REQUIRED / LANDSCAPE 720x440 / SUBJECT-RIGHT`
- hidden V4C long-name/message proof: `61:19`
- exact ADD-01 Drive authority: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`
- authoritative real-photo source located elsewhere in connected wedding assets: `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg`, Drive id `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P`, `4500×3000 px`, JPEG, `5,266,253 bytes`.

No Rurubu node/path/asset was read or edited.

## V4 exclusive clean-room provenance

V4C was created from a new blank `852×1200 px` frame. Retained production/V2/V3/V4/V4B nodes were not duplicated, restyled, or used as component/layout sources.

Only verified non-visual facts and roles were re-authored: wedding date, Yokohama location, bride/groom name placeholders, welcome-message role, and replaceable real-photo role.

V4B was inspected only as retained comparison after its earlier clean-room creation. The V4C stress proof `61:19` is a QA-only clone of the newly authored V4C candidate, not a production-direction source.

## Reference-led / photo-led art direction

The authoritative `4500×3000` real photograph was inspected outside Figma before geometry design. It is a Hawaii beach portrait with the couple positioned on the right and substantial sky/landscape breathing room on the left.

V4C therefore changes the photo geometry materially from both prior clean-room directions:

- V4 `24:9`: very narrow `310×930 px` portrait window;
- V4B `58:5`: `360×500 px` portrait window;
- V4C `61:7`: large `720×440 px` landscape window, chosen to preserve the source's subject-right composition rather than forcing an extreme portrait crop.

The new page grammar is an editorial poster rather than a UI/card layout:

- Japanese serif hero `ようこそ、旅の一日へ。` is the first read;
- one large uninterrupted photo field is the second read;
- names form the third read directly below the image;
- message/date occupy a physical sand-colored lower field;
- deep-ink edge, coral register and a thin sand photo foot create print boundaries without badges, rounded cards, fake travel data or stock airplane/passport decoration;
- an initially added decorative `01 / YOKOHAMA` side index was judged meaningless/redundant and removed during the same run; only a non-semantic balance rule remains.

Compared with V4B, V4C removes the large inactive lower whitespace and gives photography substantially more visual authority while preserving native variable copy.

## Hybrid authoring split

- variable/factual copy: native Figma text;
- hero/name/message/date: native editable text;
- replaceable photography: clipped Figma frame role `61:7` with no baked text;
- fixed decoration: native vector/rectangle fields only;
- generated raster: `0`;
- production IMAGE fills: `0` because the real JPEG upload remains blocked;
- Drive write: `0`.

## Raster upload retest

Immediately before authoring V4C, the current supported Figma raster-upload route was retested once against V4B `58:5` using the exact Drive JPEG fetched locally.

- `upload_assets` successfully issued a new one-time upload URL;
- POST of the exact JPEG failed before transfer with `curl: (6) Could not resolve host: mcp.figma.com`;
- no partial Figma mutation survived;
- repeated retries were stopped and the run continued with safe native Figma work.

This remains a transient execution-network blocker, not a missing-photo or missing-node blocker.

## Structural QA and repair

Initial V4C screenshot review was followed by programmatic structure readback. It exposed a real authoring defect: all five visible text nodes had inherited fixed `10 px` height boxes (`textAutoResize=NONE`).

The candidate was repaired in place by loading each current font and converting all five visible text roles to native `textAutoResize=HEIGHT`.

Final text boxes:

- eyebrow `61:11`: `560×26 px`;
- hero `61:12`: `680×156 px`;
- couple `61:13`: `700×46 px`;
- message `61:14`: `480×72 px`;
- date caption `61:15`: `470×24 px`.

Final normal readback:

- visible native text: `5`;
- fixed-height visible text: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`.

## Long-name / long-message stress

QA-only proof `61:19` uses materially longer placeholders:

- `[非常に長い新郎のお名前] × [非常に長い新婦のお名前]`;
- a two-sentence, four-line Japanese welcome message.

Fresh screenshot review passed without photo/name/message collision or root overflow. Programmatic readback found outside visible text `0`; stress name and message are auto-height. The proof was hidden after verification.

## Three-scale visual state

### Thumbnail / 3-second scan

PASS as a composition candidate: first read remains `ようこそ、旅の一日へ。 → large photo field → names`. V4C has less generic empty space than V4B and a stronger single-photo silhouette.

### Reading scale

PASS as a placeholder candidate: Japanese hero, date/location, names and message remain distinct; no equal-card grid, center-stack, fake badge, UI control or redundant filler remains.

### Actual-size / print-detail

Final physical size is still not authoritative, so A2/A3 are scenario calculations only and production geometry remains `DEFERRED_FINALIZATION`.

For the `852×1200 px` working board:

**A3 portrait scenario (`297×420 mm`)**

- photo `720×440 px` ≈ `251.0×153.4 mm`;
- 4500×3000 source cropped to about `4500×2750 px` for FILL gives ≈ **455 ppi**;
- hero `64 px` ≈ **63.2 pt**;
- names `34 px` ≈ **33.6 pt**;
- message `22 px` ≈ **21.7 pt**;
- eyebrow `18 px` ≈ **17.8 pt**;
- date caption `16 px` ≈ **15.8 pt**.

**A2 portrait scenario (`420×594 mm`)**

- photo `720×440 px` ≈ `354.9×216.9 mm`;
- same source/crop gives ≈ **322 ppi**;
- hero `64 px` ≈ **89.4 pt**;
- names `34 px` ≈ **47.5 pt**;
- message `22 px` ≈ **30.7 pt**;
- eyebrow `18 px` ≈ **25.2 pt**;
- date caption `16 px` ≈ **22.4 pt**.

Thus the V4C landscape photo role is conditionally above the preferred 300 ppi threshold in both A3 and A2 scenarios using the already located source. Because final physical size and final crop are not yet authoritative, no production `RESOLUTION_WARNING` is asserted yet.

## Print-first / CMYK risk

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

Still deferred:

- authoritative A2/A3 (or other) final physical size;
- actual real-photo import and crop/focal-point proof in `61:7`;
- printer trim/bleed/safe template — no guessed 3 mm bleed was added;
- stand/easel/frame occlusion and viewing-distance proof;
- final paper stock;
- CMYK/profile proof for skin tones, yellow dress, white/highlights, blue sky/water, deep ink, coral, sand and warm paper;
- grayscale hierarchy proof;
- black construction for small text under the printer specification;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% or physical proof.

QR, punch, perforation, fold and handwriting fields are not applicable to this board.

## Decision

V4C is the current strongest **photo-geometry clean-room comparison** because it is materially more compatible with the known source composition and clears the earlier A2/A3 conditional-resolution risk without resorting to upscaling.

Do **not** claim `SELLABLE_VISUAL_QA_PASS` or promote V4C to final production until the real photograph can actually be rendered in `61:7` and compared at thumbnail / reading / actual-size scales. Current state remains `SELLABLE_VISUAL_QA_IN_PROGRESS / REAL_PHOTO_IMPORT_BLOCKED / NOT_PROMOTED / NOT_PRINT_READY`.
