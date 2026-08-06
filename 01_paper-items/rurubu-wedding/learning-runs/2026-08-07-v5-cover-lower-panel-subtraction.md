# Rurubu V5 cover lower-panel subtraction

Date: 2026-08-07
Status: `VERIFIED / ADOPTED`
Scope: Rurubu WEDDING V5 only

## Source and visible problem

Source: live Figma `01_RURUBU_WEDDING`, outer candidate `77:18`, front cover.

The lower feature-index area used a full-width cream rectangle (`77:208 / LOWER_BG`) behind six native feature entries. At whole-item scale it read as a web-dashboard/card panel rather than a printed magazine contents field, repeated a large pale color plane immediately below the dominant photograph, and weakened the cover silhouette.

## Anti-legacy question

If the cream panel did not already exist, it would not be selected. The six feature entries remain understandable through numbering, typography, spacing, and the existing emphasized feature 01 block.

## Hypothesis

Hiding only the oversized background plane, while preserving all text, number nodes, the emphasized feature 01 block, and page-reference detail, should:

- reduce Web-UI/card appearance;
- connect the feature index more naturally to the light-blue cover field;
- preserve information hierarchy and editability;
- avoid adding new decoration.

## Expected improvement

A quieter, more print-editorial lower cover with the hero photograph remaining dominant and the contents index functioning as typography rather than a boxed application module.

## Possible regression

- individual feature entries could lose grouping;
- contrast could weaken against the blue field;
- the bottom cover could feel too empty;
- text or page references could become visually detached.

## Change

- `77:208 / LOWER_BG`: `visible: true -> false`
- Node retained for immediate rollback.
- No text, image fill, crop, geometry, semantic name, or hierarchy was changed.

## Evidence

### Thumbnail / whole-item

Post-change outer-spread screenshot confirms:

- hero image remains the dominant front-cover focus;
- lower cover silhouette is less panel-like;
- the feature index remains visible and balanced;
- no new empty hole or fold imbalance appeared.

### Reading / page scale

Reading sequence remains:

`logo/date -> hero/side headlines -> hero caption -> feature 01 -> features 02-06 -> issue strip`

The six feature text nodes remain visible:

- `77:212`
- `77:216`
- `77:220`
- `77:224`
- `77:228`
- `77:232`

### Detail / structure

Verified after the change:

- native text count: `85`
- visible text count: `44`
- IMAGE-fill nodes: `14`
- fold guide `77:288`: visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved
- `77:208`: hidden, not deleted

No text reflow, clipping, crop change, semantic-node loss, image replacement, or rollback loss was introduced.

## Result

`ADOPTED`

The subtraction improves editorial hierarchy without reducing factual content or editability. It does not close any asset-provenance or photo-role gate.

## Knowledge state

`PROTOTYPED -> VERIFIED` for this V5 candidate only.

Not promoted directly to a project-wide rule. Reusable proposition for later testing: a contents index does not require a full enclosing color plane when numbering, spacing, and one intentional emphasis already establish grouping.

## Next application

Continue V5 by prioritizing unresolved dominant-photo provenance/quality gates and remaining actual-size QA. Do not start V6 until the V5 dummy-design gate is evidence-complete.
