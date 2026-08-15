# ADD-10 会場案内サイン — A5 Deeper Information Rhythm QA

Date: 2026-08-15
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A5_DEEPER_INFO_RHYTHM_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

This evidence supersedes the older A5-specific statement in `QA.md` that the A5 templates remained unchanged during the earlier A4-only polish. The A4 evidence remains valid; this file records the later A5-local production decision.

## Live authority

- latest observed `main` immediately before this evidence write: `44b25dcd63c61c289ccb78bfc662929b3514f96d`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- A5 production roots:
  - `2:35 / A5_LEFT_LAYOUT_TEMPLATE`
  - `2:46 / A5_RIGHT_LAYOUT_TEMPLATE`
  - `2:57 / A5_FORWARD_LAYOUT_TEMPLATE`
- Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- Drive parent: `0ADXt8irGMFGnUk9PVA`

## Visible problem

Fresh A5 actual-size review (`1400×990`) showed the three near-field variants still kept `INFO_BLOCK_AUTO` at `y=205`, ending around `y=401`, while the factual footer remained at `y=900`. The functional arrow fields were strong, but the information content clustered too high and left a very large lower ivory field that read closer to premium-by-emptiness than deliberate wayfinding rhythm.

This is a distinct A5 landscape issue. The earlier A4 solution was not copied by coordinates because A4 and A5 are independent reflows.

## Rollback-safe comparison

Live pre-test geometry:

- A5-left: info `9:93`, `x=430 / y=205 / 760×196`; seam `9:88`, `9×320`;
- A5-right: info `9:117`, `x=100 / y=205 / 760×196`; seam `9:112`, `9×320`;
- A5-forward: info `9:141`, `x=410 / y=205 / 760×196`; seam `9:136`, `9×320`.

A5-right was used first for a bounded comparison:

1. `27:2 / QA_ADD10_A5_RIGHT_DEEPER_INFO_ONLY_2026_08_15`
   - info `y 205 → 300` only.
2. `27:15 / QA_ADD10_A5_RIGHT_DEEPER_INFO_PLUS_BINDING_SEAM_2026_08_15`
   - info `y 205 → 300`;
   - seam `height 320 → 410`.

The deeper information rhythm materially reduced upper clustering. The seam-following version was selected because the rust seam continued to bind the upper kicker toward the relocated information block rather than ending as an isolated stripe.

The same A5-local geometry was then tested independently on:

- `28:2 / QA_ADD10_A5_LEFT_DEEPER_INFO_PLUS_BINDING_SEAM_2026_08_15`
- `28:15 / QA_ADD10_A5_FORWARD_DEEPER_INFO_PLUS_BINDING_SEAM_2026_08_15`

All comparison nodes were hidden after production promotion.

## Dynamic-copy revalidation

Because `INFO_BLOCK_AUTO` contains `textAutoResize=HEIGHT` semantic text inside native vertical auto-layout, the older A5 long-copy PASS was not reused after the spatial move.

New hidden stress proof:

- `28:28 / QA_ADD10_A5_DEEPER_INFO_LONG_COPY_STRESS_2026_08_15`
- info position: `y=300`
- production-width auto-layout retained
- stress information height: `196 → 366`
- stress bottom: `666`
- footer y: `900`
- remaining footer reserve: `234 px`
- native 1400×990 screenshot: no collision or clipping

The stress proof intentionally tests bounds/flow rather than final proof-metadata typography; it is not a production visual candidate.

This independently reapplies the already-verified NRSL-001 QA method: moving variable-height copy requires a new stress test at the new spatial position.

## Production promotion

Full hidden rollbacks were created before production mutation:

- `28:41 / ROLLBACK_A5_LEFT_LAYOUT_TEMPLATE_PRE_DEEPER_INFO_RHYTHM_2026_08_15`
- `28:54 / ROLLBACK_A5_RIGHT_LAYOUT_TEMPLATE_PRE_DEEPER_INFO_RHYTHM_2026_08_15`
- `28:67 / ROLLBACK_A5_FORWARD_LAYOUT_TEMPLATE_PRE_DEEPER_INFO_RHYTHM_2026_08_15`

Production root IDs were preserved.

Promoted geometry:

- A5-left `2:35`: info `9:93 y=300`; seam `9:88 height=410`;
- A5-right `2:46`: info `9:117 y=300`; seam `9:112 height=410`;
- A5-forward `2:57`: info `9:141 y=300`; seam `9:136 height=410`.

No arrow geometry, placeholder characters, type sizes, colors, footer facts, or physical frame sizes changed.

## Screenshot QA

Fresh post-promotion screenshots were reviewed on all three A5 variants at reading/actual-size equivalent (`990 px` render from native `1400×990`).

Result:

- left: PASS;
- right: PASS;
- forward: PASS.

The information block now participates in the middle of the landscape sheet rather than appearing attached to the top margin. Negative space remains controlled between content and footer rather than functioning as the main premium signal.

## Structure readback

All three production variants:

- size: `1400×990`;
- `clipsContent=true`;
- native text: `6`;
- visible text: `6`;
- IMAGE fills: `0`;
- outside visible text: `0`;
- `INFO_BLOCK_AUTO`: native vertical auto-layout, `primaryAxisSizingMode=AUTO`, `y=300`, production height `196`, bottom `496`;
- `ACCENT_EDGE`: height `410`;
- one functional editable arrow role remains intact;
- rollbacks remain hidden;
- no flattening/rasterization introduced.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The visible defect was spatial hierarchy in a functional wayfinding artifact. Generated imagery would compete with arrow recognition rather than solve the problem.

Drive metadata was freshly read before production write:

- folder ID: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`;
- parent: `0ADXt8irGMFGnUk9PVA`;
- Drive writes: `0`.

## Decision

`A5_DEEPER_INFO_RHYTHM_PASS + LONG_COPY_STRESS_PASS`.

ADD-10 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`. Final destination names, physical route directions, floor/room wording, installation points and 100% print proof remain deferred authoritative inputs.