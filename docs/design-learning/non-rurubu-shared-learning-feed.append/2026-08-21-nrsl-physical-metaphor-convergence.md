# Non-Rurubu shared-learning append — 2026-08-21

## NRSL — Physical-object metaphors can themselves converge into a family template

State: `VERIFIED_CROSS_ITEM`
Failure fingerprint: `F-NRSL-PHYSICAL-METAPHOR-CONVERGENCE`

### Visible problem

The promoted family-scale rule successfully pushed several non-Rurubu artifacts away from repeated coral/lagoon/yellow rounded sweeps and generic abstract color-field composition. A new higher-order repetition then became visible: even when every item becomes a plausible “real paper object,” unrelated artifacts can converge on the same successful metaphor—book cover, envelope/letter, luggage label, ribbon, etc.—and recreate template sameness one level above palette and primitive shape.

This has now been independently reproduced in two materially different item pairs:

1. WEDDING PASSPORT vs ADD-09 Guest Book Sign — both converged on warm-paper stitched-left-binding / book-cover grammar.
2. the later suite vs ADD-11 Photo Share Sign — multiple unrelated items had accumulated letter/envelope/paper-insert grammar, while ADD-11’s prior `PHOTO LAB ENVELOPE` also used an envelope/photo-paper insert as its dominant object.

Each source design was individually strong. The defect became obvious only at family scale.

### Root-cause hypothesis

`FAMILY_SCALE_TEMPLATE_REPETITION` can recur above color and geometry. If an AI/designer learns that “physical artifact realism” is desirable, it may repeatedly select one attractive physical metaphor even when that metaphor is not the most specific representation of the receiving item's actual user action.

The corrective question is therefore not merely:

> Is this metaphor physical and plausible?

It is:

> Is this physical behavior most specific to this item's actual function/user action, or is it a successful design strategy being reused because it worked elsewhere?

### Local verification 1 — ADD-09 Guest Book Sign

Old Current remained preserved. Three blank-frame directions were authored using only Guest Book sign facts/semantics:

- `41:3 / PEN TRAY WELCOME`;
- `41:23 / OPEN REGISTER SHEET`;
- `41:40 / DESK BLOTTER POSTER`.

`PEN TRAY WELCOME` was selected and separately rebuilt at `41:56`.

Instead of representing the **book**, the new direction represents the **act of writing at the guest-book table**:

- open cream sign field;
- hospitality-green desk field;
- simple pen-rest gesture;
- native Japanese writing guidance;
- no stitched left binding.

A real long-copy failure was also caught: operational copy intruded toward the fixed desk field. A first nested-Auto-Layout repair clipped multiline text, so the method switched to direct auto-height text children in a single vertical stack. Final stress stack bottom `1086`, desk starts `1135`, leaving `49 px` reserve.

Result:

- current `41:56 / PEN TRAY WELCOME`;
- three-scale screenshot QA PASS;
- realistic stress `41:76` PASS;
- native text `12`;
- fixed-height `0`;
- outside `0`;
- text collisions `0`;
- IMAGE fills `0`;
- council `91/100`, family fit `5/5`;
- prior `38:43 / CLOTHBOUND ARRIVAL LOG` retained.

Git evidence:

