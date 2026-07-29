# 18 Asset Freeze Manifest — Figma前に作り切る固定素材

更新: 2026-07-29

Status label:
- `CANDIDATE` 候補
- `IN_PROGRESS` 制作中
- `REVIEW` 比較/選定待ち
- `ASSET-FROZEN` デザイン固定、Figmaでは位置/scale/opacityのみ
- `REJECTED` 不採用

## 共通
| Asset | Status | Preferred route | Deliverables |
|---|---|---|---|
| 共通route line ornament | CANDIDATE | SVG/Figma Draw | SVG + PNG |
| YOKOHAMA date stamp | CANDIDATE | AI→cleanup or SVG | RGBA + SVG |
| 2026.10.24 badge | CANDIDATE | SVG | SVG + PNG |
| plane icon family | CANDIDATE | existing SVG / custom | SVG |
| map pin family | CANDIDATE | existing SVG / custom | SVG |
| paper texture set | CANDIDATE | generated/raster | PNG |
| decorative barcode family | CANDIDATE | programmatic SVG | SVG |

## るるぶWEDDING — priority 1
| Asset | Status | Preferred route | Deliverables |
|---|---|---|---|
| るるぶWEDDING logo | IN_PROGRESS | AI final asset | RGBA master / white / mono / optional SVG |
| SPECIAL WEDDING ISSUE badge | CANDIDATE | AI or SVG | RGBA + SVG |
| date circle badge | CANDIDATE | SVG | SVG |
| feature-label shapes | CANDIDATE | SVG/Figma Draw | SVG |
| magazine arrow set | CANDIDATE | SVG | SVG |
| section-header ornament | CANDIDATE | SVG | SVG |
| travel pin/icons | CANDIDATE | existing project SVG | SVG |
| scrapbook tape set | CANDIDATE | generated/raster | PNG |
| back-cover stamp set | CANDIDATE | AI→cleanup | RGBA |
| map route decoration | CANDIDATE | SVG | SVG |
| sky/travel cover background variants | CANDIDATE | image generation | hi-res PNG/JPG |

## WEDDING PASSPORT — priority 2
| Asset | Status | Preferred route | Deliverables |
|---|---|---|---|
| WEDDING PASSPORT wordmark | CANDIDATE | AI final asset | RGBA + optional SVG |
| passport emblem | CANDIDATE | AI→cleanup/vector | RGBA + SVG |
| ARRIVAL stamp | CANDIDATE | AI→cleanup | RGBA |
| DEPARTURE stamp | CANDIDATE | AI→cleanup | RGBA |
| YOKOHAMA issue stamp | CANDIDATE | AI→cleanup | RGBA |
| MENU icon | CANDIDATE | SVG | SVG |
| DRINK icon | CANDIDATE | SVG | SVG |
| SEATING icon | CANDIDATE | SVG | SVG |
| subtle world-map background | CANDIDATE | generated/SVG | PNG/SVG |
| navy paper texture | CANDIDATE | generated | PNG |
| passport border ornament | CANDIDATE | SVG | SVG |

## BOARDING PASS — priority 3
| Asset | Status | Preferred route | Deliverables |
|---|---|---|---|
| BOARDING PASS mark | CANDIDATE | AI or native type | RGBA/SVG |
| wing/plane route emblem | CANDIDATE | SVG | SVG |
| decorative barcode | CANDIDATE | programmatic SVG | SVG |
| perforation marker style | CANDIDATE | SVG | SVG |
| GATE icon | CANDIDATE | SVG | SVG |
| TABLE icon | CANDIDATE | SVG | SVG |
| SEAT icon | CANDIDATE | SVG | SVG |
| back-side route graphic | CANDIDATE | SVG | SVG |
| thank-you stamp | CANDIDATE | AI→cleanup | RGBA |

## 青春ふたりきっぷ — priority 4
| Asset | Status | Preferred route | Deliverables |
|---|---|---|---|
| 青春ふたりきっぷ logo | CANDIDATE | AI final asset | RGBA + optional SVG |
| retro train line art | CANDIDATE | AI→vector or SVG | SVG + PNG |
| 新郎駅 stamp | CANDIDATE | AI→cleanup | RGBA |
| 新婦駅 stamp | CANDIDATE | AI→cleanup | RGBA |
| 未来行き stamp | CANDIDATE | AI→cleanup | RGBA |
| red/blue station stamp set | CANDIDATE | AI→cleanup | RGBA |
| guilloche background | CANDIDATE | programmatic SVG | SVG + PNG |
| serial-number plate | CANDIDATE | SVG | SVG |
| station label frame | CANDIDATE | SVG | SVG |
| route arrow ornament | CANDIDATE | SVG | SVG |
| sage ticket paper texture | CANDIDATE | generated | PNG |

## Freeze rule
`ASSET-FROZEN`へ昇格する条件:
1. 方向性がCurrent specと一致
2. 既存ブランド/公的券面の直接コピーではない
3. 背景透過または配置しやすい形式
4. 原寸で荒れない
5. 必要variantが揃っている
6. Driveへmaster保存
7. Gitへasset名/status/source/tool chainを記録

## Figma開始時の目標
各アイテムごとに、固定素材10〜20点を`ASSET-FROZEN`へしてから本番Figmaへ進む。

るるぶWEDDINGは最優先で、logo + date badge + feature labels + cover decorative system + back-cover scrapbook/stamp systemを先に固める。
