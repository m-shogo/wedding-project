# V5 inside clean-room F — dense editorial QA

Date: 2026-08-10
Starting GitHub main: `a714e3542a98d91ebf699de848cb3c9e989a92c7`
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current inside preserved: `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
New comparison: `630:2 / V5_INSIDE_RURUBU_CLEANROOM_F_DENSE_EDITORIAL_2026_08_10`

## Visible problem

The promoted inside E Current is substantially better than the earlier V5, but the left page still reads partly like a profile/Q&A web surface: large blank intervals, topic pills, and mechanically even question groups. On the right page, the six-step history row and the two supporting memory modules remain highly uniform. The user continues to judge the overall Rurubu direction as too visually timid.

## Authorities and principle tested

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`

Hypothesis: a stronger size hierarchy, larger overlapping profile photography, removal of the topic-pill geometry, a direct editorial common-interest line, staggered history microtype, and deliberately unequal support-photo crops will read more like a Japanese travel-information magazine without adding decorative cards or changing asset provenance.

## Experiment

A duplicate of Current inside was made; Current itself was not edited.

### Left page

- enlarged the groom photo to `330 × 344`
- enlarged the bride circular photo to `246 × 246`
- increased the Japanese page heading to 38px
- strengthened the name hierarchy (`SHOGO` 32px, `SHI-CHAN` 26px)
- strengthened the Q&A heading to 29px and Q1 question to 23px
- removed the visible common-interest pill rectangles and their duplicated text
- replaced the pill group with one native editorial line: `旅 × 写真 × HAWAII　好きが重なるところ。`
- kept the Travel Note as direct native text separated by a thin rule

### Right page

- enlarged the history image to `694 × 302`
- enlarged `思い出スポット` to 30px
- staggered alternate history year/event labels around a slightly angled history line to break the equal-grid rhythm
- enlarged the lead memory photo to `458 × 262`
- changed the two visible support memory crops from equal squares to unequal `142 × 136` and `154 × 126`
- adjusted the existing native route trunk/branches to follow the unequal support modules

No new generated photography was introduced. This run intentionally used the already verified V5 image hashes because the experiment tests layout/editorial hierarchy, not a new asset role.

## Regression caught and repaired

The first whole-spread screenshot exposed a real collision: the groom profile detail text was clipped by the Q&A divider after profile geometry was enlarged. A bounding-box audit also found five additional non-intentional text overlaps around Q1, Travel Note, common-interest copy, and the two support memory titles.

Those overlaps were repaired rather than accepted as intentional collage. Final programmatic QA reports `0` visible text/text intersections above the audit threshold.

## Final structure evidence

Comparison frame: `630:2`

- visible native text nodes: `54`
- visible IMAGE-fill nodes: `6`
- provisional fold guide: `630:273`, width `2`, visible
- final detected text overlaps: `0`

Verified image provenance stayed unchanged:

- groom `630:8` → `a39dd297eb9de572317a5ce57f0af12e8597b156`
- bride `630:14` → `2359f635b4926a83e22ca1f9214e75c709291152`
- history `630:148` → `539c259be8036b481d06b4f76db9a39b407d90e8`
- memory lead `630:156` → `adbb8e529451a81dd25e4eb29bf068655569ce25`
- memory support 02 `630:164` → `439a719d73f28e8dd2889f2026cccb15f345ec63`
- memory support 03/current V5-09 `630:180` → `c09aa82e7b2ac75708707345c6f845452bf67663`

## Three-scale judgment

### Whole item / thumbnail

`PROTOTYPED / IMPROVED`. The left page has a stronger photographic silhouette and less UI-tag geometry. The right page now has more uneven editorial rhythm rather than six perfectly equivalent history columns plus equal support-photo cards.

### Reading/page scale

`PROTOTYPED / IMPROVED`. Q&A and profile hierarchy are clearer. The direct common-interest line reads as editorial copy instead of a filter/tag control. Supporting memory modules remain readable after unequal crop sizing.

### Actual-size/detail

`PROTOTYPED / STRUCTURE_PASS`. A post-change bounding-box audit found and then eliminated all non-intentional visible text intersections. Native text, image fills, semantic roles, fold guide, and image hashes remain intact.

## Decision

`PROTOTYPED / KEEP AS COMPARISON / DO NOT PROMOTE CURRENT YET`

The candidate is a meaningful improvement in hierarchy and anti-Web-UI treatment, but it should not replace Current solely from this run. The next comparison should include final actual-size Japanese line-break review and direct A/B judgment against Current inside E. No asset-role completion count changes in this run.

## Reusable lesson

When a magazine spread still feels like a web profile despite removing cards, the remaining problem may be *equal rhythm*, not container count. Strengthening photographic scale differences, replacing tag-like groups with direct editorial copy, and deliberately varying support-image geometry can produce a larger magazine-authenticity gain than adding more stickers, gradients, or badges. However, asymmetric collage must still pass strict text-collision QA; intentional overlap is not permission for accidental text intersections.

Evidence level: `PROTOTYPED`; not promoted directly to `PROJECT_RULE`.

## Next safe application

1. Compare `630:2` directly with Current `77:290` at whole, page, and actual-size scales.
2. Continue outer clean-room H/next candidate work without changing Current until the cover-hero quality blocker is closed.
3. Keep `V5-01 / IMG_HERO` open; this inside experiment does not change `PHOTO_ROLE_PASS 9/10` or dominant `2/3`.
