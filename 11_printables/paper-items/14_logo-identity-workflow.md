# 14 Logo / Identity Workflow — るるぶWEDDING & PASSPORT

更新: 2026-07-29

## 目的
Logo/IdentityをFigma上で毎回組み直すのではなく、**変更頻度と作業特性で最適な制作手段を切り分ける**。

今回のロゴは変更頻度が低く、最終的に固定アセットとして扱えるため、生成AIを主制作手段としてよい。

---

## Current decision

### Logo production route
**AIで完成形を作る → 背景除去/透過 → 高解像度化 → 必要ならvectorize/trace → QA → 固定アセット化**

Figmaで文字を一から再構築することを必須にしない。

ただし以下は必ず満たす。
- 日本語文字が正しい
- 30mm程度の小サイズでも潰れない
- 白背景/写真上/色背景で成立する
- 透過PNGを保持する
- 必要ならSVG版も作る
- 本番印刷で荒れない解像度を確保する
- 既存誌/企業/公共機関のロゴを直接複製しない

---

# るるぶWEDDING Logo

## 目標
旅行雑誌の特集号として強いmastheadだが、既存誌ロゴの単純コピーではなく、結婚式用の独自identityとして成立させる。

## AI生成方向

### A. Rounded Travel Masthead
- 太く読みやすい日本語
- `るるぶ` が主役
- `WEDDING` は副題
- 明るく楽しい
- 子どもっぽくしない

### B. Editorial Pop
- 強いJapanese masthead
- WEDDINGはcondensed/small caps的
- 写真上でも成立する
- 雑誌らしい情報密度

### C. Travel Label
- 読みやすい文字
- ticket/tab/label形状で旅行感
- 色数を増やしすぎない

## Color candidates
- Sky / Blue
- Yellow
- Red
- White / Ivory separator

4文字をすべて別色にする案は比較候補にはしても、過度に玩具感が出る場合は不採用。

---

# WEDDING PASSPORT Identity

## Wordmark
`WEDDING PASSPORT` を中心に、上品な架空travel document identityとして生成する。

## Emblem candidates
A. globe + route
B. plane + route
C. monogram + date / coordinates-like decorative text

主モチーフは最大2種。
月桂樹 + globe + plane + compass + heart等を全部入れない。

---

# AI generation workflow

## Phase 1 — Direction batch
1案を一発採用しない。
同一条件で複数案を作り、構造を比較する。

比較軸:
- 可読性
- 既存ブランドへの近さ
- 小サイズ耐性
- 写真上での強さ
- 結婚式らしさ
- 旅行感

## Phase 2 — Refinement
選んだ1〜2案を固定し、以下だけ反復する。
- spacing
- color
- outline
- shadow有無
- badge形状
- WEDDINGのサイズ比

構造そのものを毎回変えない。

## Phase 3 — Extraction
優先順:
1. direct transparent generation
2. Figma/native background removal
3. green / blue screen generation
4. project chroma-key script + despill
5. manual cleanup

## Phase 4 — Production asset
保存候補:
- `logo_master_rgba.png`
- `logo_white_rgba.png`
- `logo_mono_black.png`
- `logo_mono_white.png`
- `logo_master.svg`（必要な場合）

---

# Vectorization policy

ロゴがrasterで十分な解像度を持ち、印刷品質に問題がなければ無理にvector化しない。

vector化する条件:
- 大きく拡大する
- strokeや色をFigmaで編集したい
- 小サイズでraster edgeが気になる
- 印刷会社workflowでSVG/PDF vectorが有利

手段候補:
- Figma Vectorize（planで使える場合）
- VTracer
- Potrace（二値向け）
- manual Pen / Figma Draw cleanup

---

# Small-size logo QA
- 30mm幅で潰れない
- thin gapが消えない
- `WEDDING`が読める
- white knockoutでも成立
- monochromeでもidentityが残る
- inkjet/laser原寸試し刷りでも破綻しない

---

# Tool-routing principle

## 生成AIへ寄せる
- 固定ロゴ
- decorative emblem
- illustration concept
- texture
- background visual

## Figmaへ寄せる
- layout
- size
- spacing
- editable text
- guest data
- table data
- components
- print guides

## Plugin / scriptへ寄せる
- repetitive replacement
- CSV population
- QA
- transparency cleanup
- naming
- export

## 人間へ残す
- 最終的な好み
- optical balance
- 写真crop
- 原寸試し刷り判断

この切り分けを今後の基本原則とする。
