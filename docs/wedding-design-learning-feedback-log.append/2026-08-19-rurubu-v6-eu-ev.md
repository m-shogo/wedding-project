# 2026-08-19 — Rurubu V6 EU / EV feedback

Scope: Rurubu WEDDING only. V7 remained HOLD.

## EU — 1DAY Plan lower editorial feature

Observed problem: EQ's dominant waterfront photo and right route page were strong, but the left lower `POINT + TRIP DATA` region floated in unused cream space and looked slightly template-like at same-scale six-spread review.

Hypothesis: existing reader-facing native utility copy could carry more editorial responsibility before adding another photo or container.

Bounded test: rollback-safe EU `1818:2` kept all photo roles/hashes and strengthened only native point/trip-data hierarchy with a large `01`, stronger headline, larger values and a closing thought.

Initial result: two real native-text contacts were found and rejected. After repair: whole spread PASS, left actual-size 794×1123 PASS, left/right collision 0 and 18px safe-area risk 0.

Adopted: EU preferred. EQ hidden rollback.

Next application: use the same diagnostic, not the same layout, when another information region is structurally correct but visually underused.

## EV — Outer back repeated-photo reduction

Observed problem: preferred-set image audit found the same Yokohama skyline source in five visible roles. Outer back used it as a small supporting postcard rather than essential place evidence.

Hypothesis: the dominant flatlay already contained a natural maroon notebook surface that could support native editorial copy, allowing the repeated photo to be removed without losing page energy.

Bounded test: rollback-safe EV `1821:2` hid only the small skyline role and placed native `YOKOHAMA / MEMORY ROUTE / 6 SCENES` on the existing notebook surface. Front cover, dominant photo, chronology, remaining images and hashes were unchanged.

Result: whole spread PASS; back actual-size 794×1123 PASS; collision 0; safe-area risk 0. Visual comparison favored EV over ES. Skyline preferred-set repetition is reduced by one without a false substitute image.

Adopted: EV preferred. ES hidden rollback.

What remains Rurubu-specific: exact wording, notebook/photo, positions, palette, chronology treatment, cover grammar.

## Asset-state summary

- newly generated: 0
- adopted generated: 0
- Drive writes: 0
- external binary placements: 0
- new image hashes: 0
- native variable text preserved: YES
- replaceable photo roles preserved where retained: YES
- rollback states preserved: YES
- V7 touched: NO
