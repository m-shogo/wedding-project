# Rurubu WEDDING V8 — OUTER-01 contact-sheet selection gate QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Authority panel: `2270:2`
Production roots changed: NO
V6 control changed: NO

## Fresh professional input

This run deliberately moved from typography/page-composition research into professional photo editing and sequencing.

- National Geographic travel-photo guidance treats a useful travel photograph as storytelling and sense-of-place evidence, not merely an attractive destination image. It recommends covering a place from materially different distances/angles and retaining telling details rather than requiring an explanation for what is missing from the frame.
- Magnum's contact-sheet material shows contact sheets as an editing/indexing surface where subtle changes in frame, light and subject can be compared before the final image is selected.
- Aperture's image-selection/sequencing teaching treats selection as intentional meaning-making and sequence/context as part of what a photograph communicates.

These observations are decision inputs only. No source layout or literal visual style was copied.

## Rurubu-specific hypothesis

For V8 OUTER-01, a single attractive Yokohama candidate is insufficient evidence. Generate/select a small family for the same semantic role and compare it as a contact sheet before choosing the final cover role.

Required candidate difference:

1. `setting` — city/harbor spatial context and depth;
2. `lived-in detail` — pavement, storefront rhythm, harbor infrastructure or another real-use trace;
3. `observational bridge` — a frame that connects environment and lived experience.

Selection criterion: choose the frame that best makes the publication sequence say `この街を歩きたい`, not the prettiest isolated postcard.

Reject when:

- the important story exists only in explanatory text rather than the frame;
- landmark/postcard beauty is the only place evidence;
- fake signage/landmarks or AI architectural breakdown are required for specificity;
- the crop cannot preserve the existing Japanese headline text-safe role.

## Figma bounded write

Before the write, live `2270:2` was re-read including exact text nodes, dimensions, fonts and parent.

Added only to the photo-art-direction panel:

- `2322:2 / 選定 / contact sheet`
- `2322:3 / OUTER-01 / CONTACT-SHEET SELECTION GATE`

Panel name after write:

`V8 / PHOTO ART DIRECTION / OUTER-01 / QA_PASS + CONTACT-SHEET GATE / 2026-08-23`

No V8 production spread, V7 spread or V6 control node was changed.

## Failure learned during the write

Visible symptom after the first successful panel extension: the existing `GENERATION_READY / NOT CURRENT` status badge visually overlapped the newly appended selection section.

Readback showed:

- status frame `2270:15` remained at local `y=875`, size `360×62`;
- new selection body `2322:3` occupied `y=890..1075`;
- the status label itself `2270:16` was correctly local to `2270:15`; the issue was the parent status-frame position.

Root-cause hypothesis: expanding a fixed-layout information panel can leave bottom furniture at its old absolute local position, so append-safe text placement alone is insufficient.

Corrected method:

- re-read status parent and new body before correction;
- expand panel `2270:2` to `1400×1180`;
- move only existing status frame `2270:15` to `y=1100`;
- verify `bodyBottom=1075`, leaving separation before the status frame;
- rerender the full panel.

Final screenshot QA: PASS. The contact-sheet section is readable; status furniture no longer overlaps content.

Normalized failure fingerprint:

`F-RSL-234-FIXED-BOTTOM-FURNITURE-OVERLAPS-APPENDED-PANEL-CONTENT-AFTER-ROOT-EXPANSION`

Do not generalize this into a rule that all status furniture belongs at the bottom. Generalizable candidate is the production method: after expanding a fixed-layout panel, re-read anchored/footer/status siblings and test their final geometry before considering the append complete.

## Asset / generation truth

- new image-model generation: `0`
- new Drive masters: `0`
- new production Figma image placements: `0`
- current V8 Drive assets changed: NO
- V8 `v8_table_essay_master.png` was directly inspected this run and remains a low-complexity schematic placeholder, not legitimate dining photography and not a reason to fill AS with decorative raster content.
- Weave image-generation path is currently blocked because the authenticated Figma account is not linked to Weave. No generation success is claimed.

## State

Professional observation: `OBSERVED`
Rurubu contact-sheet selection hypothesis: `ROOT_CAUSE_HYPOTHESIS`
Figma brief implementation: `VERIFIED_LOCAL` as an authoring/selection gate
Photo-quality hypothesis itself: NOT VERIFIED until materially different role-specific photos are generated, selected, saved, placed and three-scale reviewed.

V8 remains `NOT_GLOBAL_WINNER / NOT_PRINT_READY`.
