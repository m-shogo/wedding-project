# ADD-06 Figma Initial Production QA — 2026-08-07

Authority: GitHub `main`
Write-preflight main SHA: `bd68c40101942cc39edd9d394c57865d4cecd9a6`

## Scope

ADD-06 フォトブースサイン。RURUBU / るるぶ領域は read/write していない。

## Live authority cross-check

- GitHub SPEC: A3 portrait primary, A4 portrait editorial reflow comparison, 3 mm bleed, 12 mm+ safe area, 1.5–3 m viewing-distance target.
- Drive production folder live readback: `ADD-06_フォトブースサイン`, folder ID `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`.
- No production raster is required at this stage; native Figma text/vector remains authoritative.

## Figma production authority

- File: `Wedding Paper ADD 06 Photo Booth Sign`
- File key: `SVMALDUyhc2chxHa4fvdjx`
- Page: `ADD-06_PHOTO_BOOTH_SIGN`
- A3 production: `FRAME_ADD06_A3_PORTRAIT` / `1:2`
- A4 reflow comparison: `FRAME_ADD06_A4_REFLOW_COMPARE` / `1:12`
- Rollback proof: `QA_ADD06_ROLLBACK_PROOF` / `1:22`

## Actual design change

Created a quiet photo-spot venue sign that uses heading scale and negative space as the primary composition. The layout intentionally avoids equal card UI, boarding-pass structure, passport decoration, repeated badges, gradients, and shadows. Decoration is restricted to one edge: one route-like vertical rule, one mint endpoint, and one small blue sparkle mark.

Editable text remains native:

- `PHOTO SPOT`
- `Capture a memory from our special journey.`
- `[PHOTO BOOTH NOTE · LAYOUT DUMMY]`
- `2026.10.24`
- `[LOCATION · LAYOUT DUMMY]`

No people, guests, family members, dog, venue fact, hashtag, or QR destination was fabricated.

## Screenshot QA

A3 whole-item screenshot captured at the natural `990 × 1400` working canvas. Readback confirmed:

- heading dominates at viewing scale;
- central hero space remains intentionally empty and usable as a photo-area sign rather than a poster packed with content;
- decoration stays on one edge and does not compete with the heading;
- dummy note and location are visibly subordinate and replaceable;
- no repeated card pattern or AI-style decorative density appeared.

## Structure QA

A3 `1:2`:

- size `990 × 1400`;
- 5 native editable text nodes;
- hidden `GUIDE_SAFE` retained;
- visible overflow: 0.

A4 reflow `1:12`:

- size `700 × 990`;
- 5 native editable text nodes;
- hidden `GUIDE_SAFE` retained;
- visible overflow: 0.

Rollback proof `1:22` preserves the A3 production structure separately.

## Drive changes

None. No concrete raster defect or need was found.

## Status

`FIGMA_INITIAL_PRODUCTION_CREATED / WHOLE_ITEM_SCREENSHOT_QA_PASS / STRUCTURE_QA_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / PLACEHOLDERS_EXPLICIT / NOT_PRINT_READY`

Do not stop on final location wording or physical print checks. A final evidence-driven reading/detail pass may promote this to `DESIGN_QA_PASS_WITH_PLACEHOLDERS`; then advance to ADD-07.

## DEFERRED_FINALIZATION

- final photo-booth note wording;
- final location wording;
- final A3/A4 installation choice;
- venue lighting / 1.5–3 m physical readability check;
- printer bleed/template/profile;
- 100% physical print proof.
