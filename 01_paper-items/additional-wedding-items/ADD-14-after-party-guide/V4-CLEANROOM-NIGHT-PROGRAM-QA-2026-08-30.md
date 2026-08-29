# ADD-14 After-party Guide — V4 Clean-room Night Program QA

Status: `V4_CLEANROOM / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_REUSED / A6_A5_REFLOW_PASS / LONG_COPY_STRESS_PASS / AUTO_LAYOUT_FACTS_PASS / NOT_PRINT_READY`
Date: 2026-08-30
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Observed latest `main` immediately before write: `7ce6e906a458b2f97e6ddbc30a4acda276316534`

## V4 exclusive provenance

This is non-Rurubu **V4 new production**. A6 and A5 were authored from blank frames. Retained production/V2/V3/vNext was not duplicated and was not used as construction material. Its facts, dimensions, unresolved-input boundaries and prior failure evidence were used only as non-visual authority/comparison.

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- page: `0:1 / ADD-14_PRODUCTION`
- V4 A6: `70:2 / V4 / ADD-14 / A6 / NIGHT PROGRAM POSTER / CLEANROOM`
- V4 A5: `70:14 / V4 / ADD-14 / A5 / NIGHT PROGRAM POSTER / CLEANROOM`
- hidden V4 long-copy stress: A6 `71:2`, A5 `71:14`
- exact Drive authority: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs / ADD-14_二次会案内`
- Drive writes: `0`

No venue, address, floor, reception/start/end time, fee, payment, RSVP method/deadline, contact rule or QR destination was fabricated. Those roles remain native bracketed placeholders until authoritative facts exist.

## V4 art direction — NIGHT PROGRAM POSTER

V4 deliberately avoids the retained `MIDNIGHT ZINE` visual grammar. It uses a late-night program-poster composition:

- deep plum as the large emotional field rather than cobalt;
- acid-lime print edge as a sharp first-scan register;
- warm-cream factual field separated from the hero field;
- hot-pink terminal crop used as print-poster counterweight rather than a badge/button;
- oversized Japanese title `夜のつづき、もう少し。` as the dominant emotional read;
- factual venue/time/fee/RSVP information grouped as editorial copy, never rounded UI cards or CTA buttons;
- no fake airline/gate/class/barcode semantics, no QR widget, no stock nightlife image, no generic AI background.

A6 and A5 are independent reflows rather than one scaled clone:

- A6 uses a vertical two-field split for fast handout reading;
- A5 uses a horizontal poster header and two lower factual columns.

Hybrid roles:

- variable/factual copy: native Figma text;
- fixed print fields / edges: native editable geometry;
- generated raster: `0`;
- replaceable image: `0`;
- IMAGE fills: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: unresolved venue/event facts make generated venue/nightlife imagery a truth risk, and the visual defect can be solved more strongly by editorial typography and composition.

## Screenshot correction loop

Initial A6/A5 screenshots passed the core hierarchy, but realistic long-copy stress exposed collisions between long venue and time copy on both sizes. Rather than shrink the text, V4 factual lanes were rebuilt as true vertical Auto Layout stacks.

Final stacks:

- A6 selected `71:27 / V4 / INFO STACK / FACTS`, 190 px wide;
- A5 selected `71:28 / VENUE TIME` and `71:29 / FEE RSVP NOTICE`;
- stress counterparts `71:30 / 71:31 / 71:32`.

After repair:

- A6 selected: outside text `0`, text-text overlap `0`, fixed-height text `0`, IMAGE fills `0`;
- A5 selected: outside text `0`, text-text overlap `0`, fixed-height text `0`, IMAGE fills `0`;
- A6 stress: outside text `0`, text-text overlap `0`, fixed-height text `0`, IMAGE fills `0`; stress fact stack height `339 px` inside 420 px canvas;
- A5 stress: outside text `0`, text-text overlap `0`, fixed-height text `0`, IMAGE fills `0`; left/right stress stacks remain inside the 592 px canvas.

## Three-scale / print-first QA

### A6

Working physical authority: **148×105 mm**, Figma `592×420 px` = `4 px/mm`.

Approximate actual-size type:

- hero title 46 px ≈ 32.6 pt;
- eyebrow 16 px ≈ 11.3 pt;
- sub 18 px ≈ 12.8 pt;
- date 15 px ≈ 10.6 pt;
- venue 20 px ≈ 14.2 pt;
- time 17 px ≈ 12.0 pt;
- fee 16 px ≈ 11.3 pt;
- RSVP 18 px ≈ 12.8 pt.

### A5

Working physical authority: **210×148 mm**, Figma `840×592 px` = `4 px/mm`.

- hero title 58 px ≈ 41.1 pt;
- eyebrow 20 px ≈ 14.2 pt;
- sub 20 px ≈ 14.2 pt;
- date 16 px ≈ 11.3 pt;
- venue 24 px ≈ 17.0 pt;
- time/fee 18 px ≈ 12.8 pt;
- RSVP 22 px ≈ 15.6 pt;
- notice 17 px ≈ 12.0 pt.

Three-scale result:

- thumbnail / 3-second scan: PASS — Japanese hero first, factual field second;
- reading scale: PASS — venue/time and fee/RSVP grouping remains obvious without UI-card treatment;
- actual-size: PASS for current placeholder hierarchy; final facts must be re-run through the same stress/actual-size gate.

No raster imagery exists, so effective PPI = `N/A`; `RESOLUTION_WARNING` = none.

## Print risks / deferred finalization

`DESIGN_COMPLETE != PRINT_READY`.

Still required before final print status:

- official decision that the after-party is held;
- final venue/address/floor/time/fee/payment/RSVP/contact facts;
- final QR destination if a QR is later required, followed by 100% scan proof and preserved quiet zone;
- final choice of A6/A5 deployment and physical placement/stand condition;
- printer template and confirmed trim/bleed/safe values;
- paper stock and venue-lighting proof;
- CMYK/output profile and black construction;
- PDF export, font embedding, transparency, overprint/knockout and preflight;
- 100% / physical proof.

No fold, punch, perforation, sticker or attachment geometry is currently authoritative and none was invented.

CMYK risk: deep plum can close in shadow, acid lime and hot pink will lose RGB brightness, and warm cream can shift/yellow. The hierarchy remains in grayscale through field mass, title scale, whitespace and column structure rather than hue alone.

## Result

`V4_CLEAR_VISUAL_WIN / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS_EVIDENCE_REUSED / THREE_SCALE_QA_PASS / A6_A5_REFLOW_PASS / LONG_COPY_STRESS_PASS / AUTO_LAYOUT_FACTS_PASS / EFFECTIVE_PPI_NA / RESOLUTION_WARNING_NONE / BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION / NOT_PRINT_READY`.

Retained production/V2/V3/vNext remains untouched for comparison/rollback.