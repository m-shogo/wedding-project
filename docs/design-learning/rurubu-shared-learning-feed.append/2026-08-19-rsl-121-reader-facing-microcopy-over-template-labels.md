# RSL-121 — Reader-facing microcopy should replace generic template labels when the editorial role is already clear

Source scope/item: Rurubu WEDDING / V6 Profile-Q&A

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A structurally sound Q&A spread still contained several small generic English helper labels such as `MEMORIES FROM OUR JOURNEY`, `DINNER NOTE / FAVORITE SCENE`, `NEXT TRIP / FEATURE`, and `OUR NEXT CHAPTER`. At actual size they contributed a template/AI-scaffold feeling even though the photographic and typographic hierarchy was already established.

## Root-cause hypothesis

When a small label has no unique factual, navigational, provenance, accessibility, or production function, generic template wording can weaken publication authenticity. The better first test is reader-facing native microcopy, not more decoration.

## Bounded test

On rollback-safe FC `1846:18`, replace only generic helper-style microcopy with concise Japanese editorial captions while preserving all photographs, Q&A answers, geometry, image hashes, native editability, and semantic roles. Move one photo caption from the image edge to a clear cream field where actual-size legibility improved.

## Expected improvement

Reduce AI/template residue and make the page read like intentionally edited Japanese print content without introducing new cards, stickers, rasters, or fixed artwork.

## Regression risk

Over-localizing every label can remove useful genre/navigation shorthand or make hierarchy verbose. English labels may remain when they are intentional brand/editorial language rather than generic filler. Reader-facing copy must not invent facts.

## Three-scale evidence

- whole spread 1000px: PASS
- reading/page scale: PASS
- actual-size Q&A `1846:63` 794×1123: PASS
- Q&A native text 30 / same-parent text collision 0 / 18px safe-area risk 0
- Profile native text 25 / collision 0 / safe-area risk 0

## Figma / Drive / GitHub evidence

- preferred FC: `1846:18`
- Q&A page: `1846:63`
- rollback ET: `1817:2`
- Start Here: `845:27`
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FC-QA-JAPANESE-EDITORIAL-CAPTIONS-QA-2026-08-19.md`

## What must remain Rurubu-specific

Do not transfer the exact Japanese phrases, Q&A hierarchy, travel-magazine palette, caption positions, photo choices, or Rurubu-like grammar.

## Cross-item applicability hypothesis

On another print artifact, independently audit small labels that look like generic template scaffolding. If a label has no functional authority role, compare concise reader-facing native copy before adding/removing decorative geometry. Preserve intentional English branding/navigation when it genuinely serves the artifact.

## Status

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
