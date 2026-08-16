# ADD-16 両親贈呈品メッセージカード — Clean-room V3 Title Status Cleanup

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V3_SELECTED_CANDIDATE / TITLE_STATUS_LEAK_REMOVED / LONG_COPY_STRESS_REVALIDATED / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `ef2a4f045882520a40a9401cdb4560bfd36c2057`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Drive folder: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- retained legacy production: front `1:2`, back `1:13`
- selected clean-room page: `18:2 / CLEANROOM / ADD-16 / V3 HOME HORIZON / 2026-08-17`
- selected front/back: `18:3 / 18:14`
- hidden long-copy stress: `18:26 / 18:37`

## Visible defect found

Fresh actual-size review of selected V3 front `18:3` showed `18:7 / META / TITLE STATUS / LAYOUT DUMMY` sitting between the gratitude headline and the optional home-port line. The semantic recipient and optional-line fields already contain explicit `LAYOUT DUMMY` markers, so this extra internal status line added no authoring value and read as production metadata leaking into the guest-facing composition.

## Rollback-safe repair

Before mutation, a hidden rollback copy was created:

- rollback section: `21:2 / ROLLBACK / ADD-16 V3 PRE TITLE STATUS CLEANUP / 2026-08-17`
- rollback front: `21:3`

Selected V3 mutation:

- `18:7 / META / TITLE STATUS` → `visible=false`

The corresponding hidden stress clone status node was aligned with the selected candidate:

- `18:30 / META / TITLE STATUS` in stress front `18:26` → `visible=false`

No recipient, gratitude headline, optional travel metaphor, date, signature, horizon line, origin mark, handwritten-signature area, back copy, or legacy production node was changed.

## Post-repair visual QA

Fresh actual-size screenshot of front `18:3` confirms a cleaner sequence:

`両親へ → [家族への呼びかけ] → ありがとうを、帰る場所へ。 → [任意の短い旅の比喩] → HOME PORT horizon → date/signature`

The title now has clean breathing room without a small internal status label interrupting the emotional hierarchy. The repair is subtractive and does not introduce new decoration or imagery.

## Structure / stress revalidation

Live readback after repair:

- front `18:3`: `700×1036`, text count `8`, IMAGE fills `0`, visible text outside root `0`, title-status node hidden;
- back `18:14`: `700×1036`, text count `7`, IMAGE fills `0`, visible text outside root `0`;
- hidden front stress `18:26`: visible text outside root `0`, title-status node hidden;
- hidden back stress `18:37`: visible text outside root `0`.

The existing V3 long-copy structural pass remains valid.

## Drive / generated asset decision

- new Drive asset: `0`
- image generation: not required
- reason: the defect was leaked internal status microcopy, not missing visual media.

## Current gate

The selected V3 remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED_CANDIDATE / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Final family-specific copy, gift/attachment method, print vendor requirements, physical proof, and relationship to any read-aloud letter remain deferred. Do not fabricate those inputs.
