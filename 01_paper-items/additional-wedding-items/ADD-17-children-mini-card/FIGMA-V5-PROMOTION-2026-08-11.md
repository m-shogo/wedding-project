# ADD-17 — V5 field-journal production promotion

Date: 2026-08-11
State: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / V5_PRODUCTION_PROMOTED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Observed latest `main` immediately before Git write: `b5710218d829fd80b56e37d24a6dbb213db0fb82`

## Why V5 replaced V4

Fresh screenshot comparison confirmed that production V4 was structurally valid but still read too much like a worksheet because the front was dominated by a hard rectangular drawing box. V5 keeps the generous activity area while changing the visual grammar to a softer field-journal / observation-page composition with an asymmetric pale field, restrained contour rings, and open writing rhythms on the back.

This is a material visual change, not decoration-only polish.

## Live authority resolved before promotion

### Figma

- file key: `PAvkRggJiRuXVypi3RgZCN`
- production front root retained: `2:2`
- production back root retained: `2:5`
- V5 source front: `12:3`
- V5 source back: `12:15`
- QA page: `1:4 / 99_QA`

### Google Drive

The previously missing exact ADD-17 Drive authority was resolved by checking the sibling ADD item parent (`0ADXt8irGMFGnUk9PVA`) and confirming no existing `ADD-17` folder was present. A dedicated authority folder was then created in that same parent:

- folder: `ADD-17_子ども向けミニカード_ぬりえ`
- Drive ID: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- parent: `0ADXt8irGMFGnUk9PVA`

No raster asset was required or saved for V5.

## Rollback-safe proof

Immediately before promotion, the then-current V4 production frames were cloned to `99_QA`:

- `15:2 / ROLLBACK_ADD17_FRONT_PRE_V5_PROMOTION_2026_08_11`
- `15:14 / ROLLBACK_ADD17_BACK_PRE_V5_PROMOTION_2026_08_11`

Rollback structure readback:

- front: 1110×1540, native text 5, IMAGE fill nodes 0, text outside root 0, hidden safe guide 1
- back: 1110×1540, native text 7, IMAGE fill nodes 0, text outside root 0, hidden safe guide 1

## Production promotion

V5 children and frame-surface properties were copied into the stable production roots while preserving root IDs `2:2` and `2:5`.

Post-write structural readback:

- front `2:2`: 1110×1540, native text 6, IMAGE fill nodes 0, text outside root 0, hidden safe guide 1
- back `2:5`: 1110×1540, native text 7, IMAGE fill nodes 0, text outside root 0, hidden safe guide 1
- all variable copy remains native editable text
- drawing / contour / writing fields remain native vector
- no flatten or raster replacement introduced

## Screenshot QA after promotion

Whole/reading-scale screenshots were taken from production after the write.

Front:

- hard worksheet rectangle is gone;
- Japanese-first title remains the dominant hierarchy;
- pale observation field is visibly integrated into the paper rather than reading as a UI card;
- drawing area remains large and usable;
- lower microcopy and teal/rust accents remain readable without decorative clutter.

Back:

- open curved writing lines create a quieter editorial rhythm than repeated ruled lines;
- small optional sketch area stays secondary;
- optional-name field remains visually separated and editable;
- no clipping, overflow, fake UI, gradient, shadow, generated-person imagery, or stock travel motif was introduced.

## Image generation

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

Image generation was not required to close this specific promotion because the screenshot-supported bottleneck was composition and worksheet grammar, and V5 solves it natively. No generated asset is claimed.

## Finalization boundary

The neutral editable template now remains at:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

Final adoption is still `BLOCKED_REQUIRED_INPUT` until authoritative child attendance/count/age/use information exists. Physical paper/printer proof, pen/crayon handling, export profile, final wording and actual-use confirmation remain `DEFERRED_FINALIZATION`.
