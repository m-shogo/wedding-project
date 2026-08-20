# RSL-146 — Replace template-like closing microcopy with reader-facing native editorial copy before adding modules

Source scope/item: Rurubu WEDDING
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

The V6 Cafe/Table right page was structurally mature, but its final closing still used `3 WAYS / ENJOY` plus small bilingual category labels. At actual size this read more like a reusable design-template component than finished reader-facing magazine copy.

## Evidence before change

GJ `1954:2` passed layout and image-role QA, but the lower closing visually lagged the surrounding Japanese editorial language. No missing photography or containment defect was present.

## Root-cause hypothesis

When a page is already compositionally resolved, generic/internal-feeling microcopy can preserve an AI/template impression even without obvious cards or UI geometry. Adding more graphics would not solve the lexical hierarchy mismatch.

## Principle tested

Before adding another photo, card, label field or decorative asset, rewrite the closing as native reader-facing editorial copy and make its visual mass match the role it performs.

## Bounded test

Rollback-safe GK `1991:2` changed only four existing native text roles:

- generic closing kick → `ふたりの、3つの楽しみ。`;
- three bilingual category labels → `甘いもの / 景色 / 会話` as Japanese-only reader labels.

The first candidate retained the inherited cyan/small kick and was visually too annotation-like. A second bounded refinement changed only that headline to 23 px navy, borrowing the existing body/title color rather than adding another style system.

## Expected improvement

Reduce template/production-note reading and make the physical page close as a finished Japanese editorial spread without adding visual modules.

## Regression risk

A stronger closing headline can consume folio/safe-area reserve or collide with numbered sublabels. Removing bilingual labels can also reduce scanning if the Japanese copy becomes too small.

## Three-scale evidence

- whole spread ~1100 px: PASS and stronger than GJ;
- reading/page scale: PASS;
- actual-size Table page `1991:33 / 794×1123`: PASS;
- native visible text: 22;
- visible text collisions: 0;
- 18 px text safe-area risks: 0;
- source/candidate image-role list, geometry and hashes: identical.

## Figma / Drive / GitHub evidence

- Figma preferred: GK `1991:2`;
- Table page: `1991:33`;
- hidden rollback: GJ `1954:2`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- item QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GK-CAFE-TABLE-READER-CLOSING-QA-2026-08-20.md`.

## Failure fingerprint

`READER_CLOSING_REWRITE_RETAINS_ANNOTATION_HIERARCHY`: changing words alone while retaining the old small/cyan annotation treatment did not fully solve the template feeling. The method was corrected by matching the closing's native typographic mass to its editorial responsibility.

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

Exact Japanese copy, numbering colors, table-page composition, dining imagery, spacing, font sizes and travel-guide visual grammar.

## Cross-item applicability hypothesis

On another print artifact whose composition is already sound, independently test whether a generic/internal-feeling closing label can be rewritten and rehierarchized as native reader-facing copy before adding another card, image or decorative module. Reject the method if the original label has a real physical, navigational or brand function.
