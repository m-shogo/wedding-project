# 13 るるぶWEDDING — Reference Selection

更新: 2026-07-29
Status: Pre-Figma / Current

## 目的
Driveの表紙参考と現在方向性ラフを、`STRONG / PARTIAL / REJECT` に選別し、Figma前のアートディレクションを明確にする。

## Current rough評価
対象: `参考_現在の方向性ラフ_るるぶWEDDING.png`

### 良い
- `るるぶWEDDING` を主役にする発想
- 青空 / 横浜 / 黄バッジの旅行雑誌感
- 表紙と裏表紙を1セットで考えている
- 日付を独立badgeにしている

### 弱い
- 既存るるぶへの寄せ方が直接的で、オリジナルIdentityが弱い
- `るるぶ` と `Wedding` のロゴ構造がまだ“生成画像の文字”に見える
- AI新郎新婦が主役になっており、本番で使えない
- 見出しのhierarchyより“文字を置いた量”が先に見える
- 表紙の装飾・見出し・写真がほぼ同じ強さ
- 裏表紙のクラフト/スクラップが表紙と別ブランドに見える
- `THE THE JOURNEY CONTINUES....` 等、AI生成文字の不自然さが残る

結論: `DIRECTION ONLY / REBUILD`。
本番Figmaへの直接トレース禁止。

---

# 表紙reference

## R01 — 大胆タイトルと特集見出し
Decision: `STRONG`

採用する要素:
- 大きなmastheadを最初に読ませる
- 主役写真とタイトルを同じ強い軸へ置く
- barcode / issue no. / small labelsで“雑誌”の細部を作る
- 中面のAbout usで情報を整然と見せる考え方

採用しない:
- black-heavy palette
- fashion/editorial寄りの無機質さ

Transfer:
`るるぶWEDDING` の文字を最も強くし、issue/date/detailsは小さく制御する。

## R02 — 海外雑誌系の色面構成
Decision: `PARTIAL`

採用する要素:
- 強い色面をページの一部だけに使う
- 写真 + text + color blockをgridで分離
- 中面で話題を複数blockに分ける

採用しない:
- orange single-color dominance
- fashion magazine tone

Transfer:
Sky / Yellow / Redを“同じ面積”で使わず、1色をmain block、他をsmall accentsへ。

## R03 — 写真主役 / 静かな誌面
Decision: `STRONG FOR INSIDE/BACK`

採用する要素:
- 写真を大きく使う
- 余白を取る
- 中面/裏表紙の密度を下げる
- 全面を同じテンションにしない

採用しない:
- 表紙まで静かにしすぎること

Transfer:
表紙はR01寄り、中面/裏表紙はR03の静けさを混ぜる。

## R04 — generic wedding reception
Decision: `REJECT AS ART DIRECTION / PARTIAL FOR PHYSICAL MOCKUP`

理由:
- 結婚式プロフィールブックとしては整っているが、旅行雑誌の個性が弱い
- 今回の“るるぶWEDDING”を普通のWedding Receptionへ戻してしまう

残す用途:
- 紙・写真面積・実物mockupの参考のみ

## R05 — 縦長写真 + 小見出し / food editorial
Decision: `PARTIAL`

採用する要素:
- 写真主役coverの整理
- food / recommendationを小さな旅行記事のように見せる中面
- 一部で縦長写真を大胆に使う

採用しない:
- 表紙のgeneric WEDDING表現
- 余白が多すぎて“るるぶ”の高揚感が消える方向

## R06 — 複数写真 + article / history
Decision: `STRONG`

採用する要素:
- coverの自然なcouple photo
- About us collage
- HISTORY line
- Q&A / article layout
- 写真と本文のサイズ差

注意:
- cutout collageを増やしすぎない
- 全ページで同じbubble/handwritten表現を使わない

## R15 — 写真1枚のminimal A5
Decision: `REJECT FOR COVER / PARTIAL FOR SCALE`

用途:
- A5の写真面積感
- 物理サイズの参考

理由:
- 旅行雑誌らしい情報階層がなく、今回の方向性には静かすぎる

---

# 現時点の合成方向

## 表紙
`R01 45% + R06 30% + current roughのSky/Yellow travel energy 25%`

- Logoを最大要素
- 実写真1枚を主役
- 補助写真は0〜2枚
- 特集見出しは3〜5本
- date badge 1つ
- issue/serial等のmicro detailsは小さく

## 中面
`R06 40% + R03 35% + R02のcolor block 25%`

- Profile / Q&A / Historyを読み物として整理
- BackgroundはWarm Ivory中心
- 色blockは1ページ2〜3箇所程度
- 写真の大小差を明確にする

## 裏表紙
`R03 50% + current roughのtravel scrapbook 30% + R01 micro details 20%`

- 表紙より静か
- 写真2〜4枚
- THANK YOU
- 小さなstamp / ticket / route
- craft紙全面にはせず、共通Ivory/Skyとの接点を残す

---

# Logo方向
`るるぶWEDDING` は本番Figma前に独立Identity工程を行う。

候補3方向:
1. **Rounded Travel Masthead** — 太い丸ゴシックをベースに、文字ごとの色面/outlineを整理
2. **Editorial Pop** — 太い日本語masthead + 細いWEDDINGの対比
3. **Stamped Travel Issue** — 文字は読みやすく、背景badge/labelで旅行雑誌感を追加

禁止:
- 既存るるぶロゴのトレース
- AI生成された誤字文字をvectorizeしてそのまま使用
- 4文字全部を別色・別形へしすぎる

## 次のDesign Freeze前タスク
- Logoをモノクロ3方向で比較
- Cover wireframe 3案
- 内面wireframe 2案
- 裏表紙wireframe 2案
- 実写真候補が来るまではPHOTO placeholderで進める

まだFigma本制作は開始しない。
