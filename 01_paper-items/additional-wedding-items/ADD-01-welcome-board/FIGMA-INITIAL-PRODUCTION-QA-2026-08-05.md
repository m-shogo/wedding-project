# ADD-01 ウェルカムボード｜Figma初回production・QA

- 実施日: 2026-08-05
- 開始時 GitHub main: `18dca886c2a5d881280cc55be330273c97c5bb26`
- write直前 GitHub main: `e01afe347eebf6c261346629662df37ab305255a`
- Figma production: https://www.figma.com/design/XyyTGuz6BMf8XRhPZZfdoT
- Production node: `1:3 / FRAME_ADD_01_WELCOME_A2_PORTRAIT`
- Rollback proof: `1:26 / QA_ADD_01_INITIAL_PRODUCTION_PROOF_2026_08_05`
- Google Drive ADD-01 root: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`
- るるぶWEDDING領域: read/writeとも対象外。変更なし。

## Current authority判断

WEDDING PASSPORTは11卓×最大7名のnative placeholder耐性まで確認済み。BOARDING PASSは構造・stub長名・ライブ印刷geometry監査後、残りが印刷業者仕様と確定文言のみ。青春ふたりきっぷは構造、可変文字、microtype、コントラスト、上下罫線と印章の干渉修正まで完了し、ライブproduction screenshotでも再発なし。3アイテムは `DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY` 相当として、物理・正式入力を保留しADD-01へ進行した。

## 実変更

新規Figma design fileを作成し、ADD-01をSPEC/PREPARED状態から実制作へ進めた。

### Production構造

- frame: `852 × 1200` Figma units（A2仕上がり420×594 mm＋四辺3 mm塗り足しを2 units/mmで表現）
- `clipsContent=true`
- child nodes: 22
- visible out-of-bounds nodes: 0
- pages:
  - `01_PRODUCTION`
  - `99_QA`

### Semantic editable nodes

- `BG_WELCOME_BASE`
- `IMG_WELCOME_HERO_PLACEHOLDER`
- `TXT_WELCOME_TITLE`
- `TXT_WELCOME_SUBCOPY`
- `TXT_COUPLE_NAMES`
- `TXT_WEDDING_DATE`
- `TXT_WEDDING_LOCATION`
- `TXT_HERO_PHOTO_PLACEHOLDER`
- `DECOR_ROUTE_LINE_01`
- `DECOR_TRAVEL_BADGE_01`
- `DECOR_COMPASS_01`

可変情報はすべてnative editable textまたは差し替え可能なshapeとして保持した。実在名・未確定会場名・架空の確定情報は使わず、`[COUPLE NAMES]`、`[VENUE PLACEHOLDER]`、photo placeholderを明示した。flatten、画像化、人物生成は行っていない。

### 非export guide

- `GUIDE_BLEED_3MM_NON_EXPORT`
- `GUIDE_TRIM_420x594_NON_EXPORT`
- `GUIDE_SAFE_20MM_NON_EXPORT`

3 guideはproduction内に保持し、通常表示は`visible=false`とした。

## Screenshot QA

whole-item screenshotで確認:

- title → subcopy → hero photo → route → names → date/locationの情報階層が成立
- hero photo領域が主役で、装飾は写真・氏名より前へ出ない
- 同一角丸カードUI、過剰な影、gradient、均等バッジ群を不使用
- travel badgeとcompassは各1点に抑制
- photo、氏名、会場名は画像へ焼き込んでいない
- clipping、欠落、canvas外逸脱なし

reading/detail structure readback:

- title: Noto Serif JP Bold / 50
- names: Noto Serif JP Bold / 34
- date: Noto Sans JP Bold / 20
- location: Noto Sans JP Regular / 15
- hero placeholder: `660 × 610`
- hidden guide readback: PASS
- native text nodes: 8

## Drive

Drive rootと既存WB-01〜WB-04の実在をライブ確認した。今回の初回productionはnative構造とplaceholderを先に成立させたため、Drive assetの上書き・再生成・新規保存は0件。

## 状態

`FIGMA_INITIAL_PRODUCTION_CREATED / WHOLE_ITEM_QA_PASS / NATIVE_EDITABLE_STRUCTURE_PASS / SEMANTIC_PLACEHOLDERS_PASS / ROLLBACK_SAFE / FINAL_PHOTO_AND_COPY_PENDING / NOT_PRINT_READY`

## DEFERRED_FINALIZATION

- 最終hero写真選定とcrop
- couple-name表記
- 会場名
- 最終subtitle
- A2/A3最終決定
- panel/foamboard/frame仕上げ
- 印刷業者profileに基づくPDF export
- 100%実寸・3 m視認性・現物確認

これらは全体進行を止めない。次回はADD-01を最終データ待ちの完成候補へ上げられるか監査し、主要欠陥がなければADD-02 11卓の国別テーブルサインへ進む。
