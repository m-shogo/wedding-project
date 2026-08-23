# ADD-08 — Short-rule subtraction + long-copy semantic-wrap QA / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_UPDATED / LONG_COPY_STRESS_REPAIRED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before this write: `ea9af3648728f8a9d327bcb324b12ffd0428be10`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- Current production root: `1:3 / FRAME_MENU_SUPPORT_A4 / CURRENT_SELECTED / VNEXT V3 RESORT TABLECLOTH`
- hidden long-copy proof: `57:37`
- Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Drive metadata read back live; Drive write `0`.

## Visible problem 1 — ambiguous short rule

Fresh whole-item / actual-size review found `58:47 / ACCENT / SHORT RULE`, a coral `110×8` line between the hero title and the menu information. The title already has strong hierarchy and the left textile/selvage strip already owns the dining/table material identity.

The short line did not connect title to menu, represent a tablecloth seam, trim/fold, category key, or any other reader-facing/physical role. It read as a generic editorial accent added after the composition was already resolved.

## Bounded comparison 1

Rollback-safe comparison:

- `60:2 / QA / ADD-08 / RESORT TABLECLOTH / NO AMBIGUOUS SHORT RULE / 2026-08-23`

Only the short-rule visibility changed. Typography, textile strip, information lanes, factual/semantic copy, date/place and all color roles remained unchanged.

Result:

- whole-item: PASS — title → menu hierarchy is more direct;
- reading scale: PASS;
- native `1400×1980`: PASS;
- textile identity remains intact without the line.

Before mutation, full hidden rollback copies were preserved:

- `60:37 / ROLLBACK / ADD-08 / PRE-SHORT-RULE-SUBTRACTION / 2026-08-23`
- `60:72 / ROLLBACK / ADD-08 / PRE-SHORT-RULE-SUBTRACTION / LONG COPY / 2026-08-23`

Promoted:

- Current `1:3`: `58:47 / ACCENT / SHORT RULE` hidden;
- stress `57:37`: `57:61 / ACCENT / SHORT RULE` hidden;
- completed comparison `60:2` hidden.

## Visible problem 2 — stress-only Japanese orphan

After the same subtraction was applied to the hidden long-copy proof and the proof was temporarily revealed, screenshot QA exposed a pre-existing Japanese semantic-wrap defect in `57:68 / TEXT / STAFF MESSAGE`.

At the existing `760px` measure, the intentionally long test sentence wrapped so that the final `も` from `どんな小さなことでも` was isolated on its own visual line before `いつでもスタッフへ…`.

This was not a production-copy defect: the Current short staff message already wraps naturally. It was a weakness in the long-copy proof contract, so production text and production geometry were not changed merely to make the test pass.

## Bounded comparison 2 / method switch

First implementation attempt failed safely because the Noto Sans JP Bold font had not been loaded before resetting `textAutoResize`; no Current production was mutated by that failure. The retry explicitly loaded the font before authoring.

Rollback-safe comparison:

- `61:37 / QA / ADD-08 / LONG COPY / STAFF MESSAGE WIDER MEASURE / 2026-08-23`

Changed only the stress `TEXT / STAFF MESSAGE` measure from `760 → 850px`; font size remained `38px`, line-height `58px`, native text and wording unchanged.

Result:

- the semantic line `気になることがあれば、どんな小さなことでも` stays together;
- second line `いつでもスタッフへお声がけください。` stays together;
- no font shrinking;
- lower footer/date/place reserve remains safe.

Before stress mutation, hidden rollback was preserved:

- `61:72 / ROLLBACK / ADD-08 / PRE-STAFF-MESSAGE-WIDER-MEASURE / LONG COPY / 2026-08-23`

Promoted only to hidden stress proof:

- `57:68` width `850px`, auto-height, final height `116px`;
- Current production staff message remains width `760px` with its shorter production copy;
- comparison `61:37` hidden;
- stress proof `57:37` restored to hidden QA state after screenshot verification.

## Final screenshot / structure QA

Current `1:3`:
- visible native text `12`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- short rule hidden;
- production staff-message geometry unchanged.

Stress `57:37`:
- hidden after QA;
- visible-when-revealed native text `12`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- short rule hidden;
- staff message width `850px`, height `116px`, semantic two-line wrap PASS.

## Hybrid / image decision

- factual/semantic/menu/allergy/dietary/staff copy: native editable Figma text;
- tablecloth/selvage fixed treatment: simple native geometry;
- ambiguous short line: removed rather than replaced;
- generated raster `0`;
- replaceable image role `0`;
- Drive write `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: neither defect was missing imagery. One was purposeless fixed geometry; the other was Japanese long-copy proof typography.

## Learning state

`VERIFIED_LOCAL` applications of existing evidence-backed QA methods:

1. a line/rule/rail should prove a reader-facing, physical, or binding function at whole-item scale before retention;
2. Japanese semantic line-break QA applies to hidden stress proofs as well as Current production;
3. a stress-only defect should not force a production change when the production copy is already correct—repair the test contract at the narrowest verified scope.

No new project-wide visual rule is promoted from this run.

## Result

`CURRENT_UPDATED / SHORT_RULE_SUBTRACTION_PASS / LONG_COPY_JAPANESE_WRAP_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`.
