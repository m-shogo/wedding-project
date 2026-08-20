# NRSL — Programmatic Auto Layout sizing order can silently clip dynamic content

Date: 2026-08-21
Source scope: non-Rurubu
State: `VERIFIED_LOCAL`
Source item: ADD-11 写真共有 / QR案内

## Visible problem

Long-copy stress initially looked repaired after variable text was grouped into vertical Auto Layout containers, but the next screenshot showed nearly all instruction/footer copy clipped to thin horizontal slivers.

## Root cause

The programmatic sequence created the frame, set `primaryAxisSizingMode='AUTO'`, then called `resize(width, 10)`.

The final `resize()` left the container as:

- `primaryAxisSizingMode=FIXED`;
- height `10px`;
- `clipsContent=true`.

Children themselves remained correctly laid out and auto-height, but the parent clipped them.

Failure fingerprint:

`AUTO_LAYOUT_HUG_RESET_BY_POST_RESIZE`

## Bounded test / repair

On ADD-11 selected + stress A5/A4 containers:

1. preserve the intended container width;
2. call `resize(width, temporaryHeight)` first;
3. set `clipsContent=false` for semantic-flow containers;
4. set `primaryAxisSizingMode='AUTO'` after the final resize;
5. read back real container height;
6. rerun screenshots and long-copy stress.

Verified final stress geometry:

- A5 instruction group: height `182`, bottom `742`;
- A5 footer group: height `156`, bottom `1081`;
- A4 instruction group: height `276`, bottom `996`;
- A4 footer group: height `180`, bottom `1470`.

The fixed lagoon accents retain `73px` A5 and `84px` A4 clearance after dynamic instruction expansion.

## Expected improvement

Programmatic Figma authoring can safely use native Auto Layout for variable semantic copy without false 10px clipping, and long-copy stress reflects the actual paper geometry rather than a broken container.

## Regression risk

Do not generalize to every frame:

- visual crop/mask frames may intentionally clip;
- fixed-height physical zones can legitimately remain FIXED;
- horizontal layout requires separate width/hug logic;
- always read back the final sizing modes after mutation.

## Three-scale evidence

After repair:

- A5/A4 whole-item selected screenshots: PASS;
- actual-size A5/A4: PASS;
- realistic long-copy stress A5/A4: PASS;
- outside visible text: `0`;
- semantic text remains native/editable;
- IMAGE fills: `0`.

## What must remain item-specific

Do not transfer ADD-11 palette, QR position, typography, NIGHT ALBUM composition or accent shapes. Only the programmatic Auto Layout construction/QA method transfers.

## Cross-item applicability

`CROSS_ITEM_CANDIDATE`: on the next item that uses programmatically authored Auto Layout for variable text, verify sizing mode after the last `resize()` call. Promote only if independently reproduced or prevented there.
