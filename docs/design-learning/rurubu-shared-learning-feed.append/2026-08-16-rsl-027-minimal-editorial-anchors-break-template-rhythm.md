# RSL-027 — Minimal editorial anchors can break template rhythm without rebuilding decoration

Date: 2026-08-16
Source scope: Rurubu WEDDING / V6 inside
State: `CROSS_ITEM_CANDIDATE`
GitHub evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-AI-AJ-INSIDE-QA-2026-08-16.md`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## OBSERVED

AF/AG were already photo-led, native-text, rollback-safe studies, but fresh live screenshots still showed residual template rhythm:

- profile facts felt like a calm side form rather than a magazine data column;
- six Q&A groups could still be perceived as equally weighted modules even without cards;
- chronology events remained separable photo/caption units rather than one edited page;
- the final WEDDING event did not dominate enough at thumbnail scale.

The problem was not lack of ornaments. Adding more decorative stickers/cards would have increased Figma complexity without fixing reading hierarchy.

## ROOT_CAUSE_HYPOTHESIS

When a photo-led editorial page still reads like a template, the missing layer can be **editorial binding**, not more decoration: a small number of purposeful rules/rails/strips that connect related information and create scale contrast.

The hypothesis was that three things together would improve the read:

1. materially unequal photo scale/overlap;
2. native type with stronger display-to-caption contrast;
3. only a few flat semantic anchors such as section rules, a data rail, or one endpoint caption strip.

## TESTED_LOCAL

Rollback-safe clones were created from AF/AG:

- AJ `1364:2` — Profile/Q&A
- AI `1363:125` — Story/chronology

Bounded changes:

### AJ

- larger profile hero and lower overlapping three-photo cluster;
- compact right-side profile fact rail;
- native quote moved into the final third;
- Q&A compacted into the top half with one coral rail rather than six cards;
- Memories enlarged into one dominant replaceable photo plus one support photo;
- three-scale and structural QA before promotion.

### AI

- larger chronology title and feature-photo cluster;
- materially unequal event photo sizes/positions/rotations;
- one short flat color rule per event instead of a diagram or card;
- WEDDING converted to a dominant native-text caption strip over the final destination photo;
- old route rail/milestone dots remained hidden;
- collisions exposed by structure QA were repaired before promotion.

No new generated binary was counted as progress. Existing Drive section masters were read back only as candidates; unresolved transport was not retried cosmetically.

## Expected improvement

- stronger magazine silhouette at 500 px;
- clearer page-level primary/secondary/micro hierarchy;
- less dashboard/form/grid feeling;
- continued human editability because copy and photos remain semantic roles;
- lower Figma complexity than rebuilding scrapbook decoration natively.

## Regression risk

- flat rules can become UI separators if overused;
- rotation can become fake randomness instead of hierarchy;
- large photos can crowd native copy or safe areas;
- endpoint strips can obscure nearby chronology content;
- exact color/position treatments are Rurubu-specific and should not become a universal Wedding style.

## VERIFIED_LOCAL evidence

### AJ

Three-scale visual QA:

- 500 px spread: PASS
- 1400 px spread: PASS
- actual-size Profile `1364:3`, 794×1123: PASS
- actual-size Q&A `1364:27`, 794×1123: PASS

Structure after repair:

- Profile: 18 native text / 4 replaceable IMAGE / 0 text collisions / 0 safe-area risks
- Q&A: 22 native text / 2 replaceable IMAGE / 0 text collisions / 0 safe-area risks

### AI

Three-scale visual QA:

- 500 px spread: PASS
- 1400 px spread: PASS
- actual-size chronology `1363:137`, 794×1123: PASS

Structure after repair:

- 27 native text
- 9 replaceable IMAGE roles
- 0 text/text collisions
- 0 18 px text safe-area risks
- no visible node outside page

Result: AJ/AI promoted locally; AF/AG retained hidden as comparison.

## Drive / provenance readback

Rurubu-only generated section masters remain independently available:

- Profile v2 — `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- Q&A v2 — `1_JmXHiTmJnRjR9Oam4gERv456yN4qjQn`
- Timeline v2 — `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`
- Memories v2 — `1Xi8C0KV8JfZrbx1fKttGae0Go6tsFzqG`

They were **not** newly placed or visually adopted in AJ/AI; existing quality-preserving binary transport remains unresolved.

## What must remain Rurubu-specific

Do not transfer literally:

- coral/cyan/yellow palette;
- exact line positions;
- chronology geometry;
- title sizes;
- photo crops/rotations;
- WEDDING endpoint treatment;
- tropical/travel art direction.

## Cross-item applicability hypothesis

Potentially transferable principle only:

> When a layout is structurally editable and photo-led but still reads as a template, test a bounded combination of unequal scale plus a **small number of semantic editorial anchors** before adding decorative modules. Verify at thumbnail, reading and actual-size scales, and reject anchors that behave like UI separators.

This is `CROSS_ITEM_CANDIDATE`, not a project-wide visual rule. A materially different receiving item would need its own rollback-safe reproduction before any cross-item verification.
