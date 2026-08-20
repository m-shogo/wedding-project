# NRSL append — Physical writing/drawing roles need substrate/contrast QA

Date: 2026-08-21
Owner: non-Rurubu Figma quality task
State: `VERIFIED_CROSS_ITEM`
Failure fingerprint: `SEMANTIC_WRITING_ZONE_PRINT_CONTRAST_FAILURE`

## Source 1 — ADD-16 parent-gift message card

### Visible problem

The professional vNext back had a structurally valid invisible semantic handwriting area (`240×145`) with no overflow/collision, but actual native screenshot review showed that the physical printed surface beneath it was dark navy/coral. A normal dark pen could therefore be difficult or impossible to read even though the Figma role itself was geometrically correct.

### Root cause

The QA model checked semantic geometry and visible-box subtraction, but did not independently check the physical substrate/contrast of the future handwriting action.

### Bounded correction

A borderless warm-cream organic paper field (`300×190`) was added behind the independent semantic handwriting area. No printed helper label or form-like rectangle was added. The selected and stress backs were re-rendered at native size.

Result: `VERIFIED_LOCAL` in ADD-16.

Evidence:
- Figma `ylmVBbwNcnjueYrymNpa3c`
- selected back `45:42`
- handwriting semantic role `45:52`
- physical paper field `49:2`
- stress `45:63 / 45:73 / 49:3`
- item evidence `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/PROFESSIONAL-VNEXT-HOMEWARD-JOURNEY-QA-2026-08-21.md`
- Git `5cb0a63b98f6cd0c475f5e35962ff0c3c2d4887b`

## Cross-item verification — ADD-17 children mini-card

ADD-17 independently exercises two materially different physical input modes: drawing and handwriting. Its vNext was authored from blank frames under a separate child-activity concept.

The selected front uses a large warm-cream drawing surface `620×600` inside the travel-window composition. The selected back uses a large white writing surface `820×560` plus a secondary light sketch surface `240×240`. These physical surfaces were inspected in actual screenshot QA rather than treating empty semantic geometry as sufficient.

Long-copy corrections changed surrounding typography/spacing without sacrificing the light physical activity surfaces. Selected/stress structural readback remained fixed-height text `0`, outside `0`, collisions `0`, IMAGE fills `0`.

Result: the method independently reproduces in a child drawing/writing artifact, so the lesson advances to `VERIFIED_CROSS_ITEM`.

Evidence:
- Figma `PAvkRggJiRuXVypi3RgZCN`
- selected front/back `48:2 / 48:13`
- drawing surface `48:6`
- writing surface `48:20`
- optional sketch `48:22`
- stress `48:26 / 48:37`
- item evidence `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/PROFESSIONAL-VNEXT-WINDOW-SEAT-QA-2026-08-21.md`
- Git `a37099289dcaa4e599339a0e204dcd422e0bd6d0`

## Transferable rule

When a printed wedding artifact contains a handwriting, drawing, stamp, signature or other real-world mark-making role, do not stop at:
- semantic geometry exists;
- border/UI box is removed;
- no overflow/collision exists.

Also verify the **actual printed mark-making surface**:
- light/dark contrast for likely pen/pencil/crayon media;
- enough uninterrupted usable area;
- no dominant texture/color field that reduces legibility;
- no decoration that makes the role physically awkward;
- screenshot review at actual-size/print scale.

The physical surface may be open/borderless; it does not need a UI-like box. The requirement is usability, not containment.

## Regression risk

Do not convert every open paper area into a white card or ellipse. The exact surface shape, color, size, visual treatment and medium expectation remain item-specific. A writing area on naturally light paper may need no additional field at all.

## What must NOT transfer

Do not transfer:
- ADD-16 cream ellipse geometry or afterglow palette;
- ADD-17 window-seat layout, circles, colors or child-facing copy;
- exact dimensions across artifacts.

Transfer only the physical mark-making-surface QA method and failure fingerprint.