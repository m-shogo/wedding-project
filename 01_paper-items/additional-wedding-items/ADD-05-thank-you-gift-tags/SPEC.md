# ADD-05 サンキュータグ / プチギフトタグ — SPEC

Status: `CURRENT / SPEC_READY`
Authority: GitHub `main`
Date: 2026-08-02

## Purpose

披露宴後に渡すプチギフトへ添える小型タグ。旅行テーマを保ちながら、航空券・パスポート・るるぶの縮小コピーにはせず、旅の終着点で手渡される上質な荷札／ホテルのターンダウンカードとして成立させる。

## Confirmed copy

- `Thank you for traveling with us.`
- `Have a safe trip home.`
- `2026.10.24`

新郎新婦名、会場名、プチギフトの商品名、SNS、QRコードは未確定。事実として追加しない。

## Primary format

- Single master: `50 × 80 mm` portrait
- Comparison candidate: `45 × 70 mm` portrait
- Corner radius: 2–4 mm only if production method supports it
- Hole: provisional 5 mm diameter
- Hole center: provisional 8 mm from top trim
- Bleed: provisional 3 mm
- Safe inset: 5 mm from trim and 5 mm clear around hole edge
- Final printer, punch and string dimensions override all provisional values

単体正本と面付け版を分離する。面付け版を正本扱いしない。

## Art direction

Concept: `LAST STOP / QUIET LUGGAGE NOTE`

- warm ivory or pale mineral-blue paper field
- deep navy typography
- mint used only as one route endpoint or narrow edge
- silver used as a restrained print-like rule, not glitter wallpaper
- one asymmetric journey line entering the tag and ending near the date
- generous negative space despite the small format
- no repeated stickers, no faux passport-stamp collage, no miniature boarding-pass barcode
- typography and physical hole/string relationship are the main composition

The front carries gratitude. The optional back carries the safe-trip message. A one-sided variant remains possible when production cost or attachment method requires it.

## Information hierarchy

Front:

1. `Thank you`
2. `for traveling with us.`
3. `2026.10.24`
4. one small travel endpoint mark

Back, optional:

1. `Have a safe trip home.`
2. optional native-text couple names after approval

## Semantic nodes

- `PAGE_ADD05_THANK_YOU_TAGS`
- `FRAME_TAG_FRONT_50X80`
- `FRAME_TAG_BACK_50X80_OPTIONAL`
- `FRAME_TAG_FRONT_45X70_COMPARE`
- `GUIDE_BLEED`
- `GUIDE_TRIM`
- `GUIDE_SAFE`
- `GUIDE_PUNCH_CLEARANCE`
- `SHAPE_PUNCH_HOLE`
- `BG_PAPER`
- `TXT_THANK_YOU_PRIMARY`
- `TXT_THANK_YOU_SECONDARY`
- `TXT_SAFE_TRIP_OPTIONAL`
- `TXT_DATE`
- `TXT_NAMES_OPTIONAL`
- `PATH_JOURNEY`
- `NODE_LAST_STOP`
- `QA_ACTUAL_SIZE`

## Editable text contract

All words and dates remain native Figma text. No wording is baked into PNG/SVG.

Approved fixed fields:

- `Thank you for traveling with us.`
- `Have a safe trip home.`
- `2026.10.24`

Provisional fields:

- couple names
- venue name
- gift name
- social handle / QR

Provisional fields stay absent, not fake-filled.

## Actual-size readability targets

At 50 × 80 mm:

- primary `Thank you`: 15–22 pt equivalent
- secondary line: 7.5–10 pt equivalent
- date: 7–9 pt equivalent
- no essential line below 0.4 pt
- no text closer than 5 mm to trim
- no text or route closer than 5 mm to punch edge

## Production constraints

- verify tag stock thickness before final hole specification
- verify string, ribbon or twist-tie width
- test whether the tag rotates and hides the front when attached
- test on the actual gift package, not only flat paper
- export single master separately from imposed sheets
- imposed sheets must include trim/cut logic but no production marks inside final trim

## Explicit exclusions

- no generated people, guests or dog
- no QR code until destination is approved
- no fake flight, gate, seat or barcode data
- no dense icon row
- no glitter raster background
- no country flag
- no baked text raster
- no automatic reuse of ADD-01 badge/compass assets
