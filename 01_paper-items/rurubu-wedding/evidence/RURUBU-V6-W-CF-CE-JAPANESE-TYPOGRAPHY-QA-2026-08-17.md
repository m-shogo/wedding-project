# Rurubu WEDDING V6 — W + CF/CE Japanese Typography QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Starting authority

Live preferred before this bounded test:
- Outer W `1491:2`;
- Profile/Q&A CD `1535:2`;
- Story/chronology CE `1535:78`;
- V7 HOLD.

## Visible problem

A full preferred-spread typography audit found exactly two Japanese native-text nodes using a Latin-family font:

- Q&A closing pullquote: `答えのつづきは、\nこれからの旅で。` — Inter Bold 38;
- Q&A closing note: `ふたりの言葉を、写真と一緒に残すページ。` — Inter Regular 11.

All other visible Japanese native text in W + CD/CE used Noto Sans JP.

## Root-cause hypothesis

Even when fallback glyphs render acceptably, leaving isolated Japanese editorial copy in a Latin-family font weakens typographic system consistency and makes later copy edits less predictable. A Japanese-native typeface should carry the Japanese closing copy unless the alternate family has an intentional, verified editorial role.

## Bounded test

Rollback-safe duplicate CF `1538:2` from CD changed only:

- cloned pullquote `1538:72`: Inter Bold → Noto Sans JP Bold;
- cloned note `1538:73`: Inter Regular → Noto Sans JP Regular.

Characters, font sizes, boxes, x/y positions, images, image hashes, crops, decoration, folio, fold guide and page geometry were unchanged.

## Verification

Whole spread:
- CF 1000px render: PASS; visual hierarchy unchanged.

Actual Q&A:
- page `1538:39` = 794×1123: PASS;
- pullquote retains intended two-line reading;
- note remains legible and subordinate;
- text collision `0`;
- 18px text safe-area risk `0`.

Cross-preferred typography readback after promotion:
- Outer W Japanese non-Noto nodes: `0`;
- Profile/Q&A CF Japanese non-Noto nodes: `0`;
- Story/chronology CE Japanese non-Noto nodes: `0`.

## Promotion

Adopted:
- CF `1538:2` → `PREFERRED / V6_INSIDE_CF_JAPANESE_TYPOGRAPHY_COHESION_2026_08_17`.

Rollback:
- CD `1535:2` → `ROLLBACK_HIDDEN / V6_INSIDE_CD_PRE_CF_JAPANESE_TYPE_2026_08_17`.

CE remains preferred and unchanged.

Start Here:
`V5 FU/FX · V6 W + CF/CE INSIDE STUDIES · V7 HOLD`

## Asset lifecycle

- generated images: 0;
- Drive saves: 0;
- external binary placements: 0;
- raster/image hash changes: 0;
- native text characters changed: 0;
- native font-family normalization: 2 nodes;
- replaceable images preserved: YES;
- rollback preserved: YES;
- V7 touched: NO.

## Status

`VERIFIED_LOCAL` typography-system improvement.

V6 remains `NOT_PRINT_READY`: final photos, final personal copy, printer template, bleed/trim/fold verification, PDF preflight and physical proof remain separate completion gates.