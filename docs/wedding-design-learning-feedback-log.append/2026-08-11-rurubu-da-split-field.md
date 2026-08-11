# 2026-08-11 — Rurubu DA split-field feedback

Scope: Rurubu WEDDING only.

Visible problem: the strongest prior outer concepts still read too much like a neat editorial webpage — full-width hero first, orderly modules second — and the low-quality cover proxy remained the largest visual event.

Capability/principle tested: clean-room architecture change rather than decoration. DA splits the top into a yellow destination field and a right-side photo field, lets the native Japanese headline cross the boundary, and uses only a cyan transition rule plus a magenta feature rule as functional accents. Supporting stories retain unequal scale: typographic 01, tilted-photo 02, and dominant-photo 03.

Expected improvement: stronger Japanese travel-magazine thumbnail identity, more asymmetric rhythm, higher information energy, and reduced dependence on the weak hero raster.

Regression observed: first DA render wrapped `ふたり旅。` into two lines. That state was rejected. Widening the native mixed-color headline into the photo field and resizing it to 56 px restored a single-line treatment at actual size.

Evidence: Working `875:2`, front `875:131`, Review snapshot `878:2`; 37 visible native texts, 7 visible image fills, 0 same-parent text intersections, fold `875:186` at x 792.7 / y 0 / 2×1122.5. Whole-item and actual-size screenshots visually checked. Current `77:18 / 77:290` unchanged.

Adoption: DA adopted as strongest outer composition comparator; CY remains strongest inside comparator. Asset-quality caveat remains: hero hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` is still the low-quality proxy and does not pass the Q60 gate.

Next application: if an unavoidable weak photo is distorting the design, redesign the composition around stronger asymmetry and verified supporting imagery instead of layering more UI-like decoration around it. Recompare only after the real cover-role raster is available.