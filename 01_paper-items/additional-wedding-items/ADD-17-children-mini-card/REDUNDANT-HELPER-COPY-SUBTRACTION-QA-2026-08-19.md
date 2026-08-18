# ADD-17 子ども向けミニカード — Redundant Helper Copy Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `8a10c6b48c15410abe0b7c9812ef62cda82a1846`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- selected front/back: `2:2 / 2:5`
- Drive authority: `ADD-17_子ども向けミニカード_ぬりえ / 1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- exact Drive metadata was live-read before write; no Drive asset write was required.

## Visible problem

Fresh actual-size review found one extra permissive helper line at the bottom of each selected face:

- front `15:45 / TXT_FOOTER / 大きく使っても、小さく残しても。`
- back `15:66 / TXT_FOOTER / 書かなくても、もちろん大丈夫。`

Both lines repeated permission already communicated more directly by the remaining child-facing copy and open physical fields. At whole-item scale they made the neutral activity card feel more copy-heavy and template-instructional than necessary.

## Bounded comparison

Rollback-safe comparison copies were created without changing selected production:

- front `39:2 / QA_ADD17_FRONT_REDUCED_HELPER_COPY_2026_08_19`
- back `39:19 / QA_ADD17_BACK_REDUCED_HELPER_COPY_2026_08_19`

Only `TXT_FOOTER` visibility changed. The following were preserved:

- front title, `[お題]`, large mint drawing field and `線でも、色でも、ことばでも。` cue;
- back title, `[ひとこと案内]`, four writing lines, `えでもOK`, optional-name label/rule;
- left teal binding rule and top rust tick;
- all native editability and existing no-image structure.

The reduced-copy versions were stronger at whole-item/reading scale because the activity fields read first and the instructions no longer compete at both bottom corners.

## Adoption / rollback

Before selected mutation, hidden rollbacks were saved:

- `39:40 / ROLLBACK_ADD17_FRONT_PRE_REDUNDANT_FOOTER_SUBTRACTION_2026_08_19`
- `39:57 / ROLLBACK_ADD17_BACK_PRE_REDUNDANT_FOOTER_SUBTRACTION_2026_08_19`

Adopted visibility change:

- selected front `15:45 / TXT_FOOTER`: hidden;
- selected back `15:66 / TXT_FOOTER`: hidden.

Comparison copies were hidden after adoption.

## Post-write QA

Fresh screenshots of selected `2:2 / 2:5` at 700px long-edge review confirmed the cleaner open-field reading.

Structure readback:

- front: visible native text `4`, IMAGE fills `0`, outside text `0`, text collision `0`, footer visible `false`;
- back: visible native text `5`, IMAGE fills `0`, outside text `0`, text collision `0`, footer visible `false`;
- both rollback roots remain hidden and intact.

No child identity, age, count, interest or final-use fact was invented. Final adoption remains blocked on authoritative child-attendance/use information.

## Result

`REDUNDANT_HELPER_COPY_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
