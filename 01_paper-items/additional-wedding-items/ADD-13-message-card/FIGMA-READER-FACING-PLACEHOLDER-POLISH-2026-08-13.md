# ADD-13 メッセージカード — Reader-facing Placeholder Polish — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` before this Figma write: `0f2184fb9122d11b726910a7be1e4ee01c8904c6`
- Current: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `8ad7bEPAc8I88gs1JxsWhe`
- production front: `1:3 / ADD13/A6/FRONT`
- production back: `1:13 / ADD13/A6/BACK`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- Drive metadata readback confirmed the exact folder ID and parent.

## Fresh visible defect

Fresh actual-size front screenshot showed that the reopened V2 composition still exposed two implementation-like placeholder phrases in the finished paper surface:

- `［メッセージ導入文 · LAYOUT DUMMY］`
- `［メッセージ本文 · LAYOUT DUMMY］`

The explicit `LAYOUT DUMMY` semantics were correct, but `メッセージ導入文` / `メッセージ本文` read like authoring-field labels rather than reader-facing stationery copy and weakened the correspondence art direction.

## Rollback-safe Figma change

Before production text mutation:

- rollback section: `7:2 / ROLLBACK_ADD13_PRE_READER_FACING_PLACEHOLDER_POLISH_2026_08_13`
- rollback front: `7:3 / ROLLBACK_ADD13_FRONT_PRE_READER_FACING_PLACEHOLDER_POLISH_2026_08_13`

Production root `1:3` was preserved. Native editable text only was changed:

- `4:29 / ADD13V2/Intro` → `［書き出し · LAYOUT DUMMY］`
- `4:30 / ADD13V2/Body` → `［本文 · LAYOUT DUMMY］`

Recipient, signer, date, title, typography, rules and overall composition were not changed.

## Screenshot QA

Actual-size `700 × 990` front screenshot after the change: PASS.

- `ことばを、残す。` remains the hierarchy anchor.
- The two variable copy areas now read as concise semantic placeholders rather than CMS/form field names.
- No new collision, clipping or fake-finished content was introduced.
- No generated imagery was added because image absence is not the quality bottleneck for this correspondence card.

## Structure readback

Production front `1:3` after polish:

- native text: `8`
- IMAGE fills: `0`
- text outside root: `0`
- `clipsContent=true`
- `4:29`: 560×58, 22 px, native editable text
- `4:30`: 560×160, 27 px, native editable text
- rollback `7:2` remains hidden with one full production clone.

## Asset decision

`IMAGE_GENERATION_NOT_REQUIRED`. Drive writes: `0`.

## Result

ADD-13 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`, with the front surface now carrying less implementation language. Final recipient policy, actual message copy, signer convention, paper stock, printer profile and physical handwriting proof remain deferred.
