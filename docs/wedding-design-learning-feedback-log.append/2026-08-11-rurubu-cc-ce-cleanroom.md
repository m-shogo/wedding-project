# 2026-08-11 Rurubu WEDDING clean-room feedback — CC / CE

Scope: Rurubu WEDDING only. Current outer `77:18` and Current inside `77:290` were re-read and left untouched.

## CC — inside photo-led editorial subtraction

- Visible problem: BZ/CA still carried application-like lower-page grammar: pale-blue section field, broad heading paper, number boxes, then a wide yellow common-point banner on the left page.
- Principle tested: subtract section containers and broad highlight fields; use warm print paper, large photography, unequal collage scale, native Japanese typography, and compact color accents.
- Candidate: `801:2` — `V5_INSIDE_RURUBU_CLEANROOM_CC_COMMONPOINT_SUBTRACTION_2026_08_11`.
- Expected improvement: make both pages feel like one travel-magazine spread rather than a profile form plus a separate Memory Spots widget zone.
- Regression risk: captions could collide with photos/footer; removing the yellow field could weaken the common-point hierarchy.
- Evidence: whole-spread screenshot and natural-size right-page review; final visible native text `54`; text intersections `0`; IMAGE fills `6`; all accepted hashes preserved; fold guide `801:283` at x=`792.7000122070312`, 2×1122.5.
- Regression found/fixed: CA initially exposed three sequential collisions across main-title/caption/footer and city metadata. Each was repaired and re-read before CC was derived.
- Status: **ADOPT CC AS STRONGEST INSIDE COMPARATOR, NOT CURRENT**.
- Next application: when a colored banner behaves as a module rather than editorial emphasis, compress it to a rule/rail and let native type carry the message.

## CE — outer aggressive photo overlap + feature hierarchy

- Visible problem: BY retained a small feature card and an 820px soft hero; CB removed the card but created too much quiet ivory; CD added stronger 02/03 photo overlap but 01 remained timid.
- Principle tested: bound a weak raster as mitigation, remove its feature card, then rebuild lower-cover density through unequal photo overlap and a much larger 01 hierarchy rather than new widgets.
- Candidate: `801:284` — `V5_OUTER_RURUBU_CLEANROOM_CE_FEATURE01_SCALE_HIERARCHY_2026_08_11`; front page `801:413`.
- Expected improvement: stronger Japanese magazine-cover silhouette at thumbnail and reading scale; 01 becomes unmistakably primary while 02/03 behave as overlapping secondary stories.
- Regression risk: large typography can collide with rotated article photos; bounding the hero must not be misreported as solving raster softness.
- Evidence: whole-spread screenshot plus natural `794×1123` front-page review; final native text `37`; text intersections `0`; IMAGE fills `7`; fold guide `801:466`, x=`792.7000122070312`, 2×1122.5.
- Regression found/fixed: CD had two text collisions and CE added one descriptor/03-number collision. All were repaired and final structure QA is zero-intersection.
- Status: **ADOPT CE AS STRONGEST OUTER COMPARATOR, NOT CURRENT**.
- Next application: use hierarchy and overlapping photography to solve timid lower-cover space before adding any extra callout or decorative block.

## Q60 / gate truth

- Q60 Drive authority was freshly read and materialized: Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes, known SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.
- Fresh Figma `upload_assets` target was obtained for safe staging `794:133`, but the execution environment could not reach the `mcp.figma.com` POST endpoint. No placement was claimed.
- Generated new images `0`; newly adopted generated images `0`.
- Q60 exact Figma placement `NO`; Q60 screenshot/crop QA `NO`.
- V5 remains incomplete (`photoRolePass 9/10`, dominant 2/3); V6 production remains not started.