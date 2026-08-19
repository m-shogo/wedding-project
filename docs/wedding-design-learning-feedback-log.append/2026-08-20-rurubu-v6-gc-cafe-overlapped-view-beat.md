# Rurubu V6 GC — Cafe overlapped view beat

Date: 2026-08-20
Scope: Rurubu WEDDING only
Status: ADOPTED / VERIFIED_LOCAL

Visible problem: FN Cafe left page still read as `travel-note texture → separate photo module → separate closing copy`, leaving a false section break despite a valid replaceable Yokohama view photo.

Principle tested: when a legitimate small photo cannot be enlarged safely, test controlled overlap into an existing decorative field so the image carries more editorial responsibility without adding an asset.

Expected improvement: less stacked-module reading, stronger Japanese travel-magazine continuity, preserved source fidelity.

Regression risk: text/photo collisions, scrapbook clutter, accidental source enlargement.

Bounded test: FN `1866:2` duplicated to GC `1933:2`; existing view photo kept `238×218`, moved `y 686→600`, rotation `-2.5°→-4°`; native 02 text moved into the same beat; nonfunctional cyan label hidden; no new image/hash/Drive asset.

Evidence: 1400px spread PASS; Cafe actual-size `1933:3` 794×1123 PASS. Initial candidate had 32px `02`/title collision and was corrected before promotion. Final native text collision 0, 18px safe-area risk 0, stray top-level node 0.

Adoption: GC promoted preferred; FN preserved hidden rollback.

Next application: keep improving V6 only. Continue treating Cafe photography as an asset bottleneck; do not enlarge the current Yokohama view beyond source tolerance or substitute semantically unrelated imagery merely to increase density.
