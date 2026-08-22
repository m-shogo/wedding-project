# ADD-12 新郎新婦クイズカード — Floating Top Ticket Subtraction QA

Date: 2026-08-23
State: `VERIFIED_LOCAL / CURRENT_ADOPTED / ROLLBACK_SAFE`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main observed before Figma mutation: `43cc527f6cae9034fb2e97f1fd6d2417a412dee4`

## Scope

Current ADD-12 front only. No legacy/V3 visual construction was used as an authoring source. This was a bounded Current-quality audit after the Professional vNext family-diverse design had already passed its major clean-room gate.

Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
Drive authority verified live: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
Drive write: `0`
Image generation: `0`

## Visible problem

Current front `59:54 / ANSWER PUNCH CARD` retained a mustard rectangle at the top-right (`59:64 / DECOR / TOP TICKET`, 134×72). At whole-item scale it did not bind information, reserve a tear/fold/scan region, carry reader-facing copy, or participate in the left punched binding. It therefore read as a floating template accent rather than a functional game-paper cue.

The useful physical-object grammar was already carried by the full-height dark punched binding edge. The mustard block duplicated “ticket-ness” without a job.

## Bounded test

Created a rollback-safe comparison from the current front:

- `64:2 / QA / ADD-12 / FRONT / NO FLOATING TOP TICKET / 2026-08-23`
- only `DECOR / TOP TICKET` was hidden;
- question number, Japanese title, A–D choices, colored answer rules, date, binding/punches and all semantic copy were unchanged.

Whole-item comparison showed a clearer reading path:

`COUPLE QUIZ → 01 + Japanese headline → [設問] → A–D → guidance/date`

without losing the physical punch-card identity.

## Promotion / rollback

Before changing Current:

- current rollback: `64:32 / ROLLBACK / ADD-12 / FRONT / PRE-TOP-TICKET-SUBTRACTION / 2026-08-23`
- stress rollback: `64:62 / ROLLBACK / ADD-12 / FRONT STRESS / PRE-TOP-TICKET-SUBTRACTION / 2026-08-23`

Adopted mutation:

- Current `59:64 / DECOR / TOP TICKET` → hidden
- long-copy stress `59:109 / DECOR / TOP TICKET` → hidden
- comparison `64:2` retained hidden as evidence

Back `59:84` was not changed. Its blue `AFTER THE QUIZ` tab carries actual reader-facing artifact identity and remains functional.

## Three-scale result

- whole / ~500–800px: PASS — front is calmer and the punch-card binding becomes the single dominant physical cue;
- reading: PASS — Japanese headline and answer hierarchy are unchanged;
- actual native `620×875`: PASS — no print-density or information-loss regression.

## Structure / editability

No semantic text, Auto Layout answer structure, image role, raster/vector asset, or variable copy was changed.

- native variable/factual copy remains editable;
- answer roles remain equal weight;
- fixed-height text contract unchanged;
- IMAGE fills remain `0`;
- long-copy proof retains the same content geometry with the same subtraction.

## Learning state

`VERIFIED_LOCAL` application of the existing binding-function/subtraction method: a small fixed element should remain only when it proves a reader-facing, physical-production, or binding role at whole-item scale.

Do not transfer “remove top tabs” as a style rule. A tab with a genuine label, fold, perforation, index, score, tear or binding job may be correct in another artifact.

## Result

`CURRENT_ADOPTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS MAINTAINED / NOT_PRINT_READY`
