# ADD-15 — FIGMA PLACEMENT BRIEF

Status: `CURRENT / PREPARED_FOR_FIGMA`
Authority: GitHub `main`

## Current restriction

Current authorityの実行規則により、現時点ではFigmaを使用しない。以下はwrite許可後の実制作契約であり、Figma上の完成を意味しない。

## Page and frame plan

追加アイテム専用ページが正式に作成可能になった後、次の構造を使用する。

- page: `04_ADDITIONAL_WEDDING_ITEMS`
- section: `ADD-15_CUISINE_DESTINATION_STORY_CARDS`
- primary prototype: `FRAME_ADD15_CARD_PROTO_100X148`
- alternate prototype: `FRAME_ADD15_CARD_PROTO_148X100`
- family review: `FRAME_ADD15_FAMILY_REVIEW`
- print proof: `FRAME_ADD15_ACTUAL_SIZE_PROOF`

既存のるるぶWEDDINGページ、editorial system、完成済み4種のsemantic nodeへwriteしない。

## Prototype sequence

### Pass 1 — content architecture

- Model AまたはModel Bの確定内容を1枚だけ配置
- 写真なしでも成立する文字・余白・罫線構成を先に作る
- 料理名/目的地名、本文、補助情報の自然な改行を決める
- bleed / trim / safe guideを配置

### Pass 2 — media treatment

正式写真がある場合だけreplaceable image fillを追加する。

- hero比率は内容に合わせて決める
- すべてのカードで同じ写真枠を強制しない
- crop focal pointを記録する
- dark / bright photographyの両ケースを確認する

### Pass 3 — family differentiation

複数枚が必要な場合、次を共有する。

- type hierarchy
- margins and baseline logic
- rule weight
- semantic naming
- export dimensions

次は内容ごとに編集判断する。

- image ratio
- accent position
- copy block width
- whitespace distribution
- route/detail motif

## Primary composition

100 × 148 mm portrait:

- upper 12–20%: eyebrow / course phase / table identifier
- primary title: optical left alignment; title lengthに応じて幅を調整
- story body: rigid fixed-height boxに押し込まない
- fact/allergen note: lower information rail。ただし本文と競合する場合は裏面・別案内へ分離
- optional image: title・本文の読み順を壊さない位置へ配置
- lower edge: holder obstruction allowanceを確保

## Art-direction controls

- 温かいアイボリーを標準地にするが、写真や紙との相性で調整可能
- deep navy / near-blackを主文字色
- accentは内容確定後に1色だけ
- metallic silverは細線のみ。グラデーションで金属感を偽装しない
- 角丸矩形の反復を避ける
- decorationは本文の意味に関連するときだけ置く
- 写真が弱い場合、装飾で救済せず写真不使用案を優先する

## Semantic preservation

Create and preserve:

- `FRAME_ADD15_CARD_[ID]`
- `BG_PAPER_FIELD`
- `IMG_HERO_REPLACEABLE`
- `TXT_EYEBROW`
- `TXT_PRIMARY_TITLE`
- `TXT_SECONDARY_TITLE`
- `TXT_STORY_BODY`
- `TXT_FACT_NOTE`
- `TXT_ALLERGEN_REFERENCE`
- `DECOR_EDITORIAL_RULE`
- `DECOR_ROUTE_ORIGIN`
- `GUIDE_BLEED`
- `GUIDE_TRIM`
- `GUIDE_SAFE`
- `GROUP_PLACEHOLDER_NOT_FOR_EXPORT`

既存nodeのrename、flatten、detach、rasterizeは具体的な必要性と証拠がない限り行わない。

## Screenshot review questions

- 料理紹介か旅先紹介か、一目で役割が理解できるか
- メニュー本体やADD-02卓サインと役割が重複していないか
- 料理と国の関係を誤認させないか
- 見出しが写真や装飾に負けていないか
- 余白が「空いたから埋める」装飾で汚れていないか
- 複数枚が同じテンプレートの色違いに見えないか
- 小型印刷物として本文が実寸で読めるか
- アレルゲン参照が曖昧または過度に保証的でないか

## Evidence-driven correction order

1. factual error / misleading relation
2. allergen and safety ambiguity
3. unreadable type / overflow
4. weak hierarchy
5. holder or table obstruction
6. photo crop / contrast
7. decorative excess

## Current declaration

`PLACEMENT_BRIEF_READY / FIGMA_WRITE_NOT_AUTHORIZED / SCREENSHOT_QA_NOT_STARTED`
