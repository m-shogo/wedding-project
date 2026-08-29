# Rurubu WEDDING V10 — Actual-size QA — 2026-08-29

Status: `LIVE_FIGMA_VERIFIED / PARTIAL_ACTUAL_SIZE_QA / NOT_DESIGN_COMPLETE / NOT_PRINT_READY`

Scope: Rurubu WEDDING V10 only. Live authority is Figma production page `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`).

## Live baseline used

- A5 trim is 148×210 mm; live trim width is ~559.37 Figma units, so the working scale is ~3.7795 units/mm.
- All eight live page jobs remain `PRODUCTION_CANDIDATE` after the current canonical structural linter run.
- Canonical linter after the correction: fatal AI tells `0`, strong warnings `0`.
- Highest current page-signature similarity is P02↔P06 `66%` (`INFORMATIONAL`); no pair is in `REVIEW` (70–84%) or `HIGH_RISK` (>=85%).
- Visible replaceable `PHOTO MASK` frames checked in the affected QA path remain clipped; no reference/DUMMY artwork was promoted.

## P08 Japanese line-break correction

Live screenshot review found the closing message node `2816:65` rendering as an awkward Japanese break equivalent to `これからも、どうぞよろしくお願いしま / す。` at A5 composition scale.

The native editable wording and type size were preserved:

- text: `これからも、どうぞよろしくお願いします。`
- font: `BIZ UDGothic Bold`
- size: `21 px ≈ 15.75 pt` at the current physical working scale
- position/box correction: `x 92 → 86`, `width 390 → 450`; `y=220` and font size unchanged

Post-write live screenshot shows the sentence on one clean line. Live geometry recheck reports:

- trim overflow: `0`
- critical 6 mm working-safe violation on P08: `0`
- missing font on the corrected node: `false`
- corrected message remains native editable text
- visible P08 photo masks remain clipped

This is a readability correction only; it does not imply `PRINT_READY`.

## Current small-type boundary

The actual-size scan identified sub-9 pt-equivalent visible text only in micro/caption-like roles, including P01 page/discovery chips, P03 SHOGO/SHIORI answer speaker labels, and P06 spot numbers. They remain above or at the documented micro/caption floor and are not being enlarged mechanically because doing so would flatten the intended hierarchy.

P01's duplicated fallback title-edge layer (`2855:2`) enters the 6 mm working inset while the readable foreground title remains contained. This is retained as controlled display edge tension, not evidence that critical copy may ignore trim/safe proof. Recheck it during final fixed-title promotion and physical proof.

## Fixed-graphic transport status

A new run-level retry was made only after the later execution environment/time boundary, using the already-selected P03 asset:

- `FRAME_GLOBAL_SPEECH_BUBBLE_YELLOW_HIBISCUS_01.png`
- Drive ID `13HMInu6bySQaYe_Kc2M0agwBtN30ahpl`
- source 1254×1254 PNG, actual pixels inspected, empty/native-text-safe, no fake text

The Figma single-use upload URL was issued successfully, but the raw-byte POST again failed with `Could not resolve host: mcp.figma.com`. The live target `2850:5` was re-read afterward and remains `visible=false` with `fills=[]`; no partial or broken asset was left in production.

Per the project failure-fingerprint rule, do not cosmetically repeat this same transport path again without a material capability/environment change.

## Remaining completion boundary

- `ASSET_FIRST_80`: 8/8 remains satisfied.
- `CONTENT_COMPLETE`: NO — P02 authoritative profile values and P03 authoritative answers remain unresolved and must not be fabricated.
- `DESIGN_COMPLETE`: NO — selected fixed title/frame graphics are still pending transport/promotion where they materially improve the page.
- `PRINT_READY`: NO — final people/scenery replacement and intrinsic-resolution/crop/provenance QA, full actual-size Japanese review, bleed/trim/safe proof, export/profile preflight, and physical/vendor proof remain required.
