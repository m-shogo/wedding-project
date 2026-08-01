# ADD-03 当日タイムテーブルボード — ASSET QUEUE

Status: `CURRENT / NO_RASTER_REQUIRED`
Date: 2026-08-02

## Decision

新規production rasterは作らない。

理由:

- 主役は時刻と縦ルートであり、写真や生成装飾は可読性を下げる
- 旅行線、ノード、方位記号、細いフレームはFigma native vectorの方が印刷品質と編集性が高い
- 未確定情報を画像へ焼き込む事故を避ける
- 既存ADD-01のルート線・コンパス素材を流用すると、ウェルカムボードと競合し同じ見た目になる

## Figma-native build queue

| ID | Node | Method | Status |
|---|---|---|---|
| TT-01 | `PATH_DAY_ROUTE` | editable vector path, 2–3 line weights | `READY_FOR_FIGMA` |
| TT-02 | `NODE_CEREMONY` | circle + inner point | `READY_FOR_FIGMA` |
| TT-03 | `NODE_TRANSFER` | small open circle, provisional | `READY_FOR_FIGMA` |
| TT-04 | `NODE_RECEPTION` | larger destination node | `READY_FOR_FIGMA` |
| TT-05 | `BG_ROUTE_WATERMARK` | low-opacity native path, no raster texture | `READY_FOR_FIGMA` |
| TT-06 | `ICON_DIRECTION_MARK` | one small compass/arrow vector only | `OPTIONAL` |

## Existing asset review

- ADD-01 WB-02 route line: do not import by default; too illustrative for timetable information hierarchy
- ADD-01 WB-04 compass: do not import by default; can be referenced only for line-weight language
- Passport/Boarding Pass assets: completed-item sources are read-only and must not be modified

## Acceptance rule

A decorative asset may be added only when screenshot QA demonstrates a concrete navigation or balance problem that native geometry cannot solve. “空いているから”は追加理由にしない。
