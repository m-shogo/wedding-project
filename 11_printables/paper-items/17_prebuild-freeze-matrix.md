# 17 Prebuild / Freeze Matrix — 変更頻度で制作手段を切り分ける

更新: 2026-07-29

## 目的
Figma本制作を始めてから「毎回同じ装飾を作る」「固定素材をその場で生成する」無駄をなくす。

判断基準は **変更頻度 / 再利用性 / 編集必要性**。

---

# A. 変更しないもの — Figma前に完成アセット化

原則: 先に完成させてよい。

制作手段:
- 生成AI
- SVG / programmatic generation
- Figma Draw
- 外部vector tool
- chroma-key / background removal
- upscale / vectorize

保存形式:
- master PNG (RGBA)
- SVG（必要なら）
- monochrome variant
- white knockout variant

## 共通固定アセット
- 共通旅行スタンプ
- route line ornaments
- airplane / train / compass / map icons
- decorative barcode
- divider / frame / ticket edge
- paper texture
- guilloche / security-like abstract pattern（実券コピーではなく独自）
- date stamp
- `2026.10.24` badge
- YOKOHAMA badge
- decorative serial-number plate

## るるぶWEDDING
- `るるぶWEDDING` logo
- SPECIAL WEDDING ISSUE badge
- 日付丸バッジ
- travel magazine decorative arrows
- map pin style
- feature-label shapes
- section header ornaments
- small travel icons
- back-cover scrapbook ornaments

## WEDDING PASSPORT
- WEDDING PASSPORT wordmark / emblem
- globe / route emblem
- issue stamp
- arrival / departure stamp
- MENU / DRINK / SEATING small icons
- subtle map background
- border ornaments
- fictional passport decorative seal

## BOARDING PASS
- BOARDING PASS mark
- wing / route / plane icon
- decorative barcode pattern
- gate / seat / table icons
- perforation marker style
- stub ornament
- back-side route graphic

## 青春ふたりきっぷ
- 青春ふたりきっぷ logo
- retro train line art
- red / blue fictional station stamps
- guilloche background
- serial-number plate
- station-label frame
- arrow / route ornament

---

# B. 形は固定、内容だけ変わる — Figma Component化

原則: 見た目の骨格は先に作る。中身だけ後で差し替える。

## Examples
- profile card
- Q&A card
- history timeline item
- memory spot card
- boarding-pass guest card
- table number block
- menu course row
- drink category block
- seating table block
- photo caption block
- date / venue info row

FigmaではComponent / Component Property / Variablesを使う。

---

# C. データで変わる — CSV / Plugin / Variablesへ寄せる

## BOARDING PASS
- guest name
- table
- group
- optional note

## Seating
- guest names
- table assignments
- table names

## Profile
- names
- Q&A text
- dates
- history labels

手入力で80件繰り返さない。

優先:
1. CSV source-of-truth
2. custom Plugin / proven CSV Plugin
3. component property population

---

# D. 写真 — Figmaに差し替え余地を残す

変更可能性が高いため、固定画像化しない。

先に作ってよいもの:
- photo frame shape
- mask
- crop aspect ratio
- caption style
- decorative tape / border

後から入れるもの:
- actual couple photo
- friend photo
- travel photo
- venue photo

最終cropは人間が原寸で判断する。

---

# E. 文章 — 原則editable text

AI画像へ焼き込まない。

対象:
- menu text
- drink list
- profile
- Q&A
- guest names
- table names
- thank-you message
- venue info

理由:
- 誤字修正
- 文字量変化
- 日本語生成精度
- print readability

例外:
完全固定のdecorative wordmark / logoだけは画像化可。

---

# F. 背景・texture — 早めに作ってよい

ただしfinal layoutへ直接焼き込まず、別assetとして保持する。

## 先行制作候補
- paper texture
- sky / travel background
- abstract map
- route line pattern
- kraft scrapbook background
- sage ticket paper
- passport dark navy texture

Figma側ではopacityを調整できる状態にする。

---

# G. Layout — Figmaで保持

固定アセットを完成させても、以下はFigmaで組む。

- margins
- grid
- hierarchy
- fold-aware composition
- safe area
- photo placement
- text flow
- page balance

理由:
最終原稿や写真で変わるため。

---

# H. Print-specific — 最後までeditable / inspectable

- bleed
- crop marks
- fold line
- safe area
- page size
- image resolution check
- export settings

固定画像へ統合しない。

---

# Production routing table

| 要素 | 先に完成 | AI生成 | SVG/Vector | Figma editable | CSV/Plugin |
|---|---:|---:|---:|---:|---:|
| Logo | Yes | Yes | optional | placement only | No |
| Emblem / stamp | Yes | Yes | preferred | placement/scale | No |
| Background texture | Yes | Yes | optional | opacity/crop | No |
| Decorative icons | Yes | Yes | preferred | placement/color | No |
| Page layout | No | No | No | Yes | No |
| Guest names | No | No | No | Yes | Yes |
| Seating data | No | No | No | Yes | Yes |
| Menu copy | No | No | No | Yes | maybe |
| Photos | No | No | No | Yes | maybe |
| Photo frames | Yes | maybe | preferred | Yes | No |
| Print guides | No | No | No | Yes | Plugin candidate |

---

# Freeze states

## ASSET-FROZEN
デザイン自体は固定。Figmaでは位置/scale/opacityだけ触る。

## TEMPLATE-FROZEN
Component構造は固定。contentだけ差し替える。

## DATA-OPEN
CSV / text / guest / seatingは変更可能。

## VISUAL-OPEN
写真cropやlayoutはまだ調整可能。

## PRINT-FROZEN
試し刷りPASS後、入稿仕様固定。

---

# Current recommendation

Figma本制作前に、まず **ASSET-FROZEN候補を各アイテム10〜20点程度まで絞って完成させる**。

その後Figmaでは「素材を作る」のではなく、

- fixed asset placement
- hierarchy
- real content
- spacing
- photo
- print QA

へ集中する。

これにより、Figmaでの思考負荷を減らし、最終品質を上げる。
