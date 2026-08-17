# ADD-14 二次会案内 — Clean-room V3 Night Field QA

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A6_A5_LONG_COPY_STRESS_PASS / AUTO_HEIGHT_HARDENED / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Date: 2026-08-17

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
- auto-height rollback section: `41:2`

## Clean-room contract

V3 was built from new blank frames without duplicating or visually sampling legacy production or the earlier V2 study. Only current non-visual requirements were carried in: A6/A5 roles, venue/address, reception/start/end times, fee, access, RSVP/contact/notice semantics, QR optionality, and the SPEC concept `NIGHT CONNECTION / YOKOHAMA LATE DEPARTURE`.

No legacy production screenshot was opened until both V3 sizes and realistic long-copy stress had been repaired and structurally passed.

## V3 art direction

The selected direction uses a continuous deep-night field:

- full deep-navy paper field;
- warm ivory Japanese serif headline;
- one mint route axis carrying reception/start/end nodes;
- rust semantic labels only where they support scanning;
- venue/address as one native hierarchy block;
- lower access/fee/RSVP information is direct typography, not equal rounded cards;
- no shadows, gradients, fake neon, alcohol motifs, generic travel icons, or decorative English filler;
- no raster/image fills; all variable/factual copy remains native editable text.

## Structural repairs and long-copy QA

Earlier clean-room QA repaired clipped lower information, end-time trim overflow, venue/address collision, and equal-column failure under realistic copy. Final lower structure uses unequal semantic columns sized by content mass.

### 2026-08-17 auto-height hardening

A later live structure audit found a hidden robustness defect: multiple visible native text roles still used `textAutoResize=NONE` with a nominal `10px` box height even though screenshots rendered acceptably. This left the selected candidate vulnerable to clipping when copy/font metrics change and made the Figma structure inconsistent with the project's native-editability contract.

Before editing, A6/A5 and both stress roots were copied into hidden rollback section `41:2`. The affected text roles were changed from fixed-height to native `HEIGHT` auto-resize without changing copy, coordinates, typography, route geometry, or legacy production.

Examples:

- A6 headline `32:5`: `10px fixed → 54px auto-height`;
- A6 reception time `32:12`: `10px fixed → 26px auto-height`;
- A5 headline `32:31`: `10px fixed → 77px auto-height`;
- A5 reception time `32:38`: `10px fixed → 37px auto-height`;
- route labels and the corresponding stress-clone labels were hardened the same way.

Post-readback across `32:3 / 32:29 / 33:2 / 33:28`:

- remaining visible `textAutoResize=NONE` nodes with height <=12px: `0`;
- visible proof-language (`LAYOUT DUMMY / PROOF / TEMP / QA / EDITORIAL NOTE`): `0`;
- visible text outside root: `0`;
- IMAGE fills remain `0`;
- long-copy stress remains inside trim.

Fresh A6 and A5 screenshots after the repair preserve the selected hierarchy and route composition at native size.

## Three-scale visual QA

- whole / thumbnail: PASS; first read remains `二次会のご案内 → 夜のつづきへ。 → venue → time axis`;
- reading scale: PASS; time nodes and lower semantic roles stay distinct without UI-card segmentation;
- actual-size A6/A5: PASS after auto-height hardening;
- realistic long-copy stress: PASS.

## Legacy comparison

Legacy A6 `1:2` and A5 `1:18` were originally opened only after the V3/stress gate passed. V3 remains the selected clean-room candidate: its night-specific art direction and time-route hierarchy are materially different and stronger for the item role. Legacy production remains preserved unchanged.

## Hybrid authoring / asset decision

- native text: all variable/factual content;
- native vector: one route line and three route nodes;
- editable SVG: not required;
- generated/composed image: not required;
- image fills: `0`;
- Drive writes: `0`.

The current defect was native-text robustness, not missing imagery.

## Deferred / blocked input

Final adoption still requires authoritative event facts: whether a second party will actually be held, final venue/address/floor, reception/start/end times, access/travel time, fee/payment method, RSVP method/deadline, contact/notice policy, final QR destination if used, and vendor/physical print proof.

Until those exist, keep `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY` and do not invent final values.
