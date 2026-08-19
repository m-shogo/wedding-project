# RSL-133 — Subordinate beats must still survive actual-size reading

Source scope/item: Rurubu WEDDING / V6 Outer GB
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The back-cover chronology already had an intentional major/minor hierarchy, but `02 / 04` were so small at actual size that they read closer to micro-annotations than meaningful secondary milestones.

## Root-cause hypothesis

Unequal visual hierarchy only works if the subordinate information remains clearly readable. When secondary type mass drops below practical print reading, the design stops communicating hierarchy and begins to look incomplete.

## Bounded test

On rollback-safe duplicate GB `1929:2`, only `02 / 04` native numerals, years and event-title sizes/positions were increased modestly. Major milestones `01 / 03 / 05 / 06`, photos, masthead, palette and overall chronology geometry were preserved.

An initial position created a 2px text contact against the 01 title and was rejected. The local 02 group was moved down and the candidate was revalidated.

## Expected improvement

Keep the major/minor distinction while making the full chronology readable as an editorial sequence at physical-page scale.

## Regression risk

Over-enlarging secondary beats can flatten hierarchy and recreate a uniform timeline/UI. Point sizes are not transferable.

## Three-scale evidence

- whole spread 1200px: PASS;
- back cover actual-size 794×1123: PASS;
- visible native text: 25;
- absolute text collisions: 0 after correction;
- 18px safe-area risks: 0.

## Figma / Drive / GitHub evidence

- Figma preferred: `1929:2`;
- back page: `1929:3`;
- rollback FO: `1891:18` hidden;
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- no new Drive save, generated asset, binary placement or image hash;
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GB-OUTER-MINOR-MILESTONE-READABILITY-QA-2026-08-20.md`.

## What must remain Rurubu-specific

Exact point sizes, milestone positions, chronology dates/copy, cyan/magenta/yellow/navy palette, photography, masthead and Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

When another print artifact intentionally uses major/minor repeated beats, independently verify the minor beats at actual size. If they visually disappear, first adjust native visual mass while preserving hierarchy before adding cards, borders, rails or extra imagery.
