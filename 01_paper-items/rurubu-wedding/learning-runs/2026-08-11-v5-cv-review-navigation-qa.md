# Rurubu V5 — CV editorial masthead/timeline + Figma review navigation QA

Date: 2026-08-11
Scope: Rurubu WEDDING only

## Authority reread
Before writes, re-read repository project authorities (`AGENTS.md`, `CLAUDE.md`, Rurubu Current status/search authority) and Drive `00_Figma本番前_Current Authority・制作ルール`. The Drive authority reconfirms: Rurubu is first priority, production source is the current Figma file, use native/editable structure, do not copy protected publication identities, real people are not replaced by AI, and print working geometry remains A4 two-fold with center fold and production QA requirements.

## Visible problems
1. Figma had become difficult to navigate because Current, active review, working duplicates, and legacy experiments were not obvious from the file entrance.
2. `04_RURUBU_REVIEW` placed Best and Current too far apart to compare comfortably at whole-item scale.
3. CT outer still used a weak light masthead over the bright sky; back-cover journey milestones had too little scale contrast.
4. The dominant cover raster remains a 640×587 semantic proxy and is visibly soft at actual size.

## Principle / capability tested
- Treat file navigation and comparator legibility as design-production quality, without moving or editing true Current artwork.
- Use one explicit start page and separate Current / Review / Working / Legacy responsibilities.
- Strengthen print hierarchy with native typography and scale contrast, not new UI cards or ornamental systems.
- Keep asset truth separate from composition quality: a stronger candidate does not pass the cover-photo gate while the proxy raster remains.

## Figma organization work
- Created page `00_RURUBU_START_HERE` — page node `845:2`.
- It points to Current, Review, Working, and legacy/research responsibilities and explicitly says Current is not directly edited.
- Tightened `04_RURUBU_REVIEW` into a two-column Best-vs-Current comparison, preserving Current snapshots and CM inside.
- After CV verification, Review Best outer was promoted from CT snapshot to `BEST OUTER — CV — source 848:2`, review node `851:2`; label now reads `BEST CLEANROOM — OUTER / CV`.
- Start page status now reads `Best comparator: CV outer / CM inside | V5 gate: NOT COMPLETE | V6: NOT STARTED`.

## CV experiment
Source: rollback-safe Working CU.
Candidate: `V5_OUTER_CV_EDITORIAL_MASTHEAD_TIMELINE_2026_08_11` — node `848:2`.
Front: `848:131`.
Back: `848:3`.

Changes:
- Converted the cover masthead to a single-line dark navy native `旅するWEDDING` for stronger contrast against the bright sky.
- Preserved the dominant `横浜` + magenta `ふたり旅。` hierarchy.
- Reworked back-cover travel-log year typography with unequal scale/position; emphasized `2026.10.24` in magenta rather than treating all milestones equally.
- Added no new cards, pills, shadows, or generic UI containers.

## Regression and repair
Initial CV screenshot was rejected because:
- the masthead wrapped into two lines and collided with the destination headline;
- the final wedding date wrapped into `2026.10 / 24`.

After repair, programmatic structure QA found one remaining intersection between the fifth event detail and the final wedding date. The date was nudged while remaining inside the back-cover width, then QA was rerun.

## Final evidence
- candidate node: `848:2`
- front node: `848:131`
- fold: `848:186`, x=`792.7000122070312`, y=`0`, `2 × 1122.5`
- visible native text: `37`
- IMAGE fills: `7`
- same-parent visible text intersections: `0`
- hero node: `848:133` (`CU_HERO_Q60_EXACT_PENDING`)
- hero hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- hero natural size: `640 × 587`
- whole-item screenshot QA: PASS for composition/navigation comparison
- front actual-size screenshot QA: PASS for typography/composition; raster-quality gate still FAIL
- Review comparison screenshot after promotion: PASS
- Start-page screenshot after status update: PASS

Other image evidence remained unchanged, including back main memory `e3738476f760932bb5b09c9d60f174dd6c84049d` (944×608), friend photo hashes, verified date badge, and teaser-photo hashes.

## Asset truth
The in-file audit found no already-imported semantically valid high-resolution cover asset that can replace the exact Q60 derivative. The existing semantic cover proxy is still 640×587. The higher-resolution history derivative is not promoted to cover because its role/provenance is wrong for that use.

Known Q60 authority remains `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, 1330×1220 JPEG, 155,439 bytes. Exact Q60 Figma placement and Figma visual QA are still not complete.

## Adoption decision
- CV composition/typography: ADOPT as current outer comparator over CT.
- CM inside: RETAIN as current inside comparator.
- True Current outer `77:18` / inside `77:290`: UNCHANGED.
- CV hero raster: NOT ACCEPTED as production-quality cover asset.
- generated new image this run: NO
- adopted new generated image this run: NO
- exact Q60 placed: NO
- PHOTO_ROLE_PASS: `9/10`
- dominant-photo pass: `2/3`
- V5 complete: NO
- V6 production started: NO

## Next application
Do not add more cover decoration around the 640×587 proxy. The next cover-quality work should be a semantically valid high-quality cover master/derivative with exact provenance, followed by exact Figma placement and thumbnail/page/actual-size crop QA. Keep the new Start/Review/Working separation so future clean-room candidates do not make the file unreadable again.
