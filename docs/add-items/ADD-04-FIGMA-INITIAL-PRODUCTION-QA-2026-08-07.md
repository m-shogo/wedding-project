# ADD-04 Figma initial production QA — 2026-08-07

Authority at write: GitHub `main` `41d579ff1644fd77dbeb0158b9790e264784b4c6`.

## Live authority cross-check

- GitHub spec: `01_paper-items/additional-wedding-items/ADD-04-reception-signs/SPEC.md`
- Drive folder: `ADD-04_受付サイン` / `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`
- Figma file: `ADD-04_RECEPTION_SIGNS_2026-10-24` / `qWlF9THLR1G76hLcx1zYOx`
- RURUBU/るるぶ exclusive area was not read or written for item production.

## Figma production created

- `1:3 / FRAME_GROOM_RECEPTION_A5`
- `1:14 / FRAME_BRIDE_RECEPTION_A5`
- `99_QA` rollback copies: `1:25`, `1:36`

Both production frames are 740×1050 design units representing the A5 portrait production ratio. The pair follows the `YOKOHAMA CONCIERGE DESTINATION MARKERS` direction without reusing passport/boarding-pass/card-dashboard motifs.

Groom uses restrained navy, a longer horizontal route, and compact destination node. Bride uses mint/soft-blue family, a shorter/lighter route and more breathing space. Japanese side labels are primary; English is secondary.

## Placeholder/editability contract

Native editable text is retained for:

- `TXT_SIDE_LABEL_JA`
- `TXT_SIDE_LABEL_EN`
- `TXT_NAME_OPTIONAL`
- `TXT_OPERATION_NOTE`
- `TXT_DATE_LOCATION`

Unconfirmed name and reception-operation copy remain explicit `TBD` text. No invented receptionist, surname, gift/payment instruction, QR, gate/seat/flight data, or generated person was added.

## QA readback

- whole-item screenshots captured for both production frames
- native text: 6 nodes per frame
- hidden `GUIDE_SAFE`: present on both frames
- visible child overflow outside frame bounds: 0 on both frames
- flatten/rasterized text: none introduced
- rollback copies: present on `99_QA`
- Drive writes: 0 (intentional; Drive register forbids TBD placeholder exports)

## Current status

`FIGMA_INITIAL_PRODUCTION_CREATED / WHOLE_ITEM_SCREENSHOT_QA_PASS / STRUCTURE_QA_PASS / NATIVE_EDITABLE_PASS / SEMANTIC_PLACEHOLDERS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Deferred finalization

- optional approved surname/name
- final reception-operation copy, if any
- physical 2 m readability check under venue lighting
- final printer template / bleed values
- 100% physical print proof

These do not block continuing design QA or moving forward once ADD-04 reaches `DESIGN_QA_PASS_WITH_PLACEHOLDERS`.
