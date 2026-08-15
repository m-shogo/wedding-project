# RSL-016 — Source newlines do not prove rendered Japanese headline line breaks

Source scope/item: Rurubu WEDDING / V6 Outer H

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V6 D stored the back headline as exactly two source lines — `旅の途中で\n見つけた景色` — but the fixed 220px native text box rendered `色` alone on a third line at actual size. The source string looked correct while the printed result looked weaker.

## Root-cause hypothesis

For large Japanese editorial type, intended newline characters and character count are not sufficient QA. Fixed width, font metrics and actual rendering can create an extra orphan line even when the copy itself has not changed.

## Bounded test

On rollback-safe V6 Outer H, preserve characters, font size 39, imagery, palette and all surrounding content. Change only the title box from x=548 / width=220 / height=128 to x=541 / width=234 / height=96, keeping the 18px trim reserve.

## Expected improvement

Render the intended two-line headline, remove the single-character orphan, strengthen the navy-panel hierarchy, and improve Japanese magazine plausibility without adding decoration or rewriting copy.

## Regression risk

Widening a large headline can silently consume trim/safe-area reserve or collide with adjacent fields. A line-break correction must therefore be followed by actual-size screenshot and geometric safe-area/collision readback.

## Three-scale evidence

- whole-item / 1400px: PASS and stronger than D;
- actual-size back / 794×1123: PASS;
- post-readback: native text 28, IMAGE fills 7, same-parent text intersections 0, 18px safe-area risks 0.

## Figma / Drive / GitHub evidence

- Figma current best outer: `1232:55 / V6_BEST_OUTER_H_TWO_LINE_BACK_HEADLINE_2026_08_15`
- back: `1232:56`
- corrected title: `1232:60`
- previous D rollback: `1229:2`, hidden
- comparator authority: `01_paper-items/rurubu-wedding/RURUBU-V6-H-A-COMPARATOR-PROMOTION-2026-08-15-1400.json`
- promotion commit: `bd7d5528418e5fcebdd0361848503f1d2919ce9f`

## What must remain Rurubu-specific

Do not transfer this headline copy, 39px size, 234px width, navy field, coordinates, palette, or Rurubu editorial composition.

## Cross-item applicability hypothesis

Any print artifact using large Japanese native text should verify the **rendered** line breaks at actual size after width, font, copy, tracking or placement changes. Source newlines and structural text presence do not prove that the final visual line structure is intentional.

## Related failure evidence

During the same run, a Drive-authoritative high-resolution Yokohama JPEG was successfully materialized from Drive, but the official Figma `upload_assets` submit POST again failed DNS resolution for `mcp.figma.com` before any mutation. This is the existing binary-transport fingerprint covered by `RSL-005`; no same-method retry was performed.
