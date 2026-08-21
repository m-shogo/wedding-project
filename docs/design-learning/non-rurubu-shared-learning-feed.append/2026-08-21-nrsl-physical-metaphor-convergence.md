# Non-Rurubu shared-learning append — 2026-08-21

## NRSL — Physical-object metaphors can themselves converge into a family template

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Failure fingerprint: `F-NRSL-PHYSICAL-METAPHOR-CONVERGENCE`

### Visible problem

The promoted family-scale rule successfully pushed several non-Rurubu artifacts away from repeated coral/lagoon/yellow rounded sweeps and generic abstract color-field composition. A new higher-order repetition then became visible in a live suite thumbnail audit: WEDDING PASSPORT and ADD-09 Guest Book Sign both converged on a warm-paper **stitched left binding / book-cover** grammar despite being different physical artifacts.

Both were individually strong. The issue emerged only when the selected suite was compared as a family.

### Evidence before change

WEDDING PASSPORT Current:

- Figma `UbK8KmuWJcDeGScsN49Uor`;
- front `181:52 / FIELD JOURNAL`;
- warm paper + stitched left binding + small artifact label/tab + large Japanese headline;
- booklet/keepsake role makes the binding metaphor semantically credible.

ADD-09 prior Current:

- Figma `PjFWBpDwaQM5LfvgdqSFvU`;
- `38:43 / CLOTHBOUND ARRIVAL LOG`;
- warm paper + cobalt stitched left spine + small top label/tab + large two-line Japanese headline;
- Guest Book **sign** role does not require the sign itself to imitate a bound-book cover.

### Root-cause hypothesis

`FAMILY_SCALE_TEMPLATE_REPETITION` can recur one level above palette and primitive shape. If every item is told to become a “real physical object,” an AI/designer can still default repeatedly to the same attractive metaphor—booklet, folded letter, luggage label, ribbon, etc.—and create a new reskinned family template.

The corrective question is therefore not only “is this metaphor physical?” but also:

**Is this the physical behavior most specific to this item's actual user action, or merely a successful metaphor reused because it worked elsewhere?**

### Bounded test — ADD-09

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

### Real failure encountered during the test

Long-copy stress initially pushed operational information toward the fixed desk field and visually occluded closing/date copy.

A first repair using nested Auto Layout role frames was rejected because multiline native text was clipped by overly constrained wrapper geometry.

Method switch:

- direct auto-height text children in one vertical Auto Layout stack;
- explicit spacers for rhythm;
- closing/date participate in the same dynamic stack.

Final stress stack bottom `1086`, fixed desk starts `1135`, leaving `49 px` reserve.

### Result

ADD-09 new Current:

- `41:56 / PEN TRAY WELCOME`;
- three-scale screenshot QA: PASS;
- realistic long-copy stress `41:76`: PASS;
- visible native text `12`;
- fixed-height text `0`;
- outside text `0`;
- text collisions `0`;
- IMAGE fills `0`;
- Professional Design Council `91/100`;
- family-fit category `5/5`;
- prior `38:43 / CLOTHBOUND ARRIVAL LOG` retained hidden.

Git evidence:

- `01_paper-items/additional-wedding-items/ADD-09-guest-book-sign/FAMILY-DIVERSITY-PEN-TRAY-PROMOTION-QA-2026-08-21.md`;
- promotion commit `f3509282b9b5c0522c1341e3d4db6f0f4bb81f5d`;
- Current QA sync `af430ff54397abe0a4cc4313587ece4d1121869a`.

Drive authority `1D259ugx13El0JYxvn8yyskIjc2c2liF4` was live-confirmed; Drive writes `0`.

### Expected improvement

Preserve the benefits of physical-artifact thinking while preventing a new generation of template sameness based on repeatedly successful object metaphors.

### Regression risk

Overcorrecting can turn the suite into a random portfolio. Do not ban booklet, fold, tag, ribbon or ledger metaphors. Keep them when they are the most semantically authentic physical behavior of the item. The receiving item should change only when another selected artifact already owns that metaphor more naturally and the repetition is clearly visible at family scale.

### What must remain item-specific

Do not transfer ADD-09's green/cream/terracotta palette, pen geometry, desk field, headline or exact layout. Do not alter Passport merely because both once used book grammar; Passport's booklet identity remains legitimate.

### Cross-item applicability hypothesis

During family-scale audit, compare not only palette/shape/motion but also **dominant physical metaphor and user action**. If unrelated artifacts both look like the same booklet, envelope, luggage tag, ribbon, clipboard, photo strip, or other object, keep that metaphor on the item with the stronger semantic claim and independently test an action-specific grammar on the weaker claimant.

### Next receiving-item experiment

Audit the next selected non-Rurubu artifact only after its local function is understood. If its dominant physical metaphor duplicates another Current, ask whether that metaphor represents its actual user action or is merely a reused successful design strategy. Do not redesign if the shared metaphor is genuinely required by function.