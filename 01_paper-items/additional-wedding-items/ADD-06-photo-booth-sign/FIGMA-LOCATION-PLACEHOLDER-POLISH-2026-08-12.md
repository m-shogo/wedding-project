# ADD-06 フォトブースサイン — location placeholder polish — 2026-08-12

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` before evidence write: `52accca9e11f0918e020ba83d08833161241448f`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `SVMALDUyhc2chxHa4fvdjx`
- production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- RURUBU/るるぶ area was not read or written.

## Fresh visual defect

A new actual-size screenshot spot-check found one remaining production-quality defect after the native editorial contact-strip promotion: the bottom-right semantic placeholder `[LOCATION · LAYOUT DUMMY]` was constrained to a `206 × 48` text box and wrapped into two lines. The wrap made the final footer read like exposed implementation copy rather than a controlled print placeholder.

The four editorial fragments, Japanese title hierarchy and overall asymmetry remained strong; no image or composition redesign was warranted.

## Rollback-safe Figma change

Before editing, production was cloned to a hidden rollback frame:

- `12:2 / ROLLBACK_ADD06_PRE_LOCATION_PLACEHOLDER_POLISH_2026_08_12`

Production root ID `1:2` was preserved.

Native editable text node `3:63 / TXT_WEDDING_LOCATION` changed from:

- `[LOCATION · LAYOUT DUMMY]`
- `206 × 48`

into:

- `[設置場所 · LAYOUT DUMMY]`
- `240 × 24`

No other production layer was changed.

## Post-write screenshot QA

Fresh screenshots were reviewed at:

- thumbnail: max dimension `500` → `354 × 500`
- actual canvas/detail: `990 × 1400`

Result:

- the location placeholder now remains on one line;
- Japanese semantic labeling is consistent with the Current preference for Japanese typography;
- the placeholder stays subordinate to date/title/content;
- the right-side `01–04` editorial fragments remain intact;
- no clipping, accidental overlap or new UI-like box was introduced.

## Structure readback

Production `1:2` after the edit:

- `990 × 1400`, `clipsContent=true`
- native editable text count: `11`
- raster IMAGE fill count: `0`
- text outside production root: `0`
- `3:63` = `[設置場所 · LAYOUT DUMMY]`, `240 × 24`
- promoted native motif count: `4`
- each motif remains `174 × 180`, `clipsContent=true`
- rollback `12:2` exists and is hidden

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_FIX`.

This defect was typography/semantic-placeholder presentation, not missing image content. Drive writes: `0`. Exact Drive folder metadata was re-read immediately before the Figma write.

## Decision

`ADD_06_LOCATION_PLACEHOLDER_POLISH_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

The existing native editorial production remains the selected direction. The saved Drive raster masters remain optional comparison assets and are not automatically promoted.
