# RSL-075 — Tighten verified cover photography into one editorial cluster before adding decoration

Date: 2026-08-17
Source scope: Rurubu WEDDING V6
Source item/state: Outer Z → AA
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Outer Z already had a strong waterfront hero, but the lower support-photo pair still read partly as two placed modules separated from the hero by a calm cream interval. At thumbnail scale the front cover therefore remained slightly more modular than a strong travel-information magazine cover.

## Root-cause hypothesis

The defect was not missing ornament. Existing legitimate support photographs could be enlarged within source fidelity, overlapped more intentionally, and pulled closer to the hero so the cover reads as one photo-led composition.

## Bounded test

On rollback-safe AA `1592:2`:

- keep the same waterfront hero and image hash;
- move the hero upward slightly while preserving its size;
- enlarge/reposition the existing dining and cafe support photos within verified source dimensions;
- use small opposing rotations to create one asymmetric support-photo cluster;
- move the existing strap/deck/feature anchors with the new photo rhythm;
- add no new card, sticker, shadow, gradient, generated asset, raster byte, or image hash;
- leave the back cover unchanged.

The first version produced a real collision between `横浜` and the moved strap/deck. That state was not adopted. The destination headline was corrected and the candidate was re-audited before promotion.

Expected improvement: stronger cover energy and less hero-plus-modules separation while preserving semantic/photo replaceability and native text.

Regression risks: title collision, excessive thumbnail density, raster softness after enlargement, and safe-area regression.

## Three-scale evidence

Figma:

- source Z `1576:160`;
- preferred AA `1592:2`;
- front page `1592:46`.

Visual QA:

- whole spread `500×354`: PASS;
- reading spread `1200×849`: PASS;
- front actual-size `794×1123`: PASS.

Structure / raster QA after correction:

- front native text `12`;
- absolute text collisions `0`;
- 18px text safe-area risks `0`;
- waterfront hero `793.7×470` ≤ source `1356×560`;
- skyline support `214×196` ≤ source `240×220`;
- dining support `533.7×320` ≤ source `732×498`;
- cafe support `330×268` ≤ source `810×552`;
- masthead `360×115.92` ≤ source `500×161`.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AA-CW-CQ-PHOTO-LED-COVER-AND-ROLE-DIVERSITY-QA-2026-08-17.md`;
- `01_paper-items/rurubu-wedding/RURUBU-V6-AA-CW-CQ-ACTIVE-ASSET-RECONCILIATION-2026-08-17.json`.

## Result

`VERIFIED_LOCAL` in Rurubu: when a cover already has legitimate, quality-passing photography, tightening scale/overlap relationships among those photographs can increase editorial energy more effectively than adding another decorative container.

## What must remain Rurubu-specific

Do not transfer:

- the exact photographs or image hashes;
- exact coordinates, rotations, scale values, masthead, palette, or wording;
- Rurubu-specific cover grammar.

## Cross-item applicability hypothesis

Potentially test only the general principle: **before adding decoration to repair a cover that feels modular, test whether existing legitimate photography can be grouped into a stronger dominant/support cluster while remaining fidelity-safe, replaceable, and structurally clear.**

Receiving items must test independently. This is not `VERIFIED_CROSS_ITEM` and not a promoted project-wide visual rule.