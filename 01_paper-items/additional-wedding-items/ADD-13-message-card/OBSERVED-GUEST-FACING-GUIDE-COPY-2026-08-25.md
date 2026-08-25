# ADD-13 Message Card — Guest-facing guide copy audit

Date: 2026-08-25
Scope: non-Rurubu only
Status: `OBSERVED → ROOT_CAUSE_HYPOTHESIS / BOUNDED_FIGMA_TEST_PENDING`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Latest live main rechecked before this evidence update: `c5c7439fff738968a36d8f88369800ed706ccc11`

## Live authority rechecked

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current front: `52:72 / RESORT DESK LETTER`
- Current back: `52:91 / LETTER 02`
- back long-copy stress: `52:128` — hidden after QA
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- canonical QA: `01_paper-items/additional-wedding-items/ADD-13-message-card/QA.md`

No Rurubu item-specific authority, asset, node, Drive item or layout was inspected. The newest `main` commit is Rurubu-only and was treated as unrelated to this scope.

## Visible problem

Fresh Current back review was repeated at `1000 px` render scale from the native `1400×993` frame. The small native guide copy inside the writing area still reads:

`書く場所は、広めに。`

The surrounding guest-facing hierarchy is otherwise strong:

- `LETTER 02`
- `帰る前に、ひとこと。`
- `[自由記入]`
- open handwriting rules
- name/date roles

At 1000 px the guide line is visibly secondary but still conspicuous enough to read as a sentence the guest is meant to consume. It does not tell the guest what to write, where to return the card, what pen to use, or any other action. Instead it describes the designer's internal decision that the handwriting area was intentionally made large.

## Live structural evidence — 2026-08-25 refresh

Figma metadata for Current back `52:91` confirms the guide is a separate editable native role and can therefore be tested without touching handwriting geometry or other semantic copy:

- `52:100 / TEXT / GUIDE`
- x `470`
- y `110`
- width `430`
- height `26`

The handwriting surface remains:

- `52:99 / AREA_HANDWRITING_MAIN`
- x `430`
- y `62`
- width `900`
- height `870`

The writing rules remain independent native geometry beginning at y `218`. The bounded test can therefore change only guide visibility without changing the `56.32%` handwriting-area contract, title, `[自由記入]`, name/date fields, rules, or stationery structure.

Drive metadata was also re-read live and still identifies `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl` as the writable folder `ADD-13_Message_Card`; no Drive mutation was made.

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

## Evidence in this refresh

- Current back `52:91`: fresh `1000 px` screenshot from native `1400×993`, problem independently reconfirmed;
- Figma metadata: exact guide node `52:100`, independent from handwriting area/rules;
- Drive folder ID and writable authority rechecked live;
- latest `main` rechecked immediately before Git write;
- Figma production mutation: `0`;
- Drive write: `0`;
- image generation: `0`.

### Authoring-path blocker

The connected Figma write action still requires `figma-use` guidance before mutation. In this run the connector exposed the write tool but did not expose a readable `figma-use` skill/resource contract. The production comparison was therefore **not** guessed or executed without the required guidance. This is an authoring-path blocker for the bounded Figma test only, not a design/Drive/Git authority ambiguity.

The design remains Current and its prior `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` is not revoked by this observation alone. This note now carries live screenshot + node-geometry evidence so a future write-capable run can execute the exact two-state comparison without re-diagnosing the issue.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS`

Do not promote this as a project-wide rule yet. The item-specific wording and RESORT DESK LETTER composition must not transfer. Cross-item applicability is only the QA question: does guest-facing copy describe what the guest needs to know, or does it accidentally describe the designer's layout intention?
