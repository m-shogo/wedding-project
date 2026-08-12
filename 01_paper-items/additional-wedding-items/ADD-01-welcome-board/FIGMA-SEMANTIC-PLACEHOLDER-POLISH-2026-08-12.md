# ADD-01 ウェルカムボード — semantic placeholder polish — 2026-08-12

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / FINAL_REAL_HERO_PHOTO_DEFERRED / NOT_PRINT_READY`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Observed latest `main` immediately before Git write: `e5e9359e514b7f1e4e951e4ab27cc80d52f538fa`

## Live authority

- Figma file key: `XyyTGuz6BMf8XRhPZZfdoT`
- production root: `1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT`
- exact Drive folder: `ADD-01_ウェルカムボード` / `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`
- prior clean-room V2 authority: `FIGMA-CLEANROOM-V2-PROMOTION-QA-2026-08-10.md`

## Fresh visual / semantic diagnosis

Fresh actual-size production screenshot confirmed that the V2 asymmetric editorial direction remains sellable and materially stronger than the old centered template. One authority-compliance defect remained: the native variable placeholders for couple names and venue still used vague English placeholder syntax (`[COUPLE NAMES]`, `[VENUE PLACEHOLDER]`) rather than the Current-required explicit semantic `LAYOUT DUMMY` convention.

This did not require a composition redesign or generated imagery; the highest-value safe correction was to make the variable roles unmistakably editable/dummy while keeping the visual hierarchy intact.

## Rollback-safe proof

Before production text changes, the complete production frame was cloned to `99_QA` as hidden rollback proof:

- `12:2 / ROLLBACK_ADD01_PRE_SEMANTIC_PLACEHOLDER_FIX_2026_08_12`

Production root ID `1:3` was preserved.

## Figma production changes

Only native variable text changed:

- `7:35 / TXT_COUPLE_NAMES`: `[COUPLE NAMES]` → `[新郎新婦名 · LAYOUT DUMMY]`
- `7:37 / TXT_WEDDING_LOCATION`: `YOKOHAMA / [VENUE PLACEHOLDER]` → `YOKOHAMA / [会場名 · LAYOUT DUMMY]`

The hero role remains independently replaceable and the real-couple photo remains deferred; no person image was generated or fabricated.

## Screenshot QA

Post-write `852×1200` screenshot passes:

- the Japanese-first headline and asymmetric photo/editorial split remain unchanged;
- the longer semantic couple-name dummy still fits the intended bottom identity block;
- the venue dummy remains subordinate to date and names without collision;
- the hero placeholder, caption, rust rule and folio remain readable;
- no new web-card/template feel or clipping was introduced.

## Structure QA

Post-write production readback:

- canvas: `852×1200`
- `clipsContent=true`
- native text: `10`
- IMAGE fill nodes: `1` (existing replaceable/paper-image workstream state; no new raster added in this run)
- text outside root: `0`
- replaceable hero role: `7:30 / IMG_WELCOME_HERO_REPLACEABLE`, `474×744`
- couple names and venue remain native editable text.

No flatten/raster text replacement was introduced.

## Drive / image generation

Exact Drive folder was live-read before the Figma write and remains `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`.

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No new image was required for this defect, so Drive writes are `0`.

## Finalization boundary

ADD-01 remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

Still deferred: real hero-photo selection/crop, final couple-name styling, final venue copy, physical size/vendor proof and print profile.
