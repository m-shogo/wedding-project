# V5 inside-profile halftone subtraction

Date: 2026-08-03
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current inside frame: `77:290`
Target node: `77:373 / AUTH_HALFTONE_TEXTURE`

## Authorities and evidence

The project-wide Figma production system, generated-asset memory, continuous-learning process, project memory, quality-over-legacy decision, Current status, evidence ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 clean-room planning remain the governing authorities. The action was grounded in the live inside-spread metadata, design context, and before/after screenshots.

## Visible problem

The upper profile area already contained two unequal profile photographs, colored vertical rules, two profile ribbons, a travel-icon strip, a camera icon, profile microcopy, and strong name typography. The pink halftone texture beside the bride profile added no identity, navigation, caption, or factual meaning. At whole-spread scale it created a small extra focal patch in an area whose primary job is to introduce the two profiles.

## Principle tested

Attempt subtraction before adding decoration. Decorative texture should survive only when it materially supports hierarchy, atmosphere, or reading order. A texture is not justified merely because it is subtle or already implemented.

## Hypothesis

Hiding the non-semantic halftone texture should make the profile comparison calmer and more deliberate while preserving the playful travel-magazine identity through photography, ribbons, color rules, the camera icon, travel-icon strip, and asymmetric profile treatment.

## Possible regression

The bride profile area could become visually empty or lose too much Rurubu-like energy.

## Change

- `77:373 / AUTH_HALFTONE_TEXTURE`
- `visible: true → false`
- node retained for immediate rollback
- no photo fill, image hash, crop, native text, frame hierarchy, semantic role, or rollback frame changed

## Verification

Post-change whole-spread screenshot confirms:

- the profile area remains lively and recognizable as travel editorial
- the bride profile has clearer breathing room around the circular photograph and detail line
- the two-profile hierarchy remains intact
- no accidental blank patch, overlap, text loss, contrast regression, or structural damage appeared
- the history and memory page was unchanged

The change was reviewed at whole-spread and page-reading scale. It introduces no new actual-size text or print risk because it only hides a decorative raster texture.

## Decision

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / PROJECT_RULE_NOT_PROMOTED`

This is a bounded adoption, not a blanket rule against halftone. Texture may remain when it has a deliberate compositional function and survives whole-page comparison.

## Remaining blocker

This refinement does not replace dominant-photo repair. V5 photo-role pass remains unchanged, and V6 production remains gated by verified V5 dummy-photo design QA.

## Next application

Return priority to the dominant image roles and use further subtraction only when it closes a clearly visible hierarchy defect without displacing the photo-repair work.
