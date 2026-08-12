# ADD-17 — V5 back-side microcopy polish — 2026-08-12

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V5_PRODUCTION_POLISHED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Observed latest `main` immediately before Git write: `83554eca3967b7e4c48c6968d74ed1e61488cff0`

## Live authority

- Figma file key: `PAvkRggJiRuXVypi3RgZCN`
- production front: `2:2`
- production back: `2:5`
- exact Drive folder: `ADD-17_子ども向けミニカード_ぬりえ` / `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- prior V5 promotion authority: `FIGMA-V5-PROMOTION-2026-08-11.md`

## Fresh visual diagnosis

Fresh production screenshots confirmed that V5 remains materially stronger than V4 and still satisfies the sellable visual direction. One small but visible back-side defect remained at actual size: the rust microcopy `小さな絵も、ここに。` overlapped the lower edge of the circular sketch contour instead of reading as a deliberately separated caption. The adjacent child-readable side prompt also had an awkward Japanese/Latin space (`えでも OK`).

This was treated as Japanese typesetting / optical-placement cleanup, not a reason to reopen the overall art direction.

## Rollback-safe proof

Before changing production, the full back frame was cloned to `99_QA` as hidden rollback proof:

- `17:2 / ROLLBACK_ADD17_BACK_PRE_MICROCOPY_POLISH_2026_08_12`

Production root ID `2:5` was preserved.

## Figma production change

Only two native text roles changed:

- `15:62 / TXT_SIDE_PROMPT`: `えでも OK` → `えでもOK`
- `15:63 / TXT_MINI_LABEL`: moved from local `(735, 1040)` to `(700, 1100)`

The caption now sits approximately `20.64 px` below the outer sketch contour rather than riding across its lower boundary. No wording facts, child attendance facts, or raster assets were invented.

## Screenshot QA

Post-write production was checked at thumbnail and actual-size scale.

- thumbnail: headline, writing rhythm, sketch role, name line and footer retain the intended field-journal hierarchy;
- actual size (`1110×1540`): the sketch caption is visibly separated from the contour and reads as a caption instead of an overlap artifact;
- `えでもOK` reads more cleanly while retaining the intentionally child-readable hiragana phrasing;
- no new card/UI feel, decorative clutter or clipping was introduced.

## Structure QA

Post-write back `2:5` readback:

- canvas: `1110×1540`
- `clipsContent=true`
- native text: `7`
- IMAGE fill nodes: `0`
- text outside root: `0`
- hidden safe guide: `1`
- mini-label to outer-sketch gap: `20.635879516601562 px`

All variable content remains native editable text/vector. No flatten/raster replacement was introduced.

## Drive / image generation

Drive was read back before the Figma write and remains the exact authority folder `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`.

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No image asset was required for this defect, so Drive writes are `0`.

## Finalization boundary

ADD-17 remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

Final adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative child attendance/count/age/use information exists. Physical paper/printer proof, pen/crayon handling, final copy and actual-use confirmation remain `DEFERRED_FINALIZATION`.
