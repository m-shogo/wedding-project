# V5 front-cover temporary import structural cleanup

Date: 2026-08-05
Scope: Rurubu WEDDING V5 only
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Outer candidate: `77:18`
Front cover: `77:145`

## Authorities consulted

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- live Figma structure and screenshot
- verified Drive derivative for V5-10

## Visible problem

The V5 front-cover frame still contained a visible child named `TEMP_REMOTE_IMAGE_IMPORT_TEST` (`79:18`) positioned exactly over the semantic cover hero role (`77:148 / IMG_HERO`). Even though the whole-item screenshot did not show a visible difference, leaving a temporary transport-test frame visible above the semantic image role created structural ambiguity and future source/hash audit risk.

## Tested principle / capability

Remove experiment residue before further quality decisions, while preserving the semantic node, native text, crop editability, and rollback history.

Expected improvement:

- one unambiguous semantic hero node remains responsible for the visible cover image;
- future Drive ID → node ID → image hash verification cannot accidentally target or visually conflict with a temporary overlay;
- rollback remains immediate because the test frame is hidden, not deleted.

Possible regression:

- the temporary frame might have been providing a visible image not present in the semantic hero node;
- hiding it could reveal a blank or materially different cover image.

Evidence required:

- pre-change live node inspection;
- post-change whole-item screenshot comparison;
- semantic hero node and surrounding native text remain unchanged;
- temporary frame remains available but invisible.

## Experiment

1. Inspected live outer candidate `77:18` and front cover `77:145`.
2. Confirmed semantic hero `77:148` remained visible with an IMAGE fill.
3. Confirmed `79:18 / TEMP_REMOTE_IMAGE_IMPORT_TEST` was a separate visible frame at the exact same `665 × 610` geometry.
4. Changed only `79:18.visible` from `true` to `false`.
5. Captured a new whole-item screenshot.

## Result

`VERIFIED / ADOPTED FOR V5 CURRENT STRUCTURE`

- The post-change screenshot is visually unchanged at whole-item scale, proving the temporary frame was not required for the current visible design.
- Semantic hero `77:148`, all native text, cover overlays, crop geometry, and V4 rollback evidence remain intact.
- The temporary test frame remains available for rollback but no longer participates in the live visual stack.
- No photo-role PASS count changed; this is structure cleanup, not image-quality completion.
- V6 remains gated.

## Failure / blocker note

A fresh connector upload URL was also issued for V5-10 back main, but the execution container again could not resolve `mcp.figma.com`. The same external POST method is not retried further in this run. The verified JPEG derivative and live node `77:24` remain unchanged.

## Learning state

- observation: `DISCOVERED`
- bounded change: `PROTOTYPED`
- screenshot and structure comparison: `VERIFIED`
- project-wide rule promotion: `NO`; this is a specific cleanup instance supporting the existing rule that experiment artifacts must not remain in Current visual stacks.

## Next application

Continue Batch A dominant-image placement using a binary-safe method. Before each placement, audit for any other temporary import frames or duplicate overlays that could make Drive/node/hash evidence ambiguous.
