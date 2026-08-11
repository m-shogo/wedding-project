# 2026-08-12 — Rurubu DB contrast-repair feedback

Scope: Rurubu WEDDING only.

Visible problem: the DA clean-room cover had strong asymmetry, but two small contrast failures weakened actual-size credibility: white/yellow destination microcopy on the yellow field and white hero subheads directly over a bright skyline. The known cover proxy itself remains low quality.

Capability/principle tested: local contrast repair without falling back to UI cards. DB changes the destination microcopy to dark navy/magenta and repurposes one already-existing hidden rectangle as a compact flat ink caption field over the hero. Final typography remains native/editable and the composition keeps the photo-led 01/02/03 hierarchy.

Expected improvement: stronger Japanese travel-magazine readability at thumbnail and print-reading scales, clearer headline-to-caption hierarchy, and less reliance on shadows or global overlays.

Regression risk and observed failure: the first overlay insertion landed above the white caption text in layer order, obscuring it. That state was rejected. Reordering the field behind the text and reducing opacity to `0.76` restored legibility while preserving photographic presence.

Evidence: Working DB `881:2`, front `881:131`, hero `881:133`; Review snapshot `886:2`; 37 visible native texts, 7 visible image fills, 0 same-parent text intersections, fold `881:189` at x `792.7` / y `0` / `2×1122.5`. Whole spread at 500px and front at actual `794×1123` were visually checked. Current `77:18 / 77:290` remained untouched.

Adoption: DB replaces DA as strongest outer composition/readability comparator; CY `859:2` remains best inside. DA Review snapshot `878:2` is preserved hidden for rollback. Start Here points to DB/CY.

Asset caveat: hero hash remains `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`. Exact Q60 is Drive-verified but not Figma-placed, so this does not change `PHOTO_ROLE_PASS 9/10` or dominant-photo `2/3`.

Transport lesson: after the official upload POST failed at DNS and an in-plugin direct Drive fetch failed as a distinct method, stop spending visual-production time on the same network boundary. Keep the verified bytes/provenance intact and continue only with a genuinely different binary-safe method or another high-value safe visual target.

Next application: use flat local editorial fields only where photographic contrast objectively fails; do not generalize the fix into a new card system. Rejudge the complete cover once a true high-quality cover-role raster is actually placed.
