# ADD-16 両親贈呈品メッセージカード — Secondary Copy Readability QA

Status: `VERIFIED_LOCAL / ADOPTED / LONG_COPY_REVALIDATED / LEGACY_PRESERVED`
Date: 2026-08-20
Start authority SHA: `5bea1dc41e8c01b7d12104e5c83b4eda60d59157`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- selected front: `18:3`
- selected back: `18:14`
- hidden long-copy front: `18:26`
- hidden long-copy back: `18:37`
- Drive folder: `ADD-16_両親贈呈品メッセージカード / 1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- retained legacy production: `1:2 / 1:13` — unchanged

## Visible problem

Fresh native `700×1036` review showed that the overall HOME HORIZON composition remained strong, but several meaningful reader-facing secondary roles were still materially smaller than the headline/message hierarchy:

- front optional journey line: `19px`;
- front date/signature: `17px`;
- back kicker: `18px`;
- back optional journey line/date/signature: `17–18px`.

These are not decorative production annotations. They are reader-facing copy that may carry final family wording, date and signatures, so actual-size legibility matters.

## Method / learning input

Applied the already `VERIFIED_CROSS_ITEM` non-Rurubu lesson `Actual-size QA must audit the smallest reader-facing copy` as a QA method only. Exact point sizes, HOME HORIZON geometry, palette and art direction remain item-specific.

The neutral Rurubu shared feed also currently corroborates the same general failure family (`RSL-133`) within its own scope, but no Rurubu item-specific layout, asset, Figma node, Drive item, or visual treatment was inspected or copied.

## Rollback-safe bounded comparison

Fresh comparison roots were created before selected mutation:

- front `41:48 / QA / ADD16 / FRONT / SECONDARY COPY READABILITY / 2026-08-20`;
- back `41:59 / QA / ADD16 / BACK / SECONDARY COPY READABILITY / 2026-08-20`;
- front stress `41:71`;
- back stress `41:82`.

Only secondary native text sizes changed:

### Front

- `TXT_OPTIONAL_HOME_PORT_LINE`: `19 → 21px`;
- `TXT_PARENT_DATE`: `17 → 20px`;
- `TXT_COUPLE_SIGNATURE`: `17 → 20px`.

### Back

- `TEXT / BACK KICKER`: `18 → 20px`;
- `TXT_OPTIONAL_HOME_PORT_LINE`: `17 → 20px`;
- `TXT_PARENT_DATE`: `17 → 20px`;
- `TXT_COUPLE_SIGNATURE`: `17 → 20px`.

The recipient, main gratitude headline/body, horizon line, semantic handwritten area, paper field and overall geometry were not changed.

The comparison stress back also exposed that the hidden QA copy still retained `META / HANDWRITTEN / 自筆署名欄（任意）` as a visible child. The stress root itself was hidden, so this had not leaked into selected artwork, but the QA proof would have shown the internal helper when revealed. The helper was hidden in the adopted stress evidence so selected and stress states now match.

## Adoption / rollback

Before selected mutation, hidden rollback copies were saved:

- front `42:2`;
- back `42:13`;
- front stress `42:25`;
- back stress `42:36`.

The verified size changes were then applied to selected `18:3 / 18:14` and long-copy `18:26 / 18:37`.

## Three-scale / actual-size evidence

- selected front native `700×1036`: PASS;
- selected back native `700×1036`: PASS;
- long-copy front native `700×1036`: PASS;
- long-copy back native `700×1036`: PASS.

The enlarged secondary roles remain subordinate to the 48px front headline and 23–24px recipient/message hierarchy while surviving physical-size reading more comfortably.

## Structure readback after adoption

Selected front:

- visible native text: `5`;
- smallest reader-facing sizes: `20 / 20 / 21px`;
- IMAGE fills: `0`;
- outside visible text: `0`;
- text collisions: `0`.

Selected back:

- visible native text: `6`;
- smallest reader-facing size: `20px`;
- IMAGE fills: `0`;
- outside visible text: `0`;
- text collisions: `0`;
- visible internal handwritten helper: `0`.

Long-copy front/back:

- outside visible text: `0 / 0`;
- text collisions: `0 / 0`;
- IMAGE fills: `0 / 0`;
- back internal handwritten helper remains hidden.

## Asset / Drive decision

No image-generation or asset change was justified. This defect was typographic, not visual-asset scarcity.

- Drive authority live-read: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`;
- Drive writes: `0`;
- image generation: `0`.

## Result

`SECONDARY_COPY_READABILITY_HARDENED / LONG_COPY_STRESS_PASS / QA_HELPER_VISIBILITY_SYNCED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LEGACY_PRESERVED`

Final family/use-case copy and physical print proof remain `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION`.
