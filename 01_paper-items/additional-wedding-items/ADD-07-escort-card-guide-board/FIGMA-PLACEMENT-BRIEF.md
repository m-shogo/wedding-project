# ADD-07 エスコートカード案内ボード — FIGMA PLACEMENT BRIEF

Status: `PREPARED_FOR_FIGMA / WRITE_NOT_AUTHORIZED`
Date: 2026-08-02

## Current gate

Current authorityがFigma使用を明示的に許可するまで、ファイル作成・node追加・既存semantic node変更を行わない。

## File strategy

- ADD-07専用Figma fileまたは追加アイテム専用file内の独立pageを使用
- BOARDING PASS完成ファイルへ追記しない
- A2正本とA3リフローを別frameで管理
- A3はA2の比例縮小にしない

## Frame plan

### A2 primary

- `FRAME_ADD07_A2_PORTRAIT`: 420 × 594 mm相当
- `BG_ESCORT_GUIDE_PAPER`: full bleed
- 上部左寄りに`TXT_BOARDING_GATE_TITLE`
- 主役の`TXT_ESCORT_GUIDE_JA_TITLE`は英語見出しより大きく、中央上部へ
- `GROUP_ACTION_ROUTE`は左上から右下へ緩く下降
- 3工程は異なる余白と文字組みで連続させ、同サイズの箱へ入れない
- `TXT_WEDDING_DATE`と`TXT_WEDDING_LOCATION`は上部または端部の案内情報として小さく保持
- `DECOR_TERMINAL_EDGE`は片側のみ

### A3 compact

- 日本語タイトルとleadを短く再組版
- 3工程を縦方向に圧縮するが、線幅・文字サイズを単純縮小しない
- 補助英語は必要なら削減可能

## Typography hierarchy

1. `TXT_ESCORT_GUIDE_JA_TITLE`
2. `TXT_BOARDING_GATE_TITLE`
3. `TXT_ESCORT_GUIDE_LEAD`
4. `TXT_ACTION_01..03`
5. `TXT_WEDDING_DATE` / `TXT_WEDDING_LOCATION`

日本語案内が最優先。英語は旅行テーマの空気を作る補助情報とする。

## Build sequence

1. page/frame作成とsemantic naming
2. 背景・safe area・bleed guide
3. 日本語主案内と英語見出し
4. 非対称action routeと3ノード
5. 各action copy
6. 日付・横浜情報
7. 片側装飾
8. screenshot QA
9. evidence-driven修正
10. PDF/PNG exportとDrive readback
11. GitHub evidence更新

## Screenshot evidence required

- A2全体
- 主見出し＋leadの拡大
- 3工程導線の拡大
- 下端とイーゼル受け想定範囲
- A3リフロー全体

## Do not

- BOARDING PASSのframe/nodeをコピーしない
- semantic nodeを画像へ統合しない
- 3工程を均等なカードとして並べない
- 実在しないゲート番号、便名、QRコードを追加しない
- 具体的欠陥なしにDrive素材を再生成しない
