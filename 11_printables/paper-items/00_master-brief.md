# ペーパーアイテム制作 Master Brief

更新: 2026-07-29

## 目的
2026-10-24の結婚式で使用する4種のペーパーアイテムを、旅行テーマで統一しつつ、印刷物として成立する品質まで詰めるための最上位仕様書。

この文書は完成デザインではない。参考収集、画像生成、Figma検証、今後の修正で判断がぶれないためのCurrent Authorityとして扱う。

## 対象
1. WEDDING PASSPORT
2. るるぶWEDDING
3. 航空チケット風エスコートカード
4. 青春ふたりきっぷ風ミンティアラベル

## 制作原則
- テーマは旅行。
- 現在のAI画像/Figma検証版は方向性確認であり最終版ではない。
- 最終版では実写真を使用し、新郎新婦・家族・友人・犬をAIで別人化しない。
- 実在の旅券、航空会社、JR等のロゴ・真正券面をコピーしない。
- 「本物っぽい」より、結婚式で美しく、読めて、使いやすいことを優先する。
- Figma本制作は、構成・原稿量・サイズ・印刷方式がほぼ決まった後に行う。
- 最後の1〜2mmの光学調整と写真トリミングは人間が直接Figmaで行える編集構造を保つ。

## 共通デザイン言語
- 上質な旅行エフェメラ
- 少しレトロ、ただし古びすぎない
- 余白を意識し、装飾を詰め込みすぎない
- 共通モチーフ: スタンプ、地図線、航路/路線、番号、罫線、エンブレム
- 共通ベース色: Navy / Ivory
- 補助色: Sky / Mint / Sage / muted Red / Yellow / restrained Gold

## 情報優先順位
### PASSPORT
1. 冊子としての格調
2. MENU / DRINK / SEATINGの可読性
3. 日付・開催地
4. 世界観装飾

### るるぶWEDDING
1. 誌名と表紙写真
2. 日付
3. プロフィール/歴史/旅行マップ
4. ゲストが読みたくなる小ネタ

### BOARDING PASS
1. GUEST NAME
2. TABLE
3. DATE / VENUE
4. 航空券らしい補助情報

### 青春ふたりきっぷ
1. 青春ふたりきっぷ
2. 新郎駅 → 新婦駅 → 未来行き
3. 2026.10.24
4. 記念券らしい地紋・印・番号

## 現時点の固定事項
- るるぶの誌名: `るるぶWEDDING`
- 青春ふたりきっぷは表面のみ
- PASSPORT: 濃紺/アイボリー/控えめな金
- るるぶ: 空色/黄/赤/白。中面はアイボリー寄り
- BOARDING PASS: アイボリー/濃紺、右半券
- 青春ふたりきっぷ: セージ/生成り/赤青スタンプ

## 未確定事項
- 最終の新郎新婦表記
- 実写真
- MENU / DRINK原稿
- ゲスト名・卓名・席次
- るるぶの掲載項目と文字量
- 実際に買うMINTIAと実測サイズ
- 印刷会社/印刷方式/紙/加工/部数
- 本番フォントと色コード

## Figma proof of capability
検証ファイル:
https://www.figma.com/design/DqO7m0852QP7soyXYczt6I

Starterプラン制限により1ページ内4 Sectionで構築。最終版もSection方式で問題ない。

## Drive Current Research
- Root: https://drive.google.com/drive/folders/14reXz-xiYANpyb0Q8iG4TbU8ecNuXurL
- Passport refs: https://drive.google.com/drive/folders/1w3o1GeLX1SgOFDxWHvhG9sg2KRxsleoH
- Rurubu refs: https://drive.google.com/drive/folders/1UC8SUfCDBqi3QgdEfYQFTdk4fXmrzjIK
- Boarding refs: https://drive.google.com/drive/folders/13Lr2OTYj1uWWO2812mCHR0fDIED6uj0d
- Ticket refs: https://drive.google.com/drive/folders/1y1qc2PEtv2i0U9tYtwoVl1gtWRxKTE9U

## 戻りを減らす工程
1. 参考/素材収集
2. 参考を `STRONG / PARTIAL / REJECT` に選別
3. 面構成を確定
4. 実原稿・写真・ゲスト情報を収集
5. 印刷仕様を確定
6. Design Freeze v1
7. Figma正式制作
8. 実データ流し込み
9. QA
10. 人間の光学調整
11. 原寸試し刷り
12. 入稿

## Figma開始ゲート
以下7項目中最低6つが揃うまで、本番FigmaをDesign Freeze扱いにしない。
- [ ] デザイン方向性
- [ ] 参考選別
- [ ] 面構成
- [ ] 実寸
- [ ] 写真枚数
- [ ] 本文のおおよその文字量
- [ ] 印刷方式

## 参照順
1. この文書
2. 各アイテムspec
3. `05_design-rules.md`
4. `06_prefigma-readiness.md`
5. `07_prompt-library.md`
6. Drive参考画像/素材
7. Figma検証版
