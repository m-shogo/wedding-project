# るるぶWEDDING — Figma Recovery Call Budget

Status: `READY / STARTER_QUOTA_CONSCIOUS`
Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Goal

Figma StarterのMCP枠が回復したとき、調査だけで枠を消費せず、既存仕様とダミーパックを使って実キャンバス比較まで到達する。

This file does not replace `FIGMA-WIREFRAME-EXECUTION-RUNBOOK.md`; it is the quota-constrained execution wrapper.

## Before any Figma call

Do all of these from Git/Drive/local authority first:
- read `FOUNDATION.md`
- read `WIREFRAME.md`
- read `INSIDE-BACK-WIREFRAME.md`
- read `DUMMY-CONTENT-PACK.md`
- read `IMAGE-GENERATION-QUEUE.md`
- prepare PNG-only decorations locally
- generate dummy raster pack with `scripts/generate-dummy-content-pack.py`

Do **not** use Figma calls to rediscover information already frozen in Git.

## Conservative 6-call budget

Treat every Figma MCP interaction as scarce even when a specific tool may be exempt.

### Call 1 — one read-only inventory
One `use_figma` read should return in one response:
- editorType
- pages + IDs
- current `01_RURUBU_WEDDING` existence
- Japanese-capable fonts
- local variables
- local text styles
- any exact-name target frames already present

No separate metadata probing unless Call 1 fails before editor access.

### Call 2 — structural foundation in one atomic mutation
Create/reuse:
- page `01_RURUBU_WEDDING`
- outer A/B/C spread shells
- BACK / FRONT semantic halves
- provisional fold guides
- required grayscale variables/text roles

Return all node IDs and all geometry for self-validation in the same response.

No decorative PNG placement yet.

### Call 3 — populate Cover A/B/C
Populate all 3 outer wireframes with identical text quantity and photo placeholders/dummy images.

Safety:
- one function body may build all three variants, but it must validate exact-name uniqueness before mutation
- no SVG
- no final colors/decorations
- return text overflow indicators / key bounding boxes if possible

### Call 4 — populate Inside A/B + Back A/B
Use `DUMMY-CONTENT-PACK.md`:
- profile A/B dummy photos
- three Q&A modules
- six milestones
- four Memory Spots
- three Friends photos + captions
- dummy backgrounds only where layout needs a background test

No dummy content is final.

### Call 5 — visual QA / screenshots
Capture comparable evidence for:
- Cover A/B/C
- Inside A/B
- Back A/B

Review:
- reading order
- photo crop
- fold proximity
- overflow
- type size
- overall Rurubu/travel-magazine identity

Do not promote a winner before this evidence exists.

### Call 6 — one correction or promotion gate
If QA finds a concrete defect:
- use Call 6 for the highest-impact correction and return corrected geometry/evidence.

If no correction is necessary:
- use Call 6 to create a non-destructive visual-winner copy only after the rubric is scored.

Never spend Call 6 on another broad inventory read.

## Working preference before real Figma evidence

Current local evidence:
- Cover A = visual favorite
- Cover B = structural comparator
- Cover C = personality control / lowest priority
- Inside A = structural favorite
- Inside B = travel-feature comparator
- Back A = structural favorite
- Back B = personality comparator

Do not call any of these Final until real Figma screenshot QA exists.

## Dummy replacement model

Figma nodes should be named by semantic role, not by temporary filename:
- `IMG_COVER_HERO`
- `IMG_PROFILE_A`
- `IMG_PROFILE_B`
- `IMG_HISTORY_MEMORY`
- `IMG_MEMORY_SPOT_01` ... `04`
- `IMG_BACK_MEMORY`
- `IMG_FRIENDS_01` ... `03`
- `BG_TRAVEL`
- `BG_PAPER`

This lets real content replace image fills without structural redesign.

Text nodes should similarly use stable names:
- `TXT_PROFILE_A_NAME`
- `TXT_PROFILE_B_NAME`
- `TXT_QA_01_Q`, `TXT_QA_01_A`, `TXT_QA_01_B`, etc.
- `TXT_HISTORY_01_DATE`, `TXT_HISTORY_01_TITLE`, etc.

## Exit state after quota recovery

Minimum acceptable outcome:
- editable real Figma wireframes exist
- dummy content fills every required slot
- A/B/C outer comparison evidence exists
- Inside A/B and Back A/B comparison evidence exists
- no SVG used
- no production photo/text requirement blocks layout work
- replacement is semantic-node based
- one clearly documented next action remains: real-content replacement or winner promotion