- `01_paper-items/additional-wedding-items/ADD-09-guest-book-sign/FAMILY-DIVERSITY-PEN-TRAY-PROMOTION-QA-2026-08-21.md`;
- `f3509282b9b5c0522c1341e3d4db6f0f4bb81f5d`;
- Current sync `af430ff54397abe0a4cc4313587ece4d1121869a`.

Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4`; writes `0`.

### Cross-item verification 2 — ADD-11 Photo Share / QR Sign

ADD-11 independently reproduced the same higher-order convergence under a different visual family. Its prior `PHOTO LAB ENVELOPE` was a valid `92/100` design but had only `3/5` family-fit in its own council record. As the suite evolved, multiple unrelated items accumulated letter/envelope/paper-insert grammar, so ADD-11's envelope metaphor became less item-specific even though it still looked good alone.

The receiving-item test did **not** copy ADD-09's pen/desk solution. It returned to ADD-11's actual function: people contribute photos and later revisit the accumulated images.

Three new blank-frame studies were authored in Figma file `PWQ5ygJJt0IlOqj5ri5jng`:

- `51:3 / CONTINUOUS PROOF STRIP` — rejected after screenshot exposed Japanese semantic-linebreak and hierarchy failure;
- `51:32 / DARKROOM DEVELOPING TRAY` — selected;
- `51:44 / PRINT ARCHIVE TAPE` — rejected for system/UI-panel reading.

Mature Current:

- Current page `53:34 / CURRENT_SELECTED / ADD-11 / DARKROOM DEVELOPING TRAY / 2026-08-22`;
- A5 `52:2`;
- A4 independent reflow `53:2`;
- hidden realistic stress `52:18 / 53:18`.

The new metaphor represents **photo processing / developing**, not an envelope:

- darkroom environment;
- black developing tray;
- one developing print sheet;
- safelight/process edges;
- native Japanese headline and operational copy;
- independent QR paper role.

Real stress QA also reproduced the now-promoted Japanese semantic-linebreak issue: structurally valid overlong bracket placeholders broke as `案 / 内` and `注意事 / 項`. The test contract was corrected to realistic semantic placeholder phrases, copy lanes were widened without type shrink, and A5/A4 re-screened successfully.

A bounded application of the already-verified QR quiet-zone/container-subtraction method removed only the visible QR-paper stroke while preserving the white physical paper role and geometry, reducing widget/UI reading.

Final ADD-11 result:

- A5/A4 selected + stress: native text `8` each;
- fixed-height `0`;
- outside text `0`;
- IMAGE fills `0`;
- A5/A4 three-scale screenshot QA PASS;
- realistic Japanese semantic stress PASS;
- council `93/100`, family fit `5/5`;
- prior PHOTO LAB ENVELOPE `49:39 / 49:74` retained untouched.

Git evidence:

- `01_paper-items/additional-wedding-items/ADD-11-photo-share-qr-sign/PROFESSIONAL-VNEXT-DARKROOM-DEVELOPING-TRAY-QA-2026-08-22.md`;
- promotion evidence commit `9d7418b19213cca55731062e8c64d75ca86929ff`;
- Current QA sync `dc1eebbafccb1db4547e5cf66a252362b9930789`.

Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`; writes `0`.

### Verified cross-item principle

During suite/family audit, inspect not only palette, shape, motion, hierarchy and typography, but also:

1. **dominant physical metaphor**;
2. **actual user action / functional behavior represented by that metaphor**.

When unrelated selected items look like the same booklet, letter/envelope, luggage tag, ribbon, clipboard, photo strip or similar object:

- keep the metaphor on the item with the stronger semantic/physical claim;
- on the weaker claimant, independently test a grammar derived from its actual user action;
- promote only if whole/reading/actual-size + realistic-copy QA show a clear improvement;
- retain the old design when a different metaphor reduces warmth, usability or print credibility.

### Regression risk

Do **not** turn this into a ban on shared paper-object vocabulary. Overcorrection can turn the suite into a random portfolio. Book, envelope, tag, fold, ribbon or photo metaphors are valid wherever function genuinely supports them. Repetition alone is not a defect when the shared physical behavior is actually required.

This is a family-scale **judgment/QA method**, not a visual-style rule.

### What must remain item-specific

Do not transfer:

- ADD-09's green/cream/terracotta palette, pen geometry or desk composition;
- ADD-11's darkroom palette, tray angle, safelight/process edges, headline or QR position;
- Passport's book construction;
- any literal layout or object treatment between items.

Only the diagnostic question and clean-room receiving-item method transfer.

### Next receiving-item experiment

On the next suite-level audit, inspect any selected artifact whose dominant object metaphor duplicates another Current. First establish which item has the stronger functional claim. If the weaker item can derive a more specific metaphor from its actual user action, test that from a blank frame. If not, retain the current design rather than forcing novelty.
