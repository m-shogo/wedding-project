# ADD-05 サンキュータグ / プチギフトタグ — ASSET QUEUE

Status: `CURRENT / NO_RASTER_REQUIRED`
Authority: GitHub `main`
Date: 2026-08-02

## Decision

Current production raster count: `0`

小型タグでは、文字の可読性、穴位置、余白、裁断耐性が品質を決める。旅程線、終点ノード、細い金属調ルールはFigma native vectorで作る。新規PNGは先行生成しない。

## Native Figma build queue

| ID | Element | Method | Status |
|---|---|---|---|
| TG-01 | asymmetric journey line | native vector path | `PLANNED` |
| TG-02 | last-stop endpoint | native ellipse/vector | `PLANNED` |
| TG-03 | punch-hole guide | native ellipse, non-export QA layer | `PLANNED` |
| TG-04 | trim / bleed / safe guides | native layout guides | `PLANNED` |
| TG-05 | restrained metallic rule | native line/gradient | `PLANNED` |
| TG-06 | optional paper grain | subtle effect only after actual-size proof | `REVIEW_LATER` |

## Raster creation gate

A raster asset may be added only when:

1. live Figma tag exists;
2. actual-size screenshot or print proof identifies a concrete materiality defect;
3. native vectors/effects cannot solve it;
4. the asset contains no text, date, names, QR or operational data;
5. transparent-edge and 100% print QA are possible.

## Reuse policy

Do not reuse the welcome-board badge, route line or compass by default. Their visual mass is excessive at tag size and would make ADD-05 look like a reduced ADD-01. A tiny vector fragment may be recreated natively only when it improves legibility and remains semantically necessary.

## Exclusions

- no decorative asset generated merely to fill the queue
- no mini passport stamp collage
- no fake barcode
- no repeated airplane/suitcase icons
- no generated gift photograph
- no rasterized typography
