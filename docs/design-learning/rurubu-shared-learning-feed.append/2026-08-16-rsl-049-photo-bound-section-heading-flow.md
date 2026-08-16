# RSL-049 — Photo-bound section heading can repair detached vertical page flow

Date: 2026-08-16
Source scope: Rurubu WEDDING / V6 Outer
State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Outer T back cover had strong photography, but `みんなとの思い出` and the chronology lived as a separate beige section below the photo cluster. At whole-item and actual-size views, the page read as `photo area` + `information area` rather than one magazine composition.

## Root-cause hypothesis

The problem was not lack of decoration. The section heading was detached from the photograph it described, and the chronology started too low. That semantic separation created the visual split.

## Bounded test

Rollback-safe T → V duplicate:

- repurpose the existing memory underline into a navy caption strip instead of adding a new decorative family;
- move the existing native `みんなとの思い出` onto that strip over the café photo;
- pull the existing chronology upward;
- strengthen the existing WEDDING terminal field;
- leave the front cover, photos, hashes, copy semantics and replaceable image roles unchanged.

## Expected improvement

Create a continuous read:

`dominant travel photo → memory photo + heading → chronology → WEDDING terminal`

without adding cards, stickers, generated decoration, shadows or new images.

## Regression risk

- heading contrast could fail over photography;
- chronology could become crowded;
- lower production/footer area could lose safe spacing;
- the caption strip could become another heavy UI card if oversized.

## Evidence

Figma:

- preferred Outer V `1477:2`;
- actual-size back page `1477:3 / 794×1123`;
- rollback Outer T `1447:2` preserved hidden.

Three-scale result:

- 500px whole item: PASS;
- 1000px reading scale: PASS;
- 794×1123 actual-size back page: PASS.

Structure:

- native text `18`;
- replaceable IMAGE roles `3`;
- text/text collision `0`;
- 18px text safe-area risk `0`;
- image hashes unchanged from T.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-V-BR-BQ-INTEGRATED-FLOW-QA-2026-08-16.md`.

Drive:

- no new save; verified V6 root remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Verified result

**ADOPTED LOCALLY.** Binding the section heading directly to a legitimate photograph removed the detached-section feel more effectively than adding decoration. The chronology can then sit closer to that photo cluster while the WEDDING terminal provides the final stop.

## What must remain Rurubu-specific

Do not transfer literal navy-strip dimensions, Rurubu palette, image choices, chronology wording, positions, or composition.

## Cross-item applicability hypothesis

When an editorial page feels vertically split into independent modules, first test whether an existing native heading can be semantically bound to a legitimate image field and whether the following sequence can be compressed. This is preferable to inventing another decorative module when the page already has sufficient visual material.

## Next receiving-item experiment

Only test this principle on another item when it has the same observable defect: a meaningful photograph and a detached heading/sequence that visually belong together. Preserve the receiving item's own art direction.