# ADD-04 受付サイン — SPEC

Status: `CURRENT / SPEC_READY`
Authority: GitHub `main`
Date: 2026-08-02

## Purpose

受付卓でゲストが迷わず「新郎側」「新婦側」を判別でき、スタッフの案内を妨げない小型サイン一式。旅行テーマは使うが、航空券・パスポート・るるぶの意匠を再利用せず、ホテルのコンシェルジュデスクに置かれた上質な行先標識として成立させる。

## Scope

Core set:

1. `新郎側受付 / GROOM RECEPTION`
2. `新婦側受付 / BRIDE RECEPTION`
3. optional shared header: `RECEPTION / 受付`

`GUEST BOOK`固有の案内はADD-09の責務とし、ADD-04へ重複実装しない。受付卓で必要と確認された場合も、ADD-09のsemantic nodeを参照する。

## Confirmed facts

- Wedding date: `2026.10.24 SAT`
- Location: `YOKOHAMA`
- Couple names, surnames,受付担当者名、芳名帳方式、祝儀・会費案内は未確定。

未確定の氏名や運用文言を仮の事実として印刷しない。

## Primary format

- Primary: A5 portrait (`148 × 210 mm`) × 2
- Optional shared header: A6 landscape (`148 × 105 mm`)
- Provisional bleed: 3 mm
- Provisional safe inset: 8 mm from trim
- Final printer/template values override provisional values.

A4二分割で出力する場合も、最終裁断後のA5実寸でQAする。

## Art direction

Concept: `YOKOHAMA CONCIERGE DESTINATION MARKERS`

- warm ivory paper field
- groom side: restrained navy / silver
- bride side: mint / soft blue / silver
- gold is limited to one directional rule or foil-like edge
- the pair must read as one family without becoming identical recolors
- groom uses a longer horizontal route and compact destination seal
- bride uses a lighter curved route and larger breathing space
- typography and directional marks carry meaning; decorative luggage stickers do not
- no equal rounded-card dashboard, no fake airline logo, no passport stamp collage

## Information hierarchy

1. Japanese side label (`新郎側受付` / `新婦側受付`)
2. English secondary label
3. optional approved surname/name
4. small date/location line
5. one directional travel cue

Japanese must remain readable first. English is not a substitute for the Japanese label.

## Semantic nodes

Shared:

- `PAGE_ADD04_RECEPTION_SIGNS`
- `FRAME_GROOM_RECEPTION_A5`
- `FRAME_BRIDE_RECEPTION_A5`
- `FRAME_SHARED_RECEPTION_A6_OPTIONAL`
- `GUIDE_BLEED`
- `GUIDE_TRIM`
- `GUIDE_SAFE`
- `QA_OVERLAY`

Per side:

- `BG_PAPER`
- `TXT_SIDE_LABEL_JA`
- `TXT_SIDE_LABEL_EN`
- `TXT_NAME_OPTIONAL`
- `TXT_DATE_LOCATION`
- `PATH_DIRECTION_ROUTE`
- `NODE_DESTINATION`
- `MARK_SIDE_IDENTIFIER`

## Editable text contract

All labels, names, date and location remain native Figma text.

Approved fixed copy:

- `新郎側受付`
- `GROOM RECEPTION`
- `新婦側受付`
- `BRIDE RECEPTION`
- `RECEPTION`
- `受付`
- `2026.10.24 SAT`
- `YOKOHAMA`

Provisional fields:

- couple surname/name
-受付担当者名
-芳名帳・ご祝儀・会費に関する説明
-矢印方向

Provisional fields remain `TBD` until approved.

## Print readability targets

At A5 final size:

- Japanese primary label: 28–42 pt equivalent
- English label: 11–16 pt equivalent
- optional name: 16–24 pt equivalent
- small date/location: 8–11 pt equivalent
- no essential rule below 0.5 pt
- primary label must be readable from approximately 2 m under indoor lighting

## Explicit exclusions

- no generated people, guests or dog
- no QR code
- no fake flight/gate/seat data
- no country flag
- no repeated icon row
- no baked text raster
- no automatic duplication of ADD-09 Guest Book signage
- no gender-stereotype motifs such as moustache/lips, tuxedo/dress pictograms, crowns or excessive florals
