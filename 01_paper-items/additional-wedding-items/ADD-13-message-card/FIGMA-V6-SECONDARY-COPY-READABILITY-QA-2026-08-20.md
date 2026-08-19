# ADD-13 メッセージカード V6 — Secondary Copy Readability QA

Status: `ADOPTED / VERIFIED_LOCAL / ACTUAL_SIZE_SECONDARY_READABILITY_HARDENED / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_PRESERVED / LEGACY_PRESERVED`
Date: 2026-08-20
Start authority SHA: `6c452e03ff697867f86c5a5c03d81511be3fe757`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- selected page: `27:2 / CLEANROOM / ADD-13 / V6 POSTAL FIELD / 2026-08-17`
- selected front: `27:3`
- selected back: `27:4`
- hidden long-copy front: `27:35`
- hidden long-copy back: `27:51`
- retained legacy: `1:3 / 1:13`
- Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`

## Visible problem

Fresh native `1400×993` review showed that V6's writing-first composition and >55% handwriting areas remained strong, but the smallest meaningful reader-facing roles were visually fragile at physical A6 scale:

Front:
- `お名前`: `20px`;
- date: `18px`;
- `自由にメッセージをご記入ください`: `18px`.

Back:
- upper-right `[テーマ]`: `18px`;
- `お名前`: `19px`;
- `日付`: `17px`.

The bottleneck was actual-size legibility, not missing imagery or decoration.

This applies the already `VERIFIED_CROSS_ITEM` non-Rurubu method `Actual-size QA must audit the smallest reader-facing copy`. Exact sizes and geometry were determined locally; no other item's style or coordinates were transferred.

## Bounded selected comparisons

Created from current selected roots only:

- `45:2 / QA_ADD13_V6_FRONT_SECONDARY_READABILITY_2026-08-20`
- `45:20 / QA_ADD13_V6_BACK_SECONDARY_READABILITY_2026-08-20`

Tested:

Front:
- name `20→24px`;
- date `18→22px`;
- writing instruction `18→22px`.

Back:
- prompt `[テーマ]` `18→22px`;
- name `19→23px`;
- date `17→22px`.

The title hierarchy, writing guides, edge accent, prompt positions and semantic writing-area geometry did not change.

## Long-copy stress before adoption

Dedicated stress comparisons:

- `46:2 / QA_ADD13_V6_FRONT_STRESS_SECONDARY_READABILITY_2026-08-20`
- `46:19 / QA_ADD13_V6_BACK_STRESS_SECONDARY_READABILITY_2026-08-20`

They retained the existing long Japanese title/prompt/name stress while applying the proposed secondary sizes. Stale QA-only helper text inherited by the hidden stress roots (`MESSAGE CARD`, `POSTCARD FOR TWO`, and the internal final-copy note) was hidden in the comparison so the render reflected current guest-facing selected semantics without reducing the actual stress-copy load.

Stress comparison results:
- front outside text `0`, collisions `0`, IMAGE `0`;
- back outside text `0`, collisions `0`, IMAGE `0`;
- front handwriting area `900×870 = 56.32%` preserved;
- back handwriting area `1240×650 = 57.98%` preserved.

The larger back prompt expanded naturally under realistic copy without colliding with the name/date row or reducing the handwriting area.

## Adopted Figma change

Selected:

### Front `27:3`
- `27:9 / TXT_GUEST_NAME_LABEL`: `24px`;
- `27:10 / TXT_DATE`: `22px`;
- `27:19 / META / WRITE HERE`: `22px`.

### Back `27:4`
- `27:23 / TXT_MESSAGE_PROMPT`: `22px`;
- `27:32 / TXT_GUEST_NAME_LABEL`: `23px`;
- `27:33 / TXT_DATE`: `22px`.

Long-copy roots were synchronized to the same role sizes:

### Front stress `27:35`
- name `24px`;
- date `22px`;
- writing instruction `22px`;
- stale `TEXT / KICKER` hidden.

### Back stress `27:51`
- prompt `22px`;
- name `23px`;
- date `22px`;
- stale `TEXT / KICKER` and internal `META / PROMPT NOTE` hidden.

## Rollback safety

Pre-change hidden rollbacks:

- `46:34 / ROLLBACK_ADD13_V6_FRONT_BEFORE_SECONDARY_READABILITY_2026-08-20`
- `46:52 / ROLLBACK_ADD13_V6_BACK_BEFORE_SECONDARY_READABILITY_2026-08-20`
- `46:68 / ROLLBACK_ADD13_V6_FRONT_STRESS_BEFORE_SECONDARY_READABILITY_2026-08-20`
- `46:85 / ROLLBACK_ADD13_V6_BACK_STRESS_BEFORE_SECONDARY_READABILITY_2026-08-20`

Comparison roots `45:2 / 45:20 / 46:2 / 46:19` were hidden after adoption.

Legacy production `1:3 / 1:13` remains untouched.

## Three-scale / structure QA

Selected front/back were rechecked at whole-item and native actual size; hierarchy remains writing-first and the strengthened copy stays subordinate to the large Japanese titles.

Final structural readback:

### Front `27:3`
- visible native text `5`;
- outside text `0`;
- text collisions `0`;
- proof-language `0`;
- IMAGE fills `0`;
- handwriting ratio `56.32%`.

### Back `27:4`
- visible native text `4`;
- outside text `0`;
- text collisions `0`;
- proof-language `0`;
- IMAGE fills `0`;
- handwriting ratio `57.98%`.

### Hidden long-copy `27:35 / 27:51`
- outside text `0 / 0`;
- collisions `0 / 0`;
- proof-language `0 / 0`;
- IMAGE fills `0 / 0`;
- handwriting geometry unchanged.

## Hybrid authoring / asset decision

- variable/reader copy: native Figma text;
- fixed writing guides/edge treatment: native simple geometry;
- generated asset: not required;
- SVG change: not required;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: actual-size typography was the concrete defect.

## Deferred finalization

Final personal wording, signer/name/date policy, real pen/handwriting test, paper stock, printer profile/template and physical proof remain `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION` and `NOT_PRINT_READY`.

## Learning state

`VERIFIED_LOCAL` receiving-item validation. No new shared-learning entry is needed because this directly applies an already `VERIFIED_CROSS_ITEM` QA method rather than introducing a new general rule.
