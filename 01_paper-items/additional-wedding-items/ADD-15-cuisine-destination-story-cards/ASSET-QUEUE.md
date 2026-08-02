# ADD-15 — ASSET QUEUE

Status: `CURRENT / READY`
Authority: GitHub `main`

## Decision

現時点でproduction rasterは生成しない。

料理・目的地・設置モデルが未確定の状態で画像を作ると、架空の料理写真、実際と異なる食材、観光クリップアート、または既存アイテムの表面的な使い回しになるため。

## Queue

| ID | Asset | State | Production rule |
|---|---|---|---|
| ADD15-A01 | actual dish photograph | `WAITING_OFFICIAL_SOURCE` | 会場または撮影者の正本、利用許可、印刷解像度を確認後のみ |
| ADD15-A02 | destination detail photograph | `OPTIONAL / WAITING_MODEL_B` | Model B採用時のみ。実体験・正式テーマと矛盾しない素材 |
| ADD15-A03 | editorial route line | `FIGMA_NATIVE_VECTOR` | 本文に移動・由来の意味がある場合のみ |
| ADD15-A04 | tasting-note divider | `FIGMA_NATIVE_VECTOR` | 細い罫線。装飾のために反復しない |
| ADD15-A05 | destination/dish accent field | `FIGMA_NATIVE_SHAPE` | 内容確定後、1色だけ選ぶ |
| ADD15-A06 | allergen reference mark | `WAITING_VENUE_RULE` | 会場正本の表記方法に従う。独自アイコンを作らない |

## Reuse policy

既存Drive素材は、内容との意味的適合と具体的な必要性が確認された場合だけ使用する。

Standard no-reuse:

- ADD-01 compass / badgeを標準装飾として流用しない
- ADD-02 country motifを無条件にコピーしない
- BOARDING PASSのバーコード、券面、スタンプを流用しない
- WEDDING PASSPORTの査証・入国印を流用しない
- るるぶWEDDINGの見出し装飾を縮小コピーしない

## Acceptance contract for supplied photography

- actual subject and source identified
- rights / permission confirmed
- no embedded text or watermark
- sufficient resolution at final crop
- white balance and color do not falsely represent the served dish
- crop does not remove essential food context
- CMYK conversion or printer profile preview checked before completion

## Current queue declaration

`0 PRODUCTION RASTERS / 3 FIGMA-NATIVE CANDIDATES / OFFICIAL CONTENT REQUIRED`
