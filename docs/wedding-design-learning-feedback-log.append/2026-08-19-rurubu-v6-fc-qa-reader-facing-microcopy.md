# 2026-08-19 — Rurubu V6 FC reader-facing Q&A microcopy

## Visible problem

Preferred ET was visually mature but retained several small generic English template labels in the Q&A page. At actual size these labels read more like AI/template scaffolding than finished Japanese travel-magazine editorial copy.

## Principle tested

Before adding decoration, replace nonfunctional generic helper labels with concise reader-facing native microcopy while preserving hierarchy, images and editability.

## Bounded experiment

ET `1817:2` → rollback-safe FC `1846:18`. Only native helper microcopy was changed; Q&A answers, photos, crops, image hashes, Profile geometry and replaceable roles were preserved.

## Expected improvement

Less template residue, stronger Japanese publication voice, no asset or structural cost.

## Regression risk

Removing intentional English genre/navigation language can reduce useful hierarchy; only generic helper-style labels with no unique function should be candidates.

## Evidence

- 1000px whole spread: PASS
- actual-size Q&A `1846:63` 794×1123: PASS
- Q&A native text 30 / collisions 0 / 18px safe-area risks 0
- Profile native text 25 / collisions 0 / safe-area risks 0
- Drive authority reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FC-QA-JAPANESE-EDITORIAL-CAPTIONS-QA-2026-08-19.md`

## Result

`ADOPTED / FC PREFERRED / ET HIDDEN ROLLBACK / V7 HOLD`

## Next application

Continue same-scale V6 review. Audit only screenshot-visible generic scaffold copy; do not systematically translate intentional brand/navigation English, and do not add decoration merely because microcopy was removed.
