# RSL-198 — Article-owned type should carry editorial mass before low-opacity display effects

Source scope/item: Rurubu WEDDING / V8 Memory+Guide
Date: 2026-08-22
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The image-light Memory N spread was structurally clean, but its left page relied on a huge `温度` word at about 7% opacity to fill the lower field. At whole-item and reading scale this behaved like a generic editorial/luxury watermark while the actual memory prose remained visually secondary.

## Evidence before change

- Figma previous current: Memory N `2189:2`
- `MEMORY_SEMANTIC_ANCHOR / 温度`: `128 px`, opacity ≈`0.07`
- visible native text: `22`
- IMAGE: `0`
- intersections: `0`
- 18 px safe risk: `0`

The defect was not collision or missing content. It was how visual mass was being manufactured.

## Root-cause hypothesis

Removing images/cards can still leave an AI/template signal when an oversized low-opacity keyword is used as a generic sophistication device. If the article already contains strong sensory language, that native copy can often carry the visual hierarchy more honestly than a watermark-like word.

## Professional research observation

Fresh references used in this run:

- Eye on Design / AIGA, `Making Rules, Breaking Rules: The Art of Magazine Typography`: display typography can perform structural and image-like work when it is integrated into the editorial system.
- magCulture, `Avaunt #1`: strong underlying hierarchy can coexist with deliberate pacing shifts rather than uniform treatment.
- magCulture, Chris Clarke / The Guardian Saturday: density and breathing space should be flatplanned together; quiet pages still require intentional scale contrast.

These observations were treated as hypotheses only. No source layout or style was copied.

## Bounded test

Memory R `2199:2` was created as a rollback-safe duplicate.

- original body `2199:9` hidden, not deleted;
- first three existing sensory lines became native `M_SENSORY_SCORE` `2199:33`, `28 px / 44 px` leading;
- existing reflective close became native `M_REFLECTION` `2199:34`, `17 px / 31 px` leading;
- `温度` `2199:31` changed to `76 px / opacity 1.0` as a real editorial close;
- redundant semantic note `2199:32` hidden;
- right Guide/Index unchanged;
- no image/card/badge/shadow/gradient/new fact/V6-V7 asset added.

## Expected improvement

Let actual article language create the page's visual hierarchy and reduce generic watermark/luxury-template behavior while preserving an intentionally quiet book-design spread.

## Regression risk

- promoted prose can become a wall of type;
- display copy can become repetitive if it duplicates nearby text;
- a strong typographic field can overpower the opposite page;
- Japanese line breaks can become machine-like after scaling.

Therefore the method requires three-scale and semantic-wrap review, not automatic enlargement.

## Three-scale evidence

- 500 px whole spread: PASS
- 1400 px reading scale: PASS
- 1587×1123 actual size: PASS
- visible native text: `22`
- IMAGE: `0`
- text intersections: `0`
- 18 px safe risk: `0`

Previous Memory N `2189:2` was hidden as rollback only after the candidate passed.

## Failure fingerprint

`F-RSL-198-LOW-OPACITY-DISPLAY-TYPE-SIMULATES-EDITORIAL-MASS-WITHOUT-CARRYING-CONTENT`

Operation/context: image-light print/editorial composition after UI/card/image subtraction.
Symptom: large low-opacity keyword or decorative display type becomes the main visual device while article-owned copy remains secondary.
Likely cause: using opacity/scale as a shortcut for editorial depth instead of assigning visual weight to content with a real semantic role.
Replacement method: first test article-owned native text as the visual mass; use display words only when they perform a clear editorial role and survive thumbnail/reading/actual-size QA.

## Figma / Drive / GitHub evidence

- Figma current: Memory R `2199:2`
- Figma hidden rollback: Memory N `2189:2`
- Drive authority re-read: `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-MEMORY-R-ARTICLE-OWNED-TYPE-MASS-QA-2026-08-22.md`

## What must remain Rurubu-specific

Do not transfer `温度`, the exact rust/navy palette, coordinates, type sizes, Memory copy, Guide/Index rhythm or V8 visual identity.

## Cross-item applicability hypothesis

On another materially different print artifact that becomes too sparse after removing weak imagery/containers, independently compare:

1. a decorative low-opacity display-word treatment;
2. a hierarchy built from article-owned native copy with differentiated semantic roles.

Promote only if the article-owned treatment improves whole-item identity, reading order and actual-size legibility without increasing repetition or breaking physical constraints.
