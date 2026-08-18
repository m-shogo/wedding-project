# RSL-092 — Editorial-role variety can increase genre authenticity more than more surface styling

Source scope/item: Rurubu WEDDING / V6
Date: 2026-08-18
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

V6 had reached a structurally and visually stronger state with outer cover, profile/Q&A, story/chronology, and a destination-information Memory Spots spread. Even so, the publication still relied on a limited set of editorial page roles. Adding more labels, textures, cards, or micro-decoration to those same pages risked local polish without materially increasing the authenticity of a Japanese travel-information magazine.

## Evidence before change

Live preferred set before the experiment:

- Outer AG `1676:2`;
- Profile/Q&A DN `1675:2`;
- Story/chronology DO `1679:2`;
- Memory Spots DR `1689:2`.

DR had already verified RSL-090: a travel booklet needs a true destination-information role, not merely travel styling. The next visible opportunity was a different editorial role rather than another refinement of DR.

## Root-cause hypothesis

Recognizable publication genres are carried not only by palette, typography, crop, and decoration but also by the **variety of editorial jobs pages perform**. In a travel-information publication, a dedicated cafe / dining feature can establish a materially different rhythm from profile, chronology, or destination spots:

- dominant food/lifestyle photography;
- compact numbered features;
- useful native metadata;
- photo-led scan paths;
- different page pacing while remaining in the same publication system.

## Bounded test

A clean-room two-page cafe/table feature was created without cloning the existing V6 inside composition:

- DS `1694:2` established the new role using only existing verified Rurubu image hashes, native editable text, and simple functional labels/rules;
- DT `1695:2` refined the lower physical page fields using native closing typography only;
- all four photos remained independent replaceable IMAGE roles;
- no new image generation, Drive save, external upload, or image hash was introduced.

DT was not accepted from appearance alone. Structural QA caught title/deck overlap and three number/label overlaps; these were repaired before final verification.

## Expected improvement

Increase travel-magazine plausibility and whole-publication pacing without forcing every page into the same spot-guide/profile/timeline grammar or adding decorative clutter.

## Regression risk

- editorial-role variety can turn into arbitrary page proliferation;
- a food feature can become menu/card UI if containment replaces hierarchy;
- repeated source imagery can weaken publication credibility even when each source is valid;
- a visually useful study may still be excluded by final page count/imposition.

## Three-scale evidence

- DT whole spread ≈1400px: PASS;
- left page `1695:3` actual `794×1123`: PASS;
- right page `1695:23` actual `794×1123`: PASS;
- left structural QA: native text 14 / IMAGE 2 / text collisions 0 / 18px safe risks 0;
- right structural QA: native text 19 / IMAGE 2 / text collisions 0 / 18px safe risks 0.

## Figma / Drive / GitHub evidence

Figma:

- preferred DT `1695:2 / PREFERRED / V6_INSIDE_DT_GOURMET_CAFE_TABLE_2026_08_18`;
- rollback DS `1694:2` hidden;
- Start Here `845:27` includes `DT CAFE & TABLE` while V7 remains HOLD.

Drive authority:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Detailed evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AG-DN-DO-DR-DT-GOURMET-MIDDLE-FEATURE-QA-2026-08-18.md`.

Feedback:

- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-dt-gourmet-middle-feature.md`.

## Separate rejected evidence

A rollback-safe attempt to repair DR SPOT 03's destination-semantic mismatch by swapping to another existing verified hash was rejected: the alternate was a tropical resort sunset and remained wrong for Yokohama.

This does not create a new semantic-coherence rule; it reproduces existing Rurubu learning that technical verification does not grant semantic validity for every role.

## What must remain Rurubu-specific

Do **not** transfer:

- Yokohama/cafe/dining subject matter;
- magenta/cyan/yellow/navy palette;
- exact photo sources or hashes;
- exact two-page geometry;
- numbered feature count;
- Rurubu-like Japanese travel-magazine grammar;
- page numbers or final pagination assumptions.

## Cross-item applicability hypothesis

When another multi-page print artifact is technically polished but still feels like the same page template repeated, independently test whether the missing quality is an **editorial-role gap** rather than a decoration gap. A receiving item should create a role appropriate to its own physical/content purpose, not copy Rurubu's food feature.

## Next receiving-item experiment

On a materially different multi-page artifact, compare:

1. another round of local styling on an existing page role; versus
2. one genuinely different content/editorial role that the artifact's real use case naturally requires.

Promote nothing visual from Rurubu. Transfer only the diagnostic: publication/authenticity can depend on the completeness and variety of content roles.