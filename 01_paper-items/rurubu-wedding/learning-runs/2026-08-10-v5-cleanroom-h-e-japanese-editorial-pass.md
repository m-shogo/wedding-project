# Rurubu V5 — clean-room H outer / E inside Japanese editorial pass

Date: 2026-08-10
Status: `PROTOTYPED / STRONGER_MAGAZINE_DIRECTION / CURRENT_UNCHANGED / HERO_ROLE_NOT_FINAL`
Scope: Rurubu WEDDING only

## Authorities re-read

Before writes, the run re-read current project-wide production, asset-generation, AI-learning, design-feedback, project-memory, and quality-over-legacy authorities, plus latest Rurubu Current status and the most recent clean-room density evidence. Live Figma remained the highest authority. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was modified.

## Starting diagnosis

The legacy-derived Current still reads too much like a carefully organized profile booklet. The user feedback remains that the Rurubu result is visibly too weak. The largest remaining visual gain is not another badge or microtype pass; it is stronger Japanese-led magazine hierarchy, dominant photography, asymmetric collage, and denser but controlled editorial rhythm.

Anti-anchoring answer: neither the legacy outer nor the existing inside would be selected unchanged if starting from scratch for a stronger Japanese travel-information-magazine result.

## Clean-room H outer

Frame:
- `613:2 / V5_OUTER_RURUBU_CLEANROOM_H_MAX_EDITORIAL_2026_08_10`
- front `613:129 / FRONT_COVER_CLEANROOM_H_MAX_EDITORIAL`
- back `613:3 / BACK_COVER_PRESERVED_COMPARATOR`
- fold `613:158`

### Visible problem tested

Clean-room G was the strongest prior outer comparator, but still retained an overly polite corporate/title treatment and insufficiently Japanese editorial hierarchy on the back cover.

### Changes

Front:
- expanded hero geometry to approximately `748 × 650`
- increased headline hierarchy to `最高の / WEDDING DAY`, with `WEDDING DAY` at 54 px
- strengthened the native Japanese kicker `横浜で叶える、ふたり旅`
- pushed three support photographs into an unequal, overlapping collage with controlled rotations
- added white image strokes for clearer scrapbook/editorial separation over the hero
- retained one dark interview strip and the pink/cyan/yellow baseline rather than adding new cards
- kept the verified native logo/date-badge assets and native text

Back:
- replaced the generic English-first title with Japanese-led `旅の途中で見つけた / 大切な景色と人`
- changed section headings to `みんなとの思い出` and `ふたりの旅年表`
- enlarged the main photo and kept the text as a compact dark editorial overlay
- screenshot QA found a real heading/body collision inside that overlay; it was corrected before final evidence

### Image-fidelity correction

The first H structure readback exposed stale friend-image hashes inherited from an older comparison frame. This was not accepted. The candidate was corrected by copying the verified Current fills into the corresponding H semantic roles:

