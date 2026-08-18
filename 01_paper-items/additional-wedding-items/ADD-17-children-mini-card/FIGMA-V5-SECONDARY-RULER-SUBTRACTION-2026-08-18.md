# ADD-17 子ども向けミニカード V5 — secondary ruler subtraction QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V5_PRODUCTION_POLISHED / SECONDARY_RULER_SUBTRACTION_PASS / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `4c531b8f228ecdef15efeb593e3cd3f11d0bc1ff`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- selected front: `2:2`
- selected back: `2:5`
- Drive authority: `ADD-17_子ども向けミニカード_ぬりえ` / `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- final adoption remains blocked on real child-attendance/use facts.

## Visible issue

Fresh front/back review found a repeated decorative pair in the lower half: a short rust accent line followed by a longer thin grey/navy line. The short rust line already performed the visual anchor role. The long continuation line did not mark a trim, writing baseline, fold, cut, name field or other physical function and made the page read slightly like a UI/progress ruler.

This was separate from the genuine functional lines that remain on the back for handwriting and the name field.

## Bounded comparison

Rollback-safe comparison:

- front `33:2 / QA / ADD-17 V5 FRONT / SECONDARY RULER SUBTRACTION / 2026-08-18`
- back `33:19 / QA / ADD-17 V5 BACK / SECONDARY RULER SUBTRACTION / 2026-08-18`

Only the long secondary ruler was hidden:

- selected front source node `15:41`;
- selected back source node `15:59`.

Preserved:

- teal vertical binding rule;
- top rust tick;
- short rust lower accent line;
- front open drawing field;
- back four handwriting lines;
- back name-writing guide `15:65`;
- all native semantic text;
- no child-specific facts were introduced.

The comparison was stronger on both sides: the page kept its field-journal family resemblance without the double-line/ruler motif.

## Promotion / rollback

Promoted to selected V5:

- front secondary ruler `15:41` hidden;
- back secondary ruler `15:59` hidden.

Hidden pre-change rollback:

- front `34:2`;
- back `34:19`.

Comparison nodes `33:2 / 33:19` were hidden after promotion.

## Three-scale / structural QA

Post-promotion:

- front whole / 500px: PASS;
- back reading / 1110px render: PASS;
- natural canvas remains `1110×1540` front/back;
- front visible native text: `5`;
- back visible native text: `6`;
- front outside visible text: `0`;
- back outside visible text: `0`;
- front text collisions: `0`;
- back text collisions: `0`;
- IMAGE fills: `0`;
- functional back name guide remains visible;
- handwriting lines remain unchanged.

## Drive / asset decision

Exact Drive authority was live-read successfully before promotion. No image generation or Drive write was required; the visible defect was redundant native vector decoration.

## Decision

`SECONDARY_RULER_SUBTRACTION_PASS`.

ADD-17 keeps `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The neutral V5 template remains editable and age-independent. Final adoption stays `BLOCKED_REQUIRED_INPUT` until real attendance/count/age/use information is authoritative.