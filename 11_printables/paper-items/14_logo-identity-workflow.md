# 14 Logo / Identity Workflow — るるぶWEDDING & PASSPORT

更新: 2026-07-29

## 目的
最初のFigma検証で弱かった「ロゴをその場で適当に置く」をやめ、Logo/Identityを独立工程として詰める。

---

# 2026 Figmaで使えるnative craft tools

## Figma Draw
Status: `OFFICIAL / CORE CANDIDATE`

Figma公式HelpではFigma Drawはany planで利用可能。
使える重要機能:
- Shape Builder
- Brush / Pencil
- variable-width stroke
- multiple node editing
- lasso selection
- texture / noise
- transforms
- Text on a Path

今回、ロゴ・スタンプ・エンブレム制作に直接使える。

## Text on a Path
Status: `OFFICIAL`

円形スタンプ、旅券エンブレム、issue text、curved labelをpluginなしで編集可能textとして作れる。

用途:
- `YOKOHAMA • 24 OCT 2026`
- `WEDDING JOURNEY`
- Passport emblem ring
- circular date stamp

## Vectorize
Status: `OFFICIAL / PAID PLAN DEPENDENT`

Raster lettering / sketch / stampをeditable vectorへ。
Starterで利用不可ならPen / Shape Builderでmanual rebuildする。

---

# るるぶWEDDING Logo workflow

## Step 1 — 文字の構造だけ決める
最初から色を付けない。
Black on whiteで3方向。

### A. Rounded Travel Masthead
- 太いrounded Japanese
- `るるぶ` が主役
- `WEDDING` は細め/condensed label
- 柔らかいが子どもっぽくしない

### B. Editorial Pop
- 太いJapanese masthead
- WEDDINGを別baseline / small capsで対比
- 雑誌のlogoとして最もclean

### C. Travel Label
- 文字自体は読みやすく
- 背後のticket/tab/label shapeで旅行感
- logo glyphを無理に変形しない

## Step 2 — Optical test
必ず以下で比較。
- 100% size
- 約30mm幅
- grayscale
- photo上
- Sky background上
- Ivory background上

判定:
- `るるぶ` が一瞬で読めるか
- `WEDDING` が副題として読めるか
- 文字が4つの別アイコンに見えないか
- 過剰に既存誌ロゴへ近くないか

## Step 3 — Custom craft
必要な箇所だけFigma Draw。

使う候補:
- Shape Builderでtab / rounded block
- Penでglyphの一部を微調整
- Brushは1〜2箇所のaccentのみ
- Text on a Pathでissue/dateを曲線配置

禁止:
- 全文字をbrushで手描きして可読性を落とす
- 4文字全部違う形・色・shadow
- AI生成文字をoutlineとしてそのまま採用

## Step 4 — Color
Logo構造が決まってから色。

推奨role:
- Main Sky/Blue
- Highlight Yellow
- Alert/Feature Red
- White/Ivory separator

全4文字を別色にする案は比較対象にはしてもCurrent defaultにはしない。

---

# WEDDING PASSPORT Identity workflow

## Wordmark
`WEDDING PASSPORT` を文字組みだけで成立させる。

比較:
1. Serif classic
2. Sans + tracking
3. Serif + small caps subline

## Emblem
wordmarkと別に3案。

ルール:
- 主モチーフ最大2種
- circle / shield / stampのどれか1 structural form
- text on pathを活用

候補:
A. globe + route
B. plane + route
C. monogram + coordinates/date

月桂樹 + globe + plane + compass + heartを全部入れない。

## Integration
最後にwordmarkとemblemを組み合わせる。
先にemblemを巨大に作ってwordmarkを余白へ押し込まない。

---

# AI / hand sketch hybrid

AIや手描きで良い“骨格”が出た場合:
1. white/chroma backgroundでisolated生成
2. background remove
3. contrastを上げる
4. Vectorizeまたはmanual pen trace
5. node数を減らす
6. 正しい文字glyphへ置換
7. optical spacing
8. monochrome test

Logo communityの実務的な議論でも、自動trace後のcleanupやPen toolによるcurve調整は依然重要という意見が強い。

---

# Small-size logo QA
- 30mm幅で潰れない
- thin gapが消えない
- WEDDINGが読める
- white knockoutでも成立
- monochromeでもidentityが残る
- inkjet/laser試し刷りでも太細が破綻しない

## Current decision
Logoは画像生成で完成させない。
**AI = exploration / Figma Draw = construction / human = optical finish** を基本とする。
