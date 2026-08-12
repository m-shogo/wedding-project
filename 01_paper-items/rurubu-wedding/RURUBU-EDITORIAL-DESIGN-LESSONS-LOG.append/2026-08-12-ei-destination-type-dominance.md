# EI — destination typography as a primary image — 2026-08-12

## Lesson

A photo-led cover can still feel like a brochure when the destination name, companion title and feature modules are too evenly weighted. EI demonstrates that a Japanese travel-magazine cover can gain more authenticity by making the destination word itself a primary visual object before adding any new decorative furniture.

## What changed

- Safe duplicate EI `1067:2` was created from EH; Current `77:18 / 77:290` remained untouched.
- Native headline node `1067:143` keeps editable text `横浜\nふたり旅。`, but `横浜` was increased to 112px and `ふたり旅。` reduced to 58px.
- Feature 01 number was increased to 80px and kept direct-on-photo.
- Feature 02 photo was enlarged to 372×282 and rotated about -5.2° so it crosses the hero/lower-photo boundary more decisively.
- The associated yellow editorial tape follows the tilted photo instead of becoming a generic card.
- Feature 03 remains direct-on-photo with a narrow yellow rule.
- No rounded rectangles, generic shadows, gradients or new visual modules were introduced.

## Rejected / repaired state

The first EI structural pass placed Feature 01 `01` at x=16, inside the bounded 18px safe-area heuristic. It was moved to x=20 and the candidate was rechecked before promotion.

## Three-scale evidence

- thumbnail / whole outer at 500px: PASS; EI selected over EH because `横浜` is recognized first and the cover silhouette is stronger
- reading / whole outer at 1000px: PASS
- actual-size front 794×1123: PASS
- actual-size back 794×1123: PASS, inherited unchanged from EH and re-rendered
- native visible text: 37
- visible IMAGE fills: 6
- same-parent text collisions: 0
- bounded safe-area text risks: 0
- fold: `1067:184`, x=792.7, 2×1122.5

## Q60 provenance lesson

Drive successfully materialized the exact Q60 JPEG (`1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, 1330×1220, 155,439 bytes) into the runtime. A fresh official Figma `upload_assets` target was issued for safe node `1067:133`, but the byte POST stopped before upload because `mcp.figma.com` could not be resolved.

Therefore EI hero remains existing hash `539c259be8036b481d06b4f76db9a39b407d90e8`. That hash belongs to previously verified V5-05 history imagery and is not evidence of Q60 placement. The node is named `EI_HERO_EXISTING_FIGMA_PROXY_Q60_OPEN` to keep that truth visible in Figma.

## Reusable rule

For travel-editorial covers, use **type-scale contrast before extra furniture**. One extremely clear destination word, one materially smaller companion line, and subordinate feature scales can create a stronger magazine silhouette without adding boxes. Any large Japanese display-type change must be checked both visually at actual size and structurally for safe area, wrapping and collision.

Transport preparation is never placement: Drive readback, local materialization and an issued upload target remain incomplete until the exact Figma node/hash and screenshot evidence agree.
