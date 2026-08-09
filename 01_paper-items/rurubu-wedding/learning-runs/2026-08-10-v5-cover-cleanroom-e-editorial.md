# Rurubu V5 — clean-room E cover editorial QA

Date: 2026-08-10
Status: `PROTOTYPED / WHOLE_SPREAD_SCREENSHOT_PASS / STRUCTURE_READBACK_PASS / NOT_CURRENT / HERO_QUALITY_BLOCKED`
Scope: Rurubu WEDDING V5 outer cover comparison only

## Visible problem

The previous clean-room C2 cover `598:2` improved density versus legacy, but still contained several amateur/template cues: a fake three-block masthead, a giant white title cloud, a yellow issue bubble, a long vertical pill, and three top mini-gallery cards. Those devices increased activity but weakened the authenticity of a Japanese travel-information magazine cover. The current production cover also remained too polite and grid-like.

## Hypothesis

A stronger Rurubu-like cover should rely on the already-established editable/verified project logo and date badge, one dominant destination photograph, direct Japanese cover lines, strong size contrast, and a compact asymmetric feature band. Removing fake logo blocks and UI-like furniture should improve editorial authority without adding decoration.

Expected improvement:
- stronger cover recognition at thumbnail size
- less AI/template/UI feel
- clearer photo → masthead → main promise → supporting features reading order
- more believable printed travel-magazine silhouette

Regression risks:
- existing cover hero remains the known low-quality hash, so larger placement may make pixelation more visible
- too much subtraction could make the cover generic rather than lively
- direct type over the sky depends on the final hero crop retaining a suitable text-safe zone

## Experiment 1 — rejected coordinate-distorted clone

An initial full-spread clone attempted to reuse the C2 clean-room group and reparent verified logo/date assets. The duplicate exposed a group-coordinate distortion: front-cover content overlaid the back side while fake-logo remnants appeared on the opposite side. This candidate was immediately rejected and deleted. Current and source `598:2` remained untouched.

Lesson: do not assume grouped candidate children preserve the same coordinate basis after clone/reparent. When a group has mixed historical absolute geometry, rebuild the new cover in a fresh frame rather than repairing the distorted clone.

## Experiment 2 — standalone clean-room E cover

Created:
- `608:639 / V5_COVER_RURUBU_CLEANROOM_E_EDITORIAL_2026_08_10`

The cover was rebuilt from scratch in an editable 793.7 × 1122.5 frame.

Preserved/reused only as evidence-safe assets:
- project cover logo copied from the existing verified editable/image role
- date badge copied from the existing verified editable/image role
- current cover hero image only as a temporary layout placeholder

New editorial hierarchy:
- thin pink top rule
- verified Rurubu WEDDING logo as masthead
- date badge at upper right
- native destination slug `YOKOHAMA ふたり旅・保存版`
- large hero photograph occupying most of the page
- direct Japanese lead lines in the upper-left photographic safe zone
- small functional yellow `保存版 ふたり旅` marker
- compact dark interview strip over the lower-right photograph
- asymmetric three-feature lower band with pink/cyan/yellow numbering
- navy issue/footer strip

No new rounded cards, fake masthead boxes, title cloud, issue bubble, vertical UI pill, gallery cards, shadow system, or gradient field was added.

## Full-spread comparator

Created:
- `608:665 / V5_OUTER_RURUBU_CLEANROOM_E_FULLSPREAD_2026_08_10`

The clean-room E cover was paired with the preserved C2 back-cover side for a whole-item comparison. A provisional fold guide was added at the exact center only for QA.

## Three-scale judgment

### Whole item / thumbnail

`608:665` reads more immediately as a magazine cover than `598:2` because the actual project masthead, dominant photo, and main cover line establish a clear silhouette. Removing the fake stacked `る/る/ぶ` blocks, cloud title, issue bubble, and top mini-gallery reduces amateur/template noise while preserving color energy through the masthead and three-color lower rule.

Decision: **clean-room E wins over C2 for cover hierarchy and anti-template quality.**

### Reading/page scale

Reading order is now:
1. masthead + date
2. destination slug
3. dominant destination photo
4. `最高の WEDDING DAY`
5. supporting travel/wedding cover lines
6. interview strip
7. three lower navigation features

The lower features vary vertical position slightly instead of forming equal cards. Main copy remains native text.

### Actual-size/detail

Native type remains editable. The logo/date are not baked into newly generated artwork. Fine issue/footer text remains intentionally subordinate. The current hero is visibly pixelated and therefore cannot pass the photo-quality gate at this enlarged size; this defect remains explicit rather than hidden.

## Structure readback

Full-spread candidate `608:665`:
- native text nodes: `59`
- visible text nodes: `39`
- IMAGE-fill nodes: `8`
- fold guide: `608:818`, visible
- hero node: `608:793`, `758 × 690`
- hero image hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- preserved back-main hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`

The hero hash proves this is still the rejected low-quality source. Therefore the clean-room E layout is **not eligible for Current promotion** yet.

## Adoption decision

`PROTOTYPED → VISUALLY_PREFERRED_LAYOUT_DIRECTION / NOT_CURRENT`

Adopt for next outer-cover direction:
- verified project masthead rather than fake logo construction
- one dominant destination photo
- direct Japanese cover lines
- asymmetric feature navigation
- restrained functional color bars

Reject from C2 direction:
- fake stacked masthead blocks
- cloud title panel
- decorative issue bubble
- long vertical pill
- top three-card gallery competing with masthead

## Next application

1. Keep Current `77:18` untouched.
2. Keep `598:2` as comparison evidence.
3. Use clean-room E `608:665` as the preferred outer-layout comparator.
4. Replace `608:793` only when a quality-passing, provenance-verified cover hero can reach Figma by a binary-safe path.
5. Re-run whole-item, page/reading, and actual-size detail QA after hero replacement before any Current promotion.
6. Do not count this layout improvement as PHOTO_ROLE_PASS or ROLE_COMPLETE.
