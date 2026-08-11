# ADD-17 — Clean-room V5 comparison evidence

Date: 2026-08-11
State: `VISUAL_COMPARISON_ADVANCED / PRODUCTION_UNCHANGED / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Observed latest `main` immediately before write: `f5913ac1a8a165fbd454b7b1a294b817956c35f2`

## Live Figma authority

- file key: `PAvkRggJiRuXVypi3RgZCN`
- production front/back remain stable at `2:2 / 2:5`
- QA page: `1:4 / 99_QA`
- V5 clean-room section: `12:2 / QA_ADD17_CLEANROOM_VISUAL_V5_2026_08_11`
- V5 front: `12:3 / QA_ADD17_CLEANROOM_V5_FRONT_FIELD_JOURNAL`
- V5 back: `12:15 / QA_ADD17_CLEANROOM_V5_BACK_FIELD_JOURNAL`
- V5 long-copy section: `13:2 / QA_ADD17_CLEANROOM_V5_LONG_COPY_STRESS_2026_08_11`
- stress front/back: `13:3 / 13:20`

## Screenshot-supported defect

The current production V4 is structurally valid and previously passed the reopened visual gate, but a fresh 2026-08-11 screenshot review still shows a strong worksheet signal on the front: the large bordered rectangular drawing field dominates the item and reads closer to an activity worksheet than a small sellable wedding stationery piece.

## V5 art direction

A rollback-safe production-independent comparison was created rather than editing production directly.

The V5 direction treats the card as a small field journal / observation page:

- removes the large hard rectangular drawing box;
- introduces a pale asymmetric native-vector observation field with restrained contour rings;
- keeps the drawing area generous but visually integrated with the editorial composition;
- keeps Japanese-first hierarchy and the existing teal/rust/navy family palette;
- back replaces five mechanical straight writing rules with quieter open curved writing rhythms;
- keeps a small optional sketch zone without creating a card-within-card UI;
- all copy remains native editable text;
- no people, children, animals, fake travel imagery, generic airplane/stamp motifs, raster decoration, gradients, shadows, or generated imagery were introduced.

## Long-copy stress

Stress front `13:3` tested a substantially longer multi-line activity prompt and longer margin note.
Stress back `13:20` tested a longer multi-line writing prompt and a long optional-name label.

Screenshot review at whole/reading scale showed no collisions or clipping.

## Structural readback

| Frame | Native text | IMAGE fills | Text outside root | Hidden safe guide |
| --- | ---: | ---: | ---: | --- |
| V5 front `12:3` | 6 | 0 | 0 | yes |
| V5 back `12:15` | 7 | 0 | 0 | yes |
| stress front `13:3` | 6 | 0 | 0 | yes |
| stress back `13:20` | 7 | 0 | 0 | yes |

No flatten/raster replacement was introduced.

## Image generation

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

The V5 comparison therefore uses only native Figma text/vector construction. No generated asset is claimed or saved.

## Drive / promotion decision

The run attempted to resolve the exact ADD-17 Drive authority before any production promotion. No exact ADD-17 Drive folder could be live-resolved through the connector from the current repository evidence, so production promotion was intentionally withheld.

This avoids violating the every-write authority contract. V5 remains a serious comparison candidate rather than a falsely promoted production state.

## Decision

`V5_COMPARISON_PASS / LONG_COPY_PASS / STRUCTURE_PASS / PRODUCTION_UNCHANGED`

V5 is visually stronger than the current worksheet-like front direction and should be considered first when the exact ADD-17 Drive authority is restored or explicitly confirmed. Final adoption of ADD-17 still remains `BLOCKED_REQUIRED_INPUT` until child attendance/count/age/use need is authoritative.
