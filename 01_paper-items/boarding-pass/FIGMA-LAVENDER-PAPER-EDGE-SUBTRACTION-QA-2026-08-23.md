# BOARDING PASS — Lavender Paper Edge Subtraction QA / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_UPDATED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main SHA before production write: `145e137af6600788964620aa43a17d34921d5360`

## Live authority

- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- Current front: `63:41 / CURRENT_SELECTED / BOARDING FRONT / BAGGAGE RIBBON`
- Current back: `63:72 / CURRENT_SELECTED / BOARDING BACK / RETURN LABEL` — unchanged
- front long-copy stress: `64:2`
- back long-copy stress: `64:33` — unchanged
- Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`
- Drive write: `0`

## Visible problem

The narrow lavender strip `FRONT / LAVENDER PAPER EDGE` sat above the diagonal apricot baggage-ribbon gesture without visibly touching a paper edge, fold, text role, perforation, stub, or trim boundary. Although its layer name described a paper edge, the rendered object behaved like a floating progress/status bar at whole-item scale.

The Current already has stronger and authentic physical-ticket cues:

- plum binding edge;
- genuine perforated detachable stub;
- lime date tab;
- large apricot baggage-ribbon movement;
- native guest/reception/table/ceremony/stub information.

## Bounded comparison

Created two rollback-safe comparisons that changed only lavender-strip visibility:

- normal Current comparison: `71:2 / QA / BOARDING FRONT / NO LAVENDER PAPER EDGE / 2026-08-23`
- realistic long-copy comparison: `71:33 / QA / BOARDING FRONT STRESS / NO LAVENDER PAPER EDGE / 2026-08-23`

No text, font, position, stub, perforation, date tab, ribbon, color system, or back-side design changed.

## Visual result

- whole / native `1200×550`: PASS; removal reduces a floating UI/progress-bar reading while preserving ticket physicality and departure energy;
- reading scale: PASS; headline → guest name → reception/table/ceremony → stub remains clear;
- actual/native detail: PASS; perforation and stub remain the dominant physical-artifact evidence;
- long-copy stress: PASS with the strip removed; two-line guest name, reception/table copy and final guide remain safe.

The subtraction clearly improved the specific defect and did not reduce item-specific functionality, so it was promoted to Current.

## Production change and rollback

Current front `63:41` and front stress `64:2` now hide only `FRONT / LAVENDER PAPER EDGE`.

Pre-change states are retained as hidden rollback:

- `72:2 / ROLLBACK / BOARDING FRONT / PRE-NO-LAVENDER-EDGE / 2026-08-23`
- `72:33 / ROLLBACK / BOARDING FRONT STRESS / PRE-NO-LAVENDER-EDGE / 2026-08-23`

Temporary QA comparisons `71:2 / 71:33` were hidden after verification.

The back Current `63:72` is unchanged.

## Hybrid / image decision

- variable/factual/emotional copy: native Figma text;
- perforation/stub/ribbon/date tab: simple native geometry with real artifact roles;
- floating lavender strip: hidden rather than replaced with another ornament;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- image generation: `0`.

Image generation was not relevant because the bottleneck was a detached fixed graphic, not missing photography, illustration or atmosphere.

## Learning state

`VERIFIED_LOCAL`.

This run re-applies the already verified binding-function method: a layer name or intended metaphor does not prove that the rendered element performs a physical function. A paper-edge/seam/tab/rail should visually attach to the artifact region it claims to describe; otherwise a bounded subtraction comparison is appropriate.

Do not generalize this into “remove paper edges” or “remove colored strips.” The plum binding, perforation, date tab and apricot ribbon remain because their artifact jobs are legible at whole-item scale.

## Result

`CURRENT_UPDATED / FLOATING_UI_BAR_READING_REDUCED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
