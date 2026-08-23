# RSL-234 — Contact-sheet selection gate + fixed panel-footer collision

Date: 2026-08-23
Source scope: Rurubu WEDDING
Source role: V8 OUTER-01 photo art direction

## A. Professional photo-selection observation

State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS`

Fresh sources deliberately moved away from the recent typography/cover references:

- National Geographic travel-photo guidance: story and sense-of-place should be visible in the photographs; useful coverage comes from materially different distances, angles and telling details rather than only a beautiful destination view.
- Magnum contact-sheet practice: adjacent frames expose the photographer's refinements of frame, light and subject and support deliberate final-image editing.
- Aperture image-selection/sequencing teaching: choosing and sequencing images changes meaning; selection is not an afterthought to image making.

Rurubu-specific hypothesis:

> For a dominant travel-editorial photo role, compare materially different frames for the same semantic job as a small contact sheet before selecting the final crop. A setting frame, lived-in detail and observational bridge should be available for comparison. Prefer the image that strengthens the publication's story/sequence rather than the prettiest isolated postcard.

Bounded implementation:

- Figma authority panel `2270:2 / V8 OUTER-01` was re-read immediately before mutation.
- Added `2322:2 / 選定 / contact sheet` and `2322:3 / OUTER-01 / CONTACT-SHEET SELECTION GATE`.
- Production V8 root `2273:24` was not edited.
- V6/V7 were not edited.

This is not yet `VERIFIED_LOCAL` as a photo-design principle because no new role-specific photo set has been generated, selected, saved, placed and visually compared.

## B. Figma production failure fingerprint

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint:

`F-RSL-234-FIXED-BOTTOM-FURNITURE-OVERLAPS-APPENDED-PANEL-CONTENT-AFTER-ROOT-EXPANSION`

Visible problem:

After appending the new contact-sheet section, the existing status furniture overlapped the new body even though the newly created text itself had valid bounds.

Root cause:

- new body `2322:3`: local `y=890`, final height `185`, bottom `1075`;
- existing status frame `2270:15`: local `y=875`, size `360×62`;
- root growth did not automatically reflow this fixed-position sibling.

Corrected method:

1. stop after the first screenshot showed the collision;
2. re-read the status parent rather than moving its nested label blindly;
3. expand `2270:2` to `1400×1180`;
4. move only `2270:15` to `y=1100`;
5. rerender and verify separation from body bottom `1075`.

Final visual QA: PASS.

Generalizable candidate:

> When extending a fixed-layout Figma panel/frame, successful text auto-height is not enough. Re-read footer/status/bottom-furniture siblings after root resize and verify their final local geometry before considering the append complete.

Do NOT transfer:

- V8 panel dimensions;
- exact status location;
- OUTER-01 copy;
- typography, palette or Rurubu art direction.

Evidence:

`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-OUTER01-CONTACT-SHEET-SELECTION-GATE-QA-2026-08-23.md`

## Generation / asset truth

No photography was generated or promoted. The connected Weave image-generation path is currently unavailable because Figma is not linked to Weave. Existing V8 `table-essay` Drive master was directly inspected and remains schematic placeholder evidence, not legitimate dining photography.
