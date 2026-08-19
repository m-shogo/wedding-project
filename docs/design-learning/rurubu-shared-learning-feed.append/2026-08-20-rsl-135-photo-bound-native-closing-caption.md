# RSL-135 — Mature photo beats may close with native copy instead of UI-like end tags

Source scope/item: Rurubu WEDDING / V6 1DAY Plan
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The final 1DAY stop already had strong native hierarchy and a dominant dining photograph, but an extra yellow END tag plus tiny English status-like copy remained on top. At whole-item scale it read like a UI/status component rather than magazine editing.

## Root-cause hypothesis

Once a photo beat already has sufficient number/time/title/body hierarchy, an additional container can become redundant. If the photograph contains a verified contrast-safe area, a short reader-facing native caption may provide closure with less module/UI reading.

## Bounded test

Rollback-safe GD hid only the END container and converted its copy to native Japanese `一日の終わりは、食卓で。` directly on the existing final photo. No photo, crop, image hash, stop order or route facts changed.

Structure QA also found two inherited 3px number/time contacts and corrected them before adoption.

## Expected improvement

Cleaner editorial ending, stronger photo-led closure, less status-tag/UI feeling, while preserving native editability and replaceable photography.

## Regression risk

Direct-on-photo native copy can fail when crop/brightness changes. The method is invalid without actual-size contrast, collision and safe-area verification.

## Three-scale evidence

- 1200px whole spread: PASS and cleaner than FM.
- reading/page scale: PASS.
- actual-size right page: PASS.
- native right-page text: 25.
- absolute text collisions: 0 after correction.
- 18px safe-area risk: 0.
- page-level stray nodes: 0.

## Figma / Drive / GitHub evidence

- Figma candidate: `1938:2`.
- Figma rollback: `1879:71`.
- right page: `1938:33`.
- closing caption: `1938:65`.
- Drive V6 authority remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`; no Drive write in this experiment.
- QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GD-1DAY-NATIVE-CLOSING-CAPTION-QA-2026-08-20.md`.

## What must remain Rurubu-specific

Exact Japanese copy, location, palette, Stop 04 photo, 1DAY composition and travel-magazine art direction.

## Cross-item applicability hypothesis

On another print artifact, when an END/status/tag-like container remains after surrounding hierarchy has matured, independently compare whether its real binding/contrast function is still needed. If not, test a short native reader-facing closing caption tied to an existing visual anchor. Do not copy the Rurubu wording or placement.
