# RSL-039 — Repeated Q&A can become editorial through one reading flow + independent photo anchor

Date: 2026-08-16
Source scope: Rurubu WEDDING / V6 Profile-Q&A BA
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## OBSERVED

The prior Q&A page was structurally safe and editable, but six questions still read as repeated independently positioned prompts around a photograph. At whole-spread and actual-size review this preserved a questionnaire/template feeling even without visible cards.

## ROOT_CAUSE_HYPOTHESIS

Repeated information can still behave like a grid even when no rectangles are drawn. If every item receives a similar visual unit and the photograph merely occupies the remaining space, the viewer reads modules rather than an editorial interview.

A stronger magazine treatment may come from separating responsibilities:

- one explicit text reading flow for the repeated information;
- one independent dominant photo anchor;
- one native pullquote/closing beat that visually bridges the two.

## TESTED_LOCAL

Rollback-safe BA candidate `1411:2` was duplicated from AX.

Bounded changes:

- Q01–Q03 compressed into one left reading flow;
- Q04 promoted as the feature question;
- Q05/Q06 continued vertically instead of creating another row;
- existing memory photo enlarged to `465×480` without exceeding intrinsic `732×498`;
- existing closing native pullquote moved between interview text and photography;
- existing support photo moved upward while staying within intrinsic `240×220`;
- no cards, shadows, gradients, new generated asset or fixed decoration.

A first alternate AY tested a vertical native `INTERVIEW` decorative anchor. It was rejected because the added display text created noise on the photo without solving the hierarchy problem. This is retained as a failure example: more editorial-looking decoration is not automatically more editorial structure.

## Expected improvement

- reduce questionnaire/grid reading;
- make the page scan as interview → memory photograph → future-facing closing beat;
- preserve native variable text and replaceable image roles.

## Regression risk

- long answers could collide with the pullquote or photo;
- dominant photo could exceed source quality;
- moving the closing beat could create hidden bounding collisions.

## VERIFIED_LOCAL evidence

Three-scale visual review:

- 500 px whole spread: PASS
- reading-scale spread: PASS
- 794×1123 actual Q&A: PASS

Structure:

- visible native text `24`
- replaceable IMAGE roles `2`
- text/text collision `0` after correction
- 18 px text safe-area risk `0`
- outside visible nodes `0`
- photo roles remain inside intrinsic dimensions.

Fresh long-copy proof:

- `1412:2 / QA_EVIDENCE / V6_BA_LONG_ANSWER_STRESS_2026_08_16`
- six realistic Japanese answers
- auto-height proof text
- text/text collision `0`
- accidental text/image collision `0`
- safe-area risk `0`
- page overflow `0`
- actual-size screenshot PASS.

GitHub evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V6-P-BA-AZ-QA-2026-08-16.md`

## What must remain Rurubu-specific

Do not transfer:

- exact question positions;
- coral/teal/yellow numbering palette;
- exact Japanese copy;
- image choice/crop;
- P/BA/AZ page geometry;
- Rurubu travel-magazine art direction.

## Cross-item applicability hypothesis

Potentially transferable principle only:

> When repeated editable content still looks like modules even after cards are removed, test whether it can become one semantic reading flow paired with an independent visual anchor and one closing/pullquote beat.

This is a hypothesis for other wedding items, not permission to copy BA. The receiving item must test it locally in rollback-safe context before adoption.
