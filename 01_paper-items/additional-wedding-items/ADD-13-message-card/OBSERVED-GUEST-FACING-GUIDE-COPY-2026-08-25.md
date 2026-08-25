# ADD-13 Message Card — Guest-facing guide copy audit

Date: 2026-08-25
Scope: non-Rurubu only
Status: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main: `f81ed54f5b6cbead84321c3231b001cce6a29d5d`

## Live authority rechecked

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current front: `52:72 / RESORT DESK LETTER`
- Current back: `52:91 / LETTER 02`
- back long-copy stress: `52:128` — hidden after QA
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- canonical QA: `01_paper-items/additional-wedding-items/ADD-13-message-card/QA.md`

No Rurubu item-specific authority, asset, node, Drive item or layout was inspected.

## Visible problem

Fresh native `1400×993` screenshot review of the Current back showed the small native guide copy inside the writing area reading:

`書く場所は、広めに。`

The surrounding guest-facing hierarchy is otherwise strong:

- `LETTER 02`
- `帰る前に、ひとこと。`
- `[自由記入]`
- open handwriting rules
- name/date roles

The guide sentence reads less like useful guest instruction and more like an internal layout/designer note describing the fact that the writing area was intentionally made large.

## Root-cause hypothesis

A production-facing layout intention can leak into guest-facing copy even when the wording is grammatically natural Japanese and the Figma layer is structurally valid.

The defect class is therefore not typography overflow or generic-English leakage. It is a semantic audience mismatch:

`INTERNAL_LAYOUT_INTENT_LEAKS_AS_GUEST_COPY`

The current text may be technically readable while weakening the finished-stationery illusion by making the design explain its own layout decision.

## Bounded next test

Do **not** redesign the RESORT DESK LETTER or change handwriting geometry.

Use a rollback-safe duplicate / bounded semantic-role comparison that changes only `TEXT / GUIDE` on Current back and the matching long-copy stress.

Test at minimum:

1. current guide retained;
2. guide hidden entirely.

Do not invent replacement final copy unless a real reader-facing instruction is required by later authority. The existing Japanese title, `[自由記入]`, writing rules, name/date roles and `56.32%` handwriting surface already communicate the action.

Adopt removal only if whole-item / reading / native-size comparison shows that the writing surface remains self-explanatory and the page becomes more like finished guest stationery rather than an annotated template.

## Regression risks

- removing the guide could make the writing area feel too anonymous if `[自由記入]` and the rules are insufficient;
- replacing it with decorative copy would merely trade one internal note for generic filler;
- changing geometry or adding another label would invalidate the bounded nature of the test.

## Evidence in this run

- whole/native screenshot Current front `52:72`: reviewed;
- whole/native screenshot Current back `52:91`: reviewed;
- metadata readback confirmed `52:100 / TEXT / GUIDE` and stress counterpart `52:137 / TEXT / GUIDE` as independent native text roles;
- Drive folder ID rechecked live and matched canonical QA;
- Figma production mutation: `0`;
- Drive write: `0`;
- image generation: `0`.

The design remains Current and its prior `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` is not revoked by this observation alone. This note records a new bounded polish candidate that requires actual comparison evidence before adoption.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS`

Do not promote this as a project-wide rule yet. The item-specific wording and RESORT DESK LETTER composition must not transfer. Cross-item applicability is only the QA question: does guest-facing copy describe what the guest needs to know, or does it accidentally describe the designer's layout intention?
