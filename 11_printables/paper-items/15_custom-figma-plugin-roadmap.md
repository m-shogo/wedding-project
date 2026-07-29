# Custom Figma Plugin Roadmap — Wedding Print Toolkit

更新: 2026-07-29

## 目的
既存Pluginで足りない部分だけを、自作Figma Pluginで埋める。目的は「AIで何でも自動化」ではなく、ペーパーアイテム4種の品質・再現性・修正速度・印刷前QAを改善すること。

## 基本原則
- 既存Pluginで高品質に解決できるなら自作しない。
- 自作は、この結婚式で繰り返し発生する作業・検査を対象にする。
- 美的判断をPluginへ丸投げしない。Pluginは構造化・一括処理・検査を担当する。
- 本番Figmaは1アイテム1ファイル。Pluginは4ファイル共通で使える設計にする。
- 個人データは原則ローカル処理。不要な外部通信をしない。

## 技術的に可能なこと
Figma Plugin APIでは、canvas nodeの読取・作成・更新、Variables、Component Properties、画像取込、SVG/PNG等のexport、Plugin UIを扱える。

公式:
- https://developers.figma.com/docs/plugins/api/api-reference/
- https://developers.figma.com/docs/plugins/working-with-variables/
- https://developers.figma.com/docs/plugins/creating-ui/
- https://developers.figma.com/docs/plugins/api/properties/nodes-exportasync/

## 仮称
`Wedding Print Toolkit`

公開Community Pluginを最初から目指さない。まずこのrepo専用のprivate/local pluginとして作り、実際に品質向上へ効いた機能だけ残す。

---

## MVP候補

### P0-1 Guest Data Populate
対象: BOARDING PASS / 必要なら席次関連

入力:
- CSV / TSV / JSON
- guest_name
- table
- gate
- note
- 任意の追加field

処理:
- Template Componentを複製
- Component Propertyまたは名前付きText layerへ値を流し込む
- ゲストごとにframe生成
- 長い名前を検出し、警告する

禁止:
- 長い名前を無条件に極小fontへ縮小して隠す

期待効果:
- 80名前後を1件ずつ手入力しない
- 後からCSVを修正して再生成可能

参考: 2026年にはCSV/JSONからreal componentsを生成しlocal styleへ合わせるPlugin事例があり、自作PluginをClaude Codeで構築した例もある。

### P0-2 Typography Stress Tester
対象: 全4種

目的:
「見た目は成立しているが、実データを入れた瞬間に文字が壊れる」をFigma制作中に発見する。

検査候補:
- text boxからのoverflow推定
- 最小font size以下
- 1行想定ラベルの改行
- guest name / table / date等の最大長sample
- frame外にはみ出すnode
- safe area侵入

実装案:
固定サイズTextを複製してauto-resizeした自然サイズと比較し、必要高さ/幅が固定boxを超える場合をwarningにする。精度は実データで検証してからVERIFIEDへ昇格する。

### P0-3 Print QA Overlay
対象: 全4種

機能候補:
- Safe Area overlay
- Bleed guide overlay
- Fold line overlay
- 重要Textがsafe areaを越えていないかscan
- low-resolution image candidateの警告
- guide layerを一括show/hide

注意:
Figma pxから物理mmへの変換は推測で固定しない。PDF/印刷会社仕様との原寸検証をしてから変換ルールを確定する。
CMYK/ICC/preflightはPrint for Figma等の実績ある専用toolを優先し、自作は検査・準備に寄せる。

### P0-4 Design Foundation Bootstrap
対象: 新規本番Figma 4ファイル

機能:
- 共通Variables作成
- color collection
- spacing values
- stroke values
- radius values
- typographic style scaffold
- Current / Archive / Print section scaffold

目的:
AI/MCPが毎回ばらばらな色・spacingを作ることを防ぐ。

### P1-1 Photo Placeholder / Batch Swap
対象: るるぶWEDDING

機能:
- `PHOTO_*` layerを一覧化
- drag/drop imageを対象placeholderへfill
- crop modeの統一
- 元画像縦横比とframe比率が大きく異なる時warning

最終cropは人間判断を残す。

### P1-2 Reference / Asset Inserter
対象: 全4種

Driveで採用済みの素材をFigmaへ持ち込む時、用途・source・statusを命名に付ける。

例:
- `ASSET__passport__stamp__approved__v1`
- `REF__rurubu__cover__strong__R01`

目的:
「referenceをproduction assetと誤認」の事故を防ぐ。

### P1-3 Batch Export Helper
対象: BOARDING PASS / Print QA

機能候補:
- selected framesを規則名でexport
- filename sanitize
- guest/tableをfilenameへ反映
- PNG proof / SVG proof / PDF workflow用metadata生成

最終印刷PDF自体は専用print toolでpreflightする。

---

## Pluginを作らない方がよい領域
- Logoの美的最終判断
- 写真の顔位置・感情が最も良く見えるcrop
- CMYK ICC変換の独自実装（検証コストが高い）
- 既存の高品質Vectorize / Remove Backgroundの完全再実装
- AI画像生成モデル自体の内製

## 既存機能/Plugin優先候補
- Figma Draw / Shape Builder / Text on a Path
- Figma Vectorize
- Remove Background / Isolate Object
- Print for Figma
- CSV Populate系（動作確認して採否）
- Figma to Illustrator系（印刷会社要件次第）

## Plugin開発環境
公式QuickstartはTypeScript + VS Code + Figma desktopを推奨。desktop appでlocal pluginを読み込んで検証する。

### repo案
```text
tools/figma-wedding-toolkit/
├─ README.md
├─ manifest.example.json
├─ package.json
├─ tsconfig.json
├─ src/
│  ├─ code.ts
│  ├─ ui.html
│  ├─ modules/
│  │  ├─ guest-populate.ts
│  │  ├─ typography-qa.ts
│  │  ├─ print-guides.ts
│  │  ├─ foundations.ts
│  │  └─ export-helper.ts
│  └─ shared/
│     └─ types.ts
└─ fixtures/
   ├─ guests-long-names.csv
   └─ typography-stress.json
```

`manifest.json`のplugin idはFigma desktopのCreate new pluginで正規発行してから設定する。架空IDをGitへ固定しない。

## 開発Gate
自作Plugin機能は次のラベルで管理する。

- `IDEA`: 発想のみ
- `PROTOTYPE`: 動いたが品質未検証
- `VERIFIED`: このプロジェクトの実データで有効性確認
- `CURRENT`: 本番workflowへ採用
- `REJECTED`: コスト/品質/安全性で不採用

## 最初に作るなら
1. Typography Stress Tester
2. Guest Data Populate
3. Foundation Bootstrap
4. Print QA Overlay

理由:
この4つは「デザインを自動生成する」のではなく、前回の弱点だった構造不足・情報ストレス不足・QA不足を直接改善する。

## 学習メモ
最近のFigmaコミュニティでは、Claude Code/Codexを使って個人用Pluginを作り、反復作業を自動化する例が増えている。特にCSV/JSONからreal componentを生成する事例や、design tokensをPluginでimportする事例は、本プロジェクトの方向と相性が良い。

ただしSNS投稿は仕様の正本にしない。API可否はFigma公式Developer Docsで確認し、実験成功後にCURRENTへ昇格する。
