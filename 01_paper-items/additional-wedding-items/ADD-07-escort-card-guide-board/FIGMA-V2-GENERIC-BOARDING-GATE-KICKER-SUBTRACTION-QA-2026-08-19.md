# ADD-07 エスコートカード案内ボード — Generic BOARDING GATE Kicker Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `ad113c5904415cbc6e23a0bf773354a71eb6a79c`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- selected A2: `14:3 / CLEANROOM_ADD07_V2_SELECTED_A2_QUIET_DEPARTURE_ROUTE`
- selected A3: `14:25 / CLEANROOM_ADD07_V2_SELECTED_A3_INDEPENDENT_REFLOW`
- A2 long-copy proof: `15:4` (hidden after QA)
- A3 long-copy proof: `15:27` (hidden after QA)
- Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`

## Visible problem

The selected family had already removed duplicate English action labels, circular step markers and a redundant destination note. Fresh whole-item review showed one remaining airport-template signal at the top: `BOARDING GATE`.

The artifact is an escort-card instruction board, not an actual boarding gate. The Japanese title `エスコートカードをお取りください`, lead copy, route, and `01 → 02 → 03` steps already communicate the function and travel-theme motion. The English kicker therefore did not add operational meaning and made the otherwise Japanese-first print board read closer to a themed airport-interface template.

## Bounded comparison

Comparison candidates were created from the current selected clean-room family only:

- A2 `27:2 / QA_ADD07_A2_NO_GENERIC_BOARDING_GATE_2026-08-19`
- A3 `27:25 / QA_ADD07_A3_NO_GENERIC_BOARDING_GATE_2026-08-19`

Only the `BOARDING GATE` native text was hidden. No route, typography scale, Japanese copy, step numbering, terminal field, date/location, or long-copy structure changed.

Both comparisons were stronger at whole-item scale: the first read became Japanese title → lead → action route, while the navy terminal field retained enough travel/departure character without a fake operational label.

## Adoption / rollback

Pre-change rollback copies were created before selected/stress mutation:

- `27:48 / ROLLBACK_ADD07_PRE_BOARDING_GATE_SUBTRACTION_A2_SELECTED_2026-08-19`
- `27:71 / ...A3_SELECTED...`
- `27:94 / ...A2_STRESS...`
- `27:117 / ...A3_STRESS...`

Adopted hidden kicker nodes:

- A2 selected `14:12 / TXT_BOARDING_GATE_TITLE`
- A3 selected `14:34 / TXT_BOARDING_GATE_TITLE`
- A2 stress `15:13 / TXT_BOARDING_GATE_TITLE`
- A3 stress `15:36 / TXT_BOARDING_GATE_TITLE`

Comparison roots and rollback roots are hidden after adoption/QA.

## Three-scale QA

A2 selected:

- whole / 500–700px: PASS; Japanese title and route sequence become the immediate read;
- reading scale: PASS;
- large actual-size-equivalent render: PASS; removing the kicker does not create false emptiness because title/lead and the navy terminal field still anchor the upper composition.

A3 selected:

- whole / 700px: PASS; independent reflow remains balanced.

Long-copy:

- A2 stress was temporarily shown at large scale after adoption;
- long Japanese title/lead/action copy still fits the established route composition;
- outside visible text remains `0`;
- proof returned to hidden state after QA.

## Structure readback

After adoption:

- A2 selected: visible native text `10`, outside `0`, visible `BOARDING GATE` count `0`;
- A3 selected: visible native text `10`, outside `0`, visible `BOARDING GATE` count `0`;
- A2 stress: visible native text `10`, outside `0`, visible kicker `0`, hidden after QA;
- A3 stress: visible native text `10`, outside `0`, visible kicker `0`, hidden;
- IMAGE fills added: `0`;
- generated assets required: `0`;
- Drive writes: `0`.

## Decision

`ADOPTED`.

This is not a rule to remove all English artifact labels. English remains appropriate when it conveys authentic artifact type, brand, code, navigation or other unique semantics. Here the label was decorative transport-roleplay and duplicated no necessary information.

## Learning status

This independently applies the existing Japanese-first / generic-English-filler subtraction principle. No new shared-learning entry is required.
