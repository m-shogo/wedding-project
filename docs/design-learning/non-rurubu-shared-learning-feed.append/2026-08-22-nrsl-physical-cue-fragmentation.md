# NRSL — Physical cue fragmentation / 2026-08-22

Source scope/item: non-Rurubu / ADD-09 Guest Book Sign

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A fixed visual cue intended to communicate one real writing object was rendered as spatially detached primitives: a terracotta rounded bar and a mustard triangular tip. At whole-item scale the bar could read as a generic pill/capsule and the tip as unrelated decoration, weakening the item-specific `writing desk` metaphor.

## Root-cause hypothesis

A semantically meaningful fixed-art object can become generic AI/template decoration when its parts do not resolve as one object at whole-item scale, even when every primitive is geometrically valid and structurally editable.

The failure is not `native geometry is bad`; it is that the final gestalt no longer matches the intended physical cue.

## Bounded test

Source Figma: `PjFWBpDwaQM5LfvgdqSFvU`.

Current: `41:56 / PEN TRAY WELCOME`.

A rollback-safe comparison was created at `45:2`.

Attempt 1 kept a triangular nib but remained optically detached: REJECTED.

Method switch:

- one parent assembly;
- mustard cap;
- terracotta body;
- attached dark nib;
- one shared rotation.

The connected version was promoted only after native screenshot review.

Hidden rollbacks before promotion:

- `46:2 / PRE-CONNECTED-PEN-REPAIR`
- `46:34 / PRE-CONNECTED-PEN-REPAIR / LONG COPY`

## Three-scale / structure evidence

Whole-item/native screenshot after repair: PASS. The cue reads as one marker/pen object and remains subordinate to the writing instruction.

Reading/actual working canvas `1000×1419`: PASS.

Long-copy stress: PASS after temporarily showing `41:76`; dynamic copy still ends above the fixed desk zone.

Current/stress readback:

- visible native text `12` each;
- fixed-height text `0`;
- outside text `0`;
- text collisions `0`;
- IMAGE fills `0`;
- connected pen assembly `1` each.

Exact Drive authority read back live: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`; Drive write `0`.

Item evidence: `01_paper-items/additional-wedding-items/ADD-09-guest-book-sign/FIGMA-CONNECTED-PEN-CUE-QA-2026-08-22.md`.

Item evidence commit: `ff4dc7e65781744f8de0e70f8bdb40cc4ef9ad20`.

## Expected improvement

Keep artifact-specific cues legible as the real action/object they are meant to evoke, so physical metaphor does not collapse back into generic rounded decoration.

## Regression risk

Do not literalize every decorative mark into an icon/object. Some abstract graphics are intentionally abstract and may be stronger that way. This check applies when the fixed cue has a real semantic job in the item concept.

## What must remain item-specific

Do not transfer ADD-09's pen shape, colors, angle, desk field, guest-book copy, proportions or placement to another item.

## Cross-item applicability hypothesis

On another materially different item whose fixed art is supposed to depict a real physical cue (pen, ribbon, perforation, hanging card, photo strip, arrow, fold, etc.), inspect the whole-item screenshot for gestalt integrity. If the cue reads as disconnected generic primitives rather than the intended object/action, test one rollback-safe repair that improves object-level coherence without turning the page into illustrative clip-art.

## Next receiving-item experiment

Use this only when a future live screenshot exposes an actual fragmented semantic cue. Do not proactively redraw healthy fixed art merely to reproduce the lesson.
