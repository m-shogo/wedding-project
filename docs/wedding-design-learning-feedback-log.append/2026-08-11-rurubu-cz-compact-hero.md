# Rurubu CZ — compact hero / photo-led lower cover

- Visible problem: the unresolved low-quality cover proxy dominated CV because it occupied 575 px of vertical space, while the lower feature zone still read too politely.
- Principle/capability tested: subtraction + scale redistribution. Shrink the weak hero to 430 px, preserve strong native Japanese headline typography, then transfer visual weight to verified overlapping feature photography.
- Expected improvement: stronger travel-magazine thumbnail silhouette, less UI-like cream field, more aggressive photo-led editorial rhythm without adding decorative cards.
- Regression risk: feature-title collisions and overly compressed lower typography.
- Evidence: Figma CZ `867:2`, front `867:131`; thumbnail 500 px PASS; whole spread PASS; actual-size 794×1123 PASS; 37 visible native texts; 7 visible image fills; final same-parent text intersections 0; fold `867:186` x=792.7 y=0 2×1122.5.
- Correction made: initial QA found `CE_FEATURE_1` / `CP_FEATURE_1_DESC` overlap; descriptor moved below title and structure QA rerun to zero collisions.
- Asset status: no image generated/adopted this run. Existing proxy hero hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` remains asset-quality FAIL. Drive Q60 master fresh-read as ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes; exact Figma placement remains NO.
- Status: CZ retained as verified clean-room comparator, not promoted over CV until hero asset quality is resolved.
- Next application: when a mandatory image is temporarily weak, do not build more chrome around it. Reduce its visual monopoly, increase verified-photo scale contrast, and re-evaluate after the correct asset is placed.
