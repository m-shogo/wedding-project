# ADD-14 二次会案内 — Figma Design QA

Date: 2026-08-22
Status: `CURRENT / PROFESSIONAL_VNEXT_MIDNIGHT_ZINE_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_REFLOW_PASS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_LINEBREAK_PASS / STRUCTURE_READBACK_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- latest main immediately before this sync: `7864803f61d80229a44308b165b8a28d1d1103d4`
- Figma production file key: `IygEr140Yqk12LsGL3TFrT`
- Current selected page: `59:2 / VNEXT_CANDIDATE / ADD-14 / MIDNIGHT ZINE / 2026-08-22`
- Current A6: `59:3 / VNEXT_SELECTED_CANDIDATE / ADD14 / A6 / MIDNIGHT ZINE`
- Current A5: `59:15 / VNEXT_SELECTED_CANDIDATE / ADD14 / A5 / MIDNIGHT ZINE`
- realistic long-copy stress: A6 `59:27`, A5 `59:39`
- retained prior Current: A6 `56:3`, A5 `56:18` / `VELVET LETTER` — history/rollback only
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- canonical item QA: `01_paper-items/additional-wedding-items/ADD-14-after-party-guide/QA.md`
- canonical promotion evidence: `01_paper-items/additional-wedding-items/ADD-14-after-party-guide/PROFESSIONAL-VNEXT-MIDNIGHT-ZINE-PROMOTION-QA-2026-08-22.md`

## Current art-direction result

The earlier `VELVET LETTER` remained structurally healthy but a fresh live screenshot audit found that its large pale letter field and visible sage RSVP rectangle were too quiet/form-like for the current after-party role. The RSVP treatment read like a web/form control at whole-item scale, and the overall object no longer carried enough energy for the current `travel / pop / fun / excitement` brief.

A new clean-room pass was therefore created from blank frames. No old ADD-14 layout, sleeve, QR box, colored field, decorative node or crop was used as construction material.

Three materially different studies were created on `58:2`:

1. `58:3 / AFTER HOURS BROADSIDE` — rejected because the cyan RSVP field still read too much like a UI callout.
2. `58:14 / MIDNIGHT ZINE` — selected and matured.
3. `58:25 / LATE NIGHT WRISTBAND` — rejected because it converged toward transport/ticket artifact grammar already present elsewhere in the suite.

## MIDNIGHT ZINE

First read: `まだ帰らない、夜のつづきへ。`

The selected direction uses:

- cobalt editorial side column;
- large Japanese display typography as the emotional carrier;
- warm-cream information field;
- hot-pink print edge and yellow terminal edge;
- deep-ink footer with date and RSVP as typography rather than a button;
- restrained `AFTER PARTY` identity with no fake flight/gate/class/barcode semantics;
- no QR widget, rounded CTA button, gradient, shadow or stock nightlife imagery.

A5 is an independent reflow rather than a scaled A6 clone.

## Screenshot QA / correction loop

Current A6 `59:3`:
- whole-item/thumbnail: PASS;
- reading: PASS;
- actual `592×420`: PASS.

Current A5 `59:15`:
- whole-item/thumbnail: PASS;
- reading: PASS;
- actual `840×592`: PASS;
- independent reflow: PASS.

Long-copy proofs `59:27 / 59:39` caught real failures before selection:

- long venue text initially entered the access lane;
- A6 detail copy ended too close to the footer field;
- A5 RSVP split `締切` across lines.

The repair widened/repositioned native copy lanes rather than shrinking typography blindly. Final A6/A5 long-copy screenshots PASS, including the promoted Japanese semantic-linebreak gate.

## Structure readback

A6 selected `59:3`:
- native visible text `7`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`.

A5 selected `59:15`:
- native visible text `7`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`.

A6/A5 stress `59:27 / 59:39`:
- fixed-height text `0 / 0`;
- outside visible text `0 / 0`;
- IMAGE fills `0 / 0`.

Responsibility split:
- variable/factual/emotional copy: native editable text;
- fixed print fields: simple native geometry;
- SVG `0`;
- generated/composed raster `0`;
- replaceable image role `0`.

## Professional Design Council

`94 / 100 / PASS / NO VETO`.

The new candidate clearly wins the current professional brief over retained `VELVET LETTER`; prior production remains preserved as history/rollback.

## Image / Drive decision

Image generation: `0`.

The diagnosed defect was event-poster energy and UI-like RSVP containment, not missing photography/illustration. Because venue/event facts remain unresolved, generated venue imagery would also reduce factual truth.

Drive authority was revalidated live as `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`. Drive write: `0`.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Do not fabricate:
- whether the after-party is held;
- official venue/address/floor;
- reception/start/end;
- fee/payment method;
- access/travel time;
- RSVP method/deadline;
- contact/notice policy;
- final QR destination if used.

Still deferred:
- printer template/profile;
- bleed/safe-area/export settings;
- physical A6/A5 proof under venue lighting;
- final content insertion and final PDF/export.

These block finalization, not the Current visual selection.

## Current result

`PROFESSIONAL_VNEXT_MIDNIGHT_ZINE_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_REFLOW_PASS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_LINEBREAK_PASS / STRUCTURE_READBACK_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`.

ADD-15 remains blocked on its explicit `Model A / Model B / NOT_REQUIRED` decision and must not be guessed.
