# ADD-14 二次会案内 — Clean-room V2 Night Dispatch QA

Status: `CLEANROOM_V2_A5_STRUCTURAL_PASS / A5_LONG_COPY_STRESS_PASS / A6_LONG_COPY_VISUAL_FAIL / LEGACY_COMPARISON_MIXED / NO_PROMOTION / LEGACY_PRESERVED`
Date: 2026-08-17
Start authority SHA: `b2065f380a6c484061cd5fdf18ebcf1f0657a216`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `IygEr140Yqk12LsGL3TFrT`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- retained production: A6 `1:2`, A5 `1:18`
- clean-room page: `28:2 / CLEANROOM / ADD-14 / V2 NIGHT DISPATCH / 2026-08-17`
- V2 A6: `28:3`
- V2 A5: `28:28`
- hidden A6 stress: `30:2`
- hidden A5 stress: `30:112`

## Clean-room contract

The new V2 candidates were created on a new blank Figma page. No retained production frame, old layout group, ornamental vector, image crop, generated asset, badge, icon, rail, or decorative geometry was duplicated into the candidate.

Only non-visual requirements were carried forward: A6/A5 working dimensions, after-party guide information roles, safe/bleed intent, replaceable QR role, native editable text, and the rule that unresolved venue/time/fee/access/RSVP/contact facts stay explicit placeholders rather than invented facts.

Retained production was not visually opened for comparison until after the new V2 A5 candidate had been structured and stress-tested.

## V2 authoring split

- variable/factual content: native Figma text;
- unresolved facts: semantic native text + small separate `LAYOUT DUMMY` proof metadata;
- QR: empty replaceable role frame with native placeholder text, no fake/scannable QR;
- fixed decoration: simple functional rules only;
- raster/image assets: none;
- generated imagery: not required for this test;
- SVG: not required for this test.

## Visible direction

The clean-room direction is an open typographic dispatch sheet rather than a boxed UI. It uses a large Japanese headline, open time ledger, asymmetric access/response zones, and no rounded cards, pills, shadows, gradients, or stock travel icons.

## QA findings before legacy comparison

### Text-height repair

Initial V2 creation exposed a real Figma authoring defect: several native text nodes retained `10 px` fixed heights after width sizing, which visually clipped Japanese glyphs. The candidate was not treated as complete. Text roles were restored to `textAutoResize=HEIGHT` after width sizing, and proof metadata was repositioned below the true text bounds.

### Placeholder hierarchy repair

Long bracketed placeholder strings were visually noisy. They were split into:

- a readable semantic role such as `会場名`, `受付時刻`, `移動方法・所要時間`;
- a separate small muted `LAYOUT DUMMY` node.

No final venue, time, fee, address, response deadline, contact, or QR destination was invented.

### A6 long-copy result

The A6 stress clone remained inside the frame geometrically but visibly failed because long venue/access/fee/RSVP copy collided across fixed regions. This is recorded as `A6_LONG_COPY_VISUAL_FAIL`; no sellable or long-copy PASS is claimed for A6 V2.

### A5 long-copy repair and result

A5 variable regions were restructured into native vertical auto-layout stacks:

- `GROUP / VENUE STACK`
- `GROUP / ACCESS STACK`
- `GROUP / RESPONSE STACK`

The response stack was widened and raised after the first stress showed contact copy leaving trim. The rerun at `30:112` produced:

- 840×592 root;
- visible text outside root: `0`;
- venue stack stress height: `118 px`;
- access stack stress height: `160 px`;
- response stack: `y=365`, `h=197`, bottom `562 / 592`;
- long venue, address, three times, access, notice, fee, RSVP, and contact all remain visible without clipping.

A native screenshot of the final A5 stress confirms the repaired structure visually rather than relying on bounds alone.

## Legacy comparison

Only after the clean-room A5 candidate and its long-copy stress were complete, retained production A6 `1:2` and A5 `1:18` were opened for comparison.

Result: `LEGACY_COMPARISON_MIXED`.

- V2 A5 has a clear information-first dispatch rhythm and stronger dynamic-copy resilience after the auto-layout repair.
- retained production still has stronger artifact-level editorial identity and a more resolved first-glance composition.
- V2 therefore does **not** clearly beat retained production at the sellable visual gate.
- retained production is unchanged and preserved.

## Drive

Live Drive authority was read back before Figma work:

- folder ID: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- no raster/generated asset was needed;
- Drive write: `0`.

## Decision

Do not promote V2.

Keep:

- retained production untouched;
- V2 page as clean-room comparison evidence;
- A5 stress clone hidden;
- A6 stress clone hidden as a failure artifact.

A future ADD-14 clean-room direction should not continue this exact open-ledger grammar cosmetically. It should start from a fresh blank direction in a later uncontaminated run if another comparison is justified.
