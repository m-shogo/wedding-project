# ADD-01 ウェルカムボード — Hero Role Semantic Polish

Date: 2026-08-13
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / FINAL_REAL_HERO_PHOTO_DEFERRED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before production edit: `ff564e162786542326f9fa8671522f89fd1d743b`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `XyyTGuz6BMf8XRhPZZfdoT`
- production root: `1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT`
- exact Drive folder: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`

## Fresh visual defect

A fresh 852×1200 production screenshot confirmed the asymmetric clean-room V2 art direction remains sellable, but the hero placeholder still exposed an internal English implementation label inside the visible paper composition:

`[HERO PHOTO · REPLACEABLE]`

This conflicts with the current semantic-placeholder convention and reads more like a Figma implementation note than intentional wedding stationery copy.

## Rollback-safe proof

Before editing production, the complete current frame was cloned to `99_QA` as a hidden rollback:

- `13:2 / ROLLBACK_ADD01_PRE_HERO_ROLE_SEMANTIC_FIX_2026_08_13`

Production root `1:3` was preserved.

## Production change

Only native editable text changed:

- `7:32 / TXT_HERO_ROLE`
- before: `[HERO PHOTO · REPLACEABLE]`
- after: `[写真 · LAYOUT DUMMY]`

The replaceable image role itself remains separate and unchanged:

- `7:30 / IMG_WELCOME_HERO_REPLACEABLE`
- size: `474×744`

No person image was generated or fabricated. The final real-couple photo remains deferred.

## Screenshot QA

Fresh post-write 852×1200 screenshot: `PASS`.

- the hero area now communicates a replaceable photographic role without leaking implementation jargon;
- Japanese-first headline, rust vertical rule, asymmetric image field, date atmosphere, couple-name hierarchy and venue block remain unchanged;
- no new decorative imagery or template motif was added;
- no collision or clipping was introduced.

## Structure QA

Post-write production `1:3`:

- size: `852×1200`;
- `clipsContent=true`;
- native text: `10`;
- IMAGE-fill nodes: `1`;
- visible text outside root: `0`;
- hero role remains independently replaceable at `7:30`;
- hero label remains native editable text at `7:32`.

No flattening or raster text replacement was introduced.

## Drive / image workstream

Drive metadata was live-read before the Figma write:

- folder ID: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`;
- Drive write: `0`;
- generated asset candidates: `0`.

The screenshot-supported defect was semantic/typographic rather than missing imagery. The final real hero photograph remains `DEFERRED_FINALIZATION`.

## Decision

ADD-01 remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / FINAL_REAL_HERO_PHOTO_DEFERRED / NOT_PRINT_READY`

The visible implementation-label leak is closed without changing the V2 art direction.