# Non-Rurubu shared-learning append — 2026-08-21

## NRSL — Physical-object metaphors can themselves converge into a family template

State: `PROMOTED_PROJECT_RULE`
Failure fingerprint: `F-NRSL-PHYSICAL-METAPHOR-CONVERGENCE`
Promoted: 2026-08-22 after independent verification in WEDDING PASSPORT/ADD-09, ADD-11, and ADD-16.

### Visible problem

The promoted family-scale rule successfully pushed several non-Rurubu artifacts away from repeated coral/lagoon/yellow rounded sweeps and generic abstract color-field composition. A new higher-order repetition then became visible: even when every item becomes a plausible “real paper object,” unrelated artifacts can converge on the same successful metaphor—book cover, envelope/letter, luggage label, ribbon, etc.—and recreate template sameness one level above palette and primitive shape.

This has now been independently reproduced across three materially different receiving situations:

1. WEDDING PASSPORT vs ADD-09 Guest Book Sign — both converged on warm-paper stitched-left-binding / book-cover grammar.
2. the later suite vs ADD-11 Photo Share Sign — multiple unrelated items had accumulated letter/envelope/paper-insert grammar, while ADD-11’s prior `PHOTO LAB ENVELOPE` also used an envelope/photo-paper insert as its dominant object.
3. ADD-16 Parent Gift Message Card — its individually strong `RETURN LETTER HOME` duplicated the suite's now-common letter/envelope grammar even though the item's stronger semantic claim is tactile home/upbringing/keepsake rather than sending a letter.

Each source design was individually strong. The defect became obvious only at family scale.

### Root-cause explanation

`FAMILY_SCALE_TEMPLATE_REPETITION` can recur above color and geometry. If an AI/designer learns that “physical artifact realism” is desirable, it may repeatedly select one attractive physical metaphor even when that metaphor is not the most specific representation of the receiving item's actual user action or emotional function.

The corrective question is therefore not merely:

> Is this metaphor physical and plausible?

It is:

> Is this physical behavior most specific to this item's actual function/user action/emotional role, or is it a successful design strategy being reused because it worked elsewhere?

## Verification 1 — ADD-09 Guest Book Sign

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

## Verification 2 — ADD-11 Photo Share / QR Sign

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

Real stress QA also reproduced the promoted Japanese semantic-linebreak issue: structurally valid overlong bracket placeholders broke as `案 / 内` and `注意事 / 項`. The test contract was corrected to realistic semantic placeholder phrases, copy lanes were widened without type shrink, and A5/A4 re-screened successfully.

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

## Verification 3 — ADD-16 Parent Gift Message Card

ADD-16 provided the third independent receiving-item test. Its prior `RETURN LETTER HOME` was already `92/100`, structurally strong and emotionally appropriate in isolation. The issue was not local ugliness: at family scale it repeated the letter/envelope/paper-insert construction already successful elsewhere.

The receiving-item test returned to ADD-16's emotional/physical role: a parent gift is a tactile keepsake that carries upbringing/home into the couple's next life stage.

Three blank-frame directions were created in Figma file `ylmVBbwNcnjueYrymNpa3c`:

- `56:3 / THANK-YOU BROADSIDE` — rejected after screenshot exposed unstable oversized date wrap/crop and weaker tactile specificity;
- `56:14 / HOME TEXTILE MAT` — selected;
- `56:28 / MEMORY ARCHIVE SLIP` — rejected as too archive/museum-like and emotionally cool.

Mature Current:

- page `57:2 / CURRENT_SELECTED / ADD-16 / HOME TEXTILE MAT / 2026-08-22`;
- front `57:3`;
- back `57:17`;
- hidden realistic stress `57:36 / 57:50`;
- previous `RETURN LETTER HOME` retained at `54:2 / 54:3 / 54:15` as history.

The new metaphor uses **home textile / selvage / weave** rather than another letter:

- forest selvage;
- warm oat paper;
- rust/saffron weave bands;
- thread-like vertical gesture;
- native Japanese gratitude/message roles;
- open writing surface on the reverse.

Real long-copy QA caught a Japanese semantic line-break failure and fixed signature collision. The repair moved display/body/signature into a fixed-height vertical Auto Layout stack with native auto-height text and a flexible spacer. A first Figma write failed before mutation because the font was not loaded; after explicit font loading, the bounded repair succeeded. Back-stress guide/signature lanes were also separated without type shrink.

Final result:

- selected + stress roots: native visible text `5` each;
- fixed-height `0`;
- outside `0`;
- text collisions `0`;
- IMAGE fills `0`;
- selected/stress screenshot QA PASS;
- council `93/100`, family fit `5/5`;
- Drive authority `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`, writes `0`.

Git evidence:

- `01_paper-items/additional-wedding-items/ADD-16-parent-gift-message-card/PROFESSIONAL-VNEXT-HOME-TEXTILE-MAT-FAMILY-DIVERSITY-QA-2026-08-22.md`;
- promotion `1d6122ab156db0c123b11968fea25b7823c91cde`;
- Current sync `de6fe4f44216b19de829fed238f81754ddd87bcd`.

## Promoted project rule

During suite/family audit, inspect not only palette, shape, motion, hierarchy and typography, but also:

1. **dominant physical metaphor**;
2. **actual user action / functional behavior / emotional role represented by that metaphor**.

When unrelated selected items look like the same booklet, letter/envelope, luggage tag, ribbon, clipboard, photo strip or similar object:

- establish which item has the stronger semantic/physical claim to that metaphor;
- do **not** ban the metaphor globally;
- on the weaker claimant, independently test a blank-frame grammar derived from its actual user action or emotional/physical role;
- compare only after the new candidate is mature;
- promote only if whole/reading/actual-size + realistic-copy QA show a clear improvement;
- retain the old design when a different metaphor reduces warmth, usability, physical plausibility or print credibility.

This is now a project-wide default QA/judgment method because the benefit has been independently verified in at least three materially different contexts.

### Regression risk

Do **not** turn this into a ban on shared paper-object vocabulary. Overcorrection can turn the suite into a random portfolio. Book, envelope, tag, fold, ribbon, photo, textile or other physical metaphors remain valid wherever function genuinely supports them. Repetition alone is not a defect when the shared physical behavior is actually required.

### What must remain item-specific

Do not transfer:

- ADD-09's green/cream/terracotta palette, pen geometry or desk composition;
- ADD-11's darkroom palette, tray angle, safelight/process edges, headline or QR position;
- ADD-16's forest/oat/rust/saffron textile language, weave geometry or wording;
- Passport's book construction;
- any literal layout or object treatment between items.

Only the diagnostic question, clean-room receiving-item method and mature-comparison gate transfer.

### Next receiving-item experiment

Apply this rule in future suite audits only when a screenshot-visible duplicate metaphor exists. If the item's metaphor is already the strongest functional claimant, preserve it and move on rather than manufacturing novelty.
