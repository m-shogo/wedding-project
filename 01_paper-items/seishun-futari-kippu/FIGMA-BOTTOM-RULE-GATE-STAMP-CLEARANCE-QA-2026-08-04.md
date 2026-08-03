# 青春ふたりきっぷ｜下罫線と青い改札印の干渉修正

- 実施日: 2026-08-04
- 対象: Figma production `01_LABEL / FRAME_LABEL` (`11:2`)
- Figma file key: `v7rIRHv8YKQXG0LYD0I5OA`
- 開始時 GitHub main: `6994bf756c51e9e79f09bfb980950d2f24ae2f05`
- るるぶWEDDING領域: read/writeとも対象外。変更なし。

## 問題定義

ライブFigmaの自然サイズスクリーンショットと構造値を照合した結果、下罫線 `RULE_212` が青い改札印 `DECOR_GATE_STAMP` の楕円内を横断していた。

- 下罫線: `x=22, y=212, width=676`（右端698）
- 青い改札印: `x=574, y=170, width=94, height=48`（右端668・下端218）
- 罫線と印章の横方向交差: 94 units

罫線のy座標212は印章の上下範囲170〜218に含まれ、楕円の下部を端から端まで横切っていた。印章が後から押された物理券面というより、罫線と装飾が機械的に重なった見え方になり、右下の視認性を弱めていた。

## rollback-safe proof

`99_QA`へproduction複製を作成した。

- proof node: `36:2`
- name: `BOTTOM_RULE_GATE_STAMP_CLEARANCE_PROOF_2026_08_04`
- proof内変更node: `36:50 / RULE_212`
- width: `676 → 536`

罫線右端を `x=558`にし、改札印左端 `x=574`まで16 unitsの明確な空きを確保した。proofの自然サイズスクリーンショットで、下罫線が印章へ侵入せず、左側のDATE・FROM・DESTINATIONブロックを支える区切りとして成立することを確認した。

## production変更

productionでは `11:50 / RULE_212`のみ変更した。

- x: `22` 維持
- y: `212` 維持
- width: `676 → 536`
- 右端: `698 → 558`
- 青い改札印左端までの余白: `16 units`

削除、flatten、画像化、全面置換、文字変更、素材変更、frame寸法変更は行っていない。

## スクリーンショットQA

修正後のproduction `11:2`を自然サイズ `720 × 250`で確認した。

- 下罫線が青い改札印内部を横断しない
- 改札印の楕円輪郭と内部文字が独立して読める
- 下罫線はDATE・FROM・DESTINATIONブロック下の区切りとして維持
- タイトル、英字副題、経路、日付、電車、祝スタンプ、シリアルを維持
- clipping、欠落、新たな重なりなし
- production frame寸法、semantic node、native textを維持

## Drive

青春ふたりきっぷのCurrent資料、参考分析、正本フォルダ参照をライブ確認した。今回の欠陥はFigma native lineの長さであり、Drive変更・素材再生成は0件。

## 状態

`LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / UPPER_RIGHT_CLEARANCE_FIX_APPLIED / LIVE_PRINT_GEOMETRY_AUDITED / MICROTYPE_PRINT_LEGIBILITY_FIX_APPLIED / LIVE_CONTRAST_QA_PASS / TOP_RULE_STAMP_CLEARANCE_FIX_APPLIED / BOTTOM_RULE_GATE_STAMP_CLEARANCE_FIX_APPLIED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`

残る主要BLOCKは、実物ミンティア貼付面の幅・高さ・角丸・非接着領域、印刷会社の塗り足し・安全域・最小再現文字／線幅仕様、100%試し刷り、実物貼付確認、最終PDF校正。