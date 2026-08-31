# ADD-14 Figma V4 — AFTERGLOW LETTER QA — 2026-08-31

Status: `V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_REFLOW_PASS / FRONT_BACK_STRUCTURE_PASS / LONG_COPY_STRESS_PASS / PRINT_GEOMETRY_APPLIED / STRUCTURE_READBACK_PASS / CLEANROOM_PROVENANCE_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

## Live authority

- run-start latest `main`: `955b8d7ee856437fbe500be2baba37f3c114f6cd`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
- item QA before this pass: `PROFESSIONAL_VNEXT_MIDNIGHT_ZINE_SELECTED`
- item SPEC: `01_paper-items/additional-wedding-items/ADD-14-after-party-guide/SPEC.md`
- Figma file: `IygEr140Yqk12LsGL3TFrT`
- Drive authority: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`
- Drive writes: `0`

## V4 exclusive clean-room provenance

V4 was created on a brand-new blank Figma page and did not duplicate or restyle the retained VNEXT/V3/legacy frames.

- V4 page: `72:2 / V4 / ADD-14 / AFTERGLOW LETTER / 2026-08-31`
- A6 front trim: `72:3`
- A5 front trim: `72:15`
- A6 back trim: `75:2`
- A5 back trim: `75:12`
- A6 front bleed parent: `75:22`
- A5 front bleed parent: `75:24`
- A6 back bleed parent: `75:26`
- A5 back bleed parent: `75:28`
- front long-copy stress: `73:2 / 73:14` (hidden)
- back long-copy stress: `76:2 / 76:12` (hidden)

Retained VNEXT `MIDNIGHT ZINE` (`59:2`, selected `59:3 / 59:15`) remains untouched as comparison/rollback history.

## Reference-led visual intent

Item-specific authority from SPEC was prioritized over Rurubu or prior production grammar:

- concept: `NIGHT CONNECTION / YOKOHAMA LATE DEPARTURE`
- deep navy + warm ivory with limited mint / silver;
- time/place/movement remain reader-facing information priorities;
- decoration is limited to a night-route line and destination node;
- no neon-sign, alcohol, excessive stars, rounded-card UI, fake transport credentials, barcode, or stock nightlife imagery.

V4 direction: `AFTERGLOW LETTER`.

The front uses a deep-night side field, oversized Japanese serif hero `もう少し、夜を。`, warm paper information surface, one mint destination node and one silver route mark. The back separates access / fee / RSVP / contact / notice so unresolved facts are not forced into a cramped front face.

This is materially different from the retained VNEXT's cobalt side-column + hot-pink edge + dark footer composition.

## Authoring roles

- variable/factual/emotional copy: native Figma text;
- long variable copy grouping: native vertical Auto Layout (`INFO STACK`, `BACK INFO STACK`);
- reusable/fixed flat graphic: native editable vector/shape geometry;
- generated/composed raster: `0`;
- replaceable image roles: `0`;
- IMAGE fills: `0`;
- variable copy baked into raster/SVG: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the current bottleneck was item-specific typography, information grouping and production geometry, not missing imagery.

## Print-first geometry

SPEC confirms:

- primary: A6 `148 × 105 mm`;
- alternate: A5 `210 × 148 mm`;
- bleed: `3 mm` each edge;
- safe: `7 mm` inside trim;
- QR only if an official final URL is later confirmed.

Figma uses 4 px/mm for the trim frames:

- A6 trim `592 × 420 px`;
- A6 bleed parent `616 × 444 px`;
- A5 trim `840 × 592 px`;
- A5 bleed parent `864 × 616 px`;
- hidden safe guides: 28 px (= 7 mm) inside trim.

All visible native text on A6/A5 front/back passed the 7 mm safe-area readback.

## Actual-size typography / line QA

At 4 px/mm, 1 Figma px ≈ 0.7087 pt.

- A6 front: min `13 px ≈ 9.2 pt`, hero `54 px ≈ 38.3 pt`.
- A5 front: min `17 px ≈ 12.0 pt`, hero `74 px ≈ 52.4 pt`.
- A6 back: min `12 px ≈ 8.5 pt`, title `18 px ≈ 12.8 pt`.
- A5 back: min `17.03 px ≈ 12.1 pt`, title `25.54 px ≈ 18.1 pt`.
- A6 silver route: `4 px ≈ 1.0 mm` on back; front route mark is thicker (`7 px ≈ 1.75 mm`).

No extreme microtype or hairline dependency remains in the current geometry.

## Structural / long-copy QA

A defect was caught during this pass: the first V4 draft text nodes visually rendered but were internally fixed-height at 10 px. They were repaired to true `textAutoResize=HEIGHT` before promotion.

Front variable content was then placed in native vertical Auto Layout so venue/time/RSVP copy reflows instead of overlapping.

Final readback:

- A6 front `72:3`: native text `8`, fixed-height `0`, 7mm-safe violations `0`, IMAGE fills `0`.
- A5 front `72:15`: native text `8`, fixed-height `0`, 7mm-safe violations `0`, IMAGE fills `0`.
- A6 back `75:2`: native text `6`, fixed-height `0`, 7mm-safe violations `0`, IMAGE fills `0`.
- A5 back `75:12`: native text `6`, fixed-height `0`, 7mm-safe violations `0`, IMAGE fills `0`.
- front long-copy `73:2 / 73:14`: fixed-height `0`, 7mm-safe violations `0`.
- back long-copy `76:2 / 76:12`: fixed-height `0`, 7mm-safe violations `0`.

Long-copy stress uses unresolved semantic placeholders, not fabricated real venue/time/fee/contact facts.

## Three-scale QA

- thumbnail / 3-second scan: PASS — the hero `もう少し、夜を。` and night-route node establish the after-party object before the detail copy;
- reading scale: PASS — venue/time/RSVP and back-side logistics group clearly without UI-card treatment;
- actual-size / print-detail: PASS for typography, 7mm safe, rule thickness and editability.

A6 front/back live screenshots were captured after final color/spec alignment. A5 was independently reflowed rather than scaled as a raster copy.

## Effective PPI / resolution

- raster IMAGE fills: `0`
- effective PPI: `N/A`
- `RESOLUTION_WARNING=NONE`

## CMYK / print risks

Still requires production proof:

- deep navy may close up or lose shadow separation after CMYK conversion;
- muted mint can gray down depending on stock/profile;
- silver-gray must retain enough contrast against warm ivory and navy;
- warm ivory must be evaluated against actual stock white;
- small black body text must use printer-appropriate black construction; do not assume rich black for microtype;
- grayscale proof must preserve hero → core info → logistical details hierarchy.

## Physical applicability

- fold: not required by current SPEC;
- punch: not required;
- perforation: not required;
- binding: not required;
- handwriting area: not required;
- QR: not present in V4; if later required, official final URL + quiet zone + 100% scan proof are mandatory;
- stand/easel/holder occlusion: still deferred until actual installation hardware is known.

## BLOCKED_REQUIRED_INPUT

Do not fabricate:

- whether the after-party will actually be held;
- official venue/address/floor;
- reception/start/end time;
- fee/payment method;
- access/travel time;
- RSVP method/deadline;
- contact/notice policy;
- final QR destination if used.

## DESIGN_COMPLETE != PRINT_READY

V4 has sellable visual + placeholder structure evidence, but remains `NOT_PRINT_READY` until final content, printer profile/template confirmation, stock, CMYK/grayscale proof, black construction, font/embed, transparency, overprint/knockout, PDF export/preflight, duplex registration if both sides are used, stand/holder handling, and 100%/physical proof are completed.
