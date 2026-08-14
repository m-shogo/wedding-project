# ADD-03 transfer placeholder Japanese-first polish — 2026-08-15

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / TRANSFER_PLACEHOLDER_JA_POLISH_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start `main`: `34ba694bdac201c36a0468ee99b77f2e4089f8e9`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- production: `1:5 / FRAME_TIMETABLE_BOARD`
- changed text: `6:46 / TXT_V2_TRANSFER_LABEL_JA_SEMANTIC_PLACEHOLDER`
- Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

## Screenshot-driven defect

Fresh native `1400 × 1980` review found that the secondary `14:40–15:00` interval still used `TBD · LAYOUT DUMMY / ご案内`. It was structurally safe, but the English implementation-like `TBD` plus slash construction looked more like working proof metadata than the Japanese-first editorial language used by the rest of the board.

The interval time itself was not changed and no activity was invented.

## Rollback-safe Figma change

Before production mutation, the complete production frame was cloned as hidden rollback:

- `12:2 / ROLLBACK_ADD03_PRE_TRANSFER_PLACEHOLDER_JA_POLISH_2026_08_15`

Production root `1:5` was preserved. Only node `6:46` changed:

- before: `TBD · LAYOUT DUMMY  /  ご案内`
- after: `[進行内容] · LAYOUT DUMMY`

Typography remains native and editable:

- semantic field: `19px`, dark navy
- proof suffix: `10px`, muted warm-gray, opacity about `0.70`

The confirmed `14:40–15:00` interval stays unchanged while its activity remains explicitly unconfirmed.

## Post-change screenshot QA

Native-size `1400 × 1980` screenshot: PASS.

- the reading order remains `本日の旅程` → ceremony → secondary interval → reception;
- the sand interval remains visibly secondary and cannot be mistaken for a confirmed named event;
- the implementation-like `TBD / ご案内` construction is removed;
- no collision, clipping, or hierarchy regression is visible.

## Structure readback

- production size: `1400 × 1980`
- `clipsContent=true`
- native editable text nodes: `19`
- visible text nodes: `17`
- IMAGE fill nodes: `0`
- outside visible text: `0`
- rollback `12:2`: present and hidden
- no rasterization or flattening introduced

## Drive / image decision

Drive metadata was read back immediately before the Figma write and matched the exact ADD-03 authority folder. No Drive asset write was required.

`IMAGE_GENERATION_NOT_REQUIRED`: the visible defect was semantic typography/proof-language hierarchy, not missing imagery.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid. This pass improves Japanese editorial consistency without asserting any unconfirmed event or time.
