# Rurubu V6 JA — 1DAY dense editorial close feedback

Date: 2026-08-21
Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL`

## Visible problem

IW left had a strong waterfront hero but dropped into a sparse two-column cream field. At whole-item scale the lower portion read like a utility footer rather than a continuous Japanese travel-magazine page.

## Principle tested

Rebalance existing role mass before adding assets: extend an already-legitimate photo field only when crop quality permits, then consolidate useful native information into a tighter editorial closing beat.

## Bounded experiment

JA `2141:2` duplicated IW `2131:2`. Right page was preserved. JA left `2141:3` extended the existing hero from 650px to 720px height and moved the existing start overlay with it. Existing `旅のコツ / 01 / 寄り道、歓迎。` and `横浜1DAYメモ / closing quote` were compacted into a stronger lower field. No new visual asset, text, card, shadow, gradient or generated decoration was added.

## Expected improvement

Reduce the `hero → utility footer` break, strengthen thumbnail balance, and preserve a dense-but-readable photo-led editorial rhythm.

## Regression risks reviewed

Crop/detail exposure, lower-copy crowding, two-column dashboard feeling, contrast, text collisions, safe area, and future longer-copy expansion.

## Evidence

- 500px whole spread: PASS and stronger than IW;
- 1400px reading: PASS;
- 794×1123 actual left: PASS;
- native visible text: 19;
- IMAGE fill nodes: 1;
- same-parent text intersections: 0;
- 18px safe-area risks: 0;
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- no new generated/adopted/saved/uploaded image and no new image hash.

## Decision

JA adopted as preferred. IW preserved hidden as rollback. V7 remains HOLD. V6 remains not print-ready.

## Learning linkage

RSL-181: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Transfer only the diagnostic method. The Rurubu crop, layout, palette, number treatment, headline scale, copy and coordinates remain Rurubu-specific.
