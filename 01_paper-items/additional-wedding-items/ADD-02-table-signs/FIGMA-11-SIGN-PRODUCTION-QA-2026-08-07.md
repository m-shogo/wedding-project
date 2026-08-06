# ADD-02 — 11卓の国別テーブルサイン Figma Production QA

Date: 2026-08-07
Authority before write: `main@679afaa6ce5b6bae424c69c739717eaba0180192`
Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`

## Live production change

`02_TABLE_SIGNS` に11 destinationすべてのnative editable production frameを作成した。

- Hawaii / Italy / France / Spain / Taiwan / Japan / Hong Kong / Singapore / Bali / Korea / Maldives
- each frame: `1000 × 1480` px, postcard portrait class
- semantic nodes: `IMG_COUNTRY_HERO`, `TXT_TABLE_NAME`, `TXT_COUNTRY_NAME`, `TXT_COUNTRY_NOTE`, `TXT_ROUTE_CODE`, `DECOR_COUNTRY_MOTIF`, `DECOR_SMALL_IDENTIFIER`, `GUIDE_SAFE`
- uncertain copy is explicit `LAYOUT DUMMY`; no guest identity or couple travel-history claim was invented
- all variable copy remains native Figma text
- country palettes and hero proportions vary instead of using one identical flag-card layout
- `GUIDE_SAFE` is present but hidden in production

## Rollback

`99_QA` contains 11 rollback copies named `QA_ADD_02_11_SIGN_ROLLBACK_*`.

## Live structure readback

- production frames: 11 / 11
- frame size: 1000 × 1480 for all 11
- native semantic text nodes: present for all 11
- hidden safe guide: present for all 11
- child overflow outside each frame: 0 for all 11
- rollback copies: 11 / 11

## Screenshot QA

Whole-page screenshot was rendered after production creation. All 11 signs are visible as one family while country field colors, hero heights, destination names and editorial notes remain distinguishable. No clipping or canvas-bound loss was observed at the whole-item scale.

## Drive

Live Drive folder identity matched the GitHub SPEC. No Drive asset was overwritten or regenerated in this pass because the production uses replaceable semantic hero fields and native text; final imagery remains deferred.

## Deferred finalization

- final destination imagery / image crop
- final table identifiers if naming changes
- final editorial copy
- holder/stand occlusion test
- exact vendor bleed/template override
- 100% physical proof and minimum-type/fine-rule print verification

Current declaration:

`FIGMA_11_SIGN_PRODUCTION_CREATED / STRUCTURE_QA_PASS / WHOLE_ITEM_SCREENSHOT_QA_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / FINAL_IMAGES_AND_COPY_PENDING / NOT_PRINT_READY`
