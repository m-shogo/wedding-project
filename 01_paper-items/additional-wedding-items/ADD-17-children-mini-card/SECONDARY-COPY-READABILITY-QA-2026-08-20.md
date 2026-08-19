# ADD-17 子ども向けミニカード V5 — secondary-copy readability QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / SECONDARY_COPY_READABILITY_HARDENED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Start authority SHA: `b2d7c801aca2074189d5d0e3e582ab7200e8298a`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- selected front: `2:2`
- selected back: `2:5`
- Drive authority: `ADD-17_子ども向けミニカード_ぬりえ / 1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- final adoption remains `BLOCKED_REQUIRED_INPUT` pending actual child attendance/count/age/use information.

## Visible issue

Fresh actual-size review showed that the remaining child-facing secondary guidance was structurally healthy but too small relative to the physical A6-like working scale (`1110×1540`, 10 px/mm):

- front `線でも、色でも、ことばでも。`: 22 px;
- back `絵でもOK`: 22 px;
- back `おなまえ（書きたいときだけ）`: 22 px.

At roughly 6 pt equivalent these roles were readable on screen but fragile for a child-facing printed activity card. The issue was actual-size readability, not missing imagery or hierarchy.

## Bounded comparison

Rollback-safe comparison roots were created without changing production:

- front `44:2 / QA / ADD17 / FRONT / SECONDARY COPY READABILITY / 2026-08-20`
- back `44:19 / QA / ADD17 / BACK / SECONDARY COPY READABILITY / 2026-08-20`

The first 28 px test exposed line wrapping because the old text boxes were sized for 22 px. The comparison was corrected by widening only the affected roles so the child-facing guidance stayed on one line:

- front margin note: 22 → 28 px, width 330 → 430;
- back `絵でもOK`: 22 → 28 px, width 120 → 180;
- back optional-name helper: 22 → 28 px, width unchanged at 610.

No title, prompt, drawing field, writing line, binding rule, color, or semantic role changed.

## Adoption / rollback

Pre-change production was preserved as hidden rollback:

- front `45:2 / ROLLBACK / ADD17 / FRONT / PRE SECONDARY COPY READABILITY / 2026-08-20`
- back `45:19 / ROLLBACK / ADD17 / BACK / PRE SECONDARY COPY READABILITY / 2026-08-20`

Adopted production roles:

- front `15:44 / TXT_MARGIN_NOTE`: 28 px, 430 px wide;
- back `15:62 / TXT_SIDE_PROMPT`: 28 px, 180 px wide;
- back `15:64 / TXT_NAME_LABEL`: 28 px.

Comparison roots `44:2 / 44:19` were hidden after adoption.

## Three-scale QA

- front whole-item / 500 px: PASS;
- back whole-item / 500 px: PASS;
- front/back reading-scale comparison: PASS;
- back native `1110×1540` actual-size: PASS.

The larger guidance remains subordinate to the primary title while becoming less fragile at print scale. The open drawing/writing areas remain visually dominant.

## Structure QA

Post-write readback:

### Front `2:2`

- visible native text: 4;
- IMAGE fills: 0;
- visible text outside root: 0;
- text collisions: 0;
- adopted secondary guidance: 28 px / 430 px wide.

### Back `2:5`

- visible native text: 5;
- IMAGE fills: 0;
- visible text outside root: 0;
- text collisions: 0;
- `絵でもOK`: 28 px / 180 px wide;
- optional-name helper: 28 px.

No generated image, child/person imagery, or Drive asset was added.

## Decision

`SECONDARY_COPY_READABILITY_HARDENED`.

ADD-17 V5 keeps `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. This is a bounded actual-size accessibility/readability correction; it does not resolve the real-world requirement gate for whether the item will actually be used.
