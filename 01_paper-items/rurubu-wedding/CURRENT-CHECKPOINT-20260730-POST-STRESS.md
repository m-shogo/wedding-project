# るるぶWEDDING — Current Checkpoint 2026-07-30 Post-Stress

Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Current status

- ASSET_QUEUE_ACCEPTED_1_TO_7
- ASSET_QUEUE_8_TO_14_REOPENED_FOR_PNG_REMAKE
- SVG_PROHIBITED
- SVG_DERIVED_8_TO_14_NON_CURRENT
- LOCAL_WIREFRAME_A_B_C_COMPLETE
- LOCAL_MECHANICAL_STRESS_COMPLETE
- FIGMA_EXECUTION_RUNBOOK_READY
- FIGMA_WRITE_BLOCKED_BY_STARTER_MCP_LIMIT
- NO_VISUAL_WINNER_PROMOTED

## Asset authority

`IMAGE-GENERATION-QUEUE.md` is the source of truth.

Important boundaries:
- #1–#7 remain accepted current PNG image candidates with alpha QA and Drive verification.
- #8–#14 were previously completed from SVG-native constructions and exported PNGs, but the visual direction was not good enough.
- #8–#14 are therefore reopened as `[ ]` and require new PNG-only visual remakes.
- all historical SVG files are `NON_PRODUCTION / DO_NOT_USE`.
- all old SVG-derived PNGs #8–#14 are `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT` even though their alpha channels were technically valid.
- do not place rejected #8–#14 decorations into the production layout.
- current NEXT ASSET is `#8 写真フレーム（スクラップ風）`.

## Wireframe state

Three monochrome outer-spread variants exist as local structural previews using the same rounded physical-size-equivalent geometry:
- spread: `1587 x 1123 px`
- fold: `x = 794 px`
- 6 identical front feature payloads
- same back MEMORY / FRIENDS / HISTORY payload
- no invented vendor bleed / trim-safe / fold-safe

Local pre-score:
- A — Classic Rurubu Cover: `4.45 / 5.00`
- B — Editorial Split: `4.45 / 5.00`
- C — Scrapbook Journey: `3.89 / 5.00`

No winner has been promoted.

## Mechanical stress findings

Long-copy stress:
- A: `PASS` — `168 / 220 px` measured feature-stack use
- B: `PASS` — rail `430 / 620 px`, lead `44 / 123 px`
- C: `FAIL` — `2 / 6` cards overflow; worst measured overflow `31 px`

Static same-frame hero FILL visible source-area fraction:

| Ratio | A | B | C |
|---|---:|---:|---:|
| portrait 4:5 | 73.4% | 84.7% | 70.7% |
| landscape 3:2 | 72.7% | 45.2% | 75.4% |
| square 1:1 | 91.7% | 67.8% | 88.4% |

Key interpretation:
- A is the most balanced fixed hero frame across portrait / landscape / square.
- B remains strongest structurally for long copy and re-layout, but its current tall hero frame has severe 3:2 landscape crop pressure under naive FILL.
- C has acceptable crop balance but measurable long-copy failure and highest re-layout cost.

Therefore B's previous high photo-ratio resilience hypothesis must be proved in editable Figma by allowing one structural hero resize/rebalance; it must not be inferred from the static frame.

## Figma blocker

A fresh metadata read on 2026-07-30 returned:
`You've reached the Figma MCP tool call limit on the Starter plan.`

The failure occurs before metadata access and before any mutation. No production Figma node was changed in this checkpoint.
Do not repeatedly retry the same MCP read in the same blocked window.

## Figma recovery authority

Use `FIGMA-WIREFRAME-EXECUTION-RUNBOOK.md` when access recovers.

Execution sequence:
1. read-only inspect editor / pages / Japanese-capable fonts / local variables / text styles
2. create or reuse page `01_RURUBU_WEDDING`
3. create/reuse exact spread shells A/B/C at `1587.4 x 1122.5`
4. validate geometry and screenshot shells
5. add BACK_COVER / FRONT_COVER / PROVISIONAL_FOLD_GUIDE
6. establish/reuse grayscale wireframe variables and Japanese-capable text roles
7. populate A only, screenshot, validate
8. populate B only, screenshot, validate
9. populate C only, screenshot, validate
10. repeat the exact local long-copy stress payload
11. test 4:5 / 3:2 / 1:1 same-frame hero replacement
12. allow one structural hero resize/rebalance for B and validate its claimed adaptability
13. score the real editable canvas
14. promote exactly one winner to `02_Cover_Back_Visual`
15. only then place **accepted PNG-only assets** one at a time; never place SVGs or rejected SVG-derived #8–#14 PNGs

## Relevant history

Historical commits that created #8–#14 are retained as provenance only and no longer imply production approval:
- `805088c905bca2d4665cb40d63f9d6c2892e947b` — historical #8 SVG-derived frame
- `671ff43beb89481608372f18c0bb7748951382df` — historical #9–#14 vector batch
- `b2f2a32139b8c6dab7a7e276366f21dad2804f87` — local A/B/C wireframe preview
- `c8e22cd6a766e3988312141298bb7c7e3d6afaff` — mechanical wireframe stress measurements
- `8f920848d68457397fcfbca5ff51483a3f5c1c00` — Figma wireframe execution runbook
- `6f19c337cef588bfcaf44a17f643d67c8887ec0d` — reopen #8–#14 for PNG-only remake after SVG rejection

## Next executable action

Do not proceed as if decorative assets are complete.

Current order:
1. remake #8 as a new PNG-only scrapbook photo frame
2. visual QA + alpha QA
3. Drive save + metadata verification
4. mark #8 complete only after those gates
5. then continue #9 → #14 sequentially

Figma comparison remains pending and should resume when MCP quota becomes available.