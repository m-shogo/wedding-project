# RSL-034 — Increase legitimate photo-field authority before adding decoration

Date: 2026-08-16
Source scope/item: Rurubu WEDDING / V6 Profile AR
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The V6 profile spread was structurally clean but still read as `headline → modest image → information block`, while the cover and adjacent Story/chronology spread had stronger photographic authority.

## Root-cause hypothesis

When an editorial print page feels underpowered, the missing energy may come from the dominant photograph being treated as a contained module rather than a page-level field. Adding stickers, cards, borders, or generated decoration would not fix that hierarchy.

## Bounded test

On a rollback-safe clone of AM, only existing verified roles were recomposed:

- profile hero widened to the full physical page width;
- native profile facts were compacted below the hero;
- three existing replaceable snapshots were given unequal scale, overlap, and small opposing rotations;
- native pullquote remained editable and was brought above the photo cluster;
- Q&A was not changed.

No new source image, card, badge, gradient, shadow, or generated decoration was added.

## Expected improvement

Make the profile page read as a travel-magazine page led by photography rather than a form/template, while protecting future text/image replacement.

## Regression risk

- enlarging a source beyond intrinsic quality;
- loss of readable profile-data hierarchy;
- overlap that hides native copy;
- safe-area/fold violations.

## Evidence

Figma:

- source AM `1380:18` retained hidden rollback;
- adopted AR `1389:2`;
- profile page `1389:3`;
- Start Here `845:27` now reads `V5 FU/FX · V6 O + AR/AQ INSIDE STUDIES · V7 HOLD`.

Three-scale review:

- whole spread 1200 px: PASS and stronger than AM;
- reading scale: PASS;
- actual profile 794×1123: PASS.

Structure:

- Profile native text `18`, IMAGE roles `4`, text collision `0`, 18 px safe risk `0`;
- Q&A native text `24`, IMAGE roles `2`, text collision `0`, 18 px safe risk `0`.

Drive authority re-read:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

GitHub evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V6-O-AR-AQ-QA-2026-08-16.md`.

## Adopted / rejected status

`VERIFIED_LOCAL`: AR adopted as preferred Profile/Q&A study; AM preserved as hidden rollback.

## What must remain Rurubu-specific

Do not transfer the exact 793.7×328 hero geometry, snapshot rotations, Yokohama imagery, headline treatment, palette, or Rurubu editorial grammar.

## Cross-item applicability hypothesis

For another print artifact that feels weak despite correct structure, independently test whether an already-legitimate image role should become a larger continuous visual field before adding decorative containment. Only transfer the hierarchy method, not the Rurubu composition.
