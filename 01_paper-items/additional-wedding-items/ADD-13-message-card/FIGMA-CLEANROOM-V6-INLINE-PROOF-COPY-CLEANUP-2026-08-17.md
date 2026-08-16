# ADD-13 Message Card — V6 inline proof-copy cleanup

Status: `CLEANROOM_V6_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / GUEST_FACING_PLACEHOLDER_CLEANUP_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `34feef1204e849199b3f16e59cf7ee3dfcc20d3d`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- shared method: `NRSL-004` and neutral RSL-065 support — keep semantic uncertainty, remove internal implementation language from guest-facing copy
- Figma: `8ad7bEPAc8I88gs1JxsWhe`
- selected clean-room V6: front `27:3`, back `27:4`
- Drive: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- retained legacy production: front `1:3`, back `1:13` — unchanged

## Visible defect

Fresh actual-size screenshots still showed `LAYOUT DUMMY` inside guest-facing placeholder strings. The semantic fields were truthful and editable, but the implementation suffix made an otherwise resolved stationery composition read like a proof/template.

## Bounded change

Created hidden rollback copies before editing:

- front rollback `35:2`
- back rollback `35:20`

Changed only visible placeholder lexical presentation on selected V6:

- `TXT_MESSAGE_PROMPT 27:8`: `[任意テーマ · LAYOUT DUMMY]` → `[テーマ]`
- `TXT_GUEST_NAME_LABEL 27:9`: `お名前 [LAYOUT DUMMY]` → `お名前`
- `TXT_MESSAGE_PROMPT 27:23`: `[メッセージテーマ · LAYOUT DUMMY]` → `[テーマ]`
- `TXT_GUEST_NAME_LABEL 27:32`: `お名前 [LAYOUT DUMMY]` → `お名前`
- `TXT_DATE 27:33`: `日付 [LAYOUT DUMMY]` → `日付`

No final message theme, guest name, or variable factual copy was invented. Bracketed unresolved theme roles remain visibly provisional. The known wedding date on the front remains `2026.10.24`.

## QA

Post-change screenshot review:

- front actual-size `1400×993`: PASS; headline → theme → writing field reads without proof-sheet metadata;
- back actual-size `1400×993`: PASS; theme/name/date roles remain understandable without implementation language;
- front visible native text: `5`; IMAGE fills: `0`; visible text outside root: `0`;
- back visible native text: `4`; IMAGE fills: `0`; visible text outside root: `0`.

The change only shortens visible copy, so the previously verified long-copy/handwriting geometry is not weakened. Existing hidden stress evidence `27:35 / 27:51` remains retained.

## Asset / Drive

Image generation: not required. The defect was copy hierarchy, not missing imagery.
Drive write: `0`; exact authority folder was read back successfully.

## Result

V6 remains the selected clean-room candidate and retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. This cleanup removes implementation terminology while preserving semantic honesty, native editability, legacy rollback, and the >55% handwriting-area contract.
