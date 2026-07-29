# 11 Tool Stack — Figma / AI / Plugin / Print

更新: 2026-07-29

## 方針
ツール数を増やすのではなく、各工程のボトルネックへ1つずつ割り当てる。

Status:
- `CORE` — 本番workflowへ採用
- `TRY` — 実地検証予定
- `OPTIONAL` — 必要になったら使う
- `WATCH` — 新しく実績が少ない
- `AVOID-AS-PRIMARY` — 正本ルートにしない

---

## Figma Native

### Variables / Styles
Status: `CORE`
用途: color / spacing / typography / reusable foundation。

### Auto Layout
Status: `CORE`
用途: text量変化、guest name、MENU block、profile card。

### Components
Status: `CORE`
用途: TABLE block、boarding pass fields、badges、photo captions。

### Layout Guides
Status: `CORE`
用途: margin / fold / safe / trim基準。

### Remove Background / Isolate / Erase / Expand Image
Status: `TRY`
用途: 画像編集の往復削減。
注意: AI credit / plan availabilityを作業開始時に確認。

### Vectorize
Status: `OPTIONAL / PLAN DEPENDENT`
用途: raster logo sketch / stamp / texture → editable vector。
公式Help上はpaid plans対象。Starterでは使えない可能性があるため、利用時にaccount availabilityを確認。

---

## Asset / Icon

### Iconify
Status: `CORE CANDIDATE`
用途: open-source vector icon検索。
ルール: 1アイテム内でicon familyを統一し、元licenseを確認。

### Figma native Vectorize
Status: `OPTIONAL`
用途: AI生成shape / 手描きletteringのeditable化。

### custom chroma removal
Status: `CORE FALLBACK / VERIFIED`
`scripts/remove-chroma-background.py`
用途: 生成画像の透明化。

---

## Typography

### Figma Text Styles
Status: `CORE`
最終正本。

### Fontpair
Status: `TRY`
用途: Google Fonts中心のpairing探索。
最終判断は実際の日本語/英字組版で行う。

### Typiq / Type Flow
Status: `WATCH`
用途: typography scale / variables foundation生成。
注意: 数学的scaleが印刷物のoptical balanceを保証するわけではない。探索補助に限定。

### Batch Styler
Status: `TRY`
用途: font family / weight / line-height / letter-spacing / color stylesの一括変更。
特に書体候補比較で有用。

---

## Color

### Figma Image Color Picker
Status: `CORE`
実写真からaccent候補を抽出。

### Scale Forge
Status: `WATCH`
用途: color scale / variables生成。
UI designほど多段scaleを必要としないため、今回のprintでは必要時のみ。

---

## Content Population

### CSV snapshot
Status: `CORE`
正本データはCSV/Drive tableとして保持。

### Super Paste
Status: `TRY`
2026-07にFigma Forumで公開。CSV/text/images bulk population対応を作者が案内。
BOARDING PASSのguest data検証候補。

### CSV Populate
Status: `TRY`
Google Sheets live-sync失敗時の代替としてcommunityで利用報告あり。

### Variate
Status: `TRY`
2026-06に作者がwedding invitations等の大量text variation用途を紹介。
BOARDING PASS量産と相性がよい可能性。

### Google Sheets live sync plugins
Status: `AVOID-AS-PRIMARY`
2025〜2026にfetch failureの利用者報告あり。
使うとしても便利なpreview用途。正本データ/最終量産ルートにはしない。

---

## Lint / Cleanup

### Design Lint
Status: `CORE CANDIDATE`
MIT/open-source。
用途: missing styles / inconsistent valuesの検出。

### Clean Document
Status: `TRY / LATE STAGE ONLY`
用途: hidden layers、single-layer groups、rename等。
hidden layer deleteは破壊的なのでARCHIVE後のみ。

### Similayer / similar-selection utilities
Status: `OPTIONAL`
用途: 同種layer一括選択・修正。
MCP/Plugin APIで代替できる場合は追加しない。

---

## Print / Prepress

### Print for Figma
Status: `HIGH PRIORITY TRY`
機能:
- CMYK export
- ICC profiles
- bleed
- crop marks
- DPI check
- preflight
- multi-page export

Figma標準がscreen-firstな弱点を補える候補。
本番入稿前に印刷会社指定PDFと比較検証する。

### Printery / other CMYK exporters
Status: `OPTIONAL COMPARISON`
同種機能の比較候補。

### PrintPlix
Status: `WATCH`
2026-07公開の新pluginとしてcommunity投稿あり。
CMYK profiles / preflightを謳うが、実績がまだ少ないため本番正本にはしない。

### Illustrator / Affinity等
Status: `FALLBACK`
印刷会社が特殊なCMYK/spot/overprint/PDF仕様を要求し、Figma pluginで保証できない場合だけprepress最終工程へ使う。

---

## Mockup / Physical Review

### Mockuuups Studio
Status: `TRY`
2026版でprint mockupsがpluginへ追加。
用途:
- booklet
- paper
- book cover
等の実物感チェック。

mockupはapproval/visual review用で、入稿データ生成には使わない。

---

## AI / MCP

### ChatGPT + Figma
Status: `CORE`
用途: direct canvas edits、spec-to-layout、QA、bulk changes。

### Claude Code + Figma MCP
Status: `CORE CANDIDATE`
SNSでは“private intern for annoying work”としてbulk/tedious tasksへの評価が比較的高い。
Art direction一発生成より、cleanup / variants / repetitive work向け。

### Codex + Figma MCP
Status: `CORE CANDIDATE`
Git/current authorityと一緒に運用し、Figma操作をrepo仕様へ拘束する。

## Agent rule
AIへは:
- 何を変えるか
- 何を変えないか
- 対象Node/Section
- 完了条件
を明記する。

大きいframeを丸ごと「もっと良くして」で渡さない。

---

## 現在の優先導入順
1. Native Variables / Styles / Auto Layout
2. Iconify
3. Design Lint
4. Batch Styler
5. CSV population系を1つ選定
6. Print for Figmaを入稿前に検証
7. Mockuuups Studioをphysical review用に検証
8. 必要時だけその他plugin

## Starter Planメモ
Figmaの2026年AI credit仕様ではStarter Full seatにも月500 credits、日150 credits上限が案内されている一方、Vectorizeは公式Help上paid plans対象。
機能ごとにStarter可否が異なるので、AI機能を前提にせずfallbackを用意する。
