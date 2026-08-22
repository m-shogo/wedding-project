# 2026-08-22 — Rurubu V8 Outer AH

## What changed

Promoted Outer AB `2218:2` to AH `2234:2` after rollback-safe comparison.

Only three native text furniture nodes changed:

- `RURUBU WEDDING / YOKOHAMA` → `るるぶ WEDDING / 横浜`
- `TRAVEL BOOK / 2026` → `ふたり旅の記録 / 2026`
- `Yokohama / Wedding Edition` → `横浜 / 結婚記念号`

The established masthead, dominant destination hierarchy, back-cover reading gateway, body copy, image role, crop and Drive/image-hash provenance remain unchanged.

## Verified result

- 500px whole: PASS
- 1400px reading: PASS
- 1587×1123 actual: PASS
- native text 12
- IMAGE 1
- intersections 0
- 18px safe risk 0
- accidental explicit one-character Japanese wrap 0
- AB preserved hidden rollback

## Learning

`RSL-213 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Failure fingerprint:
`F-RSL-213-GENERIC-ENGLISH-PAGE-FURNITURE-SIGNALS-MAGAZINE-WITHOUT-ADDING-READER-VALUE`

The lesson is not “remove English.” Keep English when it is a real brand/name/semantic choice. Remove or rewrite it when it merely imitates editorial sophistication without orienting the reader.
