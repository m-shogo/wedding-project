# 2026-08-12 — V5 DB contrast repair

Scope: Rurubu WEDDING only. Current outer `77:18` and Current inside `77:290` were not edited.

## Visible problem

DA had the strongest outer composition, but actual-size review exposed two readability defects: the destination microcopy on the yellow field was low-contrast, and the hero subheads dissolved into the bright skyline. The cover hero itself also remains the known low-quality proxy, so this run did not pretend typography cleanup could close the photo-quality gate.

## Principle / capability tested

Repair contrast locally with native editorial anchors instead of adding a new card/shadow system. On rollback-safe duplicate DB `881:2`, the yellow-field microcopy was changed to navy/magenta, and one existing hidden rectangle was repurposed as a compact flat navy caption field over the bright skyline. Native text stayed editable; no new rounded-card/dashboard module was introduced.

## Expected improvement

Stronger thumbnail and actual-size legibility, clearer destination hierarchy, more believable Japanese travel-magazine caption rhythm, and less dependence on text shadow against the weak proxy raster.

## Regression caught and rejected

The first DB pass put the navy caption field above the white subhead text in z-order, making the copy appear dark/invisible. That state was rejected. The field was reordered behind the native text and reduced to `0.76` opacity before acceptance.

## Verified evidence

- Working comparator: DB `881:2`
- Front: `881:131`
- Hero target: `881:133`
- Review snapshot: `886:2` (`BEST OUTER — DB — source 881:2`)
- Previous DA Review snapshot `878:2` retained hidden as rollback
- 37 visible native text nodes
- 7 visible IMAGE fills
- 0 same-parent visible-text intersections
- Fold `881:189`: x `792.700012`, y `0`, `2 × 1122.5`
- Hero geometry: x `270`, y `0`, `523.7 × 470`
- Thumbnail whole-spread QA: checked
- Whole/reading QA: checked
- Actual-size front QA: checked at `794 × 1123`
- Structure QA: checked

## Asset state

The hero still uses proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`; DB is therefore a composition/readability improvement, not a cover-photo quality pass. The exact Drive Q60 remains verified at `1330 × 1220`, `155439` bytes, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.

Two different binary routes were tested and then stopped: the official Figma upload target could not be POSTed because the runtime could not resolve `mcp.figma.com`, and a direct Google Drive fetch from the Figma plugin runtime returned a network-request failure. Neither is counted as placement progress and neither should be hammered again without a genuinely different transport method.

## Adoption

DB is adopted as the strongest outer **composition/readability comparator**. CY `859:2` remains the strongest inside comparator. Start Here now points to `DB outer / CY inside`.

Generated this run: 0. Newly adopted generated asset: 0. New external binary placed: 0. DB visual edits placed: yes. DB visually verified: yes. DB structure verified: yes. Exact Q60 placed: no.

V5 gate remains `PHOTO_ROLE_PASS 9/10`, `ROLE_COMPLETE 9/10`, `dominant 2/3`; V5 is not complete and V6 has not started.
