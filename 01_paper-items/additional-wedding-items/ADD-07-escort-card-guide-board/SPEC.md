# ADD-07 エスコートカード案内ボード — SPEC

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02
Authority: `m-shogo/wedding-project` `main`

## Purpose

完成済みBOARDING PASS型エスコートカードの受け取り場所で、ゲストが自分の名前を探し、カードを取り、記載された卓へ進む行動を迷わず理解できる案内ボード。

BOARDING PASS本体は完成済み正本として改変・複製しない。案内ボードは券面の巨大版ではなく、空港の搭乗口サインとホテルのコンシェルジュ案内を融合した独立アイテムとして制作する。

## Format

- Primary: A2 portrait, 420 × 594 mm
- Compact alternative: A3 portrait, 297 × 420 mm（比例縮小ではなく再レイアウト）
- Bleed: 3 mm
- Safe area: 仕上がりから15 mm以上
- Viewing distance: 約2–4 m
- Installation assumption: イーゼルまたは受付近くの自立スタンド

## Art direction

Concept: **BOARDING GATE / QUIET DEPARTURE HALL**

- 温かいアイボリーを主面、深いネイビーを情報軸、ミントとシルバーを誘導情報へ限定する
- 左上から右下へ流れる非対称の導線で「探す → 取る → 卓へ進む」を表す
- 大見出し、短い説明、3つの行動を一続きの編集構成として見せる
- 同じ大きさの角丸カードを3枚並べるUI表現は禁止
- 飛行機、スタンプ、バーコードを意味なく追加しない
- BOARDING PASSの色・罫線・スタブをそのまま拡大流用しない
- ゲスト名一覧や卓番号一覧はボードへ焼き込まず、カード配置そのものに委ねる

## Editable copy

確定候補としてFigma上で編集可能に保持する。

- Main: `BOARDING GATE`
- Japanese title: `エスコートカードをお取りください`
- Lead: `お名前のカードを見つけて、記載されたテーブルへお進みください。`
- Step 01: `FIND YOUR NAME / お名前を探す`
- Step 02: `PICK UP YOUR TICKET / カードを取る`
- Step 03: `FIND YOUR DESTINATION / 行き先の卓へ`
- Date: `2026.10.24`
- Location: `YOKOHAMA`

受付方法やカード並び順が未確定の場合、アルファベット順・五十音順などを事実として記載しない。

## Layout zones

- `ZONE_GATE_HEADER`: 上部18–22%。大見出しと日付
- `ZONE_PRIMARY_INSTRUCTION`: 中央上部20–25%。日本語を最優先
- `ZONE_ACTION_ROUTE`: 中央35–42%。3行動を一本の導線で接続
- `ZONE_DESTINATION_NOTE`: 下部12–16%。卓へ進む補助文
- `ZONE_DECOR_TERMINAL_EDGE`: 右端または左下の一方向のみ

## Semantic node names

- `FRAME_ADD07_A2_PORTRAIT`
- `BG_ESCORT_GUIDE_PAPER`
- `TXT_BOARDING_GATE_TITLE`
- `TXT_ESCORT_GUIDE_JA_TITLE`
- `TXT_ESCORT_GUIDE_LEAD`
- `GROUP_ACTION_ROUTE`
- `TXT_ACTION_01`
- `TXT_ACTION_02`
- `TXT_ACTION_03`
- `DECOR_ACTION_NODE_01`
- `DECOR_ACTION_NODE_02`
- `DECOR_ACTION_NODE_03`
- `TXT_WEDDING_DATE`
- `TXT_WEDDING_LOCATION`
- `DECOR_TERMINAL_EDGE`

## Production decision

文字、導線、行動ノード、方向記号はFigma native text/vectorで構築する。完成済みBOARDING PASSのスクリーンショットや券面画像を装飾として貼らない。具体的な視認性欠陥が確認されるまで新規production rasterは作らない。