- `613:23 / BACK_VISUAL_FRIEND_2_PHOTO` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- `613:27 / BACK_VISUAL_FRIEND_3_PHOTO` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- `613:156 / CF_SUPPORT_PHOTO_2` → `c1ada11205bc3978bf426b304d683f1c1566cac2`
- `613:157 / CF_SUPPORT_PHOTO_3` → `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

Back main remains verified hash `e3738476f760932bb5b09c9d60f174dd6c84049d`.

The H front hero currently uses existing verified history-photo hash `539c259be8036b481d06b4f76db9a39b407d90e8` only as a layout comparator. It is **not** promoted or relabeled as the actual cover-hero role. This avoids falsely claiming the cover asset gate is closed.

### Three-scale QA

Whole item:
- materially stronger magazine silhouette than Current
- front has clearer photo dominance and collage energy
- back now reads Japanese-first and less like a template or dashboard

Reading/page:
- front headline, teaser collage, interview strip, and three bottom feature groups retain a clear reading order
- back main photo, `みんなとの思い出`, and `ふたりの旅年表` remain distinct
- the screenshot-detected back overlay collision was fixed before final whole-item QA

Detail/actual-size:
- native Japanese text remains editable
- support-photo borders remain clean
- no obvious clipping in the final page screenshots
- fold guide remains visible

Structure:
- H native text: `59`
- visible text: `40`
- IMAGE-fill nodes: `11`
- visible IMAGE-fill nodes: `9`
- fold `613:158`: visible, `2 px`

Decision:
- `PROTOTYPED / STRONGEST OUTER EDITORIAL DIRECTION THIS RUN / NOT CURRENT`
- reason: the real cover-hero role is still unresolved; the H hero is a verified V5 image reused only for layout comparison, not an accepted cover hero.

## Clean-room E inside

Frame:
- `615:2 / V5_INSIDE_RURUBU_CLEANROOM_E_JP_EDITORIAL_2026_08_10`
- left `615:3`
- right `615:125`
- fold `615:273`

### Visible problem tested

Current inside had already improved photo scale, but the large English headings (`OUR PROFILE / ABOUT US`, `OUR HISTORY`, `MEMORY SPOTS / MINI MAP`) still made the spread read more like a modern template than a Japanese travel magazine.

### Changes

- `OUR PROFILE / ABOUT US` → Japanese-led `ふたりのプロフィール`, with English moved into secondary copy
- `3 QUESTIONS` → `ふたりに3つの質問`
- `OUR HISTORY` → `ふたりの旅年表`
- `MEMORY SPOTS / MINI MAP` → `思い出スポット`
- enlarged the bride circular crop to about `218 × 218` and groom photo to about `300 × 312`, strengthening intentional overlap and unequal scale
- enlarged Q1 and the lead Memory Spot title
- slightly increased lead/support Memory Spot photo geometry while preserving verified fills

### Three-scale QA

Whole spread:
- Japanese-led section scanning is substantially faster
- spread feels more like a Japanese editorial feature and less like an English-template profile booklet
- existing photo hierarchy and asymmetric profile treatment remain intact

Reading/page:
- left-page screenshot shows clear profile → Q&A → shared-interest → travel-note order
- right-page screenshot shows history → dominant photo → Memory Spots order
- no card system or new UI container was introduced

Detail/actual-size:
- no obvious clipping in page screenshots
- native text remains editable
- existing semantic photo roles and hashes are preserved
- fold guide remains visible

Structure:
- native text: `95`
- visible text: `57`
- IMAGE-fill nodes: `9`
- visible IMAGE-fill nodes: `6`
- fold `615:273`: visible, `2 px`

Verified visible image hashes exactly match Current for the six active inside images:
- profile A `a39dd297eb9de572317a5ce57f0af12e8597b156`
- profile B `2359f635b4926a83e22ca1f9214e75c709291152`
- history `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory 01 `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory 02 `439a719d73f28e8dd2889f2026cccb15f345ec63`
- visible memory 03 `c09aa82e7b2ac75708707345c6f845452bf67663`

Decision:
- `PROTOTYPED / STRONG JAPANESE EDITORIAL GAIN / NOT YET CURRENT`
- reason: E should receive a 130–150% Japanese copy stress and final fold/detail audit before any promotion decision.

## Current safety

Current remained unchanged:
- outer `77:18`
- inside `77:290`
- Current cover hero `77:148` remains rejected hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- Current fold guides remain intact
- no asset gate count changed

V5 remains open at `PHOTO_ROLE_PASS 9/10`, `ROLE_COMPLETE 9/10`, dominant-photo `2/3`. V6 production remains gated.

## Learning state

### PROTOTYPED / strong evidence

- Japanese-first section naming creates a larger authenticity gain than keeping large English template headings and only adding decoration.
- a cover comparator can use an already verified V5 image to judge hierarchy/collage, but that image must not be falsely counted as the cover role.
- comparison frames must be hash-audited: stale comparison fills can survive clone operations and should be replaced with verified Current fills before visual judgment.
- screenshot QA is required after text hierarchy changes; a structurally valid overlay can still have a visible collision.

### Not PROJECT_RULE yet

These are Rurubu-specific findings. They remain `PROTOTYPED` until repeated or adopted with full QA.

## Next safe work

1. Run 130–150% Japanese long-copy stress on `615:2` before considering inside promotion.
2. Continue H outer refinement only where it improves magazine authenticity; do not decorate for activity.
3. Close the actual V5-01 cover hero with a genuinely binary-safe quality-preserving path. Do not count the H comparator hero as the V5-01 role.
4. Once the cover hero reaches real three-scale QA, compare Current outer against H at whole-item, page, and detail scales.
5. Keep V6 production closed until V5 dummy-design QA is genuinely verified.