# Rurubu WEDDING V9 — Current Production Checkpoint

Updated: 2026-08-27
Scope: Rurubu WEDDING V9 only

## Live authorities

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Figma page: `2601:2 / 08_RURUBU_V9_RURUBU_POP_PRODUCTION`
- Drive asset pool/reference authority: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup / RURUBU_V9`

## Six current production frames

- `2601:3` — Cover
- `2601:4` — Back Cover
- `2601:5` — Profile + Q&A
- `2601:6` — Story + Timeline
- `2601:7` — Memory + Gallery
- `2601:8` — 1DAY + Cafe/Table

All six remain `794×1123`.

## Current editorial state

V9 is in publication-level refinement. Existing Drive assets are optional design material, not inventory that must be consumed. Readability, Japanese hierarchy, photo rhythm, page balance and authentic magazine pacing override decoration count.

Earlier passes removed redundant UI-like cards/pills, opened Profile Q&A and Story Timeline into print-editorial typography, narrowed the Story year rail, enlarged its hero field, editorialized Cover supporting-photo captions, removed empty helper shells, and retained only functional labels/routes.

## 2026-08-27 print-readability pass

A whole-publication audit removed residual helper micro-labels that duplicated page titles, photography or editorial captions, while preserving functional indexing labels and chronology. Back Cover photo captions were raised to 12 px, Memory lower photo captions to 12 px, and the 1DAY travel-note body to 14 px. No new generated assets were added.

Rollback snapshot prefix:

`ROLLBACK / V9 READABILITY PASS / 1787777299849 / ...`

## 2026-08-27 editorial-rhythm pass

A new reading-scale review identified three concrete composition issues and corrected them without adding decorative inventory.

### Cover

- Tightened the layered `るるぶWEDDING` masthead upward by 12 px.
- Raised the main cover sub-head by 12 px.
- This reduces unused yellow-header space and strengthens the magazine masthead entry point without changing the hero/photo-mask structure.

### Back Cover

- Hid the remaining visually empty helper/index shell above `この本の中身`.
- The contents title now enters directly from the photo block, removing a residual empty UI-like pill.

### Story + Timeline

- Enlarged the replaceable supporting photo from `205×160` to `230×176` and kept its matching frame overlay geometrically identical.
- Shifted the `TIMELINE` title group to form a clearer two-column bridge beside the supporting photo.
- Added one plain editorial bridge line, `4つの出来事でたどる、ふたりの旅。`, plus a thin cyan rule. This is native editable text/geometry, not a badge/card.
- The bridge fills the previously weak transition between the upper photo/story lead and the year chronology while preserving the open editorial layout.

Rollback snapshot prefix for all three touched pages:

`ROLLBACK / V9 EDITORIAL RHYTHM PASS / 1787784699934 / ...`

## 2026-08-27 editorial-index + photo-rhythm pass

A further actual-page review focused on residual UI grammar and repeated equal-size image modules. No new generated assets were added; the Drive pool was used only as live authority/reference and remained unchanged.

### Profile + Q&A

The bottom `TRAVEL / FOOD / PHOTO` taxonomy still read as three interface pills even though the labels themselves are useful indexing information.

- Removed the colored pill fills from `2609:107 / 2609:109 / 2609:111`.
- Kept the native editable `TRAVEL / FOOD / PHOTO` text.
- Added one thin category-color editorial rule beneath each label: `2740:271 / 2740:272 / 2740:273`.
- The result keeps scan/index value while removing button-like containment.

### Memory + Gallery

The same problem remained in the lower `PLACE / PEOPLE / FOOD` index.

- Removed the colored pill fills from `2609:125 / 2609:127 / 2609:129`.
- Kept the native editable category text.
- Added thin category-color editorial rules `2740:274 / 2740:275 / 2740:276`.
- The existing `OUR FAVORITE` accent was retained because it still provides one intentional magazine-style break rather than functioning as repetitive UI.

### 1DAY + Cafe/Table

The three right-column photos were still mechanically equal modules. The masks and their overlays were redistributed without changing photo count or replaceability:

- DAY 01: `510,198 / 248×164`
- DAY 02: `482,382 / 276×174` — promoted as the dominant middle supporting image
- DAY 03: `510,580 / 248×164`

Each corresponding frame overlay remains geometrically identical to its photo mask. This introduces a controlled left-right step and one stronger visual beat while keeping the timeline text column stable.

### Cover supporting-photo rhythm

The three cover support roles still used equal widths even though the center role was already taller. A bounded redistribution now gives the bottom strip stronger magazine rhythm:

- MINI 01: `40,780 / 232×154`
- MINI 02: `302,758 / 190×176`
- MINI 03: `520,784 / 234×150`

Native captions and their thin editorial rules were optically recentered to the new photo roles. The hero, masthead, names/date and replaceable-photo count were not changed.

Rollback evidence:

- Profile: `2740:2`
- Memory: `2740:75`
- 1DAY: `2740:163`
- Cover: `2741:2`

## 2026-08-27 Back Cover footer editorial pass

A publication-sequence review found that the Back Cover's bottom signature and route still read as two large interface pills after the rest of the page had been editorialized.

- Removed the blue rounded fill from `2601:53 / BACK CLOSE / BG` while preserving the editable couple/date text `2601:54`.
- Recolored the couple/date text to navy and kept it as the primary footer signature.
- Removed the yellow rounded fill from `2609:105 / DECOR / BACK / MAP / MOVEABLE` while preserving editable route text `2609:106`.
- Added a thin blue editorial rule `2744:82` under the couple/date line and a thin yellow route rule `2744:83` under the route line.
- Visual screenshot QA confirms the footer now reads as a print colophon/route close rather than UI controls, while preserving useful identity and travel-theme information.

Rollback evidence:

- Back Cover: `2744:2`

One first write attempt failed atomically because direct assignment to `TEXT.width` is unsupported in this Plugin API path. No partial canvas change occurred. The corrected method omitted the direct width assignment and completed successfully; this failure fingerprint should not be repeated.

## Structural QA after Back Cover footer pass

PASS across all six current production frames:

- A4 size: `794×1123` × 6
- visible replaceable photo masks: `4 / 3 / 2 / 2 / 6 / 5` = 22
- corresponding visible frame overlays: `4 / 3 / 2 / 2 / 6 / 5` = 22
- photo/frame geometry mismatches: 0
- visible node overflow outside page bounds: 0
- visible text below 10.5 px: 0
- visible rollback nodes: 0
- pages remain editable; no whole-page flattening introduced

## Current design decision

`VERIFIED_LOCAL`: V9 benefits more from selective subtraction, print-size typography, photo hierarchy and deliberate page-to-page pacing than from additional decorative assets at this stage. Magazine density should come from photography, headline hierarchy, asymmetry, captioning and useful indexing—not from exhausting the Drive asset inventory.

The Story test further supports a narrower principle: when a page becomes too empty after removing UI-like helpers, restore hierarchy with editorial text, crop/scale and simple rules before reintroducing badges/cards.

The Profile/Memory test adds another bounded result: when taxonomy labels are useful but their rounded containment reads as UI, preserve the native label and move the category color into a thin editorial rule rather than deleting the information.

The 1DAY/Cover photo tests reinforce that repeated equal-size modules should first be solved by role redistribution and controlled scale/orientation differences before adding new decorative assets.

The Back Cover footer test extends the same principle to publication closure: identity/route information may remain, while large rounded containers can be replaced by type + rule when their only role is visual containment.

Do not remove functional labels merely to reduce count. Keep a line, tag, frame, route or container when it visibly improves binding, indexing, scan path or physical/editorial meaning.

## Next implementation target

1. compare Back Cover and Story against the newly more asymmetric Cover/1DAY rhythm at whole-publication scale and preserve their quieter roles unless a concrete weakness appears;
2. inspect Memory and Profile actual-size copy-to-footer spacing after the index-label subtraction;
3. refine remaining dummy-photo crop/role hierarchy only where the composition is visibly weak, preserving replaceable masks and frame-above/photo-below structure;
4. continue reducing web-UI grammar only where a concrete visual problem remains;
5. selectively use existing Drive artwork only when it solves a concrete editorial role;
6. generate missing assets later as one batch after the assembled six pages expose specific gaps.

Final real-content / print-ready remains blocked on final real photography/copy and printer bleed/trim/preflight/physical proof.