# 29 Fixed Asset Production Queue

更新: 2026-07-29

## 目的
Figma本番前に作る固定素材を、優先順位・依存関係・完了条件つきで管理する。

Status:
- `TODO`
- `IN_PROGRESS`
- `REVIEW`
- `ASSET-FROZEN`
- `REJECTED`

## P0 — るるぶWEDDING
1. `RURUBU-LOGO-01` — 誌名ロゴ `るるぶWEDDING`
   - Priority: P0
   - Status: TODO
   - 完了条件: 30mm幅 / 写真上 / 白背景 / モノクロで読める
2. `RURUBU-BADGE-DATE` — `2026.10.24 SAT`
   - Priority: P0
   - Status: TODO
3. `RURUBU-LABEL-SET` — SPECIAL / PROFILE / Q&A / OUR STORY / TRIP MAP / MEMORY SPOTS / THANK YOU
   - Priority: P0
   - Status: TODO
4. `RURUBU-ARROW-SET` — 矢印 / 区切り
   - Priority: P1
   - Status: TODO
5. `RURUBU-STAMP-SET` — CHECK / PICK UP / BEST 3 / NEW
   - Priority: P1
   - Status: TODO
6. `RURUBU-ROUTE-SET` — map pin / dotted route / compass
   - Priority: P1
   - Status: TODO
7. `RURUBU-CAPTION-SET` — photo caption 2系統
   - Priority: P1
   - Status: TODO

## P1 — WEDDING PASSPORT
1. `PASSPORT-EMBLEM-01` — 表紙エンブレム
   - Priority: P0
   - Status: TODO
2. `PASSPORT-WORDMARK-01` — WEDDING PASSPORT + YOKOHAMA + DATE
   - Priority: P0
   - Status: TODO
3. `PASSPORT-STAMP-SET` — ARRIVAL / DEPARTURE / APPROVED
   - Priority: P1
   - Status: TODO
4. `PASSPORT-HEADING-SET` — MENU / DRINK / SEATING CHART
   - Priority: P0
   - Status: TODO
5. `PASSPORT-MAP-01` — 薄い世界地図
   - Priority: P1
   - Status: TODO
6. `PASSPORT-ROUTE-SET` — dotted route / tiny plane
   - Priority: P1
   - Status: TODO
7. `PASSPORT-TABLE-LABEL` — 卓名/卓番号固定フレーム
   - Priority: P1
   - Status: TODO

## P2 — BOARDING PASS
1. `BOARDING-WORDMARK-01` — BOARDING PASS見出し
2. `BOARDING-LABEL-SET` — GUEST NAME / TABLE / GATE / FROM / TO / DATE
3. `BOARDING-STUB-01` — 半券枠
4. `BOARDING-PERFORATION-01` — ミシン目
5. `BOARDING-TABLE-HERO` — TABLE番号強調
6. `BOARDING-BARCODE-01` — decorative barcode
7. `BOARDING-ROUTE-01` — map/route background

## P3 — 青春ふたりきっぷ
1. `TICKET-LOGO-01` — 青春ふたりきっぷ
2. `TICKET-SUBTITLE-01` — WEDDING JOURNEY TICKET
3. `TICKET-GUILLOCHE-01` — 地紋
4. `TICKET-BORDER-01` — 二重罫線
5. `TICKET-STAMP-RED` — 赤スタンプ
6. `TICKET-STAMP-BLUE` — 青スタンプ
7. `TICKET-TRAIN-01` — 小型レトロ電車
8. `TICKET-SERIAL-01` — 発行番号style

## 制作原則
- 変更しない素材はFigma前に完成させる。
- 生成AIで十分なら生成AIを使う。
- 正確な文字・名前・席次はAI画像へ焼き込まない。
- 透過が崩れる場合は chroma-key fallback を使う。
- rasterで完成して問題ない素材を無理にvector化しない。
- 小サイズ素材は最終利用寸法で必ず確認する。

## Freeze Gate
`ASSET-FROZEN` にするには以下を満たす。
- [ ] 役割が明確
- [ ] 既存ブランド/公的券面の直接コピーではない
- [ ] 予定サイズで破綻しない
- [ ] 背景透過または配置背景が確定
- [ ] Driveにproduction assetを保存
- [ ] Gitに生成条件/出典/採用理由を記録
