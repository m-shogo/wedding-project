# るるぶWEDDING — Current Checkpoint 2026-07-30 Post-Stress

Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Current status

- ASSET_QUEUE_COMPLETE_1_TO_14
- DRIVE_VERIFIED_1_TO_14
- SVG_PREFERRED_FOR_SIMPLE_DECORATIONS
- LOCAL_WIREFRAME_A_B_C_COMPLETE
- LOCAL_MECHANICAL_STRESS_COMPLETE
- FIGMA_EXECUTION_RUNBOOK_READY
- FIGMA_WRITE_BLOCKED_BY_STARTER_MCP_LIMIT
- NO_VISUAL_WINNER_PROMOTED

## Asset authority

`IMAGE-GENERATION-QUEUE.md` is complete through #14.

Important boundaries:
- #1–#7 are accepted current image candidates with Drive verification.
- #8–#14 use SVG-native sources plus transparent PNG exports where appropriate.
- Do not regenerate `[x]` assets unless the user explicitly requests another version.
- Do not overwrite current Drive authority files with later candidates.
- Do not place frozen decorative SVGs into production layout before wireframe winner promotion.

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

A fresh metadata read on 2026-07-30 still returns:
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
15. only then place #1–#14 frozen decoration assets one at a time

## Relevant commits

- `805088c905bca2d4665cb40d63f9d6c2892e947b` — complete scrapbook photo frame #8
- `671ff43beb89481608372f18c0bb7748951382df` — complete vector decoration queue #9–#14
- `b2f2a32139b8c6dab7a7e276366f21dad2804f87` — record local A/B/C wireframe preview
- `c8e22cd6a766e3988312141298bb7c7e3d6afaff` — add mechanical wireframe stress measurements
- `8f920848d68457397fcfbca5ff51483a3f5c1c00` — add Figma wireframe execution runbook

## Next executable action

Do not create more decorative assets now.

The next production action is:
`Figma MCP recovers -> execute Stage 0 of FIGMA-WIREFRAME-EXECUTION-RUNBOOK.md -> continue incrementally through real A/B/C comparison.`
