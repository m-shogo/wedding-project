# RSL-166 — A profile can become editorial by binding photo and facts into one field

Source scope/item: Rurubu WEDDING / V6 Profile + Q&A
Date: 2026-08-21
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

HU `2044:2` was structurally valid, but its left profile page still read as three legacy-derived horizontal sections: hero photo, profile facts, lower snapshots. At common thumbnail scale it was the weakest spread in the preferred V6 set.

## Evidence before change

- HU whole spread / 500px: readable but more section-stacked and less decisive than ID / IJ / IH / IE / IG.
- profile facts and photo roles were already native/replaceable, so the defect was hierarchy rather than missing capability.

## Root-cause hypothesis

When a print profile page has a strong legitimate image plus several short factual fields, separating those roles into horizontal bands can make the page read like a web template. Reorienting the dominant image and attaching a narrow fact column can create one editorial field without adding cards or new decoration.

## Principle / capability tested

Test **photo–fact binding through orientation and adjacency** before adding containers, decorative fields or more assets.

## Exact bounded change

Rollback-safe IK `2084:2` duplicated HU and changed only the left profile page materially:

- main replaceable photo → tall `520×640` field;
- generated route-texture raster hidden;
- native headline, accent, quote and profile name attached to the image field;
- six native profile facts consolidated into a narrow cream-side editorial column;
- two existing verified replaceable snapshots became a large lower image plus smaller overlapping support image;
- native `03 / 次の旅へ。` retained as a terminal cream-field beat;
- right Q&A page unchanged;
- no new factual copy, image, generated asset, card, shadow or gradient.

## Expected improvement

Stronger photo-first reading, less horizontal sectioning, denser but readable magazine rhythm, and preserved native editability/replacement roles.

## Regression risk

A narrow fact column may not tolerate longer production copy. White photo-overlay copy can become unreadable if moved to a light field. The vertical-photo geometry is not itself a project rule and must not become a repeated template signature.

## Three-scale evidence

- whole spread / 500px: PASS; IK stronger than HU;
- reading spread / 1400px: PASS;
- actual-size left / `794×1123`: PASS after correcting one low-contrast deck and the local `03` text collision.

Final structure:

- visible native text `55`;
- visible IMAGE fills `5`;
- same-parent text intersections `0`;
- 18px page-edge text safe risks `0`;
- whole-page flattening `NO`.

## Figma / Drive / GitHub evidence

- Figma file `bfM0d4c9dCeBv5pCkJ3TNM`;
- preferred IK `2084:2`;
- profile left `2084:3`;
- unchanged Q&A right `2084:49`;
- hidden rollback HU `2044:2`;
- Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified;
- new generated/adopted/Drive assets `0`;
- evidence `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IK-PROFILE-CLEANROOM-PHOTO-COLUMN-QA-2026-08-21.md`;
- evidence commit `dde951c96530fffd66fcda0e06dee3b7d03a67aa`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: IK adopted as V6 preferred; HU retained hidden as rollback.

## What must remain Rurubu-specific

Do not transfer the exact 520×640 photo geometry, `もっと。` typography, magenta/cyan/yellow palette, snapshot overlap, 03 placement, travel-magazine density or existing Rurubu imagery.

## Cross-item applicability hypothesis

On another print artifact that contains a legitimate hero image plus short factual/profile fields, independently test whether **changing the image orientation and binding facts beside it** creates a stronger artifact-level hierarchy than adding boxes or maintaining stacked horizontal modules.

## Next receiving-item experiment

Use only when a receiving item's own authority shows a comparable stacked-section defect. Duplicate rollback-safely, preserve native variable facts, and compare thumbnail / reading / actual-size evidence. Reject if the receiving artifact's physical semantics require horizontal bands or if fact-copy stress fails.
