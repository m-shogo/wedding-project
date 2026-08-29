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

## P07 route / map density correction

A later live comparison of P07 `2787:42` against closest reference `2771:3` found the largest current structural distance was not missing decoration but excess dead space between the title and the route/map information mass. The route sequence and course map were visually sinking toward the middle of the page, weakening the intended `ROUTE + TIME + FOOD` reading behavior.

No new/fake times, places, captions, or travel facts were invented. Existing semantic content was retained and the existing route/map cluster was compacted upward by 36 Figma units:

- route-lane support field `2844:15`;
- stop-support photo `2787:45` and its airmail frame `3036:2`;
- course-map support photo `2787:47`;
- route movement asset `2810:5`;
- route spine `2816:48`;
- stop dots/numbers/labels `2816:49`–`2816:60`;
- functional route connectors `2996:8`–`2996:11`;
- course-map header field/text `2996:12` / `2996:13`;
- functional map pin `3008:2`.

The lower food field and food hero were deliberately not moved with the cluster so that food remains the lower-page editorial interruption rather than merging into the map block.

Post-write screenshot review now reads as:

`1 1DAY title → 2 route start/sequence → 3 course map → 4 food interruption → 5 lower micro discovery`.

Canonical live linter after the correction reports:

- `PRODUCTION_CANDIDATE`: 8/8;
- fatal AI tells: 0/8;
- strong warnings: 0/8;
- P07 dominance: ~1.716;
- P07 edge-shape count: 3;
- P07 controlled rotated shapes: 8;
- highest similarity remains P02↔P06 `66%` (`INFORMATIONAL`);
- P05↔P07 is `59%` (`INFORMATIONAL`);
- no pair reaches `REVIEW` or `HIGH_RISK`.

P07 targeted A5 preflight after the write reports:

- trim overflow: `0`;
- 6 mm working-safe text violation: `0`;
- missing fonts: `0`;
- visible P07 replaceable masks: 4, all `clipsContent=true`;
- visible REFERENCE/DUMMY production image leakage: `0`.

The full eight-page preflight after this batch reports text trim overflow `0/8`, missing fonts `0/8`, unclipped visible photo masks `0`, and REFERENCE/DUMMY production leakage `0`. The only working-safe exception is the already-known P01 non-critical fallback title-edge layer `2855:2`; readable foreground title copy remains safe.

## P07 food-source resolution / transport status

Before trying a new generation, Drive was live-read first. The existing selected final candidate remains sufficient:

- semantic source: `GENERATED_FOOD_CAFE_HAWAII_FOOD_COLLAGE_TROPICAL_01.png`
- Drive ID: `1_MJmJGiIlGd13PCUfDBUv_cvZ5xDfpca`
- actual source inspected this run: `1254×1254 RGBA`
- no authoritative/fake text is baked into the asset
- P07 food-hero mask `2787:46` currently still uses a `180×180` layout derivative and is explicitly non-final
- P07 cafe-micro mask `2787:48` remains `LOW_RES_LAYOUT_PROXY_ONLY`

A single fresh Figma asset-upload attempt was made for the existing 1254×1254 source. Figma successfully issued a single-use upload URL for target `2787:46`, but the byte POST again failed with `Could not resolve host: mcp.figma.com`.

This is the same transport/DNS failure fingerprint already documented. The source is not missing and a replacement generation is not justified. Do not repeat the same upload method again until there is material environment/capability change.

## Remaining completion boundary

- `ASSET_FIRST_80`: 8/8 remains satisfied.
- `CONTENT_COMPLETE`: NO — P02 authoritative profile values and P03 authoritative answers remain unresolved and must not be fabricated.
- `DESIGN_COMPLETE`: NO — selected fixed title/frame graphics are still pending transport/promotion where they materially improve the page.
- `PRINT_READY`: NO — final people/scenery replacement and intrinsic-resolution/crop/provenance QA, P07 full-resolution food promotion, full actual-size Japanese review, bleed/trim/safe proof, export/profile preflight, and physical/vendor proof remain required.
