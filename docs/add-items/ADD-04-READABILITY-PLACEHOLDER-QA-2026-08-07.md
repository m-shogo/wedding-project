# ADD-04 readability / placeholder QA — 2026-08-07

Authority at write: GitHub `main` `422f09a0144030d5b4ccb144908a86f217622df1`.

## Live cross-check

- Drive folder: `ADD-04_受付サイン` / `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`
- Figma file: `ADD-04_RECEPTION_SIGNS_2026-10-24` / `qWlF9THLR1G76hLcx1zYOx`
- Production frames: groom `1:3`, bride `1:14`
- RURUBU/るるぶ exclusive area was not read or written.

## Problem selected

The primary side labels were already strong, but the unresolved fields used English `TBD` copy that could be mistaken for production wording and was weaker for Japanese editing handoff.

## Rollback-safe proof

Before editing, both production frames were cloned to Figma page `99_QA` under prefix `QA_ADD_04_BEFORE_READABILITY_2026_08_07`.

## Figma change

Both signs now use explicit native editable semantic placeholders:

- `[受付名 · LAYOUT DUMMY]`
- `[受付案内 · LAYOUT DUMMY]`

Placeholder emphasis was reduced so `新郎側受付` / `新婦側受付` remains the dominant reading target. No flattening, rasterization, invented receptionist names, or invented operation facts were introduced.

## QA readback

- whole-item screenshots recaptured for groom and bride after the edit
- primary Japanese side labels remain dominant
- route line and destination node remain secondary
- placeholder fields are visibly non-final
- native editable text retained
- date/location footer retained
- Drive writes: 0; no asset defect required a Drive change

## Status

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Deferred finalization

- optional approved surname/name
- final reception-operation copy, if any
- physical 2 m readability check under venue lighting
- printer template / bleed values
- 100% physical print proof

These do not block moving to ADD-05.
