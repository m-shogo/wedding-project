# ADD-14 二次会案内 — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / A6_A5_LONG_COPY_STRESS_PASS / A6_ACTUAL_SIZE_READABILITY_HARDENED / AUTO_HEIGHT_HARDENED / LEGACY_PRESERVED / BLOCKED_REQUIRED_INPUT / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The legacy A6/A5 production previously described here is retained comparison / rollback history only for the reopened clean-room program. The current selected design is clean-room V3 Night Field.

Canonical evidence:

- `FIGMA-CLEANROOM-V3-NIGHT-FIELD-QA-2026-08-17.md`
- `A6-ACTUAL-SIZE-READABILITY-HARDENING-2026-08-18.md`
- later guest-copy / proof-language and auto-height hardening evidence retained in the ADD-14 item history.

Live authority:

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- clean-room page: `32:2 / CLEANROOM / ADD-14 / V3 NIGHT FIELD / 2026-08-17`
- selected A6: `32:3`
- selected A5: `32:29`
- hidden long-copy A6: `33:2`
- hidden long-copy A5: `33:28`
- auto-height rollback: `41:2`
- A6 pre-readability rollback: `44:2`
- A6 stress pre-readability rollback: `44:29`
- retained legacy production: A6 `1:2`, A5 `1:18` — comparison/history only
- Drive folder: `ADD-14_二次会案内 / 1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`

## Current visual direction

V3 is a night-specific, materially independent clean-room direction:

- continuous deep-navy paper field;
- warm ivory Japanese headline `夜のつづきへ。`;
- one mint route axis carrying reception / start / end;
- venue/address as a direct native hierarchy block;
- lower access / fee / RSVP/contact information as direct typography rather than equal UI cards;
- no gradients, fake neon, alcohol motifs, travel icons, decorative English filler or generated/raster decoration.

Fresh 2026-08-18 A6 whole-item screenshot reconfirmed the intended read: `二次会のご案内 → 夜のつづきへ。 → 会場 → 時刻 → lower practical information`.

## Structure / long-copy QA

Selected A6/A5 and hidden stress roots preserve native editable text and no image fills. Earlier clean-room repairs addressed:

- clipped lower information;
- end-time trim overflow;
- venue/address collision;
- equal-column failure under realistic copy;
- hidden fixed-height native-text boxes.

Current post-hardening readback evidence for `32:3 / 32:29 / 33:2 / 33:28`:

- remaining visible `textAutoResize=NONE` nodes with nominal <=12px height: `0`;
- visible proof-language: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`;
- realistic long-copy stress: `PASS`.

### A6 actual-size readability hardening — 2026-08-18

Fresh native A6 review found that `TXT_ACCESS / TXT_FEE / TXT_RSVP_DEADLINE` were only `9 px / 14`, which read as microcopy relative to the physical A6 working size.

A rollback-safe 11 px test first exposed long-copy overflow, so the solution was not to shrink the type again. The A6 lower information area was rebalanced by expected text mass:

- practical body copy: `9 px / 14` → `11 px / 16`;
- lower grid y: `338` → `330`;
- access width: `260` → `220`;
- fee width: `110` → `120`;
- RSVP/contact width: `110` → `140`;
- existing 20 px gaps preserved.

Selected A6 now ends the lower grid at `385 / 420`. Realistic stress `33:2` ends at `417 / 420`, with visible text outside root `0`. Native `592×420` screenshot review confirms improved practical-copy readability without weakening the headline/time hierarchy.

The lower information architecture intentionally uses unequal semantic widths because access, fee and RSVP/contact have different expected text mass.

## Legacy preservation

Legacy A6 `1:2` and A5 `1:18` remain untouched. They were compared only after V3 and realistic stress had passed. Do not use them as the current selected editing target.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The item-specific strength comes from typography, night field and route hierarchy; current blockers are factual/finalization inputs, not missing imagery. Drive metadata was live-read on 2026-08-18 and matched `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`. Drive writes: `0`.

## BLOCKED_REQUIRED_INPUT

Final adoption still requires authoritative facts:

- whether a second party will actually be held; otherwise `NOT_REQUIRED`;
- official venue / address / floor;
- reception / start / end times;
- fee / payment method;
- access / travel time;
- RSVP method / deadline;
- contact / notice policy;
- final QR destination if used.

Do not invent any of these.

## DEFERRED_FINALIZATION

Printer template/profile, exact bleed/safe area, QR device scan proof if used, and 100% A6/A5 physical print proof remain deferred.

## Result

- clean-room independence: `PASS`
- sellable visual: `PASS`
- A6/A5 long-copy resilience: `PASS`
- A6 actual-size practical-copy readability: `PASS`
- native semantic editability: `PASS`
- auto-height hardening: `PASS`
- legacy preservation: `PASS`
- Drive authority: `PASS`
- event facts: `BLOCKED_REQUIRED_INPUT`
- print readiness: `NO`
