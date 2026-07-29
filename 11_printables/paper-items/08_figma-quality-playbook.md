# 08 Figma Quality Playbook

更新: 2026-07-29

## なぜ最初のFigmaが弱かったか
最初の検証版は「Figmaを直接作れることの証明」にはなったが、デザイン品質としては弱かった。

主因:
1. Foundationより先に完成レイアウトを描いた
2. Wireframe比較をせず1案を即実装した
3. 実写真/実原稿がない状態で情報量を想像した
4. ロゴ/エンブレムを独立したIdentity工程として詰めなかった
5. 素材・参考をCanvasへ十分反映する前にプリミティブ図形で置き換えた
6. “作れる”を優先し、光学的な余白・文字組み・写真比率の反復が不足した

本番ではこの順番を禁止する。

---

## 本番制作の順序
### Phase 0 — Brief Lock
- Current Authorityを読む
- 今回触るアイテム以外を触らない
- 未確定事項を明示

### Phase 1 — Reference Extraction
Drive参考から `STRONG / PARTIAL / REJECT` を決める。
参考の見た目をコピーせず、グリッド・情報階層・余白・色面積・写真比率へ分解する。

### Phase 2 — Foundation
完成ページを作る前に以下だけ作る。
- Color Variables / Styles
- Text Styles
- Spacing scale
- Layout Guides
- Safe / Bleed / Fold guides
- Icon rule
- Stamp rule
- Photo frame rule

### Phase 3 — Identity
ロゴが必要なものは独立工程にする。

#### るるぶWEDDING
- モノクロ3案
- 小サイズで判読テスト
- 写真上 / 単色上でテスト
- 最終1案をベクター化

#### Passport
- WEDDING PASSPORT wordmark
- emblem 3案
- 2モチーフ以内

### Phase 4 — Wireframe
色・装飾なしで2〜3案比較。
- 主役
- 読む順番
- 写真比率
- 余白
- 折り位置
だけを見る。

### Phase 5 — Visual Design
選定wireframeへ色・写真・スタンプ・アイコンを追加。
一度に全部足さず、主役→補助→装飾の順。

### Phase 6 — Content Stress Test
- 最長ゲスト名
- 最長MENU文
- 写真縦横比違い
- 11卓
など、実際に崩れやすいデータで試す。

### Phase 7 — Lint / Cleanup
- Design Lint等でstyle漏れを確認
- near-duplicate colorを整理
- layer名を整理
- hidden/obsolete layerをARCHIVEへ

### Phase 8 — Human Optical Pass
人間が直接Figmaで:
- 1〜2mmの位置
- 写真crop
- 字間
- 見出しの optical alignment
を調整。

### Phase 9 — Print QA
- 原寸PDF
- 家庭/コンビニ試し刷り
- 折る
- MINTIAへ貼る
- 実際の距離で読む

---

## Figma構造
本番は 1 item = 1 file = 1 URL。

ファイル内:
- `00_README`
- `01_REFERENCE`
- `02_ASSETS`
- `03_FOUNDATIONS`
- `04_IDENTITY`
- `05_EXPLORATION`
- `06_CURRENT`
- `07_PRINT`
- `90_ARCHIVE`

ページ数制限時はSectionで同構造を作る。

## Auto Layout
- 関係する要素はAuto Layoutを基本にする。
- 文章量で動くブロックをabsolute positioningだけで組まない。
- 雑誌的な意図的オーバーラップだけabsoluteを許可。

## Variables / Styles
- 色はhardcodeを減らし、semantic namingを使う。
- Text Stylesを必須化。
- 同じ#値でも意味が違う場合はsemantic tokenを分ける。
- 逆に意味も見た目も同じnear-duplicateは統合する。

## Layer naming
NG:
- Rectangle 128
- Group 7
- Text 39

OK:
- `Cover/PrimaryPhoto`
- `Cover/DateBadge`
- `Seat/TableName`
- `Ticket/GuestName`
- `Guide/SafeArea`

## AIに一度で任せないもの
- 4アイテム同時生成
- Identity + layout + print setup の同時生成
- 全写真cropの自動確定
- 完成デザインの一発生成

## AIに向くもの
- reference分解
- wireframe複数案
- style/variables作成
- repetitive layout
- guest name流し込み
- lint / QA
- 一括変更

## 人間に向くもの
- 最終写真選び
- 顔のcrop
- 字間/行間の最終判断
- 色の感覚的微調整
- 実物試し刷り判断

---

# Plugin Policy
プラグインは“たくさん入れる”ことを目的にしない。工程を改善するものだけ使う。

## Core候補
### Iconify
用途: Open-source vector iconの検索・SVG挿入。
ルール: 1アイテム内でicon setを統一する。

### Design Lint
用途: 未style、色/文字/半径などの不整合チェック。
本番前QA候補。

### Batch Styler
用途: Text/Color Styleの一括調整。
大幅なfont差し替えや色調整時に候補。

### Clean Document
用途: hidden layer、単層group、layer naming等のcleanup。
本番終盤で候補。

### Content Reel
用途: ダミーテキスト/画像の流し込み研究。
注意: 内蔵素材をそのまま最終印刷物へ使わず、あくまでprototype/data test用途を基本とする。

## Optional
- typography foundation系plugin
- color scale generator
- similar layer selection
- vector cleanup/vectorize

導入前に更新状況・ライセンス・破壊的変更の有無を確認する。

---

## Quality Gates
### QG1 Foundation
- styles/variablesあり
- gridあり
- safe/bleed/foldあり

### QG2 Layout
- 主役が3秒で分かる
- 読む順番が自然
- 余白が同階層で一貫

### QG3 Visual
- 装飾を20%減らしても成立する
- 色に役割がある
- アイコンstyle統一

### QG4 Content
- 実データでoverflowしない
- 最長文字列で壊れない

### QG5 Print
- 原寸で読める
- safe area違反なし
- 折りで重要情報が消えない
- 本番素材の権利が明確
