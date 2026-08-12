# V5 EI — destination-type dominance / Q60 transport truth — 2026-08-12

Scope: Rurubu WEDDING only.

## Starting authority
- live Figma Best: EH outer `1061:2`, EG inside `1057:2`
- Current preserved: outer `77:18`, inside `77:290`
- Drive Q60: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, 1330×1220 JPEG, 155,439 bytes, SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`
- GitHub main before writes: `cae8c30bac150dddaf0f09a06732322b7f95ad7d`

## Visible problem
EH was already photo-led, but at thumbnail scale the cover destination hierarchy was still less decisive than a strong Japanese travel-information magazine. `横浜` and `ふたり旅。` shared nearly the same scale and the 01/02 feature relationship was comparatively restrained.

## Principle tested
Use Japanese destination typography as a dominant editorial image, not as a UI heading. Preserve the accepted photo collage, then create stronger large/medium/small relationships through type scale and a more aggressive overlap rather than adding cards, shadows or gradients.

## Clean-room implementation
A rollback-safe duplicate was created as EI `1067:2` from EH. Current was not edited.

Front `1067:131` changes:
- `横浜` enlarged to 112px via native-text range styling while `ふたり旅。` remains materially smaller at 58px.
- support kicker moved upward and reduced so it does not compete with the destination.
- `思い出スポット 大特集` remains magenta direct-on-photo type.
- Feature 01 number increased to 80px; feature title remains separate native type.
- Feature 02 photo enlarged to 372×282 and tilted about -5.2° across the hero/lower-photo boundary.
- Feature 02 yellow editorial tape expanded to follow the photo relationship; no new rounded card or shadow was introduced.
- Feature 03 remains direct-on-photo with the slim yellow rule.
- preserved all accepted existing image hashes; no generated image was newly adopted.

## Q60 attempt
The exact Drive master was materialized by the authenticated Drive connector into the runtime as `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg` and re-verified at 155,439 bytes.

A fresh official Figma `upload_assets` target was issued specifically for safe-duplicate hero node `1067:133`. The exact local JPEG bytes were POSTed with `Content-Type: image/jpeg`, but the runtime failed before upload with `curl: (6) Could not resolve host: mcp.figma.com`.

The failure did not mutate Figma. EI hero was renamed truthfully to `EI_HERO_EXISTING_FIGMA_PROXY_Q60_OPEN` and still has image hash `539c259be8036b481d06b4f76db9a39b407d90e8`, which is V5-05 history-derived evidence, not Q60 provenance.

## Visual QA
EI was compared against EH rather than promoted from structure alone.

- thumbnail: 500px whole outer — PASS and EI selected over EH for stronger destination recognition
- reading/whole: 1000px outer — PASS
- actual-size front: 794×1123 — PASS
- actual-size back: 794×1123 — PASS; back was inherited unchanged from EH and re-rendered

The initial EI structural pass found Feature 01 number at x=16 inside the bounded 18px safe-area heuristic. It was moved to x=20 before promotion.

## Final structure QA
- comparator: `1067:2 / EI`
- front/back: `1067:131` / `1067:3`
- native visible text: 37
- visible IMAGE fills: 6
- same-parent text intersections: 0
- bounded safe-area text risks: 0
- fold: `1067:184`, x=792.7, 2×1122.5
- preserved front image hashes: hero `539c259...`, Feature 02 `d76eb07...`, lower street `439a719...`
- Current outer/inside remained `77:18 / 77:290`

## Promotion
- Review Best Outer snapshot: `1069:2`
- old EH Review `1064:2` preserved hidden as rollback
- Best Inside remains EG `1058:2`
- Review label: `BEST CLEANROOM — OUTER / EI`
- Start Here status: `EI outer / EG inside`

## Result
ADOPTED as the best current V5 outer comparator because the destination is legible first at thumbnail scale and the photo/type hierarchy is more unmistakably travel-editorial without adding UI furniture.

Q60 exact Drive→Figma placement remains OPEN. V5 is not complete and V6 production remains blocked.
