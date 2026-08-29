# Rurubu WEDDING V10 — P03 Q&A Density Integration QA — 2026-08-30

Scope: **Rurubu WEDDING V10 only**.

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production page: `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`)
Affected frame: P03 `2787:15` — `Q&A`
Closest reference: `2771:2`
QA mode: `PRODUCTION_CANDIDATE`

## Why this pass happened

Live screenshot comparison against `2771:2` showed that P03 no longer had the old equal-card skeleton, but the upper Q01/Q02 and lower Q03/Q04 clusters were still separated by an oversized middle gap. The largest reference-distance cause was therefore **broken editorial continuity / low useful visual density**, not a need for more decorative stickers or invented Q&A content.

No new questions, answers, facts, or generated text were invented.

## Structural correction applied in live Figma

The existing lower editorial cluster was moved upward while preserving all native editable text and existing replaceable masks.

- lower question color field `2844:7`: `y 510 -> 462`
- Q03 cluster (`2816:16`–`2816:22`) and lower semantic tail `3116:3`: `-48px`
- micro-memory photo mask `2787:19`: `y 482 -> 452` (`-30px`)
- Q04 support paper `3119:5` and Q04 cluster (`2816:23`–`2816:29`): `-30px`
- first screenshot after compression showed the rotated support portrait touching Q03 too strongly; the support portrait `2787:18` was then moved `y 236 -> 212` (`-24px`) to remove the text/photo collision while keeping the photo-to-question transition.

Final reading path:

1. `ふたりに聞きました！` / dominant `Q&A`
2. Q01 -> Q02 on the warm upper field
3. support portrait as the image/story interruption
4. Q03 -> micro-memory image -> Q04 as a connected lower discovery cluster
5. answer labels/rules as editable micro-information slots

## Live AI-look linter after correction

Canonical read-only linter result:

- `PRODUCTION_CANDIDATE`: **8/8**
- fatal AI tells: **0/8**
- canonical warnings: **0/8**
- highest page-signature similarity: P02 ↔ P06 **66% INFORMATIONAL**
- P05 ↔ P07 **59% INFORMATIONAL**
- P01 ↔ P02 **56% INFORMATIONAL**
- P01 ↔ P06 **55% INFORMATIONAL**
- `>=70% REVIEW`: **0 pairs**
- `>=85% HIGH_RISK`: **0 pairs**

P03 live signature after the change:

- shapes: `6`
- visible text: `19`
- production image fills: `2`
- dominance: `1.639`
- edge shapes: `2`
- controlled rotated shapes: `6`
- fatal: `[]`
- warnings: `[]`

## A5 actual-size preflight

Canonical A5 trim is `148 x 210mm`; live trim `2787:16` measured `559.370 x 793.701px`, or approximately `3.7795px/mm`. The 6mm working-safe inset is approximately `22.677px`.

Final live checks:

- visible native text: **19**
- text outside trim: **0**
- critical text violating 6mm working-safe: **0**
- visible text below 12px: **0**
- missing/unresolved font family in the inspected text: **0** (`BIZ UDGothic / Bold`)
- replaceable photo masks: **2**
- `clipsContent=true`: **2/2**
- unclipped replaceable masks: **0**
- visible `REFERENCE_` / `DUMMY_` production leakage: **0**

## Asset roles retained

No new raster asset was placed in this pass. Existing P03 photography remains replaceable layout photography:

- support portrait `2787:18`: `REAL_PHOTO_PROFILE_HAWAII_COUPLE_KISS_01.jpg` — Drive `1sIghnrqtfs0WxwBiVdmsZopsQ29tIpiw` — `PHOTO_PROXY_OK_FOR_LAYOUT / FINAL_PHOTO_QA_DEFERRED`
- micro memory `2787:19`: `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg` — Drive `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P` — `PHOTO_PROXY_OK_FOR_LAYOUT / FINAL_PHOTO_QA_DEFERRED`

No final-graphic generation was required. The organized Drive library still contains suitable title/frame/decor candidates; fixed-graphic promotion remains a transport task rather than a generation task.

## Reference assessment

P03 now reads as one asymmetric Q&A editorial sequence instead of two disconnected islands. Compared with `2771:2`, the remaining largest distance is **authoritative answer/content density plus final publication-title/frame texture**, not the gross page composition.

Manual Reference Match Score: **85/100 — CREDIBLE / REFINE**.

This score is valid only as a `PRODUCTION_CANDIDATE`; it is not a print-readiness claim.

## Status

- `ASSET_FIRST_80`: 8/8
- `PRODUCTION_CANDIDATE`: 8/8
- `CONTENT_COMPLETE`: NO
- `DESIGN_COMPLETE`: NO
- `PRINT_READY`: NO

Next high-value task: when fixed-graphic transport becomes materially available, promote the canonical P03 title/frame assets before micro-polish. Otherwise continue cross-page actual-size review for remaining fallback publication graphics without inventing content.
