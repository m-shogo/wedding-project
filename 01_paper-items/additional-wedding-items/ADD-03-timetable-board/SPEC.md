# ADD-03 当日タイムテーブルボード — SPEC

Status: `CURRENT / SPEC_READY`
Authority: GitHub `main`
Date: 2026-08-02

## Purpose

会場入口または受付付近で、ゲストが当日の流れを一目で把握できる大型案内。旅行テーマを使うが、空港の電光掲示板をそのまま模倣せず、上質な紙の旅程表として成立させる。

## Confirmed facts

- Wedding date: `2026.10.24 SAT`
- Location: `YOKOHAMA`
- Ceremony: `14:10–14:40`
- Reception: `15:00–17:30`

受付開始、開場、写真撮影、送賓、二次会などは未確定。確定前に時刻を作らない。

## Primary format

- Primary: A2 portrait (`420 × 594 mm`)
- Comparison: A3 portrait (`297 × 420 mm`)
- Provisional bleed: 3 mm
- Provisional safe inset: 12 mm from trim
- Final printer/template values override these provisional values.

A2を本命とする理由は、離れた位置から時刻を読む用途だから。卓上用途へ縮小する場合も、A2を単純縮小せず文字サイズを再設計する。

## Art direction

Concept: `YOKOHAMA WEDDING ITINERARY`

- airline departure boardではなく、ホテルのコンシェルジュが用意した旅程表
- dark navyを全面に敷かず、warm ivoryを主面にする
- mint / blue / silverを案内線と時刻のアクセントに限定
- goldは箔押し風の細線・小見出しだけ
- equal-card gridを避け、一本の縦ルートと大小の時刻階層で読む
- Ceremonyを出発、Receptionを到着として扱うが、実際の場所や運行情報を偽装しない
- 装飾はルート、駅点、時刻、方位・航路の意味を持つものだけ

## Information hierarchy

1. `OUR WEDDING JOURNEY`
2. `2026.10.24 · YOKOHAMA`
3. Ceremony `14:10–14:40`
4. Transfer interval `14:40–15:00` — time block only; activity label is `TBD` until approved
5. Reception `15:00–17:30`
6. small closing line: `Thank you for traveling with us.`

CeremonyとReceptionを同じサイズのカードにしない。Ceremonyは旅の起点、Receptionは最長滞在として面積と文字量を変える。

## Semantic nodes

- `FRAME_TIMETABLE_BOARD`
- `GUIDE_BLEED`
- `GUIDE_TRIM`
- `GUIDE_SAFE`
- `BG_PAPER_IVORY`
- `BG_ROUTE_WATERMARK`
- `TXT_TIMELINE_TITLE`
- `TXT_TIMELINE_DATE_LOCATION`
- `GROUP_EVENT_CEREMONY`
  - `TXT_EVENT_01_TIME`
  - `TXT_EVENT_01_LABEL`
  - `TXT_EVENT_01_NOTE`
- `GROUP_TRANSFER_TBD`
  - `TXT_TRANSFER_TIME`
  - `TXT_TRANSFER_LABEL`
- `GROUP_EVENT_RECEPTION`
  - `TXT_EVENT_02_TIME`
  - `TXT_EVENT_02_LABEL`
  - `TXT_EVENT_02_NOTE`
- `PATH_DAY_ROUTE`
- `NODE_CEREMONY`
- `NODE_TRANSFER`
- `NODE_RECEPTION`
- `TXT_CLOSING_NOTE`
- `QA_OVERLAY`

## Editable text contract

All facts, labels and times remain native Figma text. Do not bake into PNG/SVG.

Approved fixed copy:

- `OUR WEDDING JOURNEY`
- `2026.10.24 SAT`
- `YOKOHAMA`
- `CEREMONY`
- `RECEPTION`
- `Thank you for traveling with us.`

Provisional copy:

- transfer label
- reception/opening guidance
- venue-floor guidance
- any Japanese explanatory sentence

Provisional fields must be visibly marked `TBD` on the working file and removed or replaced before export.

## Print readability targets

At A2:

- event time: 34–48 pt equivalent minimum
- event label: 20–28 pt equivalent minimum
- body/note: 12–16 pt equivalent minimum
- no thin rule below 0.5 pt at final size
- essential text contrast target: WCAG-like 4.5:1 visual reference, despite print medium

## Explicit exclusions

- no fake flight number
- no fake gate number
- no QR code
- no generated couple/guest/dog imagery
- no airport-logo imitation
- no equal four-card dashboard
- no split-flap font for body copy
- no decorative icon repeated on every row
