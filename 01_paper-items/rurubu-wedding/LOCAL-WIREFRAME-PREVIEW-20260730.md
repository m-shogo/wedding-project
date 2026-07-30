# るるぶWEDDING — Local Wireframe Preview 2026-07-30

Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Status: `LOCAL_PREVIEW_COMPLETE / FIGMA_WRITE_STILL_BLOCKED_BY_STARTER_MCP_LIMIT / NO_VISUAL_PROMOTION`

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
- strongest hero-photo ratio replacement resilience
- strongest fold/trim adjustment resilience
- clearest reading order

Stress risk:
- can become too clean/editorial and lose some Rurubu-specific excitement
- gives later decorative SVG assets less natural space than A/C

### C — Scrapbook Journey

Strengths:
- strongest personal/wedding feel
- strong compatibility with scrapbook/vector decorations

Stress risk:
- weakest long-copy resilience
- highest re-layout cost around fold/route/overlap changes
- most likely to drift from travel magazine toward photo album

## Local pre-score — NOT FINAL

Using the existing weighted rubric as a structural pre-score only:

| Criterion | Weight | A | B | C |
|---|---:|---:|---:|---:|
| るるぶ/旅行誌らしさ | 25 | 5.0 | 4.2 | 3.8 |
| 結婚式らしい特別感 | 20 | 4.3 | 3.9 | 5.0 |
| hero photo訴求 | 15 | 5.0 | 4.5 | 4.2 |
| 長文stress耐性 | 15 | 3.6 | 5.0 | 2.8 |
| 写真比率stress耐性 | 10 | 3.8 | 5.0 | 3.3 |
| fold/trim調整耐性 | 10 | 4.2 | 5.0 | 3.1 |
| SVG asset適合 | 5 | 5.0 | 3.9 | 5.0 |
| **Weighted / 5.00** | **100** | **4.45** | **4.45** | **3.89** |

Local result: **A = B > C**.

Interpretation:
- A wins on Rurubu identity and hero impact.
- B wins on resilience and maintainability.
- Their weighted local score is tied, so visual preference alone must not break the tie.

## Promotion boundary

Do **not** promote A or B yet.

Required when Figma MCP access recovers:
1. execute `FIGMA-WIREFRAME-BUILD.md` in the existing production file
2. build A/B/C under `01_RURUBU_WEDDING`
3. capture same-condition screenshots
4. run long-copy and photo-ratio stress observations
5. re-score the rubric from the real editable canvas
6. promote exactly one winner to `02_Cover_Back_Visual`
7. only then place frozen SVG decoration one asset at a time

## Figma retry note

The latest retry still returns the Starter-plan MCP tool-call limit before metadata access. No Figma mutation occurred in this checkpoint. Avoid repeatedly burning calls until quota/session availability changes.
