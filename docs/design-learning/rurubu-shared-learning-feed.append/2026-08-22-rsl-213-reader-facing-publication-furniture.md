# RSL-213 — publication furniture should orient the reader, not merely imitate magazine style

Date: 2026-08-22
Source scope: Rurubu WEDDING
Source role: V8 Outer / Cover
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Outer AB retained three small English labels that communicated little beyond “this is a magazine/travel book”: `RURUBU WEDDING / YOKOHAMA`, `TRAVEL BOOK / 2026`, and `Yokohama / Wedding Edition`.

## Root-cause hypothesis

Small captions, series labels, folios and other page furniture can preserve AI/template aesthetics even when the main hierarchy is strong. If the furniture does not orient the reader or state useful publication information, it becomes style simulation.

## Test

In rollback-safe AH `2234:2`, preserve the established masthead and destination hierarchy, and replace only the generic English furniture with native reader-facing publication language:

- `るるぶ WEDDING / 横浜`
- `ふたり旅の記録 / 2026`
- `横浜 / 結婚記念号`

No new visual module or image was added.

## Evidence

- 500px whole item: PASS
- 1400px reading: PASS
- 1587×1123 actual: PASS
- native text `12`
- IMAGE `1`
- intersections `0`
- 18px safe risk `0`
- accidental explicit one-character Japanese wrap `0`
- parent page `2052:2`
- previous AB `2218:2` preserved hidden rollback

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-OUTER-AH-READER-FACING-PUBLICATION-FURNITURE-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-213-GENERIC-ENGLISH-PAGE-FURNITURE-SIGNALS-MAGAZINE-WITHOUT-ADDING-READER-VALUE`

Before retaining a small English label, caption, kicker, folio or pseudo-series line, ask what concrete reader-facing job it owns. Keep English when it is a real brand/name/semantic choice; remove or rewrite it when it merely signals editorial sophistication.

## Do not transfer

Do not copy Rurubu wording, cover hierarchy, masthead treatment, destination naming, or typography scale to other items.

## Cross-item hypothesis

Potentially relevant to any wedding artifact where AI/template output adds decorative English labels, tiny captions or faux metadata. Receiving items should test whether those elements have genuine orientation/information value before removal or translation.
