# Rurubu WEDDING V9 — Caption Tab Editorial Pass

Date: 2026-08-27
Scope: Rurubu WEDDING V9 only
Base main observed before write: `1f18ecaf20deaad15713460fdbe5f8eb3cc321ce`

## Intent

Continue reducing residual web-UI / rounded-pill grammar without stripping useful editorial binding. Existing Drive assets remain optional; no new image generation was performed in this pass.

## Live Figma authority

- file: `bfM0d4c9dCeBv5pCkJ3TNM`
- page: `2601:2 / 08_RURUBU_V9_RURUBU_POP_PRODUCTION`
- Back Cover: `2601:4`
- Memory + Gallery: `2601:7`

## Rollback snapshots created before mutation

- `2732:2` — Back Cover before caption-tab pass
- `2732:82` — Memory + Gallery before caption-tab pass

Both remain hidden rollback evidence and are not production candidates.

## Back Cover change

The three photo captions were retained because they identify image roles, but their floating rounded-pill treatment was replaced with compact squared editorial slugs: no white pill border, small 4px corner radius, tighter dimensions, left-aligned native text.

Mutated nodes:

- hero VENUE: `2645:146` + `2645:147`
- support CAFE: `2645:148` + `2645:149`
- support TABLE: `2645:150` + `2645:151`

Screenshot QA: PASS. The photo group reads more like a print contents spread and less like floating UI controls while preserving caption clarity.

## Memory + Gallery change

All six photo captions keep their semantic role, but were normalized from rounded pills into compact print-style rectangular tabs aligned to the image edges. No photo mask, crop, frame overlay, source image or generated title was changed.

Mutated nodes:

- top/hero captions: `2601:106` + `2601:107`, `2601:108` + `2601:109`, `2601:110` + `2601:111`
- lower-row captions: `2664:228` + `2664:229`, `2664:230` + `2664:231`, `2664:232` + `2664:233`

Screenshot QA: PASS. The gallery retains useful labeling, but the labels now behave as small magazine photo slugs rather than CTA-like controls.

## Structural QA after mutation

PASS across all six current V9 production frames:

- A4 size: `794×1123` × 6
- replaceable photo masks: `4 / 3 / 2 / 2 / 6 / 5` = 22
- corresponding frame overlays: `4 / 3 / 2 / 2 / 6 / 5` = 22
- photo/frame geometry mismatch: 0
- visible overflow outside page bounds: 0
- visible text below 9.5 px: 0
- whole-page flattening introduced: no

## Local design conclusion

`VERIFIED_LOCAL`: where a small label performs a genuine photo-index/caption role, subtraction is not automatically better. Recasting a rounded control-like pill as a compact rectangular print tab can preserve information binding while reducing web-UI visual language.

This is not a blanket project-wide rule. Profile name labels, sequence markers, itinerary bindings or other shapes should be judged by their actual editorial/physical function before removal or restyling.

## Next V9 target

Continue publication-level refinement using the current six-page set. Prioritize actual-size Japanese headline/body spacing and any remaining concrete UI-like shape identified by screenshot QA. Do not generate new assets until the assembled pages expose a specific missing visual role.
