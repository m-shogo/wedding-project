# ADD-16 両親贈呈品メッセージカード — V3 Native Text Auto-height QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / NATIVE_TEXT_AUTOHEIGHT_REPAIRED / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Run start authority SHA: `52c03430ab3168617e18250f94d0a599aaa9d8bd`
Pre-write latest main: `59a4de8a2a98dbd7c231de46eee3121e716b635a`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- selected clean-room V3 page: `18:2 / CLEANROOM / ADD-16 / V3 HOME HORIZON / 2026-08-17`
- selected front/back: `18:3 / 18:14`
- hidden long-copy stress: `18:26 / 18:37`
- Drive authority: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- retained legacy production: `1:2 / 1:13` unchanged

## Observed defect

Fresh structural readback found that the selected V3 remained visually correct but several native text roles were still `textAutoResize=NONE` at approximately 10 px fixed height. Affected selected roles included the front kicker/title/origin meta and the back kicker/handwritten-signature meta; equivalent fixed-height nodes also existed in both long-copy stress frames.

This is a latent editability failure: the current placeholder can render, but a font metric or copy change may clip because the node height does not follow the native text.

The hidden stress date roles also still contained the old proof suffix `[日付 · LAYOUT DUMMY]` even though the selected guest-facing design had already removed proof-language suffixes.

## Rollback

Before mutation, four exact hidden rollback copies were created on the same clean-room page:

- `26:2` — front pre-autoheight
- `26:13` — back pre-autoheight
- `26:25` — front stress pre-autoheight
- `26:36` — back stress pre-autoheight

All remain hidden and preserve the pre-change text geometry.

## Figma change

No composition, color, line, origin mark, paper field, semantic role, or legacy production was changed.

Only native-text robustness was repaired:

- fixed-height native text at `<=12 px` in selected/stress V3 was changed to `textAutoResize=HEIGHT`;
- hidden stress dates were normalized from `[日付 · LAYOUT DUMMY]` to `[日付]`;
- no final family names, memories, gift facts, or actual date copy were invented;
- IMAGE fills remain `0`.

Mutated nodes:

`18:4, 18:6, 18:7, 18:11, 18:15, 18:25, 18:27, 18:29, 18:30, 18:34, 18:35, 18:38, 18:45, 18:48`

## Post-write structural QA

Selected V3 and both hidden stress frames now read back with:

- visible fixed-height (`textAutoResize=NONE`, height <= 12 px) native text: `0`;
- visible proof-language (`LAYOUT DUMMY / PROOF / TEMP / QA / EDITORIAL NOTE`): `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`.

Long-copy collision check:

- front stress `18:26`: text-text collisions `0`; deepest signature bottom `956 / 1036`;
- back stress `18:37`: text-text collisions `0`; deepest handwritten-signature meta bottom `875 / 1036`;
- long body copy remains native auto-height/auto-layout and does not escape trim.

## Three-scale QA

Fresh screenshots after repair:

- whole/thumbnail `500 px`: PASS; hierarchy remains `両親へ → [家族への呼びかけ] → ありがとうを、帰る場所へ。 → [旅のひとこと] → horizon → [日付]/[ふたりの署名]`;
- reading `800 px`: PASS; native type remains optically stable;
- actual-size `700×1036`: PASS on both front and back; no clipping, proof language, or new visual artifact was introduced.

The screenshot-supported design judgment is unchanged: `HOME HORIZON` remains the selected clean-room V3 and retains its sellable visual pass.

## Drive / asset decision

Drive folder metadata was live read back before the Figma mutation. New Drive assets: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the defect was latent native-text sizing, not missing hero/illustration/texture.

## Deferred finalization

Still blocked on authoritative family-specific copy, whether one/two cards are required, actual gift/package/attachment method, relationship to any read-aloud letter, paper/vendor/export conditions, and physical proof. Keep `NOT_PRINT_READY`.
