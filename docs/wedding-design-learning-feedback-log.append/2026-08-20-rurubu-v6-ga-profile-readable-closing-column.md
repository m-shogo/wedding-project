# Rurubu V6 GA — Profile 03 readable closing column

Date: 2026-08-20
Scope: Rurubu WEDDING only

- Visible problem: FP's photo-less `03 / NEXT TRIP` concept was valid, but the far-right native copy column was squeezed by snapshot 02 and looked like a leftover slot at actual size.
- Root-cause hypothesis: the semantic decision was correct; the remaining weakness came from insufficient physical text width, not missing decoration or photography.
- Bounded test: shift/reduce only the existing replaceable snapshot 02, widen the native closing column, and make the microcopy reader-facing. No new image/card/raster.
- Expected improvement: keep the photo cluster energetic while making 03 read as an intentional editorial closing beat.
- Regression risk: shrinking the photo could weaken photo dominance; moving text over an existing composed raster could create visual crossings not caught by text-box collision QA.
- Whole/thumbnail: PASS at 500px.
- Reading: PASS at 1200px.
- Actual-size: PASS at 794×1123 after one rejected intermediate.
- Structure: closing-text contacts 0; 18px safe risks 0; native text preserved; replaceable photos preserved.
- Rejected intermediate: native title crossed a yellow rule baked inside the composed raster. Moved copy below the rule instead of editing/recreating the decoration.
- Adopted: GA `1922:2`.
- Rollback: FP `1895:18`, hidden.
- What stays Rurubu-specific: photo overlap, exact column geometry, colors, copy and travel-texture marks.
- Cross-item applicability: only the QA principle that native text moved over a composed raster requires actual-size visual review because structural collision checks cannot see marks baked into the raster.
