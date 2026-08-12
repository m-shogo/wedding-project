# ADD-02 Italy table sign — Semantic placeholder typography fix

Date: 2026-08-12
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before write: `3bd594ecd8c3881a29ca20ec39f6697d1d1454a3`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- production Italy root: `2:11 / FRAME_TABLE_SIGN_ITALY`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- RURUBU/るるぶ scope was not read or written.

## Screenshot-supported defect

Fresh thumbnail and actual-size review showed that the Italy sign's semantic placeholder was the only family member using an explicit forced break:

`［国テーマ説明文\nLAYOUT DUMMY］`

At actual size, the break exposed `LAYOUT DUMMY` as a second standalone production line. The result read like an internal implementation label rather than an intentional editable print placeholder, while the surrounding Italy composition remained strong.

## Rollback-safe Figma change

Before editing production, the current Italy root was cloned to `99_QA` as hidden rollback proof:

- rollback root: `26:2 / ROLLBACK_ADD02_ITALY_PRE_SEMANTIC_PLACEHOLDER_FIX_2026_08_12`

Production root ID `2:11` was preserved. Only native text node `21:259 / TXT_COUNTRY_NOTE` was changed:

- before: `［国テーマ説明文\nLAYOUT DUMMY］`
- after: `［国テーマ説明 · LAYOUT DUMMY］`
- width retained: `500`
- resulting height: `31`
- `textAutoResize`: `HEIGHT`

No destination art, composition, table number, crop, texture, or other copy was changed.

## Screenshot QA

The updated Italy root was rendered again at its natural `1000 × 1480` size. The semantic placeholder now reads as one intentional line below `イタリア`, with no clipping, collision, or hierarchy loss. The architectural arch composition, large `ITALY`, lower editorial rhythm, and table number remain unchanged.

Representative family review in the same run also re-read Hawaii and Maldives; no new production-blocking issue was found in those representative signs.

## Structure readback

Post-write Italy production:

- root: `1000 × 1480`, `clipsContent=true`
- native editable text nodes: `8`
- IMAGE fill nodes: `1`
- text outside root: `0`
- replaceable image role retained: `23:3 / IMG_PRINT_GRAIN_REPLACEABLE`, opacity `0.18`
- variable/final country-description copy remains native editable text; nothing was baked into raster imagery.

## Image-generation decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_FIX`.

The visible defect was semantic placeholder typography, not missing destination imagery. No new Drive asset was added and the existing print-grain image role was left intact.

## Decision

Keep the current ADD-02 clean-room family and its existing sellable visual state. This fix removes an implementation-looking line break without reopening the family composition or adding decorative noise.

Physical proof, final destination description copy, printer profile, and final installation checks remain `DEFERRED_FINALIZATION / NOT_PRINT_READY`.