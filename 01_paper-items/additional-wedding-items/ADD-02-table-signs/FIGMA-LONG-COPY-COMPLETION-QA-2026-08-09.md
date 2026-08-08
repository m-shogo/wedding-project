# ADD-02 — Long-copy completion QA

Date: 2026-08-09
Authority before write: `main@9830bf6223f7e6a612319da1c873bcc654933cf7`
Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`
Rurubu scope: excluded.

## QA-only stress copies

Production was not modified in this step. Three representative production frames were cloned to `99_QA` and stressed with a long table label plus long Japanese semantic dummy copy:

- `5:2` coastal archetype — Hawaii
- `5:11` European-column archetype — France
- `5:20` urban archetype — Hong Kong

Stress copy:

`［国テーマについての説明文がここに入ります。少し長い日本語文章でも情報階層と余白を保てるか確認する LAYOUT DUMMY］`

Stress table label:

`TABLE LONG LABEL · DUMMY`

All stress content remained native editable text.

## Screenshot QA

Actual-size 1000 × 1480 screenshots were reviewed for all three archetypes.

- Coastal: long copy resolves to 3 lines without collision; title/table/note/identifier hierarchy remains clear.
- Europe: narrow text column resolves the same copy to 4 lines without crossing into the right hero column or lower identifier region.
- Urban: long copy resolves to 3 lines above the accent rule and hero field with no collision.

No template-like card, fake route code, stamp, plane, gradient or shadow was reintroduced.

## Structural readback

- all three stress frames: `1000 × 1480`
- visible out-of-bounds nodes: `0`
- coastal stress note height: `102`
- Europe stress note height: `136`
- urban stress note height: `102`
- `TXT_ROUTE_CODE.visible=false`
- hidden `GUIDE_SAFE` retained
- production frames remained untouched by stress QA
- prior 11-frame rollback set remains in `99_QA`

## Drive

Drive identity was re-read immediately before this Git write and remained `ADD-02_11卓の国別テーブルサイン / 1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`.

Drive changes: `0`.

## Completion declaration

The major visible template defect has been removed, three materially different editorial archetypes are established, whole-item / representative actual-size / long-copy / structure QA pass, native editability and rollback evidence are present, and remaining work depends on final imagery/copy/physical/vendor input.

Current declaration:

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / FINAL_IMAGES_AND_COPY_PENDING / NOT_PRINT_READY`

Do not spend later hourly runs on cosmetic palette tweaks unless new live evidence reveals a meaningful defect.

## DEFERRED_FINALIZATION

- final destination imagery and crops
- final country editorial copy
- final table naming/identifier policy if changed
- actual holder/stand occlusion measurement
- printer/vendor bleed/template/profile
- 100% physical proof, minimum-type and fine-rule print verification

Next item: `ADD-03 当日タイムテーブルボード`.
