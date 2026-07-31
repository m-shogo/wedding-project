# るるぶWEDDING — Current Checkpoint 2026-07-31 Dummy Ready

Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Status: `DUMMY_CONTENT_READY / FIGMA_QUOTA_BLOCKED`

## Current production direction

- Cover A = current visual-direction favorite
- Cover B = structural comparator
- Cover C = personality control / low priority
- Inside A = current structural favorite
- Inside B = travel-feature comparator
- Back A = current structural favorite
- Back B = personality comparator
- no Figma winner has been promoted yet

## Asset format rule

- SVG prohibited for るるぶWEDDING
- fixed decoration authority = transparent PNG-only
- use `IMAGE-GENERATION-QUEUE.md`
- historical SVG files = `NON_PRODUCTION / DO_NOT_USE`

## Dummy-content decision

User explicitly approved continuing with replace-later dummy content rather than waiting for real photos/text.

Prepared roles:
- cover hero
- two profile photos
- history memory photo
- four Memory Spot photos
- back memory photo
- three Friends photos
- travel-sky background
- paper-texture background
- profile fields
- three paired Q&A modules
- travel note
- six history milestones
- four Memory Spot copy blocks
- Friends captions

Authority:
- `DUMMY-CONTENT-PACK.md`
- generator: `scripts/generate-dummy-content-pack.py`

Every generated raster contains an obvious `DUMMY / REPLACE LATER` or `DUMMY BG` marker so it cannot be confused with production content.

## Replacement model

Figma nodes must be named semantically, not after dummy file names.

Images:
- `IMG_COVER_HERO`
- `IMG_PROFILE_A`
- `IMG_PROFILE_B`
- `IMG_HISTORY_MEMORY`
- `IMG_MEMORY_SPOT_01` ... `04`
- `IMG_BACK_MEMORY`
- `IMG_FRIENDS_01` ... `03`
- `BG_TRAVEL`
- `BG_PAPER`

This means real photos can replace fills in-place later without rebuilding layout.

## Figma quota recovery plan

Use `FIGMA-RECOVERY-CALL-BUDGET.md`.

Conservative target:
1. one combined read-only inventory
2. one structural foundation mutation
3. populate outer A/B/C
4. populate Inside A/B + Back A/B with dummy payload
5. capture comparison evidence
6. one correction or promotion gate

Do not spend recovered Starter calls rediscovering Git-known facts.

## Known operational limitation

The current Drive connector could not convert the generated local ZIP path into a connector file reference for raw ZIP upload. Therefore the binary dummy pack is not treated as durable Drive authority.

This does not block work because:
- the full content/copy contract is in Git
- the deterministic generator is in Git
- the pack can be regenerated before Figma insertion
- the Figma nodes will be semantic-role based and replace-later

## Next executable action

When Figma MCP quota is available:

`read FIGMA-RECOVERY-CALL-BUDGET.md -> run Call 1 inventory -> continue through dummy-filled editable comparison.`

Until then, no real-photo/content collection blocks layout preparation.
