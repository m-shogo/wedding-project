# 2026-08-10 — V5 outer clean-room AH / AJ / AK Q60-ratio editorial pass

## Scope

Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

Authorities re-read before production and evidence writes:
- project `AGENTS.md`
- project `README.md`
- live Figma page `01_RURUBU_WEDDING`
- Current outer `77:18`
- Current inside `77:290`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- Google Drive Q60 master readback and local materialized-image visual inspection
- GitHub main beginning at `31f1ccff682f28046d5ff8e2ab173cbca07924bc`

## Scratch-selection decision

AG `699:2` is stronger than legacy Current, but its `774×1010` full-photo hero is not the geometry that would be selected from scratch once the real Q60 master is considered. Q60 is `1330×1220` (aspect about 1.09), while the AG hero is much more vertical (aspect about 0.77). A full-height FILL placement would therefore create unnecessary crop pressure on a verified destination photograph.

The strongest next experiment was not more cleanup of AG. It was a materially different Q60-ratio-aware cover structure that preserves large photography while giving the lower feature hierarchy its own print-native editorial floor without cards.

## Q60 live authority readback

Fresh Google Drive readback:
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- bytes: `155,439`
- raw file materialized successfully in the runtime

Fresh visual inspection of the materialized master confirmed:
- broad sky and water on the left provide a strong text-safe zone
- Yokohama landmark tower / waterfront / ferris-wheel mass sits center-right
- believable destination photography; no baked final editorial text
- the image benefits from a near-square/landscape crop more than AG's tall full-page crop

No new image generation was needed this run because the source quality bottleneck is transport/placement, not master selection.

## AH — rejected feature-cluster amplification

Created duplicate:
- `703:2 / V5_OUTER_RURUBU_CLEANROOM_AH_FEATURE_CLUSTER_EDITORIAL_2026_08_10`

Problem tested:
- AG's lower feature cluster was still orderly and light in scale contrast.

Changes:
- Feature 01 number/headline enlarged
- 02/03 strengthened
- teaser photos enlarged and rotated slightly more
- feature kicker changed to native Noto Sans JP
- `誌面先取り` copy changed to a more editorial `寄り道メモ`

Expected improvement:
- stronger asymmetry and cover-level hierarchy.

Regression risk:
- enlarged Japanese headline could become cramped at actual size.

Actual-size screenshot found the regression: Feature 01 line spacing became visibly cramped and the headline lost clean reading rhythm. AH is preserved as comparison evidence but **rejected**.

## AJ — Q60-ratio-aware editorial floor

Created duplicate:
- `704:2 / V5_OUTER_RURUBU_CLEANROOM_AJ_Q60_RATIO_EDITORIAL_FLOOR_2026_08_10`
- front `704:129`
- hero `704:130`

Key change:
- hero changed from `774×1010` to `774×780`, materially closer to the real Q60 master ratio
- lower feature hierarchy moved onto the existing cream paper field rather than staying over the full-height provisional image
- no card, rounded rectangle, pill, gradient, dashboard panel, or generic shadow system was introduced
- teaser photos intentionally overlap the photo/paper transition
- Feature 01 remains dominant; 02/03 are smaller secondary items
- Japanese feature headlines switch to dark navy on cream for print-scale legibility
- feature kicker uses `Noto Sans JP Bold` rather than the previous Inter assignment

Visual result:
- whole-spread screenshot retained strong photo-led magazine silhouette
- front actual-size screenshot showed cleaner 01/02/03 reading than AH
- real Q60 geometry is substantially safer than AG's tall full-photo field
- the lower area reads as a typographic editorial floor rather than a set of UI cards

## AK — editorial callout repair

Created duplicate:
- `705:2 / V5_OUTER_RURUBU_CLEANROOM_AK_EDITORIAL_CALLOUTS_2026_08_10`
- front `705:129`

Visible problem in AJ:
- `今号の3大特集` was too dark at the photo/paper seam
- the two supporting travel photos still read partly as unlabeled decorative pictures

Changes:
- moved the feature kicker slightly upward and changed it to warm white with a very small shadow for photo contrast
- added native editable micro captions directly to the verified teaser imagery:
  - `705:163 / AK_TEASER_COAST_CAPTION / 海辺の絶景`
  - `705:164 / AK_TEASER_OLDTOWN_CAPTION / 街歩き`
- captions are plain native text, no pill/badge/card background
- verified coast/old-town photo hashes and non-destructive image fills were preserved

Expected improvement:
- stronger Japanese travel-magazine information density without introducing UI containers
- teaser photography gains a clear editorial job instead of decoration-only reuse

Regression risk:
- caption clutter or collisions around the photo overlap.

Fresh whole-spread and front actual-size screenshots show the captions remain subordinate and readable. Fresh geometric structure QA found no same-parent visible text intersections.

## AK fresh structure QA

`705:2`:
- visible native text: `41`
- visible IMAGE fills: `8`
- same-parent visible text intersections: `0`
- fold guide `705:162`: `2×1122.5`, visible

Verified image hashes:
- back main `705:6`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `705:18`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `705:22`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- provisional hero `705:130`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- logo `705:134`: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `705:135`: `0cbbf09357938365c2550f08928be1db33fa6060`
- coast teaser `705:158`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- old-town teaser `705:159`: `439a719d73f28e8dd2889f2026cccb15f345ec63`

Current protection readback:
- Current outer remains `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- Current hero `77:148` remains hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- no Current promotion performed

## Inside check

Fresh whole-spread screenshot of Current inside `77:290` was reviewed after AK. The inside currently has stronger hierarchy and no defect with comparable visual leverage to the unresolved cover hero. No speculative inside edit was made just to consume work time.

## Adoption decision

- AH: **REJECTED** because actual-size Japanese feature typography became cramped
- AJ: **ADOPTED OVER AG AS STRUCTURAL DIRECTION** because it materially reduces crop risk against the real Q60 source while retaining photo-led magazine energy
- AK: **ADOPTED OVER AJ AS THIS RUN'S BEST OUTER COMPARATOR** because its seam kicker and native teaser captions improve readability/editorial purpose without adding UI containers
- Q60 master: Drive-verified, raw materialized, visually inspected, **NOT placed in Figma**
- Current promotion: **NOT PERFORMED**
- V5 completion: **NOT CLAIMED**
- V6 production: **NOT STARTED**

## Learning / next application

1. A layout can look stronger with a provisional image yet still be structurally wrong for the accepted master. Source aspect ratio must participate in cover-selection decisions before promotion.
2. Full-photo is not automatically more magazine-authentic. When the accepted image is near-square/landscape, a photo field plus unboxed typographic editorial floor can preserve both image integrity and dense magazine hierarchy.
3. Increasing feature scale can create a Japanese line-height regression even when the thumbnail improves. Actual-size review decides the adoption.
4. Small native captions can give supporting travel photographs an editorial function without requiring sticker/card UI.
5. Do not retry the exhausted external Figma upload or model-visible large-base64 transcription paths merely to produce activity. Q60 remains the only active photo-role blocker.

Status: `AK_VERIFIED_BEST_COMPARATOR_THIS_RUN / Q60_RATIO_AWARE / CURRENT_UNCHANGED / Q60_DRIVE_VERIFIED_AND_VISUALLY_INSPECTED_BUT_FIGMA_NOT_PLACED / V5_GATE_OPEN / V6_NOT_STARTED`
