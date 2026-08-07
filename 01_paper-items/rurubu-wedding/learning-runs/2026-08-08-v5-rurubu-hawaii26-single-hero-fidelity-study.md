# V5 Rurubu Hawaii '26 single-hero fidelity study

Date: 2026-08-08
Scope: Rurubu WEDDING V5 reference/fidelity study only
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current V5 frames were not modified.

## Authorities reviewed

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- V6 current/research material

## Reference re-check

The current `るるぶハワイ'26` cover was re-checked against JTB Publishing information and a visible cover reference. A major correction was found: the current Hawaii cover is fundamentally a **single dominant beach photograph** cover, not the earlier assumed hero-plus-three-small-photo collage.

Important visible structure:
- white top bonus strip
- vertical three-block Rurubu logo at the upper-left edge
- pink full-cover field
- large white destination-title cloud near the top
- yellow issue burst
- one large beach/destination photograph owning most of the lower cover
- left-side feature copy layered directly over the cover/photo edge
- one narrow yellow vertical feature strip on the right
- no required three-photo bottom collage in the reference structure

## Visible problem

Previous fidelity study `388:2 / V5_RURUBU_HAWAII26_REAL_RATIO_FIDELITY_STUDY_V4_2026_08_08` had the correct 25.7×21cm aspect-ratio family, but incorrectly preserved a lower three-photo collage and circular map badge. This made the study busier in the wrong way and taught the wrong cover hierarchy.

## Hypothesis

Removing the invented lower collage and expanding the dominant photograph would move the study closer to the actual current Hawaii-cover hierarchy and produce a better reusable lesson for the WEDDING clean-room cover.

Expected improvement:
- correct single-photo dominance
- less artificial card/collage behavior
- stronger relation between destination title, hero image, left-side teasers, and right vertical strip
- better reference for later WEDDING asset replacement

Possible regression:
- fewer independent modules could reduce the intentionally dense Rurubu feeling if micro-copy is not strong enough
- the current Yokohama placeholder hero is not compositionally equivalent to a beach image, so this study proves structure, not final asset suitability

## Prototype

Created rollback-safe duplicate:
- `392:2 / V5_RURUBU_HAWAII26_SINGLE_HERO_FIDELITY_STUDY_V5_2026_08_08`

Key changes relative to `388:2`:
- hero `392:18`: moved to x=72, y=230 and expanded to `690×700`
- lower three image slots hidden
- all associated lower photo-border rules hidden
- circular map badge hidden
- bottom teaser hidden
- left feature copy moved closer to the left edge and kept directly over the pink/photo region
- right vertical yellow strip tightened and aligned to the large hero
- series micro-label reduced to a small lower-right marker
- all Current and rollback frames untouched

No commercial cover image was placed into production art. The reference was used only to correct structure and hierarchy.

## Three-scale QA

### Whole-item

PASS as a stronger fidelity study than V4. The image now owns the lower two-thirds of the cover and the silhouette is visibly closer to the current Hawaii-cover family.

### Reading/page

PASS for structural learning. Reading order is now: top bonus strip → logo/title/issue → large hero → left feature list/right vertical feature → small series marker.

### Actual-size/detail

PASS for editable-study purposes. Native text remains editable and major copy does not clip. This is not print-ready evidence and is not a V5 Current promotion.

## Result

`DISCOVERED → PROTOTYPED → VERIFIED_AS_REFERENCE_STUDY / NOT_CURRENT / NOT_PROJECT_RULE`

The important correction is that fidelity practice must begin from accurate observation of the reference's large-scale structure before inventing secondary modules.

## Failure / correction learned

Earlier studies over-interpreted Rurubu as "many photo modules everywhere" and introduced a three-photo bottom collage that was not present in the selected Hawaii'26 cover. The fix was not another decorative tweak; it was to re-check the actual reference and remove the invented structure.

## Next application

1. Continue refining logo silhouette, title-cloud geometry, right-edge micro-copy, and photo-to-copy overlap against the reference.
2. Keep the study editable and replacement-safe.
3. Translate only verified structural lessons into the WEDDING clean-room candidate.
4. Do not promote this study to Current V5 merely because it resembles the reference better.
5. Continue the actual V5 evidence gate separately: cover hero `77:148` and history `77:422` remain open; back main `77:24` remains the only dominant-role pass.
