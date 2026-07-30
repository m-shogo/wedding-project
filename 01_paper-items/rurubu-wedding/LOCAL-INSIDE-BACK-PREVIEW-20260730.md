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
- current frozen decoration assets #8–#14

Rules preserved:
- inside spread = 420 × 297 mm equivalent, center fold at 210 mm
- printer bleed / trim-safe / fold-safe remain `PROVISIONAL`
- real photos remain placeholders
- no AI-generated people
- no asset sheets
- actual frozen decoration assets are introduced only sparingly in pre-visuals

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

Photo FILL tests show that every candidate can crop aggressively when a source aspect ratio is forced into the wrong slot. This is now treated as a design constraint, not evidence that every slot must support every ratio equally.

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

Strengths:
- strong compatibility with decorative SVG assets
- more playful and personal

Risk:
- route, badges and photo count can push it toward decoration overload

## Color pre-visual

Created a non-promoted color pre-visual for the current safe direction:
- Inside A — Travel Editorial Grid
- Back A — Quiet Editorial Notes

Current frozen assets used sparingly:
- travel route + airplane + heart
- map pin
- small travel icon set
- heart feature stamp

Photos remain abstract placeholders only.

Artifacts:
- `rurubu_inside_A_previsual_color.png`
- `rurubu_back_A_previsual_color.png`
- `rurubu_inside_back_A_previsual_comparison.png`

These are reference previews only. They must not be treated as the production Figma or final print artwork.

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

## Current non-negotiables

- earlier single-page inside local preview is superseded and not promotable
- no production bleed/safe values invented
- no AI people
- no asset sheet
- local color previews are evidence/reference only
