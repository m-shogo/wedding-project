# 2026-08-12 — Rurubu DI destination-photo hierarchy

Visible problem: even after DH subtraction, the cover's largest image was a wedding travel-props flat-lay, so the silhouette still read closer to lifestyle/editorial wedding stationery than a Japanese travel-information magazine.

Principle tested: when a destination-specific high-quality asset cannot yet complete its lifecycle, do not keep a weak semantic proxy large. Promote an already verified travel-memory photograph to create the needed photographic mass, explicitly label its semantic role, and keep the unresolved exact-destination image small and factual. Build density through Japanese type, unequal feature scale and direct-on-photo captions rather than new cards.

Expected improvement: stronger travel-mag recognition at thumbnail scale; more immediate photo/headline dominance at reading scale; fewer UI-like containers at actual size.

Regression risk: a non-Yokohama travel-memory dominant could be misread as Yokohama if its role label disappears. Preserve `TRAVEL MEMORY / 旅の記憶` and the Yokohama inset until the exact Q60 anchor is available.

Evidence: DI `925:2`, front `925:131`, dominant `925:132` hash `adbb8e529451a81dd25e4eb29bf068655569ce25`, Yokohama inset `925:134` hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, Review `930:2`; thumbnail / whole / actual-size PASS; 39 native text nodes, 7 visible image fills, 0 same-parent text intersections, fold `925:190` 2×1122.5. First pass exposed one kicker/headline intersection; repaired before adoption.

Adopted: YES as Best Outer comparator, not Current. Generated: 0. New external binary placed: 0. Current `77:18 / 77:290` untouched. Q60 exact placement remains NO.

Next application: replace only the small destination inset with the verified Q60 derivative when transport works; preserve the stronger photographic hierarchy rather than growing the proxy or rebuilding cards around it.
