# 2026-08-11 Rurubu WEDDING clean-room feedback — BY / BZ

Scope: Rurubu WEDDING only. Current outer `77:18` and Current inside `77:290` were re-read and left untouched.

## Experiment A — BY back-cover travel log

- Visible problem: BW back cover still ended in a six-dot, evenly spaced timeline that read like a product stepper/dashboard despite the existing zig-zag journey line.
- Principle tested: subtraction first. Remove uniform dots, keep verified native year/event text, and let the existing journey line plus staggered typography carry chronology.
- Candidate: `V5_OUTER_RURUBU_CLEANROOM_BY_BACK_TRAVELLOG_STAGGER_2026_08_11` — frame `796:2`.
- Change: hid six timeline dots (`796:28`, `796:31`, `796:34`, `796:37`, `796:40`, `796:43`); re-positioned the twelve existing native year/event text nodes around the zig-zag path with materially varied year scale; no new cards/badges/images were added.
- Expected improvement: reduce UI-stepper grammar and make the back-cover chronology feel like an editorial travel route.
- Regression risk: route line could cross labels or make chronology harder to scan.
- Evidence: whole-spread and back-page screenshot review shows the six equal anchors are gone and the route reads asymmetrically; bottom-zone structure QA found `0` text-text intersections. Fold guide remains `x=792.7000122070312`, width `2`, height `1122.5`. Seven visible IMAGE fills remain, with their existing hashes preserved.
- Status: **ADOPT AS CURRENT COMPARISON CANDIDATE**, not production Current and not V5 completion.
- Next application: prefer route/path + typographic scale over dot/stepper chronology when a travel-magazine story can carry sequence without UI controls.

## Experiment B — BZ inside history title subtraction

- Visible problem: BU/BP right-page history photo was strong, but the large cream title paper over the upper-left photo still read as a rectangular content card and reduced photographic dominance.
- Principle tested: remove the card and make the existing native heading/subtitle work directly on photography with restrained print-style contrast support.
- Candidate: `V5_INSIDE_RURUBU_CLEANROOM_BZ_HISTORY_DIRECTPHOTO_TYPE_2026_08_11` — frame `798:2`.
- Change: hid existing `BK_HISTORY_TITLE_PAPER` (`798:247`); kept semantic/native `IA_HISTORY_HEADING` (`798:248`) and `IA_HISTORY_SUB` (`798:249`), moved them onto the sky area, changed to white/cream text, and added only restrained dark drop shadows for legibility. No new text, cards, photos, gradients, or decorative modules.
- Expected improvement: make the Yokohama history photograph lead the page and reduce card/UI grammar while retaining editorial hierarchy.
- Regression risk: headline legibility could collapse against the sunset or overlap staggered timeline labels.
- Evidence: spread and right-page screenshot review shows a clearer full-bleed photo hierarchy; history header-zone structure QA found `0` text-text intersections; visible native text count is `54`, IMAGE count `6`; all six existing image hashes remained unchanged; fold guide remains `x=792.7000122070312`, width `2`, height `1122.5`.
- Status: **ADOPT AS CURRENT COMPARISON CANDIDATE** over BU for the inside concept, still rollback-safe and not production Current.
- Next application: when an editorial photo has a usable text-safe zone, test direct-on-photo native typography before introducing an opaque paper/card.

## Q60 transport result in this run

- Drive authority was freshly re-read: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG; previously verified source size `155,439` bytes and SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2` remain the Q60 authority.
- A rollback-safe outer staging duplicate was created as `794:2`, hero `794:133`; Current frames were not touched.
- The prior shared-plugin-data chunk continuation could not be resumed: expected historic chunks were absent under the tested stable namespace, and the runtime also rejected private plugin-data key introspection. Both failed atomically; no Q60 bytes or image fill were adopted.
- Per the two-failure switch rule, the shared-plugin-data resume method was stopped for this run and work moved to BY/BZ visual defects instead of repeating transport attempts.
- Strict state: Q60 **Drive verified = YES; Figma exact placed = NO; Figma Q60 visual QA = NO**.

## Run status

- New image generation: `0`.
- Newly adopted generated asset: `0`.
- BY/BZ layout changes: placed in safe duplicate frames and visually + structurally verified.
- Current outer/inside: untouched.
- V5 gate: still incomplete because the exact Q60 dominant-cover raster has not completed the placement/readback/screenshot gate.
- V6 production: not started; existing V5 gate remains authoritative.
