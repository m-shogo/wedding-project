# 30 Pre-Figma Exit Criteria

更新: 2026-07-29

## 目的
「そろそろFigmaで作ろう」を感覚で決めず、戻りが少ない状態まで前工程を完了したかで判断する。

## 共通Gate
### G1 Reference Freeze
- [ ] 参考画像を STRONG / PARTIAL / REJECT に分類済み
- [ ] REJECTを再びCurrentへ戻さない
- [ ] 参考画像の直接コピーをしないルールを確認

### G2 Identity Freeze
- [ ] ロゴ/wordmark方針が確定
- [ ] 固定スタンプ/バッジ/エンブレムの主要セットがASSET-FROZEN
- [ ] 共通色tokenが確定
- [ ] 共通装飾の線幅/角丸/影のルールが確定

### G3 Content Model
- [ ] 各面に載せる情報が決まっている
- [ ] 実原稿が未確定でも最大文字量を想定できる
- [ ] 写真の必要枚数/縦横比が分かる
- [ ] 長いゲスト名/長文のstress test条件がある

### G4 Physical Spec
- [ ] 仕上がりサイズ
- [ ] 折り位置
- [ ] bleed
- [ ] safe area
- [ ] 用紙/印刷方式の候補
- [ ] 本番入稿PDF要件

### G5 Tooling
- [ ] Wedding Print Toolkit Typography QAがFigma DesktopでVERIFIED
- [ ] Design Token bootstrapがVERIFIED
- [ ] CSV量産方法が決定（既存Plugin / 自作Plugin / Figma native）
- [ ] 画像透過fallbackが動作確認済み
- [ ] 印刷preflight手段が決定

## アイテム別Gate
### るるぶWEDDING
- [ ] `るるぶWEDDING` ロゴ ASSET-FROZEN
- [ ] date badge / feature labels ASSET-FROZEN
- [ ] 表紙見出し 3〜5本の構造決定
- [ ] 中面の企画量をA4二つ折り4面へ収められる

### WEDDING PASSPORT
- [ ] emblem / wordmark ASSET-FROZEN
- [ ] MENU / DRINK / SEATING hierarchy確定
- [ ] 卓数/卓名の想定確定

### BOARDING PASS
- [ ] Guest Name / TABLE hero hierarchy確定
- [ ] 半券を実際に使うか決定
- [ ] 量産データ構造確定

### 青春ふたりきっぷ
- [ ] MINTIA実測
- [ ] sticker実寸
- [ ] title / border / stamp / guilloche ASSET-FROZEN

## Go判定
- `GO`: 共通G1〜G5が全PASS、対象アイテムGateも全PASS
- `CONDITIONAL GO`: 原稿/写真のみ後差替可能で、layout stress test用dummyがある
- `NO-GO`: 実寸、面構成、identity、印刷要件のいずれかが未確定

## 原則
Figma開始を急がない。ただし、Figmaで検証しないと決められない論点はproof fileで限定検証してよい。
proofをCurrent Productionへ無条件に昇格しない。
