# るるぶWEDDING — Current Checkpoint 2026-07-30 08:30 JST

Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Status
- FILE_CREATED
- FOUNDATION_SPEC_READY
- WIREFRAME_SPEC_READY
- FIGMA_BUILD_SPEC_READY
- WIREFRAME_STRESS_TEST_READY
- SVG_TRANSPARENCY_QA_PASS
- FIGMA_WRITE_BLOCKED_BY_STARTER_MCP_LIMIT

## Newly verified in this checkpoint
`ASSET-TRANSPARENCY-QA.md` mechanically inspected all 10 currently registered SVG candidates on `main`. All PASS structural transparency: no canvas-sized background rect/image, no embedded raster matte/checkerboard, transparent exterior by SVG construction. Do not regenerate these solely for transparency.

## Figma retry policy
A metadata read on 2026-07-30 again returned the Starter MCP tool-call limit before any canvas mutation. No mutation probe was attempted. This is treated as transient. Do not burn calls by repeating the same probe in this checkpoint.

## Drive reconciliation
Drive document `00_Figma本番前_Current Authority・制作ルール` still confirms production order:
1. るるぶWEDDING
2. WEDDING PASSPORT
3. BOARDING PASS
4. 青春ふたりきっぷ

It also confirms one item = one production Figma file = one URL. Its historical Git branch pointer is stale; per current instruction, GitHub `main` remains authoritative.

## Next executable action after Figma quota recovery
Execute `FIGMA-WIREFRAME-BUILD.md` in the existing production file, build A/B/C under the るるぶ page, then run `WIREFRAME-STRESS-TEST.md`. Promote exactly one wireframe winner before Visual Design or SVG decoration placement.

## Tool-chain / failure record
- Figma metadata read: BLOCKED, Starter MCP call limit, no mutation performed.
- Existing FIGMA-PRODUCTION.md replacement update: BLOCKED by connector safety classification; not retried.
- Recovery: append-only checkpoint file created instead, preserving existing Current files and avoiding repeated failed mutation method.
