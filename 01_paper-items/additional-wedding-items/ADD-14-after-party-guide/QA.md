# ADD-14 二次会案内 — QA

Status: `CURRENT / PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Professional quality authority: `docs/design-learning/PROFESSIONAL-DESIGN-COUNCIL-VNEXT-2026-08-20.md`

## Current selected authority

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- selected page: `52:2 / SELECTED / VNEXT PRO / ADD-14 / MOONLIT RENDEZVOUS / 2026-08-21`
- selected A6: `52:3 / VNEXT_SELECTED_CANDIDATE / ADD14 / A6 / MOONLIT RENDEZVOUS`
- selected A5: `52:20 / VNEXT_SELECTED_CANDIDATE / ADD14 / A5 / MOONLIT RENDEZVOUS`
- hidden long-copy A6/A5: `52:38 / 52:55`
- three-direction concept page: `51:2`
- retained prior clean-room V3: `32:2 / 32:3 / 32:29` — comparison/rollback/history only
- retained legacy: `1:2 / 1:18` — comparison/rollback/history only
- Drive folder: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`

Canonical evidence:
- `PROFESSIONAL-VNEXT-MOONLIT-RENDEZVOUS-QA-2026-08-21.md`

Drive metadata was re-read live. Drive write: `0`.

## Clean-room vNext

The professional vNext was authored from blank frames without using retained V3/legacy visual construction, route axis, old decoration, crops or assets as a visual source. Only verified A6/A5 dimensions, semantic fields, unresolved-fact boundary, print/readability constraints and optional independent QR role were carried forward.

Three new directions:
- `51:3 / MOONLIT RENDEZVOUS` — selected;
- `51:16 / LATE DEPARTURE` — energetic but too close to generic dark event-poster territory;
- `51:30 / CITY GLOW POSTCARD` — bright and clear but less intimate/after-hours.

## Current visual direction

### A6 `52:3`
- warm cream invitation field + deep-ocean practical field;
- Japanese-first `夜のつづきへ、もうひと旅。`;
- coral moon and low mint night-wind gesture;
- venue/address/access/notice separated from reception/start/end/fee/RSVP;
- no route-stepper dots, fake neon, alcohol motifs, barcode/airline credentials or equal UI cards.

### A5 `52:20`
- independent reflow rather than scaled A6;
- warm upper editorial field + deep-ocean lower practical band;
- venue/access in the upper field; time/fee/RSVP/contact in the lower field;
- same afterglow family without reproducing the A6 split-column geometry.

All event facts remain explicit native placeholders and are not fabricated.

## Screenshot / stress refinements

Live QA found and corrected:

1. A5 selected title wrapped into the status line; title was resized/reflowed before selection.
2. Initial structural readback found all `50` new native text nodes as fixed-height because sizing occurred after the auto-height mode was set. Auto-height was re-applied after sizing across selected/stress roots.
3. With true auto-height geometry active, A5 long-copy stress exposed a venue-name/address collision that had not been reliable before geometry hardening. Address spacing was corrected and re-screened.

Final visual result:
- A6 native `592×420`: PASS;
- A5 native `840×592`: PASS;
- A6 long-copy native stress: PASS;
- A5 long-copy stress after repair: PASS.

## Structure QA

Final readback:
- selected A6: visible text `12`, IMAGE fills `0`, outside text `0`, collisions `0`, fixed-height text `0`;
- selected A5: visible text `13`, IMAGE `0`, outside `0`, collisions `0`, fixed-height `0`;
- stress A6: visible text `12`, IMAGE `0`, outside `0`, collisions `0`, fixed-height `0`;
- stress A5: visible text `13`, IMAGE `0`, outside `0`, collisions `0`, fixed-height `0`.

Optional QR remains only as an invisible independent `AREA_AFTER_PARTY_QR_REPLACEABLE` role and does not imply QR use is confirmed.

Generated/composed raster `0`; replaceable image fill `0`; person imagery `0`.

## Mature comparison / professional gate

Retained V3 was opened only after the vNext candidate passed visual, stress and structural QA. V3 remains strong functionally but reads as a dark information sheet centered around a time axis. The vNext is more inviting and more aligned with the current joyful night-flight/afterglow brief while preserving practical hierarchy.

Professional Design Council: `91/100`.

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`: the quality gap was night-event emotional amplitude and hierarchy, not missing photography. Since venue/event facts are not confirmed, generated venue imagery/maps/QR-like content would be misleading.

## BLOCKED_REQUIRED_INPUT

Final production still requires:
- whether the after-party is actually held; otherwise `NOT_REQUIRED`;
- official venue/address/floor;
- reception/start/end times;
- fee/payment method;
- access/travel time;
- RSVP method/deadline;
- contact/notice policy;
- final QR destination if used.

Do not invent these facts.

## DEFERRED_FINALIZATION

- printer template/profile;
- exact bleed/safe-area/export settings;
- QR scan proof if used;
- 100% A6/A5 physical print proof.

## Result

`PROFESSIONAL_VNEXT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

Next progression target: `ADD-15`, subject to latest authority and product-model status.
