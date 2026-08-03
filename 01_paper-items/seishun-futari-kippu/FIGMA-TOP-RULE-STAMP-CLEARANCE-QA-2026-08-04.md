# 青春ふたりきっぷ｜上罫線と祝スタンプの干渉修正

- 実施日: 2026-08-04
- 対象: Figma production `01_LABEL / FRAME_LABEL` (`11:2`)
- Figma file key: `v7rIRHv8YKQXG0LYD0I5OA`
- 開始時 GitHub main: `d6780e63d895a21e0c4cf336d433435f3f20d284`
- るるぶWEDDING領域: read/writeとも対象外。変更なし。

## 問題定義

ライブFigmaの自然サイズスクリーンショットで、上罫線 `RULE_38` が赤い祝スタンプ `DECOR_SHUKU_STAMP` の円内を横断していた。構造値でも、罫線は `x=22, width=676`（右端698）、スタンプは `x=624, width=74`（右端698）であり、罫線がスタンプ領域を74 units横切る状態だった。

この交差は、印章が後付けされた物理印刷物というより、装飾同士が機械的に重なった見え方になり、右上の情報階層を弱めていた。

## rollback-safe proof

`99_QA`へproduction複製を作成した。

- proof node: `35:2`
- name: `TOP_RULE_STAMP_CLEARANCE_PROOF_2026_08_04`
- proof内変更node: `35:49 / RULE_38`
- width: `676 → 586`

罫線右端を `x=608`にし、券番号・人数表記の右端と揃えながら、スタンプ左端 `x=624`まで16 unitsの明確な空きを確保した。

## production変更

productionでは `11:49 / RULE_38`のみ変更した。

- x: `22` 維持
- y: `38` 維持
- width: `676 → 586`
- 右端: `698 → 608`

削除、flatten、画像化、全面置換、文字変更、素材変更は行っていない。

## スクリーンショットQA

修正後のproduction `11:2`を自然サイズ `720 × 250`で確認した。

- 上罫線が祝スタンプ内部を横断しない
- 罫線終端と券番号・人数表記の右端が揃う
- 罫線終端からスタンプまで16 unitsの空きがある
- タイトル、英字副題、経路、日付、FROM、DESTINATION、電車、青い改札印、下罫線、シリアルを維持
- clipping、欠落、新たな重なりなし
- production frame寸法とsemantic nodeを維持

## Drive

青春ふたりきっぷのCurrent資料、参考分析、正本フォルダ参照をライブ確認した。今回の欠陥はFigma native lineの長さであり、Drive変更・素材再生成は0件。

## 状態

`LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / UPPER_RIGHT_CLEARANCE_FIX_APPLIED / LIVE_PRINT_GEOMETRY_AUDITED / MICROTYPE_PRINT_LEGIBILITY_FIX_APPLIED / LIVE_CONTRAST_QA_PASS / TOP_RULE_STAMP_CLEARANCE_FIX_APPLIED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`

残る主要BLOCKは、実物ミンティア貼付面の幅・高さ・角丸・非接着領域、印刷会社の塗り足し・安全域・最小再現文字／線幅仕様、100%試し刷り、実物貼付確認、最終PDF校正。