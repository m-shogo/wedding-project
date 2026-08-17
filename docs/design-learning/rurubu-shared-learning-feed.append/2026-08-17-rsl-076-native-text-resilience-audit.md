# RSL-076 — Screenshot PASS does not prove variable native-text resilience

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Date: 2026-08-17
Source scope: Rurubu WEDDING V6 only

## Visible / operational problem

AA/CW/CQ looked correct at whole, reading and actual-size screenshot scales, but a structural audit found multiple variable/factual native text roles still using `textAutoResize=NONE` fixed-height boxes.

This meant the chosen composition could look correct with current dummy text while remaining fragile when final Japanese copy or font metrics changed.

## Source learning tested

A neutral non-Rurubu shared-learning entry had already reproduced the same structural class across materially different print items. Because it was not a `PROMOTED_PROJECT_RULE`, Rurubu tested the method independently rather than assuming transfer.

Transferred capability only:

- structural `textAutoResize` audit;
- rollback-safe repair;
- realistic long-copy stress;
- collision/safe-area recheck.

No non-Rurubu layout, exact sizing, copy, colors, nodes or production conclusions were transferred.

## Root-cause hypothesis

Screenshot appearance and native editing geometry are separate truths. A fixed-height text box may render its current content acceptably while still clipping or colliding when the content changes.

Also, blindly converting every text node to auto-height is not correct: bounded display typography may have a valid text-fit contract, while related question/answer or title/copy pairs need a structural flow relationship when one expands.

## Bounded test

Rollback-safe clones:

- CW → CX `1601:2`;
- CQ → CY `1601:81`.

Repairs:

- six Profile values → native auto-height;
- Q04 question → native auto-height;
- Q04 question + answer → native vertical auto-layout stack;
- Story body → native auto-height;
- chronology deck → native auto-height;
- Event 01–06 dates/titles/copy → native auto-height;
- Event 01–06 title + copy → six native vertical auto-layout stacks.

A first test also made the decorative Profile pullquote unlimited auto-height. Realistic stress caused a collision, so that treatment was rejected and the pullquote returned to its explicit bounded display role.

## Expected improvement

- final personal copy can change without silent fixed-box clipping;
- longer Q04 wording pushes its answer instead of overlapping it;
- longer chronology titles push their event copy instead of overlapping it;
- current visual hierarchy remains unchanged;
- native editability becomes safer without rasterizing text.

## Regression risks

- auto-height can expand into absolutely positioned neighboring roles;
- bulk conversion could destroy intentional display typography;
- auto-layout stack insertion could alter the chosen editorial rhythm;
- stress copy can exceed the real intended role contract and create false negatives.

## Three-scale / structural evidence

Current-copy CX:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- Profile actual-size `794×1123`: PASS;
- Q&A actual-size `794×1123`: PASS;
- collisions `0`;
- 18px text safe-area risks `0`.

Current-copy CY:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- Story actual-size `794×1123`: PASS;
- chronology actual-size `794×1123`: PASS;
- collisions `0`;
- 18px text safe-area risks `0`.

First realistic-copy proof: `REJECTED` because collisions exposed missing structural relationships.

Second realistic-copy proof:

- Profile collisions `0`;
- Q&A collisions `0`;
- Story collisions `0`;
- chronology collisions `0`;
- 18px safe-area risks `0` on all four pages;
- actual-size screenshot evidence captured before proofs returned to hidden state.

Post-promotion audit across AA + CX/CY:

- audited affected variable/factual roles remaining fixed-height: `0`;
- active raster/image roles: `25`;
- image hashes changed: `0`.

## Figma / Drive / GitHub evidence

Figma:

- Outer AA `1592:2` unchanged;
- CX `1601:2` preferred;
- CY `1601:81` preferred;
- CW `1593:2` hidden rollback;
- CQ `1569:2` hidden rollback;
- first failed proofs preserved hidden;
- second-pass proofs preserved hidden;
- Start Here: `V5 FU/FX · V6 AA + CX/CY INSIDE STUDIES · V7 HOLD`.

Drive authority remains:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AA-CX-CY-NATIVE-TEXT-RESILIENCE-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/RURUBU-V6-AA-CX-CY-ACTIVE-ASSET-RECONCILIATION-2026-08-17.json`.

## Adopted / rejected / blocked status

Adopted:

- targeted auto-height for genuinely variable/factual copy;
- native vertical stacks where one variable text role must push another.

Rejected:

- unlimited auto-height for every native text role;
- unlimited expansion of the Profile display pullquote;
- isolated auto-height on Q04/event titles without downstream flow.

Blocked: none for this bounded repair.

## What must remain Rurubu-specific

Do not transfer:

- CX/CY node IDs;
- Rurubu headline scale;
- question/event positions;
- stack widths or spacing;
- chronology composition;
- exact stress wording;
- colors, photographs or decorative treatment.

## Cross-item applicability hypothesis

For another print artifact with editable native copy, independently audit structural text sizing even when screenshots look correct. Convert only roles that truly need variable height, encode dependent text relationships structurally, and rerun realistic long-copy collision/safe-area QA.

The general method appears portable; the exact visual contract is not.

## Next receiving-item experiment

On a materially different selected wedding print artifact, first classify native text roles as variable/factual versus bounded display typography. Test whether targeted auto-height + dependent-stack behavior improves editability without changing the intended design. Do not bulk-convert healthy fixed display text.