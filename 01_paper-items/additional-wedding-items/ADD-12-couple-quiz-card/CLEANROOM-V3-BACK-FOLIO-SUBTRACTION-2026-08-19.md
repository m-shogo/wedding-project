# ADD-12 新郎新婦クイズカード — Clean-room V3 back folio subtraction

Status: `VERIFIED_LOCAL / ADOPTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-19
Start authority SHA: `1d29c42d3874dee364250217945c7f57df28fef9`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected front: `26:3` — unchanged
- selected back: `26:4 / ADD12/QuizCard/Back/CleanroomV3`
- hidden back long-copy stress: `27:83`
- retained legacy: `1:2 / 1:26` — unchanged
- Drive authority: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

## Visible problem

Fresh native `620×875` review of the selected back showed a large `12` in the top-right mint field. Live structure readback identified it as `TEXT / FOLIO`. The current SPEC requires title, question number on the front, question/choices, answer method and optional supporting information, but it defines no reader-facing back folio/page number. The visible `12` therefore behaved like a decorative editorial/page index and risked leaking the internal ADD-12 item number into the printed artifact.

## Bounded comparison

Rollback-safe comparison:

- `38:2 / QA_ADD12_BACK_NO_DECORATIVE_FOLIO_2026_08_19`

Only `TEXT / FOLIO / 12` was hidden. The mint opening field, `旅の余白に、ひとこと。`, answer method, name field, message role, handwriting area, writing hint and mint accent were unchanged.

The no-folio version was stronger at native size: the mint field reads as a quiet opening band instead of an editorial template/page marker, and no functional information is lost.

## Adopted change / rollback

Before selected mutation, hidden rollback copies were saved:

- selected back rollback: `38:19 / ROLLBACK_ADD12_BACK_PRE_FOLIO_SUBTRACTION_2026_08_19`
- stress rollback: `38:36 / ROLLBACK_ADD12_BACK_STRESS_PRE_FOLIO_SUBTRACTION_2026_08_19`

The folio was hidden in:

- selected back `26:4`
- long-copy back `27:83`

Front `26:3`, all legacy nodes and prior clean-room history were not changed.

## Three-scale / structure QA

Selected back:

- whole / thumbnail: PASS;
- reading / native `620×875`: PASS;
- visible native text: `8`;
- visible folio: `0`;
- outside visible text: `0`;
- text-to-text collision: `0`;
- guest-facing proof language: `0`;
- IMAGE fills: `0`.

Long-copy back stress was temporarily revealed for native-size review and returned to hidden QA state:

- visible folio: `0`;
- outside visible text: `0`;
- text-to-text collision: `0`;
- proof language: `0`;
- IMAGE fills: `0`.

## Hybrid / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`. The defect was non-semantic decorative metadata, not missing imagery. Drive write: `0`.

## Decision

`ADOPTED`.

This does not create a project-wide rule that folios are always wrong. A page/index number should remain when it has a real reader-facing sequence or physical artifact function. In this ADD-12 back it had no authority-backed semantic job.

Existing `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid; final questions, answer collection, naming, prizes/QR decisions and printer proof remain deferred to authoritative input.