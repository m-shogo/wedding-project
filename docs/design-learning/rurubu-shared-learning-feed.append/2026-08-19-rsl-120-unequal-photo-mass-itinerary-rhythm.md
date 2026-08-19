# RSL-120 — Unequal photo mass can break itinerary-module rhythm without adding decoration

Source scope/item: Rurubu WEDDING / V6 Yokohama 1DAY Plan

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The 1DAY route page already had correct native times, titles, copy and replaceable photos, but the repeated left-text/right-photo pattern still read as four similar itinerary modules. The weakness was not missing content or missing decoration; it was insufficient visual responsibility difference between the existing photo roles.

## Evidence before change

EU `1818:2` passed structure and source checks but was the weakest page in the same-scale six-spread review. The four right-page images were all valid, yet the page retained large cream gaps and repeated-module rhythm.

## Root-cause hypothesis

When repeated semantic events are already ordered by native text, equal or near-equal visual mass can overstate their sameness. A stronger dominant/support/bridge/closing hierarchy may produce editorial rhythm without adding cards, rules, generated decoration, or new media.

Neutral input: non-Rurubu `2026-08-17-nrsl-unequal-content-mass-columns.md` was consumed only as a hypothesis about assigning unequal mass by content responsibility. No literal layout, assets, palette, coordinates, or production state transferred.

## Bounded test

Rollback-safe FA candidate `1840:2` preserved all four stop roles and hashes but changed only geometry:

- STOP01 compact orientation/photo;
- STOP02 dominant mid-page photo;
- STOP03 smaller bridge photo;
- STOP04 strong closing field;
- native stop copy moved toward its corresponding image.

No new image, card, shadow, gradient, border system, generated asset or Drive write was introduced.

## Expected improvement

Reduce itinerary-template/UI reading and make the page feel like a Japanese travel-magazine photo diary while preserving chronological usability.

## Regression risk

Aggressive photo enlargement can violate intrinsic source size, collide with variable native copy, or obscure the schedule order. Rotation/overlap must remain subordinate to readability and source fidelity.

## Three-scale evidence

- whole / 900px: PASS and stronger than EU;
- reading / 1200px: PASS;
- actual right page / 794×1123: PASS;
- native text intersections: `0`;
- 18px safe-area risks: `0`;
- intrinsic violations: `0/4`.

## Figma / Drive / GitHub evidence

- Figma: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted FA: `1840:2`, right `1840:33`;
- hidden rollback EU: `1818:2`;
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FA-1DAY-PHOTO-LED-STOPS-QA-2026-08-19.md`.

## What must remain Rurubu-specific

Do not transfer Yokohama stops, exact photo choices, crop dimensions, rotations, colors, labels, coordinates, or Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

On another print artifact with repeated semantic units, independently test whether unequal visual mass based on editorial importance/content responsibility improves hierarchy before adding containers or decoration. Re-run actual-size copy collision and intrinsic-source QA after any geometry change.