# ADD-02 — Family Folio De-template Polish

Date: 2026-08-13
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before production write: `7299069d2b6a8df737fae900426753a9a7cc5a51`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production family: `2:2`, `2:11`, `2:20`, `2:29`, `2:38`, `2:47`, `2:56`, `2:65`, `2:74`, `2:83`, `2:92`
- exact Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Fresh whole-family diagnosis

A fresh whole-family render showed that the eleven promoted signs still retain materially different country-specific art directions, but every sign carried a small repeated English folio at the bottom:

- `WEDDING JOURNEY · TABLE SERIES`, or
- `WEDDING JOURNEY / DESTINATION 07–11`.

These lines carried no required guest-facing information. Repeating them across all eleven signs added a shared template/AI-prompt feel that was more visible at family scale than on an individual sign.

The higher-value correction was to remove this non-semantic repetition, not redesign the eleven country compositions or add more decorative imagery.

## Rollback-safe proof

Before the production change, all eleven current production signs were cloned into one hidden `99_QA` rollback section:

- `28:2 / ROLLBACK_ADD02_PRE_FOLIO_DETEMPLATE_2026_08_13`
- child count: `11`.

The production frame IDs were preserved.

## Production change

The following visible folio text nodes were hidden; their content remains recoverable in the rollback proof:

- Hawaii `21:220`
- Italy `21:264`
- France `21:279`
- Spain `21:301`
- Taiwan `21:326`
- Japan `21:342`
- Hong Kong `21:370`
- Singapore `21:389`
- Bali `21:411`
- Korea `21:431`
- Maldives `21:451`

No country name, Japanese label, table number, semantic country-description placeholder, safe-area guide, image/texture role, or destination-specific composition was changed.

## Whole-family screenshot QA

A fresh post-write QA family board was created from current production:

- `28:274 / QA_ADD02_FAMILY_AFTER_FOLIO_DETEMPLATE_2026_08_13`
- 11 current production clones arranged for thumbnail/family review.

Whole-family screenshot result: `PASS`.

- the set still reads as one family without eleven identical templates;
- Hawaii, Italy, France, Spain, Taiwan, Japan, Hong Kong, Singapore, Bali, Korea and Maldives remain visually distinct;
- removing the repeated bottom folio makes the lower fields feel less like a templated series footer and gives the destination-specific type/geometry more authority;
- table numbers remain easy to scan;
- no new decorative English, badge, icon, stamp, card or filler was introduced.

## Structural readback

All production signs remain `1000×1480`, `clipsContent=true`, with one safe guide and zero visible text outside the root.

Current live readback after the polish:

- Hawaii: `7` total text / `6` visible / `1` IMAGE-fill role / outside `0`;
- Italy: `8` total text / `5` visible / `1` IMAGE-fill role / outside `0`;
- France: `7` / `6` / `1` / `0`;
- Spain: `7` / `6` / `1` / `0`;
- Taiwan: `7` / `6` / `1` / `0`;
- Japan: `7` / `6` / `1` / `0`;
- Hong Kong: `7` / `6` / `1` / `0`;
- Singapore: `7` / `6` / `1` / `0`;
- Bali: `7` / `6` / `1` / `0`;
- Korea: `7` / `6` / `1` / `0`;
- Maldives: `7` / `6` / `1` / `0`.

The live `IMAGE-fill role: 1` per sign supersedes the older promotion snapshot that recorded zero IMAGE fills; no new raster was added by this polish. No native text was flattened.

## Drive / image workstream

Drive metadata was re-read live before the Figma write:

- folder ID: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`;
- Drive write: `0`;
- generated asset candidates: `0`.

The screenshot-supported problem was repeated filler microcopy, so image generation would not have addressed the defect.

## Decision

ADD-02 remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_POLISHED / ROLLBACK_SAFE / NOT_PRINT_READY`

This polish reduces a family-level template signal without homogenizing the eleven destination-specific designs.