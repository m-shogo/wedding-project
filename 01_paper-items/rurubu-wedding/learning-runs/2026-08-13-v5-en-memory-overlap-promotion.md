# Rurubu V5 EN — memory-overlap clean-room promotion

## Visible problem

EL `1086:2` was already substantially stronger than the legacy inside spread, but the lower-right Memory Spots section still read as a large photo followed by a tidy two-item right column. At whole-spread and thumbnail scale this retained a small amount of card/grid rhythm rather than the stronger asymmetric photo field expected from a Japanese travel-information magazine.

## Principle tested

Use one dominant memory photograph as the visual field, then let unequal support photographs intrude into that field rather than forming a regular column. Preserve all accepted image identities, factual copy, native text, semantic roles, non-destructive IMAGE fills, fold geometry, and rollback state.

## Experiment

Safe duplicate EN `1098:2` was created from EL. The right-page lead memory image was expanded to `680×410`; support 02 became `196×238` with a slight negative rotation; support 03 became `216×138` with a slight positive rotation. No image was regenerated and no external binary was added. When direct-on-photo support-02 text lost contrast, one flat square-corner cream caption paper `1101:2` was added with no shadow/effect/rounding.

## Rejected/intermediate states

- First EN pass: support-02 body collided visually with support-03 photography. Rejected before promotion.
- Later pass: support-02 caption sat directly on the lead photo with unstable contrast. Rejected; fixed with one editorial paper strip instead of a UI card.
- First promoted snapshot exposed an actual-size folio defect: destination-03 body and folio text overlapped in absolute coordinates even though same-parent collision QA reported zero. The pre-fix Review snapshot is retained hidden as `1102:2`.

## Final correction

Destination-03 photo/caption was moved upward. Final destination body absolute y-span ends before the folio region. Final Review snapshot is `1106:2`, sourced from EN `1098:2`; old EL Review `1089:2` remains hidden rollback.

## Evidence

- thumbnail: 500px whole spread PASS
- reading scale: 1000px whole spread PASS
- actual size: right page `1098:132`, `794×1123` PASS after final folio repair
- visible native text: `53`
- visible IMAGE fills: `6`
- absolute text-text intersections: `0`
- bounded safe-area text risks: `0`
- fold: `1098:283`, `x=792.7`, `2×1122.5`
- image hashes preserved: `a39dd297…`, `2359f635…`, `539c259b…`, `adbb8e52…`, `439a719d…`, `c09aa82e…`

## Decision

ADOPTED. Best inside is EN. Best outer remains EM `1094:2`.

## Next application

Use a flat edge-caption paper only when direct-on-photo text objectively fails contrast. Also run cross-parent absolute-coordinate collision checks near folios/folds; same-parent text intersection alone is insufficient for print QA.

Q60 cover-hero exact Drive→Figma provenance remains OPEN. V5 is not complete and V6 production remains blocked.