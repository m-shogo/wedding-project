# RSL-086 — Physical page closing cadence before adding another module

Date: 2026-08-18
Source scope: Rurubu WEDDING V6
Source item: Q&A page, DK → DL
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The interview content was semantically complete and structurally valid, but the printed page visually ended too early: after Q05/Q06, a large unused cream tail remained before the folio and read as leftover template space.

## Evidence before change

- live preferred before test: Profile / Q&A DK `1650:87`;
- Q&A page had strong photo-led top/middle hierarchy and valid native Q&A stacks;
- no missing factual content or missing photo role was identified;
- whole/page review showed the defect as physical page cadence, not information absence.

## Root-cause hypothesis

When semantic content is complete but a physical print page still looks unfinished, filling the tail with another photo/card/decor module can create UI/template density. A restrained native typographic closing cadence may finish the page while preserving editability and existing visual hierarchy.

## Bounded test

Rollback-safe duplicate DL `1659:2` added only two native text roles below Q05/Q06:

- `ふたりの旅は、つづく。`;
- `TO BE CONTINUED / OUR JOURNEY`.

No image, crop, hash, card, gradient, generated decoration, question/answer, or Profile geometry changed.

## Expected improvement

- finish the physical paper rhythm without adding a new module;
- keep Q06 as the semantic closing question;
- keep the closing wording editable;
- reduce template-like empty tail.

## Regression risk

- decorative filler could compete with real content;
- closing phrase could become too dominant;
- bottom safe-area/folio collision.

## Three-scale evidence

- whole spread `1659:2` at 1200px: PASS;
- Q&A page `1659:42`: PASS;
- actual-size structural review: 30 native visible Q&A texts, absolute text collision 0, 18px safe-area risk 0, overflow 0 observed;
- previous DK retained hidden as rollback.

## Figma / Drive / GitHub evidence

- Figma preferred: DL `1659:2`;
- Q&A page: `1659:42`;
- closing text nodes: `1659:90`, `1659:91`;
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AF-DL-DK-QA-CLOSING-EDITORIAL-BEAT-2026-08-18.md`.

## Status

`VERIFIED_LOCAL` in Rurubu V6 and promoted to `CROSS_ITEM_CANDIDATE` as a neutral production principle only.

## Must remain Rurubu-specific

Do not transfer literal wording, Japanese/English pairing, font sizes, coordinates, cream paper treatment, Q&A geometry, palette, photos, or folio treatment.

## Cross-item applicability hypothesis

For other print items, when the content is already complete but the physical page ends as unused template space, test a restrained native typographic endpoint before adding another visual module. Adoption elsewhere requires independent local visual/actual-size verification.

## Next receiving-item experiment

Only when another Wedding print item independently exhibits the same physical-page-ending defect, test a bounded editable closing cadence and compare it against both untouched and added-module alternatives. Until then this remains a hypothesis outside Rurubu.
