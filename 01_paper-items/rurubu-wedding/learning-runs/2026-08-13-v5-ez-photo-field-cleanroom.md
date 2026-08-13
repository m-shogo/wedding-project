# Rurubu V5 EZ photo-field clean-room — 2026-08-13

Scope: Rurubu WEDDING only. Current `77:18 / 77:290` unchanged. No PASSPORT / BOARDING PASS / 青春ふたりきっぷ / ADD edits.

## Visible problem
EY was stronger than earlier legacy-derived covers, but its cream header / middle hero / lower street stack still read as three horizontal digital sections at actual size. The white masthead also lost contrast against the cream paper.

## Principle tested
Use one larger photo field as the cover spine, let Japanese type and a bounded destination postcard overlap that field, and use only thin editorial rules plus one caption band. Increase scale contrast without enlarging the known low-quality dominant proxy beyond a bounded ratio-appropriate role.

## EZ changes
- Working `1157:2` from rollback-safe EY duplicate.
- front `1157:132`; back retained from EY.
- hero proxy `1157:134` expanded only to `793.7×470`, still explicitly NOT Q60 master.
- exact secondary Q60 derivative preserved at `1157:189`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, `266×244`.
- Feature 02 rebuilt as a rotated photo + cyan print caption band; floating low-contrast white caption rejected.
- masthead changed from low-contrast white to native deep-navy type.
- two thin editorial rules added; no rounded cards, gradients, or generic shadows.

## Regression fixes before adoption
1. `CE_MAIN × ET_SECOND_LINE` 2px absolute overlap detected and repaired.
2. `CE_FEATURE_2_NO × CE_FEATURE_3` overlap detected after caption rebuild; the complete Feature 02 unit was shifted right and re-read.
3. final absolute text intersections: `0`.
4. final bounded 18px front safe-area risks: `0`.

## Visual evidence
- 500px whole-item thumbnail: PASS; Japanese destination hierarchy remains dominant.
- whole-item reading scale: PASS; photo field reads continuously rather than as stacked web sections.
- actual-size front `794×1123`: PASS; masthead is readable, Feature 02 caption is print-legible, Q60 postcard remains bounded.

## Adoption
ADOPTED as Best Outer. Review snapshot `1158:2`; Start Here snapshot `1158:194`. Previous EY Review/Start Here snapshots retained hidden as rollback. Inside remains EO.

## Next application
Do not equate a larger raster with stronger editorial impact. Prefer photo-field continuity, native Japanese type hierarchy, bounded high-quality destination evidence, and caption geometry that remains readable at actual print size. Dominant Q60 master provenance remains OPEN and V5 remains incomplete.
