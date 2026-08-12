# Rurubu V5 — DW vertical destination clean-room and Q60 transport boundary

Date: 2026-08-12
Scope: Rurubu WEDDING only

## Visible problem
DV `996:2` is the current best outer comparator, but the front still reads partly as a wide-photo poster over a lower feature panel rather than a fully asymmetric Japanese travel-magazine cover.

## Principle / capability tested
Rebuild the cover from scratch around a narrow editorial text column plus a destination-photo spine, then judge it at thumbnail, reading, and actual-size scales. Do not accept a composition whose source photography cannot survive the crop at print detail.

## Experiment
- Preserved Current `77:18 / 77:290`, DV `996:2`, and DF `899:2` unchanged.
- Built DW `1001:2` as a safe duplicate with a cream editorial column, strong native Japanese headline, vertical magenta spine, asymmetric photo overlap, and no new UI cards/shadows/gradients.
- Whole/thumbnail QA improved editorial recognition substantially.
- Structure after repair: visible native text `35`, same-parent text intersections `0`, text safe-area risks `0`.
- Actual-size front `1001:131` exposed a decisive regression: the reused image hash `539c259be8036b481d06b4f76db9a39b407d90e8` became visibly blocky when stretched into the vertical dominant-photo role.
- DW was therefore rejected and moved to Studies as `STUDY_REJECTED_DW_VERTICAL_DESTINATION_COLLAGE_DETAIL_FAIL_2026_08_12`.

## Q60 asset evidence
Drive was re-read during this run:
- master ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, `1330×1220`, JPEG, `155,439` bytes
- verified role derivative ID `1YwRdAauE1-CtXV3VD08CEvn7b-lFYlGX`, `560×514`, JPEG

The official Figma upload target was issued, but the exact byte POST again failed before upload because `mcp.figma.com` could not resolve. A bounded alternate Plugin-API embedding test produced only `12,905` bytes from an incomplete payload and rendered blank; the safe duplicate was removed and nothing was adopted or counted.

## Result
**DW REJECTED. DV remains best outer comparator; DF remains best inside comparator.**

## Reusable lesson
A more magazine-like crop is not an improvement if it exposes inadequate source resolution. Large editorial asymmetry should be preserved as a compositional direction, but the photo role must be backed by a verified derivative with enough native pixels and exact provenance before promotion.

Status: `DW_REJECTED_DETAIL_FAIL / Q60_DRIVE_VERIFIED / Q60_FIGMA_EXACT_PLACEMENT_OPEN / DV_DF_AUTHORITY_UNCHANGED / V5_NOT_COMPLETE / V6_NOT_STARTED`
