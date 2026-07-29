# 32 Rurubu Wedding — Fixed Asset Generation Log

更新: 2026-07-29

## 目的
るるぶWEDDING固定素材の生成・比較・不採用理由を記録し、Figma本番前に`ASSET-FROZEN`へ昇格できる状態にする。

## Batch R0 — direction asset sheet
Status: `REVIEW`

生成対象:
- るるぶWEDDING masthead候補
- date badge
- feature ribbons
- CHECK / PICK UP / INFO stamp
- travel icon / scrapbook accents

観察:
- 明るいtravel-magazine感は有効。
- 3ブロックに分かれた「るるぶ」処理は視認性が高いが、既存誌ロゴへ近づきすぎない再設計が必要。
- Ribbonは立体感が強く、今回の最終誌面ではもう少しflat/editorialへ寄せる余地がある。
- CHECK / PICK UP系は使える方向。ただし一枚の誌面で多用せず1〜2個まで。
- icon類は方向性確認には有効。最終は線幅・角丸・色数を統一する。

判定:
- masthead: `REBUILD / KEEP DIRECTION`
- date badge: `PARTIAL`
- feature ribbon: `PARTIAL`
- stamps: `PARTIAL`
- travel icons: `PARTIAL`
- scrapbook tape: `PARTIAL`

## Batch R1 — masthead isolation
目的:
- `るるぶWEDDING`ロゴだけに集中して比較する。
- 完成assetに近い形で、背景に依存しない候補を出す。

比較する方向:
A. Editorial Rounded
- るるぶを一続きの誌名として読ませる
- rounded / friendly
- WEDDINGはsmall condensed subline
- 既存誌コピー感を下げる

B. Travel Label
- るるぶ文字自体は読みやすく保つ
- 周囲のlabel/tabで旅行感を出す
- 形の面白さは外周で作る

C. Modern Pop Magazine
- 太いJapanese masthead
- white keyline / clean shadow最小限
- 3色以内
- 写真上でも強い

D. Premium Fun
- 上品65 + 楽しさ35を最も強く反映
- Navyを少量入れて全体を締める
- 子供向けロゴに見せない

## Freeze前QA
- 30mm幅で読める
- 白背景で成立
- 写真上で成立
- grayscaleで誌名が残る
- `WEDDING`が副題として読める
- 既存ブランドの直接コピーではない
- AI文字崩れが残る場合は不採用または文字部だけ再構築
- masterは透過RGBAを優先

## FB loop
候補が弱い場合は同じpromptを反復しない。
1. 問題を `TEXT / SHAPE / COLOR / HIERARCHY / LEGIBILITY / COPY-RISK` に分類
2. promptを局所修正
3. 生成AIが不得意ならFigma Draw / SVG / custom plugin / manual typeへroute変更
4. 改善結果をこのlogへ記録
