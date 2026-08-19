# ADD-17 子ども向けミニカード / ぬりえ — REQUIREMENT CHECK

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V5_PRODUCTION_POLISHED / FRONT_BACK_OPEN_FIELD_RULE_SUBTRACTION_PASS / SECONDARY_COPY_READABILITY_HARDENED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Date updated: 2026-08-20
Authority: latest `m-shogo/wedding-project` `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Current authority

The older 2026-08-02 rule in this file that said Figma work was prohibited is superseded for the reopened non-Rurubu visual pass. The Current authority explicitly permits Figma design work and allows ADD-17 to exist as an age-independent neutral editable template while final adoption remains blocked on real child-attendance/use information.

Current production authority:

- Figma file key: `PAvkRggJiRuXVypi3RgZCN`
- production front: `2:2`
- production back: `2:5`
- exact Drive folder: `ADD-17_子ども向けミニカード_ぬりえ` / `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- V5 promotion evidence: `FIGMA-V5-PROMOTION-2026-08-11.md`
- prior production polish evidence: `FIGMA-V5-MICROCOPY-POLISH-2026-08-12.md`
- front open-field polish evidence: `FRONT-OPEN-FIELD-RULE-SUBTRACTION-QA-2026-08-19.md`
- back open-writing polish evidence: `BACK-OPEN-WRITING-RULE-SUBTRACTION-QA-2026-08-19.md`
- secondary-copy readability evidence: `SECONDARY-COPY-READABILITY-QA-2026-08-20.md`

## Current design state

A neutral field-journal style template has already been designed, visually compared, promoted and polished without inventing child identities, ages, counts or interests.

Verified production characteristics:

- front `2:2`: `1110×1540`, native editable text/vector, no required raster imagery;
- back `2:5`: `1110×1540`, native editable text/vector, open writing lines and optional sketch role;
- stable production root IDs are retained;
- rollback-safe copies exist on `99_QA` and current production-page hidden rollback history;
- long-copy / structure evidence is retained from the reopened V5 work;
- no generated child/person imagery and no fabricated child facts are present.

Recent polish has deliberately opened the activity fields rather than adding decoration:

- front: removed the floating short rule inside the large mint drawing field;
- back: removed the floating short divider between the four writing lines and optional-name area;
- front/back: removed redundant secondary ruler/accent fragments that made the activity areas read like form/UI controls;
- back child-facing typo corrected to `絵でもOK`;
- child-facing secondary guidance was enlarged for actual-size readability without changing the primary hierarchy or activity geometry.

### Secondary-copy readability hardening — 2026-08-20

Fresh actual-size review found the remaining child-facing secondary guidance at 22 px (roughly 6 pt equivalent at the file's 10 px/mm print scale). It remained structurally safe but was fragile for a child-facing printed card.

Rollback-safe comparison:

- front `44:2 / QA / ADD17 / FRONT / SECONDARY COPY READABILITY / 2026-08-20`;
- back `44:19 / QA / ADD17 / BACK / SECONDARY COPY READABILITY / 2026-08-20`.

The first 28 px test exposed wrapping in text boxes sized for the old 22 px copy, so the comparison was corrected before adoption rather than shrinking the type again.

Adopted roles:

- front `15:44 / TXT_MARGIN_NOTE`: `線でも、色でも、ことばでも。` → 28 px, width 430 px;
- back `15:62 / TXT_SIDE_PROMPT`: `絵でもOK` → 28 px, width 180 px;
- back `15:64 / TXT_NAME_LABEL`: `おなまえ（書きたいときだけ）` → 28 px.

Pre-change hidden rollbacks:

- front `45:2`;
- back `45:19`.

Post-adoption comparison roots `44:2 / 44:19` are hidden.

Three-scale result:

- front whole-item 500 px: PASS;
- back whole-item 500 px: PASS;
- reading-scale comparison: PASS;
- back native `1110×1540` actual-size: PASS.

The larger secondary guidance remains subordinate to the primary title and does not reduce the open drawing/writing area.

Current post-write evidence:

### Front `2:2`

- visible native text: `4`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- text collision: `0`;
- child-facing margin guidance: `28 px`;
- short internal floating accent rule in drawing field: `0`.

### Back `2:5`

- visible native text: `5`;
- IMAGE fills: `0`;
- visible text outside root: `0`;
- text collision: `0`;
- `絵でもOK`: `28 px`;
- optional-name helper: `28 px`;
- short floating accent rule in body: `0`.

## Requirement gate that still remains

`BLOCKED_REQUIRED_INPUT` applies to **final adoption / actual-use finalization**, not to the existence of the neutral editable template.

Before deciding whether ADD-17 is actually used at the wedding, authoritative input is still required for:

1. whether any children will attend;
2. approximate age range and count;
3. whether the venue already provides children amenities;
4. whether the desired outcome is this neutral activity card, another child item, or no item;
5. whether personalization is required;
6. final wording, physical paper/pen/crayon handling and printer proof.

Do not fabricate these facts or personalize production until they are confirmed.

## Allowed resolution

- `NOT_REQUIRED`: no child guests, venue provision is sufficient, or the couple does not want this item. Keep the existing V5 design only as rollback/reference evidence.
- `ADOPT_V5`: confirmed need and the neutral V5 activity card is suitable. Replace semantic placeholders with authoritative final copy and complete physical/vendor proof.
- `REDESIGN_REQUIRED`: confirmed child requirements make the neutral V5 unsuitable; preserve V5 rollback and create a requirement-specific alternative only after the facts are authoritative.

## Production / asset state

- Figma production: existing V5 front `2:2` / back `2:5`
- current visual status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
- current polish: `FRONT_BACK_OPEN_FIELD_RULE_SUBTRACTION_PASS / SECONDARY_COPY_READABILITY_HARDENED`
- Drive authority: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- new Drive asset in this sync: `0`
- raster assets required by current design: `0`
- image generation required by current design: `0`
- final adoption: `BLOCKED_REQUIRED_INPUT`
- print readiness: `NOT_PRINT_READY`
