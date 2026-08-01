# 追加ウェディングアイテム制作 — POSTMORTEM / REPEAT PREVENTION

Status: `MANDATORY / READ_BEFORE_EACH_RUN`
Date: 2026-08-01
Scope: 完成済み4種を除く追加ウェディングアイテム

この文書は過去の制作事故を再発させないための強制ルールである。一般的な注意事項ではなく、実際に起きた失敗ごとに原因・検知・防止・停止条件を定義する。

## 1. 同じ素材を何度も生成した

### 起きたこと
- 完了条件や次ポインタが曖昧なまま「進めて」を受け、同じロゴ・同じ構図・同じ役割の素材を再生成した。
- 生成後に状態がGitへ確定されず、次回も未完了と誤認した。

### 原因
- 会話記憶をCurrentとして扱った。
- GitとDriveの両方で既存物を検索しなかった。
- `ACCEPTED`、`REJECTED`、`NEXT`が1つの台帳に固定されていなかった。

### 強制対策
- 生成前にGitのitem-specific queueとDriveを検索する。
- 同じ役割・名前・構図が存在したら、採否と不足理由を確認するまで生成禁止。
- 各アイテムに`ACTIVE_NEXT`を1つだけ置く。
- 採用後は同じrun内でDrive IDとGit commitまで記録する。
- `COMPLETED` / `PLACEMENT_READY` / `ACCEPTED`は明示的なREMAKE指示なしで再生成禁止。

## 2. 画像生成後に処理が止まり、連続工程が完了しなかった

### 起きたこと
- 画像生成だけ実行し、透過、QA、Drive保存、Git更新、次素材への移行が止まった。
- 生成済みなのに「次も進める」状態へ到達しなかった。

### 原因
- 画像生成を1タスクの終端として扱った。
- 生成物を受け取った後のresume contractがなかった。

### 強制対策
- 1素材の完了単位は必ず `生成 → 後処理 → QA → Drive → Drive readback → Git → NEXT更新`。
- 画像生成だけでは状態を`GENERATED_ONLY`とし、完了扱い禁止。
- 次回runは`GENERATED_ONLY`を最優先で回収し、新規生成より先に後工程を閉じる。
- ツール仕様上そのrunで続行できない場合は、正確なBLOCKと生成物IDをGitへ残す。

## 3. Driveへ保存していないのに完了したように扱った

### 起きたこと
- ローカル生成またはGit記録だけで「Driveにもある」「完成」と誤認した。
- Drive uploadの成否をreadbackせず、存在を推測した。

### 原因
- 保存要求と存在確認を同一視した。
- Drive file IDを完了証拠として必須化していなかった。

### 強制対策
- 完了は三者一致のみ: `成果物実体 + Drive readback + Git commit`。
- Drive upload responseだけでなく対象フォルダのlist/searchで存在確認する。
- Drive file ID、ファイル名、MIME type、親フォルダをGitへ記録する。
- upload失敗・参照変換失敗は`DRIVE_UPLOAD_BLOCKED`で未完了。

## 4. Gitに残したと断言したが、commitを確認していなかった

### 起きたこと
- commit SHAや対象pathのreadbackなしで、Git更新済みのように報告した。

### 原因
- write request成功とmain反映を区別していなかった。

### 強制対策
- write後に対象ファイルをmainから再取得する。
- commit SHAと対象pathを報告する。
- readbackできない場合は`GIT_WRITE_UNVERIFIED`で完了禁止。
- 最新mainをwrite直前とwrite直後に確認する。

## 5. 完成済み4種へ戻り、担当範囲が衝突した

### 起きたこと
- るるぶWEDDING、青春ふたりきっぷ、BOARDING PASS、WEDDING PASSPORTへ再び戻る可能性が生じた。
- チャット側、Scheduled Task、Figma側の担当範囲が曖昧になった。

### 強制対策
- 完成済み4種はdenylist。参照以外のwrite禁止。
- 自動制作対象は追加8種だけ。
- Figma call、Figma probe、Figma編集は禁止。
- 対象pathが完成済み4種配下なら操作を中止し、追加8種の先頭未完了へ戻る。

## 6. 古い文書・古い会話をCurrentに戻した

### 起きたこと
- 過去checkpoint、古いDrive構成、旧方針を最新状態と誤認する危険があった。

