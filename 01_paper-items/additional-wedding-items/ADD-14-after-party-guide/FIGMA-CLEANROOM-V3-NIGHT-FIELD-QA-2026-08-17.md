# ADD-14 二次会案内 — Clean-room V3 Night Field QA

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `e92809ac9f7f43b92bab4397ff218f6c2b1e9def`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `IygEr140Yqk12LsGL3TFrT`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- retained legacy production: A6 `1:2`, A5 `1:18`
- clean-room page: `32:2 / CLEANROOM / ADD-14 / V3 NIGHT FIELD / 2026-08-17`
- V3 A6: `32:3`
- V3 A5: `32:29`
- hidden stress A6: `33:2`
- hidden stress A5: `33:28`

## Clean-room contract

V3 was built from new blank frames without duplicating or visually sampling legacy production or the earlier V2 study. Only current non-visual requirements were carried in: A6/A5 roles, venue/address, reception/start/end times, fee, access, RSVP/contact/notice semantics, QR optionality, and the SPEC concept `NIGHT CONNECTION / YOKOHAMA LATE DEPARTURE`.

No legacy production screenshot was opened until both V3 sizes and realistic long-copy stress had been repaired and structurally passed.

## V3 art direction

The new direction uses a continuous deep-night field rather than a cream page with a bounded side slab:

- full deep-navy paper field;
- warm ivory Japanese serif headline;
- one mint route axis carrying reception/start/end nodes;
- rust semantic labels only where they support scanning;
- venue/address as one native hierarchy block;
- lower access/fee/RSVP information is direct typography, not equal rounded cards;
- no shadows, gradients, fake neon, alcohol motifs, generic travel icons, or decorative English filler;
- no raster/image fills; all variable/factual copy remains native editable text;
- unresolved title and facts remain explicit `LAYOUT DUMMY` semantics.

## Visual QA and repairs before legacy comparison

Initial whole-item screenshots exposed real failures rather than receiving cosmetic polish:

1. lower access/fee/RSVP content was clipped below A6/A5 trim;
2. rightmost end-time text extended outside the root;
3. realistic long venue copy collided with the address;
4. long access and RSVP/contact copy did not fit the first equal three-column lower row.

The repair was structural:

- venue name + address moved into native vertical auto-layout `GROUP / VENUE STACK V3`;
- end-time label/value were moved inward from trim;
- lower information was rebuilt instead of micro-shifted;
- the first nested access + fee/RSVP experiment still failed under stress and was rejected;
- final lower structure uses three **unequal** horizontal semantic columns sized by content mass: wide access/notice, compact fee, compact RSVP/contact;
- A5 lower variable-copy typography was optically reduced only enough to keep the realistic stress inside trim.

This avoids equal admin-card logic while protecting actual variable-copy mass.

## Long-copy stress

Stress inputs included a long Yokohama venue name, full address, real-form time strings, multi-line walking/access instructions, fee/payment text, RSVP deadline, and an emergency contact placeholder.

Final structure readback:

### A6 `32:3`
- size: `592×420`
- visible native text: `17`
- IMAGE fills: `0`
- visible text outside root: `0`

### A5 `32:29`
- size: `840×592`
- visible native text: `17`
- IMAGE fills: `0`
- visible text outside root: `0`

### stress clones
- A6 `33:2`: visible text outside root `0`
- A5 `33:28`: visible text outside root `0`
- final screenshot review: no venue/address collision, no time/lower-grid collision, no clipped access/RSVP/contact text.
- both stress clones are retained hidden after verification.

## Three-scale visual QA

- whole / thumbnail: PASS; first read is `二次会のご案内 → 夜のつづきへ。 → venue → time axis`;
- reading scale: PASS; time nodes and the three lower semantic roles stay distinct without UI-card segmentation;
- actual-size A6/A5: PASS; dark-field typography remains readable and the mint route stays subordinate;
- realistic long-copy stress: PASS after structural repairs.

## Legacy comparison — only after V3 completion

Legacy A6 `1:2` and A5 `1:18` were opened only after the V3/stress gate passed.

Legacy remains refined and editorial, especially its cream negative space and Japanese headline. V3 is materially different rather than a restyle: it uses the current SPEC's late-night concept as the paper field itself, creates a clearer first-glance time route, and removes the older bounded-side-slab silhouette.

V3 is selected as the clean-room candidate because:

- the night-specific art direction is stronger and more item-specific;
- the route/time hierarchy reads faster at thumbnail scale;
- venue/access/fee/RSVP/contact semantics survive realistic long copy without turning into form cards;
- the composition does not depend on an optional/fake QR placeholder for balance.

Legacy production is preserved unchanged and remains rollback/reference evidence.

## Hybrid authoring / asset decision

- native text: all variable/factual content;
- native vector: one route line and three route nodes;
- editable SVG: not required;
- generated/composed image: not required;
- image fills: `0`;
- Drive writes: `0`.

The screenshot-supported defect was hierarchy and long-copy structure, not missing imagery.

## Deferred / blocked input

Final adoption still requires authoritative event facts:

- whether a second party will actually be held;
- final venue/address/floor;
- reception/start/end times;
- access and travel time;
- fee/payment method;
- RSVP method/deadline;
- contact/notice policy;
- final QR destination if QR is used;
- vendor proof / physical print check.

Until those exist, keep `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY` and do not invent final values.
