# RSL-142 / RSL-143 — factual placeholders and readable minor metadata

Source scope/item: Rurubu / Rurubu WEDDING V6
Date: 2026-08-20

## RSL-142 — Unknown factual placeholders should not masquerade as semi-real facts

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Visible problem: back-cover chronology events 01–04 displayed `201x / 202x` despite those dates not being authoritative in the current Rurubu data.

Evidence before change: GB `1929:2` actual-size back showed the pseudo-years adjacent to otherwise reader-facing milestone typography.

Root-cause hypothesis: ordinal sequence already communicates order. A pseudo-year adds false precision and mockup residue without adding reliable information.

Bounded test: GU `1975:2` hid only the four unresolved year strings; kept ordinals, event labels, known 2026 dates, photography and all geometry.

Expected improvement: more finished editorial appearance without inventing facts.

Regression risk: chronology could become ambiguous if ordinal hierarchy is weak.

Three-scale evidence: whole spread PASS; back actual-size 794×1123 PASS; text collision 0; 18px safe-area risk 0.

Figma evidence: GU `1975:2`, back `1975:3`; GB `1929:2` hidden rollback.
Drive evidence: no write; root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified.
GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GU-GV-FACTUAL-PLACEHOLDER-AND-GUIDE-METADATA-QA-2026-08-20.md`.

What must remain Rurubu-specific: milestone layout, ordinal sizes, colors, wording, known wedding dates and back-cover art direction.

Cross-item applicability hypothesis: another wedding artifact may independently test omission of unresolved factual placeholders when ordering/role remains clear and omission is safer than fabricated precision.

## RSL-143 — Minor metadata can gain readability through spatial separation without cards

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Visible problem: Memory Spots compressed six useful guide facts into one dense 11.5px two-line string.

Root-cause hypothesis: actual-size readability was limited by aggregation, not lack of visual containment. Separating the facts could improve scanning without introducing UI-like cards.

Bounded test: GV `1976:2` replaced the single metadata block with six native 12.5px beats in a 3×2 field, preserving the exact facts and adding no cards, icons, images or raster.

Expected improvement: faster reader scanning and more intentional travel-guide density.

Regression risk: repeated aligned metadata can become a dashboard/grid if allowed to compete with primary photography.

Three-scale evidence: whole/reading PASS; guide actual-size `1976:24 / 794×1123` PASS. Initial test had three 3px row contacts; spacing was corrected. Final collision 0; 18px safe-area risk 0.

Figma evidence: GV `1976:2`, guide `1976:24`; GE `1941:2` hidden rollback.
Drive evidence: no write; root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified.
GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GU-GV-FACTUAL-PLACEHOLDER-AND-GUIDE-METADATA-QA-2026-08-20.md`.

What must remain Rurubu-specific: the six guide facts, 3×2 coordinates, type scale, palette and Memory Spots composition.

Cross-item applicability hypothesis: another print item may independently test spatial separation of dense secondary metadata before adding cards/boxes, while keeping the metadata visibly subordinate to its primary artifact hierarchy.
