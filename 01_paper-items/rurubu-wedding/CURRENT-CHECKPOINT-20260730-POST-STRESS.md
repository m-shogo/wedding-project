# るるぶWEDDING — Current Checkpoint 2026-07-30 Post-Stress

Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Current status

- ASSET_QUEUE_COMPLETE_1_TO_14
- PNG_ONLY_FIXED_DECORATIONS
- PNG_REWORK_8_TO_14_COMPLETE
- SVG_PROHIBITED
- HISTORICAL_SVG_AND_SVG_DERIVED_8_TO_14_NON_CURRENT
- DRIVE_VERIFIED_1_TO_14
- LOCAL_WIREFRAME_A_B_C_COMPLETE
- LOCAL_MECHANICAL_STRESS_COMPLETE
- FIGMA_EXECUTION_RUNBOOK_READY
- FIGMA_WRITE_BLOCKED_BY_STARTER_MCP_LIMIT
- NO_VISUAL_WINNER_PROMOTED

## Asset authority

`IMAGE-GENERATION-QUEUE.md` is the source of truth.

Important boundaries:
- #1–#7 remain accepted current PNG image candidates with alpha QA and Drive verification.
- #8–#14 were reopened after the user rejected the SVG-derived visual direction.
- #8–#14 have now been rebuilt as new **raster-native transparent PNGs** without SVG production use.
- all new #8–#14 files passed visual QA, alpha QA and Drive metadata readback.
- all historical SVG files remain `NON_PRODUCTION / DO_NOT_USE`.
- all old SVG-derived PNGs #8–#14 remain `NON_CURRENT / SVG_DERIVED_VISUAL_REJECT`; do not restore them.
- do not create more fixed decorative assets unless a concrete production-layout problem requires one.

Current PNG-only rework assets:
- #8 `rurubu_08_scrapbook_photo_frame_pngonly_v1.png` — Drive `1InvEJp5UID7_x2gU3cvEbGzeF6G18WC4`
- #9 `rurubu_09_masking_tape_pngonly_v2.png` — Drive `1Svo5Degcq2sRXsxBX2H-xJIM90xOMF-9`
- #10 `rurubu_10_travel_route_airplane_heart_pngonly_v1.png` — Drive `18jk-uwgCeCv9vJyKjjy7q4yVQT2Fw_A0`
- #11 `rurubu_11_map_pin_pngonly_v2.png` — Drive `1DrTPSDeb7mfmIF6_WTL14NJY8DbLTNnc`
- #12 `rurubu_12_small_travel_icons_pngonly_v2.png` — Drive `1Q0E0TuTfIXfckpDpFxWKtkClmskZQv6u`
- #13 `rurubu_13_photo_caption_ornament_pngonly_v1.png` — Drive `1h99j9EiZ-3yRnBoMMYCYuxBRvjzWX3fx`
- #14 star `rurubu_14a_feature_stamp_star_pngonly_v1.png` — Drive `1TiR8B1hX1PW1AlMkSDVMkF9T4aMOkNno`
- #14 airplane `rurubu_14b_feature_stamp_airplane_pngonly_v1.png` — Drive `1AOQmOqSEPmzpyUARzetEvic6H6Q6Spu1`
- #14 heart `rurubu_14c_feature_stamp_heart_pngonly_v1.png` — Drive `1GoMtMrf-EGseg6YcKBK_CGK0-sQFUadJ`

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
15. only then place **accepted PNG-only assets** one at a time; never place SVGs or rejected SVG-derived PNGs

## Relevant history

Historical commits that created SVG-derived #8–#14 are retained as provenance only and no longer imply production approval:
- `805088c905bca2d4665cb40d63f9d6c2892e947b` — historical #8 SVG-derived frame
- `671ff43beb89481608372f18c0bb7748951382df` — historical #9–#14 vector batch
- `6f19c337cef588bfcaf44a17f643d67c8887ec0d` — reopen #8–#14 after SVG visual rejection

PNG-only rework commits:
- `c0191cc07642a122df1821c33e9df1f0ef7bc56c` — promote new #8 raster-native frame
- `a5fe038ade55e35884f699d871d5204bc33fb279` — promote new #9 raster-native masking tape
- `917f2947e422d1cd7fae037d657d7c7fdf031352` — promote new #10 raster-native route
- `9b920d750dfc4ab5a6f3618e418101d0e071d93d` — promote new #11 raster-native map pin
- `2ddc5bad0d7fcc5f33ac01e6579cc146a32ce9df` — promote new #12 raster-native icon set
- `cc98c386779edd0f998c01772b2345c7f7be65c2` — promote new #13 raster-native caption ornament
- `240d32be6f1677798a43379589d48a01a10f9264` — complete new #14 raster-native feature stamps and close queue

Structural/wireframe history:
- `b2f2a32139b8c6dab7a7e276366f21dad2804f87` — local A/B/C wireframe preview
- `c8e22cd6a766e3988312141298bb7c7e3d6afaff` — mechanical wireframe stress measurements
- `8f920848d68457397fcfbca5ff51483a3f5c1c00` — Figma wireframe execution runbook

## Next executable action

The fixed decoration queue is complete again.

Do not generate more decorations now.

Next production action:
`Figma MCP access recovers -> execute Stage 0 of FIGMA-WIREFRAME-EXECUTION-RUNBOOK.md -> compare A/B/C in the production canvas -> promote exactly one winner -> insert accepted PNG-only assets one at a time.`

Until then, continue only work that reduces real-data/layout uncertainty; do not reopen completed assets without a concrete visual problem.