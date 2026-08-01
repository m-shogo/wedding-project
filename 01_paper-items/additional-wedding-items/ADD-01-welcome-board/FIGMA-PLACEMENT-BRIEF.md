# ADD-01 ウェルカムボード — FIGMA PLACEMENT BRIEF

Status: `PLACEMENT_READY / FIGMA_NOT_EXECUTED`
Date: 2026-08-02

Figma自動作業ではなく、課金後に人または別の明示タスクが迷わず配置するための引き継ぎ文書。

## Frame

- Main frame: A2 Portrait, 426 × 600 mm including 3 mm bleed
- Trim: 420 × 594 mm
- Safe area: 20 mm recommended
- Frame name: `FRAME_ADD_01_WELCOME_A2_PORTRAIT`

## Layer order

1. `BG_WELCOME_BASE`
2. `DECOR_ROUTE_LINE_01`
3. `IMG_WELCOME_HERO`
4. `DECOR_TRAVEL_BADGE_01`
5. `DECOR_COMPASS_01`
6. `TXT_WELCOME_TITLE`
7. `TXT_COUPLE_NAMES`
8. `TXT_WEDDING_DATE`
9. `TXT_WEDDING_LOCATION`
10. `TXT_WELCOME_SUBCOPY`
11. non-export guides

## Editable content

Never flatten these into generated images:

- couple names
- date
- venue/location
- welcome title
- subcopy
- hero photo

## Layout recommendation

- Upper 15–20%: Welcome title + small travel issue label
- Middle 55–65%: hero photo
- Lower 20–25%: names, date, Yokohama, short subcopy
- Travel decoration should frame the photo rather than cross faces
- Maintain quiet space around names and date
- 横浜アクセントは追加画像を作らず、`TXT_WEDDING_LOCATION`と既存装飾の組合せで表現する

## Component candidates

- `CMP_TRAVEL_BADGE`
- `CMP_ROUTE_LINE`
- `CMP_DATE_LOCKUP`
- `CMP_LOCATION_LOCKUP`
- `CMP_PHOTO_FRAME_WELCOME`

## Asset mapping

| Queue ID | Figma node | Drive source | Status |
|---|---|---|---|
| WB-01 | `BG_WELCOME_BASE` | `1XgE7c8cffxmMViEqeqJJ8Phnd5YxaE4l` | `ACCEPTED` |
| WB-02 | `DECOR_ROUTE_LINE_01` | `1cSpz2tcZZ0eKPBhD8vdacjc3GtWqPwf9` | `ACCEPTED` |
| WB-03 | `DECOR_TRAVEL_BADGE_01` | `1TOok5ps43XKrf3FN2OUV46Sr8cAgWgxR` | `ACCEPTED` |
| WB-04 | `DECOR_COMPASS_01` | `1jt54tvLnk1CCVaBt3XhvEgqnw593_O1t` | `ACCEPTED` |
| WB-05 | optional accent | none | `NOT_REQUIRED` |
| WB-06 | `CMP_PHOTO_FRAME_WELCOME` | editable Figma shape | `SPEC_READY` |
| WB-07 | text nodes | editable Figma text | `SPEC_READY` |

## Export

- Print PDF according to selected printer profile
- 300 dpi PNG for preview/backup
- Do not export guide layers
- Keep a version with photo placeholder until the final photo is approved

## Open decisions

- final hero photo
- couple-name notation
- venue name
- subtitle selection
- A2 vs A3 final print size
- panel/foamboard/frame finishing

## Placement gate

素材・Drive ID・semantic node・印刷仕様は揃っている。上記Open decisionsは最終配置時の可変情報であり、追加画像生成のブロッカーではない。
