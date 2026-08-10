# V5 outer clean-room K — Japanese editorial copy + Q60 transfer investigation

Date: 2026-08-10
Scope: Rurubu WEDDING V5 only
Starting latest main before this write: `b3e3279611289547253e53137ac7f22f71fd7dd5`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authorities and boundaries

Project-wide production system and asset-generation memory were re-read before the Figma write. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD item was touched. Current outer was not changed.

## Q60 cover hero — source re-verification

Google Drive was re-searched and the cover-specific derivative was found and fetched as real binary:

- Drive title: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive file ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- fetched bytes: `155439`

This confirms the high-quality cover derivative still exists and can be materialized as a real JPEG outside Figma.

### Transfer methods tested

1. Figma `upload_assets` successfully issued a single-use upload URL targeting comparator hero `638:130` with `scaleMode=FILL`.
2. The execution runtime could not resolve/reach `mcp.figma.com` for the required binary POST, including a direct-IP attempt. The upload URL was therefore not consumed and no Figma node changed.
3. A Figma Plugin API read-only experiment attempted direct `fetch()` from the Drive download URL. The plugin runtime returned `ReferenceError: fetch is not defined`; failed script was atomic and changed nothing.
4. The next viable non-network transport remains guarded chunk reconstruction inside Figma (binary/base64 split across small calls), but it was not claimed as completed in this run.

Result: `Q60_SOURCE_VERIFIED / BINARY_MATERIALIZED / FIGMA_PLACEMENT_NOT_COMPLETE`.

## Clean-room K prototype

Created from the latest strongest comparator J:

- `641:2 / V5_OUTER_RURUBU_CLEANROOM_K_JP_EDITORIAL_2026_08_10`

No Current outer node was changed.

The intent was to reduce generic template-English and push the same photo-led structure toward a more plausible Japanese travel-information-magazine reading voice without adding cards, stickers, gradients, shadows, or decorative filler.

### Copy and hierarchy changes

- `YOKOHAMA / ふたりで巡る保存版` → `横浜・みなとみらい　ふたりで巡る保存版`
- cover kicker spacing tightened around Japanese wording
- `思い出スポット BEST 8` → `思い出スポット 大特集` to avoid an unsupported fixed count
- `SPECIAL STORY` → `巻頭特集`
- feature 01 → `ふたりの思い出 / スポット案内`
- feature 02 → `出会いから今日まで / 旅年表`
- feature 03 → `ゲストと楽しむ / 横浜案内`
- footer rewritten Japanese-first while keeping the RURUBU WEDDING identifier
- existing three support photos received only small unequal rotations/offset adjustments; image fills themselves were not replaced

## QA

Fresh whole-outer screenshot of `641:2` was rendered after the write.

Fresh programmatic structure QA:

- visible native text: `40`
- visible IMAGE fills: `9`
- text overlaps: `0`
- fold guide: `641:158 / PROVISIONAL_FOLD_GUIDE`, visible, `2 × 1122.5`

No new card, badge, sticker, shadow, gradient, or color-field system was introduced.

## Result

`PROTOTYPED / SCREENSHOT_RENDERED / STRUCTURE_QA_PASS / JAPANESE_EDITORIAL_COPY_IMPROVED / HERO_GATE_STILL_OPEN / NOT_PROMOTED`

K is a safer editorial comparator than J for Japanese-first copy, but it cannot become Current until the verified Q60 cover hero is actually applied and then passes whole-item, reading-scale, and actual-size crop/sharpness QA.

V5 remains incomplete; V6 production remains closed.