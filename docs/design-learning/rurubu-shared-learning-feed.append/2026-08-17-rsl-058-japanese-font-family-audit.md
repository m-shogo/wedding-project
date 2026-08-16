# RSL-058 — Japanese native copy should not depend on accidental Latin-font fallback

Source scope/item: Rurubu WEDDING V6 Q&A
Date: 2026-08-17
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred V6 interior was visually coherent, but a programmatic typography audit found two Japanese closing-copy nodes using Inter while every other visible Japanese node in the preferred book used Noto Sans JP.

## Root-cause hypothesis

Fallback glyph rendering can hide a typography-system defect. A Latin-family assignment on Japanese semantic copy may look acceptable today but weaken visual consistency and make later editing/wrapping less predictable. The family assignment itself should be audited, not only the rasterized screenshot.

## Bounded test

On rollback-safe CF `1538:2`, change only the two Japanese closing-copy nodes:

- Inter Bold → Noto Sans JP Bold;
- Inter Regular → Noto Sans JP Regular.

Do not change copy, size, box geometry, position, imagery or decoration.

## Expected improvement

- consistent Japanese typographic voice;
- more predictable future native-copy editing;
- no loss of established visual hierarchy.

## Regression risk

Changing a family can alter glyph metrics, line breaks and collision behavior even when font size is unchanged. Therefore font-family normalization requires fresh actual-size and collision QA rather than a blind global replace.

## Three-scale / structure evidence

- CF whole spread 1000px: PASS;
- Q&A actual size `1538:39` 794×1123: PASS;
- intended pullquote remains two lines;
- text collision 0;
- 18px text safe-area risk 0;
- post-promotion audit: Japanese non-Noto visible nodes = 0 across Outer W + Profile/Q&A CF + Story/chronology CE.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted CF: `1538:2`;
- rollback CD: `1535:2`;
- unchanged CE: `1535:78`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-CF-CE-JAPANESE-TYPOGRAPHY-QA-2026-08-17.md`;
- Drive asset lifecycle unchanged in this test.

## What must remain Rurubu-specific

Do not transfer Noto Sans JP as a mandatory font, the exact type sizes, closing-copy wording, layout or page positions. The transferable principle is the font-family assignment audit and revalidation requirement.

## Cross-item applicability hypothesis

A materially different print item with native Japanese copy may independently audit whether Japanese text is rendered through an intentional Japanese-capable family rather than accidental fallback. Any family correction must be rechecked at actual size because glyph metrics can change.