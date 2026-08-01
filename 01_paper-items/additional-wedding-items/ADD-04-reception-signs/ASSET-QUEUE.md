# ADD-04 受付サイン — ASSET QUEUE

Status: `CURRENT / NO_RASTER_REQUIRED`
Authority: GitHub `main`
Date: 2026-08-02

## Decision

Current production raster count: `0`

新規PNGを先に作らない。受付サインの品質は写真やイラスト量ではなく、遠距離可読性、紙面余白、左右識別、印刷時の階層で決まる。ルート線、方向マーク、目的地点、細い箔押し風エッジはFigma native vectorで作成する。

## Native Figma build queue

| ID | Element | Method | Status |
|---|---|---|---|
| RS-01 | groom horizontal route | native vector path | `PLANNED` |
| RS-02 | bride curved route | native vector path | `PLANNED` |
| RS-03 | destination nodes | native ellipse/vector | `PLANNED` |
| RS-04 | side identifier marks | native vector, non-gendered | `PLANNED` |
| RS-05 | foil-like edge/rule | native line/gradient | `PLANNED` |
| RS-06 | optional paper grain | Figma effect or approved subtle texture only after proof | `REVIEW_LATER` |

## Raster creation gate

A raster asset may be created only when all are true:

1. live Figma composition exists;
2. screenshot QA identifies a concrete empty-area or materiality defect;
3. native vector/effect cannot solve it cleanly;
4. the asset has no text, names, dates or operational facts;
5. transparent-edge and actual-size print QA can be performed.

## Reuse policy

Do not reuse WB-02 route line, WB-03 travel badge or WB-04 compass by default. They belong to the ADD-01 welcome-board art direction and would make separate items look templated. Reuse is allowed only after a live layout proves that one small fragment is semantically and visually superior to a native alternative.

## Exclusions

- no decorative couple silhouettes
- no moustache/lips icons
- no repeated suitcase/passport/airplane sticker set
- no fake stamp collage
- no generated venue photograph
- no ornamental asset generated merely to make the queue non-empty
