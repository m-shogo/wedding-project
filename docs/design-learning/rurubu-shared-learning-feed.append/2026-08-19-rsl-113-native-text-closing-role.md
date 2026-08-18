# RSL-113 — Native typography can make a non-photo closing role intentional

Source: Rurubu WEDDING V6 Profile ET
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Problem

The Profile page intentionally had two lower snapshot photos, but the small lower-right `03 / NEXT DESTINATION` role was too quiet and could look unfinished at whole-spread scale.

## Hypothesis

When a page already has enough legitimate photography, a transition or closing area does not always need another image. Strong native type can make the role intentional while avoiding unnecessary photo repetition.

## Test

On rollback-safe ET `1817:2` from EK `1762:2`, preserve the existing photos and image hashes. Enlarge the native `03`, strengthen `次の目的地へ。`, keep a small `NEXT DESTINATION` kicker and one short rule. Do not add photography, a card or a raster asset.

## Evidence

The first version was rejected because the enlarged `03` wrapped vertically and an extra note crowded the photo cluster. A later structure pass also found two text contacts. After correcting width and positions:

- whole spread 1200px: PASS;
- Profile actual-size `1817:3` 794×1123: PASS;
- visible native text: 25;
- text collisions: 0;
- 18px safe-area risks: 0;
- overflow: 0;
- Profile image roles unchanged at 4;
- no new image hash.

Figma: preferred ET `1817:2`, Profile `1817:3`; EK `1762:2` hidden rollback.
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-ES-ET-EDITORIAL-HIERARCHY-QA-2026-08-19.md`.

## Regression risk

Large editable numbers still need sufficient text width and actual-size collision QA. Extra explanation can weaken the intended closure by crowding nearby image roles.

## Keep item-specific

Exact wording, position, sizes, rule color, snapshot composition and Rurubu visual grammar.

## Transfer hypothesis

On another print item, when a transition area looks incomplete, first verify whether an image is semantically necessary. If not, independently test a stronger native text-only closing or transition role before adding or repeating imagery.
