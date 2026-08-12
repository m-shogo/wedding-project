# Rurubu WEDDING — EK photo/type clean-room learning

Scope: RURUBU WEDDING V5 only.

Visible problem: EJ had improved substantially, but its front still carried a UI-like vertical 保存版 badge and a broad yellow 02 caption module that read closer to a designed wedding brochure than a real Japanese travel-information magazine cover.

Principle tested: subtract interface-like geometry first, then increase editorial hierarchy using only dominant photography, native Japanese headline type, unequal photo scale, overlap, compact issue anchors, and direct-on-photo feature copy.

Change: created safe duplicate EK `1079:2` from EJ `1072:2`; Current `77:18 / 77:290` was not touched. The 保存版 badge was removed, two tiny native issue anchors replaced it, Feature 02 was enlarged and simplified, Feature 01 hierarchy was strengthened, and 03 remained direct on the full-bleed street image.

Expected improvement: stronger magazine recognition at thumbnail scale, less dashboard/card perception, clearer `横浜 → ふたり旅。 → 01/02/03` reading order, and a more energetic asymmetric cover.

Regression risk: enlarging Feature 02 and Feature 01 could create text collisions or violate safe areas. Initial structure QA did in fact find one `01` number/title intersection plus two inherited footer safe-area risks. These were repaired before promotion.

Evidence: EK whole-spread screenshot reviewed at thumbnail/whole-reading scale; front was separately reviewed at natural `794 × 1123`. Final structure readback: 36 visible native text nodes, 6 visible IMAGE fills, 0 same-parent text intersections, 0 bounded safe-area text risks, fold `1079:185` at x=792.7 with 2px width and 1122.5 height. Review snapshot `1081:2` was visually re-read after promotion.

Decision: ADOPTED. EK is promoted over EJ as Best Outer. EJ remains hidden rollback evidence.

Asset note: Q60 master Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` was freshly read and visually inspected. A new official Figma upload target was issued for EK hero `1079:134`, but the multipart POST failed at DNS resolution for `mcp.figma.com` before any bytes were uploaded. Therefore Q60 remains `placed=false / visuallyVerifiedInFigma=false`; transport alone is not counted as progress.

Next application: keep EK’s photo/type hierarchy when Q60 can be placed exactly; do not reintroduce UI badges or wide caption cards merely to fill space. Once the exact Q60 lifecycle closes, rerun the full V5 weakest-three, print/fold/safe-area, crop, structure, provenance, and ledger gate before opening V6 production.
