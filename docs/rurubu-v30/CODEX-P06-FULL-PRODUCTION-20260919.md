# Rurubu WEDDING V30 — P06 Full Production

Date: 2026-09-19  
Scope: existing P06 Figma frame `3535:17` only  
Result: `FIGMA_DESIGN_COMPLETE = YES`

## Assembly

- Rebuilt the existing P06 frame in place; no duplicate frame was created.
- Used `assets/rurubu-v30/p06/P06.png` and the owner-supplied P06 image as the composition authority.
- Preserved the shared `PAGE 06` component (`4000:44`).
- Kept all four photographs as independent, replaceable image fills.
- Kept the title, intro message, Q5 answers, four captions, pet labels, and Q6 copy as native editable text.
- Used true-RGBA generated artwork only for the header and bottom tropical decoration.

## Replaceable photos

| Role | Mask | Image node | Figma image hash |
| --- | --- | --- | --- |
| Home / coffee hero | `4000:52` | `4000:53` | `4331ceaaafd93c1e389cc870c444b54c3afb35a6` |
| Food | `4000:55` | `4000:56` | `5135ce585dc638e6f2c1f2bb80fc174e02169375` |
| Cookie & Melon | `4000:58` | `4000:59` | `5b833086bc690412485fcfcaaeed875a89ef0147` |
| Travel | `4000:61` | `4000:62` | `d2d57b5082958fc2b264fbd0751dd2f527138378` |

## QA

- `PHOTO_REPLACEABILITY_PASS = PASS` (4/4)
- `EDITABLE_COPY_PASS = PASS` (14 named editable text layers)
- `TRUE_ALPHA_DECOR_PASS = PASS` (RGBA, alpha range 0–255, no checkerboard RGB)
- `VISUAL_MASTER_HIERARCHY_PASS = PASS`
- `CROSS_PAGE_STYLE_FAMILY_PASS = PASS` against fresh P02/P03/P04/P05 screenshots
- `DUPLICATE_FRAME_CHECK = PASS`
- `P01/P02/P03/P04/P05/P07/P08_MUTATION_CHECK = PASS` (P06-only write scope)

Fresh review images and generated source assets are stored under:

`assets/rurubu-v30/p06/production/full-build-20260919/`

`PRINT_READY` remains `false` until the normal final print proof/export pass.
