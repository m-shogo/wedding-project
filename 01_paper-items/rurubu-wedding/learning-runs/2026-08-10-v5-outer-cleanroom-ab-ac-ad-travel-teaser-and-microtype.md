# 2026-08-10 — V5 outer clean-room AB / AC / AD travel-teaser and microtype pass

## Scope

Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

Authority re-read before writes:
- live Figma `01_RURUBU_WEDDING`
- Current outer `77:18` and Current inside `77:290`
- Google Drive Q60 cover master
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- GitHub main at `d161d2812b1b7b6d1b9b5a204e48e63b924fe4f7`

## Scratch-selection decision

AA `688:2` was materially stronger than legacy Current, but at actual size its front cover still read too strongly as one large hero plus a neat two-column index. If designing from scratch, it would not yet be selected as the final travel-information-magazine direction. A new clean-room branch was therefore justified rather than continuing only incremental cleanup.

## Visible problem

1. The front cover lacked the dense photo-teaser rhythm expected from a Japanese travel-information magazine.
2. The lower half of the front cover was visually sparse and overly orderly.
3. The back-cover photo subtitle was too small/yellow to read reliably at actual size.
4. Friends captions remained at 9px and were visibly weaker than the surrounding editorial hierarchy.

## Principle / capability tested

- reuse only already verified, provenance-safe travel imagery as small non-destructive teaser crops rather than generating decorative filler
- use photography plus native Japanese typography to add density; do not add cards, pills, generic shadows, or dashboard modules
- create materially different large/medium/small relationships in the feature index
- inspect whole-spread, page/reading, and actual-size views after meaningful edits
- combine screenshot QA with geometry intersection QA; do not trust screenshots alone

Expected improvement: stronger travel-magazine silhouette, more photo-led editorial energy, less UI-grid feeling, and better actual-size readability.

Regression risks: teaser duplication feeling, feature-text collisions, fold drift, small-caption collisions, hash/source drift, or accidental mutation of Current.

## AB — verified travel teaser collage

Created duplicate:
- `691:2 / V5_OUTER_RURUBU_CLEANROOM_AB_TRAVEL_TEASER_COLLAGE_2026_08_10`
- front page `691:129`

Key changes:
- provisional hero reduced from `766×744` to `766×650` to make room for a more magazine-like editorial transition instead of a single-image wall
- added two small non-destructive teaser crops from already verified Current sources:
  - `691:162 / AB_TEASER_COAST_VERIFIED` from `77:430`, hash `adbb8e529451a81dd25e4eb29bf068655569ce25`, `236×156`, rotation `-2.4°`
  - `691:163 / AB_TEASER_OLDTOWN_VERIFIED` from `77:438`, hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, `166×122`, rotation `3.1°`
- added only native text label `横浜旅の見どころ`; no baked text in images
- moved the feature navigation upward and retained a thin magenta editorial rule instead of introducing cards

Whole-spread and front actual-size screenshots showed a clear improvement over AA: the cover now reads as a dominant-photo cover with editorial travel teasers rather than a large hero followed by a clean app-like index.

## AC — dense native feature hierarchy

Created duplicate:
- `692:2 / V5_OUTER_RURUBU_CLEANROOM_AC_DENSE_NATIVE_FEATURE_HIERARCHY_2026_08_10`
- front page `692:129`

Key changes from AB:
- added native `今号の3大特集` kicker and a thin print rule
- Feature 01 promoted to `44px` number / `25px` headline
- Features 02/03 promoted to `34px` numbers / `22px` headlines
- descriptions raised to `12px`
- vertical editorial divider extended to support the asymmetrical reading order
- no new image, card, badge, rounded rectangle, gradient, or UI panel was added

Actual-size front screenshot confirmed the three-feature block reads more like magazine cover typography and less like three equally weighted navigation items.

## AD — back actual-size microtype repair

Created duplicate:
- `694:2 / V5_OUTER_RURUBU_CLEANROOM_AD_BACK_MICROTYPE_LEGIBILITY_2026_08_10`
- back page `694:3`

Key changes from AC:
- `BACK_VISUAL_SUB` increased `10px → 12px` and changed from weak yellow to warm white with a restrained existing-style dark shadow
- Friends cafe/dining captions increased `9px → 10.5px`
- no photography or content identity changed

Initial structure QA detected a real `2px` intersection between the left Friends caption `694:21` and `ふたりの旅年表` `694:26`. The first AD state was therefore not counted as a pass. The caption was moved to `y=892`; fresh actual-size screenshot and structure QA then showed zero same-parent text intersections.

## Final AD live QA

`694:2`:
- visible native text: `41`
- visible IMAGE fills: `8`
- same-parent visible text intersections: `0`
- fold guide: `694:167`, x=`792.7`, `2×1122.5`, visible

Preserved image hashes:
- back main `694:6`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- Friends cafe `694:18`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `694:22`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- provisional hero `694:130`: `539c259be8036b481d06b4f76db9a39b407d90e8`
- logo `694:135`: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
- date badge `694:136`: `0cbbf09357938365c2550f08928be1db33fa6060`
- coast teaser `694:161`: `adbb8e529451a81dd25e4eb29bf068655569ce25`
- old-town teaser `694:162`: `439a719d73f28e8dd2889f2026cccb15f345ec63`

Current protection readback:
- Current outer remains `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- Current hero `77:148` remains hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- no Current promotion was performed

## Q60 master / placement boundary

Fresh Drive readback:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- raw file materialized successfully in the runtime

A fresh single-use Figma `upload_assets` endpoint was issued for AC hero `692:130`, but the raw-byte POST again failed before transfer because the execution container could not resolve `mcp.figma.com` (`curl: (6) Could not resolve host`). The hero hash remained `539c...`; no placement occurred. This method is now considered exhausted under the same runtime capability and must not be repeated merely for activity.

## Adoption decision

- AB: ADOPTED as a stronger intermediate cover than AA
- AC: ADOPTED over AB for the stronger lower-cover native typography hierarchy
- AD: ADOPTED as this run's strongest outer comparator after microtype repair and zero-overlap recheck
- Current promotion: NOT PERFORMED
- Q60 placement: NOT COMPLETED
- V5 completion: NOT CLAIMED
- V6 production: NOT STARTED

## Learning / next application

- A Rurubu-like cover can gain authentic density from two small, role-matched travel-photo teasers more effectively than from additional badges or cards, provided the hero remains dominant and the teaser crops have intentional scale/rotation differences.
- When a clean-room cover becomes photo-led, the next effective density gain is often native Japanese headline hierarchy, not another image or decorative sticker.
- Actual-size microtype remains a separate gate from whole-spread attractiveness. A visually successful collage can still fail because 9px captions or low-contrast photo text become weak at print scale.
- Geometry QA must follow every microtype enlargement: this run caught a 2px collision that the visual screenshot alone could easily miss.
- Q60 remains the only active photo-role blocker. Do not promote AD until the real Q60 source is binary-safely placed and AD wins again at whole-item, page/reading, and actual-size scales.

Status: `PROTOTYPED / AB_ADOPTED_INTERMEDIATE / AC_ADOPTED_INTERMEDIATE / AD_VERIFIED_BEST_COMPARATOR_THIS_RUN / CURRENT_UNCHANGED / Q60_TRANSPORT_BLOCKED / V5_GATE_STILL_OPEN`
