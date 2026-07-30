# るるぶWEDDING — Local Wireframe Preview 2026-07-30

Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Status: `LOCAL_PREVIEW_COMPLETE / MECHANICAL_STRESS_MEASURED / FIGMA_WRITE_STILL_BLOCKED_BY_STARTER_MCP_LIMIT / NO_VISUAL_PROMOTION`

## Why this checkpoint exists

Figma MCP metadata read was retried on 2026-07-30 and is still blocked by the Starter-plan MCP tool-call limit before any canvas mutation. To avoid idle time, the three approved monochrome wireframe specifications were rendered locally at the same physical-size-equivalent geometry for structural comparison only.

This local preview does **not** replace the required Figma comparison and must not be used to promote a Visual Design winner.

## Common geometry verified

All three local previews use:

- spread: `1587 x 1123 px` (rounded local preview of the Figma `1587.4 x 1122.5` target)
- provisional fold: `x = 794 px` (rounded local preview of `793.7`)
- left: Back Cover
- right: Front Cover
- front feature count: 6 identical feature payloads
- back modules: MEMORY / FRIENDS / HISTORY
- monochrome only
- no production bleed / trim-safe / fold-safe invented
- no frozen decorative SVG placed during wireframe comparison

## Local structural findings

### A — Classic Rurubu Cover

Strengths:
- strongest Rurubu / Japanese travel-magazine hierarchy
- largest hero-photo impact
- strongest compatibility with PICK UP / CHECK / BEST SHOT decoration in later Visual Design

Stress risk:
- the lower feature stack becomes the densest of A/B under long-copy stress
- final type scale and wrapping must be inspected carefully in Figma

### B — Editorial Split

Strengths:
- strongest long-copy resilience
- strongest structural re-layout flexibility when hero ratio changes
- strongest fold/trim adjustment resilience
- clearest reading order

Stress risk:
- can become too clean/editorial and lose some Rurubu-specific excitement
- gives later decorative SVG assets less natural space than A/C
- the current fixed tall hero box has high crop pressure for landscape photos if used with simple FILL; its previous photo-ratio score must therefore be validated by actual Figma re-layout rather than assumed from structure alone

### C — Scrapbook Journey

Strengths:
- strongest personal/wedding feel
- strong compatibility with scrapbook/vector decorations

Stress risk:
- weakest long-copy resilience
- highest re-layout cost around fold/route/overlap changes
- most likely to drift from travel magazine toward photo album

## Mechanical stress refinement — 2026-07-30

A second local pass measured actual text wrapping and static hero-image FILL crop pressure using the current local geometry and Noto Sans CJK. This is a mechanical stress measurement only; it is not a Figma promotion decision.

### Long-copy stress

The stress payload deliberately extends all six feature titles beyond the baseline copy.

- A: `168 / 220 px` used in the feature stack — `PASS`, no measured vertical overflow.
- B: feature rail `430 / 620 px`, lead `44 / 123 px` — `PASS`, no measured vertical overflow.
- C: `2 / 6` feature cards overflow — worst measured overflow `31 px` — `FAIL` under this payload.

Important refinement: A was previously described as dense, but the measured stress payload still fits its current local feature stack. It remains denser than B, not mechanically failing.

### Static hero FILL crop pressure

Visible source-area fraction when the current hero frame is kept fixed and the image uses FILL:

| Photo ratio | A | B | C |
|---|---:|---:|---:|
| portrait 4:5 | 73.4% | 84.7% | 70.7% |
| landscape 3:2 | 72.7% | 45.2% | 75.4% |
| square 1:1 | 91.7% | 67.8% | 88.4% |

Interpretation:
- A is comparatively balanced across portrait / landscape / square.
- B strongly favors portrait in its current tall hero geometry and would discard more than half of a 3:2 landscape image under naive FILL.
- C is reasonably balanced for crop pressure, but loses on copy and structural resilience.

This does **not** mean B is inherently poor at photo-ratio replacement. B's strength is that its split structure should be easier to resize/rebalance in editable Figma. Therefore the final Figma test must explicitly include both:
1. naive same-frame FILL replacement, and
2. one allowed structural hero resize/rebalance.

### Fold proximity

The current local structures keep the nearest important content approximately:
- A: `52 px` from the provisional fold
- B: `52 px` from the provisional fold
- C: `65 px` from the provisional fold

These are local geometry observations only. Vendor fold-safe remains unknown and must not be inferred from these distances.

## Local pre-score — NOT FINAL

Using the existing weighted rubric as a structural pre-score only:

| Criterion | Weight | A | B | C |
|---|---:|---:|---:|---:|
| るるぶ/旅行誌らしさ | 25 | 5.0 | 4.2 | 3.8 |
| 結婚式らしい特別感 | 20 | 4.3 | 3.9 | 5.0 |
| hero photo訴求 | 15 | 5.0 | 4.5 | 4.2 |
| 長文stress耐性 | 15 | 3.6 | 5.0 | 2.8 |
| 写真比率stress耐性 | 10 | 3.8 | 5.0* | 3.3 |
| fold/trim調整耐性 | 10 | 4.2 | 5.0 | 3.1 |
| SVG asset適合 | 5 | 5.0 | 3.9 | 5.0 |
| **Weighted / 5.00** | **100** | **4.45** | **4.45*** | **3.89** |

`*` B's photo-ratio pre-score is now explicitly provisional. Static FILL crop measurement is poor for 3:2 landscape, so B keeps the high structural-resilience hypothesis only until the editable Figma resize test proves it.

Local result remains: **A = B > C**, but the tie is now more informative:
- A = strongest Rurubu identity + balanced fixed-frame photo crop.
- B = strongest text/fold adaptability + potentially costly landscape crop unless hero geometry is adjusted.
- C = strongest personal character, but measurable long-copy failure in the current card geometry.

## Promotion boundary

Do **not** promote A or B yet.

Required when Figma MCP access recovers:
1. execute `FIGMA-WIREFRAME-BUILD.md` in the existing production file
2. build A/B/C under `01_RURUBU_WEDDING`
3. capture same-condition screenshots
4. repeat the exact long-copy payload used in the local mechanical pass
5. for hero-photo stress, test portrait 4:5, landscape 3:2, square 1:1 using the same frame first
6. additionally allow one structural hero resize/rebalance in B to test its claimed adaptability
7. re-score the rubric from the real editable canvas
8. promote exactly one winner to `02_Cover_Back_Visual`
9. only then place frozen SVG decoration one asset at a time

## Figma retry note

A fresh metadata read on 2026-07-30 still returns the Starter-plan MCP tool-call limit before metadata access. No Figma mutation occurred in this checkpoint. Avoid repeatedly burning calls until quota/session availability changes.
