# RSL-022 — Chronology hierarchy should be solved with photo scale before decoration

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Source scope/item: Rurubu WEDDING / V6 inside chronology.

## Visible problem

The V6 chronology had technically clear six-event information but still read as an evenly spaced template/grid. A separate generated chronology-module study also failed to carry enough page-level visual mass.

## Root-cause hypothesis

When a chronology feels like a dashboard, the first problem may be uniform image roles rather than missing ornament. Materially different photo scale and irregular vertical rhythm can establish editorial hierarchy while preserving native copy and replaceable images.

## Bounded test

Rollback-safe source K `1283:2` was cloned to N `1315:2`. No native decorative assets were added. Left-page hero/support photography was enlarged and overlapped more strongly; six right-page event images were redistributed into staggered unequal roles while all event facts stayed native text and all photos stayed replaceable IMAGE-fill roles.

The first N pass failed because descendant photo coordinates were set as if they were spread-relative while their parent was the right-page frame. Source K remained unchanged. Parent coordinates were read back and N was repaired rather than repeating the same mistake.

## Expected improvement

Reduce 2×3 grid reading and make the chronology scan as a travel-magazine story rather than six equal cards.

## Regression risk

Staggered photo scale can create collisions, weak captions, fold pressure, or accidental source upscaling. Parent coordinate context must be verified before mutation.

## Three-scale evidence

- whole spread / 1400×990: PASS after repair; materially more photo-led than K;
- reading scale: six dates/titles/captions remain readable;
- structure/detail: 28 native text nodes, 9 IMAGE fills, 9 replaceable photo roles, 18px safe-area risk count 0, fold guide x=792.7 / width=2.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- source K: `1283:2`
- candidate N: `1315:2`
- generated section masters saved separately to Drive:
  - profile `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`
  - Q&A `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`
  - timeline `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`
  - memories `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`
- detailed QA: `01_paper-items/rurubu-wedding/RURUBU-V6-N-PHOTO-LED-CHRONOLOGY-QA-2026-08-15.json`
- Git base before this write: `2f63a8b679a18aeffaa351b8fbb158fa97fb31cd`

## Transport fingerprint

`FIGMA_MCP_UPLOAD_DNS_UNRESOLVED`: official `upload_assets` issued valid submit URLs, but local POST resolution failed for `mcp.figma.com`. This is a repeated known fingerprint, so it was not retried cosmetically. Generated masters were preserved in Drive and work switched to safe Figma composition.

## What must remain Rurubu-specific

Do not transfer the exact chronology photo ratios, six-event layout, palette, Japanese travel-magazine styling, Yokohama imagery, or copy.

## Cross-item applicability hypothesis

For another print chronology/history section that reads as equal cards, independently test unequal photographic roles and non-grid rhythm before adding decorative containers. Preserve native facts and replaceable image roles, and verify parent coordinate context before repositioning nested nodes.