### 強制対策
- Current入口は`CURRENT-AUTOMATION-PLAN.md`。
- 毎runで最新mainを読む。
- 古い資料はEvidence/History扱い。
- Currentと衝突した旧資料を根拠にwriteしない。
- pathがrun開始後に更新されていたら再読込して差分を再構成する。

## 7. 1枚に複数素材をまとめ、本番利用しにくくした

### 起きたこと
- 比較用asset sheetと、本番で配置する独立素材が混同された。

### 強制対策
- 本番は必ず1素材=1ファイル。
- 比較シートは`QA_CONTACT_SHEET / NON_PRODUCTION`。
- 比較シートだけ存在する状態は未完了。
- 11卓サインも各卓を独立ファイルにする。

## 8. 透過素材に白・緑・checkerboardが残った

### 起きたこと
- ハンコ内部の白混入、外周の緑残り、背景焼き込み、擬似透過が発生した。

### 強制対策
- 透過必要素材は原則グリーンバック単体生成。
- alpha channel、外周透明、visible green、edge fringeを機械確認。
- 白が意図色か背景残りかを視覚確認。
- checkerboardが画像ピクセルに含まれる素材は禁止。
- 同一手法で2回失敗したら方法変更。

## 9. SVGとPNG方針が混線した

### 起きたこと
- SVG由来の硬い見た目や、production可否の混乱が生じた。

### 強制対策
- 追加制作でも装飾・イラスト正本は原則PNG。
- SVGを使う場合は、線・枠・単純幾何など明確な機能上の理由をitem-specific文書へ記録する。
- 視覚価値がある装飾を安易にSVG化しない。
- 既存方針によりPNG-only指定された領域へSVGを持ち込まない。

## 10. Figma上限に対して無駄なprobeを繰り返した

### 起きたこと
- 利用上限中に再試行してcallを浪費する危険があった。

### 強制対策
- 本スケジュールはFigma全面禁止。
- Figmaが復旧していても追加8種の自動制作からは触らない。
- Figma作業は別の明示指示・別Currentでのみ実行する。

## 11. 「裏で進んでいる」「完成している」と誤解させた

### 起きたこと
- 実際のwrite、生成、Drive保存がないのに進行しているように聞こえる報告が問題になった。

### 強制対策
- 実行したtoolと得られた証拠だけを報告する。
- 実変更ゼロなら`NO_CHANGE`と理由を報告する。
- 非同期で動いているという表現を使わない。
- 生成数、Drive保存数、commit SHAを具体的に報告する。
- 不明・未確認は明示する。

## 12. スケジュールrun同士が競合する危険

### 原因
- 1時間ごとのrunが前runの途中状態を誤認する可能性。

### 強制対策
- 各run開始時に最新mainとDriveを再確認。
- item-specific stateに`IN_PROGRESS`があり、直近runの証拠が揃わない場合は新規生成せず回収・整合性確認を優先。
- 同じ対象に別の新規候補を作らない。
- write直前に対象pathのSHAを再取得。
- stale write禁止。

## 13. 数を増やすことを優先し、品質が落ちる危険

### 強制対策
- 明日までの完了は目標であり、品質ゲートを下げる理由にしない。
- QA未完、Drive未確認、Git未確認の成果物は未完了。
- 時間切れの場合は中途状態とNEXTを正確に残す。
- 不採用を無理に採用しない。

## 14. 各runの最終自己監査

終了前に全項目を確認する。

- [ ] 完成済み4種へwriteしていない
- [ ] Figmaを使っていない
- [ ] 既存採用済み素材を再生成していない
- [ ] 同名・同役割のDrive重複を確認した
- [ ] 1素材=1ファイル
- [ ] 透過QAを必要箇所で実施した
- [ ] Drive readback済み
- [ ] Drive IDをGitへ記録した
- [ ] write直前にmainを再確認した
- [ ] write後にmain readbackした
- [ ] commit SHAを取得した
- [ ] ACTIVE_NEXTを更新した
- [ ] 実績以上の報告をしていない

1つでも満たさない場合、`COMPLETED`を付けない。

## 15. 最重要宣言

速く大量に作ることより、同じ失敗を繰り返さず、採用物を確実にDriveとGitへ残し、次runが迷わず続けられることを優先する。

`NO_EVIDENCE = NOT_COMPLETED`
`GENERATED_ONLY = NOT_COMPLETED`
`DRIVE_NOT_VERIFIED = NOT_COMPLETED`
`GIT_NOT_VERIFIED = NOT_COMPLETED`
