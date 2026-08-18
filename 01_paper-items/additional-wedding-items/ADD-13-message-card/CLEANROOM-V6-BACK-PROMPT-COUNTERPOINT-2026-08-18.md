# ADD-13 メッセージカード — Clean-room V6 back prompt counterpoint

Status: `VERIFIED_LOCAL / CLEANROOM_V6_SELECTED / BACK_PROMPT_COUNTERPOINT_PASS / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `e459e1b6f41233aa7b6307584635837465c271cd`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- selected back: `27:4`
- hidden long-copy back: `27:51`
- Drive folder: `ADD-13_Message_Card / 1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- retained legacy production: `1:3 / 1:13` — unchanged

## Visible problem

Fresh actual-size review found the native `[テーマ]` prompt floating near the upper-center of the selected V6 back. The large left-aligned Japanese theme title and broad handwriting field were already strong, but the centered prompt looked detached from both and weakened the intentional asymmetry.

This was a placement/hierarchy defect, not missing imagery. The handwriting area already exceeds the SPEC minimum and should not be reduced merely to decorate the page.

## Bounded comparison

Two rollback-safe prompt-placement directions were compared without changing selected production:

1. `40:18 / QA_ADD13_BACK_PROMPT_RIGHT_COUNTERPOINT_V2_2026_08_18`
   - prompt stack moved to the upper-right;
   - width `490`;
   - native prompt typography `18 px / 30 px`, right aligned;
   - large title, name/date row and handwriting geometry unchanged.
2. `40:34 / QA_ADD13_BACK_PROMPT_UNDER_TITLE_V2_2026_08_18`
   - prompt moved beneath the title at upper-left.

The under-title direction looked integrated with short copy but was rejected because the realistic long-title stress already reaches to approximately the same vertical region. It would reduce resilience or require shrinking/moving the large title.

The upper-right counterpoint preserved the open field and gave the prompt a deliberate editorial relationship to the large left title.

## Long-copy verification before adoption

A stress candidate `40:50 / QA_ADD13_BACK_STRESS_RIGHT_COUNTERPOINT_2026_08_18` applied the same treatment to the existing realistic long-copy authority.

Observed stress values:

- root: `1400×993`;
- prompt width: `490`;
- prompt font: `18 px / 30 px`;
- long prompt height: `60`;
- prompt stack y: `130`, prompt bottom: `190`;
- name row y: `320`;
- outside visible text: `0`;
- text-to-text collision: `0`;
- proof-language: `0`;
- IMAGE fills: `0`;
- handwriting area unchanged: `1240×650` (`57.98%` of root).

Result: `LONG_COPY_STRESS_PASS` before selected mutation.

## Adopted selected change

Before mutation, hidden rollback copies were saved:

- selected back rollback: `41:2 / ROLLBACK_ADD13_BACK_PRE_RIGHT_COUNTERPOINT_2026_08_18`;
- long-copy back rollback: `41:18 / ROLLBACK_ADD13_BACK_STRESS_PRE_RIGHT_COUNTERPOINT_2026_08_18`.

The verified upper-right counterpoint treatment was then applied to selected `27:4` and hidden stress `27:51`. Temporary QA candidates were hidden after comparison.

Post-write selected/stress readback:

- selected back outside `0`, collision `0`, proof-language `0`, IMAGE `0`;
- stress back outside `0`, collision `0`, proof-language `0`, IMAGE `0`;
- handwriting area remains `1240×650`;
- all final/personal wording remains native semantic copy; no facts were invented.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`. The improvement came from Japanese typography and asymmetrical information placement. Exact Drive authority was live-read before the write and matched `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`. Drive writes: `0`.

## Result

The selected clean-room V6 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`, now with a more intentional back-side title/prompt relationship and unchanged writing capacity. Final theme/prompt wording, names/date policy, paper/pen proof and printer/export requirements remain deferred.
