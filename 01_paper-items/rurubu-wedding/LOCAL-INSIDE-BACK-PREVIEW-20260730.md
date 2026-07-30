# るるぶWEDDING — Local Inside / Back Preview 2026-07-30

Status: LOCAL_PREVIEW_ONLY / FIGMA_WRITE_PENDING
Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Why this exists

Figma MCP is currently unavailable for production mutation because the authenticated account is on Starter tier and the MCP monthly call allowance has been exhausted. This local preview advances structural validation without promoting any local raster preview to Current visual authority.

## Source authority

Built from:
- `FOUNDATION.md`
- `INSIDE-BACK-WIREFRAME.md`
- structural/photo placeholders

Important update after visual review:
- historical SVG assets and SVG-derived PNG decorations #8–#14 are no longer Current.
- SVG is prohibited for the Rurubu production path.
- any color preview that contains the old #8–#14 decorations is historical QA only and must not be copied as final styling.

Rules preserved:
- inside spread = 420 × 297 mm equivalent, center fold at 210 mm
- printer bleed / trim-safe / fold-safe remain `PROVISIONAL`
- no AI-generated people
- no asset sheets
- structure must remain understandable without decoration

## QA correction made during this pass

An initial local Inside A/B draft was accidentally modeled as a single A4 page. QA caught that `INSIDE-BACK-WIREFRAME.md` defines Inside A/B as the full two-page inside spread. That single-page draft is NOT promotable.

Corrected local geometry:
- spread: `1587 × 1123 px` working preview
- fold: `x = 794 px`
- left page + right page both visible in the same comparison artifact

Corrected comparison artifacts:
- `rurubu_inside_A_spread_wireframe.png`
- `rurubu_inside_B_spread_wireframe.png`
- `rurubu_inside_spread_AB_comparison.png`

## Same-condition stress payload

Used the existing spec payload:
- long profile display name
- Q&A answers approximately 45–70 Japanese characters × 3
- 6 history milestones
- 4 memory spots with title + description
- 3 friend/family photos with captions
- portrait 4:5 / landscape 3:2 / square 1:1 photo-ratio swap checks

## Mechanical stress result

All four candidates passed current text-volume stress:
- INSIDE A: PASS
- INSIDE B: PASS
- BACK A: PASS
- BACK B: PASS

Photo FILL tests show that every candidate can crop aggressively when a source aspect ratio is forced into the wrong slot. This is treated as a design constraint, not evidence that every slot must support every ratio equally.

Practical photo rule for Figma:
- portrait photos should prefer portrait-ish profile/card slots
- landscape photos should prefer hero / wide editorial slots
- do not use blind `FILL` as the acceptance test; compare crop and subject-safe positioning per photo

## Structural reading

### INSIDE A — Travel Editorial Grid

Current structural favorite.

Strengths observed locally:
- profile / Q&A / history / memory spots have the clearest reading order
- long copy fits without reducing type below the wireframe target
- photo quantity can vary without collapsing the full spread
- density is visibly quieter than the cover

### INSIDE B — Journey Feature Spread

Keep as travel-theme comparator.

Strengths:
- strongest immediate travel-feature feeling
- large hero area and route/memory-map relationship are visually strong

Risk:
- more dependent on having the right photo mix
- memory captions want to stay deliberately short

### BACK A — Quiet Editorial Notes

Current structural favorite.

Strengths:
- best density contrast against the high-energy cover
- 3 friend/family photos + captions fit cleanly
- history line remains readable
- strong match with Cover A direction without repeating the cover composition

### BACK B — Travel Scrapbook Index

Keep as personality comparator.

Strength:
- more playful and personal as a composition concept

Risks:
- route, badges and photo count can push it toward decoration overload
- the previous apparent compatibility with SVG decorations is no longer a positive criterion because SVG is prohibited

## Historical color pre-visual

A non-promoted color pre-visual was previously created for:
- Inside A — Travel Editorial Grid
- Back A — Quiet Editorial Notes

Artifacts:
- `rurubu_inside_A_previsual_color.png`
- `rurubu_back_A_previsual_color.png`
- `rurubu_inside_back_A_previsual_comparison.png`

Those previews included now-rejected SVG-derived decorations. Their new status is:
`HISTORICAL_QA_ONLY / DECORATION_SET_SUPERSEDED / NOT_PROMOTABLE`

Use them only for structure/density discussion, not for decoration styling.

## Drive QA evidence

Existing QA files in Drive remain useful as historical evidence and are not production assets:
- corrected inside A/B spread comparison
  - file: `QA_rurubu_inside_spread_AB_comparison_20260730.png`
  - Drive ID: `17qvisl3yybLFkqBu9Qd8AOarfdpCef1K`
- inside/back mechanical stress summary
  - file: `QA_rurubu_inside_back_mechanical_stress_20260730.png`
  - Drive ID: `1-_9tE9GJTHpZWmtuoDplfbeP89vp6ilM`
- old Inside A + Back A color pre-visual comparison
  - file: `QA_rurubu_inside_back_A_previsual_20260730.png`
  - Drive ID: `1u7x8pGxcjWP0ZR7eqlMGrgcaLTyfQ3fe`
  - status: `HISTORICAL_QA_ONLY / SUPERSEDED_DECORATION_STYLE`

## Provisional direction after local QA

- Cover: A remains visual-direction favorite, B remains structural comparator.
- Inside: A is current structural favorite, B remains travel-theme comparator.
- Back: A is current structural favorite, B remains personality comparator.

No winner is promoted to Current visual authority until Figma same-condition screenshots and stress QA are available.

## Next executable Figma sequence when quota is available

1. Reuse production Figma and page `01_RURUBU_WEDDING`.
2. Build corrected full-spread `02_INSIDE_WF_A` and `02_INSIDE_WF_B`.
3. Build `03_BACK_WF_A` and `03_BACK_WF_B`.
4. Use the same copy quantity and provisional guides.
5. Test actual selected photos by suitable slot ratio rather than blind one-size-fits-all FILL.
6. Capture screenshots.
7. Score rubric.
8. Promote winner only after screenshot + stress evidence.
9. Insert only accepted current PNG decorations; SVG and rejected #8–#14 old PNGs are prohibited.

## Current non-negotiables

- earlier single-page inside local preview is superseded and not promotable
- no production bleed/safe values invented
- no AI people
- no asset sheet
- no SVG
- old SVG-derived #8–#14 PNGs are non-current
- local color previews are evidence/reference only