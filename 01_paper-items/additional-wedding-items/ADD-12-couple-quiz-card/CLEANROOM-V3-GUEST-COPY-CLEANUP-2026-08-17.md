# ADD-12 Couple Quiz Card — Clean-room V3 guest-copy cleanup

Status: `CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / GUEST_FACING_PLACEHOLDER_CLEANUP_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `dea82f66ce78e612d3659ee7fbe1c09908ac8eb3`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- selected clean-room authority: `CLEANROOM-V3-EDITORIAL-QUADRANTS-QA-2026-08-16.md`
- neutral learning: `NRSL-004`, inline implementation-suffix removal, and RSL-065 support
- Figma: `oZ24SbwGkeAfFJcXlbxCoD`
- clean-room page: `26:2`
- selected roots: front `26:3`, back `26:4`
- hidden long-copy stress: `27:51`, `27:83`
- Drive: `ADD-12_新郎新婦クイズカード` / `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- retained legacy production remains unchanged.

## Fresh visible defect

Actual-size screenshots of the already-selected clean-room V3 still exposed authoring/proof vocabulary as if it were guest content:

- `QUESTION_01`
- `CHOICE_A / B / C / D`
- `[回答方法 · LAYOUT DUMMY]`
- `[記名欄 · LAYOUT DUMMY]`
- `[短いメッセージ欄 · LAYOUT DUMMY]`
- decorative/internal footer `TRAVEL TRIVIA · EDITORIAL NOTE`
- back production note `※ 最終設問・回収方法・記名有無は確定後に反映`

The roles needed to remain unresolved and editable; the implementation wording did not need to be printed.

## Rollback-safe change

Hidden rollbacks were created first:

- front `29:2`
- back `29:34`

Selected V3 native text was then changed only at the lexical/presentation layer:

- question → `[設問]`
- all four choices → `[選択肢]`
- front/back answer method → `[回答方法]`
- name field → `[記名欄]`
- message field → `[メッセージ]`
- internal English footer hidden
- internal finalization note hidden

The visible A/B/C/D option labels, Q.01, choice fairness geometry, writing marks, date, and Japanese guest-facing instructions were retained. No real question, answer, choice content, response method, prize rule, anonymity rule, name, or message was fabricated.

## Screenshot / structure QA

Fresh native-size screenshots after cleanup:

- front `620×875`: PASS; first read is `新郎新婦クイズ → Q.01 → [設問] → four equal [選択肢] → [回答方法]`;
- back `620×875`: PASS; `回答とメッセージ → [回答方法] → お名前/[記名欄] → ひとこと/[メッセージ] → open writing area` remains clear;
- front visible native text: `18`; IMAGE fills: `0`; visible text outside root: `0`;
- back visible native text: `9`; IMAGE fills: `0`; visible text outside root: `0`;
- hidden internal text remains available only in rollback/evidence context.

All edited guest strings became shorter, and no geometry was changed. Existing V3 long-copy stress evidence remains retained and is not weakened by this lexical cleanup.

## Asset / Drive

Image generation: not required. The defect was authoring-language leakage, not missing visual content.
Drive writes: `0`; exact authority folder was read back successfully.

## Result

The selected clean-room V3 keeps `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. It now communicates unresolved quiz roles without looking like a Figma/CMS proof sheet. Final question/choices/answer/response policy and physical print proof remain deferred, so `NOT_PRINT_READY` remains correct.
