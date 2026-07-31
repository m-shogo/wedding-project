# るるぶWEDDING — Figma Starter 6-Call Recovery Plan

Status: READY_TO_EXECUTE_AFTER_MCP_RESET
Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Goal
Starter の少ない MCP read budget を浪費せず、復旧した1サイクルで A/B/C 比較から winner 昇格まで進める。

This plan does not override safety gates in `FIGMA-WIREFRAME-EXECUTION-RUNBOOK.md`; it compresses discovery and validation work into a strict call budget.

## Before call 1
Do not use Figma MCP for historical rediscovery. Read GitHub authority first:
- `CURRENT-STATUS.md`
- `FIGMA-WIREFRAME-BUILD.md`
- `FIGMA-WIREFRAME-EXECUTION-RUNBOOK.md`
- `DUMMY-ASSET-MAP.md`
- `IMAGE-GENERATION-QUEUE.md`

## Call budget
### CALL 1 — one read-only inspection
Single read must return:
- editor type
- pages
- target page existence
- Japanese-capable fonts
- existing local variables/text styles
- existing exact-name A/B/C frames

Gate: if editor/file/font is wrong, stop. Do not consume calls trying random alternatives.

### CALL 2 — foundation in one mutation
Create/reuse:
- page `01_RURUBU_WEDDING`
- A/B/C spread shells at `1587.4 x 1122.5`
- BACK/FRONT semantic halves
- provisional fold guides
- required grayscale variables/text styles

Return all IDs and geometry. No decorative assets.

### CALL 3 — populate A
Populate Cover/Back A with identical shared stress copy and semantic image nodes. Use dummy fills only. Return IDs and overflow notes. If screenshot can be captured in the same supported operation, capture it; otherwise reserve visual verification for Call 5.

### CALL 4 — populate B and C as comparison controls
Populate B and C with the same copy quantity and dummy asset roles. Do not tune copy per variant. Keep C as personality control; do not add extra decoration to make it competitive.

### CALL 5 — consolidated read/screenshot/stress audit
One inspection pass should collect:
- screenshots A/B/C
- text overflow/clipping
- fold proximity
- hero crop behavior for 4:5 / 3:2 / 1:1
- B one-time hero re-layout result
- obvious duplicate/missing nodes

Score the existing rubric from this evidence. No winner before this call.

### CALL 6 — promote winner + Visual shell
Promote exactly one winner to `02_Cover_Back_Visual` and create/reuse:
- `02_INSIDE_WF_A`
- `02_INSIDE_WF_B`
- `03_BACK_WF_A`
- `03_BACK_WF_B`

If A remains winner, first visual pass may place only approved transparent PNGs and the reduced decoration subset allowed by the runbook. Dummy image nodes stay semantic and replaceable.

## Fail-closed rules
- Never spend a call only to ask "what is in the file?" if GitHub already records it.
- Never regenerate PNG decorations during Figma recovery.
- Never import/recreate SVG.
- Never use a failed read as justification to guess current Figma state.
- If any call fails before mutation, record the exact failure in Git before retrying in another budget window.
- Do not exceed the six-call plan merely to make cosmetic improvements.

## Success condition
The recovery cycle is successful when:
- A/B/C exist under equal conditions,
- evidence screenshots/stress results exist,
- one outer-spread winner is promoted,
- semantic dummy nodes allow later real-photo/text replacement without layout rebuild,
- remaining work is Visual Design polish + final content replacement + print QA, not rediscovery.
