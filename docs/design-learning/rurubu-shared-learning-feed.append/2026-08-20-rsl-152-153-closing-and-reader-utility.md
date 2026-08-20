# RSL-152 / RSL-153 — closing cadence and reader utility microcopy

Date: 2026-08-20
Source scope/item: Rurubu WEDDING V6

## RSL-152 — Use page-width native closing cadence before adding filler imagery

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Source problem

The back-cover chronology was structurally correct, but its final authoritative event (`06 / 2026.10.24 / WEDDING`) occupied only a compact left-side area, leaving lower-right cream space that read as accidental rather than intentional.

### Root-cause hypothesis

The page did not need another image or decorative card. The existing final event lacked enough native typographic mass to close the physical page.

### Bounded test

On rollback-safe Outer duplicate GV, change only the final closing typography: enlarge 06, widen WEDDING across the page, keep the exact authoritative date, and add no new fact/image/container.

### Failure / repair

- first candidate: 06 wrapped vertically because its text box was too narrow;
- second structural audit: 06 touched date/WEDDING by 6–8px;
- repaired by widening the ordinal box and moving the date/WEDDING right.

### Expected improvement

Turn accidental lower-page emptiness into deliberate editorial closure while preserving photo truth, facts and editability.

### Regression risk

Large closing type can collide with dates/footer or look like a poster rather than a magazine page. Actual-size structural QA is required.

### Three-scale evidence

- whole spread ~700px: PASS;
- actual-size back 794×1123: PASS;
- collisions: 0;
- 18px safe risks: 0.

### Evidence

Figma: GV `2006:2`, back `2006:3`; GU `1975:2` hidden rollback.
Drive: no new asset; V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified.
GitHub QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GV-GR-CLOSING-AND-READER-UTILITY-QA-2026-08-20.md`.

### What must remain Rurubu-specific

Exact 06/WEDDING scale, back-cover chronology composition, colors, coordinates, copy and Yokohama visual grammar.

### Cross-item applicability

When a print page has meaningful remaining physical space after its semantic content is complete, another item may independently test stronger native closing cadence before adding filler photography or a new container.

## RSL-153 — Reader-facing utility microcopy should not look like production schema

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Source problem

The 1DAY Plan utility region used generic English labels (`TRIP DATA / MOVE / PACE / BEST / MOOD`, `OUR YOKOHAMA / FLEXIBLE DAY`) that were technically readable but looked like template/schema tokens rather than Japanese travel-guide reader copy.

### Root-cause hypothesis

Once the layout is mature, generic utility labels can preserve an AI/template feel even when hierarchy and photography are strong. The defect is lexical/editorial, not spatial.

### Bounded test

On rollback-safe GR, preserve every photo, time, itinerary fact and image role while converting only utility/helper native text to Japanese-first reader copy (`横浜1DAYメモ`, `移動`, `ペース`, `おすすめ`, `気分`, etc.).

### Failure / repair

The inherited width of `旅のコツ` overlapped the large native headline by 17px. The label width was reduced before promotion.

### Expected improvement

Increase finished-magazine plausibility without changing facts, assets or layout intent.

### Regression risk

Blindly translating all English can erase intentional brand/category language or create longer Japanese strings that collide. Apply only to generic semantic/utility microcopy and re-QA actual size.

### Three-scale evidence

- whole spread ~700px: PASS;
- actual-size left 794×1123: PASS;
- collisions: 0;
- 18px safe risks: 0.

### Evidence

Figma: GR `2007:2`, left `2007:3`; GQ `1968:71` hidden rollback.
Drive: no new asset; same V6 root reverified.
GitHub QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GV-GR-CLOSING-AND-READER-UTILITY-QA-2026-08-20.md`.

### What must remain Rurubu-specific

Exact Japanese wording, labels, hierarchy, palette, photo arrangement and 1DAY Plan composition.

### Cross-item applicability

Other print items may independently test whether generic production/schema-like helper labels should become reader-facing native copy. Do not transfer Rurubu wording or visual treatment.