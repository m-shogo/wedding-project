# ADD-02 — 11卓の国別テーブルサイン SPEC

Status: `CURRENT / SPEC_READY`
Authority: GitHub `main`
Drive folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`

## Purpose

披露宴11卓を、旅行テーマの「目的地」として識別できる卓上サインにする。国旗を大きく貼るだけの観光テンプレではなく、各地の空気・素材・建築・移動体験を短い編集記事のように表現する。

## Destinations

1. Hawaii
2. Italy
3. France
4. Spain
5. Taiwan
6. Japan
7. Hong Kong
8. Singapore
9. Bali
10. Korea
11. Maldives

## Production model

- 11卓を各1正本ファイルとして管理
- 共通テンプレートは構造だけ共有し、各国の色・写真・装飾・情報密度を機械的に統一しない
- 卓名・国名・短い説明はFigma native text
- 写真は差し替え可能なimage fill
- 国旗は主役にしない。必要な場合のみ小さな識別記号として使用
- 国別アイコンは観光クリップアートの羅列にしない

## Recommended format

Primary candidate:
- postcard portrait class: 100 × 148 mm
- 3 mm bleed
- 5 mm minimum safe area
- acrylic / card stand insertionを想定

Comparison candidate:
- 120 × 180 mm portrait

Exact vendor/template dimensions override these provisional values.

## Shared hierarchy

1. destination hero image / color field
2. large country or destination name
3. table identifier
4. one short editorial note
5. one restrained travel detail: route, stamp, map coordinate, ticket mark, material motif

## Semantic nodes

- `FRAME_TABLE_SIGN_[COUNTRY]`
- `BG_COUNTRY_FIELD`
- `IMG_COUNTRY_HERO`
- `TXT_TABLE_NAME`
- `TXT_COUNTRY_NAME`
- `TXT_COUNTRY_NOTE`
- `TXT_ROUTE_CODE`
- `DECOR_COUNTRY_MOTIF`
- `DECOR_SMALL_IDENTIFIER`
- `GUIDE_BLEED`
- `GUIDE_TRIM`
- `GUIDE_SAFE`

## Editable copy contract

- `TXT_TABLE_NAME`: final卓名 / number
- `TXT_COUNTRY_NAME`: English primary name; Japanese support only where useful
- `TXT_COUNTRY_NOTE`: 24–55 Japanese characters or 4–10 English words
- `TXT_ROUTE_CODE`: optional 3–7 character travel code

No final copy is baked into raster assets.

## Country-specific art direction

### Hawaii
- volcanic black / ocean blue / hibiscus coral
- avoid generic palm-tree-only treatment
- motif: wave contour or volcanic coast

### Italy
- warm stone / olive / terracotta
- motif: arch, piazza grid, handwritten route

### France
- cream / deep blue / muted red accent
- motif: editorial café receipt, avenue linework
- avoid Eiffel Tower as the only idea

### Spain
- sun-baked ochre / cobalt / wine red
- motif: tile rhythm, plaza geometry

### Taiwan
- warm red / teal / night-market amber
- motif: lantern rhythm, railway / alley signage

### Japan
- off-white / sumi / restrained vermilion
- motif: station stamp, paper texture, topographic line

### Hong Kong
- deep red / jade / midnight blue
- motif: vertical city signage, harbour grid

### Singapore
- garden green / white / steel blue
- motif: garden-city structure, transit diagram

### Bali
- natural fibre / forest green / stone grey
- motif: woven rhythm, temple-gate silhouette

### Korea
- soft ivory / indigo / coral accent
- motif: hanji layering, roof curve, modern editorial type

### Maldives
- pale aqua / white / sand gold
- motif: lagoon contour, water-depth rings

## Anti-generic rules

- do not make 11 equal flag cards
- do not use one identical photo crop and one identical badge position across all signs
- do not use emojis
- do not use random rounded rectangles
- do not add icons without semantic purpose
- do not imply false facts about the couple's travel history
- do not label food as country-specific unless the menu actually supports it

## QA gates

- all 11 signs remain recognisable as one family at a distance
- each destination is distinguishable without relying only on a flag
- native text remains editable
- long table names do not overflow
- bright/dark photos both pass contrast checks
- actual-size proof confirms minimum type and fine-rule visibility
- stand/holder does not hide critical copy

## Current declaration

`SPEC_READY / ASSET_QUEUE_READY / DRIVE_FOLDER_READY / FIGMA_NOT_STARTED`
